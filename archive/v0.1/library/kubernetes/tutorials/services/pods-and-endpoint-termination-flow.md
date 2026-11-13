---
title: "Explore Termination Behavior for Pods And Their Endpoints"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/tutorials/services/pods-and-endpoint-termination-flow.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Explore Termination Behavior for Pods And Their Endpoints

Once you connected your Application with Service following steps
like those outlined in Connecting Applications with Services,
you have a continuously running, replicated application, that is exposed on a network.
This tutorial helps you look at the termination flow for Pods and to explore ways to implement
graceful connection draining.

## Termination process for Pods and their endpoints

There are often cases when you need to terminate a Pod - be it to upgrade or scale down.
In order to improve application availability, it may be important to implement
a proper active connections draining.

This tutorial explains the flow of Pod termination in connection with the
corresponding endpoint state and removal by using
a simple nginx web server to demonstrate the concept.

## Example flow with endpoint termination

The following is the example flow described in the
Termination of Pods
document.

Let's say you have a Deployment containing a single `nginx` replica
(say just for the sake of demonstration purposes) and a Service:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
  labels:
    app: nginx
spec:
  replicas: 1
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      terminationGracePeriodSeconds: 120 # extra long grace period
      containers:
      - name: nginx
        image: nginx:latest
        ports:
        - containerPort: 80
        lifecycle:
          preStop:
            # Real life termination may take any time up to terminationGracePeriodSeconds.
            # In this example - just hang around for at least the duration of terminationGracePeriodSeconds,
            # at 120 seconds container will be forcibly terminated.
            # Note, all this time nginx will keep processing requests.
            sleep: 180
```

```yaml
apiVersion: v1
kind: Service
metadata:
  name: nginx-service
spec:
  selector:
    app: nginx
  ports:
    - protocol: TCP
      port: 80
      targetPort: 80
```

Now create the Deployment Pod and Service using the above files:

```shell
kubectl apply -f pod-with-graceful-termination.yaml
kubectl apply -f explore-graceful-termination-nginx.yaml
```

Once the Pod and Service are running, you can get the name of any associated EndpointSlices:

```shell
kubectl get endpointslice
```

The output is similar to this:

```none
NAME                  ADDRESSTYPE   PORTS   ENDPOINTS                 AGE
nginx-service-6tjbr   IPv4          80      10.12.1.199,10.12.1.201   22m
```

You can see its status, and validate that there is one endpoint registered:

```shell
kubectl get endpointslices -o json -l kubernetes.io/service-name=nginx-service
```

The output is similar to this:

```none
{
    "addressType": "IPv4",
    "apiVersion": "discovery.k8s.io/v1",
    "endpoints": [
        {
            "addresses": [
                "10.12.1.201"
            ],
            "conditions": {
                "ready": true,
                "serving": true,
                "terminating": false
```

Now let's terminate the Pod and validate that the Pod is being terminated
respecting the graceful termination period configuration:

```shell
kubectl delete pod nginx-deployment-7768647bf9-b4b9s
```

All pods:

```shell
kubectl get pods
```

The output is similar to this:

```none
NAME                                READY   STATUS        RESTARTS      AGE
nginx-deployment-7768647bf9-b4b9s   1/1     Terminating   0             4m1s
nginx-deployment-7768647bf9-rkxlw   1/1     Running       0             8s
```

You can see that the new pod got scheduled.

While the new endpoint is being created for the new Pod, the old endpoint is
still around in the terminating state:

```shell
kubectl get endpointslice -o json nginx-service-6tjbr
```

The output is similar to this:

```none
{
    "addressType": "IPv4",
    "apiVersion": "discovery.k8s.io/v1",
    "endpoints": [
        {
            "addresses": [
                "10.12.1.201"
            ],
            "conditions": {
                "ready": false,
                "serving": true,
                "terminating": true
            },
            "nodeName": "gke-main-default-pool-dca1511c-d17b",
            "targetRef": {
                "kind": "Pod",
                "name": "nginx-deployment-7768647bf9-b4b9s",
                "namespace": "default",
                "uid": "66fa831c-7eb2-407f-bd2c-f96dfe841478"
            },
            "zone": "us-central1-c"
        },
        {
            "addresses": [
                "10.12.1.202"
            ],
            "conditions": {
                "ready": true,
                "serving": true,
                "terminating": false
            },
            "nodeName": "gke-main-default-pool-dca1511c-d17b",
            "targetRef": {
                "kind": "Pod",
                "name": "nginx-deployment-7768647bf9-rkxlw",
                "namespace": "default",
                "uid": "722b1cbe-dcd7-4ed4-8928-4a4d0e2bbe35"
            },
            "zone": "us-central1-c"
```

This allows applications to communicate their state during termination
and clients (such as load balancers) to implement connection draining functionality.
These clients may detect terminating endpoints and implement a special logic for them.

In Kubernetes, endpoints that are terminating always have their `ready` status set as `false`.
This needs to happen for backward
compatibility, so existing load balancers will not use it for regular traffic.
If traffic draining on terminating pod is needed, the actual readiness can be
checked as a condition `serving`.

When Pod is deleted, the old endpoint will also be deleted.

## What's next

* Learn how to Connect Applications with Services
* Learn more about Using a Service to Access an Application in a Cluster
* Learn more about Connecting a Front End to a Back End Using a Service
* Learn more about Creating an External Load Balancer
