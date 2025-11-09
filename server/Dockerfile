# Use Node 22 base image
FROM node:22

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

COPY . .

# port
EXPOSE 3000

#Start server
CMD ["node", "index.js"]
