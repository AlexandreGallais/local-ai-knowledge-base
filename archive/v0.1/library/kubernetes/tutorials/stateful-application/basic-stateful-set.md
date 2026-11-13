---
title: "StatefulSet Basics (part 1 of 5)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/tutorials/stateful-application/basic-stateful-set.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

This tutorial provides an introduction to managing applications with
StatefulSets.
It demonstrates how to create, delete, scale, and update the Pods of StatefulSets.

## Before you begin

Before you begin this tutorial, you should familiarize yourself with the
following Kubernetes concepts:

* Pods
* Cluster DNS
* Headless Services
* PersistentVolumes
* PersistentVolumes Provisioning
* The kubectl command line tool

You should configure `kubectl` to use a context that uses the `default`
namespace.
If you are using an existing cluster, make sure that it's OK to use that
cluster's default namespace to practice. Ideally, practice in a cluster
that doesn't run any real workloads.

It's also useful to read the concept page about StatefulSets.

This tutorial assumes that your cluster is configured to dynamically provision
PersistentVolumes. You'll also need to have a default StorageClass.
If your cluster is not configured to provision storage dynamically, you
will have to manually provision two 1 GiB volumes prior to starting this
tutorial and
set up your cluster so that those PersistentVolumes map to the
PersistentVolumeClaim templates that the StatefulSet defines.

## Objectives

StatefulSets are intended to be used with stateful applications and distributed
systems. However, the administration of stateful applications and
distributed systems on Kubernetes is a broad, complex topic. In order to
demonstrate the basic <example-value> of a StatefulSet, and not to conflate the former
topic with the latter, you will deploy a simple web application using a StatefulSet.

After this tutorial, you will be familiar with the following.

* How to create a StatefulSet
* How a StatefulSet manages its Pods
* How to delete a StatefulSet
* How to scale a StatefulSet
* How to update a StatefulSet's Pods

## Creating a StatefulSet

Begin by creating a StatefulSet (and the Service that it relies upon) using
the example below. It is similar to the example presented in the
StatefulSets concept.
It creates a headless Service,
`nginx`, to publish the IP addresses of Pods in the StatefulSet, `web`.

```yaml
apiVersion: v1
kind: Service
metadata:
  name: nginx
  labels:
    app: nginx
spec:
  ports:
  - port: 80
    name: web
  clusterIP: None
  selector:
    app: nginx
---
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: web
spec:
  serviceName: "nginx"
  replicas: 2
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: registry.k8s.io/nginx-slim:0.21
        ports:
        - containerPort: 80
          name: web
        volumeMounts:
        - name: www
          mountPath: /usr/share/nginx/html
  volumeClaimTemplates:
  - metadata:
      name: www
    spec:
      accessModes: [ "ReadWriteOnce" ]
      resources:
        requests:
          storage: 1Gi
```

You will need to use at least two terminal windows. In the first terminal, use
`kubectl get` to watch the creation
of the StatefulSet's Pods.

```shell
# use this terminal to run commands that specify --watch
# end this watch when you are asked to start a new watch
kubectl get pods --watch -l app=nginx
```

In the second terminal, use
`kubectl apply` to create the
headless Service and StatefulSet:

```shell
kubectl apply -f https://k8s.io/examples/application/web/web.yaml
```
```
service/nginx created
statefulset.apps/web created
```

The command above creates two Pods, each running an
NGINX webserver. Get the `nginx` Service...
```shell
kubectl get service nginx
```
```
NAME      TYPE         CLUSTER-IP   EXTERNAL-IP   PORT(S)   AGE
nginx     ClusterIP    None         <none>        80/TCP    12s
```
...then get the `web` StatefulSet, to verify that both were created successfully:
```shell
kubectl get statefulset web
```
```
NAME   READY   AGE
web    2/2     37s
```

### Ordered Pod creation

A StatefulSet defaults to creating its Pods in a strict order.

For a StatefulSet with _n_ replicas, when Pods are being deployed, they are
created sequentially, ordered from _{0..n-1}_. Examine the output of the
`kubectl get` command in the first terminal. Eventually, the output will
look like the example below.

```shell
# Do not start a new watch;
# this should already be running
kubectl get pods --watch -l app=nginx
```
```
NAME      READY     STATUS    RESTARTS   AGE
web-0     0/1       Pending   0          0s
web-0     0/1       Pending   0         0s
web-0     0/1       ContainerCreating   0         0s
web-0     1/1       Running   0         19s
web-1     0/1       Pending   0         0s
web-1     0/1       Pending   0         0s
web-1     0/1       ContainerCreating   0         0s
web-1     1/1       Running   0         18s
```

Notice that the `web-1` Pod is not launched until the `web-0` Pod is
_Running_ (see Pod Phase)
and _Ready_ (see `type` in Pod Conditions).

Later in this tutorial you will practice parallel startup.

To configure the integer ordinal assigned to each Pod in a StatefulSet, see
Start ordinal.

## Pods in a StatefulSet

Pods in a StatefulSet have a unique ordinal index and a stable network identity.

### Examining the Pod's ordinal index

Get the StatefulSet's Pods:

```shell
kubectl get pods -l app=nginx
```
```
NAME      READY     STATUS    RESTARTS   AGE
web-0     1/1       Running   0          1m
web-1     1/1       Running   0          1m
```

As mentioned in the StatefulSets
concept, the Pods in a StatefulSet have a sticky, unique identity. This identity
is based on a unique ordinal index that is assigned to each Pod by the
StatefulSet controller.
The Pods' names take the form `<statefulset name>-<ordinal index>`.
Since the `web` StatefulSet has two replicas, it creates two Pods, `web-0` and `web-1`.

### Using stable network identities

Each Pod has a stable hostname based on its ordinal index. Use
`kubectl exec` to execute the
`hostname` command in each Pod:

```shell
for i in 0 1; do kubectl exec "web-$i" -- sh -c 'hostname'; done
```
```
web-0
web-1
```

Use `kubectl run` to execute
a container that provides the `nslookup` command from the `dnsutils` package.
Using `nslookup` on the Pods' hostnames, you can examine their in-cluster DNS
addresses:

```shell
kubectl run -i --tty --image busybox:1.28 dns-test --restart=Never --rm
```
which starts a new shell. In that new shell, run:
```shell
# Run this in the dns-test container shell
nslookup web-0.nginx
```
The output is similar to:
```
Server:    10.0.0.10
Address 1: 10.0.0.10 kube-dns.kube-system.svc.cluster.local

Name:      web-0.nginx
Address 1: 10.244.1.6

nslookup web-1.nginx
Server:    10.0.0.10
Address 1: 10.0.0.10 kube-dns.kube-system.svc.cluster.local

Name:      web-1.nginx
Address 1: 10.244.2.6
```

(and now exit the container shell: `exit`)

The CNAME of the headless service points to SRV records (one for each Pod that
is Running and Ready). The SRV records point to A record entries that
contain the Pods' IP addresses.

In one terminal, watch the StatefulSet's Pods:

```shell
# Start a new watch
# End this watch when you've seen that the delete is finished
kubectl get pod --watch -l app=nginx
```
In a second terminal, use
`kubectl delete` to delete all
the Pods in the StatefulSet:

```shell
kubectl delete pod -l app=nginx
```
```
pod "web-0" deleted
pod "web-1" deleted
```

Wait for the StatefulSet to restart them, and for both Pods to transition to
Running and Ready:

```shell
# This should already be running
kubectl get pod --watch -l app=nginx
```
```
NAME      READY     STATUS              RESTARTS   AGE
web-0     0/1       ContainerCreating   0          0s
NAME      READY     STATUS    RESTARTS   AGE
web-0     1/1       Running   0          2s
web-1     0/1       Pending   0         0s
web-1     0/1       Pending   0         0s
web-1     0/1       ContainerCreating   0         0s
web-1     1/1       Running   0         34s
```

Use `kubectl exec` and `kubectl run` to view the Pods' hostnames and in-cluster
DNS entries. First, view the Pods' hostnames:

```shell
for i in 0 1; do kubectl exec web-$i -- sh -c 'hostname'; done
```
```
web-0
web-1
```
then, run:
```shell
kubectl run -i --tty --image busybox:1.28 dns-test --restart=Never --rm
```
which starts a new shell.
In that new shell, run:
```shell
# Run this in the dns-test container shell
nslookup web-0.nginx
```
The output is similar to:
```
Server:    10.0.0.10
Address 1: 10.0.0.10 kube-dns.kube-system.svc.cluster.local

Name:      web-0.nginx
Address 1: 10.244.1.7

nslookup web-1.nginx
Server:    10.0.0.10
Address 1: 10.0.0.10 kube-dns.kube-system.svc.cluster.local

Name:      web-1.nginx
Address 1: 10.244.2.8
```

(and now exit the container shell: `exit`)

The Pods' ordinals, hostnames, SRV records, and A record names have not changed,
but the IP addresses associated with the Pods may have changed. In the cluster
used for this tutorial, they have. This is why it is important not to configure
other applications to connect to Pods in a StatefulSet by the IP address
of a particular Pod (it is OK to connect to Pods by resolving their hostname).

#### Discovery for specific Pods in a StatefulSet

If you need to find and connect to the active members of a StatefulSet, you
should query the CNAME of the headless Service
(`nginx.default.svc.cluster.local`). The SRV records associated with the
CNAME will contain only the Pods in the StatefulSet that are Running and
Ready.

If your application already implements connection logic that tests for
liveness and readiness, you can use the SRV records of the Pods (
`web-0.nginx.default.svc.cluster.local`,
`web-1.nginx.default.svc.cluster.local`), as they are stable, and your
application will be able to discover the Pods' addresses when they transition
to Running and Ready.

If your application wants to find any healthy Pod in a StatefulSet,
and therefore does not need to track each specific Pod,
you could also connect to the IP address of a `type: ClusterIP` Service,
backed by the Pods in that StatefulSet. You can use the same Service that
tracks the StatefulSet (specified in the `serviceName` of the StatefulSet)
or a separate Service that selects the right set of Pods.

### Writing to stable storage

Get the PersistentVolumeClaims for `web-0` and `web-1`:

```shell
kubectl get pvc -l app=nginx
```
The output is similar to:
```
NAME        STATUS    VOLUME                                     CAPACITY   ACCESSMODES   AGE
www-web-0   Bound     pvc-15c268c7-b507-11e6-932f-42010a800002   1Gi        RWO           48s
www-web-1   Bound     pvc-15c79307-b507-11e6-932f-42010a800002   1Gi        RWO           48s
```

The StatefulSet controller created two
PersistentVolumeClaims
that are bound to two
PersistentVolumes.

As the cluster used in this tutorial is configured to dynamically provision PersistentVolumes,
the PersistentVolumes were created and bound automatically.

The NGINX webserver, by default, serves an index file from
`/usr/share/nginx/html/index.html`. The `volumeMounts` field in the
StatefulSet's `spec` ensures that the `/usr/share/nginx/html` directory is
backed by a PersistentVolume.

Write the Pods' hostnames to their `index.html` files and verify that the NGINX
webservers serve the hostnames:

```shell
for i in 0 1; do kubectl exec "web-$i" -- sh -c 'echo "$(hostname)" > /usr/share/nginx/html/index.html'; done

for i in 0 1; do kubectl exec -i -t "web-$i" -- curl http://localhost/; done
```
```
web-0
web-1
```

If you instead see **403 Forbidden** responses for the above curl command,
you will need to fix the permissions of the directory mounted by the `volumeMounts`
(due to a bug when using hostPath volumes),
by running:

`for i in 0 1; do kubectl exec web-$i -- chmod 755 /usr/share/nginx/html; done`

before retrying the `curl` command above.

In one terminal, watch the StatefulSet's Pods:

```shell
# End this watch when you've reached the end of the section.
# At the start of "Scaling a StatefulSet" you'll start a new watch.
kubectl get pod --watch -l app=nginx
```

In a second terminal, delete all of the StatefulSet's Pods:

```shell
kubectl delete pod -l app=nginx
```
```
pod "web-0" deleted
pod "web-1" deleted
```
Examine the output of the `kubectl get` command in the first terminal, and wait
for all of the Pods to transition to Running and Ready.

```shell
# This should already be running
kubectl get pod --watch -l app=nginx
```
```
NAME      READY     STATUS              RESTARTS   AGE
web-0     0/1       ContainerCreating   0          0s
NAME      READY     STATUS    RESTARTS   AGE
web-0     1/1       Running   0          2s
web-1     0/1       Pending   0         0s
web-1     0/1       Pending   0         0s
web-1     0/1       ContainerCreating   0         0s
web-1     1/1       Running   0         34s
```

Verify the web servers continue to serve their hostnames:

```
for i in 0 1; do kubectl exec -i -t "web-$i" -- curl http://localhost/; done
```
```
web-0
web-1
```

Even though `web-0` and `web-1` were rescheduled, they continue to serve their
hostnames because the PersistentVolumes associated with their
PersistentVolumeClaims are remounted to their `volumeMounts`. No matter what
node `web-0`and `web-1` are scheduled on, their PersistentVolumes will be
mounted to the appropriate mount points.
