---
title: "Pod (part 7 of 24)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/kubernetes-api/core/pod-v1.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Pod (part 7 of 24)

## EphemeralContainer {#EphemeralContainer}

An EphemeralContainer is a temporary container that you may add to an existing Pod for user-initiated activities such as debugging. Ephemeral containers have no resource or scheduling guarantees, and they will not be restarted when they exit or when a Pod is removed or restarted. The kubelet may evict a Pod if an ephemeral container causes the Pod to exceed its resource allocation.

To add an ephemeral container, use the ephemeralcontainers subresource of an existing Pod. Ephemeral containers may not be removed or restarted.

   | Field | Description

       | `args`string array
       | Arguments to the entrypoint. The image's CMD is used if this is not provided. Variable references $(VAR_NAME) are expanded using the container's environment. If a variable cannot be resolved, the reference in the input string will be unchanged. Double $$ are reduced to a single $, which allows for escaping the $(VAR_NAME) syntax: i.e. "$$(VAR_NAME)" will produce the string literal "$(VAR_NAME)". Escaped references will never be expanded, regardless of whether the variable exists or not. Cannot be updated. More info: https://kubernetes.io/docs/tasks/inject-data-application/define-command-argument-container/#running-a-command-in-a-shell

       | `command`string array
       | Entrypoint array. Not executed within a shell. The image's ENTRYPOINT is used if this is not provided. Variable references $(VAR_NAME) are expanded using the container's environment. If a variable cannot be resolved, the reference in the input string will be unchanged. Double $$ are reduced to a single $, which allows for escaping the $(VAR_NAME) syntax: i.e. "$$(VAR_NAME)" will produce the string literal "$(VAR_NAME)". Escaped references will never be expanded, regardless of whether the variable exists or not. Cannot be updated. More info: https://kubernetes.io/docs/tasks/inject-data-application/define-command-argument-container/#running-a-command-in-a-shell

       | `env`EnvVar arraypatch strategy: merge on key `name`
       | List of environment variables to set in the container. Cannot be updated.

       | `envFrom`EnvFromSource array
       | List of sources to populate environment variables in the container. The keys defined within a source may consist of any printable ASCII characters except '='. When a key <example-value> in multiple sources, the value associated with the last source will take precedence. Values defined by an Env with a duplicate key will take precedence. Cannot be updated.

       | `image`string
       | Container image name. More info: https://kubernetes.io/docs/concepts/containers/images

       | `imagePullPolicy`string
       | Image pull policy. One of Always, Never, IfNotPresent. Defaults to Always if :latest tag is specified, or IfNotPresent otherwise. Cannot be updated. More info: https://kubernetes.io/docs/concepts/containers/images#updating-imagesPossible enum values: - `"Always"` means that kubelet always attempts to pull the latest image. Container will fail If the pull fails. - `"IfNotPresent"` means that kubelet pulls if the image isn't present on disk. Container will fail if the image isn't present and the pull fails. - `"Never"` means that kubelet never pulls an image, but only uses a local image. Container will fail if the image isn't present

       | `lifecycle`Lifecycle
       | Lifecycle is not allowed for ephemeral containers.

       | `livenessProbe`Probe
       | Probes are not allowed for ephemeral containers.

       | `name` *string
       | Name of the ephemeral container specified as a DNS_LABEL. This name must be unique among all containers, init containers and ephemeral containers.

       | `ports`ContainerPort arraypatch strategy: merge on key `containerPort`
       | Ports are not allowed for ephemeral containers.

       | `readinessProbe`Probe
       | Probes are not allowed for ephemeral containers.

       | `resizePolicy`ContainerResizePolicy array
       | Resources resize policy for the container.

       | `resources`ResourceRequirements
       | Resources are not allowed for ephemeral containers. Ephemeral containers use spare resources already allocated to the pod.

       | `restartPolicy`string
       | Restart policy for the container to manage the restart behavior of each container within a pod. You cannot set this field on ephemeral containers.

       | `restartPolicyRules`ContainerRestartRule array
       | Represents a list of rules to be checked to determine if the container should be restarted on exit. You cannot set this field on ephemeral containers.

       | `securityContext`SecurityContext
       | Optional: SecurityContext defines the security options the ephemeral container should be run with. If set, the fields of SecurityContext override the equivalent fields of PodSecurityContext.

       | `startupProbe`Probe
       | Probes are not allowed for ephemeral containers.

       | `stdin`boolean
       | Whether this container should allocate a buffer for stdin in the container runtime. If this is not set, reads from stdin in the container will always result in EOF. Default is false.

       | `stdinOnce`boolean
       | Whether the container runtime should close the stdin channel after it has been opened by a single attach. When stdin is true the stdin stream will remain open across multiple attach sessions. If stdinOnce is set to true, stdin is opened on container start, is empty until the first client attaches to stdin, and then remains open and accepts data until the client disconnects, at which time stdin is closed and remains closed until the container is restarted. If this flag is false, a container processes that reads from stdin will never receive an EOF. Default is false

       | `targetContainerName`string
       | If set, the name of the container from PodSpec that this ephemeral container targets. The ephemeral container will be run in the namespaces (IPC, PID, etc) of this container. If not set then the ephemeral container uses the namespaces configured in the Pod spec.  The container runtime must implement support for this feature. If the runtime does not support namespace targeting then the result of setting this field is undefined.

       | `terminationMessagePath`string
       | Optional: Path at which the file to which the container's termination message will be written is mounted into the container's filesystem. Message written is intended to be brief final status, such as an assertion failure message. Will be truncated by the node if greater than 4096 bytes. The total message length across all containers will be limited to 12kb. Defaults to /dev/termination-log. Cannot be updated.

       | `terminationMessagePolicy`string
       | Indicate how the termination message should be populated. File will use the contents of terminationMessagePath to populate the container status message on both success and failure. FallbackToLogsOnError will use the last chunk of container log output if the termination message file is empty and the container exited with an error. The log output is limited to 2048 bytes or 80 lines, whichever is smaller. Defaults to File. Cannot be updated.Possible enum values: - `"FallbackToLogsOnError"` will read the most recent contents of the container logs for the container status message when the container exits with an error and the terminationMessagePath has no contents. - `"File"` is the default behavior and will set the container status message to the contents of the container's terminationMessagePath when the container exits.

       | `tty`boolean
       | Whether this container should allocate a TTY for itself, also requires 'stdin' to be true. Default is false.

       | `volumeDevices`VolumeDevice arraypatch strategy: merge on key `devicePath`
       | volumeDevices is the list of block devices to be used by the container.

       | `volumeMounts`VolumeMount arraypatch strategy: merge on key `mountPath`
       | Pod volumes to mount into the container's filesystem. Subpath mounts are not allowed for ephemeral containers. Cannot be updated.

       | `workingDir`string
       | Container's working directory. If not specified, the container runtime's default will be used, which might be configured in the container image. Cannot be updated.

## EphemeralVolumeSource {#EphemeralVolumeSource}

Represents an ephemeral volume that is handled by a normal storage driver.

   | Field | Description

       | `volumeClaimTemplate`PersistentVolumeClaimTemplate
       | Will be used to create a stand-alone PVC to provision the volume. The pod in which this EphemeralVolumeSource is embedded will be the owner of the PVC, i.e. the PVC will be deleted together with the pod.  The name of the PVC will be `\<pod name>-\<volume name>` where `\<volume name>` is the name from the `PodSpec.Volumes` array entry. Pod validation will reject the pod if the concatenated name is not valid for a PVC (for example, too long).  An existing PVC with that name that is not owned by the pod will *not* be used for the pod to avoid using an unrelated volume by mistake. Starting the pod is then blocked until the unrelated PVC is removed. If such a pre-created PVC is meant to be used by the pod, the PVC has to updated with an owner reference to the pod once the pod exists. Normally this should not be necessary, but it may be useful when manually reconstructing a broken cluster.  This field is read-only and no changes will be made by Kubernetes to the PVC after it has been created.  Required, must not be nil.

## EvictionResponder {#EvictionResponder}

EvictionResponder allows you to specify the responder reacting to an Eviction. Responders should observe and communicate through the Eviction Resource API to help with the graceful eviction of a target (e.g. termination of a pod).

   | Field | Description

       | `name` *string
       | name allows you to identify the responder responding to the Eviction.  It must be a valid domain-prefixed key (such as "acme.io/foo"). Domain names *.k8s.io and *.kubernetes.io are reserved. This field must be unique for each responder. This field is required.

       | `priority` *integer
       | priority for this responder. Higher priorities are selected first by the evictionrequest-controller. If there are responders with the same priority, the responder whose domain name comes first in the alphabetical higher domain order, will be picked. This means that the top domain labels are compared alphabetically first, followed by the lower domain labels. The key is compared last.  The responder that is the managing controller of the pod should set the value of this field to 10000 to allow both for preemption or fallback registration by other responders.  The minimum value is 0 and the maximum value is 100000. The interval 0-999 is reserved for responders with *.k8s.io suffix. This field is required.

## ExecAction {#ExecAction}

ExecAction describes a &#34;run in container&#34; action.

   | Field | Description

       | `command`string array
       | Command is the command line to execute inside the container, the working directory for the command  is root ('/') in the container's filesystem. The command is simply exec'd, it is not run inside a shell, so traditional shell instructions ('|', etc) won't work. To use a shell, you need to explicitly call out to that shell. Exit status of 0 is treated as live/healthy and non-zero is unhealthy.

## FileKeySelector {#FileKeySelector}

FileKeySelector selects a key of the env file.

   | Field | Description

       | `key` *string
       | The key <example-value> the env file. An invalid key will prevent the pod from starting. The keys defined within a source may consist of any printable ASCII characters except '='. During Alpha stage of the EnvFiles feature gate, the key size is limited to 128 characters.

       | `optional`boolean
       | Specify whether the file or its key must be defined. If the file or key does not exist, then the env var is not published. If optional is set to true and the specified key does not exist, the environment variable will not be set in the Pod's containers.  If optional is set to false and the specified key does not exist, an error will be returned during Pod creation.

       | `path` *string
       | The path within the volume from which to select the file. Must be relative and may not contain the '..' path or start with '..'.

       | `volumeName` *string
       | The name of the volume mount containing the env file.

## FlexVolumeSource {#FlexVolumeSource}

FlexVolume represents a generic volume resource that is provisioned/attached using an exec based plugin.

   | Field | Description

       | `driver` *string
       | driver is the name of the driver to use for this volume.

       | `fsType`string
       | fsType is the filesystem type to mount. Must be a filesystem type supported by the host operating system. Ex. "ext4", "xfs", "ntfs". The default filesystem depends on FlexVolume script.

       | `options`object
       | options is Optional: this field holds extra command options if any.

       | `readOnly`boolean
       | readOnly is Optional: defaults to false (read/write). ReadOnly here will force the ReadOnly setting in VolumeMounts.

       | `secretRef`LocalObjectReference
       | secretRef is Optional: secretRef is reference to the secret <example-value> containing sensitive information to pass to the plugin scripts. This may be empty if no secret <example-value> is specified. If the secret <example-value> contains more than one secret, all secrets are passed to the plugin scripts.

## GRPCAction {#GRPCAction}

GRPCAction specifies an action involving a GRPC service.

   | Field | Description

       | `mode`string
       | mode specifies the connection mode for the gRPC health probe. Set to "TLS" to use TLS without certificate verification. Set to "Plaintext" to use a plaintext (insecure) connection explicitly. If not specified, the probe uses a plaintext (insecure) connection.Possible enum values: - `"Plaintext"` indicates that the probe should use a plaintext (insecure) gRPC connection. - `"TLS"` indicates that the probe should connect using TLS without certificate verification.

       | `port` *integer
       | Port number of the gRPC service. Number must be in the range 1 to 65535.

       | `service`string
       | Service is the name of the service to place in the gRPC HealthCheckRequest (see https://github.com/grpc/grpc/blob/master/doc/health-checking.md).  If this is not specified, the default behavior is defined by gRPC.
