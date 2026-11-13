---
title: "Using Docker Scout in continuous integration"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/scout/integrations/ci/_index.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Using Docker Scout in continuous integration

You can analyze Docker images in continuous integration pipelines as you build
them using a GitHub action or the Docker Scout CLI plugin.

Available integrations:

- GitHub Actions
- GitLab
- Microsoft Azure DevOps Pipelines
- Circle CI
- Jenkins

You can also add runtime integration as part of your CI/CD pipeline, which lets
you assign an image to an environment, such as `production` or `staging`, when
you deploy it. For more information, see Environment monitoring.
