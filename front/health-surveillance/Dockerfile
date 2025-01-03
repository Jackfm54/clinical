# Usar la imagen oficial de Nginx para producción
FROM nginx:alpine

# Copiar los archivos construidos de React
COPY build /usr/share/nginx/html

# Copiar la configuración de Nginx personalizada
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponer el puerto 80
EXPOSE 80

# Comando para iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]
