---
title: "Volumes (part 3 of 5)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/concepts/storage/volumes.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Volumes (part 3 of 5)

### image

**Feature state:**

An `image` volume source represents an OCI object (a container image or
artifact) which is available on the kubelet's host machine.

An example of using the `image` volume source is:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: image-volume
spec:
  containers:
  - name: shell
    command: ["sleep", "infinity"]
    image: debian
    volumeMounts:
    - name: volume
      mountPath: /volume
  volumes:
  - name: volume
    image:
      reference: quay.io/crio/artifact:v2
      pullPolicy: IfNotPresent
```

The volume is resolved at Pod startup, depending on which `pullPolicy` value is
provided:

`Always`
: The kubelet always attempts to pull the reference. If the pull fails,
  the kubelet sets the Pod to `Failed`.

`Never`
: The kubelet never pulls the reference and only uses a local image or artifact.
  The Pod becomes `Failed` if any layers of the image aren't already present locally,
  or if the manifest for that image isn't already cached.

`IfNotPresent`
: The kubelet pulls if the reference isn't already present on disk. The Pod becomes
  `Failed` if the reference isn't present and the pull fails.

The volume gets re-resolved if the Pod gets deleted and recreated, which means
that new remote content will become available on Pod recreation. A failure to
resolve or pull the image during Pod startup will block containers from starting
and may add significant latency. Failures will be retried using normal volume
backoff and will be reported on the Pod reason and message.

The types of objects that may be mounted by this volume are defined by the
container runtime implementation on a host machine. At a minimum, they must include
all valid types supported by the container image field. The OCI object gets
mounted in a single directory (`spec.containers[*].volumeMounts[*].mountPath`)
and will be mounted read-only.

Besides that:

- `subPath` or
  `subPathExpr`
  mounts for containers (`spec.containers[*].volumeMounts[*].subPath`, `spec.containers[*].volumeMounts[*].subPathExpr`)
  are only supported from Kubernetes v1.33.
- The field `spec.securityContext.fsGroupChangePolicy` has no effect on this
  volume type.
- The `AlwaysPullImages` Admission Controller
  does also work for this volume source like for container images.

The following fields are available for the `image` type:

`reference`
: Artifact reference to be used. For example, you could specify
  `registry.k8s.io/conformance:v` to load the
  files from the Kubernetes conformance test image. Behaves in the same way as
  `pod.spec.containers[*].image`. Pull secrets will be assembled in the same way
  as for the container image by looking up node credentials, service account image
  pull secrets, and Pod spec image pull secrets. This field is optional to allow
  higher level config management to default or override container images in
  workload controllers like Deployments and StatefulSets.
  More info about container images.

`pullPolicy`
: Policy for pulling OCI objects. Possible values are: `Always`, `Never`, or
  `IfNotPresent`. Defaults to `Always` if `:latest` tag is specified, or
  `IfNotPresent` otherwise.

See the _Use an Image Volume With a Pod_
example for more details on how to use the volume source.

#### Pod status and `image` volumes {#image-volume-pod-status}

**Feature state:**

If the `ImageVolumeWithDigest` feature gate
is enabled in your cluster,
then whenever you specify an `image` volume for a Pod,
the kubelet updates the Pod status to record the _digest_
of the container image that's being used as a volume source.

Here's a simplified example of a running Pod, represented as YAML, including the status update.
Note the new `ImageRef` field under `volumeMounts` in the container status.

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: my-pod
  namespace: default
spec:
  containers:
  - name: shell
    command: ["sleep", "infinity"]
    image: docker.io/library/debian:12
    volumeMounts:
    - name: artifact
      mountPath: /data
  volumes:
  - name: artifact
    image:
      reference: quay.io/crio/artifact:v2
      pullPolicy: IfNotPresent
status:
  containerStatuses:
  - containerID: containerd://examplecontainerid1234567890abcdef
    image: docker.io/library/debian:12
    imageID: docker-pullable://docker.io/library/debian@sha256:3f1d6c17773a45c97bd8f158d665c9709d7b29ed7917ac934086ad96f92e4510
    volumeMounts:
    - name: artifact
      mountPath: /data
      readOnly: true
      imageRef: quay.io/crio/artifact@sha256:abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890
```

### iscsi

An `iscsi` volume allows an existing iSCSI (SCSI over IP) volume to be mounted
into your Pod. Unlike `emptyDir`, which is erased when a Pod is removed, the
contents of an `iscsi` volume are preserved, and the volume is merely
unmounted. This means that an iscsi volume can be pre-populated with data, and
that data can be shared between Pods.

**Note:**
You must have your own iSCSI server running with the volume created before you can use it.

A feature of iSCSI is that it can be mounted as read-only by multiple consumers
simultaneously. This means that you can pre-populate a volume with your dataset
and then serve it in parallel from as many Pods as you need. Unfortunately,
iSCSI volumes can only be mounted by a single consumer in read-write mode.
Simultaneous writers are not allowed.

### local

A `local` volume represents a mounted local storage device such as a disk,
partition or directory.

Local volumes can only be used as a statically created PersistentVolume. Dynamic
provisioning is not supported.

Compared to `hostPath` volumes, `local` volumes are used in a durable and
portable manner without manually scheduling Pods to nodes. The system is aware
of the volume's node constraints by looking at the node affinity on the PersistentVolume.

However, `local` volumes are subject to the availability of the underlying
node and are not suitable for all applications. If a node becomes unhealthy,
then the `local` volume becomes inaccessible to the Pod. The Pod using this volume
is unable to run. Applications using `local` volumes must be able to tolerate this
reduced availability, as well as potential data loss, depending on the
durability characteristics of the underlying disk.

The following example shows a PersistentVolume using a `local` volume and
`nodeAffinity`:

```yaml
apiVersion: v1
kind: PersistentVolume
metadata:
  name: example-pv
spec:
  capacity:
    storage: 100Gi
  volumeMode: Filesystem
  accessModes:
  - ReadWriteOnce
  persistentVolumeReclaimPolicy: Delete
  storageClassName: local-storage
  local:
    path: /mnt/disks/ssd1
  nodeAffinity:
    required:
      nodeSelectorTerms:
      - matchExpressions:
        - key: kubernetes.io/hostname
          operator: In
          values:
          - example-node
```

You must set a PersistentVolume `nodeAffinity` when using `local` volumes.
The Kubernetes scheduler uses the PersistentVolume `nodeAffinity` to schedule
these Pods to the correct node.

PersistentVolume `volumeMode` can be set to "Block" (instead of the default
value "Filesystem") to expose the local volume as a raw block device.

When using local volumes, it is recommended to create a StorageClass with
`volumeBindingMode` set to `WaitForFirstConsumer`. For more details, see the
local StorageClass example.
Delaying volume binding ensures that the PersistentVolumeClaim binding decision
will also be evaluated with any other node constraints the Pod may have,
such as node resource requirements, node selectors, Pod affinity, and Pod anti-affinity.

An external static provisioner can be run separately for improved management of
the local volume lifecycle. Note that this provisioner does not support dynamic
provisioning yet. For an example on how to run an external local provisioner, see the
local volume provisioner user guide.

**Note:**
The local PersistentVolume requires manual cleanup and deletion by the
user if the external static provisioner is not used to manage the volume
lifecycle.

### nfs

An `nfs` volume allows an existing NFS (Network File System) share to be
mounted into a Pod. Unlike `emptyDir`, which is erased when a Pod is
removed, the contents of an `nfs` volume are preserved, and the volume is merely
unmounted. This means that an NFS volume can be pre-populated with data, and
that data can be shared between Pods. NFS can be mounted by multiple
writers simultaneously.

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
    - mountPath: /my-nfs-data
      name: test-volume
  volumes:
  - name: test-volume
    nfs:
      server: my-nfs-server.example.com
      path: /my-nfs-volume
      readOnly: true
```

**Note:**
You must have your own NFS server running with the share exported before you can use it.

Also note that you can't specify NFS mount options in a Pod spec. You can either set mount options server-side or
use /etc/nfsmount.conf.
You can also mount NFS volumes via PersistentVolumes, which do allow you to set mount options.

### persistentVolumeClaim {#persistentvolumeclaim}

A `persistentVolumeClaim` volume is used to mount a
PersistentVolume into a Pod. PersistentVolumeClaims
are a way for users to "claim" durable storage (such as an iSCSI volume)
without knowing the details of the particular cloud environment.

See the information about PersistentVolumes for more
details.

### portworxVolume (deprecated) {#portworxvolume}

**Feature state:** v1.25 [deprecated]

A `portworxVolume` is an elastic block storage layer that runs hyperconverged with
Kubernetes. Portworx fingerprints storage
in a server, tiers based on capabilities, and aggregates capacity across multiple servers.
Portworx runs in-guest in virtual machines or on bare metal Linux nodes.

A `portworxVolume` can be dynamically created through Kubernetes, or it can also
be pre-provisioned and referenced inside a Pod.
Here is an example Pod referencing a pre-provisioned Portworx volume:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: test-portworx-volume-pod
spec:
  containers:
  - image: registry.k8s.io/test-webserver
    name: test-container
    volumeMounts:
    - mountPath: /mnt
      name: pxvol
  volumes:
  - name: pxvol
    # This Portworx volume must already exist.
    portworxVolume:
      volumeID: "pxvol"
      fsType: "<fs-type>"
```

**Note:**
Make sure you have an existing PortworxVolume with the name `pxvol`
before using it in the Pod.

#### Portworx CSI migration
**Feature state:**

In Kubernetes , all operations for the in-tree
Portworx volumes are redirected to the `pxd.portworx.com`
Container Storage Interface (CSI) Driver by default.
Portworx CSI Driver
must be installed on the cluster.

### projected

A projected volume maps several existing volume sources into the same
directory. For more details, see projected volumes.

### secret

A `secret` volume is used to pass sensitive information, such as passwords, to
Pods. You can store secrets in the Kubernetes API and mount them as files for
use by Pods without coupling to Kubernetes directly. `secret` volumes are
backed by tmpfs (a RAM-backed filesystem), so they are never written to
non-volatile storage.

**Note:**

* You must create a Secret in the Kubernetes API before you can use it.

* A Secret is always mounted as `readOnly`.

* A container using a Secret as a `subPath` volume mount will not
  receive Secret updates.

For more details, see Configuring Secrets.

## Using subPath {#using-subpath}

Sometimes, it is useful to share one volume for multiple uses in a single Pod.
The `volumeMounts[*].subPath` property specifies a sub-path inside the referenced volume
instead of its root.

The following example shows how to configure a Pod with a LAMP stack (Linux, Apache, MySQL, PHP)
using a single, shared volume. This sample `subPath` configuration is not recommended
for production use.

The PHP application's code and assets map to the volume's `html` folder and
the MySQL database is stored in the volume's `mysql` folder. For example:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: my-lamp-site
spec:
    containers:
    - name: mysql
      image: mysql
      env:
      - name: MYSQL_ROOT_PASSWORD
        value: "rootpasswd"
      volumeMounts:
      - mountPath: /var/lib/mysql
        name: site-data
        subPath: mysql
    - name: php
      image: php:7.0-apache
      volumeMounts:
      - mountPath: /var/www/html
        name: site-data
        subPath: html
    volumes:
    - name: site-data
      persistentVolumeClaim:
        claimName: my-lamp-site-data
```

### Using subPath with expanded environment variables {#using-subpath-expanded-environment}

**Feature state:** v1.17 [stable]

Use the `subPathExpr` field to construct `subPath` directory names from
downward API environment variables.
The `subPath` and `subPathExpr` properties are mutually exclusive.

In this example, a `Pod` uses `subPathExpr` to create a directory `pod1` within
the `hostPath` volume `/var/log/pods`.
The `hostPath` volume takes the `Pod` name from the `downwardAPI`.
The host directory `/var/log/pods/pod1` is mounted at `/logs` in the container.

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: pod1
spec:
  containers:
  - name: container1
    env:
    - name: POD_NAME
      valueFrom:
        fieldRef:
          apiVersion: v1
          fieldPath: metadata.name
    image: busybox:1.28
    command: [ "sh", "-c", "while [ true ]; do echo 'Hello'; sleep 10; done | tee -a /logs/hello.txt" ]
    volumeMounts:
    - name: workdir1
      mountPath: /logs
      # The variable expansion uses round brackets (not curly brackets).
      subPathExpr: $(POD_NAME)
  restartPolicy: Never
  volumes:
  - name: workdir1
    hostPath:
      path: /var/log/pods
```

## Resources

The storage medium (such as Disk or SSD) of an `emptyDir` volume is determined by the
medium of the filesystem holding the kubelet root dir (typically
`/var/lib/kubelet`). There is no limit on how much space an `emptyDir` or
`hostPath` volume can consume, and no isolation between containers or
Pods.

To learn about requesting space using a resource specification, see
how to manage resources.
