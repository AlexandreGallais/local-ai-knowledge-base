---
title: "AllowParsingUserUIDFromCertAuth"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/command-line-tools-reference/feature-gates/AllowParsingUserUIDFromCertAuth.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# AllowParsingUserUIDFromCertAuth

When this feature is enabled, the subject name attribute `1.3.6.1.4.1.57683.2`
in an X.509 certificate will be parsed as the user UID during certificate authentication.
