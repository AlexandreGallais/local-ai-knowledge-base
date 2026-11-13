---
title: "RelaxedDNSSearchValidation"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/command-line-tools-reference/feature-gates/RelaxedDNSSearchValidation.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# RelaxedDNSSearchValidation

Relax the server side validation for the DNS search string
(`.spec.dnsConfig.searches`) for containers. For example,
with this gate enabled, it is okay to include the `_` character
in the DNS name search string.
