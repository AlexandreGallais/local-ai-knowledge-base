---
title: "Configure a Pod to Use a Projected Volume for Storage"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/tasks/configure-pod-container/configure-projected-volume-storage.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Configure a Pod to Use a Projected Volume for Storage

This page shows how to use a `projected` Volume to mount
several existing volume sources into the same directory. Currently, `secret`, `configMap`, `downwardAPI`,
and `serviceAccountToken` volumes can be projected.

**Note:**
`serviceAccountToken` is not a volume type.

## Configure a projected volume for a pod

In this exercise, you create username and password Secrets from local files. You then create a Pod that runs one container, using a `projected` Volume to mount the Secrets into the same shared directory.

Here is the configuration file for the Pod:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: test-projected-volume
spec:
  containers:
  - name: test-projected-volume
    image: busybox:1.28
    args:
    - sleep
    - "86400"
    volumeMounts:
    - name: all-in-one
      mountPath: "/projected-volume"
      readOnly: true
  volumes:
  - name: all-in-one
    projected:
      sources:
      - secret:
          name: user
      - secret:
          name: pass
```

1. Create the Secrets:

    ```shell
    # Create files containing the username and password:
    echo -n "admin" > ./username.txt
    echo -n "1f2d1e2e67df" > ./password.txt

    # Package these files into secrets:
    kubectl create secret generic user --from-file=./username.txt
    kubectl create secret generic pass --from-file=./password.txt
    ```
1. Create the Pod:

    ```shell
    kubectl apply -f https://k8s.io/examples/pods/storage/projected.yaml
    ```
1. Verify that the Pod's container is running, and then watch for changes to
the Pod:

    ```shell
    kubectl get --watch pod test-projected-volume
    ```
    The output looks like this:
    ```
    NAME                    READY     STATUS    RESTARTS   AGE
    test-projected-volume   1/1       Running   0          14s
    ```
1. In another terminal, get a shell to the running container:

    ```shell
    kubectl exec -it test-projected-volume -- /bin/sh
    ```
1. In your shell, verify that the `projected-volume` directory contains your projected sources:

    ```shell
    ls /projected-volume/
    ```

## Clean up

Delete the Pod and the Secrets:

```shell
kubectl delete pod test-projected-volume
kubectl delete secret user pass
```

## What's next

* Learn more about `projected` volumes.
* Read the all-in-one volume design document.
