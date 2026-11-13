---
title: "Permissions (part 4 of 4)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/permissions.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Permissions (part 4 of 4)

#### Limitations and Known Issues

* Symbolic links will be followed even to locations outside of the set of paths
  that access has been granted to. Relative symbolic links may allow access to
  arbitrary files and directories. When starting applications with the
  permission model enabled, you must ensure that no paths to which access has
  been granted contain relative symbolic links.
