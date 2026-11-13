---
title: "Spec"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/glossary/spec.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Spec

Defines how each object, like Pods or Services, should be configured and its desired state.

Almost every Kubernetes object includes two nested object fields that govern the object's configuration: the object spec and the object status. For objects that have a spec, you have to set this when you create the object, providing a description of the characteristics you want the resource to have: its desired state.

It varies for different objects like Pods, StatefulSets, and Services, detailing settings such as containers, volumes, replicas, ports,
and other specifications unique to each object type. This field encapsulates what state Kubernetes should maintain for the defined
object.
