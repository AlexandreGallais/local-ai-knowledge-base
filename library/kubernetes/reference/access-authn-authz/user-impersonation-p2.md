---
title: "User Impersonation (part 2 of 2)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/access-authn-authz/user-impersonation.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# User Impersonation (part 2 of 2)

## Constrained Impersonation

**Feature state:**

With the **impersonate** verb, impersonation cannot be limited or scoped.
It either grants full impersonation or none at all. Once granted permission to
impersonate a user, you can perform any action that user can perform across all
resources and namespaces.

With constrained impersonation, an impersonator can be limited to impersonate another
user only for specific actions on specific resources, rather than being able to perform all actions
that the impersonated user can perform.

This feature is enabled by setting the `ConstrainedImpersonation`
feature gate.

### Understanding constrained impersonation

Constrained impersonation requires **two separate permissions**:

1. **Permission to impersonate a specific identity** (user, UID, group, service account or node)
2. **Permission to perform specific actions at a particular scope when impersonating** (for
   example, only `list` and `watch` pods in the `default` namespace)

This means an impersonator can be limited to impersonate another user only for specific operations.

### Impersonation modes

Constrained impersonation defines three distinct modes, each with its own set of verbs:

#### user-info mode

Use this mode to impersonate generic users (not service accounts or nodes). This mode applies when
the `Impersonate-User` header value:
- Does **not** start with `system:serviceaccount:`
- Does **not** start with `system:node:`

**Verbs:**
- `impersonate:user-info` - Permission to impersonate a specific user, group, UID, or extra field
- `impersonate-on:user-info:<verb>` - Permission to perform `<verb>` when impersonating a generic user

#### ServiceAccount mode

Use this mode to impersonate ServiceAccounts.

**Verbs:**
- `impersonate:serviceaccount` - Permission to impersonate a specific service account
- `impersonate-on:serviceaccount:<verb>` - Permission to perform `<verb>` when impersonating a service account

#### arbitrary-node and associated-node modes

Use these modes to impersonate nodes. This mode applies when the `Impersonate-User` header value
starts with `system:node:`.

**Verbs:**
- `impersonate:arbitrary-node` - Permission to impersonate any specified node
- `impersonate:associated-node` - Permission to impersonate only the node to which the impersonator is bound
- `impersonate-on:arbitrary-node:<verb>` - Permission to perform `<verb>` when impersonating any node
- `impersonate-on:associated-node:<verb>` - Permission to perform `<verb>` when impersonating the associated node

**Note:**
The `impersonate:associated-node` verb only applies when the impersonator is a service account bound to the
node it's trying to impersonate. This is determined by checking if the service account's user info
contains an extra field with key `authentication.kubernetes.io/node-name` that matches the node
being impersonated.

### Configuring constrained impersonation with RBAC

All constrained impersonation permissions use the `authentication.k8s.io` API group. Here's how to
configure the different modes.

#### Example: Impersonate a user for specific actions

This example shows how to allow a service account to impersonate a user named `jane.doe@example.com`,
but only to `list` and `watch` pods in the `default` namespace. You need both a `ClusterRoleBinding`
for the identity permission and a `RoleBinding` for the action permission

**Step 1: Grant permission to impersonate the user identity**

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: impersonate-jane-identity
rules:
- apiGroups: ["authentication.k8s.io"]
  resources: ["users"]
  resourceNames: ["jane.doe@example.com"]
  verbs: ["impersonate:user-info"]
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: impersonate-jane-identity
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: impersonate-jane-identity
subjects:
- kind: ServiceAccount
  name: my-controller
  namespace: default
```

**Step 2: Grant permission to perform specific actions when impersonating**

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: impersonate-list-watch-pods
  namespace: default
rules:
- apiGroups: [""]
  resources: ["pods"]
  verbs:
  - "impersonate-on:user-info:list"
  - "impersonate-on:user-info:watch"
---
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: impersonate-list-watch-pods
  namespace: default
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: Role
  name: impersonate-list-watch-pods
subjects:
- kind: ServiceAccount
  name: my-controller
  namespace: default
```

Now the `my-controller` service account can impersonate `jane.doe@example.com` to list and watch
pods in the `default` namespace, but **cannot** perform other actions like deleting pods or
accessing resources in other namespaces.

#### Example: Impersonate a ServiceAccount

To allow impersonating a service account named `app-sa` in the `production` namespace to create
and update deployments:

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: impersonate-app-sa
  namespace: default
rules:
- apiGroups: ["authentication.k8s.io"]
  resources: ["serviceaccounts"]
  resourceNames: ["app-sa"]
  # For service accounts, you must specify the namespace in the RoleBinding
  verbs: ["impersonate:serviceaccount"]
---
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: impersonate-manage-deployments
  namespace: production
rules:
- apiGroups: ["apps"]
  resources: ["deployments"]
  verbs:
  - "impersonate-on:serviceaccount:create"
  - "impersonate-on:serviceaccount:update"
  - "impersonate-on:serviceaccount:patch"
---
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: impersonate-app-sa
  namespace: default
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: Role
  name: impersonate-app-sa
subjects:
- kind: ServiceAccount
  name: deputy-controller
  namespace: default
---
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: impersonate-manage-deployments
  namespace: production
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: Role
  name: impersonate-manage-deployments
subjects:
- kind: ServiceAccount
  name: deputy-controller
  namespace: default
```

#### Example: Impersonate a node

To allow `node-impersonator` ServiceAccount in `default` namespace impersonating
a node named `mynode` to get and list pods:

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: impersonate-node-sa
rules:
- apiGroups: ["authentication.k8s.io"]
  resources: ["nodes"]
  resourceNames: ["mynode"]
  verbs: ["impersonate:arbitrary-node"]
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: impersonate-list-pods
rules:
  - apiGroups: [""]
    resources: ["pods"]
    verbs:
      - "impersonate-on:arbitrary-node:list"
      - "impersonate-on:arbitrary-node:get"
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: impersonate-node-sa
  namespace: default
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: impersonate-node-sa
subjects:
- kind: ServiceAccount
  name: node-impersonator
  namespace: default
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: impersonate-list-pods
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: impersonate-list-pods
subjects:
  - kind: ServiceAccount
    name: node-impersonator
    namespace: default
```

#### Example: Node agent impersonating the associated node

This is a common pattern for node agents (like CNI plugins) that need to read pods on their node
without having cluster-wide pod access.

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: impersonate-associated-node-identity
rules:
- apiGroups: ["authentication.k8s.io"]
  resources: ["nodes"]
  verbs: ["impersonate:associated-node"]
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: impersonate-list-pods-on-node
rules:
- apiGroups: [""]
  resources: ["pods"]
  verbs:
  - "impersonate-on:associated-node:list"
  - "impersonate-on:associated-node:get"
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: node-agent-impersonate-node
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: impersonate-associated-node-identity
subjects:
- kind: ServiceAccount
  name: node-agent
  namespace: kube-system
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: node-agent-impersonate-list-pods
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: impersonate-list-pods-on-node
subjects:
- kind: ServiceAccount
  name: node-agent
  namespace: kube-system
```

The controller would get the node name using the downward API:

```yaml
env:
- name: MY_NODE_NAME
  valueFrom:
    fieldRef:
      fieldPath: spec.nodeName
```

Then configure the kubeconfig to impersonate:

```go
kubeConfig, _ := clientcmd.BuildConfigFromFlags("", "")
kubeConfig.Impersonate = rest.ImpersonationConfig{
    UserName: "system:node:" + os.Getenv("MY_NODE_NAME"),
}
```

### Using constrained impersonation

From a client perspective, using constrained impersonation is identical to using traditional
impersonation. You use the same impersonation headers:

```http
Impersonate-User: jane.doe@example.com
```

Or with kubectl:

```bash
kubectl get pods -n default --as=jane.doe@example.com
```

The difference is entirely in the authorization checks performed by the API server.

### Working with `impersonate` verb

- If you have existing RBAC rules using the `impersonate` verb, they continue
  to function when the feature gate is enabled.

- When an impersonation request is made, the API server first checks for
  constrained impersonation permissions. If those checks fail, it falls back to checking the
  `impersonate` permission.

## Auditing

An audit event is logged for each impersonation request to help track how impersonation is used.

When a request uses constrained impersonation, the audit event includes an `authenticationMetadata`
object with an `impersonationConstraint` field that indicates which constrained impersonation verb
was used to authorize the request.

For non-watch requests that take longer than 500ms, the API server also adds an
`apiserver.latency.k8s.io/impersonation` annotation to the audit event
recording the time taken to process the impersonation (along with other handlers that contributed
to the overall duration).

Example audit event:

```json
{
  "kind": "Event",
  "apiVersion": "audit.k8s.io/v1",
  "user": {
    "username": "system:serviceaccount:default:my-controller"
  },
  "impersonatedUser": {
    "username": "jane.doe@example.com"
  },
  "authenticationMetadata": {
    "impersonationConstraint": "impersonate:user-info"
  },
  "annotations": {
    "apiserver.latency.k8s.io/impersonation": "100ms"
  },
  "verb": "list",
  "objectRef": {
    "resource": "pods",
    "namespace": "default"
  }
}
```

The `impersonationConstraint` value indicates which mode was used (for example, `impersonate:user-info`,
`impersonate:associated-node`). The specific action (for example, `list`) can be determined from the
`verb` field in the audit event. For slow requests, the latency annotation records the time (for example,
`100ms`) taken to process the impersonation for the request.

## Metrics

`kube-apiserver` exposes the following Prometheus metrics for constrained impersonation:

- `apiserver_impersonation_attempts_total{mode, decision}`: a counter that increments on each
  impersonation attempt. A `mode` is one of `associated-node`,
  `arbitrary-node`, `serviceaccount`, `user-info`, or `legacy`. The `decision` is `allowed` or `denied`.
- `apiserver_impersonation_attempts_duration_seconds{mode, decision}`: a histogram tracking the time taken to
  resolve the impersonated user. The `mode` and `decision` labels have the same values as above. Because of
  caching within the handler, this reflects the amortized latency cost of impersonation requests.
- `apiserver_impersonation_authorization_attempts_total{mode, decision}`:  a counter that increments each
  time an impersonation attempt invokes the authorizer. The `mode` and `decision` labels have the same values as above.
- `apiserver_impersonation_authorization_attempts_duration_seconds{mode, decision}`: a histogram
  tracking the time taken by the authorizer for each impersonation attempt.
  The `mode` and `decision` labels have the same values as above.

For metrics `apiserver_impersonation_attempts_total{mode, decision}` and
`apiserver_impersonation_attempts_duration_seconds{mode, decision}`, the `mode` is
the empty string when `decision` is `denied`.

## What's next

- Read about RBAC authorization
- Understand Kubernetes authentication
