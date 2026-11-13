---
title: "Pod Topology Spread Constraints (part 3 of 3)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/concepts/scheduling-eviction/topology-spread-constraints.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Pod Topology Spread Constraints (part 3 of 3)

## Known limitations

- There's no guarantee that the constraints remain satisfied when Pods are removed. For
  example, scaling down a Deployment may result in imbalanced Pods distribution.

  You can use a tool such as the Descheduler
  to rebalance the Pods distribution.
- Pods matched on tainted nodes are respected.
  See Issue 80921.
- The scheduler doesn't have prior knowledge of all the zones or other topology
  domains that a cluster has. They are determined from the existing nodes in the
  cluster. This could lead to a problem in autoscaled clusters, when a node pool (or
  node group) is scaled to zero nodes, and you're expecting the cluster to scale up,
  because, in this case, those topology domains won't be considered until there is
  at least one node in them.

  You can work around this by using a Node autoscaler that is aware of
  Pod topology spread constraints and is also aware of the overall set of topology
  domains.
- Pods that don't match their own labelSelector create "ghost pods". If a pod's
  labels don't match the `labelSelector` in its topology spread constraint, the pod
  won't count itself in spread calculations. This means:
  - Multiple such pods can just accumulate on the same topology (until matching pods are newly created/deleted) because those pod's schedule don't change a spreading calculation result.
  - The spreading constraint works in an unintended way, most likely not matching your expectations

  Ensure your pod's labels match the `labelSelector` in your spread constraints.
  Typically, a pod should match its own topology spread constraint selector.

## What's next

- The blog article Introducing PodTopologySpread
  explains `maxSkew` in some detail, as well as covering some advanced usage examples.
- Read the scheduling section of
  the API reference for Pod.
