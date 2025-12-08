@echo off
REM Portfolio Backup Script for Windows
REM Creates a local backup of your portfolio

set DATE=%date:~-4%%date:~3,2%%date:~0,2%-%time:~0,2%%time:~3,2%%time:~6,2%
set DATE=%DATE: =0%
set BACKUP_DIR=%USERPROFILE%\portfolio-backups
set BACKUP_NAME=portfolio-backup-%DATE%

echo 🔄 Creating portfolio backup...

REM Create backup directory
if not exist "%BACKUP_DIR%" mkdir "%BACKUP_DIR%"

REM Create backup using git
echo 📦 Archiving files...
git archive --format=zip --output="%BACKUP_DIR%\%BACKUP_NAME%.zip" HEAD

REM Backup assets
echo 🖼️  Backing up assets...
xcopy /E /I /Y public\assets "%BACKUP_DIR%\%BACKUP_NAME%-assets"

REM Backup data file
echo 📄 Backing up portfolio data...
copy src\data\portfolio.ts "%BACKUP_DIR%\%BACKUP_NAME%-data.ts"

REM Backup environment (if exists)
if exist .env (
  echo 🔐 Backing up environment variables...
  copy .env "%BACKUP_DIR%\%BACKUP_NAME%.env"
)

echo ✅ Backup complete!
echo 📁 Location: %BACKUP_DIR%\%BACKUP_NAME%.zip
echo.
echo Backup includes:
echo   - Source code archive
echo   - Assets folder
echo   - Portfolio data
echo   - Environment variables (if present)

pause
