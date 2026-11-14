---
title: "FieldOffsetAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.InteropServices/FieldOffsetAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# FieldOffsetAttribute class

Namespace: `System.Runtime.InteropServices`

```csharp
public sealed class FieldOffsetAttribute : Attribute
```

Indicates the physical position of fields within the unmanaged representation of a class or structure.

#### Remarks
You can apply this attribute to fields.

This attribute is used when `StructLayoutAttribute`, with `Explicit` passed to its constructor, is applied to a class or structure to specify the offset of each non- `static` or constant member within the unmanaged representation of that class or structure.

#### Examples
The following example demonstrates how to apply the `FieldOffsetAttribute` to members of a struct or class with an explicit layout.

_Code sample not included: ~/snippets/csharp/System.Runtime.InteropServices/FieldOffsetAttribute/Overview/source.cs._

For a larger example, see the `StructLayoutAttribute` class.

## FieldOffsetAttribute.FieldOffsetAttribute(Int32) constructor

```csharp
public FieldOffsetAttribute (int offset);
```

Initializes a new instance of the `FieldOffsetAttribute` class with the offset in the structure to the beginning of the field.

Parameters:

- `offset`: The offset in bytes from the beginning of the structure to the beginning of the field.

To be added.

## FieldOffsetAttribute.Value property

```csharp
public int Value { get; }
```

Gets the offset from the beginning of the structure to the beginning of the field.

Returns: The offset from the beginning of the structure to the beginning of the field.

To be added.
