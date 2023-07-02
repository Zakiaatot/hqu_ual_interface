FROM node	
COPY ./src /code/src
COPY ./*.js /code/	
COPY ./package.json /code/
WORKDIR /code/	
RUN npm install	
EXPOSE 8087	
CMD npm start