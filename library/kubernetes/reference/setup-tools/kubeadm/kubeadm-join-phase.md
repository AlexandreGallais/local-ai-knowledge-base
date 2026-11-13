---
title: "kubeadm join phase"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/setup-tools/kubeadm/kubeadm-join-phase.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# kubeadm join phase

`kubeadm join phase` enables you to invoke atomic steps of the join process.
Hence, you can let kubeadm do some of the work and you can fill in the gaps
if you wish to apply customization.

`kubeadm join phase` is consistent with the kubeadm join workflow,
and behind the scene both use the same code.

## kubeadm join phase {#cmd-join-phase}

**phase**

## kubeadm join phase preflight {#cmd-join-phase-preflight}

Using this phase you can execute preflight checks on a joining node.

**preflight**

## kubeadm join phase control-plane-prepare {#cmd-join-phase-control-plane-prepare}

Using this phase you can prepare a node for serving a control-plane.

**control-plane-prepare**
**all**
**download-certs**
**certs**
**kubeconfig**
**control-plane**

## kubeadm join phase kubelet-start {#cmd-join-phase-kubelet-start}

Using this phase you can write the kubelet settings, certificates and (re)start the kubelet.

**kubelet-start**

## kubeadm join phase etcd-join {#cmd-join-phase-etcd-join}

Join the new etcd member to the etcd cluster.

**etcd-join**

## kubeadm join phase control-plane-join {#cmd-join-phase-control-plane-join}

Using this phase you can join a node as a control-plane instance.

**control-plane-join**
**all**
**mark-control-plane**

## kubeadm join phase wait-control-plane {#cmd-join-wait-control-plane}

Wait for the control plane components to start.

**wait-control-plane**

## What's next

* kubeadm init to bootstrap a Kubernetes control-plane node
* kubeadm join to connect a node to the cluster
* kubeadm reset to revert any changes made to this host by `kubeadm init` or `kubeadm join`
* kubeadm alpha to try experimental functionality
