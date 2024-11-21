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
echo "source <(kind completion bash)" >> ../.bashrc
```
