---
title: "ConfigMap"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/glossary/configmap.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# ConfigMap

An API object used to store non-confidential data in key-value pairs.
Pods can consume ConfigMaps as
environment variables, command-line arguments, or as configuration files in a
volume.

A ConfigMap allows you to decouple environment-specific configuration from your container images, so that your applications are easily portable.
