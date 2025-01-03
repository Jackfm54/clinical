# Usar una imagen oficial de Node.js
FROM node:18

# Crear y definir el directorio de trabajo
WORKDIR /app

# Copiar los archivos de configuración
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código fuente
COPY . .

# Exponer el puerto del backend
EXPOSE 5001

# Comando para iniciar el backend
CMD ["npm", "start"]
