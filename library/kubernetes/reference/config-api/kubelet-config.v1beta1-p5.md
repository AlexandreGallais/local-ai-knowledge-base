---
title: "Kubelet Configuration (v1beta1) (part 5 of 5)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/config-api/kubelet-config.v1beta1.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Kubelet Configuration (v1beta1) (part 5 of 5)

## `KubeletWebhookAuthorization`     {#kubelet-config-k8s-io-v1beta1-KubeletWebhookAuthorization}

**Appears in:**

- KubeletAuthorization

 | Field | Description

 | `cacheAuthorizedTTL`
`meta/v1.Duration`

 |
   cacheAuthorizedTTL is the duration to cache 'authorized' responses from the
webhook authorizer.

 | `cacheUnauthorizedTTL`
`meta/v1.Duration`

 |
   cacheUnauthorizedTTL is the duration to cache 'unauthorized' responses from
the webhook authorizer.

## `KubeletX509Authentication`     {#kubelet-config-k8s-io-v1beta1-KubeletX509Authentication}

**Appears in:**

- KubeletAuthentication

 | Field | Description

 | `clientCAFile`
`string`

 |
   clientCAFile is the path to a PEM-encoded certificate bundle. If set, any request
presenting a client certificate signed by one of the authorities in the bundle
is authenticated with a username corresponding to the CommonName,
and groups corresponding to the Organization in the client certificate.

## `MemoryReservation`     {#kubelet-config-k8s-io-v1beta1-MemoryReservation}

**Appears in:**

- KubeletConfiguration

MemoryReservation specifies the memory reservation of different types for each NUMA node

 | Field | Description

 | `numaNode` [Required]
`int32`

 |
   No description provided.

 | `limits` [Required]
`core/v1.ResourceList`

 |
   No description provided.

## `MemoryReservationPolicy`     {#kubelet-config-k8s-io-v1beta1-MemoryReservationPolicy}

(Alias of `string`)

**Appears in:**

- KubeletConfiguration

MemoryReservationPolicy defines how the kubelet applies cgroup v2 memory protection.

## `MemorySwapConfiguration`     {#kubelet-config-k8s-io-v1beta1-MemorySwapConfiguration}

**Appears in:**

- KubeletConfiguration

 | Field | Description

 | `swapBehavior`
`string`

 |
   swapBehavior configures swap memory available to container workloads. May be one of
"", "NoSwap": workloads can not use swap, default option.
"LimitedSwap": workload swap usage is limited. The swap limit is proportionate to the container's memory request.

## `ResourceChangeDetectionStrategy`     {#kubelet-config-k8s-io-v1beta1-ResourceChangeDetectionStrategy}

(Alias of `string`)

**Appears in:**

- KubeletConfiguration

ResourceChangeDetectionStrategy denotes a mode in which internal
managers (secret, configmap) are discovering object changes.

## `ShutdownGracePeriodByPodPriority`     {#kubelet-config-k8s-io-v1beta1-ShutdownGracePeriodByPodPriority}

**Appears in:**

- KubeletConfiguration

ShutdownGracePeriodByPodPriority specifies the shutdown grace period for Pods based on their associated priority class value

 | Field | Description

 | `priority` [Required]
`int32`

 |
   priority is the priority value associated with the shutdown grace period

 | `shutdownGracePeriodSeconds` [Required]
`int64`

 |
   shutdownGracePeriodSeconds is the shutdown grace period in seconds

## `UserNamespaces`     {#kubelet-config-k8s-io-v1beta1-UserNamespaces}

**Appears in:**

- KubeletConfiguration

UserNamespaces contains User Namespace configurations.

 | Field | Description

 | `idsPerPod`
`int64`

 |
   IDsPerPod is the mapping length of UIDs and GIDs.
The length must be a multiple of 65536, and must be less than 1<<32.
On non-linux such as windows, only null / absent is allowed.
Changing the value may require recreating all containers on the node.
Default: 65536
