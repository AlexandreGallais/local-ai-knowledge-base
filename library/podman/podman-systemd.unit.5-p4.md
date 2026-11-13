---
title: "Restart service when sleep finishes (part 4 of 11)"
tool: "podman"
version: "6.2"
source: "https://github.com/containers/podman/blob/055de046937d29450f310fce0fe3071485d8bed9/docs/source/markdown/podman-systemd.unit.5.md"
commit: "055de046937d29450f310fce0fe3071485d8bed9"
license: "Apache-2.0"
---

# Restart service when sleep finishes (part 4 of 11)

### `GlobalArgs=`

This key <example-value> a list of arguments passed directly between `podman` and `run`
in the generated file. It can be used to access Podman features otherwise unsupported by the generator. Since the generator is unaware
of what unexpected interactions can be caused by these arguments, it is not recommended to use
this option.

The format of this is a space separated list of arguments, which can optionally be individually
escaped to allow inclusion of whitespace and other control characters.

This key can be listed multiple times.

### `Group=`

The (numeric) GID to run as inside the container. This does not need to match the GID on the host,
which can be modified with `UserNS`, but if that is not specified, this GID is also used on the host.

Note: when both `User=` and `Group=` are specified, they are combined into a single `--user USER:GROUP`
argument passed to Podman. Using `Group=` without `User=` will result in an error.

### `GroupAdd=`

Assign additional groups to the primary user running within the container process. Also supports the `keep-groups` special flag.
Equivalent to the Podman `--group-add` option.

Note: for a rootless unit, `keep-groups` passes in the supplementary groups of the `systemd --user`
manager, which only holds the groups the user had when that manager was started. Groups the user is
added to afterwards are not passed into the container until the user's systemd manager is restarted,
for example with `loginctl terminate-user <user>` followed by a new login.

### `HealthCmd=`

Set or alter a healthcheck command for a container. A value of none disables existing healthchecks.
Equivalent to the Podman `--health-cmd` option.

### `HealthInterval=`

Set an interval for the healthchecks. An interval of disable results in no automatic timer setup.
Equivalent to the Podman `--health-interval` option.

### `HealthLogDestination=`

Set the destination of the HealthCheck log. Directory path, local or events_logger (local use container state file)
(Default: local)
Equivalent to the Podman `--health-log-destination` option.

* `local`: (default) HealthCheck logs are stored in overlay containers. (For example: `$runroot/healthcheck.log`)
* `directory`: creates a log file named `<container-ID>-healthcheck.log` with HealthCheck logs in the specified directory.
* `events_logger`: The log will be written with logging mechanism set by events_logger. It also saves the log to a default directory, for performance on a system with a large number of logs.

### `HealthMaxLogCount=`

Set maximum number of attempts in the HealthCheck log file. ('0' value means an infinite number of attempts in the log file)
(Default: 5 attempts)
Equivalent to the Podman `--Health-max-log-count` option.

### `HealthMaxLogSize=`

Set maximum length in characters of stored HealthCheck log. ("0" value means an infinite log length)
(Default: 500 characters)
Equivalent to the Podman `--Health-max-log-size` option.

### `HealthOnFailure=`

Action to take once the container transitions to an unhealthy state.
The "kill" action in combination integrates best with systemd. Once
the container turns unhealthy, it gets killed, and systemd restarts the
service.
Equivalent to the Podman `--health-on-failure` option.

### `HealthRetries=`

The number of retries allowed before a healthcheck is considered to be unhealthy.
Equivalent to the Podman `--health-retries` option.

### `HealthStartPeriod=`

The initialization time needed for a container to bootstrap.
Equivalent to the Podman `--health-start-period` option.

### `HealthStartupCmd=`

Set a startup healthcheck command for a container.
Equivalent to the Podman `--health-startup-cmd` option.

### `HealthStartupInterval=`

Set an interval for the startup healthcheck. An interval of disable results in no automatic timer setup.
Equivalent to the Podman `--health-startup-interval` option.

### `HealthStartupRetries=`

The number of attempts allowed before the startup healthcheck restarts the container.
Equivalent to the Podman `--health-startup-retries` option.

### `HealthStartupSuccess=`

The number of successful runs required before the startup healthcheck succeeds and the regular healthcheck begins.
Equivalent to the Podman `--health-startup-success` option.

### `HealthStartupTimeout=`

The maximum time a startup healthcheck command has to complete before it is marked as failed.
Equivalent to the Podman `--health-startup-timeout` option.

### `HealthTimeout=`

The maximum time allowed to complete the healthcheck before an interval is considered failed.
Equivalent to the Podman `--health-timeout` option.

### `HostName=`

Sets the host name that is available inside the container.
Equivalent to the Podman `--hostname` option.

### `HttpProxy=`

Controls whether proxy environment variables (http_proxy, https_proxy, ftp_proxy, no_proxy) are passed from the Podman process into the container during image pulls and builds.

Set to `true` to enable proxy inheritance (default Podman behavior) or `false` to disable it.
This option is particularly useful on systems that require proxy configuration for internet access but don't want proxy settings passed to the container runtime.

Equivalent to the Podman `--http-proxy` option.

### `Image=`

The image to run in the container.
It is recommended to use a fully qualified image name rather than a short name, both for
performance and robustness reasons.

The format of the name is the same as when passed to `podman pull`. So, it supports using
`:tag` or digests to guarantee the specific image version.

Special Cases:

* If the `name` of the image ends with `.image`, Quadlet will use the image pulled by the corresponding `.image` file, and the generated systemd service contains a dependency on the `$name-image.service` (or the service name set in the .image file). Note that the corresponding `.image` file must exist.
* If the `name` of the image ends with `.build`, Quadlet will use the image built by the corresponding `.build` file, and the generated systemd service contains a dependency on the `$name-build.service`. Note: the corresponding `.build` file must exist.

### `ImageVolume=`

Tells Podman how to handle the builtin image volumes. Default is **anonymous**.
In the past, a **bind** option was accepted as well. This is deprecated, and currently aliased to **anonymous**.
Equivalent to the Podman `--image-volume` option.

### `IP=`

Specify a static IPv4 address for the container, for example **10.88.64.128**.
Equivalent to the Podman `--ip` option.

### `IP6=`

Specify a static IPv6 address for the container, for example **fd46:db93:aa76:ac37::10**.
Equivalent to the Podman `--ip6` option.

### `Label=`

Set one or more OCI labels on the container. The format is a list of `key=value` items,
similar to `Environment`.

This key can be listed multiple times.

### `LogDriver=`

Set the log-driver used by Podman when running the container.
Equivalent to the Podman `--log-driver` option.

### `LogOpt=`

Set the log-opt (logging options) used by Podman when running the container.
Equivalent to the Podman `--log-opt` option.
This key can be listed multiple times.

### `Mask=`

Specify the paths to mask separated by a colon. `Mask=/path/1:/path/2`. A masked path cannot be accessed inside the container.

### `Memory=`

Specify the amount of memory for the container.

### `Mount=`

Attach a filesystem mount to the container.
This is equivalent to the Podman `--mount` option, and
generally has the form `type=TYPE,TYPE-SPECIFIC-OPTION[,...]`.

Special cases:

* For `type=volume`, if `source` ends with `.volume`, the Podman named volume generated by the corresponding `.volume` file is used.
* For `type=image`, if `source` ends with `.image`, the image generated by the corresponding `.image` file is used.

In both cases, the generated systemd service will contain a dependency on the service generated for the corresponding unit. Note: the corresponding `.volume` or `.image` file must exist.

This key can be listed multiple times.

### `Network=`

Specify a custom network for the container. This has the same format as the `--network` option
to `podman run`. For example, use `host` to use the host network in the container, or `none` to
not set up networking in the container.

Special cases:

* If the `name` of the network ends with `.network`, a Podman network called
`systemd-$name` is used, and the generated systemd service contains
a dependency on the `$name-network.service`. Such a network can be automatically
created by using a `$name.network` Quadlet file. Note: the corresponding `.network` file must exist.

* If the `name` ends with `.container`,
the container will reuse the network stack of another container created by `$name.container`.
The generated systemd service contains a dependency on `$name.service`. Note: the corresponding `.container` file must exist.

This key can be listed multiple times.

### `NetworkAlias=`

Add a network-scoped alias for the container. This has the same format as the `--network-alias`
option to `podman run`. Aliases can be used to group containers together in DNS resolution: for
example, setting `NetworkAlias=web` on multiple containers will make a DNS query for `web` resolve
to all the containers with that alias.

This key can be listed multiple times.

### `NoNewPrivileges=` (defaults to `false`)

If enabled, this disables the container processes from gaining additional privileges via things like
setuid and file capabilities.

### `Notify=` (defaults to `false`)

By default, Podman is run in such a way that the systemd startup notify command is handled by
the container runtime. In other words, the service is deemed started when the container runtime
starts the child in the container. However, if the container application supports
sd_notify, then setting
`Notify` to true passes the notification details to the container allowing it to notify
of startup on its own.

In addition, setting `Notify` to `healthy` will postpone startup notifications until such time as
the container is marked healthy, as determined by Podman healthchecks. Note that this requires
setting up a container healthcheck, see the `HealthCmd` option for more.

### `PidsLimit=`

Tune the container's pids limit.
This is equivalent to the Podman `--pids-limit` option.

### `Pod=`

Specify a Quadlet `.pod` unit to link the container to.
The value must take the form of `<name>.pod` and the `.pod` unit must exist.

Quadlet will add all the necessary parameters to link between the container and the pod and between their corresponding services.

### `PodmanArgs=`

This key <example-value> a list of arguments passed directly to the end of the `podman run` command
in the generated file (right before the image name in the command line). It can be used to
access Podman features otherwise unsupported by the generator. Since the generator is unaware
of what unexpected interactions can be caused by these arguments, it is not recommended to use
this option.

The format of this is a space separated list of arguments, which can optionally be individually
escaped to allow inclusion of whitespace and other control characters.

This key can be listed multiple times.

### `PublishPort=`

Exposes a port, or a range of ports (e.g. `50-59`), from the container to the host. Equivalent
to the Podman `--publish` option. The format is similar to the Podman options, which is of
the form `ip:hostPort:containerPort`, `ip::containerPort`, `hostPort:containerPort` or
`containerPort`, where the number of host and container ports must be the same (in the case
of a range). The protocol can be provided at the end, e.g., `hostPort:containerPort/tcp`.
Valid protocols are `tcp` and `udp`; the `sctp` protocol is supported only for rootful containers.

If the IP is set to 0.0.0.0 or not set at all, the port is bound on all IPv4 addresses on
the host; use [::] for IPv6.

Note that not listing a host port means that Podman automatically selects one, and it
may be different for each invocation of service. This makes that a less useful option. The
allocated port can be found with the `podman port` command.

This key can be listed multiple times.

### `Pull=`

Set the image pull policy.
This is equivalent to the Podman `--pull` option

### `ReadOnly=` (defaults to `false`)

If enabled, makes the image read-only.

### `ReadOnlyTmpfs=` (defaults to `true`)

If ReadOnly is set to `true`, mount a read-write tmpfs on /dev, /dev/shm, /run, /tmp, and /var/tmp.

### `ReloadCmd=`

Add `ExecReload` line to the `Service` that runs ` podman exec` with this command in this container.

In order to execute the reload run `systemctl reload <Service>`

Mutually exclusive with `ReloadSignal`

### `ReloadSignal=`

Add `ExecReload` line to the `Service` that runs `podman kill` with this signal which sends the signal to the main container process.

In order to execute the reload run `systemctl reload <Service>`

Mutually exclusive with `ReloadCmd`

### `Retry=`

Number of times to retry the image pull when a HTTP error occurs. Equivalent to the Podman `--retry` option.

### `RetryDelay=`

Delay between retries. Equivalent to the Podman `--retry-delay` option.

### `Rootfs=`

The rootfs to use for the container. Rootfs points to a directory on the system that contains the content to be run within the container. This option conflicts with the `Image` option.

The format of the rootfs is the same as when passed to `podman run --rootfs`, so it supports overlay mounts as well.

Note: On SELinux systems, the rootfs needs the correct label, which is by default unconfined_u:object_r:container_file_t:s0.

### `RunInit=` (defaults to `false`)

If enabled, the container has a minimal init process inside the
container that forwards signals and reaps processes.

### `SeccompProfile=`

Set the seccomp profile to use in the container. If unset, the default podman profile is used.
Set to either the pathname of a JSON file, or `unconfined` to disable the seccomp filters.

### `Secret=`

Use a Podman secret in the container either as a file or an environment variable.
This is equivalent to the Podman `--secret` option and generally has the form `secret[,opt=opt ...]`

### `SecurityLabelDisable=`

Turn off label separation for the container.

### `SecurityLabelFileType=`

Set the label file type for the container files.

### `SecurityLabelLevel=`

Set the label process level for the container processes.

### `SecurityLabelNested=`

Allow SecurityLabels to function within the container. This allows separation of containers created within the container.

### `SecurityLabelType=`

Set the label process type for the container processes.

### `ServiceName=`

By default, Quadlet will name the systemd service unit using the name of the Quadlet.
Setting this key <example-value> this behavior by instructing Quadlet to use the provided name.

Note, the name should not include the `.service` file extension
