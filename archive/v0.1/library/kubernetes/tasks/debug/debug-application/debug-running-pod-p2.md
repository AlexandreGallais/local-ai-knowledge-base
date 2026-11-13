---
title: "Debug Running Pods (part 2 of 3)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/tasks/debug/debug-application/debug-running-pod.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Debug Running Pods (part 2 of 3)

## Debugging with an ephemeral debug container {#ephemeral-container}

**Feature state:** v1.25 [stable]

Ephemeral containers
are useful for interactive troubleshooting when `kubectl exec` is insufficient
because a container has crashed or a container image doesn't include debugging
utilities, such as with distroless images.

### Permissions for ephemeral containers {#ephemeral-container-permissions}

For security reasons, adding an ephemeral container to a running Pod uses the Pod's
`ephemeralcontainers` subresource. At the API level this is an
**update** request on `pods/ephemeralcontainers`. Just being authorized to **patch**
a Pod does not allow users to add ephemeral containers to that Pod.

The `pods/ephemeralcontainers` subresource is intentionally not part of the
default `admin` and `edit`
user-facing ClusterRoles.
For background on why, see
Ephemeral Containers: Access control.

If you run `kubectl debug` to add an ephemeral container without the required
permission, you will see an error similar to:

```
Error from server (Forbidden): pods "example" is forbidden: User "alice" cannot
patch resource "pods/ephemeralcontainers" in API group "" in the namespace "example-ns"
```

If you're managing cluster access and your cluster uses Kubernetes RBAC, you can grant this permission in one of two ways.

To extend the built-in `edit` and `admin` ClusterRoles cluster-wide, create an
aggregated ClusterRole labeled for
ClusterRole aggregation.
The `aggregate-to-edit` label is sufficient because the default `edit`
ClusterRole itself aggregates into `admin`:

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: aggregate-ephemeralcontainers-edit
  labels:
    rbac.authorization.k8s.io/aggregate-to-edit: "true"
rules:
- apiGroups: [""]
  resources: ["pods/ephemeralcontainers"]
  verbs: ["patch", "update"]
```

To grant the permission only to specific users or groups (for example, a
dedicated debugging or SRE group), create a narrower ClusterRole and bind it
directly:

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: debug-ephemeralcontainers
rules:
- apiGroups: [""]
  resources: ["pods/ephemeralcontainers"]
  verbs: ["patch", "update"]
```

**Note:**
Ephemeral containers are evaluated by Pod Security admission
against the same Pod Security Standards
as regular containers. When granting permission to add ephemeral containers to
Pods governed by the `baseline` or `restricted` policy, choose a matching
debugging profile such as `--profile=baseline` or
`--profile=restricted` with `kubectl debug`.

Any admission webhooks or admission policies in your cluster, that do not evaluate
the `ephemeralContainers` field, may also need updating to intercept the
`pods/ephemeralcontainers` resource and evaluate the `ephemeralContainers` field in a Pod's spec.

### Example debugging using ephemeral containers {#ephemeral-container-example}

You can use the `kubectl debug` command to add ephemeral containers to a
running Pod. First, create a pod for the example:

```shell
kubectl run ephemeral-demo --image=registry.k8s.io/pause:3.1 --restart=Never
```

The examples in this section use the `pause` container image because it does not
contain debugging utilities, but this method works with all container
images.

If you attempt to use `kubectl exec` to create a shell you will see an error
because there is no shell in this container image.

```shell
kubectl exec -it ephemeral-demo -- sh
```

```
OCI runtime exec failed: exec failed: container_linux.go:346: starting container process caused "exec: \"sh\": executable file not found in $PATH": unknown
```

You can instead add a debugging container using `kubectl debug`. If you
specify the `-i`/`--interactive` argument, `kubectl` will automatically attach
to the console of the Ephemeral Container.

```shell
kubectl debug -it ephemeral-demo --image=busybox:1.28 --target=ephemeral-demo
```

```
Defaulting debug container name to debugger-8xzrl.
If you don't see a command prompt, try pressing enter.
/ #
```

This command adds a new busybox container and attaches to it. The `--target`
parameter targets the process namespace of another container. It's necessary
here because `kubectl run` does not enable process namespace sharing in the pod it
creates.

**Note:**
The `--target` parameter must be supported by the Container Runtime. When not supported,
the Ephemeral Container may not be started, or it may be started with an
isolated process namespace so that `ps` does not reveal processes in other
containers.

You can view the state of the newly created ephemeral container using `kubectl describe`:

```shell
kubectl describe pod ephemeral-demo
```

```
...
Ephemeral Containers:
  debugger-8xzrl:
    Container ID:   docker://b888f9adfd15bd5739fefaa39e1df4dd3c617b9902082b1cfdc29c4028ffb2eb
    Image:          busybox
    Image ID:       docker-pullable://busybox@sha256:1828edd60c5efd34b2bf5dd3282ec0cc04d47b2ff9caa0b6d4f07a21d1c08084
    Port:           <none>
    Host Port:      <none>
    State:          Running
      Started:      Wed, 12 Feb 2020 14:25:42 +0100
    Ready:          False
    Restart Count:  0
    Environment:    <none>
    Mounts:         <none>
...
```

Use `kubectl delete` to remove the Pod when you're finished:

```shell
kubectl delete pod ephemeral-demo
```

## Debugging using a copy of the Pod

Sometimes Pod configuration options make it difficult to troubleshoot in certain
situations. For example, you can't run `kubectl exec` to troubleshoot your
container if your container image does not include a shell or if your application
crashes on startup. In these situations you can use `kubectl debug` to create a
copy of the Pod with configuration values changed to aid debugging.

### Copying a Pod while adding a new container

Adding a new container can be useful when your application is running but not
behaving as you expect and you'd like to add additional troubleshooting
utilities to the Pod.

For example, maybe your application's container images are built on `busybox`
but you need debugging utilities not included in `busybox`. You can simulate
this scenario using `kubectl run`:

```shell
kubectl run myapp --image=busybox:1.28 --restart=Never -- sleep 1d
```

Run this command to create a copy of `myapp` named `myapp-debug` that adds a
new Ubuntu container for debugging:

```shell
kubectl debug myapp -it --image=ubuntu --share-processes --copy-to=myapp-debug
```

```
Defaulting debug container name to debugger-w7xmf.
If you don't see a command prompt, try pressing enter.
root@myapp-debug:/#
```

**Note:**
* `kubectl debug` automatically generates a container name if you don't choose
  one using the `--container` flag.
* The `-i` flag causes `kubectl debug` to attach to the new container by
  default.  You can prevent this by specifying `--attach=false`. If your session
  becomes disconnected you can reattach using `kubectl attach`.
* The `--share-processes` allows the containers in this Pod to see processes
  from the other containers in the Pod. For more information about how this
  works, see Share Process Namespace between Containers in a Pod.

Don't forget to clean up the debugging Pod when you're finished with it:

```shell
kubectl delete pod myapp myapp-debug
```

### Copying a Pod while changing its command

Sometimes it's useful to change the command for a container, for example to
add a debugging flag or because the application is crashing.

To simulate a crashing application, use `kubectl run` to create a container
that immediately exits:

```
kubectl run --image=busybox:1.28 myapp -- false
```

You can see using `kubectl describe pod myapp` that this container is crashing:

```
Containers:
  myapp:
    Image:         busybox
    ...
    Args:
      false
    State:          Waiting
      Reason:       CrashLoopBackOff
    Last State:     Terminated
      Reason:       Error
      Exit Code:    1
```

You can use `kubectl debug` to create a copy of this Pod with the command
changed to an interactive shell:

```
kubectl debug myapp -it --copy-to=myapp-debug --container=myapp -- sh
```

```
If you don't see a command prompt, try pressing enter.
/ #
```

Now you have an interactive shell that you can use to perform tasks like
checking filesystem paths or running the container command manually.

**Note:**
* To change the command of a specific container you must
  specify its name using `--container` or `kubectl debug` will instead
  create a new container to run the command you specified.
* The `-i` flag causes `kubectl debug` to attach to the container by default.
  You can prevent this by specifying `--attach=false`. If your session becomes
  disconnected you can reattach using `kubectl attach`.

Don't forget to clean up the debugging Pod when you're finished with it:

```shell
kubectl delete pod myapp myapp-debug
```

### Copying a Pod while changing container images

In some situations you may want to change a misbehaving Pod from its normal
production container images to an image containing a debugging build or
additional utilities.

As an example, create a Pod using `kubectl run`:

```
kubectl run myapp --image=busybox:1.28 --restart=Never -- sleep 1d
```

Now use `kubectl debug` to make a copy and change its container image
to `ubuntu`:

```
kubectl debug myapp --copy-to=myapp-debug --set-image=*=ubuntu
```

The syntax of `--set-image` uses the same `container_name=image` syntax as
`kubectl set image`. `*=ubuntu` means change the image of all containers
to `ubuntu`.

Don't forget to clean up the debugging Pod when you're finished with it:

```shell
kubectl delete pod myapp myapp-debug
```

## Debugging via a shell on the node {#node-shell-session}

If none of these approaches work, you can find the Node on which the Pod is
running and create a Pod running on the Node. To create
an interactive shell on a Node using `kubectl debug`, run:

```shell
kubectl debug node/mynode -it --image=ubuntu
```

```
Creating debugging pod node-debugger-mynode-pdx84 with container debugger on node mynode.
If you don't see a command prompt, try pressing enter.
root@ek8s:/#
```

When creating a debugging session on a node, keep in mind that:

* `kubectl debug` automatically generates the name of the new Pod based on
  the name of the Node.
* The root filesystem of the Node will be mounted at `/host`.
* The container runs in the host IPC, Network, and PID namespaces, although
  the pod isn't privileged, so reading some process information may fail,
  and `chroot /host` may fail.
* If you need a privileged pod, create it manually or use the `--profile=sysadmin` flag.

Don't forget to clean up the debugging Pod when you're finished with it:

```shell
kubectl delete pod node-debugger-mynode-pdx84
```

### Capturing and analyzing Node/Pod traffic

When debugging networking issues, capturing and analyzing network traffic from Nodes/Pods can provide valuable insights
into connectivity problems, DNS resolution failures, or unexpected network behavior.

You can use `kubectl debug` with the `--profile=sysadmin` flag to run network capture tools on a node.
First, create a debugging session on the node where your Pod is running:

```shell
kubectl debug --profile=sysadmin node/${NODE_NAME} -it --image=ubuntu:latest
```

Once inside the debug container, install tcpdump and capture traffic on the node's network interfaces:

```shell
apt-get update && apt-get install -y tcpdump
tcpdump -i any -n
```

**Note:**
Don't forget to clean up the debugging Pod when you're finished with it:

```shell
kubectl delete pod node-debugger-mynode-pdx84
```

You can also capture traffic from a specific Pod:

```shell
kubectl debug --profile=sysadmin pod/${POD_NAME} -n ${NAMESPACE} -it --image=ubuntu:latest
```

And then perform the same `tcpdump` command inside the debug container to capture traffic from the Pod's network namespace.
