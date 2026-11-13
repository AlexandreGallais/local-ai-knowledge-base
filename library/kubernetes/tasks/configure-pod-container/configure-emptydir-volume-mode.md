---
title: "Set Permissions on an emptyDir Volume"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/tasks/configure-pod-container/configure-emptydir-volume-mode.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Set Permissions on an emptyDir Volume

**Feature state:**

This page shows how to set Unix permission bits on an `emptyDir` volume directory
using the `mode` field.

## Before you begin

You need to have the `EmptyDirVolumeMode`
feature gate enabled
on the API server **and** the kubelet.

## Create a Pod that uses an emptyDir volume with custom permissions {#create-pod}

The `emptyDir.mode` field lets you set Unix permission bits (from `0000` to `01777` in octal)
on the volume directory. If not specified, the directory is created with the default `0777`
permissions.

For example, to create a shared `/tmp` directory with the sticky bit set so that only file
owners can delete their own files:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: emptydir-mode-demo
spec:
  containers:
  - image: registry.k8s.io/busybox
    name: test-container
    command: ["sleep", "3600"]
    volumeMounts:
    - mountPath: /tmp
      name: tmp-volume
  volumes:
  - name: tmp-volume
    emptyDir:
      mode: 01777
```

1. Create the pod on your cluster:

   ```shell
   kubectl apply -f https://k8s.io/examples/pods/emptydir-volume-mode.yaml
   ```

1. Verify the pod is running:

   ```shell
   kubectl get pod emptydir-mode-demo
   ```

1. Check the permissions on the mounted volume:

   ```shell
   kubectl exec emptydir-mode-demo -- ls -ld /tmp
   ```

   The output is similar to:

   ```none
   drwxrwxrwt 2 root root 4096 Jul 28 00:00 /tmp
   ```

   The `t` at the end confirms the sticky bit is set.

1. Delete the Pod that you created for this exercise:

   ```shell
   kubectl delete pod emptydir-mode-demo
   ```

## What's next

- Learn more about `emptyDir` volumes
