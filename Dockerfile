# Build stage
FROM node:18 AS build-stage
WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build && npm run export

# Production stage
FROM nginx:alpine
WORKDIR /usr/share/nginx/html

COPY --from=build-stage /app/out ./
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
