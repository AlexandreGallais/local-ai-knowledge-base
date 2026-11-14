---
title: "Convert class (part 13 of 23)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Convert.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Convert class (part 13 of 23)

## Convert.ToInt32(String, Int32) method

```csharp
public static int ToInt32 (string? value, int fromBase);
```

Converts the string representation of a number in a specified base to an equivalent 32-bit signed integer.

Parameters:

- `value`: A string that contains the number to convert.
- `fromBase`: The base of the number in `value`, which must be 2, 8, 10, or 16.

Returns: A 32-bit signed integer that is equivalent to the number in `value`, or 0 (zero) if `value` is `null`.

Exceptions:

- `ArgumentException`: `fromBase` is not 2, 8, 10, or 16.

-or-

`value`, which represents a non-base 10 signed number, is prefixed with a negative sign.
- `ArgumentOutOfRangeException`: `value` is `String.Empty`.
- `FormatException`: `value` contains a character that is not a valid digit in the base specified by `fromBase`. The exception message indicates that there are no digits to convert if the first character in `value` is invalid; otherwise, the message indicates that `value` contains invalid trailing characters.
- `OverflowException`: `value`, which represents a non-base 10 signed number, is prefixed with a negative sign.

-or-

`value` represents a number that is less than <see cref="F:System.Int32.MinValue">Int32.MinValue</see> or greater than <see cref="F:System.Int32.MaxValue">Int32.MaxValue</see>.

#### Remarks
If `fromBase` is 16, you can prefix the number specified by the `value` parameter with "0x" or "0X".

Because the negative sign is not supported for non-base 10 numeric representations, the `ToInt32` method assumes that negative numbers use two's complement representation. In other words, the method always interprets the highest-order binary bit of an integer (bit 31) as its sign bit. As a result, it is possible to write code in which a non-base 10 number that is out of the range of the `Int32` data type is converted to an `Int32` value without the method throwing an exception. The following example increments `MaxValue` by one, converts the resulting number to its hexadecimal string representation, and then calls the `ToInt32` method. Instead of throwing an exception, the method displays the message, "0x80000000 converts to -2147483648."

_Code sample not included: ~/snippets/csharp/System/Convert/ToByte/Conversion.cs._

When performing binary operations or numeric conversions, it is always the responsibility of the developer to verify that a method is using the appropriate numeric representation to interpret a particular value. As the following example illustrates, you can ensure that the method handles overflows appropriately by first retrieving the sign of the numeric value before converting it to its hexadecimal string representation. Throw an exception if the original value was positive but the conversion back to an integer yields a negative value.

_Code sample not included: ~/snippets/csharp/System/Convert/ToByte/Conversion.cs._

## Convert.ToInt64(Boolean) method

```csharp
public static long ToInt64 (bool value);
```

Converts the specified Boolean value to the equivalent 64-bit signed integer.

Parameters:

- `value`: The Boolean value to convert.

Returns: The number 1 if `value` is `true`; otherwise, 0.

#### Examples
The following example converts the `Boolean` values `true` and `false` to long integers.

_Code sample not included: ~/snippets/csharp/System/Convert/ToInt64/toint64_1.cs._

## Convert.ToInt64(Byte) method

```csharp
public static long ToInt64 (byte value);
```

Converts the value of the specified 8-bit unsigned integer to the equivalent 64-bit signed integer.

Parameters:

- `value`: The 8-bit unsigned integer to convert.

Returns: A 64-bit signed integer that is equivalent to `value`.

#### Examples
The following example converts each element in an array of bytes to a long integer.

_Code sample not included: ~/snippets/csharp/System/Convert/ToInt64/toint64_1.cs._

## Convert.ToInt64(Char) method

```csharp
public static long ToInt64 (char value);
```

Converts the value of the specified Unicode character to the equivalent 64-bit signed integer.

Parameters:

- `value`: The Unicode character to convert.

Returns: A 64-bit signed integer that is equivalent to `value`.

#### Examples
The following example converts each element in a `Char` array to a long integer.

_Code sample not included: ~/snippets/csharp/System/Convert/ToInt64/toint64_1.cs._

## Convert.ToInt64(DateTime) method

```csharp
public static long ToInt64 (DateTime value);
```

Calling this method always throws `InvalidCastException`.

Parameters:

- `value`: The date and time value to convert.

Returns: This conversion is not supported. No value is returned.

Exceptions:

- `InvalidCastException`: This conversion is not supported.

To be added.

## Convert.ToInt64(Decimal) method

```csharp
public static long ToInt64 (decimal value);
```

Converts the value of the specified decimal number to an equivalent 64-bit signed integer.

Parameters:

- `value`: The decimal number to convert.

Returns: `value`, rounded to the nearest 64-bit signed integer. If `value` is halfway between two whole numbers, the even number is returned; that is, 4.5 is converted to 4, and 5.5 is converted to 6.

Exceptions:

- `OverflowException`: `value` is greater than <see cref="F:System.Int64.MaxValue">Int64.MaxValue</see> or less than <see cref="F:System.Int64.MinValue">Int64.MinValue</see>.

#### Examples
The following example attempts to convert each element in an array of `Decimal` values to a long integer.

_Code sample not included: ~/snippets/csharp/System/Convert/ToInt64/toint64_1.cs._

## Convert.ToInt64(Double) method

```csharp
public static long ToInt64 (double value);
```

Converts the value of the specified double-precision floating-point number to an equivalent 64-bit signed integer.

Parameters:

- `value`: The double-precision floating-point number to convert.

Returns: `value`, rounded to the nearest 64-bit signed integer. If `value` is halfway between two whole numbers, the even number is returned; that is, 4.5 is converted to 4, and 5.5 is converted to 6.

Exceptions:

- `OverflowException`: `value` is greater than <see cref="F:System.Int64.MaxValue">Int64.MaxValue</see> or less than <see cref="F:System.Int64.MinValue">Int64.MinValue</see>.

#### Examples
The following example attempts to convert each element in an array of `Double` values to a long integer.

_Code sample not included: ~/snippets/csharp/System/Convert/ToInt64/toint64_1.cs._

## Convert.ToInt64(Int16) method

```csharp
public static long ToInt64 (short value);
```

Converts the value of the specified 16-bit signed integer to an equivalent 64-bit signed integer.

Parameters:

- `value`: The 16-bit signed integer to convert.

Returns: A 64-bit signed integer that is equivalent to `value`.

#### Examples
The following example converts each element in an array of 16-bit integers to a long integer.

_Code sample not included: ~/snippets/csharp/System/Convert/ToInt64/toint64_1.cs._

## Convert.ToInt64(Int32) method

```csharp
public static long ToInt64 (int value);
```

Converts the value of the specified 32-bit signed integer to an equivalent 64-bit signed integer.

Parameters:

- `value`: The 32-bit signed integer to convert.

Returns: A 64-bit signed integer that is equivalent to `value`.

To be added.

## Convert.ToInt64(Int64) method

```csharp
public static long ToInt64 (long value);
```

Returns the specified 64-bit signed integer; no actual conversion is performed.

Parameters:

- `value`: A 64-bit signed integer.

Returns: `value` is returned unchanged.

#### Examples
The following example converts each element in an array of integers to a long integer.

_Code sample not included: ~/snippets/csharp/System/Convert/ToInt64/toint64_1.cs._

## Convert.ToInt64(Object) method

```csharp
public static long ToInt64 (object? value);
```

Converts the value of the specified object to a 64-bit signed integer.

Parameters:

- `value`: An object that implements the `IConvertible` interface, or `null`.

Returns: A 64-bit signed integer that is equivalent to `value`, or zero if `value` is `null`.

Exceptions:

- `FormatException`: `value` is not in an appropriate format.
- `InvalidCastException`: `value` does not implement the `IConvertible` interface.

-or-

The conversion is not supported.
- `OverflowException`: `value` represents a number that is less than <see cref="F:System.Int64.MinValue">Int64.MinValue</see> or greater than <see cref="F:System.Int64.MaxValue">Int64.MaxValue</see>.

#### Remarks
If `value` is not `null`, this method wraps a call to the `IConvertible.ToInt64` implementation of the underlying type of `value`.

#### Examples
The following example attempts to convert each element in an object array to a long integer.

_Code sample not included: ~/snippets/csharp/System/Convert/ToInt64/toint64_1.cs._

## Convert.ToInt64(SByte) method

```csharp
public static long ToInt64 (sbyte value);
```

Converts the value of the specified 8-bit signed integer to the equivalent 64-bit signed integer.

Parameters:

- `value`: The 8-bit signed integer to convert.

Returns: A 64-bit signed integer that is equivalent to `value`.

#### Examples
The following example converts each element in a signed byte array to a long integer.

_Code sample not included: ~/snippets/csharp/System/Convert/ToInt64/toint64_1.cs._

## Convert.ToInt64(Single) method

```csharp
public static long ToInt64 (float value);
```

Converts the value of the specified single-precision floating-point number to an equivalent 64-bit signed integer.

Parameters:

- `value`: The single-precision floating-point number to convert.

Returns: `value`, rounded to the nearest 64-bit signed integer. If `value` is halfway between two whole numbers, the even number is returned; that is, 4.5 is converted to 4, and 5.5 is converted to 6.

Exceptions:

- `OverflowException`: `value` is greater than <see cref="F:System.Int64.MaxValue">Int64.MaxValue</see> or less than <see cref="F:System.Int64.MinValue">Int64.MinValue</see>.

#### Examples
The following example attempts to convert each element in an array of `Single` values to a long integer.

_Code sample not included: ~/snippets/csharp/System/Convert/ToInt64/toint64_1.cs._

## Convert.ToInt64(String) method

```csharp
public static long ToInt64 (string? value);
```

Converts the specified string representation of a number to an equivalent 64-bit signed integer.

Parameters:

- `value`: A string that contains a number to convert.

Returns: A 64-bit signed integer that is equivalent to the number in `value`, or 0 (zero) if `value` is `null`.

Exceptions:

- `FormatException`: `value` does not consist of an optional sign followed by a sequence of digits (0 through 9).
- `OverflowException`: `value` represents a number that is less than <see cref="F:System.Int64.MinValue">Int64.MinValue</see> or greater than <see cref="F:System.Int64.MaxValue">Int64.MaxValue</see>.

#### Remarks
Using the `ToInt64` method is equivalent to passing `value` to the `Parse` method. `value` is interpreted by using the formatting conventions of the current culture.

If you prefer not to handle an exception if the conversion fails, you can call the `Int64.TryParse` method instead. It returns a `Boolean` value that indicates whether the conversion succeeded or failed.

#### Examples
The following example attempts to convert each element in an array of numeric strings to a long integer.

_Code sample not included: ~/snippets/csharp/System/Convert/ToInt64/toint64_1.cs._

## Convert.ToInt64(UInt16) method

```csharp
public static long ToInt64 (ushort value);
```

Converts the value of the specified 16-bit unsigned integer to the equivalent 64-bit signed integer.

Parameters:

- `value`: The 16-bit unsigned integer to convert.

Returns: A 64-bit signed integer that is equivalent to `value`.

#### Examples
The following example converts each element in an array of 16-bit unsigned integers to a long integer.

_Code sample not included: ~/snippets/csharp/System/Convert/ToInt64/toint64_1.cs._

## Convert.ToInt64(UInt32) method

```csharp
public static long ToInt64 (uint value);
```

Converts the value of the specified 32-bit unsigned integer to an equivalent 64-bit signed integer.

Parameters:

- `value`: The 32-bit unsigned integer to convert.

Returns: A 64-bit signed integer that is equivalent to `value`.

#### Examples
The following example converts each element in an array of unsigned integers to a long integer.

_Code sample not included: ~/snippets/csharp/System/Convert/ToInt64/toint64_1.cs._

## Convert.ToInt64(UInt64) method

```csharp
public static long ToInt64 (ulong value);
```

Converts the value of the specified 64-bit unsigned integer to an equivalent 64-bit signed integer.

Parameters:

- `value`: The 64-bit unsigned integer to convert.

Returns: A 64-bit signed integer that is equivalent to `value`.

Exceptions:

- `OverflowException`: `value` is greater than <see cref="F:System.Int64.MaxValue">Int64.MaxValue</see>.

#### Examples
The following example attempts to convert each element in an array of unsigned long integers to a long integer.

_Code sample not included: ~/snippets/csharp/System/Convert/ToInt64/toint64_1.cs._
