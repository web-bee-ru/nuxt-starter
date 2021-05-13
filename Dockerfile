# Choose builder base image
FROM node:14-alpine as builder

# Create app directory
WORKDIR /srv/app

# Install build essentials
RUN apk add --no-cache make gcc g++ python curl git

# Install app dependencies
COPY package.json package-lock.json ./
RUN npm ci


# ========================================================================
# Everyhing above here should change rarely to benefit from docker caching
# ========================================================================


# Copy source code and pre-build artifacts
COPY . ./

# Create blank .env file if it does not exist
RUN touch .env

# Build app
RUN npm run build


# ======================================
# Everyhing above here is the build step
# ======================================


# Choose runtime base image
FROM node:14-alpine

# Create app directory
WORKDIR /srv/app

# Install app dependencies
COPY package.json package-lock.json ./
RUN npm ci --production

# Copy the build artifacts from the build stage
# Ordered by change frequency to benefit from docker caching
COPY --from=builder /srv/app/build/ ./build/
COPY --from=builder /srv/app/.nuxt/ ./.nuxt/
COPY --from=builder /srv/app/.env ./
COPY --from=builder /srv/app/static/ ./static/

# Start app
CMD npm run start
