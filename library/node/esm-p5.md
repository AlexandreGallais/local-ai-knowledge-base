---
title: "Modules: ECMAScript modules (part 5 of 5)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/esm.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Modules: ECMAScript modules (part 5 of 5)

### Customizing ESM specifier resolution algorithm

Module customization hooks provide a mechanism for customizing the ESM
specifier resolution algorithm. An example that provides CommonJS-style
resolution for ESM specifiers is commonjs-extension-resolution-loader.
