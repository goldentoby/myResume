FROM node:6-alpine
ADD . myResume
RUN node -v || exit 1 \ 
    && cd myResume || exit 1 \
    && npm install node-sass || exit 1 \
    && npm install -g gulp || exit 1 \
    && gulp || exit 1 


ENTRYPOINT [ "gulp", "dev" ]


