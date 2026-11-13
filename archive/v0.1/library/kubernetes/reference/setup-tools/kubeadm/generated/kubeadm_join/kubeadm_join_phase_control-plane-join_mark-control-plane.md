---
title: "kubeadm_join_phase_control-plane-join_mark-control-plane"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/setup-tools/kubeadm/generated/kubeadm_join/kubeadm_join_phase_control-plane-join_mark-control-plane.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# kubeadm_join_phase_control-plane-join_mark-control-plane

### Synopsis

Mark a node as a control-plane

```
kubeadm join phase control-plane-join mark-control-plane [flags]
```

### Options

 | --config string

 |  | Path to a kubeadm configuration file.

 | --control-plane

 |  | Create a new control plane instance on this node

 | --dry-run

 |  | Don't apply any changes; just output what would be done.

 | -h, --help

 |  | help for mark-control-plane

 | --node-name string

 |  | Specify the node name.

### Options inherited from parent commands

 | --rootfs string

 |  | The path to the 'real' host root filesystem. This will cause kubeadm to chroot into the provided path.
