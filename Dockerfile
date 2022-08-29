# 本番環境
FROM nginx:stable-alpine
COPY /dist /usr/share/nginx/html

COPY ./nginx.conf /etc/nginx/nginx.conf
COPY ./default.conf /etc/nginx/conf.d/default.conf

EXPOSE 8888
CMD ["nginx", "-g", "daemon off;"]