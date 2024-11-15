# CONFIGURAÇÃO SERVIDOR KUBERNETES

> [!NOTE]
> Configuração de cluster kubernets em servidor ubuntu

### 01 - Renomear as máquinas
   
- [1.] master
```
 hostname master
 echo "master" > /etc/hostname
 bash
```
- [2.] worker-01
```
 hostname worker-01
 echo "worker-01" > /etc/hostname
 bash
```
- [3.] worker-02
```
 hostname worker-02
 echo "worker-02" > /etc/hostname
 bash
```
