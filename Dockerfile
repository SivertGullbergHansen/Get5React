# Use an official Node runtime as the builder stage
FROM node:18 AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy Prisma files
COPY prisma ./prisma/

# Copy the rest of the code
COPY . .

# Build the project
RUN npm run build

# Start the production stage
FROM node:18

# Set the working directory
WORKDIR /app

# Copy node modules
COPY --from=builder /app/node_modules ./node_modules

# Copy package.json and package-lock.json
COPY --from=builder /app/package*.json ./

# Copy built files
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Copy Prisma files
COPY --from=builder /app/prisma ./prisma

# Expose the listening port
EXPOSE 3000

# Run Prisma migration and start the app
CMD npx prisma migrate deploy && npm run start
