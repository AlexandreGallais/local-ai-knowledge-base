---
title: "StatefulSet Basics (part 4 of 5)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/tutorials/stateful-application/basic-stateful-set.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# StatefulSet Basics (part 4 of 5)

## Deleting StatefulSets

StatefulSet supports both _non-cascading_ and _cascading_ deletion. In a
non-cascading **delete**, the StatefulSet's Pods are not deleted when the
StatefulSet is deleted. In a cascading **delete**, both the StatefulSet and
its Pods are deleted.

Read Use Cascading Deletion in a Cluster
to learn about cascading deletion generally.

### Non-cascading delete

In one terminal window, watch the Pods in the StatefulSet.

```
# End this watch when there are no Pods for the StatefulSet
kubectl get pods --watch -l app=nginx
```

Use `kubectl delete` to delete the
StatefulSet. Make sure to supply the `--cascade=orphan` parameter to the
command. This parameter tells Kubernetes to only delete the StatefulSet, and to
**not** delete any of its Pods.

```shell
kubectl delete statefulset web --cascade=orphan
```
```
statefulset.apps "web" deleted
```

Get the Pods, to examine their status:

```shell
kubectl get pods -l app=nginx
```
```
NAME      READY     STATUS    RESTARTS   AGE
web-0     1/1       Running   0          6m
web-1     1/1       Running   0          7m
web-2     1/1       Running   0          5m
```

Even though `web` has been deleted, all of the Pods are still Running and Ready.
Delete `web-0`:

```shell
kubectl delete pod web-0
```
```
pod "web-0" deleted
```

Get the StatefulSet's Pods:

```shell
kubectl get pods -l app=nginx
```
```
NAME      READY     STATUS    RESTARTS   AGE
web-1     1/1       Running   0          10m
web-2     1/1       Running   0          7m
```

As the `web` StatefulSet has been deleted, `web-0` has not been relaunched.

In one terminal, watch the StatefulSet's Pods.

```shell
# Leave this watch running until the next time you start a watch
kubectl get pods --watch -l app=nginx
```

In a second terminal, recreate the StatefulSet. Note that, unless
you deleted the `nginx` Service (which you should not have), you will see
an error indicating that the Service already exists.

```shell
kubectl apply -f https://k8s.io/examples/application/web/web.yaml
```
```
statefulset.apps/web created
service/nginx unchanged
```

Ignore the error. It only indicates that an attempt was made to create the _nginx_
headless Service even though that Service already exists.

Examine the output of the `kubectl get` command running in the first terminal.

```shell
# This should already be running
kubectl get pods --watch -l app=nginx
```
```
NAME      READY     STATUS    RESTARTS   AGE
web-1     1/1       Running   0          16m
web-2     1/1       Running   0          2m
NAME      READY     STATUS    RESTARTS   AGE
web-0     0/1       Pending   0          0s
web-0     0/1       Pending   0         0s
web-0     0/1       ContainerCreating   0         0s
web-0     1/1       Running   0         18s
web-2     1/1       Terminating   0         3m
web-2     0/1       Terminating   0         3m
web-2     0/1       Terminating   0         3m
web-2     0/1       Terminating   0         3m
```

When the `web` StatefulSet was recreated, it first relaunched `web-0`.
Since `web-1` was already Running and Ready, when `web-0` transitioned to
Running and Ready, it adopted this Pod. Since you recreated the StatefulSet
with `replicas` equal to 2, once `web-0` had been recreated, and once
`web-1` had been determined to already be Running and Ready, `web-2` was
terminated.

Now take another look at the contents of the `index.html` file served by the
Pods' webservers:

```shell
for i in 0 1; do kubectl exec -i -t "web-$i" -- curl http://localhost/; done
```

```
web-0
web-1
```

Even though you deleted both the StatefulSet and the `web-0` Pod, it still
serves the hostname originally entered into its `index.html` file. This is
because the StatefulSet never deletes the PersistentVolumes associated with a
Pod. When you recreated the StatefulSet and it relaunched `web-0`, its original
PersistentVolume was remounted.

### Cascading delete

In one terminal window, watch the Pods in the StatefulSet.

```shell
# Leave this running until the next page section
kubectl get pods --watch -l app=nginx
```

In another terminal, delete the StatefulSet again. This time, omit the
`--cascade=orphan` parameter.

```shell
kubectl delete statefulset web
```

```
statefulset.apps "web" deleted
```

Examine the output of the `kubectl get` command running in the first terminal,
and wait for all of the Pods to transition to Terminating.

```shell
# This should already be running
kubectl get pods --watch -l app=nginx
```

```
NAME      READY     STATUS    RESTARTS   AGE
web-0     1/1       Running   0          11m
web-1     1/1       Running   0          27m
NAME      READY     STATUS        RESTARTS   AGE
web-0     1/1       Terminating   0          12m
web-1     1/1       Terminating   0         29m
web-0     0/1       Terminating   0         12m
web-0     0/1       Terminating   0         12m
web-0     0/1       Terminating   0         12m
web-1     0/1       Terminating   0         29m
web-1     0/1       Terminating   0         29m
web-1     0/1       Terminating   0         29m

```

As you saw in the Scaling Down section, the Pods
are terminated one at a time, with respect to the reverse order of their ordinal
indices. Before terminating a Pod, the StatefulSet controller waits for
the Pod's successor to be completely terminated.

Although a cascading delete removes a StatefulSet together with its Pods,
the cascade does **not** delete the headless Service associated with the StatefulSet.
You must delete the `nginx` Service manually.

```shell
kubectl delete service nginx
```

```
service "nginx" deleted
```

Recreate the StatefulSet and headless Service one more time:

```shell
kubectl apply -f https://k8s.io/examples/application/web/web.yaml
```

```
service/nginx created
statefulset.apps/web created
```

When all of the StatefulSet's Pods transition to Running and Ready, retrieve
the contents of their `index.html` files:

```shell
for i in 0 1; do kubectl exec -i -t "web-$i" -- curl http://localhost/; done
```

```
web-0
web-1
```

Even though you completely deleted the StatefulSet, and all of its Pods, the
Pods are recreated with their PersistentVolumes mounted, and `web-0` and
`web-1` continue to serve their hostnames.

Finally, delete the `nginx` Service...

```shell
kubectl delete service nginx
```

```
service "nginx" deleted
```

...and the `web` StatefulSet:

```shell
kubectl delete statefulset web
```

```
statefulset "web" deleted
```

## Pod management policy

For some distributed systems, the StatefulSet ordering guarantees are
unnecessary and/or undesirable. These systems require only uniqueness and
identity.

You can specify a Pod management policy
to avoid this strict ordering; either `OrderedReady` (the default), or `Parallel`.

### OrderedReady Pod management

`OrderedReady` pod management is the default for StatefulSets. It tells the
StatefulSet controller to respect the ordering guarantees demonstrated
above.

Use this when your application requires or expects that changes, such as rolling out a new
version of your application, happen in the strict order of the ordinal (pod number) that the StatefulSet provides.
In other words, if you have Pods `app-0`, `app-1` and `app-2`, Kubernetes will update `app-0` first and check it.
Once the checks are good, Kubernetes updates `app-1` and finally `app-2`.

If you added two more Pods, Kubernetes would set up `app-3` and wait for that to become healthy before deploying
`app-4`.

Because this is the default setting, you've already practised using it.

### Parallel Pod management

The alternative, `Parallel` pod management, tells the StatefulSet controller to launch or
terminate all Pods in parallel, and not to wait for Pods to become `Running`
and `Ready` or completely terminated prior to launching or terminating another
Pod.

The `Parallel` pod management option only affects the behavior for scaling operations. Updates are not affected;
Kubernetes still rolls out changes in order. For this tutorial, the application is very simple: a webserver that
tells you its hostname (because this is a StatefulSet, the hostname for each Pod is different and predictable).

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
  podManagementPolicy: "Parallel"
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
      resources:
        requests:
          storage: 1Gi
```

This manifest is identical to the one you downloaded above except that the `.spec.podManagementPolicy`
of the `web` StatefulSet is set to `Parallel`.

In one terminal, watch the Pods in the StatefulSet.

```shell
# Leave this watch running until the end of the section
kubectl get pod -l app=nginx --watch
```

In another terminal, reconfigure the StatefulSet for `Parallel` Pod management:

```shell
kubectl apply -f https://k8s.io/examples/application/web/web-parallel.yaml
```
```
service/nginx updated
statefulset.apps/web updated
```

Keep the terminal open where you're running the watch. In another terminal window, scale the
StatefulSet:

```shell
kubectl scale statefulset/web --replicas=5
```
```
statefulset.apps/web scaled
```

Examine the output of the terminal where the `kubectl get` command is running. It may look something like

```
web-3     0/1       Pending   0         0s
web-3     0/1       Pending   0         0s
web-3     0/1       Pending   0         7s
web-3     0/1       ContainerCreating   0         7s
web-2     0/1       Pending   0         0s
web-4     0/1       Pending   0         0s
web-2     1/1       Running   0         8s
web-4     0/1       ContainerCreating   0         4s
web-3     1/1       Running   0         26s
web-4     1/1       Running   0         2s
```

The StatefulSet launched three new Pods, and it did not wait for
the first to become Running and Ready prior to launching the second and third Pods.

This approach is useful if your workload has a stateful element, or needs Pods to be able to identify each other
with predictable naming, and especially if you sometimes need to provide a lot more capacity quickly. If this
simple web service for the tutorial suddenly got an extra 1,000,000 requests per minute then you would want to run
some more Pods - but you also would not want to wait for each new Pod to launch. Starting the extra Pods in parallel
cuts the time between requesting the extra capacity and having it available for use.
