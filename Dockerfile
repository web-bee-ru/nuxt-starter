# Choose builder base image
FROM node:14-alpine as builder

# Create app directory
WORKDIR /srv/app

# Install build essentials
RUN apk add --no-cache make gcc g++ python curl git

# Install app dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Clean unnecessary package cache
RUN npm cache clean --force

# Remove unnecessary build essentials
RUN apk del make gcc g++ python


# ========================================================================
# Everyhing above here should change rarely to benefit from docker caching
# ========================================================================


# Default environment variables
ENV HOST=0.0.0.0
ENV PORT=3000

# Copy source code and pre-build artifacts
COPY . ./

# Build app
RUN npm run build && npm prune --production


# ======================================
# Everyhing above here is the build step
# ======================================


# Choose runtime base image
FROM node:14-alpine

# Create app directory
WORKDIR /srv/app

# Default environment variables
ENV HOST=0.0.0.0
ENV PORT=3000

# Copy the build artifacts from the build stage
# Ordered by change frequency to benefit from docker caching
COPY --from=builder /srv/app/package.json /srv/app/package-lock.json /srv/app/node_modules/ ./
COPY --from=builder /srv/app/nuxt.config.js ./
COPY --from=builder /srv/app/.env ./
COPY --from=builder /srv/app/.nuxt ./

# Start app
CMD npm run start
