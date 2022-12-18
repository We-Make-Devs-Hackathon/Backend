FROM node:16.17.1-slim

ENV PORT=8083

COPY . /
WORKDIR /

RUN npm install

#Expose Port
EXPOSE 8083

CMD [ "npm", "start" ]
