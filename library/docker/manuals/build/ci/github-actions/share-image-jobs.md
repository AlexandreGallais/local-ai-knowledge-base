---
title: "Share built image between jobs with GitHub Actions"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/build/ci/github-actions/share-image-jobs.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Share built image between jobs with GitHub Actions

As each job is isolated in its own runner, you can't use your built image
between jobs, except if you're using self-hosted runners
or Docker Build Cloud.
However, you can pass data between jobs
in a workflow using the actions/upload-artifact
and actions/download-artifact
actions:

> **Note:**
>
> This workflow supports only single-platform images because the Docker exporter
> doesn't support manifest lists. For multi-platform images, push the image to a
> registry. If a later job rebuilds the image before pushing it, configure a
> shared cache backend to reuse the earlier build results. See also
> Multi-platform image with GitHub Actions.

```yaml
name: ci

on:
  push:

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@{{% param "setup_buildx_action_version" %}}

      - name: Build and export
        uses: docker/build-push-action@{{% param "build_push_action_version" %}}
        with:
          tags: myimage:latest
          outputs: type=docker,dest=${{ runner.temp }}/myimage.tar

      - name: Upload artifact
        uses: actions/upload-artifact@v4
        with:
          name: myimage
          path: ${{ runner.temp }}/myimage.tar

  use:
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Download artifact
        uses: actions/download-artifact@v4
        with:
          name: myimage
          path: ${{ runner.temp }}

      - name: Load image
        run: |
          docker load --input ${{ runner.temp }}/myimage.tar
          docker image ls -a
```
