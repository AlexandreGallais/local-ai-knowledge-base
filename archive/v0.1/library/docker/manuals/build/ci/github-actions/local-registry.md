---
title: "Local registry with GitHub Actions"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/build/ci/github-actions/local-registry.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Local registry with GitHub Actions

For testing purposes you may need to create a local registry
to push images into:

```yaml
name: ci

on:
  push:

jobs:
  docker:
    runs-on: ubuntu-latest
    services:
      registry:
        image: registry:3
        ports:
          - 5000:5000
    steps:
      - name: Set up QEMU
        uses: docker/setup-qemu-action@{{% param "setup_qemu_action_version" %}}
      
      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@{{% param "setup_buildx_action_version" %}}
        with:
          driver-opts: network=host
      
      - name: Build and push to local registry
        uses: docker/build-push-action@{{% param "build_push_action_version" %}}
        with:
          push: true
          tags: localhost:5000/name/app:latest
      
      - name: Inspect
        run: |
          docker buildx imagetools inspect localhost:5000/name/app:latest
```
