---
name: devcontainer-authoring
description: "Writes or changes devcontainer.json for Podman - image, features, postCreateCommand, mounts, remoteUser, forwardPorts, runArgs. Use when creating or editing .devcontainer/devcontainer.json or its Containerfile, adding a tool or a port to the dev container, or when the container must run rootless under Podman with SELinux."
metadata:
  id: CTR-01
  stars: "5"
  nature: reference
  mode: B
  wave: V1
  load: auto
---

# Dev container authoring

**Core rule:** every change to `devcontainer.json` is validated by rebuilding the container and running the project's checks inside it; under Podman rootless, files you edit must stay owned by your host user.

## Procedure

1. Read the current `.devcontainer/devcontainer.json` and, if any, its `Dockerfile` or `Containerfile`.
   - Check: you know the image, the user and the features in use.
2. Make the change with the properties below; confirm unknown ones with `containers-official-docs_search_docs` (topic `devcontainer.json`).
   - Check: each property you add appears in the specification section you read.
3. Validate the JSON with comments: `devcontainer read-configuration --workspace-folder .` when the CLI is installed.
   - Check: the command prints the merged configuration without error.
4. Rebuild: `devcontainer up --workspace-folder . --remove-existing-container`, or ask the human to rebuild from the editor.
   - Check: the container starts; `devcontainer exec --workspace-folder . <check command>` succeeds.
5. Inside the container, run the project's build and tests.
   - Check: both exit 0; `ls -ln` on a file you created shows your host UID.

## Properties

| Property | Use |
| --- | --- |
| `image` or `build.dockerfile` | the base image, or a Containerfile beside it |
| `features` | tools added on top of the image (each feature has its own options) |
| `remoteUser`, `containerUser` | the user the tools and the editor run as |
| `updateRemoteUserUID` | match the container user's UID to the host user |
| `runArgs` | extra Podman arguments, e.g. `["--userns=keep-id"]` |
| `mounts` | extra bind mounts; add `:Z` (private) or `:z` (shared) under SELinux |
| `containerEnv`, `remoteEnv` | environment variables, never secrets in clear |
| `forwardPorts` | ports of the container shown on the host |
| `postCreateCommand` | runs once after creation (install dependencies through the mirror) |
| `postStartCommand` | runs at each start |

## This installation

<!-- FILL: what=base image used by the team and its registry; find=grep -n -E '"image"|FROM' .devcontainer/*; verify=podman pull <image> succeeds from the internal registry -->

<!-- FILL: what=Podman settings the team uses (runArgs, userns, SELinux labels); find=grep -n -E 'runArgs|userns|:Z|:z' .devcontainer/devcontainer.json; verify=a file created in the container is owned by the host user (ls -ln) -->

<!-- FILL: what=how the editor is told to use Podman; find=grep -rn 'dockerPath' ~/.config/Code/User/settings.json; verify=the setting value is podman -->

<!-- FILL: what=devcontainer CLI availability; find=command -v devcontainer; verify=devcontainer --version prints a version -->

## Stop and ask the human if

- The change needs a new base image or a registry you cannot pull from.
- A secret would be needed in `containerEnv`.

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "Docker syntax works the same." | Under Podman rootless, add `--userns=keep-id` and SELinux labels on mounts. |
| "`postCreateCommand` can curl an installer." | No Internet: install through the internal mirrors. |
| "JSON with comments is invalid." | `devcontainer.json` allows comments; keep them. |

## Definition of done

- [ ] Container rebuilt with the change; build and tests green inside.
- [ ] Files created inside are owned by the host user.

## Local completion checklist

- [ ] Base image and registry
- [ ] Podman settings
- [ ] Editor uses Podman
- [ ] devcontainer CLI
