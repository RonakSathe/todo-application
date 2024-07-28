FROM node:latest

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000
RUN chown -R node:node /usr/src/app
CMD ["npm", "run","dev"]
