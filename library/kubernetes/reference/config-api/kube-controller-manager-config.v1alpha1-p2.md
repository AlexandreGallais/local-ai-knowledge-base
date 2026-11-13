---
title: "kube-controller-manager Configuration (v1alpha1) (part 2 of 4)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/config-api/kube-controller-manager-config.v1alpha1.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# kube-controller-manager Configuration (v1alpha1) (part 2 of 4)

## `KubeControllerManagerConfiguration`     {#kubecontrollermanager-config-k8s-io-v1alpha1-KubeControllerManagerConfiguration}

KubeControllerManagerConfiguration contains elements describing kube-controller manager.

 | Field | Description

 | `apiVersion`string | `kubecontrollermanager.config.k8s.io/v1alpha1`

 | `kind`string | `KubeControllerManagerConfiguration`

 | `Generic` [Required]
`GenericControllerManagerConfiguration`

 |
   Generic holds configuration for a generic controller-manager

 | `KubeCloudShared` [Required]
`KubeCloudSharedConfiguration`

 |
   KubeCloudSharedConfiguration holds configuration for shared related features
both in cloud controller manager and kube-controller manager.

 | `AttachDetachController` [Required]
`AttachDetachControllerConfiguration`

 |
   AttachDetachControllerConfiguration holds configuration for
AttachDetachController related features.

 | `CSRSigningController` [Required]
`CSRSigningControllerConfiguration`

 |
   CSRSigningControllerConfiguration holds configuration for
CSRSigningController related features.

 | `DaemonSetController` [Required]
`DaemonSetControllerConfiguration`

 |
   DaemonSetControllerConfiguration holds configuration for DaemonSetController
related features.

 | `DeploymentController` [Required]
`DeploymentControllerConfiguration`

 |
   DeploymentControllerConfiguration holds configuration for
DeploymentController related features.

 | `DisruptionController` [Required]
`DisruptionControllerConfiguration`

 |
   DisruptionControllerConfiguration holds configuration for
DisruptionController related features.

 | `StatefulSetController` [Required]
`StatefulSetControllerConfiguration`

 |
   StatefulSetControllerConfiguration holds configuration for
StatefulSetController related features.

 | `DeprecatedController` [Required]
`DeprecatedControllerConfiguration`

 |
   DeprecatedControllerConfiguration holds configuration for some deprecated
features.

 | `EndpointController` [Required]
`EndpointControllerConfiguration`

 |
   EndpointControllerConfiguration holds configuration for EndpointController
related features.

 | `EndpointSliceController` [Required]
`EndpointSliceControllerConfiguration`

 |
   EndpointSliceControllerConfiguration holds configuration for
EndpointSliceController related features.

 | `EndpointSliceMirroringController` [Required]
`EndpointSliceMirroringControllerConfiguration`

 |
   EndpointSliceMirroringControllerConfiguration holds configuration for
EndpointSliceMirroringController related features.

 | `EphemeralVolumeController` [Required]
`EphemeralVolumeControllerConfiguration`

 |
   EphemeralVolumeControllerConfiguration holds configuration for EphemeralVolumeController
related features.

 | `GarbageCollectorController` [Required]
`GarbageCollectorControllerConfiguration`

 |
   GarbageCollectorControllerConfiguration holds configuration for
GarbageCollectorController related features.

 | `HPAController` [Required]
`HPAControllerConfiguration`

 |
   HPAControllerConfiguration holds configuration for HPAController related features.

 | `JobController` [Required]
`JobControllerConfiguration`

 |
   JobControllerConfiguration holds configuration for JobController related features.

 | `CronJobController` [Required]
`CronJobControllerConfiguration`

 |
   CronJobControllerConfiguration holds configuration for CronJobController related features.

 | `LegacySATokenCleaner` [Required]
`LegacySATokenCleanerConfiguration`

 |
   LegacySATokenCleanerConfiguration holds configuration for LegacySATokenCleaner related features.

 | `NamespaceController` [Required]
`NamespaceControllerConfiguration`

 |
   NamespaceControllerConfiguration holds configuration for NamespaceController
related features.

 | `NodeIPAMController` [Required]
`NodeIPAMControllerConfiguration`

 |
   NodeIPAMControllerConfiguration holds configuration for NodeIPAMController
related features.

 | `NodeLifecycleController` [Required]
`NodeLifecycleControllerConfiguration`

 |
   NodeLifecycleControllerConfiguration holds configuration for
NodeLifecycleController related features.

 | `PersistentVolumeBinderController` [Required]
`PersistentVolumeBinderControllerConfiguration`

 |
   PersistentVolumeBinderControllerConfiguration holds configuration for
PersistentVolumeBinderController related features.

 | `PodGCController` [Required]
`PodGCControllerConfiguration`

 |
   PodGCControllerConfiguration holds configuration for PodGCController
related features.

 | `ReplicaSetController` [Required]
`ReplicaSetControllerConfiguration`

 |
   ReplicaSetControllerConfiguration holds configuration for ReplicaSet related features.

 | `ReplicationController` [Required]
`ReplicationControllerConfiguration`

 |
   ReplicationControllerConfiguration holds configuration for
ReplicationController related features.

 | `ResourceQuotaController` [Required]
`ResourceQuotaControllerConfiguration`

 |
   ResourceQuotaControllerConfiguration holds configuration for
ResourceQuotaController related features.

 | `SAController` [Required]
`SAControllerConfiguration`

 |
   SAControllerConfiguration holds configuration for ServiceAccountController
related features.

 | `ServiceController` [Required]
`ServiceControllerConfiguration`

 |
   ServiceControllerConfiguration holds configuration for ServiceController
related features.

 | `TTLAfterFinishedController` [Required]
`TTLAfterFinishedControllerConfiguration`

 |
   TTLAfterFinishedControllerConfiguration holds configuration for
TTLAfterFinishedController related features.

 | `ValidatingAdmissionPolicyStatusController` [Required]
`ValidatingAdmissionPolicyStatusControllerConfiguration`

 |
   ValidatingAdmissionPolicyStatusControllerConfiguration holds configuration for
ValidatingAdmissionPolicyStatusController related features.

 | `DeviceTaintEvictionController` [Required]
`DeviceTaintEvictionControllerConfiguration`

 |
   DeviceTaintEvictionControllerConfiguration contains elements configuring the device taint eviction controller.

 | `ResourceClaimController` [Required]
`ResourceClaimControllerConfiguration`

 |
   ResourceClaimControllerConfiguration contains elements configuring the resource claim controller.

## `AttachDetachControllerConfiguration`     {#kubecontrollermanager-config-k8s-io-v1alpha1-AttachDetachControllerConfiguration}

**Appears in:**

- KubeControllerManagerConfiguration

AttachDetachControllerConfiguration contains elements describing AttachDetachController.

 | Field | Description

 | `DisableAttachDetachReconcilerSync` [Required]
`bool`

 |
   Reconciler runs a periodic loop to reconcile the desired state of the with
the actual state of the world by triggering attach detach operations.
This flag enables or disables reconcile.  Is false by default, and thus enabled.

 | `ReconcilerSyncLoopPeriod` [Required]
`meta/v1.Duration`

 |
   ReconcilerSyncLoopPeriod is the amount of time the reconciler sync states loop
wait between successive executions. Is set to 60 sec by default.

 | `disableForceDetachOnTimeout` [Required]
`bool`

 |
   DisableForceDetachOnTimeout disables force detach when the maximum unmount
time is exceeded. Is false by default, and thus force detach on unmount is
enabled.

## `CSRSigningConfiguration`     {#kubecontrollermanager-config-k8s-io-v1alpha1-CSRSigningConfiguration}

**Appears in:**

- CSRSigningControllerConfiguration

CSRSigningConfiguration holds information about a particular CSR signer

 | Field | Description

 | `CertFile` [Required]
`string`

 |
   certFile is the filename containing a PEM-encoded
X509 CA certificate used to issue certificates

 | `KeyFile` [Required]
`string`

 |
   keyFile is the filename containing a PEM-encoded
RSA or ECDSA private key used to issue certificates

## `CSRSigningControllerConfiguration`     {#kubecontrollermanager-config-k8s-io-v1alpha1-CSRSigningControllerConfiguration}

**Appears in:**

- KubeControllerManagerConfiguration

CSRSigningControllerConfiguration contains elements describing CSRSigningController.

 | Field | Description

 | `ClusterSigningCertFile` [Required]
`string`

 |
   clusterSigningCertFile is the filename containing a PEM-encoded
X509 CA certificate used to issue cluster-scoped certificates

 | `ClusterSigningKeyFile` [Required]
`string`

 |
   clusterSigningCertFile is the filename containing a PEM-encoded
RSA or ECDSA private key used to issue cluster-scoped certificates

 | `KubeletServingSignerConfiguration` [Required]
`CSRSigningConfiguration`

 |
   kubeletServingSignerConfiguration holds the certificate and key used to issue certificates for the kubernetes.io/kubelet-serving signer

 | `KubeletClientSignerConfiguration` [Required]
`CSRSigningConfiguration`

 |
   kubeletClientSignerConfiguration holds the certificate and key used to issue certificates for the kubernetes.io/kube-apiserver-client-kubelet

 | `KubeAPIServerClientSignerConfiguration` [Required]
`CSRSigningConfiguration`

 |
   kubeAPIServerClientSignerConfiguration holds the certificate and key used to issue certificates for the kubernetes.io/kube-apiserver-client

 | `LegacyUnknownSignerConfiguration` [Required]
`CSRSigningConfiguration`

 |
   legacyUnknownSignerConfiguration holds the certificate and key used to issue certificates for the kubernetes.io/legacy-unknown

 | `ClusterSigningDuration` [Required]
`meta/v1.Duration`

 |
   clusterSigningDuration is the max length of duration signed certificates will be given.
Individual CSRs may request shorter certs by setting spec.expirationSeconds.

## `CronJobControllerConfiguration`     {#kubecontrollermanager-config-k8s-io-v1alpha1-CronJobControllerConfiguration}

**Appears in:**

- KubeControllerManagerConfiguration

CronJobControllerConfiguration contains elements describing CrongJob2Controller.

 | Field | Description

 | `ConcurrentCronJobSyncs` [Required]
`int32`

 |
   concurrentCronJobSyncs is the number of job objects that are
allowed to sync concurrently. Larger number = more responsive jobs,
but more CPU (and network) load.

## `DaemonSetControllerConfiguration`     {#kubecontrollermanager-config-k8s-io-v1alpha1-DaemonSetControllerConfiguration}

**Appears in:**

- KubeControllerManagerConfiguration

DaemonSetControllerConfiguration contains elements describing DaemonSetController.

 | Field | Description

 | `ConcurrentDaemonSetSyncs` [Required]
`int32`

 |
   concurrentDaemonSetSyncs is the number of daemonset objects that are
allowed to sync concurrently. Larger number = more responsive daemonset,
but more CPU (and network) load.

## `DeploymentControllerConfiguration`     {#kubecontrollermanager-config-k8s-io-v1alpha1-DeploymentControllerConfiguration}

**Appears in:**

- KubeControllerManagerConfiguration

DeploymentControllerConfiguration contains elements describing DeploymentController.

 | Field | Description

 | `ConcurrentDeploymentSyncs` [Required]
`int32`

 |
   concurrentDeploymentSyncs is the number of deployment objects that are
allowed to sync concurrently. Larger number = more responsive deployments,
but more CPU (and network) load.

## `DeprecatedControllerConfiguration`     {#kubecontrollermanager-config-k8s-io-v1alpha1-DeprecatedControllerConfiguration}

**Appears in:**

- KubeControllerManagerConfiguration

DeprecatedControllerConfiguration contains elements be deprecated.

## `DeviceTaintEvictionControllerConfiguration`     {#kubecontrollermanager-config-k8s-io-v1alpha1-DeviceTaintEvictionControllerConfiguration}

**Appears in:**

- KubeControllerManagerConfiguration

DeviceTaintEvictionControllerConfiguration contains elements configuring the device taint eviction controller.

 | Field | Description

 | `ConcurrentSyncs` [Required]
`int32`

 |
   ConcurrentSyncs is the number of operations (deleting a pod, updating a ResourcClaim status, etc.)
that will be done concurrently. Larger number = processing, but more CPU (and network) load.
The default is 10.

## `DisruptionControllerConfiguration`     {#kubecontrollermanager-config-k8s-io-v1alpha1-DisruptionControllerConfiguration}

**Appears in:**

- KubeControllerManagerConfiguration

DisruptionControllerConfiguration contains elements describing DisruptionController.

 | Field | Description

 | `ConcurrentDisruptionSyncs` [Required]
`int32`

 |
   concurrentDisruptionSyncs is the number of PodDisruptionBudget objects that
are allowed to sync concurrently. Larger number = more responsive PDB
updates, but more CPU (and network) load.

## `EndpointControllerConfiguration`     {#kubecontrollermanager-config-k8s-io-v1alpha1-EndpointControllerConfiguration}

**Appears in:**

- KubeControllerManagerConfiguration

EndpointControllerConfiguration contains elements describing EndpointController.

 | Field | Description

 | `ConcurrentEndpointSyncs` [Required]
`int32`

 |
   concurrentEndpointSyncs is the number of endpoint syncing operations
that will be done concurrently. Larger number = faster endpoint updating,
but more CPU (and network) load.

 | `EndpointUpdatesBatchPeriod` [Required]
`meta/v1.Duration`

 |
   EndpointUpdatesBatchPeriod describes the length of endpoint updates batching period.
Processing of pod changes will be delayed by this duration to join them with potential
upcoming updates and reduce the overall number of endpoints updates.

## `EndpointSliceControllerConfiguration`     {#kubecontrollermanager-config-k8s-io-v1alpha1-EndpointSliceControllerConfiguration}

**Appears in:**

- KubeControllerManagerConfiguration

EndpointSliceControllerConfiguration contains elements describing
EndpointSliceController.

 | Field | Description

 | `ConcurrentServiceEndpointSyncs` [Required]
`int32`

 |
   concurrentServiceEndpointSyncs is the number of service endpoint syncing
operations that will be done concurrently. Larger number = faster
endpoint slice updating, but more CPU (and network) load.

 | `MaxEndpointsPerSlice` [Required]
`int32`

 |
   maxEndpointsPerSlice is the maximum number of endpoints that will be
added to an EndpointSlice. More endpoints per slice will result in fewer
and larger endpoint slices, but larger resources.

 | `EndpointUpdatesBatchPeriod` [Required]
`meta/v1.Duration`

 |
   EndpointUpdatesBatchPeriod describes the length of endpoint updates batching period.
Processing of pod changes will be delayed by this duration to join them with potential
upcoming updates and reduce the overall number of endpoints updates.
