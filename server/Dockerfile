FROM node:18-alpine

WORKDIR /app

# Copy package files first from the server folder in the context
COPY server/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the backend code from the server folder
COPY server/ .

# Expose the Express port
EXPOSE 5000

# Start the server
CMD ["npm", "start"]
