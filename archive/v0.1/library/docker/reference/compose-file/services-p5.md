---
title: "Define services in Docker Compose (part 5 of 7)"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/reference/compose-file/services.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Define services in Docker Compose (part 5 of 7)

### `networks`

The `networks` attribute defines the networks that service containers are attached to, referencing entries under the
`networks` top-level element. The `networks` attribute helps manage the networking aspects of containers, providing control over how services are segmented and interact within the Docker environment. This is used to specify which networks the containers for that service should connect to. This is important for defining how containers communicate with each other and externally.

```yml
services:
  some-service:
    networks:
      - some-network
      - other-network
```
For more information about the `networks` top-level element, see Networks.

#### Implicit default network

If `networks` is empty or absent from the Compose file, Compose considers an implicit definition for the service to be
connected to the `default` network:

```yml
services:
  some-service:
    image: foo
```
This example is actually equivalent to:

```yml
services:
  some-service:
    image: foo
    networks:
      default: {}
```

If you want the service to not be connected a network, you must set `network_mode: none`.

#### `aliases`

`aliases` declares alternative hostnames for the service on the network. Other containers on the same
network can use either the service name or an alias to connect to one of the service's containers.

Since `aliases` are network-scoped, the same service can have different aliases on different networks.

> **Note:**
> A network-wide alias can be shared by multiple containers, and even by multiple services.
> If it is, then exactly which container the name resolves to is not guaranteed.

```yml
services:
  some-service:
    networks:
      some-network:
        aliases:
          - alias1
          - alias3
      other-network:
        aliases:
          - alias2
```

In the following example, service `frontend` is able to reach the `backend` service at
the hostname `backend` or `database` on the `back-tier` network. The service `monitoring`
is able to reach same `backend` service at `backend` or `mysql` on the `admin` network.

```yml
services:
  frontend:
    image: example/webapp
    networks:
      - front-tier
      - back-tier

  monitoring:
    image: example/monitoring
    networks:
      - admin

  backend:
    image: example/backend
    networks:
      back-tier:
        aliases:
          - database
      admin:
        aliases:
          - mysql

networks:
  front-tier: {}
  back-tier: {}
  admin: {}
```

#### use_service_name_alias

`use_service_name_alias` controls whether the service name is registered as an alias of the service's containers
on the network. It defaults to `true`. It requires the long syntax of `networks`.

When set to `false`, the service name is not an alias on this network. The values listed in
`aliases` are not affected, and neither are the other networks of the service.

You must distinguish an unset value from `false`, so that a Compose file merged on top of another
can set the attribute back to `true`.

This is useful when a network is shared by several Compose applications that each define a service with the
same name: the name would otherwise resolve to a container of any of them. Give each service a distinct
alias instead:

```yml
networks:
  shared:
    external: true

services:
  database:
    networks:
      shared:
        aliases:
          - project1-database
        use_service_name_alias: false
```

If the service is attached to no other network where its name is registered, other services can no longer
reach it by service name. Use `aliases` to give it a name on that network. `links`
are not affected.

> **Note:**
>
> `use_service_name_alias` only affects name resolution. It does not isolate the network. Containers attached
> to it can still reach the service by IP address or by any of its aliases.

#### `interface_name`

`interface_name` lets you specify the name of the network interface used to connect a service to a given network. This ensures consistent and predictable interface naming across services and networks.

```yaml
services:
  backend:
    image: alpine
    command: ip link show
    networks:
      back-tier:
        interface_name: eth0
```

Running the example Compose application shows:

```console
backend-1  | 11: eth0@if64: <BROADCAST,MULTICAST,UP,LOWER_UP,M-DOWN> mtu 1500 qdisc noqueue state UP
```

#### `ipv4_address`, `ipv6_address`

Specify a static IP address for a service container when joining the network.

The corresponding network configuration in the top-level networks section must have an
`ipam` attribute with subnet configurations covering each static address.

```yml
services:
  frontend:
    image: example/webapp
    networks:
      front-tier:
        ipv4_address: 172.16.238.10
        ipv6_address: 2001:3984:3989::10

networks:
  front-tier:
    ipam:
      driver: default
      config:
        - subnet: "172.16.238.0/24"
        - subnet: "2001:3984:3989::/64"
```

#### `link_local_ips`

`link_local_ips` specifies a list of link-local IPs. Link-local IPs are special IPs which belong to a well
known subnet and are purely managed by the operator, usually dependent on the architecture where they are
deployed.

Example:

```yaml
services:
  app:
    image: busybox
    command: top
    networks:
      app_net:
        link_local_ips:
          - 57.123.22.11
          - 57.123.22.13
networks:
  app_net:
    driver: bridge
```

#### `mac_address`

`mac_address` sets the Mac address used by the service container when connecting to this particular network.

#### `driver_opts`

`driver_opts` specifies a list of options as key-value pairs to pass to the driver. These options are
driver-dependent. Consult the driver's documentation for more information.

```yml
services:
  app:
    networks:
      app_net:
        driver_opts:
          foo: "bar"
          baz: 1
```

#### `gw_priority`

The network with the highest `gw_priority` is selected as the default gateway for the service container.
If unspecified, the default value is 0.

In the following example, `app_net_2` will be selected as the default gateway.

```yaml
services:
  app:
    image: busybox
    command: top
    networks:
      app_net_1:
      app_net_2:
        gw_priority: 1
      app_net_3:
networks:
  app_net_1:
  app_net_2:
  app_net_3:
```

#### `priority`

`priority` indicates in which order Compose connects the service’s containers to its
networks. If unspecified, the default value is 0.

If the container runtime accepts a `mac_address` attribute at service level, it is
applied to the network with the highest `priority`. In other cases, use attribute
`networks.mac_address`.

`priority` does not affect which network is selected as the default gateway. Use the
`gw_priority` attribute instead.

`priority` does not control the order in which networks connections are added to
the container, it cannot be used to determine the device name (`eth0` etc.) in the
container.

```yaml
services:
  app:
    image: busybox
    command: top
    networks:
      app_net_1:
        priority: 1000
      app_net_2:

      app_net_3:
        priority: 100
networks:
  app_net_1:
  app_net_2:
  app_net_3:
```

### `oom_kill_disable`

If `oom_kill_disable` is set, Compose configures the platform so it won't kill the container in case
of memory starvation.

### `oom_score_adj`

`oom_score_adj` tunes the preference for containers to be killed by platform in case of memory starvation. Value must
be within -1000,1000 range.

### `pid`

`pid` sets the PID mode for container created by Compose.
Supported values are platform specific.

### `pids_limit`

`pids_limit` tunes a container’s PIDs limit. Set to -1 for unlimited PIDs.

```yml
pids_limit: 10
```

When set, `pids_limit` must be consistent with the `pids` attribute in the Deploy Specification.

### `platform`

`platform` defines the target platform the containers for the service run on. It uses the `os[/arch[/variant]]` syntax.

The values of `os`, `arch`, and `variant` must conform to the convention used by the OCI Image Spec.

Compose uses this attribute to determine which version of the image is pulled
and/or on which platform the service’s build is performed.

```yml
platform: darwin
platform: windows/amd64
platform: linux/arm64/v8
```

### `ports`

The `ports` is used to define the port mappings between the host machine and the containers.  This is crucial for allowing external access to services running inside containers. It can be defined using short syntax for simple port mapping or long syntax, which includes additional options like protocol type and network mode.

> **Note:**
>
> Port mapping must not be used with `network_mode: host`. Doing so causes a runtime error because `network_mode: host` already exposes container ports directly to the host network, so port mapping isn’t needed.

#### Short syntax

The short syntax is a colon-separated string to set the host IP, host port, and container port
in the form:

`[HOST:]CONTAINER[/PROTOCOL]` where:

- `HOST` is `IP:` (optional). If it is not set, it binds to all network interfaces (`0.0.0.0`).
- `CONTAINER` is `port | range`.
- `PROTOCOL` restricts ports to a specified protocol either `tcp` or `udp`(optional). Default is `tcp`.

> **Warning:**
>
> If you do not specify a host IP (such as `127.0.0.1`), Docker binds to all interfaces (`0.0.0.0`), bypassing host firewall rules. This can expose the container directly to the internet if the host has a public IP address. For more information, see Port publishing and mapping.

Ports can be either a single value or a range. `HOST` and `CONTAINER` must use equivalent ranges.

You can either specify both ports (`HOST:CONTAINER`), or just the container port. In the latter case,
the container runtime automatically allocates any unassigned port of the host.

`HOST:CONTAINER` should always be specified as a (quoted) string, to avoid conflicts
with YAML base-60 float.

IPv6 addresses can be enclosed in square brackets.

Examples:

```yml
ports:
  - "3000"
  - "3000-3005"
  - "8000:8000"
  - "9090-9091:8080-8081"
  - "49100:22"
  - "8000-9000:80"
  - "127.0.0.1:8001:8001"
  - "127.0.0.1:5000-5010:5000-5010"
  - "::1:6000:6000"
  - "[::1]:6001:6001"
  - "6060:6060/udp"
```

> **Note:**
>
> If host IP mapping is not supported by a container engine, Compose rejects
> the Compose file and ignores the specified host IP.

#### Long syntax

The long form syntax lets you configure additional fields that can't be
expressed in the short form.

- `target`: The container port.
- `published`: The publicly exposed port. It is defined as a string and can be set as a range using syntax `start-end`. It means the actual port is assigned a remaining available port, within the set range.
- `host_ip`: The host IP mapping. If it is not set, it binds to all network interfaces (`0.0.0.0`).
- `protocol`: The port protocol (`tcp` or `udp`). Defaults to `tcp`.
- `app_protocol`: The application protocol (TCP/IP level 4 / OSI level 7) this port is used for. This is optional and can be used as a hint for Compose to offer richer behavior for protocols that it understands. Introduced in Docker Compose version 2.26.0.
- `mode`: Specifies how the port is published in a Swarm setup. If set to `host`, it publishes the port on every node in Swarm. If set to `ingress`, it allows load balancing across the nodes in Swarm. Defaults to `ingress`.
- `name`: A human-readable name for the port, used to document its usage within the service.

```yml
ports:
  - name: web
    target: 80
    host_ip: 127.0.0.1
    published: "8080"
    protocol: tcp
    app_protocol: http
    mode: host

  - name: web-secured
    target: 443
    host_ip: 127.0.0.1
    published: "8083-9000"
    protocol: tcp
    app_protocol: https
    mode: host
```

### `post_start`

`post_start` defines a sequence of lifecycle hooks to run after a container has started. The exact timing of when the command is run is not guaranteed.

- `command`: Specifies the command to run once the container starts. This attribute is required, and you can choose to use either the shell form or the exec form.
- `user`: The user to run the command. If not set, the command is run with the same user as the main service command.
- `privileged`: Lets the `post_start` command run with privileged access.
- `working_dir`: The working directory in which to run the command. If not set, it is run in the same working directory as the main service command.
- `environment`: Sets environment variables specifically for the `post_start` command. While the command inherits the environment variables defined for the service’s main command, this section lets you add new variables or override existing ones.

```yaml
services:
  test:
    post_start:
      - command: ./do_something_on_startup.sh
        user: root
        privileged: true
        environment:
          - FOO=BAR
```

For more information, see Use lifecycle hooks.
