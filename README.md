# Alchemy Digital Solutions Website

A modern, responsive website for Alchemy Digital Solutions built with Astro 5, React, and Tailwind CSS.

## Prerequisites

- Docker and Docker Compose (v2.x)
- A domain name pointed to your server's IP address (for production)
- Sanity CMS project configured (see `.env.example`)

## Development

### Quick Start

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd alchemy-website-astro
   ```

2. Create environment file:
   ```bash
   cp .env.example .env
   ```

3. Edit `.env` and set your Sanity credentials:
   ```env
   SANITY_PROJECT_ID=your-project-id
   SANITY_DATASET=production
   ```

4. Start development server:
   ```bash
   docker compose -f _deployment/docker-compose.dev.yml up
   ```

5. Open http://localhost:4321 in your browser

### Development Features

- Hot module replacement (HMR) - changes reflect instantly
- Source code mounted as volume - edit files directly
- Node modules in separate volume - fast reinstalls
- Sanity CMS integration for content management

## Production Deployment

### First-Time Deployment

1. Set up your server:
   - Ensure Docker and Docker Compose are installed
   - Configure your domain's DNS to point to the server IP

2. Clone and configure:
   ```bash
   git clone <repository-url>
   cd alchemy-website-astro
   cp .env.example .env
   ```

3. Edit `.env` for production:
   ```env
   DOMAIN=your-domain.com
   EMAIL=admin@your-domain.com
   SANITY_PROJECT_ID=your-project-id
   SANITY_DATASET=production
   CERTBOT_STAGING=
   ```

4. Build and deploy:
   ```bash
   docker compose -f _deployment/docker-compose.yml up --build -d
   ```

5. Verify deployment:
   ```bash
   docker compose -f _deployment/docker-compose.yml logs web
   curl https://your-domain.com/health
   ```

The site will be available at `https://your-domain.com` with automatic SSL.

### Testing SSL (Staging Mode)

Before using production certificates, test with Let's Encrypt staging:

1. Set in `.env`:
   ```env
   CERTBOT_STAGING=--test-cert
   ```

2. Deploy and verify:
   ```bash
   docker compose -f _deployment/docker-compose.yml up --build -d
   ```

3. After testing, remove staging flag for production certificates:
   ```env
   CERTBOT_STAGING=
   ```

4. Rebuild with production certificates:
   ```bash
   docker compose -f _deployment/docker-compose.yml down
   docker compose -f _deployment/docker-compose.yml up --build -d
   ```

### Updating Production

1. Pull latest changes:
   ```bash
   git pull origin main
   ```

2. Rebuild and redeploy:
   ```bash
   docker compose -f _deployment/docker-compose.yml up --build -d
   ```

3. Verify the update:
   ```bash
   docker compose -f _deployment/docker-compose.yml logs web
   curl https://your-domain.com/health
   ```

### SSL Certificate Management

Certificates are automatically obtained and renewed by Certbot:

- Auto-renewal: Every 12 hours (checks if renewal needed)
- Manual renewal check: `docker compose -f _deployment/docker-compose.yml exec certbot renew --dry-run`
- Certificate location: `/etc/letsencrypt/live/${DOMAIN}/`

## Staging Deployment (On-Premises)

For on-premises VMs without a domain name or SSL (e.g., Play With Docker testing):

### Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                                                              │
│   ┌─────────────────┐     ┌──────────────────────────────┐  │
│   │  nginx-lb       │     │  web (3 replicas)            │  │
│   │  (load balancer)│────▶│  - web-1:80                  │  │
│   │  - Port 80      │     │  - web-2:80                  │  │
│   │  - Round-robin  │     │  - web-3:80                  │  │
│   └─────────────────┘     │  - Static files              │  │
│                            │  - No SSL                    │  │
│                            └──────────────────────────────┘  │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Quick Start (Play With Docker)

1. Create a new instance in [Play With Docker](https://labs.play-with-docker.com/)

2. Clone and deploy:
   ```bash
   git clone <repository-url>
   cd alchemy-website-astro

   # Build and start (3 replicas + load balancer)
   docker compose -f _deployment/docker-compose.staging.yml up --build -d
   ```

3. Access the site:
   - Click the port 80 link in Play With Docker UI
   - Or: `curl http://localhost/health`

### Verify Replicas

Check all 3 web containers are running:
```bash
docker compose -f _deployment/docker-compose.staging.yml ps
```

Check load balancer distribution:
```bash
# Each request may hit different replica
docker compose -f _deployment/docker-compose.staging.yml logs nginx-lb
```

### Scale Replicas

Change the number of web replicas:
```bash
# Scale to 5 replicas
docker compose -f _deployment/docker-compose.staging.yml up --scale web=5 -d
```

## Architecture

### Production Stack

```
┌─────────────────────────────────────────────────────┐
│                                                      │
│   ┌──────────────┐     ┌─────────────────────────┐  │
│   │   certbot    │────▶│  nginx (web)            │  │
│   │  (SSL certs) │     │  - Static files         │  │
│   └──────────────┘     │  - Gzip compression     │  │
│                        │  - Cache headers         │  │
│                        │  - HTTPS redirect        │  │
│                        │  - Port 80/443           │  │
│                        └─────────────────────────┘  │
│                                                      │
│                        Static files (dist/)          │
│                        Built from Astro              │
│                                                      │
└─────────────────────────────────────────────────────┘
```

### Development Stack

```
┌─────────────────────────────────────────────────────┐
│                                                      │
│   ┌─────────────────────────────────────────────┐   │
│   │  Node 22 container                           │   │
│   │  - astro dev (hot-reload)                    │   │
│   │  - Source mounted as volume                  │   │
│   │  - Port 4321                                 │   │
│   │  - Sanity env vars                           │   │
│   └─────────────────────────────────────────────┘   │
│                                                      │
└─────────────────────────────────────────────────────┘
```

## Troubleshooting

### Check logs

```bash
docker compose -f _deployment/docker-compose.yml logs web        # Nginx logs
docker compose -f _deployment/docker-compose.yml logs certbot    # Certbot logs
```

### SSL certificate issues

1. Verify DNS: `dig your-domain.com`
2. Check certbot logs: `docker compose -f _deployment/docker-compose.yml logs certbot`
3. Ensure firewall allows ports 80 and 443

### Build errors

1. Check Sanity credentials in `.env`
2. Verify pnpm-lock.yaml exists
3. Run build locally: `pnpm build`

### Container won't start

1. Check health endpoint: `curl http://localhost/health`
2. Verify nginx config: `docker compose -f _deployment/docker-compose.yml exec web nginx -t`
3. Check volumes: `docker volume ls`

## Health Check

The `/health` endpoint returns `healthy` with status 200:

```bash
curl https://your-domain.com/health
```

## File Structure

```
.
├── _deployment/                    # Docker deployment files
│   ├── Dockerfile                  # Multi-stage build: Node → Nginx
│   ├── Dockerfile.staging          # Staging build (HTTP only)
│   ├── docker-compose.yml          # Production: web + certbot
│   ├── docker-compose.dev.yml      # Development: hot-reload
│   ├── docker-compose.staging.yml  # Staging: 3 replicas + LB
│   ├── nginx/
│   │   ├── nginx.conf              # Base config: gzip, workers
│   │   ├── staging-nginx.conf      # Load balancer config
│   │   └── conf.d/
│   │       ├── default.conf.template  # Production site config
│   │       └── staging.conf        # Staging site config
│   └── scripts/
│       └── docker-entrypoint.sh    # Runtime config substitution
├── src/                            # Astro source code
├── public/                         # Static assets
├── sanity/                         # Sanity CMS schemas
├── .env.example                    # Environment template
└── README.md                       # This file
```

## Tech Stack

- **Framework:** Astro 5 with React integration
- **Styling:** Tailwind CSS 4
- **CMS:** Sanity.io
- **Container Runtime:** Docker with Docker Compose
- **Web Server:** Nginx Alpine
- **SSL:** Let's Encrypt via Certbot
- **Node Version:** 22 LTS Alpine
- **Package Manager:** pnpm