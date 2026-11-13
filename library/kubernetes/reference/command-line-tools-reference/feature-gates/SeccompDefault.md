---
title: "SeccompDefault"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/command-line-tools-reference/feature-gates/SeccompDefault.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# SeccompDefault

Enables the use of `RuntimeDefault` as the default seccomp profile
for all workloads.
The seccomp profile is specified in the `securityContext` of a Pod and/or a Container.
