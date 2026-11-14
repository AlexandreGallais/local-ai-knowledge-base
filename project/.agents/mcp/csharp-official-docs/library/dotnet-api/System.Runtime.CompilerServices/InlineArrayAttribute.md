---
title: "InlineArrayAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.CompilerServices/InlineArrayAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# InlineArrayAttribute class

Namespace: `System.Runtime.CompilerServices`

```csharp
public sealed class InlineArrayAttribute : Attribute
```

Indicates that the instance's storage is sequentially replicated `InlineArrayAttribute.Length` times.

#### Remarks

This attribute can be used to annotate a `struct` type with a single field. The runtime replicates that field in the actual type layout as many times as is specified.

> **Important:**
> In .NET 9 and later versions, the default implementations of `Equals()` and `GetHashCode()` for types marked with this attribute throw `NotSupportedException`. You must override both `Equals` and `ValueType.GetHashCode` if they will be used.

The following example shows how to declare an inline array type with eight `float` values.

```csharp

      [InlineArray(8)]
      struct Float8InlineArray
      {
          private float _value;
      }
      
```

## InlineArrayAttribute.InlineArrayAttribute(Int32) constructor

```csharp
public InlineArrayAttribute (int length);
```

Creates a new `InlineArrayAttribute` instance with the specified length.

Parameters:

- `length`: The number of sequential fields to replicate in the inline array type.

To be added.

## InlineArrayAttribute.Length property

```csharp
public int Length { get; }
```

Gets the number of sequential fields to replicate in the inline array type.

Returns: The number of sequential fields to replicate in the inline array type.

To be added.
