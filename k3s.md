## Servidor Linux windows

[1] Instalar o wsl
```
wsl --install
```  
[2] Listar os sistemas operacionais disponiveis para instalação.
```
wsl --list --online
```
[3] Instalar a versão escolhida, pode substituir o ubuntu por uma de sua escolha.
```
wsl --install Ubuntu-22.04
```

[4] instalação K3S
```
curl -sfL https://get.k3s.io | bash
```

[5] instalação do helm
```
curl -fsSL https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash
```
