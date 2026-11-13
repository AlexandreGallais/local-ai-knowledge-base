---
title: "Use Docker Hardened Images with Red Hat OpenShift (part 1 of 2)"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/guides/dhi-openshift.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

Docker Hardened Images (DHI) can be deployed on Red Hat OpenShift Container
Platform, but OpenShift’s security model differs from standard Kubernetes in
ways that require specific configuration. Because OpenShift runs containers
with an arbitrarily assigned user ID rather than the image’s default, you must
adjust file ownership and group permissions in your Dockerfiles to ensure
writable paths remain accessible.

This guide explains how to deploy Docker Hardened Images in OpenShift
environments, covering Security Context Constraints (SCCs), arbitrary user ID
assignment, file permission requirements, and best practices for both runtime
and development image variants.

## How OpenShift security differs from Kubernetes

OpenShift extends Kubernetes with Security Context Constraints (SCCs), which
control what actions a pod can perform and what resources it can access. While
vanilla Kubernetes uses Pod Security Standards (PSS) for similar purposes, SCCs
are more granular and enforced by default.

The key differences that affect DHI deployments:

**Arbitrary user IDs.** By default, OpenShift runs containers using an
arbitrarily assigned user ID (UID) from a range allocated to each project. The
default `restricted-v2` SCC (introduced in OpenShift 4.11) uses the
`MustRunAsRange` strategy, which overrides the `USER` directive in the container
image with a UID from the project’s allocated range (typically starting higher than
1000000000). This means even though a DHI image specifies a non-root user
(UID 65532), OpenShift will run the container as a different, unpredictable UID.

**Root group requirement.** OpenShift assigns the arbitrary UID to the root
group (GID 0). The container process always runs with `gid=0(root)`. Any
directories or files that the process needs to write to must be owned by the
root group (GID 0) with group read/write permissions. This is documented in the
Red Hat guidelines for creating images.

> **Important:**
>
> DHI images set file ownership to `nonroot:nonroot` (65532:65532) by default.
> Because the OpenShift arbitrary UID is NOT in the `nonroot` group (65532), it
> cannot write to those files — even though the pod is admitted by the SCC and
> the container starts. You must change group ownership to GID 0 for any
> writable path. This is the most common source of permission errors when
> deploying DHI on OpenShift.

**Capability restrictions.** The `restricted-v2` SCC drops all Linux
capabilities by default and enforces `allowPrivilegeEscalation: false`,
`runAsNonRoot: true`, and a `seccompProfile` of type `RuntimeDefault`. DHI
runtime images already satisfy these constraints because they run as a non-root
user and don’t require elevated capabilities.

## Pull DHI images into OpenShift

Before deploying, create an image pull secret so your OpenShift cluster can
authenticate to the DHI registry or your mirrored repository on Docker Hub.

### Create an image pull secret

```console
oc create secret docker-registry dhi-pull-secret \
    --docker-server=docker.io \
    --docker-username=<your-docker-username> \
    --docker-password=<your-docker-access-token> \
    --docker-email=<your-email>
```

If you’re pulling directly from `dhi.io` instead of a mirrored repository, set
`--docker-server=dhi.io`.

### Link the secret to a service account

Link the pull secret to the `default` service account in your project so that
all deployments can pull DHI images automatically:

```console
oc secrets link default dhi-pull-secret --for=pull
```

To use the secret with a specific service account instead:

```console
oc secrets link <service-account-name> dhi-pull-secret --for=pull
```

## Build OpenShift-compatible images from DHI

DHI runtime images are distroless — they contain no shell, no package manager,
and no `RUN`-capable environment. This means you **cannot use `RUN` commands in
the runtime stage** of your Dockerfile. All file permission adjustments for
OpenShift must happen in the `-dev` build stage, and the results must be copied
into the runtime stage using `COPY --chown`.

The core pattern for OpenShift compatibility:

1. Use a DHI `-dev` variant as the build stage (it has a shell).
1. Build your application and set GID 0 ownership in the build stage.
1. Copy the results into the DHI runtime image using `COPY --chown=<UID>:0`.

### Example: Nginx for OpenShift

```dockerfile
# Build stage — has a shell, can run commands
FROM YOUR_ORG/dhi-nginx:1.29-alpine3.23-dev AS build

# Copy custom config and set root group ownership
COPY nginx.conf /tmp/nginx.conf
COPY default.conf /tmp/default.conf

# Prepare writable directories with GID 0
# (Nginx needs to write to cache, logs, and PID file locations)
RUN mkdir -p /tmp/nginx-cache /tmp/nginx-run && \
    chgrp -R 0 /tmp/nginx-cache /tmp/nginx-run && \
    chmod -R g=u /tmp/nginx-cache /tmp/nginx-run

# Runtime stage — distroless, NO shell, NO RUN commands
FROM YOUR_ORG/dhi-nginx:1.29-alpine3.23

COPY --from=build --chown=65532:0 /tmp/nginx.conf /etc/nginx/nginx.conf
COPY --from=build --chown=65532:0 /tmp/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build --chown=65532:0 /tmp/nginx-cache /var/cache/nginx
COPY --from=build --chown=65532:0 /tmp/nginx-run /var/run
```

> **Important:**
>
> Always use `--chown=<UID>:0` (user:root-group) when copying files into the
> runtime stage. This ensures the arbitrary UID that OpenShift assigns can
> access the files through root group membership. Never use `RUN` in the runtime
> stage — distroless DHI images have no shell.

> **Note:**
>
> The UID for DHI images varies by image. Most use 65532 (`nonroot`), but some
> (like the Node.js image) may use a different UID. Verify with:
> `docker inspect dhi.io/<image>:<tag> --format '{{.Config.User}}'`

Deploy to OpenShift:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-dhi
spec:
  replicas: 1
  selector:
    matchLabels:
      app: nginx-dhi
  template:
    metadata:
      labels:
        app: nginx-dhi
    spec:
      containers:
        - name: nginx
          image: YOUR_ORG/dhi-nginx:1.29-alpine3.23
          ports:
            - containerPort: 8080
          securityContext:
            allowPrivilegeEscalation: false
            runAsNonRoot: true
            seccompProfile:
              type: RuntimeDefault
            capabilities:
              drop:
                - ALL
      imagePullSecrets:
        - name: dhi-pull-secret
```

DHI Nginx listens on port 8080 by default (not 80), which is compatible with
the non-root requirement. No SCC changes are needed.

### Example: Node.js application for OpenShift

```dockerfile
# Build stage — dev variant has shell and npm
FROM YOUR_ORG/dhi-node:24-alpine3.23-dev AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Set GID 0 on everything the runtime needs to write
RUN chgrp -R 0 /app/dist /app/node_modules && \
    chmod -R g=u /app/dist /app/node_modules

# Runtime stage — distroless, NO shell
FROM YOUR_ORG/dhi-node:24-alpine3.23
WORKDIR /app
COPY --from=build --chown=65532:0 /app/dist ./dist
COPY --from=build --chown=65532:0 /app/node_modules ./node_modules
CMD ["node", "dist/index.js"]
```

Deploy:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: node-app
spec:
  replicas: 2
  selector:
    matchLabels:
      app: node-app
  template:
    metadata:
      labels:
        app: node-app
    spec:
      containers:
        - name: app
          image: YOUR_ORG/dhi-node-app:latest
          ports:
            - containerPort: 3000
          securityContext:
            allowPrivilegeEscalation: false
            runAsNonRoot: true
            seccompProfile:
              type: RuntimeDefault
            capabilities:
              drop:
                - ALL
      imagePullSecrets:
        - name: dhi-pull-secret
```

## Handle arbitrary user IDs

OpenShift’s `restricted-v2` SCC assigns a random UID to the container process.
This UID won’t exist in `/etc/passwd` inside the image, but the container will
still run — the process just won’t have a username associated with it.

This can cause issues with applications that:

- Look up the current user’s home directory or username
- Write to directories owned by a specific UID
- Check `/etc/passwd` for the running user

### Add a `passwd` entry for the arbitrary UID

Some applications (notably those using certain Python or Java libraries) require
a valid `/etc/passwd` entry for the running user. You can handle this with a
wrapper entrypoint script.

Because this pattern requires a shell, it only works with DHI `-dev` variants or
with a DHI Enterprise customized image that includes a shell. Prepare the image
in the build stage:

```dockerfile
FROM YOUR_ORG/dhi-python:3.13-alpine3.23-dev AS build
# ... build your application ...

# Make /etc/passwd group-writable so the entrypoint can append to it
RUN chgrp 0 /etc/passwd && chmod g=u /etc/passwd

# Create the entrypoint wrapper
RUN printf '#!/bin/sh\n\
if ! whoami > /dev/null 2>&1; then\n\
  if [ -w /etc/passwd ]; then\n\
    echo "${USER_NAME:-appuser}:x:$(id -u):0:dynamic user:/tmp:/sbin/nologin" >> /etc/passwd\n\
  fi\n\
fi\n\
exec "$@"\n' > /entrypoint.sh && chmod +x /entrypoint.sh

# This pattern requires a -dev variant as runtime (has shell)
FROM YOUR_ORG/dhi-python:3.13-alpine3.23-dev
COPY --from=build --chown=65532:0 /app ./app
COPY --from=build --chown=65532:0 /entrypoint.sh /entrypoint.sh
COPY --from=build --chown=65532:0 /etc/passwd /etc/passwd
USER 65532
ENTRYPOINT ["/entrypoint.sh"]
CMD ["python", "app/main.py"]
```

> **Note:**
>
> For distroless runtime images (no shell), the passwd-injection pattern is not
> possible. Instead, use the `nonroot` SCC (described in the following section) to run with the
> image’s built-in UID so the existing `/etc/passwd` entry matches the running
> process. Alternatively, OpenShift 4.x automatically injects the arbitrary UID
> into `/etc/passwd` in most cases, which resolves this for many applications.

## Use the non-root SCC for fixed UIDs

If your application requires running as the specific UID defined in the image
(typically 65532 for DHI), you can use the `nonroot` SCC instead of the default
`restricted-v2`. The `nonroot` SCC uses the `MustRunAsNonRoot` strategy, which
allows any non-zero UID.

> **Important:**
>
> For the `nonroot` SCC to work, the image’s `USER` directive must specify a
> **numeric** UID (for example, `65532`), not a username string like `nonroot`.
> OpenShift cannot verify that a username maps to a non-zero UID. Verify your
> DHI image with:
> `docker inspect YOUR_ORG/dhi-node:24-alpine3.23 --format '{{.Config.User}}'`
> If the output is a string rather than a number, set `runAsUser` explicitly in
> the pod spec.

Create a service account and grant it the `nonroot` SCC:

```console
oc create serviceaccount dhi-nonroot
oc adm policy add-scc-to-user nonroot -z dhi-nonroot
```

Reference the service account in your deployment:

```yaml
spec:
  template:
    spec:
      serviceAccountName: dhi-nonroot
      containers:
        - name: app
          image: YOUR_ORG/dhi-node:24-alpine3.23
          securityContext:
            runAsUser: 65532
            runAsNonRoot: true
            allowPrivilegeEscalation: false
            seccompProfile:
              type: RuntimeDefault
            capabilities:
              drop:
                - ALL
```

Verify the SCC assignment after deployment:

```console
oc get pod <pod-name> -o jsonpath='{.metadata.annotations.openshift\.io/scc}'
```

This should return `nonroot`.

When using the `nonroot` SCC with a fixed UID, the process runs as 65532
(matching the image’s file ownership), so the GID 0 adjustments are not strictly
required for paths already owned by 65532. However, applying `chown <UID>:0` is
still recommended for portability across both `restricted-v2` and `nonroot` SCCs.

## Use DHI dev variants in OpenShift

DHI `-dev` variants include a shell, package manager, and development tools.
They run as root (UID 0) by default, which conflicts with OpenShift’s
`restricted-v2` SCC. There are three approaches:

### Option 1: Use dev variants only in build stages (recommended)

Use `-dev` variants only in Dockerfile build stages and never deploy them
directly to OpenShift:

```dockerfile
FROM YOUR_ORG/dhi-node:24-alpine3.23-dev AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Set root group ownership for OpenShift compatibility
RUN chgrp -R 0 /app/dist /app/node_modules && \
    chmod -R g=u /app/dist /app/node_modules

FROM YOUR_ORG/dhi-node:24-alpine3.23
WORKDIR /app
COPY --from=build --chown=65532:0 /app/dist ./dist
COPY --from=build --chown=65532:0 /app/node_modules ./node_modules
CMD ["node", "dist/index.js"]
```

The final runtime image is non-root and distroless, fully compatible with
`restricted-v2`.

### Option 2: Grant the `anyuid` SCC for debugging

If you need to run a `-dev` variant directly in OpenShift for debugging, grant
the `anyuid` SCC to a dedicated service account:

```console
oc create serviceaccount dhi-debug
oc adm policy add-scc-to-user anyuid -z dhi-debug
```

Then reference it in your pod:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: dhi-debug
spec:
  serviceAccountName: dhi-debug
  containers:
    - name: debug
      image: YOUR_ORG/dhi-node:24-alpine3.23-dev
      command: ["sleep", "infinity"]
  imagePullSecrets:
    - name: dhi-pull-secret
```

> **Important:**
>
> The `anyuid` SCC allows running as any UID including root. Only use this for
> temporary debugging — never in production workloads.

### Option 3: Use `oc debug` or ephemeral containers

For distroless runtime images with no shell, use OpenShift-native debugging
tools instead of `docker debug` (which only works with Docker Engine, not with
CRI-O on OpenShift).

Use `oc debug` to create a copy of a pod with a debug shell:

```console
# Create a debug pod based on a deployment
oc debug deployment/nginx-dhi

# Override the image to use a -dev variant with a shell
oc debug deployment/nginx-dhi --image=YOUR_ORG/dhi-node:24-alpine3.23-dev
```

Use ephemeral containers (OpenShift 4.12+ / Kubernetes 1.25+):

```console
kubectl debug -it <pod-name> --image=YOUR_ORG/dhi-node:24-alpine3.23-dev \
    --target=app -- sh
```

This attaches a temporary debug container to a running pod without restarting
it, sharing the pod’s process namespace.

> **Note:**
>
> `docker debug` is a Docker Desktop/CLI feature for local development. It is
> not available on OpenShift clusters, which use CRI-O as their container
> runtime.
