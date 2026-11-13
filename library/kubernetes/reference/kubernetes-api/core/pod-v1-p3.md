---
title: "Pod (part 3 of 24)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/kubernetes-api/core/pod-v1.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Pod (part 3 of 24)

| `securityContext`PodSecurityContext
       | SecurityContext holds pod-level security attributes and common container settings. Optional: Defaults to empty.  See type description for default values of each field.

       | `serviceAccount`string
       | DeprecatedServiceAccount is a deprecated alias for ServiceAccountName. Deprecated: Use serviceAccountName instead.

       | `serviceAccountName`string
       | ServiceAccountName is the name of the ServiceAccount to use to run this pod. More info: https://kubernetes.io/docs/tasks/configure-pod-container/configure-service-account/

       | `setHostnameAsFQDN`boolean
       | If true the pod's hostname will be configured as the pod's FQDN, rather than the leaf name (the default). In Linux containers, this means setting the FQDN in the hostname field of the kernel (the nodename field of struct utsname). In Windows containers, this means setting the registry value of hostname for the registry key HKEY_LOCAL_MACHINE\\SYSTEM\\CurrentControlSet\\Services\\Tcpip\\Parameters to FQDN. If a pod does not have FQDN, this has no effect. Default to false.

       | `shareProcessNamespace`boolean
       | Share a single process namespace between all of the containers in a pod. When this is set containers will be able to view and signal processes from other containers in the same pod, and the first process in each container will not be assigned PID 1. HostPID and ShareProcessNamespace cannot both be set. Optional: Default to false.

       | `subdomain`string
       | If specified, the fully qualified Pod hostname will be "\<hostname>.\<subdomain>.\<pod namespace>.svc.\<cluster domain>". If not specified, the pod will not have a domainname at all.

       | `terminationGracePeriodSeconds`integer
       | Optional duration in seconds the pod needs to terminate gracefully. May be decreased in delete request. Value must be non-negative integer. The value zero indicates stop immediately via the kill signal (no opportunity to shut down). If this value is nil, the default grace period will be used instead. The grace period is the duration in seconds after the processes running in the pod are sent a termination signal and the time when the processes are forcibly halted with a kill signal. Set this value longer than the expected cleanup time for your process. Defaults to 30 seconds.

       | `tolerations`Toleration array
       | If specified, the pod's tolerations.

       | `topologySpreadConstraints`TopologySpreadConstraint arraypatch strategy: merge on key `topologyKey`
       | TopologySpreadConstraints describes how a group of pods ought to spread across topology domains. Scheduler will schedule pods in a way which abides by the constraints. All topologySpreadConstraints are ANDed.

       | `volumes`Volume arraypatch strategy: merge,retainKeys on key `name`
       | List of volumes that can be mounted by containers belonging to the pod. More info: https://kubernetes.io/docs/concepts/storage/volumes

## PodStatus {#PodStatus}

PodStatus represents information about the status of a pod. Status may trail the actual state of a system, especially if the node that hosts the pod cannot contact the control plane.

   | Field | Description

       | `allocatedResources`object
       | AllocatedResources is the total requests allocated for this pod by the node. If pod-level requests are not set, this will be the total requests aggregated across containers in the pod.

       | `conditions`PodCondition arraypatch strategy: merge on key `type`
       | Current service state of pod. More info: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle#pod-conditions

       | `containerStatuses`ContainerStatus array
       | Statuses of containers in this pod. Each container in the pod should have at most one status in this list, and all statuses should be for containers in the pod. However this is not enforced. If a status for a non-existent container is present in the list, or the list has duplicate names, the behavior of various Kubernetes components is not defined and those statuses might be ignored. More info: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle#pod-and-container-status

       | `ephemeralContainerStatuses`ContainerStatus array
       | Statuses for any ephemeral containers that have run in this pod. Each ephemeral container in the pod should have at most one status in this list, and all statuses should be for containers in the pod. However this is not enforced. If a status for a non-existent container is present in the list, or the list has duplicate names, the behavior of various Kubernetes components is not defined and those statuses might be ignored. More info: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle#pod-and-container-status

       | `extendedResourceClaimStatus`PodExtendedResourceClaimStatus
       | Status of extended resource claim backed by DRA.

       | `hostIP`string
       | hostIP holds the IP address of the host to which the pod is assigned. Empty if the pod has not started yet. A pod can be assigned to a node that has a problem in kubelet which in turns mean that HostIP will not be updated even if there is a node is assigned to pod

       | `hostIPs`HostIP arraypatch strategy: merge on key `ip`
       | hostIPs holds the IP addresses allocated to the host. If this field is specified, the first entry must match the hostIP field. This list is empty if the pod has not started yet. A pod can be assigned to a node that has a problem in kubelet which in turns means that HostIPs will not be updated even if there is a node is assigned to this pod.

       | `initContainerStatuses`ContainerStatus array
       | Statuses of init containers in this pod. The most recent successful non-restartable init container will have ready = true, the most recently started container will have startTime set. Each init container in the pod should have at most one status in this list, and all statuses should be for containers in the pod. However this is not enforced. If a status for a non-existent container is present in the list, or the list has duplicate names, the behavior of various Kubernetes components is not defined and those statuses might be ignored. More info: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle/#pod-and-container-status

       | `message`string
       | A human readable message indicating details about why the pod is in this condition.

       | `nodeAllocatableResourceClaimStatuses`NodeAllocatableResourceClaimStatus arraypatch strategy: merge on key `resourceClaimName`
       | NodeAllocatableResourceClaimStatuses contains the status of node-allocatable resources that were allocated for this pod through DRA claims. This includes resources currently reported in v1.Node `status.allocatable` that are not extended resources (see https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/#extended-resources). Examples include "cpu", "memory", "ephemeral-storage", and hugepages.

       | `nominatedNodeName`string
       | nominatedNodeName is set only when this pod preempts other pods on the node, but it cannot be scheduled right away as preemption victims receive their graceful termination periods. This field does not guarantee that the pod will be scheduled on this node. Scheduler may decide to place the pod elsewhere if other nodes become available sooner. Scheduler may also decide to give the resources on this node to a higher priority pod that is created after preemption. As a result, this field may be different than PodSpec.nodeName when the pod is scheduled.

       | `observedGeneration`integer
       | If set, this represents the .metadata.generation that the pod status was set based upon. The PodObservedGenerationTracking feature gate must be enabled to use this field.

       | `phase`string
       | The phase of a Pod is a simple, high-level summary of where the Pod is in its lifecycle. The conditions array, the reason and message fields, and the individual container status arrays contain more detail about the pod's status. There are five possible phase values:  Pending: The pod has been accepted by the Kubernetes system, but one or more of the container images has not been created. This includes time before being scheduled as well as time spent downloading images over the network, which could take a while. Running: The pod has been bound to a node, and all of the containers have been created. At least one container is still running, or is in the process of starting or restarting. Succeeded: All containers in the pod have terminated in success, and will not be restarted. Failed: All containers in the pod have terminated, and at least one container has terminated in failure. The container either exited with non-zero status or was terminated by the system. Unknown: For some reason the state of the pod could not be obtained, typically due to an error in communicating with the host of the pod.  More info: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle#pod-phasePossible enum values: - `"Failed"` means that all containers in the pod have terminated, and at least one container has terminated in a failure (exited with a non-zero exit code or was stopped by the system). - `"Pending"` means the pod has been accepted by the system, but one or more of the containers has not been started. This includes time before being bound to a node, as well as time spent pulling images onto the host. - `"Running"` means the pod has been bound to a node and all of the containers have been started. At least one container is still running or is in the process of being restarted. - `"Succeeded"` means that all containers in the pod have voluntarily terminated with a container exit code of 0, and the system is not going to restart any of these containers. - `"Unknown"` means that for some reason the state of the pod could not be obtained, typically due to an error in communicating with the host of the pod. Deprecated: It isn't being set since 2015 (74da3b14b0c0f658b3bb8d2def5094686d0e9095)

       | `podIP`string
       | podIP address allocated to the pod. Routable at least within the cluster. Empty if not yet allocated.

       | `podIPs`PodIP arraypatch strategy: merge on key `ip`
       | podIPs holds the IP addresses allocated to the pod. If this field is specified, the 0th entry must match the podIP field. Pods may be allocated at most 1 value for each of IPv4 and IPv6. This list is empty if no IPs have been allocated yet.

       | `qosClass`string
       | The Quality of Service (QOS) classification assigned to the pod based on resource requirements See PodQOSClass type for available QOS classes More info: https://kubernetes.io/docs/concepts/workloads/pods/pod-qos/#quality-of-service-classesPossible enum values: - `"BestEffort"` is the BestEffort qos class. - `"Burstable"` is the Burstable qos class. - `"Guaranteed"` is the Guaranteed qos class.

       | `reason`string
       | A brief CamelCase message indicating details about why the pod is in this state. e.g. 'Evicted'

       | `resize`string
       | Status of resources resize desired for pod's containers. It is empty if no resources resize is pending. Any changes to container resources will automatically set this to "Proposed" Deprecated: Resize status is moved to two pod conditions PodResizePending and PodResizeInProgress. PodResizePending will track states where the spec has been resized, but the Kubelet has not yet allocated the resources. PodResizeInProgress will track in-progress resizes, and should be present whenever allocated resources != acknowledged resources.

       | `resourceClaimStatuses`PodResourceClaimStatus arraypatch strategy: merge,retainKeys on key `name`
       | Status of resource claims.

       | `resources`ResourceRequirements
       | Resources represents the compute resource requests and limits that have been applied at the pod level if pod-level requests or limits are set in PodSpec.Resources

       | `startTime`Time
       | RFC 3339 date and time at which the object was acknowledged by the Kubelet. This is before the Kubelet pulled the container image(s) for the pod.

       | `volumeHealth`PodVolumeHealth array
       | volumeHealth contains node-reported health for each volume the pod is using. Populated by the kubelet on the pod's node.

## PodList {#PodList}

PodList is a list of Pods.

   | Field | Description

       | `apiVersion`string
       | APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources

       | `items` *Pod array
       | List of pods. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md

       | `kind`string
       | Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds

       | `metadata`ListMeta
       | Standard list metadata. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds

## Affinity {#Affinity}

Affinity is a group of affinity scheduling rules.

   | Field | Description

       | `nodeAffinity`NodeAffinity
       | Describes node affinity scheduling rules for the pod.

       | `podAffinity`PodAffinity
       | Describes pod affinity scheduling rules (e.g. co-locate this pod in the same node, zone, etc. as some other pod(s)).

       | `podAntiAffinity`PodAntiAffinity
       | Describes pod anti-affinity scheduling rules (e.g. avoid putting this pod in the same node, zone, etc. as some other pod(s)).

## AppArmorProfile {#AppArmorProfile}

AppArmorProfile defines a pod or container's AppArmor settings.

   | Field | Description

       | `localhostProfile`string
       | localhostProfile indicates a profile loaded on the node that should be used. The profile must be preconfigured on the node to work. Must match the loaded name of the profile. Must be set if and only if type is "Localhost".

       | `type` *string
       | type indicates which kind of AppArmor profile will be applied. Valid options are:   Localhost - a profile pre-loaded on the node.   RuntimeDefault - the container runtime's default profile.   Unconfined - no AppArmor enforcement.Possible enum values: - `"Localhost"` indicates that a profile pre-loaded on the node should be used. - `"RuntimeDefault"` indicates that the container runtime's default AppArmor profile should be used. - `"Unconfined"` indicates that no AppArmor profile should be enforced.
