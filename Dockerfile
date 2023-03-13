FROM node:16
WORKDIR /usr/src/app
COPY . .
# RUN cp -r ./ ./
RUN ls -la 
RUN npm install
EXPOSE 3000
CMD [ "node", "app.js" ]