---
title: "Debug a StatefulSet"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/tasks/debug/debug-application/debug-statefulset.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Debug a StatefulSet

This task shows you how to debug a StatefulSet.

## Before you begin

* You need to have a Kubernetes cluster, and the kubectl command-line tool must be configured to communicate with your cluster.
* You should have a StatefulSet running that you want to investigate.

## Debugging a StatefulSet

In order to list all the pods which belong to a StatefulSet, which have a label `app.kubernetes.io/name=MyApp` set on them,
you can use the following:

```shell
kubectl get pods -l app.kubernetes.io/name=MyApp
```

If you find that any Pods listed are in `Unknown` or `Terminating` state for an extended period of time,
refer to the Deleting StatefulSet Pods task for
instructions on how to deal with them.
You can debug individual Pods in a StatefulSet using the
Debugging Pods guide.

## What's next

Learn more about debugging an init-container.
