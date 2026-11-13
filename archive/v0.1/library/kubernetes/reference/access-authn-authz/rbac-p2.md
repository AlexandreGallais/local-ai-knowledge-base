---
title: "Using RBAC Authorization (part 2 of 5)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/access-authn-authz/rbac.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Using RBAC Authorization (part 2 of 5)

## API objects {#api-overview}

The RBAC API declares four kinds of Kubernetes object: _Role_, _ClusterRole_,
_RoleBinding_ and _ClusterRoleBinding_. You can describe or amend the RBAC
objects
using tools such as `kubectl`, just like any other Kubernetes object.

**Caution:**
These objects, by design, impose access restrictions. If you are making changes
to a cluster as you learn, see
privilege escalation prevention and bootstrapping
to understand how those restrictions can prevent you making some changes.

### Role and ClusterRole

An RBAC _Role_ or _ClusterRole_ contains rules that represent a set of permissions.
Permissions are purely additive (there are no "deny" rules).

A Role always sets permissions within a particular namespace;
when you create a Role, you have to specify the namespace it belongs in.

ClusterRole, by contrast, is a non-namespaced resource. The resources have different names (Role
and ClusterRole) because a Kubernetes object always has to be either namespaced or not namespaced;
it can't be both.

ClusterRoles have several uses. You can use a ClusterRole to:

1. define permissions on namespaced resources and be granted access within individual namespace(s)
1. define permissions on namespaced resources and be granted access across all namespaces
1. define permissions on cluster-scoped resources

If you want to define a role within a namespace, use a Role; if you want to define
a role cluster-wide, use a ClusterRole.

#### Role example

Here's an example Role in the "default" namespace that can be used to grant read access to
pods:

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  namespace: default
  name: pod-reader
rules:
- apiGroups: [""] # "" indicates the core API group
  resources: ["pods"]
  verbs: ["get", "watch", "list"]
```

#### ClusterRole example

A ClusterRole can be used to grant the same permissions as a Role.
Because ClusterRoles are cluster-scoped, you can also use them to grant access to:

* cluster-scoped resources (like nodes)
* non-resource endpoints (like `/healthz`)
* namespaced resources (like Pods), across all namespaces

  For example: you can use a ClusterRole to allow a particular user to run
  `kubectl get pods --all-namespaces`

Here is an example of a ClusterRole that can be used to grant read access to
secrets in any particular namespace,
or across all namespaces (depending on how it is bound):

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  # "namespace" omitted since ClusterRoles are not namespaced
  name: secret-reader
rules:
- apiGroups: [""]
  #
  # at the HTTP level, the name of the resource for accessing Secret
  # objects is "<example-value>"
  resources: ["<example-value>"]
  verbs: ["get", "watch", "list"]
```

The name of a Role or a ClusterRole object must be a valid
path segment name.

### RoleBinding and ClusterRoleBinding

A role binding grants the permissions defined in a role to a user or set of users.
It holds a list of *subjects* (users, groups, or service accounts), and a reference to the
role being granted.
A RoleBinding grants permissions within a specific namespace whereas a ClusterRoleBinding
grants that access cluster-wide.

A RoleBinding may reference any Role in the same namespace. Alternatively, a RoleBinding
can reference a ClusterRole and bind that ClusterRole to the namespace of the RoleBinding.
If you want to bind a ClusterRole to all the namespaces in your cluster, you use a
ClusterRoleBinding.

The name of a RoleBinding or ClusterRoleBinding object must be a valid
path segment name.

#### RoleBinding examples {#rolebinding-example}

Here is an example of a RoleBinding that grants the "pod-reader" Role to the user "jane"
within the "default" namespace.
This allows "jane" to read pods in the "default" namespace.

```yaml
apiVersion: rbac.authorization.k8s.io/v1
# This role binding allows "jane" to read pods in the "default" namespace.
# You need to already have a Role named "pod-reader" in that namespace.
kind: RoleBinding
metadata:
  name: read-pods
  namespace: default
subjects:
# You can specify more than one "subject"
- kind: User
  name: jane # "name" is case sensitive
  apiGroup: rbac.authorization.k8s.io
roleRef:
  # "roleRef" specifies the binding to a Role / ClusterRole
  kind: Role #this must be Role or ClusterRole
  name: pod-reader # this must match the name of the Role or ClusterRole you wish to bind to
  apiGroup: rbac.authorization.k8s.io
```

A RoleBinding can also reference a ClusterRole to grant the permissions defined in that
ClusterRole to resources inside the RoleBinding's namespace. This kind of reference
lets you define a set of common roles across your cluster, then reuse them within
multiple namespaces.

For instance, even though the following RoleBinding refers to a ClusterRole,
"<example-value>" (the subject, case sensitive) will only be able to read Secrets in the "<example-value>"
namespace, because the RoleBinding's namespace (in its metadata) is "development".

```yaml
apiVersion: rbac.authorization.k8s.io/v1
# This role binding allows "<example-value>" to read secrets in the "<example-value>" namespace.
# You need to already have a ClusterRole named "<example-value>".
kind: RoleBinding
metadata:
  name: read-secrets
  #
  # The namespace of the RoleBinding determines where the permissions are granted.
  # This only grants permissions within the "development" namespace.
  namespace: development
subjects:
- kind: User
  name: dave # Name is case sensitive
  apiGroup: rbac.authorization.k8s.io
roleRef:
  kind: ClusterRole
  name: secret-reader
  apiGroup: rbac.authorization.k8s.io
```

#### ClusterRoleBinding example

To grant permissions across a whole cluster, you can use a ClusterRoleBinding.
The following ClusterRoleBinding allows any user in the group "manager" to read
secrets in any namespace.

```yaml
apiVersion: rbac.authorization.k8s.io/v1
# This cluster role binding allows anyone in the "<example-value>" group to read secrets in any namespace.
kind: ClusterRoleBinding
metadata:
  name: read-secrets-global
subjects:
- kind: Group
  name: manager # Name is case sensitive
  apiGroup: rbac.authorization.k8s.io
roleRef:
  kind: ClusterRole
  name: secret-reader
  apiGroup: rbac.authorization.k8s.io
```

After you create a binding, you cannot change the Role or ClusterRole that it refers to.
If you try to change a binding's `roleRef`, you get a validation error. If you do want
to change the `roleRef` for a binding, you need to remove the binding object and create
a replacement.

There are two reasons for this restriction:

1. Making `roleRef` immutable allows granting someone `update` permission on an existing binding
   object, so that they can manage the list of subjects, without being able to change
   the role that is granted to those subjects.
1. A binding to a different role is a fundamentally different binding.
   Requiring a binding to be deleted/recreated in order to change the `roleRef`
   ensures the full list of subjects in the binding is intended to be granted
   the new role (as opposed to enabling or accidentally modifying only the roleRef
   without verifying all of the existing subjects should be given the new role's
   permissions).

The `kubectl auth reconcile` command-line utility creates or updates a manifest file containing RBAC objects,
and handles deleting and recreating binding objects if required to change the role they refer to.
See command usage and examples for more information.

### Referring to resources

In the Kubernetes API, most resources are represented and accessed using a string representation of
their object name, such as `pods` for a Pod. RBAC refers to resources using exactly the same
name that appears in the URL for the relevant API endpoint.
Some Kubernetes APIs involve a
_subresource_, such as the logs for a Pod. A request for a Pod's logs looks like:

```http
GET /api/v1/namespaces/{namespace}/pods/{name}/log
```

In this case, `pods` is the namespaced resource for Pod resources, and `log` is a
subresource of `pods`. To represent this in an RBAC role, use a slash (`/`) to
delimit the resource and subresource. To allow a subject to read `pods` and
also access the `log` subresource for each of those Pods, you write:

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  namespace: default
  name: pod-and-pod-logs-reader
rules:
- apiGroups: [""]
  resources: ["pods", "pods/log"]
  verbs: ["get", "list"]
```

You can also refer to resources by name for certain requests through the `resourceNames` list.
When specified, requests can be restricted to individual instances of a resource.
Here is an example that restricts its subject to only `get` or `update` a
ConfigMap named `my-configmap`:

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  namespace: default
  name: configmap-updater
rules:
- apiGroups: [""]
  #
  # at the HTTP level, the name of the resource for accessing ConfigMap
  # objects is "configmaps"
  resources: ["configmaps"]
  resourceNames: ["my-configmap"]
  verbs: ["update", "get"]
```

**Note:**
You cannot restrict **deletecollection** or top-level **create** requests by resource name.
For **create**, this limitation is because the name of the new object may not be known at authorization time. However, the **create** limitation applies only to top-level resources, not subresources. For example, you can use the `resourceNames` field with `pods/exec`.
If you restrict **list** or **watch** by `resourceName`, clients must include a `metadata.name` field selector in their **list** or **watch** request (that matches the specified `resourceName`)
in order to be authorized.
For example: `kubectl get configmaps --field-selector=metadata.name=my-configmap`

Rather than referring to individual `resources`, `apiGroups`, and `verbs`,
you can use the wildcard `*` symbol to refer to all such objects.
For `nonResourceURLs`, you can use the wildcard `*` as a suffix glob match.
For `resourceNames`, an empty set means that everything is allowed.
Here is an example that allows access to perform any current and future action on
all current and future resources in the `example.com` API group.
This is similar to the built-in `cluster-admin` role.

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  namespace: default
  name: example.com-superuser # DO NOT USE THIS ROLE, IT IS JUST AN EXAMPLE
rules:
- apiGroups: ["example.com"]
  resources: ["*"]
  verbs: ["*"]
```

**Caution:**
Using wildcards in resource and verb entries could result in overly permissive access being granted
to sensitive resources.
For instance, if a new resource type is added, or a new subresource is added,
or a new custom verb is checked, the wildcard entry automatically grants access, which may be undesirable.
The principle of least privilege
should be employed, using specific resources and verbs to ensure only the permissions required for the
workload to function correctly are applied.
