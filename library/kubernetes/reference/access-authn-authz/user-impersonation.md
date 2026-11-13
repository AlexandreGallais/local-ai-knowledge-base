---
title: "User Impersonation (part 1 of 2)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/access-authn-authz/user-impersonation.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

User _impersonation_ is a method of allowing authenticated users to act as another user,
group, or service account through HTTP headers.

A user can act as another user through impersonation headers. These let requests
manually override the user info a request authenticates as. For example, an admin
could use this feature to debug an authorization policy by temporarily
impersonating another user and seeing if a request was denied.

Impersonation requests first authenticate as the requesting user, then switch
to the impersonated user info.

* A user makes an API call with their credentials _and_ impersonation headers.
* API server authenticates the user.
* API server ensures the authenticated users have impersonation privileges.
* Request user info is replaced with impersonation values.
* Request is evaluated, authorization acts on impersonated user info.

The following HTTP headers can be used to performing an impersonation request:

* `Impersonate-User`: The username to act as.
* `Impersonate-Uid`: A unique identifier that represents the user being impersonated. Optional.
   Requires "Impersonate-User". Kubernetes does not impose any format requirements on this string.
* `Impersonate-Group`: A group name to act as. Can be provided multiple times to set multiple groups.
  Optional. Requires "Impersonate-User".
* `Impersonate-Extra-( extra name )`: A dynamic header used to associate extra fields with the user.
  Optional. Requires "Impersonate-User". In order to be preserved consistently, `( extra name )`
  must be lower-case, and any characters which aren't legal in HTTP header labels
  MUST be utf8 and percent-encoded.

**Note:**
Prior to 1.11.3 (and 1.10.7, 1.9.11), `( extra name )` could only contain characters which
were legal in HTTP header labels.

**Note:**
`Impersonate-Uid` is only available in versions 1.22.0 and higher.

An example of the impersonation headers used when impersonating a user with groups:

```http
Impersonate-User: jane.doe@example.com
Impersonate-Group: developers
Impersonate-Group: admins
```

An example of the impersonation headers used when impersonating a user with a UID and
extra fields:

```http
Impersonate-User: jane.doe@example.com
Impersonate-Uid: 06f6ce97-e2c5-4ab8-7ba5-7654dd08d52b
Impersonate-Extra-dn: cn=jane,ou=engineers,dc=example,dc=com
Impersonate-Extra-acme.com%2Fproject: some-project
Impersonate-Extra-scopes: view
Impersonate-Extra-scopes: development
```

When using `kubectl` set the `--as` command line argument to configure the `Impersonate-User`
header, you can also set the `--as-group` flag to configure the `Impersonate-Group` header，
set the `--as-uid` flag (1.23) to configure `Impersonate-Uid` header, and set the
`--as-user-extra` flag (1.35) to configure `Impersonate-Extra-( extra name )` header.

```bash
kubectl drain mynode
```

```none
Error from server (Forbidden): User "clark" cannot get nodes at the cluster scope. (get nodes mynode)
```

Set the `--as` and `--as-group` flag:

```bash
kubectl drain mynode --as=superman --as-group=system:masters
```

```none
node/mynode cordoned
node/mynode drained
```

To impersonate a user, user identifier (UID), group or extra fields, the impersonating user must
have the ability to perform the **impersonate** verb on the kind of attribute
being impersonated ("user", "uid", "group", etc.). For clusters that enable the RBAC
authorization plugin, the following ClusterRole encompasses the rules needed to
set user and group impersonation headers:

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: impersonator
rules:
- apiGroups: [""]
  resources: ["users", "groups", "serviceaccounts"]
  verbs: ["impersonate"]
```

For impersonation, extra fields and impersonated UIDs are both under the "authentication.k8s.io" `apiGroup`.
Extra fields are evaluated as sub-resources of the resource "userextras". To
allow a user to use impersonation headers for the extra field `scopes` and
for UIDs, a user should be granted the following role:

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: scopes-and-uid-impersonator
rules:
# Can set "Impersonate-Extra-scopes" header and the "Impersonate-Uid" header.
- apiGroups: ["authentication.k8s.io"]
  resources: ["userextras/scopes", "uids"]
  verbs: ["impersonate"]
```

The values of impersonation headers can also be restricted by limiting the set
of `resourceNames` a resource can take.

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: limited-impersonator
rules:
# Can impersonate the user "jane.doe@example.com"
- apiGroups: [""]
  resources: ["users"]
  verbs: ["impersonate"]
  resourceNames: ["jane.doe@example.com"]

# Can impersonate the groups "developers" and "admins"
- apiGroups: [""]
  resources: ["groups"]
  verbs: ["impersonate"]
  resourceNames: ["developers","admins"]

# Can impersonate the extras field "scopes" with the values "view" and "development"
- apiGroups: ["authentication.k8s.io"]
  resources: ["userextras/scopes"]
  verbs: ["impersonate"]
  resourceNames: ["view", "development"]

# Can impersonate the uid "06f6ce97-e2c5-4ab8-7ba5-7654dd08d52b"
- apiGroups: ["authentication.k8s.io"]
  resources: ["uids"]
  verbs: ["impersonate"]
  resourceNames: ["06f6ce97-e2c5-4ab8-7ba5-7654dd08d52b"]
```

**Note:**
Impersonating a user or group allows you to perform any action as if you were that user or group;
for that reason, impersonation is not namespace scoped.
If you want to allow impersonation using Kubernetes RBAC,
this requires using a ClusterRole and a ClusterRoleBinding,
not a Role and RoleBinding.

Granting impersonation over ServiceAccounts is namespace scoped, but the impersonated ServiceAccount
could perform actions outside of namespace.
