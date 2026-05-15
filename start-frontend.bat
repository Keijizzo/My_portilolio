@echo off
cd /d "%~dp0frontend"

REM Use Node.js even when PATH was not refreshed after install
set "NODE_DIR=C:\Program Files\nodejs"
if exist "%NODE_DIR%\npm.cmd" (
  set "PATH=%NODE_DIR%;%PATH%"
) else (
  echo.
  echo ERROR: Node.js not found at "%NODE_DIR%"
  echo Install from https://nodejs.org/ then run this script again.
  echo.
  pause
  exit /b 1
)

if not exist node_modules (
  echo Installing dependencies...
  call "%NODE_DIR%\npm.cmd" install
  if errorlevel 1 pause & exit /b 1
)

echo.
echo Frontend: http://localhost:5173
echo Backend should be running at http://127.0.0.1:8000
echo.
call "%NODE_DIR%\npm.cmd" run dev
pause
