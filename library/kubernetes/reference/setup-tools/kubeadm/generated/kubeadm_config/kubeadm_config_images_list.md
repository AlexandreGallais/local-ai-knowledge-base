---
title: "kubeadm_config_images_list"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/setup-tools/kubeadm/generated/kubeadm_config/kubeadm_config_images_list.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# kubeadm_config_images_list

### Synopsis

Print a list of images kubeadm will use. The configuration file is used in case any images or image repositories are customized

```
kubeadm config images list [flags]
```

### Options

 | --allow-missing-template-keys     Default: true

 |  | If true, ignore any errors in templates when a field or map key is missing in the template. Only applies to golang and jsonpath output formats.

 | --config string

 |  | Path to a kubeadm configuration file.

 | --feature-gates string

 |  | A set of key=value pairs that describe feature gates for various features. Options are:RootlessControlPlane=true|false (ALPHA - default=false)

 | -h, --help

 |  | help for list

 | --image-repository string     Default: "registry.k8s.io"

 |  | Choose a container registry to pull control plane images from

 | --kubernetes-version string     Default: "stable-1"

 |  | Choose a specific Kubernetes version for the control plane.

 | -o, --output string     Default: "text"

 |  | Output format. One of: text|json|yaml|kyaml|go-template|go-template-file|template|templatefile|jsonpath|jsonpath-as-json|jsonpath-file.

 | --show-managed-fields

 |  | If true, keep the managedFields when printing objects in JSON or YAML format.

### Options inherited from parent commands

 | --kubeconfig string     Default: "/etc/kubernetes/admin.conf"

 |  | The kubeconfig file to use when talking to the cluster. If the flag is not set, a set of standard locations can be searched for an existing kubeconfig file.

 | --rootfs string

 |  | The path to the 'real' host root filesystem. This will cause kubeadm to chroot into the provided path.
