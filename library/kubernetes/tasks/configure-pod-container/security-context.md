---
title: "Configure a Security Context for a Pod or Container (part 1 of 3)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/tasks/configure-pod-container/security-context.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Configure a Security Context for a Pod or Container

A security context defines privilege and access control settings for
a Pod or Container. Security context settings include, but are not limited to:

* Discretionary Access Control: Permission to access an object, like a file, is based on
  user ID (UID) and group ID (GID).

* Security Enhanced Linux (SELinux):
  Objects are assigned security labels.

* Running as privileged or unprivileged.

* Linux Capabilities:
  Give a process some privileges, but not all the privileges of the root user.

* AppArmor:
  Use program profiles to restrict the capabilities of individual programs.

* Seccomp: Filter a process's system calls.

* `allowPrivilegeEscalation`: Controls whether a process can gain more privileges than
  its parent process, for example, by executing a setuid binary.
  This boolean value directly controls whether the
  `no_new_privs`
  flag gets set on the container process, though note that the value is
  inverted: if `allowPrivilegeEscalation` is true, then `no_new_privs` will be
  set to false.

  If `allowPrivilegeEscalation` is not defined in the `securityContext` field of a container specification, then it will default to true.

  `allowPrivilegeEscalation: false` is inconsistent, and therefore cannot be set in combination, with a container that:

  - is run as privileged, or
  - has the capability `CAP_SYS_ADMIN`

* `readOnlyRootFilesystem`: Mounts the container's root filesystem as read-only.

The above bullets are not a complete set of security context settings -- please see
SecurityContext
for a comprehensive list.

## Set the security context for a Pod

To specify security settings for a Pod, include the `securityContext` field
in the Pod specification. The `securityContext` field is a
PodSecurityContext object.
The security settings that you specify for a Pod apply to all Containers in the Pod.
Here is a configuration file for a Pod that has a `securityContext` and an `emptyDir` volume:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: security-context-demo
spec:
  securityContext:
    runAsUser: 1000
    runAsGroup: 3000
    fsGroup: 2000
    supplementalGroups: [4000]
  volumes:
  - name: sec-ctx-vol
    emptyDir: {}
  containers:
  - name: sec-ctx-demo
    image: busybox:1.28
    command: [ "sh", "-c", "sleep 1h" ]
    volumeMounts:
    - name: sec-ctx-vol
      mountPath: /data/demo
    securityContext:
      allowPrivilegeEscalation: false
```

In the configuration file, the `runAsUser` field specifies that for any Containers in
the Pod, all processes run with user ID 1000. The `runAsGroup` field specifies the primary group ID of 3000 for
all processes within any containers of the Pod. If this field is omitted, the primary group ID of the containers
will be root(0). Any files created will also be owned by user 1000 and group 3000 when `runAsGroup` is specified.
Since `fsGroup` field is specified, all processes of the container are also part of the supplementary group ID 2000.
The owner for volume `/data/demo` and any files created in that volume will be Group ID 2000.
Additionally, when the `supplementalGroups` field is specified, all processes of the container are also part of the
specified groups. If this field is omitted, it means empty.

Create the Pod:

```shell
kubectl apply -f https://k8s.io/examples/pods/security/security-context.yaml
```

Verify that the Pod's Container is running:

```shell
kubectl get pod security-context-demo
```

Get a shell to the running Container:

```shell
kubectl exec -it security-context-demo -- sh
```

In your shell, list the running processes:

```shell
ps
```

The output shows that the processes are running as user 1000, which is the value of `runAsUser`:

```none
PID   USER     TIME  COMMAND
    1 1000      0:00 sleep 1h
    6 1000      0:00 sh
...
```

In your shell, navigate to `/data`, and list the one directory:

```shell
cd /data
ls -l
```

The output shows that the `/data/demo` directory has group ID 2000, which is
the value of `fsGroup`.

```none
drwxrwsrwx 2 root 2000 4096 Jun  6 20:08 demo
```

In your shell, navigate to `/data/demo`, and create a file:

```shell
cd demo
echo hello > testfile
```

List the file in the `/data/demo` directory:

```shell
ls -l
```

The output shows that `testfile` has group ID 2000, which is the value of `fsGroup`.

```none
-rw-r--r-- 1 1000 2000 6 Jun  6 20:08 testfile
```

Run the following command:

```shell
id
```

The output is similar to this:

```none
uid=1000 gid=3000 groups=2000,3000,4000
```

From the output, you can see that `gid` is 3000 which is same as the `runAsGroup` field.
If the `runAsGroup` was omitted, the `gid` would remain as 0 (root) and the process will
be able to interact with files that are owned by the root(0) group and groups that have
the required group permissions for the root (0) group. You can also see that `groups`
contains the group IDs which are specified by `fsGroup` and `supplementalGroups`,
in addition to `gid`.

Exit your shell:

```shell
exit
```

### Implicit group memberships defined in `/etc/group` in the container image

By default, kubernetes merges group information from the Pod with information defined in `/etc/group` in the container image.

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: security-context-demo
spec:
  securityContext:
    runAsUser: 1000
    runAsGroup: 3000
    supplementalGroups: [4000]
  containers:
  - name: sec-ctx-demo
    image: registry.k8s.io/e2e-test-images/agnhost:2.45
    command: [ "sh", "-c", "sleep 1h" ]
    securityContext:
      allowPrivilegeEscalation: false
```

This Pod security context contains `runAsUser`, `runAsGroup` and `supplementalGroups`.
However, you can see that the actual supplementary groups attached to the container process
will include group IDs which come from `/etc/group` in the container image.

Create the Pod:

```shell
kubectl apply -f https://k8s.io/examples/pods/security/security-context-5.yaml
```

Verify that the Pod's Container is running:

```shell
kubectl get pod security-context-demo
```

Get a shell to the running Container:

```shell
kubectl exec -it security-context-demo -- sh
```

Check the process identity:

```shell
id
```

The output is similar to this:

```none
uid=1000 gid=3000 groups=3000,4000,50000
```

You can see that `groups` includes group ID `50000`. This is because the user (`uid=1000`),
which is defined in the image, belongs to the group (`gid=50000`), which is defined in `/etc/group`
inside the container image.

Check the `/etc/group` in the container image:

```shell
cat /etc/group
```

You can see that uid `1000` belongs to group `50000`.

```none
...
user-defined-in-image:x:1000:
group-defined-in-image:x:50000:user-defined-in-image
```

Exit your shell:

```shell
exit
```

**Note:**
_Implicitly merged_ supplementary groups may cause security problems particularly when accessing
the volumes (see kubernetes/kubernetes#112879 for details).
If you want to avoid this. Please see the below section.

## Configure fine-grained SupplementalGroups control for a Pod {#supplementalgroupspolicy}

**Feature state:**

This feature can be enabled by setting the `SupplementalGroupsPolicy`
feature gate for kubelet and
kube-apiserver, and setting the `.spec.securityContext.supplementalGroupsPolicy` field for a pod.

The `supplementalGroupsPolicy` field defines the policy for calculating the
supplementary groups for the container processes in a pod. There are two valid
values for this field:

* `Merge`: The group membership defined in `/etc/group` for the container's primary user will be merged.
  This is the default policy if not specified.

* `Strict`: Only group IDs in `fsGroup`, `supplementalGroups`, or `runAsGroup` fields
  are attached as the supplementary groups of the container processes.
  This means no group membership from `/etc/group` for the container's primary user will be merged.

When the feature is enabled, it also exposes the process identity attached to the first container process
in `.status.containerStatuses[].user.linux` field. It would be useful for detecting if
implicit group ID's are attached.

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: security-context-demo
spec:
  securityContext:
    runAsUser: 1000
    runAsGroup: 3000
    supplementalGroups: [4000]
    supplementalGroupsPolicy: Strict
  containers:
  - name: sec-ctx-demo
    image: registry.k8s.io/e2e-test-images/agnhost:2.45
    command: [ "sh", "-c", "sleep 1h" ]
    securityContext:
      allowPrivilegeEscalation: false
```

This pod manifest defines `supplementalGroupsPolicy=Strict`. You can see that no group memberships
defined in `/etc/group` are merged to the supplementary groups for container processes.

Create the Pod:

```shell
kubectl apply -f https://k8s.io/examples/pods/security/security-context-6.yaml
```

Verify that the Pod's Container is running:

```shell
kubectl get pod security-context-demo
```

Check the process identity:

```shell
kubectl exec -it security-context-demo -- id
```

The output is similar to this:

```none
uid=1000 gid=3000 groups=3000,4000
```

See the Pod's status:

```shell
kubectl get pod security-context-demo -o yaml
```

You can see that the `status.containerStatuses[].user.linux` field exposes the process identity
attached to the first container process.

```none
...
status:
  containerStatuses:
  - name: sec-ctx-demo
    user:
      linux:
        gid: 3000
        supplementalGroups:
        - 3000
        - 4000
        uid: 1000
...
```

**Note:**
Please note that the values in the `status.containerStatuses[].user.linux` field is _the first attached_
process identity to the first container process in the container. If the container has sufficient privilege
to make system calls related to process identity
(e.g. `setuid(2)`,
`setgid(2)` or
`setgroups(2)`, etc.),
the container process can change its identity. Thus, the _actual_ process identity will be dynamic.

### Implementations {#implementations-supplementalgroupspolicy}

The following container runtimes are known to support fine-grained SupplementalGroups control.

CRI-level:
- containerd, since v2.0
- CRI-O, since v1.31

You can see if the feature is supported in the Node status.

```yaml
apiVersion: v1
kind: Node
...
status:
  features:
    supplementalGroupsPolicy: true
```
**Note:**
At this alpha release(from v1.31 to v1.32), when a pod with `SupplementalGroupsPolicy=Strict` are scheduled to a node that does NOT support this feature(i.e. `.status.features.supplementalGroupsPolicy=false`), the pod's supplemental groups policy falls back to the `Merge` policy _silently_.

However, since the beta release (v1.33), to enforce the policy more strictly, __such pod creation will be rejected by kubelet because the node cannot ensure the specified policy__. When your pod is rejected, you will see warning events with `reason=SupplementalGroupsPolicyNotSupported` like below:

```yaml
apiVersion: v1
kind: Event
...
type: Warning
reason: SupplementalGroupsPolicyNotSupported
message: "SupplementalGroupsPolicy=Strict is not supported in this node"
involvedObject:
  apiVersion: v1
  kind: Pod
  ...
```

## Configure volume permission and ownership change policy for Pods

**Feature state:** v1.23 [stable]

By default, Kubernetes recursively changes ownership and permissions for the contents of each
volume to match the `fsGroup` specified in a Pod's `securityContext` when that volume is
mounted.
For large volumes, checking and changing ownership and permissions can take a lot of time,
slowing Pod startup. You can use the `fsGroupChangePolicy` field inside a `securityContext`
to control the way that Kubernetes checks and manages ownership and permissions
for a volume.

**fsGroupChangePolicy** - `fsGroupChangePolicy` defines behavior for changing ownership
  and permission of the volume before being exposed inside a Pod.
  This field only applies to volume types that support `fsGroup` controlled ownership and permissions.
  This field has two possible values:

* _OnRootMismatch_: Only change permissions and ownership if the permission and the ownership of
  root directory does not match with expected permissions of the volume.
  This could help shorten the time it takes to change ownership and permission of a volume.
* _Always_: Always change permission and ownership of the volume when volume is mounted.

For example:

```yaml
securityContext:
  runAsUser: 1000
  runAsGroup: 3000
  fsGroup: 2000
  fsGroupChangePolicy: "OnRootMismatch"
```

**Note:**
This field has no effect on ephemeral volume types such as
`secret`,
`configMap`,
and `emptyDir`.

## Delegating volume permission and ownership change to CSI driver

**Feature state:** v1.26 [stable]

If you deploy a Container Storage Interface (CSI)
driver which supports the `VOLUME_MOUNT_GROUP` `NodeServiceCapability`, the
process of setting file ownership and permissions based on the
`fsGroup` specified in the `securityContext` will be performed by the CSI driver
instead of Kubernetes. In this case, since Kubernetes doesn't perform any
ownership and permission change, `fsGroupChangePolicy` does not take effect, and
as specified by CSI, the driver is expected to mount the volume with the
provided `fsGroup`, resulting in a volume that is readable/writable by the
`fsGroup`.
