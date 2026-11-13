---
title: "kubeadm_init_phase_mark-control-plane"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/setup-tools/kubeadm/generated/kubeadm_init/kubeadm_init_phase_mark-control-plane.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# kubeadm_init_phase_mark-control-plane

### Synopsis

Mark a node as a control-plane

```
kubeadm init phase mark-control-plane [flags]
```

### Examples

```
  # Applies control-plane label and taint to the current node, functionally equivalent to what executed by kubeadm init.
  kubeadm init phase mark-control-plane --config config.yaml
  
  # Applies control-plane label and taint to a specific node
  kubeadm init phase mark-control-plane --node-name myNode
```

### Options

 | --config string

 |  | Path to a kubeadm configuration file.

 | --dry-run

 |  | Don't apply any changes; just output what would be done.

 | -h, --help

 |  | help for mark-control-plane

 | --node-name string

 |  | Specify the node name.

### Options inherited from parent commands

 | --rootfs string

 |  | The path to the 'real' host root filesystem. This will cause kubeadm to chroot into the provided path.
