#!/bin/bash

# Arcane Power Nexus - Status Dashboard
# Real-time monitoring and control center

clear
echo "🔮 ARCANE POWER NEXUS - STATUS DASHBOARD"
echo "========================================"
echo ""

# Function to get colored status
get_status() {
    if [ $1 -eq 0 ]; then
        echo "✅ ACTIVE"
    else
        echo "❌ INACTIVE"
    fi
}

# Function to check port
check_port() {
    lsof -i :$1 > /dev/null 2>&1
    return $?
}

# Function to check process
check_process() {
    pgrep -f "$1" > /dev/null 2>&1
    return $?
}

while true; do
    # Clear screen and show header
    clear
    echo "🔮 ARCANE POWER NEXUS - LIVE STATUS DASHBOARD"
    echo "=============================================="
    echo "📅 $(date)"
    echo ""
    
    # Port Status
    echo "🌐 PORT STATUS:"
    check_port 8080
    echo "   Port 8080 (Main App): $(get_status $?)"
    
    # Process Status
    echo ""
    echo "⚡ PROCESS STATUS:"
    check_process "vite.*8080"
    echo "   Vite Dev Server: $(get_status $?)"
    
    check_process "port-monitor"
    echo "   Port Monitor: $(get_status $?)"
    
    # System Resources
    echo ""
    echo "💻 SYSTEM RESOURCES:"
    echo "   Memory Usage: $(free -h | awk '/^Mem:/ {print $3 "/" $2}')"
    echo "   CPU Load: $(uptime | awk -F'load average:' '{print $2}')"
    
    # Network Status
    echo ""
    echo "🌍 NETWORK ACCESS:"
    echo "   Local: http://localhost:8080"
    echo "   Network: http://$(hostname -I | awk '{print $1}'):8080"
    
    # Active Connections
    echo ""
    echo "🔗 ACTIVE CONNECTIONS:"
    netstat -an | grep :8080 | grep ESTABLISHED | wc -l | xargs echo "   Connected clients:"
    
    # Last 5 lines of monitor log
    echo ""
    echo "📋 RECENT MONITOR ACTIVITY:"
    if [ -f "/tmp/arcane-port-monitor.log" ]; then
        tail -n 3 /tmp/arcane-port-monitor.log | sed 's/^/   /'
    else
        echo "   No monitor log found"
    fi
    
    echo ""
    echo "🎮 CONTROLS:"
    echo "   Press Ctrl+C to exit dashboard"
    echo "   The application continues running in background"
    echo ""
    echo "⚡ NEXT UPDATE IN 5 SECONDS..."
    
    sleep 5
done
