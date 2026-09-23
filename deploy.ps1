# Vérifications avant publication.
#
# Ce script NE publie PAS et NE pousse RIEN : il vérifie. La publication reste une décision
# explicite (git push, ou le bouton de ton hébergeur). L'ancienne version committait et
# poussait toute seule après un `npm run minify` qui n'existait pas — donc elle échouait
# avant même de commencer.
#
# Usage : .\deploy.ps1

$ErrorActionPreference = "Stop"

function Step($label) { Write-Host "`n→ $label" -ForegroundColor Cyan }
function Ok($label) { Write-Host "  OK  $label" -ForegroundColor Green }
function Fail($label) { Write-Host "  KO  $label" -ForegroundColor Red }

Step "Feuille de styles Tailwind"
npm run build:css
if ($LASTEXITCODE -ne 0) { Fail "build:css a échoué"; exit 1 }
Ok "assets/css/tailwind.min.css régénéré"

Step "Cohérence du contenu et des tarifs"
npm run check:content
if ($LASTEXITCODE -ne 0) { Fail "check:content a échoué"; exit 1 }
Ok "contenu cohérent"

Step "Plan du site"
npm run build:sitemap
if ($LASTEXITCODE -ne 0) { Fail "build:sitemap a échoué"; exit 1 }
Ok "sitemap.xml régénéré"

Step "Syntaxe JavaScript"
$jsFiles = Get-ChildItem -Path "assets/js", "scripts" -Filter "*.js" -Recurse -File
$broken = 0
foreach ($file in $jsFiles) {
    node --check $file.FullName 2>$null
    if ($LASTEXITCODE -ne 0) { Fail $file.Name; $broken++ }
}
if ($broken -gt 0) { exit 1 }
Ok "$($jsFiles.Count) fichier(s) valides"

Step "Fichiers indispensables"
$required = @("404.html", "robots.txt", "sitemap.xml", "site.webmanifest", "vercel.json")
foreach ($f in $required) {
    if (-not (Test-Path $f)) { Fail "$f manquant"; exit 1 }
}
Ok "tous présents"

Step "État du dépôt"
$changes = git status --short
if ($changes) {
    Write-Host "  Modifications non committées :" -ForegroundColor Yellow
    $changes | ForEach-Object { Write-Host "    $_" -ForegroundColor Yellow }
} else {
    Ok "arbre de travail propre"
}

Write-Host "`nVérifications terminées. Pour publier :" -ForegroundColor Cyan
Write-Host "  git add -A ; git commit -m ""votre message"" ; git push" -ForegroundColor White
Write-Host "GitHub Pages et Vercel se déclenchent seuls sur le push.`n" -ForegroundColor Gray
