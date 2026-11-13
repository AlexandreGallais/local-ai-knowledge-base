---
title: "Node Labels Populated By The Kubelet"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/node/node-labels.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Node Labels Populated By The Kubelet

Kubernetes nodes come pre-populated
with a standard set of labels.

You can also set your own labels on nodes, either through the kubelet configuration or
using the Kubernetes API.

## Preset labels

The preset labels that Kubernetes sets on nodes are:

* `kubernetes.io/arch`
* `kubernetes.io/hostname`
* `kubernetes.io/os`
* `node.kubernetes.io/instance-type`
  (if known to the kubelet – Kubernetes may not have this information to set the label)
* `topology.kubernetes.io/region`
  (if known to the kubelet – Kubernetes may not have this information to set the label)
* `topology.kubernetes.io/zone`
  (if known to the kubelet – Kubernetes may not have this information to set the label)

**Note:**
The value of these labels is cloud provider specific and is not guaranteed to be reliable.
For example, the value of `kubernetes.io/hostname` may be the same as the node name in some environments
and a different value in other environments.

## What's next

- See Well-Known Labels, Annotations and Taints for a list of common labels.
- Learn how to add a label to a node.
