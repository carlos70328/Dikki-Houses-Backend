FROM mongo

COPY ./data/mongo/seeds /mongo-seeds

WORKDIR /app

RUN npm install

EXPOSE 27018

CMD ['npm', 'start]

