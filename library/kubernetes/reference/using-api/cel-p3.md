---
title: "Common Expression Language in Kubernetes (part 3 of 4)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/using-api/cel.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Common Expression Language in Kubernetes (part 3 of 4)

### Kubernetes format library

The `format` library provides functions for validating common Kubernetes string formats.
This can be useful in the `messageExpression` of validation rules to provide more specific error messages.

The library provides `format()` functions for each named format, and a generic `format.named()` function.

- `format.named(string)` &rarr; `?Format`: Returns the `Format` object for the given format name, if it exists. Otherwise, returns `optional.none`.
- `format.<formatName>() -> Format`: Convenience functions for all the named formats are also available. For example, `format.dns1123Label()` returns the `Format` object for DNS-1123 labels.
- `<Format>.validate(string) -> list<string>?`: Validates the given string against the format. Returns `optional.none` if the string is valid, otherwise an optional containing a list of validation error strings.

**Available Formats:**

The following format names are supported:

Available formats for the format library

   | Format Name
   | Description

   | <tt>dns1123Label</tt>
   | Validates if the string is a valid DNS-1123 label.

   | <tt>dns1123Subdomain</tt>
   | Validates if the string is a valid DNS-1123 subdomain.

   | <tt>dns1035Label</tt>
   | Validates if the string is a valid DNS-1035 label.

   | <tt>qualifiedName</tt>
   | Validates if the string is a valid qualified name.

   | <tt>dns1123LabelPrefix</tt>
   | Validates if the string is a valid DNS-1123 label prefix.

   | <tt>dns1123SubdomainPrefix</tt>
   | Validates if the string is a valid DNS-1123 subdomain prefix.

   | <tt>dns1035LabelPrefix</tt>
   | Validates if the string is a valid DNS-1035 label prefix.

   | <tt>labelValue</tt>
   | Validates if the string is a valid label value.

   | <tt>uri</tt>
   | Validates if the string is a valid URI. Uses the same pattern as `isURL`, but returns an error list.

   | <tt>uuid</tt>
   | Validates if the string is a valid UUID.

   | <tt>byte</tt>
   | Validates if the string is a valid base64 encoded string.

   | <tt>date</tt>
   | Validates if the string is a valid date in `YYYY-MM-DD` format.

   | <tt>datetime</tt>
   | Validates if the string is a valid datetime in RFC3339 format.

**Examples:**

Examples of CEL expressions using format library functions

   | CEL Expression
   | Purpose

   | <tt>!format.dns1123Label().validate(self.metadata.name).hasValue()</tt>
   | A validation rule that checks if an object's name is a valid DNS-1123 label.

   | <tt>format.dns1123Label().validate(self.metadata.name).orValue([]).join("\\n")</tt>
   | A `messageExpression` that returns specific validation errors for a field. If the field is valid, `validate` returns `optional.none`, and `orValue` provides an empty list, resulting in an empty string.

See the Kubernetes Format library godoc for more information.

### Kubernetes quantity library

Kubernetes 1.28 adds support for manipulating quantity strings (ex 1.5G, 512k, 20Mi)

- `isQuantity(string)` checks if a string is a valid Quantity according to
  Kubernetes' resource.Quantity.
- `quantity(string) Quantity` converts a string to a Quantity or results in an error if the
  string is not a valid quantity.

Once parsed via the `quantity` function, the resulting Quantity object has the
following library of member functions:

Available member functions of a Quantity

   | Member Function
   | CEL Return Value
   | Description

   | <tt>isInteger()</tt>
   | bool
   | Returns true if and only if asInteger is safe to call without an error

   | <tt>asInteger()</tt>
   | int
   |
    Returns a representation of the current value as an <tt>int64</tt> if possible
    or results in an error if conversion would result in overflow or loss of precision.

   | <tt>asApproximateFloat()</tt>
   | float
   |
    Returns a <tt>float64</tt> representation of the quantity which may lose precision.
    If the value of the quantity is outside the range of a <tt>float64</tt>,
    <tt>+Inf/-Inf</tt> will be returned.

   | <tt>sign()</tt>
   | int
   |
    Returns <tt>1</tt> if the quantity is positive, <tt>-1</tt> if it is negative.
    <tt>0</tt> if it is zero.

   | <tt>add(<Quantity>)</tt>
   | Quantity
   | Returns sum of two quantities

   | <tt>add(<int>)</tt>
   | Quantity
   | Returns sum of quantity and an integer
   |

   | <tt>sub(<Quantity>)</tt>
   | Quantity
   | Returns difference between two quantities

   | <tt>sub(<int>)</tt>
   | Quantity
   | Returns difference between a quantity and an integer

   | <tt>isLessThan(<Quantity>)</tt>
   | bool
   | Returns true if and only if the receiver is less than the operand

   | <tt>isGreaterThan(<Quantity>)</tt>
   | bool
   | Returns true if and only if the receiver is greater than the operand

   | <tt>compareTo(<Quantity>)</tt>
   | int
   |
    Compares receiver to operand and returns 0 if they are equal,
    1 if the receiver is greater, or -1 if the receiver is less than the operand

Examples:

Examples of CEL expressions using URL library functions

   | CEL Expression
   | Purpose

   | <tt>quantity("500000G").isInteger()</tt>
   | Test if conversion to integer would throw an error

   | <tt>quantity("50k").asInteger()</tt>
   | Precise conversion to integer

   | <tt>quantity("9999999999999999999999999999999999999G").asApproximateFloat()</tt>
   | Lossy conversion to float

   | <tt>quantity("50k").add(quantity("20k"))</tt>
   | Add two quantities

   | <tt>quantity("50k").sub(20000)</tt>
   | Subtract an integer from a quantity

   | <tt>quantity("50k").add(20).sub(quantity("100k")).sub(-50000)</tt>
   | Chain adding and subtracting integers and quantities

   | <tt>quantity("200M").compareTo(quantity("0.2G"))</tt>
   | Compare two quantities

   | <tt>quantity("150Mi").isGreaterThan(quantity("100Mi"))</tt>
   | Test if a quantity is greater than the receiver

   | <tt>quantity("50M").isLessThan(quantity("100M"))</tt>
   | Test if a quantity is less than the receiver

### Kubernetes semver library

Kubernetes v1.34 adds support for parsing and comparing strings that follow the Semantic Versioning 2.0.0 specification.
Refer to the semver.org documentation for information on accepted patterns.

- `isSemver(string)` checks if a string is a valid semantic version.
- `semver(string)` converts a string to a Semver object or results in an error.

An optional boolean `normalize` argument can be passed to `isSemver` and `semver`. If `true`, normalization removes any "v" prefix, adds a 0 minor and patch numbers to versions with only major or major.minor components specified, and removes any leading 0s.

Once parsed via the `semver` function, the resulting Semver object has the
following library of member functions:

Available member functions of a Semver object

   | Member Function
   | CEL Return Value
   | Description

   | <tt>major()</tt>
   | int
   | Returns the major version number.

   | <tt>minor()</tt>
   | int
   | Returns the minor version number.

   | <tt>patch()</tt>
   | int
   | Returns the patch version number.

   | <tt>isLessThan(<Semver>)</tt>
   | bool
   | Returns true if and only if the receiver is less than the operand.

   | <tt>isGreaterThan(<Semver>)</tt>
   | bool
   | Returns true if and only if the receiver is greater than the operand.

   | <tt>compareTo(<Semver>)</tt>
   | int
   |
    Compares receiver to operand and returns 0 if they are equal,
    1 if the receiver is greater, or -1 if the receiver is less than the operand.

Examples:

Examples of CEL expressions using semver library functions

   | CEL Expression
   | Purpose

   | <tt>isSemver('1.0.0')</tt>
   | Returns true for a valid Semver string.

   | <tt>isSemver('v1.0', true)</tt>
   | Returns true for a normalizable Semver string.

   | <tt>semver('1.2.3').major()</tt>
   | Returns the major version of a Semver.

   | <tt>semver('1.2.3').compareTo(semver('2.0.0')) < 0</tt>
   | Compare two Semver strings.

See the Kubernetes Semver library godoc for more information.

## Type checking

CEL is a gradually typed language.

Some Kubernetes API fields contain fully type checked CEL expressions. For example,
CustomResourceDefinitions Validation Rules
are fully type checked.

Some Kubernetes API fields contain partially type checked CEL expressions. A
partially type checked expression is an expressions where some of the variables
are statically typed but others are dynamically typed. For example, in the CEL
expressions of
ValidatingAdmissionPolicies
the `request` variable is typed, but the `object` variable is dynamically typed.
As a result, an expression containing `request.namex` would fail type checking
because the `namex` field is not defined. However, `object.namex` would pass
type checking even when the `namex` field is not defined for the resource kinds
that `object` refers to, because `object` is dynamically typed.

The `has()` macro in CEL may be used in CEL expressions to check whether a field
of a dynamically typed variable is present before attempting to access the
field's value. For example:

```cel
has(object.namex) ? object.namex == 'special' : request.name == 'special'
```

Use `has()` to check field presence. Do not use `has()` to check whether a map
contains a key. For example, do not write
`has(object.metadata.labels['example.com/environment'])`. For map key checks,
use the `in` operator instead. For example:

```cel
has(object.metadata.labels) && 'example.com/environment' in object.metadata.labels
```

This expression checks that `metadata.labels` is present before checking whether
the map contains the `example.com/environment` key.

## Type system integration

Table showing the relationship between OpenAPIv3 types and CEL types

   | OpenAPIv3 type
   | CEL type

   | 'object' with Properties
   |
    object / "message type"
    (<tt>type(<object>)</tt> evaluates to
     <tt>selfType<uniqueNumber>.path.to.object.from.self</tt>)

   | 'object' with <tt>additionalProperties</tt>
   | map

   | 'object' with <tt>x-kubernetes-embedded-type</tt>
   |
    object / "message type", 'apiVersion', 'kind', 'metadata.name'
    and 'metadata.generateName' are implicitly included in schema

   | 'object' with x-kubernetes-preserve-unknown-fields
   | object / "message type", unknown fields are NOT accessible in CEL expression

   | <tt>x-kubernetes-int-or-string</tt>
   |
    Union of <tt>int</tt> or <tt>string</tt>,
    <tt>self.intOrString < 100 | self.intOrString == '50%'</tt>
    evaluates to true for both <tt>50</tt> and <tt>"50%"</tt>

   | 'array'
   | list

   | 'array' with <tt>x-kubernetes-list-type=map</tt>
   | list with map based Equality & unique key guarantees

   | 'array' with <tt>x-kubernetes-list-type=set</tt>
   | list with set based Equality & unique entry guarantees

   | 'boolean'
   | boolean

   | 'number' (all formats)
   | double

   | 'integer' (all formats)
   | int (64)

   | no equivalent
   | uint (64)

   | 'null'
   | null_type

   | 'string'
   | string

   | 'string' with format=byte (base64 encoded)
   | bytes

   | 'string' with format=date
   | timestamp (<tt>google.protobuf.Timestamp</tt>)

   | 'string' with format=datetime
   | timestamp (<tt>google.protobuf.Timestamp</tt>)

   | 'string' with format=duration
   | duration (<tt>google.protobuf.Duration</tt>)

Also see: CEL types,
OpenAPI types,
Kubernetes Structural Schemas.

Equality comparison for arrays with `x-kubernetes-list-type` of `set` or `map` ignores element
order. For example `[1, 2] == [2, 1]` if the arrays represent Kubernetes `set` values.

Concatenation on arrays with `x-kubernetes-list-type` use the semantics of the
list type:

`set`
: `X + Y` performs a union where the array positions of all elements in
  `X` are preserved and non-intersecting elements in `Y` are appended, retaining
  their partial order.

`map`
: `X + Y` performs a merge where the array positions of all keys in `X`
  are preserved but the values are overwritten by values in `Y` when the key
  sets of `X` and `Y` intersect. Elements in `Y` with non-intersecting keys are
  appended, retaining their partial order.

## Escaping

Only Kubernetes resource property names of the form
`a-zA-Z_.-/*` are accessible from CEL. Accessible property
names are escaped according to the following rules when accessed in the
expression:

Table of CEL identifier escaping rules

   | escape sequence
   | property name equivalent

   | <tt>__underscores__</tt>
   | <tt>__</tt>

   | <tt>__dot__</tt>
   | <tt>.</tt>

   | <tt>__dash__</tt>
   | <tt>-</tt>

   | <tt>__slash__</tt>
   | <tt>/</tt>

   | <tt>__{keyword}__</tt>
   |

      CEL RESERVED keyword

When you escape any of CEL's **RESERVED** keywords you need to match the exact property name
use the underscore escaping
(for example, `int` in the word `sprint` would not be escaped and nor would it need to be).

Examples on escaping:

Examples escaped CEL identifiers

   | property name
   | rule with escaped property name

   | <tt>namespace</tt>
   | <tt>self.__namespace__ > 0</tt>

   | <tt>x-prop</tt>
   | <tt>self.x__dash__prop > 0</tt>

   | <tt>redact_d</tt>
   | <tt>self.redact__underscores__d > 0</tt>

   | <tt>string</tt>
   | <tt>self.startsWith('kube')</tt>
