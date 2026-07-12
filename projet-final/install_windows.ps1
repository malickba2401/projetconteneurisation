Write-Host "=============================================" -ForegroundColor Cyan
Write-Host "🚀 Installation de Docker Desktop et Kubectl via Winget" -ForegroundColor Cyan
Write-Host "=============================================" -ForegroundColor Cyan

Write-Host "`n[1/2] Installation de Docker Desktop (inclus Kubernetes)..." -ForegroundColor Yellow
winget install -e --id Docker.DockerDesktop --accept-source-agreements --accept-package-agreements
if ($LASTEXITCODE -ne 0) { Write-Error "Erreur lors de l'installation de Docker Desktop." }

Write-Host "`n[2/2] Installation de Kubectl..." -ForegroundColor Yellow
winget install -e --id Kubernetes.kubectl --accept-source-agreements --accept-package-agreements
if ($LASTEXITCODE -ne 0) { Write-Error "Erreur lors de l'installation de Kubectl." }

Write-Host "`n=============================================" -ForegroundColor Green
Write-Host "✅ Installation terminée !" -ForegroundColor Green
Write-Host "⚠️ IMPORTANT :" -ForegroundColor Red
Write-Host "1. Redémarrez votre ordinateur." -ForegroundColor White
Write-Host "2. Lancez Docker Desktop et allez dans les paramètres (Settings > Kubernetes) pour activer Kubernetes." -ForegroundColor White
Write-Host "3. Une fois Kubernetes démarré, vous pourrez lancer le script 'deploy.ps1 arona'." -ForegroundColor White
Write-Host "=============================================" -ForegroundColor Cyan
