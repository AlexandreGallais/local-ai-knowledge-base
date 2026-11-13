---
title: "Kubelet CredentialProvider (v1)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/config-api/kubelet-credentialprovider.v1.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Kubelet CredentialProvider (v1)

## Resource Types

- CredentialProviderRequest
- CredentialProviderResponse

## `CredentialProviderRequest`     {#credentialprovider-kubelet-k8s-io-v1-CredentialProviderRequest}

CredentialProviderRequest includes the image that the kubelet requires authentication for.
Kubelet will pass this request object to the plugin via stdin. In general, plugins should
prefer responding with the same apiVersion they were sent.

 | Field | Description

 | `apiVersion`string | `credentialprovider.kubelet.k8s.io/v1`

 | `kind`string | `CredentialProviderRequest`

 | `image` [Required]
`string`

 |
   image is the container image that is being pulled as part of the
credential <example-value> plugin request. Plugins may optionally parse the image
to extract any information required to fetch credentials.

 | `serviceAccountToken` [Required]
`string`

 |
   serviceAccountToken is the service account token bound to the pod for which
the image is being pulled. This token is only sent to the plugin if the
tokenAttributes.serviceAccountTokenAudience field is configured in the kubelet's credential
provider configuration.

 | `serviceAccountAnnotations` [Required]
`map[string]string`

 |
   serviceAccountAnnotations is a map of annotations on the service account bound to the
pod for which the image is being pulled. The list of annotations in the service account
that need to be passed to the plugin is configured in the kubelet's credential <example-value>
configuration.

## `CredentialProviderResponse`     {#credentialprovider-kubelet-k8s-io-v1-CredentialProviderResponse}

CredentialProviderResponse holds credentials that the kubelet should use for the specified
image provided in the original request. Kubelet will read the response from the plugin via stdout.
This response should be set to the same apiVersion as CredentialProviderRequest.

 | Field | Description

 | `apiVersion`string | `credentialprovider.kubelet.k8s.io/v1`

 | `kind`string | `CredentialProviderResponse`

 | `cacheKeyType` [Required]
`PluginCacheKeyType`

 |
   cacheKeyType indiciates the type of caching key to use based on the image provided
in the request. There are three valid values for the cache key type: Image, Registry, and
Global. If an invalid value is specified, the response will NOT be used by the kubelet.

 | `cacheDuration`
`meta/v1.Duration`

 |
   cacheDuration indicates the duration the provided credentials <example-value> be cached for.
The kubelet will use this field to set the in-memory cache duration for credentials
in the AuthConfig. If null, the kubelet will use defaultCacheDuration provided in
CredentialProviderConfig. If set to 0, the kubelet will not cache the provided AuthConfig.

 | `auth`
`map[string]AuthConfig`

 |
   auth is a map containing authentication information passed into the kubelet.
Each key is a match image string (more on this below). The corresponding authConfig value
should be valid for all images that match against this key. A plugin should set
this field to null if no valid credentials can be returned for the requested image.
Each key in the map is a pattern which can optionally contain a port and a path.
Globs can be used in the domain, but not in the port or the path. Globs are supported
as subdomains like '.k8s.io' or 'k8s..io', and top-level-domains such as 'k8s.'.
Matching partial subdomains like 'app.k8s.io' is also supported. Each glob can only match
a single subdomain segment, so *.io does not match *.k8s.io.
The kubelet will match images against the key when all of the below are true:

Both contain the same number of domain parts and each part matches.
The URL path of an imageMatch must be a prefix of the target image URL path.
If the imageMatch contains a port, then the port must match in the image as well.

When multiple keys are returned, the kubelet will traverse all keys in reverse order so that:

longer keys come before shorter keys with the same prefix
non-wildcard keys come before wildcard keys with the same prefix.

For any given match, the kubelet will attempt an image pull with the provided credentials,
stopping after the first successfully authenticated pull.
Example keys:

123456789.dkr.ecr.us-east-1.amazonaws.com
*.azurecr.io
gcr.io
..registry.io
registry.io:8080/path

## `AuthConfig`     {#credentialprovider-kubelet-k8s-io-v1-AuthConfig}

**Appears in:**

- CredentialProviderResponse

AuthConfig contains authentication information for a container registry.
Only username/password based authentication is supported today, but more authentication
mechanisms may be added in the future.

 | Field | Description

 | `username` [Required]
`string`

 |
   username is the username used for authenticating to the container registry
An empty username is valid.

 | `password` [Required]
`string`

 |
   password is the password used for authenticating to the container registry
An empty password is valid.

## `PluginCacheKeyType`     {#credentialprovider-kubelet-k8s-io-v1-PluginCacheKeyType}

(Alias of `string`)

**Appears in:**

- CredentialProviderResponse
