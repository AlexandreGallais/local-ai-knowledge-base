---
title: "Scheduling, Preemption and Eviction"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/concepts/scheduling-eviction/_index.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Scheduling, Preemption and Eviction

In Kubernetes, scheduling refers to making sure that Pods
are matched to Nodes so that the
kubelet can run them. Preemption
is the process of terminating Pods with lower Priority
so that Pods with higher Priority can schedule on Nodes. Eviction is the process
of terminating one or more Pods on Nodes.

## Scheduling

* Kubernetes Scheduler
* Running Multiple Schedulers
* Assigning Pods to Nodes
* Pod Overhead
* Pod Topology Spread Constraints
* Taints and Tolerations
* Scheduling Framework
* Scheduler Performance Tuning
* Resource Bin Packing for Extended Resources
* Pod Scheduling Readiness
* PodGroup Scheduling
* Gang Scheduling
* Topology-aware Scheduling
* Workload-aware preemption
* Descheduler
* Node Declared Features

## Pod Disruption

* Pod Priority and Preemption
* Node-pressure Eviction
* API-initiated Eviction
