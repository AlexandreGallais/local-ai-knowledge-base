---
title: "Dev Container Features reference (part 4 of 4)"
tool: "devcontainers"
version: "2026-11"
source: "https://github.com/devcontainers/spec/blob/c95ffeed1d059abfe9ffbe79762dc2fa4e7c2421/docs/specs/devcontainer-features.md"
commit: "c95ffeed1d059abfe9ffbe79762dc2fa4e7c2421"
license: "CC-BY-4.0"
---

# Dev Container Features reference (part 4 of 4)

### Option resolution example

Suppose a `python` Feature has the following `options` parameters declared in the `devcontainer-feature.json` file:

```jsonc
// ...
"options": {
    "version": {
        "type": "string",
        "enum": ["latest", "3.10", "3.9", "3.8", "3.7", "3.6"],
        "default": "latest",
        "description": "Select a Python version to install."
    },
    "pip": {
        "type": "boolean",
        "default": true,
        "description": "Installs pip"
    },
    "optimize": {
        "type": "boolean",
        "default": true,
        "description": "Optimize python installation"
    }
}
```

The user's `devcontainer.json` declared the python Feature like so

```jsonc

"features": {
    "ghcr.io/devcontainers/features/python:1": {
        "version": "3.10",
        "pip": false
    }
}
```
The emitted environment variables will be:

```env
VERSION="3.10"
PIP="false"
OPTIMIZE="true"
```

These will be sourced and visible to the `install.sh` entrypoint script.  The following `install.sh`...

```bash
#!/usr/bin/env bash

echo "Version is $VERSION"
echo "Pip? $PIP"
echo "Optimize? $OPTIMIZE"
```

... outputs the following:
```
Version is 3.10
Pip? false
Optimize? true
```

### Steps to rename a Feature

1. Update the Feature source code folder and the `id` property in the devcontainer-feature.json properties to reflect the new `id`. Other properties (`name`, `documentationUrl`, etc.) can optionally be updated during this step.
2. Add or update the `legacyIds` property to the Feature, including the previously used `id`.
3. Bump the semantic version of the Feature.
4. Rerun the `devcontainer features publish` command, or equivalent tool that implements the Features distribution specification.

#### Example: Renaming a Feature

Let's say we currently have a `docker-from-docker` Feature 👇

Current `devcontainer-feature.json` :

```jsonc
{
    "id": "docker-from-docker",
    "version": "2.0.1",
    "name": "Docker (Docker-from-Docker)",
    "documentationURL": "https://github.com/devcontainers/features/tree/main/src/docker-from-docker",
    ....
}
```

We'd want to rename this Feature to `docker-outside-of-docker`. The source code folder of the Feature will be updated to `docker-outside-of-docker` and the updated `devcontainer-feature.json` will look like 👇

```jsonc
{
    "id": "docker-outside-of-docker",
    "version": "2.0.2",
    "name": "Docker (Docker-outside-of-Docker)",
    "documentationURL": "https://github.com/devcontainers/features/tree/main/src/docker-outside-of-docker",
    "legacyIds": [
        "docker-from-docker"
    ]
    ....
}
```

**Note** - The semantic version of the Feature defined by the `version` property should be **continued** and should not be restarted at `1.0.0`.

### Implementation notes

There are several things to keep in mind for an application that implements Features:

- The order of execution of Features is determined by the application, based on the `installsAfter` property used by feature authors. It can be overridden by users if necessary with the `overrideFeatureInstallOrder` in `devcontainer.json`.
- Features are used to create an image that can be used to create a container or not.
- Parameters like `privileged`, `init` are included if just 1 Feature requires them.
- Parameters like `capAdd`, `securityOp`  are concatenated.
- `containerEnv` is added before the Feature is executed as `ENV` commands in the Dockerfile.
- Each Feature script executes as its own layer to aid in caching and rebuilding.
