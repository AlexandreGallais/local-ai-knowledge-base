---
title: "ManifestBasedAdmissionControlConfig"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/command-line-tools-reference/feature-gates/ManifestBasedAdmissionControlConfig.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# ManifestBasedAdmissionControlConfig

Enable loading admission webhooks and CEL-based admission policies from
static manifest files on disk via the `staticManifestsDir` field in
`AdmissionConfiguration`. These policies are active from API server startup,
survive etcd unavailability, and can protect API-based admission resources
from modification.
