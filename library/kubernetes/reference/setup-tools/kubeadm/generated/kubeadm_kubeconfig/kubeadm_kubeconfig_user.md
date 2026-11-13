---
title: "kubeadm_kubeconfig_user"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/setup-tools/kubeadm/generated/kubeadm_kubeconfig/kubeadm_kubeconfig_user.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# kubeadm_kubeconfig_user

### Synopsis

Output a kubeconfig file for an additional user.

```
kubeadm kubeconfig user [flags]
```

### Examples

```
  # Output a kubeconfig file for an additional user named foo
  kubeadm kubeconfig user --client-name=foo
  
  # Output a kubeconfig file for an additional user named foo using a kubeadm config file bar
  kubeadm kubeconfig user --client-name=foo --config=bar
```

### Options

 | --client-name string

 |  | The name of user. It will be used as the CN if client certificates are created

 | --config string

 |  | Path to a kubeadm configuration file.

 | -h, --help

 |  | help for user

 | --org strings

 |  | The organizations of the client certificate. It will be used as the O if client certificates are created

 | --token <example-value>

 |  | The token that should be used as the authentication mechanism for this kubeconfig, instead of client certificates

 | --validity-period duration     Default: 8760h0m0s

 |  | The validity period of the client certificate. It is an offset from the current time.

### Options inherited from parent commands

 | --rootfs string

 |  | The path to the 'real' host root filesystem. This will cause kubeadm to chroot into the provided path.
