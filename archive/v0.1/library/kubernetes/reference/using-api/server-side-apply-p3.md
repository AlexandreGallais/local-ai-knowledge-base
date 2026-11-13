---
title: "Server-Side Apply (part 3 of 3)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/using-api/server-side-apply.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Server-Side Apply (part 3 of 3)

## Migration between client-side and server-side apply

### Upgrading from client-side apply to server-side apply

Client-side apply users who manage a resource with `kubectl apply` can start
using server-side apply with the following flag.

```shell
kubectl apply --server-side [--dry-run=server]
```

By default, field management of the object transfers from client-side apply to
kubectl server-side apply, without encountering conflicts.

**Caution:**
Keep the `last-applied-configuration` annotation up to date.
The annotation infers client-side applies managed fields.
Any fields not managed by client-side apply raise conflicts.

For example, if you used `kubectl scale` to update the replicas field after
client-side apply, then this field is not owned by client-side apply and
creates conflicts on `kubectl apply --server-side`.

This behavior applies to server-side apply with the `kubectl` field manager.
As an exception, you can opt-out of this behavior by specifying a different,
non-default field manager, as seen in the following example. The default field
manager for kubectl server-side apply is `kubectl`.

```shell
kubectl apply --server-side --field-manager=my-manager [--dry-run=server]
```

### Downgrading from server-side apply to client-side apply

If you manage a resource with `kubectl apply --server-side`,
you can downgrade to client-side apply directly with `kubectl apply`.

Downgrading works because kubectl Server-Side Apply keeps the
`last-applied-configuration` annotation up-to-date if you use
`kubectl apply`.

This behavior applies to Server-Side Apply with the `kubectl` field manager.
As an exception, you can opt-out of this behavior by specifying a different,
non-default field manager, as seen in the following example. The default field
manager for kubectl server-side apply is `kubectl`.

```shell
kubectl apply --server-side --field-manager=my-manager [--dry-run=server]
```

## API implementation

The `PATCH` verb (for an object that supports Server-Side Apply) accepts the
unofficial `application/apply-patch+yaml` content type. Users of Server-Side
Apply can send partially specified objects as YAML as the body of a `PATCH` request
to the URI of a resource.  When applying a configuration, you should always include all the
fields that are important to the outcome (such as a desired state) that you want to define.

All JSON messages are valid YAML. Therefore, in addition to using YAML request bodies for Server-Side Apply requests, you can also use JSON request bodies, as they are also valid YAML.
In either case, use the media type `application/apply-patch+yaml` for the HTTP request.

### Access control and permissions {#rbac-and-permissions}

Since Server-Side Apply is a type of `PATCH`, a principal (such as a Role for Kubernetes
RBAC) requires the **patch** permission to
edit existing resources, and also needs the **create** verb permission in order to create
new resources with Server-Side Apply.

## Clearing `managedFields`

It is possible to strip all `managedFields` from an object by overwriting them
using a **patch** (JSON Merge Patch, Strategic Merge Patch, JSON Patch), or
through an **update** (HTTP `PUT`); in other words, through every write operation
other than **apply**. This can be done by overwriting the `managedFields` field
with an empty entry. Two examples are:

```console
PATCH /api/v1/namespaces/default/configmaps/example-cm
Accept: application/json
Content-Type: application/merge-patch+json

{
  "metadata": {
    "managedFields": [
      {}
    ]
  }
}
```

```console
PATCH /api/v1/namespaces/default/configmaps/example-cm
Accept: application/json
Content-Type: application/json-patch+json
If-Match: 1234567890123456789

[{"op": "replace", "path": "/metadata/managedFields", "value": [{}]}]
```

This will overwrite the `managedFields` with a list containing a single empty
entry that then results in the `managedFields` being stripped entirely from the
object. Note that setting the `managedFields` to an empty list will not
reset the field. This is on purpose, so `managedFields` never get stripped by
clients not aware of the field.

In cases where the reset operation is combined with changes to other fields
than the `managedFields`, this will result in the `managedFields` being reset
first and the other changes being processed afterwards. As a result the
applier takes ownership of any fields updated in the same request.

**Note:**
Server-Side Apply does not correctly track ownership on
sub-resources that don't receive the resource object type. If you are
using Server-Side Apply with such a sub-resource, the changed fields
may not be tracked.

## What's next

You can read about `managedFields` within the Kubernetes API reference for the
`metadata`
top level field.
