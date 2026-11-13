---
title: "podman-kube-play.1 (part 2 of 3)"
tool: "podman"
version: "6.2"
source: "https://github.com/containers/podman/blob/055de046937d29450f310fce0fe3071485d8bed9/docs/source/markdown/podman-kube-play.1.md.in"
commit: "055de046937d29450f310fce0fe3071485d8bed9"
license: "Apache-2.0"
---

# podman-kube-play.1 (part 2 of 3)

## OPTIONS

Note: For `podman kube play`, the `--annotation` flag adds Podman-specific annotations to the containers and pods created by Podman, not to the Kubernetes YAML itself. These annotations can be used to configure Podman-specific features like user namespaces (`io.podman.annotations.userns`), volumes-from (`io.podman.annotations.volumes-from`), and other container behaviors.

<< if is_quadlet >>
### `AuthFile=path`
<< else >>
#### **--authfile**=*path*
<< endif >>

Path of the authentication file. Default is `${XDG_RUNTIME_DIR}/containers/auth.json` on Linux, and `$HOME/.config/containers/auth.json` on Windows/macOS.
The file is created by **podman login**. If the authorization state is not found there, `$HOME/.docker/config.json` is checked, which is set using **docker login**.

Note: There is also the option to override the default path of the authentication file by setting the `REGISTRY_AUTH_FILE` environment variable. This can be done with **export REGISTRY_AUTH_FILE=_path_**.

#### **--build**

Build images even if they are found in the local storage. Use `--build=false` to completely disable builds. (This option is not available with the remote Podman client)

Note:  You  can also override the default isolation type by setting the BUILDAH_ISOLATION environment variable.  export BUILDAH_ISOLATION=oci. See podman-build.1.md for more information.

<< if is_quadlet >>
### `CertDir=path`
<< else >>
#### **--cert-dir**=*path*
<< endif >>

Use certificates at *path* (\*.crt, \*.cert, \*.key) to connect to the registry. (Default: /etc/containers/certs.d)
For details, see **containers-certs.d(5)**.
(This option is not available with the remote Podman client, including Mac and Windows (excluding WSL2) machines)

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

#### **--context-dir**=*path*

Use *path* as the build context directory for each image. Requires --build option be true. (This option is not available with the remote Podman client)

<< if is_quadlet >>
### `Creds=[username[:password]]`
<< else >>
#### **--creds**=*[username[:password]]*
<< endif >>

The [username[:password]] to use to authenticate with the registry, if required.
If one or both values are not supplied, a command line prompt appears and the
value can be entered. The password is entered without echo.

Note that the specified credentials are only used to authenticate against
target registries.  They are not used for mirrors or when the registry gets
rewritten (see `containers-registries.conf(5)`); to authenticate against those
consider using a `containers-auth.json(5)` file.

#### **--force**

Tear down the volumes linked to the PersistentVolumeClaims as part of --down

#### **--help**, **-h**

Print usage statement

#### **--ip**=*IP address*

Assign a static ip address to the pod. This option can be specified several times when kube play creates more than one pod.
Note: When joining multiple networks use the **--network name:ip=\<ip\>** syntax.

#### **--label**, **-l**=*key=value*

Add a label to the pods, persistent volume claims, and secrets created by `podman kube play`. This option can be set multiple times.

#### **--log-driver**=*driver*

Set logging driver for all created containers.

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

#### **--mac-address**=*MAC address*

Assign a static mac address to the pod. This option can be specified several times when kube play creates more than one pod.
Note: When joining multiple networks use the **--network name:mac=\<mac\>** syntax.

#### **--multiple-pods**

Only one Pod replica is created by default, despite the desired number of Pods in the Kubernetes Deployment resource. This setting overrides the default behavior, allowing the desired number of Pods to be created.

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

When no network option is specified and *host* network mode is not configured in the YAML file, a new network stack is created and pods are attached to it making possible pod to pod communication.

#### **--no-hostname**

Do not create the _/etc/hostname_ file in the containers.

By default, Podman manages the _/etc/hostname_ file, adding the container's own hostname.  When the **--no-hostname** option is set, the image's _/etc/hostname_ will be preserved unmodified if it exists.

#### **--no-hosts**

Do not modify the `/etc/hosts` file in the <<container|pod>>.

Podman assumes control over the <<container|pod>>'s `/etc/hosts` file by
default and adds entries for the container's name (see **--name** option) and
hostname (see **--hostname** option), the internal `host.containers.internal`
and `host.docker.internal` hosts, as well as any hostname added using the
**--add-host** option. Refer to the **--add-host** option for details. Passing
**--no-hosts** disables this, so that the image's `/etc/hosts` file is kept
unmodified. The same can be achieved globally by setting *no_hosts=true* in
`containers.conf`.

This option conflicts with host added in the Kubernetes YAML.

#### **--no-pod-prefix**

Do not prefix container name with pod name.

#### **--publish**=*[ip::]containerPort[/protocol]*

Define or override a port definition in the YAML file.

The lists of ports in the YAML file and the command line are merged. Matching is done by using the **containerPort** field.
If **containerPort** exists in both the YAML file and the option, the latter takes precedence.

In case this options is used with **--multiple-pods** option then number of published ports should be equal to the number of replicas in container spec, e.g. Deployment.spec.replicas is 3, then **--publish** is set to "8080:80,8081:80,8082:80"

#### **--publish-all**

Setting this option to `true` will expose all ports to the host,
even if only specified via **containerPort** in the K8 YAML.
In terms of which port will be exposed, **--publish** has higher priority than **hostPort**, has higher priority than
**containerPort**.

If set to `false` (which is the default), only ports defined via **hostPort**
or **--publish** are published on the host.

#### **--quiet**, **-q**

Suppress output information when pulling images

#### **--replace**

Tears down the pods created by a previous run of `kube play` and recreates the pods. This option is used to keep the existing pods up to date based upon the Kubernetes YAML.

#### **--seccomp-profile-root**=*path*

Directory path for seccomp profiles (default: "/var/lib/kubelet/seccomp"). (This option is not available with the remote Podman client, including Mac and Windows (excluding WSL2) machines)

#### **--start**

Start the pod after creating it, set to false to only create it.

<< if is_quadlet >>
