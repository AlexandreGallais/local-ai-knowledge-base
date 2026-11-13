---
title: "kubeadm_init_phase_kubeconfig_kubelet"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/setup-tools/kubeadm/generated/kubeadm_init/kubeadm_init_phase_kubeconfig_kubelet.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# kubeadm_init_phase_kubeconfig_kubelet

Generate a kubeconfig file for the kubelet to use *only* for cluster bootstrapping purposes

### Synopsis

Generate the kubeconfig file for the kubelet to use and save it to kubelet.conf file.

Please note that this should *only* be used for cluster bootstrapping purposes. After your control plane is up, you should request all kubelet credentials from the CSR API.

```
kubeadm init phase kubeconfig kubelet [flags]
```

### Options

 | --apiserver-advertise-address string

 |  | The IP address the API Server will advertise it's listening on. If not set the default network interface will be used.

 | --apiserver-bind-port int32     Default: 6443

 |  | Port for the API Server to bind to.

 | --cert-dir string     Default: "/etc/kubernetes/pki"

 |  | The path where to save and store the certificates.

 | --config string

 |  | Path to a kubeadm configuration file.

 | --control-plane-endpoint string

 |  | Specify a stable IP address or DNS name for the control plane.

 | --dry-run

 |  | Don't apply any changes; just output what would be done.

 | -h, --help

 |  | help for kubelet

 | --kubeconfig-dir string     Default: "/etc/kubernetes"

 |  | The path where to save the kubeconfig file.

 | --kubernetes-version string     Default: "stable-1"

 |  | Choose a specific Kubernetes version for the control plane.

 | --node-name string

 |  | Specify the node name.

### Options inherited from parent commands

 | --rootfs string

 |  | The path to the 'real' host root filesystem. This will cause kubeadm to chroot into the provided path.
