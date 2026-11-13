---
title: "Docker Engine prior releases (part 3 of 13)"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/engine/release-notes/prior-releases.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Docker Engine prior releases (part 3 of 13)

## 1.12.6 (2017-01-10)

> **Important:**
>
> Docker 1.12 ships with an updated systemd unit file for rpm
based installs (which includes RHEL, Fedora, CentOS, and Oracle Linux 7). When upgrading from an older version of Docker, the upgrade process may not automatically install the updated version of the unit file, or fail to start the `docker service` if;
> - the systemd unit file (`/usr/lib/systemd/system/docker.service`) contains local changes, or
> - a systemd drop-in file is present, and contains `-H fd://` in the `ExecStart` directive

Starting the `docker service` will produce an error:

    Failed to start docker.service: Unit docker.socket failed to load: No such file or directory.

or

    no sockets found via socket activation: make sure the service was started by systemd.

To resolve this:

- Backup the current version of the unit file, and replace the file with the
  version that ships with docker 1.12
- Remove the `Requires=docker.socket` directive from the `/usr/lib/systemd/system/docker.service` file if present
- Remove `-H fd://` from the `ExecStart` directive (both in the main unit file, and in any drop-in files present).

After making those changes, run `sudo systemctl daemon-reload`, and `sudo
systemctl restart docker` to reload changes and (re)start the docker daemon.

> **Note:**
>
> Docker 1.12.5 will correctly validate that either an IPv6 subnet is provided or that the IPAM driver can provide one when you specify the `--ipv6` option.

If you are currently using the `--ipv6` option _without_ specifying the
`--fixed-cidr-v6` option, the Docker daemon will refuse to start with the
following message:

```text
Error starting daemon: Error initializing network controller: Error creating
                       default "bridge" network: failed to parse pool request
                       for address space "LocalDefault" pool " subpool ":
                       could not find an available, non-overlapping IPv6 address
                       pool among the defaults to assign to the network
```

To resolve this error, either remove the `--ipv6` flag (to preserve the same
behavior as in Docker 1.12.3 and earlier), or provide an IPv6 subnet as the
value of the `--fixed-cidr-v6` flag.

In a similar way, if you specify the `--ipv6` flag when creating a network
with the default IPAM driver, without providing an IPv6 `--subnet`, network
creation will fail with the following message:

```text
Error response from daemon: failed to parse pool request for address space
                            "LocalDefault" pool "" subpool "": could not find an
                            available, non-overlapping IPv6 address pool among
                            the defaults to assign to the network
```

To resolve this, either remove the `--ipv6` flag (to preserve the same behavior
as in Docker 1.12.3 and earlier), or provide an IPv6 subnet as the value of the
`--subnet` flag.

The network creation will instead succeed if you use an external IPAM driver
which supports automatic allocation of IPv6 subnets.

### Runtime

- Fix runC privilege escalation (CVE-2016-9962)

## 1.12.5 (2016-12-15)

> **Important:**
>
> Docker 1.12 ships with an updated systemd unit file for rpm
based installs (which includes RHEL, Fedora, CentOS, and Oracle Linux 7). When upgrading from an older version of Docker, the upgrade process may not automatically install the updated version of the unit file, or fail to start the `docker service` if;
> - the systemd unit file (`/usr/lib/systemd/system/docker.service`) contains local changes, or
> - a systemd drop-in file is present, and contains `-H fd://` in the `ExecStart` directive

Starting the `docker service` will produce an error:

    Failed to start docker.service: Unit docker.socket failed to load: No such file or directory.

or

    no sockets found via socket activation: make sure the service was started by systemd.

To resolve this:

- Backup the current version of the unit file, and replace the file with the
  version that ships with docker 1.12
- Remove the `Requires=docker.socket` directive from the `/usr/lib/systemd/system/docker.service` file if present
- Remove `-H fd://` from the `ExecStart` directive (both in the main unit file, and in any drop-in files present).

After making those changes, run `sudo systemctl daemon-reload`, and `sudo
systemctl restart docker` to reload changes and (re)start the docker daemon.

> **Note:**
>
> Docker 1.12.5 will correctly validate that either an IPv6 subnet is provided or that the IPAM driver can provide one when you specify the `--ipv6` option.

If you are currently using the `--ipv6` option _without_ specifying the
`--fixed-cidr-v6` option, the Docker daemon will refuse to start with the
following message:

```text
Error starting daemon: Error initializing network controller: Error creating
                       default "bridge" network: failed to parse pool request
                       for address space "LocalDefault" pool " subpool ":
                       could not find an available, non-overlapping IPv6 address
                       pool among the defaults to assign to the network
```

To resolve this error, either remove the `--ipv6` flag (to preserve the same
behavior as in Docker 1.12.3 and earlier), or provide an IPv6 subnet as the
value of the `--fixed-cidr-v6` flag.

In a similar way, if you specify the `--ipv6` flag when creating a network
with the default IPAM driver, without providing an IPv6 `--subnet`, network
creation will fail with the following message:

```text
Error response from daemon: failed to parse pool request for address space
                            "LocalDefault" pool "" subpool "": could not find an
                            available, non-overlapping IPv6 address pool among
                            the defaults to assign to the network
```

To resolve this, either remove the `--ipv6` flag (to preserve the same behavior
as in Docker 1.12.3 and earlier), or provide an IPv6 subnet as the value of the
`--subnet` flag.

The network network creation will instead succeed if you use an external IPAM driver
which supports automatic allocation of IPv6 subnets.

### Runtime

- Fix race on sending stdin close event #29424

### Networking

- Fix panic in docker network ls when a network was created with `--ipv6` and no ipv6 `--subnet` in older docker versions #29416

### Contrib

- Fix compilation on Darwin #29370

## 1.12.4 (2016-12-12)

> **Important:**
>
> Docker 1.12 ships with an updated systemd unit file for rpm
based installs (which includes RHEL, Fedora, CentOS, and Oracle Linux 7). When upgrading from an older version of Docker, the upgrade process may not automatically install the updated version of the unit file, or fail to start the `docker service` if;
> - the systemd unit file (`/usr/lib/systemd/system/docker.service`) contains local changes, or
> - a systemd drop-in file is present, and contains `-H fd://` in the `ExecStart` directive

Starting the `docker service` will produce an error:

    Failed to start docker.service: Unit docker.socket failed to load: No such file or directory.

or

    no sockets found via socket activation: make sure the service was started by systemd.

To resolve this:

- Backup the current version of the unit file, and replace the file with the
  version that ships with docker 1.12
- Remove the `Requires=docker.socket` directive from the `/usr/lib/systemd/system/docker.service` file if present
- Remove `-H fd://` from the `ExecStart` directive (both in the main unit file, and in any drop-in files present).

After making those changes, run `sudo systemctl daemon-reload`, and `sudo
systemctl restart docker` to reload changes and (re)start the docker daemon.

### Runtime

- Fix issue where volume metadata was not removed #29083
- Asynchronously close streams to prevent holding container lock #29050
- Fix selinux labels for newly created container volumes #29050
- Remove hostname validation #28990
- Fix deadlocks caused by IO races #29095 #29141
- Return an empty stats if the container is restarting #29150
- Fix volume store locking #29151
- Ensure consistent status code in API #29150
- Fix incorrect opaque directory permission in overlay2 #29093
- Detect plugin content and error out on `docker pull` #29297

### Swarm Mode

* Update Swarmkit #29047
  - orchestrator/global: Fix deadlock on updates docker/swarmkit#1760
  - on leader switchover preserve the vxlan id for existing networks docker/swarmkit#1773
- Refuse swarm spec not named "default" #29152

### Networking

* Update libnetwork #29004 #29146
  - Fix panic in embedded DNS docker/libnetwork#1561
  - Fix unmarhalling panic when passing --link-local-ip on global scope network docker/libnetwork#1564
  - Fix panic when network plugin returns nil StaticRoutes docker/libnetwork#1563
  - Fix panic in `osl.(*networkNamespace).DeleteNeighbor` docker/libnetwork#1555
  - Fix panic in swarm networking concurrent map read/write docker/libnetwork#1570
  * Allow encrypted networks when running docker inside a container docker/libnetwork#1502
  - Do not block autoallocation of IPv6 pool docker/libnetwork#1538
  - Set timeout for netlink calls docker/libnetwork#1557
  - Increase networking local store timeout to one minute docker/libkv#140
  - Fix a panic in `libnetwork.(*sandbox).execFunc` docker/libnetwork#1556
  - Honor icc=false for internal networks docker/libnetwork#1525

### Logging

* Update syslog log driver #29150

### Contrib

- Run "dnf upgrade" before installing in fedora #29150
- Add build-date back to RPM packages #29150
- deb package filename changed to include distribution to distinguish between distribution code names #27829

## 1.12.3 (2016-10-26)

> **Important:**
>
> Docker 1.12 ships with an updated systemd unit file for rpm
based installs (which includes RHEL, Fedora, CentOS, and Oracle Linux 7). When upgrading from an older version of Docker, the upgrade process may not automatically install the updated version of the unit file, or fail to start the Docker service if;
> - the systemd unit file (`/usr/lib/systemd/system/docker.service`) contains local changes, or
> - a systemd drop-in file is present, and contains `-H fd://` in the `ExecStart` directive

Starting the `docker service` will produce an error:

    Failed to start docker.service: Unit docker.socket failed to load: No such file or directory.

or

    no sockets found via socket activation: make sure the service was started by systemd.

To resolve this:

- Backup the current version of the unit file, and replace the file with the
  version that ships with docker 1.12
- Remove the `Requires=docker.socket` directive from the `/usr/lib/systemd/system/docker.service` file if present
- Remove `-H fd://` from the `ExecStart` directive (both in the main unit file, and in any drop-in files present).

After making those changes, run `sudo systemctl daemon-reload`, and `sudo
systemctl restart docker` to reload changes and (re)start the docker daemon.

### Runtime

- Fix ambient capability usage in containers (CVE-2016-8867) #27610
- Prevent a deadlock in libcontainerd for Windows #27136
- Fix error reporting in CopyFileWithTar #27075
* Reset health status to starting when a container is restarted #27387
* Properly handle shared mount propagation in storage directory #27609
- Fix docker exec #27610
- Fix backward compatibility with containerd’s events log #27693

### Swarm Mode

- Fix conversion of restart-policy #27062
* Update Swarmkit #27554
 * Avoid restarting a task that has already been restarted docker/swarmkit#1305
 * Allow duplicate published ports when they use different protocols docker/swarmkit#1632
 * Allow multiple randomly assigned published ports on service docker/swarmkit#1657
 - Fix panic when allocations happen at init time docker/swarmkit#1651

### Networking

* Update libnetwork #27559
 - Fix race in serializing sandbox to string docker/libnetwork#1495
 - Fix race during deletion docker/libnetwork#1503
 * Reset endpoint port info on connectivity revoke in bridge driver docker/libnetwork#1504
 - Fix a deadlock in networking code docker/libnetwork#1507
 - Fix a race in load balancer state docker/libnetwork#1512

### Logging

* Update fluent-logger-golang to v1.2.1 #27474

### Contrib

* Update buildtags for armhf ubuntu-trusty #27327
* Add AppArmor to runc buildtags for armhf #27421
