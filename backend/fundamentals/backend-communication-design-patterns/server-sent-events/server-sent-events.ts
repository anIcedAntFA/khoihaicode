// ===== SERVER-SENT EVENTS (SSE) IMPLEMENTATION =====
// This demonstrates the SSE pattern where:
// 1. Client makes ONE HTTP request to server
// 2. Server keeps connection open indefinitely
// 3. Server streams events as they happen
// 4. Client listens passively to the event stream

import express from 'express';

import path from 'node:path';

const app = express();
app.use(express.json());
app.use(express.static('public'));

// ===== STEP 1: DATA STORAGE & TYPES =====
interface SSEEvent {
	id?: string;
	type?: string;
	data: Record<string, unknown> | string;
}

interface StockPrice {
	symbol: string;
	price: number;
	change: number;
	changePercent: number;
	timestamp: Date;
	[key: string]: unknown;
}

interface JobProgress {
	jobId: string;
	progress: number;
	status: 'running' | 'completed' | 'failed';
	message: string;
	[key: string]: unknown;
}

// Connected clients storage
const connectedClients = new Map<string, express.Response>();
const stockPrices = new Map<string, StockPrice>();
const jobProgresses = new Map<string, JobProgress>();

// Initialize sample stock data
const initializeStocks = () => {
	const stocks = ['AAPL', 'GOOGL', 'MSFT', 'TSLA', 'AMZN'];
	stocks.forEach((symbol) => {
		stockPrices.set(symbol, {
			symbol,
			price: Math.random() * 1000 + 100,
			change: 0,
			changePercent: 0,
			timestamp: new Date(),
		});
	});
};

// ===== STEP 2: SSE ENDPOINT - THE MAGIC HAPPENS HERE =====
app.get('/events', (req, res) => {
	const clientId = `client_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

	// Log connection (development only)
	// console.info(`🔌 New SSE client connected: ${clientId}`);

	// STEP 2A: Set SSE headers - This is CRITICAL for SSE
	res.writeHead(200, {
		'Content-Type': 'text/event-stream',
		'Cache-Control': 'no-cache',
		Connection: 'keep-alive',
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Headers': 'Cache-Control',
	});

	// STEP 2B: Send welcome event immediately
	const welcomeEvent = {
		id: clientId,
		type: 'connection',
		data: {
			message: 'Connected to SSE stream successfully!',
			clientId: clientId,
			timestamp: new Date().toISOString(),
		},
	};

	sendSSEEvent(res, welcomeEvent);

	// STEP 2C: Store client connection for broadcasting
	connectedClients.set(clientId, res);
	// console.info(`📊 Total connected clients: ${connectedClients.size}`);

	// STEP 2D: Send current data immediately
	sendCurrentStockPrices(res);
	sendCurrentJobs(res);

	// STEP 2E: Handle client disconnect
	req.on('close', () => {
		connectedClients.delete(clientId);
		// console.info(`❌ Client disconnected: ${clientId}`);
		// console.info(`📊 Remaining clients: ${connectedClients.size}`);
	});

	// Keep connection alive with heartbeat
	const heartbeat = setInterval(() => {
		if (res.writableEnded) {
			clearInterval(heartbeat);
			return;
		}
		// Send heartbeat comment (ignored by EventSource)
		res.write(': heartbeat\n\n');
	}, 30000);

	req.on('close', () => {
		clearInterval(heartbeat);
	});
});

// ===== STEP 3: SSE EVENT FORMATTING FUNCTION =====
function sendSSEEvent(res: express.Response, event: SSEEvent): void {
	try {
		// SSE format:
		// id: unique-id
		// event: event-type
		// data: json-data
		// \n\n (double newline to end event)

		if (event.id) {
			res.write(`id: ${event.id}\n`);
		}

		if (event.type) {
			res.write(`event: ${event.type}\n`);
		}

		const data =
			typeof event.data === 'string' ? event.data : JSON.stringify(event.data);
		res.write(`data: ${data}\n\n`);
	} catch (error) {
		// Error handling without console
		if (error instanceof Error) {
			res.write(
				`data: {"error": "Failed to send event: ${error.message}"}\n\n`,
			);
		}
	}
}

// ===== STEP 4: BROADCAST FUNCTIONS =====
function broadcastToAllClients(event: SSEEvent): void {
	// Broadcasting logic without console.info

	connectedClients.forEach((clientRes, clientId) => {
		try {
			if (!clientRes.writableEnded) {
				sendSSEEvent(clientRes, event);
			} else {
				// Clean up dead connections
				connectedClients.delete(clientId);
			}
		} catch (_err) {
			// Clean up on error
			connectedClients.delete(clientId);
		}
	});
}

function sendCurrentStockPrices(res: express.Response) {
	stockPrices.forEach((stock) => {
		sendSSEEvent(res, {
			id: `stock_${stock.symbol}_${Date.now()}`,
			type: 'stock_price',
			data: stock,
		});
	});
}

function sendCurrentJobs(res: express.Response) {
	jobProgresses.forEach((job) => {
		sendSSEEvent(res, {
			id: `job_${job.jobId}_${Date.now()}`,
			type: 'job_progress',
			data: job,
		});
	});
}

// ===== STEP 5: DATA SIMULATION ENDPOINTS =====

// Simulate live stock price updates
app.post('/simulate/stock-update', (_req, res) => {
	const symbols = Array.from(stockPrices.keys());
	const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];
	const currentStock = stockPrices.get(randomSymbol);

	if (!currentStock) {
		return res.status(404).json({ error: 'Stock not found' });
	}

	// Simulate price change
	const changePercent = (Math.random() - 0.5) * 10; // -5% to +5%
	const newPrice = currentStock.price * (1 + changePercent / 100);
	const change = newPrice - currentStock.price;

	const updatedStock: StockPrice = {
		symbol: randomSymbol,
		price: Math.round(newPrice * 100) / 100,
		change: Math.round(change * 100) / 100,
		changePercent: Math.round(changePercent * 100) / 100,
		timestamp: new Date(),
	};

	stockPrices.set(randomSymbol, updatedStock);

	// Broadcast to all connected clients
	broadcastToAllClients({
		id: `stock_${randomSymbol}_${Date.now()}`,
		type: 'stock_price',
		data: updatedStock,
	});

	res.json({ success: true, updated: updatedStock });
});

// Simulate user notifications
app.post('/simulate/notification', (_req, res) => {
	const notifications = [
		{ type: 'user_login', data: { user: 'Alice', action: 'logged in' } },
		{ type: 'new_message', data: { from: 'Bob', message: 'Hello everyone!' } },
		{
			type: 'system_alert',
			data: { level: 'info', message: 'System maintenance in 1 hour' },
		},
		{ type: 'user_login', data: { user: 'Charlie', action: 'logged out' } },
	];

	const randomNotification =
		notifications[Math.floor(Math.random() * notifications.length)];

	const event = {
		id: `notification_${Date.now()}`,
		type: randomNotification.type,
		data: {
			...randomNotification.data,
			timestamp: new Date().toISOString(),
		},
	};

	broadcastToAllClients(event);
	res.json({ success: true, sent: event });
});

// Create and track job progress
app.post('/simulate/start-job', (_req, res) => {
	const jobId = `job_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;

	const job: JobProgress = {
		jobId,
		progress: 0,
		status: 'running',
		message: 'Job started...',
	};

	jobProgresses.set(jobId, job);

	// Broadcast job creation
	broadcastToAllClients({
		id: `job_${jobId}_created`,
		type: 'job_progress',
		data: job,
	});

	// Simulate job progress over time
	let currentProgress = 0;
	const progressInterval = setInterval(() => {
		currentProgress += Math.random() * 25; // Random progress increments

		if (currentProgress >= 100) {
			currentProgress = 100;
			job.progress = 100;
			job.status = 'completed';
			job.message = 'Job completed successfully!';
			clearInterval(progressInterval);
		} else {
			job.progress = Math.round(currentProgress);
			job.message = `Processing... ${job.progress}% complete`;
		}

		jobProgresses.set(jobId, job);

		// Broadcast progress update
		broadcastToAllClients({
			id: `job_${jobId}_${Date.now()}`,
			type: 'job_progress',
			data: { ...job },
		});
	}, 2000); // Update every 2 seconds

	res.json({
		success: true,
		jobId,
		message: 'Job started and will update progress via SSE',
	});
});

// ===== STEP 6: AUTO-SIMULATION (BACKGROUND EVENTS) =====
function startAutoSimulation() {
	// Auto stock price updates every 5 seconds
	setInterval(() => {
		if (connectedClients.size > 0) {
			// Simulate stock price update
			const symbols = Array.from(stockPrices.keys());
			const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];
			const currentStock = stockPrices.get(randomSymbol);

			if (!currentStock) return;

			const changePercent = (Math.random() - 0.5) * 6; // -3% to +3%
			const newPrice = currentStock.price * (1 + changePercent / 100);
			const change = newPrice - currentStock.price;

			const updatedStock: StockPrice = {
				symbol: randomSymbol,
				price: Math.round(newPrice * 100) / 100,
				change: Math.round(change * 100) / 100,
				changePercent: Math.round(changePercent * 100) / 100,
				timestamp: new Date(),
			};

			stockPrices.set(randomSymbol, updatedStock);

			broadcastToAllClients({
				id: `auto_stock_${randomSymbol}_${Date.now()}`,
				type: 'stock_price',
				data: updatedStock,
			});
		}
	}, 5000);

	// Auto notifications every 15 seconds
	setInterval(() => {
		if (connectedClients.size > 0) {
			const events = [
				{
					type: 'system_alert',
					data: { level: 'info', message: 'Auto-generated system update' },
				},
				{
					type: 'user_login',
					data: {
						user: `User_${Math.floor(Math.random() * 100)}`,
						action: 'logged in',
					},
				},
			];

			const randomEvent = events[Math.floor(Math.random() * events.length)];

			broadcastToAllClients({
				id: `auto_${randomEvent.type}_${Date.now()}`,
				type: randomEvent.type,
				data: {
					...randomEvent.data,
					timestamp: new Date().toISOString(),
				},
			});
		}
	}, 15000);
}

// ===== STEP 7: STATUS & DEBUG ENDPOINTS =====
app.get('/status', (_req, res) => {
	res.json({
		connectedClients: connectedClients.size,
		stockPrices: Array.from(stockPrices.values()),
		activeJobs: Array.from(jobProgresses.values()),
		uptime: process.uptime(),
	});
});

app.get('/health', (_req, res) => {
	res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// ===== STEP 8: SERVE DEMO FILES =====
app.get('/demo', (_req, res) => {
	res.sendFile(path.join(__dirname, 'sse-demo.html'));
});

app.get('/sse-demo.css', (_req, res) => {
	res.sendFile(path.join(__dirname, 'sse-demo.css'));
});

app.get('/sse-client.js', (_req, res) => {
	res.sendFile(path.join(__dirname, 'sse-client.js'));
});

// ===== START SERVER =====
const PORT = 8080;

initializeStocks();
startAutoSimulation();

app.listen(PORT, () => {
	console.info(
		`🚀 Server-Sent Events Server running on http://localhost:${PORT}`,
	);
	console.info('📖 Endpoints:');
	console.info('  GET  /events - SSE stream endpoint');
	console.info('  GET  /demo - Interactive HTML demo');
	console.info('  GET  /status - Server status and connected clients');
	console.info('  POST /simulate/stock-update - Trigger stock price update');
	console.info('  POST /simulate/notification - Trigger notification');
	console.info('  POST /simulate/start-job - Start progress tracking job');
	console.info('');
	console.info('💡 Quick start:');
	console.info('  1. Open http://localhost:8080/demo in your browser');
	console.info('  2. Watch live events streaming automatically');
	console.info('  3. Use buttons to trigger manual events');
	console.info('');
	console.info('🔧 Or test with curl:');
	console.info('  curl http://localhost:8080/events');
});
