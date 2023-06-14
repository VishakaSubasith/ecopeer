FROM node:14-alpine as build_deps

WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
#ENV NODE_OPTIONS=--openssl-legacy-provider
COPY package.json yarn.lock ./
RUN yarn install

FROM node:14-alpine as build

# Create app directory
WORKDIR /usr/src/app
#ENV NODE_OPTIONS=--openssl-legacy-provider
# Copy build dependancies
COPY --from=build_deps /usr/src/app/node_modules ./node_modules

# Then copy in the actual sources we need and build
COPY package.json ./
COPY tsconfig.json ./
COPY src/ ./src/

ENV NODE_ENV production

RUN yarn build

FROM node:14-alpine as deps

WORKDIR /usr/src/app
# This _only_ builds a runtime node_modules tree.
# We won't need the package.json to actually run the application.
# If you needed developer-oriented tools to do this install they'd
# be isolated to this stage.
#ENV NODE_OPTIONS=--openssl-legacy-provider
ENV NODE_ENV production

COPY package.json yarn.lock ./
RUN yarn install --production

# Production version
FROM node:14-alpine

WORKDIR /usr/src/app

ENV NODE_ENV production
ENV PORT 4000
ENV CORS_ORIGIN https://ecopeer.net
ENV REDIS_URL //redis:6379
ENV DATABASE_URL postgresql://postgres:postgres@db:5432/solar_dev3

COPY --from=deps /usr/src/app/node_modules ./node_modules/
COPY --from=build /usr/src/app/dist ./dist/

EXPOSE 4000
CMD [ "node", "dist/index.js" ]
# USER node
