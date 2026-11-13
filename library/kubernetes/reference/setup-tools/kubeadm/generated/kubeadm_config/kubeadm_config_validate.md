---
title: "kubeadm_config_validate"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/setup-tools/kubeadm/generated/kubeadm_config/kubeadm_config_validate.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# kubeadm_config_validate

Read a file containing the kubeadm configuration API and report any validation problems

### Synopsis

This command lets you validate a kubeadm configuration API file and report any warnings and errors.
If there are no errors the exit status will be zero, otherwise it will be non-zero.
Any unmarshaling problems such as unknown API fields will trigger errors. Unknown API versions and
fields with invalid values will also trigger errors. Any other errors or warnings may be reported
depending on contents of the input file.

In this version of kubeadm, the following API versions are supported:
- kubeadm.k8s.io/v1beta4

```
kubeadm config validate [flags]
```

### Options

 | --allow-deprecated-api

 |  | Allow validation of deprecated APIs.

 | --allow-experimental-api

 |  | Allow validation of experimental, unreleased APIs.

 | --config string

 |  | Path to a kubeadm configuration file.

 | -h, --help

 |  | help for validate

### Options inherited from parent commands

 | --kubeconfig string     Default: "/etc/kubernetes/admin.conf"

 |  | The kubeconfig file to use when talking to the cluster. If the flag is not set, a set of standard locations can be searched for an existing kubeconfig file.

 | --rootfs string

 |  | The path to the 'real' host root filesystem. This will cause kubeadm to chroot into the provided path.
