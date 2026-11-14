---
title: "Vector2 struct (part 3 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Numerics/Vector2.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Vector2 struct (part 3 of 4)

## Vector2.MaxMagnitudeNumber(Vector2, Vector2) method

```csharp
public static System.Numerics.Vector2 MaxMagnitudeNumber (System.Numerics.Vector2 value1, System.Numerics.Vector2 value2);
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

## Vector2.MaxNative(Vector2, Vector2) method

```csharp
public static System.Numerics.Vector2 MaxNative (System.Numerics.Vector2 value1, System.Numerics.Vector2 value2);
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

## Vector2.MaxNumber(Vector2, Vector2) method

```csharp
public static System.Numerics.Vector2 MaxNumber (System.Numerics.Vector2 value1, System.Numerics.Vector2 value2);
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

## Vector2.Min(Vector2, Vector2) method

```csharp
public static System.Numerics.Vector2 Min (System.Numerics.Vector2 value1, System.Numerics.Vector2 value2);
```

Returns a vector whose elements are the minimum of each of the pairs of elements in two specified vectors.

Parameters:

- `value1`: The first vector.
- `value2`: The second vector.

Returns: The minimized vector.

To be added.

## Vector2.MinMagnitude(Vector2, Vector2) method

```csharp
public static System.Numerics.Vector2 MinMagnitude (System.Numerics.Vector2 value1, System.Numerics.Vector2 value2);
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

## Vector2.MinMagnitudeNumber(Vector2, Vector2) method

```csharp
public static System.Numerics.Vector2 MinMagnitudeNumber (System.Numerics.Vector2 value1, System.Numerics.Vector2 value2);
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

## Vector2.MinNative(Vector2, Vector2) method

```csharp
public static System.Numerics.Vector2 MinNative (System.Numerics.Vector2 value1, System.Numerics.Vector2 value2);
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

## Vector2.MinNumber(Vector2, Vector2) method

```csharp
public static System.Numerics.Vector2 MinNumber (System.Numerics.Vector2 value1, System.Numerics.Vector2 value2);
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

## Vector2.Multiply(Vector2, Vector2) method

```csharp
public static System.Numerics.Vector2 Multiply (System.Numerics.Vector2 left, System.Numerics.Vector2 right);
```

Returns a new vector whose values are the product of each pair of elements in two specified vectors.

Parameters:

- `left`: The first vector.
- `right`: The second vector.

Returns: The element-wise product vector.

To be added.

## Vector2.Multiply(Vector2, Single) method

```csharp
public static System.Numerics.Vector2 Multiply (System.Numerics.Vector2 left, float right);
```

Multiplies a vector by a specified scalar.

Parameters:

- `left`: The vector to multiply.
- `right`: The scalar value.

Returns: The scaled vector.

To be added.

## Vector2.Multiply(Single, Vector2) method

```csharp
public static System.Numerics.Vector2 Multiply (float left, System.Numerics.Vector2 right);
```

Multiplies a scalar value by a specified vector.

Parameters:

- `left`: The scaled value.
- `right`: The vector.

Returns: The scaled vector.

To be added.

## Vector2.MultiplyAddEstimate(Vector2, Vector2, Vector2) method

```csharp
public static System.Numerics.Vector2 MultiplyAddEstimate (System.Numerics.Vector2 left, System.Numerics.Vector2 right, System.Numerics.Vector2 addend);
```

To be added.

Returns: To be added.

To be added.

## Vector2.Negate(Vector2) method

```csharp
public static System.Numerics.Vector2 Negate (System.Numerics.Vector2 value);
```

Negates a specified vector.

Parameters:

- `value`: The vector to negate.

Returns: The negated vector.

To be added.

## Vector2.None(Vector2, Single) method

```csharp
public static bool None (System.Numerics.Vector2 vector, float value);
```

To be added.

Parameters:

- `vector`: To be added.
- `value`: To be added.

Returns: To be added.

To be added.

## Vector2.NoneWhereAllBitsSet(Vector2) method

```csharp
public static bool NoneWhereAllBitsSet (System.Numerics.Vector2 vector);
```

To be added.

Parameters:

- `vector`: To be added.

Returns: To be added.

To be added.

## Vector2.Normalize(Vector2) method

```csharp
public static System.Numerics.Vector2 Normalize (System.Numerics.Vector2 value);
```

Returns a vector with the same direction as the specified vector, but with a length of one.

Parameters:

- `value`: The vector to normalize.

Returns: The normalized vector.

To be added.

## Vector2.OnesComplement(Vector2) method

```csharp
public static System.Numerics.Vector2 OnesComplement (System.Numerics.Vector2 value);
```

To be added.

Parameters:

- `value`: To be added.

Returns: To be added.

To be added.

## Vector2.op_Addition(Vector2, Vector2) method

```csharp
public static System.Numerics.Vector2 operator + (System.Numerics.Vector2 left, System.Numerics.Vector2 right);
```

Adds two vectors together.

Parameters:

- `left`: The first vector to add.
- `right`: The second vector to add.

Returns: The summed vector.

#### Remarks
The `Vector2.op_Addition` method defines the addition operation for `Vector2` objects.

## Vector2.op_BitwiseAnd(Vector2, Vector2) method

```csharp
public static System.Numerics.Vector2 operator & (System.Numerics.Vector2 left, System.Numerics.Vector2 right);
```

To be added.

Parameters:

- `left`: To be added.
- `right`: To be added.

Returns: To be added.

To be added.

## Vector2.op_BitwiseOr(Vector2, Vector2) method

```csharp
public static System.Numerics.Vector2 operator | (System.Numerics.Vector2 left, System.Numerics.Vector2 right);
```

To be added.

Parameters:

- `left`: To be added.
- `right`: To be added.

Returns: To be added.

To be added.

## Vector2.op_Division(Vector2, Vector2) method

```csharp
public static System.Numerics.Vector2 operator / (System.Numerics.Vector2 left, System.Numerics.Vector2 right);
```

Divides the first vector by the second.

Parameters:

- `left`: The first vector.
- `right`: The second vector.

Returns: The vector that results from dividing `left` by `right`.

#### Remarks
The `Vector2.op_Division` method defines the division operation for `Vector2` objects.

## Vector2.op_Division(Vector2, Single) method

```csharp
public static System.Numerics.Vector2 operator / (System.Numerics.Vector2 value1, float value2);
```

Divides the specified vector by a specified scalar value.

Parameters:

- `value1`: The vector.
- `value2`: The scalar value.

Returns: The result of the division.

#### Remarks
The `Vector2.op_Division` method defines the division operation for `Vector2` objects.

## Vector2.op_Equality(Vector2, Vector2) method

```csharp
public static bool operator == (System.Numerics.Vector2 left, System.Numerics.Vector2 right);
```

Returns a value that indicates whether each pair of elements in two specified vectors is equal.

Parameters:

- `left`: The first vector to compare.
- `right`: The second vector to compare.

Returns: `true` if `left` and `right` are equal; otherwise, `false`.

#### Remarks
Two `Vector2` objects are equal if each value in `left` is equal to the corresponding value in `right`.

## Vector2.op_ExclusiveOr(Vector2, Vector2) method

```csharp
public static System.Numerics.Vector2 operator ^ (System.Numerics.Vector2 left, System.Numerics.Vector2 right);
```

To be added.

Parameters:

- `left`: To be added.
- `right`: To be added.

Returns: To be added.

To be added.

## Vector2.op_Inequality(Vector2, Vector2) method

```csharp
public static bool operator != (System.Numerics.Vector2 left, System.Numerics.Vector2 right);
```

Returns a value that indicates whether two specified vectors are not equal.

Parameters:

- `left`: The first vector to compare.
- `right`: The second vector to compare.

Returns: `true` if `left` and `right` are not equal; otherwise, `false`.

To be added.

## Vector2.op_LeftShift(Vector2, Int32) method

```csharp
public static System.Numerics.Vector2 operator << (System.Numerics.Vector2 value, int shiftAmount);
```

To be added.

Parameters:

- `value`: To be added.
- `shiftAmount`: To be added.

Returns: To be added.

To be added.

## Vector2.op_Multiply(Vector2, Vector2) method

```csharp
public static System.Numerics.Vector2 operator * (System.Numerics.Vector2 left, System.Numerics.Vector2 right);
```

Returns a new vector whose values are the product of each pair of elements in two specified vectors.

Parameters:

- `left`: The first vector.
- `right`: The second vector.

Returns: The element-wise product vector.

#### Remarks
The `Vector2.op_Multiply` method defines the multiplication operation for `Vector2` objects.

## Vector2.op_Multiply(Vector2, Single) method

```csharp
public static System.Numerics.Vector2 operator * (System.Numerics.Vector2 left, float right);
```

Multiples the specified vector by the specified scalar value.

Parameters:

- `left`: The vector.
- `right`: The scalar value.

Returns: The scaled vector.

#### Remarks
The `Vector2.op_Multiply` method defines the multiplication operation for `Vector2` objects.

## Vector2.op_Multiply(Single, Vector2) method

```csharp
public static System.Numerics.Vector2 operator * (float left, System.Numerics.Vector2 right);
```

Multiples the scalar value by the specified vector.

Parameters:

- `left`: The vector.
- `right`: The scalar value.

Returns: The scaled vector.

#### Remarks
The `Vector2.op_Multiply` method defines the multiplication operation for `Vector2` objects.

## Vector2.op_OnesComplement(Vector2) method

```csharp
public static System.Numerics.Vector2 operator ~ (System.Numerics.Vector2 value);
```

To be added.

Parameters:

- `value`: To be added.

Returns: To be added.

To be added.

## Vector2.op_RightShift(Vector2, Int32) method

```csharp
public static System.Numerics.Vector2 operator >> (System.Numerics.Vector2 value, int shiftAmount);
```

To be added.

Parameters:

- `value`: To be added.
- `shiftAmount`: To be added.

Returns: To be added.

To be added.

## Vector2.op_Subtraction(Vector2, Vector2) method

```csharp
public static System.Numerics.Vector2 operator - (System.Numerics.Vector2 left, System.Numerics.Vector2 right);
```

Subtracts the second vector from the first.

Parameters:

- `left`: The first vector.
- `right`: The second vector.

Returns: The vector that results from subtracting `right` from `left`.

#### Remarks
The `Vector2.op_Subtraction` method defines the subtraction operation for `Vector2` objects.

## Vector2.op_UnaryNegation(Vector2) method

```csharp
public static System.Numerics.Vector2 operator - (System.Numerics.Vector2 value);
```

Negates the specified vector.

Parameters:

- `value`: The vector to negate.

Returns: The negated vector.

#### Remarks
The `Vector2.op_UnaryNegation` method defines the unary negation operation for `Vector2` objects.

## Vector2.op_UnaryPlus(Vector2) method

```csharp
public static System.Numerics.Vector2 operator + (System.Numerics.Vector2 value);
```

To be added.

Parameters:

- `value`: To be added.

Returns: To be added.

To be added.

## Vector2.op_UnsignedRightShift(Vector2, Int32) method

```csharp
public static System.Numerics.Vector2 op_UnsignedRightShift (System.Numerics.Vector2 value, int shiftAmount);
```

To be added.

Parameters:

- `value`: To be added.
- `shiftAmount`: To be added.

Returns: To be added.

To be added.

## Vector2.RadiansToDegrees(Vector2) method

```csharp
public static System.Numerics.Vector2 RadiansToDegrees (System.Numerics.Vector2 radians);
```

To be added.

Returns: To be added.

To be added.

## Vector2.Reflect(Vector2, Vector2) method

```csharp
public static System.Numerics.Vector2 Reflect (System.Numerics.Vector2 vector, System.Numerics.Vector2 normal);
```

Returns the reflection of a vector off a surface that has the specified normal.

Parameters:

- `vector`: The source vector.
- `normal`: The normal of the surface being reflected off.

Returns: The reflected vector.

To be added.

## Vector2.Round(Vector2) method

```csharp
public static System.Numerics.Vector2 Round (System.Numerics.Vector2 vector);
```

To be added.

Returns: To be added.

To be added.

## Vector2.Round(Vector2, MidpointRounding) method

```csharp
public static System.Numerics.Vector2 Round (System.Numerics.Vector2 vector, MidpointRounding mode);
```

To be added.

Returns: To be added.

To be added.

## Vector2.Shuffle(Vector2, Byte, Byte) method

```csharp
public static System.Numerics.Vector2 Shuffle (System.Numerics.Vector2 vector, byte xIndex, byte yIndex);
```

Creates a new vector by selecting values from an input vector using a set of indices.

Parameters:

- `vector`: The input vector from which values are selected.
- `xIndex`: The index used to select a value from `vector` to be used as the value of `Vector2.X` in the result.
- `yIndex`: The index used to select a value from `vector` to be used as the value of `Vector2.Y` in the result

Returns: A new vector containing the values from `vector` selected by the given indices.

To be added.

## Vector2.Sin(Vector2) method

```csharp
public static System.Numerics.Vector2 Sin (System.Numerics.Vector2 vector);
```

To be added.

Returns: To be added.

To be added.
