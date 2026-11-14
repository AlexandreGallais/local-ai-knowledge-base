---
title: "Vector3 struct (part 3 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Numerics/Vector3.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Vector3 struct (part 3 of 4)

## Vector3.MaxMagnitude(Vector3, Vector3) method

```csharp
public static System.Numerics.Vector3 MaxMagnitude (System.Numerics.Vector3 value1, System.Numerics.Vector3 value2);
```

Compares two vectors to compute which has the greater magnitude on a per-element basis.

Returns: A vector where the corresponding element comes from
```csharp
left
```
if it has a greater magnitude than
```csharp
right
```
; otherwise,
```csharp
right
```
.

To be added.

## Vector3.MaxMagnitudeNumber(Vector3, Vector3) method

```csharp
public static System.Numerics.Vector3 MaxMagnitudeNumber (System.Numerics.Vector3 value1, System.Numerics.Vector3 value2);
```

Compares two vectors, on a per-element basis, to compute which has the greater magnitude and returning the other value if an input is
```csharp
NaN
```
.

Returns: A vector where the corresponding element comes from
```csharp
left
```
if it has a greater magnitude than
```csharp
right
```
; otherwise,
```csharp
right
```
.

To be added.

## Vector3.MaxNative(Vector3, Vector3) method

```csharp
public static System.Numerics.Vector3 MaxNative (System.Numerics.Vector3 value1, System.Numerics.Vector3 value2);
```

Compare two vectors to determine which is greater on a per-element basis using platform specific behavior for
```csharp
NaN
```
and
```csharp
NegativeZero
```
.

Returns: A vector where the corresponding element comes from
```csharp
left
```
if it is greater than
```csharp
right
```
; otherwise,
```csharp
right
```
.

To be added.

## Vector3.MaxNumber(Vector3, Vector3) method

```csharp
public static System.Numerics.Vector3 MaxNumber (System.Numerics.Vector3 value1, System.Numerics.Vector3 value2);
```

Compares two vectors, on a per-element basis, to compute which is greater and returning the other value if an element is
```csharp
NaN
```
.

Returns: A vector where the corresponding element comes from
```csharp
left
```
if it is greater than
```csharp
right
```
; otherwise,
```csharp
right
```
.

To be added.

## Vector3.Min(Vector3, Vector3) method

```csharp
public static System.Numerics.Vector3 Min (System.Numerics.Vector3 value1, System.Numerics.Vector3 value2);
```

Returns a vector whose elements are the minimum of each of the pairs of elements in two specified vectors.

Parameters:

- `value1`: The first vector.
- `value2`: The second vector.

Returns: The minimized vector.

To be added.

## Vector3.MinMagnitude(Vector3, Vector3) method

```csharp
public static System.Numerics.Vector3 MinMagnitude (System.Numerics.Vector3 value1, System.Numerics.Vector3 value2);
```

Compares two vectors to compute which has the lesser magnitude on a per-element basis.

Returns: A vector where the corresponding element comes from
```csharp
left
```
if it has a lesser magnitude than
```csharp
right
```
; otherwise,
```csharp
right
```
.

To be added.

## Vector3.MinMagnitudeNumber(Vector3, Vector3) method

```csharp
public static System.Numerics.Vector3 MinMagnitudeNumber (System.Numerics.Vector3 value1, System.Numerics.Vector3 value2);
```

Compares two vectors, on a per-element basis, to compute which has the lesser magnitude and returning the other value if an input is
```csharp
NaN
```
.

Returns: A vector where the corresponding element comes from
```csharp
left
```
if it has a lesser magnitude than
```csharp
right
```
; otherwise,
```csharp
right
```
.

To be added.

## Vector3.MinNative(Vector3, Vector3) method

```csharp
public static System.Numerics.Vector3 MinNative (System.Numerics.Vector3 value1, System.Numerics.Vector3 value2);
```

Compare two vectors to determine which is lesser on a per-element basis using platform specific behavior for
```csharp
NaN
```
and
```csharp
NegativeZero
```
.

Returns: A vector where the corresponding element comes from
```csharp
left
```
if it is lesser than
```csharp
right
```
; otherwise,
```csharp
right
```
.

To be added.

## Vector3.MinNumber(Vector3, Vector3) method

```csharp
public static System.Numerics.Vector3 MinNumber (System.Numerics.Vector3 value1, System.Numerics.Vector3 value2);
```

Compares two vectors, on a per-element basis, to compute which is lesser and returning the other value if an element is
```csharp
NaN
```
.

Returns: A vector where the corresponding element comes from
```csharp
left
```
if it is lesser than
```csharp
right
```
; otherwise,
```csharp
right
```
.

To be added.

## Vector3.Multiply(Vector3, Vector3) method

```csharp
public static System.Numerics.Vector3 Multiply (System.Numerics.Vector3 left, System.Numerics.Vector3 right);
```

Returns a new vector whose values are the product of each pair of elements in two specified vectors.

Parameters:

- `left`: The first vector.
- `right`: The second vector.

Returns: The element-wise product vector.

To be added.

## Vector3.Multiply(Vector3, Single) method

```csharp
public static System.Numerics.Vector3 Multiply (System.Numerics.Vector3 left, float right);
```

Multiplies a vector by a specified scalar.

Parameters:

- `left`: The vector to multiply.
- `right`: The scalar value.

Returns: The scaled vector.

To be added.

## Vector3.Multiply(Single, Vector3) method

```csharp
public static System.Numerics.Vector3 Multiply (float left, System.Numerics.Vector3 right);
```

Multiplies a scalar value by a specified vector.

Parameters:

- `left`: The scaled value.
- `right`: The vector.

Returns: The scaled vector.

To be added.

## Vector3.MultiplyAddEstimate(Vector3, Vector3, Vector3) method

```csharp
public static System.Numerics.Vector3 MultiplyAddEstimate (System.Numerics.Vector3 left, System.Numerics.Vector3 right, System.Numerics.Vector3 addend);
```

To be added.

Returns: To be added.

To be added.

## Vector3.Negate(Vector3) method

```csharp
public static System.Numerics.Vector3 Negate (System.Numerics.Vector3 value);
```

Negates a specified vector.

Parameters:

- `value`: The vector to negate.

Returns: The negated vector.

To be added.

## Vector3.None(Vector3, Single) method

```csharp
public static bool None (System.Numerics.Vector3 vector, float value);
```

To be added.

Parameters:

- `vector`: To be added.
- `value`: To be added.

Returns: To be added.

To be added.

## Vector3.NoneWhereAllBitsSet(Vector3) method

```csharp
public static bool NoneWhereAllBitsSet (System.Numerics.Vector3 vector);
```

To be added.

Parameters:

- `vector`: To be added.

Returns: To be added.

To be added.

## Vector3.Normalize(Vector3) method

```csharp
public static System.Numerics.Vector3 Normalize (System.Numerics.Vector3 value);
```

Returns a vector with the same direction as the specified vector, but with a length of one.

Parameters:

- `value`: The vector to normalize.

Returns: The normalized vector.

To be added.

## Vector3.OnesComplement(Vector3) method

```csharp
public static System.Numerics.Vector3 OnesComplement (System.Numerics.Vector3 value);
```

To be added.

Parameters:

- `value`: To be added.

Returns: To be added.

To be added.

## Vector3.op_Addition(Vector3, Vector3) method

```csharp
public static System.Numerics.Vector3 operator + (System.Numerics.Vector3 left, System.Numerics.Vector3 right);
```

Adds two vectors together.

Parameters:

- `left`: The first vector to add.
- `right`: The second vector to add.

Returns: The summed vector.

#### Remarks
The `Vector3.op_Addition` method defines the addition operation for `Vector3` objects.

## Vector3.op_BitwiseAnd(Vector3, Vector3) method

```csharp
public static System.Numerics.Vector3 operator & (System.Numerics.Vector3 left, System.Numerics.Vector3 right);
```

To be added.

Parameters:

- `left`: To be added.
- `right`: To be added.

Returns: To be added.

To be added.

## Vector3.op_BitwiseOr(Vector3, Vector3) method

```csharp
public static System.Numerics.Vector3 operator | (System.Numerics.Vector3 left, System.Numerics.Vector3 right);
```

To be added.

Parameters:

- `left`: To be added.
- `right`: To be added.

Returns: To be added.

To be added.

## Vector3.op_Division(Vector3, Vector3) method

```csharp
public static System.Numerics.Vector3 operator / (System.Numerics.Vector3 left, System.Numerics.Vector3 right);
```

Divides the first vector by the second.

Parameters:

- `left`: The first vector.
- `right`: The second vector.

Returns: The vector that results from dividing `left` by `right`.

#### Remarks
The `Vector3.op_Division` method defines the division operation for `Vector3` objects.

## Vector3.op_Division(Vector3, Single) method

```csharp
public static System.Numerics.Vector3 operator / (System.Numerics.Vector3 value1, float value2);
```

Divides the specified vector by a specified scalar value.

Parameters:

- `value1`: The vector.
- `value2`: The scalar value.

Returns: The result of the division.

#### Remarks
The `Vector3.op_Division` method defines the division operation for `Vector3` objects.

## Vector3.op_Equality(Vector3, Vector3) method

```csharp
public static bool operator == (System.Numerics.Vector3 left, System.Numerics.Vector3 right);
```

Returns a value that indicates whether each pair of elements in two specified vectors is equal.

Parameters:

- `left`: The first vector to compare.
- `right`: The second vector to compare.

Returns: `true` if `left` and `right` are equal; otherwise, `false`.

#### Remarks
Two `Vector3` objects are equal if each element in `left` is equal to the corresponding element in `right`.

## Vector3.op_ExclusiveOr(Vector3, Vector3) method

```csharp
public static System.Numerics.Vector3 operator ^ (System.Numerics.Vector3 left, System.Numerics.Vector3 right);
```

To be added.

Parameters:

- `left`: To be added.
- `right`: To be added.

Returns: To be added.

To be added.

## Vector3.op_Inequality(Vector3, Vector3) method

```csharp
public static bool operator != (System.Numerics.Vector3 left, System.Numerics.Vector3 right);
```

Returns a value that indicates whether two specified vectors are not equal.

Parameters:

- `left`: The first vector to compare.
- `right`: The second vector to compare.

Returns: `true` if `left` and `right` are not equal; otherwise, `false`.

To be added.

## Vector3.op_LeftShift(Vector3, Int32) method

```csharp
public static System.Numerics.Vector3 operator << (System.Numerics.Vector3 value, int shiftAmount);
```

To be added.

Parameters:

- `value`: To be added.
- `shiftAmount`: To be added.

Returns: To be added.

To be added.

## Vector3.op_Multiply(Vector3, Vector3) method

```csharp
public static System.Numerics.Vector3 operator * (System.Numerics.Vector3 left, System.Numerics.Vector3 right);
```

Returns a new vector whose values are the product of each pair of elements in two specified vectors.

Parameters:

- `left`: The first vector.
- `right`: The second vector.

Returns: The element-wise product vector.

#### Remarks
The `Vector3.op_Multiply` method defines the multiplication operation for `Vector3` objects.

## Vector3.op_Multiply(Vector3, Single) method

```csharp
public static System.Numerics.Vector3 operator * (System.Numerics.Vector3 left, float right);
```

Multiples the specified vector by the specified scalar value.

Parameters:

- `left`: The vector.
- `right`: The scalar value.

Returns: The scaled vector.

#### Remarks
The `Vector3.op_Multiply` method defines the multiplication operation for `Vector3` objects.

## Vector3.op_Multiply(Single, Vector3) method

```csharp
public static System.Numerics.Vector3 operator * (float left, System.Numerics.Vector3 right);
```

Multiples the scalar value by the specified vector.

Parameters:

- `left`: The vector.
- `right`: The scalar value.

Returns: The scaled vector.

#### Remarks
The `Vector3.op_Multiply` method defines the multiplication operation for `Vector3` objects.

## Vector3.op_OnesComplement(Vector3) method

```csharp
public static System.Numerics.Vector3 operator ~ (System.Numerics.Vector3 value);
```

To be added.

Parameters:

- `value`: To be added.

Returns: To be added.

To be added.

## Vector3.op_RightShift(Vector3, Int32) method

```csharp
public static System.Numerics.Vector3 operator >> (System.Numerics.Vector3 value, int shiftAmount);
```

To be added.

Parameters:

- `value`: To be added.
- `shiftAmount`: To be added.

Returns: To be added.

To be added.

## Vector3.op_Subtraction(Vector3, Vector3) method

```csharp
public static System.Numerics.Vector3 operator - (System.Numerics.Vector3 left, System.Numerics.Vector3 right);
```

Subtracts the second vector from the first.

Parameters:

- `left`: The first vector.
- `right`: The second vector.

Returns: The vector that results from subtracting `right` from `left`.

#### Remarks
The `Vector3.op_Subtraction` method defines the subtraction operation for `Vector3` objects.

## Vector3.op_UnaryNegation(Vector3) method

```csharp
public static System.Numerics.Vector3 operator - (System.Numerics.Vector3 value);
```

Negates the specified vector.

Parameters:

- `value`: The vector to negate.

Returns: The negated vector.

#### Remarks
The `Vector3.op_UnaryNegation` method defines the unary negation operation for `Vector3` objects.

## Vector3.op_UnaryPlus(Vector3) method

```csharp
public static System.Numerics.Vector3 operator + (System.Numerics.Vector3 value);
```

To be added.

Parameters:

- `value`: To be added.

Returns: To be added.

To be added.

## Vector3.op_UnsignedRightShift(Vector3, Int32) method

```csharp
public static System.Numerics.Vector3 op_UnsignedRightShift (System.Numerics.Vector3 value, int shiftAmount);
```

To be added.

Parameters:

- `value`: To be added.
- `shiftAmount`: To be added.

Returns: To be added.

To be added.

## Vector3.RadiansToDegrees(Vector3) method

```csharp
public static System.Numerics.Vector3 RadiansToDegrees (System.Numerics.Vector3 radians);
```

To be added.

Returns: To be added.

To be added.

## Vector3.Reflect(Vector3, Vector3) method

```csharp
public static System.Numerics.Vector3 Reflect (System.Numerics.Vector3 vector, System.Numerics.Vector3 normal);
```

Returns the reflection of a vector off a surface that has the specified normal.

Parameters:

- `vector`: The source vector.
- `normal`: The normal of the surface being reflected off.

Returns: The reflected vector.

To be added.

## Vector3.Round(Vector3) method

```csharp
public static System.Numerics.Vector3 Round (System.Numerics.Vector3 vector);
```

To be added.

Returns: To be added.

To be added.

## Vector3.Round(Vector3, MidpointRounding) method

```csharp
public static System.Numerics.Vector3 Round (System.Numerics.Vector3 vector, MidpointRounding mode);
```

To be added.

Returns: To be added.

To be added.
