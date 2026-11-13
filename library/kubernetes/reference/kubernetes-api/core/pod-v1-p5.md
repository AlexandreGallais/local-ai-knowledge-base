---
title: "Pod (part 5 of 24)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/kubernetes-api/core/pod-v1.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Pod (part 5 of 24)

## Container {#Container}

A single application container that you want to run within a pod.

   | Field | Description

       | `args`string array
       | Arguments to the entrypoint. The container image's CMD is used if this is not provided. Variable references $(VAR_NAME) are expanded using the container's environment. If a variable cannot be resolved, the reference in the input string will be unchanged. Double $$ are reduced to a single $, which allows for escaping the $(VAR_NAME) syntax: i.e. "$$(VAR_NAME)" will produce the string literal "$(VAR_NAME)". Escaped references will never be expanded, regardless of whether the variable exists or not. Cannot be updated. More info: https://kubernetes.io/docs/tasks/inject-data-application/define-command-argument-container/#running-a-command-in-a-shell

       | `command`string array
       | Entrypoint array. Not executed within a shell. The container image's ENTRYPOINT is used if this is not provided. Variable references $(VAR_NAME) are expanded using the container's environment. If a variable cannot be resolved, the reference in the input string will be unchanged. Double $$ are reduced to a single $, which allows for escaping the $(VAR_NAME) syntax: i.e. "$$(VAR_NAME)" will produce the string literal "$(VAR_NAME)". Escaped references will never be expanded, regardless of whether the variable exists or not. Cannot be updated. More info: https://kubernetes.io/docs/tasks/inject-data-application/define-command-argument-container/#running-a-command-in-a-shell

       | `env`EnvVar arraypatch strategy: merge on key `name`
       | List of environment variables to set in the container. Cannot be updated.

       | `envFrom`EnvFromSource array
       | List of sources to populate environment variables in the container. The keys defined within a source may consist of any printable ASCII characters except '='. When a key exists in multiple sources, the value associated with the last source will take precedence. Values defined by an Env with a duplicate key will take precedence. Cannot be updated.

       | `image`string
       | Container image name. More info: https://kubernetes.io/docs/concepts/containers/images This field is optional to allow higher level config management to default or override container images in workload controllers like Deployments and StatefulSets.

       | `imagePullPolicy`string
       | Image pull policy. One of Always, Never, IfNotPresent. Defaults to Always if :latest tag is specified, or IfNotPresent otherwise. Cannot be updated. More info: https://kubernetes.io/docs/concepts/containers/images#updating-imagesPossible enum values: - `"Always"` means that kubelet always attempts to pull the latest image. Container will fail If the pull fails. - `"IfNotPresent"` means that kubelet pulls if the image isn't present on disk. Container will fail if the image isn't present and the pull fails. - `"Never"` means that kubelet never pulls an image, but only uses a local image. Container will fail if the image isn't present

       | `lifecycle`Lifecycle
       | Actions that the management system should take in response to container lifecycle events. Cannot be updated.

       | `livenessProbe`Probe
       | Periodic probe of container liveness. Container will be restarted if the probe fails. Cannot be updated. More info: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle#container-probes

       | `name` *string
       | Name of the container specified as a DNS_LABEL. Each container in a pod must have a unique name (DNS_LABEL). Cannot be updated.

       | `ports`ContainerPort arraypatch strategy: merge on key `containerPort`
       | List of ports to expose from the container. Not specifying a port here DOES NOT prevent that port from being exposed. Any port which is listening on the default "0.0.0.0" address inside a container will be accessible from the network. Modifying this array with strategic merge patch may corrupt the data. For more information See https://github.com/kubernetes/kubernetes/issues/108255. Cannot be updated.

       | `readinessProbe`Probe
       | Periodic probe of container service readiness. Container will be removed from service endpoints if the probe fails. Cannot be updated. More info: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle#container-probes

       | `resizePolicy`ContainerResizePolicy array
       | Resources resize policy for the container. This field cannot be set on ephemeral containers.

       | `resources`ResourceRequirements
       | Compute Resources required by this container. Cannot be updated. More info: https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/

       | `restartPolicy`string
       | RestartPolicy defines the restart behavior of individual containers in a pod. This overrides the pod-level restart policy. When this field is not specified, the restart behavior is defined by the Pod's restart policy and the container type. Additionally, setting the RestartPolicy as "Always" for the init container will have the following effect: this init container will be continually restarted on exit until all regular containers have terminated. Once all regular containers have completed, all init containers with restartPolicy "Always" will be shut down. This lifecycle differs from normal init containers and is often referred to as a "sidecar" container. Although this init container still starts in the init container sequence, it does not wait for the container to complete before proceeding to the next init container. Instead, the next init container starts immediately after this init container is started, or after any startupProbe has successfully completed.

       | `restartPolicyRules`ContainerRestartRule array
       | Represents a list of rules to be checked to determine if the container should be restarted on exit. The rules are evaluated in order. Once a rule matches a container exit condition, the remaining rules are ignored. If no rule matches the container exit condition, the Container-level restart policy determines the whether the container is restarted or not. Constraints on the rules: - At most 20 rules are allowed. - Rules can have the same action. - Identical rules are not forbidden in validations. When rules are specified, container MUST set RestartPolicy explicitly even it if matches the Pod's RestartPolicy.

       | `securityContext`SecurityContext
       | SecurityContext defines the security options the container should be run with. If set, the fields of SecurityContext override the equivalent fields of PodSecurityContext. More info: https://kubernetes.io/docs/tasks/configure-pod-container/security-context/

       | `startupProbe`Probe
       | StartupProbe indicates that the Pod has successfully initialized. If specified, no other probes are executed until this completes successfully. If this probe fails, the Pod will be restarted, just as if the livenessProbe failed. This can be used to provide different probe parameters at the beginning of a Pod's lifecycle, when it might take a long time to load data or warm a cache, than during steady-state operation. This cannot be updated. More info: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle#container-probes

       | `stdin`boolean
       | Whether this container should allocate a buffer for stdin in the container runtime. If this is not set, reads from stdin in the container will always result in EOF. Default is false.

       | `stdinOnce`boolean
       | Whether the container runtime should close the stdin channel after it has been opened by a single attach. When stdin is true the stdin stream will remain open across multiple attach sessions. If stdinOnce is set to true, stdin is opened on container start, is empty until the first client attaches to stdin, and then remains open and accepts data until the client disconnects, at which time stdin is closed and remains closed until the container is restarted. If this flag is false, a container processes that reads from stdin will never receive an EOF. Default is false

       | `terminationMessagePath`string
       | Optional: Path at which the file to which the container's termination message will be written is mounted into the container's filesystem. Message written is intended to be brief final status, such as an assertion failure message. Will be truncated by the node if greater than 4096 bytes. The total message length across all containers will be limited to 12kb. Defaults to /dev/termination-log. Cannot be updated.

       | `terminationMessagePolicy`string
       | Indicate how the termination message should be populated. File will use the contents of terminationMessagePath to populate the container status message on both success and failure. FallbackToLogsOnError will use the last chunk of container log output if the termination message file is empty and the container exited with an error. The log output is limited to 2048 bytes or 80 lines, whichever is smaller. Defaults to File. Cannot be updated.Possible enum values: - `"FallbackToLogsOnError"` will read the most recent contents of the container logs for the container status message when the container exits with an error and the terminationMessagePath has no contents. - `"File"` is the default behavior and will set the container status message to the contents of the container's terminationMessagePath when the container exits.

       | `tty`boolean
       | Whether this container should allocate a TTY for itself, also requires 'stdin' to be true. Default is false.

       | `volumeDevices`VolumeDevice arraypatch strategy: merge on key `devicePath`
       | volumeDevices is the list of block devices to be used by the container.

       | `volumeMounts`VolumeMount arraypatch strategy: merge on key `mountPath`
       | Pod volumes to mount into the container's filesystem. Cannot be updated.

       | `workingDir`string
       | Container's working directory. If not specified, the container runtime's default will be used, which might be configured in the container image. Cannot be updated.

## ContainerExtendedResourceRequest {#ContainerExtendedResourceRequest}

ContainerExtendedResourceRequest has the mapping of container name, extended resource name to the device request name.

   | Field | Description

       | `containerName` *string
       | The name of the container requesting resources.

       | `requestName` *string
       | The name of the request in the special ResourceClaim which corresponds to the extended resource.

       | `resourceName` *string
       | The name of the extended resource in that container which gets backed by DRA.

## ContainerPort {#ContainerPort}

ContainerPort represents a network port in a single container.

   | Field | Description

       | `containerPort` *integer
       | Number of port to expose on the pod's IP address. This must be a valid port number, 0 \< x \< 65536.

       | `hostIP`string
       | What host IP to bind the external port to.

       | `hostPort`integer
       | Number of port to expose on the host. If specified, this must be a valid port number, 0 \< x \< 65536. If HostNetwork is specified, this must match ContainerPort. Most containers do not need this.

       | `name`string
       | If specified, this must be an IANA_SVC_NAME and unique within the pod. Each named port in a pod must have a unique name. Name for the port that can be referred to by services.

       | `protocol`string
       | Protocol for port. Must be UDP, TCP, or SCTP. Defaults to "TCP".Possible enum values: - `"SCTP"` is the SCTP protocol. - `"TCP"` is the TCP protocol. - `"UDP"` is the UDP protocol.

## ContainerResizePolicy {#ContainerResizePolicy}

ContainerResizePolicy represents resource resize policy for the container.

   | Field | Description

       | `resourceName` *string
       | Name of the resource to which this resource resize policy applies. Supported values: cpu, memory.

       | `restartPolicy` *string
       | Restart policy to apply when specified resource is resized. If not specified, it defaults to NotRequired.

## ContainerRestartRule {#ContainerRestartRule}

ContainerRestartRule describes how a container exit is handled.

   | Field | Description

       | `action` *string
       | Specifies the action taken on a container exit if the requirements are satisfied. The only possible value is "Restart" to restart the container.

       | `exitCodes`ContainerRestartRuleOnExitCodes
       | Represents the exit codes to check on container exits.

## ContainerRestartRuleOnExitCodes {#ContainerRestartRuleOnExitCodes}

ContainerRestartRuleOnExitCodes describes the condition for handling an exited container based on its exit codes.

   | Field | Description

       | `operator` *string
       | Represents the relationship between the container exit code(s) and the specified values. Possible values are: - In: the requirement is satisfied if the container exit code is in the   set of specified values. - NotIn: the requirement is satisfied if the container exit code is   not in the set of specified values.

       | `values`integer array
       | Specifies the set of values to check for container exit codes. At most 255 elements are allowed.

## ContainerState {#ContainerState}

ContainerState holds a possible state of container. Only one of its members may be specified. If none of them is specified, the default one is ContainerStateWaiting.

   | Field | Description

       | `running`ContainerStateRunning
       | Details about a running container

       | `terminated`ContainerStateTerminated
       | Details about a terminated container

       | `waiting`ContainerStateWaiting
       | Details about a waiting container

## ContainerStateRunning {#ContainerStateRunning}

ContainerStateRunning is a running state of a container.

   | Field | Description

       | `startedAt`Time
       | Time at which the container was last (re-)started

## ContainerStateTerminated {#ContainerStateTerminated}

ContainerStateTerminated is a terminated state of a container.

   | Field | Description

       | `containerID`string
       | Container's ID in the format '\<type>://\<container_id>'

       | `exitCode` *integer
       | Exit status from the last termination of the container

       | `finishedAt`Time
       | Time at which the container last terminated

       | `message`string
       | Message regarding the last termination of the container

       | `reason`string
       | (brief) reason from the last termination of the container

       | `signal`integer
       | Signal from the last termination of the container

       | `startedAt`Time
       | Time at which previous execution of the container started
