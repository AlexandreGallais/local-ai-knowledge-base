---
title: "Name resolution (part 1 of 3)"
tool: "rust-reference"
version: "2026-11"
source: "https://github.com/rust-lang/reference/blob/bcd62f35e8bf480ec5b0fa569b6d12ea5924030c/src/names/name-resolution.md"
commit: "bcd62f35e8bf480ec5b0fa569b6d12ea5924030c"
license: "MIT OR Apache-2.0"
---

r[names.resolution]
# Name resolution

r[names.resolution.intro]
_Name resolution_ is the process of tying paths and other identifiers to the declarations of those entities. Names are segregated into different [namespaces], allowing entities in different namespaces to share the same name without conflict. Each name is valid within a [scope], or a region of source text where that name may be referenced. Access to a name may be restricted based on its [visibility].

Name resolution is split into three stages throughout the compilation process. The first stage, *expansion-time resolution*, resolves all [`use` declarations] and [macro invocations]. The second stage, *primary resolution*, resolves all names that have not yet been resolved and that do not depend on type information to resolve. The last stage, *type-relative resolution*, resolves the remaining names once type information is available.

> **Note:**
> Expansion-time resolution is also known as *early resolution*. Primary resolution is also known as *late resolution*.

r[names.resolution.general]
## General

r[names.resolution.general.intro]
The rules within this section apply to all stages of name resolution.

r[names.resolution.general.scopes]
### Scopes

r[names.resolution.general.scopes.intro]
> **Note:**
> This is a placeholder for future expansion about resolution of names within various scopes.

r[names.resolution.expansion]
