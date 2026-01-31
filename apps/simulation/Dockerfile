FROM golang:1.22-alpine AS build
WORKDIR /src
COPY . .
RUN go build -o /bin/simulation .

FROM alpine:3.19
WORKDIR /app
COPY --from=build /bin/simulation /usr/local/bin/simulation
ENV SIM_PORT=8081
EXPOSE 8081
CMD ["simulation"]
