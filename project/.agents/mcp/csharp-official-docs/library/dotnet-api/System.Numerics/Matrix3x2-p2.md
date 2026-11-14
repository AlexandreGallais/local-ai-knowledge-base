---
title: "Matrix3x2 struct (part 2 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Numerics/Matrix3x2.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Matrix3x2 struct (part 2 of 2)

## Matrix3x2.op_Equality(Matrix3x2, Matrix3x2) method

```csharp
public static bool operator == (System.Numerics.Matrix3x2 value1, System.Numerics.Matrix3x2 value2);
```

Returns a value that indicates whether the specified matrices are equal.

Parameters:

- `value1`: The first matrix to compare.
- `value2`: The second matrix to compare.

Returns: `true` if `value1` and `value2` are equal; otherwise, `false`.

#### Remarks
Two matrices are equal if all their corresponding elements are equal.

## Matrix3x2.op_Inequality(Matrix3x2, Matrix3x2) method

```csharp
public static bool operator != (System.Numerics.Matrix3x2 value1, System.Numerics.Matrix3x2 value2);
```

Returns a value that indicates whether the specified matrices are not equal.

Parameters:

- `value1`: The first matrix to compare.
- `value2`: The second matrix to compare.

Returns: `true` if `value1` and `value2` are not equal; otherwise, `false`.

To be added.

## Matrix3x2.op_Multiply(Matrix3x2, Matrix3x2) method

```csharp
public static System.Numerics.Matrix3x2 operator * (System.Numerics.Matrix3x2 value1, System.Numerics.Matrix3x2 value2);
```

Returns the matrix that results from multiplying two matrices together.

Parameters:

- `value1`: The first matrix.
- `value2`: The second matrix.

Returns: The product matrix.

#### Remarks
The `Matrix3x2.op_Multiply` method defines the operation of the multiplication operator for `Matrix3x2` objects.

## Matrix3x2.op_Multiply(Matrix3x2, Single) method

```csharp
public static System.Numerics.Matrix3x2 operator * (System.Numerics.Matrix3x2 value1, float value2);
```

Returns the matrix that results from scaling all the elements of a specified matrix by a scalar factor.

Parameters:

- `value1`: The matrix to scale.
- `value2`: The scaling value to use.

Returns: The scaled matrix.

#### Remarks
The `Matrix3x2.op_Multiply` method defines the operation of the multiplication operator for `Matrix3x2` objects.

## Matrix3x2.op_Subtraction(Matrix3x2, Matrix3x2) method

```csharp
public static System.Numerics.Matrix3x2 operator - (System.Numerics.Matrix3x2 value1, System.Numerics.Matrix3x2 value2);
```

Subtracts each element in a second matrix from its corresponding element in a first matrix.

Parameters:

- `value1`: The first matrix.
- `value2`: The second matrix.

Returns: The matrix containing the values that result from subtracting each element in `value2` from its corresponding element in `value1`.

#### Remarks
The `Matrix3x2.Subtract` method defines the operation of the subtraction operator for `Matrix3x2` objects.

## Matrix3x2.op_UnaryNegation(Matrix3x2) method

```csharp
public static System.Numerics.Matrix3x2 operator - (System.Numerics.Matrix3x2 value);
```

Negates the specified matrix by multiplying all its values by -1.

Parameters:

- `value`: The matrix to negate.

Returns: The negated matrix.

To be added.

## Matrix3x2.Subtract(Matrix3x2, Matrix3x2) method

```csharp
public static System.Numerics.Matrix3x2 Subtract (System.Numerics.Matrix3x2 value1, System.Numerics.Matrix3x2 value2);
```

Subtracts each element in a second matrix from its corresponding element in a first matrix.

Parameters:

- `value1`: The first matrix.
- `value2`: The second matrix.

Returns: The matrix containing the values that result from subtracting each element in `value2` from its corresponding element in `value1`.

To be added.

## Matrix3x2.ToString() method

```csharp
public override readonly string ToString ();
```

Returns a string that represents this matrix.

Returns: The string representation of this matrix.

#### Remarks
The numeric values in the returned string are formatted by using the conventions of the current culture. For example, for the en-US culture, the returned string might appear as `{ {M11:1.1 M12:1.2} {M21:2.1 M22:2.2} {M31:3.1 M32:3.2} }`.

## Matrix3x2.WithElement(Int32, Int32, Single) method

```csharp
public readonly System.Numerics.Matrix3x2 WithElement (int row, int column, float value);
```

Creates a new `Matrix3x2` with the element at the specified row and column set to the given value and the remaining elements set to the same value as that in the current matrix.

Parameters:

- `row`: The index of the row containing the element to replace.
- `column`: The index of the column containing the element to replace.
- `value`: The value to assign to the element at index: [`row`, `column`].

Returns: A `Matrix3x2` with the value of the element at index: [`row`, `column`] set to `value` and the remaining elements set to the same value as that in the current matrix.

Exceptions:

- `ArgumentOutOfRangeException`: `row` was less than zero or greater than or equal to the number of rows (`3`).

-or-

`column` was less than zero or greater than or equal to the number of columns (`2`).

To be added.

## Matrix3x2.WithRow(Int32, Vector2) method

```csharp
public readonly System.Numerics.Matrix3x2 WithRow (int index, System.Numerics.Vector2 value);
```

Creates a new `Matrix3x2` with the row at the specified index set to the given value and the remaining rows set to the same value as that in the current matrix.

Parameters:

- `index`: The index of the row to replace.
- `value`: The value to assign to the row at index: [`index`].

Returns: A `Matrix3x2` with the value of the row at index: [`index`] set to `value` and the remaining rows set to the same value as that in the current matrix.

Exceptions:

- `ArgumentOutOfRangeException`: `index` was less than zero or greater than or equal to the number of rows (`3`).

To be added.

## Matrix3x2.M11 field

```csharp
public float M11;
```

The first element of the first row.

This element exists at index: `[0, 0]` and is part of row `Matrix3x2.X`.

## Matrix3x2.M12 field

```csharp
public float M12;
```

The second element of the first row.

This element exists at index: `[0, 1]` and is part of row `Matrix3x2.X`.

## Matrix3x2.M21 field

```csharp
public float M21;
```

The first element of the second row.

This element exists at index: `[1, 0]` and is part of row `Matrix3x2.Y`.

## Matrix3x2.M22 field

```csharp
public float M22;
```

The second element of the second row.

This element exists at index: `[1, 1]` and is part of row `Matrix3x2.Y`.

## Matrix3x2.M31 field

```csharp
public float M31;
```

The first element of the third row.

This element exists at index: `[2, 0]` and is part of row `Matrix3x2.Z`.

## Matrix3x2.M32 field

```csharp
public float M32;
```

The second element of the third row.

This element exists at index: `[2, 1]` and is part of row `Matrix3x2.Z`.
