FROM node

ARG REACT_APP_API_IP
ENV REACT_APP_API_IP=${REACT_APP_API_IP}

# set working directory
WORKDIR /app

COPY ./renti /app/

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

RUN ls -la /app

RUN yarn install 
RUN yarn global add serve

RUN yarn run build # compile

RUN echo $REACT_APP_API_IP

# start app
# CMD ["npm", "start"]
CMD serve -s build -l tcp://0.0.0.0:3000
