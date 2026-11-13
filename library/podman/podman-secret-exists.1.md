---
title: "podman-secret-exists.1"
tool: "podman"
version: "6.2"
source: "https://github.com/containers/podman/blob/055de046937d29450f310fce0fe3071485d8bed9/docs/source/markdown/podman-secret-exists.1.md"
commit: "055de046937d29450f310fce0fe3071485d8bed9"
license: "Apache-2.0"
---

# podman-secret-exists.1

% podman-secret-exists 1

## NAME
podman\-secret\-exists - Check if the given secret exists

## SYNOPSIS
**podman secret exists** *secret*

## DESCRIPTION
**podman secret exists** checks if a secret exists. Podman returns an exit code
of `0` when the secret is found. A `1` is returned otherwise. An exit code of
`125` indicates there was another issue.

## OPTIONS

#### **--help**, **-h**

Print usage statement

## EXAMPLE

Check if a secret called `mysecret` exists (the secret does actually exist).
```
$ podman secret exists mysecret
$ echo $?
0
$
```

Check if a secret called `mypassword` exists (the secret does not actually exist).
```
$ podman secret exists mypassword
$ echo $?
1
$
```

## SEE ALSO
**podman(1)**, **podman-secret(1)**

## HISTORY
April 2023, Originally compiled by Ygal Blum `<ygal.blum@gmail.com>`
