---
title: "podman-network-prune.1"
tool: "podman"
version: "6.2"
source: "https://github.com/containers/podman/blob/055de046937d29450f310fce0fe3071485d8bed9/docs/source/markdown/podman-network-prune.1.md"
commit: "055de046937d29450f310fce0fe3071485d8bed9"
license: "Apache-2.0"
---

# podman-network-prune.1

% podman-network-prune 1

## NAME
podman\-network\-prune - Remove all unused networks

## SYNOPSIS
**podman network prune** [*options*]

## DESCRIPTION
Remove all unused networks.  An unused network is defined by a network which
has no containers connected or configured to connect to it. It does not remove
the so-called default network which goes by the name of *podman*.

## OPTIONS

#### **--filter**

Provide filter values.

If there is more than one filter, the `--filter` option should be passed multiple times: **--filter** *label=test* **--filter** *until=10m*.

Supported filters:

| Filter | Description                                                                                        |
|:------:|----------------------------------------------------------------------------------------------------|
| label  | Only remove networks, with (or without, in the case of label!=[...] is used) the specified labels. |
| until  | Only remove networks created before given timestamp.                                               |

The `label` *filter* accepts two formats. One is the `label`=*key* or `label`=*key*=*value*, which removes networks with the specified labels. The other format is the `label!`=*key* or `label!`=*key*=*value*, which removes networks without the specified labels.

The `until` *filter* can be Unix timestamps, date formatted timestamps, or Go duration strings (e.g. 10m, 1h30m) computed relative to the machine’s time.

#### **--force**, **-f**

Do not prompt for confirmation

## EXAMPLE

Prune networks:
```
$ podman network prune
```

Prune all networks created not created in the last two hours:
```
$ podman network prune --filter until=2h
```

## SEE ALSO
**podman(1)**, **podman-network(1)**, **podman-network-rm(1)**

## HISTORY
February 2021, Originally compiled by Brent Baude <user@example.com>
