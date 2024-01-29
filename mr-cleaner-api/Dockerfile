ARG NODE_IMAGE=node:20.11.0-alpine3.19

FROM ${NODE_IMAGE} as depencencies

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm install -g ts-node

COPY . .

RUN npm run build

EXPOSE 4000

CMD ["npm", "run", "start:docker"]

