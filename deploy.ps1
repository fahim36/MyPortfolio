# Portfolio Deployment Script for PowerShell
Write-Host "================================" -ForegroundColor Cyan
Write-Host " Portfolio Deployment Script" -ForegroundColor Cyan  
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

# Check if git is initialized
if (-not (Test-Path ".git")) {
    Write-Host "Initializing Git repository..." -ForegroundColor Yellow
    git init
    Write-Host ""
}

# Add all files
Write-Host "Adding files to git..." -ForegroundColor Green
git add .
Write-Host ""

# Get commit message from user
$commitMsg = Read-Host "Enter commit message (or press Enter for default)"
if ([string]::IsNullOrEmpty($commitMsg)) {
    $commitMsg = "Update portfolio website"
}

# Commit changes
Write-Host "Committing changes..." -ForegroundColor Green
git commit -m $commitMsg
Write-Host ""

# Check if remote exists
$remoteExists = git remote | Select-String "origin"
if (-not $remoteExists) {
    Write-Host ""
    Write-Host "============================================" -ForegroundColor Red
    Write-Host " FIRST TIME SETUP REQUIRED" -ForegroundColor Red
    Write-Host "============================================" -ForegroundColor Red
    Write-Host "1. Create a repository on GitHub"
    Write-Host "2. Copy the repository URL"
    Write-Host "3. Run this command with your URL:"
    Write-Host ""
    Write-Host "   git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Then run this script again."
    Write-Host "============================================" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit
}

# Push to GitHub
Write-Host "Pushing to GitHub..." -ForegroundColor Green
git push -u origin main
Write-Host ""

Write-Host "================================" -ForegroundColor Green
Write-Host " Deployment Complete!" -ForegroundColor Green
Write-Host "================================" -ForegroundColor Green
Write-Host ""
Write-Host "Your portfolio should be live at:" -ForegroundColor Cyan
Write-Host "https://YOUR-USERNAME.github.io" -ForegroundColor Yellow
Write-Host ""
Write-Host "(Replace YOUR-USERNAME with your actual GitHub username)" -ForegroundColor Gray
Write-Host ""
Read-Host "Press Enter to exit"
