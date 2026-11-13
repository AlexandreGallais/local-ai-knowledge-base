---
title: "kubeadm_join_phase_control-plane-prepare_download-certs"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/setup-tools/kubeadm/generated/kubeadm_join/kubeadm_join_phase_control-plane-prepare_download-certs.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# kubeadm_join_phase_control-plane-prepare_download-certs

### Synopsis

Download certificates shared among control-plane nodes from the kubeadm-certs Secret

```
kubeadm join phase control-plane-prepare download-certs [api-server-endpoint] [flags]
```

### Options

 | --certificate-key string

 |  | Use this key to decrypt the certificate secrets uploaded by init. The certificate key is a hex encoded string that is an AES key of size 32 bytes.

 | --config string

 |  | Path to a kubeadm configuration file.

 | --control-plane

 |  | Create a new control plane instance on this node

 | --discovery-file string

 |  | For file-based discovery, a file or URL from which to load cluster information.

 | --discovery-token string

 |  | For token-based discovery, the token used to validate cluster information fetched from the API server.

 | --discovery-token-ca-cert-hash strings

 |  | For token-based discovery, validate that the root CA public key matches this hash (format: "<type>:<value>").

 | --discovery-token-unsafe-skip-ca-verification

 |  | For token-based discovery, allow joining without --discovery-token-ca-cert-hash pinning.

 | --dry-run

 |  | Don't apply any changes; just output what would be done.

 | -h, --help

 |  | help for download-certs

 | --tls-bootstrap-token string

 |  | Specify the token used to temporarily authenticate with the Kubernetes Control Plane while joining the node.

 | --token string

 |  | Use this token for both discovery-token and tls-bootstrap-token when those values are not provided.

### Options inherited from parent commands

 | --rootfs string

 |  | The path to the 'real' host root filesystem. This will cause kubeadm to chroot into the provided path.
