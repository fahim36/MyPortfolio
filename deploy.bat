@echo off
echo ================================
echo  Portfolio Deployment Script
echo ================================
echo.

REM Check if git is initialized
if not exist ".git" (
    echo Initializing Git repository...
    git init
    echo.
)

REM Add all files
echo Adding files to git...
git add .
echo.

REM Get commit message from user
set /p commit_msg="Enter commit message (or press Enter for default): "
if "%commit_msg%"=="" set commit_msg="Update portfolio website"

REM Commit changes
echo Committing changes...
git commit -m "%commit_msg%"
echo.

REM Check if remote exists
git remote | findstr origin >nul
if errorlevel 1 (
    echo.
    echo ============================================
    echo  FIRST TIME SETUP REQUIRED
    echo ============================================
    echo 1. Create a repository on GitHub
    echo 2. Copy the repository URL
    echo 3. Run this command with your URL:
    echo.
    echo    git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
    echo.
    echo Then run this script again.
    echo ============================================
    pause
    exit /b
)

REM Push to GitHub
echo Pushing to GitHub...
git push -u origin main
echo.

echo ================================
echo  Deployment Complete!
echo ================================
echo.
echo Your portfolio should be live at:
echo https://YOUR-USERNAME.github.io
echo.
echo (Replace YOUR-USERNAME with your actual GitHub username)
echo.
pause
