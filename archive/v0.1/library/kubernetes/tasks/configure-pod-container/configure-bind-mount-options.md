---
title: "Set Bind Mount Options on Volume Mounts"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/tasks/configure-pod-container/configure-bind-mount-options.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Set Bind Mount Options on Volume Mounts

**Feature state:**

This page shows how to apply security-related bind mount options (`noexec`,
`nodev`, `nosuid`) to volume mounts in a Pod.

## Before you begin

You need to have the `VolumeBindMountOptions`
feature gate enabled
on the API server **and** the kubelet. The container runtime must also support
the `mount_options` field in the CRI `Mount` message.

## Create a Pod with bind mount options {#create-pod}

The `.spec.containers[*].volumeMounts[*].bindMountOptions` field accepts a list of bind mount flags.
The allowed values are `noexec`, `nodev`, and `nosuid`.

For example, to mount an emptyDir volume at `/tmp` with `noexec` and `nosuid`
so that binaries cannot be executed and set-user-ID bits are ignored:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: bind-mount-options-demo
spec:
  containers:
  - image: registry.k8s.io/busybox
    name: test-container
    command: ["sleep", "3600"]
    volumeMounts:
    - mountPath: /tmp
      name: tmp-volume
      bindMountOptions:
      - noexec
      - nosuid
  volumes:
  - name: tmp-volume
    emptyDir: {}
```

1. Create the pod on your cluster:

   ```shell
   kubectl apply -f https://k8s.io/examples/pods/bind-mount-options.yaml
   ```

1. Verify the pod is running:

   ```shell
   kubectl get pod bind-mount-options-demo
   ```

1. Check the mount options on the volume:

   ```shell
   kubectl exec bind-mount-options-demo -- mount | grep /tmp
   ```

   The output should include `noexec` and `nosuid` in the mount options.

1. Verify that executing a binary on the mount fails:

   ```shell
   kubectl exec bind-mount-options-demo -- sh -c 'cp /bin/ls /tmp/ls && /tmp/ls'
   ```

   The output is similar to:

   ```none
   sh: /tmp/ls: Permission denied
   ```

1. Delete the Pod that you created for this exercise:

   ```shell
   kubectl delete pod bind-mount-options-demo
   ```

## What's next

- Learn more about bind mount options for volumes
