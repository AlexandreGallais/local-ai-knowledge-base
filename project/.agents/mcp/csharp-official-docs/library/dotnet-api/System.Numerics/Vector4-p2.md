---
title: "Vector4 struct (part 2 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Numerics/Vector4.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Vector4 struct (part 2 of 4)

## Vector4.Create(Single, Single, Single, Single) method

```csharp
public static System.Numerics.Vector4 Create (float x, float y, float z, float w);
```

Creates a vector whose elements have the specified values.

Parameters:

- `x`: The value to assign to the `Vector4.X` field.
- `y`: The value to assign to the `Vector4.Y` field.
- `z`: The value to assign to the `Vector4.Z` field.
- `w`: The value to assign to the `Vector4.W` field.

Returns: A new `Vector4` whose elements have the specified values.

To be added.

## Vector4.CreateScalar(Single) method

```csharp
public static System.Numerics.Vector4 CreateScalar (float x);
```

Creates a vector with `Vector4.X` initialized to the specified value and the remaining elements initialized to zero.

Parameters:

- `x`: The value to assign to the `Vector4.X` field.

Returns: A `Vector4` with `Vector4.X` initialized `x` and the remaining elements initialized to zero.

To be added.

## Vector4.CreateScalarUnsafe(Single) method

```csharp
public static System.Numerics.Vector4 CreateScalarUnsafe (float x);
```

Creates a vector with `Vector4.X` initialized to the specified value and the remaining elements left uninitialized.

Parameters:

- `x`: The value to assign to the `Vector4.X` field.

Returns: A `Vector4` with `Vector4.X` initialized `x` and the remaining elements left uninitialized.

To be added.

## Vector4.Cross(Vector4, Vector4) method

```csharp
public static System.Numerics.Vector4 Cross (System.Numerics.Vector4 vector1, System.Numerics.Vector4 vector2);
```

Computes the cross product of two vectors. For homogeneous coordinates, the product of the weights is the new weight for the resulting product.

Parameters:

- `vector1`: The first vector.
- `vector2`: The second vector.

Returns: The cross product.

The proposed Cross function for `Vector4` is nearly the same as that for `Vector3.Cross` with the addition of the fourth value which is the product of the original two w's. This can be derived by symbolically performing the cross product for `Vector3` with values [x_1/w_1, y_1/w_1, z_1/w_1] and [x_2/w_2, y_2/w_2, z_2/w_2].

## Vector4.DegreesToRadians(Vector4) method

```csharp
public static System.Numerics.Vector4 DegreesToRadians (System.Numerics.Vector4 degrees);
```

To be added.

Returns: To be added.

To be added.

## Vector4.Distance(Vector4, Vector4) method

```csharp
public static float Distance (System.Numerics.Vector4 value1, System.Numerics.Vector4 value2);
```

Computes the Euclidean distance between the two given points.

Parameters:

- `value1`: The first point.
- `value2`: The second point.

Returns: The distance.

To be added.

## Vector4.DistanceSquared(Vector4, Vector4) method

```csharp
public static float DistanceSquared (System.Numerics.Vector4 value1, System.Numerics.Vector4 value2);
```

Returns the Euclidean distance squared between two specified points.

Parameters:

- `value1`: The first point.
- `value2`: The second point.

Returns: The distance squared.

To be added.

## Vector4.Divide(Vector4, Vector4) method

```csharp
public static System.Numerics.Vector4 Divide (System.Numerics.Vector4 left, System.Numerics.Vector4 right);
```

Divides the first vector by the second.

Parameters:

- `left`: The first vector.
- `right`: The second vector.

Returns: The vector resulting from the division.

To be added.

## Vector4.Divide(Vector4, Single) method

```csharp
public static System.Numerics.Vector4 Divide (System.Numerics.Vector4 left, float divisor);
```

Divides the specified vector by a specified scalar value.

Parameters:

- `left`: The vector.
- `divisor`: The scalar value.

Returns: The vector that results from the division.

To be added.

## Vector4.Dot(Vector4, Vector4) method

```csharp
public static float Dot (System.Numerics.Vector4 vector1, System.Numerics.Vector4 vector2);
```

Returns the dot product of two vectors.

Parameters:

- `vector1`: The first vector.
- `vector2`: The second vector.

Returns: The dot product.

To be added.

## Vector4.Equals(Vector4) method

```csharp
public readonly bool Equals (System.Numerics.Vector4 other);
```

Returns a value that indicates whether this instance and another vector are equal.

Parameters:

- `other`: The other vector.

Returns: `true` if the two vectors are equal; otherwise, `false`.

#### Remarks
Two vectors are equal if their `X`, `Y`, `Z`, and `W` elements are equal.

## Vector4.Equals(Object) method

```csharp
public override readonly bool Equals (object? obj);
```

Returns a value that indicates whether this instance and a specified object are equal.

Parameters:

- `obj`: The object to compare with the current instance.

Returns: `true` if the current instance and `obj` are equal; otherwise, `false`. If `obj` is `null`, the method returns `false`.

#### Remarks
The current instance and `obj` are equal if `obj` is a `Vector4` object and their corresponding elements are equal.

## Vector4.Equals(Vector4, Vector4) method

```csharp
public static System.Numerics.Vector4 Equals (System.Numerics.Vector4 left, System.Numerics.Vector4 right);
```

To be added.

Parameters:

- `left`: To be added.
- `right`: To be added.

Returns: To be added.

To be added.

## Vector4.EqualsAll(Vector4, Vector4) method

```csharp
public static bool EqualsAll (System.Numerics.Vector4 left, System.Numerics.Vector4 right);
```

To be added.

Parameters:

- `left`: To be added.
- `right`: To be added.

Returns: To be added.

To be added.

## Vector4.EqualsAny(Vector4, Vector4) method

```csharp
public static bool EqualsAny (System.Numerics.Vector4 left, System.Numerics.Vector4 right);
```

To be added.

Parameters:

- `left`: To be added.
- `right`: To be added.

Returns: To be added.

To be added.

## Vector4.Exp(Vector4) method

```csharp
public static System.Numerics.Vector4 Exp (System.Numerics.Vector4 vector);
```

To be added.

Returns: To be added.

To be added.

## Vector4.FusedMultiplyAdd(Vector4, Vector4, Vector4) method

```csharp
public static System.Numerics.Vector4 FusedMultiplyAdd (System.Numerics.Vector4 left, System.Numerics.Vector4 right, System.Numerics.Vector4 addend);
```

To be added.

Returns: To be added.

To be added.

## Vector4.GetHashCode() method

```csharp
public override readonly int GetHashCode ();
```

Returns the hash code for this instance.

Returns: The hash code.

To be added.

## Vector4.GreaterThan(Vector4, Vector4) method

```csharp
public static System.Numerics.Vector4 GreaterThan (System.Numerics.Vector4 left, System.Numerics.Vector4 right);
```

To be added.

Parameters:

- `left`: To be added.
- `right`: To be added.

Returns: To be added.

To be added.

## Vector4.GreaterThanAll(Vector4, Vector4) method

```csharp
public static bool GreaterThanAll (System.Numerics.Vector4 left, System.Numerics.Vector4 right);
```

To be added.

Parameters:

- `left`: To be added.
- `right`: To be added.

Returns: To be added.

To be added.

## Vector4.GreaterThanAny(Vector4, Vector4) method

```csharp
public static bool GreaterThanAny (System.Numerics.Vector4 left, System.Numerics.Vector4 right);
```

To be added.

Parameters:

- `left`: To be added.
- `right`: To be added.

Returns: To be added.

To be added.

## Vector4.GreaterThanOrEqual(Vector4, Vector4) method

```csharp
public static System.Numerics.Vector4 GreaterThanOrEqual (System.Numerics.Vector4 left, System.Numerics.Vector4 right);
```

To be added.

Parameters:

- `left`: To be added.
- `right`: To be added.

Returns: To be added.

To be added.

## Vector4.GreaterThanOrEqualAll(Vector4, Vector4) method

```csharp
public static bool GreaterThanOrEqualAll (System.Numerics.Vector4 left, System.Numerics.Vector4 right);
```

To be added.

Parameters:

- `left`: To be added.
- `right`: To be added.

Returns: To be added.

To be added.

## Vector4.GreaterThanOrEqualAny(Vector4, Vector4) method

```csharp
public static bool GreaterThanOrEqualAny (System.Numerics.Vector4 left, System.Numerics.Vector4 right);
```

To be added.

Parameters:

- `left`: To be added.
- `right`: To be added.

Returns: To be added.

To be added.

## Vector4.Hypot(Vector4, Vector4) method

```csharp
public static System.Numerics.Vector4 Hypot (System.Numerics.Vector4 x, System.Numerics.Vector4 y);
```

To be added.

Returns: To be added.

To be added.

## Vector4.IndexOf(Vector4, Single) method

```csharp
public static int IndexOf (System.Numerics.Vector4 vector, float value);
```

To be added.

Parameters:

- `vector`: To be added.
- `value`: To be added.

Returns: To be added.

To be added.

## Vector4.IndexOfWhereAllBitsSet(Vector4) method

```csharp
public static int IndexOfWhereAllBitsSet (System.Numerics.Vector4 vector);
```

To be added.

Parameters:

- `vector`: To be added.

Returns: To be added.

To be added.

## Vector4.IsEvenInteger(Vector4) method

```csharp
public static System.Numerics.Vector4 IsEvenInteger (System.Numerics.Vector4 vector);
```

To be added.

Parameters:

- `vector`: To be added.

Returns: To be added.

To be added.

## Vector4.IsFinite(Vector4) method

```csharp
public static System.Numerics.Vector4 IsFinite (System.Numerics.Vector4 vector);
```

To be added.

Parameters:

- `vector`: To be added.

Returns: To be added.

To be added.

## Vector4.IsInfinity(Vector4) method

```csharp
public static System.Numerics.Vector4 IsInfinity (System.Numerics.Vector4 vector);
```

To be added.

Parameters:

- `vector`: To be added.

Returns: To be added.

To be added.

## Vector4.IsInteger(Vector4) method

```csharp
public static System.Numerics.Vector4 IsInteger (System.Numerics.Vector4 vector);
```

To be added.

Parameters:

- `vector`: To be added.

Returns: To be added.

To be added.

## Vector4.IsNaN(Vector4) method

```csharp
public static System.Numerics.Vector4 IsNaN (System.Numerics.Vector4 vector);
```

To be added.

Parameters:

- `vector`: To be added.

Returns: To be added.

To be added.

## Vector4.IsNegative(Vector4) method

```csharp
public static System.Numerics.Vector4 IsNegative (System.Numerics.Vector4 vector);
```

To be added.

Parameters:

- `vector`: To be added.

Returns: To be added.

To be added.

## Vector4.IsNegativeInfinity(Vector4) method

```csharp
public static System.Numerics.Vector4 IsNegativeInfinity (System.Numerics.Vector4 vector);
```

To be added.

Parameters:

- `vector`: To be added.

Returns: To be added.

To be added.

## Vector4.IsNormal(Vector4) method

```csharp
public static System.Numerics.Vector4 IsNormal (System.Numerics.Vector4 vector);
```

To be added.

Parameters:

- `vector`: To be added.

Returns: To be added.

To be added.

## Vector4.IsOddInteger(Vector4) method

```csharp
public static System.Numerics.Vector4 IsOddInteger (System.Numerics.Vector4 vector);
```

To be added.

Parameters:

- `vector`: To be added.

Returns: To be added.

To be added.

## Vector4.IsPositive(Vector4) method

```csharp
public static System.Numerics.Vector4 IsPositive (System.Numerics.Vector4 vector);
```

To be added.

Parameters:

- `vector`: To be added.

Returns: To be added.

To be added.

## Vector4.IsPositiveInfinity(Vector4) method

```csharp
public static System.Numerics.Vector4 IsPositiveInfinity (System.Numerics.Vector4 vector);
```

To be added.

Parameters:

- `vector`: To be added.

Returns: To be added.

To be added.

## Vector4.IsSubnormal(Vector4) method

```csharp
public static System.Numerics.Vector4 IsSubnormal (System.Numerics.Vector4 vector);
```

To be added.

Parameters:

- `vector`: To be added.

Returns: To be added.

To be added.

## Vector4.IsZero(Vector4) method

```csharp
public static System.Numerics.Vector4 IsZero (System.Numerics.Vector4 vector);
```

To be added.

Parameters:

- `vector`: To be added.

Returns: To be added.

To be added.

## Vector4.LastIndexOf(Vector4, Single) method

```csharp
public static int LastIndexOf (System.Numerics.Vector4 vector, float value);
```

To be added.

Parameters:

- `vector`: To be added.
- `value`: To be added.

Returns: To be added.

To be added.

## Vector4.LastIndexOfWhereAllBitsSet(Vector4) method

```csharp
public static int LastIndexOfWhereAllBitsSet (System.Numerics.Vector4 vector);
```

To be added.

Parameters:

- `vector`: To be added.

Returns: To be added.

To be added.

## Vector4.Length() method

```csharp
public readonly float Length ();
```

Returns the length of this vector object.

Returns: The vector's length.

To be added.

## Vector4.LengthSquared() method

```csharp
public readonly float LengthSquared ();
```

Returns the length of the vector squared.

Returns: The vector's length squared.

#### Remarks
This operation offers better performance than a call to the `Vector4.Length` method.

## Vector4.Lerp(Vector4, Vector4, Vector4) method

```csharp
public static System.Numerics.Vector4 Lerp (System.Numerics.Vector4 value1, System.Numerics.Vector4 value2, System.Numerics.Vector4 amount);
```

To be added.

Returns: To be added.

To be added.

## Vector4.Lerp(Vector4, Vector4, Single) method

```csharp
public static System.Numerics.Vector4 Lerp (System.Numerics.Vector4 value1, System.Numerics.Vector4 value2, float amount);
```

Performs a linear interpolation between two vectors based on the given weighting.

Parameters:

- `value1`: The first vector.
- `value2`: The second vector.
- `amount`: A value between 0 and 1 that indicates the weight of
```csharp
value2
```
.

Returns: The interpolated vector.

#### Remarks

The behavior of this method has changed. For more information, see Behavior change for Vector2.Lerp and Vector4.Lerp.

## Vector4.LessThan(Vector4, Vector4) method

```csharp
public static System.Numerics.Vector4 LessThan (System.Numerics.Vector4 left, System.Numerics.Vector4 right);
```

To be added.

Parameters:

- `left`: To be added.
- `right`: To be added.

Returns: To be added.

To be added.

## Vector4.LessThanAll(Vector4, Vector4) method

```csharp
public static bool LessThanAll (System.Numerics.Vector4 left, System.Numerics.Vector4 right);
```

To be added.

Parameters:

- `left`: To be added.
- `right`: To be added.

Returns: To be added.

To be added.

## Vector4.LessThanAny(Vector4, Vector4) method

```csharp
public static bool LessThanAny (System.Numerics.Vector4 left, System.Numerics.Vector4 right);
```

To be added.

Parameters:

- `left`: To be added.
- `right`: To be added.

Returns: To be added.

To be added.

## Vector4.LessThanOrEqual(Vector4, Vector4) method

```csharp
public static System.Numerics.Vector4 LessThanOrEqual (System.Numerics.Vector4 left, System.Numerics.Vector4 right);
```

To be added.

Parameters:

- `left`: To be added.
- `right`: To be added.

Returns: To be added.

To be added.

## Vector4.LessThanOrEqualAll(Vector4, Vector4) method

```csharp
public static bool LessThanOrEqualAll (System.Numerics.Vector4 left, System.Numerics.Vector4 right);
```

To be added.

Parameters:

- `left`: To be added.
- `right`: To be added.

Returns: To be added.

To be added.
