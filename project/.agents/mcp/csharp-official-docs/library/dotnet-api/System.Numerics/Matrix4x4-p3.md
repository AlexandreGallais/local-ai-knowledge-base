---
title: "Matrix4x4 struct (part 3 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Numerics/Matrix4x4.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Matrix4x4 struct (part 3 of 4)

## Matrix4x4.CreateTranslation(Vector3) method

```csharp
public static System.Numerics.Matrix4x4 CreateTranslation (System.Numerics.Vector3 position);
```

Creates a translation matrix from the specified 3-dimensional vector.

Parameters:

- `position`: The amount to translate in each axis.

Returns: The translation matrix.

To be added.

## Matrix4x4.CreateTranslation(Single, Single, Single) method

```csharp
public static System.Numerics.Matrix4x4 CreateTranslation (float xPosition, float yPosition, float zPosition);
```

Creates a translation matrix from the specified X, Y, and Z components.

Parameters:

- `xPosition`: The amount to translate on the X axis.
- `yPosition`: The amount to translate on the Y axis.
- `zPosition`: The amount to translate on the Z axis.

Returns: The translation matrix.

To be added.

## Matrix4x4.CreateViewport(Single, Single, Single, Single, Single, Single) method

```csharp
public static System.Numerics.Matrix4x4 CreateViewport (float x, float y, float width, float height, float minDepth, float maxDepth);
```

Creates a right-handed viewport matrix from the specified parameters.

Parameters:

- `x`: X coordinate of the viewport upper left corner.
- `y`: Y coordinate of the viewport upper left corner.
- `width`: Viewport width.
- `height`: Viewport height.
- `minDepth`: Viewport minimum depth.
- `maxDepth`: Viewport maximum depth.

Returns: The right-handed viewport matrix.

Viewport matrix
|   width / 2   |        0       |          0          | 0 |
|       0       |   -height / 2  |          0          | 0 |
|       0       |        0       | minDepth - maxDepth | 0 |
| x + width / 2 | y + height / 2 |       minDepth      | 1 |

## Matrix4x4.CreateViewportLeftHanded(Single, Single, Single, Single, Single, Single) method

```csharp
public static System.Numerics.Matrix4x4 CreateViewportLeftHanded (float x, float y, float width, float height, float minDepth, float maxDepth);
```

Creates a left-handed viewport matrix from the specified parameters.

Parameters:

- `x`: X coordinate of the viewport upper left corner.
- `y`: Y coordinate of the viewport upper left corner.
- `width`: Viewport width.
- `height`: Viewport height.
- `minDepth`: Viewport minimum depth.
- `maxDepth`: Viewport maximum depth.

Returns: The left-handed viewport matrix.

Viewport matrix

|   width / 2   |        0       |          0          | 0 |
|       0       |   -height / 2  |          0          | 0 |
|       0       |        0       | maxDepth - minDepth | 0 |
| x + width / 2 | y + height / 2 |       minDepth      | 1 |

## Matrix4x4.CreateWorld(Vector3, Vector3, Vector3) method

```csharp
public static System.Numerics.Matrix4x4 CreateWorld (System.Numerics.Vector3 position, System.Numerics.Vector3 forward, System.Numerics.Vector3 up);
```

Creates a world matrix with the specified parameters.

Parameters:

- `position`: The position of the object.
- `forward`: The forward direction of the object.
- `up`: The upward direction of the object. Its value is usually `[0, 1, 0]`.

Returns: The world matrix.

#### Remarks
`position` is used in translation operations.

## Matrix4x4.Decompose(Matrix4x4, Vector3, Quaternion, Vector3) method

```csharp
public static bool Decompose (System.Numerics.Matrix4x4 matrix, out System.Numerics.Vector3 scale, out System.Numerics.Quaternion rotation, out System.Numerics.Vector3 translation);
```

Attempts to extract the scale, translation, and rotation components from the given scale, rotation, or translation matrix. The return value indicates whether the operation succeeded.

Parameters:

- `matrix`: The source matrix.
- `scale`: When this method returns, contains the scaling component of the transformation matrix if the operation succeeded.
- `rotation`: When this method returns, contains the rotation component of the transformation matrix if the operation succeeded.
- `translation`: When the method returns, contains the translation component of the transformation matrix if the operation succeeded.

Returns: `true` if `matrix` was decomposed successfully; otherwise,  `false`.

To be added.

## Matrix4x4.Equals(Matrix4x4) method

```csharp
public readonly bool Equals (System.Numerics.Matrix4x4 other);
```

Returns a value that indicates whether this instance and another 4x4 matrix are equal.

Parameters:

- `other`: The other matrix.

Returns: `true` if the two matrices are equal; otherwise, `false`.

To be added.

## Matrix4x4.Equals(Object) method

```csharp
public override readonly bool Equals (object? obj);
```

Returns a value that indicates whether this instance and a specified object are equal.

Parameters:

- `obj`: The object to compare with the current instance.

Returns: `true` if the current instance and `obj` are equal; otherwise, `false`. If `obj` is `null`, the method returns `false`.

#### Remarks
The current instance and `obj` are equal if `obj` is a `Matrix4x4` object and the corresponding elements of each matrix are equal.

## Matrix4x4.GetDeterminant() method

```csharp
public readonly float GetDeterminant ();
```

Calculates the determinant of the current 4x4 matrix.

Returns: The determinant.

To be added.

## Matrix4x4.GetElement(Int32, Int32) method

```csharp
public readonly float GetElement (int row, int column);
```

Gets the element at the specified row and column.

Parameters:

- `row`: The index of the row containing the element to get.
- `column`: The index of the column containing the element to get.

Returns: The element at index: [`row`, `column`].

Exceptions:

- `ArgumentOutOfRangeException`: `row` was less than zero or greater than or equal to the number of rows (`4`).

-or-

`column` was less than zero or greater than or equal to the number of columns (`4`).

To be added.

## Matrix4x4.GetHashCode() method

```csharp
public override readonly int GetHashCode ();
```

Returns the hash code for this instance.

Returns: The hash code.

To be added.

## Matrix4x4.GetRow(Int32) method

```csharp
public readonly System.Numerics.Vector4 GetRow (int index);
```

Gets or sets the row at the specified index.

Parameters:

- `index`: The index of the row to get.

Returns: The row at index: [`index`].

Exceptions:

- `ArgumentOutOfRangeException`: `index` was less than zero or greater than or equal to the number of rows (`4`).

To be added.

## Matrix4x4.Invert(Matrix4x4, Matrix4x4) method

```csharp
public static bool Invert (System.Numerics.Matrix4x4 matrix, out System.Numerics.Matrix4x4 result);
```

Inverts the specified matrix. The return value indicates whether the operation succeeded.

Parameters:

- `matrix`: The matrix to invert.
- `result`: When this method returns, contains the inverted matrix if the operation succeeded.

Returns: `true` if `matrix` was converted successfully; otherwise,  `false`.

To be added.

## Matrix4x4.Lerp(Matrix4x4, Matrix4x4, Single) method

```csharp
public static System.Numerics.Matrix4x4 Lerp (System.Numerics.Matrix4x4 matrix1, System.Numerics.Matrix4x4 matrix2, float amount);
```

Performs a linear interpolation from one matrix to a second matrix based on a value that specifies the weighting of the second matrix.

Parameters:

- `matrix1`: The first matrix.
- `matrix2`: The second matrix.
- `amount`: The relative weighting of `matrix2`.

Returns: The interpolated matrix.

To be added.

## Matrix4x4.Multiply(Matrix4x4, Matrix4x4) method

```csharp
public static System.Numerics.Matrix4x4 Multiply (System.Numerics.Matrix4x4 value1, System.Numerics.Matrix4x4 value2);
```

Returns the matrix that results from multiplying two matrices together.

Parameters:

- `value1`: The first matrix.
- `value2`: The second matrix.

Returns: The product matrix.

To be added.

## Matrix4x4.Multiply(Matrix4x4, Single) method

```csharp
public static System.Numerics.Matrix4x4 Multiply (System.Numerics.Matrix4x4 value1, float value2);
```

Returns the matrix that results from scaling all the elements of a specified matrix by a scalar factor.

Parameters:

- `value1`: The matrix to scale.
- `value2`: The scaling value to use.

Returns: The scaled matrix.

To be added.

## Matrix4x4.Negate(Matrix4x4) method

```csharp
public static System.Numerics.Matrix4x4 Negate (System.Numerics.Matrix4x4 value);
```

Negates the specified matrix by multiplying all its values by -1.

Parameters:

- `value`: The matrix to negate.

Returns: The negated matrix.

To be added.

## Matrix4x4.op_Addition(Matrix4x4, Matrix4x4) method

```csharp
public static System.Numerics.Matrix4x4 operator + (System.Numerics.Matrix4x4 value1, System.Numerics.Matrix4x4 value2);
```

Adds each element in one matrix with its corresponding element in a second matrix.

Parameters:

- `value1`: The first matrix.
- `value2`: The second matrix.

Returns: The matrix that contains the summed values.

#### Remarks
The `Matrix4x4.op_Addition` method defines the operation of the addition operator for `Matrix4x4` objects.

## Matrix4x4.op_Equality(Matrix4x4, Matrix4x4) method

```csharp
public static bool operator == (System.Numerics.Matrix4x4 value1, System.Numerics.Matrix4x4 value2);
```

Returns a value that indicates whether the specified matrices are equal.

Parameters:

- `value1`: The first matrix to compare.
- `value2`: The second matrix to care.

Returns: `true` if `value1` and `value2` are equal; otherwise, `false`.

#### Remarks
Two matrices are equal if all their corresponding elements are equal.

## Matrix4x4.op_Inequality(Matrix4x4, Matrix4x4) method

```csharp
public static bool operator != (System.Numerics.Matrix4x4 value1, System.Numerics.Matrix4x4 value2);
```

Returns a value that indicates whether the specified matrices are not equal.

Parameters:

- `value1`: The first matrix to compare.
- `value2`: The second matrix to compare.

Returns: `true` if `value1` and `value2` are not equal; otherwise, `false`.

To be added.

## Matrix4x4.op_Multiply(Matrix4x4, Matrix4x4) method

```csharp
public static System.Numerics.Matrix4x4 operator * (System.Numerics.Matrix4x4 value1, System.Numerics.Matrix4x4 value2);
```

Returns the matrix that results from multiplying two matrices together.

Parameters:

- `value1`: The first matrix.
- `value2`: The second matrix.

Returns: The product matrix.

#### Remarks
The `Matrix4x4.op_Multiply` method defines the operation of the multiplication operator for `Matrix4x4` objects.

## Matrix4x4.op_Multiply(Matrix4x4, Single) method

```csharp
public static System.Numerics.Matrix4x4 operator * (System.Numerics.Matrix4x4 value1, float value2);
```

Returns the matrix that results from scaling all the elements of a specified matrix by a scalar factor.

Parameters:

- `value1`: The matrix to scale.
- `value2`: The scaling value to use.

Returns: The scaled matrix.

#### Remarks
The `Matrix4x4.op_Multiply` method defines the operation of the multiplication operator for `Matrix4x4` objects.

## Matrix4x4.op_Subtraction(Matrix4x4, Matrix4x4) method

```csharp
public static System.Numerics.Matrix4x4 operator - (System.Numerics.Matrix4x4 value1, System.Numerics.Matrix4x4 value2);
```

Subtracts each element in a second matrix from its corresponding element in a first matrix.

Parameters:

- `value1`: The first matrix.
- `value2`: The second matrix.

Returns: The matrix containing the values that result from subtracting each element in `value2` from its corresponding element in `value1`.

#### Remarks
The `Matrix4x4.op_Subtraction` method defines the operation of the subtraction operator for `Matrix4x4` objects.

## Matrix4x4.op_UnaryNegation(Matrix4x4) method

```csharp
public static System.Numerics.Matrix4x4 operator - (System.Numerics.Matrix4x4 value);
```

Negates the specified matrix by multiplying all its values by -1.

Parameters:

- `value`: The matrix to negate.

Returns: The negated matrix.

To be added.

## Matrix4x4.Subtract(Matrix4x4, Matrix4x4) method

```csharp
public static System.Numerics.Matrix4x4 Subtract (System.Numerics.Matrix4x4 value1, System.Numerics.Matrix4x4 value2);
```

Subtracts each element in a second matrix from its corresponding element in a first matrix.

Parameters:

- `value1`: The first matrix.
- `value2`: The second matrix.

Returns: The matrix containing the values that result from subtracting each element in `value2` from its corresponding element in `value1`.

To be added.

## Matrix4x4.ToString() method

```csharp
public override readonly string ToString ();
```

Returns a string that represents this matrix.

Returns: The string representation of this matrix.

#### Remarks
The numeric values in the returned string are formatted by using the conventions of the current culture. For example, for the en-US culture, the returned string might appear as `{ {M11:1.1 M12:1.2 M13:1.3 M14:1.4} {M21:2.1 M22:2.2 M23:2.3 M24:2.4} {M31:3.1 M32:3.2 M33:3.3 M34:3.4} {M41:4.1 M42:4.2 M43:4.3 M44:4.4} }`.

## Matrix4x4.Transform(Matrix4x4, Quaternion) method

```csharp
public static System.Numerics.Matrix4x4 Transform (System.Numerics.Matrix4x4 value, System.Numerics.Quaternion rotation);
```

Transforms the specified matrix by applying the specified Quaternion rotation.

Parameters:

- `value`: The matrix to transform.
- `rotation`: The rotation t apply.

Returns: The transformed matrix.

To be added.

## Matrix4x4.Transpose(Matrix4x4) method

```csharp
public static System.Numerics.Matrix4x4 Transpose (System.Numerics.Matrix4x4 matrix);
```

Transposes the rows and columns of a matrix.

Parameters:

- `matrix`: The matrix to transpose.

Returns: The transposed matrix.

To be added.

## Matrix4x4.WithElement(Int32, Int32, Single) method

```csharp
public readonly System.Numerics.Matrix4x4 WithElement (int row, int column, float value);
```

Creates a new `Matrix4x4` with the element at the specified row and column set to the given value and the remaining elements set to the same value as that in the current matrix.

Parameters:

- `row`: The index of the row containing the element to replace.
- `column`: The index of the column containing the element to replace.
- `value`: The value to assign to the element at index: [`row`, `column`].

Returns: A `Matrix4x4` with the value of the element at index: [`row`, `column`] set to `value` and the remaining elements set to the same value as that in the current matrix.

Exceptions:

- `ArgumentOutOfRangeException`: `row` was less than zero or greater than or equal to the number of rows (`4`).

-or-

`column` was less than zero or greater than or equal to the number of columns (`4`).

To be added.
