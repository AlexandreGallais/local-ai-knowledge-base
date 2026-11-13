---
title: "kubeadm_config_images_pull"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/setup-tools/kubeadm/generated/kubeadm_config/kubeadm_config_images_pull.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# kubeadm_config_images_pull

### Synopsis

Pull images used by kubeadm

```
kubeadm config images pull [flags]
```

### Options

 | --config string

 |  | Path to a kubeadm configuration file.

 | --cri-socket string

 |  | Path to the CRI socket to connect. If empty kubeadm will try to auto-detect this value; use this option only if you have more than one CRI installed or if you have non-standard CRI socket.

 | --feature-gates string

 |  | A set of key=value pairs that describe feature gates for various features. Options are:RootlessControlPlane=true|false (ALPHA - default=false)

 | -h, --help

 |  | help for pull

 | --image-repository string     Default: "registry.k8s.io"

 |  | Choose a container registry to pull control plane images from

 | --kubernetes-version string     Default: "stable-1"

 |  | Choose a specific Kubernetes version for the control plane.

### Options inherited from parent commands

 | --kubeconfig string     Default: "/etc/kubernetes/admin.conf"

 |  | The kubeconfig file to use when talking to the cluster. If the flag is not set, a set of standard locations can be searched for an existing kubeconfig file.

 | --rootfs string

 |  | The path to the 'real' host root filesystem. This will cause kubeadm to chroot into the provided path.
