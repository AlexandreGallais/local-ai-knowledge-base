---
title: "ResourceRule"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/kubernetes-api/definitions/resource-rule-v1-authorization.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# ResourceRule

`apiVersion: authorization.k8s.io/v1`

`import "k8s.io/api/authorization/v1"`

## ResourceRule {#ResourceRule}

ResourceRule is the list of actions the subject is allowed to perform on resources. The list ordering isn't significant, may contain duplicates, and possibly be incomplete.

   | Field | Description

       | `apiGroups`string array
       | apiGroups is the name of the APIGroup that contains the resources.  If multiple API groups are specified, any action requested against one of the enumerated resources in any API group will be allowed.  "*" means all.

       | `resourceNames`string array
       | resourceNames is an optional white list of names that the rule applies to.  An empty set means that everything is allowed.  "*" means all.

       | `resources`string array
       | resources is a list of resources this rule applies to.  "*" means all in the specified apiGroups.  "*/foo" represents the subresource 'foo' for all resources in the specified apiGroups.

       | `verbs` *string array
       | verbs is a list of kubernetes resource API verbs, like: get, list, watch, create, update, delete, proxy.  "*" means all.
