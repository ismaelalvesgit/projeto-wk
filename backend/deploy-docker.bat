set versao=0.0.1

echo "<============ Iniciando o build da versao %versao% ==============>"
docker build -t ismaelalvesdoc/backend:%versao% .
echo "<============ Iniciando o build da ultima versao ==============>"
docker build -t ismaelalvesdoc/backend .
echo "<============ Enviando imagem na versao %versao% para o repositorio ==============>"
docker push ismaelalvesdoc/backend:%versao%
echo "<============ Enviando imagem na ultima versao para o repositorio ==============>"
docker push ismaelalvesdoc/backend
echo "<============ Deploy Finalizado ==============>"