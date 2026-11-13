---
title: "IPvlan network driver (part 1 of 3)"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/engine/network/drivers/ipvlan.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

The IPvlan driver gives users total control over both IPv4 and IPv6 addressing.
The VLAN driver builds on top of that in giving operators complete control of
layer 2 VLAN tagging and even IPvlan L3 routing for users interested in underlay
network integration. For overlay deployments that abstract away physical constraints
see the multi-host overlay driver.

IPvlan is a network virtualization technique that provides lightweight container networking.
The Linux implementations are extremely lightweight because rather than using
the traditional Linux bridge for isolation, they are associated to a Linux
Ethernet interface or sub-interface to enforce separation between networks and
connectivity to the physical network.

IPvlan offers a number of unique features and plenty of room for further
innovations with the various modes. Two high level advantages of these approaches
are, the positive performance implications of bypassing the Linux bridge and the
simplicity of having fewer moving parts. Removing the bridge that traditionally
resides in between the Docker host NIC and container interface leaves a simple
setup consisting of container interfaces, attached directly to the Docker host
interface. This result is easy to access for external facing services as there
is no need for port mappings in these scenarios.

## Options

The following table describes the driver-specific options that you can pass to
`--opt` when creating a network using the `ipvlan` driver.

| Option        | Default  | Description                                                           |
| ------------- | -------- | --------------------------------------------------------------------- |
| `ipvlan_mode` | `l2`     | Sets the IPvlan operating mode. Can be one of: `l2`, `l3`, `l3s`      |
| `ipvlan_flag` | `bridge` | Sets the IPvlan mode flag. Can be one of: `bridge`, `private`, `vepa` |
| `parent`      |          | Specifies the parent interface to use.                                |
