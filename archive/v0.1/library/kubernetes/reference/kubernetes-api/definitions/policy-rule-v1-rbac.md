---
title: "PolicyRule"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/kubernetes-api/definitions/policy-rule-v1-rbac.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# PolicyRule

`apiVersion: rbac.authorization.k8s.io/v1`

`import "k8s.io/api/rbac/v1"`

## PolicyRule {#PolicyRule}

PolicyRule holds information that describes a policy rule, but does not contain information about who the rule applies to or which namespace the rule applies to.

   | Field | Description

       | `apiGroups`string array
       | apiGroups is the name of the APIGroup that contains the resources.  If multiple API groups are specified, any action requested against one of the enumerated resources in any API group will be allowed. "" represents the core API group and "*" represents all API groups.

       | `nonResourceURLs`string array
       | nonResourceURLs is a set of partial urls that a user should have access to.  *s are allowed, but only as the full, final step in the path Since non-resource URLs are not namespaced, this field is only applicable for ClusterRoles referenced from a ClusterRoleBinding. Rules can either apply to API resources (such as "<example-value>" or "<example-value>") or non-resource URL paths (such as "<example-value>"),  but not both.

       | `resourceNames`string array
       | resourceNames is an optional white list of names that the rule applies to.  An empty set means that everything is allowed.

       | `resources`string array
       | resources is a list of resources this rule applies to. '\*' represents all resources.

       | `verbs` *string array
       | verbs is a list of Verbs that apply to ALL the ResourceKinds contained in this rule. '\*' represents all verbs.
