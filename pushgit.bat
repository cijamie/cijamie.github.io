@echo off
title "Portfolio Git Sync - cijamie.github.io"
echo ================================================================
echo         CIJAMIE GITHUB.IO PORTFOLIO
echo                  SYNCHRONIZATION UTILITY v2.2
echo ================================================================
echo.

echo [1/7] Detecting repo state...
git status --porcelain | findstr . >nul
if %errorlevel% neq 0 goto :clean

echo [2/7] Changes detected - creating temp commit...
git add -A
git commit -m "TEMP: auto-staged changes before sync" || goto :committed

:staged
echo [3/7] Pulling remote changes with rebase...
git pull --rebase origin main

if %errorlevel% neq 0 (
    echo.
    echo [CONFLICT] Resolve manually: git add . && git rebase --continue
    pause
    exit /b 1
)

echo [4/7] Removing temp commit...
git reset --soft HEAD~1

:committed
echo [5/7] Checking for final changes...
git status --porcelain | findstr . >nul
if %errorlevel% neq 0 (
    echo No changes to commit.
    goto :push
)

echo [6/7] Staging and committing...
git add -A
set /p msg="[ENTER COMMIT MESSAGE]: " || set msg="Portfolio updates [Auto Sync]"
git commit -m "%msg%"

:push
echo [7/7] Pushing to origin/main...
git push origin main

if %errorlevel% equ 0 (
    echo.
    echo [ SUCCESS - Portfolio synced! ]
) else (
    echo [ PUSH FAILED - Run: git pull --rebase origin main && git push ]
)

echo.
pause
