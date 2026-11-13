---
title: "Dev Container Specification (part 2 of 2)"
tool: "devcontainers"
version: "2026-11"
source: "https://github.com/devcontainers/spec/blob/c95ffeed1d059abfe9ffbe79762dc2fa4e7c2421/docs/specs/devcontainer-reference.md"
commit: "c95ffeed1d059abfe9ffbe79762dc2fa4e7c2421"
license: "CC-BY-4.0"
---

# Dev Container Specification (part 2 of 2)

## Users

Users control the permissions of applications executed in the containers, allowing the developer to control them. The specification takes into account two types of user definitions:

* **Container User**: The user that will be used for all operations that run inside a container. This concept is native to containers. It may be set in the container image, using the `containerUser` property for  **image** and **dockerfile** scenarios, or using an orchestratric specific property like `user` property in Docker Compose files.
* **Remote User**: Used to run the lifecycle scripts inside the container. This is also the user tools and editors that connect to the container should use to run their processes. This concept is not native to containers. Set using the `remoteUser` property in all cases and defaults to the container user.

This separation allows the ENTRYPOINT for the image to execute with different permissions than the developer and allows for developers to switch users without recreating their containers.

# Lifecycle

A development environment goes through different lifecycle events during its use in the outer and inner loop of development.

- Configuration Validation
- Environment Creation
- Environment Stop
- Environment Resume

## Configuration Validation

The exact steps required to validate configuration can vary based on exactly where the development container metadata is persisted. However, when considering a `devcontainer.json` file, the following validation should occur:

1. Validate that a workspace source folder has been provided. It is up to the implementing tool to determine what to do if no source folder is provided.
2. Search for a `devcontainer.json` file in one of the locations above in the workspace source folder.
3. If no `devcontainer.json` is found, it is up to the implementing tool or service to determine what to do. This specification does not dictate this behavior.
4. Validate that the metadata (for example `devcontainer.json`) contains all parameters required for the selected configuration type.

## Environment Creation

The creation process goes through the steps necesarry to go from the user configuration to a working **environment** that is ready to be used.

### Initialization

During this step, the following is executed:
- Validate access to the container orchestrator specified by the configuration.
- Execution of `initializeCommand`.

### Image creation

The first part of environment creation is generating the final image(s) that the development containers are going to use. This step is orchestrator dependent and can consist of just pulling a Docker image, running Docker build, or docker-compose build. Additionally, this step is useful on its own since it permits the creation of intermediate images that can be uploaded and used by other users, thus cutting down on creation time. It is encouraged that tools implementing this specification give access to a command that just executes this step.

This step executes the following tasks:

1. Configuration Validation
2. Pull/build/execute of the defined container orchestration format to create images.
3. Validate the result of these operations.

### Container Creation

After image creation, containers are created based on that image and setup.

This step executes the following tasks:

1. [Optional] Perform any required user UID/GID sync'ing (more next)
2. Create the container(s) based on the properties specified above.
3. Validate the container(s) were created successfully.

Note that container mounts, environment variables, and user configuration should be applied at this point. However, remote user and environment variable configuration should **not** be.

UID/GID sync'ing is an optional task for Linux (only) and that executes if the `updateRemoteUserUID` property is set to true and a `containerUser` or `remoteUser` is specified. In this case, an image update should be made prior to creating the container to set the specified user's UID and GID to match the current local user’s UID/GID to avoid permission problems with bind mounts. Implementations **may** skip this task if they do not use bind mounts on Linux, or use a container engine that does this translation automatically.

### Post Container Creation

At the end of the container creation step, a set of commands are executed inside the **main** container:
- `onCreateCommand`, `updateContentCommand` and `postCreateCommand`. This set of commands is executed in sequence on a container the first time it's created and depending on the creation parameters received. You can learn more in the documentation on lifecycle scripts. By default, `postCreateCommand` is executed in the background after reporting the successful creation of the development environment.
- If the `waitFor` property is defined, then execution should block until all commands in the sequence up to the specified property have executed. This property defaults to `updateContentCommand`.

Remote environment variables and user configuration should be applied to all created processes in the container (inclusive of `userEnvProbe`).

### Implementation specific steps

After these steps have been executed, any implementation specific commands can safely execute. Specifically, any processes required by the implementation to support other properties in this specification should be started at this point. These may occur in parallel to any non-blocking, background post-container creation commands (as dictated by the `waitFor` property).

Any user facing processes should have remote environment variables and user configuration applied (inclusive of `userEnvProbe`).

For example, in the CLI reference implementation, this is the point in which anything executed with `devcontainer exec` would run.

Typically, this is also the step where implementors would apply config or settings from the `customizations` section of the dev container metadata (e.g. VS Code installs extensions based on the `customizations.vscode.extensions` property). Examples of these can be found in the supporting tools section reference. However, applying these at this point is not strictly required or mandated by this specification.

Once these final steps have occurred, implementing tools or services may connect to the environment as they see fit.

## Environment Stop

The intention of this step is to ensure all containers are stopped correctly based on the appropriate orchestrator specific steps to ensure no data is lost. It is up to the implementing tool or service to determine when this event should happen.

## Environment Resume

While it is not a strict requirement to keep a **development container** after it has been stopped, this is the most common scenario.

To resume the environment from a stopped state:

1. Restart all related containers.
2. Follow the appropriate implementation specific steps.
3. Additionally, execute the `postStartCommand` and `postAttachCommand` in the container.

Like during the create process, remote environment variables and user configuration should be applied to all created processes in the container (inclusive of `userEnvProbe`).

## Parallel lifecycle script execution

Dev containers support a single command for each of its lifecycle scripts. While serial execution of multiple commands can be achieved with `;`, `&&`, etc., parallel execution deserves first-class support.

All lifecycle scripts have been extended to support `object` types. The key of the `object` will be a unique name for the command and the value will be the `string` or `array` command. Each command must exit successfully for the stage to be considered successful.

Each entry in the `object` will be run in parallel during that lifecycle step.

### Example

```json
{
  "postCreateCommand": {
    "server": "npm start",
    "db": ["mysql", "-u", "root", "-p", "my database"]
  }
}
```

# Definitions

#### **Project Workspace Folder**

The **project workspace folder** is where an implementing tool should begin to search for `devcontainer.json` files. If the target project on disk is using git, the **project workspace folder** is typically the root of the git repository.
