---
title: "UnscopedRefAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics.CodeAnalysis/UnscopedRefAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# UnscopedRefAttribute class

Namespace: `System.Diagnostics.CodeAnalysis`

```csharp
public sealed class UnscopedRefAttribute : Attribute
```

Used to indicate a byref escapes and is not scoped.

#### Remarks

There are several cases where the C# compiler treats a `ref` as implicitly `scoped`, where the compiler doesn't allow the `ref` to escape the method. For example:

- `this` for `struct` instance methods.
- `ref` parameters that refer to `ref struct` types.
- `out` parameters.

This attribute is used in those instances where the `ref` should be allowed to escape.

Applying this attribute, in any form, affects consumers of the applicable API. It's necessary for API authors to understand the lifetime implications of applying this attribute and how it might impact their users.

This attribute is specially recognized by the runtime. ECMA-335 augment III.1.7.7 defines restrictions on valid IL that references this attribute. For example, when this attribute is applied to an instance method of a value type, the `this` argument is allowed to escape the method. When the attribute is absent, an optimizing compiler can rely on `this` not escaping to further optimize certain code patterns, such as eliminating boxing. For more information, see the ECMA-335 CLI Specification Addendum, Sec. III.1.7.7 ("Opt-in restrictions").

Because the runtime relies on this attribute, it can't be stripped from an assembly. The restrictions defined by augment III.1.7.7 apply only when the `RefSafetyRulesAttribute` is present on the module, so this attribute has its documented effect only in a module that's also annotated with `RefSafetyRulesAttribute`.

## UnscopedRefAttribute.UnscopedRefAttribute() constructor

```csharp
public UnscopedRefAttribute ();
```

Initializes a new instance of the `UnscopedRefAttribute` class.

To be added.
