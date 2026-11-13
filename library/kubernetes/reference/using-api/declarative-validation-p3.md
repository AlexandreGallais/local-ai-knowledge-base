---
title: "Declarative API Validation (part 3 of 4)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/using-api/declarative-validation.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Declarative API Validation (part 3 of 4)

### `+k8s:item` {#tag-item}

**Description:**

Declares a validation for an item of a slice declared as a `+k8s:listType=map`.
You declare the item to match by providing field-value pair arguments where the
field is a `listMapKey`. You must specify all `listMapKey` fields.

**Stability level:** Stable

**Scopes:** struct fields, type definitions, list values, map keys, map values

**Usage:**

`+k8s:item(<listMapKey-JSON-field-name>: <value>,...)=<validation-tag>`

`+k8s:item(stringKey: "value", intKey: 42, boolKey: true)=<validation-tag>`

Name the arguments with the JSON names of the list-map key fields. Values can be
strings, integers, or booleans.

**Payload:**

* `<validation-tag>` (required): the tag to evaluate for the matching list item.

**Usage example:**

```go
type MyStruct struct {
    // +k8s:listType=map
    // +k8s:listMapKey=type
    // +k8s:item(type: "Approved")=+k8s:zeroOrOneOfMember
    // +k8s:item(type: "Denied")=+k8s:zeroOrOneOfMember
    MyConditions []MyCondition `json:"conditions"`
}

type MyCondition struct {
    Type   string `json:"type"`
    Status string `json:"status"`
}
```

In this example, the conditions with `type` "Approved" and "Denied" are members
of the same zero-or-one-of group, so at most one of them may be present.

### `+k8s:listMapKey` {#tag-listMapKey}

**Description:**

Declares a named sub-field of a list's value-type to be part of the list-map key.
This tag is required when you use `+k8s:listType=map` or `+k8s:unique=map`. You
can use multiple `+k8s:listMapKey` tags to specify that the list is keyed off
several fields.

**Stability level:** Stable

**Scopes:** struct fields, type definitions, list values, map keys, map values

**Payload:**

* `<field-json-name>` (required): the JSON name of the field to use as the key.

**Usage example:**

```go
// +k8s:listType=map
// +k8s:listMapKey=keyFieldOne
// +k8s:listMapKey=keyFieldTwo
type MyList []MyItem

type MyItem struct {
    KeyFieldOne string `json:"keyFieldOne"`
    KeyFieldTwo string `json:"keyFieldTwo"`
    ValueField  string `json:"valueField"`
}
```

The key is the combination of `keyFieldOne` and `keyFieldTwo`.

### `+k8s:listType` {#tag-listType}

**Description:**

Declares a list field's semantic type and ownership behavior:

* `atomic`: single ownership; the list is treated as a single value.
* `set`: shared ownership with uniqueness; each element must be unique.
* `map`: shared ownership with key-based uniqueness; requires
  `+k8s:listMapKey`.

**Stability level:** Stable

**Scopes:** struct fields, type definitions, list values, map keys, map values

**Payload:**

* `atomic | map | set` (required)

**Usage example:**

```go
// +k8s:listType=map
// +k8s:listMapKey=keyField
type MyList []MyItem

type MyItem struct {
    KeyField   string `json:"keyField"`
    ValueField string `json:"valueField"`
}
```

Each element of `MyList` must have a unique `keyField`.

### `+k8s:maxBytes` {#tag-maxBytes}

**Description:**

Indicates that a string field has a limit on its length in bytes. This could
allow as few as N/4 multi-byte characters. To limit the number of characters
instead, use `+k8s:maxLength`.

**Stability level:** Stable

**Scopes:** struct fields, type definitions, list values, map keys, map values

**Payload:**

* `<non-negative integer>` (required): this field must be no more than X bytes
  long.

**Usage example:**

```go
type MyStruct struct {
    // +k8s:maxBytes=1024
    MyString string `json:"myString"`
}
```

### `+k8s:maxItems` {#tag-maxItems}

**Description:**

Indicates that a list has a limit on its size.

**Stability level:** Stable

**Scopes:** struct fields, type definitions, list values, map values

**Payload:**

* `<non-negative integer>` (required): this list must be no more than X items
  long.

**Usage example:**

```go
type MyStruct struct {
    // +k8s:maxItems=5
    MyList []string `json:"myList"`
}
```

### `+k8s:maxLength` {#tag-maxLength}

**Description:**

Indicates that a string field has a limit on its length in characters. This could
allow up to 4*N bytes if the value uses multi-byte characters. To limit the
number of bytes instead, use `+k8s:maxBytes`.

**Stability level:** Stable

**Scopes:** struct fields, type definitions, list values, map keys, map values

**Payload:**

* `<non-negative integer>` (required): this field must be no more than X
  characters long.

**Usage example:**

```go
type MyStruct struct {
    // +k8s:maxLength=10
    MyString string `json:"myString"`
}
```

### `+k8s:maxProperties` {#tag-maxProperties}

**Description:**

Provides a limit on the properties of an object, as defined by JSON Schema. In
Kubernetes you can only use it to constrain the number of entries in a field
defined as a Go map.

**Stability level:** Stable

**Scopes:** struct fields, type definitions

**Payload:**

* `<non-negative integer>` (required): this map must have no more than X
  properties (where X <= 100000).

**Usage example:**

```go
type MyStruct struct {
    // +k8s:maxProperties=32
    MyMap map[string]string `json:"myMap"`
}
```

### `+k8s:maximum` {#tag-maximum}

**Description:**

Indicates that a numeric field has a maximum value.

**Stability level:** Stable

**Scopes:** struct fields, type definitions, list values, map keys, map values

**Payload:**

* `<integer>` (required): this field must be less than or equal to X.

**Usage example:**

```go
type MyStruct struct {
    // +k8s:maximum=100
    MyInt int `json:"myInt"`
}
```

### `+k8s:minItems` {#tag-minItems}

**Description:**

Indicates that a list has a minimum size.

**Stability level:** Stable

**Scopes:** struct fields, type definitions, list values, map values

**Payload:**

* `<non-negative integer>` (required): this list must be at least X items long.

**Usage example:**

```go
type MyStruct struct {
    // +k8s:minItems=1
    MyList []string `json:"myList"`
}
```

### `+k8s:minLength` {#tag-minLength}

**Description:**

Indicates that a string field has a minimum length in characters. If the value
uses multi-byte characters, the minimum size in bytes ranges from X to 4X.

**Stability level:** Stable

**Scopes:** struct fields, type definitions, list values, map keys, map values

**Payload:**

* `<integer>` (required): this field must be at least X characters long.

**Usage example:**

```go
type MyStruct struct {
    // +k8s:minLength=3
    MyString string `json:"myString"`
}
```

### `+k8s:minProperties` {#tag-minProperties}

**Description:**

Provides a lower limit on the properties of an object, as defined by JSON Schema.
In Kubernetes you can only use it to constrain the number of entries in a field
defined as a Go map.

**Stability level:** Stable

**Scopes:** struct fields, type definitions

**Payload:**

* `<non-negative integer>` (required): this map must have at least X properties
  (where X <= 100000).

**Usage example:**

```go
type MyStruct struct {
    // +k8s:minProperties=1
    MyMap map[string]string `json:"myMap"`
}
```

### `+k8s:minimum` {#tag-minimum}

**Description:**

Indicates that a numeric field has a minimum value.

**Stability level:** Stable

**Scopes:** struct fields, type definitions, list values, map keys, map values

**Payload:**

* `<integer>` (required): this field must be greater than or equal to X.

**Usage example:**

```go
type MyStruct struct {
    // +k8s:minimum=0
    MyInt int `json:"myInt"`
}
```

### `+k8s:modeDiscriminator` {#tag-modeDiscriminator}

**Description:**

Indicates that this field is a discriminator for state-based validation: its
value selects which `+k8s:ifMode` rules apply to the sibling
fields of the same struct.

The discriminator must be a non-pointer `string` or `bool`. A struct can have
more than one discriminator group; name the extra groups with the `modality`
argument. The group name `default` is reserved, and group names must match
`^a-zA-Z*$`.

**Stability level:** Stable

**Scopes:** struct fields

**Arguments:**

* `modality` (string, optional): the name of the discriminator group, if more
  than one exists.

**Usage example:**

```go
type MyStruct struct {
    // +k8s:modeDiscriminator
    Mode string `json:"mode"`

    // +k8s:modeDiscriminator(modality:"Legacy")
    Legacy bool `json:"legacy"`

    // +k8s:ifMode("A")=+k8s:required
    FieldA *string `json:"fieldA,omitempty"`

    // +k8s:ifMode(modality:"Legacy", mode:"true")=+k8s:required
    FieldB *string `json:"fieldB,omitempty"`
}
```

### `+k8s:monotonic` {#tag-monotonic}

**Description:**

Ensures that a numeric field's value never decreases on update.

**Stability level:** Alpha

**Scopes:** struct fields, type definitions

**Usage example:**

```go
type MyStruct struct {
    // +k8s:minimum=0
    // +k8s:monotonic
    Generation int64 `json:"generation"`
}
```

### `+k8s:neq` {#tag-neq}

**Description:**

Verifies that the field's value is not equal to a specific disallowed value.
Supports string, integer, and boolean types.

**Stability level:** Alpha

**Scopes:** struct fields, type definitions, list values, map keys, map values

**Payload:**

* `<value>` (required): the disallowed value. The parser infers the type (string,
  int, bool).

**Usage example:**

```go
type MyStruct struct {
    // +k8s:neq="disallowed"
    MyString string `json:"myString"`

    // +k8s:neq=0
    MyInt int `json:"myInt"`

    // +k8s:neq=true
    MyBool bool `json:"myBool"`
}
```

### `+k8s:opaqueType` {#tag-opaqueType}

**Description:**

Indicates that the generator ignores any validations declared on the referenced
type. If the generator's current flags do not include a referenced type's
package, you must set this tag, or code generation fails (which prevents silent
mistakes). If the generator should not ignore the validations, add the type's
package to the generator using the `--readonly-pkg` flag.

**Stability level:** Stable

**Scopes:** struct fields, type definitions, list values, map keys, map values

**Usage example:**

```go
import "some/external/package"

type MyStruct struct {
    // +k8s:opaqueType
    ExternalField package.ExternalType `json:"externalField"`
}
```

### `+k8s:optional` {#tag-optional}

**Description:**

Indicates that a field is optional to clients.

**Stability level:** Stable

**Scopes:** struct fields

**Usage example:**

```go
type MyStruct struct {
    // +k8s:optional
    MyField string `json:"myField"`
}
```

### `+k8s:required` {#tag-required}

**Description:**

Indicates that a field must be specified by clients.

**Stability level:** Stable

**Scopes:** struct fields

**Usage example:**

```go
type MyStruct struct {
    // +k8s:required
    MyField string `json:"myField"`
}
```

### `+k8s:subfield` {#tag-subfield}

**Description:**

Declares a validation for a subfield of a struct. The named subfield must be a
direct field of the struct, or of an embedded struct.

**Stability level:** Stable

**Scopes:** struct fields, type definitions, list values, map keys, map values

**Arguments:**

* `<field-json-name>` (string, required): the JSON name of the subfield.

**Payload:**

* `<validation-tag>` (required): the tag to evaluate for the subfield.

**Usage example:**

```go
type MyStruct struct {
    // +k8s:subfield(mySubfield)=+k8s:required
    Inner MyInnerStruct `json:"inner"`
}

type MyInnerStruct struct {
    MySubfield string `json:"mySubfield"`
}
```

### `+k8s:supportsSubresource` {#tag-supportsSubresource}

**Description:**

A package-level tag that registers a subresource path in the dispatch function,
so requests to it can be routed to a validation implementation. Repeat the tag
for several subresources.

Without any `+k8s:supportsSubresource` tag, only the root resource is validated
and subresource requests fail with a "no validation found" error. With this tag
but no matching `+k8s:isSubresource`, the subresource uses
the root object's rules.

**Stability level:** Stable

**Scope:** package

**Payload:**

* `<subresource-path>`: the path of the subresource to support (for example,
  `"/status"` or `"/scale"`).

**Usage example:**

In `staging/src/k8s.io/api/core/v1/doc.go`, to handle `/status` and `/scale` for
the types in package `v1`:

```go
// +k8s:supportsSubresource="/status"
// +k8s:supportsSubresource="/scale"
package v1
```

### `+k8s:unionDiscriminator` {#tag-unionDiscriminator}

**Description:**

Indicates that this field is the discriminator for a union. The discriminator's
value selects which union member must be present.

**Stability level:** Beta

**Scopes:** struct fields, list values

**Arguments:**

* `union` (string, optional): the name of the union, if more than one exists.

**Usage example:**

```go
type MyStruct struct {
    TypeMeta int

    // +k8s:unionDiscriminator
    D D `json:"d"`

    // +k8s:unionMember
    // +k8s:optional
    M1 *M1 `json:"m1"`

    // +k8s:unionMember
    // +k8s:optional
    M2 *M2 `json:"m2"`
}

type D string

const (
    DM1 D = "M1"
    DM2 D = "M2"
)

type M1 struct{}

type M2 struct{}
```

The value of `D` determines which member, `M1` or `M2`, must be present.

### `+k8s:unionMember` {#tag-unionMember}

**Description:**

Indicates that this field is a member of a union. Exactly one member of a union
must be set.

**Stability level:** Stable

**Scopes:** struct fields, list values

**Arguments:**

* `union` (string, optional): the name of the union, if more than one exists.
* `memberName` (string, optional): the discriminator value for this member.
  Defaults to the field's name.

**Usage example:**

```go
type MyStruct struct {
    // +k8s:unionMember(union: "union1")
    // +k8s:optional
    M1 *M1 `json:"u1m1"`

    // +k8s:unionMember(union: "union1")
    // +k8s:optional
    M2 *M2 `json:"u1m2"`
}

type M1 struct{}

type M2 struct{}
```

### `+k8s:unique` {#tag-unique}

**Description:**

Declares that a list field's elements are unique. You can use this tag together
with `+k8s:listType=atomic` to add a uniqueness constraint without changing the
list's merge semantics, or independently to specify uniqueness semantics.

**Stability level:** Stable

**Scopes:** struct fields, type definitions, list values, map keys, map values

**Payload:**

* `map | set` (required). With `map`, the identity of an element comes from the
  `+k8s:listMapKey` fields; with `set`, from the whole element
  value.

**Usage example:**

```go
type MyStruct struct {
    // +k8s:listType=atomic
    // +k8s:unique=set
    Names []string `json:"names"`

    // +k8s:listType=atomic
    // +k8s:unique=map
    // +k8s:listMapKey=key
    Items []Item `json:"items"`
}
```
