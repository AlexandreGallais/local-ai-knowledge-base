---
title: "Attach Handlers to Container Lifecycle Events"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/tasks/configure-pod-container/attach-handler-lifecycle-event.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Attach Handlers to Container Lifecycle Events

This page shows how to attach handlers to Container lifecycle events. Kubernetes supports
the postStart and preStop events. Kubernetes sends the postStart event immediately
after a Container is started, and it sends the preStop event immediately before the
Container is terminated. A Container may specify one handler per event.

## Define postStart and preStop handlers

In this exercise, you create a Pod that has one Container. The Container has handlers
for the postStart and preStop events.

Here is the configuration file for the Pod:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: lifecycle-demo
spec:
  containers:
  - name: lifecycle-demo-container
    image: nginx
    lifecycle:
      postStart:
        exec:
          command: ["/bin/sh", "-c", "echo Hello from the postStart handler > /usr/share/message"]
      preStop:
        exec:
          command: ["/bin/sh","-c","nginx -s quit; while killall -0 nginx; do sleep 1; done"]
```

In the configuration file, you can see that the postStart command writes a `message`
file to the Container's `/usr/share` directory. The preStop command shuts down
nginx gracefully. This is helpful if the Container is being terminated because of a failure.

Create the Pod:

    kubectl apply -f https://k8s.io/examples/pods/lifecycle-events.yaml

Verify that the Container in the Pod is running:

    kubectl get pod lifecycle-demo

Get a shell into the Container running in your Pod:

    kubectl exec -it lifecycle-demo -- /bin/bash

In your shell, verify that the `postStart` handler created the `message` file:

    root@lifecycle-demo:/# cat /usr/share/message

The output shows the text written by the postStart handler:

    Hello from the postStart handler

## Discussion

Kubernetes sends the postStart event immediately after the Container is created.
There is no guarantee, however, that the postStart handler is called before
the Container's entrypoint is called. The postStart handler runs asynchronously
relative to the Container's code, but Kubernetes' management of the container
blocks until the postStart handler completes. The Container's status is not
set to RUNNING until the postStart handler completes.

Kubernetes sends the preStop event immediately before the Container is terminated.
Kubernetes' management of the Container blocks until the preStop handler completes,
unless the Pod's grace period expires. For more details, see
Pod Lifecycle.

**Note:**
Kubernetes only sends the preStop event when a Pod or a container in the Pod is *terminated*.
This means that the preStop hook is not invoked when the Pod is *completed*.
About this limitation, please see Container hooks for the detail.

## What's next

* Learn more about Container lifecycle hooks.
* Learn more about the lifecycle of a Pod.

### Reference

* Lifecycle
* Container
* See `terminationGracePeriodSeconds` in PodSpec
