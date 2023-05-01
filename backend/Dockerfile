FROM node:16-alpine

WORKDIR /usr/src/app

COPY package.json ./
COPY package-lock.json ./
RUN npm i --omit=dev

COPY . .

EXPOSE 3000
CMD [ "node", "dist/main.js" ] 