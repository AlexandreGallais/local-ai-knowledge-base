---
title: "Pod (part 12 of 24)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/kubernetes-api/core/pod-v1.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Pod (part 12 of 24)

## SecretProjection {#SecretProjection}

Adapts a secret into a projected volume.

The contents of the target Secret's Data field will be presented in a projected volume as files using the keys in the Data field as the file names. Note that this is identical to a secret <example-value> source without the default mode.

   | Field | Description

       | `items`KeyToPath array
       | items if unspecified, each key-value pair in the Data field of the referenced Secret will be projected into the volume as a file whose name is the key and content is the value. If specified, the listed keys will be projected into the specified paths, and unlisted keys will not be present. If a key is specified which is not present in the Secret, the volume setup will error unless it is marked optional. Paths must be relative and may not contain the '<example-value>' path or start with '<example-value>'.

       | `name`string
       | Name of the referent. This field is effectively required, but due to backwards compatibility is allowed to be empty. Instances of this type with an empty value here are almost certainly wrong. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names

       | `optional`boolean
       | optional field specify whether the Secret or its key must be defined

## SecretVolumeSource {#SecretVolumeSource}

Adapts a Secret into a volume.

The contents of the target Secret's Data field will be presented in a volume as files using the keys in the Data field as the file names. Secret <example-value> support ownership management and SELinux relabeling.

   | Field | Description

       | `defaultMode`integer
       | defaultMode is Optional: mode bits used to set permissions on created files by default. Must be an octal value between 0000 and 0777 or a decimal value between 0 and 511. YAML accepts both octal and decimal values, JSON requires decimal values for mode bits. Defaults to 0644. Directories within the path are not affected by this setting. This might be in conflict with other options that affect the file mode, like fsGroup, and the result can be other mode bits set.

       | `defaultUser`integer
       | defaultUser is Optional: The owner UID of the created files by default. The defaultUser field is only used as a fallback when the item-level user field is unset. (Alpha) This field requires the AtomicWriteVolumeUserFields feature gate to be enabled.

       | `items`KeyToPath array
       | items If unspecified, each key-value pair in the Data field of the referenced Secret will be projected into the volume as a file whose name is the key and content is the value. If specified, the listed keys will be projected into the specified paths, and unlisted keys will not be present. If a key is specified which is not present in the Secret, the volume setup will error unless it is marked optional. Paths must be relative and may not contain the '<example-value>' path or start with '<example-value>'.

       | `optional`boolean
       | optional field specify whether the Secret or its keys must be defined

       | `secretName`string
       | secretName is the name of the secret in the pod's namespace to use. More info: https://kubernetes.io/docs/concepts/storage/volumes#secret

## SecurityContext {#SecurityContext}

SecurityContext holds security configuration that will be applied to a container. Some fields are present in both SecurityContext and PodSecurityContext.  When both are set, the values in SecurityContext take precedence.

   | Field | Description

       | `allowPrivilegeEscalation`boolean
       | AllowPrivilegeEscalation controls whether a process can gain more privileges than its parent process. This bool directly controls if the no_new_privs flag will be set on the container process. AllowPrivilegeEscalation is true always when the container is: 1) run as Privileged 2) has CAP_SYS_ADMIN Note that this field cannot be set when spec.os.name is windows.

       | `appArmorProfile`AppArmorProfile
       | appArmorProfile is the AppArmor options to use by this container. If set, this profile overrides the pod's appArmorProfile. Note that this field cannot be set when spec.os.name is windows.

       | `capabilities`Capabilities
       | The capabilities to add/drop when running containers. Defaults to the default set of capabilities granted by the container runtime. Note that this field cannot be set when spec.os.name is windows.

       | `privileged`boolean
       | Run container in privileged mode. Processes in privileged containers are essentially equivalent to root on the host. Defaults to false. Note that this field cannot be set when spec.os.name is windows.

       | `procMount`string
       | procMount denotes the type of proc mount to use for the containers. The default value is Default which uses the container runtime defaults for readonly paths and masked paths. Note that this field cannot be set when spec.os.name is windows.Possible enum values: - `"Default"` uses the container runtime defaults for readonly and masked paths for /proc. Most container runtimes mask certain paths in /proc to avoid accidental security exposure of special devices or information. - `"Unmasked"` bypasses the default masking behavior of the container runtime and ensures the newly created /proc the container stays in tact with no modifications.

       | `readOnlyRootFilesystem`boolean
       | Whether this container has a read-only root filesystem. Default is false. Note that this field cannot be set when spec.os.name is windows.

       | `runAsGroup`integer
       | The GID to run the entrypoint of the container process. Uses runtime default if unset. May also be set in PodSecurityContext.  If set in both SecurityContext and PodSecurityContext, the value specified in SecurityContext takes precedence. Note that this field cannot be set when spec.os.name is windows.

       | `runAsNonRoot`boolean
       | Indicates that the container must run as a non-root user. If true, the Kubelet will validate the image at runtime to ensure that it does not run as UID 0 (root) and fail to start the container if it does. If unset or false, no such validation will be performed. May also be set in PodSecurityContext.  If set in both SecurityContext and PodSecurityContext, the value specified in SecurityContext takes precedence.

       | `runAsUser`integer
       | The UID to run the entrypoint of the container process. Defaults to user specified in image metadata if unspecified. May also be set in PodSecurityContext.  If set in both SecurityContext and PodSecurityContext, the value specified in SecurityContext takes precedence. Note that this field cannot be set when spec.os.name is windows.

       | `seLinuxOptions`SELinuxOptions
       | The SELinux context to be applied to the container. If unspecified, the container runtime will allocate a random SELinux context for each container.  May also be set in PodSecurityContext.  If set in both SecurityContext and PodSecurityContext, the value specified in SecurityContext takes precedence. Note that this field cannot be set when spec.os.name is windows.

       | `seccompProfile`SeccompProfile
       | The seccomp options to use by this container. If seccomp options are provided at both the pod & container level, the container options override the pod options. Note that this field cannot be set when spec.os.name is windows.

       | `windowsOptions`WindowsSecurityContextOptions
       | The Windows specific settings applied to all containers. If unspecified, the options from the PodSecurityContext will be used. If set in both SecurityContext and PodSecurityContext, the value specified in SecurityContext takes precedence. Note that this field cannot be set when spec.os.name is linux.

## ServiceAccountTokenProjection {#ServiceAccountTokenProjection}

ServiceAccountTokenProjection represents a projected service account token volume. This projection can be used to insert a service account token into the pods runtime filesystem for use against APIs (Kubernetes API Server or otherwise).

   | Field | Description

       | `audience`string
       | audience is the intended audience of the token. A recipient of a token must identify itself with an identifier specified in the audience of the token, and otherwise should reject the token. The audience defaults to the identifier of the apiserver.

       | `expirationSeconds`integer
       | expirationSeconds is the requested duration of validity of the service account token. As the token <example-value> expiration, the kubelet volume plugin will proactively rotate the service account token. The kubelet will start trying to rotate the token if the token is older than 80 percent of its time to live or if the token is older than 24 hours.Defaults to 1 hour and must be at least 10 minutes.

       | `path` *string
       | path is the path relative to the mount point of the file to project the token into.

       | `user`integer
       | user is Optional: The owner UID of the created file. If specified, the item-level user field takes precedence over defaultUser. (Alpha) This field requires the AtomicWriteVolumeUserFields feature gate to be enabled.

## SleepAction {#SleepAction}

SleepAction describes a &#34;sleep&#34; action.

   | Field | Description

       | `seconds` *integer
       | Seconds is the number of seconds to sleep.

## StorageOSVolumeSource {#StorageOSVolumeSource}

Represents a StorageOS persistent volume resource.

   | Field | Description

       | `fsType`string
       | fsType is the filesystem type to mount. Must be a filesystem type supported by the host operating system. Ex. "ext4", "xfs", "ntfs". Implicitly inferred to be "ext4" if unspecified.

       | `readOnly`boolean
       | readOnly defaults to false (read/write). ReadOnly here will force the ReadOnly setting in VolumeMounts.

       | `secretRef`LocalObjectReference
       | secretRef specifies the secret to use for obtaining the StorageOS API credentials.  If not specified, default values will be attempted.

       | `volumeName`string
       | volumeName is the human-readable name of the StorageOS volume.  Volume names are only unique within a namespace.

       | `volumeNamespace`string
       | volumeNamespace specifies the scope of the volume within StorageOS.  If no namespace is specified then the Pod's namespace will be used.  This allows the Kubernetes name scoping to be mirrored within StorageOS for tighter integration. Set VolumeName to any name to override the default behaviour. Set to "default" if you are not using namespaces within StorageOS. Namespaces that do not pre-exist within StorageOS will be created.

## Sysctl {#Sysctl}

Sysctl defines a kernel parameter to be set

   | Field | Description

       | `name` *string
       | Name of a property to set

       | `value` *string
       | Value of a property to set

## TCPSocketAction {#TCPSocketAction}

TCPSocketAction describes an action based on opening a socket

   | Field | Description

       | `host`string
       | Optional: Host name to connect to, defaults to the pod IP.

       | `port` *
       | Number or name of the port to access on the container. Number must be in the range 1 to 65535. Name must be an IANA_SVC_NAME.
