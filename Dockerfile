FROM mongo

ARG databaseName=dikki-houses
ARG collectionName=houses

COPY ./data/mongo/seeds /mongo-seeds