---
title: "Service"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/glossary/service.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Service

A method for exposing a network application that is running as one or more
Pods in your cluster.

The set of Pods targeted by a Service is (usually) determined by a
selector. If more Pods are added or removed,
the set of Pods matching the selector will change. The Service makes sure that network traffic
can be directed to the current set of Pods for the workload.

Kubernetes Services either use IP networking (IPv4, IPv6, or both), or reference an external name in
the Domain Name System (DNS).

The Service abstraction enables other mechanisms, such as Ingress and Gateway.
