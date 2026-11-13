---
title: "kubeadm_init_phase_kubelet-finalize_all"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/setup-tools/kubeadm/generated/kubeadm_init/kubeadm_init_phase_kubelet-finalize_all.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# kubeadm_init_phase_kubelet-finalize_all

### Synopsis

Run all kubelet-finalize phases

```
kubeadm init phase kubelet-finalize all [flags]
```

### Examples

```
  # Updates settings relevant to the kubelet after TLS bootstrap
  kubeadm init phase kubelet-finalize all --config
```

### Options

 | --cert-dir string     Default: "/etc/kubernetes/pki"

 |  | The path where to save and store the certificates.

 | --config string

 |  | Path to a kubeadm configuration file.

 | --dry-run

 |  | Don't apply any changes; just output what would be done.

 | -h, --help

 |  | help for all

### Options inherited from parent commands

 | --rootfs string

 |  | The path to the 'real' host root filesystem. This will cause kubeadm to chroot into the provided path.
