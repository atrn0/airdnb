FROM golang:1.15

ENV GOOS=linux
ENV GOARCH=amd64
ENV CGO_ENABLED=0
ENV GO111MODULE=on

WORKDIR /go/src/github.com/atrn0/le4db

COPY go.mod go.sum ./
RUN go mod download

COPY . .
RUN go build -o /le4db main.go

RUN go get github.com/cespare/reflex

RUN chmod a+x /le4db
