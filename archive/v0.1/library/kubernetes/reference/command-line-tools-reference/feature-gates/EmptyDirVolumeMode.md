---
title: "EmptyDirVolumeMode"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/command-line-tools-reference/feature-gates/EmptyDirVolumeMode.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# EmptyDirVolumeMode

Enables setting Unix permission bits on `emptyDir` volume directories using the
`mode` field in `emptyDir` volume sources. When enabled, users can specify a value
between `0000` and `01777` (octal) to control the directory permissions at creation
time. If `mode` is not specified, the default `0777` behavior is preserved.
