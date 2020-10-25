#!/bin/bash

versao=0.0.1

if ! [ -x "$(command -v docker)" ]; then
  echo 'Error: docker não está instalado.' >&2
  exit 1
fi

echo "<============ Iniciando o build da versão $versao ==============>"
docker build -t ismaelalvesdoc/backend:${versao} .
echo "<============ Iniciando o build da última versão ==============>"
docker build -t ismaelalvesdoc/backend .
echo "<============ Enviando imagem na versão $versao para o repositorio ==============>"
docker push ismaelalvesdoc/backend:${$versao}
echo "<============ Enviando imagem na última versão para o repositorio ==============>"
docker push ismaelalvesdoc/backend
echo "<============ Deploy Finalizado ==============>"
echo "<============ Iniciando clear Images dangling ==============>"
docker rmi --force $(docker images -q --filter "dangling=true")
echo "<============ Finalizando clear Images dangling ==============>"