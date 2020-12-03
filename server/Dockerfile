FROM node

WORKDIR /usr/src/app

COPY package.json .

COPY package-lock.json .

RUN npm install

COPY . .

RUN npm run build

ENV NODE_ENV production

#RUN npm run migrate

EXPOSE 3000

CMD [ "node", "dist/server.js" ]