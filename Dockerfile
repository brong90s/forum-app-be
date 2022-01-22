# Development
FROM node:16-alpine as development
WORKDIR /usr/src/app
COPY ["package*.json", "./"]
RUN npm install --silent
COPY . .
RUN npm run build

# Production
FROM node:16-alpine as production
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY ["package*.json", "./"]
RUN npm install --silent
COPY . .
COPY --from=development /usr/src/app/dist ./dist
EXPOSE 3000
CMD ["node", "dist/main"]



# # For Development Environment
# FROM node:alpine

# # Work Directory
# WORKDIR /usr/src/app

# # Node Modules
# COPY package.json yarn.lock ./

# # Install node modules
# RUN yarn install

# # Copy app source to work directory
# COPY ./ ./

# # Clean exisiting compiled TS
# RUN yarn prebuild

# # Build project
# RUN yarn build

# # Build and run the app
# CMD ["yarn", "start:prod"]