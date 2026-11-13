---
title: "Kubelet Configuration (v1beta1) (part 1 of 5)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/config-api/kubelet-config.v1beta1.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Kubelet Configuration (v1beta1)

## Resource Types

- CredentialProviderConfig
- ImagePullIntent
- ImagePulledRecord
- KubeletConfiguration
- SerializedNodeConfigSource

## `FormatOptions`     {#FormatOptions}

**Appears in:**

- LoggingConfiguration

FormatOptions contains options for the different logging formats.

 | Field | Description

 | `text` [Required]
`TextOptions`

 |
   [Alpha] Text contains options for logging format "text".
Only available when the LoggingAlphaOptions feature gate is enabled.

 | `json` [Required]
`JSONOptions`

 |
   [Alpha] JSON contains options for logging format "json".
Only available when the LoggingAlphaOptions feature gate is enabled.

## `JSONOptions`     {#JSONOptions}

**Appears in:**

- FormatOptions

JSONOptions contains options for logging format "json".

 | Field | Description

 | `OutputRoutingOptions` [Required]
`OutputRoutingOptions`

 |
   No description provided.

## `LogFormatFactory`     {#LogFormatFactory}

LogFormatFactory provides support for a certain additional,
non-default log format.

## `LoggingConfiguration`     {#LoggingConfiguration}

**Appears in:**

- KubeletConfiguration

LoggingConfiguration contains logging options.

 | Field | Description

 | `format` [Required]
`string`

 |
   Format Flag specifies the structure of log messages.
default value of format is `text`

 | `flushFrequency` [Required]
`TimeOrMetaDuration`

 |
   Maximum time between log flushes.
If a string, parsed as a duration (i.e. "1s")
If an int, the maximum number of nanoseconds (i.e. 1s = 1000000000).
Ignored if the selected logging backend writes log messages without buffering.

 | `verbosity` [Required]
`VerbosityLevel`

 |
   Verbosity is the threshold that determines which log messages are
logged. Default is zero which logs only the most important
messages. Higher values enable additional messages. Error messages
are always logged.

 | `vmodule` [Required]
`VModuleConfiguration`

 |
   VModule overrides the verbosity threshold for individual files.
Only supported for "text" log format.

 | `options` [Required]
`FormatOptions`

 |
   [Alpha] Options holds additional parameters that are specific
to the different logging formats. Only the options for the selected
format get used, but all of them get validated.
Only available when the LoggingAlphaOptions feature gate is enabled.

## `LoggingOptions`     {#LoggingOptions}

LoggingOptions can be used with ValidateAndApplyWithOptions to override
certain global defaults.

 | Field | Description

 | `ErrorStream` [Required]
`io.Writer`

 |
   ErrorStream can be used to override the os.Stderr default.

 | `InfoStream` [Required]
`io.Writer`

 |
   InfoStream can be used to override the os.Stdout default.

## `OutputRoutingOptions`     {#OutputRoutingOptions}

**Appears in:**

- JSONOptions

- TextOptions

OutputRoutingOptions contains options that are supported by both "text" and "json".

 | Field | Description

 | `splitStream` [Required]
`bool`

 |
   [Alpha] SplitStream redirects error messages to stderr while
info messages go to stdout, with buffering. The default is to write
both to stdout, without buffering. Only available when
the LoggingAlphaOptions feature gate is enabled.

 | `infoBufferSize` [Required]
`k8s.io/apimachinery/pkg/api/resource.QuantityValue`

 |
   [Alpha] InfoBufferSize sets the size of the info stream when
using split streams. The default is zero, which disables buffering.
Only available when the LoggingAlphaOptions feature gate is enabled.

## `TextOptions`     {#TextOptions}

**Appears in:**

- FormatOptions

TextOptions contains options for logging format "text".

 | Field | Description

 | `OutputRoutingOptions` [Required]
`OutputRoutingOptions`

 |
   No description provided.

## `TimeOrMetaDuration`     {#TimeOrMetaDuration}

**Appears in:**

- LoggingConfiguration

TimeOrMetaDuration is present only for backwards compatibility for the
flushFrequency field, and new fields should use metav1.Duration.

 | Field | Description

 | `Duration` [Required]
`meta/v1.Duration`

 |
   Duration holds the duration

 | `-` [Required]
`bool`

 |
   SerializeAsString controls whether the value is serialized as a string or an integer

## `TracingConfiguration`     {#TracingConfiguration}

**Appears in:**

- KubeletConfiguration

TracingConfiguration provides versioned configuration for OpenTelemetry tracing clients.

 | Field | Description

 | `endpoint`
`string`

 |
   Endpoint of the collector this component will report traces to.
The connection is insecure, and does not currently support TLS.
Recommended is unset, and endpoint is the otlp grpc default, localhost:4317.

 | `samplingRatePerMillion`
`int32`

 |
   SamplingRatePerMillion is the number of samples to collect per million spans.
Recommended is unset. If unset, sampler respects its parent span's sampling
rate, but otherwise never samples.

## `VModuleConfiguration`     {#VModuleConfiguration}

(Alias of `[]k8s.io/component-base/logs/api/v1.VModuleItem`)

**Appears in:**

- LoggingConfiguration

VModuleConfiguration is a collection of individual file names or patterns
and the corresponding verbosity threshold.

## `VerbosityLevel`     {#VerbosityLevel}

(Alias of `uint32`)

**Appears in:**

- LoggingConfiguration

VerbosityLevel represents a klog or logr verbosity threshold.

## `CredentialProviderConfig`     {#kubelet-config-k8s-io-v1beta1-CredentialProviderConfig}

CredentialProviderConfig is the configuration containing information about
each exec credential provider. Kubelet reads this configuration from disk and enables
each provider as specified by the CredentialProvider type.

 | Field | Description

 | `apiVersion`string | `kubelet.config.k8s.io/v1beta1`

 | `kind`string | `CredentialProviderConfig`

 | `providers` [Required]
`[]CredentialProvider`

 |
   providers is a list of credential provider plugins that will be enabled by the kubelet.
Multiple providers may match against a single image, in which case credentials
from all providers will be returned to the kubelet. If multiple providers are called
for a single image, the results are combined. If providers return overlapping
auth keys, the value from the provider earlier in this list is attempted first.

## `ImagePullIntent`     {#kubelet-config-k8s-io-v1beta1-ImagePullIntent}

ImagePullIntent is a record of the kubelet attempting to pull an image.

 | Field | Description

 | `apiVersion`string | `kubelet.config.k8s.io/v1beta1`

 | `kind`string | `ImagePullIntent`

 | `image` [Required]
`string`

 |
   Image is the image spec from a Container's `image` field.
The filename is a SHA-256 hash of this value. This is to avoid filename-unsafe
characters like ':' and '/'.

## `ImagePulledRecord`     {#kubelet-config-k8s-io-v1beta1-ImagePulledRecord}

ImagePullRecord is a record of an image that was pulled by the kubelet.
If there are no records in the `kubernetesSecrets` field and both `nodeWideCredentials`
and `anonymous` are `false`, credentials must be re-checked the next time an
image represented by this record is being requested.

 | Field | Description

 | `apiVersion`string | `kubelet.config.k8s.io/v1beta1`

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
