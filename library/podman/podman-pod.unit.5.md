---
title: "NAME (part 1 of 3)"
tool: "podman"
version: "6.2"
source: "https://github.com/containers/podman/blob/055de046937d29450f310fce0fe3071485d8bed9/docs/source/markdown/podman-pod.unit.5.md.in"
commit: "055de046937d29450f310fce0fe3071485d8bed9"
license: "Apache-2.0"
---

% podman-pod.unit 5

# NAME

podman\-pod.unit - systemd unit files for managing Podman pods using Quadlet

# SYNOPSIS

*name*.pod

# DESCRIPTION

Pod units are named with a `.pod` extension and contain a `[Pod]` section describing
the pod that is created and run as a service. The resulting service file contains a line like
`ExecStartPre=podman pod create …`, and most of the keys in this section control the command-line
options passed to Podman.

By default, the Podman pod has the same name as the unit, but with a `systemd-` prefix, i.e.
a `$name.pod` file creates a `$name-pod.service` unit and a `systemd-$name` Podman pod. The
`PodName` option allows for overriding this default name with a user-provided one.

# OPTIONS

Valid options for `[Pod]` are listed below:

| **[Pod] options**                   | **podman pod create equivalent** |
|-------------------------------------|----------------------------------------|
| AddHost=example\.com:192.168.10.11  | --add-host example.com:192.168.10.11   |
| ContainersConfModule=/etc/nvd\.conf | --module=/etc/nvd\.conf                |
| DNS=192.168.55.1                    | --dns=192.168.55.1                     |
| DNSOption=ndots:1                   | --dns-option=ndots:1                   |
| DNSSearch=example.com               | --dns-search example.com               |
| ExitPolicy=stop                     | --exit-policy stop                     |
| GIDMap=0:10000:10                   | --gidmap=0:10000:10                    |
| GlobalArgs=--log-level=debug        | --log-level=debug                      |
| HostName=name                       | --hostname=name                        |
| IP=192.5.0.1                        | --ip 192.5.0.1                         |
| IP6=2001:db8::1                     | --ip6 2001:db8::1                      |
| Label="XYZ"                         | --label "XYZ"                          |
| Network=host                        | --network host                         |
| NetworkAlias=name                   | --network-alias name                   |
| PodmanArgs=\-\-cpus=2               | --cpus=2                               |
| PodName=name                        | --name=name                            |
| PublishPort=8080:80                 | --publish 8080:80                      |
| ServiceName=name                    | Name the systemd unit `name.service`   |
| ShmSize=100m                        | --shm-size=100m                        |
| SubGIDMap=gtest                     | --subgidname=gtest                     |
| SubUIDMap=utest                     | --subuidname=utest                     |
| UIDMap=0:10000:10                   | --uidmap=0:10000:10                    |
| UserNS=keep-id:uid=200,gid=210      | --userns keep-id:uid=200,gid=210       |
| Volume=/source:/dest                | --volume /source:/dest                 |

Supported keys in the `[Pod]` section are:

<< if is_quadlet >>
### `AddHost=hostname[;hostname[;...]]:ip`
<< else >>
#### **--add-host**=*hostname[;hostname[;...]]*:*ip*
<< endif >>

Add a custom host-to-IP mapping to the <<container|pod>>'s `/etc/hosts` file.

The option takes one or multiple semicolon-separated hostnames to be mapped to
a single IPv4 or IPv6 address, separated by a colon. It can also be used to
overwrite the IP addresses of hostnames Podman adds to `/etc/hosts` by default
(also see the **--name** and **--hostname** options). This option can be
specified multiple times to add additional mappings to `/etc/hosts`. It
conflicts with the **--no-hosts** option and conflicts with *no_hosts=true* in
`containers.conf`.

Instead of an IP address, the special flag *host-gateway* can be given. This
resolves to an IP address the container can use to connect to the host. The
IP address chosen depends on your network setup, thus there's no guarantee that
Podman can determine the *host-gateway* address automatically, which will then
cause Podman to fail with an error message. You can overwrite this IP address
using the *host_containers_internal_ip* option in *containers.conf*.

The *host-gateway* address is also used by Podman to automatically add the
`host.containers.internal` and `host.docker.internal` hostnames to `/etc/hosts`.
You can prevent that by either giving the **--no-hosts** option, or by setting
*host_containers_internal_ip="none"* in *containers.conf*. If no *host-gateway*
address was configured manually and Podman fails to determine the IP address
automatically, Podman will silently skip adding these internal hostnames to
`/etc/hosts`. If Podman is running in a virtual machine using `podman machine`
(this includes Mac and Windows hosts), Podman will silently skip adding the
internal hostnames to `/etc/hosts`, unless an IP address was configured
manually; the internal hostnames are resolved by the gvproxy DNS resolver
instead.

Podman will use the `/etc/hosts` file of the host as a basis by default, i.e.
any hostname present in this file will also be present in the `/etc/hosts` file
of the container. A different base file can be configured using the
*base_hosts_file* config in `containers.conf`.

<< if is_quadlet >>
### `ContainersConfModule=module`
<< else >>
#### **--module**=*module*
<< endif >>

Load the specified containers.conf(5) module.

This option can be listed multiple times.

<< if is_quadlet >>
### `DNS=ipaddr`
<< else >>
#### **--dns**=*ipaddr*
<< endif >>

Set custom DNS servers.

This option can be used to override the DNS
configuration passed to the container. Typically this is necessary when the
host DNS configuration is invalid for the container (e.g., **127.0.0.1**). When this
is the case, the << '**DNS=.**' if is_quadlet else '**--dns**' >> flag is necessary for every run.

The special value **none** can be specified to disable creation of _/etc/resolv.conf_ in the container by Podman.
The _/etc/resolv.conf_ file in the image is then used without changes.

Note that **ipaddr** may be added directly to the container's _/etc/resolv.conf_.
This is not guaranteed though.  For example, passing a custom network whose *dns_enabled* is set to *true* to **--network** will result in _/etc/resolv.conf_ only referring to the aardvark-dns server.  aardvark-dns then forwards to the supplied **ipaddr** for all non-container name queries.

### `ExitPolicy=stop`

Set the exit policy of the pod when the last container exits. Default for quadlets is **stop**.

To keep the pod active, set `ExitPolicy=continue`.

### `GlobalArgs=`

This key contains a list of arguments passed directly after the `podman` command in the generated
file. It can be used to access Podman features otherwise unsupported by the generator. Since the
generator is unaware of what unexpected interactions can be caused by these arguments, it is not
recommended to use this option.

The format of this is a space separated list of arguments, which can optionally be individually
escaped to allow inclusion of whitespace and other control characters.

This key can be listed multiple times.

<< if is_quadlet >>
### `IP=IPv4`
<< else >>
#### **--ip**=*IPv4*
<< endif >>

Specify a static IPv4 address for the <<container|pod>>, for example **10.88.64.128**.
This option can only be used if the <<container|pod>> is joined to only a single network - i.e.,
<< '**Network=network-name**' if is_quadlet else '**--network=network-name**' >> is used at most once -
and if the <<container|pod>> is not joining another container's network namespace via
<< '**Network=container:_id_**' if is_quadlet else '**--network=container:_id_**' >>.
The address must be within the network's IP address pool (default **10.88.0.0/16**).

<< if is_quadlet >>
To specify multiple static IP addresses per <<container|pod>>, set multiple networks using
the **Network=** option with a static IP address specified for each using the `ip` mode for that option.
<< else >>
To specify multiple static IP addresses per <<container|pod>>, use the **--network** option with multiple comma-separated `ip` values:

```
--network mynet:ip=10.88.0.10,ip=10.88.0.11,ip=10.88.0.12
```

This assigns multiple static IPv4 addresses (**10.88.0.10**, **10.88.0.11**, **10.88.0.12**) to the same network interface.

**Multi-Subnet Networks:** When a network has multiple subnets, you can assign IPs from different subnets to the same <<container|pod>>. The IPs will be applied to a single network interface, with the first IP as primary and additional IPs as secondary addresses.

**IP Assignment Order:** For multi-subnet networks, IPs are grouped and ordered by their corresponding subnet, following the order in which subnets were defined during network creation (via `--subnet` flags). The order you specify IPs in the command does not affect the final assignment order. For example:

```
podman network create --subnet 10.89.0.0/24 --subnet 10.90.0.0/24 mynet
podman run --network mynet:ip=10.90.0.20,ip=10.89.0.10,ip=10.89.0.11 alpine
```

Results in IPs ordered by subnet: **10.89.0.10** (primary), **10.89.0.11** (secondary), **10.90.0.20** (secondary), since **10.89.0.0/24** was defined first.

**Dynamic Allocation:** If fewer IPs are specified than available subnets, the remaining subnets will receive dynamically allocated IPs. Dynamic IPs are assigned in subnet order after all static IPs are applied.

Example with multi-subnet network:

```
podman network create --subnet 10.89.0.0/24 --subnet 10.90.0.0/24 mynet
podman run --network mynet:ip=10.89.0.10,ip=10.90.0.20 alpine
```

This configures **eth0** with **10.89.0.10** (primary) and **10.90.0.20** (secondary).
<< endif >>

<< if is_quadlet >>
### `IP6=IPv6`
<< else >>
#### **--ip6**=*IPv6*
<< endif >>

Specify a static IPv6 address for the <<container|pod>>, for example **fd46:db93:aa76:ac37::10**.
This option can only be used if the <<container|pod>> is joined to only a single network - i.e.,
<< '**Network=network-name**' if is_quadlet else '**--network=network-name**' >> is used at most once -
and if the <<container|pod>> is not joining another container's network namespace via
<< '**Network=container:_id_**' if is_quadlet else '**--network=container:_id_**' >>.
The address must be within the network's IPv6 address pool.

To specify multiple static IPv6 addresses per <<container|pod>>, set multiple networks using the
<< '**Network=**' if is_quadlet else '**--network' >> option with a static IPv6 address
specified for each using the `ip6` mode for that option.

<< if is_quadlet >>
### `Label=key=value [key=value ...]`
<< else >>
#### **--label**, **-l**=*key=value*
<< endif >>

Add metadata to a <<container|pod>>.

<< if is_quadlet >>
