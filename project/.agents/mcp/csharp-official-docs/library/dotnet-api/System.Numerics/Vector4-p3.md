---
title: "Vector4 struct (part 3 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Numerics/Vector4.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Vector4 struct (part 3 of 4)

## Vector4.LessThanOrEqualAny(Vector4, Vector4) method

```csharp
public static bool LessThanOrEqualAny (System.Numerics.Vector4 left, System.Numerics.Vector4 right);
```

To be added.

Parameters:

- `left`: To be added.
- `right`: To be added.

Returns: To be added.

To be added.

## Vector4.Load(Single*) method

```csharp
public static System.Numerics.Vector4 Load (float* source);
```

To be added.

Parameters:

- `source`: To be added.

Returns: To be added.

To be added.

## Vector4.LoadAligned(Single*) method

```csharp
public static System.Numerics.Vector4 LoadAligned (float* source);
```

To be added.

Parameters:

- `source`: To be added.

Returns: To be added.

To be added.

## Vector4.LoadAlignedNonTemporal(Single*) method

```csharp
public static System.Numerics.Vector4 LoadAlignedNonTemporal (float* source);
```

To be added.

Parameters:

- `source`: To be added.

Returns: To be added.

To be added.

## Vector4.LoadUnsafe(Single) method

```csharp
public static System.Numerics.Vector4 LoadUnsafe (ref readonly float source);
```

To be added.

Parameters:

- `source`: To be added.

Returns: To be added.

To be added.

## Vector4.LoadUnsafe(Single, UIntPtr) method

```csharp
public static System.Numerics.Vector4 LoadUnsafe (ref readonly float source, UIntPtr elementOffset);
```

To be added.

Parameters:

- `source`: To be added.
- `elementOffset`: To be added.

Returns: To be added.

To be added.

## Vector4.Log(Vector4) method

```csharp
public static System.Numerics.Vector4 Log (System.Numerics.Vector4 vector);
```

To be added.

Returns: To be added.

To be added.

## Vector4.Log2(Vector4) method

```csharp
public static System.Numerics.Vector4 Log2 (System.Numerics.Vector4 vector);
```

To be added.

Returns: To be added.

To be added.

## Vector4.Max(Vector4, Vector4) method

```csharp
public static System.Numerics.Vector4 Max (System.Numerics.Vector4 value1, System.Numerics.Vector4 value2);
```

Returns a vector whose elements are the maximum of each of the pairs of elements in two specified vectors.

Parameters:

- `value1`: The first vector.
- `value2`: The second vector.

Returns: The maximized vector.

To be added.

## Vector4.MaxMagnitude(Vector4, Vector4) method

```csharp
public static System.Numerics.Vector4 MaxMagnitude (System.Numerics.Vector4 value1, System.Numerics.Vector4 value2);
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

## Vector4.MaxMagnitudeNumber(Vector4, Vector4) method

```csharp
public static System.Numerics.Vector4 MaxMagnitudeNumber (System.Numerics.Vector4 value1, System.Numerics.Vector4 value2);
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

## Vector4.MaxNative(Vector4, Vector4) method

```csharp
public static System.Numerics.Vector4 MaxNative (System.Numerics.Vector4 value1, System.Numerics.Vector4 value2);
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

## Vector4.MaxNumber(Vector4, Vector4) method

```csharp
public static System.Numerics.Vector4 MaxNumber (System.Numerics.Vector4 value1, System.Numerics.Vector4 value2);
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

## Vector4.Min(Vector4, Vector4) method

```csharp
public static System.Numerics.Vector4 Min (System.Numerics.Vector4 value1, System.Numerics.Vector4 value2);
```

Returns a vector whose elements are the minimum of each of the pairs of elements in two specified vectors.

Parameters:

- `value1`: The first vector.
- `value2`: The second vector.

Returns: The minimized vector.

To be added.

## Vector4.MinMagnitude(Vector4, Vector4) method

```csharp
public static System.Numerics.Vector4 MinMagnitude (System.Numerics.Vector4 value1, System.Numerics.Vector4 value2);
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

## Vector4.MinMagnitudeNumber(Vector4, Vector4) method

```csharp
public static System.Numerics.Vector4 MinMagnitudeNumber (System.Numerics.Vector4 value1, System.Numerics.Vector4 value2);
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

## Vector4.MinNative(Vector4, Vector4) method

```csharp
public static System.Numerics.Vector4 MinNative (System.Numerics.Vector4 value1, System.Numerics.Vector4 value2);
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

## Vector4.MinNumber(Vector4, Vector4) method

```csharp
public static System.Numerics.Vector4 MinNumber (System.Numerics.Vector4 value1, System.Numerics.Vector4 value2);
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

## Vector4.Multiply(Vector4, Vector4) method

```csharp
public static System.Numerics.Vector4 Multiply (System.Numerics.Vector4 left, System.Numerics.Vector4 right);
```

Returns a new vector whose values are the product of each pair of elements in two specified vectors.

Parameters:

- `left`: The first vector.
- `right`: The second vector.

Returns: The element-wise product vector.

To be added.

## Vector4.Multiply(Vector4, Single) method

```csharp
public static System.Numerics.Vector4 Multiply (System.Numerics.Vector4 left, float right);
```

Multiplies a vector by a specified scalar.

Parameters:

- `left`: The vector to multiply.
- `right`: The scalar value.

Returns: The scaled vector.

To be added.

## Vector4.Multiply(Single, Vector4) method

```csharp
public static System.Numerics.Vector4 Multiply (float left, System.Numerics.Vector4 right);
```

Multiplies a scalar value by a specified vector.

Parameters:

- `left`: The scaled value.
- `right`: The vector.

Returns: The scaled vector.

To be added.

## Vector4.MultiplyAddEstimate(Vector4, Vector4, Vector4) method

```csharp
public static System.Numerics.Vector4 MultiplyAddEstimate (System.Numerics.Vector4 left, System.Numerics.Vector4 right, System.Numerics.Vector4 addend);
```

To be added.

Returns: To be added.

To be added.

## Vector4.Negate(Vector4) method

```csharp
public static System.Numerics.Vector4 Negate (System.Numerics.Vector4 value);
```

Negates a specified vector.

Parameters:

- `value`: The vector to negate.

Returns: The negated vector.

To be added.

## Vector4.None(Vector4, Single) method

```csharp
public static bool None (System.Numerics.Vector4 vector, float value);
```

To be added.

Parameters:

- `vector`: To be added.
- `value`: To be added.

Returns: To be added.

To be added.

## Vector4.NoneWhereAllBitsSet(Vector4) method

```csharp
public static bool NoneWhereAllBitsSet (System.Numerics.Vector4 vector);
```

To be added.

Parameters:

- `vector`: To be added.

Returns: To be added.

To be added.

## Vector4.Normalize(Vector4) method

```csharp
public static System.Numerics.Vector4 Normalize (System.Numerics.Vector4 vector);
```

Returns a vector with the same direction as the specified vector, but with a length of one.

Parameters:

- `vector`: The vector to normalize.

Returns: The normalized vector.

To be added.

## Vector4.OnesComplement(Vector4) method

```csharp
public static System.Numerics.Vector4 OnesComplement (System.Numerics.Vector4 value);
```

To be added.

Parameters:

- `value`: To be added.

Returns: To be added.

To be added.

## Vector4.op_Addition(Vector4, Vector4) method

```csharp
public static System.Numerics.Vector4 operator + (System.Numerics.Vector4 left, System.Numerics.Vector4 right);
```

Adds two vectors together.

Parameters:

- `left`: The first vector to add.
- `right`: The second vector to add.

Returns: The summed vector.

#### Remarks
The `Vector4.op_Addition` method defines the addition operation for `Vector4` objects.

## Vector4.op_BitwiseAnd(Vector4, Vector4) method

```csharp
public static System.Numerics.Vector4 operator & (System.Numerics.Vector4 left, System.Numerics.Vector4 right);
```

To be added.

Parameters:

- `left`: To be added.
- `right`: To be added.

Returns: To be added.

To be added.

## Vector4.op_BitwiseOr(Vector4, Vector4) method

```csharp
public static System.Numerics.Vector4 operator | (System.Numerics.Vector4 left, System.Numerics.Vector4 right);
```

To be added.

Parameters:

- `left`: To be added.
- `right`: To be added.

Returns: To be added.

To be added.

## Vector4.op_Division(Vector4, Vector4) method

```csharp
public static System.Numerics.Vector4 operator / (System.Numerics.Vector4 left, System.Numerics.Vector4 right);
```

Divides the first vector by the second.

Parameters:

- `left`: The first vector.
- `right`: The second vector.

Returns: The vector that results from dividing `left` by `right`.

#### Remarks
The `Vector4.op_Division` method defines the division operation for `Vector4` objects.

## Vector4.op_Division(Vector4, Single) method

```csharp
public static System.Numerics.Vector4 operator / (System.Numerics.Vector4 value1, float value2);
```

Divides the specified vector by a specified scalar value.

Parameters:

- `value1`: The vector.
- `value2`: The scalar value.

Returns: The result of the division.

#### Remarks
The `Vector4.op_Division` method defines the division operation for `Vector4` objects.

## Vector4.op_Equality(Vector4, Vector4) method

```csharp
public static bool operator == (System.Numerics.Vector4 left, System.Numerics.Vector4 right);
```

Returns a value that indicates whether each pair of elements in two specified vectors is equal.

Parameters:

- `left`: The first vector to compare.
- `right`: The second vector to compare.

Returns: `true` if `left` and `right` are equal; otherwise, `false`.

#### Remarks
Two `Vector4` objects are equal if each element in `left` is equal to the corresponding element in `right`.

## Vector4.op_ExclusiveOr(Vector4, Vector4) method

```csharp
public static System.Numerics.Vector4 operator ^ (System.Numerics.Vector4 left, System.Numerics.Vector4 right);
```

To be added.

Parameters:

- `left`: To be added.
- `right`: To be added.

Returns: To be added.

To be added.

## Vector4.op_Inequality(Vector4, Vector4) method

```csharp
public static bool operator != (System.Numerics.Vector4 left, System.Numerics.Vector4 right);
```

Returns a value that indicates whether two specified vectors are not equal.

Parameters:

- `left`: The first vector to compare.
- `right`: The second vector to compare.

Returns: `true` if `left` and `right` are not equal; otherwise, `false`.

To be added.

## Vector4.op_LeftShift(Vector4, Int32) method

```csharp
public static System.Numerics.Vector4 operator << (System.Numerics.Vector4 value, int shiftAmount);
```

To be added.

Parameters:

- `value`: To be added.
- `shiftAmount`: To be added.

Returns: To be added.

To be added.

## Vector4.op_Multiply(Vector4, Vector4) method

```csharp
public static System.Numerics.Vector4 operator * (System.Numerics.Vector4 left, System.Numerics.Vector4 right);
```

Returns a new vector whose values are the product of each pair of elements in two specified vectors.

Parameters:

- `left`: The first vector.
- `right`: The second vector.

Returns: The element-wise product vector.

#### Remarks
The `Vector4.op_Multiply` method defines the multiplication operation for `Vector4` objects.

## Vector4.op_Multiply(Vector4, Single) method

```csharp
public static System.Numerics.Vector4 operator * (System.Numerics.Vector4 left, float right);
```

Multiples the specified vector by the specified scalar value.

Parameters:

- `left`: The vector.
- `right`: The scalar value.

Returns: The scaled vector.

#### Remarks
The `Vector4.op_Multiply` method defines the multiplication operation for `Vector4` objects.

## Vector4.op_Multiply(Single, Vector4) method

```csharp
public static System.Numerics.Vector4 operator * (float left, System.Numerics.Vector4 right);
```

Multiples the scalar value by the specified vector.

Parameters:

- `left`: The vector.
- `right`: The scalar value.

Returns: The scaled vector.

#### Remarks
The `Vector4.op_Multiply` method defines the multiplication operation for `Vector4` objects.

## Vector4.op_OnesComplement(Vector4) method

```csharp
public static System.Numerics.Vector4 operator ~ (System.Numerics.Vector4 value);
```

To be added.

Parameters:

- `value`: To be added.

Returns: To be added.

To be added.

## Vector4.op_RightShift(Vector4, Int32) method

```csharp
public static System.Numerics.Vector4 operator >> (System.Numerics.Vector4 value, int shiftAmount);
```

To be added.

Parameters:

- `value`: To be added.
- `shiftAmount`: To be added.

Returns: To be added.

To be added.

## Vector4.op_Subtraction(Vector4, Vector4) method

```csharp
public static System.Numerics.Vector4 operator - (System.Numerics.Vector4 left, System.Numerics.Vector4 right);
```

Subtracts the second vector from the first.

Parameters:

- `left`: The first vector.
- `right`: The second vector.

Returns: The vector that results from subtracting `right` from `left`.

#### Remarks
The `Vector4.op_Subtraction` method defines the subtraction operation for `Vector4` objects.
