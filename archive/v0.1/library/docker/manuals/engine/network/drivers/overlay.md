---
title: "Overlay network driver (part 1 of 2)"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/engine/network/drivers/overlay.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Overlay network driver

The `overlay` network driver creates a distributed network among multiple
Docker daemon hosts. This network sits on top of (overlays) the host-specific
networks, allowing containers connected to it to communicate securely when
encryption is enabled. Docker transparently handles routing of each packet to
and from the correct Docker daemon host and the correct destination container.

You can create user-defined `overlay` networks using `docker network create`,
in the same way that you can create user-defined `bridge` networks. Services
or containers can be connected to more than one network at a time. Services or
containers can only communicate across networks they're each connected to.

Overlay networks are often used to create a connection between Swarm services,
but you can also use it to connect standalone containers running on different
hosts. When using standalone containers, it's still required that you use
Swarm mode to establish a connection between the hosts.

This page describes overlay networks in general, and when used with standalone
containers. For information about overlay for Swarm services, see
Manage Swarm service networks.

## Requirements

Docker hosts must be part of a swarm to use overlay networks, even when
connecting standalone containers. The following ports must be open between
participating hosts:

| Ports                  | Description                                                                                                                                             |
| :--------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `2377/tcp`             | The default Swarm control plane port, is configurable with `docker swarm join --listen-addr` |
| `4789/udp`             | The default overlay traffic port, configurable with `docker swarm init --data-path-port`          |
| `7946/tcp`, `7946/udp` | Used for communication among nodes, not configurable                                                                                                    |

## Create an overlay network

To create an overlay network that containers on other Docker hosts can connect to,
run the following command:

```console
$ docker network create -d overlay --attachable my-attachable-overlay
```

The `--attachable` option enables both standalone containers
and Swarm services to connect to the overlay network.
Without `--attachable`, only Swarm services can connect to the network.

You can specify the IP address range, subnet, gateway, and other options. See
`docker network create --help` for details.

## Encrypt traffic on an overlay network

Use the `--opt encrypted` flag to encrypt the application data
transmitted over the overlay network:

```console
$ docker network create \
  --opt encrypted \
  --driver overlay \
  --attachable \
  my-attachable-multi-host-network
```

This enables IPsec encryption at the level of the Virtual Extensible LAN (VXLAN).
This encryption imposes a non-negligible performance penalty,
so you should test this option before using it in production.

> **Warning:**
>
> Don't attach Windows containers to encrypted overlay networks.
>
> Overlay network encryption isn't supported on Windows.
> Swarm doesn't report an error when a Windows host
> attempts to connect to an encrypted overlay network,
> but networking for the Windows containers is affected as follows:
>
> - Windows containers can't communicate with Linux containers on the network
> - Data traffic between Windows containers on the network isn't encrypted

## Attach a container to an overlay network

Adding containers to an overlay network gives them the ability to communicate
with other containers without having to set up routing on the individual Docker
daemon hosts. A prerequisite for doing this is that the hosts have joined the same Swarm.

To join an overlay network named `multi-host-network` with a `busybox` container:

```console
$ docker run --network multi-host-network busybox sh
```

> **Note:**
>
> This only works if the overlay network is attachable
> (created with the `--attachable` flag).

## Container discovery

Publishing ports of a container on an overlay network opens the ports to other
containers on the same network. Containers are discoverable by doing a DNS lookup
using the container name.

| Flag value                      | Description                                                                                                                                                 |
| ------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `-p 8080:80`                    | Map TCP port 80 in the container to port `8080` on the overlay network.                                                                                     |
| `-p 8080:80/udp`                | Map UDP port 80 in the container to port `8080` on the overlay network.                                                                                     |
| `-p 8080:80/sctp`               | Map SCTP port 80 in the container to port `8080` on the overlay network.                                                                                    |
| `-p 8080:80/tcp -p 8080:80/udp` | Map TCP port 80 in the container to TCP port `8080` on the overlay network, and map UDP port 80 in the container to UDP port `8080` on the overlay network. |

## Connection limit for overlay networks

Due to limitations set by the Linux kernel, overlay networks become unstable and
inter-container communications may break when 1000 containers are co-located on
the same host.

For more information about this limitation, see
moby/moby#44973.
