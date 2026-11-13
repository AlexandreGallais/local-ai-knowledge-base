---
title: "kubeadm Configuration (v1beta4) (part 3 of 4)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/config-api/kubeadm-config.v1beta4.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# kubeadm Configuration (v1beta4) (part 3 of 4)

## `ControlPlaneComponent`     {#kubeadm-k8s-io-v1beta4-ControlPlaneComponent}

**Appears in:**

- ClusterConfiguration

- APIServer

ControlPlaneComponent holds settings common to control plane component of the cluster

 | Field | Description

 | `extraArgs`
`[]Arg`

 |
   `extraArgs` is an extra set of flags to pass to the control plane component.
An argument name in this list is the flag name as it appears on the
command line except without leading dash(es). Extra arguments will override existing
default arguments. Duplicate extra arguments are allowed.

 | `extraVolumes`
`[]HostPathMount`

 |
   `extraVolumes` is an extra set of host volumes, mounted to the control plane component.

 | `extraEnvs`
`[]EnvVar`

 |
   `extraEnvs` is an extra set of environment variables to pass to the control plane component.
Environment variables passed using `extraEnvs` will override any existing environment variables,
or `*_proxy` environment variables that kubeadm adds by default.

## `DNS`     {#kubeadm-k8s-io-v1beta4-DNS}

**Appears in:**

- ClusterConfiguration

DNS defines the DNS addon that should be used in the cluster

 | Field | Description

 | `ImageMeta` [Required]
`ImageMeta`

 | (Members of `ImageMeta` are embedded into this type.)
   `imageMeta` allows to customize the image used for the DNS addon.

 | `disabled` [Required]
`bool`

 |
   `disabled` specifies whether to disable this addon in the cluster.

## `Discovery`     {#kubeadm-k8s-io-v1beta4-Discovery}

**Appears in:**

- JoinConfiguration

Discovery specifies the options for the kubelet to use during the TLS Bootstrap process

 | Field | Description

 | `bootstrapToken`
`BootstrapTokenDiscovery`

 |
   `bootstrapToken` is used to set the options for bootstrap token based discovery.
`bootstrapToken` and `file` are mutually exclusive.

 | `file`
`FileDiscovery`

 |
   `file` is used to specify a file or URL to a kubeconfig file from which to load
cluster information. `bootstrapToken` and `file` are mutually exclusive.

 | `tlsBootstrapToken`
`string`

 |
   `tlsBootstrapToken` is a token used for TLS bootstrapping.
If `bootstrapToken` is set, this field is defaulted to `bootstrapToken.token`, but
can be overridden. If `file` is set, this field must be set in case the KubeConfigFile
does not contain any other authentication information.

## `EncryptionAlgorithmType`     {#kubeadm-k8s-io-v1beta4-EncryptionAlgorithmType}

(Alias of `string`)

**Appears in:**

- ClusterConfiguration

EncryptionAlgorithmType can define an asymmetric encryption algorithm type.

## `EnvVar`     {#kubeadm-k8s-io-v1beta4-EnvVar}

**Appears in:**

- ControlPlaneComponent

- LocalEtcd

EnvVar represents an environment variable present in a Container.

 | Field | Description

 | `EnvVar` [Required]
`core/v1.EnvVar`

 | (Members of `EnvVar` are embedded into this type.)
   No description provided.

## `Etcd`     {#kubeadm-k8s-io-v1beta4-Etcd}

**Appears in:**

- ClusterConfiguration

Etcd contains elements describing Etcd configuration.

 | Field | Description

 | `local`
`LocalEtcd`

 |
   `local` provides configuration knobs for configuring the local etcd instance.
`local` and `external` are mutually exclusive.

 | `external`
`ExternalEtcd`

 |
   `external` describes how to connect to an external etcd cluster.
`local` and `external` are mutually exclusive.

## `ExternalEtcd`     {#kubeadm-k8s-io-v1beta4-ExternalEtcd}

**Appears in:**

- Etcd

ExternalEtcd describes an external etcd cluster.
Kubeadm has no knowledge of where certificate files live and they must be supplied.

 | Field | Description

 | `endpoints` [Required]
`[]string`

 |
   `endpoints` contains the list of etcd members.
This specifies the client URLs (usually gRPC endpoints) for etcd communication.
By default, these endpoints handle both gRPC traffic (primary etcd protocol)
and HTTP traffic (metrics, health checks). However, if `httpEndpoints` is configured,
the gRPC and HTTP traffic can be separated for better security and performance.
Corresponds to etcd's `--listen-client-urls` configuration.

 | `httpEndpoints`
`[]string`

 |
   `httpEndpoints` are the dedicated HTTP endpoints for etcd communication.
When configured, HTTP traffic (such as `/metics` and `/health` endpoints) is separated
from the gRPC traffic handled by `endpoints`. This separation allows for better
access control, as HTTP endpoints can be exposed without exposing the primary gRPC interface.
Corresponds to etcd's `--listen-client-http-urls` configuration.
If not provided, `endpoints` will be used for both gRPC and HTTP traffic.

 | `caFile` [Required]
`string`

 |
   `caFile` is an SSL Certificate Authority (CA) file used to secure etcd communication.
Required if using a TLS connection.

 | `certFile` [Required]
`string`

 |
   `certFile` is an SSL certification file used to secure etcd communication.
Required if using a TLS connection.

 | `keyFile` [Required]
`string`

 |
   `keyFile` is an SSL key file used to secure etcd communication.
Required if using a TLS connection.

## `FileDiscovery`     {#kubeadm-k8s-io-v1beta4-FileDiscovery}

**Appears in:**

- Discovery

FileDiscovery is used to specify a file or URL to a kubeconfig file from which to load
cluster information.

 | Field | Description

 | `kubeConfigPath` [Required]
`string`

 |
   `kubeConfigPath` is used to specify the actual file path or URL to the kubeconfig
file from which to load cluster information.

## `HostPathMount`     {#kubeadm-k8s-io-v1beta4-HostPathMount}

**Appears in:**

- ControlPlaneComponent

HostPathMount contains elements describing volumes that are mounted from the host.

 | Field | Description

 | `name` [Required]
`string`

 |
   `name` is the name of the volume inside the Pod template.

 | `hostPath` [Required]
`string`

 |
   `hostPath` is the path in the host that will be mounted inside the Pod.

 | `mountPath` [Required]
`string`

 |
   `mountPath` is the path inside the Pod where `hostPath` will be mounted.

 | `readOnly`
`bool`

 |
   `readOnly` controls write access to the volume.

 | `pathType`
`core/v1.HostPathType`

 |
   `pathType` is the type of the `hostPath`.

## `ImageMeta`     {#kubeadm-k8s-io-v1beta4-ImageMeta}

**Appears in:**

- DNS

- LocalEtcd

ImageMeta allows to customize the image used for components that are not
originated from the Kubernetes/Kubernetes release process

 | Field | Description

 | `imageRepository`
`string`

 |
   `imageRepository` sets the container registry to pull images from.
if not set, the `imageRepository` defined in ClusterConfiguration will be used instead.

 | `imageTag`
`string`

 |
   `imageTag` allows to specify a tag for the image.
In case this value is set, kubeadm does not change automatically the version of
the above components during upgrades.

## `JoinControlPlane`     {#kubeadm-k8s-io-v1beta4-JoinControlPlane}

**Appears in:**

- JoinConfiguration

JoinControlPlane contains elements describing an additional control plane instance to be deployed on the joining node.

 | Field | Description

 | `localAPIEndpoint`
`APIEndpoint`

 |
   `localAPIEndpoint` represents the endpoint of the API server instance to be
deployed on this node.

 | `certificateKey`
`string`

 |
   `certificateKey` is the key that is used for decryption of certificates after
they are downloaded from the Secret upon joining a new control plane node.
The corresponding encryption key is in the InitConfiguration.
The certificate key is a hex encoded string that is an AES key of size 32 bytes.

## `LocalEtcd`     {#kubeadm-k8s-io-v1beta4-LocalEtcd}

**Appears in:**

- Etcd

LocalEtcd describes that kubeadm should run an etcd cluster locally.

 | Field | Description

 | `ImageMeta` [Required]
`ImageMeta`

 | (Members of `ImageMeta` are embedded into this type.)
   ImageMeta allows to customize the container image used for etcd.
Passing a custom etcd image tells `kubeadm upgrade` that this image is user-managed
and that its upgrade must be skipped.

 | `dataDir` [Required]
`string`

 |
   `dataDir` is the directory etcd will place its data.
Defaults to "/var/lib/etcd".

 | `extraArgs` [Required]
`[]Arg`

 |
   `extraArgs` are extra arguments provided to the etcd binary when run
inside a static Pod. An argument name in this list is the flag name as
it appears on the command line except without leading dash(es).
Extra arguments will override existing default arguments.
Duplicate extra arguments are allowed.

 | `extraEnvs`
`[]EnvVar`

 |
   `extraEnvs` is an extra set of environment variables to pass to the
control plane component. Environment variables passed using `extraEnvs`
will override any existing environment variables, or `*_proxy` environment
variables that kubeadm adds by default.

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

## `Networking`     {#kubeadm-k8s-io-v1beta4-Networking}

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
   `dnsDomain` is the dns domain used by Kubernetes Services. Defaults to "cluster.local".

## `NodeRegistrationOptions`     {#kubeadm-k8s-io-v1beta4-NodeRegistrationOptions}

**Appears in:**

- InitConfiguration

- JoinConfiguration

NodeRegistrationOptions holds fields that relate to registering a new control-plane or
node to the cluster, either via `kubeadm init` or `kubeadm join`.

 | Field | Description

 | `name`
`string`

 |
   `name` is the `.Metadata.Name` field of the Node API object that will be created in this
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
`[]Arg`

 |
   `kubeletExtraArgs` passes through extra arguments to the kubelet.
The arguments here are passed to the kubelet command line via the environment file
kubeadm writes at runtime for the kubelet to source.
This overrides the generic base-level configuration in the `kubelet-config` ConfigMap.
Flags have higher priority when parsing. These values are local and specific to the node
kubeadm is executing on. An argument name in this list is the flag name as it appears on the
command line except without leading dash(es). Extra arguments will override existing
default arguments. Duplicate extra arguments are allowed.

 | `ignorePreflightErrors`
`[]string`

 |
   `ignorePreflightErrors` provides a slice of pre-flight errors to be ignored when
the current node is registered, e.g. 'IsPrivilegedUser,Swap'.
Value 'all' ignores errors from all checks.

 | `imagePullPolicy`
`core/v1.PullPolicy`

 |
   `imagePullPolicy` specifies the policy for image pulling during kubeadm `init` and
`join` operations.
The value of this field must be one of "Always", "IfNotPresent" or "Never".
If this field is unset kubeadm will default it to "IfNotPresent", or pull the required
images if not present on the host.

 | `imagePullSerial`
`bool`

 |
   `imagePullSerial` specifies if image pulling performed by kubeadm must be done serially or in parallel.
Default: true

## `Patches`     {#kubeadm-k8s-io-v1beta4-Patches}

**Appears in:**

- InitConfiguration

- JoinConfiguration

- UpgradeApplyConfiguration

- UpgradeNodeConfiguration

Patches contains options related to applying patches to components deployed by kubeadm.

 | Field | Description

 | `directory`
`string`

 |
   `directory` is a path to a directory that contains files named
"targetsuffix.extension".
For example, "kube-apiserver0+merge.yaml" or just "etcd.json". "target" can be one of
"kube-apiserver", "kube-controller-manager", "kube-scheduler", "etcd", "kubeletconfiguration",
"corednsdeployment".
"patchtype" can be one of "strategic", "merge" or "json" and they match the patch formats
supported by kubectl.
The default "patchtype" is "strategic". "extension" must be either "json" or "yaml".
"suffix" is an optional string that can be used to determine which patches are applied
first alpha-numerically.

## `Proxy`     {#kubeadm-k8s-io-v1beta4-Proxy}

**Appears in:**

- ClusterConfiguration

Proxy defines the proxy addon that should be used in the cluster.

 | Field | Description

 | `disabled` [Required]
`bool`

 |
   `disabled` specifies whether to disable this addon in the cluster.

## `Timeouts`     {#kubeadm-k8s-io-v1beta4-Timeouts}

**Appears in:**

- InitConfiguration

- JoinConfiguration

- ResetConfiguration

- UpgradeConfiguration

Timeouts holds various timeouts that apply to kubeadm commands.

 | Field | Description

 | `controlPlaneComponentHealthCheck`
`meta/v1.Duration`

 |
   `controlPlaneComponentHealthCheck` is the amount of time to wait for a control plane
component, such as the API server, to be healthy during `kubeadm init` and `kubeadm join`.
Default: 4m

 | `kubeletHealthCheck`
`meta/v1.Duration`

 |
   `kubeletHealthCheck` is the amount of time to wait for the kubelet to be healthy
during `kubeadm init` and `kubeadm join`.
Default: 4m

 | `kubernetesAPICall`
`meta/v1.Duration`

 |
   `kubernetesAPICall` is the amount of time to wait for the kubeadm client to complete a request to
the API server. This applies to all types of methods (GET, POST, etc).
Default: 1m

 | `etcdAPICall`
`meta/v1.Duration`

 |
   `etcdAPICall` is the amount of time to wait for the kubeadm etcd client to complete a request to
the etcd cluster.
Default: 2m

 | `tlsBootstrap`
`meta/v1.Duration`

 |
   `tlsBootstrap` is the amount of time to wait for the kubelet to complete TLS bootstrap
for a joining node.
Default: 5m

 | `discovery`
`meta/v1.Duration`

 |
   `discovery` is the amount of time to wait for kubeadm to validate the API server identity
for a joining node.
Default: 5m

 | `upgradeManifests` [Required]
`meta/v1.Duration`

 |
   `upgradeManifests` is the timeout for upgrading static Pod manifests
Default: 5m
