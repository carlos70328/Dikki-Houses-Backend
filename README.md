To import database locally

1. Run docker-compose up 

2. In athoner terminal execute ```docker exec -it dikki-mongo-houses bash```
   to execute commands inside container

3. Inside container run ```./mongo-seeds/import.sh```

4. Enjoy

[1] http://docs.mongodb.com/compass/master/import-export/#export-data-from-a-collection
[2] https://kb.objectrocket.com/mongo-db/how-to-import-a-csv-into-mongodb-327
[3] https://docs.mongodb.com/guides/server/import/