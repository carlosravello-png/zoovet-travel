# ============================================================================
# COMMIT-INTERLINKS-ZOOPEDIA.ps1
# Genera el commit con los interlinks aplicados en 60 fichas de zoopedia,
# sin tocar tus cambios pendientes (about*, kennels*, zoopedia/index*, indexnow*).
#
# Uso: clic derecho → "Ejecutar con PowerShell"
#      o desde PowerShell:  .\COMMIT-INTERLINKS-ZOOPEDIA.ps1
# ============================================================================

$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot

Write-Host "=== Paso 1: limpiar index.lock huérfano (si existe) ===" -ForegroundColor Cyan
if (Test-Path .git\index.lock) {
    Remove-Item .git\index.lock -Force
    Write-Host "  Lock eliminado." -ForegroundColor Green
} else {
    Write-Host "  No hay lock pendiente." -ForegroundColor Green
}

Write-Host ""
Write-Host "=== Paso 2: verificar branch actual ===" -ForegroundColor Cyan
$branch = git branch --show-current
Write-Host "  Branch actual: $branch"
if ($branch -ne "seo-fix-2026-04-30") {
    Write-Host "  ! No estás en seo-fix-2026-04-30. Cambiando..." -ForegroundColor Yellow
    git checkout seo-fix-2026-04-30
}

Write-Host ""
Write-Host "=== Paso 3: stage SELECTIVO de los 60 archivos zoopedia + script + log ===" -ForegroundColor Cyan
git add zoopedia/australia*.html zoopedia/brasil*.html zoopedia/canada*.html zoopedia/chile*.html `
        zoopedia/china*.html zoopedia/corea-del-sur*.html zoopedia/eau*.html zoopedia/eeuu*.html `
        zoopedia/espana*.html zoopedia/francia*.html zoopedia/india*.html zoopedia/italia*.html `
        zoopedia/japon*.html zoopedia/mexico*.html zoopedia/nueva-zelanda*.html zoopedia/reino-unido*.html `
        zoopedia/rusia*.html zoopedia/singapur*.html zoopedia/sudafrica*.html zoopedia/union-europea*.html
git add scripts/interlink_zoopedia.py
git add docs/INTERLINKS_ZOOPEDIA_LOG_2026-04-30.json

Write-Host ""
Write-Host "=== Paso 4: verificar que tus pendientes NO estén staged ===" -ForegroundColor Cyan
Write-Host "  Estos deben aparecer como 'Changes not staged' (NO van al commit):"
git status --short | Select-String "^ M (about|kennels|indexnow|zoopedia/index)"

Write-Host ""
Write-Host "=== Paso 5: archivos que SÍ se van a commitear ===" -ForegroundColor Cyan
git status --short | Select-String "^[AM] " | Select-Object -First 70

Write-Host ""
$confirm = Read-Host "Procedo con el commit + merge a main + push? (s/N)"
if ($confirm -ne "s" -and $confirm -ne "S") {
    Write-Host "Abortado por el usuario. Los archivos quedan staged listos." -ForegroundColor Yellow
    exit 0
}

Write-Host ""
Write-Host "=== Paso 6: commit ===" -ForegroundColor Cyan
$commitMessage = @"
feat(seo): interlinking editorial trilingue en 60 fichas zoopedia (+744 enlaces)

- Anchors descriptivos sobre texto editorial existente (no inventa contenido)
- Cross-links entre fichas pais del mismo idioma
- Cross-links a articles/ (microchip, vacuna antirrabica, cuarentena, expediente, braquicefalos, jet lag, RNATT, desparasitacion)
- Cross-links a articulos-interes/ por pais (USA, Japon, UK, Chile, Espana, Australia, Canada)
- Maximo 2 enlaces por parrafo, maximo 2 al mismo destino por archivo
- Sin tocar <head>, canonical, hreflang, JSON-LD ni H1/H2/H3
- Log: docs/INTERLINKS_ZOOPEDIA_LOG_2026-04-30.json
"@
git commit -m $commitMessage

Write-Host ""
Write-Host "=== Paso 7: merge a main + push ===" -ForegroundColor Cyan
git checkout main
git merge seo-fix-2026-04-30 --no-ff -m "Merge branch 'seo-fix-2026-04-30': interlinking zoopedia"
git push origin main

Write-Host ""
Write-Host "=== HECHO ===" -ForegroundColor Green
Write-Host "Push a origin/main completado."
Write-Host "Tus cambios pendientes (about/kennels/zoopedia-index/indexnow) siguen en working directory sin tocar."
