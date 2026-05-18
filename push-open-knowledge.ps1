# push-open-knowledge.ps1
# Corre este script desde la carpeta del repo: .\push-open-knowledge.ps1

Set-Location $PSScriptRoot

# 1. Eliminar lock file si quedó colgado
if (Test-Path ".git\index.lock") {
    Remove-Item ".git\index.lock" -Force
    Write-Host "Lock file eliminado." -ForegroundColor Yellow
}

# 2. Stage de los archivos modificados/nuevos
git add `
  articles/zoovet-conocimiento-abierto-transporte-mascotas-ES.html `
  articles/zoovet-open-knowledge-pet-transport-EN.html `
  articles/zoovet-connaissance-ouverte-transport-animaux-FR.html `
  index.html index-en.html index-fr.html `
  about.html about-en.html about-fr.html `
  sitemap.xml

Write-Host "`nArchivos staged:" -ForegroundColor Cyan
git status --short

# 3. Commit
git commit -m "feat: 3 editorial pages open knowledge (ES/EN/FR) + sitemap + series DOI OSF

- Add 3 new article pages declaring Zoovet open knowledge commitment
  * articles/zoovet-conocimiento-abierto-transporte-mascotas-ES.html
  * articles/zoovet-open-knowledge-pet-transport-EN.html
  * articles/zoovet-connaissance-ouverte-transport-animaux-FR.html
- Full SEO stack: canonical, hreflang, OG, Twitter Card, Highwire Press,
  Dublin Core, JSON-LD Article schema, WhatsApp float button
- Authors: Jessica Ysabel Camcho Garcia (CMVP 12434, ORCID 0009-0002-6837-5311)
  + Carlos Eduardo Ravello Joo (Regulatory Affairs & Knowledge Systems, ORCID 0009-0007-5631-7436)
- Update CreativeWorkSeries in all 6 index/about pages:
  * identifier: doi.org/10.17605/OSF.IO/85BDT
  * sameAs array with OSF DOI
  * contributor node for Carlos
- Redesign base-conocimiento HTML section in all 6 files (label + h2 + description + buttons)
- sitemap.xml: +3 article URLs (priority 0.8, changefreq monthly)"

# 4. Push
git push origin main

Write-Host "`n✅ Push completado." -ForegroundColor Green

# 5. IndexNow para las 3 nuevas URLs
Write-Host "`nEnviando IndexNow para las 3 nuevas URLs..." -ForegroundColor Cyan
$body = @{
    host = "zoovettravel.com"
    key = "4bfe05a4de774d39ae611c9654b56587"
    keyLocation = "https://zoovettravel.com/4bfe05a4de774d39ae611c9654b56587.txt"
    urlList = @(
        "https://zoovettravel.com/articles/zoovet-conocimiento-abierto-transporte-mascotas-ES.html",
        "https://zoovettravel.com/articles/zoovet-open-knowledge-pet-transport-EN.html",
        "https://zoovettravel.com/articles/zoovet-connaissance-ouverte-transport-animaux-FR.html"
    )
} | ConvertTo-Json

$response = Invoke-WebRequest -Uri "https://api.indexnow.org/indexnow" `
    -Method POST `
    -ContentType "application/json; charset=utf-8" `
    -Body $body

Write-Host "IndexNow response: $($response.StatusCode)" -ForegroundColor Green
