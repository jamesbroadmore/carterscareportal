# Multi-stage build for production
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

FROM node:18-alpine
WORKDIR /app
LABEL maintainer="Carters Care Group"
LABEL version="2.0.0"

# Copy from builder
COPY --from=builder /app/node_modules ./node_modules
COPY . .

# Create data directory
RUN mkdir -p /app/data && \
    chmod -R 755 /app/data

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD node -e "require('http').get('http://localhost:3000/api/health', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"

# Use non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001
USER nodejs

EXPOSE 3000
ENV NODE_ENV=production
CMD ["node", "server.js"]
