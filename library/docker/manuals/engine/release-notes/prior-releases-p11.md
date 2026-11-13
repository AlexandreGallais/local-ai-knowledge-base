---
title: "Docker Engine prior releases (part 11 of 13)"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/engine/release-notes/prior-releases.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Docker Engine prior releases (part 11 of 13)

## 0.8.1 (2014-02-18)

### Builder

- Avoid extra mount/unmount during build. This removes an unneeded mount/unmount operation which was causing problems with devicemapper
- Fix regression with ADD of tar files. This stops Docker from decompressing tarballs added via ADD from the local file system
- Add error to `docker build --rm`. This adds a missing error check to ensure failures to remove containers are detected and reported

### Documentation

* Update issue filing instructions
* Warn against the use of symlinks for Docker's storage folder
* Replace the Firefox example with an IceWeasel example
* Rewrite the PostgreSQL example using a Dockerfile and add more details to it
* Improve the OS X documentation

### Remote API

- Fix broken images API for version less than 1.7
- Use the right encoding for all API endpoints which return JSON
- Move remote api client to api/
- Queue calls to the API using generic socket wait

### Runtime

- Fix the use of custom settings for bridges and custom bridges
- Refactor the devicemapper code to avoid many mount/unmount race conditions and failures
- Remove two panics which could make Docker crash in some situations
- Don't ping registry from the CLI client
- Enable skip_block_zeroing for devicemapper. This stops devicemapper from always zeroing entire blocks
- Fix --run in `docker commit`. This makes docker commit store `--run` in the image configuration
- Remove directory when removing devicemapper device. This cleans up leftover mount directories
- Drop NET_ADMIN capability for non-privileged containers. Unprivileged containers can't change their network configuration
- Ensure `docker cp` stream is closed properly
- Avoid extra mount/unmount during container registration. This removes an unneeded mount/unmount operation which was causing problems with devicemapper
- Stop allowing tcp:// as a default tcp bin address which binds to 127.0.0.1:4243 and remove the default port
+ Mount-bind the PTY as container console. This allows tmux and screen to run in a container
- Clean up archive closing. This fixes and improves archive handling
- Fix engine tests on systems where temp directories are symlinked
- Add test methods for save and load
- Avoid temporarily unmounting the container when restarting it. This fixes a race for devicemapper during restart
- Support submodules when building from a GitHub repository
- Quote volume path to allow spaces
- Fix remote tar ADD behavior. This fixes a regression which was causing Docker to extract tarballs

## 0.8.0 (2014-02-04)

### Notable features since 0.7.0

* Images and containers can be removed much faster
* Building an image from source with docker build is now much faster
* The Docker daemon starts and stops much faster
* The memory footprint of many common operations has been reduced, by streaming files instead of buffering them in memory, fixing memory leaks, and fixing various suboptimal memory allocations
* Several race conditions were fixed, making Docker more stable under very high concurrency load. This makes Docker more stable and less likely to crash and reduces the memory footprint of many common operations
* All packaging operations are now built on the Go language’s standard tar implementation, which is bundled with Docker itself. This makes packaging more portable across host distributions, and solves several issues caused by quirks and incompatibilities between different distributions of tar
* Docker can now create, remove and modify larger numbers of containers and images graciously thanks to more aggressive releasing of system resources. For example the storage driver API now allows Docker to do reference counting on mounts created by the drivers
With the ongoing changes to the networking and execution subsystems of docker testing these areas have been a focus of the refactoring.  By moving these subsystems into separate packages we can test, analyze, and monitor coverage and quality of these packages
* Many components have been separated into smaller sub-packages, each with a dedicated test suite. As a result the code is better-tested, more readable and easier to change

* The ADD instruction now supports caching, which avoids unnecessarily re-uploading the same source content again and again when it hasn’t changed
* The new ONBUILD instruction adds to your image a “trigger” instruction to be executed at a later time, when the image is used as the base for another build
* Docker now ships with an experimental storage driver which uses the BTRFS filesystem for copy-on-write
* Docker is officially supported on Mac OS X
* The Docker daemon supports systemd socket activation

## 0.7.6 (2014-01-14)

### Builder

* Do not follow symlink outside of build context

### Runtime

- Remount bind mounts when ro is specified
* Use https for fetching docker version

### Other

* Inline the test.docker.io fingerprint
* Add ca-certificates to packaging documentation

## 0.7.5 (2014-01-09)

### Builder

* Disable compression for build. More space usage but a much faster upload
- Fix ADD caching for certain paths
- Do not compress archive from git build

### Documentation

- Fix error in GROUP add example
* Make sure the GPG fingerprint is inline in the documentation
* Give more specific advice on setting up signing of commits for DCO

### Runtime

- Fix misspelled container names
- Do not add hostname when networking is disabled
* Return most recent image from the cache by date
- Return all errors from docker wait
* Add Content-Type Header "application/json" to GET /version and /info responses

### Other

* Update DCO to version 1.1
+ Update Makefile to use "docker:GIT_BRANCH" as the generated image name
* Update Travis to check for new 1.1 DCO version

## 0.7.4 (2014-01-07)

### Builder

- Fix ADD caching issue with . prefixed path
- Fix docker build on devicemapper by reverting sparse file tar option
- Fix issue with file caching and prevent wrong cache hit
* Use same error handling while unmarshalling CMD and ENTRYPOINT

### Documentation

* Simplify and streamline Amazon Quickstart
* Install instructions use unprefixed Fedora image
* Update instructions for mtu flag for Docker on GCE
+ Add Ubuntu Saucy to installation
- Fix for wrong version warning on master instead of latest

### Runtime

- Only get the image's rootfs when we need to calculate the image size
- Correctly handle unmapping UDP ports
* Make CopyFileWithTar use a pipe instead of a buffer to save memory on docker build
- Fix login message to say pull instead of push
- Fix "docker load" help by removing "SOURCE" prompt and mentioning STDIN
* Make blank -H option default to the same as no -H was sent
* Extract cgroups utilities to own submodule

### Other

+ Add Travis CI configuration to validate DCO and gofmt requirements
+ Add Developer Certificate of Origin Text
* Upgrade VBox Guest Additions
* Check standalone header when pinging a registry server

## 0.7.3 (2014-01-02)

### Builder

+ Update ADD to use the image cache, based on a hash of the added content
* Add error message for empty Dockerfile

### Documentation

- Fix outdated link to the "Introduction" on www.docker.io
+ Update the docs to get wider when the screen does
- Add information about needing to install LXC when using raw binaries
* Update Fedora documentation to disentangle the docker and docker.io conflict
* Add a note about using the new `-mtu` flag in several GCE zones
+ Add FrugalWare installation instructions
+ Add a more complete example of `docker run`
- Fix API documentation for creating and starting Privileged containers
- Add missing "name" parameter documentation on "/containers/create"
* Add a mention of `lxc-checkconfig` as a way to check for some of the necessary kernel configuration
- Update the 1.8 API documentation with some additions that were added to the docs for 1.7

### Hack

- Add missing libdevmapper dependency to the packagers documentation
* Update minimum Go requirement to a hard line at Go 1.2+
* Many minor improvements to the Vagrantfile
+ Add ability to customize dockerinit search locations when compiling (to be used very sparingly only by packagers of platforms who require a nonstandard location)
+ Add coverprofile generation reporting
- Add `-a` to our Go build flags, removing the need for recompiling the stdlib manually
* Update Dockerfile to be more canonical and have less spurious warnings during build
- Fix some miscellaneous `docker pull` progress bar display issues
* Migrate more miscellaneous packages under the "pkg" folder
* Update TextMate highlighting to automatically be enabled for files named "Dockerfile"
* Reorganize syntax highlighting files under a common "contrib/syntax" directory
* Update install.sh script (https://get.docker.io/) to not fail if busybox fails to download or run at the end of the Ubuntu/Debian installation
* Add support for container names in bash completion

### Packaging

+ Add an official Docker client binary for Darwin (Mac OS X)
* Remove empty "Vendor" string and added "License" on deb package
+ Add a stubbed version of "/etc/default/docker" in the deb package

### Runtime

* Update layer application to extract tars in place, avoiding file churn while handling whiteouts
- Fix permissiveness of mtime comparisons in tar handling (since GNU tar and Go tar do not yet support sub-second mtime precision)
* Reimplement `docker top` in pure Go to work more consistently, and even inside Docker-in-Docker (thus removing the shell injection vulnerability present in some versions of `lxc-ps`)
+ Update `-H unix://` to work similarly to `-H tcp://` by inserting the default values for missing portions
- Fix more edge cases regarding dockerinit and deleted or replaced docker or dockerinit files
* Update container name validation to include '.'
- Fix use of a symlink or non-absolute path as the argument to `-g` to work as expected
* Update to handle external mounts outside of LXC, fixing many small mounting quirks and making future execution backends and other features simpler
* Update to use proper box-drawing characters everywhere in `docker images -tree`
* Move MTU setting from LXC configuration to directly use netlink
* Add `-S` option to external tar invocation for more efficient spare file handling
+ Add arch/os info to User-Agent string, especially for registry requests
+ Add `-mtu` option to Docker daemon for configuring MTU
- Fix `docker build` to exit with a non-zero exit code on error
+ Add `DOCKER_HOST` environment variable to configure the client `-H` flag without specifying it manually for every invocation

## 0.7.2 (2013-12-16)

### Runtime

+ Validate container names on creation with standard regex
* Increase maximum image depth to 127 from 42
* Continue to move api endpoints to the job api
+ Add -bip flag to allow specification of dynamic bridge IP via CIDR
- Allow bridge creation when ipv6 is not enabled on certain systems
* Set hostname and IP address from within dockerinit
* Drop capabilities from within dockerinit
- Fix volumes on host when symlink is present the image
- Prevent deletion of image if ANY container is depending on it even if the container is not running
* Update docker push to use new progress display
* Use os.Lstat to allow mounting unix sockets when inspecting volumes
- Adjust handling of inactive user login
- Add missing defines in devicemapper for older kernels
- Allow untag operations with no container validation
- Add auth config to docker build

### Documentation

* Add more information about Docker logging
+ Add RHEL documentation
* Add a direct example for changing the CMD that is run in a container
* Update Arch installation documentation
+ Add section on Trusted Builds
+ Add Network documentation page

### Other

+ Add new cover bundle for providing code coverage reporting
* Separate integration tests in bundles
* Make Tianon the hack maintainer
* Update mkimage-debootstrap with more tweaks for keeping images small
* Use https to get the install script
* Remove vendored dotcloud/tar now that Go 1.2 has been released

## 0.7.1 (2013-12-05)

### Documentation

+ Add @SvenDowideit as documentation maintainer
+ Add links example
+ Add documentation regarding ambassador pattern
+ Add Google Cloud Platform docs
+ Add dockerfile best practices
* Update doc for RHEL
* Update doc for registry
* Update Postgres examples
* Update doc for Ubuntu install
* Improve remote api doc

### Runtime

+ Add hostconfig to docker inspect
+ Implement `docker log -f` to stream logs
+ Add env variable to disable kernel version warning
+ Add -format to `docker inspect`
+ Support bind-mount for files
- Fix bridge creation on RHEL
- Fix image size calculation
- Make sure iptables are called even if the bridge already exists
- Fix issue with stderr only attach
- Remove init layer when destroying a container
- Fix same port binding on different interfaces
- `docker build` now returns the correct exit code
- Fix `docker port` to display correct port
- `docker build` now check that the dockerfile exists client side
- `docker attach` now returns the correct exit code
- Remove the name entry when the container does not exist

### Registry

* Improve progress bars, add ETA for downloads
* Simultaneous pulls now waits for the first to finish instead of failing
- Tag only the top-layer image when pushing to registry
- Fix issue with offline image transfer
- Fix issue preventing using ':' in password for registry

### Other

+ Add pprof handler for debug
+ Create a Makefile
* Use stdlib tar that now includes fix
* Improve make.sh test script
* Handle SIGQUIT on the daemon
* Disable verbose during tests
* Upgrade to go1.2 for official build
* Improve unit tests
* The test suite now runs all tests even if one fails
* Refactor C in Go (Devmapper)
- Fix OS X compilation

## 0.7.0 (2013-11-25)

### Notable features since 0.6.0

* Storage drivers: choose from aufs, device-mapper, or vfs.
* Standard Linux support: docker now runs on unmodified Linux kernels and all major distributions.
* Links: compose complex software stacks by connecting containers to each other.
* Container naming: organize your containers by giving them memorable names.
* Advanced port redirects: specify port redirects per interface, or keep sensitive ports private.
* Offline transfer: push and pull images to the filesystem without losing information.
* Quality: numerous bugfixes and small usability improvements. Significant increase in test coverage.
