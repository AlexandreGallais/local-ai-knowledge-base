---
title: "Extend the Kubernetes API with CustomResourceDefinitions (part 1 of 6)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/tasks/extend-kubernetes/custom-resources/custom-resource-definitions.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Extend the Kubernetes API with CustomResourceDefinitions

This page shows how to install a
custom resource
into the Kubernetes API by creating a
CustomResourceDefinition.

## Before you begin

If you are using an older version of Kubernetes that is still supported, switch to
the documentation for that version to see advice that is relevant for your cluster.

## Create a CustomResourceDefinition

When you create a new CustomResourceDefinition (CRD), the Kubernetes API Server
creates a new RESTful resource path for each version you specify. The custom
resource created from a CRD object can be either namespaced or cluster-scoped,
as specified in the CRD's `spec.scope` field. As with existing built-in
objects, deleting a namespace deletes all custom objects in that namespace.
CustomResourceDefinitions themselves are non-namespaced and are available to
all namespaces.

For example, if you save the following CustomResourceDefinition to `resourcedefinition.yaml`:

```yaml
apiVersion: apiextensions.k8s.io/v1
kind: CustomResourceDefinition
metadata:
  # name must match the spec fields below, and be in the form: <plural>.<group>
  name: crontabs.stable.example.com
spec:
  # group name to use for REST API: /apis/<group>/<version>
  group: stable.example.com
  # list of versions supported by this CustomResourceDefinition
  versions:
    - name: v1
      # Each version can be enabled/disabled by Served flag.
      served: true
      # One and only one version must be marked as the storage version.
      storage: true
      schema:
        openAPIV3Schema:
          type: object
          properties:
            spec:
              type: object
              properties:
                cronSpec:
                  type: string
                image:
                  type: string
                replicas:
                  type: integer
  # either Namespaced or Cluster
  scope: Namespaced
  names:
    # plural name to be used in the URL: /apis/<group>/<version>/<plural>
    plural: crontabs
    # singular name to be used as an alias on the CLI and for display
    singular: crontab
    # kind is normally the CamelCased singular type. Your resource manifests use this.
    kind: CronTab
    # shortNames allow shorter string to match your resource on the CLI
    shortNames:
    - ct
```

and create it:

```shell
kubectl apply -f resourcedefinition.yaml
```

Then a new namespaced RESTful API endpoint is created at:

```
/apis/stable.example.com/v1/namespaces/*/crontabs/...
```

This endpoint URL can then be used to create and manage custom objects.
The `kind` of these objects will be `CronTab` from the spec of the
CustomResourceDefinition object you created above.

It might take a few seconds for the endpoint to be created.
Once the `Established` condition of your CustomResourceDefinition
becomes true and this is observed by the handling code, the endpoint serving starts.
Watching the discovery information of the API server for your
resource to show up is the reliable way to determine if it is ready for use.

## Create custom objects

After the CustomResourceDefinition object has been created, you can create
custom objects. Custom objects can contain custom fields. These fields can
contain arbitrary JSON.
In the following example, the `cronSpec` and `image` custom fields are set in a
custom object of kind `CronTab`.  The kind `CronTab` comes from the spec of the
CustomResourceDefinition object you created above.

If you save the following YAML to `my-crontab.yaml`:

```yaml
apiVersion: "stable.example.com/v1"
kind: CronTab
metadata:
  name: my-new-cron-object
spec:
  cronSpec: "* * * * */5"
  image: my-awesome-cron-image
```

and create it:

```shell
kubectl apply -f my-crontab.yaml
```

You can then manage your CronTab objects using kubectl. For example:

```shell
kubectl get crontab
```

Should print a list like this:

```none
NAME                 AGE
my-new-cron-object   6s
```

Resource names are not case-sensitive when using kubectl, and you can use either
the singular or plural forms defined in the CRD, as well as any short names.

You can also view the raw YAML data:

```shell
kubectl get ct -o yaml
```

You should see that it contains the custom `cronSpec` and `image` fields
from the YAML you used to create it:

```yaml
apiVersion: v1
items:
- apiVersion: stable.example.com/v1
  kind: CronTab
  metadata:
    annotations:
      kubectl.kubernetes.io/last-applied-configuration: |
        {"apiVersion":"stable.example.com/v1","kind":"CronTab","metadata":{"annotations":{},"name":"my-new-cron-object","namespace":"default"},"spec":{"cronSpec":"* * * * */5","image":"my-awesome-cron-image"}}
    creationTimestamp: "2021-06-20T07:35:27Z"
    generation: 1
    name: my-new-cron-object
    namespace: default
    resourceVersion: "1326"
    uid: 9aab1d66-628e-41bb-a422-57b8b3b1f5a9
  spec:
    cronSpec: '* * * * */5'
    image: my-awesome-cron-image
kind: List
metadata:
  resourceVersion: ""
  selfLink: ""
```

## Delete a CustomResourceDefinition

When you delete a CustomResourceDefinition, the server will uninstall the RESTful API endpoint
and delete all custom objects stored in it.

```shell
kubectl delete -f resourcedefinition.yaml
kubectl get crontabs
```

```none
Error from server (NotFound): Unable to list {"stable.example.com" "v1" "crontabs"}: the server could not
find the requested resource (get crontabs.stable.example.com)
```

If you later recreate the same CustomResourceDefinition, it will start out empty.

## Specifying a structural schema

CustomResources store structured data in custom fields (alongside the built-in
fields `apiVersion`, `kind` and `metadata`, which the API server validates
implicitly). With OpenAPI v3.0 validation a schema can be
specified, which is validated during creation and updates, compare below for
details and limits of such a schema.

With `apiextensions.k8s.io/v1` the definition of a structural schema is
mandatory for CustomResourceDefinitions. In the beta version of
CustomResourceDefinition, the structural schema was optional.

A structural schema is an OpenAPI v3.0 validation schema which:

1. specifies a non-empty type (via `type` in OpenAPI) for the root, for each specified field of an object node
   (via `properties` or `additionalProperties` in OpenAPI) and for each item in an array node
   (via `items` in OpenAPI), with the exception of:
   * a node with `x-kubernetes-int-or-string: true`
   * a node with `x-kubernetes-preserve-unknown-fields: true`
2. for each field in an object and each item in an array which is specified within any of `allOf`, `anyOf`,
   `oneOf` or `not`, the schema also specifies the field/item outside of those logical junctors (compare example 1 and 2).
3. does not set `description`, `type`, `default`, `additionalProperties`, `nullable` within an `allOf`, `anyOf`,
   `oneOf` or `not`, with the exception of the two pattern for `x-kubernetes-int-or-string: true` (see below).
4. if `metadata` is specified, then only restrictions on `metadata.name` and `metadata.generateName` are allowed.

Non-structural example 1:

```yaml
allOf:
- properties:
    foo:
      # ...
```

conflicts with rule 2. The following would be correct:

```yaml
properties:
  foo:
    # ...
allOf:
- properties:
    foo:
      # ...
```

Non-structural example 2:

```yaml
allOf:
- items:
    properties:
      foo:
        # ...
```
conflicts with rule 2. The following would be correct:

```yaml
items:
  properties:
    foo:
      # ...
allOf:
- items:
    properties:
      foo:
        # ...
```

Non-structural example 3:

```yaml
properties:
  foo:
    pattern: "abc"
  metadata:
    type: object
    properties:
      name:
        type: string
        pattern: "^a"
      finalizers:
        type: array
        items:
          type: string
          pattern: "my-finalizer"
anyOf:
- properties:
    bar:
      type: integer
      minimum: 42
  required: ["bar"]
  description: "foo bar object"
```

is not a structural schema because of the following violations:

* the type at the root is missing (rule 1).
* the type of `foo` is missing (rule 1).
* `bar` inside of `anyOf` is not specified outside (rule 2).
* `bar`'s `type` is within `anyOf` (rule 3).
* the description is set within `anyOf` (rule 3).
* `metadata.finalizers` might not be restricted (rule 4).

In contrast, the following, corresponding schema is structural:

```yaml
type: object
description: "foo bar object"
properties:
  foo:
    type: string
    pattern: "abc"
  bar:
    type: integer
  metadata:
    type: object
    properties:
      name:
        type: string
        pattern: "^a"
anyOf:
- properties:
    bar:
      minimum: 42
  required: ["bar"]
```

Violations of the structural schema rules are reported in the `NonStructural` condition in the
CustomResourceDefinition.

### Field pruning

CustomResourceDefinitions store validated resource data in the cluster's persistence store, etcd.
As with native Kubernetes resources such as ConfigMap,
if you specify a field that the API server does not recognize, the unknown field  is _pruned_ (removed) before being persisted.

CRDs converted from `apiextensions.k8s.io/v1beta1` to `apiextensions.k8s.io/v1` might lack
structural schemas, and `spec.preserveUnknownFields` might be `true`.

For legacy CustomResourceDefinition objects created as
`apiextensions.k8s.io/v1beta1` with `spec.preserveUnknownFields` set to
`true`, the following is also true:

* Pruning is not enabled.
* You can store arbitrary data.

For compatibility with `apiextensions.k8s.io/v1`, update your custom
resource definitions to:

1. Use a structural OpenAPI schema.
2. Set `spec.preserveUnknownFields` to `false`.

If you save the following YAML to `my-crontab.yaml`:

```yaml
apiVersion: "stable.example.com/v1"
kind: CronTab
metadata:
  name: my-new-cron-object
spec:
  cronSpec: "* * * * */5"
  image: my-awesome-cron-image
  someRandomField: 42
```

and create it:

```shell
kubectl create --validate=false -f my-crontab.yaml -o yaml
```

Your output is similar to:

```yaml
apiVersion: stable.example.com/v1
kind: CronTab
metadata:
  creationTimestamp: 2017-05-31T12:56:35Z
  generation: 1
  name: my-new-cron-object
  namespace: default
  resourceVersion: "285"
  uid: 9423255b-4600-11e7-af6a-28d2447dc82b
spec:
  cronSpec: '* * * * */5'
  image: my-awesome-cron-image
```

Notice that the field `someRandomField` was pruned.

This example turned off client-side validation to demonstrate the API server's behavior, by adding
the `--validate=false` command line option.
Because the OpenAPI validation schemas are also published
to clients, `kubectl` also checks for unknown fields and rejects those objects well before they
would be sent to the API server.

#### Controlling pruning

By default, all unspecified fields for a custom resource, across all versions, are pruned. It is possible though to
opt-out of that for specific sub-trees of fields by adding `x-kubernetes-preserve-unknown-fields: true` in the
structural OpenAPI v3 validation schema.

For example:

```yaml
type: object
properties:
  json:
    x-kubernetes-preserve-unknown-fields: true
```

The field `json` can store any JSON value, without anything being pruned.

You can also partially specify the permitted JSON; for example:

```yaml
type: object
properties:
  json:
    x-kubernetes-preserve-unknown-fields: true
    type: object
    description: this is arbitrary JSON
```

With this, only `object` type values are allowed.

Pruning is enabled again for each specified property (or `additionalProperties`):

```yaml
type: object
properties:
  json:
    x-kubernetes-preserve-unknown-fields: true
    type: object
    properties:
      spec:
        type: object
        properties:
          foo:
            type: string
          bar:
            type: string
```

With this, the value:

```yaml
json:
  spec:
    foo: abc
    bar: def
    something: x
  status:
    something: x
```

is pruned to:

```yaml
json:
  spec:
    foo: abc
    bar: def
  status:
    something: x
```

This means that the `something` field in the specified `spec` object is pruned, but everything outside is not.

### IntOrString

Nodes in a schema with `x-kubernetes-int-or-string: true` are excluded from rule 1, such that the
following is structural:

```yaml
type: object
properties:
  foo:
    x-kubernetes-int-or-string: true
```

Also those nodes are partially excluded from rule 3 in the sense that the following two patterns are allowed
(exactly those, without variations in order to additional fields):

```yaml
x-kubernetes-int-or-string: true
anyOf:
  - type: integer
  - type: string
...
```

and

```yaml
x-kubernetes-int-or-string: true
allOf:
  - anyOf:
      - type: integer
      - type: string
  - # ... zero or more
...
```

With one of those specification, both an integer and a string validate.

In Validation Schema Publishing,
`x-kubernetes-int-or-string: true` is unfolded to one of the two patterns shown above.

### RawExtension

RawExtensions (as in `runtime.RawExtension`)
holds complete Kubernetes objects, i.e. with `apiVersion` and `kind` fields.

It is possible to specify those embedded objects (both completely without constraints or partially specified)
by setting `x-kubernetes-embedded-resource: true`. For example:

```yaml
type: object
properties:
  foo:
    x-kubernetes-embedded-resource: true
    x-kubernetes-preserve-unknown-fields: true
```

Here, the field `foo` holds a complete object, e.g.:

```yaml
foo:
  apiVersion: v1
  kind: Pod
  spec:
    # ...
```

Because `x-kubernetes-preserve-unknown-fields: true` is specified alongside, nothing is pruned.
The use of `x-kubernetes-preserve-unknown-fields: true` is optional though.

With `x-kubernetes-embedded-resource: true`, the `apiVersion`, `kind` and `metadata` are implicitly specified and validated.

## Serving multiple versions of a CRD

See Custom resource definition versioning
for more information about serving multiple versions of your
CustomResourceDefinition and migrating your objects from one version to another.
