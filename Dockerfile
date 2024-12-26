# Use an official Node.js runtime as the base image
FROM node:20-alpine

# Install PostgreSQL client (useful if you need DB access within the container)
RUN apk add --no-cache postgresql-client

# Install NestJS CLI globally (optional, if you want to use `nest` command)
RUN npm install -g @nestjs/cli

# Set the working directory for your application
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the container and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application files to the container
COPY . .

# Expose the port the app will run on
EXPOSE 8000

# Run the application in development mode
CMD ["npm", "run", "start:dev"]
