---
title: "SchedulerPopFromBackoffQ"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/command-line-tools-reference/feature-gates/SchedulerPopFromBackoffQ.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# SchedulerPopFromBackoffQ

Improves scheduling queue behavior by popping pods from the backoffQ when the activeQ is empty.
This allows to process potentially schedulable pods ASAP, eliminating a penalty effect of the backoff queue.
