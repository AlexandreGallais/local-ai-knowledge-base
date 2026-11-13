---
title: "StrictIPCIDRValidation"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/command-line-tools-reference/feature-gates/StrictIPCIDRValidation.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# StrictIPCIDRValidation

Use stricter validation for fields containing IP addresses and CIDR values.

In particular, with this feature gate enabled, octets within IPv4 addresses are
not allowed to have any leading `0`s, and IPv4-mapped IPv6 values (e.g.
`::ffff:192.168.0.1`) are forbidden. These sorts of values can potentially cause
security problems when different components interpret the same string as
referring to different IP addresses (as in CVE-2021-29923).

This tightening applies only to fields in build-in API kinds, and not to
custom resource kinds, values in Kubernetes configuration files, or
command-line arguments.
