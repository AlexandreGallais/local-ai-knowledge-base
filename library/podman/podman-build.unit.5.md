---
title: "NAME (part 1 of 3)"
tool: "podman"
version: "6.2"
source: "https://github.com/containers/podman/blob/055de046937d29450f310fce0fe3071485d8bed9/docs/source/markdown/podman-build.unit.5.md.in"
commit: "055de046937d29450f310fce0fe3071485d8bed9"
license: "Apache-2.0"
---

% podman-build.unit 5

# NAME

podman\-build.unit - systemd unit files for building container images using Podman Quadlet

# SYNOPSIS

*name*.build

# DESCRIPTION

Build files are named with a `.build` extension and contain a section `[Build]` describing the image
build command. The generated service is a one-shot service that ensures that the image is built on
the host from a supplied Containerfile and context directory. Subsequent (re-)starts of the
generated build service will usually finish quickly, as image layer caching will skip unchanged
build steps.

A minimal `.build` unit needs at least `ImageTag=` and either `File=` or `SetWorkingDirectory=`.

Using build units allows containers and volumes to depend on images being built locally. This can be
interesting for creating container images not available on container registries, or for local
testing and development.

# USAGE SUMMARY

The `.build` file is parsed by the `podman-system-generator` at boot or reload, generating a systemd
`.service` that runs `podman build`. That service can be managed like any other unit:

```bash
systemctl --user start myimage-build.service
```

The resulting image can be referenced by `.container` or `.volume` units via:

```ini
Image=myimage.build
```

# OPTIONS

Valid options for `[Build]` section are listed below:

| **[Build] options**                 | **podman build equivalent**                 |
|-------------------------------------|---------------------------------------------|
| Annotation=annotation=value         | --annotation=annotation=value               |
| Arch=aarch64                        | --arch=aarch64                              |
| AuthFile=/etc/registry/auth\.json   | --authfile=/etc/registry/auth\.json         |
| ContainersConfModule=/etc/nvd\.conf | --module=/etc/nvd\.conf                     |
| DNS=192.168.55.1                    | --dns=192.168.55.1                          |
| DNSOption=ndots:1                   | --dns-option=ndots:1                        |
| DNSSearch=example.com               | --dns-search example.com                    |
| Environment=foo=bar                 | --env foo=bar                               |
| File=/path/to/Containerfile         | --file=/path/to/Containerfile               |
| ForceRM=false                       | --force-rm=false                            |
| GlobalArgs=--log-level=debug        | --log-level=debug                           |
| GroupAdd=keep-groups                | --group-add=keep-groups                     |
| ImageTag=localhost/imagename        | --tag=localhost/imagename                   |
| Label=label                         | --label=label                               |
| Network=host                        | --network=host                              |
| PodmanArgs=--pull never             | --pull never                                |
| Pull=never                          | --pull never                                |
| Retry=5                             | --retry=5                                   |
| RetryDelay=10s                      | --retry-delay=10s                           |
| Secret=<example-value>                       | --secret=<example-value>,src=path               |
| SetWorkingDirectory=unit            | Set `WorkingDirectory` of systemd unit file |
| Target=my-app                       | --target=my-app                             |
| TLSVerify=false                     | --tls-verify=false                          |
| Variant=arm/v7                      | --variant=arm/v7                            |
| Volume=/source:/dest                | --volume /source:/dest                      |

<< if is_quadlet >>
### `Arch=ARCH`
<< else >>
#### **--arch**=*ARCH*
<< endif >>

Override the architecture, defaults to the host, of the image to be pulled. For example, `arm`.
Unless overridden, subsequent lookups of the same image in the local storage matches this architecture, regardless of the host.

<< if is_quadlet >>
### `AuthFile=path`
<< else >>
#### **--authfile**=*path*
<< endif >>

Path of the authentication file. Default is `${XDG_RUNTIME_DIR}/containers/auth.json` on Linux, and `$HOME/.config/containers/auth.json` on Windows/macOS.
The file is created by **podman login**. If the authorization state is not found there, `$HOME/.docker/config.json` is checked, which is set using **docker login**.

Note: There is also the option to override the default path of the authentication file by setting the `REGISTRY_AUTH_FILE` environment variable. This can be done with **export REGISTRY_AUTH_FILE=_path_**.

<< if is_quadlet >>
### `ContainersConfModule=module`
<< else >>
#### **--module**=*module*
<< endif >>

Load the specified containers.conf(5) module.

This option can be listed multiple times.

<< if is_quadlet >>
### `DNS=ipaddr`
<< else >>
#### **--dns**=*ipaddr*
<< endif >>

Set custom DNS servers.

This option can be used to override the DNS
configuration passed to the container. Typically this is necessary when the
host DNS configuration is invalid for the container (e.g., **127.0.0.1**). When this
is the case, the << '**DNS=.**' if is_quadlet else '**--dns**' >> flag is necessary for every run.

The special value **none** can be specified to disable creation of _/etc/resolv.conf_ in the container by Podman.
The _/etc/resolv.conf_ file in the image is then used without changes.

Note that **ipaddr** may be added directly to the container's _/etc/resolv.conf_.
This is not guaranteed though.  For example, passing a custom network whose *dns_enabled* is set to *true* to **--network** will result in _/etc/resolv.conf_ only referring to the aardvark-dns server.  aardvark-dns then forwards to the supplied **ipaddr** for all non-container name queries.

<< if is_quadlet >>
### `Environment=env=value [env=value ...]`
<< else >>
#### **--env**, **-e**=*env*
<< endif >>

Set environment variables.

This option allows arbitrary environment variables that are available for the process to be launched inside of the container. If an environment variable is specified without a value, Podman checks the host environment for a value and set the variable only if it is set on the host. As a special case, if an environment variable ending in __*__ is specified without a value, Podman searches the host environment for variables starting with the prefix and adds those variables to the container.

<< if is_quadlet >>
### `File=Containerfile`
<< else >>
#### **--file**, **-f**=*Containerfile*
<< endif >>

Specifies a Containerfile which contains instructions for building the image,
either a local file or an **http** or **https** URL.  If more than one
Containerfile is specified, *FROM* instructions are only accepted from the
last specified file.

<< if is_quadlet >>
Note that for a given relative path to a Containerfile, or when using a `http(s)://` URL, also set
`SetWorkingDirectory=` in order for `podman build` to find a valid context directory for the
resources specified in the Containerfile.

Note that setting a `File=` field is mandatory for a `.build` file, unless `SetWorkingDirectory` (or
a `WorkingDirectory` in the `Service` group) has also been set.
<< else >>
If a build context is not specified, and at least one Containerfile is a
local file, the directory in which it resides is used as the build
context.
<< endif >>

Specifying the option << 'File=-' if is_quadlet else '`-f -`' >> causes
the Containerfile contents to be read from stdin.

<< if is_quadlet >>
### `ForceRM=`
<< else >>
#### **--force-rm**
<< endif >>

Always remove intermediate containers after a build, even if the build fails (default true).

### `GlobalArgs=`

This key <example-value> a list of arguments passed directly after the `podman` command in the generated
file. It can be used to access Podman features otherwise unsupported by the generator. Since the
generator is unaware of what unexpected interactions can be caused by these arguments, it is not
recommended to use this option.

The format of this is a space separated list of arguments, which can optionally be individually
escaped to allow inclusion of whitespace and other control characters.

This key can be listed multiple times.

<< if is_quadlet >>
### `GroupAdd=group | keep-groups`
<< else >>
#### **--group-add**=*group* | *keep-groups*
<< endif >>

Assign additional groups to the primary user running within the container process.

- `keep-groups` is a special flag that tells Podman to keep the supplementary group access.

Allows container to use the user's supplementary group access. If file systems or
devices are only accessible by the rootless user's group, this flag tells the OCI
runtime to pass the group access into the container. Currently only available
with the `crun` OCI runtime. Note: `keep-groups` is exclusive, other groups cannot be specified
with this flag. (Not available for remote commands, including Mac and Windows (excluding WSL2) machines)

Note: `keep-groups` passes the supplementary groups that the *calling process*
already has into the container, it does not look the user's groups up at
container start. When Podman is started from a systemd user service, for example
a rootless Quadlet, the calling process is the `systemd --user` manager, which
only holds the groups the user had when that manager was started. Groups the user
is added to afterwards, for example with `usermod`, are therefore not passed into
the container. Restart the user's systemd manager to pick them up, for example
with `loginctl terminate-user <user>` followed by a new login, or by rebooting.

<< if is_quadlet >>
### `ImageTag=imageName`
<< else >>
#### **--tag**, **-t**=*imageName*
<< endif >>

Specifies the name which is assigned to the resulting image if the build process completes successfully.
If _imageName_ does not include a registry name, the registry name *localhost* is prepended to the image name.

<< if is_quadlet >>
### `Label=key=value [key=value ...]`
<< else >>
#### **--label**, **-l**=*key=value*
<< endif >>

Add metadata to a <<container|pod>>.

<< if is_quadlet >>
