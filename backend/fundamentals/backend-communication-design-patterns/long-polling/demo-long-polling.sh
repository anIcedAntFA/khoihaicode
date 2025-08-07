#!/bin/bash

# ===== LONG POLLING DEMO SCRIPT =====
# This script demonstrates Long Polling behavior with a chat server

echo "🚀 Long Polling Demo - Chat Message Server"
echo "=========================================="
echo ""

SERVER_URL="http://localhost:8080"

# Color codes for better output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if server is running
check_server() {
    echo -e "${BLUE}🔍 Checking if server is running...${NC}"
    if curl -s "$SERVER_URL/messages" > /dev/null 2>&1; then
        echo -e "${GREEN}✅ Server is running!${NC}"
        return 0
    else
        echo -e "${RED}❌ Server is not running!${NC}"
        echo -e "${YELLOW}💡 Please start the server first:${NC}"
        echo "   bun run long-polling.ts"
        return 1
    fi
}

# Main demo execution
main() {
    # Check if server is running
    if ! check_server; then
        exit 1
    fi
    
    echo ""
    echo -e "${BLUE}🎬 Starting Long Polling Demo...${NC}"
    echo ""
    
    # Demo 1: Show initial state
    echo -e "${YELLOW}=== Demo 1: Check Initial Messages ====${NC}"
    echo -e "${BLUE}� Getting current message count...${NC}"
    curl -s "$SERVER_URL/messages" | jq .
    echo ""
    
    # Demo 2: Start long polling in background
    echo -e "${YELLOW}=== Demo 2: Long Polling (Hold-and-Wait) ====${NC}"
    echo -e "${BLUE}⏳ Starting long poll request (will wait for new messages...)${NC}"
    
    # Start long polling in background
    curl -s "$SERVER_URL/poll-messages" > /tmp/long_poll_response.json &
    CURL_PID=$!
    echo -e "${YELLOW}� Long polling request started (PID: $CURL_PID)${NC}"
    echo -e "${YELLOW}⏰ This request will 'hang' until a message is sent or timeout (30s)${NC}"
    
    # Wait a bit
    sleep 3
    
    # Demo 3: Send a message to trigger response
    echo ""
    echo -e "${YELLOW}=== Demo 3: Trigger Long Poll Response ====${NC}"
    echo -e "${GREEN}� Sending a message to trigger all waiting clients...${NC}"
    
    MESSAGE_RESPONSE=$(curl -s -X POST "$SERVER_URL/send-message" \
        -H "Content-Type: application/json" \
        -d '{"content": "Hello from Long Polling Demo!"}')
    
    echo -e "${GREEN}✅ Message sent:${NC}"
    echo "$MESSAGE_RESPONSE" | jq .
    
    # Wait for long poll response
    echo ""
    echo -e "${BLUE}⏱️  Waiting for long poll response...${NC}"
    wait $CURL_PID
    
    echo -e "${GREEN}📤 Long poll response received:${NC}"
    cat /tmp/long_poll_response.json | jq .
    rm -f /tmp/long_poll_response.json
    
    echo ""
    echo -e "${GREEN}🎉 Demo completed!${NC}"
    echo ""
    echo -e "${BLUE}📊 Key Long Polling Characteristics Demonstrated:${NC}"
    echo "1. Client sent poll request and server HELD it open"
    echo "2. When message was sent, server immediately responded to waiting client"
    echo "3. No repeated polling needed - server notified client when data was ready"
    echo "4. Near real-time communication with minimal request overhead"
    echo ""
    echo -e "${YELLOW}💡 This demonstrates Long Polling's 'hold-and-wait' behavior!${NC}"
}

# Run the demo
main
