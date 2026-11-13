---
title: "Dev Container Metadata Reference (part 1 of 2)"
tool: "devcontainers"
version: "2026-11"
source: "https://github.com/devcontainers/spec/blob/c95ffeed1d059abfe9ffbe79762dc2fa4e7c2421/docs/specs/devcontainerjson-reference.md"
commit: "c95ffeed1d059abfe9ffbe79762dc2fa4e7c2421"
license: "CC-BY-4.0"
---

# Dev Container Metadata Reference

The `devcontainer.json` file contains any needed metadata and settings required to configurate a **development container** for a given well-defined tool and runtime stack. It can be used by tools and services that support the dev container spec to create a **development environment** that contains one or more **development containers**.

Metadata properties marked with a 🏷️ can be stored in the `devcontainer.metadata` **container image label** in addition to `devcontainer.json`. This label can contain an array of json snippets that will be automatically merged with `devcontainer.json` contents (if any) when a container is created.

## General devcontainer.json properties

| Property | Type | Description |
|----------|------|-------------|
| `name` | string | A name for the dev container displayed in the UI |
| `forwardPorts` 🏷️ | array | An array of port numbers or `"host:port"` values  (e.g. `[3000, "db:5432"]`) that should always be forwarded from inside the primary container to the local machine (including on the web). The property is most useful for forwarding ports that cannot be auto-forwarded because the related process that starts before the `devcontainer.json` supporting service / tool connects or for forwarding a service not in the primary container in Docker Compose scenarios (e.g. `"db:5432"`). Defaults to `[]`. |
| `portsAttributes` 🏷️ | object | Object that maps a port number, `"host:port"` value, range, or regular expression to a set of default options. See port attributes for available options. For example: `"portsAttributes": {"3000": {"label": "Application port"}}` |
| `otherPortsAttributes` 🏷️ | object | Default options for ports, port ranges, and hosts that aren't configured using `portsAttributes`. See port attributes for available options. For example:  `"otherPortsAttributes": {"onAutoForward": "silent"}` |
| `containerEnv` 🏷️ | object | A set of name-value pairs that sets or overrides environment variables for the container. Environment and pre-defined variables may be referenced in the values. For example: `"containerEnv": { "MY_VARIABLE": "${localEnv:MY_VARIABLE}" }` If you want to reference an existing container variable while setting this one (like updating the `PATH`), use `remoteEnv` instead.  `containerEnv` will set the variable on the Docker container itself, so all processes spawned in the container will have access to it. But it will also be static for the life of the container - you must rebuild the container to update the value.  We recommend using `containerEnv` (over `remoteEnv`) as much as possible since it allows all processes to see the variable and isn't client-specific. |
| `remoteEnv` 🏷️ | object | A set of name-value pairs that sets or overrides environment variables for the `devcontainer.json` supporting service / tool (or sub-processes like terminals) but not the container as a whole. Environment and pre-defined variables may be referenced in the values.  You may want to use `remoteEnv` (over `containerEnv`) if the value isn't static since you can update its value without having to rebuild the full container. |
| `remoteUser` 🏷️ | string | Overrides the user that `devcontainer.json` supporting services tools / runs as in the container (along with sub-processes like terminals, tasks, or debugging). Does not change the user the container as a whole runs as which can be set using `containerUser`. Defaults to the user the container as a whole is running as (often `root`).  You may learn more in the remoteUser section below. |
| `containerUser` 🏷️ | string | Overrides the user for all operations run as inside the container. Defaults to either `root` or the last `USER` instruction in the related Dockerfile used to create the image. If you want any connected tools or related processes to use a different user than the one for the container, see `remoteUser`. |
| `updateRemoteUserUID` 🏷️ | boolean | On Linux, if `containerUser` or `remoteUser` is specified, the user's UID/GID will be updated to match the local user's UID/GID to avoid permission problems with bind mounts. Defaults to `true`. |
| `userEnvProbe` 🏷️ | enum | Indicates the type of shell to use to "probe" for user environment variables to include in `devcontainer.json` supporting services' / tools' processes: `none`, `interactiveShell`, `loginShell`, or `loginInteractiveShell` (default). The specific shell used is based on the default shell for the user (typically bash). For example, bash interactive shells will typically include variables set in `/etc/bash.bashrc` and `~/.bashrc` while login shells usually include variables from `/etc/profile` and `~/.profile`. Setting this property to `loginInteractiveShell` will get variables from all four files. |
| `overrideCommand` 🏷️ | boolean | Tells `devcontainer.json` supporting services / tools whether they should run `/bin/sh -c "while sleep 1000; do :; done"` when starting the container instead of the container's default command (since the container can shut down if the default command fails). Set to `false` if the default command must run for the container to function properly. Defaults to `true` for when using an image Dockerfile and `false` when referencing a Docker Compose file. |
| `shutdownAction` 🏷️ | enum | Indicates whether `devcontainer.json` supporting tools should stop the containers when the related tool window is closed / shut down.Values are  `none`, `stopContainer` (default for image or Dockerfile), and `stopCompose` (default for Docker Compose). |
| `init` 🏷️ | boolean | Defaults to `false`. Cross-orchestrator way to indicate whether the tini init process should be used to help deal with zombie processes. |
| `privileged` 🏷️ | boolean | Defaults to `false`. Cross-orchestrator way to cause the container to run in privileged mode (`--privileged`). Required for things like Docker-in-Docker, but has security implications particularly when running directly on Linux.  |
| `capAdd` 🏷️ | array | Defaults to `[]`. Cross-orchestrator way to add capabilities typically disabled for a container. Most often used to add the `ptrace` capability required to debug languages like C++, Go, and Rust. For example: `"capAdd": ["SYS_PTRACE"]` |
| `securityOpt` 🏷️ | array | Defaults to `[]`. Cross-orchestrator way to set container security options. For example:  `"securityOpt": [ "seccomp=unconfined" ]` |
| `mounts` 🏷️ | string or object | Defaults to unset. Cross-orchestrator way to add additional mounts to a container. Each value is a string that accepts the same values as the Docker CLI `--mount` flag. Environment and pre-defined variables may be referenced in the value. For example:`"mounts": [{ "source": "dind-var-lib-docker", "target": "/var/lib/docker", "type": "volume" }]` |
| `features` | object | An object of Dev Container Feature IDs and related options to be added into your primary container. The specific options that are available varies by feature, so see its documentation for additional details. For example: `"features": { "ghcr.io/devcontainers/features/github-cli": {} }` |
| `overrideFeatureInstallOrder` | array | By default, Features will attempt to automatically set the order they are installed based on a `installsAfter` property within each of them. This property allows you to override the Feature install order when needed. For example: `"overrideFeatureInstallОrder": [ "ghcr.io/devcontainers/features/common-utils", "ghcr.io/devcontainers/features/github-cli" ]` |
| `customizations` 🏷️| object | Product specific properties, defined in supporting tools |

## Scenario specific properties

The focus of `devcontainer.json` is to describe how to enrich a container for the purposes of development rather than acting as a multi-container orchestrator format. Instead, container orchestrator formats can be referenced when needed to manage multiple containers and their lifecycles. Today, `devcontainer.json` includes scenario specific properties for working without a container orchestrator (by directly referencing an image or Dockerfile) and for using Docker Compose as a simple multi-container orchestrator.

### Image or Dockerfile specific properties

| Property | Type | Description |
|----------|------|-------------|
| `image` | string | **Required** when using an image. The name of an image in a container registry (DockerHub, GitHub Container Registry, Azure Container Registry) that `devcontainer.json` supporting services / tools should use to create the dev container. |
| `build.dockerfile` | string |**Required** when using a Dockerfile. The location of a Dockerfile that defines the contents of the container. The path is relative to the `devcontainer.json` file. |
| `build.context` | string | Path that the Docker build should be run from relative to `devcontainer.json`. For example, a value of `".."` would allow you to reference content in sibling directories. Defaults to `"."`. |
| `build.args` | Object | A set of name-value pairs containing Docker image build arguments that should be passed when building a Dockerfile.  Environment and pre-defined variables may be referenced in the values. Defaults to not set. For example: `"build": { "args": { "MYARG": "MYVALUE", "MYARGFROMENVVAR": "${localEnv:VARIABLE_NAME}" } }` |
| `build.options` | array | An array of Docker image build options that should be passed to the build command when building a Dockerfile. Defaults to `[]`. For example: `"build": { "options": [ "--add-host=host.docker.internal:host-gateway" ] }` |
| `build.target` | string | A string that specifies a Docker image build target that should be passed when building a Dockerfile. Defaults to not set. For example: `"build": { "target": "development" }` |
| `build.cacheFrom` | string,array | A string or array of strings that specify one or more images to use as caches when building the image. Cached image identifiers are passed to the `docker build` command with `--cache-from`. |
| `appPort` | integer,string,array |  In most cases, we recommend using the new forwardPorts property. This property accepts a port or array of ports that should be published locally when the container is running. Unlike `forwardPorts`, your application may need to listen on all interfaces (`0.0.0.0`) not just `localhost` for it to be available externally. Defaults to `[]`.Learn more about publishing vs forwarding ports here.Note that the array syntax will execute the command without a shell. You can learn more about formatting string vs array properties. |
| `workspaceMount` | string | Requires `workspaceFolder` be set as well. Overrides the default local mount point for the workspace when the container is created. Supports the same values as the Docker CLI `--mount` flag. Environment and pre-defined variables may be referenced in the value. For example: `"workspaceMount": "source=${localWorkspaceFolder}/sub-folder,target=/workspace,type=bind,consistency=cached", "workspaceFolder": "/workspace"` |
| `workspaceFolder` | string | Requires `workspaceMount` be set. Sets the default path that `devcontainer.json` supporting services / tools should open when connecting to the container. Defaults to the automatic source code mount location. |
| `runArgs` | array | An array of Docker CLI arguments that should be used when running the container. Defaults to `[]`. For example, this allows ptrace based debuggers like C++ to work in the container: `"runArgs": [ "--cap-add=SYS_PTRACE", "--security-opt", "seccomp=unconfined" ]` . |

### Docker Compose specific properties

| Property | Type | Description |
|----------|------|-------------|
| `dockerComposeFile` | string,array | **Required** when using Docker Compose. Path or an ordered list of paths to Docker Compose files relative to the `devcontainer.json` file. Using an array is useful when extending your Docker Compose configuration. The order of the array matters since the contents of later files can override values set in previous ones.The default `.env` file is picked up from the root of the project, but you can use `env_file` in your Docker Compose file to specify an alternate location. |
| `service` | string | **Required** when using Docker Compose. The name of the service `devcontainer.json` supporting services / tools should connect to once running.  |
| `runServices` | array | An array of services in your Docker Compose configuration that should be started by `devcontainer.json` supporting services / tools. These will also be stopped when you disconnect unless `"shutdownAction"` is `"none"`. Defaults to all services. |
| `workspaceFolder` | string | Sets the default path that `devcontainer.json` supporting services / tools should open when connecting to the container (which is often the path to a volume mount where the source code can be found in the container). Defaults to `"/"`. |

## Tool-specific properties

While most properties apply to any `devcontainer.json` supporting tool or service, a few are specific to certain tools. You may explore this in the supporting tools and services document.
