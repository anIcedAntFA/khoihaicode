// ===== PUSH MODEL IMPLEMENTATION: WebSocket Chat Server =====
// This file demonstrates the Push communication pattern where:
// 1. Server can initiate data transfer to clients (server-initiated)
// 2. Real-time communication without client polling
// 3. Persistent bidirectional connections

import websocket from 'websocket';

import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Get current file path for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ===== STEP 1: CONNECTION MANAGEMENT =====
// Store all active WebSocket connections in an array
// This allows us to broadcast messages to all connected clients (Push Model core feature)
const connections: websocket.connection[] = [];

// ===== STEP 2: HYBRID HTTP + WEBSOCKET SERVER =====
// Create HTTP server that serves both:
// 1. Static files (client.html) - Traditional Request/Response pattern
// 2. WebSocket upgrade requests - Push pattern foundation
const httpServer = http.createServer((req, res) => {
	// Handle HTTP requests (Request/Response pattern)
	// Serve the HTML client file when users visit the root URL
	if (req.url === '/' || req.url === '/index.html') {
		res.setHeader('Content-Type', 'text/html');
		fs.readFile(path.join(__dirname, 'client.html'), (err, data) => {
			if (err) {
				res.writeHead(404);
				res.end('File not found');
				return;
			}
			res.writeHead(200);
			res.end(data);
		});
	} else {
		res.writeHead(404);
		res.end('Not found');
	}
});

// ===== STEP 3: WEBSOCKET SERVER SETUP =====
// This is where the Push Model magic happens!
// WebSocket provides the bidirectional, persistent connection needed for Push pattern
const WebSocketServer = websocket.server;
const wsServer = new WebSocketServer({
	httpServer: httpServer, // Attach to our HTTP server
	autoAcceptConnections: false, // Security: Manual connection approval
});

// ===== STEP 4: SECURITY LAYER =====
// Function to validate connection origins (prevent unauthorized access)
function originIsAllowed(origin: string): boolean {
	// Whitelist of allowed origins for security
	const allowedOrigins = [
		'http://localhost:8080',
		'http://127.0.0.1:8080',
		'https://be.ngockhoi96.dev',
		'null', // For file:// protocol during development
	];
	return allowedOrigins.includes(origin) || !origin; // Allow null origin for development
}

// ===== STEP 5: START THE SERVER =====
// Start listening on port 8080 for both HTTP and WebSocket connections
httpServer.listen(8080, () => {
	console.info('🚀 Server is running on http://localhost:8080');
	console.info('📡 WebSocket server is ready for connections');
	console.info(
		'🌐 Open http://localhost:8080 in your browser to test the chat',
	);
});

// ===== STEP 6: HANDLE WEBSOCKET CONNECTION REQUESTS =====
// This is the heart of the Push Model implementation!
wsServer.on('request', (req) => {
	// ===== STEP 6A: SECURITY CHECK =====
	// Validate the origin before accepting connection
	if (!originIsAllowed(req.origin)) {
		req.reject();
		console.info(`Connection from origin ${req.origin} rejected.`);
		return;
	}

	// ===== STEP 6B: ACCEPT CONNECTION =====
	// Accept the WebSocket connection - establishing persistent bidirectional link
	const connection = req.accept(null, req.origin);
	console.info(`✅ New connection accepted from ${req.origin}`);

	// ===== STEP 6C: HANDLE INCOMING MESSAGES (PUSH TRIGGER) =====
	// When a client sends a message, we PUSH it to ALL other clients
	// This demonstrates the core Push Model: server-initiated communication
	connection.on('message', (msg) => {
		if (msg.type === 'utf8') {
			const message = msg.utf8Data;
			console.info(`📨 Received message: ${message}`);

			// 🚀 PUSH MODEL IN ACTION! 🚀
			// Server immediately pushes the message to ALL connected clients
			// Clients don't need to ask "any new messages?" - they get pushed automatically
			connections.forEach((conn) => {
				if (conn.connected) {
					conn.send(`User${connection.socket.remotePort} says: ${message}`);
				}
			});
		}
	});

	// ===== STEP 6D: HANDLE CONNECTION CLOSE =====
	// Clean up when a client disconnects and notify others
	connection.on('close', (reasonCode, description) => {
		console.info(`❌ Connection closed: ${reasonCode} - ${description}`);

		// Remove disconnected connection from our active connections array
		const index = connections.indexOf(connection);
		if (index !== -1) {
			connections.splice(index, 1);
		}

		// 🚀 PUSH MODEL: Notify all remaining users about the departure
		// Server pushes "user left" notification without clients asking for it
		connections.forEach((conn) => {
			if (conn.connected) {
				conn.send(`User${connection.socket.remotePort} has left the chat`);
			}
		});
	});

	// ===== STEP 6E: CONNECTION MANAGEMENT =====
	// Add new connection to our active connections array
	connections.push(connection);

	// 🚀 PUSH MODEL: Notify existing users about new arrival
	// Server proactively pushes "user joined" notification to all existing clients
	connections.forEach((conn) => {
		if (conn.connected && conn !== connection) {
			conn.send(`User${connection.socket.remotePort} has joined the chat`);
		}
	});

	// 🚀 PUSH MODEL: Send welcome message to the new user
	// Server immediately pushes welcome info without client requesting it
	connection.send(
		`Welcome! You are User${connection.socket.remotePort}. There are ${connections.length} users online.`,
	);
});

// ===== SUMMARY: PUSH MODEL CHARACTERISTICS DEMONSTRATED =====
/*
🔄 SERVER-INITIATED COMMUNICATION:
   - Server pushes messages to clients without clients asking
   - No polling needed from client side

⚡ REAL-TIME UPDATES:
   - Messages delivered instantly when events occur
   - Join/leave notifications pushed immediately

🔗 PERSISTENT CONNECTIONS:
   - WebSocket maintains open bidirectional connection
   - Allows server to push data anytime

📡 EVENT-DRIVEN ARCHITECTURE:
   - Server reacts to events (new message, user join/leave)
   - Automatically broadcasts updates to all relevant clients

🏗️ STATEFUL CONNECTION MANAGEMENT:
   - Server maintains active connection list
   - Enables broadcasting to multiple clients simultaneously

This implementation perfectly demonstrates the Push Model where:
1. Clients establish connection once
2. Server can send data to clients anytime (push)
3. Real-time communication without client polling
4. Perfect for chat, notifications, live updates
*/
