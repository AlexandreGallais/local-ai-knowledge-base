---
title: "Replica"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/glossary/replica.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Replica

A copy or duplicate of a Pod or
a set of pods. Replicas ensure high availability, scalability, and fault tolerance
by maintaining multiple identical instances of a pod.

Replicas are commonly used in Kubernetes to achieve the desired application state and reliability.
They enable workload scaling and distribution across multiple nodes in a cluster.

By defining the number of replicas in a Deployment or ReplicaSet, Kubernetes ensures that
the specified number of instances are running, automatically adjusting the count as needed.

Replica management allows for efficient load balancing, rolling updates, and
self-healing capabilities in a Kubernetes cluster.
