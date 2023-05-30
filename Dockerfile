FROM node:18-alpine
ENV NODE_ENV=production

WORKDIR /app

COPY ./data/mongo/seeds /mongo-seeds

RUN npm install --production

COPY . .

CMD ["node", "app.js"]




