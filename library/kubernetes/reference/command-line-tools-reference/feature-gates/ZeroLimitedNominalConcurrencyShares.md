---
title: "ZeroLimitedNominalConcurrencyShares"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/command-line-tools-reference/feature-gates/ZeroLimitedNominalConcurrencyShares.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# ZeroLimitedNominalConcurrencyShares

Allow priority & fairness
in the API server to use a zero value for the `nominalConcurrencyShares` field of
the `limited` section of a priority level.
