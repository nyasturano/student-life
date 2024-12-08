FROM node:slim
WORKDIR /server
COPY . .
RUN npm install
CMD [ "node", "index.js" ]
EXPOSE 5000