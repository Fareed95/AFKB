# client/Dockerfile

# Use a Node.js image to build the React project
FROM node:18-alpine AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the project files
COPY . .

# Build the Vite app for production
RUN npm run build

# Use an Nginx image to serve the React app
FROM nginx:alpine

# Copy the build files from the previous stage to the Nginx HTML folder
COPY --from=build /app/dist /usr/share/nginx/html

# Expose the port Nginx will use
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]

