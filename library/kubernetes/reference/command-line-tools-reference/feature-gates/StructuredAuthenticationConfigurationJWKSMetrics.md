---
title: "StructuredAuthenticationConfigurationJWKSMetrics"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/command-line-tools-reference/feature-gates/StructuredAuthenticationConfigurationJWKSMetrics.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# StructuredAuthenticationConfigurationJWKSMetrics

Enables additional metrics for JSON Web Key Set (JWKS) operations in JWT authenticators
configured via `--authentication-config`. When enabled, the API server records metrics about
the last time JWKS was fetched and the hash value of the JWKS response.
See the metrics reference for details.
