---
title: "podman-pod-create.1 (part 4 of 6)"
tool: "podman"
version: "6.2"
source: "https://github.com/containers/podman/blob/055de046937d29450f310fce0fe3071485d8bed9/docs/source/markdown/podman-pod-create.1.md.in"
commit: "055de046937d29450f310fce0fe3071485d8bed9"
license: "Apache-2.0"
---

# podman-pod-create.1 (part 4 of 6)

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

**Note:** You must not publish ports of containers in the pod individually,
but only by the pod itself.

**Note:** This cannot be modified once the pod is created.

#### **--replace**

If another <<container|pod>> with the same name already exists, replace and remove it. The default is **false**.

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

Default restart policy for all the containers in a pod.

#### **--security-opt**=*option*

Security Options

- **apparmor=unconfined** : Turn off apparmor confinement for the <<container|pod>>
- **apparmor**=_alternate-profile_ : Set the apparmor confinement profile for the <<container|pod>>

- **label=user:**_USER_: Set the label user for the <<container|pod>> processes
- **label=role:**_ROLE_: Set the label role for the <<container|pod>> processes
- **label=type:**_TYPE_: Set the label process type for the <<container|pod>> processes
- **label=level:**_LEVEL_: Set the label level for the <<container|pod>> processes
- **label=filetype:**_TYPE_: Set the label file type for the <<container|pod>> files
- **label=disable**: Turn off label separation for the <<container|pod>>

Note: Labeling can be disabled for all <<|pods/>>containers by setting label=false in the **containers.conf** (`/etc/containers/containers.conf` or `$HOME/.config/containers/containers.conf`) file.

- **label=nested**: Allows SELinux modifications within the container. Containers are allowed to modify SELinux labels on files and processes, as long as SELinux policy allows. Without **nested**, containers view SELinux as disabled, even when it is enabled on the host. Containers are prevented from setting any labels.

- **mask**=_/path/1:/path/2_: The paths to mask separated by a colon. A masked path cannot be accessed inside the container<>.

- **no-new-privileges**: Disable container processes from gaining additional privileges through the `execve(2)` system call (e.g. via setuid or setgid bits, or via file capabilities). Programs that rely on setuid/setgid bits set on their executable to change user id or group id are no longer able to do so, and any file capabilities added to the executable (e.g. via `setcap`) are not added to the permitted capability set. For more details, see: https://docs.kernel.org/userspace-api/no_new_privs.html.

- **seccomp=unconfined**: Turn off seccomp confinement for the <<container|pod>>.
- **seccomp=profile.json**: JSON file to be used as a seccomp filter. Note that the `io.podman.annotations.seccomp` annotation is set with the specified value as shown in `podman inspect`.

- **proc-opts**=_OPTIONS_ : Comma-separated list of options to use for the /proc mount. More details
  for the possible mount options are specified in the **proc(5)** man page.

- **unmask**=_ALL_ or _/path/1:/path/2_, or shell expanded paths (/proc/*): Paths to unmask separated by a colon. If set to **ALL**, it unmasks all the paths that are masked or made read-only by default.
  The default masked paths are **/proc/acpi, /proc/kcore, /proc/keys, /proc/latency_stats, /proc/sched_debug, /proc/scsi, /proc/timer_list, /proc/timer_stats, /sys/firmware, and /sys/fs/selinux**, **/sys/devices/virtual/powercap**.  The default paths that are read-only are **/proc/asound**, **/proc/bus**, **/proc/fs**, **/proc/irq**, **/proc/sys**, **/proc/sysrq-trigger**, **/sys/fs/cgroup**.

Note: Labeling can be disabled for all containers by setting **label=false** in the **containers.conf**(5) file.

#### **--share**=*namespace*

A comma-separated list of kernel namespaces to share. If none or "" is specified, no namespaces are shared, and the infra container is not created unless explicitly specified via **--infra=true**. The namespaces to choose from are cgroup, ipc, net, pid, uts. If the option is prefixed with a "+", the namespace is appended to the default list. Otherwise, it replaces the default list. Defaults match Kubernetes default (ipc, net, uts)

#### **--share-parent**

This boolean determines whether or not all containers entering the pod use the pod as their cgroup parent. The default value of this option is true. Use the **--share** option to share the cgroup namespace rather than a cgroup parent in a pod.

Note: This option conflicts with the **--share=cgroup** option since that option sets the pod as the cgroup parent but enters the container into the same cgroupNS as the infra container.

<< if is_quadlet >>
### `ShmSize=number[unit]`
<< else >>
#### **--shm-size**=*number[unit]*
<< endif >>

Size of _/dev/shm_. A _unit_ can be **b** (bytes), **k** (kibibytes), **m** (mebibytes), or **g** (gibibytes).
If the unit is omitted, the system uses bytes. If the size is omitted, the default is **64m**.
When _size_ is **0**, there is no limit on the amount of memory used for IPC by the <<container|pod>>.
This option conflicts with **--ipc=host**.

#### **--shm-size-systemd**=*number[unit]*

Size of systemd-specific tmpfs mounts such as /run, /run/lock, /var/log/journal and /tmp.
A _unit_ can be **b** (bytes), **k** (kibibytes), **m** (mebibytes), or **g** (gibibytes).
If the unit is omitted, the system uses bytes. If the size is omitted, the default is **64m**.
When _size_ is **0**, the usage is limited to 50% of the host's available memory.

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

#### **--uts**=*how*

Sets the configuration for UTS namespaces when handling `RUN` instructions.
The configured value can be "" (the empty string) or "container" to indicate that a new UTS namespace to be created, or it can be "host" to indicate that the UTS namespace in which `podman` itself is being run is reused, or it can be the path to a UTS namespace which is already in use by another process.

<< if is_quadlet >>
