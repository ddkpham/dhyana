# FROM node:10

# WORKDIR /usr/src/client

# COPY package.json ./

# RUN npm install 

# COPY . . 

# EXPOSE 80 

# CMD ["npm", "start"]


#----------------------------- NGINX -----------------------------------


FROM nginx:latest

# Add a package when building the image:
#RUN apt-get update \
#  && apt-get install -y nginx-module-geoip \
#  && apt-get clean \
#  && rm -rf /var/lib/apt/lists/*

# Copy a local file when building the image:
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY ./build /code/build

# The command to run when the container starts (default for this image would be fine too):
CMD nginx -g "daemon off; error_log /dev/stdout info;"
