#!/bin/bash

# ===== LONG POLLING DEMO SCRIPT =====
# This demonstrates the 4-step Long Polling pattern clearly

echo "🚀 Long Polling Demo - Job Status Polling"
echo "========================================="
echo ""

SERVER_URL="http://localhost:8080"

# Check if server is running
if ! curl -s "$SERVER_URL/jobs" > /dev/null 2>&1; then
    echo "❌ Server not running. Please start:"
    echo "   bun run long-polling.ts"
    exit 1
fi

echo "✅ Server is running!"
echo ""

echo "📖 Long Polling 4-Step Demo:"
echo "1. Client asks: 'Has job status changed?'"
echo "2. Server HOLDS request (doesn't respond immediately)"
echo "3. When status changes → Server responds immediately" 
echo "4. Client gets response → Sends new poll request"
echo ""

# STEP 1: Create a job
echo "🎬 STEP 1: Create a job"
echo "======================="
JOB_RESPONSE=$(curl -s -X POST "$SERVER_URL/create-job")
echo "Job response: $JOB_RESPONSE"

# Extract job ID without jq (using grep and cut)
JOB_ID=$(echo "$JOB_RESPONSE" | grep -o '"jobId":"[^"]*"' | cut -d'"' -f4)
echo "Job created: $JOB_ID"
echo ""

# STEP 2: Start Long Polling (will hold request)
echo "🎬 STEP 2: Start Long Polling"
echo "============================="
echo "Client asks: 'Has job $JOB_ID status changed?'"
echo "Server will HOLD this request until status actually changes..."
echo ""

START_TIME=$(date +%s)

# This request will "hang" until job status changes
echo "⏳ Sending poll request (this will wait until status changes)..."
POLL_RESPONSE=$(curl -s "$SERVER_URL/poll-job-status?jobId=$JOB_ID&lastStatus=pending")

END_TIME=$(date +%s)
DURATION=$((END_TIME - START_TIME))

echo ""
echo "🎬 STEP 3: Server Responds When Status Changed"
echo "=============================================="
echo "📤 Response received after $DURATION seconds:"
echo "$POLL_RESPONSE"
echo ""

# STEP 4: Simulate continuous polling
echo "🎬 STEP 4: Client Sends New Poll Request"
echo "========================================"
echo "Client immediately sends another poll request..."

# Extract current status without jq
CURRENT_STATUS=$(echo "$POLL_RESPONSE" | grep -o '"status":"[^"]*"' | cut -d'"' -f4)
echo "Last known status: $CURRENT_STATUS"
echo "Polling again for next status change..."

START_TIME=$(date +%s)
POLL_RESPONSE_2=$(curl -s "$SERVER_URL/poll-job-status?jobId=$JOB_ID&lastStatus=$CURRENT_STATUS")
END_TIME=$(date +%s)
DURATION_2=$((END_TIME - START_TIME))

echo ""
echo "📤 Second response received after $DURATION_2 seconds:"
echo "$POLL_RESPONSE_2"
echo ""

echo "🎯 Long Polling Pattern Demonstrated:"
echo "======================================"
echo "✅ Step 1: Client asked for status changes"
echo "✅ Step 2: Server HELD requests ($DURATION seconds & $DURATION_2 seconds)"
echo "✅ Step 3: Server responded immediately when status changed"
echo "✅ Step 4: Client continued polling for next changes"
echo ""
echo "🔄 Total requests made: 3 (create job + 2 status polls)"
echo "⏱️  Total wait time: $((DURATION + DURATION_2)) seconds"
echo ""
echo "💡 Compare with Short Polling:"
echo "- Short Polling: Would need ~$(((DURATION + DURATION_2) / 3)) requests every 3 seconds"
echo "- Long Polling: Only 2 requests that waited for actual changes"
