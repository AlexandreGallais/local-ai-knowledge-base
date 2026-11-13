---
title: "Docker Engine prior releases (part 4 of 13)"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/engine/release-notes/prior-releases.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Docker Engine prior releases (part 4 of 13)

## 1.12.2 (2016-10-11)

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

- Fix a panic due to a race condition filtering `docker ps` #26049
* Implement retry logic to prevent "Unable to remove filesystem" errors when using the aufs storage driver #26536
* Prevent devicemapper from removing device symlinks if `dm.use_deferred_removal` is enabled #24740
- Fix an issue where the CLI did not return correct exit codes if a command was run with invalid options #26777
- Fix a panic due to a bug in stdout / stderr processing in health checks #26507
- Fix exec's children handling #26874
- Fix exec form of HEALTHCHECK CMD #26208

### Networking

- Fix a daemon start panic on armv5 #24315
* Vendor libnetwork #26879 #26953
 * Avoid returning early on agent join failures docker/libnetwork#1473
 - Fix service published port cleanup issues docker/libetwork#1432 docker/libnetwork#1433
 * Recover properly from transient gossip failures docker/libnetwork#1446
 * Disambiguate node names known to gossip cluster to avoid node name collision docker/libnetwork#1451
 * Honor user provided listen address for gossip  docker/libnetwork#1460
 * Allow reachability via published port across services on the same host docker/libnetwork#1398
 * Change the ingress sandbox name from random id to just `ingress_sbox` docker/libnetwork#1449
 - Disable service discovery in ingress network docker/libnetwork#1489

### Swarm Mode

* Fix remote detection of a node's address when it joins the cluster #26211
* Vendor SwarmKit #26765
 * Bounce session after failed status update docker/swarmkit#1539
 - Fix possible raft deadlocks docker/swarmkit#1537
 - Fix panic and endpoint leak when a service is updated with no endpoints docker/swarmkit#1481
 * Produce an error if the same port is published twice on `service create` or `service update` docker/swarmkit#1495
 - Fix an issue where changes to a service were not detected, resulting in the service not being updated docker/swarmkit#1497
 - Do not allow service creation on ingress network docker/swarmkit#1600

### Contrib

* Update the debian sysv-init script to use `dockerd` instead of `docker daemon` #25869
* Improve stability when running the docker client on MacOS Sierra #26875
- Fix installation on debian stretch #27184

### Windows

- Fix an issue where arrow-navigation did not work when running the docker client in ConEmu #25578

## 1.12.1 (2016-08-18)

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

### Client

* Add `Joined at` information in `node inspect --pretty` #25512
- Fix a crash on `service inspect` #25454
- Fix issue preventing `service update --env-add` to work as intended #25427
- Fix issue preventing `service update --publish-add` to work as intended #25428
- Remove `service update --network-add` and `service update --network-rm` flags
  because this feature is not yet implemented in 1.12, but was inadvertently added
  to the client in 1.12.0 #25646

### Contrib

+ Official ARM installation for Debian Jessie, Ubuntu Trusty, and Raspbian Jessie #24815 #25591
- Add selinux policy per distribution/version, fixing issue preventing successful installation on Fedora 24, and Oracle Linux #25334 #25593

### Networking

- Fix issue that prevented containers to be accessed by hostname with Docker overlay driver in Swarm Mode #25603 #25648
- Fix random network issues on service with published port #25603
- Fix unreliable inter-service communication after scaling down and up #25603
- Fix issue where removing all tasks on a node and adding them back breaks connectivity with other services #25603
- Fix issue where a task that fails to start results in a race, causing a `network xxx not found` error that masks the actual error #25550
- Relax validation of SRV records for external services that use SRV records not formatted according to RFC 2782 #25739

### Plugins (experimental)

* Make daemon events listen for plugin lifecycle events #24760
* Check for plugin state before enabling plugin #25033
- Remove plugin root from filesystem on `plugin rm` #25187
- Prevent deadlock when more than one plugin is installed #25384

### Runtime

* Mask join tokens in daemon logs #25346
- Fix `docker ps --filter` causing the results to no longer be sorted by creation time #25387
- Fix various crashes #25053

### Security

* Add `/proc/timer_list` to the masked paths list to prevent information leak from the host #25630
* Allow systemd to run with only `--cap-add SYS_ADMIN` rather than having to also add `--cap-add DAC_READ_SEARCH` or disabling seccomp filtering #25567

### Swarm

- Fix an issue where the swarm can get stuck electing a new leader after quorum is lost #25055
- Fix unwanted rescheduling of containers after a leader failover #25017
- Change swarm root CA key to P256 curve swarmkit#1376
- Allow forced removal of a node from a swarm #25159
- Fix connection leak when a node leaves a swarm swarmkit/#1277
- Backdate swarm certificates by one hour to tolerate more clock skew swarmkit/#1243
- Avoid high CPU use with many unschedulable tasks swarmkit/#1287
- Fix issue with global tasks not starting up swarmkit/#1295
- Garbage collect raft logs swarmkit/#1327

### Volume

- Persist local volume options after a daemon restart #25316
- Fix an issue where the mount ID was not returned on volume unmount #25333
- Fix an issue where a volume mount could inadvertently create a bind mount #25309
- `docker service create --mount type=bind,...` now correctly validates if the source path exists, instead of creating it #25494
