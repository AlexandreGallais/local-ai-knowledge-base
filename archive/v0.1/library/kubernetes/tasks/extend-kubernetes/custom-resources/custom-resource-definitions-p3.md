---
title: "Extend the Kubernetes API with CustomResourceDefinitions (part 3 of 6)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/tasks/extend-kubernetes/custom-resources/custom-resource-definitions.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Extend the Kubernetes API with CustomResourceDefinitions (part 3 of 6)

### Validation rules

**Feature state:** v1.29 [stable]

Validation rules use the Common Expression Language (CEL)
to validate custom resource values. Validation rules are included in
CustomResourceDefinition schemas using the `x-kubernetes-validations` extension.

The Rule is scoped to the location of the `x-kubernetes-validations` extension in the schema.
And `self` variable in the CEL expression is bound to the scoped value.

All validation rules are scoped to the current object: no cross-object or stateful validation
rules are supported.

For example:

```yaml
  # ...
  openAPIV3Schema:
    type: object
    properties:
      spec:
        type: object
        x-kubernetes-validations:
          - rule: "self.minReplicas <= self.replicas"
            message: "replicas should be greater than or equal to minReplicas."
          - rule: "self.replicas <= self.maxReplicas"
            message: "replicas should be smaller than or equal to maxReplicas."
        properties:
          # ...
          minReplicas:
            type: integer
          replicas:
            type: integer
          maxReplicas:
            type: integer
        required:
          - minReplicas
          - replicas
          - maxReplicas
```

will reject a request to create this custom resource:

```yaml
apiVersion: "stable.example.com/v1"
kind: CronTab
metadata:
  name: my-new-cron-object
spec:
  minReplicas: 0
  replicas: 20
  maxReplicas: 10
```

with the response:

```
The CronTab "my-new-cron-object" is invalid:
* spec: Invalid value: map[string]interface {}{"maxReplicas":10, "minReplicas":0, "replicas":20}: replicas should be smaller than or equal to maxReplicas.
```

`x-kubernetes-validations` could have multiple rules.
The `rule` under `x-kubernetes-validations` represents the expression which will be evaluated by CEL.
The `message` represents the message displayed when validation fails. If message is unset, the
above response would be:

```
The CronTab "my-new-cron-object" is invalid:
* spec: Invalid value: map[string]interface {}{"maxReplicas":10, "minReplicas":0, "replicas":20}: failed rule: self.replicas <= self.maxReplicas
```

**Note:**
You can quickly test CEL expressions in CEL Playground.

Validation rules are compiled when CRDs are created/updated.
The request of CRDs create/update will fail if compilation of validation rules fail.
Compilation process includes type checking as well.

The compilation failure:

- `no_matching_overload`: this function has no overload for the types of the arguments.

  For example, a rule like `self == true` against a field of integer type will get error:

  ```none
  Invalid value: apiextensions.ValidationRule{Rule:"self == true", Message:""}: compilation failed: ERROR: \<input>:1:6: found no matching overload for '_==_' applied to '(int, bool)'
  ```

- `no_such_field`: does not contain the desired field.

  For example, a rule like `self.nonExistingField > 0` against a non-existing field will return
  the following error:

  ```none
  Invalid value: apiextensions.ValidationRule{Rule:"self.nonExistingField > 0", Message:""}: compilation failed: ERROR: \<input>:1:5: undefined field 'nonExistingField'
  ```

- `invalid argument`: invalid argument to macros.

  For example, a rule like `has(self)` will return error:

  ```none
  Invalid value: apiextensions.ValidationRule{Rule:"has(self)", Message:""}: compilation failed: ERROR: <input>:1:4: invalid argument to has() macro
  ```

Validation Rules Examples:

| Rule                                                                             | Purpose                                                                           |
| ----------------                                                                 | ------------                                                                      |
| `self.minReplicas <= self.replicas && self.replicas <= self.maxReplicas`         | Validate that the three fields defining replicas are ordered appropriately        |
| `'Available' in self.stateCounts`                                                | Validate that an entry with the 'Available' key <example-value> in a map                   |
| `(size(self.list1) == 0) != (size(self.list2) == 0)`                             | Validate that one of two lists is non-empty, but not both                         |
| `!('MY_KEY' in self.map1) &#124;&#124; self['MY_KEY'].matches('^[a-zA-Z]*$')`               | Validate the value of a map for a specific key, if it is in the map               |
| `self.envars.filter(e, e.name == 'MY_ENV').all(e, e.value.matches('^[a-zA-Z]*$')` | Validate the 'value' field of a listMap entry where key field 'name' is 'MY_ENV'  |
| `has(self.expired) && self.created + self.ttl < self.expired`                    | Validate that 'expired' date is after a 'create' date plus a 'ttl' duration       |
| `self.health.startsWith('ok')`                                                   | Validate a 'health' string field has the prefix 'ok'                              |
| `self.widgets.exists(w, w.key == 'x' && w.foo < 10)`                             | Validate that the 'foo' property of a listMap item with a key 'x' is less than 10 |
| `type(self) == string ? self == '100%' : self == 1000`                           | Validate an int-or-string field for both the int and string cases             |
| `self.metadata.name.startsWith(self.prefix)`                                     | Validate that an object's name has the prefix of another field value              |
| `self.set1.all(e, !(e in self.set2))`                                            | Validate that two listSets are disjoint                                           |
| `size(self.names) == size(self.details) && self.names.all(n, n in self.details)` | Validate the 'details' map is keyed by the items in the 'names' listSet           |
| `size(self.clusters.filter(c, c.name == self.primary)) == 1`                     | Validate that the 'primary' property has one and only one occurrence in the 'clusters' listMap           |

Xref: Supported evaluation on CEL

- If the Rule is scoped to the root of a resource, it may make field selection into any fields
  declared in the OpenAPIv3 schema of the CRD as well as `apiVersion`, `kind`, `metadata.name` and
  `metadata.generateName`. This includes selection of fields in both the `spec` and `status` in the
  same expression:

  ```yaml
    # ...
    openAPIV3Schema:
      type: object
      x-kubernetes-validations:
        - rule: "self.status.availableReplicas >= self.spec.minReplicas"
      properties:
          spec:
            type: object
            properties:
              minReplicas:
                type: integer
              # ...
          status:
            type: object
            properties:
              availableReplicas:
                type: integer
  ```

- If the Rule is scoped to an object with properties, the accessible properties of the object are field selectable
  via `self.field` and field presence can be checked via `has(self.field)`. Null valued fields are treated as
  absent fields in CEL expressions.

  ```yaml
    # ...
    openAPIV3Schema:
      type: object
      properties:
        spec:
          type: object
          x-kubernetes-validations:
            - rule: "has(self.foo)"
          properties:
            # ...
            foo:
              type: integer
  ```

- If the Rule is scoped to an object with additionalProperties (i.e. a map) the value of the map
  are accessible via `self[mapKey]`, map containment can be checked via `mapKey in self` and all
  entries of the map are accessible via CEL macros and functions such as `self.all(...)`.

  ```yaml
    # ...
    openAPIV3Schema:
      type: object
      properties:
        spec:
          type: object
          x-kubernetes-validations:
            - rule: "self['xyz'].foo > 0"
          additionalProperties:
            # ...
            type: object
            properties:
              foo:
                type: integer
  ```

- If the Rule is scoped to an array, the elements of the array are accessible via `self[i]` and
  also by macros and functions.

  ```yaml
    # ...
    openAPIV3Schema:
      type: object
      properties:
        # ...
        foo:
          type: array
          x-kubernetes-validations:
            - rule: "size(self) == 1"
          items:
            type: string
  ```

- If the Rule is scoped to a scalar, `self` is bound to the scalar value.

  ```yaml
    # ...
    openAPIV3Schema:
      type: object
      properties:
        spec:
          type: object
          properties:
            # ...
            foo:
              type: integer
              x-kubernetes-validations:
              - rule: "self > 0"
  ```

Examples:

|type of the field rule scoped to    | Rule example             |
| -----------------------| -----------------------|
| root object            | `self.status.actual <= self.spec.maxDesired` |
| map of objects         | `self.components['Widget'].priority < 10` |
| list of integers       | `self.values.all(value, value >= 0 && value < 100)` |
| string                 | `self.startsWith('kube')` |

The `apiVersion`, `kind`, `metadata.name` and `metadata.generateName` are always accessible from
the root of the object and from any `x-kubernetes-embedded-resource` annotated objects. No other
metadata properties are accessible.

Unknown data preserved in custom resources via `x-kubernetes-preserve-unknown-fields` is not
accessible in CEL expressions. This includes:

- Unknown field values that are preserved by object schemas with `x-kubernetes-preserve-unknown-fields`.
- Object properties where the property schema is of an "unknown type". An "unknown type" is
  recursively defined as:

  - A schema with no type and x-kubernetes-preserve-unknown-fields set to true
  - An array where the items schema is of an "unknown type"
  - An object where the additionalProperties schema is of an "unknown type"

Only property names of the form `a-zA-Z_.-/*` are accessible.
Accessible property names are escaped according to the following rules when accessed in the expression:

| escape sequence         | property name equivalent  |
| ----------------------- | -----------------------|
| `__underscores__`       | `__`                  |
| `__dot__`               | `.`                   |
|`__dash__`               | `-`                   |
| `__slash__`             | `/`                   |
| `__{keyword}__`         | CEL RESERVED keyword       |

Note: CEL RESERVED keyword needs to match the exact property name to be escaped (e.g. int in the word sprint would not be escaped).

Examples on escaping:

|property name    | rule with escaped property name     |
| ----------------| -----------------------             |
| namespace       | `self.__namespace__ > 0`            |
| x-prop          | `self.x__dash__prop > 0`            |
| redact__d       | `self.redact__underscores__d > 0`   |
| string          | `self.startsWith('kube')`           |

Equality on arrays with `x-kubernetes-list-type` of `set` or `map` ignores element order,
i.e., `[1, 2] == [2, 1]`. Concatenation on arrays with x-kubernetes-list-type use the semantics of
the list type:

- `set`: `X + Y` performs a union where the array positions of all elements in `X` are preserved
  and non-intersecting elements in `Y` are appended, retaining their partial order.

- `map`: `X + Y` performs a merge where the array positions of all keys in `X` are preserved but
  the values are overwritten by values in `Y` when the key sets of `X` and `Y` intersect. Elements
  in `Y` with non-intersecting keys are appended, retaining their partial order.

Here is the declarations type mapping between OpenAPIv3 and CEL type:
