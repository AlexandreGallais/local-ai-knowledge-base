---
title: "NonResourceRule"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/kubernetes-api/definitions/non-resource-rule-v1-authorization.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# NonResourceRule

`apiVersion: authorization.k8s.io/v1`

`import "k8s.io/api/authorization/v1"`

## NonResourceRule {#NonResourceRule}

NonResourceRule holds information that describes a rule for the non-resource

   | Field | Description

       | `nonResourceURLs`string array
       | nonResourceURLs is a set of partial urls that a user should have access to.  *s are allowed, but only as the full, final step in the path.  "*" means all.

       | `verbs` *string array
       | verbs is a list of kubernetes non-resource API verbs, like: get, post, put, delete, patch, head, options.  "*" means all.
