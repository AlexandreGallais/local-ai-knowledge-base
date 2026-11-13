---
title: "podman create --userns=auto:size=65536 ubi8-init (part 3 of 11)"
tool: "podman"
version: "6.2"
source: "https://github.com/containers/podman/blob/055de046937d29450f310fce0fe3071485d8bed9/docs/source/markdown/podman-create.1.md.in"
commit: "055de046937d29450f310fce0fe3071485d8bed9"
license: "Apache-2.0"
---

# podman create --userns=auto:size=65536 ubi8-init (part 3 of 11)

### `AddDevice=host-device:container-device`
<< else >>
#### **--device**=*host-device:container-device*
<< endif >>

Add a host device to the <<container|pod>>. The format of this is
`HOST-DEVICE:CONTAINER-DEVICE`, where `HOST-DEVICE` is the path of
the device node on the host, `CONTAINER-DEVICE` is the path of the device node in
the container, and `PERMISSIONS` is a list of permissions combining 'r' for read,
'w' for write, and 'm' for mknod(2).

Example: **--device=/dev/sdc:/dev/xvdc:rwm**.

Note: if *host-device* is a symbolic link then it is resolved first.
The <<container|pod>> only stores the major and minor numbers of the host device.

Podman may load kernel modules required for using the specified
device. The devices that Podman loads modules for when necessary are:
/dev/fuse.

In rootless mode, the new device is bind mounted in the container from the host
rather than Podman creating it within the container space. Because the bind
mount retains its SELinux label on SELinux systems, the container can get
permission denied when accessing the mounted device. Modify SELinux settings to
allow containers to use all device labels via the following command:

$ sudo setsebool -P  container_use_devices=true

Note: if the user only has access rights via a group, accessing the device
from inside a rootless container fails. Use the `--group-add keep-groups`
flag to pass the user's supplementary group access into the container.

#### **--device-cgroup-rule**=*"type major:minor mode"*

Add a rule to the cgroup allowed devices list. The rule is expected to be
in the format specified in the Linux kernel documentation
admin-guide/cgroup-v1/devices:
- *type*: `a` (all), `c` (char), or `b` (block);
- *major* and *minor*: either a number, or `*` for all;
- *mode*: a composition of `r` (read), `w` (write), and `m` (mknod(2)).

#### **--device-read-bps**=*path:rate*

Limit read rate (in bytes per second) from a device (e.g. **--device-read-bps=/dev/sda:1mb**).

On some systems, changing the resource limits may not be allowed for non-root
users. For more details, see
https://github.com/containers/podman/blob/main/troubleshooting.md#26-running-containers-with-resource-limits-fails-with-a-permissions-error

This option is not supported on cgroups V1 rootless systems.

#### **--device-read-iops**=*path:rate*

Limit read rate (in IO operations per second) from a device (e.g. **--device-read-iops=/dev/sda:1000**).

On some systems, changing the resource limits may not be allowed for non-root
users. For more details, see
https://github.com/containers/podman/blob/main/troubleshooting.md#26-running-containers-with-resource-limits-fails-with-a-permissions-error

This option is not supported on cgroups V1 rootless systems.

#### **--device-write-bps**=*path:rate*

Limit write rate (in bytes per second) to a device (e.g. **--device-write-bps=/dev/sda:1mb**).

On some systems, changing the resource limits may not be allowed for non-root
users. For more details, see
https://github.com/containers/podman/blob/main/troubleshooting.md#26-running-containers-with-resource-limits-fails-with-a-permissions-error

This option is not supported on cgroups V1 rootless systems.

#### **--device-write-iops**=*path:rate*

Limit write rate (in IO operations per second) to a device (e.g. **--device-write-iops=/dev/sda:1000**).

On some systems, changing the resource limits may not be allowed for non-root
users. For more details, see
https://github.com/containers/podman/blob/main/troubleshooting.md#26-running-containers-with-resource-limits-fails-with-a-permissions-error

This option is not supported on cgroups V1 rootless systems.

#### **--disable-content-trust**

This is a Docker-specific option to disable image verification to a container
registry and is not supported by Podman. This option is a NOOP and provided
solely for scripting compatibility.

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

This option cannot be combined with **--network** that is set to **none** or **container:**_id_.

<< if is_quadlet >>
### `Entrypoint="command"`
<< else >>
#### **--entrypoint**=*"command"* | *'["command", "arg1", ...]'*
<< endif >>

Override the default ENTRYPOINT from the image.

The ENTRYPOINT of an image is similar to a COMMAND
because it specifies what executable to run when the container starts, but it is
(purposely) more difficult to override. The ENTRYPOINT gives a container its
default nature or behavior. When the ENTRYPOINT is set, the
container runs as if it were that binary, complete with default options. More options can be
passed in via the COMMAND. But, if a user wants to run
something else inside the container, the << '**Entrypoint=**' if is_quadlet else '**--entrypoint=**' >> option allows a new
ENTRYPOINT to be specified.

Specify multi option commands in the form of a JSON string.

<< if is_quadlet >>
### `Environment=env=value [env=value ...]`
<< else >>
#### **--env**, **-e**=*env*
<< endif >>

Set environment variables.

This option allows arbitrary environment variables that are available for the process to be launched inside of the container. If an environment variable is specified without a value, Podman checks the host environment for a value and set the variable only if it is set on the host. As a special case, if an environment variable ending in __*__ is specified without a value, Podman searches the host environment for variables starting with the prefix and adds those variables to the container.

See **Environment** note below for precedence and examples.

<< if is_quadlet >>
### `EnvironmentFile=file`
<< else >>
#### **--env-file**=*file*
<< endif >>

Read in a line-delimited file of environment variables.

See **Environment** note below for precedence and examples.

<< if is_quadlet >>
### `EnvironmentHost=`
<< else >>
#### **--env-host**
<< endif >>

Use host environment inside of the container. See **Environment** note below for precedence. (This option is not available with the remote Podman client, including Mac and Windows (excluding WSL2) machines)

#### **--env-merge**=*env*

Preprocess default environment variables for the containers. For example
if image contains environment variable `hello=world` user can preprocess
it using `--env-merge hello=${hello}-some` so new value is `hello=world-some`.

Please note that if the environment variable `hello` is not present in the image,
then it'll be replaced by an empty string and so using `--env-merge hello=${hello}-some`
would result in the new value of `hello=-some`, notice the leading `-` delimiter.

<< if is_quadlet >>
### `ExposeHostPort=port[/protocol]`
<< else >>
#### **--expose**=*port[/protocol]*
<< endif >>

Expose a port or a range of ports (e.g. << '**Expose=3300-3310**' if is_quadlet else '**--expose=3300-3310**' >>).
The protocol can be `tcp`, `udp` or `sctp` and if not given `tcp` is assumed.
This option matches the EXPOSE instruction for image builds and has no effect on
the actual networking rules unless **-P/--publish-all** is used to forward to all
exposed ports from random host ports. To forward specific ports from the host
into the container use the << '**PublishPort=**' if is_quadlet else '**-p/--publish**' >> option instead.

#### **--gpus**=*ENTRY*

Start the container with GPU support. Where `ENTRY` can be `all` to request all GPUs, or a vendor-specific identifier. Currently, NVIDIA and AMD devices are supported. If both NVIDIA and AMD devices are present, the NVIDIA devices will be preferred, and a CDI device name must be specified using the `--device` flag to request a set of GPUs from a *specific* vendor.

<< if is_quadlet >>
### `GroupAdd=group | keep-groups`
<< else >>
#### **--group-add**=*group* | *keep-groups*
<< endif >>

Assign additional groups to the primary user running within the container process.

- `keep-groups` is a special flag that tells Podman to keep the supplementary group access.

Allows container to use the user's supplementary group access. If file systems or
devices are only accessible by the rootless user's group, this flag tells the OCI
runtime to pass the group access into the container. Currently only available
with the `crun` OCI runtime. Note: `keep-groups` is exclusive, other groups cannot be specified
with this flag. (Not available for remote commands, including Mac and Windows (excluding WSL2) machines)

Note: `keep-groups` passes the supplementary groups that the *calling process*
already has into the container, it does not look the user's groups up at
container start. When Podman is started from a systemd user service, for example
a rootless Quadlet, the calling process is the `systemd --user` manager, which
only holds the groups the user had when that manager was started. Groups the user
is added to afterwards, for example with `usermod`, are therefore not passed into
the container. Restart the user's systemd manager to pick them up, for example
with `loginctl terminate-user <user>` followed by a new login, or by rebooting.

#### **--group-entry**=*ENTRY*

Customize the entry that is written to the `/etc/group` file within the container when `--user` is used.

The variables $GROUPNAME, $GID, and $USERLIST are automatically replaced with their value at runtime if present.

<< if is_quadlet >>
### `HealthCmd="command"`
<< else >>
#### **--health-cmd**=*"command"* | *'["command", "arg1", ...]'*
<< endif >>

Set or alter a healthcheck command for a container. The command is a command to be executed inside the
container that determines the container health. The command is required for other healthcheck options
to be applied. A value of **none** disables existing healthchecks.

Multiple options can be passed in the form of a JSON array; otherwise, the command is interpreted
as an argument to **/bin/sh -c**.

Note: The default values are used even if healthcheck is configured in the image.

<< if is_quadlet >>
### `HealthInterval=interval`
<< else >>
#### **--health-interval**=*interval*
<< endif >>

Set an interval for the healthchecks. An _interval_ of **disable** results in no automatic timer setup. The default is **30s**.

Note: This parameter will overwrite related healthcheck configuration from the image.

<< if is_quadlet >>
### `HealthLogDestination=directory_path`
<< else >>
#### **--health-log-destination**=*directory_path*
<< endif >>

Set the destination of the HealthCheck log. Directory path, local or events_logger (local use container state file) (Default: local)

* `local`: (default) HealthCheck logs are stored in overlay containers. (For example: `$runroot/healthcheck.log`)
* `directory`: creates a log file named `<container-ID>-healthcheck.log` with HealthCheck logs in the specified directory.
* `events_logger`: The log will be written with logging mechanism set by events_logger. It also saves the log to a default directory, for performance on a system with a large number of logs.

<< if is_quadlet >>
### `HealthMaxLogCount=number`
<< else >>
#### **--health-max-log-count**=*number of stored logs*
<< endif >>

Set maximum number of attempts in the HealthCheck log file. ('0' value means an infinite number of attempts in the log file) (Default: 5 attempts)

<< if is_quadlet >>
### `HealthMaxLogSize=size`
<< else >>
#### **--health-max-log-size**=*size of stored logs*
<< endif >>

Set maximum length in characters of stored HealthCheck log. ("0" value means an infinite log length) (Default: 500 characters)

<< if is_quadlet >>
### `HealthOnFailure=action`
<< else >>
#### **--health-on-failure**=*action*
<< endif >>

Action to take once the container transitions to an unhealthy state.  The default is **none**.

- **none**: Take no action.
- **kill**: Kill the container.
- **restart**: Restart the container.  Do not combine the `restart` action with the `--restart` flag.  When running inside of a systemd unit, consider using the `kill` or `stop` action instead to make use of systemd's restart policy.
- **stop**: Stop the container.

<< if is_quadlet >>
### `HealthRetries=retries`
<< else >>
#### **--health-retries**=*retries*
<< endif >>

The number of retries allowed before a healthcheck is considered to be unhealthy. The default value is **3**.

Note: This parameter can overwrite the healthcheck configuration from the image.

<< if is_quadlet >>
### `HealthStartInterval=interval`
<< else >>
#### **--health-start-interval**=*interval*
<< endif >>

This is an alias for `--health-startup-interval` option made for **Docker** compatibility.

<< if is_quadlet >>
### `HealthStartPeriod=period`
<< else >>
#### **--health-start-period**=*period*
<< endif >>

The initialization time needed for a container to bootstrap. The value can be expressed in time format like
**2m3s**. The default value is **0s**.

Note: The health check command is executed as soon as a container is started, if the health check is successful
the container's health state will be updated to `healthy`. However, if the health check fails, the health state will
stay as `starting` until either the health check is successful or until
the << '`HealthStartPeriod=`' if is_quadlet else '`--health-start-period`' >> time is over. If the
health check command fails after the << '`HealthStartPeriod=`' if is_quadlet else '`--health-start-period`' >>
time is over, the health state will be updated to `unhealthy`.
The health check command is executed periodically based on the value of
<< '`HealthInterval=`' if is_quadlet else '`--health-interval`' >>.

Note: This parameter will overwrite related healthcheck configuration from the image.

<< if is_quadlet >>
