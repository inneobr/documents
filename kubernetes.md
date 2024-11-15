# CONFIGURAÇÃO SERVIDOR KUBERNETES

> [!NOTE]
> Configuração de cluster kubernets em servidor ubuntu

### 01 - Atualizar as máquinas

```
   apt-get update
   apt-get upgrade
```

### 02 - Renomear as máquinas
   
- master
```
 hostname master
 echo "master" > /etc/hostname
 bash
```
- worker-01
```
 hostname worker-01
 echo "worker-01" > /etc/hostname
 bash
```
- worker-02
```
 hostname worker-02
 echo "worker-02" > /etc/hostname
 bash
```

### 03 - Configurar ip fixo nas máquinas
```
   cd /etc/netplan
   cp 50-cloud-init.yaml 50-cloud-init.yaml.old
   nano 50-cloud-init.yaml
```
> [!NOTE]
> Configuração da interface de rede com novo ip conforme sua rede.

- master
```
   network:
       version: 2
       ethernets:
           ens33:
               dhcp4: no
               dhcp6: true
               addresses: [10.1.1.100/24]
               routes:
               - to: default
                 via: 10.1.1.1
               nameservers:
                 addresses: [10.1.1.1,8.8.8.8]
```
- worker-01
```
   network:
       version: 2
       ethernets:
           ens33:
               dhcp4: no
               dhcp6: true
               addresses: [10.1.1.101/24]
               routes:
               - to: default
                 via: 10.1.1.1
               nameservers:
                 addresses: [10.1.1.1,8.8.8.8]
```
- worker-02
```
   network:
       version: 2
       ethernets:
           ens33:
               dhcp4: no
               dhcp6: true
               addresses: [10.1.1.102/24]
               routes:
               - to: default
                 via: 10.1.1.1
               nameservers:
                 addresses: [10.1.1.1,8.8.8.8]
```

- Testar as configurações e aplicar novo endereço de rede
```
   netplan try
   netplan apply
   ip addr show
```

### 04 - Configurar host nas máquinas
```
   # K8S kubernets cluster nodes
   
   10.1.1.100   master.inneo.org     master
   10.1.1.101   worker-01.inneo.org   worker-01
   10.1.1.102   worker-02.inneo.org   worker-02
```
### 05 - Desativar swap nas máquinas
```
   swapoff -a
   free -h   
```
- Comenta a linha do swap no fstab
```
   nano /etc/fstab
```
- Finaliza remontando as partições e confere o resultado que devera aparecer Swap: 0B 0B 0B
```
   mount -a
   free -h
```

### 06 - Carregar os modulos no kernel das máquinas
```
   tee /etc/modules-load.d/containerd.conf <<EOF
   overlay
   br_netfilter
   EOF
```

- Aceita as configurações
```
   modprobe overlay
   modprobe br_netfilter
```

- Configura o cgroup no kubernates
```
tee /etc/sysctl.d/kubernetes.conf <<EOF
net.bridge.bridge-nf-call-ip6tables = 1
net.bridge.bridge-nf-call-iptables = 1
net.ipv4.ip_forward = 1
EOF
```
- Aplica as alterações do cgroup
```
   sysctl --system
```

### 07 - Instalação do docker nas máquinas
```
   apt install -y curl gnupg2 software-properties-common apt-transport-https ca-certificates
   curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmour -o /etc/apt/trusted.gpg.d/docker.gpg
   add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
   apt update
   apt install -y containerd.io
```

### 08 - Configura o containerd nas máquinas
```
   containerd config default | sudo tee /etc/containerd/config.toml >/dev/null 2>&1
   sed -i 's/SystemdCgroup \= false/SystemdCgroup \= true/g' /etc/containerd/config.toml
   systemctl restart containerd
   systemctl enable containerd
```

### 09 - Adicionar repositorio e instalar o kubernets nas máquinas
```
   apt-get install -y apt-transport-https ca-certificates curl
   curl -fsSL https://pkgs.k8s.io/core:/stable:/v1.29/deb/Release.key | sudo gpg --dearmor -o /etc/apt/keyrings/kubernetes-apt-keyring.gpg
   echo 'deb [signed-by=/etc/apt/keyrings/kubernetes-apt-keyring.gpg] https://pkgs.k8s.io/core:/stable:/v1.29/deb/ /' | sudo tee /etc/apt/sources.list.d/kubernetes.list
   apt-get update
   apt-get install -y kubelet kubeadm kubectl
   apt-mark hold kubelet kubeadm kubectl
```
- Iniciar o kubeadm no servidor master
```
   kubeadm init \
  --pod-network-cidr=10.10.0.0/16 \
  --control-plane-endpoint=master
```

- Realizar as configurações do servidor conforme kubernets sugere
```
   mkdir -p $HOME/.kube
   sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
   sudo chown $(id -u):$(id -g) $HOME/.kube/config
```

- Conecta os work pods worker-01 e worker-02 ao servidor master, usar a chave que o seu kubernets master gerou 
```
 kubeadm join 10.1.1.100:6443 --token f9hl89.23b2dmx6w0xvtbbm \
        --discovery-token-ca-cert-hash sha256:2c9d5da3a496ebc68d879671cae165dc0d0bcc9b2e09be60e4752761764f9c5f
```

- Consulta se esta tudo funcinando e confere os nodes que provavelmente estarão como NotReading
```
   kubectl cluster-info
   kubectl get nodes
```

- Baixa o arquivo de configuração do calico
```
   curl https://raw.githubusercontent.com/projectcalico/calico/v3.25.0/manifests/calico.yaml -O
```

- Edita o arquivo para iniciar os pods
```
   nano calico.yaml
```
> [!NOTE]
> Faz a busca do CALICO_IPV4POOL_CIDR e descomenta as linhas
```
   # no effect. This should fall within `--cluster-cidr`.
   - name: CALICO_IPV4POOL_CIDR
    value: "10.10.0.0/16"

   # Disable file logging so `kubectl logs` works.
   - name: CALICO_DISABLE_FILE_LOGGING
    value: "true"
```

- Aplica as configurações do calico
```
   kubectl apply -f calico.yam
   kubectl get nodes
```

### 10 Para adicionar novos works você deve gerar um novo token pois os mesmos tem validade e não podem ser usados no futuro
```
   kubeadm token create --print-join-command
```







