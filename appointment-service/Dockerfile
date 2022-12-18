FROM node:16.17.1-slim

ENV PORT=8082

COPY . /
WORKDIR /

RUN npm install

#Expose Port
EXPOSE 8082

CMD [ "npm", "start" ]
