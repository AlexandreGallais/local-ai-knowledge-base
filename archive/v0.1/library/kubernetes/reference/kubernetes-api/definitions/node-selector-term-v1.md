---
title: "NodeSelectorTerm"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/kubernetes-api/definitions/node-selector-term-v1.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# NodeSelectorTerm

`apiVersion: v1`

`import "k8s.io/api/core/v1"`

## NodeSelectorTerm {#NodeSelectorTerm}

A null or empty node selector term matches no objects. The requirements of them are ANDed. The TopologySelectorTerm type implements a subset of the NodeSelectorTerm.

   | Field | Description

       | `matchExpressions`NodeSelectorRequirement array
       | A list of node selector requirements by node's labels.

       | `matchFields`NodeSelectorRequirement array
       | A list of node selector requirements by node's fields.
