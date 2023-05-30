
FROM node:14


WORKDIR /bin/WWW


COPY package*.json ./


RUN npm install


COPY . .


EXPOSE 27017


CMD [ "npm", "start" ]

