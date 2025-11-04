FROM node:20

WORKDIR /app

COPY package* .

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "node", "index.js" ]

# docker push image_name 
# docker compose - it is yml file and it is like key value pairs and objects 