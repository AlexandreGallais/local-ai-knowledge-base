---
title: "projects | Config"
tool: "vitest"
version: "5.1"
source: "https://github.com/vitest-dev/vitest/blob/7a3844954d8753fc0d5bed76a96ffd3a21716c22/docs/config/projects.md"
commit: "7a3844954d8753fc0d5bed76a96ffd3a21716c22"
license: "MIT"
---

# projects

- **Type:** `TestProjectConfiguration[]`
- **Default:** `[]`

An array of projects.

A config file that declares `projects` doesn't run tests itself, it only provides the projects that do. This also applies to project config files: a referenced config that declares `projects` becomes a container for nested projects. The option is not supported inside an inline project configuration.
