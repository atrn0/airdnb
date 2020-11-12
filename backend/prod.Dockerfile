FROM golang:1.15-alpine as build-env

ENV GOOS=linux
ENV GOARCH=amd64
ENV CGO_ENABLED=0
ENV GO111MODULE=on

WORKDIR /go/src/github.com/atrn0/le4db/backend

COPY go.mod go.sum ./
RUN go mod download

COPY . ./
RUN go build -o /le4db main.go

FROM alpine:3

COPY --from=build-env /le4db /le4db
RUN chmod a+x /le4db

EXPOSE 8080
