FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .
RUN chown -R node:node /usr/src/app
CMD ["npm", "run", "dev"]
