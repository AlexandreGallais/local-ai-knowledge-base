---
title: "Kubeadm"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/setup-tools/kubeadm/_index.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Kubeadm

Kubeadm is a tool built to provide `kubeadm init` and `kubeadm join` as best-practice "fast paths" for creating Kubernetes clusters.

kubeadm performs the actions necessary to get a minimum viable cluster up and running. By design, it cares only about bootstrapping, not about provisioning machines. Likewise, installing various nice-to-have addons, like the Kubernetes Dashboard, monitoring solutions, and cloud-specific addons, is not in scope.

Instead, we expect higher-level and more tailored tooling to be built on top of kubeadm, and ideally, using kubeadm as the basis of all deployments will make it easier to create conformant clusters.

## How to install

To install kubeadm, see the installation guide.

## What's next

* kubeadm init to bootstrap a Kubernetes control-plane node
* kubeadm join to bootstrap a Kubernetes worker node and join it to the cluster
* kubeadm upgrade to upgrade a Kubernetes cluster to a newer version
* kubeadm config if you initialized your cluster using kubeadm v1.7.x or lower, to configure your cluster for `kubeadm upgrade`
* kubeadm token to manage tokens for `kubeadm join`
* kubeadm reset to revert any changes made to this host by `kubeadm init` or `kubeadm join`
* kubeadm certs to manage Kubernetes certificates
* kubeadm kubeconfig to manage kubeconfig files
* kubeadm version to print the kubeadm version
* kubeadm alpha to preview a set of features made available for gathering feedback from the community
