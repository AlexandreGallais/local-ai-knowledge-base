---
title: "Server-Side Apply (part 2 of 3)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/using-api/server-side-apply.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Server-Side Apply (part 2 of 3)

## Merge strategy

The merging strategy, implemented with Server-Side Apply, provides a generally
more stable object lifecycle. Server-Side Apply tries to merge fields based on
the actor who manages them instead of overruling based on values. This way
multiple actors can update the same object without causing unexpected interference.

When a user sends a _fully-specified intent_ object to the Server-Side Apply
endpoint, the server merges it with the live object favoring the value from the
request body if it is specified in both places. If the set of items present in
the applied config is not a superset of the items applied by the same user last
time, each missing item not managed by any other appliers is removed. For
more information about how an object's schema is used to make decisions when
merging, see
sigs.k8s.io/structured-merge-diff.

The Kubernetes API (and the Go code that implements that API for Kubernetes) allows
defining _merge strategy markers_. These markers describe the merge strategy supported
for fields within Kubernetes objects.
For a CustomResourceDefinition,
you can set these markers when you define the custom resource.

| Golang marker   | OpenAPI extension            | Possible values                                  | Description                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| --------------- | ---------------------------- | ------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `//+listType`   | `x-kubernetes-list-type`     | `atomic`/`set`/`map`                             | Applicable to lists. `set` applies to lists that include only scalar elements. These elements must be unique. `map` applies to lists of nested types only. The key <example-value> (see `listMapKey`) must be unique in the list. `atomic` can apply to any list. If configured as `atomic`, the entire list is replaced during merge. At any point in time, a single manager owns the list. If `set` or `map`, different managers can manage entries separately. |
| `//+listMapKey` | `x-kubernetes-list-map-keys` | List of field names, e.g. `["port", "protocol"]` | Only applicable when `+listType=map`. A list of field names whose values uniquely identify entries in the list. While there can be multiple keys, `listMapKey` is singular because keys need to be specified individually in the Go type. The key <example-value> must be scalars.                                                                                                                                                                                |
| `//+mapType`    | `x-kubernetes-map-type`      | `atomic`/`granular`                              | Applicable to maps. `atomic` means that the map can only be entirely replaced by a single manager. `granular` means that the map supports separate managers updating individual fields.                                                                                                                                                                                                                                                                  |
| `//+structType` | `x-kubernetes-map-type`      | `atomic`/`granular`                              | Applicable to structs; otherwise same usage and OpenAPI annotation as `//+mapType`.                                                                                                                                                                                                                                                                                                                                                                      |

If `listType` is missing, the API server interprets a
`patchStrategy=merge` marker as a `listType=map` and the
corresponding `patchMergeKey` marker as a `listMapKey`.

The `atomic` list type is recursive.

(In the Go code for Kubernetes, these markers are specified as
comments and code authors need not repeat them as field tags).

## Custom resources and Server-Side Apply

By default, Server-Side Apply treats custom resources as unstructured data. All
keys are treated the same as struct fields, and all lists are considered atomic.

If the CustomResourceDefinition defines a
schema
that contains annotations as defined in the previous Merge Strategy
section, these annotations will be used when merging objects of this
type.

### Compatibility across topology changes

On rare occurrences, the author for a CustomResourceDefinition (CRD) or built-in
may want to change the specific topology of a field in their resource,
without incrementing its API version. Changing the topology of types,
by upgrading the cluster or updating the CRD, has different consequences when
updating existing objects. There are two categories of changes: when a field goes from
`map`/`set`/`granular` to `atomic`, and the other way around.

When the `listType`, `mapType`, or `structType` changes from
`map`/`set`/`granular` to `atomic`, the whole list, map, or struct of
existing objects will end-up being owned by actors who owned an element
of these types. This means that any further change to these objects
would cause a conflict.

When a `listType`, `mapType`, or `structType` changes from `atomic` to
`map`/`set`/`granular`, the API server is unable to infer the new
ownership of these fields. Because of that, no conflict will be produced
when objects have these fields updated. For that reason, it is not
recommended to change a type from `atomic` to `map`/`set`/`granular`.

Take for example, the custom resource:

```yaml
---
apiVersion: example.com/v1
kind: Foo
metadata:
  name: foo-sample
  managedFields:
  - manager: "manager-one"
    operation: Apply
    apiVersion: example.com/v1
    fieldsType: FieldsV1
    fieldsV1:
      f:spec:
        f:data: {}
spec:
  data:
    key1: val1
    key2: val2
```

Before `spec.data` gets changed from `atomic` to `granular`,
`manager-one` owns the field `spec.data`, and all the fields within it
(`key1` and `key2`). When the CRD gets changed to make `spec.data`
`granular`, `manager-one` continues to own the top-level field
`spec.data` (meaning no other managers can delete the map called `data`
without a conflict), but it no longer owns `key1` and `key2`, so another
manager can then modify or delete those fields without conflict.

## Using Server-Side Apply in a controller

As a developer of a controller, you can use Server-Side Apply as a way to
simplify the update logic of your controller. The main differences with a
read-modify-write and/or patch are the following:

* the applied object must contain all the fields that the controller cares about.
* there is no way to remove fields that haven't been applied by the controller
  before (controller can still send a **patch** or **update** for these use-cases).
* the object doesn't have to be read beforehand; `resourceVersion` doesn't have
  to be specified.

It is strongly recommended for controllers to always force conflicts on objects that
they own and manage, since they might not be able to resolve or act on these conflicts.

## Transferring ownership

In addition to the concurrency controls provided by conflict resolution,
Server-Side Apply provides ways to perform coordinated
field ownership transfers from users to controllers.

This is best explained by example. Let's look at how to safely transfer
ownership of the `replicas` field from a user to a controller while enabling
automatic horizontal scaling for a Deployment, using the HorizontalPodAutoscaler
resource and its accompanying controller.

Say a user has defined Deployment with `replicas` set to the desired value:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
  labels:
    app: nginx
spec:
  replicas: 3
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:1.14.2
```

And the user has created the Deployment using Server-Side Apply, like so:

```shell
kubectl apply -f https://k8s.io/examples/application/ssa/nginx-deployment.yaml --server-side
```

Then later, automatic scaling is enabled for the Deployment; for example:

```shell
kubectl autoscale deployment nginx-deployment --cpu=50% --min=1 --max=10
```

Now, the user would like to remove `replicas` from their configuration, so they
don't accidentally fight with the HorizontalPodAutoscaler (HPA) and its controller.
However, there is a race: it might take some time before the HPA feels the need
to adjust `.spec.replicas`; if the user removes `.spec.replicas` before the HPA writes
to the field and becomes its owner, then the API server would set `.spec.replicas` to
1 (the default replica count for Deployment).
This is not what the user wants to happen, even temporarily - it might well degrade
a running workload.

There are two solutions:

- (basic) Leave `replicas` in the configuration; when the HPA eventually writes to that
  field, the system gives the user a conflict over it. At that point, it is safe
  to remove from the configuration.

- (more advanced) If, however, the user doesn't want to wait, for example
  because they want to keep the cluster legible to their colleagues, then they
  can take the following steps to make it safe to remove `replicas` from their
  configuration:

First, the user defines a new manifest containing only the `replicas` field:

```yaml
# Save this file as 'nginx-deployment-replicas-only.yaml'.
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
spec:
  replicas: 3
```

**Note:**
The YAML file for SSA in this case only contains the fields you want to change.
You are not supposed to provide a fully compliant Deployment manifest if you only
want to modify the `spec.replicas` field using SSA.

The user applies that manifest using a private field manager name. In this example,
the user picked `handover-to-hpa`:

```shell
kubectl apply -f nginx-deployment-replicas-only.yaml \
  --server-side --field-manager=handover-to-hpa \
  --validate=false
```

If the apply results in a conflict with the HPA controller, then do nothing. The
conflict indicates the controller has claimed the field earlier in the
process than it sometimes does.

At this point the user may remove the `replicas` field from their manifest:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
  labels:
    app: nginx
spec:
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:1.14.2
```

Note that whenever the HPA controller sets the `replicas` field to a new value,
the temporary field manager will no longer own any fields and will be
automatically deleted. No further clean up is required.

### Transferring ownership between managers

Field managers can transfer ownership of a field between each other by setting the field
to the same value in both of their applied configurations, causing them to share
ownership of the field. Once the managers share ownership of the field, one of them
can remove the field from their applied configuration to give up ownership and
complete the transfer to the other field manager.

## Comparison with Client-Side Apply

Server-Side Apply is meant both as a replacement for the original client-side
implementation of the `kubectl apply` subcommand, and as simple and effective
mechanism for controllers
to enact their changes.

Compared to the `last-applied` annotation managed by `kubectl`, Server-Side
Apply uses a more declarative approach, which tracks an object's field management,
rather than a user's last applied state. This means that as a side effect of
using Server-Side Apply, information about which field manager manages each
field in an object also becomes available.

A consequence of the conflict detection and resolution implemented by Server-Side
Apply is that an applier always has up to date field values in their local
state. If they don't, they get a conflict the next time they apply. Any of the
three options to resolve conflicts results in the applied configuration being an
up to date subset of the object on the server's fields.

This is different from Client-Side Apply, where outdated values which have been
overwritten by other users are left in an applier's local config. These values
only become accurate when the user updates that specific field, if ever, and an
applier has no way of knowing whether their next apply will overwrite other
users' changes.

Another difference is that an applier using Client-Side Apply is unable to
change the API version they are using, but Server-Side Apply supports this use
case.
