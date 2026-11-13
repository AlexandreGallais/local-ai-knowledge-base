---
title: "Configure Pod Initialization"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/tasks/configure-pod-container/configure-pod-initialization.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Configure Pod Initialization

This page shows how to use an Init Container to initialize a Pod before an
application Container runs.

## Create a Pod that has an Init Container

In this exercise you create a Pod that has one application Container and one
Init Container. The init container runs to completion before the application
container starts.

Here is the configuration file for the Pod:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: init-demo
spec:
  containers:
  - name: nginx
    image: nginx
    ports:
    - containerPort: 80
    volumeMounts:
    - name: workdir
      mountPath: /usr/share/nginx/html
  # These containers are run during pod initialization
  initContainers:
  - name: install
    image: busybox:1.28
    command:
    - wget
    - "-O"
    - "/work-dir/index.html"
    - http://info.cern.ch
    volumeMounts:
    - name: workdir
      mountPath: "/work-dir"
  dnsPolicy: Default
  volumes:
  - name: workdir
    emptyDir: {}
```

In the configuration file, you can see that the Pod has a Volume that the init
container and the application container share.

The init container mounts the
shared Volume at `/work-dir`, and the application container mounts the shared
Volume at `/usr/share/nginx/html`. The init container runs the following command
and then terminates:

```shell
wget -O /work-dir/index.html http://info.cern.ch
```

Notice that the init container writes the `index.html` file in the root directory
of the nginx server.

Create the Pod:

```shell
kubectl apply -f https://k8s.io/examples/pods/init-containers.yaml
```

Verify that the nginx container is running:

```shell
kubectl get pod init-demo
```

The output shows that the nginx container is running:

```
NAME        READY     STATUS    RESTARTS   AGE
init-demo   1/1       Running   0          1m
```

Get a shell into the nginx container running in the init-demo Pod:

```shell
kubectl exec -it init-demo -- /bin/bash
```

In your shell, send a GET request to the nginx server:

```
root@nginx:~# apt-get update
root@nginx:~# apt-get install curl
root@nginx:~# curl localhost
```

The output shows that nginx is serving the web page that was written by the init container:

```html
<html><head></head><body><header>
<title>http://info.cern.ch</title>
</header>

<h1>http://info.cern.ch - home of the first website</h1>
  ...
  <li><a href="http://info.cern.ch/hypertext/WWW/TheProject.html">Browse the first website</a></li>
  ...
```

## What's next

* Learn more about
  communicating between Containers running in the same Pod.
* Learn more about Init Containers.
* Learn more about Volumes.
* Learn more about Debugging Init Containers
