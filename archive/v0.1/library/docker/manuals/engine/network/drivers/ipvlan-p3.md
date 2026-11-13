---
title: "IPvlan network driver (part 3 of 3)"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/engine/network/drivers/ipvlan.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# IPvlan network driver (part 3 of 3)

### IPvlan L3 mode example

IPvlan will require routes to be distributed to each endpoint. The driver only
builds the IPvlan L3 mode port and attaches the container to the interface. Route
distribution throughout a cluster is beyond the initial implementation of this
single host scoped driver. In L3 mode, the Docker host is very similar to a
router starting new networks in the container. They are on networks that the
upstream network will not know about without route distribution. For those
curious how IPvlan L3 will fit into container networking, see the following
examples.

IPvlan L3 mode drops all broadcast and multicast traffic. This reason alone
makes IPvlan L3 mode a prime candidate for those looking for massive scale and
predictable network integrations. It is predictable and in turn will lead to
greater uptimes because there is no bridging involved. Bridging loops have been
responsible for high profile outages that can be hard to pinpoint depending on
the size of the failure domain. This is due to the cascading nature of BPDUs
(Bridge Port Data Units) that are flooded throughout a broadcast domain (VLAN)
to find and block topology loops. Eliminating bridging domains, or at the least,
keeping them isolated to a pair of ToRs (top of rack switches) will reduce hard
to troubleshoot bridging instabilities. IPvlan L2 modes is well suited for
isolated VLANs only trunked into a pair of ToRs that can provide a loop-free
non-blocking fabric. The next step further is to route at the edge via IPvlan L3
mode that reduces a failure domain to a local host only.

- L3 mode needs to be on a separate subnet as the default namespace since it
  requires a netlink route in the default namespace pointing to the IPvlan parent
  interface.
- The parent interface used in this example is `eth0` and it is on the subnet
  `192.168.1.0/24`. Notice the `docker network` is not on the same subnet
  as `eth0`.
- Unlike IPvlan l2 modes, different subnets/networks can ping one another as
  long as they share the same parent interface `-o parent=`.

```console
$$ ip a show eth0
3: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc pfifo_fast state UP group default qlen 1000
    link/ether 00:50:56:39:45:2e brd ff:ff:ff:ff:ff:ff
    inet 192.168.1.250/24 brd 192.168.1.255 scope global eth0
```

- A traditional gateway doesn't mean much to an L3 mode IPvlan interface since
  there is no broadcast traffic allowed. Because of that, the container default
  gateway points to the containers `eth0` device. See below for CLI output
  of `ip route` or `ip -6 route` from inside an L3 container for details.

The mode `-o ipvlan_mode=l3` must be explicitly specified since the default
IPvlan mode is `l2`.

The following example does not specify a parent interface. The network drivers
will create a dummy type link for the user rather than rejecting the network
creation and isolating containers from only communicating with one another.

```console
# Create the IPvlan L3 network
$ docker network create -d ipvlan \
    --subnet=192.168.214.0/24 \
    --subnet=10.1.214.0/24 \
    -o ipvlan_mode=l3 ipnet210

# Test 192.168.214.0/24 connectivity
$ docker run --net=ipnet210 --ip=192.168.214.10 -itd alpine /bin/sh
$ docker run --net=ipnet210 --ip=10.1.214.10 -itd alpine /bin/sh

# Test L3 connectivity from 10.1.214.0/24 to 192.168.214.0/24
$ docker run --net=ipnet210 --ip=192.168.214.9 -it --rm alpine ping -c 2 10.1.214.10

# Test L3 connectivity from 192.168.214.0/24 to 10.1.214.0/24
$ docker run --net=ipnet210 --ip=10.1.214.9 -it --rm alpine ping -c 2 192.168.214.10

```

> **Note:**
>
> Notice that there is no `--gateway=` option in the network create. The field
> is ignored if one is specified `l3` mode. Take a look at the container routing
> table from inside of the container:
>
> ```console
> # Inside an L3 mode container
> $$ ip route
>  default dev eth0
>   192.168.214.0/24 dev eth0  src 192.168.214.10
> ```

In order to ping the containers from a remote Docker host or the container be
able to ping a remote host, the remote host or the physical network in between
need to have a route pointing to the host IP address of the container's Docker
host eth interface.

### Dual stack IPv4 IPv6 IPvlan L2 mode

- Not only does Libnetwork give you complete control over IPv4 addressing, but
  it also gives you total control over IPv6 addressing as well as feature parity
  between the two address families.

- The next example will start with IPv6 only. Start two containers on the same
  VLAN `139` and ping one another. Since the IPv4 subnet is not specified, the
  default IPAM will provision a default IPv4 subnet. That subnet is isolated
  unless the upstream network is explicitly routing it on VLAN `139`.

```console
# Create a v6 network
$ docker network create -d ipvlan \
    --ipv6 --subnet=2001:db8:abc2::/64 --gateway=2001:db8:abc2::22 \
    -o parent=eth0.139 v6ipvlan139

# Start a container on the network
$ docker run --net=v6ipvlan139 -it --rm alpine /bin/sh
```

View the container eth0 interface and v6 routing table:

```console
# Inside the IPv6 container
$$ ip a show eth0
75: eth0@if55: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue state UNKNOWN group default
    link/ether 00:50:56:2b:29:40 brd ff:ff:ff:ff:ff:ff
    inet 172.18.0.2/16 scope global eth0
       valid_lft forever preferred_lft forever
    inet6 2001:db8:abc4::250:56ff:fe2b:2940/64 scope link
       valid_lft forever preferred_lft forever
    inet6 2001:db8:abc2::1/64 scope link nodad
       valid_lft forever preferred_lft forever

$$ ip -6 route
2001:db8:abc4::/64 dev eth0  proto kernel  metric 256
2001:db8:abc2::/64 dev eth0  proto kernel  metric 256
default via 2001:db8:abc2::22 dev eth0  metric 1024
```

Start a second container and ping the first container's v6 address.

```console
# Test L2 connectivity over IPv6
$ docker run --net=v6ipvlan139 -it --rm alpine /bin/sh

# Inside the second IPv6 container
$$ ip a show eth0
75: eth0@if55: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue state UNKNOWN group default
    link/ether 00:50:56:2b:29:40 brd ff:ff:ff:ff:ff:ff
    inet 172.18.0.3/16 scope global eth0
       valid_lft forever preferred_lft forever
    inet6 2001:db8:abc4::250:56ff:fe2b:2940/64 scope link tentative dadfailed
       valid_lft forever preferred_lft forever
    inet6 2001:db8:abc2::2/64 scope link nodad
       valid_lft forever preferred_lft forever

$$ ping6 2001:db8:abc2::1
PING 2001:db8:abc2::1 (2001:db8:abc2::1): 56 data bytes
64 bytes from 2001:db8:abc2::1%eth0: icmp_seq=0 ttl=64 time=0.044 ms
64 bytes from 2001:db8:abc2::1%eth0: icmp_seq=1 ttl=64 time=0.058 ms

2 packets transmitted, 2 packets received, 0% packet loss
round-trip min/avg/max/stddev = 0.044/0.051/0.058/0.000 ms
```

The next example with setup a dual stack IPv4/IPv6 network with an example
VLAN ID of `140`.

Next create a network with two IPv4 subnets and one IPv6 subnets, all of which
have explicit gateways:

```console
$ docker network create -d ipvlan \
    --subnet=192.168.140.0/24 --subnet=192.168.142.0/24 \
    --gateway=192.168.140.1 --gateway=192.168.142.1 \
    --subnet=2001:db8:abc9::/64 --gateway=2001:db8:abc9::22 \
    -o parent=eth0.140 \
    -o ipvlan_mode=l2 ipvlan140
```

Start a container and view eth0 and both v4 & v6 routing tables:

```console
$ docker run --net=ipvlan140 --ip6=2001:db8:abc2::51 -it --rm alpine /bin/sh

$ ip a show eth0
78: eth0@if77: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue state UNKNOWN group default
    link/ether 00:50:56:2b:29:40 brd ff:ff:ff:ff:ff:ff
    inet 192.168.140.2/24 scope global eth0
       valid_lft forever preferred_lft forever
    inet6 2001:db8:abc4::250:56ff:fe2b:2940/64 scope link
       valid_lft forever preferred_lft forever
    inet6 2001:db8:abc9::1/64 scope link nodad
       valid_lft forever preferred_lft forever

$$ ip route
default via 192.168.140.1 dev eth0
192.168.140.0/24 dev eth0  proto kernel  scope link  src 192.168.140.2

$$ ip -6 route
2001:db8:abc4::/64 dev eth0  proto kernel  metric 256
2001:db8:abc9::/64 dev eth0  proto kernel  metric 256
default via 2001:db8:abc9::22 dev eth0  metric 1024
```

Start a second container with a specific `--ip4` address and ping the first host
using IPv4 packets:

```console
$ docker run --net=ipvlan140 --ip=192.168.140.10 -it --rm alpine /bin/sh
```

> **Note:**
>
> Different subnets on the same parent interface in IPvlan `L2` mode cannot ping
> one another. That requires a router to proxy-arp the requests with a secondary
> subnet. However, IPvlan `L3` will route the unicast traffic between disparate
> subnets as long as they share the same `-o parent` parent link.

### Use router-assigned IPv6 addresses

The previous examples assign IPv6 addresses from a subnet managed by Docker's
IPAM. On an `ipvlan` network, you can instead let containers receive IPv6
addresses directly from a router on the parent network, using stateless
address autoconfiguration (SLAAC).

When an `ipvlan` network has no IPv6 subnet, Docker disables IPv6 on the
container's interface, so it can't accept the router advertisements that SLAAC
relies on. To re-enable IPv6 on the interface, set its `disable_ipv6` sysctl
to `0` when you connect the container to the network:

```console
$ docker network connect \
    --driver-opt="com.docker.network.endpoint.sysctls=net.ipv6.conf.IFNAME.disable_ipv6=0" \
    my-ipvlan-net my-container
```

Use the literal string `IFNAME` in the sysctl name. Docker replaces it with
the name of the container's interface on this network. `disable_ipv6` is a
per-interface sysctl, so it must be set with the `endpoint.sysctls`
driver option rather than `docker run --sysctl`. For more details, see
`docker network connect`.

### Dual stack IPv4 IPv6 IPvlan L3 mode

Example: IPvlan L3 Mode Dual Stack IPv4/IPv6, Multi-Subnet w/ 802.1Q VLAN Tag:118

As in all of the examples, a tagged VLAN interface does not have to be used. The
sub-interfaces can be swapped with `eth0`, `eth1`, `bond0` or any other valid
interface on the host other then the `lo` loopback.

The primary difference you will see is that L3 mode does not create a default
route with a next-hop but rather sets a default route pointing to `dev eth` only
since ARP/Broadcasts/Multicast are all filtered by Linux as per the design. Since
the parent interface is essentially acting as a router, the parent interface IP
and subnet needs to be different from the container networks. That is the opposite
of bridge and L2 modes, which need to be on the same subnet (broadcast domain)
in order to forward broadcast and multicast packets.

```console
# Create an IPv6+IPv4 Dual Stack IPvlan L3 network
# Gateways for both v4 and v6 are set to a dev e.g. 'default dev eth0'
$ docker network create -d ipvlan \
    --subnet=192.168.110.0/24 \
    --subnet=192.168.112.0/24 \
    --ipv6 --subnet=2001:db8:abc6::/64 \
    -o parent=eth0 \
    -o ipvlan_mode=l3 ipnet110

# Start a few of containers on the network (ipnet110)
# in separate terminals and check connectivity
$ docker run --net=ipnet110 -it --rm alpine /bin/sh
# Start a second container specifying the v6 address
$ docker run --net=ipnet110 --ip6=2001:db8:abc6::10 -it --rm alpine /bin/sh
# Start a third specifying the IPv4 address
$ docker run --net=ipnet110 --ip=192.168.112.30 -it --rm alpine /bin/sh
# Start a 4th specifying both the IPv4 and IPv6 addresses
$ docker run --net=ipnet110 --ip6=2001:db8:abc6::50 --ip=192.168.112.50 -it --rm alpine /bin/sh
```

Interface and routing table outputs are as follows:

```console
$$ ip a show eth0
63: eth0@if59: <BROADCAST,MULTICAST,NOARP,UP,LOWER_UP> mtu 1500 qdisc noqueue state UNKNOWN group default
    link/ether 00:50:56:2b:29:40 brd ff:ff:ff:ff:ff:ff
    inet 192.168.112.2/24 scope global eth0
       valid_lft forever preferred_lft forever
    inet6 2001:db8:abc4::250:56ff:fe2b:2940/64 scope link
       valid_lft forever preferred_lft forever
    inet6 2001:db8:abc6::10/64 scope link nodad
       valid_lft forever preferred_lft forever

# Note the default route is the eth device because ARPs are filtered.
$$ ip route
  default dev eth0  scope link
  192.168.112.0/24 dev eth0  proto kernel  scope link  src 192.168.112.2

$$ ip -6 route
2001:db8:abc4::/64 dev eth0  proto kernel  metric 256
2001:db8:abc6::/64 dev eth0  proto kernel  metric 256
default dev eth0  metric 1024
```

> **Note:**
>
> There may be a bug when specifying `--ip6=` addresses when you delete a
> container with a specified v6 address and then start a new container with the
> same v6 address it throws the following like the address isn't properly being
> released to the v6 pool. It will fail to unmount the container and be left dead.

```console
docker: Error response from daemon: Address already in use.
```

### Manually create 802.1Q links

#### VLAN ID 40

If a user does not want the driver to create the VLAN sub-interface, it needs to
exist before running `docker network create`. If you have sub-interface
naming that is not `interface.vlan_id` it is honored in the `-o parent=` option
again as long as the interface exists and is up.

Links, when manually created, can be named anything as long as they exist when
the network is created. Manually created links do not get deleted regardless of
the name when the network is deleted with `docker network rm`.

```console
# create a new sub-interface tied to dot1q vlan 40
$ ip link add link eth0 name eth0.40 type vlan id 40

# enable the new sub-interface
$ ip link set eth0.40 up

# now add networks and hosts as you would normally by attaching to the master (sub)interface that is tagged
$ docker network create -d ipvlan \
    --subnet=192.168.40.0/24 \
    --gateway=192.168.40.1 \
    -o parent=eth0.40 ipvlan40

# in two separate terminals, start a Docker container and the containers can now ping one another.
$ docker run --net=ipvlan40 -it --name ivlan_test5 --rm alpine /bin/sh
$ docker run --net=ipvlan40 -it --name ivlan_test6 --rm alpine /bin/sh
```

Example: VLAN sub-interface manually created with any name:

```console
# create a new sub interface tied to dot1q vlan 40
$ ip link add link eth0 name foo type vlan id 40

# enable the new sub-interface
$ ip link set foo up

# now add networks and hosts as you would normally by attaching to the master (sub)interface that is tagged
$ docker network create -d ipvlan \
    --subnet=192.168.40.0/24 --gateway=192.168.40.1 \
    -o parent=foo ipvlan40

# in two separate terminals, start a Docker container and the containers can now ping one another.
$ docker run --net=ipvlan40 -it --name ivlan_test5 --rm alpine /bin/sh
$ docker run --net=ipvlan40 -it --name ivlan_test6 --rm alpine /bin/sh
```

Manually created links can be cleaned up with:

```console
$ ip link del foo
```

As with all of the Libnetwork drivers, they can be mixed and matched, even as
far as running 3rd party ecosystem drivers in parallel for maximum flexibility
to the Docker user.
