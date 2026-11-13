---
title: "populate a cache and also consult it (part 2 of 9)"
tool: "podman"
version: "6.2"
source: "https://github.com/containers/podman/blob/055de046937d29450f310fce0fe3071485d8bed9/docs/source/markdown/podman-build.1.md.in"
commit: "055de046937d29450f310fce0fe3071485d8bed9"
license: "Apache-2.0"
---

# populate a cache and also consult it (part 2 of 9)

## OPTIONS

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

#### **--all-platforms**

Instead of building for a set of platforms specified using the **--platform** option, inspect the build's base images, and build for all of the platforms for which they are all available.  Stages that use *scratch* as a starting point can not be inspected, so at least one non-*scratch* stage must be present for detection to work usefully.

#### **--arch**=*arch*

Set the architecture of the image to be built, and that of the base image to be
pulled, if the build uses one, to the provided value instead of using the
architecture of the build host. Unless overridden, subsequent lookups of the
same image in the local storage matches this architecture, regardless of the
host. (Examples: arm, arm64, 386, amd64, ppc64le, s390x)

<< if is_quadlet >>
### `AuthFile=path`
<< else >>
#### **--authfile**=*path*
<< endif >>

Path of the authentication file. Default is `${XDG_RUNTIME_DIR}/containers/auth.json` on Linux, and `$HOME/.config/containers/auth.json` on Windows/macOS.
The file is created by **podman login**. If the authorization state is not found there, `$HOME/.docker/config.json` is checked, which is set using **docker login**.

Note: There is also the option to override the default path of the authentication file by setting the `REGISTRY_AUTH_FILE` environment variable. This can be done with **export REGISTRY_AUTH_FILE=_path_**.

#### **--build-arg**=*arg=value*

Specifies a build argument and its value, which is interpolated in
instructions read from the Containerfiles in the same way that environment variables are, but which are not added to environment variable list in the resulting image's configuration.

#### **--build-arg-file**=*path*

Specifies a file containing lines of build arguments of the form `arg=value`.
The suggested file name is `argfile.conf`.

Comment lines beginning with `#` are ignored, along with blank lines.
All others must be of the `arg=value` format passed to `--build-arg`.

If several arguments are provided via the `--build-arg-file`
and `--build-arg` options, the build arguments are merged across all
of the provided files and command line arguments.

Any file provided in a `--build-arg-file` option is read before
the arguments supplied via the `--build-arg` option.

When a given argument name is specified several times, the last instance
is the one that is passed to the resulting builds. This means `--build-arg`
values always override those in a `--build-arg-file`.

#### **--build-context**=*name=value*

Specify an additional build context using its short name and its location.
Additional build contexts can be referenced in the same manner as we access
different stages in COPY instruction.

Valid values are:

* Local directory – e.g. --build-context project2=../path/to/project2/src
* HTTP URL to a tarball – e.g. --build-context src=https://example.org/releases/src.tar
* Container image – specified with a container-image:// prefix, e.g. --build-context alpine=container-image://alpine:3.15, (also accepts docker://, docker-image://)

On the Containerfile side, reference the build context on all
commands that accept the “from” parameter. Here’s how that might look:

```dockerfile
FROM [name]
COPY --from=[name] ...
RUN --mount=from=[name] …
```

The value of [name] is matched with the following priority order:

* Named build context defined with --build-context [name]=..
* Stage defined with AS [name] inside Containerfile
* Image [name], either local or in a remote registry

#### **--cache-from**=*image*

Repository to utilize as a potential cache source. When specified, Buildah tries to look for
cache images in the specified repository and attempts to pull cache images instead of actually
executing the build steps locally. Buildah only attempts to pull previously cached images if they
are considered as valid cache hits.

Use the `--cache-to` option to populate a remote repository with cache content.

Example

```bash
# populate a cache and also consult it
buildah build -t test --layers --cache-to registry/myrepo/cache --cache-from registry/myrepo/cache .
```

Note: `--cache-from` option is ignored unless `--layers` is specified.

#### **--cache-to**=*image*

Set this flag to specify a remote repository that is used to store cache images. Buildah attempts to
push newly built cache image to the remote repository.

Note: Use the `--cache-from` option in order to use cache content in a remote repository.

Example

```bash
# populate a cache and also consult it
buildah build -t test --layers --cache-to registry/myrepo/cache --cache-from registry/myrepo/cache .
```

Note: `--cache-to` option is ignored unless `--layers` is specified.

#### **--cache-ttl**

Limit the use of cached images to only consider images with created timestamps less than *duration* ago.
For example if `--cache-ttl=1h` is specified, Buildah considers intermediate cache images which are created
under the duration of one hour, and intermediate cache images outside this duration is ignored.

Note: Setting `--cache-ttl=0` manually is equivalent to using `--no-cache` in the
implementation since this means that the user does not want to use cache at all.

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
### `DropCapability=capability`
<< else >>
#### **--cap-drop**=*capability*
<< endif >>

Drop these capabilities from the default podman capability set, or `all` to drop all capabilities.

This is a space separated list of capabilities.

<< if is_quadlet >>
