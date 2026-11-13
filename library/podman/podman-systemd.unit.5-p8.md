---
title: "Restart service when sleep finishes (part 8 of 11)"
tool: "podman"
version: "6.2"
source: "https://github.com/containers/podman/blob/055de046937d29450f310fce0fe3071485d8bed9/docs/source/markdown/podman-systemd.unit.5.md"
commit: "055de046937d29450f310fce0fe3071485d8bed9"
license: "Apache-2.0"
---

# Restart service when sleep finishes (part 8 of 11)

## Network units [Network]

Network files are named with a `.network` extension and contain a section `[Network]` describing the
named Podman network. The generated service is a one-time command that ensures that the network
exists on the host, creating it if needed.

By default, the Podman network has the same name as the unit, but with a `systemd-` prefix, i.e. for
a network file named `$NAME.network`, the generated Podman network is called `systemd-$NAME`, and
the generated service file is `$NAME-network.service`. The `NetworkName` option allows for
overriding this default name with a user-provided one.

In order to update the network parameters you will first need to manually remove the podman network and then restart the service.
Set `NetworkDeleteOnStop=true` to override the behavior and delete the network when the device is stopped.

Using network units allows containers to depend on networks being automatically pre-created. This is
particularly interesting when using special options to control network creation, as Podman otherwise creates networks with the default options.

Valid options for `[Network]` are listed below:

| **[Network] options**               | **podman network create equivalent**                            |
|-------------------------------------|-----------------------------------------------------------------|
| ContainersConfModule=/etc/nvd\.conf | --module=/etc/nvd\.conf                                         |
| DisableDNS=true                     | --disable-dns                                                   |
| DNS=192.168.55.1                    | --dns=192.168.55.1                                              |
| Driver=bridge                       | --driver bridge                                                 |
| Gateway=192.168.55.3                | --gateway 192.168.55.3                                          |
| GlobalArgs=--log-level=debug        | --log-level=debug                                               |
| InterfaceName=enp1                  | --interface-name enp1                                           |
| Internal=true                       | --internal                                                      |
| IPAMDriver=dhcp                     | --ipam-driver dhcp                                              |
| IPRange=192.168.55.128/25           | --ip-range 192.168.55.128/25                                    |
| IPv6=true                           | --ipv6                                                          |
| Label="XYZ"                         | --label "XYZ"                                                   |
| NetworkDeleteOnStop=true            | Add ExecStopPost to delete the network when the unit is stopped |
| NetworkName=foo                     | podman network create foo                                       |
| Options=isolate=true                | --opt isolate=true                                              |
| PodmanArgs=--dns=192.168.55.1       | --dns=192.168.55.1                                              |
| ServiceName=name                    | Name the systemd unit `name.service`                            |
| Subnet=192.5.0.0/16                 | --subnet 192.5.0.0/16                                           |

Supported keys in `[Network]` section are:

### `ContainersConfModule=`

Load the specified containers.conf(5) module. Equivalent to the Podman `--module` option.

This key can be listed multiple times.

### `DisableDNS=` (defaults to `false`)

If enabled, disables the DNS plugin for this network.

This is equivalent to the Podman `--disable-dns` option

### `DNS=`

Set network-scoped DNS resolver/nameserver for containers in this network.

This key can be listed multiple times.

### `Driver=` (defaults to `bridge`)

Driver to manage the network. Currently `bridge`, `macvlan` and `ipvlan` are supported.

This is equivalent to the Podman `--driver` option

### `Gateway=`

Define a gateway for the subnet. If you want to provide a gateway address, you must also provide a subnet option.

This is equivalent to the Podman `--gateway` option

This key can be listed multiple times.

### `GlobalArgs=`

This key contains a list of arguments passed directly between `podman` and `network`
in the generated file. It can be used to access Podman features otherwise unsupported by the generator. Since the generator is unaware
of what unexpected interactions can be caused by these arguments, it is not recommended to use
this option.

The format of this is a space separated list of arguments, which can optionally be individually
escaped to allow inclusion of whitespace and other control characters.

This key can be listed multiple times.

### `InterfaceName=`

This option maps the *network_interface* option in the network config, see **podman network inspect**.
Depending on the driver, this can have different effects; for `bridge`, it uses the bridge interface name.
For `macvlan` and `ipvlan`, it is the parent device on the host. It is the same as `--opt parent=...`.

This is equivalent to the Podman `--interface-name` option.

### `Internal=` (defaults to `false`)

Restrict external access of this network.

This is equivalent to the Podman `--internal` option

### `IPAMDriver=`

Set the ipam driver (IP Address Management Driver) for the network. Currently `host-local`, `dhcp` and `none` are supported.

This is equivalent to the Podman `--ipam-driver` option

### `IPRange=`

Allocate container IP from a range. The range must be a either a complete subnet in CIDR notation or be
in the `<startIP>-<endIP>` syntax which allows for a more flexible range compared to the CIDR subnet.
The ip-range option must be used with a subnet option.

This is equivalent to the Podman `--ip-range` option

This key can be listed multiple times.

### `IPv6=`

Enable IPv6 (Dual Stack) networking.

This is equivalent to the Podman `--ipv6` option

### `Label=`

Set one or more OCI labels on the network. The format is a list of
`key=value` items, similar to `Environment`.

This key can be listed multiple times.

### `NetworkDeleteOnStop=` (defaults to `false`)

When set to `true` the network is deleted when the service is stopped

### `NetworkName=`

The (optional) name of the Podman network.
If this is not specified, the default value is the same name as the unit, but with a `systemd-` prefix,
i.e. a `$name.network` file creates a `systemd-$name` Podman network to avoid
conflicts with user-managed network.

### `Options=`

Set driver specific options.

This is equivalent to the Podman `--opt` option

### `PodmanArgs=`

This key contains a list of arguments passed directly to the end of the `podman network create` command
in the generated file (right before the name of the network in the command line). It can be used to
access Podman features otherwise unsupported by the generator. Since the generator is unaware
of what unexpected interactions can be caused by these arguments, is not recommended to use
this option.

The format of this is a space separated list of arguments, which can optionally be individually
escaped to allow inclusion of whitespace and other control characters.

This key can be listed multiple times.

### `ServiceName=`

By default, Quadlet will name the systemd service unit by appending `-network` to the name of the Quadlet.
Setting this key overrides this behavior by instructing Quadlet to use the provided name.

Note, the name should not include the `.service` file extension

### `Subnet=`

The subnet in CIDR notation.

This is equivalent to the Podman `--subnet` option

This key can be listed multiple times.

## Volume units [Volume]

Volume files are named with a `.volume` extension and contain a section `[Volume]` describing the
named Podman volume. The generated service is a one-time command that ensures that the volume
exists on the host, creating it if needed. Unlike `.network`, `.image`, and `.artifact` oneshot units,
the generated service for `.volume` units does not set `RemainAfterExit=yes` by default.

By default, the Podman volume has the same name as the unit, but with a `systemd-` prefix, i.e. for
a volume file named `$NAME.volume`, the generated Podman volume is called `systemd-$NAME`, and the
generated service file is `$NAME-volume.service`. The `VolumeName` option allows for overriding this
default name with a user-provided one.

Using volume units allows containers to depend on volumes being automatically pre-created. This is
particularly interesting when using special options to control volume creation,
as Podman otherwise creates volumes with the default options.

Valid options for `[Volume]` are listed below:

| **[Volume] options**                | **podman volume create equivalent**       |
|-------------------------------------|-------------------------------------------|
| ContainersConfModule=/etc/nvd\.conf | --module=/etc/nvd\.conf                   |
| Copy=true                           | --opt copy                                |
| Device=tmpfs                        | --opt device=tmpfs                        |
| Driver=image                        | --driver=image                            |
| GID=5678                            | --gid 5678                                |
| GlobalArgs=--log-level=debug        | --log-level=debug                         |
| Group=192                           | --opt "o=group=192"                       |
| Image=quay.io/centos/centos\:latest | --opt image=quay.io/centos/centos\:latest |
| Label="foo=bar"                     | --label "foo=bar"                         |
| Options=XYZ                         | --opt "o=XYZ"                             |
| PodmanArgs=--driver=image           | --driver=image                            |
| ServiceName=name                    | Name the systemd unit `name.service`      |
| Type=type                           | Filesystem type of Device                 |
| UID=1234                            | --uid 1234                                |
| User=123                            | --opt "o=uid=123"                         |
| VolumeName=foo                      | podman volume create foo                  |

Supported keys in `[Volume]` section are:

### `ContainersConfModule=`

Load the specified containers.conf(5) module. Equivalent to the Podman `--module` option.

This key can be listed multiple times.

### `Copy=` (default to `true`)

If enabled, the content of the image located at the mountpoint of the volume is copied into the
volume on the first run.

### `Device=`

The path of a device which is mounted for the volume.

### `Driver=`

Specify the volume driver name. When set to `image`, the `Image` key must also be set.

This is equivalent to the Podman `--driver` option.

### `GID=`

The GID that the volume will be created as. Differently than `Group=`, the specified value is not passed to the mount operation. The specified GID will own the volume's mount point directory and affects the volume chown operation.

### `GlobalArgs=`

This key contains a list of arguments passed directly between `podman` and `volume`
in the generated file. It can be used to access Podman features otherwise unsupported by the generator. Since the generator is unaware
of what unexpected interactions can be caused by these arguments, it is not recommended to use
this option.

The format of this is a space separated list of arguments, which can optionally be individually
escaped to allow inclusion of whitespace and other control characters.

This key can be listed multiple times.

### `Group=`

The host (numeric) GID, or group name to use as the group for the volume. Differently than `GID`, the specified value is passed to the mount operation.

### `Image=`

Specifies the image the volume is based on when `Driver` is set to the `image`.
It is recommended to use a fully qualified image name rather than a short name, both for
performance and robustness reasons.

The format of the name is the same as when passed to `podman pull`. So, it supports using
`:tag` or digests to guarantee the specific image version.

Special case:

* If the `name` of the image ends with `.image`, Quadlet will use the image
pulled by the corresponding `.image` file, and the generated systemd service contains a dependency on the `$name-image.service` (or the service name set in the .image file). Note: the corresponding `.image` file must exist.

### `Label=`

Set one or more OCI labels on the volume. The format is a list of
`key=value` items, similar to `Environment`.

This key can be listed multiple times.

### `Options=`

The mount options to use for a filesystem as used by the **mount(8)** command `-o` option.

### `PodmanArgs=`

This key contains a list of arguments passed directly to the end of the `podman volume create` command
in the generated file (right before the name of the volume in the command line). It can be used to
access Podman features otherwise unsupported by the generator. Since the generator is unaware
of what unexpected interactions can be caused by these arguments, is not recommended to use
this option.

The format of this is a space separated list of arguments, which can optionally be individually
escaped to allow inclusion of whitespace and other control characters.

This key can be listed multiple times.

### `ServiceName=`

By default, Quadlet will name the systemd service unit by appending `-volume` to the name of the Quadlet.
Setting this key overrides this behavior by instructing Quadlet to use the provided name.

Note, the name should not include the `.service` file extension

### `Type=`

The filesystem type of `Device` as used by the **mount(8)** commands `-t` option.

### `UID=`

The UID that the volume will be created as. Differently than `User`, the specified value is not passed to the mount operation. The specified UID will own the volume's mount point directory and affects the volume chown operation.

### `User=`

The host (numeric) UID, or user name to use as the owner for the volume. Differently than `UID`, the specified value is passed to the mount operation.

### `VolumeName=`

The (optional) name of the Podman volume.
If this is not specified, the default value is the same name as the unit, but with a `systemd-` prefix,
i.e. a `$name.volume` file creates a `systemd-$name` Podman volume to avoid
conflicts with user-managed volumes.
