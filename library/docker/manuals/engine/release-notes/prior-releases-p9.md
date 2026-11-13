---
title: "Docker Engine prior releases (part 9 of 13)"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/engine/release-notes/prior-releases.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Docker Engine prior releases (part 9 of 13)

## 1.5.0 (2015-02-10)

### Builder
+ Dockerfile to use for a given `docker build` can be specified with the `-f` flag
* Dockerfile and .dockerignore files can be themselves excluded as part of the .dockerignore file, thus preventing modifications to these files invalidating ADD or COPY instructions cache
* ADD and COPY instructions accept relative paths
* Dockerfile `FROM scratch` instruction is now interpreted as a no-base specifier
* Improve performance when exposing a large number of ports

### Hack
+ Allow client-side only integration tests for Windows
* Include docker-py integration tests against Docker daemon as part of our test suites

### Packaging
+ Support for the new version of the registry HTTP API
* Speed up `docker push` for images with a majority of already existing layers
- Fixed contacting a private registry through a proxy

### Remote API
+ A new endpoint will stream live container resource metrics and can be accessed with the `docker stats` command
+ Containers can be renamed using the new `rename` endpoint and the associated `docker rename` command
* Container `inspect` endpoint show the ID of `exec` commands running in this container
* Container `inspect` endpoint show the number of times Docker auto-restarted the container
* New types of event can be streamed by the `events` endpoint: ‘OOM’ (container died with out of memory), ‘exec_create’, and ‘exec_start'
- Fixed returned string fields which hold numeric characters incorrectly omitting surrounding double quotes

### Runtime
+ Docker daemon has full IPv6 support
+ The `docker run` command can take the `--pid=host` flag to use the host PID namespace, which makes it possible for example to debug host processes using containerized debugging tools
+ The `docker run` command can take the `--read-only` flag to make the container’s root filesystem mounted as readonly, which can be used in combination with volumes to force a container’s processes to only write to locations that will be persisted
+ Container total memory usage can be limited for `docker run` using the `--memory-swap` flag
* Major stability improvements for devicemapper storage driver
* Better integration with host system: containers will reflect changes to the host's `/etc/resolv.conf` file when restarted
* Better integration with host system: per-container iptable rules are moved to the DOCKER chain
- Fixed container exiting on out of memory to return an invalid exit code

### Other
* The HTTP_PROXY, HTTPS_PROXY, and NO_PROXY environment variables are properly taken into account by the client when connecting to the Docker daemon

## 1.4.1 (2014-12-15)

### Runtime
- Fix issue with volumes-from and bind mounts not being honored after create

## 1.4.0 (2014-12-11)

### Notable Features since 1.3.0
+ Set key=value labels to the daemon (displayed in `docker info`), applied with
  new `-label` daemon flag
+ Add support for `ENV` in Dockerfile of the form:
  `ENV name=value name2=value2...`
+ New Overlayfs Storage Driver
+ `docker info` now returns an `ID` and `Name` field
+ Filter events by event name, container, or image
+ `docker cp` now supports copying from container volumes
- Fixed `docker tag`, so it honors `--force` when overriding a tag for existing
  image.

## 1.3.3 (2014-12-11)

### Security
- Fix path traversal vulnerability in processing of absolute symbolic links (CVE-2014-9356)
- Fix decompression of xz image archives, preventing privilege escalation (CVE-2014-9357)
- Validate image IDs (CVE-2014-9358)

### Runtime
- Fix an issue when image archives are being read slowly

### Client
- Fix a regression related to stdin redirection
- Fix a regression with `docker cp` when destination is the current directory

## 1.3.2 (2014-11-20)

### Security
- Fix tar breakout vulnerability
* Extractions are now sandboxed chroot
- Security options are no longer committed to images

### Runtime
- Fix deadlock in `docker ps -f exited=1`
- Fix a bug when `--volumes-from` references a container that failed to start

### Registry
+ `--insecure-registry` now accepts CIDR notation such as 10.1.0.0/16
* Private registries whose IPs fall in the 127.0.0.0/8 range do no need the `--insecure-registry` flag
- Skip the experimental registry v2 API when mirroring is enabled

## 1.3.1 (2014-10-28)

### Security
* Prevent fallback to SSL protocols < TLS 1.0 for client, daemon and registry
+ Secure HTTPS connection to registries with certificate verification and without HTTP fallback unless `--insecure-registry` is specified

### Runtime
- Fix issue where volumes would not be shared

### Client
- Fix issue with `--iptables=false` not automatically setting `--ip-masq=false`
- Fix docker run output to non-TTY stdout

### Builder
- Fix escaping `$` for environment variables
- Fix issue with lowercase `onbuild` Dockerfile instruction
- Restrict environment variable expansion to `ENV`, `ADD`, `COPY`, `WORKDIR`, `EXPOSE`, `VOLUME` and `USER`

## 1.3.0 (2014-10-14)

### Notable features since 1.2.0
+ Docker `exec` allows you to run additional processes inside existing containers
+ Docker `create` gives you the ability to create a container via the CLI without executing a process
+ `--security-opts` options to allow user to customize container labels and apparmor profiles
+ Docker `ps` filters
- Wildcard support to COPY/ADD
+ Move production URLs to get.docker.com from get.docker.io
+ Allocate IP address on the bridge inside a valid CIDR
+ Use drone.io for PR and CI testing
+ Ability to setup an official registry mirror
+ Ability to save multiple images with docker `save`

## 1.2.0 (2014-08-20)

### Runtime
+ Make /etc/hosts /etc/resolv.conf and /etc/hostname editable at runtime
+ Auto-restart containers using policies
+ Use /var/lib/docker/tmp for large temporary files
+ `--cap-add` and `--cap-drop` to tweak what linux capability you want
+ `--device` to use devices in containers

### Client
+ `docker search` on private registries
+ Add `exited` filter to `docker ps --filter`
* `docker rm -f` now kills instead of stop
+ Support for IPv6 addresses in `--dns` flag

### Proxy
+ Proxy instances in separate processes
* Small bug fix on UDP proxy

## 1.1.2 (2014-07-23)

### Runtime
+ Fix port allocation for existing containers
+ Fix containers restart on daemon restart

### Packaging
+ Fix /etc/init.d/docker issue on Debian

## 1.1.1 (2014-07-09)

### Builder
* Fix issue with ADD

## 1.1.0 (2014-07-03)

### Notable features since 1.0.1
+ Add `.dockerignore` support
+ Pause containers during `docker commit`
+ Add `--tail` to `docker logs`

### Builder
+ Allow a tar file as context for `docker build`
* Fix issue with white-spaces and multi-lines in `Dockerfiles`

### Runtime
* Overall performance improvements
* Allow `/` as source of `docker run -v`
* Fix port allocation
* Fix bug in `docker save`
* Add links information to `docker inspect`

### Client
* Improve command line parsing for `docker commit`

### Remote API
* Improve status code for the `start` and `stop` endpoints

## 1.0.1 (2014-06-19)

### Notable features since 1.0.0
* Enhance security for the LXC driver

### Builder
* Fix `ONBUILD` instruction passed to grandchildren

### Runtime
* Fix events subscription
* Fix /etc/hostname file with host networking
* Allow `-h` and `--net=none`
* Fix issue with hotplug devices in `--privileged`

### Client
* Fix artifacts with events
* Fix a panic with empty flags
* Fix `docker cp` on Mac OS X

### Miscellaneous
* Fix compilation on Mac OS X
* Fix several races

## 1.0.0 (2014-06-09)

### Notable features since 0.12.0
* Production support

## 0.12.0 (2014-06-05)

### Notable features since 0.11.0
* 40+ various improvements to stability, performance and usability
* New `COPY` Dockerfile instruction to allow copying a local file from the context into the container without ever extracting if the file is a tar file
* Inherit file permissions from the host on `ADD`
* New `pause` and `unpause` commands to allow pausing and unpausing of containers using cgroup freezer
* The `images` command has a `-f`/`--filter` option to filter the list of images
* Add `--force-rm` to clean up after a failed build
* Standardize JSON keys in Remote API to CamelCase
* Pull from a docker run now assumes `latest` tag if not specified
* Enhance security on Linux capabilities and device nodes

## 0.11.1 (2014-05-07)

### Registry
- Fix push and pull to private registry

## 0.11.0 (2014-05-07)

### Notable features since 0.10.0

* SELinux support for mount and process labels
* Linked containers can be accessed by hostname
* Use the net `--net` flag to allow advanced network configuration such as host networking so that containers can use the host's network interfaces
* Add a ping endpoint to the Remote API to do healthchecks of your docker daemon
* Logs can now be returned with an optional timestamp
* Docker now works with registries that support SHA-512
* Multiple registry endpoints are supported to allow registry mirrors
