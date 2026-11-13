---
title: "kubeadm config"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/setup-tools/kubeadm/kubeadm-config.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# kubeadm config

During `kubeadm init`, kubeadm uploads the `ClusterConfiguration` object to your cluster
in a ConfigMap called `kubeadm-config` in the `kube-system` namespace. This configuration is then read during
`kubeadm join`, `kubeadm reset` and `kubeadm upgrade`.

You can use `kubeadm config print` to print the default static configuration that kubeadm
uses for `kubeadm init` and `kubeadm join`.

**Note:**
The output of the command is meant to serve as an example. You must manually edit the output
of this command to adapt to your setup. Remove the fields that you are not certain about and kubeadm
will try to default them on runtime by examining the host.

For more information on `init` and `join` navigate to
Using kubeadm init with a configuration file
or Using kubeadm join with a configuration file.

For more information on using the kubeadm configuration API navigate to
Customizing components with the kubeadm API.

You can use `kubeadm config migrate` to convert your old configuration files that contain a deprecated
API version to a newer, supported API version.

`kubeadm config validate` can be used for validating a configuration file.

`kubeadm config images list` and `kubeadm config images pull` can be used to list and pull the images
that kubeadm requires.

## What's next

* kubeadm upgrade to upgrade a Kubernetes cluster to a newer version
