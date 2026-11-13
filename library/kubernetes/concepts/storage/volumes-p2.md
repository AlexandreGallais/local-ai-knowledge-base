---
title: "Volumes (part 2 of 5)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/concepts/storage/volumes.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Volumes (part 2 of 5)

## Types of volumes {#volume-types}

Kubernetes supports several types of volumes.

### configMap

A ConfigMap
provides a way to inject configuration data into Pods.
The data stored in a ConfigMap can be referenced in a volume of type
`configMap` and then consumed by containerized applications running in a Pod.

When referencing a ConfigMap, you provide the name of the ConfigMap in the
volume. You can customize the path to use for a specific
entry in the ConfigMap. The following configuration shows how to mount
the `log-config` ConfigMap onto a Pod called `configmap-pod`:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: configmap-pod
spec:
  containers:
    - name: test
      image: busybox:1.28
      command: ['sh', '-c', 'echo "The app is running!" && tail -f /dev/null']
      volumeMounts:
        - name: config-vol
          mountPath: /etc/config
  volumes:
    - name: config-vol
      configMap:
        name: log-config
        items:
          - key: log_level
            path: log_level.conf
```

The `log-config` ConfigMap is mounted as a volume, and all contents stored in
its `log_level` entry are mounted into the Pod at path `/etc/config/log_level.conf`.
Note that this path is derived from the volume's `mountPath` and the `path`
keyed with `log_level`.

**Note:**

* You must create a ConfigMap
  before you can use it.

* A ConfigMap is always mounted as `readOnly`.

* A container using a ConfigMap as a `subPath` volume mount will not
  receive updates when the ConfigMap changes.

* Text data is exposed as files using the UTF-8 character encoding.
  For other character encodings, use `binaryData`.

### downwardAPI {#downwardapi}

A `downwardAPI` volume makes downward API
data available to applications. Within the volume, you can find the exposed
data as read-only files in plain text format.

**Note:**
A container using the downward API as a `subPath` volume mount does not
receive updates when field values change.

See Expose Pod Information to Containers Through Files
to learn more.

### emptyDir {#emptydir}

For a Pod that defines an `emptyDir` volume, the volume is created when the Pod is assigned to a node.
As the name says, the `emptyDir` volume is initially empty. All containers in the Pod can read and write the same
files in the `emptyDir` volume, though that volume can be mounted at the same
or different paths in each container. When a Pod is removed from a node for
any reason, the data in the `emptyDir` is deleted permanently.

**Note:**
A container crashing does *not* remove a Pod from a node. The data in an `emptyDir` volume
is safe across container crashes.

Some uses for an `emptyDir` are:

* scratch space, such as for a disk-based merge sort
* checkpointing a long computation for recovery from crashes
* holding files that a content-manager container fetches while a webserver
  container serves the data

The `emptyDir.medium` field controls where `emptyDir` volumes are stored. By
default `emptyDir` volumes are stored on whatever medium that backs the node
such as disk, SSD, or network storage, depending on your environment. If you set
the `emptyDir.medium` field to `"Memory"`, Kubernetes mounts a tmpfs (RAM-backed
filesystem) for you instead. While tmpfs is very fast, be aware that, unlike
disks, files you write count against the memory limit of the container that wrote them.

A size limit can be specified for the default medium, which limits the capacity
of the `emptyDir` volume. The storage is allocated from
node ephemeral storage.
If that is filled up from another source (for example, log files or image overlays),
the `emptyDir` may run out of capacity before this limit.
If no size is specified, memory-backed volumes are sized to node allocatable memory.

**Caution:**
Please check here
for points to note in terms of resource management when using memory-backed `emptyDir`.

**Feature state:**

The `emptyDir.mode` field lets you set Unix permission bits on the emptyDir directory,
specifying a value between `0000` and `01777` (octal). This follows the same pattern as the
`defaultMode` field on Secret and ConfigMap volumes. If `mode` is not specified, the
directory is created with the default `0777` permissions.

Setting a custom mode is useful when you want to restrict access to owner and group only
(for example, `0750`), or set the sticky bit on a shared directory so that only file owners
can delete their own files (for example, `01777`).

**Note:**
If `fsGroup` is set in the Pod's security context, the group permissions applied by
`fsGroup` override the `mode` specified here. The `mode` field has no effect on Windows.

#### emptyDir configuration example

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: test-pd
spec:
  containers:
  - image: registry.k8s.io/test-webserver
    name: test-container
    volumeMounts:
    - mountPath: /cache
      name: cache-volume
  volumes:
  - name: cache-volume
    emptyDir:
      sizeLimit: 500Mi
```

#### emptyDir memory configuration example

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: test-pd
spec:
  containers:
  - image: registry.k8s.io/test-webserver
    name: test-container
    volumeMounts:
    - mountPath: /cache
      name: cache-volume
  volumes:
  - name: cache-volume
    emptyDir:
      sizeLimit: 500Mi
      medium: Memory
```

#### emptyDir and in-place Pod resizing

**Feature state:**

When the `InPlacePodVerticalScalingMemoryBackedVolumes` feature gate is enabled, you can dynamically adjust the `sizeLimit` of memory-backed (`medium: Memory`) `emptyDir` volumes, without restarting the Pod or its containers.

For more details, see Resize CPU and Memory Resources assigned to Containers.

#### emptyDir permissions configuration example

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: test-pd
spec:
  containers:
  - image: registry.k8s.io/test-webserver
    name: test-container
    volumeMounts:
    - mountPath: /cache
      name: cache-volume
  volumes:
  - name: cache-volume
    emptyDir:
      mode: 01777
```

### fc (fibre channel) {#fc}

An `fc` volume type allows an existing fibre channel block storage volume
to be mounted in a Pod. You can specify single or multiple target world wide names (WWNs)
using the parameter `targetWWNs` in your Volume configuration. If multiple WWNs are specified,
targetWWNs expect that those WWNs are from multi-path connections.

**Note:**
You must configure FC SAN Zoning to allocate and mask those LUNs (volumes) to the target WWNs
beforehand so that Kubernetes hosts can access them.

### gcePersistentDisk (deprecated) {#gcepersistentdisk}

In Kubernetes , all operations for the in-tree `gcePersistentDisk` type
are redirected to the `pd.csi.storage.gke.io` CSI driver.

The `gcePersistentDisk` in-tree storage driver was deprecated in the Kubernetes v1.17 release
and then removed entirely in the v1.28 release.

The Kubernetes project suggests that you use the
Google Compute Engine Persistent Disk CSI
third party storage driver instead.

### gitRepo (disabled) {#gitrepo}

**Warning:**

Kubernetes  does *not* include the `gitRepo` volume
driver. The last version that provided a way to use this driver was Kubernetes
v1.35, and it has been deprecated since the v1.11 minor
release.

To provision a Pod that has a Git repository mounted, you can mount an
`emptyDir` volume into an init container
that clones the repo using Git, then mount the EmptyDir into the Pod's container.

---

You can restrict the use of `gitRepo` volumes in your cluster using
policies, such as
ValidatingAdmissionPolicy.
You can use the following Common Expression Language (CEL) expression as
part of a policy to reject use of `gitRepo` volumes:

```cel
!has(object.spec.volumes) || !object.spec.volumes.exists(v, has(v.gitRepo))
```

### hostPath {#hostpath}

A `hostPath` volume mounts a file or directory from the host node's filesystem
into your Pod. This is not something that most Pods will need, but it offers a
powerful escape hatch for some applications.

**Warning:**
Using the `hostPath` volume type presents many security risks.
If you can avoid using a `hostPath` volume, you should. For example,
define a `local` PersistentVolume, and use that instead.

If you are restricting access to specific directories on the node using
admission-time validation, that restriction is only effective when you
additionally require that any mounts of that `hostPath` volume are
**read only**. If you allow a read-write mount of any host path by an
untrusted Pod, the containers in that Pod may be able to subvert the
read-write host mount.

---

Take care when using `hostPath` volumes, whether these are mounted as read-only
or as read-write, because:

* Access to the host filesystem can expose privileged system credentials (such as for the kubelet) or privileged APIs
  (such as the container runtime socket) that can be used for container escape or to attack other
  parts of the cluster.
* Pods with identical configuration (such as created from a PodTemplate) may
  behave differently on different nodes due to different files on the nodes.
* `hostPath` volume usage is not treated as ephemeral storage usage.
  You need to monitor the disk usage by yourself because excessive `hostPath` disk
  usage will lead to disk pressure on the node.

Some uses for a `hostPath` are:

* running a container that needs access to node-level system components
  (such as a container that transfers system logs to a central location,
  accessing those logs using a read-only mount of `/var/log`)
* making a configuration file stored on the host system available read-only
  to a static Pod;
  unlike normal Pods, static Pods cannot access ConfigMaps

#### `hostPath` volume types

In addition to the required `path` property, you can optionally specify a
`type` for a `hostPath` volume.

The available values for `type` are:

| Value | Behavior |
|:------|:---------|
| `‌""` | Empty string (default) is for backward compatibility, which means that no checks will be performed before mounting the `hostPath` volume. |
| `DirectoryOrCreate` | If nothing exists at the given path, an empty directory will be created there as needed with permission set to 0755, having the same group and ownership with Kubelet. |
| `Directory` | A directory must exist at the given path. |
| `FileOrCreate` | If nothing exists at the given path, an empty file will be created there as needed with permission set to 0644, having the same group and ownership with Kubelet. |
| `File` | A file must exist at the given path. |
| `Socket` | A UNIX socket must exist at the given path. |
| `CharDevice` | _(Linux nodes only)_ A character device must exist at the given path. |
| `BlockDevice` | _(Linux nodes only)_ A block device must exist at the given path. |

**Caution:**
The `FileOrCreate` mode does **not** create the parent directory of the file. If the parent directory
of the mounted file does not exist, the Pod fails to start. To ensure that this mode works,
you can try to mount directories and files separately, as shown in the
`FileOrCreate` example for `hostPath`.

Some files or directories created on the underlying hosts might only be
accessible by root. You then either need to run your process as root in a
privileged container
or modify the file permissions on the host to read from or write to a `hostPath` volume.

#### hostPath configuration example

**Linux node**
---
# This manifest mounts /data/foo on the host as /foo inside the
# single container that runs within the hostpath-example-linux Pod.
#
# The mount into the container is read-only.
apiVersion: v1
kind: Pod
metadata:
  name: hostpath-example-linux
spec:
  os: { name: linux }
  nodeSelector:
    kubernetes.io/os: linux
  containers:
  - name: example-container
    image: registry.k8s.io/test-webserver
    volumeMounts:
    - mountPath: /foo
      name: example-volume
      readOnly: true
  volumes:
  - name: example-volume
    # mount /data/foo, but only if that directory already exists
    hostPath:
      path: /data/foo # directory location on host
      type: Directory # this field is optional

**Windows node**
---
# This manifest mounts C:\Data\foo on the host as C:\foo, inside the
# single container that runs within the hostpath-example-windows Pod.
#
# The mount into the container is read-only.
apiVersion: v1
kind: Pod
metadata:
  name: hostpath-example-windows
spec:
  os: { name: windows }
  nodeSelector:
    kubernetes.io/os: windows
  containers:
  - name: example-container
    image: microsoft/windowsservercore:1709
    volumeMounts:
    - name: example-volume
      mountPath: "C:\\foo"
      readOnly: true
  volumes:
    # mount C:\Data\foo from the host, but only if that directory already exists
  - name: example-volume
    hostPath:
      path: "C:\\Data\\foo" # directory location on host
      type: Directory       # this field is optional

#### hostPath FileOrCreate configuration example {#hostpath-fileorcreate-example}

The following manifest defines a Pod that mounts `/var/local/aaa`
inside the single container in the Pod. If the node does not
already have a path `/var/local/aaa`, the kubelet creates
it as a directory and then mounts it into the Pod.

If `/var/local/aaa` already exists but is not a directory,
the Pod fails. Additionally, the kubelet attempts to make
a file named `/var/local/aaa/1.txt` inside that directory
(as seen from the host); if something already exists at
that path and isn't a regular file, the Pod fails.

Here's the example manifest:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: test-webserver
spec:
  os: { name: linux }
  nodeSelector:
    kubernetes.io/os: linux
  containers:
  - name: test-webserver
    image: registry.k8s.io/test-webserver:latest
    volumeMounts:
    - mountPath: /var/local/aaa
      name: mydir
    - mountPath: /var/local/aaa/1.txt
      name: myfile
  volumes:
  - name: mydir
    hostPath:
      # Ensure the file directory is created.
      path: /var/local/aaa
      type: DirectoryOrCreate
  - name: myfile
    hostPath:
      path: /var/local/aaa/1.txt
      type: FileOrCreate
```
