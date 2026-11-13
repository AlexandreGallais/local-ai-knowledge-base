---
title: "Declarative API Validation (part 1 of 4)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/using-api/declarative-validation.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Declarative API Validation

**Feature state:**

Kubernetes  uses _declarative validation_ for a
growing set of APIs. Instead of hand-written Go code (`validation.go`), API
authors declare validation rules as comment tags on the type definitions
(`types.go`), for example `+k8s:minimum=0`. A code generator,
`validation-gen`, turns those tags into validation code.

This mainly affects Kubernetes contributors and authors of
extension API servers,
but cluster administrators should know how it behaves while existing
hand-written validation is being migrated.

## Validation lifecycle {#lifecycle}

On new API fields, use a tag directly, such as `+k8s:minimum=1`. These are
always enforced.

Migrating an *existing* hand-written validation is riskier, because the
generated code must behave exactly like the code it replaces. Those migrations
wrap the tag in a _lifecycle prefix_ (`+k8s:alpha` or `+k8s:beta`) that controls
whether the declarative result is authoritative.

| Tag form | Behavior |
| --- | --- |
| `+k8s:minimum=1` (no prefix) | **Enforced.** The declarative result is authoritative. |
| `+k8s:beta(since:"1.37")=+k8s:minimum=1` | **Enforced** when the `DeclarativeValidationBeta` feature gate is enabled (the default), and shadowed otherwise. |
| `+k8s:alpha(since:"1.36")=+k8s:minimum=1` | **Always shadowed.** Hand-written validation remains authoritative. |

In _shadow mode_, declarative validation still runs, but the API server does not
return its errors. It compares them against the hand-written errors and logs and
counts any difference, so a migrated rule can be evaluated on a live cluster
before it starts rejecting requests.

## Feature gates

* `DeclarativeValidation`:
  makes the API server
  compare declarative and hand-written results for `+k8s:alpha` and `+k8s:beta`
  rules and report mismatches. Declarative validation runs either way; this gate
  only controls reporting.

* `DeclarativeValidationBeta`:
  the global safety switch for `+k8s:beta` rules. Enabled, they are enforced;
  disabled, they fall back to shadow mode.

* `DeclarativeValidationTakeover`:
  replaced by `DeclarativeValidationBeta` and no longer honored. Setting it is
  still accepted.

No gate affects unprefixed tags. The API server always enforces those, because
their hand-written counterparts are already gone.

See Feature Gates
for how to set them.

## Monitoring declarative validation {#metrics}

The API server exposes these metrics:

| Metric | Description |
| --- | --- |
| `declarative_validation_mismatch_total` | Number of times declarative validation results differed from hand-written validation results. |
| `declarative_validation_parity_discrepancies_total` | The same discrepancies, with a `validation_identifier` label that records the group, version, kind, subresource, and operation. |
| `declarative_validation_panic_total` | Number of times declarative validation panicked. |
| `declarative_validation_panics_total` | The same panics, with a `validation_identifier` label. |

Mismatches are also logged. For an enforced (`+k8s:beta`) rule, the log entry
suggests disabling `DeclarativeValidationBeta` to keep data in etcd consistent
with earlier versions of Kubernetes.

## Disabling DeclarativeValidationBeta {#opt-out}

Consider setting `DeclarativeValidationBeta=false` if you see:

* **Unexpected validation behavior:** requests rejected that should be valid, or
  objects accepted that were previously rejected.

* **Performance regressions:** latency increases (for example, in
  `apiserver_request_duration_seconds`) that correlate with the feature.

* **A high mismatch rate:** frequent `declarative_validation_mismatch_total`
  increments affecting your workloads.

To revert `+k8s:beta` rules to shadow mode, pass
`--feature-gates=DeclarativeValidationBeta=false`.

## Considerations for downgrade and rollback

Disabling the gate is a safety mechanism, but note one unlikely edge case: if a
bug let declarative validation persist an invalid object, disabling the gate
makes the correct hand-written validation authoritative again, which can then
block further updates to that object. Fixing it may require editing the stored
object directly.

## Declarative validation tags {#declarative-validation-tag-reference}

### How to read this reference {#how-to-read}

Each tag has a **stability level** — Alpha, Beta, or Stable — describing the
maturity of the *tag itself*. This is separate from the `+k8s:alpha` and
`+k8s:beta` lifecycle prefixes, which describe the maturity of one
*use* of a tag.

The generator's linter uses the stability level to decide where a tag is
allowed:

* In a GA package (for example, `v1`), an unprefixed tag must be Stable.

* In a `beta` package, unprefixed Beta tags are also allowed.

* In an `alpha` package, unprefixed Alpha and Beta tags are also allowed.

* Inside `+k8s:alpha=...`, Alpha tags are allowed; inside `+k8s:beta=...`, Beta
  tags are.

* Inside `+k8s:ifEnabled(...)` or `+k8s:ifDisabled(...)`, Beta tags are allowed
  even in a GA package, because an option already gates the validation.

Each entry also lists the **scopes** where the tag can appear: struct fields,
type definitions, list values, map keys, map values, or constant values.

The generator also registers tags that exist only to test itself
(`+k8s:validateTrue`, `+k8s:validateFalse`, `+k8s:validateError`,
`+k8s:validateTrueAlpha`, `+k8s:validateTrueBeta`). Do not use them in API
definitions. For the authoritative list for a given release, run
`validation-gen --docs` from `k8s.io/code-generator`.

### Tag catalog {#catalog}

| Tag | Description | Stability |
| --- | --- | --- |
| `+k8s:alpha` | Puts a validation tag in shadow mode (metrics only). | Beta |
| `+k8s:beta` | Puts a validation tag in enforced mode (disableable through `DeclarativeValidationBeta`). | Beta |
| `+k8s:customUnique` | Indicates that hand-written validation checks uniqueness for a list. | Stable |
| `+k8s:customValidation` | Calls a hand-written validation function from the generated traversal code. | Stable |
| `+k8s:dependentForbidden` | Indicates that when this field is set, a named sibling field must not be set. | Alpha |
| `+k8s:dependentRequired` | Indicates that when this field is set, a named sibling field must also be set. | Alpha |
| `+k8s:eachKey` | Declares a validation for each key in a map. | Stable |
| `+k8s:eachVal` | Declares a validation for each value in a map or list. | Stable |
| `+k8s:enum` | Indicates that a string type is an enum. | Stable |
| `+k8s:enumExclude` | Excludes a constant from its type's enum values. | Alpha |
| `+k8s:forbidden` | Indicates that a field may not be specified. | Beta |
| `+k8s:format` | Indicates that a string field has a particular format. | Stable |
| `+k8s:ifDisabled` | Declares a validation that only applies when an option is disabled. | Stable |
| `+k8s:ifEnabled` | Declares a validation that only applies when an option is enabled. | Stable |
| `+k8s:ifMode` | Declares a validation that only applies for a given value of a mode discriminator. | Stable |
| `+k8s:immutable` | Indicates that a field may not be updated. | Stable |
| `+k8s:isSubresource` | Specifies that validations in a package only apply to a specific subresource. | Stable |
| `+k8s:item` | Declares a validation for an item of a slice declared as a `+k8s:listType=map`. | Stable |
| `+k8s:listMapKey` | Declares a named sub-field of a list's value-type to be part of the list-map key. | Stable |
| `+k8s:listType` | Declares a list field's semantic type. | Stable |
| `+k8s:maxBytes` | Indicates that a string field has a limit on its length in bytes. | Stable |
| `+k8s:maxItems` | Indicates that a list has a limit on its size. | Stable |
| `+k8s:maxLength` | Indicates that a string field has a limit on its length in characters. | Stable |
| `+k8s:maxProperties` | Indicates that a map has a limit on the number of entries. | Stable |
| `+k8s:maximum` | Indicates that a numeric field has a maximum value. | Stable |
| `+k8s:minItems` | Indicates that a list has a minimum size. | Stable |
| `+k8s:minLength` | Indicates that a string field has a minimum length in characters. | Stable |
| `+k8s:minProperties` | Indicates that a map has a minimum number of entries. | Stable |
| `+k8s:minimum` | Indicates that a numeric field has a minimum value. | Stable |
| `+k8s:modeDiscriminator` | Indicates that this field is a discriminator for state-based validation. | Stable |
| `+k8s:monotonic` | Ensures that a field's value never decreases on update. | Alpha |
| `+k8s:neq` | Verifies that the field's value is not equal to a specific disallowed value. | Alpha |
| `+k8s:opaqueType` | Indicates that the generator ignores any validations declared on the referenced type. | Stable |
| `+k8s:optional` | Indicates that a field is optional to clients. | Stable |
| `+k8s:required` | Indicates that a field must be specified by clients. | Stable |
| `+k8s:subfield` | Declares a validation for a subfield of a struct. | Stable |
| `+k8s:supportsSubresource` | Declares a supported subresource for the types within a package. | Stable |
| `+k8s:unionDiscriminator` | Indicates that this field is the discriminator for a union. | Beta |
| `+k8s:unionMember` | Indicates that this field is a member of a union group. | Stable |
| `+k8s:unique` | Declares that a list field's elements are unique. | Stable |
| `+k8s:update` | Constrains which update transitions are allowed for a field. | Stable |
| `+k8s:zeroOrOneOfMember` | Indicates that this field is a member of a zero-or-one-of group. | Stable |
