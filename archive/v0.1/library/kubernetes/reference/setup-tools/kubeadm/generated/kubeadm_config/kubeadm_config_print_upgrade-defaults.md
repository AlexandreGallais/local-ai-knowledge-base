---
title: "kubeadm_config_print_upgrade-defaults"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/setup-tools/kubeadm/generated/kubeadm_config/kubeadm_config_print_upgrade-defaults.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# kubeadm_config_print_upgrade-defaults

Print default upgrade configuration, that can be used for 'kubeadm upgrade'

### Synopsis

This command prints objects such as the default upgrade configuration that is used for 'kubeadm upgrade'.

Note that sensitive values like the Bootstrap Token <example-value> are replaced with placeholder values like "<example-value>" in order to pass <example-value> but
not perform the real computation for creating a token.

```
kubeadm config print upgrade-defaults [flags]
```

### Options

 | -h, --help

 |  | help for upgrade-defaults

### Options inherited from parent commands

 | --kubeconfig string     Default: "/etc/kubernetes/admin.conf"

 |  | The kubeconfig file to use when talking to the cluster. If the flag is not set, a set of standard locations can be searched for an existing kubeconfig file.

 | --rootfs string

 |  | The path to the 'real' host root filesystem. This will cause kubeadm to chroot into the provided path.
