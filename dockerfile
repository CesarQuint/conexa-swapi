FROM node:22-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

RUN npm install -g ts-node # Probablemente innecesario para producción

CMD npm run start:prod