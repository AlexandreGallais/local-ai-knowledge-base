---
title: "populate a cache and also consult it (part 4 of 9)"
tool: "podman"
version: "6.2"
source: "https://github.com/containers/podman/blob/055de046937d29450f310fce0fe3071485d8bed9/docs/source/markdown/podman-build.1.md.in"
commit: "055de046937d29450f310fce0fe3071485d8bed9"
license: "Apache-2.0"
---

# populate a cache and also consult it (part 4 of 9)

### `Environment=env=value [env=value ...]`
<< else >>
#### **--env**, **-e**=*env*
<< endif >>

Set environment variables.

This option allows arbitrary environment variables that are available for the process to be launched inside of the container. If an environment variable is specified without a value, Podman checks the host environment for a value and set the variable only if it is set on the host. As a special case, if an environment variable ending in __*__ is specified without a value, Podman searches the host environment for variables starting with the prefix and adds those variables to the container.

<< if is_quadlet >>
### `File=Containerfile`
<< else >>
#### **--file**, **-f**=*Containerfile*
<< endif >>

Specifies a Containerfile which contains instructions for building the image,
either a local file or an **http** or **https** URL.  If more than one
Containerfile is specified, *FROM* instructions are only accepted from the
last specified file.

<< if is_quadlet >>
Note that for a given relative path to a Containerfile, or when using a `http(s)://` URL, also set
`SetWorkingDirectory=` in order for `podman build` to find a valid context directory for the
resources specified in the Containerfile.

Note that setting a `File=` field is mandatory for a `.build` file, unless `SetWorkingDirectory` (or
a `WorkingDirectory` in the `Service` group) has also been set.
<< else >>
If a build context is not specified, and at least one Containerfile is a
local file, the directory in which it resides is used as the build
context.
<< endif >>

Specifying the option << 'File=-' if is_quadlet else '`-f -`' >> causes
the Containerfile contents to be read from stdin.

#### **--force-compression**

If set, push uses the specified compression algorithm even if the destination contains a differently-compressed variant already.
Defaults to `true` if `--compression-format` is explicitly specified on the command-line, `false` otherwise.

<< if is_quadlet >>
### `ForceRM=`
<< else >>
#### **--force-rm**
<< endif >>

Always remove intermediate containers after a build, even if the build fails (default true).

#### **--format**

Control the format for the built image's manifest and configuration data.
Recognized formats include *oci* (OCI image-spec v1.0, the default) and
*docker* (version 2, using schema format 2 for the manifest).

Note: You can also override the default format by setting the BUILDAH\_FORMAT
environment variable.  `export BUILDAH_FORMAT=docker`

#### **--from**

Overrides the first `FROM` instruction within the Containerfile.  If there are multiple
FROM instructions in a Containerfile, only the first is changed.

With the remote podman client, not all container transports work as
expected. For example, oci-archive:/x.tar references /x.tar on the remote
machine instead of on the client. When using podman remote clients it is
best to restrict use to *containers-storage*, and *docker:// transports*.

<< if is_quadlet >>
### `GroupAdd=group | keep-groups`
<< else >>
#### **--group-add**=*group* | *keep-groups*
<< endif >>

Assign additional groups to the primary user running within the container process.

- `keep-groups` is a special flag that tells Podman to keep the supplementary group access.

Allows container to use the user's supplementary group access. If file systems or
devices are only accessible by the rootless user's group, this flag tells the OCI
runtime to pass the group access into the container. Currently only available
with the `crun` OCI runtime. Note: `keep-groups` is exclusive, other groups cannot be specified
with this flag. (Not available for remote commands, including Mac and Windows (excluding WSL2) machines)

Note: `keep-groups` passes the supplementary groups that the *calling process*
already has into the container, it does not look the user's groups up at
container start. When Podman is started from a systemd user service, for example
a rootless Quadlet, the calling process is the `systemd --user` manager, which
only holds the groups the user had when that manager was started. Groups the user
is added to afterwards, for example with `usermod`, are therefore not passed into
the container. Restart the user's systemd manager to pick them up, for example
with `loginctl terminate-user <user>` followed by a new login, or by rebooting.

#### **--help**, **-h**

Print usage statement

#### **--hooks-dir**=*path*

Each *.json file in the path configures a hook for buildah build containers. For more details on the syntax of the JSON files and the semantics of hook injection. Buildah currently support both the 1.0.0 and 0.1.0 hook schemas, although the 0.1.0 schema is deprecated.

This option may be set multiple times; paths from later options have higher precedence.

For the annotation conditions, buildah uses any annotations set in the generated OCI configuration.

For the bind-mount conditions, only mounts explicitly requested by the caller via --volume are considered. Bind mounts that buildah inserts by default (e.g. /dev/shm) are not considered.

If --hooks-dir is unset for root callers, Buildah currently defaults to /usr/share/containers/oci/hooks.d and /etc/containers/oci/hooks.d in order of increasing precedence. Using these defaults is deprecated. Migrate to explicitly setting --hooks-dir.

<< if is_quadlet >>
### `HttpProxy=`
<< else >>
#### **--http-proxy**
<< endif>>

By default proxy environment variables are passed into the container if set
for the Podman process. This can be disabled by setting the value to **false**.
The environment variables passed in include **http_proxy**,
**https_proxy**, **ftp_proxy**, **no_proxy**, and also the upper case versions of
those. This option is only needed when the host system must use a proxy but
the container does not use any proxy. Proxy environment variables specified
for the container in any other way overrides the values that have
been passed through from the host. (Other ways to specify the proxy for the
container include passing the values with the **--env** flag, or hard coding the
proxy environment at container build time.)
When used with the remote client it uses the proxy environment variables
that are set on the server process.

The default for this option is taken from the `http_proxy` setting in the
`[containers]` table of containers.conf(5). If unset, that value defaults to
**true**.

#### **--identity-label**

Adds default identity label `io.buildah.version` if set. (default true).

#### **--ignorefile**

Path to an alternative .containerignore file.

#### **--iidfile**=*ImageIDfile*

Write the built image's ID to the file.  When `--platform` is specified more than once, attempting to use this option triggers an error.

#### **--iidfile-raw**=*ImageIDfile*

Write the built image's ID to the file without the algorithm prefix (e.g., `sha256:`). When `--platform` is specified more than once, attempting to use this option triggers an error.

#### **--inherit-annotations**=*bool-value*

Inherit the annotations from the base image or base stages. (default true).
Use cases which set this flag to *false* may need to do the same for the
**--created-annotation** flag.

#### **--inherit-labels**

Inherit the labels from the base image or base stages. (default true).

#### **--ipc**=*ipc*

Set the IPC namespace mode for a container. The default is to create
a private IPC namespace.

- "": Use Podman's default, defined in containers.conf.
- **container:**_id_: reuses another container's shared memory, semaphores, and message queues
- **host**: use the host's shared memory, semaphores, and message queues inside the container. Note: the host mode gives the container full access to local shared memory and is therefore considered insecure.
- **none**:  private IPC namespace, with /dev/shm not mounted.
- **ns:**_path_: path to an IPC namespace to join.
- **private**: private IPC namespace.
- **shareable**: private IPC namespace with a possibility to share it with other containers.

#### **--isolation**=*type*

Controls what type of isolation is used for running processes as part of `RUN`
instructions.  Recognized types include *oci* (OCI-compatible runtime, the
default), *rootless* (OCI-compatible runtime invoked using a modified
configuration and its --rootless option enabled, with *--no-new-keyring
--no-pivot* added to its *create* invocation, with network and UTS namespaces
disabled, and IPC, PID, and user namespaces enabled; the default for
unprivileged users), and *chroot* (an internal wrapper that leans more toward
chroot(1) than container technology).

Note: You can also override the default isolation type by setting the
BUILDAH\_ISOLATION environment variable.  `export BUILDAH_ISOLATION=oci`

#### **--jobs**=*number*

Run up to N concurrent stages in parallel.  If the number of jobs is greater
than 1, stdin is read from /dev/null.  If 0 is specified, then there is
no limit in the number of jobs that run in parallel.

<< if is_quadlet >>
### `Label=key=value [key=value ...]`
<< else >>
#### **--label**, **-l**=*key=value*
<< endif >>

Add metadata to a <<container|pod>>.

#### **--layer-label**=*label[=value]*

Add an intermediate image *label* (e.g. label=*value*) to the intermediate
image metadata. It can be used multiple times.

If *label* is named, but neither `=` nor a `value` is provided, then
the *label* is set to an empty value.

#### **--layers**

Cache intermediate images during the build process (Default is `true`).

Note: You can also override the default value of layers by setting the
BUILDAH\_LAYERS environment variable. `export BUILDAH_LAYERS=true`

#### **--logfile**=*filename*

Log output which is sent to standard output and standard error to the
specified file instead of to standard output and standard error.
This option is not supported on the remote client, including Mac and Windows (excluding WSL2) machines.

#### **--logsplit**=*bool-value*

If `--logfile` and `--platform` are specified, the `--logsplit` option allows
end-users to split the log file for each platform into different files in the
following format: `${logfile}_${platform-os}_${platform-arch}`.
This option is not supported on the remote client, including Mac and Windows
(excluding WSL2) machines.

#### **--manifest**=*manifest*

Name of the manifest list to which the image is added. Creates the manifest list if it does not exist. This option is useful for building multi architecture images.

<< if is_quadlet >>
### `Memory=number[unit]`
<< else >>
#### **--memory**, **-m**=*number[unit]*
<< endif >>

Memory limit. A _unit_ can be **b** (bytes), **k** (kibibytes), **m** (mebibytes), or **g** (gibibytes).

Allows the memory available to a container to be constrained. If the host
supports swap memory, then the << '**Memory=**' if is_quadlet else '**--memory**' >> memory setting can be larger than physical
RAM. If a limit of 0 is specified (not using << '**Memory=**' if is_quadlet else '**--memory**' >>), the container's memory is
not limited. The actual limit may be rounded up to a multiple of the operating
system's page size (the value is very large, that's millions of trillions).

This option is not supported on cgroups V1 rootless systems.

#### **--memory-swap**=*number[unit]*

A limit value equal to memory plus swap.
A _unit_ can be **b** (bytes), **k** (kibibytes), **m** (mebibytes), or **g** (gibibytes).

Must be used with the **-m** (**--memory**) flag.
The argument value must be larger than that of
 **-m** (**--memory**) By default, it is set to double
the value of **--memory**.

Set _number_ to **-1** to enable unlimited swap.

This option is not supported on cgroups V1 rootless systems.

#### **--metadata-file**=*MetadataFile*

Write information about the built image to the named file. When `--platform` is specified more than once, attempting to use this option triggers an error.

Note: This option is not supported in remote mode.

#### **--mount**=*mount-specification*

Adds this mount to each `RUN` command in a Containerfile before executing.  For example:

`podman build --mount=type=secret,id=mysecret …`

and a Containerfile entry of:

`RUN cat /run/secrets/mysecret`

Has the same effect as:

`RUN --mount=type=secret,id=mysecret cat /run/secrets/mysecret`

<< if is_quadlet >>
