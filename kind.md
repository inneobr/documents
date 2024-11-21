## Download a instalation kink ubuntu linux.

1 - Download do kind
```
curl -Lo ./kind https://kind.sigs.k8s.io/dl/v0.11.1/kind-linux-amd64
```

2 - Permição de execução.
```
chmod +x kind
```

3 - Mover o arquivo para pasta bin do sustema
```
mv kind /usr/local/bin/
```

4 - Configurar o autocomplete do kind no bash 
```
source <(kind completion bash)
echo "source <(kind completion bash)" >> ~/.bashrc
```

5 - Create o arquivo ingress.yaml
```
kind: Cluster
apiVersion: kind.x-k8s.io/v1alpha4
nodes:
- role: control-plane
  extraPortMappings:
  - containerPort: 80
    hostPort: 80
    protocol: TCP
  - containerPort: 443
    hostPort: 443
    protocol: TCP
- role: worker
```

6 - Criar o cluster usando a configuração do ingress.yaml
```
kind create cluster --name cluster-local --config ingress.yaml
```

7 - Install kubectl
```
curl -LO https://dl.k8s.io/release/v1.31.0/bin/linux/amd64/kubectl
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl.sha256"
sudo install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl
```

8 - Instalação nginx
```
kubectl apply -f https://kind.sigs.k8s.io/examples/ingress/deploy-ingress-nginx.yaml
```

9 - Ver os nodes
```
kind get nodes --name cluster-local
```
