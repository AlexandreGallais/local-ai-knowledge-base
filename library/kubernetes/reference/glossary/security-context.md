---
title: "Security Context"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/glossary/security-context.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Security Context

The `securityContext` field defines privilege and access control settings for
a Pod or
container.

In a `securityContext`, you can define: the user that processes run as,
the group that processes run as, and privilege settings.
You can also configure security policies (for example: SELinux, AppArmor or seccomp).

The `PodSpec.securityContext` setting applies to all containers in a Pod.
