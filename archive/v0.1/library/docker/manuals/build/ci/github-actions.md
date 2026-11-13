---
title: "Docker Build GitHub Actions"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/build/ci/github-actions/_index.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Docker Build GitHub Actions

GitHub Actions is a popular CI/CD platform for automating your build, test, and
deployment pipeline. Docker provides a set of official GitHub Actions for you to
use in your workflows. These official actions are reusable, easy-to-use
components for building, annotating, and pushing images.

The following GitHub Actions are available:

- Build and push Docker images:
  build and push Docker images with BuildKit.
- Docker Buildx Bake:
  enables using high-level builds with Bake.
- Docker Login:
  sign in to a Docker registry.
- Docker Setup Buildx:
  creates and boots a BuildKit builder.
- Docker Metadata action:
  extracts metadata from Git reference and GitHub events to generate tags,
  labels, and annotations.
- Docker Setup Compose:
  installs and sets up Compose.
- Docker Setup Docker:
  installs Docker Engine.
- Docker Setup QEMU:
  installs QEMU static binaries for
  multi-platform builds.
- Docker Scout:
  analyze Docker images for security vulnerabilities.

Using Docker's actions provides an easy-to-use interface, while still allowing
flexibility for customizing build parameters.

> **Note:**
> For an alternative to configuring individual actions, see
> Docker GitHub Builder.
> It provides Docker-maintained reusable workflows for building images and artifacts
> with BuildKit.

## Get started

Build an image from your GitHub repository and push it to Docker Hub with the
following workflow.

### Prerequisites

- A GitHub repository with your application and a `Dockerfile` at its root.
- A Docker Hub account and a
  personal access token
  with permission to push images.

### Configure your GitHub repository

Add your Docker Hub credentials to your GitHub repository:

1. Open your repository's **Settings**.
2. Under **Security**, go to **Secrets and variables > Actions**.
3. Under **Secrets**, create a repository secret named `DOCKERHUB_TOKEN`
   containing your Docker access token.
4. Under **Variables**, create a repository variable named `DOCKERHUB_USERNAME`
   containing your Docker Hub username.

### Set up your GitHub Actions workflow

Create `.github/workflows/docker-ci.yml` in your repository with the following
contents. Replace `my-image` with the name of your Docker Hub repository, and
change `main` if your default branch has a different name.

```yaml
name: Build and push Docker image

on:
  push:
    branches:
      - main
  pull_request:

permissions:
  contents: read

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Extract Docker image metadata
        id: meta
        uses: docker/metadata-action@{{% param "metadata_action_version" %}}
        with:
          images: ${{ vars.DOCKERHUB_USERNAME }}/my-image

      - name: Sign in to Docker Hub
        if: github.event_name != 'pull_request'
        uses: docker/login-action@{{% param "login_action_version" %}}
        with:
          username: ${{ vars.DOCKERHUB_USERNAME }}
          password: ${{ secrets.DOCKERHUB_TOKEN }}

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@{{% param "setup_buildx_action_version" %}}

      - name: Build and push Docker image
        uses: docker/build-push-action@{{% param "build_push_action_version" %}}
        with:
          push: ${{ github.event_name != 'pull_request' }}
          tags: ${{ steps.meta.outputs.tags }}
          labels: ${{ steps.meta.outputs.labels }}
          annotations: ${{ steps.meta.outputs.annotations }}
```

Commit the workflow file and push it to your default branch to run it. The
workflow also runs on pull requests. Pull-request builds skip signing in to
Docker Hub and pushing the image, so they don't require registry secrets,
including for pull requests from forks.

The build action uses Git context by default: BuildKit fetches your repository
directly at the Git reference for the event that triggered the workflow, so no
checkout step is needed. Changes to files made by earlier workflow steps are
ignored because the build uses files from Git.

The metadata action generates tags, labels, and
annotations from the GitHub event and passes them to the build step. For
example, a push to `main` publishes `DOCKERHUB_USERNAME/my-image:main`.
See Manage tags and labels
and Annotations to customize
this metadata.

This workflow builds images but doesn't run application tests. To add tests,
see Test before push.
For additional build options, see
Multi-platform images and
SBOM and provenance attestations,
which covers default provenance and how to add SBOM attestations when pushing
to a registry.

## Examples

If you're looking for examples on how to use the Docker GitHub Actions,
refer to the following sections:
