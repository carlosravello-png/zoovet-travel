# indexnow-send.ps1
# Envía las URLs del archivo 'urls' a IndexNow (Bing, Yandex, etc.)

$HostName = "zoovettravel.com"
$Key = "4bfe05a4de774d39ae611c9654b56587"
$KeyLocation = "https://zoovettravel.com/4bfe05a4de774d39ae611c9654b56587.txt"
$UrlsFile = Join-Path $PSScriptRoot "urls"
$Endpoint = "https://api.indexnow.org/IndexNow"

if (-not (Test-Path $UrlsFile)) {
    Write-Error "No se encuentra el archivo 'urls'. Ejecuta el script desde la raíz del proyecto."
    exit 1
}

$urlList = @(Get-Content $UrlsFile -Encoding UTF8 | Where-Object { $_.Trim() -ne "" })
$urlCount = $urlList.Count

Write-Host "Leyendo $urlCount URLs desde 'urls'..." -ForegroundColor Cyan

$body = @{
    host        = $HostName
    key         = $Key
    keyLocation = $KeyLocation
    urlList     = $urlList
} | ConvertTo-Json -Depth 10 -Compress

$jsonFile = Join-Path $env:TEMP "indexnow-payload.json"
[System.IO.File]::WriteAllText($jsonFile, $body, [System.Text.Encoding]::UTF8)

Write-Host "Enviando a IndexNow (timeout 60s)..." -ForegroundColor Cyan

try {
    $curlOutput = & curl.exe -s -w "`n%{http_code}" -X POST $Endpoint -H "Content-Type: application/json; charset=utf-8" -d "@$jsonFile" --connect-timeout 15 --max-time 60 2>&1
    Remove-Item $jsonFile -Force -ErrorAction SilentlyContinue
    $lines = $curlOutput -split "`n"
    $httpCode = $lines[-1]
    $response = ($lines[0..($lines.Length-2)] -join "`n").Trim()
    if ($httpCode -match "200|202") {
        Write-Host "IndexNow: $urlCount URLs enviadas correctamente. (HTTP $httpCode)" -ForegroundColor Green
        if ($response) { Write-Host $response }
    } else {
        Write-Host "IndexNow devolvió HTTP $httpCode" -ForegroundColor Yellow
        Write-Host $response
        exit 1
    }
} catch {
    Remove-Item $jsonFile -Force -ErrorAction SilentlyContinue
    Write-Host "Error: $_" -ForegroundColor Red
    exit 1
}
