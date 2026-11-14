---
title: "Matrix3x2 struct (part 1 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Numerics/Matrix3x2.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Matrix3x2 struct

Namespace: `System.Numerics`

```csharp
public struct Matrix3x2 : IEquatable<System.Numerics.Matrix3x2>
```

Represents a 3x2 matrix.

#### Remarks

## Matrix3x2.Matrix3x2(Single, Single, Single, Single, Single, Single) constructor

```csharp
public Matrix3x2 (float m11, float m12, float m21, float m22, float m31, float m32);
```

Creates a 3x2 matrix from the specified components.

Parameters:

- `m11`: The value to assign to the first element in the first row.
- `m12`: The value to assign to the second element in the first row.
- `m21`: The value to assign to the first element in the second row.
- `m22`: The value to assign to the second element in the second row.
- `m31`: The value to assign to the first element in the third row.
- `m32`: The value to assign to the second element in the third row.

To be added.

## Matrix3x2.Identity property

```csharp
public static System.Numerics.Matrix3x2 Identity { get; }
```

Gets the multiplicative identity matrix.

Returns: The multiplicative identify matrix.

To be added.

## Matrix3x2.IsIdentity property

```csharp
public bool IsIdentity { get; }
```

Indicates whether the current matrix is the identity matrix.

Returns: `true` if the current matrix is the identity matrix; otherwise, `false`.

To be added.

## Matrix3x2.Item property

```csharp
public System.Numerics.Vector2 this[int row] { get; set; }
```

Gets or sets the row at the specified index.

Parameters:

- `row`: The index of the row to get or set.

Returns: The row at index: [`row`].

Exceptions:

- `ArgumentOutOfRangeException`: `row` was less than zero or greater than or equal to the number of rows (`3`).

To be added.

## Matrix3x2.Item property

```csharp
public float this[int row, int column] { get; set; }
```

Gets or sets the element at the specified indices.

Parameters:

- `row`: The index of the row containing the element to get or set.
- `column`: The index of the column containing the element to get or set.

Returns: The element at `row`.

Exceptions:

- `ArgumentOutOfRangeException`: `row` was less than zero or greater than the number of rows.

-or-

`column` was less than zero or greater than the number of columns.

To be added.

## Matrix3x2.Translation property

```csharp
public System.Numerics.Vector2 Translation { get; set; }
```

Gets or sets the translation component of this matrix.

Returns: The translation component of the current instance.

The translation component is stored as `Matrix3x2.Z`.

## Matrix3x2.X property

```csharp
public System.Numerics.Vector2 X { get; set; }
```

Gets or sets the first row of the matrix.

Returns: To be added.

This row comprises `Matrix3x2.M11` and `Matrix3x2.M12`; it exists at index: `[0]`.

## Matrix3x2.Y property

```csharp
public System.Numerics.Vector2 Y { get; set; }
```

Gets or sets the second row of the matrix.

Returns: To be added.

This row comprises `Matrix3x2.M21` and `Matrix3x2.M22`; it exists at index: `[1]`.

## Matrix3x2.Z property

```csharp
public System.Numerics.Vector2 Z { get; set; }
```

Gets or sets the third row of the matrix.

Returns: To be added.

This row comprises `Matrix3x2.M31` and `Matrix3x2.M32`; it exists at index: `[2]`.

## Matrix3x2.Add(Matrix3x2, Matrix3x2) method

```csharp
public static System.Numerics.Matrix3x2 Add (System.Numerics.Matrix3x2 value1, System.Numerics.Matrix3x2 value2);
```

Adds each element in one matrix with its corresponding element in a second matrix.

Parameters:

- `value1`: The first matrix.
- `value2`: The second matrix.

Returns: The matrix that contains the summed values of `value1` and `value2`.

To be added.

## Matrix3x2.Create(Vector2) method

```csharp
public static System.Numerics.Matrix3x2 Create (System.Numerics.Vector2 value);
```

Creates a `Matrix3x2` whose three rows are set to the specified value.

Parameters:

- `value`: The value to assign to all three rows.

Returns: A `Matrix3x2` whose three rows are set to `value`.

To be added.

## Matrix3x2.Create(Single) method

```csharp
public static System.Numerics.Matrix3x2 Create (float value);
```

Creates a `Matrix3x2` whose six elements are set to the specified value.

Parameters:

- `value`: The value to assign to all six elements.

Returns: A `Matrix3x2` whose six elements are set to `value`.

To be added.

## Matrix3x2.Create(Vector2, Vector2, Vector2) method

```csharp
public static System.Numerics.Matrix3x2 Create (System.Numerics.Vector2 x, System.Numerics.Vector2 y, System.Numerics.Vector2 z);
```

Creates a `Matrix3x2` from the specified rows.

Parameters:

- `x`: The value to assign to `Matrix3x2.X`.
- `y`: The value to assign to `Matrix3x2.Y`.
- `z`: The value to assign to `Matrix3x2.Z`.

Returns: A `Matrix3x2` whose rows are set to the specified values.

To be added.

## Matrix3x2.Create(Single, Single, Single, Single, Single, Single) method

```csharp
public static System.Numerics.Matrix3x2 Create (float m11, float m12, float m21, float m22, float m31, float m32);
```

Creates a `Matrix3x2` from the specified elements.

Parameters:

- `m11`: The value to assign to `Matrix3x2.M11`.
- `m12`: The value to assign to `Matrix3x2.M12`.
- `m21`: The value to assign to `Matrix3x2.M21`.
- `m22`: The value to assign to `Matrix3x2.M22`.
- `m31`: The value to assign to `Matrix3x2.M31`.
- `m32`: The value to assign to `Matrix3x2.M32`.

Returns: A `Matrix3x2` whose elements are set to the specified values.

To be added.

## Matrix3x2.CreateRotation(Single) method

```csharp
public static System.Numerics.Matrix3x2 CreateRotation (float radians);
```

Creates a rotation matrix using the given rotation in radians.

Parameters:

- `radians`: The amount of rotation, in radians.

Returns: The rotation matrix.

To be added.

## Matrix3x2.CreateRotation(Single, Vector2) method

```csharp
public static System.Numerics.Matrix3x2 CreateRotation (float radians, System.Numerics.Vector2 centerPoint);
```

Creates a rotation matrix using the specified rotation in radians and a center point.

Parameters:

- `radians`: The amount of rotation, in radians.
- `centerPoint`: The center point.

Returns: The rotation matrix.

To be added.

## Matrix3x2.CreateScale(Vector2) method

```csharp
public static System.Numerics.Matrix3x2 CreateScale (System.Numerics.Vector2 scales);
```

Creates a scaling matrix from the specified vector scale.

Parameters:

- `scales`: The scale to use.

Returns: The scaling matrix.

To be added.

## Matrix3x2.CreateScale(Single) method

```csharp
public static System.Numerics.Matrix3x2 CreateScale (float scale);
```

Creates a scaling matrix that scales uniformly with the given scale.

Parameters:

- `scale`: The uniform scale to use.

Returns: The scaling matrix.

To be added.

## Matrix3x2.CreateScale(Vector2, Vector2) method

```csharp
public static System.Numerics.Matrix3x2 CreateScale (System.Numerics.Vector2 scales, System.Numerics.Vector2 centerPoint);
```

Creates a scaling matrix from the specified vector scale with an offset from the specified center point.

Parameters:

- `scales`: The scale to use.
- `centerPoint`: The center offset.

Returns: The scaling matrix.

To be added.

## Matrix3x2.CreateScale(Single, Vector2) method

```csharp
public static System.Numerics.Matrix3x2 CreateScale (float scale, System.Numerics.Vector2 centerPoint);
```

Creates a scaling matrix that scales uniformly with the specified scale with an offset from the specified center.

Parameters:

- `scale`: The uniform scale to use.
- `centerPoint`: The center offset.

Returns: The scaling matrix.

To be added.

## Matrix3x2.CreateScale(Single, Single) method

```csharp
public static System.Numerics.Matrix3x2 CreateScale (float xScale, float yScale);
```

Creates a scaling matrix from the specified X and Y components.

Parameters:

- `xScale`: The value to scale by on the X axis.
- `yScale`: The value to scale by on the Y axis.

Returns: The scaling matrix.

To be added.

## Matrix3x2.CreateScale(Single, Single, Vector2) method

```csharp
public static System.Numerics.Matrix3x2 CreateScale (float xScale, float yScale, System.Numerics.Vector2 centerPoint);
```

Creates a scaling matrix that is offset by a given center point.

Parameters:

- `xScale`: The value to scale by on the X axis.
- `yScale`: The value to scale by on the Y axis.
- `centerPoint`: The center point.

Returns: The scaling matrix.

To be added.

## Matrix3x2.CreateSkew(Single, Single) method

```csharp
public static System.Numerics.Matrix3x2 CreateSkew (float radiansX, float radiansY);
```

Creates a skew matrix from the specified angles in radians.

Parameters:

- `radiansX`: The X angle, in radians.
- `radiansY`: The Y angle, in radians.

Returns: The skew matrix.

To be added.

## Matrix3x2.CreateSkew(Single, Single, Vector2) method

```csharp
public static System.Numerics.Matrix3x2 CreateSkew (float radiansX, float radiansY, System.Numerics.Vector2 centerPoint);
```

Creates a skew matrix from the specified angles in radians and a center point.

Parameters:

- `radiansX`: The X angle, in radians.
- `radiansY`: The Y angle, in radians.
- `centerPoint`: The center point.

Returns: The skew matrix.

To be added.

## Matrix3x2.CreateTranslation(Vector2) method

```csharp
public static System.Numerics.Matrix3x2 CreateTranslation (System.Numerics.Vector2 position);
```

Creates a translation matrix from the specified 2-dimensional vector.

Parameters:

- `position`: The translation position.

Returns: The translation matrix.

To be added.

## Matrix3x2.CreateTranslation(Single, Single) method

```csharp
public static System.Numerics.Matrix3x2 CreateTranslation (float xPosition, float yPosition);
```

Creates a translation matrix from the specified X and Y components.

Parameters:

- `xPosition`: The X position.
- `yPosition`: The Y position.

Returns: The translation matrix.

To be added.

## Matrix3x2.Equals(Matrix3x2) method

```csharp
public readonly bool Equals (System.Numerics.Matrix3x2 other);
```

Returns a value that indicates whether this instance and another 3x2 matrix are equal.

Parameters:

- `other`: The other matrix.

Returns: `true` if the two matrices are equal; otherwise, `false`.

#### Remarks
Two matrices are equal if all their corresponding elements are equal.

## Matrix3x2.Equals(Object) method

```csharp
public override readonly bool Equals (object? obj);
```

Returns a value that indicates whether this instance and a specified object are equal.

Parameters:

- `obj`: The object to compare with the current instance.

Returns: `true` if the current instance and `obj` are equal; otherwise, `false`. If `obj` is `null`, the method returns `false`.

#### Remarks
The current instance and `obj` are equal if `obj` is a `Matrix3x2` object and the corresponding elements of each matrix are equal.

## Matrix3x2.GetDeterminant() method

```csharp
public readonly float GetDeterminant ();
```

Calculates the determinant for this matrix.

Returns: The determinant.

#### Remarks
The determinant is calculated by expanding the matrix with a third column whose values are (0,0,1).

## Matrix3x2.GetElement(Int32, Int32) method

```csharp
public readonly float GetElement (int row, int column);
```

Gets the element at the specified row and column.

Parameters:

- `row`: The index of the row containing the element to get.
- `column`: The index of the column containing the element to get.

Returns: The element at index: [`row`, `column`].

Exceptions:

- `ArgumentOutOfRangeException`: `row` was less than zero or greater than or equal to the number of rows (`3`).

-or-

`column` was less than zero or greater than or equal to the number of columns (`2`).

To be added.

## Matrix3x2.GetHashCode() method

```csharp
public override readonly int GetHashCode ();
```

Returns the hash code for this instance.

Returns: The hash code.

To be added.

## Matrix3x2.GetRow(Int32) method

```csharp
public readonly System.Numerics.Vector2 GetRow (int index);
```

Gets or sets the row at the specified index.

Parameters:

- `index`: The index of the row to get.

Returns: The row at index: [`index`].

Exceptions:

- `ArgumentOutOfRangeException`: `index` was less than zero or greater than or equal to the number of rows (`3`).

To be added.

## Matrix3x2.Invert(Matrix3x2, Matrix3x2) method

```csharp
public static bool Invert (System.Numerics.Matrix3x2 matrix, out System.Numerics.Matrix3x2 result);
```

Inverts the specified matrix. The return value indicates whether the operation succeeded.

Parameters:

- `matrix`: The matrix to invert.
- `result`: When this method returns, contains the inverted matrix if the operation succeeded.

Returns: `true` if `matrix` was converted successfully; otherwise,  `false`.

To be added.

## Matrix3x2.Lerp(Matrix3x2, Matrix3x2, Single) method

```csharp
public static System.Numerics.Matrix3x2 Lerp (System.Numerics.Matrix3x2 matrix1, System.Numerics.Matrix3x2 matrix2, float amount);
```

Performs a linear interpolation from one matrix to a second matrix based on a value that specifies the weighting of the second matrix.

Parameters:

- `matrix1`: The first matrix.
- `matrix2`: The second matrix.
- `amount`: The relative weighting of `matrix2`.

Returns: The interpolated matrix.

To be added.

## Matrix3x2.Multiply(Matrix3x2, Matrix3x2) method

```csharp
public static System.Numerics.Matrix3x2 Multiply (System.Numerics.Matrix3x2 value1, System.Numerics.Matrix3x2 value2);
```

Returns the matrix that results from multiplying two matrices together.

Parameters:

- `value1`: The first matrix.
- `value2`: The second matrix.

Returns: The product matrix.

To be added.

## Matrix3x2.Multiply(Matrix3x2, Single) method

```csharp
public static System.Numerics.Matrix3x2 Multiply (System.Numerics.Matrix3x2 value1, float value2);
```

Returns the matrix that results from scaling all the elements of a specified matrix by a scalar factor.

Parameters:

- `value1`: The matrix to scale.
- `value2`: The scaling value to use.

Returns: The scaled matrix.

To be added.

## Matrix3x2.Negate(Matrix3x2) method

```csharp
public static System.Numerics.Matrix3x2 Negate (System.Numerics.Matrix3x2 value);
```

Negates the specified matrix by multiplying all its values by -1.

Parameters:

- `value`: The matrix to negate.

Returns: The negated matrix.

To be added.

## Matrix3x2.op_Addition(Matrix3x2, Matrix3x2) method

```csharp
public static System.Numerics.Matrix3x2 operator + (System.Numerics.Matrix3x2 value1, System.Numerics.Matrix3x2 value2);
```

Adds each element in one matrix with its corresponding element in a second matrix.

Parameters:

- `value1`: The first matrix.
- `value2`: The second matrix.

Returns: The matrix that contains the summed values.

#### Remarks
The `Matrix3x2.op_Addition` method defines the operation of the addition operator for `Matrix3x2` objects.
