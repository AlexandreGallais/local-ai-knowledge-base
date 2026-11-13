---
title: "podman create --userns=auto:size=65536 ubi8-init (part 4 of 11)"
tool: "podman"
version: "6.2"
source: "https://github.com/containers/podman/blob/055de046937d29450f310fce0fe3071485d8bed9/docs/source/markdown/podman-create.1.md.in"
commit: "055de046937d29450f310fce0fe3071485d8bed9"
license: "Apache-2.0"
---

# podman create --userns=auto:size=65536 ubi8-init (part 4 of 11)

### `HealthStartupCmd="command"`
<< else >>
#### **--health-startup-cmd**=*"command"* | *'["command", "arg1", ...]'*
<< endif >>

Set a startup healthcheck command for a container. This command is executed inside the container and is used to gate the regular
healthcheck. When the startup command succeeds, the regular healthcheck begins and the startup healthcheck ceases. Optionally,
if the command fails a set number of times, the container is restarted. A startup healthcheck can be used to ensure that
containers with an extended startup period are not marked as unhealthy until they are fully started. Startup healthchecks can only be
used when a regular healthcheck (from the container's image or the
<< '`HealthCmd=`' if is_quadlet else '`--health-cmd` ' >> option) is also set.
If << '`HealthCmd=`' if is_quadlet else '`--health-cmd` ' >> option was set, but << '`HealthStartupCmd=`' if is_quadlet else '`--health-startup-cmd` ' >> one was missed, then value of << '`HealthCmd=`' if is_quadlet else '`--health-cmd` ' >> option is used for startup health check.

<< if is_quadlet >>
### `HealthStartupInterval=interval`
<< else >>
#### **--health-startup-interval**=*interval*
<< endif >>

Set an interval for the startup healthcheck. An _interval_ of **0s** results in no automatic timer setup. The default is **0s**.

<< if is_quadlet >>
### `HealthStartupRetries=retries`
<< else >>
#### **--health-startup-retries**=*retries*
<< endif >>

The number of attempts allowed before the startup healthcheck restarts the container. If set to **0**, the container is never restarted. The default is **0**.

<< if is_quadlet >>
### `HealthStartupSuccess=retries`
<< else >>
#### **--health-startup-success**=*retries*
<< endif >>

The number of successful runs required before the startup healthcheck succeeds and the regular healthcheck begins. A value
of **0** means that any success begins the regular healthcheck. The default is **0**.

<< if is_quadlet >>
### `HealthStartupTimeout=timeout`
<< else >>
#### **--health-startup-timeout**=*timeout*
<< endif >>

The maximum time a startup healthcheck command has to complete before it is marked as failed. The value can be expressed in a time
format like **2m3s**. The default value is **30s**.

<< if is_quadlet >>
### `HealthTimeout=timeout`
<< else >>
#### **--health-timeout**=*timeout*
<< endif >>

The maximum time allowed to complete the healthcheck before an interval is considered failed. Like start-period, the
value can be expressed in a time format such as **1m22s**. The default value is **30s**.

Note: A timeout marks the healthcheck as failed. If the healthcheck command itself runs longer than the specified *timeout*,
it will be sent a `SIGKILL` signal.

Note: This parameter will overwrite related healthcheck configuration from the image.

#### **--help**

Print usage statement

#### **--hosts-file**=*path* | *none* | *image*

Base file to create the `/etc/hosts` file inside the container. This must either
be an absolute path to a file on the host system, or one of the following
special flags:
  ""      Follow the `base_hosts_file` configuration in _containers.conf_ (the default)
  `none`  Do not use a base file (i.e. start with an empty file)
  `image` Use the container image's `/etc/hosts` file as base file

#### **--hostuser**=*name*

Add a user account to /etc/passwd from the host to the container. The Username
or UID must exist on the host system.

<< if is_quadlet >>
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
### `RunInit=`
<< else >>
#### **--init**
<< endif >>

Run an init inside the container that forwards signals and reaps processes.
The container-init binary is mounted at `/run/podman-init`.
Mounting over `/run` breaks container execution.

#### **--init-ctr**=*type*

(Pods only).
When using pods, create an init style container, which is run after the infra container is started
but before regular pod containers are started.  Init containers are useful for running
setup operations for the pod's applications.

Valid values for `init-ctr` type are *always* or *once*.  The *always* value
means the container runs with each and every `pod start`, whereas the *once*
value means the container only runs once when the pod is started and then the container is removed.

Init containers are only run on pod `start`.  Restarting a pod does not execute
any init containers.  Furthermore, init containers can only be created in a
pod when that pod is not running.

#### **--init-path**=*path*

Path to the container-init binary.

#### **--interactive**, **-i**

When set to **true**, make stdin available to the contained process. If **false**, the stdin of the contained process is empty and immediately closed.

If attached, stdin is piped to the contained process. If detached, reading stdin will block until later attached.

**Caveat:** Podman will consume input from stdin as soon as it becomes available, even if the contained process doesn't request it.

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

#### **--ipc**=*ipc*

Set the IPC namespace mode for a container. The default is to create
a private IPC namespace.

- "": Use Podman's default, defined in containers.conf.
- **container:**_id_: reuses another container's shared memory, semaphores, and message queues
- **host**: use the host's shared memory, semaphores, and message queues inside the container. Note: the host mode gives the container full access to local shared memory and is therefore considered insecure.
- **none**:  private IPC namespace, with /dev/shm not mounted.
- **ns:**_path_: path to an IPC namespace to join.
- **private**: private IPC namespace.
- **shareable**: private IPC namespace with a possibility to share it with other containers.

<< if is_quadlet >>
### `Label=key=value [key=value ...]`
<< else >>
#### **--label**, **-l**=*key=value*
<< endif >>

Add metadata to a <<container|pod>>.

#### **--label-file**=*file*

Read in a line-delimited file of labels.

#### **--link-local-ip**=*ip*

Not implemented.

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

#### **--mac-address**=*address*

<<Container|Pod>> network interface MAC address (e.g. 92:d0:c6:0a:29:33)
This option can only be used if the <<container|pod>> is joined to only a single network - i.e., **--network=_network-name_** is used at most once -
and if the <<container|pod>> is not joining another container's network namespace via **--network=container:_id_**.

Remember that the MAC address in an Ethernet network must be unique.
The IPv6 link-local address is based on the device's MAC address
according to RFC4862.

To specify multiple static MAC addresses per <<container|pod>>, set multiple networks using the **--network** option with a static MAC address specified for each using the `mac` mode for that option.

<< if is_quadlet >>
