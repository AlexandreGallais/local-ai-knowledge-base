---
title: "Pull from a container registry (part 1 of 2)"
tool: "podman"
version: "6.2"
source: "https://github.com/containers/podman/blob/055de046937d29450f310fce0fe3071485d8bed9/docs/source/markdown/podman-pull.1.md.in"
commit: "055de046937d29450f310fce0fe3071485d8bed9"
license: "Apache-2.0"
---

% podman-pull 1

## NAME
podman\-pull - Pull an image from a registry

## SYNOPSIS
**podman pull** [*options*] *source* [*source*...]

**podman image pull** [*options*] *source* [*source*...]

**podman pull** [*options*] [*transport*]*name*[:*tag*|@*digest*]

**podman image pull** [*options*] [*transport*]*name*[:*tag*|@*digest*]

## DESCRIPTION
podman pull copies an image from a registry onto the local machine. The command can pull one or more images. If the image reference in the command line argument does not contain a registry, it is referred to as a `short-name` reference. If the image is a 'short-name' reference, Podman prompts the user for the specific container registry to pull the image from, if an alias for the short-name has not been specified in the `short-name-aliases.conf`. If an image tag is not specified, **podman pull** defaults to the image with the **latest** tag (if it exists) and pulls it. After the image is pulled, podman prints the full image ID. **podman pull** can also pull images using a digest **podman pull** *image*@*digest* and can also be used to pull images from archives and local storage using different transports.
*IMPORTANT: Images are stored in local image storage.*

## SOURCE
SOURCE is the location from which the container image is pulled from. It supports all transports from **containers-transports(5)**. If no transport is specified, the input is subject to short-name resolution and the `docker` (i.e., container registry) transport is used.  For remote clients, including Mac and Windows (excluding WSL2) machines, `docker` is the only supported transport.

```
# Pull from a container registry
$ podman pull quay.io/username/myimage

# Pull from a container registry with short-name resolution
$ podman pull fedora

# Pull from a container registry via the docker transport
$ podman pull docker://quay.io/username/myimage

# Pull from a local directory
$ podman pull dir:/tmp/myimage

# Pull from a tarball in the docker-archive format
$ podman pull docker-archive:/tmp/myimage

# Pull from a local docker daemon
$ sudo podman pull docker-daemon:docker.io/library/myimage:33

# Pull from a tarball in the OCI-archive format
$ podman pull oci-archive:/tmp/myimage
```

## OPTIONS

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

#### **--disable-content-trust**

This is a Docker-specific option to disable image verification to a container
registry and is not supported by Podman. This option is a NOOP and provided
solely for scripting compatibility.

#### **--help**, **-h**

Print the usage statement.

#### **--os**=*string*

Set the OS of the image to be built, and that of the base image to be pulled, if the build uses one, instead of using the current operating system of the build host. Unless overridden, subsequent lookups of the same image in the local storage matches this OS, regardless of the host.

#### **--platform**=*OS/ARCH*

Specify the platform for selecting the image.  (Conflicts with --arch and --os)
The `--platform` option can be used to override the current architecture and operating system.
Unless overridden, subsequent lookups of the same image in the local storage matches this platform, regardless of the host.

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

#### **--quiet**, **-q**

Suppress informational output messages (which indicate which instruction is being processed, and the progress of the instruction).  Print only the final error message or successful completion information, such as the image or container ID.

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

## FILES

**short-name-aliases.conf** (`/var/cache/containers/short-name-aliases.conf`, `$HOME/.cache/containers/short-name-aliases.conf`)

When users specify images that do not include the container registry where the
image is stored, this is called a short name. The use of unqualified-search registries entails an ambiguity as it is unclear from which registry a given image, referenced by a short name, may be pulled from.

Using short names is subject to the risk of hitting squatted registry namespaces. If the unqualified-search registries are set to ["public-registry.com",  "my-private-registry.com"] an attacker may take over a namespace of `public-registry.com` such that an image may be pulled from `public-registry.com` instead of the intended source `my-private-registry.com`.

While it is highly recommended to always use fully-qualified image references, existing deployments using short names may not be easily changed. To circumvent the aforementioned ambiguity, so called short-name aliases can be configured that point to a fully-qualified image reference. Distributions often ship a default shortnames.conf expansion file in /etc/containers/registries.conf.d/ directory. Administrators can use this directory to add their own local short-name expansion files.

When pulling an image, if the user does not specify the complete registry, container engines attempt to expand the short-name into a full name. If the command is executed with a tty, the user is prompted to select a registry from the
default list unqualified registries defined in registries.conf. The user's selection is then stored in a cache file to be used in all future short-name expansions. Rootful short-names are stored in /var/cache/containers/short-name-aliases.conf. Rootless short-names are stored in the $HOME/.cache/containers/short-name-aliases.conf file.

For more information on short-names, see `containers-registries.conf(5)`

**registries.conf** (`/etc/containers/registries.conf`)

registries.conf is the configuration file which specifies which container registries is consulted when completing image names which do not include a registry or domain portion.

NOTE: Use the environment variable `TMPDIR` to change the temporary storage location of downloaded container images. Podman defaults to use `/var/tmp`.
