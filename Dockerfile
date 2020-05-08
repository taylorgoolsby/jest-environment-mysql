FROM node:10

# libaio and libnuma need to be installed in order to run mysqld.
RUN apt-get update
RUN apt-get install libaio-dev -y
RUN apt-get install libnuma-dev -y

RUN mkdir -p /usr/src/app
COPY . /usr/src/app
WORKDIR /usr/src/app

ENTRYPOINT ["/usr/src/app/entrypoint.sh"]
#RUN yarn
#RUN npm run test