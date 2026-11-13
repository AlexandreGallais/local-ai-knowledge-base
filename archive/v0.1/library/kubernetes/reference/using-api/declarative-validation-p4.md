---
title: "Declarative API Validation (part 4 of 4)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/using-api/declarative-validation.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Declarative API Validation (part 4 of 4)

### `+k8s:update` {#tag-update}

**Description:**

Provides constraints on the allowed update operations of a field. You can specify
multiple constraints by using multiple tags.

| Constraint | Effect |
| --- | --- |
| `NoSet` | Prevents unset to set transitions. |
| `NoUnset` | Prevents set to unset transitions. |
| `NoModify` | Prevents value changes, but allows set and unset transitions. |
| `NoAddItem` | Prevents adding items to a slice or map. |
| `NoRemoveItem` | Prevents removing items from a slice or map. |

For non-pointer structs, `NoSet` and `NoUnset` have no effect, because you cannot
unset these fields. For slice and map fields, "unset" means `len == 0`. Slice
item identity for `NoAddItem` and `NoRemoveItem` comes from
`+k8s:listType`, `+k8s:listMapKey`, and
`+k8s:unique`; for maps, the key is the item identity.

`NoModify` is not supported directly on slices or maps; use
`+k8s:eachVal=+k8s:update=NoModify` for per-item immutability. On lists,
`+k8s:eachVal=+k8s:update=NoModify` requires `listType=map` or `unique=map`,
because otherwise content changes are not detectable.

**Stability level:** Stable

**Scopes:** struct fields, list values, map values

**Payload:**

* `NoSet | NoUnset | NoModify | NoAddItem | NoRemoveItem`

**Usage example:**

```go
type MyStruct struct {
    // Set-once: may be set at any time, but never changed or cleared.
    // +k8s:update=NoModify
    // +k8s:update=NoUnset
    SetOnce *string `json:"setOnce,omitempty"`

    // Must be set at creation or never.
    // +k8s:update=NoSet
    AtCreationOnly *string `json:"atCreationOnly,omitempty"`

    // Freeze the shape of the list; individual items may still change.
    // +k8s:listType=map
    // +k8s:listMapKey=key
    // +k8s:update=NoAddItem
    // +k8s:update=NoRemoveItem
    FrozenShape []Item `json:"frozenShape"`
}
```

### `+k8s:zeroOrOneOfMember` {#tag-zeroOrOneOfMember}

**Description:**

Indicates that this field is a member of a zero-or-one-of union. A zero-or-one-of
union allows at most one member to be set. Unlike regular unions, having no
members set is valid.

**Stability level:** Stable

**Scopes:** struct fields, list values

This tag is intended for sets of list items, applied through
`+k8s:item`, rather than for struct fields directly.

**Arguments:**

* `union` (string, optional): the name of the union, if more than one exists.
* `memberName` (string, optional): the custom member name for this member.
  Defaults to the field's name.

**Usage example:**

```go
type MyStruct struct {
    // +k8s:listType=map
    // +k8s:listMapKey=type
    // +k8s:item(type: "Approved")=+k8s:zeroOrOneOfMember
    // +k8s:item(type: "Denied")=+k8s:zeroOrOneOfMember
    Conditions []MyCondition `json:"conditions"`
}

type MyCondition struct {
    Type   string `json:"type"`
    Status string `json:"status"`
}
```

In this example, at most one of the "Approved" and "Denied" conditions can be
present. It is also valid for neither to be present.

## What's next

* Read about Feature Gates
* Read KEP-5073: Declarative Validation Of Kubernetes Native Types
