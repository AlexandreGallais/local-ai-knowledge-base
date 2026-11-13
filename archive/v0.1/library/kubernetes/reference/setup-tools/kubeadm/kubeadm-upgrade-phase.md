---
title: "kubeadm upgrade phases"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/setup-tools/kubeadm/kubeadm-upgrade-phase.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# kubeadm upgrade phases

## kubeadm upgrade apply phase {#cmd-apply-phase}

Using the phases of `kubeadm upgrade apply`, you can choose to execute the separate steps of the initial upgrade
of a control plane node.

**phase**
**preflight**
**control-plane**
**upload-config**
**kubelet-config**
**bootstrap-token**
**addon**
**post-upgrade**

## kubeadm upgrade node phase {#cmd-node-phase}

Using the phases of `kubeadm upgrade node` you can choose to execute the separate steps of the upgrade of
secondary control-plane or worker nodes.

**phase**
**preflight**
**control-plane**
**kubelet-config**
**addon**
**post-upgrade**

## What's next

* kubeadm init to bootstrap a Kubernetes control-plane node
* kubeadm join to connect a node to the cluster
* kubeadm reset to revert any changes made to this host by `kubeadm init` or `kubeadm join`
* kubeadm upgrade to upgrade a kubeadm node
* kubeadm alpha to try experimental functionality
