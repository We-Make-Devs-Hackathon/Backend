# Hospital IAM
 
## Setup

Clone the repo and install the dependencies (Project was initially built using node version 16.17.1).

```bash
git clone https://git.com/example/hospital-iam
cd hospital-iam
```

```bash
npm install
```
#
## Environment Variables

 - `.env` file is supported, create `.env` file in project's root folder and put all env variables in the file.

```
NODE_ENV=development or production
PORT=8080

JWT_SECRET=randomValue
INTER_COMMUNICATION_API_KEY=cX8G8fNmYb4   # this value must be same for all the microservices as this is used to authenticate inter-microservice calls

MONGO_DB_CONNECTION_URL=mongodb://<username>:<password>@<host>/<database_name>

HOSPITAL_IAM_ENDPOINT=http://localhost:8080
HOSPITAL_USER_ENDPOINT=http://localhost:8081
```
#
## Dev Server

```
npm run dev
```

## Start the Production Server

```
npm start
```


 ## Build docker image

```
docker build . -t hospital-iam:1.0.0-SNAPSHOT
```
## Run docker image
```
docker run --env-file .env -p 8080:8080 hospital-iam:1.0.0-SNAPSHOT
``` 
#
## Swagger
Open 'http://localhost:<code>port</code>/hospital-iam/api/v1/api-docs/' url for API documentation (only available in non prod environment)

#

## Folder Structure

    .
    ├── bin
    │   ├── www                                 # Main entry
    ├── logs                                    # Log files will be stored here, also added to the .gitignore file
    ├── middleware
    │   ├── permission.js                       # Middleware to handle permission based authorization
    ├── migrations                              # Just like SQL Versioning but more, you can add js files in this folder to execute certain logic either to insert or alter data. Each file will be only executed once, and will be logged in `migrations` table. (Tip: Remove the entry form migration table if you want to rerun the js file.)
    ├── model                                   # The model data (e.g. Mongoose model)
    ├── public                                  # The public directory (client-side code)
    ├── routes                                  # The route definitions and implementations
    ├── services                                # The standalone services (Database service, Email service, ...)
    ├── queue
    │   ├── receiver
    │   │   ├── index.js                        # Middleware to handle permission based authorization
    │   │   ├── processors
    │   │   │   ├── admin-user-update.js        # Queue message processor for 'admin-user-update' event
    │   ├── sender.js                           # Utility which is responsible to emit the events
    ├── test                                    # Test cases
    ├── util                                    # Utility files
    ├── .env                                    # Environment variables
    ├── app.js                                  # Second entry point, app.js is called from `/bin/www`. This is where migration, swagger, router configurations takes place
    ├── Dockerfile
    ├── migration.js                            # Migration entry point, all the migration js scripts under `/migrations/` folder are invoked from here
    └── routes.js                               # All the routes created under `/routes/` folder are configured from this file

#
