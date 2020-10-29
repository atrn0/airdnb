FROM alpine:3 as builder

ENV VERSION 0.7.7

RUN set -ex \
    && apk add --no-cache curl tar \
    && curl -fSL https://github.com/k0kubun/sqldef/releases/download/v$VERSION/psqldef_linux_amd64.tar.gz -o psqldef.tar.gz \
    && tar -zxf psqldef.tar.gz

FROM scratch
COPY --from=builder /psqldef /usr/local/bin/psqldef
CMD ["psqldef"]
