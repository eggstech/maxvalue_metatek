FROM node:18-alpine as build-stage

WORKDIR /app
COPY . .
RUN npm install -D
RUN npm run build

FROM nginx:stable-alpine as production-stage
RUN mkdir /app
COPY --from=build-stage /app/dist /app
COPY nginx.conf /etc/nginx/nginx.conf