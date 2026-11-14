---
title: "Matrix4x4 struct (part 1 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Numerics/Matrix4x4.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Matrix4x4 struct

Namespace: `System.Numerics`

```csharp
public struct Matrix4x4 : IEquatable<System.Numerics.Matrix4x4>
```

Represents a 4x4 matrix.

#### Remarks

## Matrix4x4.Matrix4x4(Matrix3x2) constructor

```csharp
public Matrix4x4 (System.Numerics.Matrix3x2 value);
```

Creates a `Matrix4x4` object from a specified `Matrix3x2` object.

Parameters:

- `value`: A 3x2 matrix.

#### Remarks
This constructor creates a 4x4 matrix whose `M13`, `M14`, `M23`, `M24`, `M31`, `M32`, `M34`, and `M43` components are zero, and whose `M33` and `M44` components are one.

## Matrix4x4.Matrix4x4(Single, Single, Single, Single, Single, Single, Single, Single, Single, Single, Single, Single, Single, Single, Single, Single) constructor

```csharp
public Matrix4x4 (float m11, float m12, float m13, float m14, float m21, float m22, float m23, float m24, float m31, float m32, float m33, float m34, float m41, float m42, float m43, float m44);
```

Creates a 4x4 matrix from the specified components.

Parameters:

- `m11`: The value to assign to the first element in the first row.
- `m12`: The value to assign to the second element in the first row.
- `m13`: The value to assign to the third element in the first row.
- `m14`: The value to assign to the fourth element in the first row.
- `m21`: The value to assign to the first element in the second row.
- `m22`: The value to assign to the second element in the second row.
- `m23`: The value to assign to the third element in the second row.
- `m24`: The value to assign to the fourth element in the second row.
- `m31`: The value to assign to the first element in the third row.
- `m32`: The value to assign to the second element in the third row.
- `m33`: The value to assign to the third element in the third row.
- `m34`: The value to assign to the fourth element in the third row.
- `m41`: The value to assign to the first element in the fourth row.
- `m42`: The value to assign to the second element in the fourth row.
- `m43`: The value to assign to the third element in the fourth row.
- `m44`: The value to assign to the fourth element in the fourth row.

To be added.

## Matrix4x4.Identity property

```csharp
public static System.Numerics.Matrix4x4 Identity { get; }
```

Gets the multiplicative identity matrix.

Returns: Gets the multiplicative identity matrix.

To be added.

## Matrix4x4.IsIdentity property

```csharp
public bool IsIdentity { get; }
```

Indicates whether the current matrix is the identity matrix.

Returns: `true` if the current matrix is the identity matrix; otherwise, `false`.

To be added.

## Matrix4x4.Item property

```csharp
public System.Numerics.Vector4 this[int row] { get; set; }
```

Gets or sets the row at the specified index.

Parameters:

- `row`: The index of the row to get or set.

Returns: The row that at index: [`row`].

Exceptions:

- `ArgumentOutOfRangeException`: `row` was less than zero or greater than or equal to the number of rows (`4`).

To be added.

## Matrix4x4.Item property

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

## Matrix4x4.Translation property

```csharp
public System.Numerics.Vector3 Translation { get; set; }
```

Gets or sets the translation component of this matrix.

Returns: The translation component of the current instance.

The translation component is stored as the first three columns of `Matrix4x4.W`.

## Matrix4x4.W property

```csharp
public System.Numerics.Vector4 W { get; set; }
```

Gets or sets the fourth row of the matrix.

Returns: To be added.

This row comprises `Matrix4x4.M41`, `Matrix4x4.M42`, `Matrix4x4.M43`, and `Matrix4x4.M44`; it exists at index: `[3]`.

## Matrix4x4.X property

```csharp
public System.Numerics.Vector4 X { get; set; }
```

Gets or sets the first row of the matrix.

Returns: To be added.

This row comprises `Matrix4x4.M11`, `Matrix4x4.M12`, `Matrix4x4.M13`, and `Matrix4x4.M14`; it exists at index: `[0]`.

## Matrix4x4.Y property

```csharp
public System.Numerics.Vector4 Y { get; set; }
```

Gets or sets the second row of the matrix.

Returns: To be added.

This row comprises `Matrix4x4.M21`, `Matrix4x4.M22`, `Matrix4x4.M23`, and `Matrix4x4.M24`; it exists at index: `[1]`.

## Matrix4x4.Z property

```csharp
public System.Numerics.Vector4 Z { get; set; }
```

Gets or sets the third row of the matrix.

Returns: To be added.

This row comprises `Matrix4x4.M31`, `Matrix4x4.M32`, `Matrix4x4.M33`, and `Matrix4x4.M34`; it exists at index: `[2]`.

## Matrix4x4.Add(Matrix4x4, Matrix4x4) method

```csharp
public static System.Numerics.Matrix4x4 Add (System.Numerics.Matrix4x4 value1, System.Numerics.Matrix4x4 value2);
```

Adds each element in one matrix with its corresponding element in a second matrix.

Parameters:

- `value1`: The first matrix.
- `value2`: The second matrix.

Returns: The matrix that contains the summed values of `value1` and `value2`.

To be added.

## Matrix4x4.Create(Matrix3x2) method

```csharp
public static System.Numerics.Matrix4x4 Create (System.Numerics.Matrix3x2 value);
```

Creates a `Matrix4x4` from the specified `Matrix3x2`.

Parameters:

- `value`: The `Matrix3x2` to assign to the first two elements of `Matrix4x4.X`, `Matrix4x4.Y`, and `Matrix4x4.W`.

Returns: A `Matrix4x4` that was initialized using the elements from `value`.

The last two elements of `Matrix4x4.X`, `Matrix4x4.Y`, and `Matrix4x4.W` are initialized to zero; while `Matrix4x4.Z` is initialized to `Vector4.UnitZ`.

## Matrix4x4.Create(Vector4) method

```csharp
public static System.Numerics.Matrix4x4 Create (System.Numerics.Vector4 value);
```

Creates a `Matrix4x4` whose four rows are set to the specified value.

Parameters:

- `value`: The value to assign to all four rows.

Returns: A `Matrix4x4` whose four rows are set to `value`.

To be added.

## Matrix4x4.Create(Single) method

```csharp
public static System.Numerics.Matrix4x4 Create (float value);
```

Creates a `Matrix4x4` whose 16 elements are set to the specified value.

Parameters:

- `value`: The value to assign to all 16 elements.

Returns: A `Matrix4x4` whose 16 elements are set to `value`.

To be added.

## Matrix4x4.Create(Vector4, Vector4, Vector4, Vector4) method

```csharp
public static System.Numerics.Matrix4x4 Create (System.Numerics.Vector4 x, System.Numerics.Vector4 y, System.Numerics.Vector4 z, System.Numerics.Vector4 w);
```

Creates a `Matrix4x4` from the specified rows.

Parameters:

- `x`: The value to assign to `Matrix4x4.X`.
- `y`: The value to assign to `Matrix4x4.Y`.
- `z`: The value to assign to `Matrix4x4.Z`.
- `w`: The value to assign to `Matrix4x4.W`.

Returns: A `Matrix4x4` whose rows are set to the specified values.

To be added.

## Matrix4x4.Create(Single, Single, Single, Single, Single, Single, Single, Single, Single, Single, Single, Single, Single, Single, Single, Single) method

```csharp
public static System.Numerics.Matrix4x4 Create (float m11, float m12, float m13, float m14, float m21, float m22, float m23, float m24, float m31, float m32, float m33, float m34, float m41, float m42, float m43, float m44);
```

Creates a `Matrix3x2` from the specified elements.

Parameters:

- `m11`: The value to assign to `Matrix4x4.M11`.
- `m12`: The value to assign to `Matrix4x4.M12`.
- `m13`: The value to assign to `Matrix4x4.M13`.
- `m14`: The value to assign to `Matrix4x4.M14`.
- `m21`: The value to assign to `Matrix4x4.M21`.
- `m22`: The value to assign to `Matrix4x4.M22`.
- `m23`: The value to assign to `Matrix4x4.M23`.
- `m24`: The value to assign to `Matrix4x4.M24`.
- `m31`: The value to assign to `Matrix4x4.M31`.
- `m32`: The value to assign to `Matrix4x4.M32`.
- `m33`: The value to assign to `Matrix4x4.M33`.
- `m34`: The value to assign to `Matrix4x4.M34`.
- `m41`: The value to assign to `Matrix4x4.M41`.
- `m42`: The value to assign to `Matrix4x4.M42`.
- `m43`: The value to assign to `Matrix4x4.M43`.
- `m44`: The value to assign to `Matrix4x4.M44`.

Returns: A `Matrix4x4` whose elements are set to the specified values.

To be added.

## Matrix4x4.CreateBillboard(Vector3, Vector3, Vector3, Vector3) method

```csharp
public static System.Numerics.Matrix4x4 CreateBillboard (System.Numerics.Vector3 objectPosition, System.Numerics.Vector3 cameraPosition, System.Numerics.Vector3 cameraUpVector, System.Numerics.Vector3 cameraForwardVector);
```

Creates a spherical billboard that rotates around a specified object position.

Parameters:

- `objectPosition`: The position of the object that the billboard will rotate around.
- `cameraPosition`: The position of the camera.
- `cameraUpVector`: The up vector of the camera.
- `cameraForwardVector`: The forward vector of the camera.

Returns: The created billboard.

To be added.

## Matrix4x4.CreateBillboardLeftHanded(Vector3, Vector3, Vector3, Vector3) method

```csharp
public static System.Numerics.Matrix4x4 CreateBillboardLeftHanded (System.Numerics.Vector3 objectPosition, System.Numerics.Vector3 cameraPosition, System.Numerics.Vector3 cameraUpVector, System.Numerics.Vector3 cameraForwardVector);
```

Creates a left-handed spherical billboard matrix that rotates around a specified object position.

Parameters:

- `objectPosition`: The position of the object that the billboard will rotate around.
- `cameraPosition`: The position of the camera.
- `cameraUpVector`: The up vector of the camera.
- `cameraForwardVector`: The forward vector of the camera.

Returns: The created billboard.

To be added.

## Matrix4x4.CreateConstrainedBillboard(Vector3, Vector3, Vector3, Vector3, Vector3) method

```csharp
public static System.Numerics.Matrix4x4 CreateConstrainedBillboard (System.Numerics.Vector3 objectPosition, System.Numerics.Vector3 cameraPosition, System.Numerics.Vector3 rotateAxis, System.Numerics.Vector3 cameraForwardVector, System.Numerics.Vector3 objectForwardVector);
```

Creates a cylindrical billboard that rotates around a specified axis.

Parameters:

- `objectPosition`: The position of the object that the billboard will rotate around.
- `cameraPosition`: The position of the camera.
- `rotateAxis`: The axis to rotate the billboard around.
- `cameraForwardVector`: The forward vector of the camera.
- `objectForwardVector`: The forward vector of the object.

Returns: The billboard matrix.

To be added.

## Matrix4x4.CreateConstrainedBillboardLeftHanded(Vector3, Vector3, Vector3, Vector3, Vector3) method

```csharp
public static System.Numerics.Matrix4x4 CreateConstrainedBillboardLeftHanded (System.Numerics.Vector3 objectPosition, System.Numerics.Vector3 cameraPosition, System.Numerics.Vector3 rotateAxis, System.Numerics.Vector3 cameraForwardVector, System.Numerics.Vector3 objectForwardVector);
```

Creates a left-handed cylindrical billboard matrix that rotates around a specified axis.

Parameters:

- `objectPosition`: The position of the object that the billboard will rotate around.
- `cameraPosition`: The position of the camera.
- `rotateAxis`: The axis to rotate the billboard around.
- `cameraForwardVector`: The forward vector of the camera.
- `objectForwardVector`: The forward vector of the object.

Returns: The billboard matrix.

To be added.

## Matrix4x4.CreateFromAxisAngle(Vector3, Single) method

```csharp
public static System.Numerics.Matrix4x4 CreateFromAxisAngle (System.Numerics.Vector3 axis, float angle);
```

Creates a matrix that rotates around an arbitrary vector.

Parameters:

- `axis`: The axis to rotate around.
- `angle`: The angle to rotate around `axis`, in radians.

Returns: The rotation matrix.

To be added.

## Matrix4x4.CreateFromQuaternion(Quaternion) method

```csharp
public static System.Numerics.Matrix4x4 CreateFromQuaternion (System.Numerics.Quaternion quaternion);
```

Creates a rotation matrix from the specified Quaternion rotation value.

Parameters:

- `quaternion`: The source Quaternion.

Returns: The rotation matrix.

To be added.

## Matrix4x4.CreateFromYawPitchRoll(Single, Single, Single) method

```csharp
public static System.Numerics.Matrix4x4 CreateFromYawPitchRoll (float yaw, float pitch, float roll);
```

Creates a rotation matrix from the specified yaw, pitch, and roll.

Parameters:

- `yaw`: The angle of rotation, in radians, around the Y axis.
- `pitch`: The angle of rotation, in radians, around the X axis.
- `roll`: The angle of rotation, in radians, around the Z axis.

Returns: The rotation matrix.

To be added.

## Matrix4x4.CreateLookAt(Vector3, Vector3, Vector3) method

```csharp
public static System.Numerics.Matrix4x4 CreateLookAt (System.Numerics.Vector3 cameraPosition, System.Numerics.Vector3 cameraTarget, System.Numerics.Vector3 cameraUpVector);
```

Creates a view matrix.

Parameters:

- `cameraPosition`: The position of the camera.
- `cameraTarget`: The target towards which the camera is pointing.
- `cameraUpVector`: The direction that is "up" from the camera's point of view.

Returns: The view matrix.

To be added.

## Matrix4x4.CreateLookAtLeftHanded(Vector3, Vector3, Vector3) method

```csharp
public static System.Numerics.Matrix4x4 CreateLookAtLeftHanded (System.Numerics.Vector3 cameraPosition, System.Numerics.Vector3 cameraTarget, System.Numerics.Vector3 cameraUpVector);
```

Creates a left-handed view matrix.

Parameters:

- `cameraPosition`: The position of the camera.
- `cameraTarget`: The target towards which the camera is pointing.
- `cameraUpVector`: The direction that is "up" from the camera's point of view.

Returns: The left-handed view matrix.

To be added.

## Matrix4x4.CreateLookTo(Vector3, Vector3, Vector3) method

```csharp
public static System.Numerics.Matrix4x4 CreateLookTo (System.Numerics.Vector3 cameraPosition, System.Numerics.Vector3 cameraDirection, System.Numerics.Vector3 cameraUpVector);
```

Creates a right-handed view matrix.

Parameters:

- `cameraPosition`: The position of the camera.
- `cameraDirection`: The direction in which the camera is pointing.
- `cameraUpVector`: The direction that is "up" from the camera's point of view.

Returns: The right-handed view matrix.

To be added.
