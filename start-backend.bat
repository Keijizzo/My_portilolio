@echo off
cd /d "%~dp0backend"
call venv\Scripts\activate.bat
echo Backend API: http://127.0.0.1:8000
echo API docs:    http://127.0.0.1:8000/api/profile/
echo Admin:       http://127.0.0.1:8000/admin/
python manage.py runserver
pause
