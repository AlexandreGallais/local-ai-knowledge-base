---
title: "Configure a Pod Quota for a Namespace"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/tasks/administer-cluster/manage-resources/quota-pod-namespace.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Configure a Pod Quota for a Namespace

This page shows how to set a quota for the total number of Pods that can run
in a Namespace. You specify quotas in a
ResourceQuota
object.

## Before you begin

You must have access to create namespaces in your cluster.

## Create a namespace

Create a namespace so that the resources you create in this exercise are
isolated from the rest of your cluster.

```shell
kubectl create namespace quota-pod-example
```

## Create a ResourceQuota

Here is an example manifest for a ResourceQuota:

```yaml
apiVersion: v1
kind: ResourceQuota
metadata:
  name: pod-demo
spec:
  hard:
    pods: "2"
```

Create the ResourceQuota:

```shell
kubectl apply -f https://k8s.io/examples/admin/resource/quota-pod.yaml --namespace=quota-pod-example
```

View detailed information about the ResourceQuota:

```shell
kubectl get resourcequota pod-demo --namespace=quota-pod-example --output=yaml
```

The output shows that the namespace has a quota of two Pods, and that currently there are
no Pods; that is, none of the quota is used.

```yaml
spec:
  hard:
    pods: "2"
status:
  hard:
    pods: "2"
  used:
    pods: "0"
```

Here is an example manifest for a deployment:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: pod-quota-demo
spec:
  selector:
    matchLabels:
      purpose: quota-demo
  replicas: 3
  template:
    metadata:
      labels:
        purpose: quota-demo
    spec:
      containers:
      - name: pod-quota-demo
        image: nginx
```

In that manifest, `replicas: 3` tells Kubernetes to attempt to create three new Pods, all
running the same application.

Create the Deployment:

```shell
kubectl apply -f https://k8s.io/examples/admin/resource/quota-pod-deployment.yaml --namespace=quota-pod-example
```

View detailed information about the Deployment:

```shell
kubectl get deployment pod-quota-demo --namespace=quota-pod-example --output=yaml
```

The output shows that even though the Deployment specifies three replicas, only two
Pods were created because of the quota you defined earlier:

```yaml
spec:
  ...
  replicas: 3
...
status:
  availableReplicas: 2
...
lastUpdateTime: 2021-04-02T20:57:05Z
    message: 'unable to create pods: pods "pod-quota-demo-1650323038-" is forbidden:
      exceeded quota: pod-demo, requested: pods=1, used: pods=2, limited: pods=2'
```

### Choice of resource

In this task you have defined a ResourceQuota that limited the total number of Pods, but
you could also limit the total number of other kinds of object. For example, you
might decide to limit how many CronJobs
that can live in a single namespace.

## Clean up

Delete your namespace:

```shell
kubectl delete namespace quota-pod-example
```

## What's next

### For cluster administrators

* Configure Default Memory Requests and Limits for a Namespace

* Configure Default CPU Requests and Limits for a Namespace

* Configure Minimum and Maximum Memory Constraints for a Namespace

* Configure Minimum and Maximum CPU Constraints for a Namespace

* Configure Memory and CPU Quotas for a Namespace

* Configure Quotas for API Objects

### For app developers

* Assign Memory Resources to Containers and Pods

* Assign CPU Resources to Containers and Pods

* Assign Pod-level CPU and memory resources

* Configure Quality of Service for Pods
