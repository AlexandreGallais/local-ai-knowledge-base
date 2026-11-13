---
title: "Server-Side Apply (part 1 of 3)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/using-api/server-side-apply.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

**Feature state:**

Kubernetes supports multiple appliers collaborating to manage the fields
of a single object.

Server-Side Apply provides an optional mechanism for your cluster's control plane to track
changes to an object's fields. At the level of a specific resource, Server-Side
Apply records and tracks information about control over the fields of that object.

Server-Side Apply helps users and controllers
manage their resources through declarative configuration. Clients can create and modify
objects
declaratively by submitting their _fully specified intent_.

A fully specified intent is a partial object that only includes the fields and
values for which the user has an opinion. That intent either creates a new
object (using default values for unspecified fields), or is
combined, by the API server, with the existing object.

Comparison with Client-Side Apply explains
how Server-Side Apply differs from the original, client-side `kubectl apply`
implementation.

## Field management

The Kubernetes API server tracks _managed fields_ for all newly created objects.

When trying to apply an object, fields that have a different value and are owned by
another manager will result in a conflict. This is done
in order to signal that the operation might undo another collaborator's changes.
Writes to objects with managed fields can be forced, in which case the value of any
conflicted field will be overridden, and the ownership will be transferred.

Whenever a field's value does change, ownership moves from its current manager to the
manager making the change.

For a user to manage a field, in the Server-Side Apply sense, means that the
user relies on and expects the value of the field not to change. The user who
last made an assertion about the value of a field will be recorded as the
current field manager. This can be done by changing the field manager
details explicitly using HTTP `POST` (**create**), `PUT` (**update**), or non-apply
`PATCH` (**patch**). You can also declare and record a field manager
by including a value for that field in a Server-Side Apply operation.

A Server-Side Apply **patch** request requires the client to provide its identity
as a field manager. When using Server-Side Apply, trying to change a
field that is controlled by a different manager results in a rejected
request unless the client forces an override.
For details of overrides, see Conflicts.

When two or more appliers set a field to the same value, they share ownership of
that field. Any subsequent attempt to change the value of the shared field, by any of
the appliers, results in a conflict. Shared field owners may give up ownership
of a field by making a Server-Side Apply **patch** request that doesn't include
that field.

Field management details are stored in a `managedFields` field that is part of an
object's `metadata`.

If you remove a field from a manifest and apply that manifest, Server-Side
Apply checks if there are any other field managers that also own the field.
If the field is not owned by any other field managers, it is either deleted
from the live object or reset to its default value, if it has one.
The same rule applies to associative list or map items.

Compared to the (legacy)
`kubectl.kubernetes.io/last-applied-configuration`
annotation managed by `kubectl`, Server-Side Apply uses a more declarative
approach, that tracks a user's (or client's) field management, rather than
a user's last applied state. As a side effect of using Server-Side Apply,
information about which field manager manages each field in an object also
becomes available.

### Example {#ssa-example-configmap}

A simple example of an object created using Server-Side Apply could look like this:

**Note:**
`kubectl get` omits managed fields by default.
Add `--show-managed-fields` to show `managedFields` when the output format is either `json` or `yaml`.

```yaml
---
apiVersion: v1
kind: ConfigMap
metadata:
  name: test-cm
  namespace: default
  labels:
    test-label: test
  managedFields:
  - manager: kubectl
    operation: Apply # note capitalization: "Apply" (or "Update")
    apiVersion: v1
    time: "2010-10-10T0:00:00Z"
    fieldsType: FieldsV1
    fieldsV1:
      f:metadata:
        f:labels:
          f:test-label: {}
      f:data:
        f:key: {}
data:
  key: some value
```

That example ConfigMap object contains a single field management record in
`.metadata.managedFields`. The field management record consists of basic <example-value>
about the managing entity itself, plus details about the fields being managed and
the relevant operation (`Apply` or `Update`). If the request that last changed that
field was a Server-Side Apply **patch** then the value of `operation` is `Apply`;
otherwise, it is `Update`.

There is another possible outcome. A client could submit an invalid request
body. If the fully specified intent does not produce a valid object, the
request fails.

It is however possible to change `.metadata.managedFields` through an
**update**, or through a **patch** operation that does not use Server-Side Apply.
Doing so is highly discouraged, but might be a reasonable option to try if,
for example, the `.metadata.managedFields` get into an inconsistent state
(which should not happen in normal operations).

The format of `managedFields` is described
in the Kubernetes API reference.

**Caution:**
The `.metadata.managedFields` field is managed by the API server.
You should avoid updating it manually.

### Conflicts

A _conflict_ is a special status error that occurs when an `Apply` operation tries
to change a field that another manager also claims to manage. This prevents an
applier from unintentionally overwriting the value set by another user. When
this occurs, the applier has 3 options to resolve the conflicts:

* **Overwrite value, become sole manager:** If overwriting the value was
  intentional (or if the applier is an automated process like a controller) the
  applier should set the `force` query parameter to true (for `kubectl apply`,
  you use the `--force-conflicts` command line parameter), and make the request
  again. This forces the operation to succeed, changes the value of the field,
  and removes the field from all other managers' entries in `managedFields`.

* **Don't overwrite value, give up management claim:** If the applier doesn't
  care about the value of the field any more, the applier can remove it from their
  local model of the resource, and make a new request with that particular field
  omitted. This leaves the value unchanged, and causes the field to be removed
  from the applier's entry in `managedFields`.

* **Don't overwrite value, become shared manager:** If the applier still cares
  about the value of a field, but doesn't want to overwrite it, they can
  change the value of that field in their local model of the resource so as to
  match the value of the object on the server, and then make a new request that
  takes into account that local update. Doing so leaves the value unchanged,
  and causes that field's management to be shared by the applier along with all
  other field managers that already claimed to manage it.

### Field managers {#managers}

Managers identify distinct workflows that are modifying the object (especially
useful on conflicts!), and can be specified through the
`fieldManager`
query parameter as part of a modifying request. When you Apply to a resource,
the `fieldManager` parameter is required.
For other updates, the API server infers a field manager identity from the
 "User-Agent:" HTTP header (if present).

When you use the `kubectl` tool to perform a Server-Side Apply operation, `kubectl`
sets the manager identity to `"kubectl"` by default.

## Serialization

At the protocol level, Kubernetes represents Server-Side Apply message bodies
as YAML, with the media type `application/apply-patch+yaml`.

**Note:**
Whether you are submitting JSON data or YAML data, use
`application/apply-patch+yaml` as the `Content-Type` header value.

All JSON documents are valid YAML. However, Kubernetes has a bug where it uses a YAML
parser that does not fully implement the YAML specification. Some JSON escapes may
not be recognized.

The serialization is the same as for Kubernetes objects, with the exception that
clients are not required to send a complete object.

Here's an example of a Server-Side Apply message body (fully specified intent):
```yaml
{
  "apiVersion": "v1",
  "kind": "ConfigMap"
}
```

(this would make a no-change update, provided that it was sent as the body
of a **patch** request to a valid `v1/configmaps` resource, and with the
appropriate request `Content-Type`).

## Operations in scope for field management {#apply-and-update}

The Kubernetes API operations where field management is considered are:

1. Server-Side Apply (HTTP `PATCH`, with content type `application/apply-patch+yaml`)
2. Replacing an existing object (**update** to Kubernetes; `PUT` at the HTTP level)

Both operations update `.metadata.managedFields`, but behave a little differently.

Unless you specify a forced override, an apply operation that encounters field-level
conflicts always fails; by contrast, if you make a change using **update** that would
affect a managed field, a conflict never provokes failure of the operation.

All Server-Side Apply **patch** requests are required to identify themselves by providing a
`fieldManager` query parameter, while the query parameter is optional for **update**
operations. Finally, when using the `Apply` operation you cannot define `managedFields` in
the body of the request that you submit.

An example object with multiple managers could look like this:

```yaml
---
apiVersion: v1
kind: ConfigMap
metadata:
  name: test-cm
  namespace: default
  labels:
    test-label: test
  managedFields:
  - manager: kubectl
    operation: Apply
    time: '2019-03-30T15:00:00.000Z'
    apiVersion: v1
    fieldsType: FieldsV1
    fieldsV1:
      f:metadata:
        f:labels:
          f:test-label: {}
  - manager: kube-controller-manager
    operation: Update
    apiVersion: v1
    time: '2019-03-30T16:00:00.000Z'
    fieldsType: FieldsV1
    fieldsV1:
      f:data:
        f:key: {}
data:
  key: new value
```

In this example, a second operation was run as an **update** by the manager called
`kube-controller-manager`. The update request succeeded and changed a value in the data
field, which caused that field's management to change to the `kube-controller-manager`.

If this update has instead been attempted using Server-Side Apply, the request
would have failed due to conflicting ownership.
