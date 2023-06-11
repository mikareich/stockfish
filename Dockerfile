# ---- Build Stage ----
FROM node:16-alpine AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install production dependencies
RUN npm ci

# Copy the source code
COPY . .

# Build the application
RUN npm run build

# ---- Production Stage ----
FROM node:16-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install only production dependencies
RUN npm ci --only=production

# Copy the build output from the previous stage
COPY --from=build /app/dist ./dist

# Start the application
CMD ["node", "dist/index.js"]
