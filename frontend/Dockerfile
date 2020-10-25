# @Author Ismael alves

# Estagio 1 - Será responsavel em construir a aplicação
FROM node:latest as node
WORKDIR /app
COPY package.json /app/
RUN npm i
COPY ./ /app/
RUN npm run build

# Estagio 2 - Será responsavel por expor a aplicação
FROM nginx:alpine
LABEL maintainer="Ismael Alves cearaismael1997@gmail.com"
EXPOSE 80
# Healthcheck
HEALTHCHECK --interval=60s --timeout=20s CMD curl --fail http://localhost/ || exit 1
COPY --from=node /app/dist/ /usr/share/nginx/html