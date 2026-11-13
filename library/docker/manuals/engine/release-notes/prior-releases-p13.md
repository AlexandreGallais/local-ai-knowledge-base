---
title: "Docker Engine prior releases (part 13 of 13)"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/engine/release-notes/prior-releases.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Docker Engine prior releases (part 13 of 13)

## 0.5.1 (2013-07-30)

### Runtime

+ Add `ps` args to `docker top`
+ Add support for container ID files (pidfile like)
+ Add container=lxc in default env
+ Support networkless containers with `docker run -n` and `docker -d -b=none`
* Stdout/stderr logs are now stored in the same file as JSON
* Allocate a /16 IP range by default, with fallback to /24. Try 12 ranges instead of 3.
* Change .dockercfg format to json and support multiple auth remote
- Do not override volumes from config
- Fix issue with EXPOSE override

### API

+ Docker client now sets useragent (RFC 2616)
+ Add /events endpoint

### Builder

+ ADD command now understands URLs
+ CmdAdd and CmdEnv now respect Dockerfile-set ENV variables
- Create directories with 755 instead of 700 within ADD instruction

### Hack

* Simplify unit tests with helpers
* Improve docker.upstart event
* Add coverage testing into docker-ci

## 0.5.0 (2013-07-17)

### Runtime

+ List all processes running inside a container with 'docker top'
+ Host directories can be mounted as volumes with 'docker run -v'
+ Containers can expose public UDP ports (eg, '-p 123/udp')
+ Optionally specify an exact public port (eg. '-p 80:4500')
* 'docker login' supports additional options
- Don't save a container's hostname when committing an image.

### Registry

+ New image naming scheme inspired by Go packaging convention allows arbitrary combinations of registries
- Fix issues when uploading images to a private registry

### Builder

+ ENTRYPOINT instruction sets a default binary entry point to a container
+ VOLUME instruction marks a part of the container as persistent data
* 'docker build' displays the full output of a build by default

## 0.4.8 (2013-07-01)

+ Builder: New build operation ENTRYPOINT adds an executable entry point to the container.  - Runtime: Fix a bug which caused 'docker run -d' to no longer print the container ID.
- Tests: Fix issues in the test suite

## 0.4.7 (2013-06-28)

### Remote API

* The progress bar updates faster when downloading and uploading large files
- Fix a bug in the optional unix socket transport

### Runtime

* Improve detection of kernel version
+ Host directories can be mounted as volumes with 'docker run -b'
- fix an issue when only attaching to stdin
* Use 'tar --numeric-owner' to avoid uid mismatch across multiple hosts

### Hack

* Improve test suite and dev environment
* Remove dependency on unit tests on 'os/user'

### Other

* Registry: easier push/pull to a custom registry
+ Documentation: add terminology section

## 0.4.6 (2013-06-22)

- Runtime: fix a bug which caused creation of empty images (and volumes) to crash.

## 0.4.5 (2013-06-21)

+ Builder: 'docker build git://URL' fetches and builds a remote git repository
* Runtime: 'docker ps -s' optionally prints container size
* Tests: improved and simplified
- Runtime: fix a regression introduced in 0.4.3 which caused the logs command to fail.
- Builder: fix a regression when using ADD with single regular file.

## 0.4.4 (2013-06-19)

- Builder: fix a regression introduced in 0.4.3 which caused builds to fail on new clients.

## 0.4.3 (2013-06-19)

### Builder

+ ADD of a local file will detect tar archives and unpack them
* ADD improvements: use tar for copy + automatically unpack local archives
* ADD uses tar/untar for copies instead of calling 'cp -ar'
* Fix the behavior of ADD to be (mostly) reverse-compatible, predictable and well-documented.
- Fix a bug which caused builds to fail if ADD was the first command
* Nicer output for 'docker build'

### Runtime

* Remove bsdtar dependency
* Add unix socket and multiple -H support
* Prevent rm of running containers
* Use go1.1 cookiejar
- Fix issue detaching from running TTY container
- Forbid parallel push/pull for a single image/repo. Fixes `#311`
- Fix race condition within Run command when attaching.

### Client

* HumanReadable ProgressBar sizes in pull
* Fix docker version's git commit output

### API

* Send all tags on History API call
* Add tag lookup to history command. Fixes #882

### Documentation

- Fix missing command in irc bouncer example

## 0.4.2 (2013-06-17)

- Packaging: Bumped version to work around an Ubuntu bug

## 0.4.1 (2013-06-17)

### Remote Api

+ Add flag to enable cross domain requests
+ Add images and containers sizes in docker ps and docker images

### Runtime

+ Configure dns configuration host-wide with 'docker -d -dns'
+ Detect faulty DNS configuration and replace it with a public default
+ Allow docker run <name>:<id>
+ You can now specify public port (ex: -p 80:4500)
* Improve image removal to garbage-collect unreferenced parents

### Client

* Allow multiple params in inspect
* Print the container id before the hijack in `docker run`

### Registry

* Add regexp check on repo's name
* Move auth to the client
- Remove login check on pull

### Other

* Vagrantfile: Add the rest api port to vagrantfile's port_forward
* Upgrade to Go 1.1
- Builder: don`t ignore last line in Dockerfile when it doesn`t end with \n

## 0.4.0 (2013-06-03)

### Builder

+ Introducing Builder
+ 'docker build' builds a container, layer by layer, from a source repository containing a Dockerfile

### Remote API

+ Introducing Remote API
+ control Docker programmatically using a simple HTTP/json API

### Runtime

* Various reliability and usability improvements

## 0.3.4 (2013-05-30)

### Builder

+ 'docker build' builds a container, layer by layer, from a source repository containing a Dockerfile
+ 'docker build -t FOO' applies the tag FOO to the newly built container.

### Runtime

+ Interactive TTYs correctly handle window resize
* Fix how configuration is merged between layers

### Remote API

+ Split stdout and stderr on 'docker run'
+ Optionally listen on a different IP and port (use at your own risk)

### Documentation

* Improve install instructions.

## 0.3.3 (2013-05-23)

- Registry: Fix push regression
- Various bugfixes

## 0.3.2 (2013-05-09)

### Registry

* Improve the checksum process
* Use the size to have a good progress bar while pushing
* Use the actual archive if it exists in order to speed up the push
- Fix error 400 on push

### Runtime

* Store the actual archive on commit

## 0.3.1 (2013-05-08)

### Builder

+ Implement the autorun capability within docker builder
+ Add caching to docker builder
+ Add support for docker builder with native API as top level command
+ Implement ENV within docker builder
- Check the command existence prior create and add Unit tests for the case
* use any whitespaces instead of tabs

### Runtime

+ Add go version to debug infos
* Kernel version - don't show the dash if flavor is empty

### Registry

+ Add docker search top level command in order to search a repository
- Fix pull for official images with specific tag
- Fix issue when login in with a different user and trying to push
* Improve checksum - async calculation

### Images

+ Output graph of images to dot (graphviz)
- Fix ByParent function

### Documentation

+ New introduction and high-level overview
+ Add the documentation for docker builder
- CSS fix for docker documentation to make REST API docs look better.
- Fix CouchDB example page header mistake
- Fix README formatting
* Update www.docker.io website.

### Other

+ Website: new high-level overview
- Makefile: Swap "go get" for "go get -d", especially to compile on go1.1rc
* Packaging: packaging ubuntu; issue #510: Use golang-stable PPA package to build docker

## 0.3.0 (2013-05-06)

### Runtime

- Fix the command existence check
- strings.Split may return an empty string on no match
- Fix an index out of range crash if cgroup memory is not

### Documentation

* Various improvements
+ New example: sharing data between 2 couchdb databases

### Other

* Vagrant: Use only one deb line in /etc/apt
+ Registry: Implement the new registry

## 0.2.2 (2013-05-03)

+ Support for data volumes ('docker run -v=PATH')
+ Share data volumes between containers ('docker run -volumes-from')
+ Improve documentation
* Upgrade to Go 1.0.3
* Various upgrades to the dev environment for contributors

## 0.2.1 (2013-05-01)

+ 'docker commit -run' bundles a layer with default runtime options: command, ports etc.
* Improve install process on Vagrant
+ New Dockerfile operation: "maintainer"
+ New Dockerfile operation: "expose"
+ New Dockerfile operation: "cmd"
+ Contrib script to build a Debian base layer
+ 'docker -d -r': restart crashed containers at daemon startup
* Runtime: improve test coverage

## 0.2.0 (2013-04-23)

- Runtime: ghost containers can be killed and waited for
* Documentation: update install instructions
- Packaging: fix Vagrantfile
- Development: automate releasing binaries and ubuntu packages
+ Add a changelog
- Various bugfixes

## 0.1.8 (2013-04-22)

- Dynamically detect cgroup capabilities
- Issue stability warning on kernels <3.8
- 'docker push' buffers on disk instead of memory
- Fix 'docker diff' for removed files
- Fix 'docker stop' for ghost containers
- Fix handling of pidfile
- Various bugfixes and stability improvements

## 0.1.7 (2013-04-18)

- Container ports are available on localhost
- 'docker ps' shows allocated TCP ports
- Contributors can run 'make hack' to start a continuous integration VM
- Streamline ubuntu packaging & uploading
- Various bugfixes and stability improvements

## 0.1.6 (2013-04-17)

- Record the author an image with 'docker commit -author'

## 0.1.5 (2013-04-17)

- Disable standalone mode
- Use a custom DNS resolver with 'docker -d -dns'
- Detect ghost containers
- Improve diagnosis of missing system capabilities
- Allow disabling memory limits at compile time
- Add debian packaging
- Documentation: installing on Arch Linux
- Documentation: running Redis on docker
- Fix lxc 0.9 compatibility
- Automatically load aufs module
- Various bugfixes and stability improvements

## 0.1.4 (2013-04-09)

- Full support for TTY emulation
- Detach from a TTY session with the escape sequence `C-p C-q`
- Various bugfixes and stability improvements
- Minor UI improvements
- Automatically create our own bridge interface 'docker0'

## 0.1.3 (2013-04-04)

- Choose TCP frontend port with '-p :PORT'
- Layer format is versioned
- Major reliability improvements to the process manager
- Various bugfixes and stability improvements

## 0.1.2 (2013-04-03)

- Set container hostname with 'docker run -h'
- Selective attach at run with 'docker run -a [stdin[,stdout[,stderr]]]'
- Various bugfixes and stability improvements
- UI polish
- Progress bar on push/pull
- Use XZ compression by default
- Make IP allocator lazy

## 0.1.1 (2013-03-31)

- Display shorthand IDs for convenience
- Stabilize process management
- Layers can include a commit message
- Simplified 'docker attach'
- Fix support for re-attaching
- Various bugfixes and stability improvements
- Auto-download at run
- Auto-login on push
- Beefed up documentation

## 0.1.0 (2013-03-23)

Initial public release

- Implement registry in order to push/pull images
- TCP port allocation
- Fix termcaps on Linux
- Add documentation
- Add Vagrant support with Vagrantfile
- Add unit tests
- Add repository/tags to ease image management
- Improve the layer implementation
