FROM node:18-alpine

WORKDIR /app

# Copy the server's package.json files using the root context
COPY server/package*.json ./

# Install backend dependencies
RUN npm install

# Copy all of the backend code from the server folder into the container
COPY server/ ./

# Expose the correct port
EXPOSE 5000

# Start the node server
CMD ["npm", "start"]
