---
title: "AllowNullAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics.CodeAnalysis/AllowNullAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# AllowNullAttribute class

Namespace: `System.Diagnostics.CodeAnalysis`

```csharp
public sealed class AllowNullAttribute : Attribute
```

Specifies that `null` is allowed as an input even if the corresponding type disallows it.

To override a method that has a parameter annotated with this attribute, use the `?` operator. For example: `override ISet<Enum> ReadJson(JsonReader reader, Type objectType, ISet<Enum>? existingValue, bool hasExistingValue, JsonSerializer serializer)`. For more information, see Nullable static analysis in the C# guide.

## AllowNullAttribute.AllowNullAttribute() constructor

```csharp
public AllowNullAttribute ();
```

Initializes a new instance of the `AllowNullAttribute` class.

To be added.
