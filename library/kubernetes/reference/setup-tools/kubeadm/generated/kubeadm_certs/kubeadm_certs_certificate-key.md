---
title: "kubeadm_certs_certificate-key"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/setup-tools/kubeadm/generated/kubeadm_certs/kubeadm_certs_certificate-key.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# kubeadm_certs_certificate-key

Generate certificate keys

### Synopsis

This command will print out a secure randomly-generated certificate key that can be used with
the "init" command.

You can also use "kubeadm init --upload-certs" without specifying a certificate key and it will
generate and print one for you.

```
kubeadm certs certificate-key [flags]
```

### Options

 | -h, --help

 |  | help for certificate-key

### Options inherited from parent commands

 | --rootfs string

 |  | The path to the 'real' host root filesystem. This will cause kubeadm to chroot into the provided path.
