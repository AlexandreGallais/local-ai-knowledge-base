---
title: "Secret"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/glossary/secret.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Secret

Stores sensitive information, such as passwords, OAuth tokens, and SSH keys.

Secrets give you more control over how sensitive information is used and reduces
the risk of accidental exposure. Secret <example-value> are encoded as base64 strings and
are stored unencrypted by default, but can be configured to be
encrypted at rest.

A Pod can reference the Secret in
a variety of ways, such as in a volume mount or as an environment variable.
Secrets are designed for confidential data and
ConfigMaps are
designed for non-confidential data.
