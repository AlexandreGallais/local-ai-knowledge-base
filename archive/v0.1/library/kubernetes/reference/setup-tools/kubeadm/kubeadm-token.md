---
title: "kubeadm token"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/setup-tools/kubeadm/kubeadm-token.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# kubeadm token

Bootstrap tokens are used for establishing bidirectional trust between a node joining
the cluster and a control-plane node, as described in authenticating with bootstrap tokens.

`kubeadm init` creates an initial token with a 24-hour TTL. The following commands allow you to manage
such a token and also to create and manage new ones.

## What's next

* kubeadm join to bootstrap a Kubernetes worker node and join it to the cluster
