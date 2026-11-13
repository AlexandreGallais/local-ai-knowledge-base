---
title: "kubeadm reset phase"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/setup-tools/kubeadm/kubeadm-reset-phase.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# kubeadm reset phase

`kubeadm reset phase` enables you to invoke atomic steps of the node reset process.
Hence, you can let kubeadm do some of the work and you can fill in the gaps
if you wish to apply customization.

`kubeadm reset phase` is consistent with the kubeadm reset workflow,
and behind the scene both use the same code.

## kubeadm reset phase {#cmd-reset-phase}

**phase**

## kubeadm reset phase preflight {#cmd-reset-phase-preflight}

Using this phase you can execute preflight checks on a node that is being reset.

**preflight**

## kubeadm reset phase remove-etcd-member {#cmd-reset-phase-remove-etcd-member}

Using this phase you can remove this control-plane node's etcd member from the etcd cluster.

**remove-etcd-member**

## kubeadm reset phase cleanup-node {#cmd-reset-phase-cleanup-node}

Using this phase you can perform cleanup on this node.

**cleanup-node**

## What's next

* kubeadm init to bootstrap a Kubernetes control-plane node
* kubeadm join to connect a node to the cluster
* kubeadm reset to revert any changes made to this host by `kubeadm init` or `kubeadm join`
* kubeadm alpha to try experimental functionality
