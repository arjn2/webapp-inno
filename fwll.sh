# Allow Kubernetes API server access
sudo firewall-cmd --permanent --add-port=6443/tcp

# Allow Flannel VXLAN networking (UDP)
sudo firewall-cmd --permanent --add-port=8472/udp

# Allow Kubelet metrics (TCP)
sudo firewall-cmd --permanent --add-port=10250/tcp

# Allow MariaDB connections (TCP)
sudo firewall-cmd --permanent --add-port=3306/tcp

# Allow traffic from pod CIDR (default: 10.42.0.0/16)
sudo firewall-cmd --permanent --zone=trusted --add-source=10.42.0.0/16

# Allow traffic from service CIDR (default: 10.43.0.0/16)
sudo firewall-cmd --permanent --zone=trusted --add-source=10.43.0.0/16

# **Do NOT expose port 3000 externally**
# Port 3000 is used internally within the container; do not add any rules for it.

sudo firewall-cmd --reload
sudo firewall-cmd --list-all
