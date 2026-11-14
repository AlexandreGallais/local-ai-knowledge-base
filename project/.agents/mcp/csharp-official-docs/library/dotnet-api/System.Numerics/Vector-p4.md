---
title: "Vector class (part 4 of 9)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Numerics/Vector.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Vector class (part 4 of 9)

## Vector.GreaterThan(Int32>, Int32>) method

```csharp
public static System.Numerics.Vector<int> GreaterThan (System.Numerics.Vector<int> left, System.Numerics.Vector<int> right);
```

Returns a new integral vector whose elements signal whether the elements in one integral vector are greater than their corresponding elements in a second integral vector.

Parameters:

- `left`: The first vector to compare.
- `right`: The second vector to compare.

Returns: The resulting integral vector.

To be added.

## Vector.GreaterThan(Int64>, Int64>) method

```csharp
public static System.Numerics.Vector<long> GreaterThan (System.Numerics.Vector<long> left, System.Numerics.Vector<long> right);
```

Returns a new long integer vector whose elements signal whether the elements in one long integer vector are greater than their corresponding elements in a second long integer vector.

Parameters:

- `left`: The first vector to compare.
- `right`: The second vector to compare.

Returns: The resulting long integer vector.

To be added.

## Vector.GreaterThan(Single>, Single>) method

```csharp
public static System.Numerics.Vector<int> GreaterThan (System.Numerics.Vector<float> left, System.Numerics.Vector<float> right);
```

Returns a new integral vector whose elements signal whether the elements in one single-precision floating-point vector are greater than their corresponding elements in a second single-precision floating-point vector.

Parameters:

- `left`: The first vector to compare.
- `right`: The second vector to compare.

Returns: The resulting integral vector.

To be added.

## Vector.GreaterThan<T>(Vector<T>, Vector<T>) method

```csharp
public static System.Numerics.Vector<T> GreaterThan<T> (System.Numerics.Vector<T> left, System.Numerics.Vector<T> right);
```

Returns a new vector whose elements signal whether the elements in one vector of a specified type are greater than their corresponding elements in the second vector of the same time.

Parameters:

- `T`: The vector type. `T` can be any primitive numeric type.
- `left`: The first vector to compare.
- `right`: The second vector to compare.

Returns: The resulting vector.

To be added.

## Vector.GreaterThanAll<T>(Vector<T>, Vector<T>) method

```csharp
public static bool GreaterThanAll<T> (System.Numerics.Vector<T> left, System.Numerics.Vector<T> right);
```

Returns a value that indicates whether all elements in the first vector are greater than the corresponding elements in the second vector.

Parameters:

- `T`: The vector type. `T` can be any primitive numeric type.
- `left`: The first vector to compare.
- `right`: The second vector to compare.

Returns: `true` if all elements in `left` are greater than the corresponding elements in `right`; otherwise, `false`.

To be added.

## Vector.GreaterThanAny<T>(Vector<T>, Vector<T>) method

```csharp
public static bool GreaterThanAny<T> (System.Numerics.Vector<T> left, System.Numerics.Vector<T> right);
```

Returns a value that indicates whether any element in the first vector is greater than the corresponding element in the second vector.

Parameters:

- `T`: The vector type. `T` can be any primitive numeric type.
- `left`: The first vector to compare.
- `right`: The second vector to compare.

Returns: `true` if any element in `left` is greater than the corresponding element in `right`; otherwise,  `false`.

To be added.

## Vector.GreaterThanOrEqual(Double>, Double>) method

```csharp
public static System.Numerics.Vector<long> GreaterThanOrEqual (System.Numerics.Vector<double> left, System.Numerics.Vector<double> right);
```

Returns a new integral vector whose elements signal whether the elements in one vector are greater than or equal to their corresponding elements in the second double-precision floating-point vector.

Parameters:

- `left`: The first vector to compare.
- `right`: The second vector to compare.

Returns: The resulting integral vector.

To be added.

## Vector.GreaterThanOrEqual(Int32>, Int32>) method

```csharp
public static System.Numerics.Vector<int> GreaterThanOrEqual (System.Numerics.Vector<int> left, System.Numerics.Vector<int> right);
```

Returns a new integral vector whose elements signal whether the elements in one integral vector are greater than or equal to their corresponding elements in the second integral vector.

Parameters:

- `left`: The first vector to compare.
- `right`: The second vector to compare.

Returns: The resulting integral vector.

To be added.

## Vector.GreaterThanOrEqual(Int64>, Int64>) method

```csharp
public static System.Numerics.Vector<long> GreaterThanOrEqual (System.Numerics.Vector<long> left, System.Numerics.Vector<long> right);
```

Returns a new long integer vector whose elements signal whether the elements in one long integer vector are greater than or equal to their corresponding elements in the second long integer vector.

Parameters:

- `left`: The first vector to compare.
- `right`: The second vector to compare.

Returns: The resulting long integer vector.

To be added.

## Vector.GreaterThanOrEqual(Single>, Single>) method

```csharp
public static System.Numerics.Vector<int> GreaterThanOrEqual (System.Numerics.Vector<float> left, System.Numerics.Vector<float> right);
```

Returns a new integral vector whose elements signal whether the elements in one vector are greater than or equal to their corresponding elements in the single-precision floating-point second vector.

Parameters:

- `left`: The first vector to compare.
- `right`: The second vector to compare.

Returns: The resulting integral vector.

To be added.

## Vector.GreaterThanOrEqual<T>(Vector<T>, Vector<T>) method

```csharp
public static System.Numerics.Vector<T> GreaterThanOrEqual<T> (System.Numerics.Vector<T> left, System.Numerics.Vector<T> right);
```

Returns a new vector whose elements signal whether the elements in one vector of a specified type are greater than or equal to their corresponding elements in the second vector of the same type.

Parameters:

- `T`: The vector type. `T` can be any primitive numeric type.
- `left`: The first vector to compare.
- `right`: The second vector to compare.

Returns: The resulting vector.

To be added.

## Vector.GreaterThanOrEqualAll<T>(Vector<T>, Vector<T>) method

```csharp
public static bool GreaterThanOrEqualAll<T> (System.Numerics.Vector<T> left, System.Numerics.Vector<T> right);
```

Returns a value that indicates whether all elements in the first vector are greater than or equal to all the corresponding elements in the second vector.

Parameters:

- `T`: The vector type. `T` can be any primitive numeric type.
- `left`: The first vector to compare.
- `right`: The second vector to compare.

Returns: `true` if all elements in `left` are greater than or equal to the corresponding elements in `right`; otherwise, `false`.

To be added.

## Vector.GreaterThanOrEqualAny<T>(Vector<T>, Vector<T>) method

```csharp
public static bool GreaterThanOrEqualAny<T> (System.Numerics.Vector<T> left, System.Numerics.Vector<T> right);
```

Returns a value that indicates whether any element in the first vector is greater than or equal to the corresponding element in the second vector.

Parameters:

- `T`: The vector type. `T` can be any primitive numeric type.
- `left`: The first vector to compare.
- `right`: The second vector to compare.

Returns: `true` if any element in `left` is greater than or equal to the corresponding element in `right`; otherwise,  `false`.

To be added.

## Vector.Hypot(Double>, Double>) method

```csharp
public static System.Numerics.Vector<double> Hypot (System.Numerics.Vector<double> x, System.Numerics.Vector<double> y);
```

To be added.

Returns: To be added.

To be added.

## Vector.Hypot(Single>, Single>) method

```csharp
public static System.Numerics.Vector<float> Hypot (System.Numerics.Vector<float> x, System.Numerics.Vector<float> y);
```

To be added.

Returns: To be added.

To be added.

## Vector.IndexOf<T>(Vector<T>, T) method

```csharp
public static int IndexOf<T> (System.Numerics.Vector<T> vector, T value);
```

To be added.

Parameters:

- `T`: To be added.
- `vector`: To be added.
- `value`: To be added.

Returns: To be added.

To be added.

## Vector.IndexOfWhereAllBitsSet<T>(Vector<T>) method

```csharp
public static int IndexOfWhereAllBitsSet<T> (System.Numerics.Vector<T> vector);
```

To be added.

Parameters:

- `T`: To be added.
- `vector`: To be added.

Returns: To be added.

To be added.

## Vector.IsEvenInteger<T>(Vector<T>) method

```csharp
public static System.Numerics.Vector<T> IsEvenInteger<T> (System.Numerics.Vector<T> vector);
```

To be added.

Parameters:

- `T`: To be added.
- `vector`: To be added.

Returns: To be added.

To be added.

## Vector.IsFinite<T>(Vector<T>) method

```csharp
public static System.Numerics.Vector<T> IsFinite<T> (System.Numerics.Vector<T> vector);
```

To be added.

Parameters:

- `T`: To be added.
- `vector`: To be added.

Returns: To be added.

To be added.

## Vector.IsInfinity<T>(Vector<T>) method

```csharp
public static System.Numerics.Vector<T> IsInfinity<T> (System.Numerics.Vector<T> vector);
```

To be added.

Parameters:

- `T`: To be added.
- `vector`: To be added.

Returns: To be added.

To be added.

## Vector.IsInteger<T>(Vector<T>) method

```csharp
public static System.Numerics.Vector<T> IsInteger<T> (System.Numerics.Vector<T> vector);
```

To be added.

Parameters:

- `T`: To be added.
- `vector`: To be added.

Returns: To be added.

To be added.

## Vector.IsNaN<T>(Vector<T>) method

```csharp
public static System.Numerics.Vector<T> IsNaN<T> (System.Numerics.Vector<T> vector);
```

Determines which elements in a vector are NaN.

Parameters:

- `vector`: The vector to be checked.

Returns: A vector whose elements are all-bits-set or zero, depending on if the corresponding elements in
```csharp
vector
```
were NaN.

To be added.

## Vector.IsNegative<T>(Vector<T>) method

```csharp
public static System.Numerics.Vector<T> IsNegative<T> (System.Numerics.Vector<T> vector);
```

Determines which elements in a vector represents negative real numbers.

Parameters:

- `vector`: The vector to be checked.

Returns: A vector whose elements are all-bits-set or zero, depending on if the corresponding elements in
```csharp
vector
```
were negative.

To be added.

## Vector.IsNegativeInfinity<T>(Vector<T>) method

```csharp
public static System.Numerics.Vector<T> IsNegativeInfinity<T> (System.Numerics.Vector<T> vector);
```

To be added.

Parameters:

- `T`: To be added.
- `vector`: To be added.

Returns: To be added.

To be added.

## Vector.IsNormal<T>(Vector<T>) method

```csharp
public static System.Numerics.Vector<T> IsNormal<T> (System.Numerics.Vector<T> vector);
```

To be added.

Parameters:

- `T`: To be added.
- `vector`: To be added.

Returns: To be added.

To be added.

## Vector.IsOddInteger<T>(Vector<T>) method

```csharp
public static System.Numerics.Vector<T> IsOddInteger<T> (System.Numerics.Vector<T> vector);
```

To be added.

Parameters:

- `T`: To be added.
- `vector`: To be added.

Returns: To be added.

To be added.

## Vector.IsPositive<T>(Vector<T>) method

```csharp
public static System.Numerics.Vector<T> IsPositive<T> (System.Numerics.Vector<T> vector);
```

Determines which elements in a vector represents positive real numbers.

Parameters:

- `vector`: The vector to be checked.

Returns: A vector whose elements are all-bits-set or zero, depending on if the corresponding elements in
```csharp
vector
```
were positive.

To be added.

## Vector.IsPositiveInfinity<T>(Vector<T>) method

```csharp
public static System.Numerics.Vector<T> IsPositiveInfinity<T> (System.Numerics.Vector<T> vector);
```

Determines which elements in a vector are positive infinity.

Parameters:

- `vector`: The vector to be checked.

Returns: A vector whose elements are all-bits-set or zero, depending on if the corresponding elements in
```csharp
vector
```
were positive infinity.

To be added.

## Vector.IsSubnormal<T>(Vector<T>) method

```csharp
public static System.Numerics.Vector<T> IsSubnormal<T> (System.Numerics.Vector<T> vector);
```

To be added.

Parameters:

- `T`: To be added.
- `vector`: To be added.

Returns: To be added.

To be added.

## Vector.IsZero<T>(Vector<T>) method

```csharp
public static System.Numerics.Vector<T> IsZero<T> (System.Numerics.Vector<T> vector);
```

Determines which elements in a vector are zero.

Parameters:

- `vector`: The vector to be checked.

Returns: A vector whose elements are all-bits-set or zero, depending on if the corresponding elements in
```csharp
vector
```
were zero.

To be added.

## Vector.LastIndexOf<T>(Vector<T>, T) method

```csharp
public static int LastIndexOf<T> (System.Numerics.Vector<T> vector, T value);
```

To be added.

Parameters:

- `T`: To be added.
- `vector`: To be added.
- `value`: To be added.

Returns: To be added.

To be added.

## Vector.LastIndexOfWhereAllBitsSet<T>(Vector<T>) method

```csharp
public static int LastIndexOfWhereAllBitsSet<T> (System.Numerics.Vector<T> vector);
```

To be added.

Parameters:

- `T`: To be added.
- `vector`: To be added.

Returns: To be added.

To be added.

## Vector.Lerp(Double>, Double>, Double>) method

```csharp
public static System.Numerics.Vector<double> Lerp (System.Numerics.Vector<double> x, System.Numerics.Vector<double> y, System.Numerics.Vector<double> amount);
```

Performs a linear interpolation between two vectors based on the given weighting.

Parameters:

- `x`: The first vector.
- `y`: The second vector.
- `amount`: A value between 0 and 1 that indicates the weight of `y`.

Returns: The interpolated vector.

To be added.

## Vector.Lerp(Single>, Single>, Single>) method

```csharp
public static System.Numerics.Vector<float> Lerp (System.Numerics.Vector<float> x, System.Numerics.Vector<float> y, System.Numerics.Vector<float> amount);
```

Performs a linear interpolation between two vectors based on the given weighting.

Parameters:

- `x`: The first vector.
- `y`: The second vector.
- `amount`: A value between 0 and 1 that indicates the weight of `y`.

Returns: The interpolated vector.

To be added.

## Vector.LessThan(Double>, Double>) method

```csharp
public static System.Numerics.Vector<long> LessThan (System.Numerics.Vector<double> left, System.Numerics.Vector<double> right);
```

Returns a new integral vector whose elements signal whether the elements in one double-precision floating-point vector are less than their corresponding elements in a second double-precision floating-point vector.

Parameters:

- `left`: The first vector to compare.
- `right`: The second vector to compare.

Returns: The resulting integral vector.

To be added.
