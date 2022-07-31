# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone git@github.com:RimidalU/nodejs2022Q2-service.git
cd nodejs2022Q2-service
git checkout containerization
```
## Rename file

.env.example to .env

## Build image and start containers

```
docker-compose up -d
```

## Running scan built image:

```
npm run scan:app
```


### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
