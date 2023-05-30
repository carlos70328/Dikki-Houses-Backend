FROM mongo

COPY ./data/mongo/seeds /mongo-seeds

CMD ['npm', 'start]

