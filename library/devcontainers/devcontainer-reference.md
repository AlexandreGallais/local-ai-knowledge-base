---
title: "Dev Container Specification (part 1 of 2)"
tool: "devcontainers"
version: "2026-11"
source: "https://github.com/devcontainers/spec/blob/c95ffeed1d059abfe9ffbe79762dc2fa4e7c2421/docs/specs/devcontainer-reference.md"
commit: "c95ffeed1d059abfe9ffbe79762dc2fa4e7c2421"
license: "CC-BY-4.0"
---

# Dev Container Specification

The purpose of the **Development Container Specification** is to provide a way to enrich containers with the content and metadata necessary to enable development inside them. These container **environments** should be easy to use, create, and recreate.

A **development container** is a container in which a user can develop an application.  Tools that want to implement this specification should provide a set of features/commands that give more flexibility to users and allow **development containers** to scale to large development groups.

An **environment** is defined as a logical instance of one or more **development containers**, along with any needed side-car containers. An environment is based on one set of metadata that can be managed as a single unit. Users can create multiple **environments** from the same configuration metadata for different purposes.

# Metadata

Development containers allow one to define a repeatable development environment for a user or team of developers that includes the execution environment the application needs. A development container defines an environment in which you develop your application before you are ready to deploy. While deployment and development containers may resemble one another, you may not want to include tools in a deployment image that you use during development and you may need to use different secrets or other settings.

Furthermore, working inside a development container can require additional **metadata** to drive tooling or service experiences than you would normally need with a production container. Providing a structured and consistent form for this metadata is a core part of this specification.

## devcontainer.json

While the structure of this metadata is critical, it is also important to call out how this data can be represented on disk where appropriate. While other representations may be added over time, metadata can be stored in a JSON with Comments file called `devcontainer.json` today. Products using it should expect to find a `devcontainer.json` file in one or more of the following locations (in order of precedence):

- .devcontainer/devcontainer.json
- .devcontainer.json
- .devcontainer/`<folder>`/devcontainer.json (where `<folder>` is a sub-folder, one level deep)

It is valid that these files may exist in more than one location, so consider providing a mechanism for users to select one when appropriate.

## Image Metadata

Certain dev container metadata properties can be stored in an image label as an array of metadata snippets. This allows them to be stored in prebuilt images, such that, the image and its related configuration are self-contained. These contents should then be merged with any local `devcontainer.json` file contents at the time the container is created. An array is used so subsequent image builds can simply append changes to the array rather than attempting to merge at that point - which improves compatibility with arbitrary image build systems.

Metadata should be representative of with the following structure, using one entry per Dev Container Feature and `devcontainer.json` (see table below for the full list):

```json
[
	{
		"id"?: string,
		"init"?: boolean,
		"privileged"?: boolean,
		"capAdd"?: string[],
		"securityOpt"?: string[],
		"entrypoint"?: string,
		"mounts"?: [],
		...
		"customizations"?: {
			...
		}
	},
	...
]
```

To simplify adding this metadata for other tools, we also support having a single top-level object with the same properties.

The metadata is added to the image as a `devcontainer.metadata` label with a JSON string value representing the above array or single object.

### Merge Logic

To apply the metadata together with a user's `devcontainer.json` at runtime the following merge logic by property is used. The table also notes which properties are currently supported coming from the `devcontainer.json` and which from the Feature metadata, this will change over time as we add more properties.

| Property | Type/Format | Merge Logic | devcontainer.json | devcontainer-feature.json |
| -------- | ----------- | ----------- | :---------------: | :--------------: |
| `id` | E.g., `ghcr.io/devcontainers/features/node:1` | Not merged. |   | ✓ |
| `init` | `boolean` | `true` if at least one is `true`, `false` otherwise. | ✓ | ✓ |
| `privileged` | `boolean` | `true` if at least one is `true`, `false` otherwise. | ✓ | ✓ |
| `capAdd` | `string[]` | Union of all `capAdd` arrays without duplicates. | ✓ | ✓ |
| `securityOpt` | `string[]` | Union of all `securityOpt` arrays without duplicates. | ✓ | ✓ |
| `entrypoint` | `string` | Collected list of all entrypoints. |   | ✓ |
| `mounts` | `(string \| { type, src, dst })[]` | Collected list of all mountpoints. Conflicts: Last source wins. | ✓ | ✓ |
| `onCreateCommand` | `string \| string[] \| {[key: string]: string \| string[]}` | Collected list of all onCreateCommands. | ✓ | ✓ |
| `updateContentCommand` | `string \| string[] \| {[key: string]: string \| string[]}` | Collected list of all updateContentCommands. | ✓ | ✓ |
| `postCreateCommand` | `string \| string[] \| {[key: string]: string \| string[]}` | Collected list of all postCreateCommands. | ✓ | ✓ |
| `postStartCommand` | `string \| string[] \| {[key: string]: string \| string[]}` | Collected list of all postStartCommands. | ✓ | ✓ |
| `postAttachCommand` | `string \| string[] \| {[key: string]: string \| string[]}` | Collected list of all postAttachCommands. | ✓ | ✓ |
| `waitFor` | enum | Last value wins. | ✓ |   |
| `customizations` | Object of tool-specific customizations. | Merging is left to the tools. | ✓ | ✓ |
| `containerUser` | `string` | Last value wins. | ✓ |   |
| `remoteUser` | `string` | Last value wins. | ✓ |   |
| `userEnvProbe` | `string` (enum) | Last value wins. | ✓ |   |
| `remoteEnv` | Object of strings. | Per variable, last value wins. | ✓ |   |
| `containerEnv` | Object of strings. | Per variable, last value wins. | ✓ |   |
| `overrideCommand` | `boolean` | Last value wins. | ✓ |   |
| `portsAttributes` | Map of ports to attributes. | Per port (not per port attribute), last value wins. | ✓ |   |
| `otherPortsAttributes` | Port attributes. | Last value wins (not per port attribute). | ✓ |   |
| `forwardPorts` | `(number \| string)[]` | Union of all ports without duplicates. Last one wins (when mapping changes). | ✓ |   |
| `shutdownAction` | `string` (enum) | Last value wins. | ✓ |   |
| `updateRemoteUserUID` | `boolean` | Last value wins. | ✓ |   |
| `hostRequirements` | `cpus`, `memory`, `storage`, `gpu` | Max value wins. | ✓ |   |

Variables in string values will be substituted at the time the value is applied. When the order matters, the `devcontainer.json` is considered last.

### Notes

- Passing the label as a `LABEL` instruction in the Dockerfile:
	- The size limit on Dockerfiles is around 1.3MB. The line length is limited to 65k characters.
	- Using one line per Feature should allow for making full use of these limits.
- Passing the label as a command line argument:
	- There is no size limit documented for labels, but the daemon returns an error when the request header is >500kb.
	- The 500kb limit is shared, so we cannot use a second label in the same build to avoid it.
	- If/when this becomes an issue we could embed the metadata as a file in the image (e.g. with a label indicating it).

# Orchestration options

A core principle of this specification is to seek to enrich existing container orchestrator formats with development container metadata where appropriate rather than replacing them. As a result, the metadata schema includes a set of optional properties for interoperating with different orchestrators. Today, the specification includes scenario-specific properties for working without a container orchestrator (by directly referencing an image or Dockerfile) and for using Docker Compose as a simple multi-container orchestrator. At the same time, this specification leaves space for further development and implementation of other orchestrator mechanisms and file formats.

The following section describes the differences between those that are supported now.

## Image based

Image based configurations only reference an image that should be reachable and downloadable through `docker pull` commands. Logins and tokens required for these operations are execution environment specific. The only required parameter is `image`. The details are here.

## Dockerfile based

These configurations are defined as using a `Dockerfile` to define the starting point of the development containers. As with image based configurations, it is assumed that any base images are already reachable by **Docker** when performing a `docker build` command. The only required parameter in this case is the relative reference to the `Dockerfile` in `build.dockerfile`. The details are here.

There are multiple properties that allow users to control how `docker build` works:

- `build.context`
- `build.args`
- `build.options`
- `build.target`
- `build.cacheFrom`

## Docker Compose based

Docker Compose configurations use `docker-compose` (which may be Docker Compose V1 or aliased Docker Compose V2) to create and manage a set of containers required for an application. As with the other configurations, any images required for this operation are assumed to be reachable. The required parameters are:

- `dockerComposeFile`: the reference to the Docker Compose file(s) to be used.
- `service`: declares the **main** container that will be used for all other operations. Tools are assumed to also use this parameter to connect to the development container, although they can provide facilities to connect to the other containers as required by the user.
- `runServices`: an optional property that indicates the set of services in the `docker-compose` configuration that should be started or stopped with the environment.

It is important to note that `image` and `dockerfile` properties are not needed since Docker Compose supports them natively in the format.

# Other options

In addition to the configuration options explained above, there are other settings that apply when creating development containers to facilitate their use by developers.

A complete list of available metadata properties and their purposes can be found in the `devcontainer.json` reference. However, we will describe the critical ones below in more detail.

## Environment Variables

Environment variables can be set at different points in the dev container lifecycle. With this in mind, **development containers** support two classes of environment variables:

* **Container**: These variables are part of the container when it is created and are available at all points in its lifecycle. This concept is native to containers and can be set in the container image itself, using `containerEnv` for **image** and **Dockerfile** scenarios or using orchestrator specific properties like `env` in **Docker Compose** files.
* **Remote**: These variables should be set by a **development container** supporting tool as part of configuring its runtime environment. Users can set these using the `remoteEnv` property and implementing tools or services may add their own for specific scenarios (e.g. secrets). These variables can change during the lifetime of the container, and are added after the container's `ENTRYPOINT` has fired.

The reason for this separation is it allows for the use of information not available at image build time and simplifies updating the environment for project/repository specific needs without modifying an image. With this in mind, it's important to note that implementing tools should also support the dynamic variable syntax described in the metadata reference document.

Another notable and important environment variable related property is **`userEnvProbe`**. Implementing tools should use this property to "probe" for expected environment variables using the specified type of shell. However, it does not specify that this type of shell needs to be used for all sub-processes (given the performance impact). Instead, "probed" environment variables should be merged with Remote environment variables for any processes the implementer injects after the container is created. This allows implementors to emulate developer expected behaviors around values added to their profile and rc files.

## Mounts

Mounts allow containers to have access to the underlying machine, share data between containers and to persist information between development containers.

A default mount should be included so that the source code is accessible from inside the container. Source code is stored outside of the container so that a developer's in-flight edits can be extracted, or a new container created in the event a container no longer starts.

While this "workspace mount" is often a "bind" mount, this is not a requirement of this specification. It is also important to note that these mounts may be "bind" mounts that connect to the underlying filesystem and thus cloud environments might not have access to the same data as a local machine.

Inside the container this mount defaults to `/workspace`.

## workspaceFolder and workspaceMount

The default mount point for the source code can be set with the `workspaceMount` property for **image** and **dockerfile** scenarios or using the built in `mounts` property in **Docker Compose** files. This folder should point to the root of a repository (where the `.git` folder is found) so that source control operations work correctly inside the container.

The `workspaceFolder` can then be set to the default folder inside the container that should used in the container. Typically this is either the mount point in the container, or a sub-folder under it. Allowing a sub-folder to be used is particularly important for monorepos given you need the `.git` folder to interact with source control but developers are typically interacting with a specific sub-project within the overall repository.

See `workspaceMount` and `workspaceFolder` for reference.
