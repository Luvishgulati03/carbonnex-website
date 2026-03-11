$ProjectDir = "c:\Users\Luvish\OneDrive\Desktop\carbonnex-website\carbonnex-website"
$LogFile = "$ProjectDir\serveo_links.log"

# Clear old log
"Starting Servers and Serveo... $(Get-Date) `r`n----------------------------------------" | Out-File -FilePath $LogFile -Encoding utf8

# 1. Start/Ensure Database Service is Running
Write-Host "Ensuring MySQL Database is running..."
try {
    Start-Service -Name "MySQL84" -ErrorAction SilentlyContinue
    Write-Host "Database started successfully."
} catch {
    Write-Host "MySQL service check complete (may require admin if not already running)."
}

# 2. Start Backend Server
Write-Host "Starting Backend (Port 5000)..."
Start-Process "cmd.exe" -ArgumentList "/k cd /d `"$ProjectDir\website-backend`" && npm start" -WindowStyle Minimized

# 3. Start Frontend Server
Write-Host "Starting Frontend (Port 5179)..."
Start-Process "cmd.exe" -ArgumentList "/k cd /d `"$ProjectDir\frontend`" && npm run dev -- --host" -WindowStyle Minimized

# Wait for local servers
Start-Sleep -Seconds 5

# 4. Start Backend Serveo Tunnel
Write-Host "Starting Backend Serveo Tunnel..."
Start-Process "powershell.exe" -ArgumentList "-WindowStyle Minimized -Command `"`$Output = ssh -T -o StrictHostKeyChecking=no -o ServerAliveInterval=60 -R 80:localhost:5000 serveo.net 2>&1; `$Output | Out-File -FilePath '$ProjectDir\backend_serveo.log' -Encoding utf8`"" 

# 5. Start Frontend Serveo Tunnel
Write-Host "Starting Frontend Serveo Tunnel..."
Start-Process "powershell.exe" -ArgumentList "-WindowStyle Minimized -Command `"`$Output = ssh -T -o StrictHostKeyChecking=no -o ServerAliveInterval=60 -R 80:localhost:5179 serveo.net 2>&1; `$Output | Out-File -FilePath '$ProjectDir\frontend_serveo.log' -Encoding utf8`""

Write-Host "Waiting for SSH tunnels to establish..."
Start-Sleep -Seconds 8

# Extract Links
"`r`n=== YOUR LIVE LINKS ===" | Add-Content -Path $LogFile

"`r`n[FRONTEND LINK]:" | Add-Content -Path $LogFile
if (Test-Path "$ProjectDir\frontend_serveo.log") {
    Select-String -Path "$ProjectDir\frontend_serveo.log" -Pattern "Forwarding HTTP traffic from" | ForEach-Object { $_.Line } | Add-Content -Path $LogFile
} else {
    "Frontend Serveo establishing, check log file later." | Add-Content -Path $LogFile
}

"`r`n[BACKEND LINK]:" | Add-Content -Path $LogFile
if (Test-Path "$ProjectDir\backend_serveo.log") {
    Select-String -Path "$ProjectDir\backend_serveo.log" -Pattern "Forwarding HTTP traffic from" | ForEach-Object { $_.Line } | Add-Content -Path $LogFile
} else {
    "Backend Serveo establishing, check log file later." | Add-Content -Path $LogFile
}

"`r`n----------------------------------------`r`nIMPORTANT: Update frontend API_URL to match the new Backend Link above if needed." | Add-Content -Path $LogFile

# Open Log
Invoke-Item $LogFile

Write-Host "Deployment complete! Opening links log..."
