---
title: "kubeadm_token_delete"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/setup-tools/kubeadm/generated/kubeadm_token/kubeadm_token_delete.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# kubeadm_token_delete

Delete bootstrap tokens on the server

### Synopsis

This command will delete a list of bootstrap tokens for you.

The [token-value] is the full Token of the form "<example-value>" or the
Token ID of the form "<example-value>" to delete.

```
kubeadm token <example-value> [token-value] ...
```

### Options

 | -h, --help

 |  | help for delete

### Options inherited from parent commands

 | --dry-run

 |  | Whether to enable dry-run mode or not

 | --kubeconfig string     Default: "/etc/kubernetes/admin.conf"

 |  | The kubeconfig file to use when talking to the cluster. If the flag is not set, a set of standard locations can be searched for an existing kubeconfig file.

 | --rootfs string

 |  | The path to the 'real' host root filesystem. This will cause kubeadm to chroot into the provided path.
