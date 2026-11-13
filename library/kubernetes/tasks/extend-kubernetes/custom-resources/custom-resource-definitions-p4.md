---
title: "Extend the Kubernetes API with CustomResourceDefinitions (part 4 of 6)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/tasks/extend-kubernetes/custom-resources/custom-resource-definitions.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Extend the Kubernetes API with CustomResourceDefinitions (part 4 of 6)

| OpenAPIv3 type                                     | CEL type                                                                                                                     |
| -------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| 'object' with Properties                           | object / "message type"                                                                                                      |
| 'object' with AdditionalProperties                 | map                                                                                                                          |
| 'object' with x-kubernetes-embedded-type           | object / "message type", 'apiVersion', 'kind', 'metadata.name' and 'metadata.generateName' are implicitly included in schema |
| 'object' with x-kubernetes-preserve-unknown-fields | object / "message type", unknown fields are NOT accessible in CEL expression                                                 |
| x-kubernetes-int-or-string                         | dynamic object that is either an int or a string, `type(value)` can be used to check the type                                |
| 'array                                             | list                                                                                                                         |
| 'array' with x-kubernetes-list-type=map            | list with map based Equality & unique key guarantees                                                                         |
| 'array' with x-kubernetes-list-type=set            | list with set based Equality & unique entry guarantees                                                                       |
| 'boolean'                                          | boolean                                                                                                                      |
| 'number' (all formats)                             | double                                                                                                                       |
| 'integer' (all formats)                            | int (64)                                                                                                                     |
| 'null'                                             | null_type                                                                                                                    |
| 'string'                                           | string                                                                                                                       |
| 'string' with format=byte (base64 encoded)         | bytes                                                                                                                        |
| 'string' with format=date                          | timestamp (google.protobuf.Timestamp)                                                                                        |
| 'string' with format=datetime                      | timestamp (google.protobuf.Timestamp)                                                                                        |
| 'string' with format=duration                      | duration (google.protobuf.Duration)                                                                                          |

xref: CEL types,
OpenAPI types,
Kubernetes Structural Schemas.

#### The messageExpression field

Similar to the `message` field, which defines the string reported for a validation rule failure,
`messageExpression` allows you to use a CEL expression to construct the message string.
This allows you to insert more descriptive information into the validation failure message.
`messageExpression` must evaluate a string and may use the same variables that are available to the `rule`
field. For example:

```yaml
x-kubernetes-validations:
- rule: "self.x <= self.maxLimit"
  messageExpression: '"x exceeded max limit of " + string(self.maxLimit)'
```

Keep in mind that CEL string concatenation (`+` operator) does not auto-cast to string. If
you have a non-string scalar, use the `string(<value>)` function to cast the scalar to a string
like shown in the above example.

`messageExpression` must evaluate to a string, and this is checked while the CRD is being written. Note that it is possible
to set `message` and `messageExpression` on the same rule, and if both are present, `messageExpression`
will be used. However, if `messageExpression` evaluates to an error, the string defined in `message`
will be used instead, and the `messageExpression` error will be logged. This fallback will also occur if
the CEL expression defined in `messageExpression` generates an empty string, or a string containing line
breaks.

If one of the above conditions are met and no `message` has been set, then the default validation failure
message will be used instead.

`messageExpression` is a CEL expression, so the restrictions listed in Resource use by validation functions apply. If evaluation halts due to resource constraints
during `messageExpression` execution, then no further validation rules will be executed.

Setting `messageExpression` is optional.

#### The `message` field {#field-message}

If you want to set a static message, you can supply `message` rather than `messageExpression`.
The value of `message` is used as an opaque error string if validation fails.

Setting `message` is optional.

#### The `reason` field {#field-reason}

You can add a machine-readable validation failure reason within a `validation`, to be returned
whenever a request fails this validation rule.

For example:

```yaml
x-kubernetes-validations:
- rule: "self.x <= self.maxLimit"
  reason: "FieldValueInvalid"
```

The HTTP status code returned to the caller will match the reason of the first failed validation rule.
The currently supported reasons are: "FieldValueInvalid", "FieldValueForbidden", "FieldValueRequired", "FieldValueDuplicate".
If not set or unknown reasons, default to use "FieldValueInvalid".

Setting `reason` is optional.

#### The `fieldPath` field {#field-field-path}

You can specify the field path returned when the validation fails.

For example:

```yaml
x-kubernetes-validations:
- rule: "self.foo.test.x <= self.maxLimit"
  fieldPath: ".foo.test.x"
```

In the example above, the validation checks the value of field `x` should be less than the value of `maxLimit`.
If no `fieldPath` specified, when validation fails, the fieldPath would be default to wherever `self` scoped.
With `fieldPath` specified, the returned error will have `fieldPath` properly refer to the location of field `x`.

The `fieldPath` value must be a relative JSON path that is scoped to the location of this x-kubernetes-validations extension in the schema.
Additionally, it should refer to an existing field within the schema.
For example when validation checks if a specific attribute `foo` under a map `testMap`, you could set
`fieldPath` to `".testMap.foo"` or `.testMap['foo']'`.
If the validation requires checking for unique attributes in two lists, the fieldPath can be set to either of the lists.
For example, it can be set to `.testList1` or `.testList2`.
It supports child operation to refer to an existing field currently.
Refer to JSONPath support in Kubernetes for more info.
The `fieldPath` field does not support indexing arrays numerically.

Setting `fieldPath` is optional.

#### The `optionalOldSelf` field {#field-optional-oldself}

**Feature state:**

If your cluster does not have CRD validation ratcheting enabled,
the CustomResourceDefinition API doesn't include this field, and trying to set it may result
in an error.

The `optionalOldSelf` field is a boolean field that alters the behavior of Transition Rules described
below. Normally, a transition rule will not evaluate if `oldSelf` cannot be determined:
during object creation or when a new value is introduced in an update.

If `optionalOldSelf` is set to true, then transition rules will always be
evaluated and the type of `oldSelf` be changed to a CEL `Optional` type.

`optionalOldSelf` is useful in cases where schema authors would like a more
control tool than provided by the default equality based behavior of
to introduce newer, usually stricter constraints on new values, while still
allowing old values to be "grandfathered" or ratcheted using the older validation.

Example Usage:

| CEL                                     | Description |
|-----------------------------------------|-------------|
| `self.foo == "foo" &#124;&#124; (oldSelf.hasValue() && oldSelf.value().foo != "foo")` | Ratcheted rule. Once a value is set to "foo", it must stay foo. But if it existed before the "foo" constraint was introduced, it may use any value |
| `[oldSelf.orValue(""), self].all(x, ["OldCase1", "OldCase2"].exists(case, x == case)) &#124;&#124; ["NewCase1", "NewCase2"].exists(case, self == case) &#124;&#124; ["NewCase"].has(self)` | "Ratcheted validation for removed enum cases if oldSelf used them" |
| <code>oldSelf.optMap(o, o.size()).orValue(0) < 4 &#124;&#124; self.size() >= 4</code> | Ratcheted validation of newly increased minimum map or list size |

#### Validation functions {#available-validation-functions}

Functions available include:

- CEL standard functions, defined in the list of standard definitions
- CEL standard macros
- CEL extended string function library
- Kubernetes CEL extension library

#### Transition rules

A rule that contains an expression referencing the identifier `oldSelf` is implicitly considered a
_transition rule_. Transition rules allow schema authors to prevent certain transitions between two
otherwise valid states. For example:

```yaml
type: string
enum: ["low", "medium", "high"]
x-kubernetes-validations:
- rule: "!(self == 'high' && oldSelf == 'low') && !(self == 'low' && oldSelf == 'high')"
  message: cannot transition directly between 'low' and 'high'
```

Unlike other rules, transition rules apply only to operations meeting the following criteria:

- The operation updates an existing object. Transition rules never apply to create operations.

- Both an old and a new value exist. It remains possible to check if a value has been added or
  removed by placing a transition rule on the parent node. Transition rules are never applied to
  custom resource creation. When placed on an optional field, a transition rule will not apply to
  update operations that set or unset the field.

- The path to the schema node being validated by a transition rule must resolve to a node that is
  comparable between the old object and the new object. For example, list items and their
  descendants (`spec.foo[10].bar`) can't necessarily be correlated between an existing object and a
  later update to the same object.

Errors will be generated on CRD writes if a schema node contains a transition rule that can never be
applied, e.g. "oldSelf cannot be used on the uncorrelatable portion of the schema within *path*".

Transition rules are only allowed on _correlatable portions_ of a schema.
A portion of the schema is correlatable if all `array` parent schemas are of type `x-kubernetes-list-type=map`;
any `set`or `atomic`array parent schemas make it impossible to unambiguously correlate a `self` with `oldSelf`.

Here are some examples for transition rules:

| Use Case                                                          | Rule
| --------                                                          | --------
| Immutability                                                      | `self.foo == oldSelf.foo`
| Prevent modification/removal once assigned                        | `oldSelf != 'bar' \|\| self == 'bar'` or `!has(oldSelf.field) \|\| has(self.field)`
| Append-only set                                                   | `self.all(element, element in oldSelf)`
| If previous value was X, new value can only be A or B, not Y or Z | `oldSelf != 'X' \|\| self in ['A', 'B']`
| Monotonic (non-decreasing) counters                               | `self >= oldSelf`

#### Resource use by validation functions

When you create or update a CustomResourceDefinition that uses validation rules,
the API server checks the likely impact of running those validation rules. If a rule is
estimated to be prohibitively expensive to execute, the API server rejects the create
or update operation, and returns an error message.
A similar system is used at runtime that observes the actions the interpreter takes. If the interpreter executes
too many instructions, execution of the rule will be halted, and an error will result.
Each CustomResourceDefinition is also allowed a certain amount of resources to finish executing all of
its validation rules. If the sum total of its rules are estimated at creation time to go over that limit,
then a validation error will also occur.

You are unlikely to encounter issues with the resource budget for validation if you only
specify rules that always take the same amount of time regardless of how large their input is.
For example, a rule that asserts that `self.foo == 1` does not by itself have any
risk of rejection on validation resource budget groups.
But if `foo` is a string and you define a validation rule `self.foo.contains("someString")`, that rule takes
longer to execute depending on how long `foo` is.
Another example would be if `foo` were an array, and you specified a validation rule `self.foo.all(x, x > 5)`.
The cost system always assumes the worst-case scenario if a limit on the length of `foo` is not
given, and this will happen for anything that can be iterated over (lists, maps, etc.).

Because of this, it is considered best practice to put a limit via `maxItems`, `maxProperties`, and
`maxLength` for anything that will be processed in a validation rule in order to prevent validation
errors during cost estimation. For example, given this schema with one rule:

```yaml
openAPIV3Schema:
  type: object
  properties:
    foo:
      type: array
      items:
        type: string
      x-kubernetes-validations:
        - rule: "self.all(x, x.contains('a string'))"
```

then the API server rejects this rule on validation budget grounds with error:

```
spec.validation.openAPIV3Schema.properties[spec].properties[foo].x-kubernetes-validations[0].rule: Forbidden:
CEL rule exceeded budget by more than 100x (try simplifying the rule, or adding maxItems, maxProperties, and
maxLength where arrays, maps, and strings are used)
```

The rejection happens because `self.all` implies calling `contains()` on every string in `foo`,
which in turn will check the given string to see if it contains `'a string'`. Without limits, this
is a very expensive rule.

If you do not specify any validation limit, the estimated cost of this rule will exceed the
per-rule cost limit. But if you add limits in the appropriate places, the rule will be allowed:
