---
title: "kubeadm_config_print_init-defaults"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/setup-tools/kubeadm/generated/kubeadm_config/kubeadm_config_print_init-defaults.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# kubeadm_config_print_init-defaults

Print default init configuration, that can be used for 'kubeadm init'

### Synopsis

This command prints objects such as the default init configuration that is used for 'kubeadm init'.

Note that sensitive values like the Bootstrap Token fields are replaced with placeholder values like "abcdef.0123456789abcdef" in order to pass validation but
not perform the real computation for creating a token.

```
kubeadm config print init-defaults [flags]
```

### Options

 | --component-configs strings

 |  | A comma-separated list for component config API objects to print the default values for. Available values: [KubeProxyConfiguration KubeletConfiguration]. If this flag is not set, no component configs will be printed.

 | -h, --help

 |  | help for init-defaults

### Options inherited from parent commands

 | --kubeconfig string     Default: "/etc/kubernetes/admin.conf"

 |  | The kubeconfig file to use when talking to the cluster. If the flag is not set, a set of standard locations can be searched for an existing kubeconfig file.

 | --rootfs string

 |  | The path to the 'real' host root filesystem. This will cause kubeadm to chroot into the provided path.
