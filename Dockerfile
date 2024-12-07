FROM node:20-alpine
WORKDIR /usr/src/app
COPY . .
RUN npm install sharp
RUN npx update-browserslist-db@latest
RUN npm run build
EXPOSE 3000
CMD ["npm","run","start"]
