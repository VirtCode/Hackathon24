FROM gradle:8.9.0-jdk21 as builder
WORKDIR /app

COPY . .

RUN gradle bootJar

RUN mv $(find build/libs/ -type f -regex '.*/mensa-v[0-9X]+\.[0-9X]+\.[0-9X]+\.jar') mensa.jar

FROM eclipse-temurin:21-alpine as runner
WORKDIR /app

COPY --from=builder /app/mensa.jar ./mensa.jar

RUN apk add tzdata curl zip
RUN ln -s /usr/share/zoneinfo/Europe/Zurich /etc/localtime

CMD ["java", "-jar", "mensa.jar"]