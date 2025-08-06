// ===== SHORT POLLING IMPLEMENTATION: Job Processing Server =====
// This demonstrates the Short Polling pattern where:
// 1. Client submits a long-running job and receives a Job ID immediately
// 2. Server processes the job asynchronously in the background
// 3. Client repeatedly polls the server to check job status

import express from 'express';

const app = express();

// ===== STEP 1: JOB STORAGE =====
// In-memory storage for job statuses (in production, use Redis or database)
interface Job {
	id: string;
	progress: number;
	status: 'processing' | 'completed' | 'failed';
	createdAt: Date;
}

const jobs: Record<string, Job> = {};

// ===== STEP 2: SUBMIT JOB ENDPOINT =====
// Client sends initial request to start a long-running job
// Server immediately returns Job ID without waiting for completion
app.post('/submit', (_req, res) => {
	const jobId = `job_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

	// Create job entry with initial status
	jobs[jobId] = {
		id: jobId,
		progress: 0,
		status: 'processing',
		createdAt: new Date(),
	};

	// Start processing job asynchronously (non-blocking)
	startJobProcessing(jobId);

	// Return Job ID immediately - this is the "handle" for the client
	res.json({
		jobId: jobId,
		message: 'Job submitted successfully. Use this ID to check status.',
		statusEndpoint: `/check-status?jobId=${jobId}`,
	});

	console.info(`✅ Job ${jobId} submitted and processing started`);
});

// ===== STEP 3: STATUS CHECK ENDPOINT =====
// Client uses this endpoint to poll for job status
// This is where the "polling" happens - client repeatedly calls this
app.get('/check-status', (req, res) => {
	const jobId = req.query.jobId as string;

	if (!jobId) {
		return res.status(400).json({
			error: 'jobId parameter is required',
		});
	}

	const job = jobs[jobId];

	if (!job) {
		return res.status(404).json({
			error: 'Job not found',
			jobId: jobId,
		});
	}

	// Return current job status - this is the quick response
	res.json({
		jobId: job.id,
		progress: job.progress,
		status: job.status,
		createdAt: job.createdAt,
		isComplete: job.status === 'completed' || job.status === 'failed',
	});

	console.info(
		`📊 Status check for ${jobId}: ${job.progress}% (${job.status})`,
	);
});

// ===== STEP 4: BACKGROUND JOB PROCESSING =====
// This simulates long-running work happening asynchronously
function startJobProcessing(jobId: string): void {
	const job = jobs[jobId];
	if (!job) return;

	// Simulate work by incrementing progress every 2 seconds
	const updateInterval = setInterval(() => {
		const currentJob = jobs[jobId];
		if (!currentJob) {
			clearInterval(updateInterval);
			return;
		}

		// Increment progress
		currentJob.progress += 10;

		if (currentJob.progress >= 100) {
			currentJob.progress = 100;
			currentJob.status = 'completed';
			clearInterval(updateInterval);
			console.info(`🎉 Job ${jobId} completed successfully`);
		} else {
			console.info(`⚙️  Job ${jobId} progress: ${currentJob.progress}%`);
		}
	}, 4000); // Update every 2 seconds
}

// ===== STEP 5: START SERVER =====
const PORT = 8080;
app.listen(PORT, () => {
	console.info(
		`🚀 Short Polling Demo Server running on http://localhost:${PORT}`,
	);
	console.info('📖 Endpoints:');
	console.info('   POST /submit - Submit a new job');
	console.info('   GET /check-status?jobId=<id> - Check job status');
	console.info('\n🧪 Try these curl commands:');
	console.info(`   curl -X POST http://localhost:${PORT}/submit`);
	console.info(
		`   curl "http://localhost:${PORT}/check-status?jobId=<job_id>"`,
	);
});

// ===== CLEANUP: Remove old completed jobs (optional) =====
// Clean up completed jobs every 5 minutes to prevent memory leaks
setInterval(
	() => {
		const now = new Date();
		let deletedCount = 0;

		for (const [jobId, job] of Object.entries(jobs)) {
			const ageInMinutes =
				(now.getTime() - job.createdAt.getTime()) / (1000 * 60);

			// Remove jobs older than 10 minutes if completed
			if (
				(job.status === 'completed' || job.status === 'failed') &&
				ageInMinutes > 10
			) {
				delete jobs[jobId];
				deletedCount++;
			}
		}

		if (deletedCount > 0) {
			console.info(`🧹 Cleaned up ${deletedCount} old completed jobs`);
		}
	},
	5 * 60 * 1000,
); // Run every 5 minutes
