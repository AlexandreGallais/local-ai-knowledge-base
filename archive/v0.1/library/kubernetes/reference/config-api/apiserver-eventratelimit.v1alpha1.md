---
title: "Event Rate Limit Configuration (v1alpha1)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/config-api/apiserver-eventratelimit.v1alpha1.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Event Rate Limit Configuration (v1alpha1)

## Resource Types

- Configuration

## `Configuration`     {#eventratelimit-admission-k8s-io-v1alpha1-Configuration}

Configuration provides configuration for the EventRateLimit admission
controller.

 | Field | Description

 | `apiVersion`string | `eventratelimit.admission.k8s.io/v1alpha1`

 | `kind`string | `Configuration`

 | `limits` [Required]
`[]Limit`

 |
   limits are the limits to place on event queries received.
Limits can be placed on events received server-wide, per namespace,
per user, and per source+object.
At least one limit is required.

## `Limit`     {#eventratelimit-admission-k8s-io-v1alpha1-Limit}

**Appears in:**

- Configuration

Limit is the configuration for a particular limit type

 | Field | Description

 | `type` [Required]
`LimitType`

 |
   type is the type of limit to which this configuration applies

 | `qps` [Required]
`int32`

 |
   qps is the number of event queries per second that are allowed for this
type of limit. The qps and burst fields are used together to determine if
a particular event query is accepted. The qps determines how many queries
are accepted once the burst amount of queries has been exhausted.

 | `burst` [Required]
`int32`

 |
   burst is the burst number of event queries that are allowed for this type
of limit. The qps and burst fields are used together to determine if a
particular event query is accepted. The burst determines the maximum size
of the allowance granted for a particular bucket. For example, if the burst
is 10 and the qps is 3, then the admission control will accept 10 queries
before blocking any queries. Every second, 3 more queries will be allowed.
If some of that allowance is not used, then it will roll over to the next
second, until the maximum allowance of 10 is reached.

 | `cacheSize`
`int32`

 |
   cacheSize is the size of the LRU cache for this type of limit. If a bucket
is evicted from the cache, then the allowance for that bucket is reset. If
more queries are later received for an evicted bucket, then that bucket
will re-enter the cache with a clean slate, giving that bucket a full
allowance of burst queries.
The default cache size is 4096.
If limitType is 'server', then cacheSize is ignored.

## `LimitType`     {#eventratelimit-admission-k8s-io-v1alpha1-LimitType}

(Alias of `string`)

**Appears in:**

- Limit

LimitType is the type of the limit (e.g., per-namespace)
