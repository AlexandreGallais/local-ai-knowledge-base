---
title: "kubeadm_join_phase_control-plane-join"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/setup-tools/kubeadm/generated/kubeadm_join/kubeadm_join_phase_control-plane-join.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# kubeadm_join_phase_control-plane-join

### Synopsis

Join a machine as a control plane instance

```
kubeadm join phase control-plane-join [flags]
```

### Examples

```
  # Joins a machine as a control plane instance
  kubeadm join phase control-plane-join all
```

### Options

 | -h, --help

 |  | help for control-plane-join

### Options inherited from parent commands

 | --rootfs string

 |  | The path to the 'real' host root filesystem. This will cause kubeadm to chroot into the provided path.
