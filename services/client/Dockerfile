FROM node:12-slim as base
WORKDIR /bin/www
RUN chown -R node:node .
USER node
COPY --chown=node:node package.json yarn.lock* ./
RUN yarn install
CMD [ "yarn", "start" ]

FROM base as build
ENV NODE_ENV=production
COPY --chown=node:node . .
RUN yarn build

FROM nginx:1.16-alpine as prod
EXPOSE 80
COPY --from=build /bin/www/build /usr/share/nginx/html
CMD [ "nginx", "-g", "daemon off;" ]