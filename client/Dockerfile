FROM node:18-alpine

WORKDIR /app

# Copy package files first to leverage Docker cache
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the frontend code
COPY . .

# Expose the Vite dev server port
EXPOSE 5173

# Start Vite, ensuring it binds to 0.0.0.0 (all network interfaces) so we can access it outside Docker
CMD ["npm", "run", "dev", "--", "--host"]
