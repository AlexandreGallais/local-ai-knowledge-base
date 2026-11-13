---
title: "HorizontalPodAutoscaler Walkthrough (part 1 of 2)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/tasks/run-application/horizontal-pod-autoscale-walkthrough.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

A HorizontalPodAutoscaler
(HPA for short)
automatically updates a workload resource (such as
a Deployment or
StatefulSet), with the
aim of automatically scaling the workload to match demand.

Horizontal scaling means that the response to increased load is to deploy more
Pods.
This is different from _vertical_ scaling, which for Kubernetes would mean
assigning more resources (for example: memory or CPU) to the Pods that are already
running for the workload.

If the load decreases, and the number of Pods is above the configured minimum,
the HorizontalPodAutoscaler instructs the workload resource (the Deployment, StatefulSet,
or other similar resource) to scale back down.

This document walks you through an example of enabling HorizontalPodAutoscaler to
automatically manage scale for an example web app. This example workload is Apache
httpd running some PHP code.

## Before you begin

  If you're running an older
release of Kubernetes, refer to the version of the documentation for that release (see
available documentation versions).

To follow this walkthrough, you also need to use a cluster that has a
Metrics Server deployed and configured.
The Kubernetes Metrics Server collects resource metrics from
the kubelets in your cluster, and exposes those metrics
through the Kubernetes API,
using an APIService to add
new kinds of resource that represent metric readings.

To learn how to deploy the Metrics Server, see the
metrics-server documentation.

If you are running minikube, run the following command to enable metrics-server:

```shell
minikube addons enable metrics-server
```

## Run and expose php-apache server

To demonstrate a HorizontalPodAutoscaler, you will first start a Deployment that runs a container using the
`hpa-example` image, and expose it as a service
using the following manifest:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: php-apache
spec:
  selector:
    matchLabels:
      run: php-apache
  template:
    metadata:
      labels:
        run: php-apache
    spec:
      containers:
      - name: php-apache
        image: registry.k8s.io/hpa-example
        ports:
        - containerPort: 80
        resources:
          limits:
            cpu: 500m
          requests:
            cpu: 200m
---
apiVersion: v1
kind: Service
metadata:
  name: php-apache
  labels:
    run: php-apache
spec:
  ports:
  - port: 80
  selector:
    run: php-apache
```

To do so, run the following command:

```shell
kubectl apply -f https://k8s.io/examples/application/php-apache.yaml
```

```
deployment.apps/php-apache created
service/php-apache created
```

## Create the HorizontalPodAutoscaler {#create-horizontal-pod-autoscaler}

Now that the server is running, create the autoscaler using `kubectl`. The
`kubectl autoscale` subcommand,
part of `kubectl`, helps you do this.

You will shortly run a command that creates a HorizontalPodAutoscaler that maintains
between 1 and 10 replicas of the Pods controlled by the php-apache Deployment that
you created in the first step of these instructions.

Roughly speaking, the HPA controller will increase and decrease
the number of replicas (by updating the Deployment) to maintain an average CPU utilization across all Pods of 50%.
The Deployment then updates the ReplicaSet - this is part of how all Deployments work in Kubernetes -
and then the ReplicaSet either adds or removes Pods based on the change to its `.spec`.

Since each pod requests 200 milli-cores by `kubectl run`, this means an average CPU usage of 100 milli-cores.
See Algorithm details for more details
on the algorithm.

Create the HorizontalPodAutoscaler:

```shell
kubectl autoscale deployment php-apache --cpu=50% --min=1 --max=10
```

```
horizontalpodautoscaler.autoscaling/php-apache autoscaled
```

You can check the current status of the newly-made HorizontalPodAutoscaler, by running:

```shell
# You can use "hpa" or "horizontalpodautoscaler"; either name works OK.
kubectl get hpa
```

The output is similar to:
```
NAME         REFERENCE                     TARGET    MINPODS   MAXPODS   REPLICAS   AGE
php-apache   Deployment/php-apache/scale   0% / 50%  1         10        1          18s
```

(if you see other HorizontalPodAutoscalers with different names, that means they already existed,
and isn't usually a problem).

Please note that the current CPU consumption is 0% as there are no clients sending requests to the server
(the ``TARGET`` column shows the average across all the Pods controlled by the corresponding deployment).

## Increase the load {#increase-load}

Next, see how the autoscaler reacts to increased load.
To do this, you'll start a different Pod to act as a client. The container within the client Pod
runs in an infinite loop, sending queries to the php-apache service.

```shell
# Run this in a separate terminal
# so that the load generation continues and you can carry on with the rest of the steps
kubectl run -i --tty load-generator --rm --image=busybox:1.28 --restart=Never -- /bin/sh -c "while sleep 0.01; do wget -q -O- http://php-apache; done"
```

Now run:
```shell
# type Ctrl+C to end the watch when you're ready
kubectl get hpa php-apache --watch
```

Within a minute or so, you should see the higher CPU load; for example:

```
NAME         REFERENCE                     TARGET      MINPODS   MAXPODS   REPLICAS   AGE
php-apache   Deployment/php-apache/scale   305% / 50%  1         10        1          3m
```

and then, more replicas. For example:
```
NAME         REFERENCE                     TARGET      MINPODS   MAXPODS   REPLICAS   AGE
php-apache   Deployment/php-apache/scale   305% / 50%  1         10        7          3m
```

Here, CPU consumption has increased to 305% of the request.
As a result, the Deployment was resized to 7 replicas:

```shell
kubectl get deployment php-apache
```

You should see the replica count matching the figure from the HorizontalPodAutoscaler
```
NAME         READY   UP-TO-DATE   AVAILABLE   AGE
php-apache   7/7      7           7           19m
```

**Note:**
It may take a few minutes to stabilize the number of replicas. Since the amount
of load is not controlled in any way it may happen that the final number of replicas
will differ from this example.

## Stop generating load {#stop-load}

To finish the example, stop sending the load.

In the terminal where you created the Pod that runs a `busybox` image, terminate
the load generation by typing `<Ctrl> + C`.

Then verify the result state (after a minute or so):

```shell
# type Ctrl+C to end the watch when you're ready
kubectl get hpa php-apache --watch
```

The output is similar to:

```
NAME         REFERENCE                     TARGET       MINPODS   MAXPODS   REPLICAS   AGE
php-apache   Deployment/php-apache/scale   0% / 50%     1         10        1          11m
```

and the Deployment also shows that it has scaled down:

```shell
kubectl get deployment php-apache
```

```
NAME         READY   UP-TO-DATE   AVAILABLE   AGE
php-apache   1/1     1            1           27m
```

Once CPU utilization dropped to 0, the HPA automatically scaled the number of replicas back down to 1.

Autoscaling the replicas may take a few minutes.
