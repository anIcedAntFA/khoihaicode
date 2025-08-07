// ===== LONG POLLING IMPLEMENTATION: Job Status Checker =====
// This demonstrates the Long Polling pattern where:
// 1. Client sends a request asking for job status updates
// 2. Server HOLDS the request open until job status changes or timeout
// 3. Server responds immediately when status changes
// 4. Client immediately sends a new long poll request

import express from 'express';

const app = express();
app.use(express.json());

// ===== STEP 1: JOB STORAGE =====
interface Job {
	id: string;
	status: 'pending' | 'processing' | 'completed' | 'failed';
	progress: number;
	result?: string;
	lastUpdated: Date;
}

interface WaitingClient {
	res: express.Response;
	jobId: string;
	lastKnownStatus: string;
	timeout: ReturnType<typeof setTimeout>;
}

const jobs: Record<string, Job> = {};
const waitingClients: WaitingClient[] = [];

// ===== STEP 2: CREATE JOB ENDPOINT =====
app.post('/create-job', (_req, res) => {
	const jobId = `job_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

	jobs[jobId] = {
		id: jobId,
		status: 'pending',
		progress: 0,
		lastUpdated: new Date(),
	};

	// Start processing job asynchronously
	setTimeout(() => processJob(jobId), 1000);

	res.json({
		jobId: jobId,
		message: 'Job created successfully',
		pollEndpoint: `/poll-job-status?jobId=${jobId}`,
	});
});

// ===== STEP 3: LONG POLL ENDPOINT (THE MAGIC) =====
// This is where Long Polling happens - server HOLDS the request
app.get('/poll-job-status', (req, res) => {
	const jobId = req.query.jobId as string;
	const lastKnownStatus = (req.query.lastStatus as string) || '';

	if (!jobId || !jobs[jobId]) {
		return res.status(404).json({ error: 'Job not found' });
	}

	const currentJob = jobs[jobId];

	// STEP 3A: Check if status has changed since last poll
	if (hasJobStatusChanged(currentJob, lastKnownStatus)) {
		// Status changed! Respond immediately
		console.info(
			`📤 Immediate response: Job ${jobId} status changed to ${currentJob.status}`,
		);
		return res.json({
			jobId: jobId,
			status: currentJob.status,
			progress: currentJob.progress,
			result: currentJob.result,
			lastUpdated: currentJob.lastUpdated,
			immediate: true,
		});
	}

	// STEP 3B: No status change - HOLD the request (Long Polling core behavior)
	console.info(`⏳ No status change for job ${jobId}. HOLDING request open...`);

	// Set timeout to prevent holding forever
	const timeout = setTimeout(() => {
		console.info(`⏰ Timeout reached for job ${jobId} poll request`);
		removeWaitingClient(jobId);
		res.json({
			jobId: jobId,
			status: currentJob.status,
			progress: currentJob.progress,
			timeout: true,
			message: 'No status change within timeout period',
		});
	}, 60000); // 20 second timeout

	// STEP 3C: Store this request to respond later when status changes
	waitingClients.push({
		res: res,
		jobId: jobId,
		lastKnownStatus: currentJob.status,
		timeout: timeout,
	});

	console.info(
		`📋 Added client to waiting list for job ${jobId}. Total waiting: ${waitingClients.length}`,
	);
});

// ===== STEP 4: JOB PROCESSING SIMULATION =====
function processJob(jobId: string): void {
	const job = jobs[jobId];
	if (!job) return;

	// Simulate job processing stages
	const stages = [
		{ status: 'processing' as const, progress: 10, delay: 5000 },
		{ status: 'processing' as const, progress: 20, delay: 5000 },
		{ status: 'processing' as const, progress: 30, delay: 5000 },
		{ status: 'processing' as const, progress: 40, delay: 5000 },
		{ status: 'processing' as const, progress: 50, delay: 5000 },
		{ status: 'processing' as const, progress: 60, delay: 5000 },
		{ status: 'processing' as const, progress: 70, delay: 5000 },
		{ status: 'processing' as const, progress: 80, delay: 5000 },
		{ status: 'processing' as const, progress: 90, delay: 5000 },
		{ status: 'completed' as const, progress: 100, delay: 5000 },
	];

	let currentStage = 0;

	function nextStage() {
		if (currentStage >= stages.length) return;

		const stage = stages[currentStage];
		job.status = stage.status;
		job.progress = stage.progress;
		job.lastUpdated = new Date();

		if (stage.status === 'completed') {
			job.result = `Job ${jobId} completed successfully!`;
		}

		console.info(
			`🔄 Job ${jobId} updated: ${stage.status} (${stage.progress}%)`,
		);

		// STEP 4A: Notify all waiting clients about status change
		notifyWaitingClients(jobId);

		currentStage++;
		if (currentStage < stages.length) {
			setTimeout(nextStage, stage.delay);
		}
	}

	setTimeout(nextStage, 2000); // Start after 2 seconds
}

// ===== STEP 5: NOTIFY WAITING CLIENTS =====
// When job status changes, respond to ALL clients waiting for this job
function notifyWaitingClients(jobId: string): void {
	const job = jobs[jobId];
	const clientsForThisJob = waitingClients.filter(
		(client) => client.jobId === jobId,
	);

	console.info(
		`🔔 Job ${jobId} status changed! Notifying ${clientsForThisJob.length} waiting clients`,
	);

	clientsForThisJob.forEach((client) => {
		clearTimeout(client.timeout);

		// Respond to the held request
		client.res.json({
			jobId: jobId,
			status: job.status,
			progress: job.progress,
			result: job.result,
			lastUpdated: job.lastUpdated,
			statusChanged: true,
		});
	});

	// Remove notified clients from waiting list
	for (let i = waitingClients.length - 1; i >= 0; i--) {
		if (waitingClients[i].jobId === jobId) {
			waitingClients.splice(i, 1);
		}
	}

	console.info(
		`✅ All waiting clients for job ${jobId} notified. Remaining waiting: ${waitingClients.length}`,
	);
}

// ===== UTILITY FUNCTIONS =====
function hasJobStatusChanged(job: Job, lastKnownStatus: string): boolean {
	return lastKnownStatus !== '' && job.status !== lastKnownStatus;
}

function removeWaitingClient(jobId: string): void {
	for (let i = waitingClients.length - 1; i >= 0; i--) {
		if (waitingClients[i].jobId === jobId) {
			clearTimeout(waitingClients[i].timeout);
			waitingClients.splice(i, 1);
			break;
		}
	}
}

// ===== DEBUG ENDPOINT =====
app.get('/jobs', (_req, res) => {
	res.json({
		totalJobs: Object.keys(jobs).length,
		jobs: jobs,
		waitingClients: waitingClients.length,
	});
});

// ===== START SERVER =====
const PORT = 8080;
app.listen(PORT, () => {
	console.info(`🚀 Long Polling Server running on http://localhost:${PORT}`);
	console.info('📖 Endpoints:');
	console.info('  POST /create-job - Create a new job');
	console.info(
		'  GET  /poll-job-status?jobId=<id>&lastStatus=<status> - Long poll for status changes',
	);
	console.info('  GET  /jobs - View all jobs (debug)');
	console.info('');
	console.info('💡 Example workflow:');
	console.info('  1. curl -X POST http://localhost:8080/create-job');
	console.info(
		'  2. curl "http://localhost:8080/poll-job-status?jobId=<id>" (will wait until status changes)',
	);
});
