---
title: "LayoutKind enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.InteropServices/LayoutKind.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# LayoutKind enum

Namespace: `System.Runtime.InteropServices`

```csharp
public enum LayoutKind
```

Controls the layout of an object when exported to unmanaged code.

#### Remarks
This enumeration is used with `StructLayoutAttribute`. The common language runtime uses the `Auto` layout value by default. To reduce layout-related problems associated with the `Auto` value, C#, Visual Basic, and C++ compilers specify `Sequential` layout for value types.

> **Important:**
> The `Pack` field controls the alignment of data fields, and thus affects the layout regardless of the `LayoutKind` value you specify. By default, the value of `Pack` is 0, which indicates the default packing size for the current platform. For example, when you use the `Explicit` layout value and specify field alignments on byte boundaries, you must set `Pack` to 1 to get the desired result.

#### Examples
The following example shows the managed declaration of the `PtInRect` function, which checks whether a point lies within a rectangle, and defines a `Point` structure with Sequential layout and a `Rect` structure with Explicit layout.

_Code sample not included: ~/snippets/csharp/System.Runtime.InteropServices/LayoutKind/Overview/layoutkind.cs._

## LayoutKind.Auto field

```csharp
Auto
```

The runtime automatically chooses an appropriate layout for the members of an object in unmanaged memory. Objects defined with this enumeration member cannot be exposed outside of managed code. Attempting to do so generates an exception.

## LayoutKind.Explicit field

```csharp
Explicit
```

The precise position of each member of an object in unmanaged memory is explicitly controlled, subject to the setting of the `StructLayoutAttribute.Pack` field. Each member must use the `FieldOffsetAttribute` to indicate the position of that field within the type.

## LayoutKind.Extended field

```csharp
Extended
```

To be added.

## LayoutKind.Sequential field

```csharp
Sequential
```

The members of the object are laid out sequentially, in the order in which they appear when exported to unmanaged memory. The members are laid out according to the packing specified in `StructLayoutAttribute.Pack`, and can be noncontiguous.
