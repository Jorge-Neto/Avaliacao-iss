FROM node:16-slim

WORKDIR ./apiB:/home/node/app

COPY package*.json ./

COPY src ./src

RUN npm install

EXPOSE 3001

CMD ["npm","run","start"]
