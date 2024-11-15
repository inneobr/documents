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


