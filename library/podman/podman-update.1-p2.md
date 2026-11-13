---
title: "podman-update.1 (part 2 of 3)"
tool: "podman"
version: "6.2"
source: "https://github.com/containers/podman/blob/055de046937d29450f310fce0fe3071485d8bed9/docs/source/markdown/podman-update.1.md.in"
commit: "055de046937d29450f310fce0fe3071485d8bed9"
license: "Apache-2.0"
---

# podman-update.1 (part 2 of 3)

## OPTIONS

#### **--blkio-weight**=*weight*

Block IO relative weight. The _weight_ is a value between **10** and **1000**.

This option is not supported on cgroups V1 rootless systems.

#### **--blkio-weight-device**=*device:weight*

Block IO relative device weight.

#### **--cpu-period**=*limit*

Set the CPU period for the Completely Fair Scheduler (CFS), which is a
duration in microseconds. Once the container's CPU quota is used up, it will not
be scheduled to run until the current period ends. Defaults to 100000
microseconds.

On some systems, changing the resource limits may not be allowed for non-root
users. For more details, see
https://github.com/containers/podman/blob/main/troubleshooting.md#26-running-containers-with-resource-limits-fails-with-a-permissions-error

This option is not supported on cgroups V1 rootless systems.

#### **--cpu-quota**=*limit*

Limit the CPU Completely Fair Scheduler (CFS) quota.

Limit the container's CPU usage. By default, containers run with the full
CPU resource. The limit is a number in microseconds. If a number is provided,
the container is allowed to use that much CPU time until the CPU period
ends (controllable via **--cpu-period**).

On some systems, changing the resource limits may not be allowed for non-root
users. For more details, see
https://github.com/containers/podman/blob/main/troubleshooting.md#26-running-containers-with-resource-limits-fails-with-a-permissions-error

This option is not supported on cgroups V1 rootless systems.

#### **--cpu-shares**, **-c**=*shares*

CPU shares (relative weight).

By default, all containers get the same proportion of CPU cycles. This
proportion can be modified by changing the container's CPU share weighting
relative to the combined weight of all the running containers.
Default weight is **1024**.

The proportion only applies when CPU-intensive processes are running.
When tasks in one container are idle, other containers can use the
left-over CPU time. The actual amount of CPU time varies depending on
the number of containers running on the system.

For example, consider three containers, one has a cpu-share of 1024 and
two others have a cpu-share setting of 512. When processes in all three
containers attempt to use 100% of CPU, the first container receives
50% of the total CPU time. If a fourth container is added with a cpu-share
of 1024, the first container only gets 33% of the CPU. The remaining containers
receive 16.5%, 16.5% and 33% of the CPU.

On a multi-core system, the shares of CPU time are distributed over all CPU
cores. Even if a container is limited to less than 100% of CPU time, it can
use 100% of each individual CPU core.

For example, consider a system with more than three cores.
If the container _C0_ is started with **--cpu-shares=512** running one process,
and another container _C1_ with **--cpu-shares=1024** running two processes,
this can result in the following division of CPU shares:

| PID  |  container  | CPU     | CPU share    |
| ---- | ----------- | ------- | ------------ |
| 100  |  C0         | 0       | 100% of CPU0 |
| 101  |  C1         | 1       | 100% of CPU1 |
| 102  |  C1         | 2       | 100% of CPU2 |

On some systems, changing the resource limits may not be allowed for non-root
users. For more details, see
https://github.com/containers/podman/blob/main/troubleshooting.md#26-running-containers-with-resource-limits-fails-with-a-permissions-error

This option is not supported on cgroups V1 rootless systems.

#### **--cpuset-cpus**=*number*

CPUs in which to allow execution. Can be specified as a comma-separated list
(e.g. **0,1**), as a range (e.g. **0-3**), or any combination thereof
(e.g. **0-3,7,11-15**).

On some systems, changing the resource limits may not be allowed for non-root
users. For more details, see
https://github.com/containers/podman/blob/main/troubleshooting.md#26-running-containers-with-resource-limits-fails-with-a-permissions-error

This option is not supported on cgroups V1 rootless systems.

#### **--cpuset-mems**=*nodes*

Memory nodes (MEMs) in which to allow execution (0-3, 0,1). Only effective on
NUMA systems.

If there are four memory nodes on the system (0-3), use **--cpuset-mems=0,1**
then processes in the container only uses memory from the first
two memory nodes.

On some systems, changing the resource limits may not be allowed for non-root
users. For more details, see
https://github.com/containers/podman/blob/main/troubleshooting.md#26-running-containers-with-resource-limits-fails-with-a-permissions-error

This option is not supported on cgroups V1 rootless systems.

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

<< if is_quadlet >>
### `Environment=env=value [env=value ...]`
<< else >>
#### **--env**, **-e**=*env*
<< endif >>

Set environment variables.

This option allows arbitrary environment variables that are available for the process to be launched inside of the container. If an environment variable is specified without a value, Podman checks the host environment for a value and set the variable only if it is set on the host. As a special case, if an environment variable ending in __*__ is specified without a value, Podman searches the host environment for variables starting with the prefix and adds those variables to the container.

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

Changing this setting resets the timer.

<< if is_quadlet >>
### `HealthLogDestination=directory_path`
<< else >>
#### **--health-log-destination**=*directory_path*
<< endif >>

Set the destination of the HealthCheck log. Directory path, local or events_logger (local use container state file) (Default: local)

* `local`: (default) HealthCheck logs are stored in overlay containers. (For example: `$runroot/healthcheck.log`)
* `directory`: creates a log file named `<container-ID>-healthcheck.log` with HealthCheck logs in the specified directory.
* `events_logger`: The log will be written with logging mechanism set by events_logger. It also saves the log to a default directory, for performance on a system with a large number of logs.

Warning: Changing this setting may cause the loss of previous logs.

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

Changing this setting resets the timer, depending on the state of the container.

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

#### **--latest**, **-l**

Instead of providing the <<container|pod>> name or ID, use the last created <<container|pod>>.
Note: the last started <<container|pod>> can be from other users of Podman on the host machine.
(This option is not available with the remote Podman client, including Mac and Windows
(excluding WSL2) machines)

<< if is_quadlet >>
