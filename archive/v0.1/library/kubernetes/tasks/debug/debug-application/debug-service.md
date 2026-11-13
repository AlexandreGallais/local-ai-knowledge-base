---
title: "Debug Services (part 1 of 2)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/tasks/debug/debug-application/debug-service.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Debug Services

An issue that comes up rather frequently for new installations of Kubernetes is
that a Service is not working properly.  You've run your Pods through a
Deployment (or other workload controller) and created a Service, but you
get no response when you try to access it.  This document will hopefully help
you to figure out what's going wrong.

## Running commands in a Pod

For many steps here you will want to see what a Pod running in the cluster
sees.  The simplest way to do this is to run an interactive busybox Pod:

```none
kubectl run -it --rm --restart=Never busybox --image=registry.k8s.io/busybox:1.27.2 sh
```

**Note:**
If you don't see a command prompt, try pressing enter.

If you already have a running Pod that you prefer to use, you can run a
command in it using:

```shell
kubectl exec <POD-NAME> -c <CONTAINER-NAME> -- <COMMAND>
```

## Setup

For the purposes of this walk-through, let's run some Pods.  Since you're
probably debugging your own Service you can substitute your own details, or you
can follow along and get a second data point.

```shell
kubectl create deployment hostnames --image=registry.k8s.io/serve_hostname
```
```none
deployment.apps/hostnames created
```

`kubectl` commands will print the type and name of the resource created or mutated, which can then be used in subsequent commands.

Let's scale the deployment to 3 replicas.
```shell
kubectl scale deployment hostnames --replicas=3
```
```none
deployment.apps/hostnames scaled
```

Note that this is the same as if you had started the Deployment with the following
YAML:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    app: hostnames
  name: hostnames
spec:
  selector:
    matchLabels:
      app: hostnames
  replicas: 3
  template:
    metadata:
      labels:
        app: hostnames
    spec:
      containers:
      - name: hostnames
        image: registry.k8s.io/serve_hostname
```

The label "app" is automatically set by `kubectl create deployment` to the name of the
Deployment.

You can confirm your Pods are running:

```shell
kubectl get pods -l app=hostnames
```
```none
NAME                        READY     STATUS    RESTARTS   AGE
hostnames-632524106-bbpiw   1/1       Running   0          2m
hostnames-632524106-ly40y   1/1       Running   0          2m
hostnames-632524106-tlaok   1/1       Running   0          2m
```

You can also confirm that your Pods are serving.  You can get the list of
Pod IP addresses and test them directly.

```shell
kubectl get pods -l app=hostnames \
    -o go-template='{{range .items}}{{.status.podIP}}{{"\n"}}{{end}}'
```
```none
10.244.0.5
10.244.0.6
10.244.0.7
```

The example container used for this walk-through serves its own hostname
via HTTP on port 9376, but if you are debugging your own app, you'll want to
use whatever port number your Pods are listening on.

From within a pod:

```shell
for ep in 10.244.0.5:9376 10.244.0.6:9376 10.244.0.7:9376; do
    wget -qO- $ep
done
```

This should produce something like:

```
hostnames-632524106-bbpiw
hostnames-632524106-ly40y
hostnames-632524106-tlaok
```

If you are not getting the responses you expect at this point, your Pods
might not be healthy or might not be listening on the port you think they are.
You might find `kubectl logs` to be useful for seeing what is happening, or
perhaps you need to `kubectl exec` directly into your Pods and debug from
there.

Assuming everything has gone to plan so far, you can start to investigate why
your Service doesn't work.

## Does the Service exist?

The astute reader will have noticed that you did not actually create a Service
yet - that is intentional.  This is a step that sometimes gets forgotten, and
is the first thing to check.

What would happen if you tried to access a non-existent Service?  If
you have another Pod that consumes this Service by name you would get
something like:

```shell
wget -O- hostnames
```
```none
Resolving hostnames (hostnames)... failed: Name or service not known.
wget: unable to resolve host address 'hostnames'
```

The first thing to check is whether that Service actually exists:

```shell
kubectl get svc hostnames
```
```none
No resources found.
Error from server (NotFound): services "hostnames" not found
```

Let's create the Service.  As before, this is for the walk-through - you can
use your own Service's details here.

```shell
kubectl expose deployment hostnames --port=80 --target-port=9376
```
```none
service/hostnames exposed
```

And read it back:

```shell
kubectl get svc hostnames
```
```none
NAME        TYPE        CLUSTER-IP   EXTERNAL-IP   PORT(S)   AGE
hostnames   ClusterIP   10.0.1.175   <none>        80/TCP    5s
```

Now you know that the Service exists.

As before, this is the same as if you had started the Service with YAML:

```yaml
apiVersion: v1
kind: Service
metadata:
  labels:
    app: hostnames
  name: hostnames
spec:
  selector:
    app: hostnames
  ports:
  - name: default
    protocol: TCP
    port: 80
    targetPort: 9376
```

In order to highlight the full range of configuration, the Service you created
here uses a different port number than the Pods.  For many real-world
Services, these values might be the same.

## Any Network Policy Ingress rules affecting the target Pods?

If you have deployed any Network Policy Ingress rules which may affect incoming
traffic to `hostnames-*` Pods, these need to be reviewed.

Please refer to Network Policies for more details.

## Does the Service work by DNS name?

One of the most common ways that clients consume a Service is through a DNS
name.

From a Pod in the same Namespace:

```shell
nslookup hostnames
```
```none
Address 1: 10.0.0.10 kube-dns.kube-system.svc.cluster.local

Name:      hostnames
Address 1: 10.0.1.175 hostnames.default.svc.cluster.local
```

If this fails, perhaps your Pod and Service are in different
Namespaces, try a namespace-qualified name (again, from within a Pod):

```shell
nslookup hostnames.default
```
```none
Address 1: 10.0.0.10 kube-dns.kube-system.svc.cluster.local

Name:      hostnames.default
Address 1: 10.0.1.175 hostnames.default.svc.cluster.local
```

If this works, you'll need to adjust your app to use a cross-namespace name, or
run your app and Service in the same Namespace.  If this still fails, try a
fully-qualified name:

```shell
nslookup hostnames.default.svc.cluster.local
```
```none
Address 1: 10.0.0.10 kube-dns.kube-system.svc.cluster.local

Name:      hostnames.default.svc.cluster.local
Address 1: 10.0.1.175 hostnames.default.svc.cluster.local
```

Note the suffix here: "default.svc.cluster.local".  The "default" is the
Namespace you're operating in.  The "svc" denotes that this is a Service.
The "cluster.local" is your cluster domain, which COULD be different in your
own cluster.

You can also try this from a Node in the cluster:

**Note:**
10.0.0.10 is the cluster's DNS Service IP, yours might be different.

```shell
nslookup hostnames.default.svc.cluster.local 10.0.0.10
```
```none
Server:         10.0.0.10
Address:        10.0.0.10#53

Name:   hostnames.default.svc.cluster.local
Address: 10.0.1.175
```

If you are able to do a fully-qualified name lookup but not a relative one, you
need to check that your `/etc/resolv.conf` file in your Pod is correct.  From
within a Pod:

```shell
cat /etc/resolv.conf
```

You should see something like:

```
nameserver 10.0.0.10
search default.svc.cluster.local svc.cluster.local cluster.local example.com
options ndots:5
```

The `nameserver` line must indicate your cluster's DNS Service.  This is
passed into `kubelet` with the `--cluster-dns` flag.

The `search` line must include an appropriate suffix for you to find the
Service name.  In this case it is looking for Services in the local
Namespace ("default.svc.cluster.local"), Services in all Namespaces
("svc.cluster.local"), and lastly for names in the cluster ("cluster.local").
Depending on your own install you might have additional records after that (up
to 6 total).  The cluster suffix is passed into `kubelet` with the
`--cluster-domain` flag.  Throughout this document, the cluster suffix is
assumed to be "cluster.local".  Your own clusters might be configured
differently, in which case you should change that in all of the previous
commands.

The `options` line must set `ndots` high enough that your DNS client library
considers search paths at all.  Kubernetes sets this to 5 by default, which is
high enough to cover all of the DNS names it generates.

### Does any Service work by DNS name? {#does-any-service-exist-in-dns}

If the above still fails, DNS lookups are not working for your Service.  You
can take a step back and see what else is not working.  The Kubernetes master
Service should always work.  From within a Pod:

```shell
nslookup kubernetes.default
```
```none
Server:    10.0.0.10
Address 1: 10.0.0.10 kube-dns.kube-system.svc.cluster.local

Name:      kubernetes.default
Address 1: 10.0.0.1 kubernetes.default.svc.cluster.local
```

If this fails, please see the kube-proxy section
of this document, or even go back to the top of this document and start over,
but instead of debugging your own Service, debug the DNS Service.

## Does the Service work by IP?

Assuming you have confirmed that DNS works, the next thing to test is whether your
Service works by its IP address.  From a Pod in your cluster, access the
Service's IP (from `kubectl get` above).

```shell
for i in $(seq 1 3); do 
    wget -qO- 10.0.1.175:80
done
```

This should produce something like:

```
hostnames-632524106-bbpiw
hostnames-632524106-ly40y
hostnames-632524106-tlaok
```

If your Service is working, you should get correct responses.  If not, there
are a number of things that could be going wrong.  Read on.

## Is the Service defined correctly?

It might sound silly, but you should really double and triple check that your
Service is correct and matches your Pod's port.  Read back your Service
and verify it:

```shell
kubectl get service hostnames -o json
```
```json
{
    "kind": "Service",
    "apiVersion": "v1",
    "metadata": {
        "name": "hostnames",
        "namespace": "default",
        "uid": "428c8b6c-24bc-11e5-936d-42010af0a9bc",
        "resourceVersion": "347189",
        "creationTimestamp": "2015-07-07T15:24:29Z",
        "labels": {
            "app": "hostnames"
        }
    },
    "spec": {
        "ports": [
            {
                "name": "default",
                "protocol": "TCP",
                "port": 80,
                "targetPort": 9376,
                "nodePort": 0
            }
        ],
        "selector": {
            "app": "hostnames"
        },
        "clusterIP": "10.0.1.175",
        "type": "ClusterIP",
        "sessionAffinity": "None"
    },
    "status": {
        "loadBalancer": {}
    }
}
```

* Is the Service port you are trying to access listed in `spec.ports[]`?
* Is the `targetPort` correct for your Pods (some Pods use a different port than the Service)?
* If you meant to use a numeric port, is it a number (9376) or a string "9376"?
* If you meant to use a named port, do your Pods expose a port with the same name?
* Is the port's `protocol` correct for your Pods?

## Does the Service have any EndpointSlices?

If you got this far, you have confirmed that your Service is correctly
defined and is resolved by DNS.  Now let's check that the Pods you ran are
actually being selected by the Service.

Earlier you saw that the Pods were running.  You can re-check that:

```shell
kubectl get pods -l app=hostnames
```
```none
NAME                        READY     STATUS    RESTARTS   AGE
hostnames-632524106-bbpiw   1/1       Running   0          1h
hostnames-632524106-ly40y   1/1       Running   0          1h
hostnames-632524106-tlaok   1/1       Running   0          1h
```

The `-l app=hostnames` argument is a label selector configured on the Service.

The "AGE" column says that these Pods are about an hour old, which implies that
they are running fine and not crashing.

The "RESTARTS" column says that these pods are not crashing frequently or being
restarted.  Frequent restarts could lead to intermittent connectivity issues.
If the restart count is high, read more about how to debug pods.

Inside the Kubernetes system is a control loop which evaluates the selector of
every Service and saves the results into one or more EndpointSlice objects.

```shell
kubectl get endpointslices -l kubernetes.io/service-name=hostnames

NAME              ADDRESSTYPE   PORTS   ENDPOINTS
hostnames-ytpni   IPv4          9376    10.244.0.5,10.244.0.6,10.244.0.7
```

This confirms that the EndpointSlice controller has found the correct Pods for
your Service.  If the `ENDPOINTS` column is `<none>`, you should check that
the `spec.selector` field of your Service actually selects for
`metadata.labels` values on your Pods.  A common mistake is to have a typo or
other error, such as the Service selecting for `app=hostnames`, but the
Deployment specifying `run=hostnames`, as in versions previous to 1.18, where
the `kubectl run` command could have been also used to create a Deployment.

## Are the Pods working?

At this point, you know that your Service exists and has selected your Pods.
At the beginning of this walk-through, you verified the Pods themselves.
Let's check again that the Pods are actually working - you can bypass the
Service mechanism and go straight to the Pods, as listed by the Endpoints
above.

**Note:**
These commands use the Pod port (9376), rather than the Service port (80).

From within a Pod:

```shell
for ep in 10.244.0.5:9376 10.244.0.6:9376 10.244.0.7:9376; do
    wget -qO- $ep
done
```

This should produce something like:

```
hostnames-632524106-bbpiw
hostnames-632524106-ly40y
hostnames-632524106-tlaok
```

You expect each Pod in the endpoints list to return its own hostname.  If
this is not what happens (or whatever the correct behavior is for your own
Pods), you should investigate what's happening there.
