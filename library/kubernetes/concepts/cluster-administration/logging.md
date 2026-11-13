---
title: "Logging Architecture (part 1 of 2)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/concepts/cluster-administration/logging.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Logging Architecture

Application logs can help you understand what is happening inside your application. The
logs are particularly useful for debugging problems and monitoring cluster activity. Most
modern applications have some kind of logging mechanism. Likewise, container engines
are designed to support logging. The easiest and most adopted logging method for
containerized applications is writing to standard output and standard error streams.

However, the native functionality provided by a container engine or runtime is usually
not enough for a complete logging solution.

For example, you may want to access your application's logs if a container crashes,
a pod gets evicted, or a node dies.

In a cluster, logs should have a separate storage and lifecycle independent of nodes,
pods, or containers. This concept is called
cluster-level logging.

Cluster-level logging architectures require a separate backend to store, analyze, and
query logs. Kubernetes does not provide a native storage solution for log data. Instead,
there are many logging solutions that integrate with Kubernetes. The following sections
describe how to handle and store logs on nodes.

## Pod and container logs {#basic-logging-in-kubernetes}

Kubernetes captures logs from each container in a running Pod.

This example uses a manifest for a `Pod` with a container
that writes text to the standard output stream, once per second.

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: counter
spec:
  containers:
  - name: count
    image: busybox:1.28
    args: [/bin/sh, -c,
            'i=0; while true; do echo "$i: $(date)"; i=$((i+1)); sleep 1; done']
```

To run this pod, use the following command:

```shell
kubectl apply -f https://k8s.io/examples/debug/counter-pod.yaml
```

The output is:

```console
pod/counter created
```

To fetch the logs, use the `kubectl logs` command, as follows:

```shell
kubectl logs counter
```

The output is similar to:

```console
0: Fri Apr  1 11:42:23 UTC 2022
1: Fri Apr  1 11:42:24 UTC 2022
2: Fri Apr  1 11:42:25 UTC 2022
```

You can use `kubectl logs --previous` to retrieve logs from a previous instantiation of a container.
If your pod has multiple containers, specify which container's logs you want to access by
appending a container name to the command, with a `-c` flag, like so:

```shell
kubectl logs counter -c count
```

### Container log streams

**Feature state:**

As an alpha feature, the kubelet can split out the logs from the two standard streams produced
by a container: standard output
and standard error.
To use this behavior, you must enable the `PodLogsQuerySplitStreams`
feature gate.
With that feature gate enabled, Kubernetes  allows access to these
log streams directly via the Pod API. You can fetch a specific stream by specifying the stream name (either `Stdout` or `Stderr`),
using the `stream` query string. You must have access to read the `log` subresource of that Pod.

To demonstrate this feature, you can create a Pod that periodically writes text to both the standard output and error stream.

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: counter-err
spec:
  containers:
  - name: count
    image: busybox:1.28
    args: [/bin/sh, -c,
            'i=0; while true; do echo "$i: $(date)"; echo "$i: err" >&2 ; i=$((i+1)); sleep 1; done']
```

To run this pod, use the following command:

```shell
kubectl apply -f https://k8s.io/examples/debug/counter-pod-err.yaml
```

To fetch only the stderr log stream, you can run:

```shell
kubectl get --raw "/api/v1/namespaces/default/pods/counter-err/log?stream=Stderr"
```

See the `kubectl logs` documentation
for more details.

### How nodes handle container logs

A container runtime handles and redirects any output generated to a containerized
application's `stdout` and `stderr` streams.
Different container runtimes implement this in different ways; however, the integration
with the kubelet is standardized as the _CRI logging format_.

By default, if a container restarts, the kubelet keeps one terminated container with its logs.
If a pod is evicted from the node, all corresponding containers are also evicted, along with their logs.

The kubelet makes logs available to clients via a special feature of the Kubernetes API.
The usual way to access this is by running `kubectl logs`.

### Log rotation

**Feature state:** v1.21 [stable]

The kubelet is responsible for rotating container logs and managing the
logging directory structure.
The kubelet sends this information to the container runtime (using CRI),
and the runtime writes the container logs to the given location.

You can configure two kubelet configuration settings,
`containerLogMaxSize` (default 10Mi) and `containerLogMaxFiles` (default 5),
using the kubelet configuration file.
These settings let you configure the maximum size for each log file and the maximum number of
files allowed for each container respectively.

In order to perform an efficient log rotation in clusters where the volume of the logs generated by
the workload is large, kubelet also provides a mechanism to tune how the logs are rotated in
terms of how many concurrent log rotations can be performed and the interval at which the logs are
monitored and rotated as required.
You can configure two kubelet configuration settings,
`containerLogMaxWorkers` and `containerLogMonitorInterval` using the
kubelet configuration file.

When you run `kubectl logs` as in
the basic logging example, the kubelet on the node handles the request and
reads directly from the log file. The kubelet returns the content of the log file.

**Note:**
Only the contents of the latest log file are available through `kubectl logs`.

For example, if a Pod writes 40 MiB of logs and the kubelet rotates logs
after 10 MiB, running `kubectl logs` returns at most 10MiB of data.

## System component logs

There are two types of system components: those that typically run in a container,
and those components directly involved in running containers. For example:

* The kubelet and container runtime do not run in containers. The kubelet runs
  your containers (grouped together in pods)
* The Kubernetes scheduler, controller manager, and API server run within pods
  (usually static Pods).
  The etcd component runs in the control plane, and most commonly also as a static pod.
  If your cluster uses kube-proxy, you typically run this as a `DaemonSet`.

### Log locations {#log-location-node}

The way that the kubelet and container runtime write logs depends on the operating
system that the node uses:

**Linux**

On Linux nodes that use systemd, the kubelet and container runtime write to journald
by default. You use `journalctl` to read the systemd journal; for example:
`journalctl -u kubelet`.

If systemd is not present, the kubelet and container runtime write to `.log` files in the
`/var/log` directory. If you want to have logs written elsewhere, you can indirectly
run the kubelet via a helper tool, `kube-log-runner`, and use that tool to redirect
kubelet logs to a directory that you choose.

By default, kubelet directs your container runtime to write logs into directories within
`/var/log/pods`.

For more information on `kube-log-runner`, read System Logs.

**Windows**

By default, the kubelet writes logs to files within the directory `C:\var\logs`
(notice that this is not `C:\var\log`).

Although `C:\var\log` is the Kubernetes default location for these logs, several
cluster deployment tools set up Windows nodes to log to `C:\var\log\kubelet` instead.

If you want to have logs written elsewhere, you can indirectly
run the kubelet via a helper tool, `kube-log-runner`, and use that tool to redirect
kubelet logs to a directory that you choose.

However, by default, kubelet directs your container runtime to write logs within the
directory `C:\var\log\pods`.

For more information on `kube-log-runner`, read System Logs.

For Kubernetes cluster components that run in pods, these write to files inside
the `/var/log` directory, bypassing the default logging mechanism (the components
do not write to the systemd journal). You can use Kubernetes' storage mechanisms
to map persistent storage into the container that runs the component.

Kubelet allows changing the pod logs directory from default `/var/log/pods`
to a custom path. This adjustment can be made by configuring the `podLogsDir`
parameter in the kubelet's configuration file.

**Caution:**
It's important to note that the default location `/var/log/pods` has been in use for
an extended period and certain processes might implicitly assume this path.
Therefore, altering this parameter must be approached with caution and at your own risk.

Another caveat to keep in mind is that the kubelet supports the location being on the same
disk as `/var`. Otherwise, if the logs are on a separate filesystem from `/var`,
then the kubelet will not track that filesystem's usage, potentially leading to issues if
it fills up.

For details about etcd and its logs, view the etcd documentation.
Again, you can use Kubernetes' storage mechanisms to map persistent storage into
the container that runs the component.

**Note:**
If you deploy Kubernetes cluster components (such as the scheduler) to log to
a volume shared from the parent node, you need to consider and ensure that those
logs are rotated. **Kubernetes does not manage that log rotation**.

Your operating system may automatically implement some log rotation - for example,
if you share the directory `/var/log` into a static Pod for a component, node-level
log rotation treats a file in that directory the same as a file written by any component
outside Kubernetes.

Some deploy tools account for that log rotation and automate it; others leave this
as your responsibility.
