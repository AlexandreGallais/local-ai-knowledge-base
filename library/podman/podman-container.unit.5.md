---
title: "NAME (part 1 of 7)"
tool: "podman"
version: "6.2"
source: "https://github.com/containers/podman/blob/055de046937d29450f310fce0fe3071485d8bed9/docs/source/markdown/podman-container.unit.5.md.in"
commit: "055de046937d29450f310fce0fe3071485d8bed9"
license: "Apache-2.0"
---

% podman-container.unit 5

# NAME

podman\-container.unit - systemd unit files for managing containers using Podman Quadlet

# SYNOPSIS

*name*.container

# DESCRIPTION

Container units are named with a `.container` extension and contain a `[Container]` section describing
the container that is run as a service. The resulting service file contains a line like
`ExecStart=podman run ... image-name`, and most of the keys in this section control the command-line
options passed to Podman. However, some options also affect the details of how systemd is set up to run and
interact with the container.

By default, the Podman container has the same name as the unit, but with a `systemd-` prefix, i.e.
a `$name.container` file creates a `$name.service` unit and a `systemd-$name` Podman container. The
`ContainerName` option allows for overriding this default name with a user-provided one.

There is only one required key, `Image`, which defines the container image the service runs.

# USAGE SUMMARY

The `.container` file is parsed by the `podman-system-generator` at boot or reload, generating a systemd
`.service` that runs `podman run`. That service can be managed like any other unit:

```bash
systemctl --user start myimage-container.service
```

# OPTIONS

Valid options for `[Container]` are listed below:

| **[Container] options**              | **podman run equivalent**                            |
|--------------------------------------|------------------------------------------------------|
| AddCapability=CAP                    | --cap-add CAP                                        |
| AddDevice=/dev/foo                   | --device /dev/foo                                    |
| AddHost=example\.com:192.168.10.11   | --add-host example.com:192.168.10.11                 |
| Annotation="XYZ"                     | --annotation "XYZ"                                   |
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
| HealthStartPeriod=1m                 | --health-start-period=1m                      |
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
| Unmask=ALL                           | --security-opt unmask=ALL                            |
| User=bin                             | --user bin                                           |
| UserNS=keep-id:uid=200,gid=210       | --userns keep-id:uid=200,gid=210                     |
| Volume=/source:/dest                 | --volume /source:/dest                               |
| WorkingDir=$HOME                     | --workdir $HOME                                      |

Supported keys in the `[Container]` section are:

<< if is_quadlet >>
### `AddCapability=capability`
<< else >>
#### **--cap-add**=*capability*
<< endif >>

Add Linux capabilities.

Granting additional capabilities increases the privileges of the
processes running inside the container and potentially allow it to
break out of confinement.  Capabilities like `CAP_SYS_ADMIN`,
`CAP_SYS_PTRACE`, `CAP_MKNOD` and `CAP_SYS_MODULE` are particularly
dangerous when they are not used within a user namespace.  Please
refer to **user_namespaces(7)** for a more detailed explanation of the
interaction between user namespaces and capabilities.

Before adding any capability, review its security implications and
ensure it is really necessary for the container’s functionality.  See
**capabilities(7)** for more information.

<< if is_quadlet >>
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

<< if is_quadlet >>
### `AddHost=hostname[;hostname[;...]]:ip`
<< else >>
#### **--add-host**=*hostname[;hostname[;...]]*:*ip*
<< endif >>

Add a custom host-to-IP mapping to the <<container|pod>>'s `/etc/hosts` file.

The option takes one or multiple semicolon-separated hostnames to be mapped to
a single IPv4 or IPv6 address, separated by a colon. It can also be used to
overwrite the IP addresses of hostnames Podman adds to `/etc/hosts` by default
(also see the **--name** and **--hostname** options). This option can be
specified multiple times to add additional mappings to `/etc/hosts`. It
conflicts with the **--no-hosts** option and conflicts with *no_hosts=true* in
`containers.conf`.

Instead of an IP address, the special flag *host-gateway* can be given. This
resolves to an IP address the container can use to connect to the host. The
IP address chosen depends on your network setup, thus there's no guarantee that
Podman can determine the *host-gateway* address automatically, which will then
cause Podman to fail with an error message. You can overwrite this IP address
using the *host_containers_internal_ip* option in *containers.conf*.

The *host-gateway* address is also used by Podman to automatically add the
`host.containers.internal` and `host.docker.internal` hostnames to `/etc/hosts`.
You can prevent that by either giving the **--no-hosts** option, or by setting
*host_containers_internal_ip="none"* in *containers.conf*. If no *host-gateway*
address was configured manually and Podman fails to determine the IP address
automatically, Podman will silently skip adding these internal hostnames to
`/etc/hosts`. If Podman is running in a virtual machine using `podman machine`
(this includes Mac and Windows hosts), Podman will silently skip adding the
internal hostnames to `/etc/hosts`, unless an IP address was configured
manually; the internal hostnames are resolved by the gvproxy DNS resolver
instead.

Podman will use the `/etc/hosts` file of the host as a basis by default, i.e.
any hostname present in this file will also be present in the `/etc/hosts` file
of the container. A different base file can be configured using the
*base_hosts_file* config in `containers.conf`.

### `AutoUpdate=registry`

Indicates whether the container will be auto-updated (podman-auto-update(1)). The following values are supported:

* `registry`: Requires a fully-qualified image reference (e.g., quay.io/podman/stable:latest) to be used to create the container. This enforcement is necessary to know which image to actually check and pull. If an image ID was used, Podman does not know which image to check/pull anymore.

* `local`: Tells Podman to compare the image a container is using to the image with its raw name in local storage. If an image is updated locally, Podman simply restarts the systemd unit executing the container.

<< if is_quadlet >>
