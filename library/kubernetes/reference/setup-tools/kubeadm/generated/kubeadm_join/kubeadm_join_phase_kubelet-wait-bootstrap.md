---
title: "kubeadm_join_phase_kubelet-wait-bootstrap"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/setup-tools/kubeadm/generated/kubeadm_join/kubeadm_join_phase_kubelet-wait-bootstrap.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# kubeadm_join_phase_kubelet-wait-bootstrap

### Synopsis

Wait for the kubelet to bootstrap itself

```
kubeadm join phase kubelet-wait-bootstrap [flags]
```

### Options

 | --config string

 |  | Path to a kubeadm configuration file.

 | --cri-socket string

 |  | Path to the CRI socket to connect. If empty kubeadm will try to auto-detect this value; use this option only if you have more than one CRI installed or if you have non-standard CRI socket.

 | --dry-run

 |  | Don't apply any changes; just output what would be done.

 | -h, --help

 |  | help for kubelet-wait-bootstrap

### Options inherited from parent commands

 | --rootfs string

 |  | The path to the 'real' host root filesystem. This will cause kubeadm to chroot into the provided path.
