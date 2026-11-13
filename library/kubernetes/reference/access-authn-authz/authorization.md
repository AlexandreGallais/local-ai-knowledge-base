---
title: "Authorization (part 1 of 3)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/access-authn-authz/authorization.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

Kubernetes authorization takes place following
authentication.
Usually, a client making a request must be authenticated (logged in) before its
request can be allowed; however, Kubernetes also allows anonymous requests in
some circumstances.

For an overview of how authorization fits into the wider context of API access
control, read
Controlling Access to the Kubernetes API.

## Authorization verdicts {#determine-whether-a-request-is-allowed-or-denied}

Kubernetes authorization of API requests takes place within the API server.
The API server evaluates all of the request attributes against all policies,
potentially also consulting external services, and then allows or denies the
request.

All parts of an API request must be allowed by some authorization
mechanism in order to proceed. In other words: access is denied by default.

**Note:**
Access controls and policies that
depend on specific fields of specific kinds of objects are handled by
admission controllers.

Kubernetes admission control happens after authorization has completed (and,
therefore, only when the authorization decision was to allow the request).

When multiple authorization modules are configured,
each is checked in sequence.
If any authorizer _approves_ or _denies_ a request, that decision is immediately
returned and no other authorizer is consulted. If all modules have _no opinion_
on the request, then the request is denied. An overall deny verdict means that
the API server rejects the request and responds with an HTTP 403 (Forbidden)
status.

## Request attributes used in authorization

Kubernetes reviews only the following API request attributes:

 * **user** - The `user` string provided during authentication.
 * **group** - The list of group names to which the authenticated user belongs.
 * **extra** - A map of arbitrary string keys to string values, provided by the authentication layer.
 * **API** - Indicates whether the request is for an API resource.
 * **Request path** - Path to miscellaneous non-resource endpoints like `/api` or `/healthz`.
 * **API request verb** - API verbs like `get`, `list`, `create`, `update`, `patch`, `watch`, `delete`, and `deletecollection` are used for resource requests. To determine the request verb for a resource API endpoint, see request verbs and authorization.
 * **HTTP request verb** - Lowercased HTTP methods like `get`, `post`, `put`, and `delete` are used for non-resource requests.
 * **Resource** - The ID or name of the resource that is being accessed (for resource requests only) -- For resource requests using `get`, `update`, `patch`, and `delete` verbs, you must provide the resource name.
 * **Subresource** - The subresource that is being accessed (for resource requests only). This can be a standard subresource (for example, `status` or `scale`) or a synthetic subresource used for fine-grained authorization.
 * **Namespace** - The namespace of the object that is being accessed (for namespaced resource requests only).
 * **API group** - The API Group being accessed (for resource requests only). An empty string designates the _core_ API group.

### Request verbs and authorization {#determine-the-request-verb}

#### Non-resource requests {#request-verb-non-resource}

Requests to endpoints other than `/api/v1/...` or `/apis/<group>/<version>/...`
are considered _non-resource requests_, and use the lower-cased HTTP method of the request as the verb.
For example, making a `GET` request using HTTP to endpoints such as `/api` or `/healthz` would use **get** as the verb.

#### Resource requests {#request-verb-resource}

To determine the request verb for a resource API endpoint, Kubernetes maps the HTTP verb
used and considers whether or not the request acts on an individual resource or on a
collection of resources:

HTTP verb     | request verb
--------------|---------------
`POST`        | **create**
`GET`, `HEAD` | **get** (for individual resources), **list** (for collections, including full object content), **watch** (for watching an individual resource or collection of resources)
`PUT`         | **update**
`PATCH`       | **patch**
`DELETE`      | **delete** (for individual resources), **deletecollection** (for collections)

**Caution:**
+The **get**, **list** and **watch** verbs can all return the full details of a resource. In
terms of access to the returned data they are equivalent. For example, **list** on `secrets`
will reveal the **data** attributes of any returned resources.

Kubernetes sometimes checks authorization for additional permissions using specialized verbs. For example:

* Special cases of authentication
  * **impersonate** verb on `users`, `groups`, and `serviceaccounts` in the core API group, and the `userextras` in the `authentication.k8s.io` API group.
* Authorization of CertificateSigningRequests
  * **approve** verb for CertificateSigningRequests, and **update** for revisions to existing approvals
* RBAC
  * **bind** and **escalate** verbs on `roles` and `clusterroles` resources in the `rbac.authorization.k8s.io` API group.
* Dynamic Resource Allocation (DRA)
  * Synthetic subresources such as `resourceclaims/binding` and `resourceclaims/driver` in the `resource.k8s.io` API group.
  * Node-aware verbs such as `associated-node:update`, `associated-node:patch`, `arbitrary-node:update`, and `arbitrary-node:patch` for DRA driver `resourceclaims/status` updates.
* Force deletion of corrupt resources
  * **unsafe-delete-ignore-read-errors** verb on the resource, checked in addition to the **delete** verb.

## Authorization context

Kubernetes expects attributes that are common to REST API requests. This means
that Kubernetes authorization works with existing organization-wide or
cloud-provider-wide access control systems which may handle other APIs besides
the Kubernetes API.
