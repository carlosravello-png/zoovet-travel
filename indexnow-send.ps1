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

$bodyBytes = [System.Text.Encoding]::UTF8.GetBytes($body)

try {
    $response = Invoke-RestMethod -Uri $Endpoint -Method Post -ContentType "application/json; charset=utf-8" -Body $bodyBytes
    Write-Host "IndexNow: $urlCount URLs enviadas correctamente." -ForegroundColor Green
    Write-Host "Respuesta: $response"
} catch {
    Write-Host "Error al enviar a IndexNow:" -ForegroundColor Red
    Write-Host $_.Exception.Message
    if ($_.Exception.Response) {
        $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
        $reader.BaseStream.Position = 0
        Write-Host $reader.ReadToEnd()
    }
    exit 1
}
