FROM node:8.12-alpine
ADD . myResume
RUN node -v || exit 1 \ 
    && cd myResume || exit 1 \
    && npm rebuild node-sass || exit 1 \
    && npm install -g gulp || exit 1 \
    && gulp || exit 1 


ENTRYPOINT [ "gulp", "dev" ]
