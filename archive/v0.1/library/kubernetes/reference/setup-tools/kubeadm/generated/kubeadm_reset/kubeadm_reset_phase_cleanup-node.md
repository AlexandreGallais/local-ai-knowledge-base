---
title: "kubeadm_reset_phase_cleanup-node"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/setup-tools/kubeadm/generated/kubeadm_reset/kubeadm_reset_phase_cleanup-node.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# kubeadm_reset_phase_cleanup-node

### Synopsis

Run cleanup node.

```
kubeadm reset phase cleanup-node [flags]
```

### Options

 | --cert-dir string     Default: "/etc/kubernetes/pki"

 |  | The path to the directory where the certificates are stored. If specified, clean this directory.

 | --cleanup-tmp-dir

 |  | Cleanup the "/etc/kubernetes/tmp" directory

 | --cri-socket string

 |  | Path to the CRI socket to connect. If empty kubeadm will try to auto-detect this value; use this option only if you have more than one CRI installed or if you have non-standard CRI socket.

 | --dry-run

 |  | Don't apply any changes; just output what would be done.

 | -h, --help

 |  | help for cleanup-node

### Options inherited from parent commands

 | --rootfs string

 |  | The path to the 'real' host root filesystem. This will cause kubeadm to chroot into the provided path.
