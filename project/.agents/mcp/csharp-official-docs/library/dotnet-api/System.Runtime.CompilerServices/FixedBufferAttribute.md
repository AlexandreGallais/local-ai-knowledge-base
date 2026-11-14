---
title: "FixedBufferAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.CompilerServices/FixedBufferAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# FixedBufferAttribute class

Namespace: `System.Runtime.CompilerServices`

```csharp
public sealed class FixedBufferAttribute : Attribute
```

Indicates that a field should be treated as containing a fixed number of elements of the specified primitive type. This class cannot be inherited.

#### Remarks
Apply the `FixedBufferAttribute` attribute to a field to indicate that it should be treated as a fixed-length inline array. The type of the field that the attribute is applied to must have a size that can contain the indicated number of elements.

## FixedBufferAttribute.FixedBufferAttribute(Type, Int32) constructor

```csharp
public FixedBufferAttribute (Type elementType, int length);
```

Initializes a new instance of the `FixedBufferAttribute` class.

Parameters:

- `elementType`: The type of the elements contained in the buffer.
- `length`: The number of elements in the buffer.

To be added.

## FixedBufferAttribute.ElementType property

```csharp
public Type ElementType { get; }
```

Gets the type of the elements contained in the fixed buffer.

Returns: The type of the elements.

To be added.

## FixedBufferAttribute.Length property

```csharp
public int Length { get; }
```

Gets the number of elements in the fixed buffer.

Returns: The number of elements in the fixed buffer.

To be added.
