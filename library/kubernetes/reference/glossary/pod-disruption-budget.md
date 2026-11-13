---
title: "Pod Disruption Budget"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/glossary/pod-disruption-budget.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Pod Disruption Budget

A Pod Disruption Budget allows an
 application owner to create an object for a replicated application, that ensures
 a certain number or percentage of Pods
 with an assigned label will not be voluntarily evicted at any point in time.

Involuntary disruptions cannot be prevented by PDBs; however they
do count against the budget.
