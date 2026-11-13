---
title: "ResourceClaimTemplate"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/glossary/resourceclaimtemplate.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# ResourceClaimTemplate

Defines a template that Kubernetes uses to create
ResourceClaims.
ResourceClaimTemplates are used in
dynamic resource allocation (DRA)
to provide _per-Pod or per-PodGroup access to separate, similar resources_.

When a ResourceClaimTemplate is referenced in a workload specification,
Kubernetes automatically creates ResourceClaim objects based on the template.
Each ResourceClaim is bound to a specific Pod or PodGroup. When the Pod
terminates or the PodGroup is deleted, Kubernetes deletes the corresponding
ResourceClaim. PodGroup ResourceClaimTemplates require the
`DRAWorkloadResourceClaims`
feature to be enabled.
