FROM node:16.17.1-slim

ENV PORT=8081

COPY . /
WORKDIR /

RUN npm install

#Expose Port
EXPOSE 8081

CMD [ "npm", "start" ]
