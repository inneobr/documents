# CONFIGURAÇÃO SERVIDOR KUBERNETES

> [!NOTE]
> Configuração de cluster kubernets em servidor ubuntu

1. Renomear as máquinas
   
### master
```
 hostname master
 echo "master" > /etc/hostname
 bash
```
### worker-01
```
 hostname worker-01
 echo "worker-01" > /etc/hostname
 bash
```
### worker-02
```
 hostname worker-02
 echo "worker-02" > /etc/hostname
 bash
```
