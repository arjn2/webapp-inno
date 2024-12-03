#!/bin/bash

# Prompt for passwords
read -sp "Enter master node password: " MASTER_PASSWORD
echo
read -sp "Enter worker node password: " WORKER_PASSWORD
echo

# Set variables
MASTER_IP="10.10.29.217"
MASTER_USER="head@P102"
WORKER_IP="10.10.29.219"
WORKER_USER="head@P102"
IMAGE_NAME="webapp-credits"
IMAGE_TAG="latest"
TAR_NAME="${IMAGE_NAME}.tar"

# Loading bar function
loading_bar() {
    local duration=$1
    local message=$2
    local i
    for ((i=0; i<=100; i++)); do
        printf "\r${message}: [%-50s] %d%%" $(printf "#%.0s" $(seq 1 $((i/2)))) $i
        sleep $duration
    done
    printf "\n"
}

# Create deployment YAML
cat > webd.yaml << 'EOL'
apiVersion: apps/v1
kind: Deployment
metadata:
  name: webapp
spec:
  replicas: 2
  selector:
    matchLabels:
      app: webapp
  template:
    metadata:
      labels:
        app: webapp
    spec:
      containers:
      - name: webapp
        image: webapp-credits:latest
        imagePullPolicy: Never
        env:
          - name: MYSQL_HOST
            value: "10.10.29.219"
          - name: MYSQL_PORT
            value: "3306"
          - name: MYSQL_USER
            value: "deplo"
          - name: MYSQL_PASSWORD
            value: "thinqclub@inno999"
          - name: MYSQL_DATABASE
            value: "innovationclub"
          - name: AUTH_SECRET
            value: "2e0OnNupOdAnEEpaNdEuDayipPa2476h99i2"
          - name: JWT_SECRET
            value: "290OnNupOdAnEEpaNdEuDayipPa256689952"
          - name: NEXTAUTH_URL
            value: "https://duk.ac.in/innovations"
          - name: NEXTAUTH_SECRET
            value: "2e0OnNupOdAnEEpaNdEuDayipPa2476h99i2"
        ports:
          - containerPort: 3000
        resources:
          requests:
            memory: "1Gi"
            cpu: "500m"
          limits:
            memory: "5Gi"
            cpu: "2000m"
EOL

# Build the Docker image
echo "Building Docker image..."
loading_bar 0.1 "Building image" &
sudo docker build -t ${IMAGE_NAME}:${IMAGE_TAG} .
kill $! 2>/dev/null

# Save the Docker image
echo "Saving Docker image to tar file..."
loading_bar 0.1 "Saving image" &
sudo docker save -o ${TAR_NAME} ${IMAGE_NAME}:${IMAGE_TAG}
kill $! 2>/dev/null

# Transfer files to master node
echo "Transferring files to master node..."
loading_bar 0.1 "Transferring files" &
sshpass -p "${MASTER_PASSWORD}" scp ${TAR_NAME} webd.yaml ${MASTER_USER}@${MASTER_IP}:/home/${MASTER_USER}/
kill $! 2>/dev/null

# Import image and deploy on master node
echo "Deploying to K3s master node..."
loading_bar 0.1 "Deploying to master" &
sshpass -p "${MASTER_PASSWORD}" ssh ${MASTER_USER}@${MASTER_IP} "
    sudo k3s ctr images import /home/${MASTER_USER}/${TAR_NAME} && \
    sudo kubectl delete deployment webapp --ignore-not-found=true && \
    sudo kubectl apply -f /home/${MASTER_USER}/webd.yaml"
kill $! 2>/dev/null

# Import image to worker node
echo "Importing image to worker node..."
loading_bar 0.1 "Worker node import" &
sshpass -p "${WORKER_PASSWORD}" scp ${TAR_NAME} ${WORKER_USER}@${WORKER_IP}:/home/${WORKER_USER}/ && \
sshpass -p "${WORKER_PASSWORD}" ssh ${WORKER_USER}@${WORKER_IP} "sudo k3s ctr images import /home/${WORKER_USER}/${TAR_NAME}"
kill $! 2>/dev/null

# Restart deployment to ensure proper pod distribution
echo "Restarting deployment for pod distribution..."
sshpass -p "${MASTER_PASSWORD}" ssh ${MASTER_USER}@${MASTER_IP} "
    sudo kubectl rollout restart deployment webapp && \
    sudo kubectl get pods -o wide"

# Cleanup on all nodes
echo "Cleaning up..."
rm ${TAR_NAME} webd.yaml
sshpass -p "${WORKER_PASSWORD}" ssh ${WORKER_USER}@${WORKER_IP} "rm /home/${WORKER_USER}/${TAR_NAME}"
sshpass -p "${MASTER_PASSWORD}" ssh ${MASTER_USER}@${MASTER_IP} "rm /home/${MASTER_USER}/${TAR_NAME}"

echo "Deployment completed successfully!"
