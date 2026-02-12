@echo off
REM Carters Care Platform - Installation Script
REM This script sets up the application

echo.
echo ========================================
echo Carters Care Group - Platform Setup
echo ========================================
echo.

set "APP_DIR=%~dp0"
set "APP_NAME=Carters Care Platform"

echo Installing %APP_NAME%...
echo Location: %APP_DIR%
echo.

if not exist "%APP_DIR%index.html" (
    echo ERROR: Application files not found!
    echo Please ensure this script is in the Carters_Care_Platform directory.
    pause
    exit /b 1
)

echo Creating application directories...
if not exist "%APP_DIR%src\css" mkdir "%APP_DIR%src\css"
if not exist "%APP_DIR%src\js" mkdir "%APP_DIR%src\js"

echo.
echo ========================================
echo Installation Complete!
echo ========================================
echo.
echo To start using the application:
echo 1. Double-click index.html
echo 2. Or right-click index.html and select "Open with" your browser
echo.
echo.
echo Quick Start Tips:
echo - Go to Settings to configure your organization
echo - Add Clients from the Clients menu
echo - Add Staff from the Staff menu
echo - Create Shifts from the Schedule menu
echo.
echo For more information, see README.md
echo.
pause
