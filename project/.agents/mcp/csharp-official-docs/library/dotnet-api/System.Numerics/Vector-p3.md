---
title: "Vector class (part 3 of 9)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Numerics/Vector.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Vector class (part 3 of 9)

## Vector.CreateSequence<T>(T, T) method

```csharp
public static System.Numerics.Vector<T> CreateSequence<T> (T start, T step);
```

Creates a new `Vector<T>` instance where the elements begin at a specified value and which are spaced apart according to another specified value.

Parameters:

- `T`: The type of the elements in the vector.
- `start`: The value that element 0 will be initialized to.
- `step`: The value that indicates how far apart each element should be from the previous.

Returns: A new `Vector<T>` instance with the first element initialized to `start` and each subsequent element initialized to the value of the previous element plus `step`.

To be added.

## Vector.DegreesToRadians(Double>) method

```csharp
public static System.Numerics.Vector<double> DegreesToRadians (System.Numerics.Vector<double> degrees);
```

To be added.

Returns: To be added.

To be added.

## Vector.DegreesToRadians(Single>) method

```csharp
public static System.Numerics.Vector<float> DegreesToRadians (System.Numerics.Vector<float> degrees);
```

To be added.

Returns: To be added.

To be added.

## Vector.Divide<T>(Vector<T>, Vector<T>) method

```csharp
public static System.Numerics.Vector<T> Divide<T> (System.Numerics.Vector<T> left, System.Numerics.Vector<T> right);
```

Returns a new vector whose values are the result of dividing the first vector's elements by the corresponding elements in the second vector.

Parameters:

- `T`: The vector type. `T` can be any primitive numeric type.
- `left`: The first vector.
- `right`: The second vector.

Returns: The divided vector.

To be added.

## Vector.Divide<T>(Vector<T>, T) method

```csharp
public static System.Numerics.Vector<T> Divide<T> (System.Numerics.Vector<T> left, T right);
```

Divides a vector by a scalar to compute the per-element quotient.

Parameters:

- `T`: The type of the elements in the vector.
- `left`: The vector that will be divided by `right`.
- `right`: The scalar that will divide `left`.

Returns: The quotient of `left` divided by `right`.

To be added.

## Vector.Dot<T>(Vector<T>, Vector<T>) method

```csharp
public static T Dot<T> (System.Numerics.Vector<T> left, System.Numerics.Vector<T> right);
```

Returns the dot product of two vectors.

Parameters:

- `T`: The vector type. `T` can be any primitive numeric type.
- `left`: The first vector.
- `right`: The second vector.

Returns: The dot product.

To be added.

## Vector.Equals(Double>, Double>) method

```csharp
public static System.Numerics.Vector<long> Equals (System.Numerics.Vector<double> left, System.Numerics.Vector<double> right);
```

Returns a new integral vector whose elements signal whether the elements in two specified double-precision vectors are equal.

Parameters:

- `left`: The first vector to compare.
- `right`: The second vector to compare.

Returns: The resulting integral vector.

To be added.

## Vector.Equals(Int32>, Int32>) method

```csharp
public static System.Numerics.Vector<int> Equals (System.Numerics.Vector<int> left, System.Numerics.Vector<int> right);
```

Returns a new integral vector whose elements signal whether the elements in two specified integral vectors are equal.

Parameters:

- `left`: The first vector to compare.
- `right`: The second vector to compare.

Returns: The resulting integral vector.

To be added.

## Vector.Equals(Int64>, Int64>) method

```csharp
public static System.Numerics.Vector<long> Equals (System.Numerics.Vector<long> left, System.Numerics.Vector<long> right);
```

Returns a new vector whose elements signal whether the elements in two specified long integer vectors are equal.

Parameters:

- `left`: The first vector to compare.
- `right`: The second vector to compare.

Returns: The resulting long integer vector.

To be added.

## Vector.Equals(Single>, Single>) method

```csharp
public static System.Numerics.Vector<int> Equals (System.Numerics.Vector<float> left, System.Numerics.Vector<float> right);
```

Returns a new integral vector whose elements signal whether the elements in two specified single-precision vectors are equal.

Parameters:

- `left`: The first vector to compare.
- `right`: The second vector to compare.

Returns: The resulting integral vector.

To be added.

## Vector.Equals<T>(Vector<T>, Vector<T>) method

```csharp
public static System.Numerics.Vector<T> Equals<T> (System.Numerics.Vector<T> left, System.Numerics.Vector<T> right);
```

Returns a new vector of a specified type whose elements signal whether the elements in two specified vectors of the same type are equal.

Parameters:

- `T`: The vector type. `T` can be any primitive numeric type.
- `left`: The first vector to compare.
- `right`: The second vector to compare.

Returns: The resulting vector.

To be added.

## Vector.EqualsAll<T>(Vector<T>, Vector<T>) method

```csharp
public static bool EqualsAll<T> (System.Numerics.Vector<T> left, System.Numerics.Vector<T> right);
```

Returns a value that indicates whether each pair of elements in the given vectors is equal.

Parameters:

- `T`: The vector type. `T` can be any primitive numeric type.
- `left`: The first vector to compare.
- `right`: The second vector to compare.

Returns: `true` if all elements in `left` and `right` are equal; otherwise, `false`.

To be added.

## Vector.EqualsAny<T>(Vector<T>, Vector<T>) method

```csharp
public static bool EqualsAny<T> (System.Numerics.Vector<T> left, System.Numerics.Vector<T> right);
```

Returns a value that indicates whether any single pair of elements in the given vectors is equal.

Parameters:

- `T`: The vector type. `T` can be any primitive numeric type.
- `left`: The first vector to compare.
- `right`: The second vector to compare.

Returns: `true` if any element pair in `left` and `right` is equal; otherwise, `false`.

To be added.

## Vector.Exp(Double>) method

```csharp
public static System.Numerics.Vector<double> Exp (System.Numerics.Vector<double> vector);
```

To be added.

Returns: To be added.

To be added.

## Vector.Exp(Single>) method

```csharp
public static System.Numerics.Vector<float> Exp (System.Numerics.Vector<float> vector);
```

To be added.

Returns: To be added.

To be added.

## Vector.ExtractMostSignificantBits(Vector2) method

```csharp
public static uint ExtractMostSignificantBits (this System.Numerics.Vector2 vector);
```

To be added.

Parameters:

- `vector`: To be added.

Returns: To be added.

To be added.

## Vector.ExtractMostSignificantBits(Vector3) method

```csharp
public static uint ExtractMostSignificantBits (this System.Numerics.Vector3 vector);
```

To be added.

Parameters:

- `vector`: To be added.

Returns: To be added.

To be added.

## Vector.ExtractMostSignificantBits(Vector4) method

```csharp
public static uint ExtractMostSignificantBits (this System.Numerics.Vector4 vector);
```

To be added.

Parameters:

- `vector`: To be added.

Returns: To be added.

To be added.

## Vector.Floor(Double>) method

```csharp
public static System.Numerics.Vector<double> Floor (System.Numerics.Vector<double> value);
```

Returns a new vector whose elements are the largest integral values that are less than or equal to the given vector's elements.

Parameters:

- `value`: The source vector.

Returns: The vector whose elements are the largest integral values that are less than or equal to the given vector's elements.
If a value is equal to `Double.NaN`, `Double.NegativeInfinity`, or `Double.PositiveInfinity`, that value is returned.

#### Remarks

Note that this method returns a `Double` instead of an integral type.

## Vector.Floor(Single>) method

```csharp
public static System.Numerics.Vector<float> Floor (System.Numerics.Vector<float> value);
```

Returns a new vector whose elements are the largest integral values that are less than or equal to the given vector's elements.

Parameters:

- `value`: The source vector.

Returns: The vector whose elements are the largest integral values that are less than or equal to the given vector's elements.
If a value is equal to `Single.NaN`, `Single.NegativeInfinity`, or `Single.PositiveInfinity`, that value is returned.

#### Remarks

Note that this method returns a `Single` instead of an integral type.

## Vector.FusedMultiplyAdd(Double>, Double>, Double>) method

```csharp
public static System.Numerics.Vector<double> FusedMultiplyAdd (System.Numerics.Vector<double> left, System.Numerics.Vector<double> right, System.Numerics.Vector<double> addend);
```

Computes (`left` * `right`) + `addend`, rounded as one ternary operation.

Parameters:

- `left`: The vector to be multiplied with `right`.
- `right`: The vector to be multiplied with `left`.
- `addend`: The vector to be added to the result of `left` multiplied by `right`.

Returns: (`left` * `right`) + `addend`, rounded as one ternary operation.

This computes (`left` * `right`) as if to infinite precision, adds `addend` to that result as if to infinite precision, and finally rounds to the nearest representable value.

This differs from the non-fused sequence, which would compute (`left` * `right`) as if to infinite precision, round the result to the nearest representable value, add `addend` to the rounded result as if to infinite precision, and finally round to the nearest representable value.

## Vector.FusedMultiplyAdd(Single>, Single>, Single>) method

```csharp
public static System.Numerics.Vector<float> FusedMultiplyAdd (System.Numerics.Vector<float> left, System.Numerics.Vector<float> right, System.Numerics.Vector<float> addend);
```

Computes (`left` * `right`) + `addend`, rounded as one ternary operation.

Parameters:

- `left`: The vector to be multiplied with `right`.
- `right`: The vector to be multiplied with `left`.
- `addend`: The vector to be added to the result of `left` multiplied by `right`.

Returns: (`left` * `right`) + `addend`, rounded as one ternary operation.

This computes (`left` * `right`) as if to infinite precision, adds `addend` to that result as if to infinite precision, and finally rounds to the nearest representable value.

This differs from the non-fused sequence, which would compute (`left` * `right`) as if to infinite precision, round the result to the nearest representable value, add `addend` to the rounded result as if to infinite precision, and finally round to the nearest representable value.

## Vector.get_E<T>() method

```csharp
public static System.Numerics.Vector<T> get_E<T> () where T : System.Numerics.IFloatingPointConstants<T>;
```

To be added.

Parameters:

- `T`: To be added.

Returns: To be added.

To be added.

## Vector.get_Epsilon<T>() method

```csharp
public static System.Numerics.Vector<T> get_Epsilon<T> () where T : System.Numerics.IFloatingPointIeee754<T>;
```

To be added.

Parameters:

- `T`: To be added.

Returns: To be added.

To be added.

## Vector.get_NaN<T>() method

```csharp
public static System.Numerics.Vector<T> get_NaN<T> () where T : System.Numerics.IFloatingPointIeee754<T>;
```

To be added.

Parameters:

- `T`: To be added.

Returns: To be added.

To be added.

## Vector.get_NegativeInfinity<T>() method

```csharp
public static System.Numerics.Vector<T> get_NegativeInfinity<T> () where T : System.Numerics.IFloatingPointIeee754<T>;
```

To be added.

Parameters:

- `T`: To be added.

Returns: To be added.

To be added.

## Vector.get_NegativeOne<T>() method

```csharp
public static System.Numerics.Vector<T> get_NegativeOne<T> () where T : System.Numerics.ISignedNumber<T>;
```

To be added.

Parameters:

- `T`: To be added.

Returns: To be added.

To be added.

## Vector.get_NegativeZero<T>() method

```csharp
public static System.Numerics.Vector<T> get_NegativeZero<T> () where T : System.Numerics.IFloatingPointIeee754<T>;
```

To be added.

Parameters:

- `T`: To be added.

Returns: To be added.

To be added.

## Vector.get_Pi<T>() method

```csharp
public static System.Numerics.Vector<T> get_Pi<T> () where T : System.Numerics.IFloatingPointConstants<T>;
```

To be added.

Parameters:

- `T`: To be added.

Returns: To be added.

To be added.

## Vector.get_PositiveInfinity<T>() method

```csharp
public static System.Numerics.Vector<T> get_PositiveInfinity<T> () where T : System.Numerics.IFloatingPointIeee754<T>;
```

To be added.

Parameters:

- `T`: To be added.

Returns: To be added.

To be added.

## Vector.get_SignSequence<T>() method

```csharp
public static System.Numerics.Vector<T> get_SignSequence<T> () where T : System.Numerics.ISignedNumber<T>;
```

To be added.

Parameters:

- `T`: To be added.

Returns: To be added.

To be added.

## Vector.get_Tau<T>() method

```csharp
public static System.Numerics.Vector<T> get_Tau<T> () where T : System.Numerics.IFloatingPointConstants<T>;
```

To be added.

Parameters:

- `T`: To be added.

Returns: To be added.

To be added.

## Vector.GetElement(Vector2, Int32) method

```csharp
public static float GetElement (this System.Numerics.Vector2 vector, int index);
```

To be added.

Parameters:

- `vector`: To be added.
- `index`: To be added.

Returns: To be added.

To be added.

## Vector.GetElement(Vector3, Int32) method

```csharp
public static float GetElement (this System.Numerics.Vector3 vector, int index);
```

To be added.

Parameters:

- `vector`: To be added.
- `index`: To be added.

Returns: To be added.

To be added.

## Vector.GetElement(Vector4, Int32) method

```csharp
public static float GetElement (this System.Numerics.Vector4 vector, int index);
```

To be added.

Parameters:

- `vector`: To be added.
- `index`: To be added.

Returns: To be added.

To be added.

## Vector.GetElement<T>(Vector<T>, Int32) method

```csharp
public static T GetElement<T> (this System.Numerics.Vector<T> vector, int index);
```

Gets the element at the specified index.

Parameters:

- `T`: The type of the elements in the vector.
- `vector`: The vector to get the element from.
- `index`: The index of the element to get.

Returns: The value of the element at `index`.

Exceptions:

- `ArgumentOutOfRangeException`: `index` was less than zero or greater than the number of elements.
- `NotSupportedException`: The type of `vector` (`T`) is not supported.

To be added.

## Vector.GreaterThan(Double>, Double>) method

```csharp
public static System.Numerics.Vector<long> GreaterThan (System.Numerics.Vector<double> left, System.Numerics.Vector<double> right);
```

Returns a new integral vector whose elements signal whether the elements in one double-precision floating-point vector are greater than their corresponding elements in a second double-precision floating-point vector.

Parameters:

- `left`: The first vector to compare.
- `right`: The second vector to compare.

Returns: The resulting integral vector.

To be added.
