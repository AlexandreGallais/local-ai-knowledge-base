---
id: containers-devcontainer-json
title: devcontainer.json properties and lifecycle
topic: containers
summary: Where devcontainer.json lives, its useful properties, and the order of its lifecycle commands.
tool: devcontainer
version: "1"
checked: 2026-11-13
sources: [S1, S2]
license: MIT, written for this base from CC BY 4.0 sources
variant: files
---

# devcontainer.json properties and lifecycle

Contents: 1. Location · 2. Properties · 3. Lifecycle · 4. Example · Sources

## 1. Where the file lives (devcontainer.json location)

In this order of priority: `.devcontainer/devcontainer.json`, `.devcontainer.json`, `.devcontainer/<folder>/devcontainer.json`. [S2]

The file is JSON with comments. Paths are relative to the folder of `devcontainer.json`. [S1]

## 2. Useful properties (devcontainer.json)

| Group | Properties | To know |
| --- | --- | --- |
| Origin | `image`; or `build.dockerfile` with `context`, `args`, `target`; or `dockerComposeFile` with `service` | One of the three |
| Users | `containerUser`, `remoteUser`, `updateRemoteUserUID` | `remoteUser` runs the scripts and the tools; on Linux its UID follows the host by default |
| Variables | `containerEnv`, `remoteEnv` | `containerEnv` is fixed at creation (rebuild to change it); `remoteEnv` applies to the processes the tool starts |
| Ports | `forwardPorts`, `portsAttributes` | Prefer `forwardPorts` to `appPort` |
| Mounts and rights | `mounts`, `runArgs`, `capAdd`, `securityOpt`, `privileged`, `init` | `runArgs` takes an array only |
| Tools | `features`, `customizations` | `customizations.vscode.extensions` for one editor |
| Substitutions | `${localWorkspaceFolder}`, `${containerWorkspaceFolder}`, `${localEnv:VAR}`, `${containerEnv:VAR}` | Default value: `${localEnv:VAR:default}` |

Sources: [S1] [S2].

## 3. Lifecycle commands, in order (devcontainer.json)

| Command | Where | When |
| --- | --- | --- |
| `initializeCommand` | Host | At initialization, at each start too |
| `onCreateCommand` | Container | After creation, once |
| `updateContentCommand` | Container | Then, when new content is there, at least once |
| `postCreateCommand` | Container | Then, once |
| `postStartCommand` | Container | At each start |
| `postAttachCommand` | Container | At each attach of a tool |

- When a command fails, the next ones are skipped. [S1]
- A string runs through `/bin/sh`; an array runs without a shell; an object runs its entries in parallel, and all must succeed. [S1] [S2]
- The tool waits for `updateContentCommand` by default (`waitFor`); `postCreateCommand` runs in the background. [S2]
- Put `dotnet restore` and `npm ci` in `updateContentCommand`. In `postCreateCommand`, a lint started right after the container starts can run before they end.

## 4. Example (.NET and Angular dev container)

```jsonc
{
  "name": "dotnet-angular",
  "build": { "dockerfile": "Dockerfile", "context": ".." },
  "remoteUser": "dev",
  "forwardPorts": [8080, 4200],
  "updateContentCommand": {
    "api": "dotnet restore",
    "ui": "npm ci"
  },
  "postStartCommand": "dotnet --version && node --version"
}
```

The coding assistant and the check tools are installed in the image of `.devcontainer/Dockerfile`; the full template is `templates/containers/devcontainer.json`.

## Sources

- [S1] Dev Containers, "Dev Container metadata reference", <https://containers.dev/implementors/json_reference/>, read 2026-11-12, CC BY 4.0, summarized.
- [S2] Dev Containers, "Development Container Specification", <https://containers.dev/implementors/spec/>, read 2026-11-12, CC BY 4.0, summarized.
