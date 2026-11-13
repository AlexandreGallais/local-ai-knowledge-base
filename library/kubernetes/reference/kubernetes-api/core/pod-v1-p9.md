---
title: "Pod (part 9 of 24)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/kubernetes-api/core/pod-v1.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Pod (part 9 of 24)

## NodeAllocatableOverheadResources {#NodeAllocatableOverheadResources}

NodeAllocatableOverheadResources describes auxiliary overhead resource allocations.

   | Field | Description

       | `name` *string
       | Name is the name of the resource (e.g., cpu, memory).

       | `perContainer`Quantity
       | PerContainer is the variable overhead quantity applied for each container referencing the claim. The container references are recorded in `nodeAllocatableResourceClaimStatuses.containers`. The total overhead quantity allocated for the claim is computed as: Quantity = PerPod + (PerContainer * NumReferences) Kubelet accounts for this overhead in cgroups: - Pod-level cgroup (requests and limits): Kubelet adds PerPod + (PerContainer * NumReferences). - Container-level cgroup (limits only): Kubelet adds PerPod + PerContainer for each referencing container. This allows any single container to access the pod-level overhead, while the parent cgroup caps the total usage to account for PerPod exactly once. At least one of PerPod or PerContainer must be specified. Specifying neither is an invalid configuration.

       | `perPod`Quantity
       | PerPod is the flat overhead quantity allocated per pod. Adding to each container limit allows individual containers to utilize the overhead, while the parent pod-level cgroup limit caps the total usage at the pod boundary where the overhead is accounted for exactly once. At least one of PerPod or PerContainer must be specified. Specifying neither is an invalid configuration.

## NodeAllocatableResourceClaimStatus {#NodeAllocatableResourceClaimStatus}

NodeAllocatableResourceClaimStatus describes the status of node allocatable resources allocated via DRA.

   | Field | Description

       | `containers`string array
       | Containers lists the names of all containers in this pod that reference the claim.

       | `mapping`NodeAllocatableMappedResources arraypatch strategy: merge on key `name`
       | Mapping contains allocations through devices mapped in the device spec's `nodeAllocatableResources[...].mapping` field. This is used by kubelet for pod level and container-level cgroup enforcement.

       | `overhead`NodeAllocatableOverheadResources arraypatch strategy: merge on key `name`
       | Overhead contains allocations through devices mapped in the device spec's `nodeAllocatableResources[...].overhead` field. This is used by kubelet for pod level and container-level cgroup enforcement.

       | `resourceClaimName` *string
       | ResourceClaimName is the resource claim referenced by the pod that resulted in this node allocatable resource allocation.

## ObjectFieldSelector {#ObjectFieldSelector}

ObjectFieldSelector selects an APIVersioned field of an object.

   | Field | Description

       | `apiVersion`string
       | Version of the schema the FieldPath is written in terms of, defaults to "v1".

       | `fieldPath` *string
       | Path of the field to select in the specified API version.

## PersistentVolumeClaimTemplate {#PersistentVolumeClaimTemplate}

PersistentVolumeClaimTemplate is used to produce PersistentVolumeClaim objects as part of an EphemeralVolumeSource.

   | Field | Description

       | `metadata`ObjectMeta
       | May contain labels and annotations that will be copied into the PVC when creating it. No other fields are allowed and will be rejected during validation.

       | `spec` *PersistentVolumeClaimSpec
       | The specification for the PersistentVolumeClaim. The entire content is copied unchanged into the PVC that gets created from this template. The same fields as in a PersistentVolumeClaim are also valid here.

## PersistentVolumeClaimVolumeSource {#PersistentVolumeClaimVolumeSource}

PersistentVolumeClaimVolumeSource references the user's PVC in the same namespace. This volume finds the bound PV and mounts that volume for the pod. A PersistentVolumeClaimVolumeSource is, essentially, a wrapper around another type of volume that is owned by someone else (the system).

   | Field | Description

       | `claimName` *string
       | claimName is the name of a PersistentVolumeClaim in the same namespace as the pod using this volume. More info: https://kubernetes.io/docs/concepts/storage/persistent-volumes#persistentvolumeclaims

       | `readOnly`boolean
       | readOnly Will force the ReadOnly setting in VolumeMounts. Default false.

## PodAffinity {#PodAffinity}

Pod affinity is a group of inter pod affinity scheduling rules.

   | Field | Description

       | `preferredDuringSchedulingIgnoredDuringExecution`WeightedPodAffinityTerm array
       | The scheduler will prefer to schedule pods to nodes that satisfy the affinity expressions specified by this field, but it may choose a node that violates one or more of the expressions. The node that is most preferred is the one with the greatest sum of weights, i.e. for each node that meets all of the scheduling requirements (resource request, requiredDuringScheduling affinity expressions, etc.), compute a sum by iterating through the elements of this field and adding "weight" to the sum if the node has pods which matches the corresponding podAffinityTerm; the node(s) with the highest sum are the most preferred.

       | `requiredDuringSchedulingIgnoredDuringExecution`PodAffinityTerm array
       | If the affinity requirements specified by this field are not met at scheduling time, the pod will not be scheduled onto the node. If the affinity requirements specified by this field cease to be met at some point during pod execution (e.g. due to a pod label update), the system may or may not try to eventually evict the pod from its node. When there are multiple elements, the lists of nodes corresponding to each podAffinityTerm are intersected, i.e. all terms must be satisfied.

## PodAffinityTerm {#PodAffinityTerm}

Defines a set of pods (namely those matching the labelSelector relative to the given namespace(s)) that this pod should be co-located (affinity) or not co-located (anti-affinity) with, where co-located is defined as running on a node whose value of the label with key <topologyKey> matches that of any node on which a pod of the set of pods is running

   | Field | Description

       | `labelSelector`LabelSelector
       | A label query over a set of resources, in this case pods. If it's null, this PodAffinityTerm matches with no Pods.

       | `matchLabelKeys`string array
       | MatchLabelKeys is a set of pod label keys to select which pods will be taken into consideration. The keys are used to lookup values from the incoming pod labels, those key-value labels are merged with `labelSelector` as `key in (value)` to select the group of existing pods which pods will be taken into consideration for the incoming pod's pod (anti) affinity. Keys that don't exist in the incoming pod labels will be ignored. The default value is empty. The same key is forbidden to exist in both matchLabelKeys and labelSelector. Also, matchLabelKeys cannot be set when labelSelector isn't set.

       | `mismatchLabelKeys`string array
       | MismatchLabelKeys is a set of pod label keys to select which pods will be taken into consideration. The keys are used to lookup values from the incoming pod labels, those key-value labels are merged with `labelSelector` as `key notin (value)` to select the group of existing pods which pods will be taken into consideration for the incoming pod's pod (anti) affinity. Keys that don't exist in the incoming pod labels will be ignored. The default value is empty. The same key is forbidden to exist in both mismatchLabelKeys and labelSelector. Also, mismatchLabelKeys cannot be set when labelSelector isn't set.

       | `namespaceSelector`LabelSelector
       | A label query over the set of namespaces that the term applies to. The term is applied to the union of the namespaces selected by this field and the ones listed in the namespaces field. null selector and null or empty namespaces list means "this pod's namespace". An empty selector ({}) matches all namespaces.

       | `namespaces`string array
       | namespaces specifies a static list of namespace names that the term applies to. The term is applied to the union of the namespaces listed in this field and the ones selected by namespaceSelector. null or empty namespaces list and null namespaceSelector means "this pod's namespace".

       | `topologyKey` *string
       | This pod should be co-located (affinity) or not co-located (anti-affinity) with the pods matching the labelSelector in the specified namespaces, where co-located is defined as running on a node whose value of the label with key topologyKey matches that of any node on which any of the selected pods is running. Empty topologyKey is not allowed.

## PodAntiAffinity {#PodAntiAffinity}

Pod anti affinity is a group of inter pod anti affinity scheduling rules.

   | Field | Description

       | `preferredDuringSchedulingIgnoredDuringExecution`WeightedPodAffinityTerm array
       | The scheduler will prefer to schedule pods to nodes that satisfy the anti-affinity expressions specified by this field, but it may choose a node that violates one or more of the expressions. The node that is most preferred is the one with the greatest sum of weights, i.e. for each node that meets all of the scheduling requirements (resource request, requiredDuringScheduling anti-affinity expressions, etc.), compute a sum by iterating through the elements of this field and subtracting "weight" from the sum if the node has pods which matches the corresponding podAffinityTerm; the node(s) with the highest sum are the most preferred.

       | `requiredDuringSchedulingIgnoredDuringExecution`PodAffinityTerm array
       | If the anti-affinity requirements specified by this field are not met at scheduling time, the pod will not be scheduled onto the node. If the anti-affinity requirements specified by this field cease to be met at some point during pod execution (e.g. due to a pod label update), the system may or may not try to eventually evict the pod from its node. When there are multiple elements, the lists of nodes corresponding to each podAffinityTerm are intersected, i.e. all terms must be satisfied.

## PodCertificateProjection {#PodCertificateProjection}

PodCertificateProjection provides a private key and X.509 certificate in the pod filesystem.

   | Field | Description

       | `certificateChainPath`string
       | Write the certificate chain at this path in the projected volume.  Most applications should use credentialBundlePath.  When using keyPath and certificateChainPath, your application needs to check that the key and leaf certificate are consistent, because it is possible to read the files mid-rotation.

       | `credentialBundlePath`string
       | Write the credential bundle at this path in the projected volume.  The credential bundle is a single file that contains multiple PEM blocks. The first PEM block is a PRIVATE KEY block, containing a PKCS#8 private key.  The remaining blocks are CERTIFICATE blocks, containing the issued certificate chain from the signer (leaf and any intermediates).  Using credentialBundlePath lets your Pod's application code make a single atomic read that retrieves a consistent key and certificate chain.  If you project them to separate files, your application code will need to additionally check that the leaf certificate was issued to the key.

       | `keyPath`string
       | Write the key at this path in the projected volume.  Most applications should use credentialBundlePath.  When using keyPath and certificateChainPath, your application needs to check that the key and leaf certificate are consistent, because it is possible to read the files mid-rotation.

       | `keyType` *string
       | The type of keypair Kubelet will generate for the pod.  Valid values are "RSA3072", "RSA4096", "ECDSAP256", "ECDSAP384", "ECDSAP521", and "ED25519".

       | `maxExpirationSeconds`integer
       | maxExpirationSeconds is the maximum lifetime permitted for the certificate.  Kubelet copies this value verbatim into the PodCertificateRequests it generates for this projection.  If omitted, kube-apiserver will set it to 86400(24 hours). kube-apiserver will reject values shorter than 3600 (1 hour).  The maximum allowable value is 7862400 (91 days).  The signer implementation is then free to issue a certificate with any lifetime *shorter* than MaxExpirationSeconds, but no shorter than 3600 seconds (1 hour).  This constraint is enforced by kube-apiserver. `kubernetes.io` signers will never issue certificates with a lifetime longer than 24 hours.

       | `signerName` *string
       | Kubelet's generated CSRs will be addressed to this signer.

       | `user`integer
       | user is Optional: The owner UID of the created file. If specified, the item-level user field takes precedence over defaultUser. (Alpha) This field requires the AtomicWriteVolumeUserFields feature gate to be enabled.

       | `userAnnotations`object
       | userAnnotations allow pod authors to pass additional information to the signer implementation.  Kubernetes does not restrict or validate this metadata in any way.  These values are copied verbatim into the `spec.unverifiedUserAnnotations` field of the PodCertificateRequest objects that Kubelet creates.  Entries are subject to the same validation as object metadata annotations, with the addition that all keys must be domain-prefixed. No restrictions are placed on values, except an overall size limitation on the entire field.  Signers should document the keys and values they support. Signers should deny requests that contain keys they do not recognize.

## PodCondition {#PodCondition}

PodCondition contains details for the current condition of this pod.

   | Field | Description

       | `lastProbeTime`Time
       | Last time we probed the condition.

       | `lastTransitionTime`Time
       | Last time the condition transitioned from one status to another.

       | `message`string
       | Human-readable message indicating details about last transition.

       | `observedGeneration`integer
       | If set, this represents the .metadata.generation that the pod condition was set based upon.

       | `reason`string
       | Unique, one-word, CamelCase reason for the condition's last transition.

       | `status` *string
       | Status is the status of the condition. Can be True, False, Unknown. More info: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle#pod-conditions

       | `type` *string
       | Type is the type of the condition. More info: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle#pod-conditions
