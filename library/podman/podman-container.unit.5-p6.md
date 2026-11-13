---
title: "NAME (part 6 of 7)"
tool: "podman"
version: "6.2"
source: "https://github.com/containers/podman/blob/055de046937d29450f310fce0fe3071485d8bed9/docs/source/markdown/podman-container.unit.5.md.in"
commit: "055de046937d29450f310fce0fe3071485d8bed9"
license: "Apache-2.0"
---

# NAME (part 6 of 7)

### `Retry=attempts`
<< else >>
#### **--retry**=*attempts*
<< endif >>

Number of times to retry pulling or pushing images between the registry and
local storage in case of failure. Default is **3**.

<< if is_quadlet >>
### `RetryDelay=duration`
<< else >>
#### **--retry-delay**=*duration*
<< endif >>

Duration of delay between retry attempts when pulling or pushing images between
the registry and local storage in case of failure. The default is to start at two seconds and then exponentially back off. The delay is used when this value is set, and no exponential back off occurs.

<< if is_quadlet >>
### `Rootfs=`
<< else >>
#### **--rootfs**
<< endif >>

If specified, the first argument refers to an exploded container on the file system.

<< if is_quadlet >>
This option conflicts with the `Image` option.

<< endif >>
This is useful to run a container without requiring any image management, the rootfs
of the container is assumed to be managed externally.

  `Overlay Rootfs Mounts`

   The `:O` flag tells Podman to mount the directory from the rootfs path as
storage using the `overlay file system`. The container processes
can modify content within the mount point which is stored in the
container storage in a separate directory. In overlay terms, the source
directory is the lower, and the container storage directory is the
upper. Modifications to the mount point are destroyed when the container
finishes executing, similar to a tmpfs mount point being unmounted.

Note: On **SELinux** systems, the rootfs needs the correct label, which is by default
**unconfined_u:object_r:container_file_t:s0**.

  `idmap`

If `idmap` is specified, create an idmapped mount to the target user
namespace in the container.
The idmap option supports a custom mapping that can be different than the user
namespace used by the container.  The mapping can be specified after the idmap
option like: `idmap=uids=0-1-10#10-11-10;gids=0-100-10`.  For each triplet, the
first value is the start of the backing file system IDs that are mapped to the
second value on the host.  The length of this mapping is given in the third value.
Multiple ranges are separated with #.

<< if is_quadlet >>
### `RunInit=`
<< else >>
#### **--init**
<< endif >>

Run an init inside the container that forwards signals and reaps processes.
The container-init binary is mounted at `/run/podman-init`.
Mounting over `/run` breaks container execution.

### `SeccompProfile=path`

Set the seccomp profile to use in the container. If unset, the default Podman profile is used.
Set to either the pathname of a JSON file, or `unconfined` to disable the seccomp filters.

<< if is_quadlet >>
### `Secret=<example-value>[,opt=opt ...]`
<< else >>
#### **--secret**=*secret[,opt=opt ...]*
<< endif >>

Give the container access to a secret. Can be specified multiple times.

A secret is a blob of sensitive data which a container needs at runtime but
is not stored in the image or in source control, such as usernames and passwords,
TLS certificates and keys, SSH keys or other important generic strings or binary content (up to 512 kB in size).

When secrets are specified as type `mount`, the secrets are copied and mounted into the container when a container is created.
When secrets are specified as type `env`, the secret is set as an environment variable within the container.
Secrets are written in the container at the time of container creation, and modifying the secret using `podman secret` commands
after the container is created affects the secret <example-value> the container.

Secrets and its storage are managed using the `podman secret` command.

Secret <example-value>

- `type=mount|env`    : How the secret is exposed to the container.
                        `mount` mounts the secret into the container as a file.
                        `env` exposes the secret as an environment variable.
                        Defaults to `mount`.
- `target=target`     : Target of secret.
                        For mounted secrets, this is the path to the secret <example-value> the container.
                        If a fully qualified path is provided, the secret is mounted at that location.
                        Otherwise, the secret is mounted to
                        `/run/secrets/target` for Linux containers or
                        `/var/run/secrets/target` for FreeBSD containers.
                        If the target is not set, the secret is mounted to `/run/secrets/secretname` by default.
                        For env secrets, this is the environment variable key. Defaults to `secretname`.
- `uid=0`             : UID of secret. Defaults to 0. Mount secret type only.
- `gid=0`             : GID of secret. Defaults to 0. Mount secret type only.
- `mode=0`            : Mode of secret. Defaults to 0444. Mount secret type only.

Examples

Mount at `/my/location/mysecret` with UID 1:
```
--secret <example-value>,target=/my/location/mysecret,uid=1
```

Mount at `/run/secrets/customtarget` with mode 0777:
```
--secret <example-value>,target=customtarget,mode=0777
```

Create a secret <example-value> variable called `ENVSEC`:
```
--secret <example-value>,type=env,target=ENVSEC
```

### `SecurityLabelDisable=bool`

Turn off label separation for the container.

### `SecurityLabelFileType=label`

Set the label file type for the container files.

### `SecurityLabelLevel=s0:c1,c2`

Set the label process level for the container processes.

### `SecurityLabelNested=bool`

Allow SecurityLabels to function within the container. This allows separation of containers created within the container.

### `SecurityLabelType=type`

Set the label process type for the container processes.

<< if is_quadlet >>
### `ShmSize=number[unit]`
<< else >>
#### **--shm-size**=*number[unit]*
<< endif >>

Size of _/dev/shm_. A _unit_ can be **b** (bytes), **k** (kibibytes), **m** (mebibytes), or **g** (gibibytes).
If the unit is omitted, the system uses bytes. If the size is omitted, the default is **64m**.
When _size_ is **0**, there is no limit on the amount of memory used for IPC by the <<container|pod>>.
This option conflicts with **--ipc=host**.

### `StartWithPod=bool`

Start the container after the associated pod is created. Defaults to **true**.

If `true`, the container will be started/stopped/restarted alongside the pod.

If `false`, the container will not be started when the pod starts. The container will be stopped with the pod. Restarting the pod will also restart the container as long as the container was also running before.

Note, the container can still be started manually or through a target by configuring the `[Install]` section. The pod will be started as needed in any case.

<< if is_quadlet >>
### `StopSignal=signal`
<< else >>
#### **--stop-signal**=*signal*
<< endif >>

Signal to stop a container. Default is **SIGTERM**.

<< if is_quadlet >>
### `StopTimeout=seconds`
<< else >>
#### **--stop-timeout**=*seconds*
<< endif >>

Timeout to stop a container. Default is **10**.
Remote connections use local containers.conf for defaults.

<< if is_quadlet >>
**Note:** this value should be lower than the actual systemd unit timeout to ensure the `podman rm` command is not killed by systemd.
<< endif >>

<< if is_quadlet >>
### `SubGIDMap=name`
<< else >>
#### **--subgidname**=*name*
<< endif >>

Run the container in a new user namespace using the map with _name_ in the _/etc/subgid_ file.
When running rootless, the user needs the necessary permissions to use the mapping. See **subgid**(5).
This flag conflicts with << '**UserNS=**' if is_quadlet else '**--userns**' >> and << '**GIDMap=**' if is_quadlet else '**--gidmap**' >>.
Together with << '**GIDMap=**' if is_quadlet else '**--gidmap**' >> it acts as if << '**GIDMap=**' if is_quadlet else '**--gidmap**' >> was passed with all mappings of the _name_ group in _/etc/subgid_.

<< if is_quadlet >>
### `SubUIDMap=name`
<< else >>
#### **--subuidname**=*name*
<< endif >>

Run the container in a new user namespace using the map with _name_ in the _/etc/subuid_ file.
When running rootless, the user needs the necessary permissions to use the mapping. See **subuid**(5).
This flag conflicts with << '**UserNS=**' if is_quadlet else '**--userns**' >> and << '**UIDMap=**' if is_quadlet else '**--uidmap**' >>.
Together with << '**UIDMap=**' if is_quadlet else '**--uidmap**' >> it acts as if << '**UIDMap=**' if is_quadlet else '**--uidmap**' >> was passed with all mappings of the _name_ user in _/etc/subuid_.

<< if is_quadlet >>
### `Sysctl=name=value`
<< else >>
#### **--sysctl**=*name=value*
<< endif >>

Configure namespaced kernel parameters <<at runtime|for all containers in the pod>>.

For the IPC namespace, the following sysctls are allowed:

- kernel.msgmax
- kernel.msgmnb
- kernel.msgmni
- kernel.sem
- kernel.shmall
- kernel.shmmax
- kernel.shmmni
- kernel.shm_rmid_forced
- Sysctls beginning with fs.mqueue.\*

Note: <<if using the **--ipc=host** option|if the ipc namespace is not shared within the pod>>, the above sysctls are not allowed.

For the network namespace, only sysctls beginning with net.\* are allowed.

Note: <<if using the **--network=host** option|if the network namespace is not shared within the pod>>, the above sysctls are not allowed.

<< if is_quadlet >>
### `Timezone=timezone`
<< else >>
#### **--tz**=*timezone*
<< endif >>

Set timezone in container. This flag takes area-based timezones, GMT time, as well as `local`, which sets the timezone in the container to match the host machine. See `/usr/share/zoneinfo/` for valid timezones.
Remote connections use local containers.conf for defaults

<< if is_quadlet >>
### `Tmpfs=`
<< else >>
#### **--tmpfs**=*fs*
<< endif >>

Create a tmpfs mount.

Mount a temporary filesystem (**tmpfs**) mount into a container, for example:

```
$ podman <<subcommand>> -d --tmpfs /tmp:rw,size=787448k,mode=1777 my_image
```

This command mounts a **tmpfs** at _/tmp_ within the container. The supported mount
options are the same as the Linux default mount flags. If no options are specified,
the system uses the following options:
**rw,noexec,nosuid,nodev**.

By default, Podman enables **tmpcopyup** on tmpfs mounts, which copies the contents
of the underlying image directory into the tmpfs before mounting it. This also
applies when the tmpfs destination is inside a volume or bind mount: files from
the parent mount are copied into the tmpfs, so the parent content remains visible.
To mount an empty tmpfs that shadows a parent mount's subtree, use the
**notmpcopyup** option:

```
$ podman <<subcommand>> --volume myvolume:/data --tmpfs /data/sub:notmpcopyup my_image
```

<< if is_quadlet >>
### `Ulimit=option`
<< else >>
#### **--ulimit**=*option*
<< endif >>

Ulimit options. Sets the ulimits values inside of the container.

--ulimit with a soft and hard limit in the format <type>=<soft limit>[:<hard limit>]. For example:

$ podman run --ulimit nofile=1024:1024 --rm ubi9 ulimit -n
1024

Here is the list of the different resources and the limits' units:

| Type                                           | Unit of the value given to --ulimit |
|:-----------------------------------------------|:------------------------------------|
| core, fsize                                    | bytes                                |
| data, memlock, rss, stack                      | bytes                                |
| msgqueue                                       | bytes                                |
| rttime                                         | microseconds                         |
| cpu                                            | seconds                              |
| locks, nice, nofile, nproc, rtprio, sigpending | count                                |

For example, a locked memory limit given in bytes is reported in kbytes:

$ podman run --ulimit memlock=4096 --rm ubi9 ulimit -l
4

Unit suffixes such as *k* or *m* are not accepted.

Set -1 for the soft or hard limit to set the limit to the maximum limit of the current
process. In rootful mode this is often unlimited.

If nofile is unset, a default value of 1048576 will be used, unless overridden
in containers.conf(5).  However, if the default value exceeds the hard limit for the current
rootless user, the current hard limit will be applied instead.

Use **host** to copy the current configuration from the host.

Don't use nproc with the ulimit flag as Linux uses nproc to set the
maximum number of processes available to a user, not to a container.

Use the --pids-limit option to modify the cgroup control to limit the number
of processes within a container.

### `Unmask=`

Specify the paths to unmask separated by a colon. unmask=ALL or /path/1:/path/2, or shell expanded paths (/proc/*):

If set to `ALL`, Podman will unmask all the paths that are masked or made read-only by default.

The default masked paths are /proc/acpi, /proc/kcore, /proc/keys, /proc/latency_stats, /proc/sched_debug, /proc/scsi, /proc/timer_list, /proc/timer_stats, /sys/firmware, and /sys/fs/selinux.

The default paths that are read-only are /proc/asound, /proc/bus, /proc/fs, /proc/irq, /proc/sys, /proc/sysrq-trigger, /sys/fs/cgroup.

<< if is_quadlet >>
### `User=user[:group]`
<< else >>
#### **--user**, **-u**=*user[:group]*
<< endif >>

Sets the username or UID used and, optionally, the groupname or GID for the specified command. Both *user* and *group* may be symbolic or numeric.

Without this argument, the command runs as the user specified in the container image. Unless overridden by a `USER` command in the Containerfile or by a value passed to this option, this user generally defaults to root.

When a user namespace is not in use, the UID and GID used within the container and on the host match. When user namespaces are in use, however, the UID and GID in the container may correspond to another UID and GID on the host. In rootless containers, for example, a user namespace is always used, and root in the container by default corresponds to the UID and GID of the user invoking Podman.

<< if is_quadlet >>
