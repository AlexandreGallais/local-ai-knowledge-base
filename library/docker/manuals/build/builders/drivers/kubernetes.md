---
title: "Kubernetes driver (part 1 of 2)"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/build/builders/drivers/kubernetes.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Kubernetes driver

The Kubernetes driver lets you connect your local development or CI
environments to builders in a Kubernetes cluster to allow access to more
powerful compute resources, optionally on multiple native architectures.

## Synopsis

Run the following command to create a new builder, named `kube`, that uses the
Kubernetes driver:

```console
$ docker buildx create \
  --bootstrap \
  --name=kube \
  --driver=kubernetes \
  --driver-opt=[key=value,...]
```

The following table describes the available driver-specific options that you
can pass to `--driver-opt`:

| Parameter                                  | Type         | Default                                 | Description                                                                                                                                                                                                   |
| ------------------------------------------ | ------------ | --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `image`                                    | String       |                                         | Sets the image to use for running BuildKit.                                                                                                                                                                   |
| `namespace`                                | String       | Namespace in current Kubernetes context | Sets the Kubernetes namespace.                                                                                                                                                                                |
| `default-load`                             | Boolean      | `false`                                 | Automatically load images to the Docker Engine image store.                                                                                                                                                   |
| `replicas`                                 | Integer      | 1                                       | Sets the number of Pod replicas to create. See scaling BuildKit                                                                                                                                          |
| `requests.cpu`                             | CPU units    |                                         | Sets the request CPU value specified in units of Kubernetes CPU. For example `requests.cpu=100m` or `requests.cpu=2`                                                                                          |
| `requests.memory`                          | Memory size  |                                         | Sets the request memory value specified in bytes or with a valid suffix. For example `requests.memory=500Mi` or `requests.memory=4G`                                                                          |
| `requests.ephemeral-storage`               | Storage size |                                         | Sets the request ephemeral-storage value specified in bytes or with a valid suffix. For example `requests.ephemeral-storage=2Gi`                                                                              |
| `persistent-volume-claim.requests.storage` | Storage size |                                         | Sets the requested size for a persistent volume claim. When set, Buildx creates a `StatefulSet` and stores the BuildKit build cache in the claim. For example `persistent-volume-claim.requests.storage=20Gi` |
| `limits.cpu`                               | CPU units    |                                         | Sets the limit CPU value specified in units of Kubernetes CPU. For example `requests.cpu=100m` or `requests.cpu=2`                                                                                            |
| `limits.memory`                            | Memory size  |                                         | Sets the limit memory value specified in bytes or with a valid suffix. For example `requests.memory=500Mi` or `requests.memory=4G`                                                                            |
| `limits.ephemeral-storage`                 | Storage size |                                         | Sets the limit ephemeral-storage value specified in bytes or with a valid suffix. For example `requests.ephemeral-storage=100M`                                                                               |
| `buildkit-root-volume-memory`              | Memory size  | Using regular file system               | Mounts `/var/lib/buildkit` on an `emptyDir` memory-backed volume, with `SizeLimit` as the value. For example, `buildkit-root-folder-memory=6G`                                                                |
| `nodeselector`                             | CSV string   |                                         | Sets the pod's `nodeSelector` label(s). See node assignment.                                                                                                                                             |
| `annotations`                              | CSV string   |                                         | Sets additional annotations on the `Deployment` or `StatefulSet` and pods.                                                                                                                                    |
| `labels`                                   | CSV string   |                                         | Sets additional labels on the `Deployment` or `StatefulSet` and pods.                                                                                                                                         |
| `tolerations`                              | CSV string   |                                         | Configures the pod's taint toleration. See node assignment.                                                                                                                                              |
| `serviceaccount`                           | String       |                                         | Sets the pod's `serviceAccountName`.                                                                                                                                                                          |
| `schedulername`                            | String       |                                         | Sets the scheduler responsible for scheduling the pod.                                                                                                                                                        |
| `timeout`                                  | Time         | `120s`                                  | Set the timeout limit that determines how long Buildx will wait for pods to be provisioned before a build.                                                                                                    |
| `rootless`                                 | Boolean      | `false`                                 | Run the container as a non-root user. See rootless mode.                                                                                                                                                 |
| `loadbalance`                              | String       | `sticky`                                | Load-balancing strategy (`sticky` or `random`). If set to `sticky`, the pod is chosen using the hash of the context path.                                                                                     |
| `qemu.install`                             | Boolean      | `false`                                 | Install QEMU emulation for multi platforms support. See QEMU.                                                                                                                                            |
| `qemu.image`                               | String       | `tonistiigi/binfmt:latest`              | Sets the QEMU emulation image. See QEMU.                                                                                                                                                                 |

## Scaling BuildKit

One of the main advantages of the Kubernetes driver is that you can scale the
number of builder replicas up and down to handle increased build load. Scaling
is configurable using the following driver options:

- `replicas=N`

  This scales the number of BuildKit pods to the desired size. By default, it
  only creates a single pod. Increasing the number of replicas lets you take
  advantage of multiple nodes in your cluster.

- `requests.cpu`, `requests.memory`, `requests.ephemeral-storage`, `limits.cpu`, `limits.memory`, `limits.ephemeral-storage`

  These options allow requesting and limiting the resources available to each
  BuildKit pod according to the official Kubernetes documentation.

For example, to create 4 replica BuildKit pods:

```console
$ docker buildx create \
  --bootstrap \
  --name=kube \
  --driver=kubernetes \
  --driver-opt=namespace=buildkit,replicas=4
```

Listing the pods, you get this:

```console
$ kubectl -n buildkit get deployments
NAME    READY   UP-TO-DATE   AVAILABLE   AGE
kube0   4/4     4            4           8s

$ kubectl -n buildkit get pods
NAME                     READY   STATUS    RESTARTS   AGE
kube0-6977cdcb75-48ld2   1/1     Running   0          8s
kube0-6977cdcb75-rkc6b   1/1     Running   0          8s
kube0-6977cdcb75-vb4ks   1/1     Running   0          8s
kube0-6977cdcb75-z4fzs   1/1     Running   0          8s
```

Additionally, you can use the `loadbalance=(sticky|random)` option to control
the load-balancing behavior when there are multiple replicas. `random` selects
random nodes from the node pool, providing an even workload distribution across
replicas. `sticky` (the default) attempts to connect the same build performed
multiple times to the same node each time, ensuring better use of local cache.

For more information on scalability, see the options for
`docker buildx create`.

## Persistent storage

Set the `persistent-volume-claim.requests.storage` driver option to store the
BuildKit build cache in a persistent volume claim instead of the pod
filesystem.
When you set this option, Buildx creates a `StatefulSet` instead of a
`Deployment`.

If you also set `replicas`, each replica gets its own persistent volume claim.
This keeps the build cache local to each pod across restarts.

For example, to create a builder with 20 GiB of persistent storage per replica:

```console
$ docker buildx create \
  --bootstrap \
  --name=kube \
  --driver=kubernetes \
  --driver-opt=namespace=buildkit,replicas=4,persistent-volume-claim.requests.storage=20Gi
```

## Node assignment

The Kubernetes driver allows you to control the scheduling of BuildKit pods
using the `nodeSelector` and `tolerations` driver options.
You can also set the `schedulername` option if you want to use a custom scheduler altogether.

You can use the `annotations` and `labels` driver options to apply additional
metadata to the `Deployment` or `StatefulSet` and the pods hosting your
builders.

The value of the `nodeSelector` parameter is a comma-separated string of
key-value pairs, where the key is the node label and the value is the label
text. For example: `"nodeselector=kubernetes.io/arch=arm64"`

The `tolerations` parameter is a semicolon-separated list of taints. It accepts
the same values as the Kubernetes manifest. Each `tolerations` entry specifies
a taint key and the value, operator, or effect. For example:
`"tolerations=key=foo,value=bar;key=foo2,operator=exists;key=foo3,effect=NoSchedule"`

These options accept CSV-delimited strings as values. Due to quoting rules for
shell commands, you must wrap the values in single quotes. You can even wrap all
of `--driver-opt` in single quotes, for example:

```console
$ docker buildx create \
  --bootstrap \
  --name=kube \
  --driver=kubernetes \
  '--driver-opt="nodeselector=label1=value1,label2=value2","tolerations=key=key1,value=value1"'
```
