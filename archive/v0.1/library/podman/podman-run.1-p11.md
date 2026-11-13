---
title: "podman run --userns=auto:size=65536 ubi8-micro cat /proc/self/uid_map (part 11 of 13)"
tool: "podman"
version: "6.2"
source: "https://github.com/containers/podman/blob/055de046937d29450f310fce0fe3071485d8bed9/docs/source/markdown/podman-run.1.md.in"
commit: "055de046937d29450f310fce0fe3071485d8bed9"
license: "Apache-2.0"
---

# podman run --userns=auto:size=65536 ubi8-micro cat /proc/self/uid_map (part 11 of 13)

## Exit Status

The exit code from **podman run** gives information about why the container
failed to run or why it exited. When **podman run** exits with a non-zero code,
the exit codes follow the **chroot**(1) standard, see below:

  **125** The error is with Podman itself

    $ podman run --foo busybox; echo $?
    Error: unknown flag: --foo
    125

  **126** The _contained command_ cannot be invoked

    $ podman run busybox /etc; echo $?
    Error: container_linux.go:346: starting container process caused "exec: \"/etc\": permission denied": OCI runtime error
    126

  **127** The _contained command_ cannot be found

    $ podman run busybox foo; echo $?
    Error: container_linux.go:346: starting container process caused "exec: \"foo\": executable file not found in $PATH": OCI runtime error
    127

  **Exit code** _contained command_ exit code

    $ podman run busybox /bin/sh -c 'exit 3'; echo $?
    3
