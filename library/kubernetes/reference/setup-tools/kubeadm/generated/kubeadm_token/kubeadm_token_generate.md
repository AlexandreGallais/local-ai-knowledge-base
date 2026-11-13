---
title: "kubeadm_token_generate"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/setup-tools/kubeadm/generated/kubeadm_token/kubeadm_token_generate.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# kubeadm_token_generate

Generate and print a bootstrap token, but do not create it on the server

### Synopsis

This command will print out a randomly-generated bootstrap token that can be used with
the "init" and "join" commands.

You don't have to use this command in order to generate a token. You can do so
yourself as long as it is in the format "[a-z0-9]{6}.[a-z0-9]{16}". This
command is provided for convenience to generate tokens in the given format.

You can also use "kubeadm init" without specifying a token and it will
generate and print one for you.

```
kubeadm token generate [flags]
```

### Options

 | -h, --help

 |  | help for generate

### Options inherited from parent commands

 | --dry-run

 |  | Whether to enable dry-run mode or not

 | --kubeconfig string     Default: "/etc/kubernetes/admin.conf"

 |  | The kubeconfig file to use when talking to the cluster. If the flag is not set, a set of standard locations can be searched for an existing kubeconfig file.

 | --rootfs string

 |  | The path to the 'real' host root filesystem. This will cause kubeadm to chroot into the provided path.
