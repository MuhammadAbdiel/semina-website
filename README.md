# SEMINA WEB - SERVER (RESTful API)

## Run Project

Create .env file in the root directory :

```sh
cp .env.example .env
```

or

```sh
copy .env.example .env
```

Fill the .env file with the following :

```sh
PORT=<PORT> # 3000
URL_MONGODB_DEV=<URL_MONGODB_DEV> # mongodb://localhost:27017/<DB_NAME>
URL_MONGODB_PROD=<URL_MONGODB_PROD> # mongodb+srv://<USER>:<PASSWORD>@<CLUSTER_NAME>.poo9ipk.mongodb.net/<DB_NAME>
JWT_SECRET=<RANDOM_STRING> # secret
JWT_EXPIRATION=<TIME> # 1h
JWT_REFRESH_TOKEN_SECRET=<RANDOM_STRING> # secret
JWT_REFRESH_TOKEN_EXPIRATION=<TIME> # 1d or 24h
GMAIL=<EMAIL_ADDRESS> # example@example.com
PASSWORD=<APPLICATION_PASSWORD> # abcdefghijklmnop
```

Then, run the following command to install the dependencies :

```sh
npm install
```

Run the following command to start the server :

```sh
npm run dev
```
