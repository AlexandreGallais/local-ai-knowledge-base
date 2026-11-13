---
title: "Using secrets with GitHub Actions"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/build/ci/github-actions/secrets.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

A build secret is sensitive information, such as a password or API token, consumed as part of the build process.
Docker Build supports two forms of secrets:

- Secret <example-value> add secrets as files in the build container
  (under `/run/secrets` by default).
- SSH mounts add SSH agent sockets or keys into the build container.

This page shows how to use secrets with GitHub Actions.
For an introduction to secrets in general, see Build secrets.

## Secret <example-value>

In the following example uses and exposes the `GITHUB_TOKEN` secret
as provided by GitHub in your workflow.

First, create a `Dockerfile` that uses the secret:

```dockerfile
# syntax=docker/dockerfile:1
FROM alpine
RUN --mount=type=secret,id=github_token,env=GITHUB_TOKEN ...
```

In this example, the secret name is `github_token`. The following workflow
exposes this secret using the `secrets` input:

```yaml
name: ci

on:
  push:

jobs:
  docker:
    runs-on: ubuntu-latest
    steps:
      - name: Set up QEMU
        uses: docker/setup-qemu-action@{{% param "setup_qemu_action_version" %}}

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@{{% param "setup_buildx_action_version" %}}

      - name: Build
        uses: docker/build-push-action@{{% param "build_push_action_version" %}}
        with:
          platforms: linux/amd64,linux/arm64
          tags: user/app:latest
          secrets: |
            "<example-value>"
```

> **Note:**
> Secrets are mounted as files in the build container.
> By default, they're available at `/run/secrets/<id>`.
> You can also use the `env` option to load a secret into an environment variable,
> or the `target` option to customize the mount path.
> For details on secret <example-value>, see Build secrets.

### Secret <example-value>

The `docker/build-push-action` inputs for secret <example-value> define where the secret
value comes from. The Dockerfile `RUN --mount=type=secret` options define how
the build step consumes the secret.

| Action input                           | Source                             | Equivalent Buildx option                 |
| -------------------------------------- | ---------------------------------- | ---------------------------------------- |
| `secrets: MY_SECRET=value`             | Inline value from the workflow     | `--secret <example-value>,src=<temp-file>`  |
| `secret-envs: MY_SECRET=<example-value>`    | Environment variable on the runner | `--secret <example-value>,env=MY_ENV_VAR`   |
| `secret-files: MY_SECRET=<example-file>` | File on the runner                 | `--secret <example-value>,src=./secret.txt` |

For example, `RUN --mount=type=secret,id=MY_SECRET` mounts the secret as a file
at `/run/secrets/MY_SECRET`. To expose the same secret as an environment
variable for a `RUN` instruction, use the `env` option in the Dockerfile:
`RUN --mount=type=secret,id=MY_SECRET,env=MY_SECRET`.

### Using environment variables as secret <example-value>

The `secret-envs` input reads secrets from environment variables on the GitHub
Actions runner. Use it when a previous workflow step sets an environment
variable, or when you want to map a runner environment variable to a different
secret ID for the build.

```yaml
name: ci

on:
  push:

jobs:
  docker:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@{{% param "checkout_action_version" %}}

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@{{% param "setup_buildx_action_version" %}}

      - name: Build
        uses: docker/build-push-action@{{% param "build_push_action_version" %}}
        env:
          SENTRY_AUTH_TOKEN: ${{ secrets.SENTRY_AUTH_TOKEN }}
        with:
          context: .
          secret-envs: |
            sentry_token=<example-value>
          tags: user/app:latest
```

In your Dockerfile, mount the secret and expose it as an environment variable
for the command that needs it:

```dockerfile
# syntax=docker/dockerfile:1
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

RUN --mount=type=secret,id=sentry_token,env=SENTRY_AUTH_TOKEN \
    npm run build
```

### Using secret files

The `secret-files` input lets you mount existing files as secrets in your build.
This is useful when you need to use credential files that are generated during your workflow,
or when you need to mount configuration files like `.npmrc` or `.pypirc` that are already in the expected format.

The key <example-value> between `secrets`, `secret-envs`, and `secret-files`:

- `secrets`: Pass <example-value> values as strings from the workflow.
- `secret-envs`: Read secret <example-value> from environment variables on the runner.
- `secret-files`: Mount existing files from the runner's filesystem.

#### Example: Using .npmrc for private npm packages

If your build needs to install packages from a private npm registry,
you can create an `.npmrc` file and mount it as a secret:

```yaml
name: ci

on:
  push:

jobs:
  docker:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@{{% param "checkout_action_version" %}}

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@{{% param "setup_buildx_action_version" %}}

      - name: Create .npmrc file
        run: |
          echo "<example-value>" > .npmrc

      - name: Build
        uses: docker/build-push-action@{{% param "build_push_action_version" %}}
        with:
          context: .
          secret-files: |
            npmrc=./.npmrc
          tags: user/app:latest
```

In your Dockerfile, mount the secret file to the expected location:

```dockerfile
# syntax=docker/dockerfile:1
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN --mount=type=secret,id=npmrc,target=/root/.npmrc \
    npm ci

COPY . .

RUN npm run build
```

If a `RUN` instruction uses a non-root user, set `uid`, `gid`, or `mode` on the
secret mount so the user can read the mounted file:

```dockerfile
RUN --mount=type=secret,id=npmrc,target=/home/node/.npmrc,uid=1000,gid=1000 \
    npm ci
```

#### Example: Using dynamically generated credentials

You can generate credential files from multiple secrets and mount them:

```yaml
name: ci

on:
  push:

jobs:
  docker:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@{{% param "checkout_action_version" %}}

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@{{% param "setup_buildx_action_version" %}}

      - name: Create credentials file
        run: |
          cat <<EOF > aws-credentials
          [default]
          aws_access_key_id = ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws_secret_access_key = ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          EOF

      - name: Build
        uses: docker/build-push-action@{{% param "build_push_action_version" %}}
        with:
          context: .
          secret-files: |
            aws=./aws-credentials
          tags: user/app:latest
```

In your Dockerfile:

```dockerfile
# syntax=docker/dockerfile:1
FROM alpine

RUN apk add --no-cache aws-cli

RUN --mount=type=secret,id=aws,target=/root/.aws/credentials \
    aws s3 cp s3://my-private-bucket/data.tar.gz /tmp/
```

### Multi-line secrets

If you're using GitHub secrets
and need to handle multi-line value, you will need to place the key-value pair
between quotes:

```yaml
secrets: |
  "<example-value>"
  GIT_AUTH_TOKEN=<example-value>,jklmno=0123456789
  "MYSECRET=<example-value>
  bbbbbbb
  ccccccccc"
  FOO=bar
  "EMPTYLINE=aaaa

  bbbb
  ccc"
  "<example-value>""<example-value>""<example-value>""<example-value>""<example-value>""<example-value>""<example-value>""<example-value>""<example-value>"
```

| Key              | Value                               |
| ---------------- | ----------------------------------- |
| `MYSECRET`       | `***********************`           |
| `GIT_AUTH_TOKEN` | `abcdefghi,jklmno=0123456789`       |
| `MYSECRET`       | `aaaaaaaa\nbbbbbbb\nccccccccc`      |
| `FOO`            | `bar`                               |
| `EMPTYLINE`      | `aaaa\n\nbbbb\nccc`                 |
| `JSON_SECRET`    | `{"key1":"<example-value>","key2":"<example-value>"}` |

> **Note:**
>
> Double escapes are needed for quote signs.

## SSH mounts

SSH mounts let you authenticate with SSH servers.
For example to perform a `git clone`,
or to fetch application packages from a private repository.

The following Dockerfile example uses an SSH mount
to fetch Go modules from a private GitHub repository.

```dockerfile
# syntax=docker/dockerfile:1

ARG GO_VERSION="{{% param example_go_version %}}"

FROM golang:${GO_VERSION}-alpine AS base
ENV CGO_ENABLED=0
ENV GOPRIVATE="github.com/foo/*"
RUN apk add --no-cache file git rsync openssh-client
RUN mkdir -p -m 0700 ~/.ssh && ssh-keyscan github.com >> ~/.ssh/known_hosts
WORKDIR /src

FROM base AS vendor
# this step configure git and checks the ssh key is loaded
RUN --mount=type=ssh <<EOT
  set -e
  echo "Setting Git SSH protocol"
  git config --global url."user@example.com:".insteadOf "https://github.com/"
  (
    set +e
    ssh -T user@example.com
    if [ ! "$?" = "1" ]; then
      echo "No GitHub SSH key <example-value> exiting..."
      exit 1
    fi
  )
EOT
# this one download go modules
RUN --mount=type=bind,target=. \
    --mount=type=cache,target=/go/pkg/mod \
    --mount=type=ssh \
    go mod download -x

FROM vendor AS build
RUN --mount=type=bind,target=. \
    --mount=type=cache,target=/go/pkg/mod \
    --mount=type=cache,target=/root/.cache \
    go build ...
```

To build this Dockerfile, you must specify an SSH mount that the builder can
use in the steps with `--mount=type=ssh`.

The following GitHub Action workflow uses the `MrSquaare/ssh-setup-action`
third-party action to bootstrap SSH setup on the GitHub runner. The action
creates a private key <example-value> by the GitHub Action secret `SSH_GITHUB_PPK` and
adds it to the SSH agent socket file at `SSH_AUTH_SOCK`. The SSH mount in the
build step assume `SSH_AUTH_SOCK` by default, so there's no need to specify the
ID or path for the SSH agent socket explicitly.

**`docker/build-push-action`**

```yaml
name: ci

on:
  push:

jobs:
  docker:
    runs-on: ubuntu-latest
    steps:
      - name: Set up SSH
        uses: MrSquaare/ssh-setup-action@2d028b70b5e397cf8314c6eaea229a6c3e34977a # v3.1.0
        with:
          host: github.com
          private-key: ${{ secrets.SSH_GITHUB_PPK }}
          private-key-name: github-ppk

      - name: Build and push
        uses: docker/build-push-action@{{% param "build_push_action_version" %}}
        with:
          ssh: default
          push: true
          tags: user/app:latest
```

**`docker/bake-action`**

```yaml
name: ci

on:
  push:

jobs:
  docker:
    runs-on: ubuntu-latest
    steps:
      - name: Set up SSH
        uses: MrSquaare/ssh-setup-action@2d028b70b5e397cf8314c6eaea229a6c3e34977a # v3.1.0
        with:
          host: github.com
          private-key: ${{ secrets.SSH_GITHUB_PPK }}
          private-key-name: github-ppk

      - name: Build
        uses: docker/bake-action@{{% param "bake_action_version" %}}
        with:
          set: |
            *.ssh=default
```
