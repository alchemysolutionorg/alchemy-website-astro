#!/bin/sh
set -e

# Replace environment variables in nginx config template
# This allows DOMAIN to be set at runtime via Docker environment
envsubst '${DOMAIN}' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf

# Execute the passed command (typically nginx -g "daemon off;")
exec "$@"