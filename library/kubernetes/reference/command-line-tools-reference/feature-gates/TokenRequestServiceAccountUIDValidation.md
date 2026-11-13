---
title: "TokenRequestServiceAccountUIDValidation"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/command-line-tools-reference/feature-gates/TokenRequestServiceAccountUIDValidation.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# TokenRequestServiceAccountUIDValidation

This is used to ensure that the UID provided in the TokenRequest matches
the UID of the ServiceAccount for which the token is being requested.
It helps prevent misuse of the TokenRequest API by ensuring that
tokens are only issued for the correct ServiceAccount.
