FROM node:12-slim as base
EXPOSE 3000
WORKDIR /usr/app
RUN chown -R node:node .
USER node
COPY --chown=node:node package.json yarn.lock* ./
RUN yarn install

FROM base as dev
ENV NODE_ENV=development PATH=/usr/app/node_modules/.bin:$PATH
CMD [ "ts-node-dev", "--respawn", "src/index.ts" ]

FROM dev as prod
ENV NODE_ENV=production
COPY --chown=node:node . .
RUN yarn run tsc -b && \
  rm -rf ./src && \
  yarn install --production && \
  yarn cache clean
CMD ["node", "dist/index.js"]
