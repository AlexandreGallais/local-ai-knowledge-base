---
title: "RefSafetyRulesAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.CompilerServices/RefSafetyRulesAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# RefSafetyRulesAttribute class

Namespace: `System.Runtime.CompilerServices`

```csharp
public sealed class RefSafetyRulesAttribute : Attribute
```

Indicates the language version of the ref safety rules used when the module was compiled.

#### Remarks

This attribute is specially recognized by the runtime. ECMA-335 augment III.1.7.7 defines restrictions on valid IL that references this attribute. Applying this attribute to a module opts the module into further restrictions based on the version value specified in the attribute, which permits an optimizing compiler to further optimize certain code patterns. For more information, see the ECMA-335 CLI Specification Addendum, Sec. III.1.7.7 ("Opt-in restrictions").

Because the runtime relies on this attribute, it can't be stripped from an assembly.

## RefSafetyRulesAttribute.RefSafetyRulesAttribute(Int32) constructor

```csharp
public RefSafetyRulesAttribute (int version);
```

Initializes a new instance of the `RefSafetyRulesAttribute` class.

Parameters:

- `version`: The language version of the ref safety rules used when the module was compiled.

To be added.

## RefSafetyRulesAttribute.Version property

```csharp
public int Version { get; }
```

Gets the language version of the ref safety rules used when the module was compiled.

Returns: To be added.

To be added.
