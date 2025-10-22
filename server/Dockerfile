FROM node:18-alpine
WORKDIR /app/server
COPY server/package*.json ./
RUN npm install --no-audit --no-fund
COPY server/ ./
EXPOSE 4000
CMD ["npm", "run", "dev"]
