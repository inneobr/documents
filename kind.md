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
- role: worker-01
- role: worker-02
```
