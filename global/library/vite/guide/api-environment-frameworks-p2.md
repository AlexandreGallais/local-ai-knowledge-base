---
title: "Environment API for Frameworks (part 2 of 2)"
tool: "vite"
version: "8.3"
source: "https://github.com/vitejs/vite/blob/b39e6e63dcbfc3cf4be871acf3554efbd6d0e268/docs/guide/api-environment-frameworks.md"
commit: "b39e6e63dcbfc3cf4be871acf3554efbd6d0e268"
license: "MIT"
---

# Environment API for Frameworks (part 2 of 2)

## Environment Agnostic Code

Most of the time, the current `environment` instance will be available as part of the context of the code being run so the need to access them through `server.environments` should be rare. For example, inside plugin hooks the environment is exposed as part of the `PluginContext`, so it can be accessed using `this.environment`. See Environment API for Plugins to learn about how to build environment aware plugins.
