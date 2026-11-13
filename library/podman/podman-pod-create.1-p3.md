---
title: "podman-pod-create.1 (part 3 of 6)"
tool: "podman"
version: "6.2"
source: "https://github.com/containers/podman/blob/055de046937d29450f310fce0fe3071485d8bed9/docs/source/markdown/podman-pod-create.1.md.in"
commit: "055de046937d29450f310fce0fe3071485d8bed9"
license: "Apache-2.0"
---

# podman-pod-create.1 (part 3 of 6)

### `Label=key=value [key=value ...]`
<< else >>
#### **--label**, **-l**=*key=value*
<< endif >>

Add metadata to a <<container|pod>>.

#### **--label-file**=*file*

Read in a line-delimited file of labels.

#### **--mac-address**=*address*

<<Container|Pod>> network interface MAC address (e.g. 92:d0:c6:0a:29:33)
This option can only be used if the <<container|pod>> is joined to only a single network - i.e., **--network=_network-name_** is used at most once -
and if the <<container|pod>> is not joining another container's network namespace via **--network=container:_id_**.

Remember that the MAC address in an Ethernet network must be unique.
The IPv6 link-local address is based on the device's MAC address
according to RFC4862.

To specify multiple static MAC addresses per <<container|pod>>, set multiple networks using the **--network** option with a static MAC address specified for each using the `mac` mode for that option.

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

#### **--name**, **-n**=*name*

Assign a name to the pod.

<< if is_quadlet >>
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

Invalid if using **--dns**, **--dns-option**, or **--dns-search** with **--network** set to **none** or **container:**_id_.

<< if is_quadlet >>
### `NetworkAlias=alias`
<< else >>
#### **--network-alias**=*alias*
<< endif >>

Add a network-scoped alias for the <<container|pod>>, setting the alias for all networks that the container joins. To set a
name only for a specific network, use the alias option as described under the **--network** option.
If the network has DNS enabled (`podman network inspect -f {{.DNSEnabled}} <name>`),
these aliases can be used for name resolution on the given network. This option can be specified multiple times.

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

#### **--pod-id-file**=*path*

Write the pod ID to the file.

<< if is_quadlet >>
