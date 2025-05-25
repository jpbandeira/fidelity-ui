# Build da aplicação React
FROM node:18-alpine as build

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install

COPY . .
RUN npm run build

# Stage final - servidor Nginx para servir o build
FROM nginx:alpine

# Remove a configuração default do Nginx
RUN rm /etc/nginx/conf.d/default.conf

# Copia a configuração customizada do Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copia os arquivos gerados pelo build React para o diretório do Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Expõe a porta 80 para acesso externo
EXPOSE 80

# Comando default para rodar o Nginx em foreground
CMD ["nginx", "-g", "daemon off;"]
