FROM mongo

COPY ./data/mongo/seeds /mongo-seeds

CMD ["node", "app.js"]




