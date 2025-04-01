FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./

# Install dependencies
RUN npm install

COPY . .

RUN npm run build


# Expose port
EXPOSE 3000


CMD ["npm", "start"] 