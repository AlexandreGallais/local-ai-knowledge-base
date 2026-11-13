---
title: "kubeadm_init_phase_certs_front-proxy-client"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/setup-tools/kubeadm/generated/kubeadm_init/kubeadm_init_phase_certs_front-proxy-client.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# kubeadm_init_phase_certs_front-proxy-client

### Synopsis

Generate the certificate for the front proxy client, and save them into front-proxy-client.crt and front-proxy-client.key files.

If both files already exist, kubeadm skips the generation step and existing files will be used.

```
kubeadm init phase certs front-proxy-client [flags]
```

### Options

 | --cert-dir string     Default: "/etc/kubernetes/pki"

 |  | The path where to save and store the certificates.

 | --config string

 |  | Path to a kubeadm configuration file.

 | --dry-run

 |  | Don't apply any changes; just output what would be done.

 | -h, --help

 |  | help for front-proxy-client

 | --kubernetes-version string     Default: "stable-1"

 |  | Choose a specific Kubernetes version for the control plane.

### Options inherited from parent commands

 | --rootfs string

 |  | The path to the 'real' host root filesystem. This will cause kubeadm to chroot into the provided path.
