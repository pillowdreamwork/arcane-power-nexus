#!/bin/bash

# Port Monitor for Arcane Power Nexus
# Ensures port 8080 stays active and restarts if needed

PORT=8080
LOG_FILE="/tmp/arcane-port-monitor.log"

echo "🔮 Port Monitor Started - Watching port $PORT" | tee -a $LOG_FILE
echo "📅 $(date)" | tee -a $LOG_FILE

# Function to check if port is active
check_port() {
    if lsof -Pi :$PORT -sTCP:LISTEN -t >/dev/null 2>&1; then
        return 0  # Port is active
    else
        return 1  # Port is not active
    fi
}

# Function to restart server
restart_server() {
    echo "🔄 Restarting server on port $PORT..." | tee -a $LOG_FILE
    cd /workspaces/arcane-power-nexus
    
    # Kill existing processes
    pkill -f "vite.*8080" 2>/dev/null
    sleep 2
    
    # Start new server
    npm run dev:stable &
    sleep 5
    
    if check_port; then
        echo "✅ Server restarted successfully" | tee -a $LOG_FILE
    else
        echo "❌ Failed to restart server" | tee -a $LOG_FILE
    fi
}

# Monitor loop
while true; do
    if check_port; then
        echo "✅ Port $PORT is active - $(date)" >> $LOG_FILE
    else
        echo "⚠️  Port $PORT is down - $(date)" | tee -a $LOG_FILE
        restart_server
    fi
    
    sleep 30  # Check every 30 seconds
done
