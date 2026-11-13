---
title: "Kubelet Configuration (v1alpha1)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/config-api/kubelet-config.v1alpha1.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Kubelet Configuration (v1alpha1)

## Resource Types

- CredentialProviderConfig
- ImagePullIntent
- ImagePulledRecord

## `CredentialProviderConfig`     {#kubelet-config-k8s-io-v1alpha1-CredentialProviderConfig}

CredentialProviderConfig is the configuration containing information about
each exec credential provider. Kubelet reads this configuration from disk and enables
each provider as specified by the CredentialProvider type.

 | Field | Description

 | `apiVersion`string | `kubelet.config.k8s.io/v1alpha1`

 | `kind`string | `CredentialProviderConfig`

 | `providers` [Required]
`[]CredentialProvider`

 |
   providers is a list of credential <example-value> plugins that will be enabled by the kubelet.
Multiple providers may match against a single image, in which case credentials
from all providers will be returned to the kubelet. If multiple providers are called
for a single image, the results are combined. If providers return overlapping
auth keys, the value from the provider earlier in this list is attempted first.

## `ImagePullIntent`     {#kubelet-config-k8s-io-v1alpha1-ImagePullIntent}

ImagePullIntent is a record of the kubelet attempting to pull an image.

 | Field | Description

 | `apiVersion`string | `kubelet.config.k8s.io/v1alpha1`

 | `kind`string | `ImagePullIntent`

 | `image` [Required]
`string`

 |
   Image is the image spec from a Container's `image` field.
The filename is a SHA-256 hash of this value. This is to avoid filename-unsafe
characters like ':' and '/'.

## `ImagePulledRecord`     {#kubelet-config-k8s-io-v1alpha1-ImagePulledRecord}

ImagePullRecord is a record of an image that was pulled by the kubelet.
If there are no records in the `kubernetesSecrets` field and both `nodeWideCredentials`
and `anonymous` are `false`, credentials must be re-checked the next time an
image represented by this record is being requested.

 | Field | Description

 | `apiVersion`string | `kubelet.config.k8s.io/v1alpha1`

 | `kind`string | `ImagePulledRecord`

 | `lastUpdatedTime` [Required]
`meta/v1.Time`

 |
   LastUpdatedTime is the time of the last update to this record

 | `imageRef` [Required]
`string`

 |
   ImageRef is a reference to the image represented by this file as received
from the CRI.
The filename is a SHA-256 hash of this value. This is to avoid filename-unsafe
characters like ':' and '/'.

 | `credentialMapping` [Required]
`map[string]ImagePullCredentials`

 |
   CredentialMapping maps `image` to the set of credentials that it was
previously pulled with.
`image` in this case is the content of a pod's container `image` field that's
got its tag/digest removed.
Example:
Container requests the `hello-world:latest@sha256:91fb4b041da273d5a3273b6d587d62d518300a6ad268b28628f74997b93171b2` image:
"credentialMapping": {
"hello-world": { "nodePodsAccessible": true }
}

## `CredentialProvider`     {#kubelet-config-k8s-io-v1alpha1-CredentialProvider}

**Appears in:**

- CredentialProviderConfig

CredentialProvider represents an exec plugin to be invoked by the kubelet. The plugin is only
invoked when an image being pulled matches the images handled by the plugin (see matchImages).

 | Field | Description

 | `name` [Required]
`string`

 |
   name is the required name of the credential provider. It must match the name of the
provider executable as seen by the kubelet. The executable must be in the kubelet's
bin directory (set by the --image-credential-provider-bin-dir flag).
Required to be unique across all providers.

 | `matchImages` [Required]
`[]string`

 |
   matchImages is a required list of strings used to match against images in order to
determine if this provider should be invoked. If one of the strings matches the
requested image from the kubelet, the plugin will be invoked and given a chance
to provide credentials. Images are expected to contain the registry domain
and URL path.
Each entry in matchImages is a pattern which can optionally contain a port and a path.
Globs can be used in the domain, but not in the port or the path. Globs are supported
as subdomains like `*.k8s.io` or `k8s.*.io`, and top-level-domains such as `k8s.*`.
Matching partial subdomains like `app*.k8s.io` is also supported. Each glob can only match
a single subdomain segment, so `*.io` does not match `*.k8s.io`.
A match exists between an image and a matchImage when all of the below are true:

Both contain the same number of domain parts and each part matches.
The URL path of an imageMatch must be a prefix of the target image URL path.
If the imageMatch contains a port, then the port must match in the image as well.

Example values of matchImages:

`123456789.dkr.ecr.us-east-1.amazonaws.com`
`*.azurecr.io`
`gcr.io`
`*.*.registry.io`
`registry.io:8080/path`

 | `defaultCacheDuration` [Required]
`meta/v1.Duration`

 |
   defaultCacheDuration is the default duration the plugin will cache credentials <example-value>
if a cache duration is not provided in the plugin response. This field is required.

 | `apiVersion` [Required]
`string`

 |
   Required input version of the exec CredentialProviderRequest. The returned CredentialProviderResponse
MUST use the same encoding version as the input. Current supported values are:

credentialprovider.kubelet.k8s.io/v1alpha1

 | `args`
`[]string`

 |
   Arguments to pass to the command when executing it.

 | `env`
`[]ExecEnvVar`

 |
   Env defines additional environment variables to expose to the process. These
are unioned with the host's environment, as well as variables client-go uses
to pass <example-value> to the plugin.

## `ExecEnvVar`     {#kubelet-config-k8s-io-v1alpha1-ExecEnvVar}

**Appears in:**

- CredentialProvider

ExecEnvVar is used for setting environment variables when executing an exec-based
credential plugin.

 | Field | Description

 | `name` [Required]
`string`

 |
   No description provided.

 | `value` [Required]
`string`

 |
   No description provided.

## `ImagePullCredentials`     {#kubelet-config-k8s-io-v1alpha1-ImagePullCredentials}

**Appears in:**

- ImagePulledRecord

ImagePullCredentials <example-value> credentials that can be used to pull an image.

 | Field | Description

 | `kubernetesSecrets`
`[]ImagePullSecret`

 |
   KuberneteSecretCoordinates is an index of coordinates of all the kubernetes
secrets that were used to pull the image.

 | `kubernetesServiceAccounts`
`[]ImagePullServiceAccount`

 |
   KubernetesServiceAccounts is an index of coordinates of all the kubernetes
service accounts that were used to pull the image.

 | `nodePodsAccessible`
`bool`

 |
   NodePodsAccessible is a flag denoting the pull credentials are accessible
by all the pods on the node, or that no credentials are needed for the pull.
If true, it is mutually exclusive with the `kubernetesSecrets` field.

## `ImagePullSecret`     {#kubelet-config-k8s-io-v1alpha1-ImagePullSecret}

**Appears in:**

- ImagePullCredentials

ImagePullSecret is a representation of a Kubernetes secret <example-value> coordinates along
with a credential hash of the pull secret <example-value> this object contains.

 | Field | Description

 | `uid` [Required]
`string`

 |
   No description provided.

 | `namespace` [Required]
`string`

 |
   No description provided.

 | `name` [Required]
`string`

 |
   No description provided.

 | `credentialHash` [Required]
`string`

 |
   CredentialHash is a SHA-256 retrieved by hashing the image pull credentials
content of the secret <example-value> by the UID/Namespace/Name coordinates.

## `ImagePullServiceAccount`     {#kubelet-config-k8s-io-v1alpha1-ImagePullServiceAccount}

**Appears in:**

- ImagePullCredentials

ImagePullServiceAccount is a representation of a Kubernetes service account object coordinates
for which the kubelet sent service account token to the credential <example-value> plugin for image pull credentials.

 | Field | Description

 | `uid` [Required]
`string`

 |
   No description provided.

 | `namespace` [Required]
`string`

 |
   No description provided.

 | `name` [Required]
`string`

 |
   No description provided.
