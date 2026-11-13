---
title: "Compose Build Specification (part 3 of 3)"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/reference/compose-file/build.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Compose Build Specification (part 3 of 3)

### `ulimits`

`ulimits` overrides the default `ulimits` for a container. It's specified either as an integer for a single limit
or as mapping for soft/hard limits.

```yml
services:
  frontend:
    build:
      context: .
      ulimits:
        nproc: 65535
        nofile:
          soft: 20000
          hard: 40000
```
