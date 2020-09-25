FROM node:12.16-alpine
WORKDIR /app

COPY package*.json /app/


RUN npm install

COPY . /app

EXPOSE 4000
CMD ["npm","start"]