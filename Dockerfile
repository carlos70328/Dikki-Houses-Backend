
FROM node:14


WORKDIR /app


COPY package*.json ./


RUN npm install


COPY . .


EXPOSE 27017


CMD [ "npm", "start" ]

