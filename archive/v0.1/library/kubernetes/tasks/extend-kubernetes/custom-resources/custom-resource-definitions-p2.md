---
title: "Extend the Kubernetes API with CustomResourceDefinitions (part 2 of 6)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/tasks/extend-kubernetes/custom-resources/custom-resource-definitions.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Extend the Kubernetes API with CustomResourceDefinitions (part 2 of 6)

## Advanced topics

### Finalizers

*Finalizers* allow controllers to implement asynchronous pre-delete hooks.
Custom objects support finalizers similar to built-in objects.

You can add a finalizer to a custom object like this:

```yaml
apiVersion: "stable.example.com/v1"
kind: CronTab
metadata:
  finalizers:
  - stable.example.com/finalizer
```

Identifiers of custom finalizers consist of a domain name, a forward slash and the name of
the finalizer. Any controller can add a finalizer to any object's list of finalizers.

The first delete request on an object with finalizers sets a value for the
`metadata.deletionTimestamp` field but does not delete it. Once this value is set,
entries in the `finalizers` list can only be removed. While any finalizers remain it is also
impossible to force the deletion of an object.

When the `metadata.deletionTimestamp` field is set, controllers watching the object execute any
finalizers they handle and remove the finalizer from the list after they are done. It is the
responsibility of each controller to remove its finalizer from the list.

The value of `metadata.deletionGracePeriodSeconds` controls the interval between polling updates.

Once the list of finalizers is empty, meaning all finalizers have been executed, the resource is
deleted by Kubernetes.

### Validation

Custom resources are validated via
OpenAPI v3.0 schemas,
by x-kubernetes-validations when the Validation Rules feature is enabled, and you
can add additional validation using
admission webhooks.

Additionally, the following restrictions are applied to the schema:

- These fields cannot be set:

  - `definitions`,
  - `dependencies`,
  - `deprecated`,
  - `discriminator`,
  - `id`,
  - `patternProperties`,
  - `readOnly`,
  - `writeOnly`,
  - `xml`,
  - `$ref`.

- The field `uniqueItems` cannot be set to `true`.
- The field `additionalProperties` cannot be set to `false`.
- The field `additionalProperties` is mutually exclusive with `properties`.

The `x-kubernetes-validations` extension can be used to validate custom resources using
Common Expression Language (CEL) expressions when the
Validation rules feature is enabled and the CustomResourceDefinition schema is a
structural schema.

Refer to the structural schemas section for other
restrictions and CustomResourceDefinition features.

The schema is defined in the CustomResourceDefinition. In the following example, the
CustomResourceDefinition applies the following validations on the custom object:

- `spec.cronSpec` must be a string and must be of the form described by the regular expression.
- `spec.replicas` must be an integer and must have a minimum value of 1 and a maximum value of 10.

Save the CustomResourceDefinition to `resourcedefinition.yaml`:

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
                image:
                  type: string
                replicas:
                  type: integer
                  minimum: 1
                  maximum: 10
  scope: Namespaced
  names:
    plural: crontabs
    singular: crontab
    kind: CronTab
    shortNames:
    - ct
```

and create it:

```shell
kubectl apply -f resourcedefinition.yaml
```

A request to create a custom object of kind CronTab is rejected if there are invalid values in its fields.
In the following example, the custom object contains fields with invalid values:

- `spec.cronSpec` does not match the regular expression.
- `spec.replicas` is greater than 10.

If you save the following YAML to `my-crontab.yaml`:

```yaml
apiVersion: "stable.example.com/v1"
kind: CronTab
metadata:
  name: my-new-cron-object
spec:
  cronSpec: "* * * *"
  image: my-awesome-cron-image
  replicas: 15
```

and attempt to create it:

```shell
kubectl apply -f my-crontab.yaml
```

then you get an error:

```console
The CronTab "my-new-cron-object" is invalid: []: Invalid value: map[string]interface {}{"apiVersion":"stable.example.com/v1", "kind":"CronTab", "metadata":map[string]interface {}{"name":"my-new-cron-object", "namespace":"default", "deletionTimestamp":interface {}(nil), "deletionGracePeriodSeconds":(*int64)(nil), "creationTimestamp":"2017-09-05T05:20:07Z", "uid":"e14d79e7-91f9-11e7-a598-f0761cb232d1", "clusterName":""}, "spec":map[string]interface {}{"cronSpec":"* * * *", "image":"my-awesome-cron-image", "replicas":15}}:
validation failure list:
spec.cronSpec in body should match '^(\d+|\*)(/\d+)?(\s+(\d+|\*)(/\d+)?){4}$'
spec.replicas in body should be less than or equal to 10
```

If the fields contain valid values, the object creation request is accepted.

Save the following YAML to `my-crontab.yaml`:

```yaml
apiVersion: "stable.example.com/v1"
kind: CronTab
metadata:
  name: my-new-cron-object
spec:
  cronSpec: "* * * * */5"
  image: my-awesome-cron-image
  replicas: 5
```

And create it:

```shell
kubectl apply -f my-crontab.yaml
crontab "my-new-cron-object" created
```
### Validation ratcheting

**Feature state:**

If you are using a version of Kubernetes older than v1.30, you need to explicitly
enable the `CRDValidationRatcheting`
feature gate to
use this behavior, which then applies to all CustomResourceDefinitions in your
cluster.

Provided you enabled the feature gate, Kubernetes implements _validation ratcheting_
for CustomResourceDefinitions. The API server is willing to accept updates to resources that
are not valid after the update, provided that each part of the resource that failed to validate
was not changed by the update operation. In other words, any invalid part of the resource
that remains invalid must have already been wrong.
You cannot use this mechanism to update a valid resource so that it becomes invalid.

This feature allows authors of CRDs to confidently add new validations to the
OpenAPIV3 schema under certain conditions. Users can update to the new schema
safely without bumping the version of the object or breaking workflows.

While most validations placed in the OpenAPIV3 schema of a CRD support
ratcheting, there are a few exceptions. The following OpenAPIV3 schema
validations are not supported by ratcheting under the implementation in Kubernetes
 and if violated will continue to throw an error as normally:

- Quantors
  - `allOf`
  - `oneOf`
  - `anyOf`
  - `not`
  -  any validations in a descendent of one of these fields
- `x-kubernetes-validations`
  For Kubernetes 1.28, CRD validation rules are ignored by
  ratcheting. Starting with Alpha 2 in Kubernetes 1.29, `x-kubernetes-validations`
  are ratcheted only if they do not refer to `oldSelf`.

  Transition Rules are never ratcheted: only errors raised by rules that do not
  use `oldSelf` will be automatically ratcheted if their values are unchanged.

  To write custom ratcheting logic for CEL expressions, check out optionalOldSelf.
- `x-kubernetes-list-type`
  Errors arising from changing the list type of a subschema will not be
  ratcheted. For example adding `set` onto a list with duplicates will always
  result in an error.
- `x-kubernetes-list-map-keys`
  Errors arising from changing the map keys of a list schema will not be
  ratcheted.
- `required`
  Errors arising from changing the list of required fields will not be ratcheted.
- `properties`
  Adding/removing/modifying the names of properties is not ratcheted, but
  changes to validations in each properties' schemas and subschemas may be ratcheted
  if the name of the property stays the same.
- `additionalProperties`
  To remove a previously specified `additionalProperties` validation will not be
  ratcheted.
- `metadata`
  Errors that come from Kubernetes' built-in validation of an object's `metadata`
  are not ratcheted (such as object name, or characters in a label value).
  If you specify your own additional rules for the metadata of a custom resource,
  that additional validation will be ratcheted.
