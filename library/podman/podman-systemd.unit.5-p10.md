---
title: "Restart service when sleep finishes (part 10 of 11)"
tool: "podman"
version: "6.2"
source: "https://github.com/containers/podman/blob/055de046937d29450f310fce0fe3071485d8bed9/docs/source/markdown/podman-systemd.unit.5.md"
commit: "055de046937d29450f310fce0fe3071485d8bed9"
license: "Apache-2.0"
---

# Restart service when sleep finishes (part 10 of 11)

## Image units [Image]

Image files are named with a `.image` extension and contain a section `[Image]` describing the
container image pull command. The generated service is a one-time command that ensures that the image
exists on the host, pulling it if needed.

Using image units allows containers and volumes to depend on images being automatically pulled. This is
particularly interesting when using special options to control image pulls.

Valid options for `[Image]` are listed below:

| **[Image] options**                    | **podman image pull equivalent**                 |
|----------------------------------------|--------------------------------------------------|
| AllTags=true                           | --all-tags                                       |
| Arch=aarch64                           | --arch=aarch64                                   |
| AuthFile=/etc/registry/auth\.json      | --authfile=/etc/registry/auth\.json              |
| CertDir=/etc/registry/certs            | --cert-dir=/etc/registry/certs                   |
| ContainersConfModule=/etc/nvd\.conf    | --module=/etc/nvd\.conf                          |
| Creds=myname\:mypassword               | --creds=myname\:mypassword                       |
| DecryptionKey=/etc/registry\.key       | --decryption-key=/etc/registry\.key              |
| GlobalArgs=--log-level=debug           | --log-level=debug                                |
| Image=quay\.io/centos/centos:latest    | podman image pull quay.io/centos/centos\:latest  |
| ImageTag=quay\.io/centos/centos:latest | Use this name when resolving `.image` references |
| OS=windows                             | --os=windows                                     |
| PodmanArgs=--os=linux                  | --os=linux                                       |
| Policy=always                          | --policy=always                                  |
| Retry=5                                | --retry=5                                        |
| RetryDelay=10s                         | --retry-delay=10s                                |
| ServiceName=name                       | Name the systemd unit `name.service`             |
| TLSVerify=false                        | --tls-verify=false                               |
| Variant=arm/v7                         | --variant=arm/v7                                 |

### `AllTags=`

All tagged images in the repository are pulled.

This is equivalent to the Podman `--all-tags` option.

### `Arch=`

Override the architecture, defaults to hosts, of the image to be pulled.

This is equivalent to the Podman `--arch` option.

### `AuthFile=`

Path of the authentication file.

This is equivalent to the Podman `--authfile` option.

### `CertDir=`

Use certificates at path (*.crt, *.cert, *.key) to connect to the registry.

This is equivalent to the Podman `--cert-dir` option.

### `ContainersConfModule=`

Load the specified containers.conf(5) module. Equivalent to the Podman `--module` option.

This key can be listed multiple times.

### `Creds=`

The `[username[:password]]` to use to authenticate with the registry, if required.

This is equivalent to the Podman `--creds` option.

### `DecryptionKey=`

The `[key[:passphrase]]` to be used for decryption of images.

This is equivalent to the Podman `--decryption-key` option.

### `GlobalArgs=`

This key contains a list of arguments passed directly between `podman` and `image`
in the generated file. It can be used to access Podman features otherwise unsupported by the generator. Since the generator is unaware
of what unexpected interactions can be caused by these arguments, it is not recommended to use
this option.

The format of this is a space separated list of arguments, which can optionally be individually
escaped to allow inclusion of whitespace and other control characters.

This key can be listed multiple times.

### `Image=`

The image to pull.
It is recommended to use a fully qualified image name rather than a short name, both for
performance and robustness reasons.

The format of the name is the same as when passed to `podman pull`. So, it supports using
`:tag` or digests to guarantee the specific image version.

### `ImageTag=`

Actual FQIN of the referenced `Image`.
Only meaningful when source is a file or directory archive.

For example, an image saved into a `docker-archive` with the following Podman command:

`podman image save --format docker-archive --output /tmp/archive-file.tar quay.io/podman/stable:latest`

requires setting
- `Image=docker-archive:/tmp/archive-file.tar`
- `ImageTag=quay.io/podman/stable:latest`

### `OS=`

Override the OS, defaults to hosts, of the image to be pulled.

This is equivalent to the Podman `--os` option.

### `PodmanArgs=`

This key contains a list of arguments passed directly to the end of the `podman image pull` command
in the generated file (right before the image name in the command line). It can be used to
access Podman features otherwise unsupported by the generator. Since the generator is unaware
of what unexpected interactions can be caused by these arguments, it is not recommended to use
this option.

The format of this is a space separated list of arguments, which can optionally be individually
escaped to allow inclusion of whitespace and other control characters.

This key can be listed multiple times.

### `Policy=`

The pull policy to use when pulling the image.

This is equivalent to the Podman `--policy` option.

### `Retry=`

Number of times to retry the image pull when a HTTP error occurs. Equivalent to the Podman `--retry` option.

### `RetryDelay=`

Delay between retries. Equivalent to the Podman `--retry-delay` option.

### `ServiceName=`

By default, Quadlet will name the systemd service unit by appending `-image` to the name of the Quadlet.
Setting this key overrides this behavior by instructing Quadlet to use the provided name.

Note, the name should not include the `.service` file extension

### `TLSVerify=`

Require HTTPS and verification of certificates when contacting registries.

This is equivalent to the Podman `--tls-verify` option.

### `Variant=`

Override the default architecture variant of the container image.

This is equivalent to the Podman `--variant` option.

## Artifact units [Artifact]

### WARNING: Experimental Unit

This unit is considered experimental and still in development. Inputs, options, and outputs are all subject to change.

Artifact units are named with a `.artifact` extension and contain a `[Artifact]` section describing
the container artifact pull command. The generated service is a one-time command that ensures that the artifact
exists on the host, pulling it if needed.

Using artifact units allows containers to depend on artifacts being automatically pulled. This is
particularly useful for managing artifacts that containers need to mount or access, the **Artifact** key is mandatory inside of the [Artifact] unit.

Valid options for `[Artifact]` are listed below:

| **[Artifact] options**                      | **podman artifact pull equivalent**                    |
|---------------------------------------------|--------------------------------------------------------|
| Artifact=quay\.io/foobar/artifact:special   | podman artifact pull quay\.io/foobar/artifact:special  |
| AuthFile=/etc/registry/auth\.json           | --authfile=/etc/registry/auth\.json                    |
| CertDir=/etc/registry/certs                 | --cert-dir=/etc/registry/certs                         |
| ContainersConfModule=/etc/nvd\.conf         | --module=/etc/nvd\.conf                                |
| Creds=username:password                     | --creds=username:password                              |
| DecryptionKey=/etc/registry\.key            | --decryption-key=/etc/registry\.key                    |
| GlobalArgs=--log-level=debug                | --log-level=debug                                      |
| PodmanArgs=--pull never                     | --pull never                                           |
| Quiet=true                                  | --quiet                                                |
| Retry=5                                     | --retry=5                                              |
| RetryDelay=10s                              | --retry-delay=10s                                      |
| ServiceName=my-artifact                     | Set the systemd service name to my-artifact.service   |
| TLSVerify=false                             | --tls-verify=false                                     |

### `Artifact=`

The artifact to pull from a registry onto the local machine. This is the only required key for artifact units.

It is required to use a fully qualified artifact name rather than a short name, both for
performance and robustness reasons.

### `AuthFile=`

Path of the authentication file.

This is equivalent to the Podman `--authfile` option.

### `CertDir=`

Use certificates at path (*.crt, *.cert, *.key) to connect to the registry.

This is equivalent to the Podman `--cert-dir` option.

### `ContainersConfModule=`

Load the specified containers.conf(5) module. Equivalent to the Podman `--module` option.

This key can be listed multiple times.

### `Creds=`

The credentials to use when contacting the registry in the format `[username[:password]]`.

This is equivalent to the Podman `--creds` option.

### `DecryptionKey=`

The `[key[:passphrase]]` to be used for decryption of artifacts.

This is equivalent to the Podman `--decryption-key` option.

### `GlobalArgs=`

This key contains a list of arguments passed directly between `podman` and `artifact`
in the generated file. It can be used to access Podman features otherwise unsupported by the generator. Since the generator is unaware
of what unexpected interactions can be caused by these arguments, it is not recommended to use
this option.

The format of this is a space separated list of arguments, which can optionally be individually
escaped to allow inclusion of whitespace and other control characters.

This key can be listed multiple times.

### `PodmanArgs=`

This key contains a list of arguments passed directly to the end of the `podman artifact pull` command
in the generated file (right before the artifact name in the command line). It can be used to
access Podman features otherwise unsupported by the generator. Since the generator is unaware
of what unexpected interactions can be caused by these arguments, it is not recommended to use
this option.

The format of this is a space separated list of arguments, which can optionally be individually
escaped to allow inclusion of whitespace and other control characters.

This key can be listed multiple times.

### `Quiet=`

Suppress output information when pulling artifacts.

This is equivalent to the Podman `--quiet` option.

### `Retry=`

Number of times to retry the artifact pull when a HTTP error occurs. Equivalent to the Podman `--retry` option.

### `RetryDelay=`

Delay between retries. Equivalent to the Podman `--retry-delay` option.

### `ServiceName=`

The (optional) name of the systemd service. If this is not specified, the default value is the same name as the unit, but with a `-artifact` suffix, i.e. a `$name.artifact` file creates a `$name-artifact.service` systemd service.

### `TLSVerify=`

Require HTTPS and verification of certificates when contacting registries.

This is equivalent to the Podman `--tls-verify` option.
## Quadlet section [Quadlet]
Some quadlet specific configuration is shared between different unit types. Those settings
can be configured in the `[Quadlet]` section.

Valid options for `[Quadlet]` are listed below:

| **[Quadlet] options**      | **Description**                                   |
|----------------------------|---------------------------------------------------|
| DefaultDependencies=false  | Disable implicit network dependencies to the unit |
| SetMountsDependency=       | Configure dependencies for mount source paths     |

### `DefaultDependencies=`

Add Quadlet's default network dependencies to the unit (default is `true`).

When set to false, Quadlet will **not** add a dependency (After=, Wants=) to
`network-online.target`/`podman-user-wait-network-online.service` to the generated unit.

Note, this option is set in the `[Quadlet]` section. The _systemd_ `[Unit]` section
has an option with the same name but a different meaning.

### `SetMountsDependency=`

Configure the systemd mount dependency generated for mount source paths. This option applies
to all mount source paths in the Quadlet file.

Valid values are:

- `Requires` (default): add `RequiresMountsFor=`. The service is stopped if the mount becomes
  inactive.
- `Wants` (systemd 256 or later): add `WantsMountsFor=`. The mount is started when the service
  starts, but the service is not stopped if the mount becomes inactive.
- `None`: do not add a mount dependency.

This setting does not change Quadlet's dependency on its container storage directory.

For example, to use a weaker dependency for an automount share:

```
[Quadlet]
SetMountsDependency=Wants
```
