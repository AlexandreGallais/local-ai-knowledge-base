---
title: "Restart service when sleep finishes (part 5 of 11)"
tool: "podman"
version: "6.2"
source: "https://github.com/containers/podman/blob/055de046937d29450f310fce0fe3071485d8bed9/docs/source/markdown/podman-systemd.unit.5.md"
commit: "055de046937d29450f310fce0fe3071485d8bed9"
license: "Apache-2.0"
---

# Restart service when sleep finishes (part 5 of 11)

### `ShmSize=`

Size of /dev/shm.

This is equivalent to the Podman `--shm-size` option and generally has the form `number[unit]`

### `StartWithPod=`

Start the container after the associated pod is created. Default to **true**.

If `true`, container will be started/stopped/restarted alongside the pod.

If `false`, the container will not be started when the pod starts. The container will be stopped with the pod. Restarting the pod will also restart the container as long as the container was also running before.

Note, the container can still be started manually or through a target by configuring the `[Install]` section. The pod will be started as needed in any case.

### `StopSignal=`

Signal to stop a container. Default is **SIGTERM**.

This is equivalent to the Podman `--stop-signal` option

### `StopTimeout=`

Seconds to wait before forcibly stopping the container.

Note, this value should be lower than the actual systemd unit timeout to make sure the podman rm command is not killed by systemd.

This is equivalent to the Podman `--stop-timeout` option

### `SubGIDMap=`

Run the container in a new user namespace using the map with name in the /etc/subgid file.
Equivalent to the Podman `--subgidname` option.

### `SubUIDMap=`

Run the container in a new user namespace using the map with name in the /etc/subuid file.
Equivalent to the Podman `--subuidname` option.

### `Sysctl=`

Configures namespaced kernel parameters for the container. The format is `Sysctl=name=value`.

This is a space separated list of kernel parameters. This key can be listed multiple times.

For example:
```
Sysctl=net.ipv6.conf.all.disable_ipv6=1 net.ipv6.conf.all.use_tempaddr=1
```

### `Timezone=` (if unset uses system-configured default)

The timezone to run the container in.

### `Tmpfs=`

Mount a tmpfs in the container. This is equivalent to the Podman `--tmpfs` option, and
generally has the form `CONTAINER-DIR[:OPTIONS]`.

This key can be listed multiple times.

### `UIDMap=`

Run the container in a new user namespace using the supplied UID mapping.
Equivalent to the Podman `--uidmap` option.

This key can be listed multiple times.

### `Ulimit=`

Ulimit options. Sets the ulimits values inside of the container.

This key can be listed multiple times.

### `Umask=` (defaults to `0022`)

Set the umask inside the container.

This is equivalent to the Podman `--umask` option.

### `Unmask=`

Specify the paths to unmask separated by a colon. unmask=ALL or /path/1:/path/2, or shell expanded paths (/proc/*):

If set to `ALL`, Podman will unmask all the paths that are masked or made read-only by default.

The default masked paths are /proc/acpi, /proc/kcore, /proc/keys, /proc/latency_stats, /proc/sched_debug, /proc/scsi, /proc/timer_list, /proc/timer_stats, /sys/firmware, and /sys/fs/selinux.

The default paths that are read-only are /proc/asound, /proc/bus, /proc/fs, /proc/irq, /proc/sys, /proc/sysrq-trigger, /sys/fs/cgroup.

### `User=`

The (numeric) UID to run as inside the container. This does not need to match the UID on the host,
which can be modified with `UserNS`, but if that is not specified, this UID is also used on the host.

Note: when both `User=` and `Group=` are specified, they are combined into a single `--user USER:GROUP`
argument passed to Podman.

### `UserNS=`

Set the user namespace mode for the container. This is equivalent to the Podman `--userns` option and
generally has the form `MODE[:OPTIONS,...]`.

### `Volume=`

Mount a volume in the container. This is equivalent to the Podman `--volume` option, and
generally has the form `[[SOURCE-VOLUME|HOST-DIR:]CONTAINER-DIR[:OPTIONS]]`.

If `SOURCE-VOLUME` starts with `.`, Quadlet resolves the path relative to the location of the unit file.

Special case:

* If `SOURCE-VOLUME` ends with `.volume`, a Podman named volume called `systemd-$name` is used as the source, and the generated systemd service contains a dependency on the `$name-volume.service`. Note that the corresponding `.volume` file must exist.

This key can be listed multiple times.

### `WorkingDir=`

Working directory inside the container.

The default working directory for running binaries within a container is the root directory (/). The image developer can set a different default with the WORKDIR instruction. This option overrides the working directory by using the -w option.
