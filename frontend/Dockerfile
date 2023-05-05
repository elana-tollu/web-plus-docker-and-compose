FROM node:16-alpine AS builder

WORKDIR /var/www/app

COPY package.json ./
COPY package-lock.json ./

RUN npm i
COPY . .

RUN npm run build


FROM nginx:1.23.1-alpine AS production

WORKDIR /var/www/app

COPY nginx/conf.d /etc/nginx/conf.d/
COPY --from=builder /var/www/app/build ./

EXPOSE 3000