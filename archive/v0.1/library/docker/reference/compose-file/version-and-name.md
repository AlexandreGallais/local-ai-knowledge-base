---
title: "Version and name top-level elements"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/reference/compose-file/version-and-name.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Version and name top-level elements

## Version top-level element (obsolete)

> **Important:**
>
> The top-level `version` property is defined by the Compose Specification for backward compatibility. It is only informative and you'll receive a warning message that it is obsolete if used.

Compose always uses the most recent schema to validate the Compose file, regardless of the `version` field.

Compose validates whether it can fully parse the Compose file. If some fields are unknown, typically
because the Compose file was written with fields defined by a newer version of the Specification, you'll receive a warning message.

## Name top-level element

The top-level `name` property is defined by the Compose Specification as the project name to be used if you don't set one explicitly.

Compose offers a way for you to override this name, and sets a
default project name to be used if the top-level `name` element is not set.

Whenever a project name is defined by top-level `name` or by some custom mechanism, it is exposed for
interpolation and environment variable resolution as `COMPOSE_PROJECT_NAME`

```yml
name: myapp

services:
  foo:
    image: busybox
    command: echo "I'm running ${COMPOSE_PROJECT_NAME}"
```

For more information on other ways to name Compose projects, see Specify a project name.
