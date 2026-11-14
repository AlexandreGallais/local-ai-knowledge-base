---
title: "Random class (part 3 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Random.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Random class (part 3 of 3)

## Random.NextBytes(Byte[]) method

```csharp
public virtual void NextBytes (byte[] buffer);
```

Fills the elements of a specified array of bytes with random numbers.

Parameters:

- `buffer`: The array to be filled with random numbers.

Exceptions:

- `ArgumentNullException`: `buffer` is `null`.

#### Remarks
Each element of the array of bytes is set to a random number greater than or equal to 0, and less than or equal to `MaxValue`.

For example, to generate a cryptographically secured random number suitable for creating a random password, use a method such as `RNGCryptoServiceProvider.GetBytes`.

#### Examples

The following example demonstrates how to use the `Random.NextBytes` method to fill an array of bytes with random byte values.

_Code sample not included: ~/snippets/csharp/System/Random/NextBytes/source.cs._

## Random.NextBytes(Byte>) method

```csharp
public virtual void NextBytes (Span<byte> buffer);
```

Fills the elements of a specified span of bytes with random numbers.

Parameters:

- `buffer`: The array to be filled with random numbers.

#### Remarks

Each element of the span of bytes is set to a random number greater than or equal to 0 and less than or equal to `MaxValue`.

## Random.NextDouble() method

```csharp
public virtual double NextDouble ();
```

Returns a random floating-point number that is greater than or equal to 0.0, and less than 1.0.

Returns: A double-precision floating point number that is greater than or equal to 0.0, and less than 1.0.

#### Remarks
The actual upper bound of the random number returned by this method is 0.99999999999999978.

To retrieve random floating-point values within a range other than 0.0 and 1.0, see the "Retrieve floating-point values in a specified range" section of the `Random` class topic.

This method is the public version of the protected method, `Random.Sample`.

#### Examples

The following example uses the `Random.NextDouble` method to generate sequences of random doubles.

_Code sample not included: ~/snippets/csharp/System/Random/.ctor/ctor.cs._

The following example calls the `Random.NextDouble` method to generate 100 random numbers and displays their frequency distribution.

_Code sample not included: ~/snippets/csharp/System/Random/NextDouble/nextdouble1.cs._

## Random.NextInt64() method

```csharp
public virtual long NextInt64 ();
```

Returns a non-negative random integer.

Returns: A 64-bit signed integer that is greater than or equal to 0 and less than <see cref="F:System.Int64.MaxValue">Int64.MaxValue</see>.

To be added.

## Random.NextInt64(Int64) method

```csharp
public virtual long NextInt64 (long maxValue);
```

Returns a non-negative random integer that is less than the specified maximum.

Parameters:

- `maxValue`: The exclusive upper bound of the random number to be generated. `maxValue` must be greater than or equal to 0.

Returns: A 64-bit signed integer that is greater than or equal to 0, and less than `maxValue`; that is, the range of return values ordinarily includes 0 but not `maxValue`. However, if `maxValue` equals 0, `maxValue` is returned.

Exceptions:

- `ArgumentOutOfRangeException`: `maxValue` is less than 0.

To be added.

## Random.NextInt64(Int64, Int64) method

```csharp
public virtual long NextInt64 (long minValue, long maxValue);
```

Returns a random integer that is within a specified range.

Parameters:

- `minValue`: The inclusive lower bound of the random number returned.
- `maxValue`: The exclusive upper bound of the random number returned. `maxValue` must be greater than or equal to `minValue`.

Returns: A 64-bit signed integer greater than or equal to `minValue` and less than `maxValue`; that is, the range of return values includes `minValue` but not `maxValue`. If minValue equals `maxValue`, `minValue` is returned.

Exceptions:

- `ArgumentOutOfRangeException`: `minValue` is greater than `maxValue`.

To be added.

## Random.NextInteger<T>() method

```csharp
public T NextInteger<T> () where T : System.Numerics.IBinaryInteger<T>, System.Numerics.IMinMaxValue<T>;
```

To be added.

Parameters:

- `T`: To be added.

Returns: To be added.

To be added.

## Random.NextInteger<T>(T) method

```csharp
public T NextInteger<T> (T maxValue) where T : System.Numerics.IBinaryInteger<T>;
```

To be added.

Parameters:

- `T`: To be added.
- `maxValue`: To be added.

Returns: To be added.

To be added.

## Random.NextInteger<T>(T, T) method

```csharp
public T NextInteger<T> (T minValue, T maxValue) where T : System.Numerics.IBinaryInteger<T>;
```

To be added.

Parameters:

- `T`: To be added.
- `minValue`: To be added.
- `maxValue`: To be added.

Returns: To be added.

To be added.

## Random.NextSingle() method

```csharp
public virtual float NextSingle ();
```

Returns a random floating-point number that is greater than or equal to 0.0, and less than 1.0.

Returns: A single-precision floating point number that is greater than or equal to 0.0, and less than 1.0.

To be added.

## Random.Sample() method

```csharp
protected virtual double Sample ();
```

Returns a random floating-point number between 0.0 and 1.0.

Returns: A double-precision floating point number that is greater than or equal to 0.0, and less than 1.0.

#### Remarks
To produce a different random distribution or a different random number generator principle, derive a class from the `Random` class and override the `Random.Sample` method.

> **Important:**
>  The `Random.Sample` method is `protected`, which means that it is accessible only within the `Random` class and its derived classes. To generate a random number between 0 and 1 from a `Random` instance, call the `Random.NextDouble` method.

#### Examples
The following example derives a class from `Random` and overrides the `Random.Sample` method to generate a distribution of random numbers. This distribution is different than the uniform distribution generated by the `Random.Sample` method of the base class.

_Code sample not included: ~/snippets/csharp/System/Random/Next/sample.cs._

## Random.Shuffle<T>(Span<T>) method

```csharp
public void Shuffle<T> (Span<T> values);
```

Performs an in-place shuffle of a span.

Parameters:

- `T`: The type of span.
- `values`: The span to shuffle.

This method uses `Random.Next` to choose values for shuffling.
This method is an O(n) operation.

## Random.Shuffle<T>(T[]) method

```csharp
public void Shuffle<T> (T[] values);
```

Performs an in-place shuffle of an array.

Parameters:

- `T`: The type of array.
- `values`: The array to shuffle.

Exceptions:

- `ArgumentNullException`: `values` is `null`.

This method uses `Random.Next` to choose values for shuffling.
This method is an O(n) operation.
