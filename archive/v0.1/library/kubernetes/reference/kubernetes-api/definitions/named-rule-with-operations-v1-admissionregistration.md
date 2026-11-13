---
title: "NamedRuleWithOperations"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/kubernetes-api/definitions/named-rule-with-operations-v1-admissionregistration.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# NamedRuleWithOperations

`apiVersion: admissionregistration.k8s.io/v1`

`import "k8s.io/api/admissionregistration/v1"`

## NamedRuleWithOperations {#NamedRuleWithOperations}

NamedRuleWithOperations is a tuple of Operations and Resources with ResourceNames.

   | Field | Description

       | `apiGroups`string array
       | apiGroups is the API groups the resources belong to. '\*' is all groups. If '\*' is present, the length of the slice must be one. Required.

       | `apiVersions`string array
       | apiVersions is the API versions the resources belong to. '\*' is all versions. If '\*' is present, the length of the slice must be one. Required.

       | `operations`string array
       | operations is the operations the admission hook cares about - CREATE, UPDATE, DELETE, CONNECT or * for all of those operations and any future admission operations that are added. If '\*' is present, the length of the slice must be one. Required.

       | `resourceNames`string array
       | resourceNames is an optional white list of names that the rule applies to.  An empty set means that everything is allowed.

       | `resources`string array
       | resources is a list of resources this rule applies to.  For example: 'pods' means pods. 'pods/log' means the log subresource of pods. '\*' means all resources, but not subresources. 'pods/\*' means all subresources of pods. '\*/scale' means all scale subresources. '\*/\*' means all resources and their subresources.  If wildcard is present, the validation rule will ensure resources do not overlap with each other.  Depending on the enclosing object, subresources might not be allowed. Required.

       | `scope`string
       | scope specifies the scope of this rule. Valid values are "Cluster", "Namespaced", and "*" "Cluster" means that only cluster-scoped resources will match this rule. Namespace API objects are cluster-scoped. "Namespaced" means that only namespaced resources will match this rule. "*" means that there are no scope restrictions. Subresources match the scope of their parent resource. Default is "*".Possible enum values: - `"*"` means that all scopes are included. - `"Cluster"` means that scope is limited to cluster-scoped objects. Namespace objects are cluster-scoped. - `"Namespaced"` means that scope is limited to namespaced objects.
