# Chat-point-com

## **Table of Contents**
- [Chat-point-com](#chat-point-com)
  - [**Table of Contents**](#table-of-contents)
  - [**Description**](#description)
    - [Developer](#developer)
  - [Requirements](#requirements)
  - [Launch the project](#launch-the-project)
    - [Using Docker compose](#using-docker-compose)
    - [Using your local installation](#using-your-local-installation)

## **Description**
This is a chat application that allows users to chat with each other in real time. Users can create a group and invite other users to join the group (not fully implemented). Users can also send private messages to each other.

### Developer
- Grisel Hugo - (hugo.grisel@epitech.eu)

## Requirements
For this project you will need at least on your computer:

> If you want to use the provided Docker installation
- [Docker](https://docs.docker.com/engine/install/)
- [Docker compose](https://docs.docker.com/compose/install/)

> If you want to use your local dependecies
- [Node.js](https://nodejs.org/en) v21.2.0
- [MariaDB](https://mariadb.org/download/) (latest version)

## Launch the project
First of all, you will need to create a .env file in the server folder as shown in the [.env.example](server/.env.example) file. This file should contain the following variables:
```bash
PORT= # The port on which the server will run
MONGODB_URI= # The URI of your MongoDB database
```


There are two ways to launch the project:

> Using Docker compose

First, build the containers using:
```bash
docker compose build
```

Once the containers are built, you can run the project by using:

```bash
docker compose up -d
```

Now you should be able to access the project on [localhost:3000](http://localhost:3000) !

> Using your local installation

- For the application:
```bash
cd app
npm install
npm start
```

- For the server:
```bash
cd server
npm install
npm start
```

Now you should be able to access the project on [localhost:3000](http://localhost:3000) !