---
title: "kubeadm_init_phase_certs_all"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/setup-tools/kubeadm/generated/kubeadm_init/kubeadm_init_phase_certs_all.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# kubeadm_init_phase_certs_all

### Synopsis

Generate all certificates

```
kubeadm init phase certs all [flags]
```

### Options

 | --apiserver-advertise-address string

 |  | The IP address the API Server will advertise it's listening on. If not set the default network interface will be used.

 | --apiserver-cert-extra-sans strings

 |  | Optional extra Subject Alternative Names (SANs) to use for the API Server serving certificate. Can be both IP addresses and DNS names.

 | --cert-dir string     Default: "/etc/kubernetes/pki"

 |  | The path where to save and store the certificates.

 | --config string

 |  | Path to a kubeadm configuration file.

 | --control-plane-endpoint string

 |  | Specify a stable IP address or DNS name for the control plane.

 | --dry-run

 |  | Don't apply any changes; just output what would be done.

 | -h, --help

 |  | help for all

 | --kubernetes-version string     Default: "stable-1"

 |  | Choose a specific Kubernetes version for the control plane.

 | --service-cidr string     Default: "10.96.0.0/12"

 |  | Use alternative range of IP address for service VIPs.

 | --service-dns-domain string     Default: "cluster.local"

 |  | Use alternative domain for services, e.g. "myorg.internal".

### Options inherited from parent commands

 | --rootfs string

 |  | The path to the 'real' host root filesystem. This will cause kubeadm to chroot into the provided path.
