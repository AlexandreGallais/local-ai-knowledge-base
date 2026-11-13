---
title: "podman run --userns=auto:size=65536 ubi8-micro cat /proc/self/uid_map (part 12 of 13)"
tool: "podman"
version: "6.2"
source: "https://github.com/containers/podman/blob/055de046937d29450f310fce0fe3071485d8bed9/docs/source/markdown/podman-run.1.md.in"
commit: "055de046937d29450f310fce0fe3071485d8bed9"
license: "Apache-2.0"
---

# podman run --userns=auto:size=65536 ubi8-micro cat /proc/self/uid_map (part 12 of 13)

## EXAMPLES

### Running container in read-only mode

During container image development, containers often need to write to the image
content. Installing packages into _/usr_, for example. In production,
applications seldom need to write to the image.  Container applications write
to volumes if they need to write to file systems at all. Applications can be
made more secure by running them in read-only mode using the **--read-only** switch.
This protects the container's image from modification. By default read-only
containers can write to temporary data. Podman mounts a tmpfs on _/run_ and
_/tmp_ within the container.

```
$ podman run --read-only -i -t fedora /bin/bash
```

If the container does not write to any file
system within the container, including tmpfs, set --read-only-tmpfs=false.
```
$ podman run --read-only --read-only-tmpfs=false --tmpfs /run -i -t fedora /bin/bash
```

### Exposing shared libraries inside of container as read-only using a glob

```
$ podman run --mount type=glob,src=/usr/lib64/libnvidia\*,ro=true -i -t fedora /bin/bash
```

### Exposing log messages from the container to the host's log

Bind mount the _/dev/log_ directory to have messages that are logged in the container  show up in the host's
syslog/journal.

```
$ podman run -v /dev/log:/dev/log -i -t fedora /bin/bash
```

From inside the container test this by sending a message to the log.

```
(bash)# logger "Hello from my container"
```

Then exit and check the journal.

```
(bash)# exit

$ journalctl -b | grep Hello
```

This lists the message sent to the logger.

### Attaching to one or more from STDIN, STDOUT, STDERR

Without specifying the **-a** option, Podman attaches everything (stdin, stdout, stderr).
Override the default by specifying -a (stdin, stdout, stderr), as in:

```
$ podman run -a stdin -a stdout -i -t fedora /bin/bash
```

### Sharing IPC between containers

Using **shm_server.c** available here: https://www.cs.cf.ac.uk/Dave/C/node27.html

Testing **--ipc=host** mode:

Host shows a shared memory segment with 7 pids attached, happens to be from httpd:

```
$ sudo ipcs -m

------ Shared Memory Segments --------
key        shmid      owner      perms      bytes      nattch     status
0x01128e25 0          root       600        1000       7
```

Now run a regular container, and it correctly does NOT see the shared memory segment from the host:

```
$ podman run -it shm ipcs -m

------ Shared Memory Segments --------
key        shmid      owner      perms      bytes      nattch     status
```

Run a container with the new **--ipc=host** option, and it now sees the shared memory segment from the host httpd:

```
$ podman run -it --ipc=host shm ipcs -m

------ Shared Memory Segments --------
key        shmid      owner      perms      bytes      nattch     status
0x01128e25 0          root       600        1000       7
```
Testing **--ipc=container:**_id_ mode:

Start a container with a program to create a shared memory segment:
```
$ podman run -it shm bash
$ sudo shm/shm_server &
$ sudo ipcs -m

------ Shared Memory Segments --------
key        shmid      owner      perms      bytes      nattch     status
0x0000162e 0          root       666        27         1
```
Create a 2nd container correctly shows no shared memory segment from 1st container:
```
$ podman run shm ipcs -m

------ Shared Memory Segments --------
key        shmid      owner      perms      bytes      nattch     status
```

Create a 3rd container using the **--ipc=container:**_id_ option, now it shows the shared memory segment from the first:

```
$ podman run -it --ipc=container:ed735b2264ac shm ipcs -m
$ sudo ipcs -m

------ Shared Memory Segments --------
key        shmid      owner      perms      bytes      nattch     status
0x0000162e 0          root       666        27         1
```

### Mapping Ports for External Usage

The exposed port of an application can be mapped to a host port using the **-p**
flag. For example, an httpd port 80 can be mapped to the host port 8080 using the
following:

```
$ podman run -p 8080:80 -d fedora/httpd
```

### Mounting External Volumes

To mount a host directory as a container volume, specify the absolute path to
the directory and the absolute path for the container directory separated by a
colon. If the source is a named volume maintained by Podman, it is recommended to
use its name rather than the path to the volume. Otherwise the volume is
considered an orphan and wiped by the **podman volume prune** command:

```
$ podman run -v /var/db:/data1 -i -t fedora bash

$ podman run -v data:/data2 -i -t fedora bash

$ podman run -v /var/cache/dnf:/var/cache/dnf:O -ti fedora dnf -y update
```

If the container needs a writable mounted volume by a non root user inside the container, use the **U** option. This option tells Podman to chown the source volume to match the default UID and GID used within the container.
```
$ podman run -d -e MARIADB_ROOT_PASSWORD=root --user mysql --userns=keep-id -v ~/data:/var/lib/mysql:Z,U mariadb
```

Alternatively if the container needs a writable volume by a non root
user inside of the container, the --userns=keep-id option allows users to
specify the UID and GID of the user executing Podman to specific UIDs and GIDs
within the container. Since the processes running in the container run as the user's UID, they can read/write files owned by the user.
```
$ podman run -d -e MARIADB_ROOT_PASSWORD=root --user mysql --userns=keep-id:uid=999,gid=999 -v ~/data:/var/lib/mysql:Z mariadb
```

Using **--mount** flags to mount a host directory as a container folder, specify
the absolute path to the directory or the volume name, and the absolute path
within the container directory:

````
$ podman run --mount type=bind,src=/var/db,target=/data1 busybox sh

$ podman run --mount type=bind,src=volume-name,target=/data1 busybox sh
````

The **--mount** flag provides a structured, key-value style for defining mounts
inside containers. It is similar in purpose to **-v** or **--volume**, but offers
greater clarity for complex or multi-option configurations. The general syntax
is:

```
--mount type=<TYPE>,src=<SOURCE>,dst=<TARGET>[,options...]
```

Supported mount types include **bind**, **volume**, **tmpfs**, **artifact**,
**devpts**, **image**, **glob**, and **ramfs**. Each type serves a different
purpose in how data is attached to the container.

#### Bind mounts

Bind mounts directly link a directory or file on the host into the container.
Changes made in one are immediately visible in the other. Use bind mounts when
both the host and container need access to the same files, such as configuration
files or source code.

Example:

```
$ podman run --mount type=bind,src=/etc/config,dst=/app/config alpine cat /app/config/file.conf
```

#### Volume mounts

Volume mounts use Podman-managed named volumes that persist independently of
containers. They are ideal for persistent data such as databases or logs and are
isolated from direct host paths.

Example:

```
$ podman volume create mydata
$ podman run --mount type=volume,src=mydata,dst=/var/lib/data postgres
```

#### Tmpfs mounts

A tmpfs mount creates an in-memory filesystem on the host that is mounted inside
the container. Data stored here is temporary and removed when the container
stops or the host reboots. tmpfs mounts are useful for temporary caches or
sensitive data that should not persist to disk.

Example:

```
$ podman run --mount type=tmpfs,dst=/cache,tmpfs-size=64m alpine
```

#### Artifact, devpts, image, glob, and ramfs mounts

Other specialized mount types are available for advanced use cases:

- **artifact** - Mounts read-only content from a container image or artifact.
- **devpts** - Provides a pseudo-terminal device inside the container.
- **image** - Mounts files directly from another container image.
- **glob** - Mounts multiple host files matching a glob pattern.
- **ramfs** - Similar to tmpfs but backed directly by system RAM without size limits.

These mount types are less commonly used and often appear in internal or
advanced Podman workflows.

In summary, **--mount** provides a single consistent interface for connecting
external storage to containers. Choose the mount type that best fits your use
case: **bind** for direct host access, **volume** for persistent data managed by
Podman, and **tmpfs** for ephemeral in-memory storage.

When using SELinux, be aware that the host has no knowledge of container SELinux
policy. Therefore, in the above example, if SELinux policy is enforced, the
_/var/db_ directory is not writable to the container. A "Permission Denied"
message occurs, and an **avc:** message is added to the host's syslog.

To work around this, at time of writing this man page, the following command
needs to be run in order for the proper SELinux policy type label to be attached
to the host directory:

```
$ chcon -Rt svirt_sandbox_file_t /var/db
```

Now, writing to the _/data1_ volume in the container is allowed and the
changes are reflected on the host in _/var/db_.

### Using alternative security labeling

Override the default labeling scheme for each container by specifying
the **--security-opt** flag. For example, specify the MCS/MLS level, a
requirement for MLS systems. Specifying the level in the following command
allows the same content to be shared between containers.

```
$ podman run --security-opt label=level:s0:c100,c200 -i -t fedora bash
```

An MLS example might be:

```
$ podman run --security-opt label=level:TopSecret -i -t rhel7 bash
```

To disable the security labeling for this container versus running with the
#### **--permissive** flag, use the following command:

```
$ podman run --security-opt label=disable -i -t fedora bash
```

Tighten the security policy on the processes within a container by specifying an
alternate type for the container. For example, run a container
that is only allowed to listen on Apache ports by executing the following
command:

```
$ podman run --security-opt label=type:svirt_apache_t -i -t centos bash
```

Note that an SELinux policy defining a **svirt_apache_t** type must be written.

To mask additional specific paths in the container, specify the paths
separated by a colon using the **mask** option with the **--security-opt**
flag.

```
$ podman run --security-opt mask=/foo/bar:/second/path fedora bash
```

To unmask all the paths that are masked by default, set the **unmask** option to
**ALL**. Or to only unmask specific paths, specify the paths as shown above with
the **mask** option.

```
$ podman run --security-opt unmask=ALL fedora bash
```

To unmask all the paths that start with /proc, set the **unmask** option to
**/proc/***.

```
$ podman run --security-opt unmask=/proc/* fedora bash
```

```
$ podman run --security-opt unmask=/foo/bar:/sys/firmware fedora bash
```

### Setting device weight via **--blkio-weight-device** flag.

```
$ podman run -it --blkio-weight-device "/dev/sda:200" ubuntu
```

### Using a podman container with input from a pipe

```
$ echo "asdf" | podman run --rm -i --entrypoint /bin/cat someimage
asdf
```

### Setting automatic user namespace separated containers

```
# podman run --userns=auto:size=65536 ubi8-micro cat /proc/self/uid_map
0 2147483647      65536
# podman run --userns=auto:size=65536 ubi8-micro cat /proc/self/uid_map
0 2147549183      65536
```

### Setting Namespaced Kernel Parameters (Sysctls)

The **--sysctl** sets namespaced kernel parameters (sysctls) in the
container. For example, to turn on IP forwarding in the containers
network namespace, run this command:

```
$ podman run --sysctl net.ipv4.ip_forward=1 someimage
```

Note that not all sysctls are namespaced. Podman does not support changing sysctls
inside of a container that also modify the host system. As the kernel
evolves we expect to see more sysctls become namespaced.

See the definition of the **--sysctl** option above for the current list of
supported sysctls.

### Set UID/GID mapping in a new user namespace

Running a container in a new user namespace requires a mapping of
the UIDs and GIDs from the host.

```
$ podman run --uidmap 0:30000:7000 --gidmap 0:30000:7000 fedora echo hello
```

### Configuring Storage Options from the command line

Podman allows for the configuration of storage by changing the values
in the _/etc/container/storage.conf_ or by using global options. This
shows how to use an additional image store for a one-time run of busybox
using global options.

```
$ podman --log-level=debug --storage-opt "additionalimagestore=/tmp/readonly-images" run busybox /bin/sh
```

### Configure timezone in a container

```
$ podman run --tz=local alpine date
$ podman run --tz=Asia/Shanghai alpine date
$ podman run --tz=US/Eastern alpine date
```

### Adding dependency containers

The first container, container1, is not started initially, but must be running before container2 starts.
The `podman run` command starts the container automatically before starting container2.

```
$ podman create --name container1 -t -i fedora bash
$ podman run --name container2 --requires container1 -t -i fedora bash
```

Multiple containers can be required.

```
$ podman create --name container1 -t -i fedora bash
$ podman create --name container2 -t -i fedora bash
$ podman run --name container3 --requires container1,container2 -t -i fedora bash
```

### Configure keep supplemental groups for access to volume

```
$ podman run -v /var/lib/design:/var/lib/design --group-add keep-groups ubi8
```

### Configure execution domain for containers using personality flag

```
$ podman run --name container1 --personality=LINUX32 fedora bash
```

### Run a container with external rootfs mounted as an overlay

```
$ podman run --name container1 --rootfs /path/to/rootfs:O bash
```

### Handling Timezones in java applications in a container.

In order to use a timezone other than UTC when running a
Java application within a container, the `TZ` environment variable must be
set within the container. Java applications ignores the value set with the
`--tz` option.

```
# Example run
podman run -ti --rm  -e TZ=EST mytzimage
lrwxrwxrwx. 1 root root 29 Nov  3 08:51 /etc/localtime -> ../usr/share/zoneinfo/Etc/UTC
Now with default timezone:
Fri Nov 19 18:10:55 EST 2021
Java default sees the following timezone:
2021-11-19T18:10:55.651130-05:00
Forcing UTC:
Fri Nov 19 23:10:55 UTC 2021
```

### Run a container connected to two networks (called net1 and net2) with a static ip

```
$ podman run --network net1:ip=10.89.1.5 --network net2:ip=10.89.10.10 alpine ip addr
```

### Define a healthcheck at run time and verify it

```
$ podman create -d --name healthcheck-example -p 8080:80 \
  --health-cmd '["CMD-SHELL","wget -q --spider http://127.0.0.1:80 || exit 1"]' \
  --health-interval 30s --health-timeout 5s --health-retries 3 \
  docker.io/library/nginx:alpine

$ podman inspect healthcheck-example | jq '.[0].State.Health'
```
