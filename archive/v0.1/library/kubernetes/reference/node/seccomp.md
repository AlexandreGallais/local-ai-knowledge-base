---
title: "Seccomp and Kubernetes"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/node/seccomp.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Seccomp and Kubernetes

Seccomp stands for secure computing mode and has been a feature of the Linux
kernel since version 2.6.12. It can be used to sandbox the privileges of a
process, restricting the calls it is able to make from userspace into the
kernel. Kubernetes lets you automatically apply seccomp profiles loaded onto a
node to your Pods and containers.

## Seccomp fields

**Feature state:** v1.19 [stable]

There are four ways to specify a seccomp profile for a
pod:

- for the whole Pod using `spec.securityContext.seccompProfile`
- for a single container using `spec.containers[*].securityContext.seccompProfile`
- for an (restartable / sidecar) init container using `spec.initContainers[*].securityContext.seccompProfile`
- for an ephemeral container using `spec.ephemeralContainers[*].securityContext.seccompProfile`

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: pod
spec:
  securityContext:
    seccompProfile:
      type: Unconfined
  # NOTE: ephemeralContainers cannot be specified when creating a Pod.
  # It can be specified only when updating a Pod.
  ephemeralContainers:
  - name: ephemeral-container
    image: debian
    securityContext:
      seccompProfile:
        type: RuntimeDefault
  initContainers:
  - name: init-container
    image: debian
    securityContext:
      seccompProfile:
        type: RuntimeDefault
  containers:
  - name: container
    image: docker.io/library/debian:stable
    securityContext:
      seccompProfile:
        type: Localhost
        localhostProfile: my-profile.json
```

The Pod in the example above runs as `Unconfined`, while the
`ephemeral-container` and `init-container` specifically defines
`RuntimeDefault`. If the ephemeral or init container would not have set the
`securityContext.seccompProfile` field explicitly, then the value would be
inherited from the Pod. The same applies to the container, which runs a
`Localhost` profile `my-profile.json`.

Generally speaking, fields from (ephemeral) containers have a higher priority
than the Pod level value, while containers which do not set the seccomp field
inherit the profile from the Pod.

**Note:**
It is not possible to apply a seccomp profile to a Pod or container running with
`privileged: true` set in the container's `securityContext`. Privileged
containers always run as `Unconfined`.

The following values are possible for the `seccompProfile.type`:

`Unconfined`
: The workload runs without any seccomp restrictions.

`RuntimeDefault`
: A default seccomp profile defined by the
container runtime
is applied. The default profiles aim to provide a strong set of security
defaults while preserving the functionality of the workload. It is possible that
the default profiles differ between container runtimes and their release
versions, for example when comparing those from
CRI-O and
containerd.

`Localhost`
: The `localhostProfile` will be applied, which has to be available on the node
disk (on Linux it's `/var/lib/kubelet/seccomp`). The availability of the seccomp
profile is verified by the
container runtime
on container creation. If the profile does not exist, then the container
creation will fail with a `CreateContainerError`.

### `Localhost` profiles

Seccomp profiles are JSON files following the scheme defined by the
OCI runtime specification.
A profile basically defines actions based on matched syscalls, but also allows
to pass <example-value> values as arguments to syscalls. For example:

```json
{
  "defaultAction": "SCMP_ACT_ERRNO",
  "defaultErrnoRet": 38,
  "syscalls": [
    {
      "names": [
        "adjtimex",
        "alarm",
        "bind",
        "waitid",
        "waitpid",
        "write",
        "writev"
      ],
      "action": "SCMP_ACT_ALLOW"
    }
  ]
}
```

The `defaultAction` in the profile above is defined as `SCMP_ACT_ERRNO` and
will return as fallback to the actions defined in `syscalls`. The error is
defined as code `38` via the `defaultErrnoRet` field.

The following actions are generally possible:

`SCMP_ACT_ERRNO`
: Return the specified error code.

`SCMP_ACT_ALLOW`
: Allow the syscall to be executed.

`SCMP_ACT_KILL_PROCESS`
: Kill the process.

`SCMP_ACT_KILL_THREAD` and `SCMP_ACT_KILL`
: Kill only the thread.

`SCMP_ACT_TRAP`
: Throw a `SIGSYS` signal.

`SCMP_ACT_NOTIFY` and `SECCOMP_RET_USER_NOTIF`.
: Notify the user space.

`SCMP_ACT_TRACE`
: Notify a tracing process with the specified value.

`SCMP_ACT_LOG`
: Allow the syscall to be executed after the action has been logged to syslog or
auditd.

Some actions like `SCMP_ACT_NOTIFY` or `SECCOMP_RET_USER_NOTIF` may be not
supported depending on the container runtime, OCI runtime or Linux kernel
version being used. There may be also further limitations, for example that
`SCMP_ACT_NOTIFY` cannot be used as `defaultAction` or for certain syscalls like
`write`. All those limitations are defined by either the OCI runtime
(runc,
crun) or
libseccomp.

The `syscalls` JSON array contains a list of objects referencing syscalls by
their respective `names`. For example, the action `SCMP_ACT_ALLOW` can be used
to create a whitelist of allowed syscalls as outlined in the example above. It
would also be possible to define another list using the action `SCMP_ACT_ERRNO`
but a different return (`errnoRet`) value.

It is also possible to specify the arguments (`args`) passed to certain
syscalls. More information about those advanced use cases can be found in the
OCI runtime spec
and the Seccomp Linux kernel documentation.

## Further reading

- Restrict a Container's Syscalls with seccomp
- Pod Security Standards
