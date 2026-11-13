---
title: "kubeadm_config_print_reset-defaults"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/setup-tools/kubeadm/generated/kubeadm_config/kubeadm_config_print_reset-defaults.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# kubeadm_config_print_reset-defaults

Print default reset configuration, that can be used for 'kubeadm reset'

### Synopsis

This command prints objects such as the default reset configuration that is used for 'kubeadm reset'.

Note that sensitive values like the Bootstrap Token <example-value> are replaced with placeholder values like "<example-value>" in order to pass <example-value> but
not perform the real computation for creating a token.

```
kubeadm config print reset-defaults [flags]
```

### Options

 | -h, --help

 |  | help for reset-defaults

### Options inherited from parent commands

 | --kubeconfig string     Default: "/etc/kubernetes/admin.conf"

 |  | The kubeconfig file to use when talking to the cluster. If the flag is not set, a set of standard locations can be searched for an existing kubeconfig file.

 | --rootfs string

 |  | The path to the 'real' host root filesystem. This will cause kubeadm to chroot into the provided path.
