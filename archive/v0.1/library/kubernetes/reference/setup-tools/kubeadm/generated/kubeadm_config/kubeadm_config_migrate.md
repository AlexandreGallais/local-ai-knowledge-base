---
title: "kubeadm_config_migrate"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/setup-tools/kubeadm/generated/kubeadm_config/kubeadm_config_migrate.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# kubeadm_config_migrate

Read an older version of the kubeadm configuration API types from a file, and output the similar config object for the newer version

### Synopsis

This command lets you convert configuration objects of older versions to the latest supported version,
locally in the CLI tool without ever touching anything in the cluster.
In this version of kubeadm, the following API versions are supported:
- kubeadm.k8s.io/v1beta4

Further, kubeadm can only write out config of version "kubeadm.k8s.io/v1beta4", but read both types.
So regardless of what version you pass to the --old-config parameter here, the API object will be
read, deserialized, defaulted, converted, validated, and re-serialized when written to stdout or
--new-config if specified.

In other words, the output of this command is what kubeadm actually would read internally if you
submitted this file to "kubeadm init"

```
kubeadm config migrate [flags]
```

### Options

 | --allow-experimental-api

 |  | Allow migration to experimental, unreleased APIs.

 | -h, --help

 |  | help for migrate

 | --new-config string

 |  | Path to the resulting equivalent kubeadm config file using the new API version. Optional, if not specified output will be sent to STDOUT.

 | --old-config string

 |  | Path to the kubeadm config file that is using an old API version and should be converted. This flag is mandatory.

### Options inherited from parent commands

 | --kubeconfig string     Default: "/etc/kubernetes/admin.conf"

 |  | The kubeconfig file to use when talking to the cluster. If the flag is not set, a set of standard locations can be searched for an existing kubeconfig file.

 | --rootfs string

 |  | The path to the 'real' host root filesystem. This will cause kubeadm to chroot into the provided path.
