---
title: "Duration"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/glossary/duration.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Duration

A string value representing an amount of time.

The format of a (Kubernetes) duration is based on the
`time.Duration` type from the Go programming language.

In Kubernetes APIs that use durations, the value is expressed as series of a non-negative
integers combined with a time unit suffix. You can have more than one time quantity and
the duration is the sum of those time quantities.
The valid time units are "ns", "µs" (or "us"), "ms", "s", "m", and "h".

For example: `5s` represents a duration of five seconds, and `1m30s` represents a duration
of one minute and thirty seconds.
