---
title: "NAME (part 3 of 7)"
tool: "podman"
version: "6.2"
source: "https://github.com/containers/podman/blob/055de046937d29450f310fce0fe3071485d8bed9/docs/source/markdown/podman-container.unit.5.md.in"
commit: "055de046937d29450f310fce0fe3071485d8bed9"
license: "Apache-2.0"
---

# NAME (part 3 of 7)

### `HttpProxy=`
<< else >>
#### **--http-proxy**
<< endif>>

By default proxy environment variables are passed into the container if set
for the Podman process. This can be disabled by setting the value to **false**.
The environment variables passed in include **http_proxy**,
**https_proxy**, **ftp_proxy**, **no_proxy**, and also the upper case versions of
those. This option is only needed when the host system must use a proxy but
the container does not use any proxy. Proxy environment variables specified
for the container in any other way overrides the values that have
been passed through from the host. (Other ways to specify the proxy for the
container include passing the values with the **--env** flag, or hard coding the
proxy environment at container build time.)
When used with the remote client it uses the proxy environment variables
that are set on the server process.

The default for this option is taken from the `http_proxy` setting in the
`[containers]` table of containers.conf(5). If unset, that value defaults to
**true**.

### `Image=name`

The image to run in the container.
It is recommended to use a fully qualified image name rather than a short name, both for
performance and robustness reasons.

The format of the name is the same as when passed to `podman pull`. So, it supports using
`:tag` or digests to guarantee the specific image version.

Special Cases:

* If the `name` of the image ends with `.image`, Quadlet will use the image pulled by the corresponding `.image` file, and the generated systemd service contains a dependency on the `$name-image.service` (or the service name set in the .image file). Note that the corresponding `.image` file must exist.
* If the `name` of the image ends with `.build`, Quadlet will use the image built by the corresponding `.build` file, and the generated systemd service contains a dependency on the `$name-build.service`. Note: the corresponding `.build` file must exist.

<< if is_quadlet >>
### `ImageVolume=mode`
<< else >>
#### **--image-volume**=**anonymous** | *tmpfs* | *ignore*
<< endif >>

Tells Podman how to handle the builtin image volumes. Default is **anonymous**.

- **anonymous**: An anonymous named volume is created and mounted into the container.
- **tmpfs**: The volume is mounted onto the container as a tmpfs, which allows the users to create
content that disappears when the container is stopped.
- **ignore**: All volumes are just ignored and no action is taken.

In the past, a **bind** option was accepted as well. This is deprecated, and currently aliased to **anonymous**.

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
### `LogOpt=name=value`
<< else >>
#### **--log-opt**=*name=value*
<< endif >>

Logging driver specific options.

Set custom logging configuration. The following *name*s are supported:

**path**: specify a path to the log file
    (e.g. << '**LogOpt=path=/var/log/container/mycontainer.json**' if is_quadlet else '**--log-opt path=/var/log/container/mycontainer.json**' >>);

**max-size**: specify a max size of the log file
    (e.g. << '**LogOpt=max-size=10mb**' if is_quadlet else '**--log-opt max-size=10mb**' >>);

**tag**: specify a custom log tag for the container
    (e.g. << '**LogOpt=tag="{{.ImageName}}"**' if is_quadlet else '**--log-opt tag="{{.ImageName}}"**' >>.
It supports the same keys as **podman inspect --format**.
This option is currently supported only by the **journald** log driver.

**label**: specify a custom log label for the container
    (e.g. **--log-opt label="CONTAINER_IMAGE={{.ImageName}}"**.
It supports the same keys as **podman inspect --format**.
This option can be repeated multiple times.
This option is currently supported only by the **journald** log driver.

### `Mask=/path/1:/path/2`

Specify the paths to mask separated by a colon. `Mask=/path/1:/path/2`. A masked path cannot be accessed inside the container.

<< if is_quadlet >>
### `Memory=number[unit]`
<< else >>
#### **--memory**, **-m**=*number[unit]*
<< endif >>

Memory limit. A _unit_ can be **b** (bytes), **k** (kibibytes), **m** (mebibytes), or **g** (gibibytes).

Allows the memory available to a container to be constrained. If the host
supports swap memory, then the << '**Memory=**' if is_quadlet else '**--memory**' >> memory setting can be larger than physical
RAM. If a limit of 0 is specified (not using << '**Memory=**' if is_quadlet else '**--memory**' >>), the container's memory is
not limited. The actual limit may be rounded up to a multiple of the operating
system's page size (the value is very large, that's millions of trillions).

This option is not supported on cgroups V1 rootless systems.

<< if is_quadlet >>
