FROM node:16.17.1-slim

ENV PORT=8080

COPY . /
WORKDIR /

RUN npm install

#Expose Port
EXPOSE 8080

CMD [ "npm", "start" ]
