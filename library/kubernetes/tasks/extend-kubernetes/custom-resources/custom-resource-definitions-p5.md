---
title: "Extend the Kubernetes API with CustomResourceDefinitions (part 5 of 6)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/tasks/extend-kubernetes/custom-resources/custom-resource-definitions.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Extend the Kubernetes API with CustomResourceDefinitions (part 5 of 6)

```yaml
openAPIV3Schema:
  type: object
  properties:
    foo:
      type: array
      maxItems: 25
      items:
        type: string
        maxLength: 10
      x-kubernetes-validations:
        - rule: "self.all(x, x.contains('a string'))"
```

The cost estimation system takes into account how many times the rule will be executed in addition to the
estimated cost of the rule itself. For instance, the following rule will have the same estimated cost as the
previous example (despite the rule now being defined on the individual array items):

```yaml
openAPIV3Schema:
  type: object
  properties:
    foo:
      type: array
      maxItems: 25
      items:
        type: string
        x-kubernetes-validations:
          - rule: "self.contains('a string'))"
        maxLength: 10
```

If a list inside of a list has a validation rule that uses `self.all`, that is significantly more expensive
than a non-nested list with the same rule. A rule that would have been allowed on a non-nested list might need
lower limits set on both nested lists in order to be allowed. For example, even without having limits set,
the following rule is allowed:

```yaml
openAPIV3Schema:
  type: object
  properties:
    foo:
      type: array
      items:
        type: integer
    x-kubernetes-validations:
      - rule: "self.all(x, x == 5)"
```

But the same rule on the following schema (with a nested array added) produces a validation error:

```yaml
openAPIV3Schema:
  type: object
  properties:
    foo:
      type: array
      items:
        type: array
        items:
          type: integer
        x-kubernetes-validations:
          - rule: "self.all(x, x == 5)"
```

This is because each item of `foo` is itself an array, and each subarray in turn calls `self.all`.
Avoid nested lists and maps if possible where validation rules are used.

### Defaulting

**Note:**
To use defaulting, your CustomResourceDefinition must use API version `apiextensions.k8s.io/v1`.

Defaulting allows you to specify default values in the OpenAPI v3 validation schema:

```yaml
apiVersion: apiextensions.k8s.io/v1
kind: CustomResourceDefinition
metadata:
  name: crontabs.stable.example.com
spec:
  group: stable.example.com
  versions:
    - name: v1
      served: true
      storage: true
      schema:
        # openAPIV3Schema is the schema for validating custom objects.
        openAPIV3Schema:
          type: object
          properties:
            spec:
              type: object
              properties:
                cronSpec:
                  type: string
                  pattern: '^(\d+|\*)(/\d+)?(\s+(\d+|\*)(/\d+)?){4}$'
                  default: "5 0 * * *"
                image:
                  type: string
                replicas:
                  type: integer
                  minimum: 1
                  maximum: 10
                  default: 1
  scope: Namespaced
  names:
    plural: crontabs
    singular: crontab
    kind: CronTab
    shortNames:
    - ct
```

With this both `cronSpec` and `replicas` are defaulted:

```yaml
apiVersion: "stable.example.com/v1"
kind: CronTab
metadata:
  name: my-new-cron-object
spec:
  image: my-awesome-cron-image
```

leads to

```yaml
apiVersion: "stable.example.com/v1"
kind: CronTab
metadata:
  name: my-new-cron-object
spec:
  cronSpec: "5 0 * * *"
  image: my-awesome-cron-image
  replicas: 1
```

Defaulting happens on the object

* in the request to the API server using the request version defaults,
* when reading from etcd using the storage version defaults,
* after mutating admission plugins with non-empty patches using the admission webhook object version defaults.

Defaults applied when reading data from etcd are not automatically written back to etcd.
An update request via the API is required to persist those defaults back into etcd.

Default values for non-leaf fields must be pruned (with the exception of defaults for `metadata` fields) and must
validate against a provided schema. For example in the above example, a default of `{"replicas": "foo", "badger": 1}`
for the `spec` field would be invalid, because `badger` is an unknown field, and `replicas` is not a string.

Default values for `metadata` fields of `x-kubernetes-embedded-resources: true` nodes (or parts of
a default value covering `metadata`) are not pruned during CustomResourceDefinition creation, but
through the pruning step during handling of requests.

#### Defaulting and Nullable

Null values for fields that either don't specify the nullable flag, or give it a
`false` value, will be pruned before defaulting happens. If a default is present, it will be
applied. When nullable is `true`, null values will be conserved and won't be defaulted.

For example, given the OpenAPI schema below:

```yaml
type: object
properties:
  spec:
    type: object
    properties:
      foo:
        type: string
        nullable: false
        default: "default"
      bar:
        type: string
        nullable: true
      baz:
        type: string
```

creating an object with null values for `foo` and `bar` and `baz`

```yaml
spec:
  foo: null
  bar: null
  baz: null
```

leads to

```yaml
spec:
  foo: "default"
  bar: null
```

with `foo` pruned and defaulted because the field is non-nullable, `bar` maintaining the null
value due to `nullable: true`, and `baz` pruned because the field is non-nullable and has no
default.

### Publish Validation Schema in OpenAPI

CustomResourceDefinition OpenAPI v3 validation schemas which are
structural and enable pruning are published
as OpenAPI v3 and
OpenAPI v2 from Kubernetes API server. It is recommended to use the OpenAPI v3 document
as it is a lossless representation of the CustomResourceDefinition OpenAPI v3 validation schema
while OpenAPI v2 represents a lossy conversion.

The kubectl command-line tool consumes the published schema to perform
client-side validation (`kubectl create` and `kubectl apply`), schema explanation (`kubectl explain`)
on custom resources. The published schema can be consumed for other purposes as well, like client generation or documentation.

#### Compatibility with OpenAPI V2

For compatibility with OpenAPI V2, the OpenAPI v3 validation schema performs a lossy conversion
to the OpenAPI v2 schema. The schema show up in `definitions` and `paths` fields in the
OpenAPI v2 spec.

The following modifications are applied during the conversion to keep backwards compatibility with
kubectl in previous 1.13 version. These modifications prevent kubectl from being over-strict and rejecting
valid OpenAPI schemas that it doesn't understand. The conversion won't modify the validation schema defined in CRD,
and therefore won't affect validation in the API server.

1. The following fields are removed as they aren't supported by OpenAPI v2.

   - The fields `allOf`, `anyOf`, `oneOf` and `not` are removed

2. If `nullable: true` is set, we drop `type`, `nullable`, `items` and `properties` because OpenAPI v2 is
   not able to express nullable. To avoid kubectl to reject good objects, this is necessary.

### Additional printer columns

The kubectl tool relies on server-side output formatting. Your cluster's API server decides which
columns are shown by the `kubectl get` command. You can customize these columns for a
CustomResourceDefinition. The following example adds the `Spec`, `Replicas`, and `Age`
columns.

Save the CustomResourceDefinition to `resourcedefinition.yaml`:

```yaml
apiVersion: apiextensions.k8s.io/v1
kind: CustomResourceDefinition
metadata:
  name: crontabs.stable.example.com
spec:
  group: stable.example.com
  scope: Namespaced
  names:
    plural: crontabs
    singular: crontab
    kind: CronTab
    shortNames:
    - ct
  versions:
  - name: v1
    served: true
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
    additionalPrinterColumns:
    - name: Spec
      type: string
      description: The cron spec defining the interval a CronJob is run
      jsonPath: .spec.cronSpec
    - name: Replicas
      type: integer
      description: The number of jobs launched by the CronJob
      jsonPath: .spec.replicas
    - name: Age
      type: date
      jsonPath: .metadata.creationTimestamp
```

Create the CustomResourceDefinition:

```shell
kubectl apply -f resourcedefinition.yaml
```

Create an instance using the `my-crontab.yaml` from the previous section.

Invoke the server-side printing:

```shell
kubectl get crontab my-new-cron-object
```

Notice the `NAME`, `SPEC`, `REPLICAS`, and `AGE` columns in the output:

```
NAME                 SPEC        REPLICAS   AGE
my-new-cron-object   * * * * *   1          7s
```

**Note:**
The `NAME` column is implicit and does not need to be defined in the CustomResourceDefinition.

#### Priority

Each column includes a `priority` field. Currently, the priority
differentiates between columns shown in standard view or wide view (using the `-o wide` flag).

- Columns with priority `0` are shown in standard view.
- Columns with priority greater than `0` are shown only in wide view.

#### Type

A column's `type` field can be any of the following (compare
OpenAPI v3 data types):

- `integer` – non-floating-point numbers
- `number` – floating point numbers
- `string` – strings
- `boolean` – `true` or `false`
- `date` – rendered differentially as time since this timestamp.

If the value inside a CustomResource does not match the type specified for the column,
the value is omitted. Use CustomResource validation to ensure that the value
types are correct.

#### Format

A column's `format` field can be any of the following:

- `int32`
- `int64`
- `float`
- `double`
- `byte`
- `date`
- `date-time`
- `password`

The column's `format` controls the style used when `kubectl` prints the value.

### Field selectors

Field Selectors
let clients select custom resources based on the value of one or more resource
fields.

All custom resources support the `metadata.name` and `metadata.namespace` field
selectors.

Fields declared in a CustomResourceDefinition
may also be used with field selectors when included in the `spec.versions[*].selectableFields` field of the
CustomResourceDefinition.

#### Selectable fields for custom resources {#crd-selectable-fields}

**Feature state:**

The `spec.versions[*].selectableFields` field of a CustomResourceDefinition may be used to
declare which other fields in a custom resource may be used in field selectors
with the feature of `CustomResourceFieldSelectors`
feature gate (This feature gate is enabled by default since Kubernetes v1.31).
The following example adds the `.spec.color` and `.spec.size` fields as
selectable fields.

Save the CustomResourceDefinition to `shirt-resource-definition.yaml`:

```yaml
apiVersion: apiextensions.k8s.io/v1
kind: CustomResourceDefinition
metadata:
  name: shirts.stable.example.com
spec:
  group: stable.example.com
  scope: Namespaced
  names:
    plural: shirts
    singular: shirt
    kind: Shirt
  versions:
  - name: v1
    served: true
    storage: true
    schema:
      openAPIV3Schema:
        type: object
        properties:
          spec:
            type: object
            properties:
              color:
                type: string
              size:
                type: string
    selectableFields:
    - jsonPath: .spec.color
    - jsonPath: .spec.size
    additionalPrinterColumns:
    - jsonPath: .spec.color
      name: Color
      type: string
    - jsonPath: .spec.size
      name: Size
      type: string
```

Create the CustomResourceDefinition:

```shell
kubectl apply -f https://k8s.io/examples/customresourcedefinition/shirt-resource-definition.yaml
```

Define some Shirts by editing `shirt-resources.yaml`; for example:

```yaml
---
apiVersion: stable.example.com/v1
kind: Shirt
metadata:
  name: example1
spec:
  color: blue
  size: S
---
apiVersion: stable.example.com/v1
kind: Shirt
metadata:
  name: example2
spec:
  color: blue
  size: M
---
apiVersion: stable.example.com/v1
kind: Shirt
metadata:
  name: example3
spec:
  color: green
  size: M
```

Create the custom resources:

```shell
kubectl apply -f https://k8s.io/examples/customresourcedefinition/shirt-resources.yaml
```

Get all the resources:

```shell
kubectl get shirts.stable.example.com
```

The output is:

```
NAME       COLOR  SIZE
example1   blue   S
example2   blue   M
example3   green  M
```

Fetch blue shirts (retrieve Shirts with a `color` of `blue`):

```shell
kubectl get shirts.stable.example.com --field-selector spec.color=blue
```

Should output:

```
NAME       COLOR  SIZE
example1   blue   S
example2   blue   M
```

Get only resources with a `color` of `green` and a `size` of `M`:

```shell
kubectl get shirts.stable.example.com --field-selector spec.color=green,spec.size=M
```

Should output:

```
NAME       COLOR   SIZE
example3   green   M
```
