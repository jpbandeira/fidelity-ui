# Script para buildar imagem e aplicar deploy Kubernetes no Windows (PowerShell)

# Variáveis
$imageName = "fidelity-ui:local"
$k8sPath = ".\k8s"   # caminho da pasta com os manifests

Write-Host "==> Construindo a imagem Docker: $imageName ..."
docker build -t $imageName .

if ($LASTEXITCODE -ne 0) {
    Write-Error "Erro ao buildar a imagem Docker. Abortando."
    exit 1
}

Write-Host "==> Aplicando manifests Kubernetes..."

kubectl apply -f "$k8sPath\namespace.yaml"
kubectl apply -f "$k8sPath\deployment.yaml"
kubectl apply -f "$k8sPath\service.yaml"

if ($LASTEXITCODE -ne 0) {
    Write-Error "Erro ao aplicar manifests Kubernetes."
    exit 1
}

Write-Host "Deploy realizado com sucesso!"
Write-Host "Frontend estará disponível no nodePort definido no service."
