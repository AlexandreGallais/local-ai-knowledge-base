---
title: "DRAListTypeAttributes"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/command-line-tools-reference/feature-gates/DRAListTypeAttributes.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# DRAListTypeAttributes

Enables list-type attribute fields (`bools`, `ints`, `strings`, `versions`) for devices
in `ResourceSlice`, allowing a device to advertise multiple values for a single attribute.

When enabled, `matchAttribute` uses set-intersection semantics (the sets of attribute
values across all selected devices must have a non-empty intersection), and
`distinctAttribute` uses pairwise-disjoint semantics (the sets must share no values).
Scalar attributes remain backward-compatible, treated as singleton sets.

Also adds the `includes()` helper function to CEL device selector expressions, which
works on both scalar and list-type attributes.

For more information, see
List type attributes
in the Dynamic Resource Allocation documentation.
