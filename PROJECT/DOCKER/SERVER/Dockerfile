FROM node:20.15.1
WORKDIR /usr/scr/app
COPY package*.json ./
RUN npm install
COPY . .
CMD ["npm","run","dev"]