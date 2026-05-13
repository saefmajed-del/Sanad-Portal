@echo off
REM ============================================================
REM  Sanad Portal — One-click GitHub push helper
REM  Double-click this file in File Explorer to:
REM    1. Authenticate gh CLI using your stored Windows credential
REM    2. Create the sanad-portal repo on GitHub
REM    3. Push the current code
REM ============================================================

setlocal enabledelayedexpansion

echo.
echo ===  SANAD PORTAL — GitHub Push  ===
echo.

REM --- Step 1: Pull the stored GitHub token from Windows Credential Manager
echo [1/4] Reading stored GitHub credential...
for /f "tokens=2 delims==" %%a in ('"(echo protocol=https^& echo host=github.com^& echo.) | git credential fill 2^>nul | findstr /b password="') do set "GH_TOKEN_TEMP=%%a"

if "!GH_TOKEN_TEMP!"=="" (
  echo   ERROR: No stored credential found for github.com.
  echo   Please run 'gh auth login' manually or create a PAT.
  pause
  exit /b 1
)
echo   - Credential retrieved successfully.

REM --- Step 2: Authenticate gh CLI with the token
echo.
echo [2/4] Authenticating gh CLI...
echo !GH_TOKEN_TEMP! | gh auth login --with-token
if errorlevel 1 (
  echo   ERROR: gh auth failed.
  set "GH_TOKEN_TEMP="
  pause
  exit /b 1
)
echo   - gh authenticated.

REM --- Step 3: Create the repo on GitHub
echo.
echo [3/4] Creating sanad-portal repository on GitHub...
cd /d "%~dp0"

gh repo view saefmajed-del/sanad-portal >nul 2>&1
if errorlevel 1 (
  gh repo create sanad-portal --public --description "Saudi internal audit AI assistant — RASSED platform first module" --source=. --remote=origin --push
  if errorlevel 1 (
    echo   ERROR: gh repo create failed.
    set "GH_TOKEN_TEMP="
    pause
    exit /b 1
  )
  echo   - Repository created and pushed.
) else (
  echo   - Repository already exists, attempting push only...
  git remote remove origin 2>nul
  git remote add origin https://github.com/saefmajed-del/sanad-portal.git
  git push -u origin main
  if errorlevel 1 (
    echo   ERROR: Push failed.
    set "GH_TOKEN_TEMP="
    pause
    exit /b 1
  )
)

REM --- Step 4: Clear the token from environment
set "GH_TOKEN_TEMP="

echo.
echo [4/4] Done!
echo.
echo Your repository is live at:
echo   https://github.com/saefmajed-del/sanad-portal
echo.
pause
