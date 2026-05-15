@echo off
set "NODE_DIR=C:\Program Files\nodejs"
set "PATH=%NODE_DIR%;%PATH%"
cd /d "%~dp0"

if not exist node_modules (
  echo Installing dependencies...
  "%NODE_DIR%\npm.cmd" install
)

echo Starting frontend at http://localhost:5173
"%NODE_DIR%\npm.cmd" run dev
