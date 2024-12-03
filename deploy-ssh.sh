#!/bin/bash

# Set variables
MASTER_IP="10.10.29.217"
WORKER_IP="10.10.29.219"
MASTER_HOST="Pi01"
WORKER_HOST="Pi02"
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
scp ${TAR_NAME} webd.yaml head@${MASTER_IP}:/home/head/
kill $! 2>/dev/null

# Import image and deploy on master node
echo "Deploying to K3s master node..."
loading_bar 0.1 "Deploying to master" &
ssh head@${MASTER_IP} "
    sudo k3s ctr images import /home/head/${TAR_NAME} && \
    sudo kubectl delete deployment webapp --ignore-not-found=true && \
    sudo kubectl apply -f /home/head/webd.yaml"
kill $! 2>/dev/null

# Import image to worker node
echo "Importing image to worker node..."
loading_bar 0.1 "Worker node import" &
scp ${TAR_NAME} head@${WORKER_IP}:/home/head/ && \
ssh head@${WORKER_IP} "sudo k3s ctr images import /home/head/${TAR_NAME}"
kill $! 2>/dev/null

# Restart deployment
echo "Restarting deployment for pod distribution..."
loading_bar 0.1 "Restarting deployment" &
ssh head@${MASTER_IP} "
    sudo kubectl rollout restart deployment webapp && \
    echo 'Waiting for pods to stabilize...' && \
    sleep 5 && \
    sudo kubectl get pods -o wide"
kill $! 2>/dev/null

# Cleanup on all nodes
echo "Cleaning up..."
rm ${TAR_NAME} webd.yaml
ssh head@${WORKER_IP} "rm /home/head/${TAR_NAME}"
ssh head@${MASTER_IP} "rm /home/head/${TAR_NAME}"

echo "Deployment completed successfully!"
