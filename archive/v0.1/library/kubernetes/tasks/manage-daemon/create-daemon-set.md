---
title: "Building a Basic DaemonSet"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/tasks/manage-daemon/create-daemon-set.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Building a Basic DaemonSet

This page demonstrates how to build a basic <example-value>
that runs a Pod on every node in a Kubernetes cluster.
It covers a simple use case of mounting a file from the host, logging its contents using
an init container, and utilizing a pause container.

## Before you begin

A Kubernetes cluster with at least two nodes (one control plane node and one worker node)
to demonstrate the behavior of DaemonSets.

## Define the DaemonSet

In this task, a basic <example-value> is created which ensures that the copy of a Pod is scheduled on every node.
The Pod will use an init container to read and log the contents of `/etc/machine-id` from the host,
while the main container will be a `pause` container, which keeps the Pod running.

```yaml
apiVersion: apps/v1
kind: DaemonSet
metadata:
  name: example-daemonset
spec:
  selector:
    matchLabels:
      app.kubernetes.io/name: example
  template:
    metadata:
      labels:
        app.kubernetes.io/name: example
    spec:
      containers:
      - name: pause
        image: registry.k8s.io/pause
      initContainers:
      - name: log-machine-id
        image: busybox:1.37
        command: ['sh', '-c', 'cat /etc/machine-id > /var/log/machine-id.log']
        volumeMounts:
        - name: machine-id
          mountPath: /etc/machine-id
          readOnly: true
        - name: log-dir
          mountPath: /var/log
      volumes:
      - name: machine-id
        hostPath:
          path: /etc/machine-id
          type: File
      - name: log-dir
        hostPath:
          path: /var/log
```

1. Create a DaemonSet based on the (YAML) manifest:

   ```shell
   kubectl apply -f https://k8s.io/examples/application/basic-daemonset.yaml
   ```

1. Once applied, you can verify that the DaemonSet is running a Pod on every node in the cluster:

   ```shell
   kubectl get pods -o wide
   ```

   The output will list one Pod per node, similar to:

   ```
   NAME                                READY   STATUS    RESTARTS   AGE    IP       NODE
   example-daemonset-xxxxx             1/1     Running   0          5m     x.x.x.x  node-1
   example-daemonset-yyyyy             1/1     Running   0          5m     x.x.x.x  node-2
   ```

1. You can inspect the contents of the logged `/etc/machine-id` file by checking
   the log directory mounted from the host:

   ```shell
   kubectl exec <pod-name> -- cat /var/log/machine-id.log
   ```

   Where `<pod-name>` is the name of one of your Pods.

## Clean up

To delete the DaemonSet, run this command:

```shell
kubectl delete --cascade=foreground --ignore-not-found --now daemonsets/example-daemonset
```

This simple DaemonSet example introduces key <example-value> like init containers and host path volumes,
which can be expanded upon for more advanced use cases. For more details refer to
DaemonSet.

## What's next

* See Performing a rolling update on a DaemonSet
* See Creating a DaemonSet to adopt existing DaemonSet pods
