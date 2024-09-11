FROM node:20-alpine
WORKDIR /usr/src/app
COPY . .
RUN npm install sharp
RUN npm audit fix
RUN npm run build
EXPOSE 3000
CMD ["npm","run","start"]