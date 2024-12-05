FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm install sharp
RUN npx update-browserslist-db@latest
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm","run","start"]
