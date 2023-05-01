FROM node:16-alpine AS builder

WORKDIR /var/www/app

COPY package.json ./
COPY package-lock.json ./

RUN npm i
COPY . .

RUN npm run build


FROM node:16-alpine AS production

WORKDIR /var/www/app

COPY --from=builder /var/www/app/package.json ./
COPY --from=builder /var/www/app/package-lock.json ./

RUN npm i --omit=dev 

COPY --from=builder /var/www/app/dist ./dist/

EXPOSE 3000
CMD ["node", "dist/main.js"] 
