
FROM node:14


WORKDIR /bin/WWW


COPY package*.json ./


RUN npm install


COPY . .


EXPOSE 27017
EXPOSE 27018


CMD [ "npm", "start" ]

