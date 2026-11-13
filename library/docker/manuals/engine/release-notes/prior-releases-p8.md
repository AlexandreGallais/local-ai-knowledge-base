---
title: "Docker Engine prior releases (part 8 of 13)"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/engine/release-notes/prior-releases.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Docker Engine prior releases (part 8 of 13)

## 1.9.0 (2015-11-03)

### Runtime

+ `docker stats` now returns block IO metrics (#15005)
+ `docker stats` now details network stats per interface (#15786)
+ Add `ancestor=<image>` filter to `docker ps --filter` flag to filter
containers based on their ancestor images (#14570)
+ Add `label=<somelabel>` filter to `docker ps --filter` to filter containers
based on label (#16530)
+ Add `--kernel-memory` flag to `docker run` (#14006)
+ Add `--message` flag to `docker import` allowing to specify an optional
message (#15711)
+ Add `--privileged` flag to `docker exec` (#14113)
+ Add `--stop-signal` flag to `docker run` allowing to replace the container
process stopping signal (#15307)
+ Add a new `unless-stopped` restart policy (#15348)
+ Inspecting an image now returns tags (#13185)
+ Add container size information to `docker inspect` (#15796)
+ Add `RepoTags` and `RepoDigests` field to `/images/{name:.*}/json` (#17275)
- Remove the deprecated `/container/ps` endpoint from the API (#15972)
- Send and document correct HTTP codes for `/exec/<name>/start` (#16250)
- Share shm and mqueue between containers sharing IPC namespace (#15862)
- Event stream now shows OOM status when `--oom-kill-disable` is set (#16235)
- Ensure special network files (/etc/hosts etc.) are read-only if bind-mounted
with `ro` option (#14965)
- Improve `rmi` performance (#16890)
- Do not update /etc/hosts for the default bridge network, except for links (#17325)
- Fix conflict with duplicate container names (#17389)
- Fix an issue with incorrect template execution in `docker inspect` (#17284)
- DEPRECATE `-c` short flag variant for `--cpu-shares` in docker run (#16271)

### Client

+ Allow `docker import` to import from local files (#11907)

### Builder

+ Add a `STOPSIGNAL` Dockerfile instruction allowing to set a different
stop-signal for the container process (#15307)
+ Add an `ARG` Dockerfile instruction and a `--build-arg` flag to `docker build`
that allows to add build-time environment variables (#15182)
- Improve cache miss performance (#16890)

### Storage

- devicemapper: Implement deferred deletion capability (#16381)

### Networking

+ `docker network` exits experimental and is part of standard release (#16645)
+ New network top-level concept, with associated subcommands and API (#16645)
  WARNING: the API is different from the experimental API
+ Support for multiple isolated/micro-segmented networks (#16645)
+ Built-in multihost networking using VXLAN based overlay driver (#14071)
+ Support for third-party network plugins (#13424)
+ Ability to dynamically connect containers to multiple networks (#16645)
+ Support for user-defined IP address management via pluggable IPAM drivers (#16910)
+ Add daemon flags `--cluster-store` and `--cluster-advertise` for built-in nodes discovery (#16229)
+ Add `--cluster-store-opt` for setting up TLS settings (#16644)
+ Add `--dns-opt` to the daemon (#16031)
- DEPRECATE following container `NetworkSettings` fields in API v1.21: `EndpointID`, `Gateway`,
  `GlobalIPv6Address`, `GlobalIPv6PrefixLen`, `IPAddress`, `IPPrefixLen`, `IPv6Gateway` and `MacAddress`.
  Those are now specific to the `bridge` network. Use `NetworkSettings.Networks` to inspect
  the networking settings of a container per network.

### Volumes

+ New top-level `volume` subcommand and API (#14242)
- Move API volume driver settings to host-specific config (#15798)
- Print an error message if volume name is not unique (#16009)
- Ensure volumes created from Dockerfiles always use the local volume driver
(#15507)
- DEPRECATE auto-creating missing host paths for bind mounts (#16349)

### Logging

+ Add `awslogs` logging driver for Amazon CloudWatch (#15495)
+ Add generic `tag` log option to allow customizing container/image
information passed to driver (#15384)
- Implement the `docker logs` endpoint for the journald driver (#13707)
- DEPRECATE driver-specific log tags (#15384)

### Distribution

+ `docker search` now works with partial names (#16509)
- Push optimization: avoid buffering to file (#15493)
- The daemon will display progress for images that were already being pulled
by another client (#15489)
- Only permissions required for the current action being performed are requested (#)
+ Renaming trust keys (and respective environment variables) from `offline` to
`root` and `tagging` to `repository` (#16894)
- DEPRECATE trust key <example-value> variables
`DOCKER_CONTENT_TRUST_OFFLINE_PASSPHRASE` and
`DOCKER_CONTENT_TRUST_TAGGING_PASSPHRASE` (#16894)

### Security

+ Add SELinux profiles to the rpm package (#15832)
- Fix various issues with AppArmor profiles provided in the deb package
(#14609)
- Add AppArmor policy that prevents writing to /proc (#15571)

## 1.8.3 (2015-10-12)

### Distribution

- Fix layer IDs lead to local graph poisoning (CVE-2014-8178)
- Fix manifest validation and parsing logic errors allow pull-by-digest validation bypass (CVE-2014-8179)
+ Add `--disable-legacy-registry` to prevent a daemon from using a v1 registry

## 1.8.2 (2015-09-10)

### Distribution

- Fixes rare edge case of handling GNU LongLink and LongName entries.
- Fix ^C on docker pull.
- Fix docker pull issues on client disconnection.
- Fix issue that caused the daemon to panic when loggers weren't configured properly.
- Fix goroutine leak pulling images from registry V2.

### Runtime

- Fix a bug mounting cgroups for docker daemons running inside docker containers.
- Initialize log configuration properly.

### Client:

- Handle `-q` flag in `docker ps` properly when there is a default format.

### Networking

- Fix several corner cases with netlink.

### Contrib

- Fix several issues with bash completion.

## 1.8.1 (2015-08-12)

### Distribution

* Fix a bug where pushing multiple tags would result in invalid images

## 1.8.0 (2015-08-11)

### Distribution

+ Trusted pull, push and build, disabled by default
* Make tar layers deterministic between registries
* Don't allow deleting the image of running containers
* Check if a tag name to load is a valid digest
* Allow one character repository names
* Add a more accurate error description for invalid tag name
* Make build cache ignore mtime

### Cli

+ Add support for DOCKER_CONFIG/--config to specify config file dir
+ Add --type flag  for docker inspect command
+ Add formatting options to `docker ps` with `--format`
+ Replace `docker -d` with new subcommand `docker daemon`
* Zsh completion updates and improvements
* Add some missing events to bash completion
* Support daemon urls with base paths in `docker -H`
* Validate status= filter to docker ps
* Display when a container is in --net=host in docker ps
* Extend docker inspect to export image metadata related to graph driver
* Restore --default-gateway{,-v6} daemon options
* Add missing unpublished ports in docker ps
* Allow duration strings in `docker events` as --since/--until
* Expose more mounts information in `docker inspect`

### Runtime

+ Add new Fluentd logging driver
+ Allow `docker import` to load from local files
+ Add logging driver for GELF via UDP
+ Allow to copy files from host to containers with `docker cp`
+ Promote volume drivers from experimental to master
+ Add rollover options to json-file log driver, and --log-driver-opts flag
+ Add memory swappiness tuning options
* Remove cgroup read-only flag when privileged
* Make /proc, /sys, & /dev readonly for readonly containers
* Add cgroup bind mount by default
* Overlay: Export metadata for container and image in `docker inspect`
* Devicemapper: external device activation
* Devicemapper: Compare uuid of base device on startup
* Remove RC4 from the list of registry cipher suites
* Add syslog-facility option
* LXC execdriver compatibility with recent LXC versions
* Mark LXC execriver as deprecated (to be removed with the migration to runc)

### Plugins

* Separate plugin sockets and specs locations
* Allow TLS connections to plugins

### Bug fixes

- Add missing 'Names' field to /containers/json API output
- Make `docker rmi` of dangling images safe while pulling
- Devicemapper: Change default basesize to 100G
- Go Scheduler issue with sync.Mutex and gcc
- Fix issue where Search API endpoint would panic due to empty AuthConfig
- Set image canonical names correctly
- Check dockerinit only if lxc driver is used
- Fix ulimit usage of nproc
- Always attach STDIN if -i,--interactive is specified
- Show error messages when saving container state fails
- Fixed incorrect assumption on --bridge=none treated as disable network
- Check for invalid port specifications in host configuration
- Fix endpoint leave failure for --net=host mode
- Fix goroutine leak in the stats API if the container is not running
- Check for apparmor file before reading it
- Fix DOCKER_TLS_VERIFY being ignored
- Set umask to the default on startup
- Correct the message of pause and unpause a non-running container
- Adjust disallowed CpuShares in container creation
- ZFS: correctly apply selinux context
- Display empty string instead of <nil> when IP opt is nil
- `docker kill` returns error when container is not running
- Fix COPY/ADD quoted/json form
- Fix goroutine leak on logs -f with no output
- Remove panic in nat package on invalid hostport
- Fix container linking in Fedora 22
- Fix error caused using default gateways outside of the allocated range
- Format times in inspect command with a template as RFC3339Nano
- Make registry client to accept 2xx and 3xx http status responses as successful
- Fix race issue that caused the daemon to crash with certain layer downloads failed in a specific order.
- Fix error when the docker ps format was not valid.
- Remove redundant ip forward check.
- Fix issue trying to push images to repository mirrors.
- Fix error cleaning up network entrypoints when there is an initialization issue.

## 1.7.1 (2015-07-14)

### Runtime

- Fix default user spawning exec process with `docker exec`
- Make `--bridge=none` not to configure the network bridge
- Publish networking stats properly
- Fix implicit devicemapper selection with static binaries
- Fix socket connections that hung intermittently
- Fix bridge interface creation on CentOS/RHEL 6.6
- Fix local dns lookups added to resolv.conf
- Fix copy command mounting volumes
- Fix read/write privileges in volumes mounted with --volumes-from

### Remote API

- Fix unmarshalling of Command and Entrypoint
- Set limit for minimum client version supported
- Validate port specification
- Return proper errors when attach/reattach fail

### Distribution

- Fix pulling private images
- Fix fallback between registry V2 and V1

## 1.7.0 (2015-06-16)

### Runtime
+ Experimental feature: support for out-of-process volume plugins
* The userland proxy can be disabled in favor of hairpin NAT using the daemon’s `--userland-proxy=false` flag
* The `exec` command supports the `-u|--user` flag to specify the new process owner
+ Default gateway for containers can be specified daemon-wide using the `--default-gateway` and `--default-gateway-v6` flags
+ The CPU CFS (Completely Fair Scheduler) quota can be set in `docker run` using `--cpu-quota`
+ Container block IO can be controlled in `docker run` using`--blkio-weight`
+ ZFS support
+ The `docker logs` command supports a `--since` argument
+ UTS namespace can be shared with the host with `docker run --uts=host`

### Quality
* Networking stack was entirely rewritten as part of the libnetwork effort
* Engine internals refactoring
* Volumes code was entirely rewritten to support the plugins effort
+ Sending SIGUSR1 to a daemon will dump all goroutines stacks without exiting

### Build
+ Support ${variable:-value} and ${variable:+value} syntax for environment variables
+ Support resource management flags `--cgroup-parent`, `--cpu-period`, `--cpu-quota`, `--cpuset-cpus`, `--cpuset-mems`
+ git context changes with branches and directories
* The .dockerignore file support exclusion rules

### Distribution
+ Client support for v2 mirroring support for the official registry

### Bugfixes
* Firewalld is now supported and will automatically be used when available
* mounting --device recursively

## 1.6.2 (2015-05-13)

### Runtime
- Revert change prohibiting mounting into /sys

## 1.6.1 (2015-05-07)

### Security
- Fix read/write /proc paths (CVE-2015-3630)
- Prohibit VOLUME /proc and VOLUME / (CVE-2015-3631)
- Fix opening of file-descriptor 1 (CVE-2015-3627)
- Fix symlink traversal on container respawn allowing local privilege escalation (CVE-2015-3629)
- Prohibit mount of /sys

### Runtime
- Update AppArmor policy to not allow mounts

## 1.6.0 (2015-04-07)

### Builder
+ Building images from an image ID
+ Build containers with resource constraints, ie `docker build --cpu-shares=100 --memory=1024m...`
+ `commit --change` to apply specified Dockerfile instructions while committing the image
+ `import --change` to apply specified Dockerfile instructions while importing the image
+ Builds no longer continue in the background when canceled with CTRL-C

### Client
+ Windows Support

### Runtime
+ Container and image Labels
+ `--cgroup-parent` for specifying a parent cgroup to place container cgroup within
+ Logging drivers, `json-file`, `syslog`, or `none`
+ Pulling images by ID
+ `--ulimit` to set the ulimit on a container
+ `--default-ulimit` option on the daemon which applies to all created containers (and overwritten by `--ulimit` on run)
