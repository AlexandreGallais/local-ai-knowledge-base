---
title: "podman create --userns=auto:size=65536 ubi8-init (part 7 of 11)"
tool: "podman"
version: "6.2"
source: "https://github.com/containers/podman/blob/055de046937d29450f310fce0fe3071485d8bed9/docs/source/markdown/podman-create.1.md.in"
commit: "055de046937d29450f310fce0fe3071485d8bed9"
license: "Apache-2.0"
---

# podman create --userns=auto:size=65536 ubi8-init (part 7 of 11)

### `PublishPort=[hostIP::]containerPort[/protocol]`
<< else >>
#### **--publish**, **-p**=*[hostIP::]containerPort[/protocol]*
<< endif >>

Publish a container's port, or range of ports,<<| within this pod>> to the host.

Both *hostPort* and *containerPort* can be specified as a range of ports.
When specifying ranges for both, the number of container ports in the
range must match the number of host ports in the range.

If *hostIP* is `0.0.0.0`, only IPv4 addresses will be bound, if set to `[::]` only
IPv6 addresses are bound. In all other cases the exact IP address as given will be bound.
If *hostIP* is not set at all, the port is bound on all IP addresses on the host,
both v4 and v6 (if possible).

The default *hostIP* can be configured in **containers.conf(5)**
using the `default_host_ips` option under the `[network]` section.
This option accepts an array to be able to set multiple bind IP addresses.
For example setting `default_host_ips = ["127.0.0.1", "::1"]` will make the
port be published on the ipv4 and ipv6 localhost address respectively.
An explicit *hostIP* set on the command will always override the config option.

By default, Podman publishes TCP ports. To publish a UDP port instead, give
`udp` as protocol. To publish both TCP and UDP ports, set `--publish` twice,
with `tcp`, and `udp` as protocols respectively. Rootful containers can also
publish ports using the `sctp` protocol.

Host port does not have to be specified (e.g. `podman run -p 127.0.0.1::80`).
If it is not, the container port is randomly assigned a port on the host.

Use **podman port** to see the actual mapping: `podman port $CONTAINER $CONTAINERPORT`.

Port publishing is only supported for containers utilizing their own network namespace
through `bridge` networks, or the `pasta` network mode.

For rootless bridge networks, port forwarding uses `rootlessport` by default, which
is a userspace proxy that does not preserve client source IPs. Setting
`rootless_port_forwarder="pasta"` in the `[network]` section of
**containers.conf(5)**
switches to pasta's kernel-level forwarding via `pesto`, preserving the original
client IP address inside the container. This option is experimental and its
behavior is subject to change.

**Note:** If a container runs within a pod, it is not necessary to publish the port for
the containers in the pod. The port must only be published by the pod itself. Pod network
stacks act like the network stack on the host - when there are a variety of containers in the pod,
and programs in the container, all sharing a single interface and IP address, and
associated ports. If one container binds to a port, no other container can use that port
within the pod while it is in use. Containers in the pod can also communicate over localhost
by having one container bind to localhost in the pod, and another connect to that port.

#### **--publish-all**, **-P**

Publish all exposed ports to random ports on the host interfaces. The default is **false**.

When set to **true**, publish all exposed ports to the host interfaces.
If the operator uses **-P** (or **-p**) then Podman makes the
exposed port accessible on the host and the ports are available to any
client that can reach the host.

When using this option, Podman binds any exposed port to a random port on the host
within an ephemeral port range defined by */proc/sys/net/ipv4/ip_local_port_range*.
To find the mapping between the host ports and the exposed ports, use **podman port**.

<< if is_quadlet >>
### `Pull=policy`
<< else >>
#### **--pull**=*policy*
<< endif >>

Pull image policy. The default is **missing**.

- **always**: Always pull the image and throw an error if the pull fails.
- **missing**: Pull the image only when the image is not in the local containers storage.  Throw an error if no image is found and the pull fails.
- **never**: Never pull the image but use the one from the local containers storage.  Throw an error if no image is found.
- **newer**: Pull if the image on the registry is newer than the one in the local containers storage.  An image is considered to be newer when the digests are different.  Comparing the time stamps is prone to errors.  Pull errors are suppressed if a local image was found.

#### **--quiet**, **-q**

Suppress output information when pulling images

#### **--rdt-class**=*intel-rdt-class-of-service*

Rdt-class sets the class of service (CLOS or COS) for the container to run in. Based on the Cache Allocation Technology (CAT) feature that is part of Intel's Resource Director Technology (RDT) feature set, all container processes will run within the pre-configured COS, representing a part of the cache. The COS has to be created and configured using a pseudo file system (usually mounted at `/sys/fs/resctrl`) that the resctrl kernel driver provides. Assigning the container to a COS requires root privileges and thus doesn't work in a rootless environment. Currently, the feature is only supported using `runc` as a runtime. See <https://docs.kernel.org/arch/x86/resctrl.html> for more details on creating a COS before a container can be assigned to it.

<< if is_quadlet >>
### `ReadOnly=`
<< else >>
#### **--read-only**
<< endif >>

Mount the container's root filesystem as read-only.

By default, container root filesystems are writable, allowing processes
to write files anywhere. By specifying the << '**ReadOnly=**' if is_quadlet else '**--read-only**' >> flag,
the container's root filesystem is mounted read-only prohibiting any writes.

<< if is_quadlet >>
### `ReadOnlyTmpfs=true|false`
<< else >>
#### **--read-only-tmpfs**
<< endif >>

When running --read-only containers, mount a read-write tmpfs on _/dev_, _/dev/shm_, _/run_, _/tmp_, and _/var/tmp_. The default is **true**.

| --read-only | --read-only-tmpfs |  /   | /run, /tmp, /var/tmp|
| ----------- | ----------------- | ---- | ----------------------------------- |
| true        |  true             | r/o  | r/w                                 |
| true        |  false            | r/o  | r/o                                 |
| false       |  false            | r/w  | r/w                                 |
| false       |  true             | r/w  | r/w                                 |

When << '**ReadOnly=true**' if is_quadlet else '**--read-only=true**' >> and
<< '**ReadOnlyTmpfs=true**' if is_quadlet else '**--read-only-tmpfs=true**' >> additional tmpfs are mounted on
the /tmp, /run, and /var/tmp directories.

When << '**ReadOnly=true**' if is_quadlet else '**--read-only=true**' >> and
<< '**ReadOnlyTmpfs=false**' if is_quadlet else '**--read-only-tmpfs=false**' >> /dev and /dev/shm are marked
Read/Only and no tmpfs are mounted on /tmp, /run and /var/tmp. The directories
are exposed from the underlying image, meaning they are read-only by default.
This makes the container totally read-only. No writable directories exist within
the container. In this mode writable directories need to be added via external
volumes or mounts.

By default, when << '**ReadOnly=false**' if is_quadlet else '**--read-only=false**' >> , the /dev and /dev/shm are read/write, and the /tmp, /run, and /var/tmp are read/write directories from the container image.

#### **--replace**

If another <<container|pod>> with the same name already exists, replace and remove it. The default is **false**.

#### **--requires**=*container*

Specify one or more requirements.
A requirement is a dependency container that is started before this container.
Containers can be specified by name or ID, with multiple containers being separated by commas.

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

#### **--rm**

Automatically remove the container and any anonymous unnamed volume associated with
the container when it exits. The default is **false**.

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

#### **--sdnotify**=**container** | *conmon* | *healthy* | *ignore*

Determines how to use the NOTIFY_SOCKET, as passed with systemd and Type=notify.

Default is **container**, which means allow the OCI runtime to proxy the socket into the
container to receive ready notification. Podman sets the MAINPID to conmon's pid.
The **conmon** option sets MAINPID to conmon's pid, and sends READY when the container
has started. The socket is never passed to the runtime or the container.
The **healthy** option sets MAINPID to conmon's pid, and sends READY when the container
has turned healthy; requires a healthcheck to be set. The socket is never passed to the runtime or the container.
The **ignore** option removes NOTIFY_SOCKET from the environment for itself and child processes,
for the case where some other process above Podman uses NOTIFY_SOCKET and Podman does not use it.

#### **--seccomp-policy**=*policy*

Specify the policy to select the seccomp profile. If set to *image*, Podman looks for a "io.containers.seccomp.profile" label in the container-image config and use its value as a seccomp profile. Otherwise, Podman follows the *default* policy by applying the default profile unless specified otherwise via *--security-opt seccomp* as described below.

Note that this feature is experimental and may change in the future.

<< if is_quadlet >>
