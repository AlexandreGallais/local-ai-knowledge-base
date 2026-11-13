---
title: "Modules: node:module API (part 3 of 8)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/module.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Modules: node:module API (part 3 of 8)

## Customization Hooks

Node.js currently supports two types of module customization hooks:

1. `module.registerHooks(options)`: takes synchronous hook
   functions that are run directly on the thread where the modules are loaded.
2. `module.register(specifier[, parentURL][, options])`: takes specifier to a
   module that exports asynchronous hook functions. The functions are run on a
   separate loader thread.

The asynchronous hooks incur extra overhead from inter-thread communication,
and have several caveats especially
when customizing CommonJS modules in the module graph.
In most cases, it's recommended to use synchronous hooks via `module.registerHooks()`
for simplicity.
