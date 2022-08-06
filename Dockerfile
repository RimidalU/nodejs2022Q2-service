# Base image
FROM node:16.15-alpine
# Create app directory
WORKDIR  /usr/src/app
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./
# Install app dependencies
RUN npm ci
# Bundle app source
COPY . .
# # Creates a "dist" folder with the production build
# RUN npm run build
# Creates port for forwarding between containers
EXPOSE ${PORT}
# Start the server using the production build
CMD [ "npm", "run", "start:dev" ]
