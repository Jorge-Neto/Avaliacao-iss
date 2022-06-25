FROM node:16

WORKDIR ./apiA:/home/node/app

COPY package*.json ./

COPY tsconfig*.json ./

COPY src ./src

RUN ls -a

RUN npm install

EXPOSE 3000

CMD ["npm","run","start"]
