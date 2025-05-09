@echo off
echo Starting Portfolio Application...

echo Starting Backend Server...
start cmd /k "cd %~dp0 && npm run dev"

echo Starting Frontend Server...
start cmd /k "cd %~dp0portfolio-frontend && npm run dev"

echo Portfolio Application Started!
echo Backend: http://localhost:4000
echo Frontend: http://localhost:5173
