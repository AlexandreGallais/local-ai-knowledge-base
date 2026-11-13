---
title: "Pod (part 6 of 24)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/kubernetes-api/core/pod-v1.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Pod (part 6 of 24)

## ContainerStateWaiting {#ContainerStateWaiting}

ContainerStateWaiting is a waiting state of a container.

   | Field | Description

       | `message`string
       | Message regarding why the container is not yet running.

       | `reason`string
       | (brief) reason the container is not yet running.

## ContainerUser {#ContainerUser}

ContainerUser represents user identity information

   | Field | Description

       | `linux`LinuxContainerUser
       | Linux holds user identity information initially attached to the first process of the containers in Linux. Note that the actual running identity can be changed if the process has enough privilege to do so.

## DownwardAPIProjection {#DownwardAPIProjection}

Represents downward API info for projecting into a projected volume. Note that this is identical to a downwardAPI volume source without the default mode.

   | Field | Description

       | `items`DownwardAPIVolumeFile array
       | Items is a list of DownwardAPIVolume file

## DownwardAPIVolumeFile {#DownwardAPIVolumeFile}

DownwardAPIVolumeFile represents information to create the file containing the pod field

   | Field | Description

       | `fieldRef`ObjectFieldSelector
       | Required: Selects a field of the pod: only annotations, labels, name, namespace and uid are supported.

       | `mode`integer
       | Optional: mode bits used to set permissions on this file, must be an octal value between 0000 and 0777 or a decimal value between 0 and 511. YAML accepts both octal and decimal values, JSON requires decimal values for mode bits. If not specified, the volume defaultMode will be used. This might be in conflict with other options that affect the file mode, like fsGroup, and the result can be other mode bits set.

       | `path` *string
       | Required: Path is  the relative path name of the file to be created. Must not be absolute or contain the '..' path. Must be utf-8 encoded. The first item of the relative path must not start with '..'

       | `resourceFieldRef`ResourceFieldSelector
       | Selects a resource of the container: only resources limits and requests (limits.cpu, limits.memory, requests.cpu and requests.memory) are currently supported.

       | `user`integer
       | user is Optional: The owner UID of the created file. If specified, the item-level user field takes precedence over defaultUser. (Alpha) This field requires the AtomicWriteVolumeUserFields feature gate to be enabled.

## DownwardAPIVolumeSource {#DownwardAPIVolumeSource}

DownwardAPIVolumeSource represents a volume containing downward API info. Downward API volumes support ownership management and SELinux relabeling.

   | Field | Description

       | `defaultMode`integer
       | Optional: mode bits to use on created files by default. Must be a Optional: mode bits used to set permissions on created files by default. Must be an octal value between 0000 and 0777 or a decimal value between 0 and 511. YAML accepts both octal and decimal values, JSON requires decimal values for mode bits. Defaults to 0644. Directories within the path are not affected by this setting. This might be in conflict with other options that affect the file mode, like fsGroup, and the result can be other mode bits set.

       | `defaultUser`integer
       | defaultUser is Optional: The owner UID of the created files by default. The defaultUser field is only used as a fallback when the item-level user field is unset. (Alpha) This field requires the AtomicWriteVolumeUserFields feature gate to be enabled.

       | `items`DownwardAPIVolumeFile array
       | Items is a list of downward API volume file

## EmptyDirVolumeSource {#EmptyDirVolumeSource}

Represents an empty directory for a pod. Empty directory volumes support ownership management and SELinux relabeling.

   | Field | Description

       | `medium`string
       | medium represents what type of storage medium should back this directory. The default is "" which means to use the node's default medium. Must be an empty string (default) or Memory. More info: https://kubernetes.io/docs/concepts/storage/volumes#emptydir

       | `mode`integer
       | mode specifies the permission bits for the emptyDir directory, in numeric notation (e.g., 0755, 01777). Must be a value between 0000 and 01777. If not specified, defaults to 0777. This might be in conflict with other options that affect the file mode, like fsGroup. If fsGroup is specified, the fsGroup permissions will override the mode specified here. This field has no effect on Windows. This field is alpha and requires EmptyDirVolumeMode featuregate to be enabled.

       | `sizeLimit`Quantity
       | sizeLimit is the total amount of local storage required for this EmptyDir volume. The size limit is also applicable for memory medium. The maximum usage on memory medium EmptyDir would be the minimum value between the SizeLimit specified here and the sum of memory limits of all containers in a pod. The default is nil which means that the limit is undefined. More info: https://kubernetes.io/docs/concepts/storage/volumes#emptydir

## EnvFromSource {#EnvFromSource}

EnvFromSource represents the source of a set of ConfigMaps or Secrets

   | Field | Description

       | `configMapRef`ConfigMapEnvSource
       | The ConfigMap to select from

       | `prefix`string
       | Optional text to prepend to the name of each environment variable. May consist of any printable ASCII characters except '='.

       | `secretRef`SecretEnvSource
       | The Secret to select from

## EnvVar {#EnvVar}

EnvVar represents an environment variable present in a Container.

   | Field | Description

       | `name` *string
       | Name of the environment variable. May consist of any printable ASCII characters except '='.

       | `value`string
       | Variable references $(VAR_NAME) are expanded using the previously defined environment variables in the container and any service environment variables. If a variable cannot be resolved, the reference in the input string will be unchanged. Double $$ are reduced to a single $, which allows for escaping the $(VAR_NAME) syntax: i.e. "$$(VAR_NAME)" will produce the string literal "$(VAR_NAME)". Escaped references will never be expanded, regardless of whether the variable exists or not. Defaults to "".

       | `valueFrom`EnvVarSource
       | Source for the environment variable's value. Cannot be used if value is not empty.

## EnvVarSource {#EnvVarSource}

EnvVarSource represents a source for the value of an EnvVar.

   | Field | Description

       | `configMapKeyRef`ConfigMapKeySelector
       | Selects a key of a ConfigMap.

       | `fieldRef`ObjectFieldSelector
       | Selects a field of the pod: supports metadata.name, metadata.namespace, `metadata.labels['\<KEY>']`, `metadata.annotations['\<KEY>']`, spec.nodeName, spec.serviceAccountName, status.hostIP, status.podIP, status.podIPs.

       | `fileKeyRef`FileKeySelector
       | FileKeyRef selects a key of the env file. Requires the EnvFiles feature gate to be enabled.

       | `resourceFieldRef`ResourceFieldSelector
       | Selects a resource of the container: only resources limits and requests (limits.cpu, limits.memory, limits.ephemeral-storage, requests.cpu, requests.memory and requests.ephemeral-storage) are currently supported.

       | `secretKeyRef`SecretKeySelector
       | Selects a key of a secret in the pod's namespace
