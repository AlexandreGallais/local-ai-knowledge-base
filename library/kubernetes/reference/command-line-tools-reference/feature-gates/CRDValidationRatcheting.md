---
title: "CRDValidationRatcheting"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/command-line-tools-reference/feature-gates/CRDValidationRatcheting.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# CRDValidationRatcheting

Enable updates to custom resources to contain
violations of their OpenAPI schema if the offending portions of the resource
update did not change. See Validation Ratcheting for more details.
