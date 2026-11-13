---
title: "Pod Lifecycle (part 2 of 5)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/concepts/workloads/pods/pod-lifecycle.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Pod Lifecycle (part 2 of 5)

## How Pods handle problems with containers {#container-restarts}

Kubernetes manages container failures within Pods using a `restartPolicy` defined
in the Pod `spec`. This policy determines how Kubernetes reacts to containers exiting due to errors
or other reasons, which falls in the following sequence:

1. **Initial crash**: Kubernetes attempts an immediate restart based on the Pod `restartPolicy`.
1. **Repeated crashes**: After the initial crash Kubernetes applies an exponential
   backoff delay for subsequent restarts, described in `restartPolicy`.
   This prevents rapid, repeated restart attempts from overloading the system.
1. **CrashLoopBackOff state**: This indicates that the backoff delay mechanism is currently
   in effect for a given container that is in a crash loop, failing and restarting repeatedly.
1. **Backoff reset**: If a container runs successfully for a certain duration
   (e.g., 10 minutes), Kubernetes resets the backoff delay, treating any new crash
   as the first one.

In practice, a `CrashLoopBackOff` is a condition or event that might be seen as output
from the `kubectl` command, while describing or listing Pods, when a container in the Pod
fails to start properly and then continually tries and fails in a loop.

In other words, when a container enters the crash loop, Kubernetes applies the
exponential backoff delay mentioned in the Container restart policy.
This mechanism prevents a faulty container from overwhelming the system with continuous
failed start attempts.

The `CrashLoopBackOff` can be caused by issues like the following:

* Application errors that cause the container to exit.
* Configuration errors, such as incorrect environment variables or missing
  configuration files.
* Resource constraints, where the container might not have enough memory or CPU
  to start properly.
* Health checks failing if the application doesn't start serving within the
  expected time.
* Container liveness probes or startup probes returning a `Failure` result
  as mentioned in the probes section.

To investigate the root cause of a `CrashLoopBackOff` issue, a user can:

1. **Check logs**: Use `kubectl logs <name-of-pod>` to check the logs of the container.
   This is often the most direct way to diagnose the issue causing the crashes.
1. **Inspect events**: Use `kubectl describe pod <name-of-pod>` to see events
   for the Pod, which can provide hints about configuration or resource issues.
1. **Review configuration**: Ensure that the Pod configuration, including
   environment variables and mounted volumes, is correct and that all required
   external resources are available.
1. **Check resource limits**: Make sure that the container has enough CPU
   and memory allocated. Sometimes, increasing the resources in the Pod definition
   can resolve the issue.
1. **Debug application**: There might exist bugs or misconfigurations in the
   application code. Running this container image locally or in a development
   environment can help diagnose application specific issues.
