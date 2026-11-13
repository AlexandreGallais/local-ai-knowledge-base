---
title: "podman.1 (part 1 of 3)"
tool: "podman"
version: "6.2"
source: "https://github.com/containers/podman/blob/055de046937d29450f310fce0fe3071485d8bed9/docs/source/markdown/podman.1.md"
commit: "055de046937d29450f310fce0fe3071485d8bed9"
license: "Apache-2.0"
---

# podman.1

% podman 1

## NAME
podman - Simple management tool for pods, containers and images

## SYNOPSIS
**podman** [*options*] *command*

## DESCRIPTION
Podman (Pod Manager) is a fully featured container engine that is a simple daemonless tool.
Podman provides a Docker-CLI comparable command line that eases the transition from other
container engines and allows the management of pods, containers and images.  Simply put: `alias docker=podman`.
Most Podman commands can be run as a regular user, without requiring additional
privileges.

Podman uses Buildah(1) internally to create container images. Both tools share image
(not container) storage, hence each can use or manipulate images (but not containers)
created by the other.

Default settings for flags are defined in `containers.conf`. Most settings for
Remote connections use the server's containers.conf, except when documented in
man pages.

To manage containers, pods, volumes, networks, and images declaratively via systemd,
use quadlet files. See **podman-quadlet**(1) and **podman-systemd.unit**(5).

**podman [GLOBAL OPTIONS]**

## GLOBAL OPTIONS

#### **--cdi-spec-dir**=*path*

The CDI spec directory path. When used multiple times, paths from later options have higher precedence.

Default paths are `/etc/cdi` and `/var/run/cdi` in order of increasing precedence.
This can be configured using `engine.cdi_spec_dirs` in `containers.conf`.

#### **--cgroup-manager**=*manager*

The CGroup manager to use for container cgroups. Supported values are __cgroupfs__ or __systemd__. Default is _systemd_ unless overridden in the containers.conf file.

Note: Setting this flag can cause certain commands to break when called on containers previously created by the other CGroup manager type.

__cgroupfs__ doesn't work in Rootless mode and containers cgroups aren't used.

#### **--config**
Location of config file. Mainly for docker compatibility, only the authentication parts of the config are supported.

#### **--conmon**
Path of the conmon binary (Default path is configured in `containers.conf`)

#### **--connection**, **-c**
Connection to use for remote podman, including Mac and Windows (excluding WSL2) machines, (Default connection is configured in `containers.conf`)
Setting this option switches the **--remote** option to true.
Remote connections use local containers.conf for default.

#### **--events-backend**=*type*

Backend to use for storing events. Allowed values are **file**, **journald**, and
**none**. When *file* is specified, the events are stored under
`<tmpdir>/events/events.log` (see **--tmpdir** below).

#### **--help**, **-h**

Print usage statement

#### **--hooks-dir**=*path*

Each `*.json` file in the path configures a hook for Podman containers.  For more details on the syntax of the JSON files and the semantics of hook injection, see `oci-hooks(5)`.  Podman and libpod currently support both the 1.0.0 and 0.1.0 hook schemas, although the 0.1.0 schema is deprecated.

This option may be set multiple times; paths from later options have higher precedence (`oci-hooks(5)` discusses directory precedence).

For the annotation conditions, libpod uses any annotations set in the generated OCI configuration.

For the bind-mount conditions, only mounts explicitly requested by the caller via `--volume` are considered.  Bind mounts that libpod inserts by default (e.g. `/dev/shm`) are not considered.

If `--hooks-dir` is unset for root callers, Podman and libpod currently default to `/usr/share/containers/oci/hooks.d` and `/etc/containers/oci/hooks.d` in order of increasing precedence.  Using these defaults is deprecated. Migrate to explicitly setting `--hooks-dir`.

Podman and libpod currently support an additional `precreate` state which is called before the runtime's `create` operation.  Unlike the other stages, which receive the container state on their standard input, `precreate` hooks receive the proposed runtime configuration on their standard input.  They may alter that configuration as they see fit, and write the altered form to their standard output.

**WARNING**: the `precreate` hook allows powerful changes to occur, such as adding additional mounts to the runtime configuration.  That power also makes it easy to break things.  Before reporting libpod errors, try running a container with `precreate` hooks disabled to see if the problem is due to one of the hooks.

#### **--identity**=*path*

Path to ssh identity file. If the identity file has been encrypted, podman prompts the user for the passphrase.
If no identity file is provided and no user is given, podman defaults to the user running the podman command.
Podman prompts for the login password on the remote server.

Identity value resolution precedence:
 - command line value
 - environment variable `CONTAINER_SSHKEY`, if `CONTAINER_HOST` is found
 - `containers.conf`
Remote connections use local containers.conf for default.

#### **--imagestore**=*path*

Path of the imagestore where images are stored.  By default, the storage library stores all the images in the graphroot but if an imagestore is provided, then the storage library will store newly pulled images in the provided imagestore and keep using the graphroot for everything else. If the user is using the overlay driver, then the images which were already part of the graphroot will still be accessible.

This will override *imagestore* option in `containers-storage.conf(5)`, refer to `containers-storage.conf(5)` for more details.

#### **--log-level**=*level*

Log messages at and above specified level: __debug__, __info__, __warn__, __error__, __fatal__ or __panic__ (default: _warn_)

#### **--module**=*path*

Load the specified `containers.conf(5)` module.  Can be an absolute or relative path.  Please refer to `containers.conf(5)` for details.

This flag is not supported on the remote client, including Mac and Windows (excluding WSL2) machines.
Further note that the flag is a root-level flag and must be specified before any Podman sub-command.

#### **--network-config-dir**=*directory*

Path to the directory where network configuration files are located.
The default is "/etc/containers/networks" as root
and "$graphroot/networks" as rootless.

#### **--out**=*path*
Redirect the output of podman to the specified path without affecting the container output or its logs. This parameter can be used to capture the output from any of podman's commands directly into a file and enable suppression of podman's output by specifying /dev/null as the path. To explicitly disable the container logging, the **--log-driver** option should be used.

#### **--remote**, **-r**
When true, access to the Podman service is remote. Defaults to false.
Settings can be modified in the containers.conf file. If the CONTAINER_HOST
environment variable is set, the **--remote** option defaults to true.

#### **--root**=*value*

Storage root dir in which data, including images, is stored (default: "/var/lib/containers/storage" for UID 0, "$HOME/.local/share/containers/storage" for other users).
Default root dir configured in `containers-storage.conf(5)`.

This option causes the `storage.options.<driver>` settings in `containers-storage.conf(5)` and the `STORAGE_OPTS` environment variable to be ignored.
The user must specify additional options via the `--storage-opt` flag.

#### **--runroot**=*value*

Storage state directory where all state information is stored (default: "/run/containers/storage" for UID 0, "/run/user/$UID/run" for other users).
Default state dir configured in `containers-storage.conf(5)`.

#### **--runtime**=*value*

Name of the OCI runtime as specified in containers.conf or absolute path to the OCI compatible binary used to run containers.

#### **--runtime-flag**=*flag*

Adds global flags for the container runtime. Can be specified multiple times.
To list the supported flags, please consult the manpages of the selected container runtime (the default runtime is `crun`, the manpage to consult is `crun(8)`).

Default runtime flags can be set with the `engine.runtime_flags.<runtime>` settings in `containers.conf(5)`. Note that setting **--runtime-flag** causes any flags set in containers.conf to be ignored.

Note: Do not pass the leading `--` to the flag. To pass the runc flag `--log-format json`
to podman build, the option given can be `--runtime-flag log-format=json`.

#### **--ssh**=*value*

This option allows the user to change the ssh mode, meaning that rather than using the default **golang** mode, one can instead use **--ssh=native**
to use the installed ssh binary and config file declared in containers.conf.

#### **--storage-driver**=*value*

Storage driver.  The default storage driver is configured in `containers-storage.conf(5)`. The `STORAGE_DRIVER` environment variable overrides the default. The --storage-driver specified driver overrides all.

This option causes the `storage.options.<driver>` settings in `containers-storage.conf(5)` and the `STORAGE_OPTS` environment variable to be ignored.
The user must specify additional options via the `--storage-opt` flag.

#### **--storage-opt**=*value*

Specify a storage driver option. Default storage driver options are configured in `containers-storage.conf(5)`. The `STORAGE_OPTS` environment variable overrides the default. The --storage-opt specified options override all. Specify --storage-opt="" so no storage options is used.

The `--root` and `--storage-driver` options clear the default storage options, ignoring the default storage driver options from `containers-storage.conf(5)` and the `STORAGE_OPTS` environment variable.

#### **--syslog**

Output logging information to syslog as well as the console (default *false*).

On remote clients, including Mac and Windows (excluding WSL2) machines, logging is directed to the file $HOME/.config/containers/podman.log.

#### **--tls-ca**=*path*

Path to a PEM file containing the certificate authority bundle to verify the server's certificate against.

#### **--tls-cert**=*path*

Path to a PEM file containing the TLS client certificate to present to the server. `--tls-key` must also be provided.

#### **--tls-details**=*path*

Path to a `containers-tls-details.yaml(5)` file, affecting TLS behavior.

This option affects Podman’s `login`, `logout`, `pull`, `push` and `run` operations when contacting a registry;
for remote operation, the option must be set both on the client and the server.
Effect on other operations is unspecified and may change over time.
There is currently no plan to extend coverage further.

If not set, defaults to a reasonable default that may change over time (depending on system’s global policy,
version of the program, version of the Go language, and the like).

Users should generally not use this option unless they have a process to ensure that the configuration will be kept up to date.

#### **--tls-key**=*path*

Path to a PEM file containing the private key matching `--tls-cert`. `--tls-cert` must also be provided.

#### **--tmpdir**=*path*

Path to the tmp directory, for libpod runtime content. Defaults to `$XDG_RUNTIME_DIR/libpod/tmp` as rootless and `/run/libpod/tmp` as rootful.

NOTE --tmpdir is not used for the temporary storage of downloaded images.  Use the environment variable `TMPDIR` to change the temporary storage location of downloaded container images. Podman defaults to use `/var/tmp`.

#### **--transient-store**

Enables a global transient storage mode where all container metadata is stored on non-persistent media (i.e. in the location specified by `--runroot`).
This mode allows starting containers faster, as well as guaranteeing a fresh state on boot in case of unclean shutdowns or other problems. However
it is not compatible with a traditional model where containers persist across reboots.

Only the Podman database (container and volume metadata) is stored transiently. Volume data on disk is not affected and persists across reboots. After a reboot, previously created volumes will not appear in **podman volume ls** because their database entries were lost, but the underlying data remains in the volume storage directory. If a container later creates a volume with the same name, it will reuse the existing data. To clean up leftover volume data that is no longer tracked by the database, use **podman system prune --external**.

It should be used consistently across all Podman commands and not mixed with regular (non-transient) usage within the same environment.

Default value for this is configured in `containers-storage.conf(5)`.

#### **--url**=*value*
URL to access Podman service (default from `containers.conf`, rootless `unix:///run/user/$UID/podman/podman.sock` or as root `unix:///run/podman/podman.sock`).
Setting this option switches the **--remote** option to true.

 - `CONTAINER_HOST` is of the format `<schema>://[<user[:<password>]@]<host>:<port>`

Details:
 - `schema` is one of:
   * `ssh` (default): a local unix(7) socket on the named `host` and `port`, reachable via SSH
   * `tcp`: an unencrypted, unauthenticated TCP connection to the named `host` and `port`
   * `unix`: a local unix(7) socket at the specified `path`, or the default for the user
 - `user` defaults to either `root` or the current running user (`ssh` only)
 - `password` has no default (`ssh` only)
 - `host` must be provided and is either the IP or name of the machine hosting the Podman service (`ssh` and `tcp`)
 - `port` defaults to 22 (`ssh` and `tcp`)
 - `path` defaults to either `/run/podman/podman.sock`, or `/run/user/$UID/podman/podman.sock` if running rootless (`unix`), or must be explicitly specified (`ssh`)

URL value resolution precedence:
 - command line value
 - environment variable `CONTAINER_HOST`
 - `engine.service_destinations` table in containers.conf, excluding the /usr/share/containers directory
 - `unix:///run/podman/podman.sock`

Remote connections use local containers.conf for default.

Some example URL values in valid formats:
 - `unix:///run/podman/podman.sock`
 - `unix:///run/user/$UID/podman/podman.sock`
 - `ssh://notroot@localhost:22/run/user/$UID/podman/podman.sock`
 - `ssh://root@localhost:22/run/podman/podman.sock`
 - `tcp://localhost:34451`
 - `tcp://127.0.0.1:34451`

#### **--version**, **-v**

Print the version

#### **--volumepath**=*value*

Volume directory where builtin volume information is stored (default: "/var/lib/containers/storage/volumes" for UID 0, "$HOME/.local/share/containers/storage/volumes" for other users). Default volume path can be overridden in `containers.conf`.
