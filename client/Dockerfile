FROM node

# Create app folder
RUN mkdir -p /app

WORKDIR /app

# Cache npm dependencies
COPY package.json /app/
RUN npm install

# Copy application files
COPY . /app

# Set permissions
RUN chgrp -R 0 /app
RUN chmod -R g+rw /app
RUN find /app -type d -exec chmod g+x {} +

RUN npm run dist

CMD npm run start-prod

EXPOSE 9000
