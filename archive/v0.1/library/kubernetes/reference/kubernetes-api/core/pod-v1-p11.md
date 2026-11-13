---
title: "Pod (part 11 of 24)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/kubernetes-api/core/pod-v1.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Pod (part 11 of 24)

## Probe {#Probe}

Probe describes a health check to be performed against a container to determine whether it is alive or ready to receive traffic.

   | Field | Description

       | `exec`ExecAction
       | Exec specifies a command to execute in the container.

       | `failureThreshold`integer
       | Minimum consecutive failures for the probe to be considered failed after having succeeded. Defaults to 3. Minimum value is 1.

       | `grpc`GRPCAction
       | GRPC specifies a GRPC HealthCheckRequest.

       | `httpGet`HTTPGetAction
       | HTTPGet specifies an HTTP GET request to perform.

       | `initialDelaySeconds`integer
       | Number of seconds after the container has started before liveness probes are initiated. More info: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle#container-probes

       | `periodSeconds`integer
       | How often (in seconds) to perform the probe. Default to 10 seconds. Minimum value is 1.

       | `successThreshold`integer
       | Minimum consecutive successes for the probe to be considered successful after having failed. Defaults to 1. Must be 1 for liveness and startup. Minimum value is 1.

       | `tcpSocket`TCPSocketAction
       | TCPSocket specifies a connection to a TCP port.

       | `terminationGracePeriodSeconds`integer
       | Optional duration in seconds the pod needs to terminate gracefully upon probe failure. The grace period is the duration in seconds after the processes running in the pod are sent a termination signal and the time when the processes are forcibly halted with a kill signal. Set this value longer than the expected cleanup time for your process. If this value is nil, the pod's terminationGracePeriodSeconds will be used. Otherwise, this value overrides the value provided by the pod spec. Value must be non-negative integer. The value zero indicates stop immediately via the kill signal (no opportunity to shut down). This is a beta field and requires enabling ProbeTerminationGracePeriod feature gate. Minimum value is 1. spec.terminationGracePeriodSeconds is used if unset.

       | `timeoutSeconds`integer
       | Number of seconds after which the probe times out. Defaults to 1 second. Minimum value is 1. More info: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle#container-probes

## ProjectedVolumeSource {#ProjectedVolumeSource}

Represents a projected volume source

   | Field | Description

       | `defaultMode`integer
       | defaultMode are the mode bits used to set permissions on created files by default. Must be an octal value between 0000 and 0777 or a decimal value between 0 and 511. YAML accepts both octal and decimal values, JSON requires decimal values for mode bits. Directories within the path are not affected by this setting. This might be in conflict with other options that affect the file mode, like fsGroup, and the result can be other mode bits set.

       | `defaultUser`integer
       | defaultUser is Optional: The owner UID of the created files by default. The defaultUser field is only used as a fallback when the item-level user field is unset. (Alpha) This field requires the AtomicWriteVolumeUserFields feature gate to be enabled.

       | `sources`VolumeProjection array
       | sources is the list of volume projections. Each entry in this list handles one source.

## RBDVolumeSource {#RBDVolumeSource}

Represents a Rados Block Device mount that lasts the lifetime of a pod. RBD volumes support ownership management and SELinux relabeling.

   | Field | Description

       | `fsType`string
       | fsType is the filesystem type of the volume that you want to mount. Tip: Ensure that the filesystem type is supported by the host operating system. Examples: "ext4", "xfs", "ntfs". Implicitly inferred to be "ext4" if unspecified. More info: https://kubernetes.io/docs/concepts/storage/volumes#rbd

       | `image` *string
       | image is the rados image name. More info: https://examples.k8s.io/volumes/rbd/README.md#how-to-use-it

       | `keyring`string
       | keyring is the path to key ring for RBDUser. Default is /etc/ceph/keyring. More info: https://examples.k8s.io/volumes/rbd/README.md#how-to-use-it

       | `monitors` *string array
       | monitors is a collection of Ceph monitors. More info: https://examples.k8s.io/volumes/rbd/README.md#how-to-use-it

       | `pool`string
       | pool is the rados pool name. Default is rbd. More info: https://examples.k8s.io/volumes/rbd/README.md#how-to-use-it

       | `readOnly`boolean
       | readOnly here will force the ReadOnly setting in VolumeMounts. Defaults to false. More info: https://examples.k8s.io/volumes/rbd/README.md#how-to-use-it

       | `secretRef`LocalObjectReference
       | secretRef is name of the authentication secret for RBDUser. If provided overrides keyring. Default is nil. More info: https://examples.k8s.io/volumes/rbd/README.md#how-to-use-it

       | `user`string
       | user is the rados user name. Default is admin. More info: https://examples.k8s.io/volumes/rbd/README.md#how-to-use-it

## ResourceClaim {#ResourceClaim}

ResourceClaim references one entry in PodSpec.ResourceClaims.

   | Field | Description

       | `name` *string
       | Name must match the name of one entry in pod.spec.resourceClaims of the Pod where this field is used. It makes that resource available inside a container.

       | `request`string
       | Request is the name chosen for a request in the referenced claim. If empty, everything from the claim is made available, otherwise only the result of this request.

## ResourceFieldSelector {#ResourceFieldSelector}

ResourceFieldSelector represents container resources (cpu, memory) and their output format

   | Field | Description

       | `containerName`string
       | Container name: required for volumes, optional for env vars

       | `divisor`Quantity
       | Specifies the output format of the exposed resources, defaults to "1"

       | `resource` *string
       | Required: resource to select

## ResourceHealth {#ResourceHealth}

ResourceHealth represents the health of a resource. It has the latest device health information. This is a part of KEP https://kep.k8s.io/4680.

   | Field | Description

       | `health`string
       | Health of the resource. can be one of:  - Healthy: operates as normal  - Unhealthy: reported unhealthy. We consider this a temporary health issue               since we do not have a mechanism today to distinguish               temporary and permanent issues.  - Unknown: The status cannot be determined.             For example, Device Plugin got unregistered and hasn't been re-registered since.  In future we may want to introduce the PermanentlyUnhealthy Status.

       | `message`string
       | Message provides human-readable context for Health (e.g. "ECC error count exceeded threshold"). This field is populated by the kubelet when ResourceHealthStatusMessage is enabled if the DRA plugin returns a message, and is null otherwise.

       | `resourceID` *string
       | ResourceID is the unique identifier of the resource. See the ResourceID type for more information.

## ResourceRequirements {#ResourceRequirements}

ResourceRequirements describes the compute resource requirements.

   | Field | Description

       | `claims`ResourceClaim array
       | Claims lists the names of resources, defined in spec.resourceClaims, that are used by this container.  This field depends on the DynamicResourceAllocation feature gate.  This field is immutable. It can only be set for containers.

       | `limits`object
       | Limits describes the maximum amount of compute resources allowed. More info: https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/

       | `requests`object
       | Requests describes the minimum amount of compute resources required. If Requests is omitted for a container, it defaults to Limits if that is explicitly specified, otherwise to an implementation-defined value. Requests cannot exceed Limits. More info: https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/

## ResourceStatus {#ResourceStatus}

ResourceStatus represents the status of a single resource allocated to a Pod.

   | Field | Description

       | `name` *string
       | Name of the resource. Must be unique within the pod and in case of non-DRA resource, match one of the resources from the pod spec. For DRA resources, the value must be "claim:\<claim_name>/\<request>" when container.resources.claims[*].request is set or "claim:\<claim_name>" when container.resources.claims[*].request is empty. For DRA-backed extended resources, "claim:\<claim_name>/\<request>" is used when the claim name and request name are recorded in pod.status.extendedResourceClaimStatus. When this status is reported about a container, the "claim_name" and "request" must match one of the claims of this container.

       | `resources`ResourceHealth array
       | List of unique resources health. Each element in the list contains an unique resource ID and its health. At a minimum, for the lifetime of a Pod, resource ID must uniquely identify the resource allocated to the Pod on the Node. If other Pod on the same Node reports the status with the same resource ID, it must be the same resource they share. See ResourceID type definition for a specific format it has in various use cases.

## SELinuxOptions {#SELinuxOptions}

SELinuxOptions are the labels to be applied to the container

   | Field | Description

       | `level`string
       | Level is SELinux level label that applies to the container.

       | `role`string
       | Role is a SELinux role label that applies to the container.

       | `type`string
       | Type is a SELinux type label that applies to the container.

       | `user`string
       | User is a SELinux user label that applies to the container.

## ScaleIOVolumeSource {#ScaleIOVolumeSource}

ScaleIOVolumeSource represents a persistent ScaleIO volume

   | Field | Description

       | `fsType`string
       | fsType is the filesystem type to mount. Must be a filesystem type supported by the host operating system. Ex. "ext4", "xfs", "ntfs". Default is "xfs".

       | `gateway` *string
       | gateway is the host address of the ScaleIO API Gateway.

       | `protectionDomain`string
       | protectionDomain is the name of the ScaleIO Protection Domain for the configured storage.

       | `readOnly`boolean
       | readOnly Defaults to false (read/write). ReadOnly here will force the ReadOnly setting in VolumeMounts.

       | `secretRef` *LocalObjectReference
       | secretRef references to the secret for ScaleIO user and other sensitive information. If this is not provided, Login operation will fail.

       | `sslEnabled`boolean
       | sslEnabled Flag enable/disable SSL communication with Gateway, default false

       | `storageMode`string
       | storageMode indicates whether the storage for a volume should be ThickProvisioned or ThinProvisioned. Default is ThinProvisioned.

       | `storagePool`string
       | storagePool is the ScaleIO Storage Pool associated with the protection domain.

       | `system` *string
       | system is the name of the storage system as configured in ScaleIO.

       | `volumeName`string
       | volumeName is the name of a volume already created in the ScaleIO system that is associated with this volume source.

## SeccompProfile {#SeccompProfile}

SeccompProfile defines a pod/container's seccomp profile settings. Only one profile source may be set.

   | Field | Description

       | `localhostProfile`string
       | localhostProfile indicates a profile defined in a file on the node should be used. The profile must be preconfigured on the node to work. Must be a descending path, relative to the kubelet's configured seccomp profile location. Must be set if type is "Localhost". Must NOT be set for any other type.

       | `type` *string
       | type indicates which kind of seccomp profile will be applied. Valid options are:  Localhost - a profile defined in a file on the node should be used. RuntimeDefault - the container runtime default profile should be used. Unconfined - no profile should be applied.Possible enum values: - `"Localhost"` indicates a profile defined in a file on the node should be used. The file's location relative to \<kubelet-root-dir>/seccomp. - `"RuntimeDefault"` represents the default container runtime seccomp profile. - `"Unconfined"` indicates no seccomp profile is applied (A.K.A. unconfined).

## SecretEnvSource {#SecretEnvSource}

SecretEnvSource selects a Secret to populate the environment variables with.

The contents of the target Secret's Data field will represent the key-value pairs as environment variables.

   | Field | Description

       | `name`string
       | Name of the referent. This field is effectively required, but due to backwards compatibility is allowed to be empty. Instances of this type with an empty value here are almost certainly wrong. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names

       | `optional`boolean
       | Specify whether the Secret must be defined

## SecretKeySelector {#SecretKeySelector}

SecretKeySelector selects a key of a Secret.

   | Field | Description

       | `key` *string
       | The key of the secret to select from.  Must be a valid secret key.

       | `name`string
       | Name of the referent. This field is effectively required, but due to backwards compatibility is allowed to be empty. Instances of this type with an empty value here are almost certainly wrong. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names

       | `optional`boolean
       | Specify whether the Secret or its key must be defined
