# Stage 1: Build the Astro application
FROM node:22-alpine AS builder

WORKDIR /app

# Install pnpm via corepack
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy package files for dependency installation
COPY package.json pnpm-lock.yaml ./

# Install dependencies (frozen lockfile for reproducible builds)
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Build arguments for Sanity CMS configuration
ARG SANITY_PROJECT_ID
ARG SANITY_DATASET

# Set environment variables for build process
ENV SANITY_PROJECT_ID=${SANITY_PROJECT_ID}
ENV SANITY_DATASET=${SANITY_DATASET}

# Build the static site
RUN pnpm build

# Stage 2: Production image with Nginx
FROM nginx:alpine

# Copy nginx base configuration
COPY _deployment/nginx/nginx.conf /etc/nginx/nginx.conf

# Copy site configuration template (will be processed by entrypoint)
COPY _deployment/nginx/conf.d/default.conf.template /etc/nginx/conf.d/default.conf.template

# Copy and setup entrypoint script
COPY _deployment/scripts/docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

# Copy built static files from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Create certbot webroot directory for SSL challenges
RUN mkdir -p /var/www/certbot

# Expose HTTP and HTTPS ports
EXPOSE 80 443

# Health check endpoint
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost/health || exit 1

# Use custom entrypoint for config substitution, then run nginx
ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]