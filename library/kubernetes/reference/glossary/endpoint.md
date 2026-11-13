---
title: "Endpoints"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/glossary/endpoint.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Endpoints

A deprecated API that represents the set of all endpoints for a
Service.

Since v1.21, Kubernetes uses
EndpointSlices
rather than Endpoints; the original Endpoints API was deprecated due to
concerns about scalability.

To learn more about Endpoints, read Endpoints.
