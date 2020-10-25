
echo iniciando statup
   
echo Criando os volumes 
kubectl apply -f volumes

echo Criando os secrets 
kubectl apply -f secrets

echo Criando os services 
kubectl apply -f services

echo Criando os autoscaling 
kubectl apply -f autoscaling

echo Criando os ingress controllers 
kubectl apply -f ingress

echo Criando os deployments 
kubectl apply -f deployments