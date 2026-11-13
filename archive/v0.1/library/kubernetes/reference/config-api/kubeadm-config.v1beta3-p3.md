---
title: "kubeadm Configuration (v1beta3) (part 3 of 3)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/config-api/kubeadm-config.v1beta3.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# kubeadm Configuration (v1beta3) (part 3 of 3)

## `LocalEtcd`     {#kubeadm-k8s-io-v1beta3-LocalEtcd}

**Appears in:**

- Etcd

LocalEtcd describes that kubeadm should run an etcd cluster locally.

 | Field | Description

 | `ImageMeta` [Required]
`ImageMeta`

 | (Members of `ImageMeta` are embedded into this type.)
   ImageMeta allows to customize the container image used for etcd.
Passing a custom etcd image tells `kubeadm upgrade` that this image is user-managed
and taht its upgrade must be skipped.

 | `dataDir` [Required]
`string`

 |
   `dataDir` is the directory etcd will place its data.
Defaults to "/var/lib/etcd".

 | `extraArgs`
`map[string]string`

 |
   `extraArgs` are extra arguments provided to the etcd binary when run
inside a static Pod. A key in this map is the flag name as it appears on the
command line except without leading dash(es).

 | `serverCertSANs`
`[]string`

 |
   `serverCertSANs` sets extra Subject Alternative Names (SANs) for the etcd
server signing certificate.

 | `peerCertSANs`
`[]string`

 |
   `peerCertSANs` sets extra Subject Alternative Names (SANs) for the etcd peer
signing certificate.

## `Networking`     {#kubeadm-k8s-io-v1beta3-Networking}

**Appears in:**

- ClusterConfiguration

Networking contains elements describing cluster's networking configuration.

 | Field | Description

 | `serviceSubnet`
`string`

 |
   `serviceSubnet` is the subnet used by Kubernetes Services. Defaults to "10.96.0.0/12".

 | `podSubnet`
`string`

 |
   `podSubnet` is the subnet used by Pods.

 | `dnsDomain`
`string`

 |
   `dnsDomain` is the DNS domain used by Kubernetes Services. Defaults to "cluster.local".

## `NodeRegistrationOptions`     {#kubeadm-k8s-io-v1beta3-NodeRegistrationOptions}

**Appears in:**

- InitConfiguration

- JoinConfiguration

NodeRegistrationOptions holds fields that relate to registering a new control-plane or
node to the cluster, either via `kubeadm init` or `kubeadm join`.

 | Field | Description

 | `name`
`string`

 |
   `name` is the `.metadata.name` field of the Node API object that will be created in this
`kubeadm init` or `kubeadm join` operation.
This field is also used in the `CommonName` field of the kubelet's client certificate to
the API server.
Defaults to the hostname of the node if not provided.

 | `criSocket`
`string`

 |
   `criSocket` is used to retrieve container runtime info.
This information will be annotated to the Node API object, for later re-use.

 | `taints` [Required]
`[]core/v1.Taint`

 |
   `taints` specifies the taints the Node API object should be registered with.
If this field is unset, i.e. nil, it will be defaulted with a control-plane taint for control-plane nodes.
If you don't want to taint your control-plane node, set this field to an empty list,
i.e. `taints: []` in the YAML file. This field is solely used for Node registration.

 | `kubeletExtraArgs`
`map[string]string`

 |
   `kubeletExtraArgs` passes through extra arguments to the kubelet.
The arguments here are passed to the kubelet command line via the environment file
kubeadm writes at runtime for the kubelet to source.
This overrides the generic base-level configuration in the `kubelet-config` ConfigMap.
Flags have higher priority when parsing. These values are local and specific to the node
kubeadm is executing on. A key in this map is the flag name as it appears on the
command line except without leading dash(es).

 | `ignorePreflightErrors`
`[]string`

 |
   `ignorePreflightErrors` provides a list of pre-flight errors to be ignored when
the current node is registered, e.g. `IsPrevilegedUser,Swap`.
Value `all` ignores errors from all checks.

 | `imagePullPolicy`
`core/v1.PullPolicy`

 |
   `imagePullPolicy` specifies the policy for image pulling during kubeadm "init" and
"join" operations.
The value of this field must be one of "Always", "IfNotPresent" or "Never".
If this field is not set, kubeadm will default it to "IfNotPresent", or pull the required
images if not present on the host.

## `Patches`     {#kubeadm-k8s-io-v1beta3-Patches}

**Appears in:**

- InitConfiguration

- JoinConfiguration

Patches contains options related to applying patches to components deployed by kubeadm.

 | Field | Description

 | `directory`
`string`

 |
   `directory` is a path to a directory that contains files named
"targetsuffix.extension".
For example, "kube-apiserver0+merge.yaml" or just "etcd.json". "target" can be one of
"kube-apiserver", "kube-controller-manager", "kube-scheduler", "etcd", "kubeletconfiguration",
"corednsdeployment". "patchtype" can be one of "strategic" "merge" or "json" and
they match the patch formats supported by kubectl.
The default "patchtype" is "strategic". "extension" must be either "json" or "yaml".
"suffix" is an optional string that can be used to determine which patches are applied
first alpha-numerically.
