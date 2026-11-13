---
title: "kube-controller-manager Configuration (v1alpha1) (part 4 of 4)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/config-api/kube-controller-manager-config.v1alpha1.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# kube-controller-manager Configuration (v1alpha1) (part 4 of 4)

## `SAControllerConfiguration`     {#kubecontrollermanager-config-k8s-io-v1alpha1-SAControllerConfiguration}

**Appears in:**

- KubeControllerManagerConfiguration

SAControllerConfiguration contains elements describing ServiceAccountController.

 | Field | Description

 | `ServiceAccountKeyFile` [Required]
`string`

 |
   serviceAccountKeyFile is the filename containing a PEM-encoded private RSA key
used to sign service account tokens.

 | `ConcurrentSATokenSyncs` [Required]
`int32`

 |
   concurrentSATokenSyncs is the number of service account token syncing operations
that will be done concurrently.

 | `RootCAFile` [Required]
`string`

 |
   rootCAFile is the root certificate authority will be included in service
account's token secret. This must be a valid PEM-encoded CA bundle.

## `StatefulSetControllerConfiguration`     {#kubecontrollermanager-config-k8s-io-v1alpha1-StatefulSetControllerConfiguration}

**Appears in:**

- KubeControllerManagerConfiguration

StatefulSetControllerConfiguration contains elements describing StatefulSetController.

 | Field | Description

 | `ConcurrentStatefulSetSyncs` [Required]
`int32`

 |
   concurrentStatefulSetSyncs is the number of statefulset objects that are
allowed to sync concurrently. Larger number = more responsive statefulsets,
but more CPU (and network) load.

## `TTLAfterFinishedControllerConfiguration`     {#kubecontrollermanager-config-k8s-io-v1alpha1-TTLAfterFinishedControllerConfiguration}

**Appears in:**

- KubeControllerManagerConfiguration

TTLAfterFinishedControllerConfiguration contains elements describing TTLAfterFinishedController.

 | Field | Description

 | `ConcurrentTTLSyncs` [Required]
`int32`

 |
   concurrentTTLSyncs is the number of TTL-after-finished collector workers that are
allowed to sync concurrently.

## `ValidatingAdmissionPolicyStatusControllerConfiguration`     {#kubecontrollermanager-config-k8s-io-v1alpha1-ValidatingAdmissionPolicyStatusControllerConfiguration}

**Appears in:**

- KubeControllerManagerConfiguration

ValidatingAdmissionPolicyStatusControllerConfiguration contains elements describing ValidatingAdmissionPolicyStatusController.

 | Field | Description

 | `ConcurrentPolicySyncs` [Required]
`int32`

 |
   ConcurrentPolicySyncs is the number of policy objects that are
allowed to sync concurrently. Larger number = quicker type checking,
but more CPU (and network) load.
The default value is 5.

## `VolumeConfiguration`     {#kubecontrollermanager-config-k8s-io-v1alpha1-VolumeConfiguration}

**Appears in:**

- PersistentVolumeBinderControllerConfiguration

VolumeConfiguration contains all enumerated flags meant to configure all volume
plugins. From this config, the controller-manager binary will create many instances of
volume.VolumeConfig, each containing only the configuration needed for that plugin which
are then passed to the appropriate plugin. The ControllerManager binary is the only part
of the code which knows what plugins are supported and which flags correspond to each plugin.

 | Field | Description

 | `EnableHostPathProvisioning` [Required]
`bool`

 |
   enableHostPathProvisioning enables HostPath PV provisioning when running without a
cloud provider. This allows testing and development of provisioning features. HostPath
provisioning is not supported in any way, won't work in a multi-node cluster, and
should not be used for anything other than testing or development.

 | `EnableDynamicProvisioning` [Required]
`bool`

 |
   enableDynamicProvisioning enables the provisioning of volumes when running within an environment
that supports dynamic provisioning. Defaults to true.

 | `PersistentVolumeRecyclerConfiguration` [Required]
`PersistentVolumeRecyclerConfiguration`

 |
   persistentVolumeRecyclerConfiguration holds configuration for persistent volume plugins.

 | `FlexVolumePluginDir` [Required]
`string`

 |
   volumePluginDir is the full path of the directory in which the flex
volume plugin should search for additional third party volume plugins
