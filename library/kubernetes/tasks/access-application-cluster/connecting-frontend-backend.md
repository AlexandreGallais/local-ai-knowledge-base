---
title: "Connect a Frontend to a Backend Using Services"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/tasks/access-application-cluster/connecting-frontend-backend.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

This task shows how to create a _frontend_ and a _backend_ microservice. The backend
microservice is a hello greeter. The frontend exposes the backend using nginx and a
Kubernetes service object.

## Objectives

* Create and run a sample `hello` backend microservice using a
  deployment object.
* Use a Service object to send traffic to the backend microservice's multiple replicas.
* Create and run a `nginx` frontend microservice, also using a Deployment object.
* Configure the frontend microservice to send traffic to the backend microservice.
* Use a Service object of `type=LoadBalancer` to expose the frontend microservice
  outside the cluster.

## Before you begin

This task uses
Services with external load balancers, which
require a supported environment. If your environment does not support this, you can use a Service of type
NodePort instead.

## Creating the backend using a Deployment

The backend is a simple hello greeter microservice. Here is the configuration
file for the backend Deployment:

```yaml
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: backend
spec:
  selector:
    matchLabels:
      app: hello
      tier: backend
      track: stable
  replicas: 3
  template:
    metadata:
      labels:
        app: hello
        tier: backend
        track: stable
    spec:
      containers:
        - name: hello
          image: "gcr.io/google-samples/hello-go-gke:1.0"
          ports:
            - name: http
              containerPort: 80
...
```

Create the backend Deployment:

```shell
kubectl apply -f https://k8s.io/examples/service/access/backend-deployment.yaml
```

View information about the backend Deployment:

```shell
kubectl describe deployment backend
```

The output is similar to this:

```
Name:                           backend
Namespace:                      default
CreationTimestamp:              Mon, 24 Oct 2016 14:21:02 -0700
Labels:                         app=hello
                                tier=backend
                                track=stable
Annotations:                    deployment.kubernetes.io/revision=1
Selector:                       app=hello,tier=backend,track=stable
Replicas:                       3 desired | 3 updated | 3 total | 3 available | 0 unavailable
StrategyType:                   RollingUpdate
MinReadySeconds:                0
RollingUpdateStrategy:          1 max unavailable, 1 max surge
Pod Template:
  Labels:       app=hello
                tier=backend
                track=stable
  Containers:
   hello:
    Image:              "gcr.io/google-samples/hello-go-gke:1.0"
    Port:               80/TCP
    Environment:        <none>
    Mounts:             <none>
  Volumes:              <none>
Conditions:
  Type          Status  Reason
  ----          ------  ------
  Available     True    MinimumReplicasAvailable
  Progressing   True    NewReplicaSetAvailable
OldReplicaSets:                 <none>
NewReplicaSet:                  hello-3621623197 (3/3 replicas created)
Events:
...
```

## Creating the `hello` Service object

The key to sending requests from a frontend to a backend is the backend
Service. A Service creates a persistent IP address and DNS name entry
so that the backend microservice can always be reached. A Service uses
selectors to find
the Pods that it routes traffic to.

First, explore the Service configuration file:

```yaml
---
apiVersion: v1
kind: Service
metadata:
  name: hello
spec:
  selector:
    app: hello
    tier: backend
  ports:
  - protocol: TCP
    port: 80
    targetPort: http
...
```

In the configuration file, you can see that the Service, named `hello` routes
traffic to Pods that have the labels `app: hello` and `tier: backend`.

Create the backend Service:

```shell
kubectl apply -f https://k8s.io/examples/service/access/backend-service.yaml
```

At this point, you have a `backend` Deployment running three replicas of your `hello`
application, and you have a Service that can route traffic to them. However, this
service is neither available nor resolvable outside the cluster.

## Creating the frontend

Now that you have your backend running, you can create a frontend that is accessible
outside the cluster, and connects to the backend by proxying requests to it.

The frontend sends requests to the backend worker Pods by using the DNS name
given to the backend Service. The DNS name is `hello`, which is the value
of the `name` field in the `examples/service/access/backend-service.yaml`
configuration file.

The Pods in the frontend Deployment run a nginx image that is configured
to proxy requests to the `hello` backend Service. Here is the nginx configuration file:

```
# The identifier Backend is internal to nginx, and used to name this specific upstream
upstream Backend {
    # hello is the internal DNS name used by the backend Service inside Kubernetes
    server hello;
}

server {
    listen 80;

    location / {
        # The following statement will proxy traffic to the upstream named Backend
        proxy_pass http://Backend;
    }
}
```

Similar to the backend, the frontend has a Deployment and a Service. An important
difference to notice between the backend and frontend services, is that the
configuration for the frontend Service has `type: LoadBalancer`, which means that
the Service uses a load balancer provisioned by your cloud provider and will be
accessible from outside the cluster.

```yaml
---
apiVersion: v1
kind: Service
metadata:
  name: frontend
spec:
  selector:
    app: hello
    tier: frontend
  ports:
  - protocol: "TCP"
    port: 80
    targetPort: 80
  type: LoadBalancer
...
```

```yaml
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: frontend
spec:
  selector:
    matchLabels:
      app: hello
      tier: frontend
      track: stable
  replicas: 1
  template:
    metadata:
      labels:
        app: hello
        tier: frontend
        track: stable
    spec:
      containers:
        - name: nginx
          image: "gcr.io/google-samples/hello-frontend:1.0"
          lifecycle:
            preStop:
              exec:
                command: ["/usr/sbin/nginx","-s","quit"]
...
```

Create the frontend Deployment and Service:

```shell
kubectl apply -f https://k8s.io/examples/service/access/frontend-deployment.yaml
kubectl apply -f https://k8s.io/examples/service/access/frontend-service.yaml
```

The output verifies that both resources were created:

```
deployment.apps/frontend created
service/frontend created
```

**Note:**
The nginx configuration is baked into the
container image. A better way to do this would
be to use a
ConfigMap,
so that you can change the configuration more easily.

## Interact with the frontend Service

Once you've created a Service of type LoadBalancer, you can use this
command to find the external IP:

```shell
kubectl get service frontend --watch
```

This displays the configuration for the `frontend` Service and watches for
changes. Initially, the external IP is listed as `<pending>`:

```
NAME       TYPE           CLUSTER-IP      EXTERNAL-IP   PORT(S)  AGE
frontend   LoadBalancer   10.51.252.116   <pending>     80/TCP   10s
```

As soon as an external IP is provisioned, however, the configuration updates
to include the new IP under the `EXTERNAL-IP` heading:

```
NAME       TYPE           CLUSTER-IP      EXTERNAL-IP        PORT(S)  AGE
frontend   LoadBalancer   10.51.252.116   XXX.XXX.XXX.XXX    80/TCP   1m
```

That IP can now be used to interact with the `frontend` service from outside the
cluster.

## Send traffic through the frontend

The frontend and backend are now connected. You can hit the endpoint
by using the curl command on the external IP of your frontend Service.

```shell
curl http://${EXTERNAL_IP} # replace this with the EXTERNAL-IP you saw earlier
```

The output shows the message generated by the backend:

```json
{"message":"Hello"}
```

## Clean up

To delete the Services, enter this command:

```shell
kubectl delete services frontend backend
```

To delete the Deployments, the ReplicaSets and the Pods that are running the backend and frontend applications, enter this command:

```shell
kubectl delete deployment frontend backend
```

## What's next

* Learn more about Services
* Learn more about ConfigMaps
* Learn more about DNS for Service and Pods
