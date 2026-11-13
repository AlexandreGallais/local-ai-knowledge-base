---
title: "EventSource"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/kubernetes-api/definitions/event-source-v1.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# EventSource

`apiVersion: v1`

`import "k8s.io/api/core/v1"`

## EventSource {#EventSource}

EventSource contains information for an event.

   | Field | Description

       | `component`string
       | Component from which the event is generated.

       | `host`string
       | Node name on which the event is generated.
