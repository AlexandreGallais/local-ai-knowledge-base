---
title: "Use multiple Compose files"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/compose/how-tos/multiple-compose-files/_index.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Use multiple Compose files

This section contains information on the ways you can work with multiple Compose files.

Using multiple Compose files lets you customize a Compose application for different environments or workflows. This is useful for large applications that may use dozens of containers, with ownership distributed across multiple teams. For example, if your organization or team uses a monorepo, each team may have their own “local” Compose file to run a subset of the application. They then need to rely on other teams to provide a reference Compose file that defines the expected way to run their own subset. Complexity moves from the code in to the infrastructure and the configuration file.

The simplest way to work with multiple Compose files is to merge them using
the `-f` flag. This works well for straightforward overrides, but the
merging rules can make it complex to manage as your
configuration grows.

Docker Compose provides two other options to manage this complexity when working with multiple Compose files. Depending on your project's needs, you can:

- Extend a Compose file by referring to another Compose file and selecting the bits you want to use in your own application, with the ability to override some attributes.
- Include other Compose files directly in your Compose file.
