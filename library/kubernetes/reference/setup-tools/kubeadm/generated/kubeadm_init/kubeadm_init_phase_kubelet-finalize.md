---
title: "kubeadm_init_phase_kubelet-finalize"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/setup-tools/kubeadm/generated/kubeadm_init/kubeadm_init_phase_kubelet-finalize.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# kubeadm_init_phase_kubelet-finalize

### Synopsis

Updates settings relevant to the kubelet after TLS bootstrap

```
kubeadm init phase kubelet-finalize [flags]
```

### Examples

```
  # Updates settings relevant to the kubelet after TLS bootstrap
  kubeadm init phase kubelet-finalize all --config
```

### Options

 | -h, --help

 |  | help for kubelet-finalize

### Options inherited from parent commands

 | --rootfs string

 |  | The path to the 'real' host root filesystem. This will cause kubeadm to chroot into the provided path.
