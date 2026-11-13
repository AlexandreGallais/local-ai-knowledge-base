---
title: "podman-pod-create.1 (part 2 of 6)"
tool: "podman"
version: "6.2"
source: "https://github.com/containers/podman/blob/055de046937d29450f310fce0fe3071485d8bed9/docs/source/markdown/podman-pod-create.1.md.in"
commit: "055de046937d29450f310fce0fe3071485d8bed9"
license: "Apache-2.0"
---

# podman-pod-create.1 (part 2 of 6)

## OPTIONS

<< if is_quadlet >>
### `AddHost=hostname[;hostname[;...]]:ip`
<< else >>
#### **--add-host**=*hostname[;hostname[;...]]*:*ip*
<< endif >>

Add a custom host-to-IP mapping to the <<container|pod>>'s `/etc/hosts` file.

The option takes one or multiple semicolon-separated hostnames to be mapped to
a single IPv4 or IPv6 address, separated by a colon. It can also be used to
overwrite the IP addresses of hostnames Podman adds to `/etc/hosts` by default
(also see the **--name** and **--hostname** options). This option can be
specified multiple times to add additional mappings to `/etc/hosts`. It
conflicts with the **--no-hosts** option and conflicts with *no_hosts=true* in
`containers.conf`.

Instead of an IP address, the special flag *host-gateway* can be given. This
resolves to an IP address the container can use to connect to the host. The
IP address chosen depends on your network setup, thus there's no guarantee that
Podman can determine the *host-gateway* address automatically, which will then
cause Podman to fail with an error message. You can overwrite this IP address
using the *host_containers_internal_ip* option in *containers.conf*.

The *host-gateway* address is also used by Podman to automatically add the
`host.containers.internal` and `host.docker.internal` hostnames to `/etc/hosts`.
You can prevent that by either giving the **--no-hosts** option, or by setting
*host_containers_internal_ip="none"* in *containers.conf*. If no *host-gateway*
address was configured manually and Podman fails to determine the IP address
automatically, Podman will silently skip adding these internal hostnames to
`/etc/hosts`. If Podman is running in a virtual machine using `podman machine`
(this includes Mac and Windows hosts), Podman will silently skip adding the
internal hostnames to `/etc/hosts`, unless an IP address was configured
manually; the internal hostnames are resolved by the gvproxy DNS resolver
instead.

Podman will use the `/etc/hosts` file of the host as a basis by default, i.e.
any hostname present in this file will also be present in the `/etc/hosts` file
of the container. A different base file can be configured using the
*base_hosts_file* config in `containers.conf`.

The /etc/hosts file is shared between all containers in the pod.

#### **--blkio-weight**=*weight*

Block IO relative weight. The _weight_ is a value between **10** and **1000**.

This option is not supported on cgroups V1 rootless systems.

#### **--blkio-weight-device**=*device:weight*

Block IO relative device weight.

#### **--cgroup-parent**=*path*

Path to cgroups under which the cgroup for the <<container|pod>> is created. If the
path is not absolute, the path is considered to be relative to the cgroups path
of the init process. Cgroups are created if they do not already exist.

#### **--cpu-shares**, **-c**=*shares*

CPU shares (relative weight).

By default, all containers get the same proportion of CPU cycles. This
proportion can be modified by changing the container's CPU share weighting
relative to the combined weight of all the running containers.
Default weight is **1024**.

The proportion only applies when CPU-intensive processes are running.
When tasks in one container are idle, other containers can use the
left-over CPU time. The actual amount of CPU time varies depending on
the number of containers running on the system.

For example, consider three containers, one has a cpu-share of 1024 and
two others have a cpu-share setting of 512. When processes in all three
containers attempt to use 100% of CPU, the first container receives
50% of the total CPU time. If a fourth container is added with a cpu-share
of 1024, the first container only gets 33% of the CPU. The remaining containers
receive 16.5%, 16.5% and 33% of the CPU.

On a multi-core system, the shares of CPU time are distributed over all CPU
cores. Even if a container is limited to less than 100% of CPU time, it can
use 100% of each individual CPU core.

For example, consider a system with more than three cores.
If the container _C0_ is started with **--cpu-shares=512** running one process,
and another container _C1_ with **--cpu-shares=1024** running two processes,
this can result in the following division of CPU shares:

| PID  |  container  | CPU     | CPU share    |
| ---- | ----------- | ------- | ------------ |
| 100  |  C0         | 0       | 100% of CPU0 |
| 101  |  C1         | 1       | 100% of CPU1 |
| 102  |  C1         | 2       | 100% of CPU2 |

On some systems, changing the resource limits may not be allowed for non-root
users. For more details, see
https://github.com/containers/podman/blob/main/troubleshooting.md#26-running-containers-with-resource-limits-fails-with-a-permissions-error

This option is not supported on cgroups V1 rootless systems.

#### **--cpus**=*amount*

Set the total number of CPUs delegated to the pod. Default is 0.000 which indicates that there is no limit on computation power.

#### **--cpuset-cpus**=*number*

CPUs in which to allow execution. Can be specified as a comma-separated list
(e.g. **0,1**), as a range (e.g. **0-3**), or any combination thereof
(e.g. **0-3,7,11-15**).

On some systems, changing the resource limits may not be allowed for non-root
users. For more details, see
https://github.com/containers/podman/blob/main/troubleshooting.md#26-running-containers-with-resource-limits-fails-with-a-permissions-error

This option is not supported on cgroups V1 rootless systems.

#### **--cpuset-mems**=*nodes*

Memory nodes (MEMs) in which to allow execution (0-3, 0,1). Only effective on
NUMA systems.

If there are four memory nodes on the system (0-3), use **--cpuset-mems=0,1**
then processes in the container only uses memory from the first
two memory nodes.

On some systems, changing the resource limits may not be allowed for non-root
users. For more details, see
https://github.com/containers/podman/blob/main/troubleshooting.md#26-running-containers-with-resource-limits-fails-with-a-permissions-error

This option is not supported on cgroups V1 rootless systems.

<< if is_quadlet >>
### `AddDevice=host-device:container-device`
<< else >>
#### **--device**=*host-device:container-device*
<< endif >>

Add a host device to the <<container|pod>>. The format of this is
`HOST-DEVICE:CONTAINER-DEVICE`, where `HOST-DEVICE` is the path of
the device node on the host, `CONTAINER-DEVICE` is the path of the device node in
the container, and `PERMISSIONS` is a list of permissions combining 'r' for read,
'w' for write, and 'm' for mknod(2).

Example: **--device=/dev/sdc:/dev/xvdc:rwm**.

Note: if *host-device* is a symbolic link then it is resolved first.
The <<container|pod>> only stores the major and minor numbers of the host device.

Podman may load kernel modules required for using the specified
device. The devices that Podman loads modules for when necessary are:
/dev/fuse.

In rootless mode, the new device is bind mounted in the container from the host
rather than Podman creating it within the container space. Because the bind
mount retains its SELinux label on SELinux systems, the container can get
permission denied when accessing the mounted device. Modify SELinux settings to
allow containers to use all device labels via the following command:

$ sudo setsebool -P  container_use_devices=true

Note: the pod implements devices by storing the initial configuration passed by the user and recreating the device on each container added to the pod.

#### **--device-read-bps**=*path:rate*

Limit read rate (in bytes per second) from a device (e.g. **--device-read-bps=/dev/sda:1mb**).

On some systems, changing the resource limits may not be allowed for non-root
users. For more details, see
https://github.com/containers/podman/blob/main/troubleshooting.md#26-running-containers-with-resource-limits-fails-with-a-permissions-error

This option is not supported on cgroups V1 rootless systems.

#### **--device-write-bps**=*path:rate*

Limit write rate (in bytes per second) to a device (e.g. **--device-write-bps=/dev/sda:1mb**).

On some systems, changing the resource limits may not be allowed for non-root
users. For more details, see
https://github.com/containers/podman/blob/main/troubleshooting.md#26-running-containers-with-resource-limits-fails-with-a-permissions-error

This option is not supported on cgroups V1 rootless systems.

#### **--dns**=*ipaddr*

Set custom DNS servers in the /etc/resolv.conf file that is shared between all containers in the pod. A special option, "none" is allowed which disables creation of /etc/resolv.conf for the pod.

#### **--dns-option**=*option*

Set custom DNS options in the /etc/resolv.conf file that is shared between all containers in the pod.

#### **--dns-search**=*domain*

Set custom DNS search domains in the /etc/resolv.conf file that is shared between all containers in the pod.

#### **--exit-policy**=**continue** | *stop*

Set the exit policy of the pod when the last container exits.  Supported policies are:

| Exit Policy        | Description                                                                                                                |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------- |
| *continue*         | The pod continues running, by keeping its infra container alive, when the last container exits. Used by default.           |
| *stop*             | The pod (including its infra container) is stopped when the last container exits. Used in `kube play` and quadlets.        |

#### **--gpus**=*ENTRY*

Start the container with GPU support. Where `ENTRY` can be `all` to request all GPUs, or a vendor-specific identifier. Currently, NVIDIA and AMD devices are supported. If both NVIDIA and AMD devices are present, the NVIDIA devices will be preferred, and a CDI device name must be specified using the `--device` flag to request a set of GPUs from a *specific* vendor.

#### **--help**, **-h**

Print usage statement.

#### **--hosts-file**=*path* | *none* | *image*

Base file to create the `/etc/hosts` file inside the container. This must either
be an absolute path to a file on the host system, or one of the following
special flags:
  ""      Follow the `base_hosts_file` configuration in _containers.conf_ (the default)
  `none`  Do not use a base file (i.e. start with an empty file)
  `image` Use the container image's `/etc/hosts` file as base file

#### **--infra**

Create an infra container and associate it with the pod. An infra container is a lightweight container used to coordinate the shared kernel namespace of a pod. Default: true.

#### **--infra-command**=*command*

The command that is run to start the infra container. Default: "/pause".

#### **--infra-conmon-pidfile**=*file*

Write the pid of the infra container's **conmon** process to a file. As **conmon** runs in a separate process than Podman, this is necessary when using systemd to manage Podman containers and pods.

#### **--infra-image**=*image*

The custom image that is used for the infra container.  Unless specified, Podman builds a custom local image which does not require pulling down an image.

#### **--infra-name**=*name*

The name that is used for the pod's infra container.

<< if is_quadlet >>
### `IP=IPv4`
<< else >>
#### **--ip**=*IPv4*
<< endif >>

Specify a static IPv4 address for the <<container|pod>>, for example **10.88.64.128**.
This option can only be used if the <<container|pod>> is joined to only a single network - i.e.,
<< '**Network=network-name**' if is_quadlet else '**--network=network-name**' >> is used at most once -
and if the <<container|pod>> is not joining another container's network namespace via
<< '**Network=container:_id_**' if is_quadlet else '**--network=container:_id_**' >>.
The address must be within the network's IP address pool (default **10.88.0.0/16**).

<< if is_quadlet >>
To specify multiple static IP addresses per <<container|pod>>, set multiple networks using
the **Network=** option with a static IP address specified for each using the `ip` mode for that option.
<< else >>
To specify multiple static IP addresses per <<container|pod>>, use the **--network** option with multiple comma-separated `ip` values:

```
--network mynet:ip=10.88.0.10,ip=10.88.0.11,ip=10.88.0.12
```

This assigns multiple static IPv4 addresses (**10.88.0.10**, **10.88.0.11**, **10.88.0.12**) to the same network interface.

**Multi-Subnet Networks:** When a network has multiple subnets, you can assign IPs from different subnets to the same <<container|pod>>. The IPs will be applied to a single network interface, with the first IP as primary and additional IPs as secondary addresses.

**IP Assignment Order:** For multi-subnet networks, IPs are grouped and ordered by their corresponding subnet, following the order in which subnets were defined during network creation (via `--subnet` flags). The order you specify IPs in the command does not affect the final assignment order. For example:

```
podman network create --subnet 10.89.0.0/24 --subnet 10.90.0.0/24 mynet
podman run --network mynet:ip=10.90.0.20,ip=10.89.0.10,ip=10.89.0.11 alpine
```

Results in IPs ordered by subnet: **10.89.0.10** (primary), **10.89.0.11** (secondary), **10.90.0.20** (secondary), since **10.89.0.0/24** was defined first.

**Dynamic Allocation:** If fewer IPs are specified than available subnets, the remaining subnets will receive dynamically allocated IPs. Dynamic IPs are assigned in subnet order after all static IPs are applied.

Example with multi-subnet network:

```
podman network create --subnet 10.89.0.0/24 --subnet 10.90.0.0/24 mynet
podman run --network mynet:ip=10.89.0.10,ip=10.90.0.20 alpine
```

This configures **eth0** with **10.89.0.10** (primary) and **10.90.0.20** (secondary).
<< endif >>

<< if is_quadlet >>
### `IP6=IPv6`
<< else >>
#### **--ip6**=*IPv6*
<< endif >>

Specify a static IPv6 address for the <<container|pod>>, for example **fd46:db93:aa76:ac37::10**.
This option can only be used if the <<container|pod>> is joined to only a single network - i.e.,
<< '**Network=network-name**' if is_quadlet else '**--network=network-name**' >> is used at most once -
and if the <<container|pod>> is not joining another container's network namespace via
<< '**Network=container:_id_**' if is_quadlet else '**--network=container:_id_**' >>.
The address must be within the network's IPv6 address pool.

To specify multiple static IPv6 addresses per <<container|pod>>, set multiple networks using the
<< '**Network=**' if is_quadlet else '**--network' >> option with a static IPv6 address
specified for each using the `ip6` mode for that option.

<< if is_quadlet >>
