// ===== SSE CLIENT IMPLEMENTATION (TypeScript-style JavaScript) =====
// This handles all client-side SSE logic and UI updates

/**
 * @typedef {Object} StockData
 * @property {string} symbol
 * @property {number} price
 * @property {number} change
 * @property {number} changePercent
 * @property {string} timestamp
 */

/**
 * @typedef {Object} JobData
 * @property {string} jobId
 * @property {number} progress
 * @property {'running'|'completed'|'failed'} status
 * @property {string} message
 */

/**
 * @typedef {Object} NotificationData
 * @property {string} [user]
 * @property {string} [action]
 * @property {string} [from]
 * @property {string} [message]
 * @property {string} [level]
 * @property {string} timestamp
 */

/** @type {EventSource|null} */
let eventSource = null;
/** @type {number} */
let eventCount = 0;
/** @type {Map<string, StockData>} */
const stocks = new Map();
/** @type {Map<string, JobData>} */
const jobs = new Map();

// ===== UTILITY FUNCTIONS =====
/**
 * @param {string} message
 * @param {'info'|'connection'|'stock'|'job'|'notification'|'error'|'manual'} type
 */
function log(message, type = 'info') {
	/** @type {HTMLElement} */
	const eventLog = document.getElementById('eventLog');
	const timestamp = new Date().toLocaleTimeString();
	const logEntry = document.createElement('div');

	let color = '#00ff00';
	let icon = '📨';

	switch (type) {
		case 'connection':
			color = '#00aaff';
			icon = '🔌';
			break;
		case 'stock':
			color = '#ffaa00';
			icon = '📈';
			break;
		case 'job':
			color = '#aa00ff';
			icon = '⚙️';
			break;
		case 'notification':
			color = '#ff6600';
			icon = '🔔';
			break;
		case 'error':
			color = '#ff4444';
			icon = '❌';
			break;
		case 'manual':
			color = '#44ff44';
			icon = '🎲';
			break;
	}

	logEntry.innerHTML = `<span style="color: #888">[${timestamp}]</span> <span style="color: ${color}">${icon} ${message}</span>`;
	eventLog.appendChild(logEntry);
	eventLog.scrollTop = eventLog.scrollHeight;
}

/**
 * @param {boolean} connected
 */
function updateConnectionStatus(connected) {
	/** @type {HTMLElement} */
	const status = document.getElementById('connectionStatus');
	/** @type {HTMLButtonElement} */
	const connectBtn = document.getElementById('connectBtn');
	/** @type {HTMLButtonElement} */
	const disconnectBtn = document.getElementById('disconnectBtn');

	status.textContent = connected ? 'Connected' : 'Disconnected';
	status.className = connected ? 'connected' : 'disconnected';

	connectBtn.disabled = connected;
	disconnectBtn.disabled = !connected;
}

function updateEventCount() {
	eventCount++;
	/** @type {HTMLElement} */
	const eventCountElement = document.getElementById('eventCount');
	eventCountElement.textContent = eventCount.toString();
}

// ===== SSE CONNECTION MANAGEMENT =====
function connectSSE() {
	if (eventSource) {
		eventSource.close();
	}

	log('Attempting to connect to SSE stream...', 'connection');
	eventSource = new EventSource('/events');

	// ===== CONNECTION EVENTS =====
	eventSource.onopen = () => {
		updateConnectionStatus(true);
		log('✅ Connected to SSE stream successfully', 'connection');
		refreshStatus();
	};

	eventSource.onmessage = (event) => {
		updateEventCount();

		try {
			const data = JSON.parse(event.data);
			log(`Generic event received: ${JSON.stringify(data)}`, 'info');
		} catch (e) {
			log(`Raw message: ${event.data}`, 'info');
		}
	};

	eventSource.onerror = () => {
		updateConnectionStatus(false);
		log('❌ SSE connection error occurred', 'error');
	};

	// ===== CUSTOM EVENT LISTENERS =====

	// Connection event
	eventSource.addEventListener('connection', (event) => {
		const data = JSON.parse(event.data);
		log(`Connection established: ${data.message}`, 'connection');
		updateEventCount();
	});

	// Stock price updates
	eventSource.addEventListener('stock_price', (event) => {
		/** @type {StockData} */
		const stock = JSON.parse(event.data);
		stocks.set(stock.symbol, stock);
		updateStockDisplay();

		const changeText =
			stock.changePercent > 0
				? `+${stock.changePercent}%`
				: `${stock.changePercent}%`;
		log(
			`Stock update: ${stock.symbol} = $${stock.price} (${changeText})`,
			'stock',
		);
		updateEventCount();
	});

	// Job progress updates
	eventSource.addEventListener('job_progress', (event) => {
		/** @type {JobData} */
		const job = JSON.parse(event.data);
		jobs.set(job.jobId, job);
		updateJobDisplay();

		log(
			`Job ${job.jobId.substr(-6)}: ${job.progress}% - ${job.message}`,
			'job',
		);
		updateEventCount();
	});

	// User login/logout events
	eventSource.addEventListener('user_login', (event) => {
		/** @type {NotificationData} */
		const data = JSON.parse(event.data);
		addNotification(`👤 ${data.user} ${data.action}`, 'user');
		log(`User activity: ${data.user} ${data.action}`, 'notification');
		updateEventCount();
	});

	// New message events
	eventSource.addEventListener('new_message', (event) => {
		/** @type {NotificationData} */
		const data = JSON.parse(event.data);
		addNotification(`💬 ${data.from}: ${data.message}`, 'message');
		log(`New message from ${data.from}: ${data.message}`, 'notification');
		updateEventCount();
	});

	// System alert events
	eventSource.addEventListener('system_alert', (event) => {
		/** @type {NotificationData} */
		const data = JSON.parse(event.data);
		addNotification(`⚠️ ${data.message}`, 'alert');
		log(`System alert: ${data.message}`, 'notification');
		updateEventCount();
	});
}

function disconnectSSE() {
	if (eventSource) {
		eventSource.close();
		eventSource = null;
		updateConnectionStatus(false);
		log('🔌 Disconnected from SSE stream', 'connection');
	}
}

// ===== UI UPDATE FUNCTIONS =====
function updateStockDisplay() {
	/** @type {HTMLElement} */
	const container = document.getElementById('stockPrices');
	container.innerHTML = '';

	stocks.forEach((stock) => {
		const isPositive = stock.changePercent >= 0;
		const color = isPositive ? '#4CAF50' : '#f44336';
		const sign = isPositive ? '+' : '';
		const stockClass = isPositive ? 'stock-positive' : 'stock-negative';

		const stockDiv = document.createElement('div');
		stockDiv.className = `stock-item ${stockClass}`;
		stockDiv.innerHTML = `
            <div>
                <strong>${stock.symbol}</strong>: $${stock.price}
                <span style="color: ${color}; font-weight: bold;"> (${sign}${stock.changePercent}%)</span>
            </div>
            <small style="color: #666;">
                Change: $${stock.change} | 
                Last update: ${new Date(stock.timestamp).toLocaleTimeString()}
            </small>
        `;

		container.appendChild(stockDiv);
	});

	if (stocks.size === 0) {
		container.innerHTML =
			'<div style="color: #999; text-align: center; padding: 20px;">No stock data available</div>';
	}
}

function updateJobDisplay() {
	/** @type {HTMLElement} */
	const container = document.getElementById('jobProgress');
	container.innerHTML = '';

	jobs.forEach((job) => {
		/** @type {Record<string, string>} */
		const statusColors = {
			running: '#2196F3',
			completed: '#4CAF50',
			failed: '#f44336',
		};

		const statusColor = statusColors[job.status] || '#666';

		const jobDiv = document.createElement('div');
		jobDiv.className = 'job-item';
		jobDiv.innerHTML = `
            <div>
                <strong>${job.jobId.substr(-6)}</strong> - 
                <span style="color: ${statusColor}; font-weight: bold;">${job.status.toUpperCase()}</span>
            </div>
            <div class="progress-bar">
                <div class="progress-fill" style="width: ${job.progress}%"></div>
            </div>
            <small>${job.message} (${job.progress}%)</small>
        `;

		container.appendChild(jobDiv);
	});

	if (jobs.size === 0) {
		container.innerHTML =
			'<div style="color: #999; text-align: center; padding: 20px;">No active jobs</div>';
	}
}

/**
 * @param {string} message
 * @param {string} type
 */
function addNotification(message, type) {
	/** @type {HTMLElement} */
	const container = document.getElementById('notifications');
	const notificationDiv = document.createElement('div');
	notificationDiv.className = `notification-item ${type}`;
	notificationDiv.innerHTML = `
        <div>${message}</div>
        <small style="color: #666;">${new Date().toLocaleTimeString()}</small>
    `;

	// Add to top
	container.insertBefore(notificationDiv, container.firstChild);

	// Keep only last 10 notifications
	while (container.children.length > 10) {
		container.removeChild(container.lastChild);
	}

	// Add visual effect
	notificationDiv.style.animation =
		'slideIn 0.3s ease-out, pulse 0.5s ease-out';
}

// ===== SERVER INTERACTION FUNCTIONS =====
async function simulateStock() {
	try {
		const response = await fetch('/simulate/stock-update', { method: 'POST' });
		const result = await response.json();

		if (result.success) {
			log(
				`Manually triggered stock update for ${result.updated.symbol}`,
				'manual',
			);
		} else {
			log('Failed to trigger stock update', 'error');
		}
	} catch (error) {
		const errorMessage =
			error instanceof Error ? error.message : 'Unknown error';
		log(`Error triggering stock update: ${errorMessage}`, 'error');
	}
}

async function simulateNotification() {
	try {
		const response = await fetch('/simulate/notification', { method: 'POST' });
		const result = await response.json();

		if (result.success) {
			log(`Manually triggered notification: ${result.sent.type}`, 'manual');
		} else {
			log('Failed to trigger notification', 'error');
		}
	} catch (error) {
		const errorMessage =
			error instanceof Error ? error.message : 'Unknown error';
		log(`Error triggering notification: ${errorMessage}`, 'error');
	}
}

async function startJob() {
	try {
		const response = await fetch('/simulate/start-job', { method: 'POST' });
		const result = await response.json();

		if (result.success) {
			log(`Started new job: ${result.jobId.substr(-6)}`, 'manual');
		} else {
			log('Failed to start job', 'error');
		}
	} catch (error) {
		const errorMessage =
			error instanceof Error ? error.message : 'Unknown error';
		log(`Error starting job: ${errorMessage}`, 'error');
	}
}

async function refreshStatus() {
	try {
		const response = await fetch('/status');
		const status = await response.json();

		/** @type {HTMLElement} */
		const clientCountElement = document.getElementById('clientCount');
		clientCountElement.textContent = status.connectedClients.toString();
		log(
			`Server status refreshed: ${status.connectedClients} clients connected`,
			'connection',
		);
	} catch (error) {
		const errorMessage =
			error instanceof Error ? error.message : 'Unknown error';
		log(`Error refreshing status: ${errorMessage}`, 'error');
	}
}

function clearLogs() {
	/** @type {HTMLElement} */
	const eventLog = document.getElementById('eventLog');
	eventLog.innerHTML = '';
	log('🧹 Event logs cleared', 'info');
}

// ===== INITIALIZATION =====
window.onload = () => {
	log(
		'🌟 SSE Demo initialized. Click "Connect to SSE" to start.',
		'connection',
	);
	updateConnectionStatus(false);

	// Auto-connect after 1 second
	setTimeout(() => {
		connectSSE();
	}, 1000);
};

// ===== CLEANUP =====
window.onbeforeunload = () => {
	if (eventSource) {
		eventSource.close();
	}
};

// ===== KEYBOARD SHORTCUTS =====
document.addEventListener('keydown', (event) => {
	if (event.ctrlKey) {
		switch (event.key) {
			case '1':
				event.preventDefault();
				connectSSE();
				break;
			case '2':
				event.preventDefault();
				disconnectSSE();
				break;
			case '3':
				event.preventDefault();
				simulateStock();
				break;
			case '4':
				event.preventDefault();
				simulateNotification();
				break;
			case '5':
				event.preventDefault();
				startJob();
				break;
			case '0':
				event.preventDefault();
				clearLogs();
				break;
		}
	}
});

// Add keyboard shortcut info to log
setTimeout(() => {
	log(
		'💡 Keyboard shortcuts: Ctrl+1 (Connect), Ctrl+2 (Disconnect), Ctrl+3 (Stock), Ctrl+4 (Notification), Ctrl+5 (Job), Ctrl+0 (Clear)',
		'info',
	);
}, 2000);
