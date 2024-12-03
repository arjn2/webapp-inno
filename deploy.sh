#!/bin/bash

# Set variables
MASTER_IP="10.10.29.217"
MASTER_USER="head@P102"
IMAGE_NAME="webapp-credits"
IMAGE_TAG="latest"
TAR_NAME="${IMAGE_NAME}.tar"

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
sudo docker build -t ${IMAGE_NAME}:${IMAGE_TAG} .

# Save the Docker image
echo "Saving Docker image to tar file..."
sudo docker save -o ${TAR_NAME} ${IMAGE_NAME}:${IMAGE_TAG}

# Transfer files to master node
echo "Transferring files to master node..."
sshpass -p "your_password_here" scp ${TAR_NAME} webd.yaml ${MASTER_USER}@${MASTER_IP}:/home/${MASTER_USER}/

# Import image and deploy on master node
echo "Importing image and deploying on master node..."
sshpass -p "your_password_here" ssh ${MASTER_USER}@${MASTER_IP} "sudo k3s ctr images import /home/${MASTER_USER}/${TAR_NAME} && sudo kubectl apply -f /home/${MASTER_USER}/webd.yaml"

# Cleanup local files
echo "Cleaning up..."
rm ${TAR_NAME} webd.yaml

echo "Deployment completed!"
