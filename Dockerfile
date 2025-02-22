# Use an official Node.js runtime as the base image
FROM node:18-alpine AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first
COPY the-tiffin-wala/package.json the-tiffin-wala/package-lock.json ./

RUN npm install

COPY the-tiffin-wala ./

# Build the Next.js application
RUN npm run build

# Use a minimal image for production
FROM node:18-alpine AS runner

# Set the working directory in the container
WORKDIR /app

# Copy built files from the builder stage
COPY --from=builder /app/package.json /app/package-lock.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

# Expose the Next.js default port
EXPOSE 3000

# Start the Next.js application
CMD ["npm", "run", "start"]


