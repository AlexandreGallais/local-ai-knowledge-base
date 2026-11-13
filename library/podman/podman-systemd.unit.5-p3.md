---
title: "Restart service when sleep finishes (part 3 of 11)"
tool: "podman"
version: "6.2"
source: "https://github.com/containers/podman/blob/055de046937d29450f310fce0fe3071485d8bed9/docs/source/markdown/podman-systemd.unit.5.md"
commit: "055de046937d29450f310fce0fe3071485d8bed9"
license: "Apache-2.0"
---

# Restart service when sleep finishes (part 3 of 11)

## Container units [Container]

Container units are named with a `.container` extension and contain a `[Container]` section describing
the container that is run as a service. The resulting service file contains a line like
`ExecStart=podman run … image-name`, and most of the keys in this section control the command-line
options passed to Podman. However, some options also affect the details of how systemd is set up to run and
interact with the container.

By default, the Podman container has the same name as the unit, but with a `systemd-` prefix, i.e.
a `$name.container` file creates a `$name.service` unit and a `systemd-$name` Podman container. The
`ContainerName` option allows for overriding this default name with a user-provided one.

There is only one required key, `Image`, which defines the container image the service runs.

Valid options for `[Container]` are listed below:

| **[Container] options**              | **podman run equivalent**                            |
|--------------------------------------|------------------------------------------------------|
| AddCapability=CAP                    | --cap-add CAP                                        |
| AddDevice=/dev/foo                   | --device /dev/foo                                    |
| AddHost=example\.com:192.168.10.11   | --add-host example.com:192.168.10.11                 |
| Annotation="XYZ"                     | --annotation "XYZ"                                   |
| AppArmor="alternate-profile"         | --security-opt apparmor=alternate-profile            |
| AutoUpdate=registry                  | --label "io.containers.autoupdate=registry"          |
| CgroupsMode=no-conmon                | --cgroups=no-conmon                                  |
| ContainerName=name                   | --name name                                          |
| ContainersConfModule=/etc/nvd\.conf  | --module=/etc/nvd\.conf                              |
| DNS=192.168.55.1                     | --dns=192.168.55.1                                   |
| DNSOption=ndots:1                    | --dns-option=ndots:1                                 |
| DNSSearch=example.com                | --dns-search example.com                             |
| DropCapability=CAP                   | --cap-drop=CAP                                       |
| Entrypoint=/foo.sh                   | --entrypoint=/foo.sh                                 |
| Environment=foo=bar                  | --env foo=bar                                        |
| EnvironmentFile=/tmp/env             | --env-file /tmp/env                                  |
| EnvironmentHost=true                 | --env-host                                           |
| Exec=/usr/bin/command                | Command after image specification - /usr/bin/command |
| ExposeHostPort=50-59                 | --expose 50-59                                       |
| GIDMap=0:10000:10                    | --gidmap=0:10000:10                                  |
| GlobalArgs=--log-level=debug         | --log-level=debug                                    |
| Group=1234                           | --user UID:1234                                      |
| GroupAdd=keep-groups                 | --group-add=keep-groups                              |
| HealthCmd=/usr/bin/command           | --health-cmd=/usr/bin/command                        |
| HealthInterval=2m                    | --health-interval=2m                                 |
| HealthLogDestination=/foo/log        | --health-log-destination=/foo/log                    |
| HealthMaxLogCount=5                  | --health-max-log-count=5                             |
| HealthMaxLogSize=500                 | --health-max-log-size=500                            |
| HealthOnFailure=kill                 | --health-on-failure=kill                             |
| HealthRetries=5                      | --health-retries=5                                   |
| HealthStartPeriod=1m                 | --health-start-period=1m                             |
| HealthStartupCmd=command             | --health-startup-cmd=command                         |
| HealthStartupInterval=1m             | --health-startup-interval=1m                         |
| HealthStartupRetries=8               | --health-startup-retries=8                           |
| HealthStartupSuccess=2               | --health-startup-success=2                           |
| HealthStartupTimeout=1m33s           | --health-startup-timeout=1m33s                       |
| HealthTimeout=20s                    | --health-timeout=20s                                 |
| HostName=example.com                 | --hostname example.com                               |
| HttpProxy=true                       | --http-proxy=true                                    |
| Image=ubi8                           | Image specification - ubi8                           |
| ImageVolume=tmpfs                    | --image-volume tmpfs                                 |
| IP=192.5.0.1                         | --ip 192.5.0.1                                       |
| IP6=2001:db8::1                      | --ip6 2001:db8::1                                    |
| Label="XYZ"                          | --label "XYZ"                                        |
| LogDriver=journald                   | --log-driver journald                                |
| LogOpt=path=/var/log/mykube\.json    | --log-opt path=/var/log/mykube\.json                 |
| Mask=/proc/sys/foo\:/proc/sys/bar    | --security-opt mask=/proc/sys/foo:/proc/sys/bar      |
| Memory=20g                           | --memory 20g                                         |
| Mount=type=...                       | --mount type=...                                     |
| Network=host                         | --network host                                       |
| NetworkAlias=name                    | --network-alias name                                 |
| NoNewPrivileges=true                 | --security-opt no-new-privileges                     |
| Notify=true                          | --sdnotify container                                 |
| PidsLimit=10000                      | --pids-limit 10000                                   |
| Pod=pod-name                         | --pod=pod-name                                       |
| PodmanArgs=--publish 8080:80         | --publish 8080:80                                    |
| PublishPort=8080:80                  | --publish 8080:80                                    |
| Pull=never                           | --pull never                                         |
| ReadOnly=true                        | --read-only                                          |
| ReadOnlyTmpfs=true                   | --read-only-tmpfs                                    |
| ReloadCmd=/usr/bin/command           | Add ExecReload and run exec with the value           |
| ReloadSignal=SIGHUP                  | Add ExecReload and run kill with the signal          |
| Retry=5                              | --retry=5                                            |
| RetryDelay=5s                        | --retry-delay=5s                                     |
| Rootfs=/var/lib/rootfs               | --rootfs /var/lib/rootfs                             |
| RunInit=true                         | --init                                               |
| SeccompProfile=/tmp/s.json           | --security-opt seccomp=/tmp/s.json                   |
| Secret=secret                        | --secret=secret[,opt=opt ...]                        |
| SecurityLabelDisable=true            | --security-opt label=disable                         |
| SecurityLabelFileType=usr_t          | --security-opt label=filetype:usr_t                  |
| SecurityLabelLevel=s0:c1,c2          | --security-opt label=level:s0:c1,c2                  |
| SecurityLabelNested=true             | --security-opt label=nested                          |
| SecurityLabelType=spc_t              | --security-opt label=type:spc_t                      |
| ServiceName=name                     | Name the systemd unit `name.service`                 |
| ShmSize=100m                         | --shm-size=100m                                      |
| StartWithPod=true                    | If Pod= is defined, container is started by pod      |
| StopSignal=SIGINT                    | --stop-signal=SIGINT                                 |
| StopTimeout=20                       | --stop-timeout=20                                    |
| SubGIDMap=gtest                      | --subgidname=gtest                                   |
| SubUIDMap=utest                      | --subuidname=utest                                   |
| Sysctl=name=value                    | --sysctl=name=value                                  |
| Timezone=local                       | --tz local                                           |
| Tmpfs=/work                          | --tmpfs /work                                        |
| UIDMap=0:10000:10                    | --uidmap=0:10000:10                                  |
| Ulimit=nofile=1000:10000             | --ulimit nofile=1000:10000                           |
| Umask=0077                           | --umask 0077                                         |
| Unmask=ALL                           | --security-opt unmask=ALL                            |
| User=bin                             | --user bin                                           |
| UserNS=keep-id:uid=200,gid=210       | --userns keep-id:uid=200,gid=210                     |
| Volume=/source:/dest                 | --volume /source:/dest                               |
| WorkingDir=$HOME                     | --workdir $HOME                                      |

Description of `[Container]` section are:

### `AddCapability=`

Add these capabilities, in addition to the default Podman capability set, to the container.

This is a space separated list of capabilities. This key can be listed multiple times.

For example:
```
AddCapability=CAP_DAC_OVERRIDE CAP_IPC_OWNER
```

### `AddDevice=`

Adds a device node from the host into the container. The format of this is
`HOST-DEVICE:CONTAINER-DEVICE`, where `HOST-DEVICE` is the path of
the device node on the host, `CONTAINER-DEVICE` is the path of the device node in
the container, and `PERMISSIONS` is a list of permissions combining 'r' for read,
'w' for write, and 'm' for mknod(2). The `-` prefix tells Quadlet to add the device
only if it exists on the host.

This key can be listed multiple times.

### `AddHost=`

Add  host-to-IP mapping to /etc/hosts.
The format is `hostname:ip`.

Equivalent to the Podman `--add-host` option.
This key can be listed multiple times.

### `Annotation=`

Set one or more OCI annotations on the container. The format is a list of `key=value` items,
similar to `Environment`.

This key can be listed multiple times.

### `AppArmor=`

Sets the apparmor confinement profile for the container. A value of `unconfined` turns off apparmor confinement.

### `AutoUpdate=`

Indicates whether the container will be auto-updated (podman-auto-update(1)). The following values are supported:

* `registry`: Requires a fully-qualified image reference (e.g., quay.io/podman/stable:latest) to be used to create the container. This enforcement is necessary to know which image to actually check and pull. If an image ID was used, Podman does not know which image to check/pull anymore.

* `local`: Tells Podman to compare the image a container is using to the image with its raw name in local storage. If an image is updated locally, Podman simply restarts the systemd unit executing the container.

### `CgroupsMode=`

The cgroups mode of the Podman container. Equivalent to the Podman `--cgroups` option.

By default, the cgroups mode of the container created by Quadlet is `split`,
which differs from the default (`enabled`) used by the Podman CLI.

If the container joins a pod (i.e. `Pod=` is specified), you may want to change this to
`no-conmon` or `enabled` so that pod level cgroup resource limits can take effect.

### `ContainerName=`

The (optional) name of the Podman container. If this is not specified, the default value
of `systemd-%N` is used, which is the same as the service name but with a `systemd-`
prefix to avoid conflicts with user-managed containers.

### `ContainersConfModule=`

Load the specified containers.conf(5) module. Equivalent to the Podman `--module` option.

This key can be listed multiple times.

### `DNS=`

Set network-scoped DNS resolver/nameserver for containers in this network.

This key can be listed multiple times.

### `DNSOption=`

Set custom DNS options.

This key can be listed multiple times.

### `DNSSearch=`

Set custom DNS search domains. Use **DNSSearch=.** to remove the search domain.

This key can be listed multiple times.

### `DropCapability=`

Drop these capabilities from the default podman capability set, or `all` to drop all capabilities.

This is a space separated list of capabilities. This key can be listed multiple times.

For example:
```
DropCapability=CAP_DAC_OVERRIDE CAP_IPC_OWNER
```

### `Entrypoint=`

Override the default ENTRYPOINT from the image.
Equivalent to the Podman `--entrypoint` option.
Specify multi option commands in the form of a JSON string.

### `Environment=`

Set an environment variable in the container. This uses the same format as
services in systemd
and can be listed multiple times.

### `EnvironmentFile=`

Use a line-delimited file to set environment variables in the container.
The path may be absolute or relative to the location of the unit file.
This key may be used multiple times, and the order persists when passed to `podman run`.

### `EnvironmentHost=`

Use the host environment inside of the container.

### `Exec=`

Additional arguments for the container; this has exactly the same effect as passing
more arguments after a `podman run <image> <arguments>` invocation.

The format is the same as for systemd command lines,
However, unlike the usage scenario for similarly-named systemd `ExecStart=` verb
which operates on the ambient root filesystem, it is very common for container
images to have their own `ENTRYPOINT` or `CMD` metadata which this interacts with.

The default expectation for many images is that the image will include an `ENTRYPOINT`
with a default binary, and this field will add arguments to that entrypoint.

Another way to describe this is that it works the same way as the args field in a Kubernetes pod.

### `ExposeHostPort=`

Exposes a port, or a range of ports (e.g. `50-59`), from the host to the container. Equivalent
to the Podman `--expose` option.

This key can be listed multiple times.

### `GIDMap=`

Run the container in a new user namespace using the supplied GID mapping.
Equivalent to the Podman `--gidmap` option.

This key can be listed multiple times.
