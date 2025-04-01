FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./

# Install dependencies
RUN npm install


COPY . .

RUN npm run build

FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install 

COPY --from=builder /app/dist ./dist

# Expose port
EXPOSE 3000


CMD ["npm", "start"] 