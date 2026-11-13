---
title: "Volumes (part 5 of 5)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/concepts/storage/volumes.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Volumes (part 5 of 5)

## File owner

### Group ownership (GID)

Volume file group ownership (GID) is controlled by the pod's `spec.securityContext.fsGroup`.

For detailed configuration steps, refer to
Configure a Security Context for a Pod or Container.

### User ownership (UID)

**Feature state:**

Setting the `AtomicWriteVolumeUserFields` feature gate
enables file user ownership (UID) fields of `configMap`, `secret`, `downwardAPI` and `projected` volumes.

When `defaultUser` is specified at the volume level, it sets the owner UID for all its data files at creation time.
At the item level, the `user` field controls owner UID of an individual file and takes precedence over `defaultUser`.

Example:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: volume-user-fields-example
spec:
  containers:
  - name: test
    image: busybox:1.28
    command: ['sh', '-c', 'echo "The app is running!" && tail -f /dev/null']
    volumeMounts:
    - name: volA
      mountPath: /mnt/volA
    - name: volB
      mountPath: /mnt/volB
    - name: volC
      mountPath: /mnt/volC
  volumes:
  - name: volA
    configMap:
      defaultUser: 1000
      name: cm1
      items:
      - key: foo # Owner=defaultUser
        path: foo
      - key: bar # Owner=user
        path: bar
        user: 1001
  - name: volB
    secret: # Owner=defaultUser
      defaultUser: 1000
      secretName: secret1
  - name: volC
    projected:
      sources:
      - secret:
          name: secret2
          items:
          - key: moo # Owner=root
            path: moo
          - key: baa # Owner=user
            path: baa
            user: 1000
```

#### Implementations {#implementations-rro}

The following container runtimes are known to support recursive read-only mounts.

CRI-level:

- containerd, since v2.0
- CRI-O, since v1.30

OCI-level:

- runc, since v1.1
- crun, since v1.8.6

## Bind mount options

**Feature state:**

The `.spec.containers[*].volumeMounts[*].bindMountOptions` field lets you apply security-related
Linux bind mount flags to any volume mount. The allowed values are:

* `noexec` - prevents execution of binaries on the mounted volume
* `nodev` - ignores device special files on the mounted volume
* `nosuid` - ignores set-user-identifier or set-group-identifier bits on the mounted volume

These options apply per container, so different containers in the same Pod can mount
the same volume with different bind mount options. The field is not supported with
image volumes.

**Note:**
The container runtime (such as containerd or CRI-O) must support the `mount_options`
field in the CRI `Mount` message. If the runtime does not advertise support, the kubelet
rejects Pods that use `bindMountOptions`. This field has no effect on Windows nodes.

## What's next

Follow an example of deploying WordPress and MySQL with Persistent Volumes.
