---
title: "Pod (part 8 of 24)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/kubernetes-api/core/pod-v1.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Pod (part 8 of 24)

## GitRepoVolumeSource {#GitRepoVolumeSource}

Represents a volume that is populated with the contents of a git repository. Git repo volumes do not support ownership management. Git repo volumes support SELinux relabeling.

DEPRECATED: GitRepo is deprecated. To provision a container with a git repo, mount an EmptyDir into an InitContainer that clones the repo using git, then mount the EmptyDir into the Pod's container.

   | Field | Description

       | `directory`string
       | directory is the target directory name. Must not contain or start with '..'.  If '.' is supplied, the volume directory will be the git repository.  Otherwise, if specified, the volume will contain the git repository in the subdirectory with the given name.

       | `repository` *string
       | repository is the URL

       | `revision`string
       | revision is the commit hash for the specified revision.

## GlusterfsVolumeSource {#GlusterfsVolumeSource}

Represents a Glusterfs mount that lasts the lifetime of a pod. Glusterfs volumes do not support ownership management or SELinux relabeling.

   | Field | Description

       | `endpoints` *string
       | endpoints is the endpoint name that details Glusterfs topology.

       | `path` *string
       | path is the Glusterfs volume path. More info: https://examples.k8s.io/volumes/glusterfs/README.md#create-a-pod

       | `readOnly`boolean
       | readOnly here will force the Glusterfs volume to be mounted with read-only permissions. Defaults to false. More info: https://examples.k8s.io/volumes/glusterfs/README.md#create-a-pod

## HTTPGetAction {#HTTPGetAction}

HTTPGetAction describes an action based on HTTP Get requests.

   | Field | Description

       | `host`string
       | Host name to connect to, defaults to the pod IP. You probably want to set "Host" in httpHeaders instead.

       | `httpHeaders`HTTPHeader array
       | Custom headers to set in the request. HTTP allows repeated headers.

       | `path`string
       | Path to access on the HTTP server.

       | `port` *
       | Name or number of the port to access on the container. Number must be in the range 1 to 65535. Name must be an IANA_SVC_NAME.

       | `protocol`string
       | Protocol selects the wire protocol for the probe connection. Nil defaults to HTTP/1.1.Possible enum values: - `"HTTP1"` uses HTTP/1.1 (the existing default). - `"HTTP2"` uses HTTP/2. Currently, only cleartext with prior knowledge (h2c) is supported, and must be used with scheme HTTP.

       | `scheme`string
       | Scheme to use for connecting to the host. Defaults to HTTP.Possible enum values: - `"HTTP"` means that the scheme used will be http:// - `"HTTPS"` means that the scheme used will be https://

## HTTPHeader {#HTTPHeader}

HTTPHeader describes a custom header to be used in HTTP probes

   | Field | Description

       | `name` *string
       | The header field name. This will be canonicalized upon output, so case-variant names will be understood as the same header.

       | `value` *string
       | The header field value

## HostAlias {#HostAlias}

HostAlias holds the mapping between IP and hostnames that will be injected as an entry in the pod's hosts file.

   | Field | Description

       | `hostnames`string array
       | Hostnames for the above IP address.

       | `ip` *string
       | IP address of the host file entry.

## HostIP {#HostIP}

HostIP represents a single IP address allocated to the host.

   | Field | Description

       | `ip` *string
       | IP is the IP address assigned to the host

## ISCSIVolumeSource {#ISCSIVolumeSource}

Represents an ISCSI disk. ISCSI volumes can only be mounted as read/write once. ISCSI volumes support ownership management and SELinux relabeling.

   | Field | Description

       | `chapAuthDiscovery`boolean
       | chapAuthDiscovery defines whether support iSCSI Discovery CHAP authentication

       | `chapAuthSession`boolean
       | chapAuthSession defines whether support iSCSI Session CHAP authentication

       | `fsType`string
       | fsType is the filesystem type of the volume that you want to mount. Tip: Ensure that the filesystem type is supported by the host operating system. Examples: "ext4", "xfs", "ntfs". Implicitly inferred to be "ext4" if unspecified. More info: https://kubernetes.io/docs/concepts/storage/volumes#iscsi

       | `initiatorName`string
       | initiatorName is the custom iSCSI Initiator Name. If initiatorName is specified with iscsiInterface simultaneously, new iSCSI interface \<target portal>:\<volume name> will be created for the connection.

       | `iqn` *string
       | iqn is the target iSCSI Qualified Name.

       | `iscsiInterface`string
       | iscsiInterface is the interface Name that uses an iSCSI transport. Defaults to 'default' (tcp).

       | `lun` *integer
       | lun represents iSCSI Target Lun number.

       | `portals`string array
       | portals is the iSCSI Target Portal List. The portal is either an IP or ip_addr:port if the port is other than default (typically TCP ports 860 and 3260).

       | `readOnly`boolean
       | readOnly here will force the ReadOnly setting in VolumeMounts. Defaults to false.

       | `secretRef`LocalObjectReference
       | secretRef is the CHAP Secret for iSCSI target and initiator authentication

       | `targetPortal` *string
       | targetPortal is iSCSI Target Portal. The Portal is either an IP or ip_addr:port if the port is other than default (typically TCP ports 860 and 3260).

## ImageVolumeSource {#ImageVolumeSource}

ImageVolumeSource represents a image volume resource.

   | Field | Description

       | `pullPolicy`string
       | Policy for pulling OCI objects. Possible values are: Always: the kubelet always attempts to pull the reference. Container creation will fail If the pull fails. Never: the kubelet never pulls the reference and only uses a local image or artifact. Container creation will fail if the reference isn't present. IfNotPresent: the kubelet pulls if the reference isn't already present on disk. Container creation will fail if the reference isn't present and the pull fails. Defaults to Always if :latest tag is specified, or IfNotPresent otherwise.Possible enum values: - `"Always"` means that kubelet always attempts to pull the latest image. Container will fail If the pull fails. - `"IfNotPresent"` means that kubelet pulls if the image isn't present on disk. Container will fail if the image isn't present and the pull fails. - `"Never"` means that kubelet never pulls an image, but only uses a local image. Container will fail if the image isn't present

       | `reference`string
       | Required: Image or artifact reference to be used. Behaves in the same way as pod.spec.containers[*].image. Pull secrets will be assembled in the same way as for the container image by looking up node credentials, SA image pull secrets, and pod spec image pull secrets. More info: https://kubernetes.io/docs/concepts/containers/images This field is optional to allow higher level config management to default or override container images in workload controllers like Deployments and StatefulSets.

## ImageVolumeStatus {#ImageVolumeStatus}

ImageVolumeStatus represents the image-based volume status.

   | Field | Description

       | `imageRef` *string
       | ImageRef is the digest of the image used for this volume. It should have a value that's similar to the pod's status.containerStatuses[i].imageID. The ImageRef length should not exceed 256 characters.

## KeyToPath {#KeyToPath}

Maps a string key to a path within a volume.

   | Field | Description

       | `key` *string
       | key is the key to project.

       | `mode`integer
       | mode is Optional: mode bits used to set permissions on this file. Must be an octal value between 0000 and 0777 or a decimal value between 0 and 511. YAML accepts both octal and decimal values, JSON requires decimal values for mode bits. If not specified, the volume defaultMode will be used. This might be in conflict with other options that affect the file mode, like fsGroup, and the result can be other mode bits set.

       | `path` *string
       | path is the relative path of the file to map the key to. May not be an absolute path. May not contain the path element '..'. May not start with the string '..'.

       | `user`integer
       | user is Optional: The owner UID of the created file. If specified, the item-level user field takes precedence over defaultUser. (Alpha) This field requires the AtomicWriteVolumeUserFields feature gate to be enabled.

## Lifecycle {#Lifecycle}

Lifecycle describes actions that the management system should take in response to container lifecycle events. For the PostStart and PreStop lifecycle handlers, management of the container blocks until the action is complete, unless the container process fails, in which case the handler is aborted.

   | Field | Description

       | `postStart`LifecycleHandler
       | PostStart is called immediately after a container is created. If the handler fails, the container is terminated and restarted according to its restart policy. Other management of the container blocks until the hook completes. More info: https://kubernetes.io/docs/concepts/containers/container-lifecycle-hooks/#container-hooks

       | `preStop`LifecycleHandler
       | PreStop is called immediately before a container is terminated due to an API request or management event such as liveness/startup probe failure, preemption, resource contention, etc. The handler is not called if the container crashes or exits. The Pod's termination grace period countdown begins before the PreStop hook is executed. Regardless of the outcome of the handler, the container will eventually terminate within the Pod's termination grace period (unless delayed by finalizers). Other management of the container blocks until the hook completes or until the termination grace period is reached. More info: https://kubernetes.io/docs/concepts/containers/container-lifecycle-hooks/#container-hooks

       | `stopSignal`string
       | StopSignal defines which signal will be sent to a container when it is being stopped. If not specified, the default is defined by the container runtime in use. StopSignal can only be set for Pods with a non-empty .spec.os.namePossible enum values: - `"SIGABRT"` - `"SIGALRM"` - `"SIGBUS"` - `"SIGCHLD"` - `"SIGCLD"` - `"SIGCONT"` - `"SIGFPE"` - `"SIGHUP"` - `"SIGILL"` - `"SIGINT"` - `"SIGIO"` - `"SIGIOT"` - `"SIGKILL"` - `"SIGPIPE"` - `"SIGPOLL"` - `"SIGPROF"` - `"SIGPWR"` - `"SIGQUIT"` - `"SIGRTMAX"` - `"SIGRTMAX-1"` - `"SIGRTMAX-10"` - `"SIGRTMAX-11"` - `"SIGRTMAX-12"` - `"SIGRTMAX-13"` - `"SIGRTMAX-14"` - `"SIGRTMAX-2"` - `"SIGRTMAX-3"` - `"SIGRTMAX-4"` - `"SIGRTMAX-5"` - `"SIGRTMAX-6"` - `"SIGRTMAX-7"` - `"SIGRTMAX-8"` - `"SIGRTMAX-9"` - `"SIGRTMIN"` - `"SIGRTMIN+1"` - `"SIGRTMIN+10"` - `"SIGRTMIN+11"` - `"SIGRTMIN+12"` - `"SIGRTMIN+13"` - `"SIGRTMIN+14"` - `"SIGRTMIN+15"` - `"SIGRTMIN+2"` - `"SIGRTMIN+3"` - `"SIGRTMIN+4"` - `"SIGRTMIN+5"` - `"SIGRTMIN+6"` - `"SIGRTMIN+7"` - `"SIGRTMIN+8"` - `"SIGRTMIN+9"` - `"SIGSEGV"` - `"SIGSTKFLT"` - `"SIGSTOP"` - `"SIGSYS"` - `"SIGTERM"` - `"SIGTRAP"` - `"SIGTSTP"` - `"SIGTTIN"` - `"SIGTTOU"` - `"SIGURG"` - `"SIGUSR1"` - `"SIGUSR2"` - `"SIGVTALRM"` - `"SIGWINCH"` - `"SIGXCPU"` - `"SIGXFSZ"`

## LifecycleHandler {#LifecycleHandler}

LifecycleHandler defines a specific action that should be taken in a lifecycle hook. One and only one of the fields, except TCPSocket must be specified.

   | Field | Description

       | `exec`ExecAction
       | Exec specifies a command to execute in the container.

       | `httpGet`HTTPGetAction
       | HTTPGet specifies an HTTP GET request to perform.

       | `sleep`SleepAction
       | Sleep represents a duration that the container should sleep.

       | `tcpSocket`TCPSocketAction
       | Deprecated. TCPSocket is NOT supported as a LifecycleHandler and kept for backward compatibility. There is no validation of this field and lifecycle hooks will fail at runtime when it is specified.

## LinuxContainerUser {#LinuxContainerUser}

LinuxContainerUser represents user identity information in Linux containers

   | Field | Description

       | `gid` *integer
       | GID is the primary gid initially attached to the first process in the container

       | `supplementalGroups`integer array
       | SupplementalGroups are the supplemental groups initially attached to the first process in the container

       | `uid` *integer
       | UID is the primary uid initially attached to the first process in the container

## NodeAffinity {#NodeAffinity}

Node affinity is a group of node affinity scheduling rules.

   | Field | Description

       | `preferredDuringSchedulingIgnoredDuringExecution`PreferredSchedulingTerm array
       | The scheduler will prefer to schedule pods to nodes that satisfy the affinity expressions specified by this field, but it may choose a node that violates one or more of the expressions. The node that is most preferred is the one with the greatest sum of weights, i.e. for each node that meets all of the scheduling requirements (resource request, requiredDuringScheduling affinity expressions, etc.), compute a sum by iterating through the elements of this field and adding "weight" to the sum if the node matches the corresponding matchExpressions; the node(s) with the highest sum are the most preferred.

       | `requiredDuringSchedulingIgnoredDuringExecution`NodeSelector
       | If the affinity requirements specified by this field are not met at scheduling time, the pod will not be scheduled onto the node. If the affinity requirements specified by this field cease to be met at some point during pod execution (e.g. due to an update), the system may or may not try to eventually evict the pod from its node.

## NodeAllocatableMappedResources {#NodeAllocatableMappedResources}

NodeAllocatableMappedResources describes mapped node allocatable resource allocations.

   | Field | Description

       | `name` *string
       | Name is the name of the resource (e.g., cpu, memory).

       | `quantity` *Quantity
       | Quantity is the total node allocatable resource capacity allocated for the claim. This claim's allocated devices is shared by all the containers referencing the claim. Kubelet adds this value to both requests and limits at the pod-level cgroup, and to limits at the container-level cgroup for each container referencing the claim.
