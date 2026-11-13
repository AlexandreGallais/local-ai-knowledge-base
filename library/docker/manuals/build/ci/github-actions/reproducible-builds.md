---
title: "Reproducible builds with GitHub Actions"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/build/ci/github-actions/reproducible-builds.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Reproducible builds with GitHub Actions

`SOURCE_DATE_EPOCH` is a standardized environment variable
for instructing build tools to produce a reproducible output.
Setting the environment variable for a build makes the timestamps in the
image index, config, and file metadata reflect the specified Unix time.

To set the environment variable in GitHub Actions,
use the built-in `env` property on the build step.

## Unix epoch timestamps

The following example sets the `SOURCE_DATE_EPOCH` variable to 0, Unix epoch.

**`docker/build-push-action`**

```yaml
name: ci

on:
  push:

jobs:
  docker:
    runs-on: ubuntu-latest
    steps:
      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@{{% param "setup_buildx_action_version" %}}

      - name: Build
        uses: docker/build-push-action@{{% param "build_push_action_version" %}}
        with:
          tags: user/app:latest
        env:
          SOURCE_DATE_EPOCH: 0
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
      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@{{% param "setup_buildx_action_version" %}}

      - name: Build
        uses: docker/bake-action@{{% param "bake_action_version" %}}
        env:
          SOURCE_DATE_EPOCH: 0
```

## Git commit timestamps

The following example sets `SOURCE_DATE_EPOCH` to the Git commit timestamp.

**`docker/build-push-action`**

```yaml
name: ci

on:
  push:

jobs:
  docker:
    runs-on: ubuntu-latest
    steps:
      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@{{% param "setup_buildx_action_version" %}}

      - name: Get Git commit timestamps
        run: echo "TIMESTAMP=$(git log -1 --pretty=%ct)" >> $GITHUB_ENV

      - name: Build
        uses: docker/build-push-action@{{% param "build_push_action_version" %}}
        with:
          tags: user/app:latest
        env:
          SOURCE_DATE_EPOCH: ${{ env.TIMESTAMP }}
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
      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@{{% param "setup_buildx_action_version" %}}

      - name: Get Git commit timestamps
        run: echo "TIMESTAMP=$(git log -1 --pretty=%ct)" >> $GITHUB_ENV

      - name: Build
        uses: docker/bake-action@{{% param "bake_action_version" %}}
        env:
          SOURCE_DATE_EPOCH: ${{ env.TIMESTAMP }}
```

## Additional information

For more information about the `SOURCE_DATE_EPOCH` support in BuildKit,
see BuildKit documentation.
