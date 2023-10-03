FROM node:lts-bullseye

COPY ./app /apps/api

WORKDIR /apps/api

RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && echo "deb http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list

RUN apt-get update && apt-get -y install google-chrome-stable

RUN npm install -g @nestjs/cli

RUN npm install

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true

EXPOSE 3000

RUN rm -rf dist temp

CMD [ "npm", "run", "start:dev" ]