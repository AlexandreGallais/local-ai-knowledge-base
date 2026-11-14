---
title: "Vector class (part 5 of 9)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Numerics/Vector.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Vector class (part 5 of 9)

## Vector.LessThan(Int32>, Int32>) method

```csharp
public static System.Numerics.Vector<int> LessThan (System.Numerics.Vector<int> left, System.Numerics.Vector<int> right);
```

Returns a new integral vector whose elements signal whether the elements in one integral vector are less than their corresponding elements in a second integral vector.

Parameters:

- `left`: The first vector to compare.
- `right`: The second vector to compare.

Returns: The resulting integral vector.

To be added.

## Vector.LessThan(Int64>, Int64>) method

```csharp
public static System.Numerics.Vector<long> LessThan (System.Numerics.Vector<long> left, System.Numerics.Vector<long> right);
```

Returns a new long integer vector whose elements signal whether the elements in one long integer vector are less than their corresponding elements in a second long integer vector.

Parameters:

- `left`: The first vector to compare.
- `right`: The second vector to compare.

Returns: The resulting long integer vector.

To be added.

## Vector.LessThan(Single>, Single>) method

```csharp
public static System.Numerics.Vector<int> LessThan (System.Numerics.Vector<float> left, System.Numerics.Vector<float> right);
```

Returns a new integral vector whose elements signal whether the elements in one single-precision vector are less than their corresponding elements in a second single-precision vector.

Parameters:

- `left`: The first vector to compare.
- `right`: The second vector to compare.

Returns: The resulting integral vector.

To be added.

## Vector.LessThan<T>(Vector<T>, Vector<T>) method

```csharp
public static System.Numerics.Vector<T> LessThan<T> (System.Numerics.Vector<T> left, System.Numerics.Vector<T> right);
```

Returns a new vector of a specified type whose elements signal whether the elements in one vector are less than their corresponding elements in the second vector.

Parameters:

- `T`: The vector type. `T` can be any primitive numeric type.
- `left`: The first vector to compare.
- `right`: The second vector to compare.

Returns: The resulting vector.

To be added.

## Vector.LessThanAll<T>(Vector<T>, Vector<T>) method

```csharp
public static bool LessThanAll<T> (System.Numerics.Vector<T> left, System.Numerics.Vector<T> right);
```

Returns a value that indicates whether all of the elements in the first vector are less than their corresponding elements in the second vector.

Parameters:

- `T`: The vector type. `T` can be any primitive numeric type.
- `left`: The first vector to compare.
- `right`: The second vector to compare.

Returns: `true` if all of the elements in `left` are less than the corresponding elements in `right`; otherwise,  `false`.

To be added.

## Vector.LessThanAny<T>(Vector<T>, Vector<T>) method

```csharp
public static bool LessThanAny<T> (System.Numerics.Vector<T> left, System.Numerics.Vector<T> right);
```

Returns a value that indicates whether any element in the first vector is less than the corresponding element in the second vector.

Parameters:

- `T`: The vector type. `T` can be any primitive numeric type.
- `left`: The first vector to compare.
- `right`: The second vector to compare.

Returns: `true` if any element in `left` is less than the corresponding element in `right`; otherwise,  `false`.

To be added.

## Vector.LessThanOrEqual(Double>, Double>) method

```csharp
public static System.Numerics.Vector<long> LessThanOrEqual (System.Numerics.Vector<double> left, System.Numerics.Vector<double> right);
```

Returns a new integral vector whose elements signal whether the elements in one double-precision floating-point vector are less than or equal to their corresponding elements in a second double-precision floating-point vector.

Parameters:

- `left`: The first vector to compare.
- `right`: The second vector to compare.

Returns: The resulting integral vector.

To be added.

## Vector.LessThanOrEqual(Int32>, Int32>) method

```csharp
public static System.Numerics.Vector<int> LessThanOrEqual (System.Numerics.Vector<int> left, System.Numerics.Vector<int> right);
```

Returns a new integral vector whose elements signal whether the elements in one integral vector are less than or equal to their corresponding elements in a second integral vector.

Parameters:

- `left`: The first vector to compare.
- `right`: The second vector to compare.

Returns: The resulting integral vector.

To be added.

## Vector.LessThanOrEqual(Int64>, Int64>) method

```csharp
public static System.Numerics.Vector<long> LessThanOrEqual (System.Numerics.Vector<long> left, System.Numerics.Vector<long> right);
```

Returns a new long integer vector whose elements signal whether the elements in one long integer vector are less or equal to their corresponding elements in a second long integer vector.

Parameters:

- `left`: The first vector to compare.
- `right`: The second vector to compare.

Returns: The resulting long integer vector.

To be added.

## Vector.LessThanOrEqual(Single>, Single>) method

```csharp
public static System.Numerics.Vector<int> LessThanOrEqual (System.Numerics.Vector<float> left, System.Numerics.Vector<float> right);
```

Returns a new integral vector whose elements signal whether the elements in one single-precision floating-point vector are less than or equal to their corresponding elements in a second single-precision floating-point vector.

Parameters:

- `left`: The first vector to compare.
- `right`: The second vector to compare.

Returns: The resulting integral vector.

To be added.

## Vector.LessThanOrEqual<T>(Vector<T>, Vector<T>) method

```csharp
public static System.Numerics.Vector<T> LessThanOrEqual<T> (System.Numerics.Vector<T> left, System.Numerics.Vector<T> right);
```

Returns a new vector whose elements signal whether the elements in one vector are less than or equal to their corresponding elements in the second vector.

Parameters:

- `T`: The vector type. `T` can be any primitive numeric type.
- `left`: The first vector to compare.
- `right`: The second vector to compare.

Returns: The resulting vector.

To be added.

## Vector.LessThanOrEqualAll<T>(Vector<T>, Vector<T>) method

```csharp
public static bool LessThanOrEqualAll<T> (System.Numerics.Vector<T> left, System.Numerics.Vector<T> right);
```

Returns a value that indicates whether all elements in the first vector are less than or equal to their corresponding elements in the second vector.

Parameters:

- `T`: The vector type. `T` can be any primitive numeric type.
- `left`: The first vector to compare.
- `right`: The second vector to compare.

Returns: `true` if all of the elements in `left` are less than or equal to the corresponding elements in `right`; otherwise,  `false`.

To be added.

## Vector.LessThanOrEqualAny<T>(Vector<T>, Vector<T>) method

```csharp
public static bool LessThanOrEqualAny<T> (System.Numerics.Vector<T> left, System.Numerics.Vector<T> right);
```

Returns a value that indicates whether any element in the first vector is less than or equal to the corresponding element in the second vector.

Parameters:

- `T`: The vector type. `T` can be any primitive numeric type.
- `left`: The first vector to compare.
- `right`: The second vector to compare.

Returns: `true` if any element in `left` is less than or equal to the corresponding element in `right`; otherwise,  `false`.

To be added.

## Vector.Load<T>(T*) method

```csharp
public static System.Numerics.Vector<T> Load<T> (T* source);
```

Loads a vector from the given source.

Parameters:

- `T`: The type of the elements in the vector.
- `source`: The source from which the vector will be loaded.

Returns: The vector loaded from `source`.

Exceptions:

- `NotSupportedException`: The type of `source` (`T`) is not supported.

To be added.

## Vector.LoadAligned<T>(T*) method

```csharp
public static System.Numerics.Vector<T> LoadAligned<T> (T* source);
```

Loads a vector from the given aligned source.

Parameters:

- `T`: The type of the elements in the vector.
- `source`: The aligned source from which the vector will be loaded.

Returns: The vector loaded from `source`.

Exceptions:

- `NotSupportedException`: The type of `source` (`T`) is not supported.

To be added.

## Vector.LoadAlignedNonTemporal<T>(T*) method

```csharp
public static System.Numerics.Vector<T> LoadAlignedNonTemporal<T> (T* source);
```

Loads a vector from the given aligned source.

Parameters:

- `T`: The type of the elements in the vector.
- `source`: The aligned source from which the vector will be loaded.

Returns: The vector loaded from `source`.

Exceptions:

- `NotSupportedException`: The type of `source` (`T`) is not supported.

This method may bypass the cache on certain platforms.

## Vector.LoadUnsafe<T>(T) method

```csharp
public static System.Numerics.Vector<T> LoadUnsafe<T> (ref readonly T source);
```

Loads a vector from the given source.

Parameters:

- `T`: The type of the elements in the vector.
- `source`: The source from which the vector will be loaded.

Returns: The vector loaded from `source`.

Exceptions:

- `NotSupportedException`: The type of `source` (`T`) is not supported.

To be added.

## Vector.LoadUnsafe<T>(T, UIntPtr) method

```csharp
public static System.Numerics.Vector<T> LoadUnsafe<T> (ref readonly T source, UIntPtr elementOffset);
```

Loads a vector from the given source and element offset.

Parameters:

- `T`: The type of the elements in the vector.
- `source`: The source to which `elementOffset` will be added before loading the vector.
- `elementOffset`: The element offset from `source` from which the vector will be loaded.

Returns: The vector loaded from `source` plus `elementOffset`.

Exceptions:

- `NotSupportedException`: The type of `source` (`T`) is not supported.

To be added.

## Vector.Log(Double>) method

```csharp
public static System.Numerics.Vector<double> Log (System.Numerics.Vector<double> vector);
```

To be added.

Returns: To be added.

To be added.

## Vector.Log(Single>) method

```csharp
public static System.Numerics.Vector<float> Log (System.Numerics.Vector<float> vector);
```

To be added.

Returns: To be added.

To be added.

## Vector.Log2(Double>) method

```csharp
public static System.Numerics.Vector<double> Log2 (System.Numerics.Vector<double> vector);
```

To be added.

Returns: To be added.

To be added.

## Vector.Log2(Single>) method

```csharp
public static System.Numerics.Vector<float> Log2 (System.Numerics.Vector<float> vector);
```

To be added.

Returns: To be added.

To be added.

## Vector.Max<T>(Vector<T>, Vector<T>) method

```csharp
public static System.Numerics.Vector<T> Max<T> (System.Numerics.Vector<T> left, System.Numerics.Vector<T> right);
```

Returns a new vector whose elements are the maximum of each pair of elements in the two given vectors.

Parameters:

- `T`: The vector type.
```csharp
T
```
can be any primitive numeric type.
- `left`: The first vector to compare.
- `right`: The second vector to compare.

Returns: The maximum vector.

To be added.

## Vector.MaxMagnitude<T>(Vector<T>, Vector<T>) method

```csharp
public static System.Numerics.Vector<T> MaxMagnitude<T> (System.Numerics.Vector<T> left, System.Numerics.Vector<T> right);
```

Compares two vectors to compute which has the greater magnitude on a per-element basis.

Parameters:

- `left`: The vector to compare with
```csharp
right
```
.
- `right`: The vector to compare with
```csharp
left
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

## Vector.MaxMagnitudeNumber<T>(Vector<T>, Vector<T>) method

```csharp
public static System.Numerics.Vector<T> MaxMagnitudeNumber<T> (System.Numerics.Vector<T> left, System.Numerics.Vector<T> right);
```

Compares two vectors, on a per-element basis, to compute which has the greater magnitude and returning the other value if an input is
```csharp
NaN
```
.

Parameters:

- `left`: The vector to compare with
```csharp
right
```
.
- `right`: The vector to compare with
```csharp
left
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

## Vector.MaxNative<T>(Vector<T>, Vector<T>) method

```csharp
public static System.Numerics.Vector<T> MaxNative<T> (System.Numerics.Vector<T> left, System.Numerics.Vector<T> right);
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

Parameters:

- `left`: The vector to compare with
```csharp
right
```
.
- `right`: The vector to compare with
```csharp
left
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

## Vector.MaxNumber<T>(Vector<T>, Vector<T>) method

```csharp
public static System.Numerics.Vector<T> MaxNumber<T> (System.Numerics.Vector<T> left, System.Numerics.Vector<T> right);
```

Compares two vectors, on a per-element basis, to compute which is greater and returning the other value if an element is
```csharp
NaN
```
.

Parameters:

- `left`: The vector to compare with
```csharp
right
```
.
- `right`: The vector to compare with
```csharp
left
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

## Vector.Min<T>(Vector<T>, Vector<T>) method

```csharp
public static System.Numerics.Vector<T> Min<T> (System.Numerics.Vector<T> left, System.Numerics.Vector<T> right);
```

Returns a new vector whose elements are the minimum of each pair of elements in the two given vectors.

Parameters:

- `T`: The vector type.
```csharp
T
```
can be any primitive numeric type.
- `left`: The first vector to compare.
- `right`: The second vector to compare.

Returns: The minimum vector.

To be added.

## Vector.MinMagnitude<T>(Vector<T>, Vector<T>) method

```csharp
public static System.Numerics.Vector<T> MinMagnitude<T> (System.Numerics.Vector<T> left, System.Numerics.Vector<T> right);
```

Compares two vectors to compute which has the lesser magnitude on a per-element basis.

Parameters:

- `left`: The vector to compare with
```csharp
right
```
.
- `right`: The vector to compare with
```csharp
left
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
