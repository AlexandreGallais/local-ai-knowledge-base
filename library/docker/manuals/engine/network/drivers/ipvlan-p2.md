---
title: "IPvlan network driver (part 2 of 3)"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/engine/network/drivers/ipvlan.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# IPvlan network driver (part 2 of 3)

## Examples

### Prerequisites

- The examples on this page are all single host.
- All examples can be performed on a single host running Docker. Any
  example using a sub-interface like `eth0.10` can be replaced with `eth0` or
  any other valid parent interface on the Docker host. Sub-interfaces with a `.`
  are created on the fly. `-o parent` interfaces can also be left out of the
  `docker network create` all together and the driver will create a `dummy`
  interface that will enable local host connectivity to perform the examples.
- Kernel requirements:
  - IPvlan Linux kernel v4.2+ (support for earlier kernels exists but is buggy). To check your current kernel version, use `uname -r`

### IPvlan L2 mode example usage

An example of the IPvlan `L2` mode topology is shown in the following image.
The driver is specified with `-d driver_name` option. In this case `-d ipvlan`.

The parent interface in the next example `-o parent=eth0` is configured as follows:

```console
$ ip addr show eth0
3: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc pfifo_fast state UP group default qlen 1000
    inet 192.168.1.250/24 brd 192.168.1.255 scope global eth0
```

Use the network from the host's interface as the `--subnet` in the
`docker network create`. The container will be attached to the same network as
the host interface as set via the `-o parent=` option.

Create the IPvlan network and run a container attaching to it:

```console
# IPvlan  (-o ipvlan_mode= Defaults to L2 mode if not specified)
$ docker network create -d ipvlan \
    --subnet=192.168.1.0/24 \
    --gateway=192.168.1.1 \
    -o ipvlan_mode=l2 \
    -o parent=eth0 db_net

# Start a container on the db_net network
$ docker run --net=db_net -it --rm alpine /bin/sh

# NOTE: the containers can NOT ping the underlying host interfaces as
# they are intentionally filtered by Linux for additional isolation.
```

The default mode for IPvlan is `l2`. If `-o ipvlan_mode=` is left unspecified,
the default mode will be used. Similarly, if the `--gateway` is left empty, the
first usable address on the network will be set as the gateway. For example, if
the subnet provided in the network create is `--subnet=192.168.1.0/24` then the
gateway the container receives is `192.168.1.1`.

To help understand how this mode interacts with other hosts, the following
figure shows the same layer 2 segment between two Docker hosts that applies to
and IPvlan L2 mode.

The following will create the exact same network as the network `db_net` created
earlier, with the driver defaults for `--gateway=192.168.1.1` and `-o ipvlan_mode=l2`.

```console
# IPvlan  (-o ipvlan_mode= Defaults to L2 mode if not specified)
$ docker network create -d ipvlan \
    --subnet=192.168.1.0/24 \
    -o parent=eth0 db_net_ipv

# Start a container with an explicit name in daemon mode
$ docker run --net=db_net_ipv --name=ipv1 -itd alpine /bin/sh

# Start a second container and ping using the container name
# to see the docker included name resolution functionality
$ docker run --net=db_net_ipv --name=ipv2 -it --rm alpine /bin/sh
$ ping -c 4 ipv1

# NOTE: the containers can NOT ping the underlying host interfaces as
# they are intentionally filtered by Linux for additional isolation.
```

The drivers also support the `--internal` flag that will completely isolate
containers on a network from any communications external to that network. Since
network isolation is tightly coupled to the network's parent interface the result
of leaving the `-o parent=` option off of a `docker network create` is the exact
same as the `--internal` option. If the parent interface is not specified or the
`--internal` flag is used, a netlink type `dummy` parent interface is created
for the user and used as the parent interface effectively isolating the network
completely.

The following two `docker network create` examples result in identical networks
that you can attach container to:

```console
# Empty '-o parent=' creates an isolated network
$ docker network create -d ipvlan \
    --subnet=192.168.10.0/24 isolated1

# Explicit '--internal' flag is the same:
$ docker network create -d ipvlan \
    --subnet=192.168.11.0/24 --internal isolated2

# Even the '--subnet=' can be left empty and the default
# IPAM subnet of 172.18.0.0/16 will be assigned
$ docker network create -d ipvlan isolated3

$ docker run --net=isolated1 --name=cid1 -it --rm alpine /bin/sh
$ docker run --net=isolated2 --name=cid2 -it --rm alpine /bin/sh
$ docker run --net=isolated3 --name=cid3 -it --rm alpine /bin/sh

# To attach to any use `docker exec` and start a shell
$ docker exec -it cid1 /bin/sh
$ docker exec -it cid2 /bin/sh
$ docker exec -it cid3 /bin/sh
```

### IPvlan 802.1Q trunk L2 mode example usage

Architecturally, IPvlan L2 mode trunking is the same as Macvlan with regard to
gateways and L2 path isolation. There are nuances that can be advantageous for
CAM table pressure in ToR switches, one MAC per port and MAC exhaustion on a
host's parent NIC to name a few. The 802.1Q trunk scenario looks the same. Both
modes adhere to tagging standards and have seamless integration with the physical
network for underlay integration and hardware vendor plugin integrations.

Hosts on the same VLAN are typically on the same subnet and almost always are
grouped together based on their security policy. In most scenarios, a multi-tier
application is tiered into different subnets because the security profile of each
process requires some form of isolation. For example, hosting your credit card
processing on the same virtual network as the frontend webserver would be a
regulatory compliance issue, along with circumventing the long standing best
practice of layered defense in depth architectures. VLANs or the equivocal VNI
(Virtual Network Identifier) when using the Overlay driver, are the first step
in isolating tenant traffic.

The Linux sub-interface tagged with a VLAN can either already exist or will be
created when you call a `docker network create`. `docker network rm` will delete
the sub-interface. Parent interfaces such as `eth0` are not deleted, only
sub-interfaces with a netlink parent index > 0.

For the driver to add/delete the VLAN sub-interfaces the format needs to be
`interface_name.vlan_tag`. Other sub-interface naming can be used as the
specified parent, but the link will not be deleted automatically when
`docker network rm` is invoked.

The option to use either existing parent VLAN sub-interfaces or let Docker manage
them enables the user to either completely manage the Linux interfaces and
networking or let Docker create and delete the VLAN parent sub-interfaces
(netlink `ip link`) with no effort from the user.

For example: use `eth0.10` to denote a sub-interface of `eth0` tagged with the
VLAN id of `10`. The equivalent `ip link` command would be
`ip link add link eth0 name eth0.10 type vlan id 10`.

The example creates the VLAN tagged networks and then starts two containers to
test connectivity between containers. Different VLANs cannot ping one another
without a router routing between the two networks. The default namespace is not
reachable per IPvlan design in order to isolate container namespaces from the
underlying host.

#### VLAN ID 20

In the first network tagged and isolated by the Docker host, `eth0.20` is the
parent interface tagged with VLAN id `20` specified with `-o parent=eth0.20`.
Other naming formats can be used, but the links need to be added and deleted
manually using `ip link` or Linux configuration files. As long as the `-o parent`
exists, anything can be used if it is compliant with Linux netlink.

```console
# now add networks and hosts as you would normally by attaching to the master (sub)interface that is tagged
$ docker network create -d ipvlan \
    --subnet=192.168.20.0/24 \
    --gateway=192.168.20.1 \
    -o parent=eth0.20 ipvlan20

# in two separate terminals, start a Docker container and the containers can now ping one another.
$ docker run --net=ipvlan20 -it --name ivlan_test1 --rm alpine /bin/sh
$ docker run --net=ipvlan20 -it --name ivlan_test2 --rm alpine /bin/sh
```

#### VLAN ID 30

In the second network, tagged and isolated by the Docker host, `eth0.30` is the
parent interface tagged with VLAN id `30` specified with `-o parent=eth0.30`. The
`ipvlan_mode=` defaults to l2 mode `ipvlan_mode=l2`. It can also be explicitly
set with the same result as shown in the next example.

```console
# now add networks and hosts as you would normally by attaching to the master (sub)interface that is tagged.
$ docker network create -d ipvlan \
    --subnet=192.168.30.0/24 \
    --gateway=192.168.30.1 \
    -o parent=eth0.30 \
    -o ipvlan_mode=l2 ipvlan30

# in two separate terminals, start a Docker container and the containers can now ping one another.
$ docker run --net=ipvlan30 -it --name ivlan_test3 --rm alpine /bin/sh
$ docker run --net=ipvlan30 -it --name ivlan_test4 --rm alpine /bin/sh
```

The gateway is set inside of the container as the default gateway. That gateway
would typically be an external router on the network.

```console
$$ ip route
  default via 192.168.30.1 dev eth0
  192.168.30.0/24 dev eth0  src 192.168.30.2
```

Example: Multi-Subnet IPvlan L2 Mode starting two containers on the same subnet
and pinging one another. In order for the `192.168.114.0/24` to reach
`192.168.116.0/24` it requires an external router in L2 mode. L3 mode can route
between subnets that share a common `-o parent=`.

Secondary addresses on network routers are common as an address space becomes
exhausted to add another secondary to an L3 VLAN interface or commonly referred
to as a "switched virtual interface" (SVI).

```console
$ docker network create -d ipvlan \
    --subnet=192.168.114.0/24 --subnet=192.168.116.0/24 \
    --gateway=192.168.114.254 --gateway=192.168.116.254 \
    -o parent=eth0.114 \
    -o ipvlan_mode=l2 ipvlan114

$ docker run --net=ipvlan114 --ip=192.168.114.10 -it --rm alpine /bin/sh
$ docker run --net=ipvlan114 --ip=192.168.114.11 -it --rm alpine /bin/sh
```

A key <example-value> is, operators have the ability to map their physical network into
their virtual network for integrating containers into their environment with no
operational overhauls required. NetOps drops an 802.1Q trunk into the
Docker host. That virtual link would be the `-o parent=` passed in the network
creation. For untagged (non-VLAN) links, it is as simple as `-o parent=eth0` or
for 802.1Q trunks with VLAN IDs each network gets mapped to the corresponding
VLAN/Subnet from the network.

An example being, NetOps provides VLAN ID and the associated subnets for VLANs
being passed on the Ethernet link to the Docker host server. Those values are
plugged into the `docker network create` commands when provisioning the
Docker networks. These are persistent configurations that are applied every time
Docker Engine starts which alleviates having to manage often complex
configuration files. The network interfaces can also be managed manually by
being pre-created and Docker networking will never modify them, and use them
as parent interfaces. Example mappings from NetOps to Docker network commands
are as follows:

- VLAN: 10, Subnet: 172.16.80.0/24, Gateway: 172.16.80.1
  - `--subnet=172.16.80.0/24 --gateway=172.16.80.1 -o parent=eth0.10`
- VLAN: 20, IP subnet: 172.16.50.0/22, Gateway: 172.16.50.1
  - `--subnet=172.16.50.0/22 --gateway=172.16.50.1 -o parent=eth0.20`
- VLAN: 30, Subnet: 10.1.100.0/16, Gateway: 10.1.100.1
  - `--subnet=10.1.100.0/16 --gateway=10.1.100.1 -o parent=eth0.30`
