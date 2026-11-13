---
title: "Automated builds"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/docker-hub/repos/manage/builds/_index.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Automated builds

> **Warning:**
> Docker Hub Automated Builds is a deprecated feature.
> It will be fully retired on April 1, 2027.
> See the migration guide to move to a supported CI/CD workflow.

Docker Hub can automatically build images from source code in an external
repository and automatically push the built image to your Docker repositories.

When you set up automated builds, also called autobuilds, you create a list of
branches and tags that you want to build into Docker images. When you push code
to a source-code branch, for example in GitHub, for one of those listed image
tags, the push uses a webhook to trigger a new build, which produces a Docker
image. The built image is then pushed to Docker Hub.

> **Note:**
>
> You can still use `docker push` to push pre-built images to
repositories with automated builds configured.

If you have automated tests configured, these run after building, but before
pushing to the registry. You can use these tests to create a continuous
integration workflow where a build that fails its tests doesn't push the built
image. Automated tests don't push images to the registry on their own. Learn about automated image testing.

Depending on your subscription,
you may get concurrent builds, which means that `N` autobuilds can be run at the
same time. `N` is configured according to your subscription. Once `N+1` builds
are running, any additional builds go into a queue to be run later.

The maximum number of pending builds in the queue is 30 and Docker Hub discards further
requests. The number of concurrent builds for Pro is 5 and
for Team and Business is 15.
Automated builds can handle images of up to 10 GB in size.
