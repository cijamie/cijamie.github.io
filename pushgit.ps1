git pull origin main
git add -A
$msg = Read-Host "Enter commit message"
git commit -m "$msg"
git push origin main
Write-Host "Pushed successfully!"
