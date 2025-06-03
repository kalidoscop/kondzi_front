# FROM --platform=$BUILDPLATFORM node:latest as builder
FROM node:20-alpine as builder

RUN mkdir /project
WORKDIR /project

COPY . .
RUN npm install --force
RUN npm run build

EXPOSE 4000
CMD ["npm", "run", "serve:ssr:kondzi_front"]

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