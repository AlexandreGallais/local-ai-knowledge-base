---
title: "Dev Container Metadata Reference (part 2 of 2)"
tool: "devcontainers"
version: "2026-11"
source: "https://github.com/devcontainers/spec/blob/c95ffeed1d059abfe9ffbe79762dc2fa4e7c2421/docs/specs/devcontainerjson-reference.md"
commit: "c95ffeed1d059abfe9ffbe79762dc2fa4e7c2421"
license: "CC-BY-4.0"
---

# Dev Container Metadata Reference (part 2 of 2)

## Lifecycle scripts

When creating or working with a dev container, you may need different commands to be run at different points in the container's lifecycle. The table below lists a set of command properties you can use to update what the container's contents in the order in which they are run (for example, `onCreateCommand` will run after `initializeCommand`). Each command property is an string or list of command arguments that should execute from the `workspaceFolder`.

| Property | Type | Description |
|----------|------|-------------|
| `initializeCommand` | string,array,object | A command string or list of command arguments to run on the **host machine** during initialization, including during container creation and on subsequent starts.  The command may run more than once during a given session. ⚠️ The command is run wherever the source code is located on the host. For cloud services, this is in the cloud.Note that the array syntax will execute the command without a shell. You can learn more about formatting string vs array vs object properties. |
| `onCreateCommand` 🏷️ | string,array,object | This command is the first of three (along with `updateContentCommand` and `postCreateCommand`) that finalizes container setup when a dev container is created. It and subsequent commands execute **inside** the container immediately after it has started for the first time. Cloud services can use this command when caching or prebuilding a container. This means that it will not typically have access to user-scoped assets or secrets.Note that the array syntax will execute the command without a shell. You can learn more about formatting string vs array vs object properties. |
| `updateContentCommand` 🏷️ | string,array,object  | This command is the second of three that finalizes container setup when a dev container is created. It executes inside the container after `onCreateCommand` whenever new content is available in the source tree during the creation process.It will execute at least once, but cloud services will also periodically execute the command to refresh cached or prebuilt containers. Like cloud services using `onCreateCommand`, it can only take advantage of repository and org scoped secrets or permissions.Note that the array syntax will execute the command without a shell. You can learn more about formatting string vs array vs object properties. |
| `postCreateCommand` 🏷️ | string,array,object | This command is the last of three that finalizes container setup when a dev container is created. It happens after `updateContentCommand` and once the dev container has been assigned to a user for the first time.Cloud services can use this command to take advantage of user specific secrets and permissions.Note that the array syntax will execute the command without a shell. You can learn more about formatting string vs array vs object properties. |
| `postStartCommand` 🏷️ | string,array,object | A command to run each time the container is successfully started.Note that the array syntax will execute the command without a shell. You can learn more about formatting string vs array vs object properties. |
| `postAttachCommand` 🏷️ | string,array,object | A command to run each time a tool has successfully attached to the container.Note that the array syntax will execute the command without a shell. You can learn more about formatting string vs array vs object properties. |
| `waitFor` 🏷️ | enum | An enum that specifies the command any tool should wait for before connecting. Defaults to `updateContentCommand`. This allows you to use `onCreateCommand` or `updateContentCommand` for steps that must happen before `devcontainer.json` supporting tools connect while still using `postCreateCommand` for steps that can happen behind the scenes afterwards. |

For each command property, if the value is a single string, it will be run in `/bin/sh`. Use `&&` in a string to execute multiple commands. For example, `"yarn install"` or `"apt-get update && apt-get install -y curl"`. The array syntax `["yarn", "install"]` will invoke the command (in this case `yarn`) directly without using a shell. Each fires after your source code has been mounted, so you can also run shell scripts from your source tree. For example: `bash scripts/install-dev-tools.sh`

If one of the lifecycle scripts fails, any subsequent scripts will not be executed. For instance, if `postCreateCommand` fails, `postStartCommand` and any following scripts will be skipped.

## Minimum host requirements

While `devcontainer.json` does not focus on hardware or VM provisioning, it can be useful to know your container's minimum RAM, CPU, and storage requirements. This is what the `hostRequirements` properties allow you to do. Cloud services can use these properties to automatically default to the best compute option available, while in other cases, you will be presented with a warning if the requirements are not met.

| Property | Type | Description |
|----------|------|-------------|
| `hostRequirements.cpus` 🏷️ | integer | Indicates the minimum required number of CPUs / virtual CPUs / cores. For example: `"hostRequirements": {"cpus": 2}` |
| `hostRequirements.memory` 🏷️ | string |  A string indicating minimum memory requirements with a `tb`, `gb`, `mb`, or `kb` suffix. For example, `"hostRequirements": {"memory": "4gb"}` |
| `hostRequirements.storage` 🏷️ | string | A string indicating minimum storage requirements with a `tb`, `gb`, `mb`, or `kb` suffix. For example, `"hostRequirements": {"storage": "32gb"}` |

## Port attributes

The `portsAttributes` and `otherPortsAttributes` properties allow you to map default port options for one or more manually or automatically forwarded ports. The following is a list of options that can be set in the configuration object assigned to the property.

| Property | Type | Description |
|----------|------|-------------|
| `label` 🏷️ | string | Display name for the port in the ports view. Defaults to not set. |
| `protocol` 🏷️ | enum | Controls protocol handling for forwarded ports. When not set, the port is assumed to be a raw TCP stream which, if forwarded to `localhost`, supports any number of protocols. However, if the port is forwarded to a web URL (e.g. from a cloud service on the web), only HTTP ports in the container are supported. Setting this property to `https` alters handling by ignoring any SSL/TLS certificates present when communicating on the port and using the correct certificate for the forwarded URL instead (e.g. `https://*.githubpreview.dev`). If set to `http`, processing is the same as if the protocol is not set. Defaults to not set. |
| `onAutoForward` 🏷️ | enum | Controls what should happen when a port is auto-forwarded once you've connected to the container. `notify` is the default, and a notification will appear when the port is auto-forwarded. If set to `openBrowser`, the port will be opened in the system's default browser. A value of `openBrowserOnce` will open the browser only once. `openPreview` will open the URL in `devcontainer.json` supporting services' / tools' embedded preview browser. A value of `silent` will forward the port, but take no further action. A value of `ignore` means that this port should not be auto-forwarded at all. |
| `requireLocalPort` 🏷️ | boolean | Dictates when port forwarding is required to map the port in the container to the same port locally or not. If set to `false`, the `devcontainer.json` supporting services /  tools will attempt to use the specified port forward to `localhost`, and silently map to a different one if it is unavailable. If set to `true`, you will be notified if it is not possible to use the same port. Defaults to `false`. |
| `elevateIfNeeded` 🏷️ | boolean | Forwarding low ports like 22, 80, or 443 to `localhost` on the same port from `devcontainer.json` supporting services / tools may require elevated permissions on certain operating systems. Setting this property to `true` will automatically try to elevate the `devcontainer.json` supporting tool's permissions in this situation. Defaults to `false`. |

## Formatting string vs. array properties

The format of certain properties will vary depending on the involvement of a shell.

`postCreateCommand`, `postStartCommand`, `postAttachCommand`, and `initializeCommand` all have 3 types:
* Array: Passed to the OS for execution without going through a shell
* String: Goes through a shell (it needs to be parsed into command and arguments)
* Object: All lifecycle scripts have been extended to support `object` types to allow for parallel execution

`runArgs` only has the array type. Using `runArgs` via a typical command line, you'll need single quotes if the shell runs into parameters with spaces. However, these single quotes aren't passed on to the executable. Thus, in your `devcontainer.json`, you'd follow the array format and leave out the single quotes:

```json
"runArgs": ["--device-cgroup-rule=my rule here"]
```

Rather than:

```json
"runArgs": ["--device-cgroup-rule='my rule here'"]
```

We can compare the string, array, and object versions of `postAttachCommand` as well. You can use the following string format, which will remove the single quotes as part of the shell's parsing:

```json
"postAttachCommand": "echo foo='bar'"
```

By contrast, the array format will keep the single quotes and write them to standard out (you can see the output in the dev container log):

```json
"postAttachCommand": ["echo", "foo='bar'"]
```

Finally, you may use an object format:

```json
{
  "postAttachCommand": {
    "server": "npm start",
    "db": ["mysql", "-u", "root", "-p", "my database"]
  }
}
```

## Variables in devcontainer.json

Variables can be referenced in certain string values in `devcontainer.json` in the following format: **${variableName}**. The following is a list of available variables you can use.

| Variable | Properties | Description |
|----------|---------|----------------------|
| `${localEnv:VARIABLE_NAME}` | Any | Value of an environment variable on the **host machine** (in the examples below, called `VARIABLE_NAME`). Unset variables are left blank.   ⚠️ Clients (like VS Code) may need to be **restarted** to pick up newly set variables.  ⚠️ For a cloud service, the host is in the cloud rather than your local machine.  **Examples**  **1.** Set a variable containing your local home folder on Linux / macOS or the user folder on Windows: `"remoteEnv": { "LOCAL_USER_PATH": "${localEnv:HOME}${localEnv:USERPROFILE}" }`.    A default value for when the environment variable is not set can be given with `${localEnv:VARIABLE_NAME:default_value}`.    **2.** In modern versions of macOS, default configurations allow setting local variables with the command `echo 'export VARIABLE_NAME=my-value' >> ~/.zshenv`.  |
| `${containerEnv:VARIABLE_NAME}` | `remoteEnv` | Value of an existing environment variable inside the container once it is up and running (in this case, called `VARIABLE_NAME`). For example: `"remoteEnv": { "PATH": "${containerEnv:PATH}:/some/other/path" }`  A default value for when the environment variable is not set can be given with `${containerEnv:VARIABLE_NAME:default_value}`. |
| `${localWorkspaceFolder}`  | Any | Path of the local folder that was opened in the `devcontainer.json` supporting service / tool (that contains `.devcontainer/devcontainer.json`). |
| `${containerWorkspaceFolder}` | Any | The path that the workspaces files can be found in the container. |
| `${localWorkspaceFolderBasename}` | Any | Name of the local folder that was opened in the `devcontainer.json` supporting service / tool (that contains `.devcontainer/devcontainer.json`). |
| `${containerWorkspaceFolderBasename}` | Any | Name of the folder where the workspace files can be found in the container. |
| `${devcontainerId}` | Any | Allow features to refer to an identifier that is unique to the dev container they are installed into and that is stable across rebuilds. The properties supporting it in devcontainer.json are: `name`, `runArgs`, `initializeCommand`, `onCreateCommand`, `updateContentCommand`, `postCreateCommand`, `postStartCommand`, `postAttachCommand`, `workspaceFolder`, `workspaceMount`, `mounts`, `containerEnv`, `remoteEnv`, `containerUser`, `remoteUser`, and `customizations`. |

## Schema

You can see the dev container schema here.

## Publishing vs forwarding ports

Docker has the concept of "publishing" ports when the container is created. Published ports behave very much like ports you make available to your local network. If your application only accepts calls from `localhost`, it will reject connections from published ports just as your local machine would for network calls. Forwarded ports, on the other hand, actually look like `localhost` to the application.

## remoteUser

A dev container configuration will inherit the `remoteUser` property from the base image it uses.

Using the images and Templates part of the spec as an example: `remoteUser` in these images is set to a custom value - you may view an example in the C++ image. The C++ Template will then inherit the custom `remoteUser` value from its base C++ image.
