---
title: "Add image annotations with GitHub Actions"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/build/ci/github-actions/annotations.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Add image annotations with GitHub Actions

Annotations let you specify arbitrary metadata for OCI image components, such
as manifests, indexes, and descriptors.

To add annotations when building images with GitHub Actions, use the
[metadata-action] to automatically create OCI-compliant annotations. The
metadata action creates an `annotations` output that you can reference, both
with [build-push-action] and [bake-action].

**build-push-action**

```yaml
name: ci

on:
  push:

env:
  IMAGE_NAME: user/app

jobs:
  docker:
    runs-on: ubuntu-latest
    steps:
      - name: Login to Docker Hub
        uses: docker/login-action@{{% param "login_action_version" %}}
        with:
          username: ${{ vars.DOCKERHUB_USERNAME }}
          password: ${{ secrets.DOCKERHUB_TOKEN }}

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@{{% param "setup_buildx_action_version" %}}

      - name: Extract metadata
        id: meta
        uses: docker/metadata-action@{{% param "metadata_action_version" %}}
        with:
          images: ${{ env.IMAGE_NAME }}

      - name: Build and push
        uses: docker/build-push-action@{{% param "build_push_action_version" %}}
        with:
          tags: ${{ steps.meta.outputs.tags }}
          annotations: ${{ steps.meta.outputs.annotations }}
          push: true
```

**bake-action**

```yaml
name: ci

on:
  push:

env:
  IMAGE_NAME: user/app

jobs:
  docker:
    runs-on: ubuntu-latest
    steps:
      - name: Login to Docker Hub
        uses: docker/login-action@{{% param "login_action_version" %}}
        with:
          username: ${{ vars.DOCKERHUB_USERNAME }}
          password: ${{ secrets.DOCKERHUB_TOKEN }}
      
      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@{{% param "setup_buildx_action_version" %}}

      - name: Extract metadata
        id: meta
        uses: docker/metadata-action@{{% param "metadata_action_version" %}}
        with:
          images: ${{ env.IMAGE_NAME }}

      - name: Build
        uses: docker/bake-action@{{% param "bake_action_version" %}}
        with:
          files: |
            ./docker-bake.hcl
            cwd://${{ steps.meta.outputs.bake-file-tags }}
            cwd://${{ steps.meta.outputs.bake-file-annotations }}
          push: true
```

## Configure annotation level

By default, annotations are placed on image manifests. To configure the
annotation level, set
the `DOCKER_METADATA_ANNOTATIONS_LEVELS` environment variable on the
`metadata-action` step to a comma-separated list of all the levels that you
want to annotate. For example, setting `DOCKER_METADATA_ANNOTATIONS_LEVELS` to
`index` results in annotations on the image index instead of the manifests.

The following example creates annotations on both the image index and
manifests.

```yaml
name: ci

on:
  push:

env:
  IMAGE_NAME: user/app

jobs:
  docker:
    runs-on: ubuntu-latest
    steps:
      - name: Login to Docker Hub
        uses: docker/login-action@{{% param "login_action_version" %}}
        with:
          username: ${{ vars.DOCKERHUB_USERNAME }}
          password: ${{ secrets.DOCKERHUB_TOKEN }}
      
      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@{{% param "setup_buildx_action_version" %}}

      - name: Extract metadata
        id: meta
        uses: docker/metadata-action@{{% param "metadata_action_version" %}}
        with:
          images: ${{ env.IMAGE_NAME }}
        env:
          DOCKER_METADATA_ANNOTATIONS_LEVELS: manifest,index

      - name: Build and push
        uses: docker/build-push-action@{{% param "build_push_action_version" %}}
        with:
          tags: ${{ steps.meta.outputs.tags }}
          annotations: ${{ steps.meta.outputs.annotations }}
          push: true
```

> **Note:**
>
> The build must produce the components that you want to annotate. For example,
> to annotate an image index, the build must produce an index. If the build
> produces only a manifest and you specify `index` or `index-descriptor`, the
> build fails.
