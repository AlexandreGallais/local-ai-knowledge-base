---
title: "The build and publish process"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/extensions/extensions-sdk/process.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# The build and publish process

This documentation is structured so that it matches the steps you need to take when creating your extension.

There are two main parts to creating a Docker extension:

1. Build the foundations
2. Publish the extension

> **Note:**
>
> You do not need to pay to create a Docker extension. The Docker Extension SDK is licensed under the Apache 2.0 License and is free to use. Anyone can create new extensions and share them without constraints.
>
> There is also no constraint on how each extension should be licensed, this is up to you to decide when creating a new extension.

## Part one: Build the foundations

The build process consists of:

- Installing the latest version of Docker Desktop.
- Setting up the directory with files, including the extension’s source code and the required extension-specific files.
- Creating the `Dockerfile` to build, publish, and run your extension in Docker Desktop.
- Configuring the metadata file which is required at the root of the image filesystem.
- Building and installing the extension.

For further inspiration, see the other examples in the samples folder.

> **Tip:**
>
> Whilst creating your extension, make sure you follow the design and UI styling guidelines to ensure visual consistency and level AA accessibility standards.

## Part two: Publish and distribute your extension

> **Important:**
>
> New submissions to the Docker Extensions Marketplace are paused while Docker reviews Marketplace security. You can still update existing extensions, and private Marketplace extensions are unaffected. Contact user@example.com if you have additional questions.

Docker Desktop displays published extensions in the Extensions Marketplace. The Extensions Marketplace is a curated space where developers can discover extensions to improve their developer experience and upload their own extension to share with the world.

If you want your extension published in the Marketplace, read the publish documentation.

> Already built an extension?
>
> Let us know about your experience using the feedback form.

## What’s next?

If you want to get up and running with creating a Docker Extension, see the Quickstart guide.

Alternatively, get started with reading the "Part one: Build" section for more in-depth information about each step of the extension creation process.
