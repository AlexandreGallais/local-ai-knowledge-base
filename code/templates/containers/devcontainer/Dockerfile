# syntax=docker/dockerfile:1
# check=error=true
# Image of the .NET and Angular dev container. The coding assistant and the check tools run in it.
# Copy this folder as .devcontainer/ at the project root.

ARG DOTNET_VERSION=10.0
ARG NODE_VERSION=24

FROM docker.io/library/node:${NODE_VERSION} AS node

FROM mcr.microsoft.com/dotnet/sdk:${DOTNET_VERSION}

# Node.js and npm, taken from the official Node.js image.
COPY --from=node /usr/local/bin/node /usr/local/bin/
COPY --from=node /usr/local/lib/node_modules /usr/local/lib/node_modules
RUN ln -s ../lib/node_modules/npm/bin/npm-cli.js /usr/local/bin/npm \
 && ln -s ../lib/node_modules/npm/bin/npx-cli.js /usr/local/bin/npx

# Check tools: put the Linux binaries of hadolint, kubeconform, kube-linter and helm in tools/ once.
COPY tools/ /usr/local/bin/

# Kubernetes JSON schemas for kubeconform, for the version of the cluster.
COPY kubernetes-schemas/ /opt/kubernetes-schemas/

# The coding assistant: its npm package with its version, "<package>@<version>", set in devcontainer.json.
ARG ASSISTANT_PACKAGE=""
# hadolint ignore=DL3016
RUN if [ -n "$ASSISTANT_PACKAGE" ]; then npm install --global "$ASSISTANT_PACKAGE"; fi

# Non-root user of the .NET images (UID 1654).
USER app
