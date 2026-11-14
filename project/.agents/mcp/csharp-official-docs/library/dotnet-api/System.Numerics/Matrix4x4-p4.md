---
title: "Matrix4x4 struct (part 4 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Numerics/Matrix4x4.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Matrix4x4 struct (part 4 of 4)

## Matrix4x4.WithRow(Int32, Vector4) method

```csharp
public readonly System.Numerics.Matrix4x4 WithRow (int index, System.Numerics.Vector4 value);
```

Creates a new `Matrix4x4` with the row at the specified index set to the given value and the remaining rows set to the same value as that in the current matrix.

Parameters:

- `index`: The index of the row to replace.
- `value`: The value to assign to the row at index: [`index`].

Returns: A `Matrix4x4` with the value of the row at index: [`index`] set to `value` and the remaining rows set to the same value as that in the current matrix.

Exceptions:

- `ArgumentOutOfRangeException`: `index` was less than zero or greater than or equal to the number of rows (`4`).

To be added.

## Matrix4x4.M11 field

```csharp
public float M11;
```

The first element of the first row.

This element exists at index: `[0, 0]` and is part of row `Matrix4x4.X`.

## Matrix4x4.M12 field

```csharp
public float M12;
```

The second element of the first row.

This element exists at index: `[0, 1]` and is part of row `Matrix4x4.X`.

## Matrix4x4.M13 field

```csharp
public float M13;
```

The third element of the first row.

This element exists at index: `[0, 2]` and is part of row `Matrix4x4.X`.

## Matrix4x4.M14 field

```csharp
public float M14;
```

The fourth element of the first row.

This element exists at index: `[0, 3]` and is part of row `Matrix4x4.X`.

## Matrix4x4.M21 field

```csharp
public float M21;
```

The first element of the second row.

This element exists at index: `[1, 0]` and is part of row `Matrix4x4.Y`.

## Matrix4x4.M22 field

```csharp
public float M22;
```

The second element of the second row.

This element exists at index: `[1, 1]` and is part of row `Matrix4x4.Y`.

## Matrix4x4.M23 field

```csharp
public float M23;
```

The third element of the second row.

This element exists at index: `[1, 2]` and is part of row `Matrix4x4.Y`.

## Matrix4x4.M24 field

```csharp
public float M24;
```

The fourth element of the second row.

This element exists at index: `[1, 3]` and is part of row `Matrix4x4.Y`.

## Matrix4x4.M31 field

```csharp
public float M31;
```

The first element of the third row.

This element exists at index: `[2, 0]` and is part of row `Matrix4x4.Z`.

## Matrix4x4.M32 field

```csharp
public float M32;
```

The second element of the third row.

This element exists at index: `[2, 1]` and is part of row `Matrix4x4.Z`.

## Matrix4x4.M33 field

```csharp
public float M33;
```

The third element of the third row.

This element exists at index: `[2, 2]` and is part of row `Matrix4x4.Z`.

## Matrix4x4.M34 field

```csharp
public float M34;
```

The fourth element of the third row.

This element exists at index: `[2, 3]` and is part of row `Matrix4x4.Z`.

## Matrix4x4.M41 field

```csharp
public float M41;
```

The first element of the fourth row.

This element exists at index: `[3, 0]` and is part of row `Matrix4x4.W`.

## Matrix4x4.M42 field

```csharp
public float M42;
```

The second element of the fourth row.

This element exists at index: `[3, 1]` and is part of row `Matrix4x4.W`.

## Matrix4x4.M43 field

```csharp
public float M43;
```

The third element of the fourth row.

This element exists at index: `[3, 2]` and is part of row `Matrix4x4.W`.

## Matrix4x4.M44 field

```csharp
public float M44;
```

The fourth element of the fourth row.

This element exists at index: `[3, 3]` and is part of row `Matrix4x4.W`.
