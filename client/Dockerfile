FROM node

# Create app folder
RUN mkdir -p /app

WORKDIR /app

# Cache npm dependencies
RUN npm install pushstate-server

# Copy application files
COPY index.html /app
COPY dist /app/dist

CMD node_modules/.bin/pushstate-server .

EXPOSE 9000
