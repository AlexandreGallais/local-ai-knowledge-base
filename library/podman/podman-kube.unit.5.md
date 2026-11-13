---
title: "NAME (part 1 of 2)"
tool: "podman"
version: "6.2"
source: "https://github.com/containers/podman/blob/055de046937d29450f310fce0fe3071485d8bed9/docs/source/markdown/podman-kube.unit.5.md.in"
commit: "055de046937d29450f310fce0fe3071485d8bed9"
license: "Apache-2.0"
---

% podman-kube.unit 5

# NAME

podman\-kube.unit - systemd unit files for managing Podman Kubernetes YAML deployments using Quadlet

# SYNOPSIS

*name*.kube

# DESCRIPTION

Kube units are named with a `.kube` extension and contain a `[Kube]` section describing
how `podman kube play` runs as a service. The resulting service file contains a line like
`ExecStart=podman kube play … file.yml`, and most of the keys in this section control the command-line
options passed to Podman. However, some options also affect the details of how systemd is set up to run and
interact with the container.

There is only one required key, `Yaml`, which defines the path to the Kubernetes YAML file.

# USAGE SUMMARY

The `.kube` file is parsed by the `podman-system-generator` at boot or reload, generating a systemd
`.service` that runs `podman kube play`. That service can be managed like any other unit:

```bash
systemctl --user start name.service
```

# OPTIONS

Valid options for `[Kube]` are listed below:

| **[Kube] options**                  | **podman kube play equivalent**                                  |
| ------------------------------------| -----------------------------------------------------------------|
| AutoUpdate=registry                 | --annotation "io.containers.autoupdate=registry"                 |
| ConfigMap=/tmp/config.map           | --configmap /tmp/config.map                                      |
| ContainersConfModule=/etc/nvd\.conf | --module=/etc/nvd\.conf                                          |
| ExitCodePropagation=how             | How to propagate container error status                          |
| GlobalArgs=--log-level=debug        | --log-level=debug                                                |
| KubeDownForce=true                  | --force (for `podman kube down`)                                 |
| LogDriver=journald                  | --log-driver journald                                            |
| Network=host                        | --network host                                                   |
| PodmanArgs=\-\-annotation=key=value | --annotation=key=value                                           |
| PublishPort=8080:80                 | --publish 8080:80                                                |
| SetWorkingDirectory=yaml            | Set `WorkingDirectory` of unit file to location of the YAML file |
| UserNS=keep-id:uid=200,gid=210      | --userns keep-id:uid=200,gid=210                                 |
| Yaml=/tmp/kube.yaml                 | podman kube play /tmp/kube.yaml                                  |

Supported keys in the `[Kube]` section are:

### `AutoUpdate=`

Indicates whether pods and containers from this Kubernetes workload are auto-updated (podman-auto-update(1)). `AutoUpdate` can be specified multiple times. The following values are supported:

* `registry`: Requires a fully-qualified image reference (e.g., quay.io/podman/stable:latest) to be used to create the container. This enforcement is necessary to know which images to actually check and pull. If an image ID was used, Podman does not know which image to check/pull anymore.

* `local`: Tells Podman to compare the image a container is using to the image with its raw name in local storage. If an image is updated locally, Podman simply restarts the systemd unit executing the Kubernetes Quadlet.

* `name/(local|registry)`: Tells Podman to perform the `local` or `registry` auto-update on the specified container name.

<< if is_quadlet >>
### `ConfigMap=path`
<< else >>
#### **--configmap**=*path*
<< endif >>

Use the Kubernetes ConfigMap YAML as the *path* to provide environment variable values within the containers of the pod.  (This option is not available with the remote Podman client)

<< if is_quadlet >>
The value may contain only one path but it may be absolute or relative to the location of the unit file.
<< else >>
Note: The **--configmap** option can be used multiple times, or a comma-separated list of paths can be used to pass multiple Kubernetes ConfigMap YAMLs.
The YAML file may be in a multi-doc YAML format. But, it must contain only ConfigMaps.
<< endif >>

<< if is_quadlet >>
### `ContainersConfModule=module`
<< else >>
#### **--module**=*module*
<< endif >>

Load the specified containers.conf(5) module.

This option can be listed multiple times.

### `ExitCodePropagation=how`

Control how the main PID of the systemd service should exit. The following values are supported:
- `all`: exit non-zero if all containers have failed (i.e., exited non-zero)
- `any`: exit non-zero if any container has failed
- `none`: exit zero and ignore failed containers

The current default value is `none`.

### `GlobalArgs=`

This key contains a list of arguments passed directly after the `podman` command in the generated
file. It can be used to access Podman features otherwise unsupported by the generator. Since the
generator is unaware of what unexpected interactions can be caused by these arguments, it is not
recommended to use this option.

The format of this is a space separated list of arguments, which can optionally be individually
escaped to allow inclusion of whitespace and other control characters.

This key can be listed multiple times.

### `KubeDownForce=true`

Remove all resources, including volumes, when calling `podman kube down`.
Equivalent to the Podman `--force` option.

<< if is_quadlet >>
### `LogDriver=driver`
<< else >>
#### **--log-driver**=*driver*
<< endif >>

Logging driver for the container. Currently available options are **k8s-file**, **journald**, **none**, **passthrough** and **passthrough-tty**, with **json-file** aliased to **k8s-file** for scripting compatibility. (Default **journald**).

The podman info command below displays the default log-driver for the system.
```
$ podman info --format '{{ .Host.LogDriver }}'
journald
```
The **passthrough** driver passes down the standard streams (stdin, stdout, stderr) to the
container.  It is not allowed with the remote Podman client, including Mac and Windows (excluding WSL2) machines, and on a tty, since it is
vulnerable to attacks via TIOCSTI.

The **passthrough-tty** driver is the same as **passthrough** except that it also allows it to be used on a TTY if the user really wants it.

<< if is_quadlet >>
### `Network=mode`
<< else >>
#### **--network**=*mode*, **--net**
<< endif >>

Set the network mode for the <<container|pod>>.

<< if is_quadlet >>
Special cases:

* If the `name` of the network ends with `.network`, a Podman network called
`systemd-$name` is used, and the generated systemd service contains
a dependency on the `$name-network.service`. Such a network can be automatically
created by using a `$name.network` Quadlet file. Note: the corresponding `.network` file must exist.

* If the `name` ends with `.container`,
the container will reuse the network stack of another container created by `$name.container`.
The generated systemd service contains a dependency on `$name.service`. Note: the corresponding `.container` file must exist.
<< endif >>

Valid _mode_ values are:

- **bridge[:OPTIONS,...]**: Create a network stack on the default bridge. This is the default for rootful containers. It is possible to specify these additional options:
    - **alias=**_name_: Add network-scoped alias for the container.
    - **ip=**_IPv4_: Specify a static IPv4 address for this container.
    - **ip6=**_IPv6_: Specify a static IPv6 address for this container.
    - **mac=**_MAC_: Specify a static MAC address for this container.
    - **interface_name=**_name_: Specify a name for the created network interface inside the container.
    - **host_interface_name=**_name_: Specify a name for the created network interface outside the container.

    Any other options will be passed through to netavark without validation. This can be useful to pass arguments to netavark plugins.

    For rootless bridge networks, port forwarding uses `rootlessport` by default. Setting `rootless_port_forwarder="pasta"` in the `[network]` section of **containers.conf(5)** switches to pasta's kernel-level forwarding (via `pesto`), which preserves the original client source IP address inside the container. This option is experimental and its behavior is subject to change.

    For example, to set a static IPv4 address and a static mac address, use `--network bridge:ip=10.88.0.10,mac=44:33:22:11:00:99`.

- _\<network name or ID\>_**[:OPTIONS,...]**: Connect to a user-defined network; this is the network name or ID from a network created by **podman network create**. It is possible to specify the same options described under the bridge mode above. Use the **--network** option multiple times to specify additional networks. \
  For backwards compatibility it is also possible to specify comma-separated networks on the first **--network** argument, however this prevents you from using the options described under the bridge section above.

- **none**: Create a network namespace for the container but do not configure network interfaces for it, thus the container has no network connectivity.

- **container:**_id_: Reuse another container's network stack.

- **host**: Use the host's network namespace for the container instead of creating an isolated namespace. Warning: This gives the container full access to abstract Unix domain sockets and to TCP/UDP sockets bound to localhost. Since these mechanisms are often used to prevent access to sensitive system services, isolating them from access by external entities, use of this option may be considered a security vulnerability.

- **ns:**_path_: Path to a network namespace to join.

- **private**: Create a new namespace for the container. This uses the **bridge** mode for rootful containers and **pasta** for rootless ones.

- **pasta[:OPTIONS,...]**: use **pasta**(1) to create a user-mode networking
    stack. \
    This is the default for rootless containers and only supported in rootless mode. \
    By default, IPv4 and IPv6 addresses and routes, as well as the pod interface
    name, are copied from the host. Port forwarding preserves the original
    source IP address. Options described in pasta(1) can be specified as
    comma-separated arguments. \
    In terms of pasta(1) options, **--config-net** is given by default, in
    order to configure networking when the container is started, and
    **--no-map-gw** is also assumed by default, to avoid direct access from
    container to host using the gateway address. The latter can be overridden
    by passing **--map-gw** in the pasta-specific options (despite not being an
    actual pasta(1) option). \
    For better integration with DNS handling, **--dns-forward 169.254.1.1** is passed by default,
    and this address is added to resolv.conf(5) as first resolver. It is possible to pass
    **--dns-forward** explicitly in case a different IP address should be used. \
    To make the `host.containers.internal` /etc/hosts entry work and allow connections
    to the host, **--map-guest-addr 169.254.1.2** is passed by default. Again, it can be set
    explicitly to choose a different IP address. \
    Also, **-t none** and **-u none** are passed if, respectively, no TCP or
    UDP port forwarding from host to container is configured (via Podman's
    **--publish** or by passing the pasta **-t**/**-u** options directly),
    to disable automatic port forwarding based on bound ports. Similarly, **-T none**
    and **-U none** are given to disable the same functionality from container to
    host. \
    All options can also be set in **containers.conf(5)**;
    see the `pasta_options` key under the network section in that file. \
    Some examples:
    - **pasta:--map-gw**: Allow the container to directly reach the host using the
        gateway address.
    - **pasta:--mtu,1500**: Specify a 1500 bytes MTU for the _tap_ interface in
        the container.
    - **pasta:--ipv4-only,-a,10.0.2.0,-n,24,-g,10.0.2.2,--dns-forward,10.0.2.3,-m,1500,--no-ndp,--no-dhcpv6,--no-dhcp**:
        disable IPv6, assign `10.0.2.0/24` to the `tap0` interface in the container,
        with gateway `10.0.2.3`, enable DNS forwarder reachable at `10.0.2.3`,
        set MTU to 1500 bytes, disable NDP, DHCPv6 and DHCP support.
    - **pasta:-I,tap0,--ipv4-only,-a,10.0.2.0,-n,24,-g,10.0.2.2,--dns-forward,10.0.2.3,--no-ndp,--no-dhcpv6,--no-dhcp**:
        same as above, but leave the MTU to 65520 bytes
    - **pasta:-t,auto,-u,auto,-T,auto,-U,auto**: enable automatic port forwarding
        based on observed bound ports from both host and container sides
    - **pasta:-T,5201**: enable forwarding of TCP port 5201 from container to
        host, using the loopback interface instead of the tap interface for improved
        performance

### `PodmanArgs=`

This key contains a list of arguments passed directly to the end of the `podman` command
in the generated file. It can be used to access Podman features otherwise unsupported
by the generator. Since the generator is unaware of what unexpected interactions can be
caused by these arguments, it is not recommended to use this option.

The format of this is a space separated list of arguments, which can optionally be individually
escaped to allow inclusion of whitespace and other control characters.

This key can be listed multiple times.

<< if is_quadlet >>
