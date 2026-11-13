---
title: "Using RBAC Authorization (part 4 of 5)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/access-authn-authz/rbac.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Using RBAC Authorization (part 4 of 5)

## Default roles and role bindings

API servers create a set of default ClusterRole and ClusterRoleBinding objects.
Many of these are `system:` prefixed, which indicates that the resource is directly
managed by the cluster control plane.
All of the default ClusterRoles and ClusterRoleBindings are labeled with `kubernetes.io/bootstrapping=rbac-defaults`.

**Caution:**
Take care when modifying ClusterRoles and ClusterRoleBindings with names
that have a `system:` prefix.
Modifications to these resources can result in non-functional clusters.

### Auto-reconciliation

At each start-up, the API server updates default cluster roles with any missing permissions,
and updates default cluster role bindings with any missing subjects.
This allows the cluster to repair accidental modifications, and helps to keep roles and role bindings
up-to-date as permissions and subjects change in new Kubernetes releases.

To opt out of this reconciliation, set the `rbac.authorization.kubernetes.io/autoupdate`
annotation on a default cluster role or default cluster RoleBinding to `false`.
Be aware that missing default permissions and subjects can result in non-functional clusters.

Auto-reconciliation is enabled by default if the RBAC authorizer is active.

### API discovery roles {#discovery-roles}

Default cluster role bindings authorize unauthenticated and authenticated users to read API information
that is deemed safe to be publicly accessible (including CustomResourceDefinitions).
To disable anonymous unauthenticated access, add `--anonymous-auth=false` flag to
the API server configuration.

To view the configuration of these roles via `kubectl` run:

```shell
kubectl get clusterroles system:discovery -o yaml
```

**Note:**
If you edit that ClusterRole, your changes will be overwritten on API server restart
via auto-reconciliation. To avoid that overwriting,
either do not manually edit the role, or disable auto-reconciliation.

Kubernetes RBAC API discovery roles

 | Default ClusterRole
 | Default ClusterRoleBinding
 | Description

 | system:basic-user
 | system:authenticated group
 | Allows a user read-only access to basic information about themselves. Prior to v1.14, this role was also bound to <tt>system:unauthenticated</tt> by default.

 | system:discovery
 | system:authenticated group
 | Allows read-only access to API discovery endpoints needed to discover and negotiate an API level. Prior to v1.14, this role was also bound to <tt>system:unauthenticated</tt> by default.

 | system:public-info-viewer
 | system:authenticated and system:unauthenticated groups
 | Allows read-only access to non-sensitive information about the cluster. Introduced in Kubernetes v1.14.

### User-facing roles

Some of the default ClusterRoles are not `system:` prefixed. These are intended to be user-facing roles.
They include super-user roles (`cluster-admin`), roles intended to be granted cluster-wide
using ClusterRoleBindings, and roles intended to be granted within particular
namespaces using RoleBindings (`admin`, `edit`, `view`).

User-facing ClusterRoles use ClusterRole aggregation to allow admins to include
rules for custom resources on these ClusterRoles. To add rules to the `admin`, `edit`, or `view` roles, create
a ClusterRole with one or more of the following labels:

```yaml
metadata:
  labels:
    rbac.authorization.k8s.io/aggregate-to-admin: "true"
    rbac.authorization.k8s.io/aggregate-to-edit: "true"
    rbac.authorization.k8s.io/aggregate-to-view: "true"
```

 | Default ClusterRole
 | Default ClusterRoleBinding
 | Description

 | cluster-admin
 | system:masters group
 | Allows super-user access to perform any action on any resource.
When used in a ClusterRoleBinding, it gives full control over every resource in the cluster and in all namespaces.
When used in a RoleBinding, it gives full control over every resource in the role binding's namespace, including the namespace itself.

 | admin
 | None
 | Allows admin access, intended to be granted within a namespace using a RoleBinding.

If used in a RoleBinding, allows read/write access to most resources in a namespace,
including the ability to create roles and role bindings within the namespace.
This role does not allow write access to resource quota or to the namespace itself.
This role also does not allow write access to EndpointSlices in clusters created
using Kubernetes v1.22+. More information is available in the
"Write Access for EndpointSlices" section.

 | edit
 | None
 | Allows read/write access to most objects in a namespace.

This role does not allow viewing or modifying roles or role bindings.
However, this role allows accessing Secrets and running Pods as any ServiceAccount in
the namespace, so it can be used to gain the API access levels of any ServiceAccount in
the namespace. This role also does not allow write access to EndpointSlices in
clusters created using Kubernetes v1.22+. More information is available in the
"Write Access for EndpointSlices" section.

 | view
 | None
 | Allows read-only access to see most objects in a namespace.
It does not allow viewing roles or role bindings.

This role does not allow viewing Secrets, since reading
the contents of Secrets enables access to ServiceAccount credentials
in the namespace, which would allow API access as any ServiceAccount
in the namespace (a form of privilege escalation).

### Core component roles

 | Default ClusterRole
 | Default ClusterRoleBinding
 | Description

 | system:kube-scheduler
 | system:kube-scheduler user
 | Allows access to the resources required by the scheduler component.

 | system:volume-scheduler
 | system:kube-scheduler user
 | Allows access to the volume resources required by the kube-scheduler component.

 | system:kube-controller-manager
 | system:kube-controller-manager user
 | Allows access to the resources required by the controller manager component.
The permissions required by individual controllers are detailed in the controller roles.

 | system:node
 | None
 | Allows access to resources required by the kubelet, including read access to all secrets, and write access to all pod status objects.

You should use the Node authorizer and NodeRestriction admission plugin instead of the <tt>system:node</tt> role, and allow granting API access to kubelets based on the Pods scheduled to run on them.

The <tt>system:node</tt> role only exists for compatibility with Kubernetes clusters upgraded from versions prior to v1.8.

 | system:node-proxier
 | system:kube-proxy user
 | Allows access to the resources required by the kube-proxy component.

### Other component roles

 | Default ClusterRole
 | Default ClusterRoleBinding
 | Description

 | system:auth-delegator
 | None
 | Allows delegated authentication and authorization checks.
This is commonly used by add-on API servers for unified authentication and authorization.

 | system:heapster
 | None
 | Role for the Heapster component (deprecated).

 | system:kube-aggregator
 | None
 | Role for the kube-aggregator component.

 | system:kube-dns
 | kube-dns service account in the kube-system namespace
 | Role for the deprecated kube-dns component. (CoreDNS does not use this role.)

 | system:kubelet-api-admin
 | None
 | Allows full access to the kubelet API.

 | system:node-bootstrapper
 | None
 | Allows access to the resources required to perform
kubelet TLS bootstrapping.

 | system:node-problem-detector
 | None
 | Role for the node-problem-detector component.

 | system:persistent-volume-provisioner
 | None
 | Allows access to the resources required by most dynamic volume provisioners.

 | system:monitoring
 | system:monitoring group
 | Allows read access to control-plane monitoring endpoints (i.e. kube-apiserver liveness and readiness endpoints (<tt>/healthz</tt>, <tt>/livez</tt>, <tt>/readyz</tt>), the individual health-check endpoints (<tt>/healthz/*</tt>, <tt>/livez/*</tt>, <tt>/readyz/*</tt>),  <tt>/metrics</tt>), and causes the kube-apiserver to respect the traceparent header provided with requests for tracing. Note that individual health check endpoints and the metric endpoint may expose sensitive information.

### Roles for built-in controllers {#controller-roles}

The Kubernetes controller manager runs
controllers that are built in to the Kubernetes
control plane.
When invoked with `--use-service-account-credentials`, kube-controller-manager starts each controller
using a separate service account.
Corresponding roles exist for each built-in controller, prefixed with `system:controller:`.
If the controller manager is not started with `--use-service-account-credentials`, it runs all control loops
using its own credential, which must be granted all the relevant roles.
These roles include:

* `system:controller:attachdetach-controller`
* `system:controller:certificate-controller`
* `system:controller:clusterrole-aggregation-controller`
* `system:controller:cronjob-controller`
* `system:controller:daemon-set-controller`
* `system:controller:deployment-controller`
* `system:controller:disruption-controller`
* `system:controller:endpoint-controller`
* `system:controller:expand-controller`
* `system:controller:generic-garbage-collector`
* `system:controller:horizontal-pod-autoscaler`
* `system:controller:job-controller`
* `system:controller:namespace-controller`
* `system:controller:node-controller`
* `system:controller:persistent-volume-binder`
* `system:controller:pod-garbage-collector`
* `system:controller:pv-protection-controller`
* `system:controller:pvc-protection-controller`
* `system:controller:replicaset-controller`
* `system:controller:replication-controller`
* `system:controller:resourcequota-controller`
* `system:controller:root-ca-cert-publisher`
* `system:controller:route-controller`
* `system:controller:service-account-controller`
* `system:controller:service-controller`
* `system:controller:statefulset-controller`
* `system:controller:ttl-controller`

## Privilege escalation prevention and bootstrapping

The RBAC API prevents users from escalating privileges by editing roles or role bindings.
Because this is enforced at the API level, it applies even when the RBAC authorizer is not in use.

### Restrictions on role creation or update

You can only create/update a role if at least one of the following things is true:

1. You already have all the permissions contained in the role, at the same scope as the object being modified
   (cluster-wide for a ClusterRole, within the same namespace or cluster-wide for a Role).
2. You are granted explicit permission to perform the `escalate` verb on the `roles` or
   `clusterroles` resource in the `rbac.authorization.k8s.io` API group.

For example, if `user-1` does not have the ability to list Secrets cluster-wide, they cannot create a ClusterRole
containing that permission. To allow a user to create/update roles:

1. Grant them a role that allows them to create/update Role or ClusterRole objects, as desired.
2. Grant them permission to include specific permissions in the roles they create/update:
   * implicitly, by giving them those permissions (if they attempt to create or modify a Role or
     ClusterRole with permissions they themselves have not been granted, the API request will be forbidden)
   * or explicitly allow specifying any permission in a `Role` or `ClusterRole` by giving them
     permission to perform the `escalate` verb on `roles` or `clusterroles` resources in the
     `rbac.authorization.k8s.io` API group

### Restrictions on role binding creation or update

You can only create/update a role binding if you already have all the permissions contained in the referenced role
(at the same scope as the role binding) *or* if you have been authorized to perform the `bind` verb on the referenced role.
For example, if `user-1` does not have the ability to list Secrets cluster-wide, they cannot create a ClusterRoleBinding
to a role that grants that permission. To allow a user to create/update role bindings:

1. Grant them a role that allows them to create/update RoleBinding or ClusterRoleBinding objects, as desired.
2. Grant them permissions needed to bind a particular role:
   * implicitly, by giving them the permissions contained in the role.
   * explicitly, by giving them permission to perform the `bind` verb on the particular Role (or ClusterRole).

For example, this ClusterRole and RoleBinding would allow `user-1` to grant other users the `admin`, `edit`, and `view` roles in the namespace `user-1-namespace`:

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: role-grantor
rules:
- apiGroups: ["rbac.authorization.k8s.io"]
  resources: ["rolebindings"]
  verbs: ["create"]
- apiGroups: ["rbac.authorization.k8s.io"]
  resources: ["clusterroles"]
  verbs: ["bind"]
  # omit resourceNames to allow binding any ClusterRole
  resourceNames: ["admin","edit","view"]
---
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: role-grantor-binding
  namespace: user-1-namespace
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: role-grantor
subjects:
- apiGroup: rbac.authorization.k8s.io
  kind: User
  name: user-1
```

When bootstrapping the first roles and role bindings, it is necessary for the initial user to grant permissions they do not yet have.
To bootstrap initial roles and role bindings:

* Use a credential with the "system:masters" group, which is bound to the "cluster-admin" super-user role by the default bindings.
