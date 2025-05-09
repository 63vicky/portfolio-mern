#!/bin/bash

echo "Starting Portfolio Application..."

echo "Starting Backend Server..."
cd "$(dirname "$0")" && npm run dev &

echo "Starting Frontend Server..."
cd "$(dirname "$0")/portfolio-frontend" && npm run dev &

echo "Portfolio Application Started!"
echo "Backend: http://localhost:4000"
echo "Frontend: http://localhost:5173"
