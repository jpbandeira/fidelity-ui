# Script para buildar imagem e aplicar deploy Kubernetes no Windows (PowerShell)

# === Variáveis ===
$dateTime = Get-Date -Format "yyyyMMdd-HHmm"
$imageBase = "fidelity-ui"
$imageTag = "${imageBase}:$dateTime"
$k8sPath = ".\k8s"
$deploymentFile = "$k8sPath\deployment.yaml"

# === Build da nova imagem ===
Write-Host "==> Gerando imagem com tag: $imageTag"
docker build -t $imageTag .

if ($LASTEXITCODE -ne 0) {
    Write-Error "Erro ao buildar a imagem Docker. Abortando."
    exit 1
}

# === Atualizar tag da imagem no YAML ===
Write-Host "==> Atualizando tag da imagem no deployment.yaml"
(Get-Content $deploymentFile) -replace "image: fidelity-ui:.*", "image: $imageTag" | Set-Content $deploymentFile

# === Aplicar os manifests no cluster ===
Write-Host "==> Aplicando manifests Kubernetes..."
kubectl apply -f "$k8sPath\namespace.yaml"
kubectl apply -f "$deploymentFile"
kubectl apply -f "$k8sPath\service.yaml"

if ($LASTEXITCODE -ne 0) {
    Write-Error "Erro ao aplicar manifests Kubernetes."
    exit 1
}

Write-Host "✅ Deploy realizado com sucesso com a imagem: $imageTag"
Write-Host "==> Limpando imagens Docker antigas..."

# === Manter apenas as 2 imagens mais recentes ===
$images = docker images --format "{{.Repository}}:{{.Tag}}" | Where-Object { $_ -like "${imageBase}:*" } | Sort-Object
if ($images.Count -gt 2) {
    $imagesToDelete = $images | Select-Object -First ($images.Count - 2)
    foreach ($img in $imagesToDelete) {
        Write-Host "Removendo imagem antiga: $img"
        docker rmi $img
    }
} else {
    Write-Host "Nenhuma imagem antiga para remover."
}

Write-Host "✅ Limpeza de imagens concluída."
Write-Host "Frontend estará disponível no nodePort definido no service."
