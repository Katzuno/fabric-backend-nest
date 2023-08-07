FROM node:16.20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm i -g

COPY . .

RUN npm run build

EXPOSE 3000

COPY .env.dist .env

CMD [ "npm", "run", "start:dev" ]
