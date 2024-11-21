# Stage 1: Build the React app
FROM node:16 AS build-stage

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json for dependency installation
COPY package*.json ./

# Install Node.js dependencies
RUN npm install

# Copy the application source code
COPY . .

# Build the React app for production
RUN npm run build

# Stage 2: Serve the built app with Nginx
FROM nginx:1.21

# Copy the built files from the build stage to the Nginx default directory
COPY --from=build-stage /app/build /usr/share/nginx/html

# Expose port 80 to allow traffic to the container
EXPOSE 80

# Command to run Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
