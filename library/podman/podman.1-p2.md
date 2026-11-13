---
title: "podman.1 (part 2 of 3)"
tool: "podman"
version: "6.2"
source: "https://github.com/containers/podman/blob/055de046937d29450f310fce0fe3071485d8bed9/docs/source/markdown/podman.1.md"
commit: "055de046937d29450f310fce0fe3071485d8bed9"
license: "Apache-2.0"
---

# podman.1 (part 2 of 3)

## Environment Variables

Podman can set up environment variables from env of [engine] table in containers.conf. These variables can be overridden by passing  environment variables before the `podman` commands.

#### **CONTAINERS_CONF**

Set default locations of containers.conf file

#### **CONTAINERS_REGISTRIES_CONF**

Set default location of the registries.conf file.

#### **CONTAINERS_STORAGE_CONF**

Set default location of the storage.conf file.

#### **CONTAINER_CONNECTION**

Override default `--connection` value to access Podman service. Automatically enables the --remote option.

#### **CONTAINER_HOST**

Set default `--url` value to access Podman service. Automatically enables --remote option.

#### **CONTAINER_SSHKEY**

Set default `--identity` path to ssh key file value used to access Podman service.

#### **PODMAN_CONNECTIONS_CONF**

The path to the file where the system connections and farms created with `podman system connection add`
and `podman farm add` are stored, by default it uses `~/.config/containers/podman-connections.json`.

#### **STORAGE_DRIVER**

Set default `--storage-driver` value.

#### **STORAGE_OPTS**

Set default `--storage-opt` value. Overrides storage driver options in `containers-storage.conf(5)`.
Ignored when the `--root` or `--storage-driver` options are set.

#### **TMPDIR**

Set the temporary storage location of downloaded container images. Podman defaults to use `/var/tmp`.

#### **XDG_CONFIG_HOME**

In Rootless mode configuration files are read from `XDG_CONFIG_HOME` when
specified, otherwise in the home directory of the user under
`$HOME/.config/containers`.

#### **XDG_DATA_HOME**

In Rootless mode images are pulled under `XDG_DATA_HOME` when specified,
otherwise in the home directory of the user under
`$HOME/.local/share/containers/storage`.

#### **XDG_RUNTIME_DIR**

In Rootless mode temporary configuration data is stored in `${XDG_RUNTIME_DIR}/containers`.

#### **PODMAN_NO_PAUSE_PROCESS**

In Rootless mode, when set to a value other than "0", Podman does not use a pause process.
Namespace file handles are stored to allow rejoining the existing user and mount namespace if they are still alive.

## Remote Access

The Podman command can be used with remote services using the `--remote` flag. Connections can
be made using local unix domain sockets, ssh or directly to tcp sockets. When specifying the
podman --remote flag, only the global options `--url`, `--identity`, `--log-level`, `--connection` are used.

Connection information can also be managed using the containers.conf file.

## Exit Codes

The exit code from `podman` gives information about why the container
failed to run or why it exited.  When `podman` commands exit with a non-zero code,
the exit codes follow the `chroot` standard, see below:

  **125** The error is with podman **_itself_**

    $ podman run --foo busybox; echo $?
    Error: unknown flag: --foo
    125

  **126** Executing a _container command_ and the _command_ cannot be invoked

    $ podman run busybox /etc; echo $?
    Error: container_linux.go:346: starting container process caused "exec: \"/etc\": permission denied": OCI runtime error
    126

  **127** Executing a _container command_ and the _command_ cannot be found

    $ podman run busybox foo; echo $?
    Error: container_linux.go:346: starting container process caused "exec: \"foo\": executable file not found in $PATH": OCI runtime error
    127

  **Exit code** otherwise, `podman` returns the exit code of the _container command_

    $ podman run busybox /bin/sh -c 'exit 3'; echo $?
    3

## COMMANDS

| Command                                          | Description                                                                  |
|--------------------------------------------------|------------------------------------------------------------------------------|
| podman-artifact(1)       | Manage OCI artifacts.                                                        |
| podman-attach(1)           | Attach to a running container.                                               |
| podman-auto-update(1) | Auto update containers according to their auto-update policy                 |
| podman-build(1)             | Build a container image using a Containerfile.                               |
| podman-farm(1)               | Farm out builds to machines running podman for different architectures       |
| podman-commit(1)           | Create new image based on the changed container.                             |
| podman-completion(1)   | Generate shell completion scripts                                            |
| podman-compose(1)         | Run Compose workloads via an external compose provider.                      |
| podman-container(1)     | Manage containers.                                                           |
| podman-cp(1)                   | Copy files/folders between a container and the local filesystem.             |
| podman-create(1)           | Create a new container.                                                      |
| podman-diff(1)               | Inspect changes on a container or image's filesystem.                        |
| podman-events(1)           | Monitor Podman events                                                        |
| podman-exec(1)               | Execute a command in a running container.                                    |
| podman-export(1)           | Export a container's filesystem contents as a tar archive.                   |
| podman-generate(1)       | Generate structured data based on containers, pods or volumes.               |
| podman-healthcheck(1) | Manage healthchecks for containers                                           |
| podman-history(1)         | Show the history of an image.                                                |
| podman-image(1)             | Manage images.                                                               |
| podman-images(1)           | List images in local storage.                                                |
| podman-import(1)           | Import a tarball and save it as a filesystem image.                          |
| podman-info(1)               | Display Podman related system information.                                   |
| podman-init(1)               | Initialize one or more containers                                            |
| podman-inspect(1)         | Display artifact, container, image, volume, network, or pod's configuration. |
| podman-kill(1)               | Kill the main process in one or more containers.                             |
| podman-load(1)               | Load image(s) from tar archives, directories, or URLs into container storage.|
| podman-login(1)             | Log in to a container registry.                                              |
| podman-logout(1)           | Log out of a container registry.                                             |
| podman-logs(1)               | Display the logs of one or more containers.                                  |
| podman-machine(1)         | Manage Podman's virtual machine                                              |
| podman-manifest(1)       | Create and manipulate manifest lists and image indexes.                      |
| podman-mount(1)             | Mount a working container's root filesystem.                                 |
| podman-network(1)         | Manage Podman networks.                                                      |
| podman-pause(1)             | Pause one or more containers.                                                |
| podman-kube(1)               | Play containers, pods or volumes based on a structured input file.           |
| podman-pod(1)                 | Management tool for groups of containers, called pods.                       |
| podman-port(1)               | List port mappings for a container.                                          |
| podman-ps(1)                   | Print out information about containers.                                      |
| podman-pull(1)               | Pull an image from a registry.                                               |
| podman-push(1)               | Push an image, manifest list or image index from local storage to elsewhere. |
| podman-quadlet(1)         | Allows users to manage Quadlets.                                             |
| podman-rename(1)           | Rename an existing container.                                                |
| podman-restart(1)         | Restart one or more containers.                                              |
| podman-rm(1)                   | Remove one or more containers.                                               |
| podman-rmi(1)                 | Remove one or more locally stored images.                                    |
| podman-run(1)                 | Run a command in a new container.                                            |
| podman-save(1)               | Save image(s) to an archive or directory.                                    |
| podman-search(1)           | Search a registry for an image.                                              |
| podman-secret(1)           | Manage podman secrets.                                                       |
| podman-start(1)             | Start one or more containers.                                                |
| podman-stats(1)             | Display a live stream of one or more container's resource usage statistics.  |
| podman-stop(1)               | Stop one or more running containers.                                         |
| podman-system(1)           | Manage podman.                                                               |
| podman-tag(1)                 | Add an additional name to a local image.                                     |
| podman-top(1)                 | Display the running processes of a container.                                |
| podman-unmount(1)         | Unmount a working container's root filesystem.                               |
| podman-unpause(1)         | Unpause one or more containers.                                              |
| podman-unshare(1)         | Run a command inside of a modified user namespace.                           |
| podman-untag(1)             | Remove one or more names from a locally-stored image.                        |
| podman-update(1)           | Update the configuration of a given container.                               |
| podman-version(1)         | Display the Podman version information.                                      |
| podman-volume(1)           | Simple management tool for volumes.                                          |
| podman-wait(1)               | Wait on one or more containers to stop and print their exit codes.           |

## CONFIGURATION FILES

**containers.conf**

Podman has builtin defaults for command line options. These defaults can be overridden using the containers.conf configuration files.

For a complete list of supported paths and their override order, see **containers.conf(5)**. Podman merges its builtin defaults with the specified fields from these files, if they exist. Fields specified in the users file override the administrator's file, which overrides the distribution's file, which override the built-in defaults.

Podman uses builtin defaults if no containers.conf file is found.

If the **CONTAINERS_CONF** environment variable is set, then its value is used for the containers.conf file rather than the default.

**mounts.conf**

The mounts.conf file specifies volume mount directories that are automatically mounted inside containers when executing the `podman run` or `podman start` commands.

For a complete list of supported paths and details, see **containers-mounts.conf(5)**.

**policy.json**

Signature verification policy files are used to specify policy, e.g. trusted keys, applicable when deciding whether to accept an image, or individual signatures of that image, as valid. For details, see containers-policy.json(5).

**registries.conf**

registries.conf is the configuration file which specifies which container registries is consulted when completing image names which do not include a registry or domain portion.

For a complete list of supported paths, including user-specific and system-wide defaults, see **containers-registries.conf(5)**.

If the **CONTAINERS_REGISTRIES_CONF** environment variable is set, then its value is used for the registries.conf file rather than the default.

**storage.conf**

storage.conf is the storage configuration file for all tools using containers/storage

The storage configuration file specifies all of the available container storage options for tools using shared container storage.

When Podman runs in rootless mode, For a complete list of supported paths, including user-specific and system-wide defaults, see **containers-storage.conf(5)**.

If the **CONTAINERS_STORAGE_CONF** environment variable is set, then its value is used for the storage.conf file rather than the default.
