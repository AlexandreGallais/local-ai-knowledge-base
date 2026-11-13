---
title: "ElasticIndexedJob"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/command-line-tools-reference/feature-gates/ElasticIndexedJob.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# ElasticIndexedJob

Enables Indexed Jobs to be scaled up or down by mutating both
`spec.completions` and `spec.parallelism` together such that `spec.completions == spec.parallelism`.
See docs on elastic Indexed Jobs
for more details.
