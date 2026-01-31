FROM node:20-alpine
WORKDIR /app
COPY package.json ./
COPY src ./src
ENV COMPILER_PORT=8082
EXPOSE 8082
CMD ["node", "src/index.js"]
