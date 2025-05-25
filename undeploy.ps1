# Script PowerShell para undeploy completo do frontend fidelity-ui no Kubernetes

# Nome do namespace
$namespace = "fidelity-ui"

Write-Host "==> Deletando namespace: $namespace ..."
kubectl delete namespace $namespace

Write-Host "==> Removendo imagem Docker local: fidelity-ui:local ..."
docker rmi fidelity-ui:local -f

Write-Host "==> Undeploy finalizado."
