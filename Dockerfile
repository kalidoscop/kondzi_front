# syntax=docker/dockerfile:1.4

# FROM --platform=$BUILDPLATFORM node:latest as builder

# RUN mkdir /project
# WORKDIR /project

# RUN npm install -g @angular/cli@13

# COPY package.json package-lock.json ./
# RUN npm ci

# COPY . .
# RUN chmod +x ./entrypoint.sh
# ENTRYPOINT [ "sh","./entrypoint.sh" ]
# CMD ["ng", "serve", "--host", "0.0.0.0"]

# FROM builder as prod-envs

# RUN <<EOF
# apt-get update
# apt-get install -y --no-install-recommends git
# EOF

# RUN <<EOF
# useradd -s /bin/bash -m vscode
# groupadd docker
# usermod -aG docker vscode
# EOF
# # install Docker tools (cli, buildx, compose)
# COPY --from=gloursdocker/docker / /

# CMD ["ng", "serve", "--host", "0.0.0.0"]

ARG  NODE_IMAGE=node:20-alpine3.18

FROM $NODE_IMAGE AS angular

WORKDIR /app

COPY . .

RUN npm install
RUN npm run build

FROM httpd:alpine3.15

WORKDIR /usr/local/apache2/htdocs
COPY --from=angular /app/dist/kondzi_front .
