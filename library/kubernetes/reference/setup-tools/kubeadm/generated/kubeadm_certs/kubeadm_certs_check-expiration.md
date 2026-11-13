---
title: "kubeadm_certs_check-expiration"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/setup-tools/kubeadm/generated/kubeadm_certs/kubeadm_certs_check-expiration.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# kubeadm_certs_check-expiration

Check certificates expiration for a Kubernetes cluster

### Synopsis

Checks expiration for the certificates in the local PKI managed by kubeadm.

```
kubeadm certs check-expiration [flags]
```

### Options

 | --allow-missing-template-keys     Default: true

 |  | If true, ignore any errors in templates when a field or map key is missing in the template. Only applies to golang and jsonpath output formats.

 | --cert-dir string     Default: "/etc/kubernetes/pki"

 |  | The path where to save the certificates

 | --config string

 |  | Path to a kubeadm configuration file.

 | -h, --help

 |  | help for check-expiration

 | --kubeconfig string     Default: "/etc/kubernetes/admin.conf"

 |  | The kubeconfig file to use when talking to the cluster. If the flag is not set, a set of standard locations can be searched for an existing kubeconfig file.

 | -o, --output string     Default: "text"

 |  | Output format. One of: text|json|yaml|kyaml|go-template|go-template-file|template|templatefile|jsonpath|jsonpath-as-json|jsonpath-file.

 | --show-managed-fields

 |  | If true, keep the managedFields when printing objects in JSON or YAML format.

### Options inherited from parent commands

 | --rootfs string

 |  | The path to the 'real' host root filesystem. This will cause kubeadm to chroot into the provided path.
