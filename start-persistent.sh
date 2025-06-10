#!/bin/bash

# Arcane Power Nexus - Persistent Development Server
# This script ensures the server stays running on port 8080

echo "🔮 Starting Arcane Power Nexus - Persistent Mode"
echo "================================================"

# Function to cleanup on exit
cleanup() {
    echo ""
    echo "🛑 Shutting down Arcane Power Nexus..."
    kill $SERVER_PID 2>/dev/null
    exit 0
}

# Trap signals for cleanup
trap cleanup SIGINT SIGTERM

# Kill any existing processes on port 8080
echo "🧹 Cleaning up existing processes on port 8080..."
lsof -ti:8080 | xargs kill -9 2>/dev/null || true

# Update browser data
echo "📱 Updating browser compatibility data..."
npx update-browserslist-db@latest --silent

# Start the development server
echo "⚡ Starting development server on port 8080..."
cd /workspaces/arcane-power-nexus

# Set environment variables for stability
export VITE_HOST="::"
export VITE_PORT=8080
export NODE_ENV=development

# Start server in background and capture PID
npm run dev &
SERVER_PID=$!

echo "🚀 Server started with PID: $SERVER_PID"
echo "🌐 Application available at:"
echo "   → Local:   http://localhost:8080"
echo "   → Network: http://10.0.2.129:8080"
echo ""
echo "📝 Server logs:"
echo "----------------------------------------"

# Wait for server to start
sleep 3

# Check if server is running
if kill -0 $SERVER_PID 2>/dev/null; then
    echo "✅ Server is running successfully!"
    echo ""
    echo "💡 To stop the server, press Ctrl+C"
    echo "🔄 Server will auto-restart on file changes"
    echo ""
    
    # Keep script running and monitor server
    while kill -0 $SERVER_PID 2>/dev/null; do
        sleep 1
    done
    
    echo "❌ Server process died unexpectedly"
    exit 1
else
    echo "❌ Failed to start server"
    exit 1
fi
