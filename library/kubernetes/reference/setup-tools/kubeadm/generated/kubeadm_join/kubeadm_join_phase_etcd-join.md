---
title: "kubeadm_join_phase_etcd-join"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/setup-tools/kubeadm/generated/kubeadm_join/kubeadm_join_phase_etcd-join.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# kubeadm_join_phase_etcd-join

### Synopsis

Join etcd for control plane nodes

```
kubeadm join phase etcd-join [flags]
```

### Examples

```
  # Joins etcd for a control plane instance
  kubeadm join phase control-plane-join-etcd all
```

### Options

 | --apiserver-advertise-address string

 |  | If the node should host a new control plane instance, the IP address the API Server will advertise it's listening on. If not set the default network interface will be used.

 | --config string

 |  | Path to a kubeadm configuration file.

 | --control-plane

 |  | Create a new control plane instance on this node

 | --dry-run

 |  | Don't apply any changes; just output what would be done.

 | -h, --help

 |  | help for etcd-join

 | --node-name string

 |  | Specify the node name.

 | --patches string

 |  | Path to a directory that contains files named "targetsuffix.extension". For example, "kube-apiserver0+merge.yaml" or just "etcd.json". "target" can be one of "kube-apiserver", "kube-controller-manager", "kube-scheduler", "etcd", "kubeletconfiguration", "corednsdeployment", "kubeproxydaemonset". "patchtype" can be one of "strategic", "merge" or "json" and they match the patch formats supported by kubectl. The default "patchtype" is "strategic". "extension" must be either "json" or "yaml". "suffix" is an optional string that can be used to determine which patches are applied first alpha-numerically.

### Options inherited from parent commands

 | --rootfs string

 |  | The path to the 'real' host root filesystem. This will cause kubeadm to chroot into the provided path.
