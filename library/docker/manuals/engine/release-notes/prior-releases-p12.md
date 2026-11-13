---
title: "Docker Engine prior releases (part 12 of 13)"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/engine/release-notes/prior-releases.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Docker Engine prior releases (part 12 of 13)

## 0.6.7 (2013-11-21)

### Runtime

* Improve stability, fixes some race conditions
* Skip the volumes mounted when deleting the volumes of container.
* Fix layer size computation: handle hard links correctly
* Use the work Path for docker cp CONTAINER:PATH
* Fix tmp dir never cleanup
* Speedup docker ps
* More informative error message on name collisions
* Fix nameserver regex
* Always return long id's
* Fix container restart race condition
* Keep published ports on docker stop;docker start
* Fix container networking on Fedora
* Correctly express "any address" to iptables
* Fix network setup when reconnecting to ghost container
* Prevent deletion if image is used by a running container
* Lock around read operations in graph

### RemoteAPI

* Return full ID on docker rmi

### Client

+ Add -tree option to images
+ Offline image transfer
* Exit with status 2 on usage error and display usage on stderr
* Do not forward SIGCHLD to container
* Use string timestamp for docker events -since

### Other

* Update to go 1.2rc5
+ Add /etc/default/docker support to upstart

## 0.6.6 (2013-11-06)

### Runtime

* Ensure container name on register
* Fix regression in /etc/hosts
+ Add lock around write operations in graph
* Check if port is valid
* Fix restart runtime error with ghost container networking
+ Add some more colors and animals to increase the pool of generated names
* Fix issues in docker inspect
+ Escape apparmor confinement
+ Set environment variables using a file.
* Prevent docker insert to erase something
+ Prevent DNS server conflicts in CreateBridgeIface
+ Validate bind mounts on the server side
+ Use parent image config in docker build
* Fix regression in /etc/hosts

### Client

+ Add -P flag to publish all exposed ports
+ Add -notrunc and -q flags to docker history
* Fix docker commit, tag and import usage
+ Add stars, trusted builds and library flags in docker search
* Fix docker logs with tty

### RemoteAPI

* Make /events API send headers immediately
* Do not split last column docker top
+ Add size to history

### Other

+ Contrib: Desktop integration. Firefox usecase.
+ Dockerfile: bump to go1.2rc3

## 0.6.5 (2013-10-29)

### Runtime

+ Containers can now be named
+ Containers can now be linked together for service discovery
+ 'run -a', 'start -a' and 'attach' can forward signals to the container for better integration with process supervisors
+ Automatically start crashed containers after a reboot
+ Expose IP, port, and proto as separate environment vars for container links
* Allow ports to be published to specific ips
* Prohibit inter-container communication by default
- Ignore ErrClosedPipe for stdin in Container.Attach
- Remove unused field kernelVersion
* Fix issue when mounting subdirectories of /mnt in container
- Fix untag during removal of images
* Check return value of syscall.Chdir when changing working directory inside dockerinit

### Client

- Only pass stdin to hijack when needed to avoid closed pipe errors
* Use less reflection in command-line method invocation
- Monitor the tty size after starting the container, not prior
- Remove useless os.Exit() calls after log.Fatal

### Hack

+ Add initial init scripts library and a safer Ubuntu packaging script that works for Debian
* Add -p option to invoke debootstrap with http_proxy
- Update install.sh with $sh_c to get sudo/su for modprobe
* Update all the mkimage scripts to use --numeric-owner as a tar argument
* Update hack/release.sh process to automatically invoke hack/make.sh and bail on build and test issues

### Other

* Documentation: Fix the flags for nc in example
* Testing: Remove warnings and prevent mount issues
- Testing: Change logic for tty resize to avoid warning in tests
- Builder: Fix race condition in docker build with verbose output
- Registry: Fix content-type for PushImageJSONIndex method
* Contrib: Improve helper tools to generate debian and Arch linux server images

## 0.6.4 (2013-10-16)

### Runtime

- Add cleanup of container when Start() fails
* Add better comments to utils/stdcopy.go
* Add utils.Errorf for error logging
+ Add -rm to docker run for removing a container on exit
- Remove error messages which are not actually errors
- Fix `docker rm` with volumes
- Fix some error cases where an HTTP body might not be closed
- Fix panic with wrong dockercfg file
- Fix the attach behavior with -i
* Record termination time in state.
- Use empty string so TempDir uses the OS's temp dir automatically
- Make sure to close the network allocators
+ Autorestart containers by default
* Bump vendor kr/pty to commit 3b1f6487b `(syscall.O_NOCTTY)`
* lxc: Allow set_file_cap capability in container
- Move run -rm to the cli only
* Split stdout stderr
* Always create a new session for the container

### Testing

- Add aggregated docker-ci email report
- Add cleanup to remove leftover containers
* Add nightly release to docker-ci
* Add more tests around auth.ResolveAuthConfig
- Remove a few errors in tests
- Catch errClosing error when TCP and UDP proxies are terminated
* Only run certain tests with TESTFLAGS='-run TestName' make.sh
* Prevent docker-ci to test closing PRs
* Replace panic by log.Fatal in tests
- Increase TestRunDetach timeout

### Documentation

* Add initial draft of the Docker infrastructure doc
* Add devenvironment link to CONTRIBUTING.md
* Add `apt-get install curl` to Ubuntu docs
* Add explanation for export restrictions
* Add .dockercfg doc
* Remove Gentoo install notes about #1422 workaround
* Fix help text for -v option
* Fix Ping endpoint documentation
- Fix parameter names in docs for ADD command
- Fix ironic typo in changelog
* Various command fixes in postgres example
* Document how to edit and release docs
- Minor updates to `postgresql_service.rst`
* Clarify LGTM process to contributors
- Corrected error in the package name
* Document what `vagrant up` is actually doing
+ improve doc search results
* Cleanup whitespace in API 1.5 docs
* use angle brackets in MAINTAINER example email
* Update archlinux.rst
+ Changes to a new style for the docs. Includes version switcher.
* Formatting, add information about multiline json
* Improve registry and index REST API documentation
- Replace deprecated upgrading reference to docker-latest.tgz, which hasn't been updated since 0.5.3
* Update Gentoo installation documentation now that we're in the portage tree proper
* Cleanup and reorganize docs and tooling for contributors and maintainers
- Minor spelling correction of protocoll -> protocol

### Contrib

* Add vim syntax highlighting for Dockerfiles from @honza
* Add mkimage-arch.sh
* Reorganize contributed completion scripts to add zsh completion

### Hack

* Add vagrant user to the docker group
* Add proper bash completion for "docker push"
* Add xz utils as a runtime dep
* Add cleanup/refactor portion of #2010 for hack and Dockerfile updates
+ Add contrib/mkimage-centos.sh back (from #1621), and associated documentation link
* Add several of the small make.sh fixes from #1920, and make the output more consistent and contributor-friendly
+ Add @tianon to hack/MAINTAINERS
* Improve network performance for VirtualBox
* Revamp install.sh to be usable by more people, and to use official install methods whenever possible (apt repo, portage tree, etc.)
- Fix contrib/mkimage-debian.sh apt caching prevention
+ Add Dockerfile.tmLanguage to contrib
* Configured FPM to make /etc/init/docker.conf a config file
* Enable SSH Agent forwarding in Vagrant VM
* Several small tweaks/fixes for contrib/mkimage-debian.sh

### Other

- Builder: Abort build if mergeConfig returns an error and fix duplicate error message
- Packaging: Remove deprecated packaging directory
- Registry: Use correct auth config when logging in.
- Registry: Fix the error message so it is the same as the regex

## 0.6.3 (2013-09-23)

### Packaging

* Add 'docker' group on install for ubuntu package
* Update tar vendor dependency
* Download apt key over HTTPS

### Runtime

- Only copy and change permissions on non-bindmount volumes
* Allow multiple volumes-from
- Fix HTTP imports from STDIN

### Documentation

* Update section on extracting the docker binary after build
* Update development environment docs for new build process
* Remove 'base' image from documentation

### Other

- Client: Fix detach issue
- Registry: Update regular expression to match index

## 0.6.2 (2013-09-17)

### Runtime

+ Add domainname support
+ Implement image filtering with path.Match
* Remove unnecessary warnings
* Remove os/user dependency
* Only mount the hostname file when the config exists
* Handle signals within the `docker login` command
- UID and GID are now also applied to volumes
- `docker start` set error code upon error
- `docker run` set the same error code as the process started

### Builder

+ Add -rm option in order to remove intermediate containers
* Allow multiline for the RUN instruction

### Registry

* Implement login with private registry
- Fix push issues

### Other

+ Hack: Vendor all dependencies
* Remote API: Bump to v1.5
* Packaging: Break down hack/make.sh into small scripts, one per 'bundle': test, binary, ubuntu etc.
* Documentation: General improvements

## 0.6.1 (2013-08-23)

### Registry

* Pass "meta" headers in API calls to the registry

### Packaging

- Use correct upstart script with new build tool
- Use libffi-dev, don't build it from sources
- Remove duplicate mercurial install command

## 0.6.0 (2013-08-22)

### Runtime

+ Add lxc-conf flag to allow custom lxc options
+ Add an option to set the working directory
* Add Image name to LogEvent tests
+ Add -privileged flag and relevant tests, docs, and examples
* Add websocket support to /container/<name>/attach/ws
* Add warning when net.ipv4.ip_forwarding = 0
* Add hostname to environment
* Add last stable version in `docker version`
- Fix race conditions in parallel pull
- Fix Graph ByParent() to generate list of child images per parent image.
- Fix typo: fmt.Sprint -> fmt.Sprintf
- Fix small \n error un docker build
* Fix to "Inject dockerinit at /.dockerinit"
* Fix #910. print user name to docker info output
* Use Go 1.1.2 for dockerbuilder
* Use ranged for loop on channels
- Use utils.ParseRepositoryTag instead of strings.Split(name, ":") in server.ImageDelete
- Improve CMD, ENTRYPOINT, and attach docs.
- Improve connect message with socket error
- Load authConfig only when needed and fix useless WARNING
- Show tag used when image is missing
* Apply volumes-from before creating volumes
- Make docker run handle SIGINT/SIGTERM
- Prevent crash when .dockercfg not readable
- Install script should be fetched over https, not http.
* API, issue 1471: Use groups for socket permissions
- Correctly detect IPv4 forwarding
* Mount /dev/shm as a tmpfs
- Switch from http to https for get.docker.io
* Let userland proxy handle container-bound traffic
* Update the Docker CLI to specify a value for the "Host" header.
- Change network range to avoid conflict with EC2 DNS
- Reduce connect and read timeout when pinging the registry
* Parallel pull
- Handle ip route showing mask-less IP addresses
* Allow ENTRYPOINT without CMD
- Always consider localhost as a domain name when parsing the FQN repos name
* Refactor checksum

### Documentation

* Add MongoDB image example
* Add instructions for creating and using the docker group
* Add sudo to examples and installation to documentation
* Add ufw doc
* Add a reference to ps -a
* Add information about Docker's high level tools over LXC.
* Fix typo in docs for docker run -dns
* Fix a typo in the ubuntu installation guide
* Fix to docs regarding adding docker groups
* Update default -H docs
* Update readme with dependencies for building
* Update amazon.rst to explain that Vagrant is not necessary for running Docker on ec2
* PostgreSQL service example in documentation
* Suggest installing linux-headers by default.
* Change the twitter handle
* Clarify Amazon EC2 installation
* 'Base' image is deprecated and should no longer be referenced in the docs.
* Move note about officially supported kernel
- Solved the logo being squished in Safari

### Builder

+ Add USER instruction do Dockerfile
+ Add workdir support for the Buildfile
* Add no cache for docker build
- Fix docker build and docker events output
- Only count known instructions as build steps
- Make sure ENV instruction within build perform a commit each time
- Forbid certain paths within docker build ADD
- Repository name (and optionally a tag) in build usage
- Make sure ADD will create everything in 0755

### Remote API

* Sort Images by most recent creation date.
* Reworking opaque requests in registry module
* Add image name in /events
* Use mime pkg to parse Content-Type
* 650 http utils and user agent field

### Hack

+ Bash Completion: Limit commands to containers of a relevant state
* Add docker dependencies coverage testing into docker-ci

### Packaging

+ Docker-brew 0.5.2 support and memory footprint reduction
* Add new docker dependencies into docker-ci
- Revert "docker.upstart: avoid spawning a `sh` process"
+ Docker-brew and Docker standard library
+ Release docker with docker
* Fix the upstart script generated by get.docker.io
* Enabled the docs to generate manpages.
* Revert Bind daemon to 0.0.0.0 in Vagrant.

### Register

* Improve auth push
* Registry unit tests + mock registry

### Tests

* Improve TestKillDifferentUser to prevent timeout on buildbot
- Fix typo in TestBindMounts (runContainer called without image)
* Improve TestGetContainersTop so it does not rely on sleep
* Relax the lo interface test to allow iface index != 1
* Add registry functional test to docker-ci
* Add some tests in server and utils

### Other

* Contrib: bash completion script
* Client: Add docker cp command and copy api endpoint to copy container files/folders to the host
* Don't read from stdout when only attached to stdin

## 0.5.3 (2013-08-13)

### Runtime

* Use docker group for socket permissions
- Spawn shell within upstart script
- Handle ip route showing mask-less IP addresses
- Add hostname to environment

### Builder

- Make sure ENV instruction within build perform a commit each time

## 0.5.2 (2013-08-08)

* Builder: Forbid certain paths within docker build ADD
- Runtime: Change network range to avoid conflict with EC2 DNS
* API: Change daemon to listen on unix socket by default
