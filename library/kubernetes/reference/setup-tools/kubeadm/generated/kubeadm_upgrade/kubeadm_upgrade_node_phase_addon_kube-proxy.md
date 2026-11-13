---
title: "kubeadm_upgrade_node_phase_addon_kube-proxy"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/setup-tools/kubeadm/generated/kubeadm_upgrade/kubeadm_upgrade_node_phase_addon_kube-proxy.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# kubeadm_upgrade_node_phase_addon_kube-proxy

### Synopsis

Upgrade the kube-proxy addon

```
kubeadm upgrade node phase addon kube-proxy [flags]
```

### Options

 | --config string

 |  | Path to a kubeadm configuration file.

 | --dry-run

 |  | Do not change any state, just output the actions that would be performed.

 | -h, --help

 |  | help for kube-proxy

 | --kubeconfig string     Default: "/etc/kubernetes/admin.conf"

 |  | The kubeconfig file to use when talking to the cluster. If the flag is not set, a set of standard locations can be searched for an existing kubeconfig file.

 | --patches string

 |  | Path to a directory that contains files named "targetsuffix.extension". For example, "kube-apiserver0+merge.yaml" or just "etcd.json". "target" can be one of "kube-apiserver", "kube-controller-manager", "kube-scheduler", "etcd", "kubeletconfiguration", "corednsdeployment", "kubeproxydaemonset". "patchtype" can be one of "strategic", "merge" or "json" and they match the patch formats supported by kubectl. The default "patchtype" is "strategic". "extension" must be either "json" or "yaml". "suffix" is an optional string that can be used to determine which patches are applied first alpha-numerically.

### Options inherited from parent commands

 | --rootfs string

 |  | The path to the 'real' host root filesystem. This will cause kubeadm to chroot into the provided path.
