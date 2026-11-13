---
title: "Bridge network driver (part 1 of 2)"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/engine/network/drivers/bridge.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Bridge network driver

A Docker bridge network has an IPv4 subnet and, optionally, an IPv6 subnet.
Each container connected to the bridge network has a network interface with
addresses in the network's subnets. By default, it:

- Allows unrestricted network access to containers in the network from
  the host, and from other containers connected to the same bridge network.
- Blocks access from containers in other networks and from outside the
  Docker host.
- Uses masquerading to give containers external network access. Devices on
  the host's external networks only see the IP address of the Docker host.
- Supports port publishing, where network traffic is forwarded between
  container ports and ports on host IP addresses. The published ports
  can be accessed from outside the Docker host, on its IP addresses.

In terms of Docker, a bridge network uses a software bridge which lets
containers connected to the same bridge network communicate, while providing
isolation from containers that aren't connected to that bridge network. By
default, the Docker bridge driver automatically installs rules in the host
machine so that containers connected to different bridge networks can only
communicate with each other using published ports.

Bridge networks apply to containers running on the same Docker daemon host.
For communication among containers running on different Docker daemon hosts, you
can either manage routing at the OS level, or you can use an
overlay network.

When you start Docker, a default bridge network (also
called `bridge`) is created automatically, and newly-started containers connect
to it unless otherwise specified. You can also create user-defined custom bridge
networks. **User-defined bridge networks are superior to the default `bridge`
network.**

## Differences between user-defined bridges and the default bridge

- **User-defined bridges provide automatic DNS resolution between containers**.

  Containers on the default bridge network can only access each other by IP
  addresses, unless you use the `--link` option, which is
  considered legacy. On a user-defined bridge network, containers can resolve
  each other by name or alias.

  Imagine an application with a web front-end and a database back-end. If you call
  your containers `web` and `db`, the web container can connect to the db container
  at `db`, no matter which Docker host the application stack is running on.

  If you run the same application stack on the default bridge network, you need
  to manually create links between the containers (using the legacy `--link`
  flag). These links need to be created in both directions, so you can see this
  gets complex with more than two containers which need to communicate.
  Alternatively, you can manipulate the `/etc/hosts` files within the containers,
  but this creates problems that are difficult to debug.

- **User-defined bridges provide better isolation**.

  All containers without a `--network` specified, are attached to the default bridge network. This can be a risk, as unrelated stacks/services/containers are then able to communicate.

  Using a user-defined network provides a scoped network in which only containers attached to that network are able to communicate.

- **Containers can be attached and detached from user-defined networks on the fly**.

  During a container's lifetime, you can connect or disconnect it from
  user-defined networks on the fly. To remove a container from the default
  bridge network, you need to stop the container and recreate it with different
  network options.

- **Each user-defined network creates a configurable bridge**.

  If your containers use the default bridge network, you can configure it, but
  all the containers use the same settings, such as MTU and `iptables` rules.
  In addition, configuring the default bridge network happens outside of Docker
  itself, and requires a restart of Docker.

  User-defined bridge networks are created and configured using
  `docker network create`. If different groups of applications have different
  network requirements, you can configure each user-defined bridge separately,
  as you create it.

- **Linked containers on the default bridge network share environment variables**.

  Originally, the only way to share environment variables between two containers
  was to link them using the `--link` flag. This type of
  variable sharing isn't possible with user-defined networks. However, there
  are superior ways to share environment variables. A few ideas:
  - Multiple containers can mount a file or directory containing the shared
    information, using a Docker volume.

  - Multiple containers can be started together using `docker-compose` and the
    compose file can define the shared variables.

  - You can use swarm services instead of standalone containers, and take
    advantage of shared secrets and
    configs.

Containers connected to the same user-defined bridge network effectively expose all ports
to each other. For a port to be accessible to containers or non-Docker hosts on
different networks, that port must be _published_ using the `-p` or `--publish`
flag.

## Options

The following table describes the driver-specific options that you can pass to
`--opt` when creating a custom network using the `bridge` driver.

| Option                                                                                          | Default                     | Description                                                                                                          |
| ----------------------------------------------------------------------------------------------- | --------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `com.docker.network.bridge.name`                                                                |                             | Interface name to use when creating the Linux bridge.                                                                |
| `com.docker.network.bridge.enable_ip_masquerade`                                                | `true`                      | Enable IP masquerading.                                                                                              |
| `com.docker.network.host_ipv4``com.docker.network.host_ipv6`                               |                             | Address to use for source NAT. See Port publishing. |
| `com.docker.network.bridge.gateway_mode_ipv4``com.docker.network.bridge.gateway_mode_ipv6` | `nat`                       | Control external connectivity. See Port publishing.                           |
| `com.docker.network.bridge.enable_icc`                                                          | `true`                      | Enable or Disable inter-container connectivity.                                                                      |
| `com.docker.network.bridge.host_binding_ipv4`                                                   | all IPv4 and IPv6 addresses | Default IP when binding container ports.                                                                             |
| `com.docker.network.driver.mtu`                                                                 | `0` (no limit)              | Set the containers network Maximum Transmission Unit (MTU).                                                          |
| `com.docker.network.container_iface_prefix`                                                     | `eth`                       | Set a custom prefix for container interfaces.                                                                        |
| `com.docker.network.bridge.inhibit_ipv4`                                                        | `false`                     | Prevent Docker from assigning an IP address to the bridge.                  |

Some of these options are also available as flags to the `dockerd` CLI, and you
can use them to configure the default `docker0` bridge when starting the Docker
daemon. The following table shows which options have equivalent flags in the
`dockerd` CLI.

| Option                                           | Flag        |
| ------------------------------------------------ | ----------- |
| `com.docker.network.bridge.name`                 | -           |
| `com.docker.network.bridge.enable_ip_masquerade` | `--ip-masq` |
| `com.docker.network.bridge.enable_icc`           | `--icc`     |
| `com.docker.network.bridge.host_binding_ipv4`    | `--ip`      |
| `com.docker.network.driver.mtu`                  | `--mtu`     |
| `com.docker.network.container_iface_prefix`      | -           |

The Docker daemon supports a `--bridge` flag, which you can use to define
your own `docker0` bridge. Use this option if you want to run multiple daemon
instances on the same host. For details, see
Run multiple daemons.

### Default host binding address

When no host address is given in port publishing options like `-p 80`
or `-p 8080:80`, the default is to make the container's port 80 available on all
host addresses, IPv4 and IPv6.

The bridge network driver option `com.docker.network.bridge.host_binding_ipv4`
can be used to modify the default address for published ports.

Despite the option's name, it is possible to specify an IPv6 address.

When the default binding address is an address assigned to a specific interface,
the container's port will only be accessible via that address.

Setting the default binding address to `::` means published ports will only be
available on the host's IPv6 addresses. However, setting it to `0.0.0.0` means it
will be available on the host's IPv4 and IPv6 addresses.

To restrict a published port to IPv4 only, the address must be included in the
container's publishing options. For example, `-p 0.0.0.0:8080:80`.

## Manage a user-defined bridge

Use the `docker network create` command to create a user-defined bridge
network.

```console
$ docker network create my-net
```

You can specify the subnet, the IP address range, the gateway, and other
options. See the
docker network create
reference or the output of `docker network create --help` for details.

Use the `docker network rm` command to remove a user-defined bridge
network. If containers are currently connected to the network,
disconnect them
first.

```console
$ docker network rm my-net
```

> **What's really happening?**
>
> When you create or remove a user-defined bridge or connect or disconnect a
> container from a user-defined bridge, Docker uses tools specific to the
> operating system to manage the underlying network infrastructure (such as adding
> or removing bridge devices or configuring `iptables` rules on Linux). These
> details should be considered implementation details. Let Docker manage your
> user-defined networks for you.

## Connect a container to a user-defined bridge

When you create a new container, you can specify one or more `--network` flags.
This example connects an Nginx container to the `my-net` network. It also
publishes port 80 in the container to port 8080 on the Docker host, so external
clients can access that port. Any other container connected to the `my-net`
network has access to all ports on the `my-nginx` container, and vice versa.

```console
$ docker create --name my-nginx \
  --network my-net \
  --publish 8080:80 \
  nginx:latest
```

To connect a **running** container to an existing user-defined bridge, use the
`docker network connect` command. The following command connects an already-running
`my-nginx` container to an already-existing `my-net` network:

```console
$ docker network connect my-net my-nginx
```

## Disconnect a container from a user-defined bridge

To disconnect a running container from a user-defined bridge, use the
`docker network disconnect` command. The following command disconnects
the `my-nginx` container from the `my-net` network.

```console
$ docker network disconnect my-net my-nginx
```

## Use IPv6 in a user-defined bridge network

When you create your network, you can specify the `--ipv6` flag to enable IPv6.

```console
$ docker network create --ipv6 --subnet 2001:db8:1234::/64 my-net
```

If you do not provide a `--subnet` option, a Unique Local Address (ULA) prefix
will be chosen automatically.

## IPv6-only bridge networks

To skip IPv4 address configuration on the bridge and in its containers, create
the network with option `--ipv4=false`, and enable IPv6 using `--ipv6`.

```console
$ docker network create --ipv6 --ipv4=false v6net
```

IPv4 address configuration cannot be disabled in the default bridge network.
