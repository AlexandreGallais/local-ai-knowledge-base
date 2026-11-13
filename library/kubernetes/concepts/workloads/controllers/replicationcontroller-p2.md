---
title: "ReplicationController (part 2 of 2)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/concepts/workloads/controllers/replicationcontroller.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# ReplicationController (part 2 of 2)

## Alternatives to ReplicationController

### ReplicaSet

`ReplicaSet` is the next-generation ReplicationController that supports the new set-based label selector.
It's mainly used by Deployment as a mechanism to orchestrate pod creation, deletion and updates.
Note that we recommend using Deployments instead of directly using Replica Sets, unless you require custom update orchestration or don't require updates at all.

### Deployment (Recommended)

`Deployment` is a higher-level API object that updates its underlying Replica Sets and their Pods. Deployments are recommended if you want the rolling update functionality,  because they are declarative, server-side, and have additional features.

### Bare Pods

Unlike in the case where a user directly created pods, a ReplicationController replaces pods that are deleted or terminated for any reason, such as in the case of node failure or disruptive node maintenance, such as a kernel upgrade. For this reason, we recommend that you use a ReplicationController even if your application requires only a single pod. Think of it similarly to a process supervisor, only it supervises multiple pods across multiple nodes instead of individual processes on a single node.  A ReplicationController delegates local container restarts to some agent on the node, such as the kubelet.

### Job

Use a `Job` instead of a ReplicationController for pods that are expected to terminate on their own
(that is, batch jobs).

### DaemonSet

Use a `DaemonSet` instead of a ReplicationController for pods that provide a
machine-level function, such as machine monitoring or machine logging.  These pods have a lifetime that is tied
to a machine lifetime: the pod needs to be running on the machine before other pods start, and are
safe to terminate when the machine is otherwise ready to be rebooted/shutdown.

## What's next

* Learn about Pods.
* Learn about Deployment, the replacement
  for ReplicationController.
* `ReplicationController` is part of the Kubernetes REST API.
  Read the
  object definition to understand the API for replication controllers.
