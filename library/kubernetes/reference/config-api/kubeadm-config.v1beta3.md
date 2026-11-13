---
title: "kubeadm Configuration (v1beta3) (part 1 of 3)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/config-api/kubeadm-config.v1beta3.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

<h2>Overview</h2>
Package v1beta3 defines the v1beta3 version of the kubeadm configuration file format.
This version improves on the v1beta2 format by fixing some minor issues and adding a few new fields.
A list of changes since v1beta2:

The deprecated "ClusterConfiguration.useHyperKubeImage" field has been removed.
Kubeadm no longer supports the hyperkube image.
The "ClusterConfiguration.dns.type" field has been removed since CoreDNS is the only supported
DNS server type by kubeadm.
Include "<example-value>" tags on the fields that hold secrets.
This would result in the field values to be omitted when API structures are printed with klog.
Add "InitConfiguration.skipPhases", "JoinConfiguration.skipPhases" to allow skipping
a list of phases during kubeadm init/join command execution.
Add "InitConfiguration.nodeRegistration.imagePullPolicy" and "JoinConfiguration.nodeRegistration.imagePullPolicy"
to allow specifying the images pull policy during kubeadm "init" and "join".
The value must be one of "Always", "Never" or "IfNotPresent".
"IfNotPresent" is the default, which has been the existing behavior prior to this addition.
Add "InitConfiguration.patches.directory", "JoinConfiguration.patches.directory" to allow
the user to configure a directory from which to take patches for components deployed by kubeadm.
Move the BootstrapToken* API and related utilities out of the "<example-value>" API group to a new group
"<example-value>". The kubeadm API version v1beta3 no longer contains the BootstrapToken* structures.

Migration from old kubeadm config versions

kubeadm v1.15.x and newer can be used to migrate from v1beta1 to v1beta2.
kubeadm v1.22.x and newer no longer support v1beta1 and older APIs, but can be used to migrate v1beta2 to v1beta3.
kubeadm v1.27.x and newer no longer support v1beta2 and older APIs,

<h2>Basics</h2>
The preferred way to configure kubeadm is to pass an YAML configuration file with the `--config` option. Some of the
configuration options defined in the kubeadm config file are also available as command line flags, but only
the most common/simple use case are supported with this approach.
A kubeadm config file could contain multiple configuration types separated using three dashes (`---`).
kubeadm supports the following configuration types:
<pre style="background-color:#fff">apiVersion: kubeadm.k8s.io/v1beta3
kind: InitConfiguration

apiVersion: kubeadm.k8s.io/v1beta3
kind: ClusterConfiguration

apiVersion: kubelet.config.k8s.io/v1beta1
kind: KubeletConfiguration

apiVersion: kubeproxy.config.k8s.io/v1alpha1
kind: KubeProxyConfiguration

apiVersion: kubeadm.k8s.io/v1beta3
kind: JoinConfiguration
</pre>To print the defaults for "init" and "join" actions use the following commands:
<pre style="background-color:#fff">kubeadm config print init-defaults
kubeadm config print join-defaults
</pre>The list of configuration types that must be included in a configuration file depends by the action you are
performing (`init` or `join`) and by the configuration options you are going to use (defaults or advanced
customization).
If some configuration types are not provided, or provided only partially, kubeadm will use default values; defaults
provided by kubeadm includes also enforcing consistency of values across components when required (e.g.
`--cluster-cidr` flag on controller manager and `clusterCIDR` on kube-proxy).
Users are always allowed to override default values, with the only exception of a small subset of setting with
relevance for security (e.g. enforce authorization-mode Node and RBAC on api server).
If the user provides a configuration types that is not expected for the action you are performing, kubeadm will
ignore those types and print a warning.
<h2>Kubeadm init configuration types</h2>
When executing kubeadm init with the `--config` option, the following configuration types could be used:
InitConfiguration, ClusterConfiguration, KubeProxyConfiguration, KubeletConfiguration, but only one
between InitConfiguration and ClusterConfiguration is mandatory.
<pre style="background-color:#fff">apiVersion: kubeadm.k8s.io/v1beta3
kind: InitConfiguration
bootstrapTokens:
  ...
nodeRegistration:
  ...
</pre>The InitConfiguration type should be used to configure runtime settings, that in case of kubeadm init
are the configuration of the bootstrap token and all the setting which are specific to the node where
kubeadm is executed, including:

NodeRegistration, that holds fields that relate to registering the new node to the cluster;
use it to customize the node name, the CRI socket to use or any other settings that should apply to this
node only (e.g. the node ip).

LocalAPIEndpoint, that represents the endpoint of the instance of the API server to be deployed on this node;
use it e.g. to customize the API server advertise address.

<pre style="background-color:#fff">apiVersion: kubeadm.k8s.io/v1beta3
kind: ClusterConfiguration
networking:
  ...
etcd:
  ...
apiServer:
  extraArgs:
    ...
  extraVolumes:
    ...
...
</pre>The ClusterConfiguration type should be used to configure cluster-wide settings,
including settings for:

`networking` that holds configuration for the networking topology of the cluster; use it e.g. to customize
Pod subnet or services subnet.

`etcd`: use it e.g. to customize the local etcd or to configure the API server
for using an external etcd cluster.

kube-apiserver, kube-scheduler, kube-controller-manager configurations; use it to customize control-plane
components by adding customized setting or overriding kubeadm default settings.

<pre style="background-color:#fff">apiVersion: kubeproxy.config.k8s.io/v1alpha1
kind: KubeProxyConfiguration
  ...
</pre>The KubeProxyConfiguration type should be used to change the configuration passed to kube-proxy instances
deployed in the cluster. If this object is not provided or provided only partially, kubeadm applies defaults.
See https://kubernetes.io/docs/reference/command-line-tools-reference/kube-proxy/ or
https://pkg.go.dev/k8s.io/kube-proxy/config/v1alpha1#KubeProxyConfiguration
for kube-proxy official documentation.
<pre style="background-color:#fff">apiVersion: kubelet.config.k8s.io/v1beta1
kind: KubeletConfiguration
  ...
</pre>The KubeletConfiguration type should be used to change the configurations that will be passed to all kubelet instances
deployed in the cluster. If this object is not provided or provided only partially, kubeadm applies defaults.
See https://kubernetes.io/docs/reference/command-line-tools-reference/kubelet/ or
https://pkg.go.dev/k8s.io/kubelet/config/v1beta1#KubeletConfiguration
for kubelet official documentation.
Here is a fully populated example of a single YAML file containing multiple
configuration types to be used during a `kubeadm init` run.
<pre style="background-color:#fff">apiVersion: kubeadm.k8s.io/v1beta3
kind: InitConfiguration
bootstrapTokens:
  - token: &#34;<example-token>&#34;
    description: &#34;kubeadm bootstrap token&#34;
    ttl: &#34;24h&#34;
  - token: &#34;<example-token>&#34;
    description: &#34;another bootstrap token&#34;
    usages:
      - authentication
      - signing
    groups:
      - system:bootstrappers:kubeadm:default-node-token
nodeRegistration:
  name: &#34;ec2-10-100-0-1&#34;
  criSocket: &#34;/var/run/dockershim.sock&#34;
  taints:
    - key: &#34;kubeadmNode&#34;
      value: &#34;someValue&#34;
      effect: &#34;NoSchedule&#34;
  kubeletExtraArgs:
    v: 4
  ignorePreflightErrors:
    - IsPrivilegedUser
  imagePullPolicy: &#34;IfNotPresent&#34;
localAPIEndpoint:
  advertiseAddress: &#34;10.100.0.1&#34;
  bindPort: 6443
certificateKey: &#34;e6a2eb8581237ab72a4f494f30285ec12a9694d750b9785706a83bfcbbbd2204&#34;
skipPhases:
  - addon/kube-proxy
---
apiVersion: kubeadm.k8s.io/v1beta3
kind: ClusterConfiguration
etcd:
  # one of local or external
  local:
    imageRepository: &#34;registry.k8s.io&#34;
    imageTag: &#34;3.2.24&#34;
    dataDir: &#34;/var/lib/etcd&#34;
    extraArgs:
      listen-client-urls: &#34;http://10.100.0.1:2379&#34;
    serverCertSANs:
      -  &#34;ec2-10-100-0-1.compute-1.amazonaws.com&#34;
    peerCertSANs:
      - &#34;10.100.0.1&#34;
  # external:
    # endpoints:
    # - &#34;10.100.0.1:2379&#34;
    # - &#34;10.100.0.2:2379&#34;
    # caFile: &#34;/etcd/kubernetes/pki/etcd/etcd-ca.crt&#34;
    # certFile: &#34;/etcd/kubernetes/pki/etcd/etcd.crt&#34;
    # keyFile: &#34;/etcd/kubernetes/pki/etcd/etcd.key&#34;
networking:
  serviceSubnet: &#34;10.96.0.0/16&#34;
  podSubnet: &#34;10.244.0.0/24&#34;
  dnsDomain: &#34;cluster.local&#34;
kubernetesVersion: &#34;v1.21.0&#34;
controlPlaneEndpoint: &#34;10.100.0.1:6443&#34;
apiServer:
  extraArgs:
    authorization-mode: &#34;Node,RBAC&#34;
  extraVolumes:
    - name: &#34;some-volume&#34;
      hostPath: &#34;/etc/some-path&#34;
      mountPath: &#34;/etc/some-pod-path&#34;
      readOnly: false
      pathType: File
  certSANs:
    - &#34;10.100.1.1&#34;
    - &#34;ec2-10-100-0-1.compute-1.amazonaws.com&#34;
  timeoutForControlPlane: 4m0s
controllerManager:
  extraArgs:
    &#34;node-cidr-mask-size&#34;: &#34;20&#34;
  extraVolumes:
    - name: &#34;some-volume&#34;
      hostPath: &#34;/etc/some-path&#34;
      mountPath: &#34;/etc/some-pod-path&#34;
      readOnly: false
      pathType: File
scheduler:
  extraArgs:
    bind-address: &#34;10.100.0.1&#34;
  extraVolumes:
    - name: &#34;some-volume&#34;
      hostPath: &#34;/etc/some-path&#34;
      mountPath: &#34;/etc/some-pod-path&#34;
      readOnly: false
      pathType: File
certificatesDir: &#34;/etc/kubernetes/pki&#34;
imageRepository: &#34;registry.k8s.io&#34;
clusterName: &#34;example-cluster&#34;
---
apiVersion: kubelet.config.k8s.io/v1beta1
kind: KubeletConfiguration
# kubelet specific options here
---
apiVersion: kubeproxy.config.k8s.io/v1alpha1
kind: KubeProxyConfiguration
# kube-proxy specific options here
</pre><h2>Kubeadm join configuration types</h2>
When executing `kubeadm join` with the `--config` option, the JoinConfiguration type should be provided.
<pre style="background-color:#fff">apiVersion: kubeadm.k8s.io/v1beta3
kind: JoinConfiguration
  ...
</pre>The JoinConfiguration type should be used to configure runtime settings, that in case of `kubeadm join`
are the discovery method used for accessing the cluster info and all the setting which are specific
to the node where kubeadm is executed, including:

`nodeRegistration`, that holds fields that relate to registering the new node to the cluster;
use it to customize the node name, the CRI socket to use or any other settings that should apply to this
node only (e.g. the node ip).

`apiEndpoint`, that represents the endpoint of the instance of the API server to be eventually deployed on this node.

DEPRECATED: v1beta3 is deprecated in favor of v1beta4 and will be removed in a future release,
1.34 or later. Please migrate

## Resource Types

- ClusterConfiguration
- InitConfiguration
- JoinConfiguration

## `BootstrapToken`     {#BootstrapToken}

**Appears in:**

- InitConfiguration

BootstrapToken <example-value> one bootstrap token, stored as a Secret in the cluster

 | Field | Description

 | `token` [Required]
`BootstrapTokenString`

 |
   `token` is used for establishing bidirectional trust between nodes and control-planes.
Used for joining nodes in the cluster.

 | `description`
`string`

 |
   `description` sets a human-friendly message why this token <example-value> and what it's used
for, so other administrators can know its purpose.

 | `ttl`
`meta/v1.Duration`

 |
   `ttl` defines the time to live for this token. Defaults to `24h`.
`expires` and `ttl` are mutually exclusive.

 | `expires`
`meta/v1.Time`

 |
   `expires` specifies the timestamp when this token expires. Defaults to being set
dynamically at runtime based on the `ttl`. `expires` and `ttl` are mutually exclusive.

 | `usages`
`[]string`

 |
   `usages` describes the ways in which this token can be used. Can by default be used
for establishing bidirectional trust, but that can be changed here.

 | `groups`
`[]string`

 |
   `groups` specifies the extra groups that this token will authenticate as when/if
used for authentication

## `BootstrapTokenString`     {#BootstrapTokenString}

**Appears in:**

- BootstrapToken

BootstrapTokenString is a token of the format `<example-token>` that is used
for both validation of the practically of the API server from a joining node's point
of view and as an authentication method for the node in the bootstrap phase of
"<example-value>". This token is and should be short-lived.

 | Field | Description

 | `-` [Required]
`string`

 |
   No description provided.

 | `-` [Required]
`string`

 |
   No description provided.
