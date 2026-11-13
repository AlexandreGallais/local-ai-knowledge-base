---
title: "Seccomp security profiles for Docker (part 2 of 5)"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/engine/security/seccomp.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Seccomp security profiles for Docker (part 2 of 5)

## Pass a profile for a container

The default `seccomp` profile
provides a sane default for running containers with seccomp and disables around
44 system calls out of 300+. It is moderately protective while providing wide
application compatibility.

In effect, the profile is an allowlist that denies access to system calls by
default and then allows specific system calls. The profile works by defining a
`defaultAction` of `SCMP_ACT_ERRNO` and overriding that action only for specific
system calls. The effect of `SCMP_ACT_ERRNO` is to cause a `Permission Denied`
error. Next, the profile defines a specific list of system calls which are fully
allowed, because their `action` is overridden to be `SCMP_ACT_ALLOW`. Finally,
some specific rules are for individual system calls such as `personality`, and others,
to allow variants of those system calls with specific arguments.

`seccomp` is instrumental for running Docker containers with least privilege. It
is not recommended to change the default `seccomp` profile.

When you run a container, it uses the default profile unless you override it
with the `--security-opt` option. For example, the following explicitly
specifies a policy:

```console
$ docker run --rm \
             -it \
             --security-opt seccomp=/path/to/seccomp/profile.json \
             hello-world
```

The Docker CLI resolves a relative profile path from the working directory
where you invoke `docker`. The CLI reads the profile and sends its contents to
the daemon, so the profile must be available on the client host when the client
and daemon run on separate hosts.
