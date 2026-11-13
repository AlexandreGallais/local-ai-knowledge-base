---
title: "kubeadm_join_phase_control-plane-prepare"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/setup-tools/kubeadm/generated/kubeadm_join/kubeadm_join_phase_control-plane-prepare.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# kubeadm_join_phase_control-plane-prepare

### Synopsis

Prepare the machine for serving a control plane

```
kubeadm join phase control-plane-prepare [flags]
```

### Examples

```
  # Prepares the machine for serving a control plane
  kubeadm join phase control-plane-prepare all
```

### Options

 | -h, --help

 |  | help for control-plane-prepare

### Options inherited from parent commands

 | --rootfs string

 |  | The path to the 'real' host root filesystem. This will cause kubeadm to chroot into the provided path.
