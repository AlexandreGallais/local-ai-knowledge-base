---
title: "NAME"
tool: "podman"
version: "6.2"
source: "https://github.com/containers/podman/blob/055de046937d29450f310fce0fe3071485d8bed9/docs/source/markdown/podman-image.unit.5.md.in"
commit: "055de046937d29450f310fce0fe3071485d8bed9"
license: "Apache-2.0"
---

% podman-image.unit 5

# NAME

podman\-image.unit - systemd unit files for managing container image pulls using Podman Quadlet

# SYNOPSIS

*name*.image

# DESCRIPTION

Image files are named with a `.image` extension and contain a section `[Image]` describing the
container image pull command. The generated service is a one-time command that ensures that the image
exists on the host, pulling it if needed.

Using image units allows containers and volumes to depend on images being automatically pulled. This is
particularly interesting when using special options to control image pulls.

# USAGE SUMMARY

The `.image` file is parsed by the `podman-system-generator` at boot or reload, generating a systemd
`.service` that runs `podman image pull`.

A `.image` file can be referenced in a `.container` file's `Image=` option.

# OPTIONS

Valid options for `[Image]` are listed below:

| **[Image] options**                    | **podman image pull equivalent**                 |
|----------------------------------------|--------------------------------------------------|
| AllTags=true                           | --all-tags                                       |
| Arch=aarch64                           | --arch=aarch64                                   |
| AuthFile=/etc/registry/auth\.json      | --authfile=/etc/registry/auth\.json              |
| CertDir=/etc/registry/certs            | --cert-dir=/etc/registry/certs                   |
| ContainersConfModule=/etc/nvd\.conf    | --module=/etc/nvd\.conf                          |
| Creds=myname\:mypassword               | --creds=myname\:mypassword                       |
| DecryptionKey=<example-value>\.key       | --decryption-key=<example-value>\.key              |
| GlobalArgs=--log-level=debug           | --log-level=debug                                |
| Image=quay\.io/centos/centos:latest    | podman image pull quay.io/centos/centos\:latest  |
| ImageTag=quay\.io/centos/centos:latest | Use this name when resolving `.image` references |
| OS=windows                             | --os=windows                                     |
| PodmanArgs=--os=linux                  | --os=linux                                       |
| Policy=always                          | --policy=always                                  |
| Retry=5                                | --retry=5                                        |
| RetryDelay=10s                         | --retry-delay=10s                                |
| TLSVerify=false                        | --tls-verify=false                               |
| Variant=arm/v7                         | --variant=arm/v7                                 |

<< if is_quadlet >>
### `AllTags=true`
<< else >>
#### **--all-tags**, **-a**
<< endif >>

All tagged images in the repository are pulled.

*IMPORTANT: With **--all-tags**, Podman does **not** walk the unqualified-search registries from
**containers-registries.conf(5)**
for short (unqualified) names. Unqualified names are resolved as if they lived on **docker.io**
(for example `alpine` becomes `docker.io/library/alpine`). To pull every tag from another registry,
use a fully qualified image name such as `quay.io/myorg/myimage` or `registry.example.com/ns/name`.*

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
### `CertDir=path`
<< else >>
#### **--cert-dir**=*path*
<< endif >>

Use certificates at *path* (\*.crt, \*.cert, \*.key) to connect to the registry. (Default: /etc/containers/certs.d)
For details, see **containers-certs.d(5)**.
(This option is not available with the remote Podman client, including Mac and Windows (excluding WSL2) machines)

<< if is_quadlet >>
### `ContainersConfModule=module`
<< else >>
#### **--module**=*module*
<< endif >>

Load the specified containers.conf(5) module.

This option can be listed multiple times.

<< if is_quadlet >>
### `Creds=[username[:password]]`
<< else >>
#### **--creds**=*[username[:password]]*
<< endif >>

The [username[:password]] to use to authenticate with the registry, if required.
If one or both values are not supplied, a command line prompt appears and the
value can be entered. The password is entered without echo.

Note that the specified credentials are only used to authenticate against
target registries.  They are not used for mirrors or when the registry gets
rewritten (see `containers-registries.conf(5)`); to authenticate against those
consider using a `containers-auth.json(5)` file.

<< if is_quadlet >>
### `DecryptionKey=key[:passphrase]`
<< else >>
#### **--decryption-key**=*key[:passphrase]*
<< endif >>

The [key[:passphrase]] to be used for decryption of images. Key can point to keys and/or certificates. Decryption is tried with all keys. If the key is protected by a passphrase, it is required to be passed in the argument and omitted otherwise.

### `GlobalArgs=`

This key <example-value> a list of arguments passed directly after the `podman` command in the generated
file. It can be used to access Podman features otherwise unsupported by the generator. Since the
generator is unaware of what unexpected interactions can be caused by these arguments, it is not
recommended to use this option.

The format of this is a space separated list of arguments, which can optionally be individually
escaped to allow inclusion of whitespace and other control characters.

This key can be listed multiple times.

### `Image=`

The image to pull.
It is recommended to use a fully qualified image name rather than a short name, both for
performance and robustness reasons.

The format of the name is the same as when passed to `podman pull`. It supports using
`:tag` or digests to guarantee the specific image version.

### `ImageTag=`

The actual Fully Qualified Image Name (FQIN) of the referenced `Image`.
Only meaningful when the source is a file or directory archive.

For example, an image saved into a `docker-archive` with the following Podman command:

`podman image save --format docker-archive --output /tmp/archive-file.tar quay.io/podman/stable:latest`

requires setting
- `Image=docker-archive:/tmp/archive-file.tar`
- `ImageTag=quay.io/podman/stable:latest`

#### **--os**=*string*

Set the OS of the image to be built, and that of the base image to be pulled, if the build uses one, instead of using the current operating system of the build host. Unless overridden, subsequent lookups of the same image in the local storage matches this OS, regardless of the host.

### `PodmanArgs=`

This key <example-value> a list of arguments passed directly to the end of the `podman` command
in the generated file. It can be used to access Podman features otherwise unsupported
by the generator. Since the generator is unaware of what unexpected interactions can be
caused by these arguments, it is not recommended to use this option.

The format of this is a space separated list of arguments, which can optionally be individually
escaped to allow inclusion of whitespace and other control characters.

This key can be listed multiple times.

<< if is_quadlet >>
### `Policy=always`
<< else >>
#### **--policy**
<< endif >>

Pull image policy. The default is **always**.

- `always`: Always pull the image and throw an error if the pull fails.
- `missing`: Only pull the image if it could not be found in the local containers storage. Throw an error if no image could be found and the pull fails.
- `never`: Never pull the image; only use the local version. Throw an error if the image is not present locally.
- `newer`: Pull if the image on the registry is newer than the one in the local containers storage. An image is considered to be newer when the digests are different. Comparing the time stamps is prone to errors. Pull errors are suppressed if a local image was found.

<< if is_quadlet >>
### `Retry=attempts`
<< else >>
#### **--retry**=*attempts*
<< endif >>

Number of times to retry pulling or pushing images between the registry and
local storage in case of failure. Default is **3**.

<< if is_quadlet >>
### `RetryDelay=duration`
<< else >>
#### **--retry-delay**=*duration*
<< endif >>

Duration of delay between retry attempts when pulling or pushing images between
the registry and local storage in case of failure. The default is to start at two seconds and then exponentially back off. The delay is used when this value is set, and no exponential back off occurs.

<< if is_quadlet >>
### `TLSVerify=`
<< else >>
#### **--tls-verify**
<< endif >>

Require HTTPS and verify certificates when contacting registries (default: **true**).
If explicitly set to **true**, TLS verification is used.
If set to **false**, TLS verification is not used.
If not specified, TLS verification is used unless the target registry
is listed as an insecure registry in **containers-registries.conf(5)**

# EXAMPLES

Basic image pull:

```
[Image]
Image=quay.io/centos/centos:latest
```

Pull from docker archive:

```
[Image]
Image=docker-archive:/tmp/centos.tar
ImageTag=quay.io/centos/centos:latest
```

Pull with credentials:

```
[Image]
Image=quay.io/private/image:latest
Creds=myuser:mypassword
```

# SEE ALSO

podman-image-pull(1),
podman-systemd.unit(5),
systemd.unit(5)
