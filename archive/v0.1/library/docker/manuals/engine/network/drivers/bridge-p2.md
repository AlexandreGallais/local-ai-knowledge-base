---
title: "Bridge network driver (part 2 of 2)"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/engine/network/drivers/bridge.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Bridge network driver (part 2 of 2)

## Use the default bridge network

The default `bridge` network is considered a legacy detail of Docker and is not
recommended for production use. Configuring it is a manual operation, and it has
technical shortcomings.

### Connect a container to the default bridge network

If you do not specify a network using the `--network` flag, and you do specify a
network driver, your container is connected to the default `bridge` network by
default. Containers connected to the default `bridge` network can communicate,
but only by IP address, unless they're linked using the
legacy `--link` flag.

### Configure the default bridge network

To configure the default `bridge` network, you specify options in `daemon.json`.
Here is an example `daemon.json` with several options specified. Only specify
the settings you need to customize.

```json
{
  "bip": "192.168.1.1/24",
  "fixed-cidr": "192.168.1.0/25",
  "mtu": 1500,
  "default-gateway": "192.168.1.254",
  "dns": ["10.20.1.2", "10.20.1.3"]
}
```

In this example:

- The bridge's address is "192.168.1.1/24" (from `bip`).
- The bridge network's subnet is "192.168.1.0/24" (from `bip`).
- Container addresses will be allocated from "192.168.1.0/25" (from `fixed-cidr`).

### Use IPv6 with the default bridge network

IPv6 can be enabled for the default bridge using the following options in
`daemon.json`, or their command line equivalents.

These three options only affect the default bridge, they are not used by
user-defined networks. The addresses in below are examples from the
IPv6 documentation range.

- Option `ipv6` is required.
- Option `bip6` is optional, it specifies the address of the default bridge, which
  will be used as the default gateway by containers. It also specifies the subnet
  for the bridge network.
- Option `fixed-cidr-v6` is optional, it specifies the address range Docker may
  automatically allocate to containers.
  - The prefix should normally be `/64` or shorter.
  - For experimentation on a local network, it is better to use a Unique Local
    Address (ULA) prefix (matching `fd00::/8`) than a Link Local prefix (matching
    `fe80::/10`).
- Option `default-gateway-v6` is optional. If unspecified, the default is the first
  address in the `fixed-cidr-v6` subnet.

```json
{
  "ipv6": true,
  "bip6": "2001:db8::1111/64",
  "fixed-cidr-v6": "2001:db8::/64",
  "default-gateway-v6": "2001:db8:abcd::89"
}
```

If no `bip6` is specified, `fixed-cidr-v6` defines the subnet for the bridge
network. If no `bip6` or `fixed-cidr-v6` is specified, a ULA prefix will be
chosen.

Restart Docker for changes to take effect.

## Connection limit for bridge networks

Due to limitations set by the Linux kernel, bridge networks become unstable and
inter-container communications may break when 1000 containers or more connect
to a single network.

For more information about this limitation, see
moby/moby#44973.

## Skip Bridge IP address configuration

The bridge is normally assigned the network's `--gateway` address, which is
used as the default route from the bridge network to other networks.

The `com.docker.network.bridge.inhibit_ipv4` option lets you create a network
without the IPv4 gateway address being assigned to the bridge. This is useful
if you want to configure the gateway IP address for the bridge manually. For
instance if you add a physical interface to your bridge, and need it to have
the gateway address.

With this configuration, north-south traffic (to and from the bridge network)
won't work unless you've manually configured the gateway address on the bridge,
or a device attached to it.

This option can only be used with user-defined bridge networks.

## Usage examples

This section provides hands-on examples for working with bridge networks.

### Use the default bridge network

This example shows how the default `bridge` network works. You start two
`alpine` containers on the default bridge and test how they communicate.

> **Note:**
> The default `bridge` network is not recommended for production. Use
> user-defined bridge networks instead.

1. List current networks:

   ```console
   $ docker network ls

   NETWORK ID          NAME                DRIVER              SCOPE
   17e324f45964        bridge              bridge              local
   6ed54d316334        host                host                local
   7092879f2cc8        none                null                local
   ```

   The default `bridge` network is listed, along with `host` and `none`.

2. Start two `alpine` containers running `ash`. The `-dit` flags mean detached,
   interactive, and with a TTY. Since you haven't specified a `--network` flag,
   the containers connect to the default `bridge` network.

   ```console
   $ docker run -dit --name alpine1 alpine ash
   $ docker run -dit --name alpine2 alpine ash
   ```

   Verify both containers are running:

   ```console
   $ docker container ls

   CONTAINER ID        IMAGE               COMMAND             CREATED             STATUS              PORTS               NAMES
   602dbf1edc81        alpine              "ash"               4 seconds ago       Up 3 seconds                            alpine2
   da33b7aa74b0        alpine              "ash"               17 seconds ago      Up 16 seconds                           alpine1
   ```

3. Inspect the `bridge` network to see connected containers:

   ```console
   $ docker network inspect bridge
   ```

   The output shows both containers connected, with their assigned IP addresses
   (`172.17.0.2` for `alpine1` and `172.17.0.3` for `alpine2`).

4. Connect to `alpine1`:

   ```console
   $ docker attach alpine1

   / #
   ```

   Show the network interfaces for `alpine1` from within the container:

   ```console
   # ip addr show

   1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN qlen 1
       link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
       inet 127.0.0.1/8 scope host lo
          valid_lft forever preferred_lft forever
       inet6 ::1/128 scope host
          valid_lft forever preferred_lft forever
   27: eth0@if28: <BROADCAST,MULTICAST,UP,LOWER_UP,M-DOWN> mtu 1500 qdisc noqueue state UP
       link/ether 02:42:ac:11:00:02 brd ff:ff:ff:ff:ff:ff
       inet 172.17.0.2/16 scope global eth0
          valid_lft forever preferred_lft forever
   ```

   In this example, the `eth0` interface has the IP address `172.17.0.2`.

5. From within `alpine1`, verify you can connect to the internet:

   ```console
   # ping -c 2 google.com

   PING google.com (172.217.3.174): 56 data bytes
   64 bytes from 172.217.3.174: seq=0 ttl=41 time=9.841 ms
   64 bytes from 172.217.3.174: seq=1 ttl=41 time=9.897 ms

   --- google.com ping statistics ---
   2 packets transmitted, 2 packets received, 0% packet loss
   round-trip min/avg/max = 9.841/9.869/9.897 ms
   ```

6. Ping the second container by its IP address:

   ```console
   # ping -c 2 172.17.0.3

   PING 172.17.0.3 (172.17.0.3): 56 data bytes
   64 bytes from 172.17.0.3: seq=0 ttl=64 time=0.086 ms
   64 bytes from 172.17.0.3: seq=1 ttl=64 time=0.094 ms

   --- 172.17.0.3 ping statistics ---
   2 packets transmitted, 2 packets received, 0% packet loss
   round-trip min/avg/max = 0.086/0.090/0.094 ms
   ```

   This succeeds. Now try pinging by container name:

   ```console
   # ping -c 2 alpine2

   ping: bad address 'alpine2'
   ```

   On the default bridge network, containers can't resolve each other by name.

7. Detach from `alpine1` without stopping it using `CTRL+p CTRL+q`.

8. Clean up: stop the containers and remove them.

   ```console
   $ docker container stop alpine1 alpine2
   $ docker container rm alpine1 alpine2
   ```

   Stopped containers lose their IP addresses.

### Use user-defined bridge networks

This example shows how user-defined bridge networks provide better isolation
and automatic DNS resolution between containers.

1. Create the `alpine-net` network:

   ```console
   $ docker network create --driver bridge alpine-net
   ```

2. List Docker's networks:

   ```console
   $ docker network ls

   NETWORK ID          NAME                DRIVER              SCOPE
   e9261a8c9a19        alpine-net          bridge              local
   17e324f45964        bridge              bridge              local
   6ed54d316334        host                host                local
   7092879f2cc8        none                null                local
   ```

   Inspect the `alpine-net` network:

   ```console
   $ docker network inspect alpine-net
   ```

   This shows the network's gateway (for example, `172.18.0.1`) and that no
   containers are connected yet.

3. Create four containers. Three connect to `alpine-net`, and one connects to
   the default `bridge`. Then connect one container to both networks:

   ```console
   $ docker run -dit --name alpine1 --network alpine-net alpine ash
   $ docker run -dit --name alpine2 --network alpine-net alpine ash
   $ docker run -dit --name alpine3 alpine ash
   $ docker run -dit --name alpine4 --network alpine-net alpine ash
   $ docker network connect bridge alpine4
   ```

   Verify all containers are running:

   ```console
   $ docker container ls

   CONTAINER ID        IMAGE               COMMAND             CREATED              STATUS              PORTS               NAMES
   156849ccd902        alpine              "ash"               41 seconds ago       Up 41 seconds                           alpine4
   fa1340b8d83e        alpine              "ash"               51 seconds ago       Up 51 seconds                           alpine3
   a535d969081e        alpine              "ash"               About a minute ago   Up About a minute                       alpine2
   0a02c449a6e9        alpine              "ash"               About a minute ago   Up About a minute                       alpine1
   ```

4. Inspect both networks again to see which containers are connected:

   ```console
   $ docker network inspect bridge
   ```

   Containers `alpine3` and `alpine4` are connected to the `bridge` network.

   ```console
   $ docker network inspect alpine-net
   ```

   Containers `alpine1`, `alpine2`, and `alpine4` are connected to
   `alpine-net`.

5. On user-defined networks, containers can resolve each other by name. Connect
   to `alpine1` and test:

   > **Note:**
   > Automatic service discovery only resolves custom container names, not
   > default automatically generated names.

   ```console
   $ docker container attach alpine1

   # ping -c 2 alpine2

   PING alpine2 (172.18.0.3): 56 data bytes
   64 bytes from 172.18.0.3: seq=0 ttl=64 time=0.085 ms
   64 bytes from 172.18.0.3: seq=1 ttl=64 time=0.090 ms

   --- alpine2 ping statistics ---
   2 packets transmitted, 2 packets received, 0% packet loss
   round-trip min/avg/max = 0.085/0.087/0.090 ms

   # ping -c 2 alpine4

   PING alpine4 (172.18.0.4): 56 data bytes
   64 bytes from 172.18.0.4: seq=0 ttl=64 time=0.076 ms
   64 bytes from 172.18.0.4: seq=1 ttl=64 time=0.091 ms

   --- alpine4 ping statistics ---
   2 packets transmitted, 2 packets received, 0% packet loss
   round-trip min/avg/max = 0.076/0.083/0.091 ms
   ```

6. From `alpine1`, you can't connect to `alpine3` because it's on a different
   network:

   ```console
   # ping -c 2 alpine3

   ping: bad address 'alpine3'
   ```

   You also can't connect by IP address. If `alpine3`'s IP is `172.17.0.2`:

   ```console
   # ping -c 2 172.17.0.2

   PING 172.17.0.2 (172.17.0.2): 56 data bytes

   --- 172.17.0.2 ping statistics ---
   2 packets transmitted, 0 packets received, 100% packet loss
   ```

   Detach from `alpine1` using `CTRL+p CTRL+q`.

7. Since `alpine4` is connected to both networks, it can reach all containers.
   However, you need to use `alpine3`'s IP address:

   ```console
   $ docker container attach alpine4

   # ping -c 2 alpine1

   PING alpine1 (172.18.0.2): 56 data bytes
   64 bytes from 172.18.0.2: seq=0 ttl=64 time=0.074 ms
   64 bytes from 172.18.0.2: seq=1 ttl=64 time=0.082 ms

   --- alpine1 ping statistics ---
   2 packets transmitted, 2 packets received, 0% packet loss
   round-trip min/avg/max = 0.074/0.078/0.082 ms

   # ping -c 2 alpine2

   PING alpine2 (172.18.0.3): 56 data bytes
   64 bytes from 172.18.0.3: seq=0 ttl=64 time=0.075 ms
   64 bytes from 172.18.0.3: seq=1 ttl=64 time=0.080 ms

   --- alpine2 ping statistics ---
   2 packets transmitted, 2 packets received, 0% packet loss
   round-trip min/avg/max = 0.075/0.077/0.080 ms

   # ping -c 2 alpine3
   ping: bad address 'alpine3'

   # ping -c 2 172.17.0.2

   PING 172.17.0.2 (172.17.0.2): 56 data bytes
   64 bytes from 172.17.0.2: seq=0 ttl=64 time=0.089 ms
   64 bytes from 172.17.0.2: seq=1 ttl=64 time=0.075 ms

   --- 172.17.0.2 ping statistics ---
   2 packets transmitted, 2 packets received, 0% packet loss
   round-trip min/avg/max = 0.075/0.082/0.089 ms
   ```

8. Verify all containers can connect to the internet:

   ```console
   # ping -c 2 google.com

   PING google.com (172.217.3.174): 56 data bytes
   64 bytes from 172.217.3.174: seq=0 ttl=41 time=9.778 ms
   64 bytes from 172.217.3.174: seq=1 ttl=41 time=9.634 ms

   --- google.com ping statistics ---
   2 packets transmitted, 2 packets received, 0% packet loss
   round-trip min/avg/max = 9.634/9.706/9.778 ms
   ```

   Detach with `CTRL+p CTRL+q` and repeat for `alpine3` and `alpine1` if
   desired.

9. Clean up:

   ```console
   $ docker container stop alpine1 alpine2 alpine3 alpine4
   $ docker container rm alpine1 alpine2 alpine3 alpine4
   $ docker network rm alpine-net
   ```

## Next steps

- Learn about networking from the container's point of view
- Learn about overlay networks
- Learn about Macvlan networks
