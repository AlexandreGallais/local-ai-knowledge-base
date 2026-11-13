---
title: "NAME (part 2 of 2)"
tool: "podman"
version: "6.2"
source: "https://github.com/containers/podman/blob/055de046937d29450f310fce0fe3071485d8bed9/docs/source/markdown/podman-kube.unit.5.md.in"
commit: "055de046937d29450f310fce0fe3071485d8bed9"
license: "Apache-2.0"
---

# NAME (part 2 of 2)

### `PublishPort=[hostIP::]containerPort[/protocol]`
<< else >>
#### **--publish**, **-p**=*[hostIP::]containerPort[/protocol]*
<< endif >>

Publish a container's port, or range of ports,<<| within this pod>> to the host.

Both *hostPort* and *containerPort* can be specified as a range of ports.
When specifying ranges for both, the number of container ports in the
range must match the number of host ports in the range.

If *hostIP* is `0.0.0.0`, only IPv4 addresses will be bound, if set to `[::]` only
IPv6 addresses are bound. In all other cases the exact IP address as given will be bound.
If *hostIP* is not set at all, the port is bound on all IP addresses on the host,
both v4 and v6 (if possible).

The default *hostIP* can be configured in **containers.conf(5)**
using the `default_host_ips` option under the `[network]` section.
This option accepts an array to be able to set multiple bind IP addresses.
For example setting `default_host_ips = ["127.0.0.1", "::1"]` will make the
port be published on the ipv4 and ipv6 localhost address respectively.
An explicit *hostIP* set on the command will always override the config option.

By default, Podman publishes TCP ports. To publish a UDP port instead, give
`udp` as protocol. To publish both TCP and UDP ports, set `--publish` twice,
with `tcp`, and `udp` as protocols respectively. Rootful containers can also
publish ports using the `sctp` protocol.

Host port does not have to be specified (e.g. `podman run -p 127.0.0.1::80`).
If it is not, the container port is randomly assigned a port on the host.

Use **podman port** to see the actual mapping: `podman port $CONTAINER $CONTAINERPORT`.

Port publishing is only supported for containers utilizing their own network namespace
through `bridge` networks, or the `pasta` network mode.

For rootless bridge networks, port forwarding uses `rootlessport` by default, which
is a userspace proxy that does not preserve client source IPs. Setting
`rootless_port_forwarder="pasta"` in the `[network]` section of
**containers.conf(5)**
switches to pasta's kernel-level forwarding via `pesto`, preserving the original
client IP address inside the container. This option is experimental and its
behavior is subject to change.

### `SetWorkingDirectory=yaml`

Set the `WorkingDirectory` directive in the `[Service]` section of the systemd service unit file.
Used to allow `podman kube play` to correctly resolve relative paths.
Supported values are `yaml` and `unit` to set the working directory to that of the YAML file or Quadlet unit file, respectively.

Alternatively, users can explicitly set the `WorkingDirectory` directive in the `[Service]` section of the `.kube` file.
Please note that if the `WorkingDirectory` directive in the `[Service]` section is set,
Quadlet will not set it even if `SetWorkingDirectory` is set.

### `Yaml=path`

The path, absolute or relative to the location of the unit file, to the Kubernetes YAML file to use.

# EXAMPLES

Deploy from local YAML:

```
[Unit]
Description=A kubernetes yaml based service
Before=local-fs.target

[Kube]
Yaml=/opt/k8s/deployment.yml

[Install]
# Start by default on boot
WantedBy=multi-user.target default.target
```

# SEE ALSO

podman-kube-generate(1),
podman-kube-play(1),
podman-systemd.unit(5),
systemd.unit(5)
