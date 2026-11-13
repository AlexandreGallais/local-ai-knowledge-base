---
title: "Feature gate"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/glossary/feature-gates.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Feature gate

Feature gates are a set of keys (opaque string values) that you can use to control which
Kubernetes features are enabled in your cluster.

You can turn these features on or off using the `--feature-gates` command line flag on each Kubernetes component.
Each Kubernetes component lets you enable or disable a set of feature gates that are relevant to that component.
The Kubernetes documentation lists all current
feature gates and what they control.
