---
title: "podman-network-connect.1"
tool: "podman"
version: "6.2"
source: "https://github.com/containers/podman/blob/055de046937d29450f310fce0fe3071485d8bed9/docs/source/markdown/podman-network-connect.1.md"
commit: "055de046937d29450f310fce0fe3071485d8bed9"
license: "Apache-2.0"
---

# podman-network-connect.1

% podman-network-connect 1

## NAME
podman\-network\-connect - Connect a container to a network

## SYNOPSIS
**podman network connect** [*options*] network container

## DESCRIPTION
Connects a container to a network. A container can be connected to a network by name or by ID.
Once connected, the container can communicate with other containers in the same network.

## OPTIONS
#### **--alias**=*name*
Add network-scoped alias for the container. If the network has DNS enabled (`podman network inspect -f {{.DNSEnabled}} <NAME>`),
these aliases can be used for name resolution on the given network in addition to the container name.  Multiple *--alias* options may be specified as input. See **DNS NOTES** in **podman-network(1)**.

#### **--ip**=*address*
Set a static ipv4 address for this container on this network.

#### **--ip6**=*address*
Set a static ipv6 address for this container on this network.

#### **--mac-address**=*address*
Set a static mac address for this container on this network.

## EXAMPLES

Connect specified container to a named network:
```
$ podman network connect test web
```

Connect specified container to named network with two aliases:
```
$ podman network connect --alias web1 --alias web2 test web
```

Connect specified container to named network with a static ip:
```
$ podman network connect --ip 10.89.1.13 test web
```

Connect specified container to named network with a static mac address:
```
$ podman network connect --mac-address 92:d0:c6:0a:29:33 test web
```

## SEE ALSO
**podman(1)**, **podman-network(1)**, **podman-network-inspect(1)**, **podman-network-disconnect(1)**

## HISTORY
November 2020, Originally compiled by Brent Baude <user@example.com>
