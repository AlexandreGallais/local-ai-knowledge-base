---
title: "ContextStaticAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/ContextStaticAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ContextStaticAttribute class

Namespace: `System`

```csharp
public class ContextStaticAttribute : Attribute
```

Indicates that the value of a static field is unique for a particular context.

#### Remarks
A static field marked with `ContextStaticAttribute` is not shared between contexts. If the indicated static field is accessed on a different context, it will contain a different value. Use this attribute as it is, and do not derive from it.

The following example shows the syntax of this attribute:

[ContextStatic]

static int f=7;

For more information about using attributes, see Attributes.

## ContextStaticAttribute.ContextStaticAttribute() constructor

```csharp
public ContextStaticAttribute ();
```

Initializes a new instance of the `ContextStaticAttribute` class.

To be added.
