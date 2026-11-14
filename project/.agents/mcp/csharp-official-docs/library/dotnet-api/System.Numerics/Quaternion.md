---
title: "Quaternion struct (part 1 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Numerics/Quaternion.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Quaternion struct

Namespace: `System.Numerics`

```csharp
public struct Quaternion : IEquatable<System.Numerics.Quaternion>
```

Represents a vector that is used to encode three-dimensional physical rotations.

#### Remarks
The `Quaternion` structure is used to efficiently rotate an object about the (x,y,z) vector by the angle theta, where:

```
w = cos(theta/2)
```

## Quaternion.Quaternion(Vector3, Single) constructor

```csharp
public Quaternion (System.Numerics.Vector3 vectorPart, float scalarPart);
```

Creates a quaternion from the specified vector and rotation parts.

Parameters:

- `vectorPart`: The vector part of the quaternion.
- `scalarPart`: The rotation part of the quaternion.

To be added.

## Quaternion.Quaternion(Single, Single, Single, Single) constructor

```csharp
public Quaternion (float x, float y, float z, float w);
```

Constructs a quaternion from the specified components.

Parameters:

- `x`: The value to assign to the X component of the quaternion.
- `y`: The value to assign to the Y component of the quaternion.
- `z`: The value to assign to the Z component of the quaternion.
- `w`: The value to assign to the W component of the quaternion.

To be added.

## Quaternion.Identity property

```csharp
public static System.Numerics.Quaternion Identity { get; }
```

Gets a quaternion that represents no rotation.

Returns: A quaternion whose values are `(0, 0, 0, 1)`.

To be added.

## Quaternion.IsIdentity property

```csharp
public bool IsIdentity { get; }
```

Gets a value that indicates whether the current instance is the identity quaternion.

Returns: `true` if the current instance is the identity quaternion; otherwise, `false`.

To be added.

## Quaternion.Item property

```csharp
public float this[int index] { get; set; }
```

Gets or sets the element at the specified index.

Parameters:

- `index`: The index of the element to get or set.

Returns: The element at `index`.

Exceptions:

- `ArgumentOutOfRangeException`: `index` was less than zero or greater than the number of elements.

To be added.

## Quaternion.Zero property

```csharp
public static System.Numerics.Quaternion Zero { get; }
```

Gets a quaternion that represents a zero.

Returns: A quaternion whose values are `(0, 0, 0, 0)`.

To be added.

## Quaternion.Add(Quaternion, Quaternion) method

```csharp
public static System.Numerics.Quaternion Add (System.Numerics.Quaternion value1, System.Numerics.Quaternion value2);
```

Adds each element in one quaternion with its corresponding element in a second quaternion.

Parameters:

- `value1`: The first quaternion.
- `value2`: The second quaternion.

Returns: The quaternion that contains the summed values of `value1` and `value2`.

To be added.

## Quaternion.Concatenate(Quaternion, Quaternion) method

```csharp
public static System.Numerics.Quaternion Concatenate (System.Numerics.Quaternion value1, System.Numerics.Quaternion value2);
```

Concatenates two quaternions.

Parameters:

- `value1`: The first quaternion rotation in the series.
- `value2`: The second quaternion rotation in the series.

Returns: A new quaternion representing the concatenation of the `value1` rotation followed by the `value2` rotation.

To be added.

## Quaternion.Conjugate(Quaternion) method

```csharp
public static System.Numerics.Quaternion Conjugate (System.Numerics.Quaternion value);
```

Returns the conjugate of a specified quaternion.

Parameters:

- `value`: The quaternion.

Returns: A new quaternion that is the conjugate of `value`.

To be added.

## Quaternion.Create(Vector3, Single) method

```csharp
public static System.Numerics.Quaternion Create (System.Numerics.Vector3 vectorPart, float scalarPart);
```

Creates a `Quaternion` from the specified vector and rotation parts.

Parameters:

- `vectorPart`: The vector part of the quaternion.
- `scalarPart`: The rotation part of the quaternion.

Returns: A `Quaternion` created from the specified vector and rotation parts.

To be added.

## Quaternion.Create(Single, Single, Single, Single) method

```csharp
public static System.Numerics.Quaternion Create (float x, float y, float z, float w);
```

Creates a `Quaternion` from the specified components.

Parameters:

- `x`: The value to assign to the X component of the quaternion.
- `y`: The value to assign to the Y component of the quaternion.
- `z`: The value to assign to the Z component of the quaternion.
- `w`: The value to assign to the W component of the quaternion.

Returns: A `Quaternion` created from the specified components.

To be added.

## Quaternion.CreateFromAxisAngle(Vector3, Single) method

```csharp
public static System.Numerics.Quaternion CreateFromAxisAngle (System.Numerics.Vector3 axis, float angle);
```

Creates a quaternion from a unit vector and an angle to rotate around the vector.

Parameters:

- `axis`: The unit vector to rotate around.
- `angle`: The angle, in radians, to rotate around the vector.

Returns: The newly created quaternion.

#### Remarks
`axis` vector must be normalized before calling this method or the resulting `Quaternion` will be incorrect.

## Quaternion.CreateFromRotationMatrix(Matrix4x4) method

```csharp
public static System.Numerics.Quaternion CreateFromRotationMatrix (System.Numerics.Matrix4x4 matrix);
```

Creates a quaternion from the specified rotation matrix.

Parameters:

- `matrix`: The rotation matrix.

Returns: The newly created quaternion.

To be added.

## Quaternion.CreateFromYawPitchRoll(Single, Single, Single) method

```csharp
public static System.Numerics.Quaternion CreateFromYawPitchRoll (float yaw, float pitch, float roll);
```

Creates a new quaternion from the given yaw, pitch, and roll.

Parameters:

- `yaw`: The yaw angle, in radians, around the Y axis.
- `pitch`: The pitch angle, in radians, around the X axis.
- `roll`: The roll angle, in radians, around the Z axis.

Returns: The resulting quaternion.

To be added.

## Quaternion.Divide(Quaternion, Quaternion) method

```csharp
public static System.Numerics.Quaternion Divide (System.Numerics.Quaternion value1, System.Numerics.Quaternion value2);
```

Divides one quaternion by a second quaternion.

Parameters:

- `value1`: The dividend.
- `value2`: The divisor.

Returns: The quaternion that results from dividing `value1` by `value2`.

To be added.

## Quaternion.Dot(Quaternion, Quaternion) method

```csharp
public static float Dot (System.Numerics.Quaternion quaternion1, System.Numerics.Quaternion quaternion2);
```

Calculates the dot product of two quaternions.

Parameters:

- `quaternion1`: The first quaternion.
- `quaternion2`: The second quaternion.

Returns: The dot product.

To be added.

## Quaternion.Equals(Quaternion) method

```csharp
public readonly bool Equals (System.Numerics.Quaternion other);
```

Returns a value that indicates whether this instance and another quaternion are equal.

Parameters:

- `other`: The other quaternion.

Returns: `true` if the two quaternions are equal; otherwise, `false`.

#### Remarks
Two quaternions are equal if each of their corresponding components is equal.

## Quaternion.Equals(Object) method

```csharp
public override readonly bool Equals (object? obj);
```

Returns a value that indicates whether this instance and a specified object are equal.

Parameters:

- `obj`: The object to compare with the current instance.

Returns: `true` if the current instance and `obj` are equal; otherwise, `false`. If `obj` is `null`, the method returns `false`.

#### Remarks
The current instance and `obj` are equal if `obj` is a `Quaternion` object and the corresponding components of each matrix are equal.

## Quaternion.GetHashCode() method

```csharp
public override readonly int GetHashCode ();
```

Returns the hash code for this instance.

Returns: The hash code.

To be added.

## Quaternion.Inverse(Quaternion) method

```csharp
public static System.Numerics.Quaternion Inverse (System.Numerics.Quaternion value);
```

Returns the inverse of a quaternion.

Parameters:

- `value`: The quaternion.

Returns: The inverted quaternion.

To be added.

## Quaternion.Length() method

```csharp
public readonly float Length ();
```

Calculates the length of the quaternion.

Returns: The computed length of the quaternion.

To be added.

## Quaternion.LengthSquared() method

```csharp
public readonly float LengthSquared ();
```

Calculates the squared length of the quaternion.

Returns: The length squared of the quaternion.

To be added.

## Quaternion.Lerp(Quaternion, Quaternion, Single) method

```csharp
public static System.Numerics.Quaternion Lerp (System.Numerics.Quaternion quaternion1, System.Numerics.Quaternion quaternion2, float amount);
```

Performs a linear interpolation between two quaternions based on a value that specifies the weighting of the second quaternion.

Parameters:

- `quaternion1`: The first quaternion.
- `quaternion2`: The second quaternion.
- `amount`: The relative weight of `quaternion2` in the interpolation.

Returns: The interpolated quaternion.

To be added.

## Quaternion.Multiply(Quaternion, Quaternion) method

```csharp
public static System.Numerics.Quaternion Multiply (System.Numerics.Quaternion value1, System.Numerics.Quaternion value2);
```

Returns the quaternion that results from multiplying two quaternions together.

Parameters:

- `value1`: The first quaternion.
- `value2`: The second quaternion.

Returns: The product quaternion.

To be added.

## Quaternion.Multiply(Quaternion, Single) method

```csharp
public static System.Numerics.Quaternion Multiply (System.Numerics.Quaternion value1, float value2);
```

Returns the quaternion that results from scaling all the components of a specified quaternion by a scalar factor.

Parameters:

- `value1`: The source quaternion.
- `value2`: The scalar value.

Returns: The scaled quaternion.

To be added.

## Quaternion.Negate(Quaternion) method

```csharp
public static System.Numerics.Quaternion Negate (System.Numerics.Quaternion value);
```

Reverses the sign of each component of the quaternion.

Parameters:

- `value`: The quaternion to negate.

Returns: The negated quaternion.

To be added.

## Quaternion.Normalize(Quaternion) method

```csharp
public static System.Numerics.Quaternion Normalize (System.Numerics.Quaternion value);
```

Divides each component of a specified `Quaternion` by its length.

Parameters:

- `value`: The quaternion to normalize.

Returns: The normalized quaternion.

To be added.

## Quaternion.op_Addition(Quaternion, Quaternion) method

```csharp
public static System.Numerics.Quaternion operator + (System.Numerics.Quaternion value1, System.Numerics.Quaternion value2);
```

Adds each element in one quaternion with its corresponding element in a second quaternion.

Parameters:

- `value1`: The first quaternion.
- `value2`: The second quaternion.

Returns: The quaternion that contains the summed values of `value1` and `value2`.

#### Remarks
The `Quaternion.op_Addition` method defines the operation of the addition operator for `Quaternion` objects.

## Quaternion.op_Division(Quaternion, Quaternion) method

```csharp
public static System.Numerics.Quaternion operator / (System.Numerics.Quaternion value1, System.Numerics.Quaternion value2);
```

Divides one quaternion by a second quaternion.

Parameters:

- `value1`: The dividend.
- `value2`: The divisor.

Returns: The quaternion that results from dividing `value1` by `value2`.

#### Remarks
The `Quaternion.op_Division` method defines the division operation for `Quaternion` objects.

## Quaternion.op_Equality(Quaternion, Quaternion) method

```csharp
public static bool operator == (System.Numerics.Quaternion value1, System.Numerics.Quaternion value2);
```

Returns a value that indicates whether two quaternions are equal.

Parameters:

- `value1`: The first quaternion to compare.
- `value2`: The second quaternion to compare.

Returns: `true` if the two quaternions are equal; otherwise, `false`.

#### Remarks
Two quaternions are equal if each of their corresponding components is equal.

The `Quaternion.op_Equality` method defines the operation of the equality operator for `Quaternion` objects.

## Quaternion.op_Inequality(Quaternion, Quaternion) method

```csharp
public static bool operator != (System.Numerics.Quaternion value1, System.Numerics.Quaternion value2);
```

Returns a value that indicates whether two quaternions are not equal.

Parameters:

- `value1`: The first quaternion to compare.
- `value2`: The second quaternion to compare.

Returns: `true` if `value1` and `value2` are not equal; otherwise, `false`.

To be added.

## Quaternion.op_Multiply(Quaternion, Quaternion) method

```csharp
public static System.Numerics.Quaternion operator * (System.Numerics.Quaternion value1, System.Numerics.Quaternion value2);
```

Returns the quaternion that results from multiplying two quaternions together.

Parameters:

- `value1`: The first quaternion.
- `value2`: The second quaternion.

Returns: The product quaternion.

#### Remarks
The `Quaternion.op_Multiply` method defines the operation of the multiplication operator for `Quaternion` objects.

## Quaternion.op_Multiply(Quaternion, Single) method

```csharp
public static System.Numerics.Quaternion operator * (System.Numerics.Quaternion value1, float value2);
```

Returns the quaternion that results from scaling all the components of a specified quaternion by a scalar factor.

Parameters:

- `value1`: The source quaternion.
- `value2`: The scalar value.

Returns: The scaled quaternion.

#### Remarks
The `Quaternion.op_Multiply` method defines the operation of the multiplication operator for `Quaternion` objects.

## Quaternion.op_Subtraction(Quaternion, Quaternion) method

```csharp
public static System.Numerics.Quaternion operator - (System.Numerics.Quaternion value1, System.Numerics.Quaternion value2);
```

Subtracts each element in a second quaternion from its corresponding element in a first quaternion.

Parameters:

- `value1`: The first quaternion.
- `value2`: The second quaternion.

Returns: The quaternion containing the values that result from subtracting each element in `value2` from its corresponding element in `value1`.

#### Remarks
The `Quaternion.op_Subtraction` method defines the operation of the subtraction operator for `Quaternion` objects.

## Quaternion.op_UnaryNegation(Quaternion) method

```csharp
public static System.Numerics.Quaternion operator - (System.Numerics.Quaternion value);
```

Reverses the sign of each component of the quaternion.

Parameters:

- `value`: The quaternion to negate.

Returns: The negated quaternion.

#### Remarks
The `Quaternion.op_UnaryNegation` method defines the operation of the unary negation operator for `Quaternion` objects.
