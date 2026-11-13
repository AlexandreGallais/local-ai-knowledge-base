---
title: "Event"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/glossary/event.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Event

A Kubernetes object that describes state changes
or notable occurrences in the cluster.

Events have a limited retention time and triggers and messages may evolve with time.
Event consumers should not rely on the timing of an event with a given reason reflecting a consistent underlying trigger,
or the continued existence of events with that reason.

Events should be treated as informative, best-effort, supplemental data.

In Kubernetes, auditing generates a different kind of
Event record (API group `audit.k8s.io`).
