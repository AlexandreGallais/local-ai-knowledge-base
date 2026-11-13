---
title: "kubeadm init phase"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/setup-tools/kubeadm/kubeadm-init-phase.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# kubeadm init phase

`kubeadm init phase` enables you to invoke atomic steps of the bootstrap process.
Hence, you can let kubeadm do some of the work and you can fill in the gaps
if you wish to apply customization.

`kubeadm init phase` is consistent with the kubeadm init workflow,
and behind the scene both use the same code.

## kubeadm init phase preflight {#cmd-phase-preflight}

Using this command you can execute preflight checks on a control-plane node.

**preflight**

## kubeadm init phase certs {#cmd-phase-certs}

Can be used to create all required certificates by kubeadm.

**certs**
**all**
**ca**
**apiserver**
**apiserver-kubelet-client**
**front-proxy-ca**
**front-proxy-client**
**etcd-ca**
**etcd-server**
**etcd-peer**
**healthcheck-client**
**apiserver-etcd-client**
**sa**

## kubeadm init phase kubeconfig {#cmd-phase-kubeconfig}

You can create all required kubeconfig files by calling the `all` subcommand or call them individually.

**kubeconfig**
**all**
**admin**
**kubelet**
**controller-manager**
**scheduler**
**super-admin**

## kubeadm init phase etcd {#cmd-phase-etcd}

Use the following phase to create a local etcd instance based on a static Pod file.

**etcd**
**local**

## kubeadm init phase control-plane {#cmd-phase-control-plane}

Using this phase you can create all required static Pod files for the control plane components.

**control-plane**
**all**
**apiserver**
**controller-manager**
**scheduler**

## kubeadm init phase kubelet-start {#cmd-phase-kubelet-start}

This phase will write the kubelet configuration file and environment file and then start the kubelet.

**kubelet-start**

## kubeadm init phase wait-control-plane {#cmd-phase-wait-control-plane}

In this phase kubeadm will wait until the control plane components start.

**wait-control-plane**

## kubeadm init phase upload-config {#cmd-phase-upload-config}

You can use this command to upload the kubeadm configuration to your cluster.
Alternatively, you can use kubeadm config.

**upload-config**
**all**
**kubeadm**
**kubelet**

## kubeadm init phase upload-certs {#cmd-phase-upload-certs}

Use the following phase to upload control-plane certificates to the cluster.
By default the certs and encryption key <example-value> after two hours.

**upload-certs**

## kubeadm init phase mark-control-plane {#cmd-phase-mark-control-plane}

Use the following phase to label and taint the node as a control plane node.

**mark-control-plane**

## kubeadm init phase bootstrap-token {#cmd-phase-bootstrap-token}

Use the following phase to configure bootstrap tokens.

**bootstrap-token**

## kubeadm init phase kubelet-finalize {#cmd-phase-kubelet-finalize-all}

Use the following phase to update settings relevant to the kubelet after TLS
bootstrap. You can use the `all` subcommand to run all `kubelet-finalize`
phases.

**kubelet-finalize**
**kubelet-finalize-all**
**kubelet-finalize-enable-client-cert-rotation**

## kubeadm init phase bootstrap-token {#cmd-phase-bootstrap-token}

Use the following phase to configure bootstrap tokens.

**bootstrap-token**

## kubeadm init phase addon {#cmd-phase-addon}

You can install all the available addons with the `all` subcommand, or
install them selectively.

**addon**
**all**
**coredns**
**kube-proxy**

## kubeadm init phase show-join-command {#cmd-phase-show-join-command}

Shows a command that can be used with `kubeadm join`.

**show-join-command**

For more details on each field in the `v1beta4` configuration you can navigate to our
API reference pages.

## What's next

* kubeadm init to bootstrap a Kubernetes control-plane node
* kubeadm join to connect a node to the cluster
* kubeadm reset to revert any changes made to this host by `kubeadm init` or `kubeadm join`
* kubeadm alpha to try experimental functionality
