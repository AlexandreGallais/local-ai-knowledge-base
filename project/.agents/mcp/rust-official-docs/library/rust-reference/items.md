---
title: "Items"
tool: "rust-reference"
version: "2026-11"
source: "https://github.com/rust-lang/reference/blob/bcd62f35e8bf480ec5b0fa569b6d12ea5924030c/src/items.md"
commit: "bcd62f35e8bf480ec5b0fa569b6d12ea5924030c"
license: "MIT OR Apache-2.0"
---

r[items]
# Items

r[items.syntax]
```grammar
Item ->
    OuterAttribute* ( VisItem | MacroItem )

VisItem ->
    Visibility?
    (
        Module
      | ExternCrate
      | UseDeclaration
      | Function
      | TypeAlias
      | Struct
      | Enumeration
      | Union
      | ConstantItem
      | StaticItem
      | Trait
      | Implementation
      | ExternBlock
    )

MacroItem ->
      MacroInvocationSemi
    | MacroRulesDefinition
```

r[items.intro]
An _item_ is a component of a crate. Items are organized within a crate by a nested set of [modules]. Every crate has a single "outermost" anonymous module; all further items within the crate have [paths] within the module tree of the crate.

r[items.static-def]
Items are entirely determined at compile-time, generally remain fixed during execution, and may reside in read-only memory.

r[items.kinds]
There are several kinds of items:

* [modules]
* [`extern crate` declarations]
* [`use` declarations]
* [function definitions]
* [type alias definitions]
* [struct definitions]
* [enumeration definitions]
* [union definitions]
* [constant items]
* [static items]
* [trait definitions]
* [implementations]
* [`extern` blocks]

r[items.locations]
Items may be declared in the [root of the crate], a module, or a [block expression].

r[items.associated-locations]
A subset of items, called [associated items], may be declared in [traits] and [implementations].

r[items.extern-locations]
A subset of items, called external items, may be declared in [`extern` blocks].

r[items.decl-order]
Items may be defined in any order, with the exception of [`macro_rules`] which has its own scoping behavior.

r[items.name-resolution]
[Name resolution] of item names allows items to be defined before or after where the item is referred to in the module or block.

See [item scopes] for information on the scoping rules of items.
