---
title: "Docker Engine prior releases (part 7 of 13)"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/engine/release-notes/prior-releases.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Docker Engine prior releases (part 7 of 13)

## 1.10.1 (2016-02-11)

### Runtime

* Do not stop daemon on migration hard failure #20156
- Fix various issues with migration to content-addressable images #20058
- Fix ZFS permission bug with user namespaces #20045
- Do not leak /dev/mqueue from the host to all containers, keep it container-specific #19876 #20133
- Fix `docker ps --filter before=...` to not show stopped containers without providing `-a` flag #20135

### Security

- Fix issue preventing docker events to work properly with authorization plugin #20002

### Distribution

* Add additional verifications and prevent from uploading invalid data to registries #20164
- Fix regression preventing uppercase characters in image reference hostname #20175

### Networking

- Fix embedded DNS for user-defined networks in the presence of firewalld #20060
- Fix issue where removing a network during shutdown left Docker inoperable #20181 #20235
- Embedded DNS is now able to return compressed results #20181
- Fix port-mapping issue with `userland-proxy=false` #20181

### Logging

- Fix bug where tcp+tls protocol would be rejected #20109

### Volumes

- Fix issue whereby older volume drivers would not receive volume options #19983

### Misc

- Remove TasksMax from Docker systemd service #20167

## 1.10.0 (2016-02-04)

> **Important:**
>
> Docker 1.10 uses a new content-addressable storage for images and layers.

A migration is performed the first time `docker` is run, and can take a significant amount of time depending on the number of images present. Refer to this page on the wiki for more information: https://github.com/docker/docker/wiki/Engine-v1.10.0-content-addressability-migration
We also released a cool migration utility that enables you to perform the migration before updating to reduce downtime.
Engine 1.10 migrator can be found on Docker Hub: https://hub.docker.com/r/docker/v1.10-migrator/

### Runtime

+ New `docker update` command that allows updating resource constraints on running containers #15078
+ Add `--tmpfs` flag to `docker run` to create a tmpfs mount in a container #13587
+ Add `--format` flag to `docker images` command #17692
+ Allow to set daemon configuration in a file and hot-reload it with the `SIGHUP` signal #18587
+ Updated docker events to include more meta-data and event types #18888
  This change is backward compatible in the API, but not on the CLI.
+ Add `--blkio-weight-device` flag to `docker run` #13959
+ Add `--device-read-bps` and `--device-write-bps` flags to `docker run` #14466
+ Add `--device-read-iops` and `--device-write-iops` flags to `docker run` #15879
+ Add `--oom-score-adj` flag to `docker run` #16277
+ Add `--detach-keys` flag to `attach`, `run`, `start` and `exec` commands to override the default key sequence that detaches from a container  #15666
+ Add `--shm-size` flag to `run`, `create` and `build` to set the size of `/dev/shm` #16168
+ Show the number of running, stopped, and paused containers in `docker info` #19249
+ Show the `OSType` and `Architecture` in `docker info` #17478
+ Add `--cgroup-parent` flag on `daemon` to set cgroup parent for all containers #19062
+ Add `-L` flag to docker cp to follow symlinks #16613
+ New `status=dead` filter for `docker ps` #17908
* Change `docker run` exit codes to distinguish between runtime and application errors #14012
* Enhance `docker events --since` and `--until` to support nanoseconds and timezones #17495
* Add `--all`/`-a` flag to `stats` to include both running and stopped containers #16742
* Change the default cgroup-driver to `cgroupfs` #17704
* Emit a "tag" event when tagging an image with `build -t` #17115
* Best effort for linked containers' start order when starting the daemon #18208
* Add ability to add multiple tags on `build` #15780
* Permit `OPTIONS` request against any url, thus fixing issue with CORS #19569
- Fix the `--quiet` flag on `docker build` to actually be quiet #17428
- Fix `docker images --filter dangling=false` to now show all non-dangling images #19326
- Fix race condition causing autorestart turning off on restart #17629
- Recognize GPFS filesystems #19216
- Fix obscure bug preventing to start containers #19751
- Forbid `exec` during container restart #19722
- devicemapper: Increasing `--storage-opt dm.basesize` will now increase the base device size on daemon restart #19123

### Security

+ Add `--userns-remap` flag to `daemon` to support user namespaces (previously in experimental) #19187
+ Add support for custom seccomp profiles in `--security-opt` #17989
+ Add default seccomp profile #18780
+ Add `--authorization-plugin` flag to `daemon` to customize ACLs #15365
+ Docker Content Trust now supports the ability to read and write user delegations #18887
  This is an optional, opt-in feature that requires the explicit use of the Notary command-line utility in order to be enabled.
  Enabling delegation support in a specific repository will break the ability of Docker 1.9 and 1.8 to pull from that repository, if content trust is enabled.
* Allow SELinux to run in a container when using the BTRFS storage driver #16452

### Distribution

* Use content-addressable storage for images and layers #17924
  A migration is performed the first time docker is run; it can take a significant amount of time depending on the number of images and containers present.
  Images no longer depend on the parent chain but contain a list of layer references.
  `docker load`/`docker save` tarballs now also contain content-addressable image configurations.
  For more information: https://github.com/docker/docker/wiki/Engine-v1.10.0-content-addressability-migration
* Add support for the new manifest format ("schema2") #18785
* Lots of improvements for push and pull: performance++, retries on failed downloads, cancelling on client disconnect #18353, #18418, #19109, #18353
* Limit v1 protocol fallbacks #18590
- Fix issue where docker could hang indefinitely waiting for a nonexistent process to pull an image #19743

### Networking

+ Use DNS-based discovery instead of `/etc/hosts` #19198
+ Support for network-scoped alias using `--net-alias` on `run` and `--alias` on `network connect` #19242
+ Add `--ip` and `--ip6` on `run` and `network connect` to support custom IP addresses for a container in a network #19001
+ Add `--ipam-opt` to `network create` for passing custom IPAM options #17316
+ Add `--internal` flag to `network create` to restrict external access to and from the network #19276
+ Add `kv.path` option to `--cluster-store-opt` #19167
+ Add `discovery.heartbeat` and `discovery.ttl` options to `--cluster-store-opt` to configure discovery TTL and heartbeat timer #18204
+ Add `--format` flag to `network inspect` #17481
+ Add `--link` to `network connect` to provide a container-local alias #19229
+ Support for Capability exchange with remote IPAM plugins #18775
+ Add `--force` to `network disconnect` to force container to be disconnected from network #19317
* Support for multi-host networking using built-in overlay driver for all engine supported kernels: 3.10+ #18775
* `--link` is now supported on `docker run` for containers in user-defined network #19229
* Enhance `docker network rm` to allow removing multiple networks #17489
* Include container names in `network inspect` #17615
* Include auto-generated subnets for user-defined networks in `network inspect` #17316
* Add `--filter` flag to `network ls` to hide predefined networks #17782
* Add support for network connect/disconnect to stopped containers #18906
* Add network ID to container inspect #19323
- Fix MTU issue where Docker would not start with two or more default routes #18108
- Fix duplicate IP address for containers #18106
- Fix issue preventing sometimes docker from creating the bridge network #19338
- Do not substitute 127.0.0.1 name server when using `--net=host` #19573

### Logging

+ New logging driver for Splunk #16488
+ Add support for syslog over TCP+TLS #18998
* Enhance `docker logs --since` and `--until` to support nanoseconds and time #17495
* Enhance AWS logs to auto-detect region #16640

### Volumes

+ Add support to set the mount propagation mode for a volume #17034
* Add `ls` and `inspect` endpoints to volume plugin API #16534
  Existing plugins need to make use of these new APIs to satisfy users' expectation
  For that, use the new MIME type `application/vnd.docker.plugins.v1.2+json` #19549
- Fix data not being copied to named volumes #19175
- Fix issues preventing volume drivers from being containerized #19500
- Fix `docker volumes ls --dangling=false` to now show all non-dangling volumes #19671
- Do not remove named volumes on container removal #19568
- Allow external volume drivers to host anonymous volumes #19190

### Builder

+ Add support for `**` in `.dockerignore` to wildcard multiple levels of directories #17090
- Fix handling of UTF-8 characters in Dockerfiles #17055
- Fix permissions problem when reading from STDIN #19283

### Client

+ Add support for overriding the API version to use via an `DOCKER_API_VERSION` environment-variable #15964
- Fix a bug preventing Windows clients to log in to Docker Hub #19891

### Misc

* systemd: Set TasksMax in addition to LimitNPROC in systemd service file #19391

### Deprecations

* Remove LXC support. The LXC driver was deprecated in Docker 1.8, and has now been removed #17700
* Remove `--exec-driver` daemon flag, because it is no longer in use #17700
* Remove old deprecated single-dashed long CLI flags (such as `-rm`; use `--rm` instead) #17724
* Deprecate HostConfig at API container start #17799
* Deprecate docker packages for newly EOL'd Linux distributions: Fedora 21 and Ubuntu 15.04 (Vivid) #18794, #18809
* Deprecate `-f` flag for docker tag #18350

## 1.9.1 (2015-11-21)

### Runtime

- Do not prevent daemon from booting if images could not be restored (#17695)
- Force IPC mount to unmount on daemon shutdown/init (#17539)
- Turn IPC unmount errors into warnings (#17554)
- Fix `docker stats` performance regression (#17638)
- Clarify cryptic error message upon `docker logs` if `--log-driver=none` (#17767)
- Fix seldom panics (#17639, #17634, #17703)
- Fix opq whiteouts problems for files with dot prefix (#17819)
- devicemapper: try defaulting to xfs instead of ext4 for performance reasons (#17903, #17918)
- devicemapper: fix displayed fs in docker info (#17974)
- selinux: only relabel if user requested so with the `z` option (#17450, #17834)
- Do not make network calls when normalizing names (#18014)

### Client

- Fix `docker login` on windows (#17738)
- Fix bug with `docker inspect` output when not connected to daemon (#17715)
- Fix `docker inspect -f {{.HostConfig.Dns}} somecontainer` (#17680)

### Builder

- Fix regression with symlink behavior in ADD/COPY (#17710)

### Networking

- Allow passing a network ID as an argument for `--net` (#17558)
- Fix connect to host and prevent disconnect from host for `host` network (#17476)
- Fix `--fixed-cidr` issue when gateway ip falls in ip-range and ip-range is
  not the first block in the network (#17853)
- Restore deterministic `IPv6` generation from `MAC` address on default `bridge` network (#17890)
- Allow port-mapping only for endpoints created on docker run (#17858)
- Fixed an endpoint delete issue with a possible stale sbox (#18102)

### Distribution

- Correct parent chain in v2 push when v1Compatibility files on the disk are inconsistent (#18047)
