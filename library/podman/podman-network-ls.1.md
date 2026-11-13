---
title: "podman-network-ls.1"
tool: "podman"
version: "6.2"
source: "https://github.com/containers/podman/blob/055de046937d29450f310fce0fe3071485d8bed9/docs/source/markdown/podman-network-ls.1.md.in"
commit: "055de046937d29450f310fce0fe3071485d8bed9"
license: "Apache-2.0"
---

# podman-network-ls.1

% podman-network-ls 1

## NAME
podman\-network\-ls - Display a summary of networks (alias list)

## SYNOPSIS
**podman network ls**  [*options*]

## DESCRIPTION
Displays a list of existing podman networks.

## OPTIONS

#### **--format**=*format*

Change the default output format.  This can be of a supported type like 'json'
or a Go template.
Valid placeholders for the Go template are listed below:

| **Placeholder**    | **Description**                           |
|--------------------|-------------------------------------------|
| .Created ...       | Timestamp when the network was created    |
| .DNSEnabled        | Network has dns enabled (boolean)         |
| .Driver            | Network driver                            |
| .ID                | Network ID                                |
| .Internal          | Network is internal (boolean)             |
| .IPAMOptions ...   | Network ipam options                      |
| .IPv6Enabled       | Network has ipv6 subnet (boolean)         |
| .Labels            | Network labels                            |
| .Name              | Network name                              |
| .NetworkDNSServers | Array of DNS servers used in this network |
| .NetworkInterface  | Name of the network interface on the host |
| .Options ...       | Network options                           |
| .Routes            | List of static routes for this network    |
| .Subnets           | List of subnets on this network           |

#### **--no-trunc**

Do not truncate the network ID.

#### **--noheading**, **-n**

Omit the table headings from the listing.

#### **--quiet**, **-q**

The `quiet` option restricts the output to only the network names.

## EXAMPLE

Display networks:
```
$ podman network ls
NETWORK ID    NAME         DRIVER
88a7120ee19d  podman       bridge
6dd508dbf8cd  podman6  bridge
8e35c2cd3bf6  podman5  macvlan
```

Display only network names:
```
$ podman network ls -q
podman
podman2
outside
podman9
```

Display name of network which support bridge plugin:
```
$ podman network ls --filter driver=bridge --format {{.Name}}
podman
podman2
podman9
```
List networks with their subnets:
```
$ podman network ls --format "{{.Name}}: {{range .Subnets}}{{.Subnet}} {{end}}"
podman: 10.88.0.0/16
podman3: 10.89.30.0/24 fde4:f86f:4aab:e68f::/64
macvlan:
```

## SEE ALSO
**podman(1)**, **podman-network(1)**, **podman-network-inspect(1)**, **podman-network-create(1)**

## HISTORY
August 2021, Updated with the new network format by Paul Holzinger <pholzing@redhat.com>

August 2019, Originally compiled by Brent Baude <bbaude@redhat.com>
