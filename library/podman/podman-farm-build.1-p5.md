---
title: "populate a cache and also consult it (part 5 of 8)"
tool: "podman"
version: "6.2"
source: "https://github.com/containers/podman/blob/055de046937d29450f310fce0fe3071485d8bed9/docs/source/markdown/podman-farm-build.1.md.in"
commit: "055de046937d29450f310fce0fe3071485d8bed9"
license: "Apache-2.0"
---

# populate a cache and also consult it (part 5 of 8)

### `Network=mode`
<< else >>
#### **--network**=*mode*, **--net**
<< endif >>

Set the network mode for the <<container|pod>>.

<< if is_quadlet >>
Special cases:

* If the `name` of the network ends with `.network`, a Podman network called
`systemd-$name` is used, and the generated systemd service contains
a dependency on the `$name-network.service`. Such a network can be automatically
created by using a `$name.network` Quadlet file. Note: the corresponding `.network` file must exist.

* If the `name` ends with `.container`,
the container will reuse the network stack of another container created by `$name.container`.
The generated systemd service contains a dependency on `$name.service`. Note: the corresponding `.container` file must exist.
<< endif >>

Valid _mode_ values are:

- **bridge[:OPTIONS,...]**: Create a network stack on the default bridge. This is the default for rootful containers. It is possible to specify these additional options:
    - **alias=**_name_: Add network-scoped alias for the container.
    - **ip=**_IPv4_: Specify a static IPv4 address for this container.
    - **ip6=**_IPv6_: Specify a static IPv6 address for this container.
    - **mac=**_MAC_: Specify a static MAC address for this container.
    - **interface_name=**_name_: Specify a name for the created network interface inside the container.
    - **host_interface_name=**_name_: Specify a name for the created network interface outside the container.

    Any other options will be passed through to netavark without validation. This can be useful to pass arguments to netavark plugins.

    For rootless bridge networks, port forwarding uses `rootlessport` by default. Setting `rootless_port_forwarder="pasta"` in the `[network]` section of **containers.conf(5)** switches to pasta's kernel-level forwarding (via `pesto`), which preserves the original client source IP address inside the container. This option is experimental and its behavior is subject to change.

    For example, to set a static IPv4 address and a static mac address, use `--network bridge:ip=10.88.0.10,mac=44:33:22:11:00:99`.

- _\<network name or ID\>_**[:OPTIONS,...]**: Connect to a user-defined network; this is the network name or ID from a network created by **podman network create**. It is possible to specify the same options described under the bridge mode above. Use the **--network** option multiple times to specify additional networks. \
  For backwards compatibility it is also possible to specify comma-separated networks on the first **--network** argument, however this prevents you from using the options described under the bridge section above.

- **none**: Create a network namespace for the container but do not configure network interfaces for it, thus the container has no network connectivity.

- **container:**_id_: Reuse another container's network stack.

- **host**: Use the host's network namespace for the container instead of creating an isolated namespace. Warning: This gives the container full access to abstract Unix domain sockets and to TCP/UDP sockets bound to localhost. Since these mechanisms are often used to prevent access to sensitive system services, isolating them from access by external entities, use of this option may be considered a security vulnerability.

- **ns:**_path_: Path to a network namespace to join.

- **private**: Create a new namespace for the container. This uses the **bridge** mode for rootful containers and **pasta** for rootless ones.

- **pasta[:OPTIONS,...]**: use **pasta**(1) to create a user-mode networking
    stack. \
    This is the default for rootless containers and only supported in rootless mode. \
    By default, IPv4 and IPv6 addresses and routes, as well as the pod interface
    name, are copied from the host. Port forwarding preserves the original
    source IP address. Options described in pasta(1) can be specified as
    comma-separated arguments. \
    In terms of pasta(1) options, **--config-net** is given by default, in
    order to configure networking when the container is started, and
    **--no-map-gw** is also assumed by default, to avoid direct access from
    container to host using the gateway address. The latter can be overridden
    by passing **--map-gw** in the pasta-specific options (despite not being an
    actual pasta(1) option). \
    For better integration with DNS handling, **--dns-forward 169.254.1.1** is passed by default,
    and this address is added to resolv.conf(5) as first resolver. It is possible to pass
    **--dns-forward** explicitly in case a different IP address should be used. \
    To make the `host.containers.internal` /etc/hosts entry work and allow connections
    to the host, **--map-guest-addr 169.254.1.2** is passed by default. Again, it can be set
    explicitly to choose a different IP address. \
    Also, **-t none** and **-u none** are passed if, respectively, no TCP or
    UDP port forwarding from host to container is configured (via Podman's
    **--publish** or by passing the pasta **-t**/**-u** options directly),
    to disable automatic port forwarding based on bound ports. Similarly, **-T none**
    and **-U none** are given to disable the same functionality from container to
    host. \
    All options can also be set in **containers.conf(5)**;
    see the `pasta_options` key under the network section in that file. \
    Some examples:
    - **pasta:--map-gw**: Allow the container to directly reach the host using the
        gateway address.
    - **pasta:--mtu,1500**: Specify a 1500 bytes MTU for the _tap_ interface in
        the container.
    - **pasta:--ipv4-only,-a,10.0.2.0,-n,24,-g,10.0.2.2,--dns-forward,10.0.2.3,-m,1500,--no-ndp,--no-dhcpv6,--no-dhcp**:
        disable IPv6, assign `10.0.2.0/24` to the `tap0` interface in the container,
        with gateway `10.0.2.3`, enable DNS forwarder reachable at `10.0.2.3`,
        set MTU to 1500 bytes, disable NDP, DHCPv6 and DHCP support.
    - **pasta:-I,tap0,--ipv4-only,-a,10.0.2.0,-n,24,-g,10.0.2.2,--dns-forward,10.0.2.3,--no-ndp,--no-dhcpv6,--no-dhcp**:
        same as above, but leave the MTU to 65520 bytes
    - **pasta:-t,auto,-u,auto,-T,auto,-U,auto**: enable automatic port forwarding
        based on observed bound ports from both host and container sides
    - **pasta:-T,5201**: enable forwarding of TCP port 5201 from container to
        host, using the loopback interface instead of the tap interface for improved
        performance

#### **--no-cache**

Do not use existing cached images for the container build. Build from the start with a new set of cached layers.

#### **--no-hostname**

Do not create the _/etc/hostname_ file in the containers.

By default, Podman manages the _/etc/hostname_ file, adding the container's own hostname.  When the **--no-hostname** option is set, the image's _/etc/hostname_ will be preserved unmodified if it exists.

#### **--no-hosts**

Do not modify the `/etc/hosts` file in the <<container|pod>>.

Podman assumes control over the <<container|pod>>'s `/etc/hosts` file by
default and adds entries for the container's name (see **--name** option) and
hostname (see **--hostname** option), the internal `host.containers.internal`
and `host.docker.internal` hosts, as well as any hostname added using the
**--add-host** option. Refer to the **--add-host** option for details. Passing
**--no-hosts** disables this, so that the image's `/etc/hosts` file is kept
unmodified. The same can be achieved globally by setting *no_hosts=true* in
`containers.conf`.

This option conflicts with **--add-host**.

#### **--omit-history**

Omit build history information in the built image. (default false).

This option is useful for the cases where end users explicitly
want to set `--omit-history` to omit the optional `History` from
built images or when working with images built using build tools that
do not include `History` information in their images.

#### **--os-feature**=*feature*

Set the name of a required operating system *feature* for the image which is built.  By default, if the image is not based on *scratch*, the base image's required OS feature list is kept, if the base image specified any.  This option is typically only meaningful when the image's OS is Windows.

If *feature* has a trailing `-`, then the *feature* is removed from the set of required features which is listed in the image.

#### **--os-version**=*version*

Specify the OS version which the list or index records as a requirement for the
image.  This option is rarely used.

#### **--platforms**=*p1,p2,p3...*

Build only on farm nodes that match the given platforms.

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

Suppress informational output messages (which indicate which instruction is being processed, and the progress of the instruction).  Print only the final error message or successful completion information, such as the image or container ID.

<< if is_quadlet >>
### `Retry=attempts`
<< else >>
#### **--retry**=*attempts*
<< endif >>

Number of times to retry pulling or pushing images between the registry and
local storage in case of failure. Default is **3**.

<< if is_quadlet >>
