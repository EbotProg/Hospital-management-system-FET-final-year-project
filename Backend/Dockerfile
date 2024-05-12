FROM  node:20-alpine

WORKDIR /app

COPY . /app

RUN npm install

EXPOSE 8000

ENV NAME backend

CMD ["npm", "start"]