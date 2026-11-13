---
title: "kubeadm_join_phase_kubelet-start"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/setup-tools/kubeadm/generated/kubeadm_join/kubeadm_join_phase_kubelet-start.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# kubeadm_join_phase_kubelet-start

Write kubelet settings, certificates and (re)start the kubelet

### Synopsis

Write a file with KubeletConfiguration and an environment file with node specific kubelet settings, and then (re)start kubelet.

```
kubeadm join phase kubelet-start [api-server-endpoint] [flags]
```

### Options

 | --config string

 |  | Path to a kubeadm configuration file.

 | --cri-socket string

 |  | Path to the CRI socket to connect. If empty kubeadm will try to auto-detect this value; use this option only if you have more than one CRI installed or if you have non-standard CRI socket.

 | --discovery-file string

 |  | For file-based discovery, a file or URL from which to load cluster information.

 | --discovery-token string

 |  | For token-based discovery, the token used to validate cluster information fetched from the API server.

 | --discovery-token-ca-cert-hash strings

 |  | For token-based discovery, validate that the root CA public key matches this hash (format: "<type>:<value>").

 | --discovery-token-unsafe-skip-ca-verification

 |  | For token-based discovery, allow joining without --discovery-token-ca-cert-hash pinning.

 | --dry-run

 |  | Don't apply any changes; just output what would be done.

 | -h, --help

 |  | help for kubelet-start

 | --node-name string

 |  | Specify the node name.

 | --patches string

 |  | Path to a directory that contains files named "targetsuffix.extension". For example, "kube-apiserver0+merge.yaml" or just "etcd.json". "target" can be one of "kube-apiserver", "kube-controller-manager", "kube-scheduler", "etcd", "kubeletconfiguration", "corednsdeployment", "kubeproxydaemonset". "patchtype" can be one of "strategic", "merge" or "json" and they match the patch formats supported by kubectl. The default "patchtype" is "strategic". "extension" must be either "json" or "yaml". "suffix" is an optional string that can be used to determine which patches are applied first alpha-numerically.

 | --tls-bootstrap-token string

 |  | Specify the token used to temporarily authenticate with the Kubernetes Control Plane while joining the node.

 | --token string

 |  | Use this token for both discovery-token and tls-bootstrap-token when those values are not provided.

### Options inherited from parent commands

 | --rootfs string

 |  | The path to the 'real' host root filesystem. This will cause kubeadm to chroot into the provided path.
