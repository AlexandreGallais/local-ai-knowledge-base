---
title: "Convert class (part 10 of 23)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Convert.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Convert class (part 10 of 23)

## Convert.ToDouble(UInt32) method

```csharp
public static double ToDouble (uint value);
```

Converts the value of the specified 32-bit unsigned integer to an equivalent double-precision floating-point number.

Parameters:

- `value`: The 32-bit unsigned integer to convert.

Returns: A double-precision floating-point number that is equivalent to `value`.

#### Examples
The following example converts each element in an array of `UInt32` values to a `Double` value.

_Code sample not included: ~/snippets/csharp/System/Convert/ToDouble/todouble1.cs._

## Convert.ToDouble(UInt64) method

```csharp
public static double ToDouble (ulong value);
```

Converts the value of the specified 64-bit unsigned integer to an equivalent double-precision floating-point number.

Parameters:

- `value`: The 64-bit unsigned integer to convert.

Returns: A double-precision floating-point number that is equivalent to `value`.

#### Examples
The following example converts each element in an array of `UInt64` values to a `Double` value.

_Code sample not included: ~/snippets/csharp/System/Convert/ToDouble/todouble1.cs._

## Convert.ToDouble(Object, IFormatProvider) method

```csharp
public static double ToDouble (object? value, IFormatProvider? provider);
```

Converts the value of the specified object to an double-precision floating-point number, using the specified culture-specific formatting information.

Parameters:

- `value`: An object that implements the `IConvertible` interface.
- `provider`: An object that supplies culture-specific formatting information.

Returns: A double-precision floating-point number that is equivalent to `value`, or zero if `value` is `null`.

Exceptions:

- `FormatException`: `value` is not in an appropriate format for a `Double` type.
- `InvalidCastException`: `value` does not implement the `IConvertible` interface.
- `OverflowException`: `value` represents a number that is less than <see cref="F:System.Double.MinValue">Double.MinValue</see> or greater than <see cref="F:System.Double.MaxValue">Double.MaxValue</see>.

#### Remarks
The return value is the result of invoking the `IConvertible.ToDouble` method of the underlying type of `value`.

`provider` enables the user to specify culture-specific conversion information about the contents of `value`. For example, if `value` is a `String` that represents a number, `provider` could supply culture-specific information about the notation used to represent that number.

The base types ignore `provider`; however, the parameter may be used if `value` is a user-defined type that implements the `IConvertible` interface.

#### Examples
The following example defines a class that implements `IConvertible` and a class that implements `IFormatProvider`. Objects of the class that implements `IConvertible` hold an array of `Double` values. An object of each class is passed to the `ToDouble` method. This method returns an average of the array of `Double` values, using the object that implements `IFormatProvider` to determine how to calculate the average.

_Code sample not included: ~/snippets/csharp/System/Convert/ToBoolean/objectifp.cs._

## Convert.ToDouble(String, IFormatProvider) method

```csharp
public static double ToDouble (string? value, IFormatProvider? provider);
```

Converts the specified string representation of a number to an equivalent double-precision floating-point number, using the specified culture-specific formatting information.

Parameters:

- `value`: A string that contains the number to convert.
- `provider`: An object that supplies culture-specific formatting information.

Returns: A double-precision floating-point number that is equivalent to the number in `value`, or 0 (zero) if `value` is `null`.

Exceptions:

- `FormatException`: `value` is not a number in a valid format.
- `OverflowException`: `value` represents a number that is less than <see cref="F:System.Double.MinValue">Double.MinValue</see> or greater than <see cref="F:System.Double.MaxValue">Double.MaxValue</see>.

#### Remarks
The return value is the result of invoking the `Double.Parse` method on `value`.

`provider` is an `IFormatProvider` instance that obtains a `NumberFormatInfo` object. The `NumberFormatInfo` object provides culture-specific information about the format of `value`. If `provider` is `null`, the `NumberFormatInfo` for the current culture is used.

If you prefer not to handle an exception if the conversion fails, you can call the `Double.TryParse` method instead. It returns a `Boolean` value that indicates whether the conversion succeeded or failed.

#### Examples
The following example converts string representations of `Double` values with the `ToDouble` method, using an `IFormatProvider` object.

_Code sample not included: ~/snippets/csharp/System/Convert/ToDouble/todouble.cs._

## Convert.ToHexString(Byte[]) method

```csharp
public static string ToHexString (byte[] inArray);
```

Converts an array of 8-bit unsigned integers to its equivalent string representation that is encoded with uppercase hex characters.

Parameters:

- `inArray`: An array of 8-bit unsigned integers.

Returns: The string representation in hex of the elements in `inArray`.

Exceptions:

- `ArgumentNullException`: `inArray` is `null`.
- `ArgumentOutOfRangeException`: `inArray` is too large to be encoded.

To be added.

## Convert.ToHexString(Byte>) method

```csharp
public static string ToHexString (ReadOnlySpan<byte> bytes);
```

Converts a span of 8-bit unsigned integers to its equivalent string representation that is encoded with uppercase hex characters.

Parameters:

- `bytes`: A span of 8-bit unsigned integers.

Returns: The string representation in hex of the elements in `bytes`.

Exceptions:

- `ArgumentOutOfRangeException`: `bytes` is too large to be encoded.

To be added.

## Convert.ToHexString(Byte[], Int32, Int32) method

```csharp
public static string ToHexString (byte[] inArray, int offset, int length);
```

Converts a subset of an array of 8-bit unsigned integers to its equivalent string representation that is encoded with uppercase hex characters.
Parameters specify the subset as an offset in the input array and the number of elements in the array to convert.

Parameters:

- `inArray`: An array of 8-bit unsigned integers.
- `offset`: An offset in `inArray`.
- `length`: The number of elements of `inArray` to convert.

Returns: The string representation in hex of `length` elements of `inArray`, starting at position `offset`.

Exceptions:

- `ArgumentNullException`: `inArray` is `null`.
- `ArgumentOutOfRangeException`: `offset` or `length` is negative.
- `ArgumentOutOfRangeException`: `offset` plus `length` is greater than the length of `inArray`.
- `ArgumentOutOfRangeException`: `inArray` is too large to be encoded.

To be added.

## Convert.ToHexStringLower(Byte[]) method

```csharp
public static string ToHexStringLower (byte[] inArray);
```

Converts an array of 8-bit unsigned integers to its equivalent string representation that is encoded with lowercase hex characters.

Parameters:

- `inArray`: An array of 8-bit unsigned integers.

Returns: The string representation in hex of the elements in `inArray`.

Exceptions:

- `ArgumentNullException`: `inArray` is
```csharp
null
```
.
- `ArgumentOutOfRangeException`: `inArray` is too large to be encoded.

To be added.

## Convert.ToHexStringLower(Byte>) method

```csharp
public static string ToHexStringLower (ReadOnlySpan<byte> bytes);
```

Converts a span of 8-bit unsigned integers to its equivalent string representation that is encoded with lowercase hex characters.

Parameters:

- `bytes`: A span of 8-bit unsigned integers.

Returns: The string representation in hex of the elements in `bytes`.

Exceptions:

- `ArgumentOutOfRangeException`: `bytes` is too large to be encoded.

To be added.

## Convert.ToHexStringLower(Byte[], Int32, Int32) method

```csharp
public static string ToHexStringLower (byte[] inArray, int offset, int length);
```

Converts a subset of an array of 8-bit unsigned integers to its equivalent string representation that is encoded with lowercase hex characters.
Parameters specify the subset as an offset in the input array and the number of elements in the array to convert.

Parameters:

- `inArray`: An array of 8-bit unsigned integers.
- `offset`: An offset in `inArray`.
- `length`: The number of elements of `inArray` to convert.

Returns: The string representation in hex of `length` elements of `inArray`, starting at position `offset`.

Exceptions:

- `ArgumentNullException`: `inArray` is
```csharp
null
```
.
- `ArgumentOutOfRangeException`: `offset` or `length` is negative.

-or-

`offset` + `length` is greater than the length of `inArray`.

-or-

`inArray` is too large to be encoded.

To be added.

## Convert.ToInt16(Boolean) method

```csharp
public static short ToInt16 (bool value);
```

Converts the specified Boolean value to the equivalent 16-bit signed integer.

Parameters:

- `value`: The Boolean value to convert.

Returns: The number 1 if `value` is `true`; otherwise, 0.

#### Examples
The following example converts the Boolean values `true` and `false` to `Int16` values.

_Code sample not included: ~/snippets/csharp/System/Convert/ToInt16/toint16_1.cs._

## Convert.ToInt16(Byte) method

```csharp
public static short ToInt16 (byte value);
```

Converts the value of the specified 8-bit unsigned integer to the equivalent 16-bit signed integer.

Parameters:

- `value`: The 8-bit unsigned integer to convert.

Returns: A 16-bit signed integer that is equivalent to `value`.

#### Examples
The following example converts each element in an array of `Byte` values to a 16-bit signed integer.

_Code sample not included: ~/snippets/csharp/System/Convert/ToInt16/toint16_1.cs._

## Convert.ToInt16(Char) method

```csharp
public static short ToInt16 (char value);
```

Converts the value of the specified Unicode character to the equivalent 16-bit signed integer.

Parameters:

- `value`: The Unicode character to convert.

Returns: A 16-bit signed integer that is equivalent to `value`.

Exceptions:

- `OverflowException`: `value` is greater than <see cref="F:System.Int16.MaxValue">Int16.MaxValue</see>.

#### Examples
The following example attempts to convert each element in an array of `Char` values to a 16-bit signed integer.

_Code sample not included: ~/snippets/csharp/System/Convert/ToInt16/toint16_1.cs._

## Convert.ToInt16(DateTime) method

```csharp
public static short ToInt16 (DateTime value);
```

Calling this method always throws `InvalidCastException`.

Parameters:

- `value`: The date and time value to convert.

Returns: This conversion is not supported. No value is returned.

Exceptions:

- `InvalidCastException`: This conversion is not supported.

To be added.

## Convert.ToInt16(Decimal) method

```csharp
public static short ToInt16 (decimal value);
```

Converts the value of the specified decimal number to an equivalent 16-bit signed integer.

Parameters:

- `value`: The decimal number to convert.

Returns: `value`, rounded to the nearest 16-bit signed integer. If `value` is halfway between two whole numbers, the even number is returned; that is, 4.5 is converted to 4, and 5.5 is converted to 6.

Exceptions:

- `OverflowException`: `value` is greater than <see cref="F:System.Int16.MaxValue">Int16.MaxValue</see> or less than <see cref="F:System.Int16.MinValue">Int16.MinValue</see>.

#### Examples
The following example attempts to convert each element in an array of `Decimal` values to a 16-bit signed integer. The example illustrates that any fractional part of a `Decimal` value is rounded when performing the conversion.

_Code sample not included: ~/snippets/csharp/System/Convert/ToInt16/toint16_1.cs._

## Convert.ToInt16(Double) method

```csharp
public static short ToInt16 (double value);
```

Converts the value of the specified double-precision floating-point number to an equivalent 16-bit signed integer.

Parameters:

- `value`: The double-precision floating-point number to convert.

Returns: `value`, rounded to the nearest 16-bit signed integer. If `value` is halfway between two whole numbers, the even number is returned; that is, 4.5 is converted to 4, and 5.5 is converted to 6.

Exceptions:

- `OverflowException`: `value` is greater than <see cref="F:System.Int16.MaxValue">Int16.MaxValue</see> or less than <see cref="F:System.Int16.MinValue">Int16.MinValue</see>.

#### Examples
The following example converts each element in an array of `Double` values to a 16-bit signed integer. The example illustrates that any fractional part of a `Double` value is rounded before performing the conversion.

_Code sample not included: ~/snippets/csharp/System/Convert/ToInt16/toint16_1.cs._

## Convert.ToInt16(Int16) method

```csharp
public static short ToInt16 (short value);
```

Returns the specified 16-bit signed integer; no actual conversion is performed.

Parameters:

- `value`: The 16-bit signed integer to return.

Returns: `value` is returned unchanged.

To be added.

## Convert.ToInt16(Int32) method

```csharp
public static short ToInt16 (int value);
```

Converts the value of the specified 32-bit signed integer to an equivalent 16-bit signed integer.

Parameters:

- `value`: The 32-bit signed integer to convert.

Returns: The 16-bit signed integer equivalent of `value`.

Exceptions:

- `OverflowException`: `value` is greater than <see cref="F:System.Int16.MaxValue">Int16.MaxValue</see> or less than <see cref="F:System.Int16.MinValue">Int16.MinValue</see>.

#### Examples
The following example attempts to convert each element in an array of integers to a 16-bit signed integer.

_Code sample not included: ~/snippets/csharp/System/Convert/ToInt16/toint16_1.cs._

## Convert.ToInt16(Int64) method

```csharp
public static short ToInt16 (long value);
```

Converts the value of the specified 64-bit signed integer to an equivalent 16-bit signed integer.

Parameters:

- `value`: The 64-bit signed integer to convert.

Returns: A 16-bit signed integer that is equivalent to `value`.

Exceptions:

- `OverflowException`: `value` is greater than <see cref="F:System.Int16.MaxValue">Int16.MaxValue</see> or less than <see cref="F:System.Int16.MinValue">Int16.MinValue</see>.

#### Examples
The following example attempts to convert each element in an array of long integers to a 16-bit signed integer.

_Code sample not included: ~/snippets/csharp/System/Convert/ToInt16/toint16_1.cs._
