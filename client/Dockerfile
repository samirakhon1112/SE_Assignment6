# client/Dockerfile
FROM node:18-alpine

WORKDIR /usr/src/client

COPY package*.json ./
RUN npm install --production

COPY . .

CMD ["node", "client.js"]
