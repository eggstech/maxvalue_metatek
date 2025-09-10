# Stage 1: Build Next.js app
FROM node:18-alpine AS build-stage
WORKDIR /app

# Cài dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Build (tạo .next và output static)
RUN npm run build && npm run export

# Stage 2: Nginx serve static
FROM nginx:alpine AS production-stage
WORKDIR /usr/share/nginx/html

# Copy file build ra thư mục nginx
COPY --from=build-stage /app/out/ .

# Copy cấu hình nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf
