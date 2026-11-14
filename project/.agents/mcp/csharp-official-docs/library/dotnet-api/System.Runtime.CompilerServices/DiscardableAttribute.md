---
title: "DiscardableAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.CompilerServices/DiscardableAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DiscardableAttribute class

Namespace: `System.Runtime.CompilerServices`

```csharp
public class DiscardableAttribute : Attribute
```

Marks a type definition as discardable.

#### Remarks
A type definition might be marked discardable if it is not referenced by any other code in its assembly. This might be useful for languages that support separate compilation, where it is only at link phase that it becomes known whether any type is actually referenced by other code.

The classes in `CompilerServices` are for compiler writers' use only.

#### Examples
The following code example demonstrates how to apply the `DiscardableAttribute` attribute to a type.

_Code sample not included: ~/snippets/csharp/System.Runtime.CompilerServices/DiscardableAttribute/Overview/example.cs._

## DiscardableAttribute.DiscardableAttribute() constructor

```csharp
public DiscardableAttribute ();
```

Initializes a new instance of the `DiscardableAttribute` class with default values.

#### Examples
The following code example demonstrates how to apply the `DiscardableAttribute` attribute to a type.

_Code sample not included: ~/snippets/csharp/System.Runtime.CompilerServices/DiscardableAttribute/Overview/example.cs._
