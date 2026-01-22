# Script de déploiement automatique avec cache busting
# Usage: .\deploy.ps1

Write-Host "🚀 Déploiement automatique avec cache busting..." -ForegroundColor Cyan

# 1. Extraire la version actuelle du fichier index.html
$indexContent = Get-Content -Path ".\index.html" -Raw
$versionMatch = $indexContent -match 'v=(\d+\.\d+\.\d+)'
if ($versionMatch) {
    $currentVersion = [version]$matches[1]
    $newVersion = [version]::new($currentVersion.Major, $currentVersion.Minor, $currentVersion.Build + 1)
    Write-Host "✅ Version actuelle: $currentVersion → Nouvelle: $newVersion" -ForegroundColor Green
} else {
    $newVersion = "1.0.2"
    Write-Host "⚠️  Aucune version trouvée, utilisant: $newVersion" -ForegroundColor Yellow
}

# 2. Remplacer les versions dans tous les fichiers HTML
$htmlFiles = Get-ChildItem -Path "." -Filter "*.html" -Recurse
foreach ($file in $htmlFiles) {
    $content = Get-Content -Path $file.FullName -Raw
    $updatedContent = $content -replace 'v=\d+\.\d+\.\d+', "v=$newVersion"
    Set-Content -Path $file.FullName -Value $updatedContent -NoNewline
    Write-Host "📝 Mis à jour: $($file.Name)" -ForegroundColor Cyan
}

# 3. Git commit et push
git add -A
git commit -m "Bump version to $newVersion - cache busting"
git push
Write-Host "✅ Git push complété" -ForegroundColor Green

# 4. Vider le cache Vercel et redéployer
Write-Host "🔄 Redéploiement sur Vercel..." -ForegroundColor Cyan
vercel --prod --force
Write-Host "✅ Déploiement terminé!" -ForegroundColor Green
