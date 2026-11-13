---
title: "Pod (part 10 of 24)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/kubernetes-api/core/pod-v1.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Pod (part 10 of 24)

## PodDNSConfig {#PodDNSConfig}

PodDNSConfig defines the DNS parameters of a pod in addition to those generated from DNSPolicy.

   | Field | Description

       | `nameservers`string array
       | A list of DNS name server IP addresses. This will be appended to the base nameservers generated from DNSPolicy. Duplicated nameservers will be removed.

       | `options`PodDNSConfigOption array
       | A list of DNS resolver options. This will be merged with the base options generated from DNSPolicy. Duplicated entries will be removed. Resolution options given in Options will override those that appear in the base DNSPolicy.

       | `searches`string array
       | A list of DNS search domains for host-name lookup. This will be appended to the base search paths generated from DNSPolicy. Duplicated search paths will be removed.

## PodDNSConfigOption {#PodDNSConfigOption}

PodDNSConfigOption defines DNS resolver options of a pod.

   | Field | Description

       | `name`string
       | Name is this DNS resolver option's name. Required.

       | `value`string
       | Value is this DNS resolver option's value.

## PodExtendedResourceClaimStatus {#PodExtendedResourceClaimStatus}

PodExtendedResourceClaimStatus is stored in the PodStatus for the extended resource requests backed by DRA. It stores the generated name for the corresponding special ResourceClaim created by the scheduler.

   | Field | Description

       | `requestMappings` *ContainerExtendedResourceRequest array
       | RequestMappings identifies the mapping of \<container, extended resource backed by DRA> to  device request in the generated ResourceClaim.

       | `resourceClaimName` *string
       | ResourceClaimName is the name of the ResourceClaim that was generated for the Pod in the namespace of the Pod.

## PodIP {#PodIP}

PodIP represents a single IP address allocated to the pod.

   | Field | Description

       | `ip` *string
       | IP is the IP address assigned to the pod

## PodOS {#PodOS}

PodOS defines the OS parameters of a pod.

   | Field | Description

       | `name` *string
       | Name is the name of the operating system. The currently supported values are linux and windows. Additional value may be defined in future and can be one of: https://github.com/opencontainers/runtime-spec/blob/master/config.md#platform-specific-configuration Clients should expect to handle additional values and treat unrecognized values in this field as os: null

## PodReadinessGate {#PodReadinessGate}

PodReadinessGate contains the reference to a pod condition

   | Field | Description

       | `conditionType` *string
       | ConditionType refers to a condition in the pod's condition list with matching type.

## PodResourceClaim {#PodResourceClaim}

PodResourceClaim references exactly one ResourceClaim, either directly or by naming a ResourceClaimTemplate which is then turned into a ResourceClaim for the pod.

It adds a name to it that uniquely identifies the ResourceClaim inside the Pod. Containers that need access to the ResourceClaim reference it with this name.

When the DRAWorkloadResourceClaims feature gate is enabled and this Pod belongs to a PodGroup, a PodResourceClaim is matched to a PodGroupResourceClaim if all of their fields are equal (Name, ResourceClaimName, and ResourceClaimTemplateName). A matched claim references a single ResourceClaim shared across all Pods in the PodGroup, reserved for the PodGroup in ResourceClaimStatus.ReservedFor rather than for individual Pods.

   | Field | Description

       | `name` *string
       | Name uniquely identifies this resource claim inside the pod. This must be a DNS_LABEL.

       | `resourceClaimName`string
       | ResourceClaimName is the name of a ResourceClaim object in the same namespace as this pod.  Exactly one of ResourceClaimName and ResourceClaimTemplateName must be set.

       | `resourceClaimTemplateName`string
       | ResourceClaimTemplateName is the name of a ResourceClaimTemplate object in the same namespace as this pod.  The template will be used to create a new ResourceClaim, which will be bound to this pod. When this pod is deleted, the ResourceClaim will also be deleted. The pod name and resource name, along with a generated component, will be used to form a unique name for the ResourceClaim, which will be recorded in pod.status.resourceClaimStatuses.  When the DRAWorkloadResourceClaims feature gate is enabled and the pod belongs to a PodGroup that defines a PodGroupResourceClaim with the same Name and ResourceClaimTemplateName, this PodResourceClaim resolves to the ResourceClaim generated for the PodGroup. All pods in the group that define an equivalent PodResourceClaim matching the PodGroupResourceClaim's Name and ResourceClaimTemplateName share the same generated ResourceClaim. ResourceClaims generated for a PodGroup are owned by the PodGroup and their lifecycles are tied to the PodGroup instead of any individual pod.  This field is immutable and no changes will be made to the corresponding ResourceClaim by the control plane after creating the ResourceClaim.  Exactly one of ResourceClaimName and ResourceClaimTemplateName must be set.

## PodSchedulingGate {#PodSchedulingGate}

PodSchedulingGate is associated to a Pod to guard its scheduling.

   | Field | Description

       | `name` *string
       | Name of the scheduling gate. Each scheduling gate must have a unique name field.

## PodSchedulingGroup {#PodSchedulingGroup}

PodSchedulingGroup identifies the runtime scheduling group instance that a Pod belongs to. The scheduler uses this information to apply workload-aware scheduling semantics. Exactly one field must be specified.

   | Field | Description

       | `podGroupName`string
       | PodGroupName specifies the name of the standalone PodGroup object that represents the runtime instance of this group. Must be a DNS subdomain.

## PodSecurityContext {#PodSecurityContext}

PodSecurityContext holds pod-level security attributes and common container settings. Some fields are also present in container.securityContext.  Field values of container.securityContext take precedence over field values of PodSecurityContext.

   | Field | Description

       | `appArmorProfile`AppArmorProfile
       | appArmorProfile is the AppArmor options to use by the containers in this pod. Note that this field cannot be set when spec.os.name is windows.

       | `fsGroup`integer
       | A special supplemental group that applies to all containers in a pod. Some volume types allow the Kubelet to change the ownership of that volume to be owned by the pod:  1. The owning GID will be the FSGroup 2. The setgid bit is set (new files created in the volume will be owned by FSGroup) 3. The permission bits are OR'd with rw-rw----  If unset, the Kubelet will not modify the ownership and permissions of any volume. Note that this field cannot be set when spec.os.name is windows.

       | `fsGroupChangePolicy`string
       | fsGroupChangePolicy defines behavior of changing ownership and permission of the volume before being exposed inside Pod. This field will only apply to volume types which support fsGroup based ownership(and permissions). It will have no effect on ephemeral volume types such as: secret, configmaps and emptydir. Valid values are "<example-value>" and "<example-value>". If not specified, "<example-value>" is used. Note that this field cannot be set when spec.os.name is windows.Possible enum values: - `"<example-value>"` indicates that volume'<example-value>'s ownership and permissions will be changed only when permission and ownership of root directory does not match with expected permissions on the volume. This can help shorten the time it takes to change ownership and permissions of a volume.

       | `runAsGroup`integer
       | The GID to run the entrypoint of the container process. Uses runtime default if unset. May also be set in SecurityContext.  If set in both SecurityContext and PodSecurityContext, the value specified in SecurityContext takes precedence for that container. Note that this field cannot be set when spec.os.name is windows.

       | `runAsNonRoot`boolean
       | Indicates that the container must run as a non-root user. If true, the Kubelet will validate the image at runtime to ensure that it does not run as UID 0 (root) and fail to start the container if it does. If unset or false, no such validation will be performed. May also be set in SecurityContext.  If set in both SecurityContext and PodSecurityContext, the value specified in SecurityContext takes precedence.

       | `runAsUser`integer
       | The UID to run the entrypoint of the container process. Defaults to user specified in image metadata if unspecified. May also be set in SecurityContext.  If set in both SecurityContext and PodSecurityContext, the value specified in SecurityContext takes precedence for that container. Note that this field cannot be set when spec.os.name is windows.

       | `seLinuxChangePolicy`string
       | seLinuxChangePolicy defines how the container's SELinux label is applied to all volumes used by the Pod. It has no effect on nodes that do not support SELinux or to volumes does not support SELinux. Valid values are "MountOption" and "Recursive".  "Recursive" means relabeling of all files on all Pod volumes by the container runtime. This may be slow for large volumes, but allows mixing privileged and unprivileged Pods sharing the same volume on the same node.  "MountOption" mounts all eligible Pod volumes with `-o context` mount option. This requires all Pods that share the same volume to use the same SELinux label. It is not possible to share the same volume among privileged and unprivileged Pods. Eligible volumes are in-tree FibreChannel and iSCSI volumes, and all CSI volumes whose CSI driver announces SELinux support by setting spec.seLinuxMount: true in their CSIDriver instance. Other volumes are always re-labelled recursively.  If not specified, "MountOption" is used.  This field affects only Pods that have SELinux label set, either in PodSecurityContext or in SecurityContext of all containers.  All Pods that use the same volume should use the same seLinuxChangePolicy, otherwise some pods can get stuck in ContainerCreating state. Note that this field cannot be set when spec.os.name is windows.

       | `seLinuxOptions`SELinuxOptions
       | The SELinux context to be applied to all containers. If unspecified, the container runtime will allocate a random SELinux context for each container.  May also be set in SecurityContext.  If set in both SecurityContext and PodSecurityContext, the value specified in SecurityContext takes precedence for that container. Note that this field cannot be set when spec.os.name is windows.

       | `seccompProfile`SeccompProfile
       | The seccomp options to use by the containers in this pod. Note that this field cannot be set when spec.os.name is windows.

       | `supplementalGroups`integer array
       | A list of groups applied to the first process run in each container, in addition to the container's primary GID and fsGroup (if specified).  If the SupplementalGroupsPolicy feature is enabled, the supplementalGroupsPolicy field determines whether these are in addition to or instead of any group memberships defined in the container image. If unspecified, no additional groups are added, though group memberships defined in the container image may still be used, depending on the supplementalGroupsPolicy field. Note that this field cannot be set when spec.os.name is windows.

       | `supplementalGroupsPolicy`string
       | Defines how supplemental groups of the first container processes are calculated. Valid values are "Merge" and "Strict". If not specified, "Merge" is used. (Alpha) Using the field requires the SupplementalGroupsPolicy feature gate to be enabled and the container runtime must implement support for this feature. Note that this field cannot be set when spec.os.name is windows.Possible enum values: - `"Merge"` means that the container's provided SupplementalGroups and FsGroup (specified in SecurityContext) will be merged with the primary user's groups as defined in the container image (in /etc/group). - `"Strict"` means that the container's provided SupplementalGroups and FsGroup (specified in SecurityContext) will be used instead of any groups defined in the container image.

       | `sysctls`Sysctl array
       | Sysctls hold a list of namespaced sysctls used for the pod. Pods with unsupported sysctls (by the container runtime) might fail to launch. Note that this field cannot be set when spec.os.name is windows.

       | `windowsOptions`WindowsSecurityContextOptions
       | The Windows specific settings applied to all containers. If unspecified, the options within a container's SecurityContext will be used. If set in both SecurityContext and PodSecurityContext, the value specified in SecurityContext takes precedence. Note that this field cannot be set when spec.os.name is linux.

## PodVolumeHealth {#PodVolumeHealth}

PodVolumeHealth contains health information for a volume used by a pod, reported by the CSI node plugin via the kubelet.

   | Field | Description

       | `healthConditions`VolumeHealthCondition arraypatch strategy: merge on key `status`
       | conditions is the set of adverse conditions reported by the CSI node plugin for this volume on this node. At most 16 conditions may be reported.

       | `lastTransitionTime`Time
       | lastTransitionTime is when the current set of conditions first appeared.

       | `name` *string
       | name matches an entry in pod.spec.volumes.

## PreferredSchedulingTerm {#PreferredSchedulingTerm}

An empty preferred scheduling term matches all objects with implicit weight 0 (i.e. it's a no-op). A null preferred scheduling term matches no objects (i.e. is also a no-op).

   | Field | Description

       | `preference` *NodeSelectorTerm
       | A node selector term, associated with the corresponding weight.

       | `weight` *integer
       | Weight associated with matching the corresponding nodeSelectorTerm, in the range 1-100.
