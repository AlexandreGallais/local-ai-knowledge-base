---
title: "Configure a Security Context for a Pod or Container (part 2 of 3)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/tasks/configure-pod-container/security-context.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Configure a Security Context for a Pod or Container (part 2 of 3)

## Set the security context for a Container

To specify security settings for a Container, include the `securityContext` field
in the Container manifest. The `securityContext` field is a
SecurityContext object.
Security settings that you specify for a Container apply only to
the individual Container, and they override settings made at the Pod level when
there is overlap. Container settings do not affect the Pod's Volumes.

Here is the configuration file for a Pod that has one Container. Both the Pod
and the Container have a `securityContext` field:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: security-context-demo-2
spec:
  securityContext:
    runAsUser: 1000
  containers:
  - name: sec-ctx-demo-2
    image: gcr.io/google-samples/hello-app:2.0
    securityContext:
      runAsUser: 2000
      allowPrivilegeEscalation: false
```

Create the Pod:

```shell
kubectl apply -f https://k8s.io/examples/pods/security/security-context-2.yaml
```

Verify that the Pod's Container is running:

```shell
kubectl get pod security-context-demo-2
```

Get a shell into the running Container:

```shell
kubectl exec -it security-context-demo-2 -- sh
```

In your shell, list the running processes:

```shell
ps aux
```

The output shows that the processes are running as user 2000. This is the value
of `runAsUser` specified for the Container. It overrides the value 1000 that is
specified for the Pod.

```
USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND
2000         1  0.0  0.0   4336   764 ?        Ss   20:36   0:00 /bin/sh -c node server.js
2000         8  0.1  0.5 772124 22604 ?        Sl   20:36   0:00 node server.js
...
```

Exit your shell:

```shell
exit
```

## Set capabilities for a Container

With Linux capabilities,
you can grant certain privileges to a process without granting all the privileges
of the root user. To add or drop Linux capabilities for a Container, include the
`capabilities` field in the `securityContext` section of the Container manifest.

First, see what happens when you don't include a `capabilities` field.
Here is configuration file that does not add or drop any Container capabilities:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: security-context-demo-3
spec:
  containers:
  - name: sec-ctx-3
    image: gcr.io/google-samples/hello-app:2.0
```

Create the Pod:

```shell
kubectl apply -f https://k8s.io/examples/pods/security/security-context-3.yaml
```

Verify that the Pod's Container is running:

```shell
kubectl get pod security-context-demo-3
```

Get a shell into the running Container:

```shell
kubectl exec -it security-context-demo-3 -- sh
```

In your shell, list the running processes:

```shell
ps aux
```

The output shows the process IDs (PIDs) for the Container:

```
USER  PID %CPU %MEM    VSZ   RSS TTY   STAT START   TIME COMMAND
root    1  0.0  0.0   4336   796 ?     Ss   18:17   0:00 /bin/sh -c node server.js
root    5  0.1  0.5 772124 22700 ?     Sl   18:17   0:00 node server.js
```

In your shell, view the status for process 1:

```shell
cd /proc/1
cat status
```

The output shows the capabilities bitmap for the process:

```
...
CapPrm:	00000000a80425fb
CapEff:	00000000a80425fb
...
```

Make a note of the capabilities bitmap, and then exit your shell:

```shell
exit
```

Next, run a Container that is the same as the preceding container, except
that it has additional capabilities set.

Here is the configuration file for a Pod that runs one Container. The configuration
adds the `CAP_NET_ADMIN` and `CAP_SYS_TIME` capabilities:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: security-context-demo-4
spec:
  containers:
  - name: sec-ctx-4
    image: gcr.io/google-samples/hello-app:2.0
    securityContext:
      capabilities:
        add: ["NET_ADMIN", "SYS_TIME"]
```

Create the Pod:

```shell
kubectl apply -f https://k8s.io/examples/pods/security/security-context-4.yaml
```

Get a shell into the running Container:

```shell
kubectl exec -it security-context-demo-4 -- sh
```

In your shell, view the capabilities for process 1:

```shell
cd /proc/1
cat status
```

The output shows capabilities bitmap for the process:

```
...
CapPrm:	00000000aa0435fb
CapEff:	00000000aa0435fb
...
```

Compare the capabilities of the two Containers:

```
00000000a80425fb
00000000aa0435fb
```

In the capability bitmap of the first container, bits 12 and 25 are clear. In the second container,
bits 12 and 25 are set. Bit 12 is `CAP_NET_ADMIN`, and bit 25 is `CAP_SYS_TIME`.
See capability.h
for definitions of the capability constants.

**Note:**
Linux capability constants have the form `CAP_XXX`.
But when you list capabilities in your container manifest, you must
omit the `CAP_` portion of the constant.
For example, to add `CAP_SYS_TIME`, include `SYS_TIME` in your list of capabilities.

## Set the Seccomp Profile for a Container

To set the Seccomp profile for a Container, include the `seccompProfile` field
in the `securityContext` section of your Pod or Container manifest. The
`seccompProfile` field is a
SeccompProfile object consisting of `type` and `localhostProfile`.
Valid options for `type` include `RuntimeDefault`, `Unconfined`, and
`Localhost`. `localhostProfile` must only be set if `type: Localhost`. It
indicates the path of the pre-configured profile on the node, relative to the
kubelet's configured Seccomp profile location (configured with the `--root-dir`
flag).

Here is an example that sets the Seccomp profile to the node's container runtime
default profile:

```yaml
...
securityContext:
  seccompProfile:
    type: RuntimeDefault
```

Here is an example that sets the Seccomp profile to a pre-configured file at
`<kubelet-root-dir>/seccomp/my-profiles/profile-allow.json`:

```yaml
...
securityContext:
  seccompProfile:
    type: Localhost
    localhostProfile: my-profiles/profile-allow.json
```

## Set the AppArmor Profile for a Container

To set the AppArmor profile for a Container, include the `appArmorProfile` field
in the `securityContext` section of your Container. The `appArmorProfile` field
is a
AppArmorProfile object consisting of `type` and `localhostProfile`.
Valid options for `type` include `RuntimeDefault`(default), `Unconfined`, and
`Localhost`. `localhostProfile` must only be set if `type` is `Localhost`. It
indicates the name of the pre-configured profile on the node. The profile needs
to be loaded onto all nodes suitable for the Pod, since you don't know where the
pod will be scheduled.
Approaches for setting up custom profiles are discussed in
Setting up nodes with profiles.

Note: If `containers[*].securityContext.appArmorProfile.type` is explicitly set
to `RuntimeDefault`, then the Pod will not be admitted if AppArmor is not
enabled on the Node. However if `containers[*].securityContext.appArmorProfile.type`
is not specified, then the default (which is also `RuntimeDefault`) will only
be applied if the node has AppArmor enabled. If the node has AppArmor disabled
the Pod will be admitted but the Container will not be restricted by the
`RuntimeDefault` profile.

Here is an example that sets the AppArmor profile to the node's container runtime
default profile:

```yaml
...
containers:
- name: container-1
  securityContext:
    appArmorProfile:
      type: RuntimeDefault
```

Here is an example that sets the AppArmor profile to a pre-configured profile
named `k8s-apparmor-example-deny-write`:

```yaml
...
containers:
- name: container-1
  securityContext:
    appArmorProfile:
      type: Localhost
      localhostProfile: k8s-apparmor-example-deny-write
```

For more details please see, Restrict a Container's Access to Resources with AppArmor.

## Assign SELinux labels to a Container

To assign SELinux labels to a Container, include the `seLinuxOptions` field in
the `securityContext` section of your Pod or Container manifest. The
`seLinuxOptions` field is an
SELinuxOptions
object. Here's an example that applies an SELinux level:

```yaml
...
securityContext:
  seLinuxOptions:
    level: "s0:c123,c456"
```

**Note:**
To assign SELinux labels, the SELinux security module must be loaded on the host operating system.
On Windows and Linux worker nodes without SELinux support, this field and any SELinux feature gates described
below have no effect.

### Efficient SELinux volume relabeling

**Feature state:**

By default, Kubernetes applies the SELinux label to eligible volumes instantly by using
a mount option `-o context=`.

To benefit from this speedup, all these conditions must be met:

* Pod must use a PersistentVolumeClaim.
* Pod has `spec.securityContext.seLinuxChangePolicy`
  either nil (default) or `MountOption`.
* Pod (or all its Containers that use the PersistentVolumeClaim) must
  have `seLinuxOptions` set.
* The corresponding PersistentVolume must be either:
  * A volume that uses the legacy in-tree `iscsi`, `rbd` or `fc` volume type.
  * Or a volume that uses a CSI driver.
    The CSI driver must announce that it supports mounting with `-o context` by setting
    `spec.seLinuxMount: true` in its CSIDriver instance.

When any of these conditions is not met, SELinux relabelling happens another way: the container
runtime  recursively changes the SELinux label for all inodes (files and directories)
in the volume. Calling out explicitly, this applies to Kubernetes ephemeral volumes like
`secret`, `configMap` and `projected`, and all volumes whose CSIDriver instance does not
explicitly announce mounting with `-o context`.

When this speedup is used, all Pods that use the same applicable volume concurrently on the same node
**must have the same SELinux label**. A Pod with a different SELinux label will fail to start and will be
`ContainerCreating` until all Pods with other SELinux labels that use the volume are deleted.

**Feature state:**
For Pods that want to opt-out from relabeling using mount options, they can set
`spec.securityContext.seLinuxChangePolicy` to `Recursive`. This is required
when multiple pods share a single volume on the same node, but they run with
different SELinux labels that allows simultaneous access to the volume. For example, a privileged pod
running with label `spc_t` and an unprivileged pod running with the default label `container_file_t`.
With unset `spec.securityContext.seLinuxChangePolicy` (or with the default value `MountOption`),
only one of such pods is able to run on a node, the other one gets ContainerCreating with error
`conflicting SELinux labels of volume <name of the volume>:  and `.

#### SELinuxWarningController
To make it easier to identify Pods that are affected by the change in SELinux volume relabeling,
a new controller called `SELinuxWarningController` has been introduced in kube-controller-manager.
It is disabled by default and can be enabled by either setting the `--controllers=*,selinux-warning-controller`
command line flag,
or by setting `genericControllerManagerConfiguration.controllers`
field in KubeControllerManagerConfiguration.
This controller requires `SELinuxChangePolicy` feature gate to be enabled.

When enabled, the controller observes running Pods and when it detects that two Pods use the same volume
with different SELinux labels:
1. It emits an event to both of the Pods. `kubectl describe pod <pod-name>` the shows
  `SELinuxLabel "" conflicts with pod <the other pod name> that uses the same volume as this pod
  with SELinuxLabel "<the other pod label>". If both pods land on the same node, only one of them may access the volume`.
2. Raise `selinux_warning_controller_selinux_volume_conflict` metric. The metric has both pod
  names + namespaces as labels to identify the affected pods easily.

A cluster admin can use this information to identify pods affected by this change and
proactively opt-out Pods from the optimization (i.e. set `spec.securityContext.seLinuxChangePolicy: Recursive`).

**Warning:**
We strongly recommend clusters that use SELinux to enable this controller and make sure that
`selinux_warning_controller_selinux_volume_conflict` metric does not report any conflicts before
upgrading to Kubernetes v1.37 or later where `SELinuxMount` is GA and enabled by default.

#### Feature gates

The following feature gates control the behavior of SELinux volume relabeling:

* `SELinuxMountReadWriteOncePod`: enables the optimization for volumes with `accessModes: ["ReadWriteOncePod"]`.
  This is a very safe feature gate to enable, as it cannot happen that two pods can share one single volume with
  this access mode. GA since 1.36.
* `SELinuxChangePolicy`: enables `spec.securityContext.seLinuxChangePolicy` field in Pod and related SELinuxWarningController
  in kube-controller-manager. This can be used to opt-out Pods from the mount optimization
  when multiple Pods with different SELinux labels share a volume. GA since 1.36.
* `SELinuxMount`: enables the optimization for all eligible volumes. GA since 1.37.
  When upgrading from older Kubernetes versions where `SELinuxMount` was disabled by default,
  we recommend enabling `SELinuxChangePolicy` feature gate + SELinuxWarningController first to
  check the impact of the change.

## Managing access to the `/proc` filesystem {#proc-access}

**Feature state:**

For runtimes that follow the OCI runtime specification, containers default to running in a mode where
there are multiple paths that are both masked and read-only.
The result of this is the container has these paths present inside the container's mount namespace, and they can function similarly to if
the container was an isolated host, but the container process cannot write to
them. The list of masked and read-only paths are as follows:

- Masked Paths:
  - `/proc/asound`
  - `/proc/acpi`
  - `/proc/kcore`
  - `/proc/keys`
  - `/proc/latency_stats`
  - `/proc/timer_list`
  - `/proc/timer_stats`
  - `/proc/sched_debug`
  - `/proc/scsi`
  - `/sys/firmware`
  - `/sys/devices/virtual/powercap`

- Read-Only Paths:
  - `/proc/bus`
  - `/proc/fs`
  - `/proc/irq`
  - `/proc/sys`
  - `/proc/sysrq-trigger`

For some Pods, you might want to bypass that default masking of paths.
The most common context for wanting this is if you are trying to run containers within
a Kubernetes container (within a pod).

The `securityContext` field `procMount` allows a user to request a container's `/proc`
be `Unmasked`, or be mounted as read-write by the container process. This also
applies to `/sys/firmware` which is not in `/proc`.

```yaml
...
securityContext:
  procMount: Unmasked
```

**Note:**
Setting `procMount` to Unmasked requires the `spec.hostUsers` value in the pod
spec to be `false`. In other words: a container that wishes to have an Unmasked
`/proc` or unmasked `/sys` must also be in a
user namespace.
Kubernetes v1.12 to v1.29 did not enforce that requirement.
