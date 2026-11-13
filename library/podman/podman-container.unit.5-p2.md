---
title: "NAME (part 2 of 7)"
tool: "podman"
version: "6.2"
source: "https://github.com/containers/podman/blob/055de046937d29450f310fce0fe3071485d8bed9/docs/source/markdown/podman-container.unit.5.md.in"
commit: "055de046937d29450f310fce0fe3071485d8bed9"
license: "Apache-2.0"
---

# NAME (part 2 of 7)

### `CgroupsMode=how`
<< else >>
#### **--cgroups**=*how*
<< endif >>

Determines whether the container creates cgroups.

<< if is_quadlet >>
By default, the cgroups mode of the container created by Quadlet is `split`,
which differs from the default (`enabled`) used by the Podman CLI.

If the container joins a pod (i.e. `Pod=` is specified), you may want to change this to
`no-conmon` or `enabled` so that pod level cgroup resource limits can take effect.
<< else >>
Default is **enabled**.
<< endif >>

The **enabled** option creates a new cgroup under the cgroup-parent.
The **disabled** option forces the container to not create cgroups, and thus conflicts with cgroup options (**--cgroupns** and **--cgroup-parent**).
The **no-conmon** option disables a new cgroup only for the **conmon** process.
The **split** option splits the current cgroup in two sub-cgroups: one for conmon and one for the container payload. It is not possible to set **--cgroup-parent** with **split**.

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

<< if is_quadlet >>
### `DropCapability=capability`
<< else >>
#### **--cap-drop**=*capability*
<< endif >>

Drop these capabilities from the default podman capability set, or `all` to drop all capabilities.

This is a space separated list of capabilities.

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

<< if is_quadlet >>
### `EnvironmentFile=file`
<< else >>
#### **--env-file**=*file*
<< endif >>

Read in a line-delimited file of environment variables.

<< if is_quadlet >>
### `EnvironmentHost=`
<< else >>
#### **--env-host**
<< endif >>

Use host environment inside of the container. See **Environment** note below for precedence. (This option is not available with the remote Podman client, including Mac and Windows (excluding WSL2) machines)

### `Exec=command`

Additional arguments for the container; this has exactly the same effect as passing
more arguments after a `podman run <image> <arguments>` invocation.

The format is the same as for systemd command lines,
However, unlike the similarly named systemd `ExecStart=` directive
which operates on the ambient root filesystem, it is very common for container
images to have their own `ENTRYPOINT` or `CMD` metadata which this interacts with.

The default expectation for many images is that the image will include an `ENTRYPOINT`
with a default binary, and this field will add arguments to that entrypoint.

Another way to describe this is that it works the same way as the args field in a Kubernetes pod.

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

### `GlobalArgs=`

This key contains a list of arguments passed directly after the `podman` command in the generated
file. It can be used to access Podman features otherwise unsupported by the generator. Since the
generator is unaware of what unexpected interactions can be caused by these arguments, it is not
recommended to use this option.

The format of this is a space separated list of arguments, which can optionally be individually
escaped to allow inclusion of whitespace and other control characters.

This key can be listed multiple times.

### `Group=gid`

The (numeric) GID to run as inside the container. This does not need to match the GID on the host,
which can be modified with `UserNS`, but if that is not specified, this GID is also used on the host.

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

<< if is_quadlet >>
