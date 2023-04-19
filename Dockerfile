# Base image
FROM node:16.13.1

# Set the working directory
WORKDIR /app

# Copy package.json and yarn.lock to the container
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the source code and assets to the container
COPY . .

# Copy entrypoint.sh file
COPY ./entrypoint.sh .

# Expose the port on which the application will run
EXPOSE 5050

# Start the application
CMD ["/bin/sh", "./entrypoint.sh"]