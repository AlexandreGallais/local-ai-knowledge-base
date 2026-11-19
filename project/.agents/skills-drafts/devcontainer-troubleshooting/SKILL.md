---
name: devcontainer-troubleshooting
description: "Fixes a dev container that does not build, start or behave - UID and GID, volume rights, SELinux, rebuild, proxy and internal CA, slowness. Use when the dev container fails to build or start, files are not writable, a tool is missing inside, downloads fail inside the container, or it is very slow."
metadata:
  id: CTR-03
  stars: "4"
  nature: process
  mode: B
  wave: V1
  load: auto
---

# Dev container troubleshooting

**Core rule:** read the build or start log first and classify the failure; change one setting at a time and rebuild to test it.

## Procedure

1. Get the log: the editor's dev container log, or `devcontainer up --workspace-folder . 2>&1 | tail -n 80`, or `podman logs <container>`.
   - Check: you can quote the first error line.
2. Classify with the table.
   - Check: one class is chosen with its evidence.
3. Apply the fix of that class, one change only.
   - Check: the change is the only diff in `.devcontainer/`.
4. Rebuild without cache when the image changed: `devcontainer up --workspace-folder . --remove-existing-container`.
   - Check: the error line is gone; the project's checks pass inside.

| Symptom | Class | Fix |
| --- | --- | --- |
| `permission denied` on `/workspaces/...` | SELinux or UID | `:Z` on the mount; `--userns=keep-id` in `runArgs`; `updateRemoteUserUID: true` |
| Files created inside belong to another UID | user namespace | `--userns=keep-id` |
| `Could not resolve host`, timeouts during build | network, no Internet | use the internal mirrors (`offline-environment`) |
| `certificate verify failed` during install | internal CA missing in the image | load `tls-and-corporate-ca` |
| Tool missing inside | feature or package not installed | add it to the Containerfile or `features`, then rebuild |
| Very slow file access | large bind mount, many small files | keep build output and dependencies in a named volume |

## This installation

<!-- FILL: what=where the editor writes the dev container log; find=the Dev Containers output panel or ~/.config/Code/logs; verify=the log of the last start is found there -->

<!-- FILL: what=how the internal CA is installed in the image; find=grep -n -E 'ca-trust|update-ca' .devcontainer/*; verify=curl -sS against an internal HTTPS host inside the container returns without a certificate error -->

<!-- FILL: what=proxy variables needed in the container, if any; find=grep -n -i proxy .devcontainer/devcontainer.json; verify=the internal package mirror answers from inside the container -->

## Stop and ask the human if

- The fix needs a change of the base image, of the host's Podman configuration or of SELinux policy.

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "Rebuild until it works." | Without reading the log, a rebuild repeats the error. |
| "chmod 777 will do." | It hides the UID problem and weakens security. |

## Definition of done

- [ ] Root cause classified from the log; one change applied.
- [ ] Container rebuilt; project checks green inside.

## Local completion checklist

- [ ] Dev container log location
- [ ] Internal CA in the image
- [ ] Proxy variables
