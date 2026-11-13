---
title: "StatefulSets (part 1 of 2)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/concepts/workloads/controllers/statefulset.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

StatefulSet is the workload API object used to manage stateful applications.

## Using StatefulSets

StatefulSets are valuable for applications that require one or more of the
following:

* Stable, unique network identifiers.
* Stable, persistent storage.
* Ordered, graceful deployment and scaling.
* Ordered, automated rolling updates.

In the above, stable is synonymous with persistence across Pod (re)scheduling.
If an application doesn't require any stable identifiers or ordered deployment,
deletion, or scaling, you should deploy your application using a workload object
that provides a set of stateless replicas.
Deployment or
ReplicaSet may be better suited to your stateless needs.

## Limitations

* The storage for a given Pod must either be provisioned by a
  PersistentVolume Provisioner
  based on the requested _storage class_, or pre-provisioned by an admin.
* Deleting and/or scaling a StatefulSet down will _not_ delete the volumes associated with the
  StatefulSet. This is done to ensure data safety, which is generally more valuable than an
  automatic purge of all related StatefulSet resources.
* StatefulSets currently require a Headless Service
  to be responsible for the network identity of the Pods. You are responsible for creating this
  Service.
* StatefulSets do not provide any guarantees on the termination of pods when a StatefulSet is
  deleted. To achieve ordered and graceful termination of the pods in the StatefulSet, it is
  possible to scale the StatefulSet down to 0 prior to deletion.
* When using Rolling Updates with the default
  Pod Management Policy (`OrderedReady`),
  it's possible to get into a broken state that requires
  manual intervention to repair.

## Components

The example below demonstrates the components of a StatefulSet.

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
  selector:
    matchLabels:
      app: nginx # has to match .spec.template.metadata.labels
  serviceName: "nginx"
  replicas: 3 # by default is 1
  minReadySeconds: 10 # by default is 0
  template:
    metadata:
      labels:
        app: nginx # has to match .spec.selector.matchLabels
    spec:
      terminationGracePeriodSeconds: 10
      containers:
      - name: nginx
        image: registry.k8s.io/nginx-slim:0.24
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
      storageClassName: "my-storage-class"
      resources:
        requests:
          storage: 1Gi
```

**Note:**
This example uses the `ReadWriteOnce` access mode, for simplicity. For
production use, the Kubernetes project recommends using the `ReadWriteOncePod`
access mode instead.

In the above example:

* A Headless Service, named `nginx`, is used to control the network domain.
* The StatefulSet, named `web`, has a Spec that indicates that 3 replicas of the nginx container will be launched in unique Pods.
* The `volumeClaimTemplates` will provide stable storage using
  PersistentVolumes provisioned by a
  PersistentVolume Provisioner.

The name of a StatefulSet object must be a valid
DNS label.

### Pod Selector

You must set the `.spec.selector` field of a StatefulSet to match the labels of its
`.spec.template.metadata.labels`. Failing to specify a matching Pod Selector will result in a
validation error during StatefulSet creation.

### Volume Claim Templates

You can set the `.spec.volumeClaimTemplates` field to create a
PersistentVolumeClaim.
This will provide stable storage to the StatefulSet if either:

* The StorageClass specified for the volume claim is set up to use dynamic
  provisioning.
* The cluster already contains a PersistentVolume with the correct StorageClass
  and sufficient available storage space.

### Minimum ready seconds

**Feature state:** v1.25 [stable]

`.spec.minReadySeconds` is an optional field that specifies the minimum number of seconds for which a newly
created Pod should be running and ready without any of its containers crashing, for it to be considered available.
This is used to check progression of a rollout when using a Rolling Update strategy.
This field defaults to 0 (the Pod will be considered available as soon as it is ready). To learn more about when
a Pod is considered ready, see Container Probes.

## Pod Identity

StatefulSet Pods have a unique identity that consists of an ordinal, a
stable network identity, and stable storage. The identity sticks to the Pod,
regardless of which node it's (re)scheduled on.

### Ordinal Index

For a StatefulSet with N replicas, each Pod in the StatefulSet
will be assigned an integer ordinal, that is unique over the Set. By default,
pods will be assigned ordinals from 0 up through N-1. The StatefulSet controller
will also add a pod label with this index: `apps.kubernetes.io/pod-index`.

### Start ordinal

**Feature state:**

`.spec.ordinals` is an optional field that allows you to configure the integer
ordinals assigned to each Pod. It defaults to nil. Within the field, you can
configure the following options:

* `.spec.ordinals.start`: If the `.spec.ordinals.start` field is set, Pods will
  be assigned ordinals from `.spec.ordinals.start` up through
  `.spec.ordinals.start + .spec.replicas - 1`.

### Stable Network ID

Each Pod in a StatefulSet derives its hostname from the name of the StatefulSet
and the ordinal of the Pod. The pattern for the constructed hostname
is `$(statefulset name)-$(ordinal)`. The example above will create three Pods
named `web-0,web-1,web-2`.
A StatefulSet can use a Headless Service
to control the domain of its Pods. The domain managed by this Service takes the form:
`$(service name).$(namespace).svc.cluster.local`, where "cluster.local" is the
cluster domain.
As each Pod is created, it gets a matching DNS subdomain, taking the form:
`$(podname).$(governing service domain)`, where the governing service is defined
by the `serviceName` field on the StatefulSet.

Depending on how DNS is configured in your cluster, you may not be able to look up the DNS
name for a newly-run Pod immediately. This behavior can occur when other clients in the
cluster have already sent queries for the hostname of the Pod before it was created.
Negative caching (normal in DNS) means that the results of previous failed lookups are
remembered and reused, even after the Pod is running, for at least a few seconds.

If you need to discover Pods promptly after they are created, you have a few options:

* Query the Kubernetes API directly (for example, using a watch) rather than relying on DNS lookups.
* Decrease the time of caching in your Kubernetes DNS provider (typically this means editing the
  config map for CoreDNS, which currently caches for 30 seconds).

As mentioned in the limitations section, you are responsible for
creating the Headless Service
responsible for the network identity of the pods.

Here are some examples of choices for Cluster Domain, Service name,
StatefulSet name, and how that affects the DNS names for the StatefulSet's Pods.

| Cluster Domain | Service (ns/name) | StatefulSet (ns/name) | StatefulSet Domain              | Pod DNS                                      | Pod Hostname |
| -------------- | ----------------- | --------------------- | ------------------------------- | -------------------------------------------- | ------------ |
| cluster.local  | default/nginx     | default/web           | nginx.default.svc.cluster.local | web-{0..N-1}.nginx.default.svc.cluster.local | web-{0..N-1} |
| cluster.local  | foo/nginx         | foo/web               | nginx.foo.svc.cluster.local     | web-{0..N-1}.nginx.foo.svc.cluster.local     | web-{0..N-1} |
| kube.local     | foo/nginx         | foo/web               | nginx.foo.svc.kube.local        | web-{0..N-1}.nginx.foo.svc.kube.local        | web-{0..N-1} |

**Note:**
Cluster Domain will be set to `cluster.local` unless
otherwise configured.

### Stable Storage

For each VolumeClaimTemplate entry defined in a StatefulSet, each Pod receives one
PersistentVolumeClaim. In the nginx example above, each Pod receives a single PersistentVolume
with a StorageClass of `my-storage-class` and 1 GiB of provisioned storage. If no StorageClass
is specified, then the default StorageClass will be used. When a Pod is (re)scheduled
onto a node, its `volumeMounts` mount the PersistentVolumes associated with its
PersistentVolume Claims. Note that, the PersistentVolumes associated with the
Pods' PersistentVolume Claims are not deleted when the Pods, or StatefulSet are deleted.
This must be done manually.

### Pod Name Label

When the StatefulSet controller creates a Pod,
it adds a label, `statefulset.kubernetes.io/pod-name`, that is set to the name of
the Pod. This label allows you to attach a Service to a specific Pod in
the StatefulSet.

### Pod index label

**Feature state:**

When the StatefulSet controller creates a Pod,
the new Pod is labelled with `apps.kubernetes.io/pod-index`. The value of this label is the ordinal index of
the Pod. This label allows you to route traffic to a particular pod index, filter logs/metrics
using the pod index label, and more. Note the feature gate `PodIndexLabel` is enabled and locked by default for this
feature, in order to disable it, users will have to use server emulated version v1.31.

## Deployment and Scaling Guarantees

* For a StatefulSet with N replicas, when Pods are being deployed, they are created sequentially, in order from {0..N-1}.
* When Pods are being deleted, they are terminated in reverse order, from {N-1..0}.
* Before a scaling operation is applied to a Pod, all of its predecessors must be Running and Ready. If `.spec.minReadySeconds` is set, predecessors must be available (Ready for at least `minReadySeconds`).
* Before a Pod is terminated, all of its successors must be completely shutdown.

The StatefulSet should not specify a `pod.Spec.TerminationGracePeriodSeconds` of 0. This practice
is unsafe and strongly discouraged. For further explanation, please refer to
force deleting StatefulSet Pods.

When the nginx example above is created, three Pods will be deployed in the order
web-0, web-1, web-2. web-1 will not be deployed before web-0 is
Running and Ready, and web-2 will not be deployed until
web-1 is Running and Ready. If web-0 should fail, after web-1 is Running and Ready, but before
web-2 is launched, web-2 will not be launched until web-0 is successfully relaunched and
becomes Running and Ready.

If a user were to scale the deployed example by patching the StatefulSet such that
`replicas=1`, web-2 would be terminated first. web-1 would not be terminated until web-2
is fully shutdown and deleted. If web-0 were to fail after web-2 has been terminated and
is completely shutdown, but prior to web-1's termination, web-1 would not be terminated
until web-0 is Running and Ready.

### Pod Management Policies

StatefulSet allows you to relax its ordering guarantees while
preserving its uniqueness and identity guarantees via its `.spec.podManagementPolicy` field.

#### OrderedReady Pod Management

`OrderedReady` pod management is the default for StatefulSets. It implements the behavior
described in Deployment and Scaling Guarantees.

#### Parallel Pod Management

`Parallel` pod management tells the StatefulSet controller to launch or
terminate all Pods in parallel, and to not wait for Pods to become Running
and Ready or completely terminated prior to launching or terminating another
Pod.

For scaling operations, this means all Pods are created or terminated simultaneously.

For rolling updates when `.spec.updateStrategy.rollingUpdate.maxUnavailable`
is greater than 1, the StatefulSet controller terminates and creates up to `maxUnavailable` Pods
simultaneously (also known as "bursting"). This can speed up updates but may result in Pods becoming ready out of order, which might not be suitable for applications requiring strict ordering.

## Update strategies

A StatefulSet's `.spec.updateStrategy` field allows you to configure
and disable automated rolling updates for containers, labels, resource request/limits, and
annotations for the Pods in a StatefulSet. There are three possible values:

`OnDelete`
: When a StatefulSet's `.spec.updateStrategy.type` is set to `OnDelete`,
  the StatefulSet controller will not automatically update the Pods in a
  StatefulSet. Users must manually delete Pods to cause the controller to
  create new Pods that reflect modifications made to a StatefulSet's `.spec.template`.

`RollingUpdate`
: The `RollingUpdate` update strategy implements automated, rolling updates for the Pods in a
  StatefulSet. This is the default update strategy.

`Recreate`
: **Feature state:**
  The `Recreate` update strategy deletes all of the StatefulSet's Pods before creating new
  Pods that reflect modifications made to a StatefulSet's `.spec.template`. Using this
  strategy requires the `StatefulSetRecreateStrategy`
  feature gate
  to be enabled. See Recreate for details.
