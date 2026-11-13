---
title: "Kubernetes API Concepts (part 4 of 7)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/using-api/api-concepts.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Kubernetes API Concepts (part 4 of 7)

## Resource deletion

When you **delete** a resource this takes place in two phases.

1. _finalization_
1. removal

```yaml
{
  "kind": "ConfigMap",
  "apiVersion": "v1",
  "metadata": {
    "finalizers": ["url.io/neat-finalization", "other-url.io/my-finalizer"],
    "deletionTimestamp": nil,
  }
}
```

When a client first sends a **delete** to request the removal of a resource,
the `.metadata.deletionTimestamp` is set to the current time.
Once the `.metadata.deletionTimestamp` is set, external controllers that act on finalizers
may start performing their cleanup work at any time, in any order.

Order is **not** enforced between finalizers because it would introduce significant
risk of stuck `.metadata.finalizers`.

The `.metadata.finalizers` field is shared: any actor with permission can reorder it.
If the finalizer list were processed in order, then this might lead to a situation
in which the component responsible for the first finalizer in the list is
waiting for some signal (field value, external system, or other) produced by a
component responsible for a finalizer later in the list, resulting in a deadlock.

Without enforced ordering, finalizers are free to order amongst themselves and are
not vulnerable to ordering changes in the list.

Once the last finalizer is removed, the resource is actually removed from etcd.

### Force deletion

**Feature state:**

**Caution:**
This may break the workload associated with the resource being force deleted, if it
relies on the normal deletion flow, so cluster breaking consequences may apply.

By enabling the delete option `ignoreStoreReadErrorWithClusterBreakingPotential`, the
user can perform an unsafe force **delete** operation of an undecryptable/corrupt
resource. This option is available when the `AllowUnsafeMalformedObjectDeletion`
feature gate is
enabled, which is the default since Kubernetes v1.37. A cluster operator can turn
this behavior off by setting the command line option
`--feature-gates=AllowUnsafeMalformedObjectDeletion=false`.

**Note:**
The user performing the force **delete** operation must have the privileges to do both
the **delete** and **unsafe-delete-ignore-read-errors** verbs on the given resource.

A resource is considered corrupt if it can not be successfully retrieved from the
storage due to:

- transformation error (for example: decryption failure), or
- the object failed to decode.

The API server first attempts a normal deletion, and if it fails with
a _corrupt resource_ error then it triggers the force delete. A force **delete** operation
is unsafe because it ignores finalizer constraints, and skips precondition checks.

The default value for this option is `false`, this maintains backward compatibility.
For a **delete** request with `ignoreStoreReadErrorWithClusterBreakingPotential`
set to `true`, the fields `dryRun`, `gracePeriodSeconds`, `orphanDependents`,
`preconditions`, and `propagationPolicy` must be left unset.

**Note:**
If the user issues a **delete** request with `ignoreStoreReadErrorWithClusterBreakingPotential`
set to `true` on an otherwise readable resource, the API server aborts the request with an error.

## Single resource API

The Kubernetes API verbs **get**, **create**, **update**, **patch**,
**delete** and **proxy** support single resources only.
These verbs with single resource support have no support for submitting multiple
resources together in an ordered or unordered list or transaction.

When clients (including kubectl) act on a set of resources, the client makes a series
of single-resource API requests, then aggregates the responses if needed.

By contrast, the Kubernetes API verbs **list** and **watch** allow getting multiple
resources, and **deletecollection** allows deleting multiple resources.

## Field validation

Kubernetes always validates the type of fields. For example, if a field in the
API is defined as a number, you cannot set the field to a text value. If a field
is defined as an array of strings, you can only provide an array. Some fields
allow you to omit them, other fields are required. Omitting a required field
from an API request is an error.

If you make a request with an extra field, one that the cluster's control plane
does not recognize, then the behavior of the API server is more complicated.

By default, the API server drops fields that it does not recognize
from an input that it receives (for example, the JSON body of a `PUT` request).

There are two situations where the API server drops fields that you supplied in
an HTTP request.

These situations are:

1. The field is unrecognized because it is not in the resource's OpenAPI schema. (One
   exception to this is for CRDs
   that explicitly choose not to prune unknown fields via `x-kubernetes-preserve-unknown-fields`).
1. The field is duplicated in the object.

### Validation for unrecognized or duplicate fields {#setting-the-field-validation-level}

**Feature state:**

From 1.25 onward, unrecognized or duplicate fields in an object are detected via
validation on the server when you use HTTP verbs that can submit data (`POST`, `PUT`, and `PATCH`).
Possible levels of validation are `Ignore`, `Warn` (default), and `Strict`.

`Ignore`
: The API server succeeds in handling the request as it would without the erroneous fields
  being set, dropping all unknown and duplicate fields and giving no indication it
  has done so.

`Warn`
: (Default) The API server succeeds in handling the request, and reports a
  warning to the client. The warning is sent using the `Warning:` response header,
  adding one warning item for each unknown or duplicate field. For more
  information about warnings and the Kubernetes API, see the blog article
  Warning: Helpful Warnings Ahead.

`Strict`
: The API server rejects the request with a 400 Bad Request error when it
  detects any unknown or duplicate fields. The response message from the API
  server specifies all the unknown or duplicate fields that the API server has
  detected.

The field validation level is set by the `fieldValidation` query parameter.

**Note:**
If you submit a request that specifies an unrecognized field, and that is also invalid for
a different reason (for example, the request provides a string value where the API expects
an integer for a known field), then the API server responds with a 400 Bad Request error, but will
not provide any information on unknown or duplicate fields (only which fatal
error it encountered first).

You always receive an error response in this case, no matter what field validation level you requested.

Tools that submit requests to the server (such as `kubectl`), might set their own
defaults that are different from the `Warn` validation level that the API server uses
by default.

The `kubectl` tool uses the `--validate` flag to set the level of field
validation. It accepts the values `ignore`, `warn`, and `strict` while
also accepting the values `true` (equivalent to `strict`) and `false`
(equivalent to `ignore`). The default validation setting for kubectl is
`--validate=true`, which means strict server-side field validation.

When kubectl cannot connect to an API server with field validation (API servers
prior to Kubernetes 1.27), it will fall back to using client-side validation.
Client-side validation will be removed entirely in a future version of kubectl.

**Note:**

Prior to Kubernetes 1.25, `kubectl --validate` was used to toggle client-side validation on or off as
a boolean flag.

Starting from v1.33, Kubernetes (including v) offers a way to define field validations using _declarative tags_.
This is useful for people contributing to Kubernetes itself, and it's also relevant if you're
writing your own API using Kubernetes libraries.
To learn more, see Declarative API Validation.

## Dry-run

**Feature state:**

When you use HTTP verbs that can modify resources (`POST`, `PUT`, `PATCH`, and
`DELETE`), you can submit your request in a _dry run_ mode. Dry run mode helps to
evaluate a request through the typical request stages (admission chain, validation,
merge conflicts) up until persisting objects to storage. The response body for the
request is as close as possible to a non-dry-run response. Kubernetes guarantees that
dry-run requests will not be persisted in storage or have any other side effects.

### Make a dry-run request

Dry-run is triggered by setting the `dryRun` query parameter. This parameter is a
string, working as an enum, and the only accepted values are:

[no value set]
: Allow side effects. You request this with a query string such as `?dryRun`
  or `?dryRun&pretty=true`. The response is the final object that would have been
  persisted, or an error if the request could not be fulfilled.

`All`
: Every stage runs as normal, except for the final storage stage where side effects
  are prevented.

When you set `?dryRun=All`, any relevant
admission controllers
are run, validating admission controllers check the request post-mutation, merge is
performed on `PATCH`, fields are defaulted, and schema validation occurs. The changes
are not persisted to the underlying storage, but the final object which would have
been persisted is still returned to the user, along with the normal status code.

If the non-dry-run version of a request would trigger an admission controller that has
side effects, the request will be failed rather than risk an unwanted side effect. All
built in admission control plugins support dry-run. Additionally, admission webhooks can
declare in their
configuration object
that they do not have side effects, by setting their `sideEffects` field to `None`.

**Note:**
If a webhook actually does have side effects, then the `sideEffects` field should be
set to "NoneOnDryRun". That change is appropriate provided that the webhook is also
be modified to understand the `DryRun` field in AdmissionReview, and to prevent side
effects on any request marked as dry runs.

Here is an example dry-run request that uses `?dryRun=All`:

```http
POST /api/v1/namespaces/test/pods?dryRun=All
Content-Type: application/json
Accept: application/json
```

The response would look the same as for non-dry-run request, but the values of some
generated fields may differ.

### Generated values

Some values of an object are typically generated before the object is persisted. It
is important not to rely upon the values of these fields set by a dry-run request,
since these values will likely be different in dry-run mode from when the real
request is made. Some of these fields are:

* `name`: if `generateName` is set, `name` will have a unique random name
* `creationTimestamp` / `deletionTimestamp`: records the time of creation/deletion
* `UID`: uniquely identifies
  the object and is randomly generated (non-deterministic)
* `resourceVersion`: tracks the persisted version of the object
* Any field set by a mutating admission controller
* For the `Service` resource: Ports or IP addresses that the kube-apiserver assigns to Service objects

### Dry-run authorization

Authorization for dry-run and non-dry-run requests is identical. Thus, to make
a dry-run request, you must be authorized to make the non-dry-run request.

For example, to run a dry-run **patch** for a Deployment, you must be authorized
to perform that **patch**. Here is an example of a rule for Kubernetes
RBAC that allows patching
Deployments:

```yaml
rules:
- apiGroups: ["apps"]
  resources: ["deployments"]
  verbs: ["patch"]
```

See Authorization Overview.
