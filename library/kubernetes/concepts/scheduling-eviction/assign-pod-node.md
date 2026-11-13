---
title: "Assigning Pods to Nodes (part 1 of 4)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/concepts/scheduling-eviction/assign-pod-node.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Assigning Pods to Nodes

You can constrain a Pod so that it is
_restricted_ to run on particular node(s),
or to _prefer_ to run on particular nodes.
There are several ways to do this and the recommended approaches all use
label selectors to facilitate the selection.
Often, you do not need to set any such constraints; the
scheduler will automatically do a reasonable placement
(for example, spreading your Pods across nodes so as not place Pods on a node with insufficient free resources).
However, there are some circumstances where you may want to control which node
the Pod deploys to, for example, to ensure that a Pod ends up on a node with an SSD attached to it,
or to co-locate Pods from two different services that communicate a lot into the same availability zone.

You can use any of the following methods to choose where Kubernetes schedules
specific Pods:

- nodeSelector field matching against node labels
- Affinity and anti-affinity
- nodeName field
- Pod topology spread constraints

## Node labels {#built-in-node-labels}

Like many other Kubernetes objects, nodes have
labels. You can
attach labels manually.
Kubernetes also populates a standard set of labels
on all nodes in a cluster.

**Note:**
The value of these labels is cloud provider specific and is not guaranteed to be reliable.
For example, the value of `kubernetes.io/hostname` may be the same as the node name in some environments
and a different value in other environments.

### Node isolation/restriction

Adding labels to nodes allows you to target Pods for scheduling on specific
nodes or groups of nodes. You can use this functionality to ensure that specific
Pods only run on nodes with certain isolation, security, or regulatory
properties.

If you use labels for node isolation, choose label keys that the kubelet
cannot modify. This prevents a compromised node from setting those labels on
itself so that the scheduler schedules workloads onto the compromised node.

The `NodeRestriction` admission plugin
prevents the kubelet from setting or modifying labels with a
`node-restriction.kubernetes.io/` prefix.

To make use of that label prefix for node isolation:

1. Ensure you are using the Node authorizer and have _enabled_ the `NodeRestriction` admission plugin.
2. Add labels with the `node-restriction.kubernetes.io/` prefix to your nodes, and use those labels in your node selectors.
   For example, `example.com.node-restriction.kubernetes.io/fips=true` or `example.com.node-restriction.kubernetes.io/pci-dss=true`.

## nodeSelector

`nodeSelector` is the simplest recommended form of node selection constraint.
You can add the `nodeSelector` field to your Pod specification and specify the
node labels you want the target node to have.
Kubernetes only schedules the Pod onto nodes that have each of the labels you
specify.

See Assign Pods to Nodes for more
information.
