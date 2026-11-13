---
title: "Declarative API Validation (part 2 of 4)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/using-api/declarative-validation.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Declarative API Validation (part 2 of 4)

## Tag reference

### `+k8s:alpha` {#tag-alpha}

**Description:**

Puts a validation rule in _shadow mode_, the first phase of the
validation lifecycle. Use it only when migrating existing
hand-written validation, not on new fields.

The hand-written validation stays authoritative; the declarative rule runs
alongside it, and mismatches and panics are recorded as
metrics. This confirms the two behave identically before you
promote the rule to Beta.

The API server never enforces `+k8s:alpha` rules, regardless of feature gates.

**Stability level:** Beta

**Scopes:** struct fields, type definitions, list values, map keys, map values

**Arguments:**

* `since` (string, optional): the Kubernetes version in which the validation was
  first shadowed.

**Payload:**

* `<validation-tag>` (required): the declarative validation tag to shadow.

**Usage example:**

```go
type MyStruct struct {
    // +k8s:alpha(since:"1.36")=+k8s:minimum=1
    MyField int `json:"myField"`
}
```

### `+k8s:beta` {#tag-beta}

**Description:**

Puts a migrated validation rule in _enforced mode_, the second phase of the
validation lifecycle. Use it only when migrating existing
hand-written validation, not on new fields.

When `DeclarativeValidationBeta` is enabled (the default), the rule is
authoritative and the API server drops the hand-written errors it covers.
Disabling the gate reverts the rule to shadow mode.

**Stability level:** Beta

**Scopes:** struct fields, type definitions, list values, map keys, map values

**Arguments:**

* `since` (string, optional): the Kubernetes version in which the validation was
  promoted to Beta.

**Payload:**

* `<validation-tag>` (required): the declarative validation tag to enforce.

**Usage example:**

```go
type MyStruct struct {
    // +k8s:beta(since:"1.37")=+k8s:minimum=1
    MyField int `json:"myField"`
}
```

### `+k8s:customUnique` {#tag-customUnique}

**Description:**

Indicates that custom, hand-written validation implements uniqueness validation
for this list. This disables generation of uniqueness validation for the list,
which `+k8s:listType=set`, `+k8s:listType=map`, and `+k8s:unique`
otherwise imply.

**Stability level:** Stable

**Scopes:** struct fields, type definitions, list values, map keys, map values

**Usage example:**

```go
type MyStruct struct {
    // +k8s:listType=map
    // +k8s:listMapKey=key
    // +k8s:customUnique
    MyList []Item `json:"myList"`
}
```

In this example, the generator records that `MyList` is a list-map but does not
emit a uniqueness check for it; hand-written code is responsible for that check.

### `+k8s:customValidation` {#tag-customValidation}

**Description:**

Calls a hand-written validation function from the generated traversal code. Use
this for logic that you cannot express with the other tags.

The function must live in the generated package, with the following signature:

```go
func(ctx context.Context, op operation.Operation, fldPath *field.Path, value, oldValue <ValueType>) field.ErrorList
```

`<ValueType>` is the value's type made nilable: a pointer such as `*string`, or
the type itself if already nilable (slice, map, pointer). Each generated package
needs its own definition, because each copy calls the function beside it.

In the function name, `<Type>` and `<Field>` are Go identifiers (`Replicas`, not
`replicas`):

* Field scope: `ValidateCustom_<Type>_<Field>` validates one field. On update,
  it is skipped when that field is unchanged.

* Type scope: `ValidateCustom_<Type>` checks across fields. It is *not* skipped
  on update, so an expensive check should return early when `value` and
  `oldValue` are equal.

For per-element checks, tag the element type, or use field scope and loop inside
the function.

**Stability level:** Stable

**Scopes:** struct fields, type definitions

**Usage example:**

```go
// +k8s:customValidation
type MyStruct struct {
    // +k8s:customValidation
    StringField string `json:"stringField"`

    // Both validations run on this field.
    // +k8s:maxLength=3
    // +k8s:customValidation
    MaxLengthField string `json:"maxLengthField"`
}
```

### `+k8s:dependentForbidden` {#tag-dependentForbidden}

**Description:**

Indicates that when this field is set, the named sibling field must not be set.
A field counts as "set" when it is a non-nil pointer, a non-empty slice or map,
or a non-zero builtin. Dependencies are one-directional. Repeat the tag to
forbid multiple siblings.

**Stability level:** Alpha

**Scopes:** struct fields

**Arguments:**

* `<sibling-field-json-name>` (string, required): the JSON name of the sibling
  field.

**Usage example:**

```go
type MyStruct struct {
    // +k8s:optional
    // +k8s:dependentForbidden("dependentA")
    // +k8s:dependentForbidden("dependentB")
    Trigger *string `json:"trigger"`

    // +k8s:optional
    DependentA *string `json:"dependentA"`

    // +k8s:optional
    DependentB *string `json:"dependentB"`
}
```

In this example, if `trigger` is set, neither `dependentA` nor `dependentB` may
be set.

### `+k8s:dependentRequired` {#tag-dependentRequired}

**Description:**

Indicates that when this field is set, the named sibling field must also be set.
A field counts as "set" when it is a non-nil pointer, a non-empty slice or map,
or a non-zero builtin. Dependencies are one-directional. Repeat the tag to
require multiple siblings.

**Stability level:** Alpha

**Scopes:** struct fields

**Arguments:**

* `<sibling-field-json-name>` (string, required): the JSON name of the sibling
  field.

**Usage example:**

```go
type MyStruct struct {
    // +k8s:optional
    // +k8s:dependentRequired("dependent")
    Trigger *string `json:"trigger"`

    // +k8s:optional
    Dependent *string `json:"dependent"`
}
```

In this example, if `trigger` is set, `dependent` must also be set. Setting
`dependent` alone is allowed.

### `+k8s:eachKey` {#tag-eachKey}

**Description:**

Declares a validation for each key in a map.

**Stability level:** Stable

**Scopes:** struct fields, type definitions, list values, map keys, map values

**Payload:**

* `<validation-tag>` (required): the tag to evaluate for each key.

**Usage example:**

```go
type MyStruct struct {
    // +k8s:eachKey=+k8s:minimum=1
    MyMap map[int]string `json:"myMap"`
}
```

### `+k8s:eachVal` {#tag-eachVal}

**Description:**

Declares a validation for each value in a map or list.

**Stability level:** Stable

**Scopes:** struct fields, type definitions, list values, map keys, map values

**Payload:**

* `<validation-tag>` (required): the tag to evaluate for each value.

**Usage example:**

```go
type MyStruct struct {
    // +k8s:eachVal=+k8s:minimum=1
    MyMap map[string]int `json:"myMap"`

    // +k8s:eachVal=+k8s:maxLength=10
    MyList []string `json:"myList"`
}
```

### `+k8s:enum` {#tag-enum}

**Description:**

Indicates that a string type is an enum. All constant values of this type are
values in the enum, unless you exclude them with
`+k8s:enumExclude`.

**Stability level:** Stable

**Scopes:** type definitions

**Usage example:**

First, define a new string type and some constants of that type:

```go
// +k8s:enum
type MyEnum string

const (
    MyEnumA MyEnum = "A"
    MyEnumB MyEnum = "B"
)
```

Then, use this type in another struct:

```go
type MyStruct struct {
    MyField MyEnum `json:"myField"`
}
```

The validation logic ensures that `MyField` is one of the defined enum values
(`"A"` or `"B"`).

### `+k8s:enumExclude` {#tag-enumExclude}

**Description:**

Indicates that a constant value is not part of an enum, even if the constant's
type has the `+k8s:enum` tag. You can make the exclusion conditional by nesting
the tag inside `+k8s:ifEnabled` or
`+k8s:ifDisabled`. If you use several conditional tags, the
generator excludes the value if *any* of the conditions is met.

**Stability level:** Alpha

**Scopes:** constant values

**Usage example:**

```go
// +k8s:enum
type MyEnum string

const (
    MyEnumA MyEnum = "A"

    // Never a valid value.
    // +k8s:enumExclude
    MyEnumB MyEnum = "B"

    // Only a valid value while "MyFeature" is disabled.
    // +k8s:ifEnabled(MyFeature)=+k8s:enumExclude
    MyEnumC MyEnum = "C"
)
```

### `+k8s:forbidden` {#tag-forbidden}

**Description:**

Indicates that a field may not be specified.

**Stability level:** Beta

**Scopes:** struct fields

**Usage example:**

```go
type MyStruct struct {
    // +k8s:forbidden
    MyField string `json:"myField"`
}
```

### `+k8s:format` {#tag-format}

**Description:**

Indicates that a string field has a particular format.

**Stability level:** Stable

**Scopes:** struct fields, type definitions, list values, map keys, map values

**Payloads:**

| Payload | Meaning |
| --- | --- |
| `k8s-extended-resource-name` | A Kubernetes extended resource name: a domain-prefixed name that must not have a `kubernetes.io` or `requests.` prefix. When you prepend `requests.`, the result must be a valid label key, as used by quota. |
| `k8s-label-key` | A Kubernetes label key. |
| `k8s-label-value` | A Kubernetes label value. |
| `k8s-long-name` | A Kubernetes "long name", aka a "DNS subdomain" value. |
| `k8s-long-name-caseless` | Deprecated: a case-insensitive Kubernetes "long name". |
| `k8s-path-segment-name` | A Kubernetes "path segment name" value. |
| `k8s-prefixed-label-key` | A Kubernetes label key, with the prefix required. |
| `k8s-resource-fully-qualified-name` | A non-empty prefix and name separated by a slash (for example, `prefix/name`). The prefix must be a DNS subdomain, and the name must be a C identifier of no more than 32 characters. |
| `k8s-resource-pool-name` | One or more Kubernetes "long name" parts separated by `/`, no longer than 253 characters in total. |
| `k8s-short-name` | A Kubernetes "short name", aka a "DNS label" value. |
| `k8s-uuid` | A UUID conforming to RFC 4122. |

**Usage example:**

```go
type MyStruct struct {
    // +k8s:format=k8s-long-name
    Subdomain string `json:"subdomain"`

    // +k8s:format=k8s-short-name
    Label string `json:"label"`

    // +k8s:format=k8s-uuid
    ID string `json:"id"`
}
```

### `+k8s:ifDisabled` {#tag-ifDisabled}

**Description:**

Declares a validation that only applies when an option is disabled. Options
correspond to the validation options that the API server derives from feature
gates.

**Stability level:** Stable

**Scopes:** struct fields, type definitions, list values, map keys, map values,
constant values

**Arguments:**

* `<option>` (string, required): the name of the option.

**Payload:**

* `<validation-tag>` (required): the validation tag to evaluate only when the
  option is disabled.

**Usage example:**

```go
type MyStruct struct {
    // +k8s:ifDisabled(MyFeature)=+k8s:required
    MyField string `json:"myField"`
}
```

### `+k8s:ifEnabled` {#tag-ifEnabled}

**Description:**

Declares a validation that only applies when an option is enabled. Options
correspond to the validation options that the API server derives from feature
gates.

**Stability level:** Stable

**Scopes:** struct fields, type definitions, list values, map keys, map values,
constant values

**Arguments:**

* `<option>` (string, required): the name of the option.

**Payload:**

* `<validation-tag>` (required): the validation tag to evaluate only when the
  option is enabled.

**Usage example:**

```go
type MyStruct struct {
    // +k8s:ifEnabled(MyFeature)=+k8s:required
    MyField string `json:"myField"`
}
```

### `+k8s:ifMode` {#tag-ifMode}

**Description:**

Declares a validation that only applies when the struct's
mode discriminator has a particular value. This
expresses state-based validation, where the shape of an object depends on a mode
field.

A field that carries at least one `+k8s:ifMode` tag is *implicitly forbidden* in
every mode that none of its tags name.

**Stability level:** Stable

**Scopes:** struct fields

**Arguments:**

* `<mode>` (string, positional): the discriminator value for which this
  validation applies.
* `modality` (string, optional): the name of the discriminator group, when a
  struct has more than one.
* `mode` (string, optional): the discriminator value, as a named alternative to
  the positional argument.

**Payload:**

* `<validation-tag>` (required): the tag to evaluate when the mode matches.

**Usage example:**

```go
type MyStruct struct {
    // +k8s:modeDiscriminator
    Mode string `json:"mode"`

    // Required in mode "A", and additionally length-limited.
    // +k8s:ifMode("A")=+k8s:required
    // +k8s:ifMode("A")=+k8s:maxLength=5
    FieldA *string `json:"fieldA,omitempty"`

    // Optional in mode "B", implicitly forbidden in every other mode.
    // +k8s:ifMode("B")=+k8s:optional
    FieldB *string `json:"fieldB,omitempty"`
}
```

### `+k8s:immutable` {#tag-immutable}

**Description:**

Indicates that a field may not be updated. Unlike `+k8s:update`,
which offers finer-grained transitions, `+k8s:immutable` forbids any change to
the value after creation.

**Stability level:** Stable

**Scopes:** struct fields, type definitions, list values, map values

**Usage example:**

```go
type MyStruct struct {
    // +k8s:immutable
    StringField string `json:"stringField"`

    // +k8s:immutable
    SliceField []string `json:"sliceField"`
}

// +k8s:immutable
type ImmutableType string
```

### `+k8s:isSubresource` {#tag-isSubresource}

**Description:**

A package-level tag that scopes the package's validation rules to one
subresource, so they do not apply to the root object or any other subresource.
This lets you keep subresource-specific validation in its own package, separate
from the API types.

**Stability level:** Stable

**Scope:** package

**Payload:**

* `<subresource-path>`: the path of the subresource to which the validations in
  this package apply (for example, `"/status"` or `"/scale"`).

This tag requires a matching
`+k8s:supportsSubresource` in the package that
defines the API type. Without it, the generator emits the validation code but
the dispatcher does not recognize the subresource path, so nothing reaches it.

**Usage example:**

In `staging/src/k8s.io/api/apps/v1/doc.go`, declare that the type supports
`/scale`:

```go
// +k8s:supportsSubresource="/scale"
package v1
```

In `staging/src/k8s.io/api/apps/v1/validations/scale/doc.go`, define the rules
that run only for `/scale`:

```go
// +k8s:isSubresource="/scale"
package scale
```
