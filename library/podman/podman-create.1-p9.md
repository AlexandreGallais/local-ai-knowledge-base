---
title: "podman create --userns=auto:size=65536 ubi8-init (part 9 of 11)"
tool: "podman"
version: "6.2"
source: "https://github.com/containers/podman/blob/055de046937d29450f310fce0fe3071485d8bed9/docs/source/markdown/podman-create.1.md.in"
commit: "055de046937d29450f310fce0fe3071485d8bed9"
license: "Apache-2.0"
---

# podman create --userns=auto:size=65536 ubi8-init (part 9 of 11)

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

#### **--umask**=*umask*

Set the umask inside the container. Defaults to `0022`.
Remote connections use the local `containers.conf` for defaults.

#### **--unsetenv**=*env*

Unset default environment variables for the container. Default environment
variables include variables provided natively by Podman, environment variables
configured by the image, and environment variables from containers.conf.

#### **--unsetenv-all**

Unset all default environment variables for the container. Default environment
variables include variables provided natively by Podman, environment variables
configured by the image, and environment variables from containers.conf.

<< if is_quadlet >>
### `User=user[:group]`
<< else >>
#### **--user**, **-u**=*user[:group]*
<< endif >>

Sets the username or UID used and, optionally, the groupname or GID for the specified command. Both *user* and *group* may be symbolic or numeric.

Without this argument, the command runs as the user specified in the container image. Unless overridden by a `USER` command in the Containerfile or by a value passed to this option, this user generally defaults to root.

When a user namespace is not in use, the UID and GID used within the container and on the host match. When user namespaces are in use, however, the UID and GID in the container may correspond to another UID and GID on the host. In rootless containers, for example, a user namespace is always used, and root in the container by default corresponds to the UID and GID of the user invoking Podman.

#### **--uts**=*how*

Sets the configuration for UTS namespaces when handling `RUN` instructions.
The configured value can be "" (the empty string) or "container" to indicate that a new UTS namespace to be created, or it can be "host" to indicate that the UTS namespace in which `podman` itself is being run is reused, or it can be the path to a UTS namespace which is already in use by another process.

<< if is_quadlet >>
