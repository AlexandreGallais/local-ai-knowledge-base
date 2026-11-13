---
title: "Pod (part 2 of 24)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/kubernetes-api/core/pod-v1.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Pod (part 2 of 24)

## PodSpec {#PodSpec}

PodSpec is a description of a pod.

   | Field | Description

       | `activeDeadlineSeconds`integer
       | Optional duration in seconds the pod may be active on the node relative to StartTime before the system will actively try to mark it failed and kill associated containers. Value must be a positive integer.

       | `affinity`Affinity
       | If specified, the pod's scheduling constraints

       | `automountServiceAccountToken`boolean
       | AutomountServiceAccountToken <example-value> whether a service account token <example-value> be automatically mounted.

       | `containers` *Container arraypatch strategy: merge on key `name`
       | List of containers belonging to the pod. Containers cannot currently be added or removed. There must be at least one container in a Pod. Cannot be updated.

       | `dnsConfig`PodDNSConfig
       | Specifies the DNS parameters of a pod. Parameters specified here will be merged to the generated DNS configuration based on DNSPolicy.

       | `dnsPolicy`string
       | Set DNS policy for the pod. Defaults to "ClusterFirst". Valid values are 'ClusterFirstWithHostNet', 'ClusterFirst', 'Default' or 'None'. DNS parameters given in DNSConfig will be merged with the policy selected with DNSPolicy. To have DNS options set along with hostNetwork, you have to specify DNS policy explicitly to 'ClusterFirstWithHostNet'.Possible enum values: - `"ClusterFirst"` indicates that the pod should use cluster DNS first unless hostNetwork is true, if it is available, then fall back on the default (as determined by kubelet) DNS settings. - `"ClusterFirstWithHostNet"` indicates that the pod should use cluster DNS first, if it is available, then fall back on the default (as determined by kubelet) DNS settings. - `"Default"` indicates that the pod should use the default (as determined by kubelet) DNS settings. - `"None"` indicates that the pod should use empty DNS settings. DNS parameters such as nameservers and search paths should be defined via DNSConfig.

       | `enableServiceLinks`boolean
       | EnableServiceLinks indicates whether information about services should be injected into pod's environment variables, matching the syntax of Docker links. Optional: Defaults to true.

       | `ephemeralContainers`EphemeralContainer arraypatch strategy: merge on key `name`
       | List of ephemeral containers run in this pod. Ephemeral containers may be run in an existing pod to perform user-initiated actions such as debugging. This list cannot be specified when creating a pod, and it cannot be modified by updating the pod spec. In order to add an ephemeral container to an existing pod, use the pod's ephemeralcontainers subresource.

       | `evictionResponders`EvictionResponder arraypatch strategy: merge on key `name`
       | evictionResponders reference responders that react to Evictions based on EvictionRequests. Responders should observe and communicate through the Eviction Resource API to help with the graceful termination of a pod. The responders are selected sequentially, according to their specified priority.  Responders should periodically report on an eviction progress by updating the .status.responders[].heartbeatTime field of the Eviction object. If this field is not updated within the heartbeat deadline defined by the Eviction API (currently 20 minutes), the eviction is passed over to the next responder with a lower priority. If there is no other responder, the last default imperative-eviction.k8s.io/evictor responder with a priority of 100 will evict the pod using the imperative Eviction API (pods/\<name>/eviction subresource).  The maximum length of the responders list is 10. Responders are not supported when the pod is part of a PodGroup (.spec.schedulingGroup is set). This field can only be set on creation and is immutable afterwards.

       | `hostAliases`HostAlias arraypatch strategy: merge on key `ip`
       | HostAliases is an optional list of hosts and IPs that will be injected into the pod's hosts file if specified.

       | `hostIPC`boolean
       | Use the host's ipc namespace. Optional: Default to false.

       | `hostNetwork`boolean
       | Host networking requested for this pod. Use the host's network namespace. When using HostNetwork you should specify ports so the scheduler is aware. When `hostNetwork` is true, specified `hostPort` fields in port definitions must match `containerPort`, and unspecified `hostPort` fields in port definitions are defaulted to match `containerPort`. Default to false.

       | `hostPID`boolean
       | Use the host's pid namespace. Optional: Default to false.

       | `hostUsers`boolean
       | Use the host's user namespace. Optional: Default to true. If set to true or not present, the pod will be run in the host user namespace, useful for when the pod needs a feature only available to the host user namespace, such as loading a kernel module with CAP_SYS_MODULE. When set to false, a new userns is created for the pod. Setting false is useful for mitigating container breakout vulnerabilities even allowing users to run their containers as root without actually having root privileges on the host.

       | `hostname`string
       | Specifies the hostname of the Pod If not specified, the pod's hostname will be set to a system-defined value.

       | `hostnameOverride`string
       | HostnameOverride specifies an explicit override for the pod's hostname as perceived by the pod. This field only specifies the pod's hostname and does not affect its DNS records. When this field is set to a non-empty string: - It takes precedence over the values set in `hostname` and `subdomain`. - The Pod's hostname will be set to this value. - `setHostnameAsFQDN` must be nil or set to false. - `hostNetwork` must be set to false.  This field must be a valid DNS subdomain as defined in RFC 1123 and contain at most 64 characters.

       | `imagePullSecrets`LocalObjectReference arraypatch strategy: merge on key `name`
       | ImagePullSecrets is an optional list of references to secrets in the same namespace to use for pulling any of the images used by this PodSpec. If specified, these secrets will be passed to individual puller implementations for them to use. More info: https://kubernetes.io/docs/concepts/containers/images#specifying-imagepullsecrets-on-a-pod

       | `initContainers`Container arraypatch strategy: merge on key `name`
       | List of initialization containers belonging to the pod. Init containers are executed in order prior to containers being started. If any init container fails, the pod is considered to have failed and is handled according to its restartPolicy. The name for an init container or normal container must be unique among all containers. Init containers may not have Lifecycle actions, Readiness probes, Liveness probes, or Startup probes. The resourceRequirements of an init container are taken into account during scheduling by finding the highest request/limit for each resource type, and then using the max of that value or the sum of the normal containers. Limits are applied to init containers in a similar fashion. Init containers cannot currently be added or removed. Cannot be updated. More info: https://kubernetes.io/docs/concepts/workloads/pods/init-containers/

       | `nodeName`string
       | NodeName indicates in which node this pod is scheduled. If empty, this pod is a candidate for scheduling by the scheduler defined in schedulerName. Once this field is set, the kubelet for this node becomes responsible for the lifecycle of this pod. This field should not be used to express a desire for the pod to be scheduled on a specific node. https://kubernetes.io/docs/concepts/scheduling-eviction/assign-pod-node/#nodename

       | `nodeSelector`object
       | NodeSelector is a selector which must be true for the pod to fit on a node. Selector which must match a node's labels for the pod to be scheduled on that node. More info: https://kubernetes.io/docs/concepts/configuration/assign-pod-node/

       | `os`PodOS
       | Specifies the OS of the containers in the pod. Some pod and container fields are restricted if this is set.  If the OS field is set to linux, the following fields must be unset: -securityContext.windowsOptions  If the OS field is set to windows, following fields must be unset: - spec.hostPID - spec.hostIPC - spec.hostUsers - spec.resources - spec.securityContext.appArmorProfile - spec.securityContext.seLinuxOptions - spec.securityContext.seccompProfile - spec.securityContext.fsGroup - spec.securityContext.fsGroupChangePolicy - spec.securityContext.sysctls - spec.shareProcessNamespace - spec.securityContext.runAsUser - spec.securityContext.runAsGroup - spec.securityContext.supplementalGroups - spec.securityContext.supplementalGroupsPolicy - spec.containers[*].securityContext.appArmorProfile - spec.containers[*].securityContext.seLinuxOptions - spec.containers[*].securityContext.seccompProfile - spec.containers[*].securityContext.capabilities - spec.containers[*].securityContext.readOnlyRootFilesystem - spec.containers[*].securityContext.privileged - spec.containers[*].securityContext.allowPrivilegeEscalation - spec.containers[*].securityContext.procMount - spec.containers[*].securityContext.runAsUser - spec.containers[*].securityContext.runAsGroup

       | `overhead`object
       | Overhead represents the resource overhead associated with running a pod for a given RuntimeClass. This field will be autopopulated at admission time by the RuntimeClass admission controller. If the RuntimeClass admission controller is enabled, overhead must not be set in Pod create requests. The RuntimeClass admission controller will reject Pod create requests which have the overhead already set. If RuntimeClass is configured and selected in the PodSpec, Overhead will be set to the value defined in the corresponding RuntimeClass, otherwise it will remain unset and treated as zero. More info: https://git.k8s.io/enhancements/keps/sig-node/688-pod-overhead/README.md

       | `preemptionPolicy`string
       | PreemptionPolicy is the Policy for preempting pods with lower priority. One of Never, PreemptLowerPriority. When Priority Admission Controller is enabled, it prevents users from setting this field. The admission controller populates this field from PriorityClassName. Defaults to PreemptLowerPriority if unset.Possible enum values: - `"Never"` means that pod never preempts other pods with lower priority. - `"PreemptLowerPriority"` means that pod can preempt other pods with lower priority.

       | `priority`integer
       | The priority value. Various system components use this field to find the priority of the pod. When Priority Admission Controller is enabled, it prevents users from setting this field. The admission controller populates this field from PriorityClassName. The higher the value, the higher the priority.

       | `priorityClassName`string
       | If specified, indicates the pod's priority. "system-node-critical" and "system-cluster-critical" are two special keywords which indicate the highest priorities with the former being the highest priority. Any other name must be defined by creating a PriorityClass object with that name. If not specified, the pod priority will be default or zero if there is no default.

       | `readinessGates`PodReadinessGate array
       | If specified, all readiness gates will be evaluated for pod readiness. A pod is ready when all its containers are ready AND all conditions specified in the readiness gates have status equal to "True" More info: https://git.k8s.io/enhancements/keps/sig-network/580-pod-readiness-gates

       | `resourceClaims`PodResourceClaim arraypatch strategy: merge,retainKeys on key `name`
       | ResourceClaims defines which ResourceClaims must be allocated and reserved before the Pod is allowed to start. The resources will be made available to those containers which consume them by name.  This is a stable field but requires that the DynamicResourceAllocation feature gate is enabled.  This field is immutable.

       | `resources`ResourceRequirements
       | Resources is the total amount of CPU and Memory resources required by all containers in the pod. It supports specifying Requests and Limits for "cpu", "memory" and "hugepages-" resource names only. ResourceClaims are not supported.  This field enables fine-grained control over resource allocation for the entire pod, allowing resource sharing among containers in a pod.  This is an alpha field and requires enabling the PodLevelResources feature gate.

       | `restartPolicy`string
       | Restart policy for all containers within the pod. One of Always, OnFailure, Never. In some contexts, only a subset of those values may be permitted. Default to Always. More info: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle/#restart-policyPossible enum values: - `"Always"` - `"Never"` - `"OnFailure"`

       | `runtimeClassName`string
       | RuntimeClassName refers to a RuntimeClass object in the node.k8s.io group, which should be used to run this pod.  If no RuntimeClass resource matches the named class, the pod will not be run. If unset or empty, the "legacy" RuntimeClass will be used, which is an implicit class with an empty definition that uses the default runtime handler. More info: https://git.k8s.io/enhancements/keps/sig-node/585-runtime-class

       | `schedulerName`string
       | If specified, the pod will be dispatched by specified scheduler. If not specified, the pod will be dispatched by default scheduler.

       | `schedulingGates`PodSchedulingGate arraypatch strategy: merge on key `name`
       | SchedulingGates is an opaque list of values that if specified will block scheduling the pod. If schedulingGates is not empty, the pod will stay in the SchedulingGated state and the scheduler will not attempt to schedule the pod.  SchedulingGates can only be set at pod creation time, and be removed only afterwards.

       | `schedulingGroup`PodSchedulingGroup
       | SchedulingGroup provides a reference to the immediate scheduling runtime grouping object that this Pod belongs to. This field is used by the scheduler to identify the group and apply the correct group scheduling policies. The association with a group also impacts other lifecycle aspects of a Pod that are relevant in a wider context of scheduling like preemption, resource attachment, etc. If not specified, the Pod is treated as a single unit in all of these aspects. The group object referenced by this field may not exist at the time the Pod is created. This field is immutable, but a group object with the same name may be recreated with different policies. Doing this during pod scheduling may result in the placement not conforming to the expected policies.
