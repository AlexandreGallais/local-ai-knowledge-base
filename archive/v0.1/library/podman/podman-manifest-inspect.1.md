---
title: "podman-manifest-inspect.1"
tool: "podman"
version: "6.2"
source: "https://github.com/containers/podman/blob/055de046937d29450f310fce0fe3071485d8bed9/docs/source/markdown/podman-manifest-inspect.1.md.in"
commit: "055de046937d29450f310fce0fe3071485d8bed9"
license: "Apache-2.0"
---

# podman-manifest-inspect.1

% podman-manifest-inspect 1

## NAME
podman\-manifest\-inspect - Display a manifest list or image index

## SYNOPSIS
**podman manifest inspect** [*options*] *listnameorindexname*

## DESCRIPTION

Displays the manifest list or image index stored using the specified image name.

## RETURN VALUE

A formatted JSON representation of the manifest list or image index.

## OPTIONS

<< if is_quadlet >>
### `AuthFile=path`
<< else >>
#### **--authfile**=*path*
<< endif >>

Path of the authentication file. Default is `${XDG_RUNTIME_DIR}/containers/auth.json` on Linux, and `$HOME/.config/containers/auth.json` on Windows/macOS.
The file is created by **podman login**. If the authorization state is not found there, `$HOME/.docker/config.json` is checked, which is set using **docker login**.

Note: There is also the option to override the default path of the authentication file by setting the `REGISTRY_AUTH_FILE` environment variable. This can be done with **export REGISTRY_AUTH_FILE=_path_**.

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

## EXAMPLES

Inspect the manifest of mylist:v1.11.
```
$ podman manifest inspect mylist:v1.11
```

## SEE ALSO
**podman(1)**, **podman-manifest(1)**
