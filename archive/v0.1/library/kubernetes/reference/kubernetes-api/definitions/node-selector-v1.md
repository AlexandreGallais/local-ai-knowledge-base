---
title: "NodeSelector"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/kubernetes-api/definitions/node-selector-v1.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# NodeSelector

`apiVersion: v1`

`import "k8s.io/api/core/v1"`

## NodeSelector {#NodeSelector}

A node selector represents the union of the results of one or more label queries over a set of nodes; that is, it represents the OR of the selectors represented by the node selector terms.

   | Field | Description

       | `nodeSelectorTerms` *NodeSelectorTerm array
       | Required. A list of node selector terms. The terms are ORed.
