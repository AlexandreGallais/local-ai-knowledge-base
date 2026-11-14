---
title: "Convert class (part 20 of 23)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Convert.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Convert class (part 20 of 23)

## Convert.ToUInt16(String, Int32) method

```csharp
public static ushort ToUInt16 (string? value, int fromBase);
```

Converts the string representation of a number in a specified base to an equivalent 16-bit unsigned integer.

Parameters:

- `value`: A string that contains the number to convert.
- `fromBase`: The base of the number in `value`, which must be 2, 8, 10, or 16.

Returns: A 16-bit unsigned integer that is equivalent to the number in `value`, or 0 (zero) if `value` is `null`.

Exceptions:

- `ArgumentException`: `fromBase` is not 2, 8, 10, or 16.

-or-

`value`, which represents a non-base 10 unsigned number, is prefixed with a negative sign.
- `ArgumentOutOfRangeException`: `value` is `String.Empty`.
- `FormatException`: `value` contains a character that is not a valid digit in the base specified by `fromBase`. The exception message indicates that there are no digits to convert if the first character in `value` is invalid; otherwise, the message indicates that `value` contains invalid trailing characters.
- `OverflowException`: `value`, which represents a non-base 10 unsigned number, is prefixed with a negative sign.

-or-

`value` represents a number that is less than <see cref="F:System.UInt16.MinValue">UInt16.MinValue</see> or greater than <see cref="F:System.UInt16.MaxValue">UInt16.MaxValue</see>.

#### Remarks
If `fromBase` is 16, you can prefix the number specified by the `value` parameter with "0x" or "0X".

Because the `UInt16` data type supports unsigned values only, the `ToUInt16` method assumes that `value` is expressed using unsigned binary representation. In other words, all 16 bits are used to represent the numeric value, and a sign bit is absent. As a result, it is possible to write code in which a signed integer value that is out of the range of the `UInt16` data type is converted to a `UInt16` value without the method throwing an exception. The following example converts `MinValue` to its hexadecimal string representation, and then calls the `ToUInt16` method. Instead of throwing an exception, the method displays the message, "0x8000 converts to 32768."

_Code sample not included: ~/snippets/csharp/System/Convert/ToByte/Conversion.cs._

When performing binary operations or numeric conversions, it is always the responsibility of the developer to verify that a method or operator is using the appropriate numeric representation to interpret a particular value. The following example illustrates one technique for ensuring that the method does not inappropriately use binary representation to interpret a value that uses two's complement representation when converting a hexadecimal string to a `UInt16` value. The example determines whether a value represents a signed or an unsigned integer while it is converting that value to its string representation. When the example converts the value to a `UInt16` value, it checks whether the original value was a signed integer. If so, and if its high-order bit is set (which indicates that the original value was negative), the method throws an exception.

_Code sample not included: ~/snippets/csharp/System/Convert/ToByte/Conversion.cs._

#### Examples
The following example attempts to interpret each element in an array of numeric strings as a hexadecimal value and to convert it to an unsigned 16-bit integer.

_Code sample not included: ~/snippets/csharp/System/Convert/ToUInt16/touint16_2.cs._

## Convert.ToUInt32(Boolean) method

```csharp
public static uint ToUInt32 (bool value);
```

Converts the specified Boolean value to the equivalent 32-bit unsigned integer.

Parameters:

- `value`: The Boolean value to convert.

Returns: The number 1 if `value` is `true`; otherwise, 0.

#### Examples
The following example converts the Boolean values `true` and `false` to unsigned integers.

_Code sample not included: ~/snippets/csharp/System/Convert/ToUInt32/touint32_1.cs._

## Convert.ToUInt32(Byte) method

```csharp
public static uint ToUInt32 (byte value);
```

Converts the value of the specified 8-bit unsigned integer to the equivalent 32-bit unsigned integer.

Parameters:

- `value`: The 8-bit unsigned integer to convert.

Returns: A 32-bit unsigned integer that is equivalent to `value`.

#### Examples
The following example converts each element in a byte array to an unsigned integer.

_Code sample not included: ~/snippets/csharp/System/Convert/ToUInt32/touint32_1.cs._

## Convert.ToUInt32(Char) method

```csharp
public static uint ToUInt32 (char value);
```

Converts the value of the specified Unicode character to the equivalent 32-bit unsigned integer.

Parameters:

- `value`: The Unicode character to convert.

Returns: A 32-bit unsigned integer that is equivalent to `value`.

#### Examples
The following example converts each element in a character array to an unsigned integer.

_Code sample not included: ~/snippets/csharp/System/Convert/ToUInt32/touint32_1.cs._

## Convert.ToUInt32(DateTime) method

```csharp
public static uint ToUInt32 (DateTime value);
```

Calling this method always throws `InvalidCastException`.

Parameters:

- `value`: The date and time value to convert.

Returns: This conversion is not supported. No value is returned.

Exceptions:

- `InvalidCastException`: This conversion is not supported.

To be added.

## Convert.ToUInt32(Decimal) method

```csharp
public static uint ToUInt32 (decimal value);
```

Converts the value of the specified decimal number to an equivalent 32-bit unsigned integer.

Parameters:

- `value`: The decimal number to convert.

Returns: `value`, rounded to the nearest 32-bit unsigned integer. If `value` is halfway between two whole numbers, the even number is returned; that is, 4.5 is converted to 4, and 5.5 is converted to 6.

Exceptions:

- `OverflowException`: `value` is less than zero or greater than <see cref="F:System.UInt32.MaxValue">UInt32.MaxValue</see>.

#### Examples
The following example attempts to convert each element in an array of `Decimal` values to an unsigned integer.

_Code sample not included: ~/snippets/csharp/System/Convert/ToUInt32/touint32_1.cs._

## Convert.ToUInt32(Double) method

```csharp
public static uint ToUInt32 (double value);
```

Converts the value of the specified double-precision floating-point number to an equivalent 32-bit unsigned integer.

Parameters:

- `value`: The double-precision floating-point number to convert.

Returns: `value`, rounded to the nearest 32-bit unsigned integer. If `value` is halfway between two whole numbers, the even number is returned; that is, 4.5 is converted to 4, and 5.5 is converted to 6.

Exceptions:

- `OverflowException`: `value` is less than zero or greater than <see cref="F:System.UInt32.MaxValue">UInt32.MaxValue</see>.

#### Examples
The following example attempts to convert each element in an array of `Double` values to an unsigned integer.

_Code sample not included: ~/snippets/csharp/System/Convert/ToUInt32/touint32_1.cs._

## Convert.ToUInt32(Int16) method

```csharp
public static uint ToUInt32 (short value);
```

Converts the value of the specified 16-bit signed integer to the equivalent 32-bit unsigned integer.

Parameters:

- `value`: The 16-bit signed integer to convert.

Returns: A 32-bit unsigned integer that is equivalent to `value`.

Exceptions:

- `OverflowException`: `value` is less than zero.

#### Examples
The following example attempts to convert each element in a 16-bit integer array to an unsigned integer.

_Code sample not included: ~/snippets/csharp/System/Convert/ToUInt32/touint32_1.cs._

## Convert.ToUInt32(Int32) method

```csharp
public static uint ToUInt32 (int value);
```

Converts the value of the specified 32-bit signed integer to an equivalent 32-bit unsigned integer.

Parameters:

- `value`: The 32-bit signed integer to convert.

Returns: A 32-bit unsigned integer that is equivalent to `value`.

Exceptions:

- `OverflowException`: `value` is less than zero.

#### Examples
The following example attempts to convert each element in an integer array to an unsigned integer.

_Code sample not included: ~/snippets/csharp/System/Convert/ToUInt32/touint32_1.cs._

## Convert.ToUInt32(Int64) method

```csharp
public static uint ToUInt32 (long value);
```

Converts the value of the specified 64-bit signed integer to an equivalent 32-bit unsigned integer.

Parameters:

- `value`: The 64-bit signed integer to convert.

Returns: A 32-bit unsigned integer that is equivalent to `value`.

Exceptions:

- `OverflowException`: `value` is less than zero or greater than <see cref="F:System.UInt32.MaxValue">UInt32.MaxValue</see>.

#### Examples
The following example attempts to convert each element in a long integer array to an unsigned integer.

_Code sample not included: ~/snippets/csharp/System/Convert/ToUInt32/touint32_1.cs._

## Convert.ToUInt32(Object) method

```csharp
public static uint ToUInt32 (object? value);
```

Converts the value of the specified object to a 32-bit unsigned integer.

Parameters:

- `value`: An object that implements the `IConvertible` interface, or `null`.

Returns: A 32-bit unsigned integer that is equivalent to `value`, or 0 (zero) if `value` is `null`.

Exceptions:

- `FormatException`: `value` is not in an appropriate format.
- `InvalidCastException`: `value` does not implement the `IConvertible` interface.

-or-

The conversion is not supported.
- `OverflowException`: `value` represents a number that is less than <see cref="F:System.UInt32.MinValue">UInt32.MinValue</see> or greater than <see cref="F:System.UInt32.MaxValue">UInt32.MaxValue</see>.

#### Remarks
The return value is the result of invoking the `IConvertible.ToUInt32` method of the underlying type of `value`.

#### Examples
The following example attempts to convert each element in an object array to an unsigned integer.

_Code sample not included: ~/snippets/csharp/System/Convert/ToUInt32/touint32_1.cs._

## Convert.ToUInt32(SByte) method

```csharp
public static uint ToUInt32 (sbyte value);
```

Converts the value of the specified 8-bit signed integer to the equivalent 32-bit unsigned integer.

Parameters:

- `value`: The 8-bit signed integer to convert.

Returns: A 32-bit unsigned integer that is equivalent to `value`.

Exceptions:

- `OverflowException`: `value` is less than zero.

#### Examples
The following example attempts to convert each element in a signed byte array to an unsigned integer.

_Code sample not included: ~/snippets/csharp/System/Convert/ToUInt32/touint32_1.cs._

## Convert.ToUInt32(Single) method

```csharp
public static uint ToUInt32 (float value);
```

Converts the value of the specified single-precision floating-point number to an equivalent 32-bit unsigned integer.

Parameters:

- `value`: The single-precision floating-point number to convert.

Returns: `value`, rounded to the nearest 32-bit unsigned integer. If `value` is halfway between two whole numbers, the even number is returned; that is, 4.5 is converted to 4, and 5.5 is converted to 6.

Exceptions:

- `OverflowException`: `value` is less than zero or greater than <see cref="F:System.UInt32.MaxValue">UInt32.MaxValue</see>.

#### Examples
The following example attempts to convert each element in an array of `Single` values to an unsigned integer.

_Code sample not included: ~/snippets/csharp/System/Convert/ToUInt32/touint32_1.cs._

## Convert.ToUInt32(String) method

```csharp
public static uint ToUInt32 (string? value);
```

Converts the specified string representation of a number to an equivalent 32-bit unsigned integer.

Parameters:

- `value`: A string that contains the number to convert.

Returns: A 32-bit unsigned integer that is equivalent to the number in `value`, or 0 (zero) if `value` is `null`.

Exceptions:

- `FormatException`: `value` does not consist of an optional sign followed by a sequence of digits (0 through 9).
- `OverflowException`: `value` represents a number that is less than <see cref="F:System.UInt32.MinValue">UInt32.MinValue</see> or greater than <see cref="F:System.UInt32.MaxValue">UInt32.MaxValue</see>.

#### Remarks
Using the `ToUInt32` method is equivalent to passing `value` to the `Parse` method. `value` is interpreted by using the formatting conventions of the current culture.

If you prefer not to handle an exception if the conversion fails, you can call the `UInt32.TryParse` method instead. It returns a `Boolean` value that indicates whether the conversion succeeded or failed.

#### Examples
The following example interprets the elements in a string array as numeric strings and attempts to convert them to unsigned integers.

_Code sample not included: ~/snippets/csharp/System/Convert/ToUInt32/touint32_1.cs._

## Convert.ToUInt32(UInt16) method

```csharp
public static uint ToUInt32 (ushort value);
```

Converts the value of the specified 16-bit unsigned integer to the equivalent 32-bit unsigned integer.

Parameters:

- `value`: The 16-bit unsigned integer to convert.

Returns: A 32-bit unsigned integer that is equivalent to `value`.

#### Examples
The following example converts each element in an unsigned 16-bit integer array to an unsigned integer value.

_Code sample not included: ~/snippets/csharp/System/Convert/ToUInt32/touint32_1.cs._

## Convert.ToUInt32(UInt32) method

```csharp
public static uint ToUInt32 (uint value);
```

Returns the specified 32-bit unsigned integer; no actual conversion is performed.

Parameters:

- `value`: The 32-bit unsigned integer to return.

Returns: `value` is returned unchanged.

To be added.

## Convert.ToUInt32(UInt64) method

```csharp
public static uint ToUInt32 (ulong value);
```

Converts the value of the specified 64-bit unsigned integer to an equivalent 32-bit unsigned integer.

Parameters:

- `value`: The 64-bit unsigned integer to convert.

Returns: A 32-bit unsigned integer that is equivalent to `value`.

Exceptions:

- `OverflowException`: `value` is greater than <see cref="F:System.UInt32.MaxValue">UInt32.MaxValue</see>.

#### Examples
The following example attempts to convert each element in an unsigned long integer array to an unsigned integer value.

_Code sample not included: ~/snippets/csharp/System/Convert/ToUInt32/touint32_1.cs._
