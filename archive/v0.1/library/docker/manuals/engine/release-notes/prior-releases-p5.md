---
title: "Docker Engine prior releases (part 5 of 13)"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/engine/release-notes/prior-releases.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Docker Engine prior releases (part 5 of 13)

## 1.12.0 (2016-07-28)

> **Important:**
>
> Docker 1.12.0 ships with an updated systemd unit file for rpm
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

> **Important:**
>
> With Docker 1.12, a Linux `docker` installation now has two
additional binaries; `dockerd`, and `docker-proxy`. If you have scripts for installing `docker`, make sure to update them accordingly.

### Builder

+ New `HEALTHCHECK` Dockerfile instruction to support user-defined healthchecks #23218
+ New `SHELL` Dockerfile instruction to specify the default shell when using the shell form for commands in a Dockerfile #22489
+ Add `#escape=` Dockerfile directive to support platform-specific parsing of file paths in Dockerfile #22268
+ Add support for comments in `.dockerignore` #23111
* Support for UTF-8 in Dockerfiles #23372
* Skip UTF-8 BOM bytes from `Dockerfile` and `.dockerignore` if exist #23234
* Windows: support for `ARG` to match Linux #22508
- Fix error message when building using a daemon with the bridge network disabled #22932

### Contrib

* Enable seccomp for Centos 7 and Oracle Linux 7 #22344
- Remove MountFlags in systemd unit to allow shared mount propagation #22806

### Distribution

+ Add `--max-concurrent-downloads` and `--max-concurrent-uploads` daemon flags useful for situations where network connections don't support multiple downloads/uploads #22445
* Registry operations now honor the `ALL_PROXY` environment variable #22316
* Provide more information to the user on `docker load` #23377
* Always save registry digest metadata about images pushed and pulled #23996

### Logging

+ Syslog logging driver now supports DGRAM sockets #21613
+ Add `--details` option to `docker logs` to also display log tags #21889
+ Enable syslog logger to have access to env and labels #21724
+ An additional syslog-format option `rfc5424micro` to allow microsecond resolution in syslog timestamp #21844
* Inherit the daemon log options when creating containers #21153
* Remove `docker/` prefix from log messages tag and replace it with `{{.DaemonName}}` so that users have the option of changing the prefix #22384

### Networking

+ Built-in Virtual-IP based  internal and ingress load-balancing using IPVS #23361
+ Routing Mesh using ingress overlay network #23361
+ Secured multi-host overlay networking using encrypted control-plane and Data-plane #23361
+ MacVlan driver is out of experimental #23524
+ Add `driver` filter to `network ls` #22319
+ Adding `network` filter to `docker ps --filter` #23300
+ Add `--link-local-ip` flag to `create`, `run` and `network connect` to specify a container's link-local address #23415
+ Add network label filter support #21495
* Removed dependency on external KV-Store for Overlay networking in Swarm-Mode  #23361
* Add container's short-id as default network alias #21901
* `run` options `--dns` and `--net=host` are no longer mutually exclusive #22408
- Fix DNS issue when renaming containers with generated names #22716
- Allow both `network inspect -f {{.Id}}` and `network inspect -f {{.ID}}` to address inconsistency with inspect output #23226

### Plugins (experimental)

+ New `plugin` command to manager plugins with `install`, `enable`, `disable`, `rm`, `inspect`, `set` subcommands #23446

### Remote API (v1.24) & Client

+ Split the binary into two: `docker` (client) and `dockerd` (daemon) #20639
+ Add `before` and `since` filters to `docker images --filter` #22908
+ Add `--limit` option to `docker search` #23107
+ Add `--filter` option to `docker search` #22369
+ Add security options to `docker info` output #21172 #23520
+ Add insecure registries to `docker info` output #20410
+ Extend Docker authorization with TLS user information #21556
+ devicemapper: expose Minimum Thin Pool Free Space through `docker info` #21945
* API now returns a JSON object when an error occurs making it more consistent #22880
- Prevent `docker run -i --restart` from hanging on exit #22777
- Fix API/CLI discrepancy on hostname validation #21641
- Fix discrepancy in the format of sizes in `stats` from HumanSize to BytesSize #21773
- authz: when request is denied return forbidden exit code (403) #22448
- Windows: fix tty-related displaying issues #23878

### Runtime

+ Split the userland proxy to a separate binary (`docker-proxy`) #23312
+ Add `--live-restore` daemon flag to keep containers running when daemon shuts down, and regain control on startup #23213
+ Ability to add OCI-compatible runtimes (via `--add-runtime` daemon flag) and select one with `--runtime` on `create` and `run` #22983
+ New `overlay2` graphdriver for Linux 4.0+ with multiple lower directory support #22126
+ New load/save image events #22137
+ Add support for reloading daemon configuration through systemd #22446
+ Add disk quota support for btrfs #19651
+ Add disk quota support for zfs #21946
+ Add support for `docker run --pid=container:<id>` #22481
+ Align default seccomp profile with selected capabilities #22554
+ Add a `daemon reload` event when the daemon reloads its configuration #22590
+ Add `trace` capability in the pprof profiler to show execution traces in binary form #22715
+ Add a `detach` event #22898
+ Add support for setting sysctls with `--sysctl` #19265
+ Add `--storage-opt` flag to `create` and `run` allowing to set `size` on devicemapper #19367
+ Add `--oom-score-adjust` daemon flag with a default value of `-500` making the daemon less likely to be killed before containers #24516
* Undeprecate the `-c` short alias of `--cpu-shares` on `run`, `build`, `create`, `update` #22621
* Prevent from using aufs and overlay graphdrivers on an eCryptfs mount #23121
- Fix issues with tmpfs mount ordering #22329
- Created containers are no longer listed on `docker ps -a -f exited=0` #21947
- Fix an issue where containers are stuck in a "Removal In Progress" state #22423
- Fix bug that was returning an HTTP 500 instead of a 400 when not specifying a command on run/create #22762
- Fix bug with `--detach-keys` whereby input matching a prefix of the detach key was not preserved #22943
- SELinux labeling is now disabled when using `--privileged` mode #22993
- If volume-mounted into a container, `/etc/hosts`, `/etc/resolv.conf`, `/etc/hostname` are no longer SELinux-relabeled #22993
- Fix inconsistency in `--tmpfs` behavior regarding mount options #22438
- Fix an issue where daemon hangs at startup #23148
- Ignore SIGPIPE events to prevent journald restarts to crash docker in some cases #22460
- Containers are not removed from stats list on error #20835
- Fix `on-failure` restart policy when daemon restarts #20853
- Fix an issue with `stats` when a container is using another container's network #21904

### Swarm Mode

+ New `swarm` command to manage swarms with `init`, `join`, `join-token`, `leave`, `update` subcommands #23361 #24823
+ New `service` command to manage swarm-wide services with `create`, `inspect`, `update`, `rm`, `ps` subcommands #23361 #25140
+ New `node` command to manage nodes with `accept`, `promote`, `demote`, `inspect`, `update`, `ps`, `ls` and `rm` subcommands #23361 #25140
+ (experimental) New `stack` and `deploy` commands to manage and deploy multi-service applications #23522 #25140

### Volume

+ Add support for local and global volume scopes (analogous to network scopes) #22077
+ Allow volume drivers to provide a `Status` field #21006
+ Add name/driver filter support for volume #21361
* Mount/Unmount operations now receives an opaque ID to allow volume drivers to differentiate between two callers #21015
- Fix issue preventing to remove a volume in a corner case #22103
- Windows: Enable auto-creation of host-path to match Linux #22094

### Deprecation

* Environment variables `DOCKER_CONTENT_TRUST_OFFLINE_PASSPHRASE` and `DOCKER_CONTENT_TRUST_TAGGING_PASSPHRASE` have been renamed
  to `DOCKER_CONTENT_TRUST_ROOT_PASSPHRASE` and `DOCKER_CONTENT_TRUST_REPOSITORY_PASSPHRASE` respectively #22574
* Remove deprecated `syslog-tag`, `gelf-tag`, `fluentd-tag` log option in favor of the more generic `tag` one #22620
* Remove deprecated feature of passing HostConfig at API container start #22570
* Remove deprecated `-f`/`--force` flag on docker tag #23090
* Remove deprecated `/containers/<id|name>/copy` endpoint #22149
* Remove deprecated `docker ps` flags `--since` and `--before` #22138
* Deprecate the old 3-args form of `docker import` #23273

## 1.11.2 (2016-05-31)

### Networking

- Fix a stale endpoint issue on overlay networks during ungraceful restart (#23015)
- Fix an issue where the wrong port could be reported by `docker inspect/ps/port` (#22997)

### Runtime

- Fix a potential panic when running `docker build` (#23032)
- Fix interpretation of `--user` parameter (#22998)
- Fix a bug preventing container statistics to be correctly reported (#22955)
- Fix an issue preventing container to be restarted after daemon restart (#22947)
- Fix issues when running 32 bit binaries on Ubuntu 16.04 (#22922)
- Fix a possible deadlock on image deletion and container attach (#22918)
- Fix an issue where containers fail to start after a daemon restart if they depend on a containerized cluster store (#22561)
- Fix an issue causing `docker ps` to hang on CentOS when using devicemapper (#22168, #23067)
- Fix a bug preventing to `docker exec` into a container when using devicemapper (#22168, #23067)

## 1.11.1 (2016-04-26)

### Distribution

- Fix schema2 manifest media type to be of type `application/vnd.docker.container.image.v1+json` (#21949)

### Documentation

+ Add missing API documentation for changes introduced with 1.11.0 (#22048)

### Builder

* Append label passed to `docker build` as arguments as an implicit `LABEL` command at the end of the processed `Dockerfile` (#22184)

### Networking

- Fix a panic that would occur when forwarding DNS query (#22261)
- Fix an issue where OS threads could end up within an incorrect network namespace when using user defined networks (#22261)

### Runtime

- Fix a bug preventing labels configuration to be reloaded via the config file (#22299)
- Fix a regression where container mounting `/var/run` would prevent other containers from being removed (#22256)
- Fix an issue where it would be impossible to update both `memory-swap` and `memory` value together (#22255)
- Fix a regression from 1.11.0 where the `/auth` endpoint would not initialize `serveraddress` if it is not provided (#22254)
- Add missing cleanup of container temporary files when cancelling a schedule restart (#22237)
- Remove scary error message when no restart policy is specified (#21993)
- Fix a panic that would occur when the plugins were activated via the json spec (#22191)
- Fix restart backoff logic to correctly reset delay if container ran for at least 10secs (#22125)
- Remove error message when a container restart get cancelled (#22123)
- Fix an issue where `docker` would not correctly clean up after `docker exec` (#22121)
- Fix a panic that could occur when serving concurrent `docker stats` commands (#22120)`
- Revert deprecation of non-existent host directories auto-creation (#22065)
- Hide misleading rpc error on daemon shutdown (#22058)
