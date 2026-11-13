---
title: "Use Pod-Level Resources with kubelet Resource Managers (part 2 of 2)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/tutorials/cluster-management/use-pod-level-resource-managers.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Use Pod-Level Resources with kubelet Resource Managers (part 2 of 2)

## Clean up

Delete the namespace and all sample Pods created during this tutorial:

```shell
kubectl delete namespace plrm-tutorial
```

## What's next

- Read the concept documentation:
  - Pod-level resource managers
- Learn how to configure node-level resource managers:
  - Control Topology Management Policies on a Node
  - Control CPU Management Policies on the Node
  - Utilizing the NUMA-aware Memory Manager
- Learn how to assign resources:
  - Assign Pod-level CPU and memory resources
  - Assign CPU Resources to Containers and Pods
  - Assign Memory Resources to Containers and Pods
