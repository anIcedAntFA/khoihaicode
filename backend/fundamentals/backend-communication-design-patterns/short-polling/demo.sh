#!/bin/bash

# ===== SHORT POLLING DEMO SCRIPT =====
# This script demonstrates the Short Polling pattern using curl commands

echo "🚀 Starting Short Polling Demo..."
echo "Make sure the server is running on port 8080 first!"
echo "Run: ts-node polling.ts"
echo ""

# Step 1: Submit a job
echo "📤 Step 1: Submitting a new job..."
RESPONSE=$(curl -s -X POST http://localhost:8080/submit)
echo "Response: $RESPONSE"

# Extract jobId from response (simple extraction)
JOB_ID=$(echo $RESPONSE | grep -o '"jobId":"[^"]*"' | cut -d'"' -f4)
echo "📋 Job ID: $JOB_ID"
echo ""

if [ -z "$JOB_ID" ]; then
    echo "❌ Failed to get Job ID. Make sure server is running!"
    exit 1
fi

# Step 2: Poll for status multiple times
echo "🔄 Step 2: Polling for job status every 3 seconds..."
echo "This demonstrates the Short Polling pattern:"
echo ""

for i in {1..8}; do
    echo "📊 Poll #$i:"
    RESPONSE=$(curl -s "http://localhost:8080/check-status?jobId=$JOB_ID")
    echo "   $RESPONSE"
    
    # Check if job is completed
    if echo "$RESPONSE" | grep -q '"isComplete":true'; then
        echo "✅ Job completed!"
        break
    fi
    
    echo "   ⏳ Job still processing... will check again in 3 seconds"
    echo ""
    sleep 3
done

echo ""
echo "🎉 Short Polling Demo completed!"
echo ""
echo "📝 What happened:"
echo "1. Client submitted job and got Job ID immediately"
echo "2. Server started processing job asynchronously"
echo "3. Client repeatedly polled server for status updates"
echo "4. Server responded quickly with current progress each time"
echo "5. Process continued until job completion"
echo ""
echo "This is the essence of Short Polling! 🎯"
