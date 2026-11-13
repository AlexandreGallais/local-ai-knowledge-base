---
title: "Liveness, Readiness, and Startup Probes (part 1 of 2)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/concepts/workloads/pods/probes.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Liveness, Readiness, and Startup Probes

Kubernetes lets you define _probes_ to continuously monitor the health
of containers in a Pod. A probe is a diagnostic performed periodically
by the kubelet on a container.
To perform a diagnostic, the kubelet either executes code within
the container or makes a network request.

Based on the probe results, Kubernetes can restart unhealthy containers
or stop sending traffic to containers that are not ready.

## Types of probe {#types-of-probe}

The kubelet can optionally perform and react to three kinds of probes on running
containers, each serving a different purpose:

- Startup probe
- Liveness probe
- Readiness probe

### Startup probe {#startup-probe}

Startup probes verify whether the application within a container is started.
If a startup probe is configured, Kubernetes does not execute liveness or
readiness probes until the startup probe succeeds, allowing the application
time to finish its initialization.

This type of probe is only executed at startup, unlike liveness and readiness
probes, which are run periodically.
If the startup probe fails, the kubelet kills the container, and the container
is subjected to its restart policy.

### Liveness probe {#liveness-probe}

Liveness probes determine when to restart a container.
For example, liveness probes could catch a deadlock, where an application is
running, but unable to make progress. Restarting a container in such a state
can help to make the application more available despite bugs.

If a container fails its liveness probe more times than the configured tolerance,
the kubelet restarts that container.
Liveness probes do not wait for readiness probes to succeed. If you want to
wait before executing a liveness probe, you can either define
`initialDelaySeconds` or use a startup probe.

**Caution:**
Liveness probes can be a powerful way to recover from application failures,
but they should be used with caution.
Liveness probes must be configured carefully to ensure that they truly indicate
unrecoverable application failure, for example a deadlock.

Incorrect implementation of liveness probes can lead to cascading failures.
This results in restarting of container under high load; failed client requests
as your application became less scalable; and increased workload on remaining
pods due to some failed pods. Understand the difference between liveness and
readiness probes and when to apply them for your app.

### Readiness probe {#readiness-probe}

Readiness probes determine when a container is ready to accept traffic.
This is useful when waiting for an application to perform time-consuming initial
tasks, such as establishing network connections, loading files, and warming
caches.
Readiness probes can also be useful later in the container’s lifecycle,
for example, when recovering from temporary faults or overloads.

If the readiness probe returns a failed state, the
EndpointSlice
controller removes the Pod's IP address from the EndpointSlices of all Services
that match the Pod.

Readiness probes run on the container during its whole lifecycle.

**Note:**
If you want to be able to drain requests when the Pod is deleted, you do not
necessarily need a readiness probe; when the Pod is deleted, the corresponding
endpoint in the EndpointSlice will update its conditions: the endpoint ready
condition will be set to false, so load balancers will not use the Pod for
regular traffic. See Pod termination
for more information about how the kubelet handles Pod deletion.

## When to use each probe {#when-to-use-each-probe}

### When should you use a startup probe? {#when-should-you-use-a-startup-probe}

Startup probes are useful for Pods that have containers that take a long time to
come into service. Rather than set a long liveness interval, you can configure a
separate configuration for probing the container as it starts up, allowing a
time longer than the liveness interval would allow.

If your container usually starts in more than
\\( initialDelaySeconds + failureThreshold \times  periodSeconds \\), you should specify a
startup probe that checks the same endpoint as the liveness probe. The default
for `periodSeconds` is 10s. You should then set its `failureThreshold` high
enough to allow the container to start, without changing the default values of
the liveness probe. This helps to protect against deadlocks.

### When should you use a liveness probe? {#when-should-you-use-a-liveness-probe}

If the process in your container is able to crash on its own whenever it
encounters an issue or becomes unhealthy, you do not necessarily need a liveness
probe; the kubelet will automatically perform the correct action in accordance
with the Pod's `restartPolicy`.

If you'd like your container to be killed and restarted if a probe fails, then
specify a liveness probe, and specify a `restartPolicy` of `Always` or
`OnFailure`.

A common pattern for liveness probes is to use the same low-cost HTTP endpoint
as for readiness probes, but with a higher `failureThreshold`. This ensures
that the pod is observed as not-ready for some period of time before it is hard
killed.

### When should you use a readiness probe? {#when-should-you-use-a-readiness-probe}

To start sending traffic to a Pod only when a probe succeeds, specify a
readiness probe. The readiness probe might be the same as the liveness probe,
but the existence of the readiness probe in the spec means that the Pod will
start without receiving any traffic and only start receiving traffic after the
probe starts succeeding.

You can also use a readiness probe to let a container take itself down for
maintenance, by checking an endpoint specific to readiness that is different
from the liveness probe.

When your app has a strict dependency on back-end services, you can implement
both a liveness and a readiness probe. The liveness probe passes when the app
itself is healthy, but the readiness probe additionally checks that each
required back-end service is available. This helps you avoid directing traffic
to Pods that can only respond with error messages.

For containers that need to work on loading large data, configuration files, or
migrations during startup, consider using a startup probe.
However, if you want to detect the difference between an app that has failed
and an app that is still processing its startup data, you might prefer a readiness probe.

## Check mechanisms {#check-mechanisms}

There are four different ways to check a container using a probe. Each probe
must define exactly one of these four mechanisms:

`exec`
: Executes a specified command inside the container. The diagnostic is
  considered successful if the command exits with a status code of 0.

`grpc`
: Performs a remote procedure call using gRPC. The target
  should implement gRPC health checks.
  The diagnostic is considered successful if the `status` of the response is
  `SERVING`. For more details, see gRPC probes.

`httpGet`
: Performs an HTTP `GET` request against the Pod's IP address on a specified
  port and path. The diagnostic is considered successful if the response has a
  status code greater than or equal to 200 and less than 400.
  For more details, see HTTP probes.

`tcpSocket`
: Performs a TCP check against the Pod's IP address on a specified port. The
  diagnostic is considered successful if the port is open. If the remote system
  (the container) closes the connection immediately after it opens, this counts
  as healthy.
  For more details, see TCP probes.

**Caution:**
Unlike the other mechanisms, `exec` probe's implementation involves the
creation/forking of multiple processes each time when executed. As a result, in
case of the clusters having higher pod densities, lower intervals of
`initialDelaySeconds`, `periodSeconds`, configuring any probe with exec
mechanism might introduce an overhead on the cpu usage of the node. In such
scenarios, consider using the alternative probe mechanisms to avoid the overhead.

## Probe results {#probe-results}

The kubelet evaluates the result of each probe execution and takes action
accordingly. Each probe has one of three results:

`Success`
: The container passed the diagnostic.

`Failure`
: The container failed the diagnostic. For liveness and startup probes, the
  kubelet kills the container, and the container is subjected to its
  restart policy.
  For readiness probes, the kubelet marks the container as not ready, and the
  Pod stops receiving traffic from matching Services.

`Unknown`
: The diagnostic failed (no action should be taken, and the kubelet will make
  further checks).

If a container does not provide a particular probe, the kubelet always
considers the result as `Success`. For readiness probes specifically,
the result is considered `Failure` before the initial delay.

## Configuration fields {#configure-probes}

Probes
have a number of fields that you can use to more precisely control the behavior of startup,
liveness and readiness checks. For example:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: probe-example
spec:
  containers:
  - name: app
    image: registry.k8s.io/e2e-test-images/agnhost:2.40
    ports:
    - containerPort: 8080
    startupProbe:
      httpGet:
        path: /healthz
        port: 8080
      failureThreshold: 30
      periodSeconds: 10
    livenessProbe:
      httpGet:
        path: /healthz
        port: 8080
      initialDelaySeconds: 10
      periodSeconds: 5
      timeoutSeconds: 3
      failureThreshold: 3
    readinessProbe:
      httpGet:
        path: /ready
        port: 8080
      periodSeconds: 5
```

`initialDelaySeconds`
: Number of seconds after the container has started before startup, liveness or readiness probes are initiated. If a startup probe is defined, liveness and readiness probe delays do not begin until the startup probe has succeeded. In some older Kubernetes versions, the initialDelaySeconds might be ignored if periodSeconds was set to a value higher than initialDelaySeconds. However, in current versions, initialDelaySeconds is always honored and the probe will not start until after this initial delay. Defaults to 0 seconds. Minimum value is 0.

`periodSeconds`
: How often (in seconds) to perform the probe. Default to 10 seconds. The minimum value is 1. While a container is not Ready, the readiness probe may be executed at times other than the configured `periodSeconds` interval. This is to make the Pod ready faster.

`timeoutSeconds`
: Number of seconds after which the probe times out. Defaults to 1 second. Minimum value is 1.

`successThreshold`
: Minimum consecutive successes for the probe to be considered successful after having failed. Defaults to 1. Must be 1 for liveness and startup Probes. Minimum value is 1.

`failureThreshold`
: After a probe fails `failureThreshold` times in a row, Kubernetes considers that the overall check has failed: the container is _not_ ready/healthy/live. Defaults to 3. Minimum value is 1. For the case of a startup or liveness probe, if at least `failureThreshold` probes have failed, Kubernetes treats the container as unhealthy and triggers a restart for that specific container. The kubelet honors the setting of `terminationGracePeriodSeconds` for that container. For a failed readiness probe, the kubelet continues running the container that failed checks, and also continues to run more probes; because the check failed, the kubelet sets the `Ready` condition on the Pod to `false`.

`terminationGracePeriodSeconds`
: configure a grace period for the kubelet to wait between triggering a shut down of the failed container, and then forcing the container runtime to stop that container. The default is to inherit the Pod-level value for `terminationGracePeriodSeconds` (30 seconds if not specified), and the minimum value is 1. See probe-level `terminationGracePeriodSeconds` for more detail.

**Caution:**
Incorrect implementation of readiness probes may result in an ever growing
number of processes in the container, and resource starvation if this is left
unchecked.

### Probe-level `terminationGracePeriodSeconds` {#probe-level-terminationgraceperiodseconds}

**Feature state:** v1.28 [stable]

In 1.25 and above, users can specify a probe-level `terminationGracePeriodSeconds`
as part of the probe specification. When both a pod- and probe-level
`terminationGracePeriodSeconds` are set, the kubelet will use the probe-level
value.

When setting the `terminationGracePeriodSeconds`, note the following:

* The kubelet always honors the probe-level `terminationGracePeriodSeconds`
  field if it is present on a Pod.
* If you have existing Pods where the `terminationGracePeriodSeconds` field is
  set and you no longer wish to use per-probe termination grace periods, you
  must delete those existing Pods.

For example:

```yaml
spec:
  terminationGracePeriodSeconds: 3600  # pod-level
  containers:
  - name: test
    image: ...

    ports:
    - name: liveness-port
      containerPort: 8080

    livenessProbe:
      httpGet:
        path: /healthz
        port: liveness-port
      failureThreshold: 1
      periodSeconds: 60
      # Override pod-level terminationGracePeriodSeconds
      terminationGracePeriodSeconds: 60
```

Probe-level `terminationGracePeriodSeconds` **cannot** be set for readiness probes.
It will be rejected by the API server.
