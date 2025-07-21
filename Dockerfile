# Stage 1: Builder
FROM node:18 AS builder

WORKDIR /app

# Install dependencies and build
COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Stage 2: Distroless
FROM gcr.io/distroless/nodejs18

WORKDIR /app

# Only copy the build and production dependencies
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./

EXPOSE 3000

# Important: Point to the JS file to run with full path
CMD ["dist/index.js"]
