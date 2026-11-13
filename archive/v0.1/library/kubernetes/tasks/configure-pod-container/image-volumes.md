---
title: "Use an Image Volume With a Pod"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/tasks/configure-pod-container/image-volumes.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Use an Image Volume With a Pod

**Feature state:**

This page shows how to configure a pod using image volumes. This allows you to
mount content from OCI registries inside containers.

## Before you begin

- The container runtime needs to support the image volumes feature
- You need to exec commands in the host
- You need to be able to exec into pods

## Run a Pod that uses an image volume {#create-pod}

An image volume for a pod is enabled by setting the `volumes[*].image` field of `.spec`
to a valid reference and consuming it in the `volumeMounts` of the container. For example:

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

1. Create the pod on your cluster:

   ```shell
   kubectl apply -f https://k8s.io/examples/pods/image-volumes.yaml
   ```

1. Attach to the container:

   ```shell
   kubectl exec image-volume -it -- bash
   ```

1. Check the content of a file in the volume:

   ```shell
   cat /volume/dir/file
   ```

   The output is similar to:

   ```none
   1
   ```

   You can also check another file in a different path:

   ```shell
   cat /volume/file
   ```

   The output is similar to:

   ```none
   2
   ```

## Use `subPath` (or `subPathExpr`)

It is possible to utilize
`subPath` or
`subPathExpr`
from Kubernetes v1.33 when using the image volume feature.

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
      subPath: dir
  volumes:
  - name: volume
    image:
      reference: quay.io/crio/artifact:v2
      pullPolicy: IfNotPresent
```

1. Create the pod on your cluster:

   ```shell
   kubectl apply -f https://k8s.io/examples/pods/image-volumes-subpath.yaml
   ```

1. Attach to the container:

   ```shell
   kubectl exec image-volume -it -- bash
   ```

1. Check the content of the file from the `dir` sub path in the volume:

   ```shell
   cat /volume/file
   ```

   The output is similar to:

   ```none
   1
   ```

## Further reading

- `image` volumes
