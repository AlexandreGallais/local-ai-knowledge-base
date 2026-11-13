---
title: "podman-update.1 (part 3 of 3)"
tool: "podman"
version: "6.2"
source: "https://github.com/containers/podman/blob/055de046937d29450f310fce0fe3071485d8bed9/docs/source/markdown/podman-update.1.md.in"
commit: "055de046937d29450f310fce0fe3071485d8bed9"
license: "Apache-2.0"
---

# podman-update.1 (part 3 of 3)

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

#### **--memory-reservation**=*number[unit]*

Memory soft limit. A _unit_ can be **b** (bytes), **k** (kibibytes), **m** (mebibytes), or **g** (gibibytes).

After setting memory reservation, when the system detects memory contention
or low memory, containers are forced to restrict their consumption to their
reservation. So always set the value below **--memory**, otherwise the
hard limit takes precedence. By default, memory reservation is the same
as memory limit.

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

#### **--memory-swappiness**=*number*

Tune a container's memory swappiness behavior. Accepts an integer between *0* and *100*.

This flag is only supported on cgroups V1 rootful systems.

#### **--no-healthcheck**

Disable any defined healthchecks for container.

<< if is_quadlet >>
### `PidsLimit=limit`
<< else >>
#### **--pids-limit**=*limit*
<< endif >>

Tune the container's pids limit. Set to **-1** to have unlimited pids for the container. The default is **2048** on systems that support "pids" cgroup controller.

#### **--restart**=*policy*

Restart policy to follow when containers exit.
Restart policy does not take effect if a container is stopped via the **podman kill** or **podman stop** commands.

Valid _policy_ values are:

- `no`                       : Do not restart containers on exit
- `never`                    : Synonym for **no**; do not restart containers on exit
- `on-failure[:max_retries]` : Restart containers when they exit with a non-zero exit code, retrying indefinitely or until the optional *max_retries* count is hit
- `always`                   : Restart containers when they exit, regardless of status, retrying indefinitely
- `unless-stopped`           : Restart containers when they exit, unless the container was explicitly stopped by the user. After a system reboot, containers with this policy will be restarted by podman-restart.service only if they were not explicitly stopped by the user before the reboot. This differs from **always**, which restarts containers after a system reboot regardless of whether they were user-stopped

Podman provides a systemd unit file, podman-restart.service, which restarts containers after a system reboot.

When running containers in systemd services, use the restart functionality provided by systemd.
In other words, do not use this option in a container unit, instead set the `Restart=` systemd directive in the `[Service]` section.
See **podman-systemd.unit**(5) and **systemd.service**(5).

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

Note: Ulimit changes apply after container restart.

#### **--unsetenv**=*env*

Unset default environment variables for the container. Default environment
variables include variables provided natively by Podman, environment variables
configured by the image, and environment variables from containers.conf.

## EXAMPLES

Update a container with a new cpu quota and period:
```
$ podman update --cpus=0.5 ctrID
```

Update the latest container with a new cpu value:
```
$ podman update --latest --cpus=1
```

Update a container's ulimit:
```
$ podman update --ulimit nofile=1024:1024 ctrID
```

Update a container with multiple options at ones:
```
$ podman update --cpus 5 --cpuset-cpus 0 --cpu-shares 123 --cpuset-mems 0 \\
  --memory 1G --memory-swap 2G --memory-reservation 2G \\
  --blkio-weight-device /dev/sda:123 --blkio-weight 123 \\
  --device-read-bps /dev/sda:10mb --device-write-bps /dev/sda:10mb \\
  --device-read-iops /dev/sda:1000 --device-write-iops /dev/sda:1000 \\
  --pids-limit 123 ctrID
```

## SEE ALSO
**podman(1)**, **podman-create(1)**, **podman-run(1)**

## HISTORY
June 2025, Latest option added by Hayato Kihara <kai.21banana@gmail.com>
August 2022, Originally written by Charlie Doern <cdoern@redhat.com>
