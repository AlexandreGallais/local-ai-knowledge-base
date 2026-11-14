---
title: "Int64 struct (part 2 of 8)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Int64.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Int64 struct (part 2 of 8)

## Int64.Equals(Int64) method

```csharp
public bool Equals (long obj);
```

Returns a value indicating whether this instance is equal to a specified `Int64` value.

Parameters:

- `obj`: An `Int64` value to compare to this instance.

Returns: `true` if `obj` has the same value as this instance; otherwise, `false`.

#### Remarks
This method implements the `IEquatable<T>` interface, and performs slightly better than `Int64.Equals` because it does not have to convert the `obj` parameter to an object.

## Int64.Equals(Object) method

```csharp
public override bool Equals (object? obj);
```

Returns a value indicating whether this instance is equal to a specified object.

Parameters:

- `obj`: An object to compare with this instance.

Returns: `true` if `obj` is an instance of an `Int64` and equals the value of this instance; otherwise, `false`.

#### Examples
The following code example illustrates the use of `Equals` in the context of `Int64`, comparing two long values and returning `true` if they represent the same number, or `false` if they do not.

_Code sample not included: ~/snippets/csharp/System/Int64/Equals/int64_equals.cs._

## Int64.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Returns the hash code for this instance.

Returns: A 32-bit signed integer hash code.

To be added.

## Int64.GetTypeCode() method

```csharp
public TypeCode GetTypeCode ();
```

Returns the `TypeCode` for value type `Int64`.

Returns: The enumerated constant, `TypeCode.Int64`.

To be added.

## Int64.IsEvenInteger(Int64) method

```csharp
public static bool IsEvenInteger (long value);
```

Determines if a value represents an even integral number.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is an even integer; otherwise, `false`.

#### Remarks

This method correctly handles floating-point values and so `2.0` will return `true` while `2.2` will return `false`.

A return value of `false` does not imply that `IsOddInteger` will return `true`. A number with a fractional portion, for example, `3.3`, is not even or odd.

## Int64.IsNegative(Int64) method

```csharp
public static bool IsNegative (long value);
```

Determines if a value is negative.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is negative; otherwise, `false`.

#### Remarks

A return value of `false` does not imply that `IsPositive` will return `true`. A complex number, `a + bi` for non-zero `b`, is not positive or negative

## Int64.IsOddInteger(Int64) method

```csharp
public static bool IsOddInteger (long value);
```

Determines if a value represents an odd integral number.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is an odd integer; otherwise, `false`.

#### Remarks

This method correctly handles floating-point values and so `3.0` will return `true` while `3.3` will return `false`.

A return value of `false` does not imply that `IsEvenInteger` will return `true`. A number with a fractional portion, for example, `3.3`, is not even or odd.

## Int64.IsPositive(Int64) method

```csharp
public static bool IsPositive (long value);
```

Determines if a value is positive.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is positive; otherwise, `false`.

#### Remarks

A return value of `false` does not imply that `IsNegative` will return `true`. A complex number, `a + bi` for non-zero `b`, is not positive or negative

## Int64.IsPow2(Int64) method

```csharp
public static bool IsPow2 (long value);
```

Determines if a value is a power of two.

Parameters:

- `value`: The value to be checked.

Returns: `true` if `value` is a power of two; otherwise, `false`.

To be added.

## Int64.LeadingZeroCount(Int64) method

```csharp
public static long LeadingZeroCount (long value);
```

Computes the number of leading zeros in a value.

Parameters:

- `value`: The value whose leading zeroes are to be counted.

Returns: The number of leading zeros in `value`.

To be added.

## Int64.Log10(Int64) method

```csharp
public static long Log10 (long value);
```

To be added.

Parameters:

- `value`: To be added.

Returns: To be added.

To be added.

## Int64.Log2(Int64) method

```csharp
public static long Log2 (long value);
```

Computes the log2 of a value.

Parameters:

- `value`: The value whose log2 is to be computed.

Returns: The log2 of `value`.

To be added.

## Int64.Max(Int64, Int64) method

```csharp
public static long Max (long x, long y);
```

Compares two values to compute which is greater.

Parameters:

- `x`: The value to compare with `y`.
- `y`: The value to compare with `x`.

Returns: `x` if it is greater than `y`; otherwise, `y`.

#### Remarks

For `IFloatingPoint<T>` this method matches the IEEE 754:2019 `maximum` function. This requires NaN inputs to be propagated back to the caller and for `-0.0` to be treated as less than `+0.0`.

## Int64.MaxMagnitude(Int64, Int64) method

```csharp
public static long MaxMagnitude (long x, long y);
```

Compares two values to compute which is greater.

Parameters:

- `x`: The value to compare with `y`.
- `y`: The value to compare with `x`.

Returns: `x` if it is greater than `y`; otherwise, `y`.

#### Remarks

For `IFloatingPointIeee754<T>` this method matches the IEEE 754:2019 `maximumMagnitude` function. This requires NaN inputs to not be propagated back to the caller and for `-0.0` to be treated as less than `+0.0`.

## Int64.Min(Int64, Int64) method

```csharp
public static long Min (long x, long y);
```

Compares two values to compute which is lesser.

Parameters:

- `x`: The value to compare with `y`.
- `y`: The value to compare with `x`.

Returns: `x` if it is less than `y`; otherwise, `y`.

#### Remarks

For `IFloatingPoint<T>` this method matches the IEEE 754:2019 `minimum` function. This requires NaN inputs to be propagated back to the caller and for `-0.0` to be treated as less than `+0.0`.

## Int64.MinMagnitude(Int64, Int64) method

```csharp
public static long MinMagnitude (long x, long y);
```

Compares two values to compute which is lesser.

Parameters:

- `x`: The value to compare with `y`.
- `y`: The value to compare with `x`.

Returns: `x` if it is less than `y`; otherwise, `y`.

#### Remarks

For `IFloatingPointIeee754<T>` this method matches the IEEE 754:2019 `minimumMagnitude` function. This requires NaN inputs to not be propagated back to the caller and for `-0.0` to be treated as less than `+0.0`.

## Int64.Parse(String) method

```csharp
public static long Parse (string s);
```

Converts the string representation of a number to its 64-bit signed integer equivalent.

Parameters:

- `s`: A string containing a number to convert.

Returns: A 64-bit signed integer equivalent to the number contained in `s`.

Exceptions:

- `ArgumentNullException`: `s` is `null`.
- `FormatException`: `s` is not in the correct format.
- `OverflowException`: `s` represents a number less than <see cref="F:System.Int64.MinValue">Int64.MinValue</see> or greater than <see cref="F:System.Int64.MaxValue">Int64.MaxValue</see>.

#### Remarks
The `s` parameter contains a number of the form:

wsdigits[ws]

Elements in square brackets ([ and ]) are optional. The following table describes each element.

|Element|Description|
|-------------|-----------------|
|ws|Optional white space.|
|sign|An optional sign.|
|digits|A sequence of digits ranging from 0 to 9.|

The `s` parameter is interpreted using the `Integer` style. In addition to decimal digits, only leading and trailing spaces together with a leading sign are allowed. To explicitly define the style elements that can be present in `s`, use either the `Parse` or the `Parse` method.

The `s` parameter is parsed using the formatting information in a `NumberFormatInfo` object that is initialized for the current system culture. To parse a string using the formatting information of some other culture, use the `Parse` method.

#### Examples
The following example demonstrates how to convert a string value into a 64-bit signed integer value using the `Parse` method. It then displays the resulting long integer value.

_Code sample not included: ~/snippets/csharp/System/Int64/Parse/Parse1.cs._

## Int64.Parse(Byte>, IFormatProvider) method

```csharp
public static long Parse (ReadOnlySpan<byte> utf8Text, IFormatProvider? provider);
```

Parses a span of UTF-8 characters into a value.

Parameters:

- `utf8Text`: The span of UTF-8 characters to parse.
- `provider`: An object that provides culture-specific formatting information about `utf8Text`.

Returns: The result of parsing `utf8Text`.

To be added.

## Int64.Parse(Char>, IFormatProvider) method

```csharp
public static long Parse (ReadOnlySpan<char> s, IFormatProvider? provider);
```

Parses a span of characters into a value.

Parameters:

- `s`: The span of characters to parse.
- `provider`: An object that provides culture-specific formatting information about `s`.

Returns: The result of parsing `s`.

To be added.
