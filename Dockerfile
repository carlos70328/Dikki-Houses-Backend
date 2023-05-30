FROM mongo

COPY ./data/mongo/seeds /mongo-seeds

RUN mkdir -p /app

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /usr/src/app

EXPOSE 7500

CMD ['node', 'app.js']

