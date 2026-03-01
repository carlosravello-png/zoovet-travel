@echo off
cd /d "%~dp0"
echo Enviando URLs a IndexNow...
curl.exe -X POST "https://api.indexnow.org/IndexNow" -H "Content-Type: application/json; charset=utf-8" -d "@indexnow-payload.json" --connect-timeout 15 --max-time 60 -w "\nHTTP: %%{http_code}\n"
echo.
pause
