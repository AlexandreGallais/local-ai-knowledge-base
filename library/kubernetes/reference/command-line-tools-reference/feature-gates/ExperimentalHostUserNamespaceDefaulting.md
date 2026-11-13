---
title: "ExperimentalHostUserNamespaceDefaulting"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/command-line-tools-reference/feature-gates/ExperimentalHostUserNamespaceDefaulting.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# ExperimentalHostUserNamespaceDefaulting

Enabling the defaulting user
namespace to host. This is for containers that are using other host namespaces,
host mounts, or containers that are privileged or using specific non-namespaced
capabilities (e.g. `MKNODE`, `SYS_MODULE` etc.). This should only be enabled
if user namespace remapping is enabled in the Docker daemon.
