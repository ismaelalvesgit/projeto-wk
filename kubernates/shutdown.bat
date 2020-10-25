
echo desativando statup

echo Desativando os deployments 
kubectl delete -f deployments

echo Desativando os secrets 
kubectl delete -f secrets

echo Desativando os services 
kubectl delete -f services

echo Desativando os autoscaling 
kubectl delete -f autoscaling

echo Desativando os ingress controllers 
kubectl delete -f ingress

echo Desativando os volumes 
kubectl delete -f volumes --force --grace-period=0