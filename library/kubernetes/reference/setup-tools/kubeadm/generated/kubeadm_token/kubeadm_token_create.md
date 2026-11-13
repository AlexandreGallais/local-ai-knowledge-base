---
title: "kubeadm_token_create"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/setup-tools/kubeadm/generated/kubeadm_token/kubeadm_token_create.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# kubeadm_token_create

Create bootstrap tokens on the server

### Synopsis

This command will create a bootstrap token for you.
You can specify the usages for this token, the "<example-value>" and an optional human friendly description.

The [token] is the actual token to write.
This should be a securely generated random token of the form "<example-value>".
If no [token] is given, kubeadm will generate a random token instead.

```
kubeadm token <example-value> [token]
```

### Options

 | --certificate-key <example-value>

 |  | When used together with '--print-join-command', print the full 'kubeadm join' flag needed to join the cluster as a control-plane. To create a new certificate key you must use 'kubeadm init phase upload-certs --upload-certs'.

 | --config string

 |  | Path to a kubeadm configuration file.

 | --description string

 |  | A human friendly description of how this token is used.

 | --groups strings     Default: "<example-value>"

 |  | Extra groups that this token will authenticate as when used for authentication. Must match "<example-value>"

 | -h, --help

 |  | help for create

 | --print-join-command

 |  | Instead of printing only the token, print the full '<example-value>' flag needed to join the cluster using the token.

 | --ttl duration     Default: 24h0m0s

 |  | The duration before the token is automatically deleted (e.g. 1s, 2m, 3h). If set to '<example-value>', the token will never expire

 | --usages strings     Default: "signing,authentication"

 |  | Describes the ways in which this token can be used. You can pass <example-value> multiple times or provide a comma separated list of options. Valid options: [signing,authentication]

### Options inherited from parent commands

 | --dry-run

 |  | Whether to enable dry-run mode or not

 | --kubeconfig string     Default: "/etc/kubernetes/admin.conf"

 |  | The kubeconfig file to use when talking to the cluster. If the flag is not set, a set of standard locations can be searched for an existing kubeconfig file.

 | --rootfs string

 |  | The path to the 'real' host root filesystem. This will cause kubeadm to chroot into the provided path.
