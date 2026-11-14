---
title: "Convert class (part 14 of 23)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Convert.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Convert class (part 14 of 23)

## Convert.ToInt64(Object, IFormatProvider) method

```csharp
public static long ToInt64 (object? value, IFormatProvider? provider);
```

Converts the value of the specified object to a 64-bit signed integer, using the specified culture-specific formatting information.

Parameters:

- `value`: An object that implements the `IConvertible` interface.
- `provider`: An object that supplies culture-specific formatting information.

Returns: A 64-bit signed integer that is equivalent to `value`, or zero if `value` is `null`.

Exceptions:

- `FormatException`: `value` is not in an appropriate format.
- `InvalidCastException`: `value` does not implement the `IConvertible` interface.

-or-

The conversion is not supported.
- `OverflowException`: `value` represents a number that is less than <see cref="F:System.Int64.MinValue">Int64.MinValue</see> or greater than <see cref="F:System.Int64.MaxValue">Int64.MaxValue</see>.

#### Remarks
The return value is the result of invoking the `IConvertible.ToInt64` method of the underlying type of `value`.

`provider` enables the user to specify culture-specific conversion information about the contents of `value`. For example, if `value` is a `String` that represents a number, `provider` could supply culture-specific information about the notation used to represent that number.

The base types ignore `provider`; however, the parameter may be used if `value` is a user-defined type that implements the `IConvertible` interface.

#### Examples
The following example defines a class that implements `IConvertible` and a class that implements `IFormatProvider`. Objects of the class that implements `IConvertible` hold an array of `Double` values. An object of each class is passed to the `ToInt64` method. This method returns an average of the array of `Double` values, using the object that implements `IFormatProvider` to determine how to calculate the average.

_Code sample not included: ~/snippets/csharp/System/Convert/ToBoolean/objectifp.cs._

## Convert.ToInt64(String, IFormatProvider) method

```csharp
public static long ToInt64 (string? value, IFormatProvider? provider);
```

Converts the specified string representation of a number to an equivalent 64-bit signed integer, using the specified culture-specific formatting information.

Parameters:

- `value`: A string that contains the number to convert.
- `provider`: An object that supplies culture-specific formatting information.

Returns: A 64-bit signed integer that is equivalent to the number in `value`, or 0 (zero) if `value` is `null`.

Exceptions:

- `FormatException`: `value` does not consist of an optional sign followed by a sequence of digits (0 through 9).
- `OverflowException`: `value` represents a number that is less than <see cref="F:System.Int64.MinValue">Int64.MinValue</see> or greater than <see cref="F:System.Int64.MaxValue">Int64.MaxValue</see>.

#### Remarks
The return value is the result of invoking the `Int64.Parse` method on `value`.

`provider` is an `IFormatProvider` instance that obtains a `NumberFormatInfo` object. The `NumberFormatInfo` object provides culture-specific information about the format of `value`. If `provider` is `null`, the `NumberFormatInfo` for the current culture is used.

If you prefer not to handle an exception if the conversion fails, you can call the `Int64.TryParse` method instead. It returns a `Boolean` value that indicates whether the conversion succeeded or failed.

#### Examples
The following example defines a custom `NumberFormatInfo` object that recognizes the string "pos" as the positive sign and the string "neg" as the negative sign. It then attempts to convert each element of a numeric string array to an integer using both this provider and the `NumberFormatInfo` provider for the invariant culture.

_Code sample not included: ~/snippets/csharp/System/Convert/ToInt64/toint64_3.cs._

## Convert.ToInt64(String, Int32) method

```csharp
public static long ToInt64 (string? value, int fromBase);
```

Converts the string representation of a number in a specified base to an equivalent 64-bit signed integer.

Parameters:

- `value`: A string that contains the number to convert.
- `fromBase`: The base of the number in `value`, which must be 2, 8, 10, or 16.

Returns: A 64-bit signed integer that is equivalent to the number in `value`, or 0 (zero) if `value` is `null`.

Exceptions:

- `ArgumentException`: `fromBase` is not 2, 8, 10, or 16.

-or-

`value`, which represents a non-base 10 signed number, is prefixed with a negative sign.
- `ArgumentOutOfRangeException`: `value` is `String.Empty`.
- `FormatException`: `value` contains a character that is not a valid digit in the base specified by `fromBase`. The exception message indicates that there are no digits to convert if the first character in `value` is invalid; otherwise, the message indicates that `value` contains invalid trailing characters.
- `OverflowException`: `value`, which represents a non-base 10 signed number, is prefixed with a negative sign.

-or-

`value` represents a number that is less than <see cref="F:System.Int64.MinValue">Int64.MinValue</see> or greater than <see cref="F:System.Int64.MaxValue">Int64.MaxValue</see>.

#### Remarks
If `fromBase` is 16, you can prefix the number specified by the `value` parameter with "0x" or "0X".

Because the negative sign is not supported for non-base 10 numeric representations, the `ToInt64` method assumes that negative numbers use two's complement representation. In other words, the method always interprets the highest-order binary bit of a long integer (bit 63) as its sign bit. As a result, it is possible to write code in which a non-base 10 number that is out of the range of the `Int64` data type is converted to an `Int64` value without the method throwing an exception. The following example converts `MaxValue` to its hexadecimal string representation, and then calls the `ToInt64` method. Instead of throwing an exception, the method displays the message, "0xFFFFFFFFFFFFFFFF converts to -1."

_Code sample not included: ~/snippets/csharp/System/Convert/ToByte/Conversion.cs._

When performing binary operations or numeric conversions, it is always the responsibility of the developer to verify that a method is using the appropriate numeric representation to interpret a particular value. As the following example illustrates, you can ensure that the method handles overflows appropriately by first determining whether a value represents an unsigned or a signed type when converting it to its hexadecimal string representation. Throw an exception if the original value was an unsigned type but the conversion back to an integer yields a value whose sign bit is on.

_Code sample not included: ~/snippets/csharp/System/Convert/ToByte/Conversion.cs._

The following example attempts to interpret each element in a string array as a hexadecimal string and convert it to a long integer.

_Code sample not included: ~/snippets/csharp/System/Convert/ToInt64/toint64_2.cs._

## Convert.ToSByte(Boolean) method

```csharp
public static sbyte ToSByte (bool value);
```

Converts the specified Boolean value to the equivalent 8-bit signed integer.

Parameters:

- `value`: The Boolean value to convert.

Returns: The number 1 if `value` is `true`; otherwise, 0.

#### Examples
The following example converts the Boolean values `true` and `false` to signed byte values.

_Code sample not included: ~/snippets/csharp/System/Convert/ToSByte/tosbyte1.cs._

## Convert.ToSByte(Byte) method

```csharp
public static sbyte ToSByte (byte value);
```

Converts the value of the specified 8-bit unsigned integer to the equivalent 8-bit signed integer.

Parameters:

- `value`: The 8-bit unsigned integer to convert.

Returns: An 8-bit signed integer that is equivalent to `value`.

Exceptions:

- `OverflowException`: `value` is greater than <see cref="F:System.SByte.MaxValue">SByte.MaxValue</see>.

#### Examples
The following example attempts to convert each element in a byte array to a signed byte.

_Code sample not included: ~/snippets/csharp/System/Convert/ToSByte/tosbyte1.cs._

## Convert.ToSByte(Char) method

```csharp
public static sbyte ToSByte (char value);
```

Converts the value of the specified Unicode character to the equivalent 8-bit signed integer.

Parameters:

- `value`: The Unicode character to convert.

Returns: An 8-bit signed integer that is equivalent to `value`.

Exceptions:

- `OverflowException`: `value` is greater than <see cref="F:System.SByte.MaxValue">SByte.MaxValue</see>.

#### Examples
The following example attempts to convert each element in an array of `Char` values to a signed byte.

_Code sample not included: ~/snippets/csharp/System/Convert/ToSByte/tosbyte1.cs._

## Convert.ToSByte(DateTime) method

```csharp
public static sbyte ToSByte (DateTime value);
```

Calling this method always throws `InvalidCastException`.

Parameters:

- `value`: The date and time value to convert.

Returns: This conversion is not supported. No value is returned.

Exceptions:

- `InvalidCastException`: This conversion is not supported.

To be added.

## Convert.ToSByte(Decimal) method

```csharp
public static sbyte ToSByte (decimal value);
```

Converts the value of the specified decimal number to an equivalent 8-bit signed integer.

Parameters:

- `value`: The decimal number to convert.

Returns: `value`, rounded to the nearest 8-bit signed integer. If `value` is halfway between two whole numbers, the even number is returned; that is, 4.5 is converted to 4, and 5.5 is converted to 6.

Exceptions:

- `OverflowException`: `value` is greater than <see cref="F:System.SByte.MaxValue">SByte.MaxValue</see> or less than <see cref="F:System.SByte.MinValue">SByte.MinValue</see>.

#### Examples
The following example attempts to convert each element in an array of `Decimal` values to a signed byte.

_Code sample not included: ~/snippets/csharp/System/Convert/ToSByte/tosbyte1.cs._

## Convert.ToSByte(Double) method

```csharp
public static sbyte ToSByte (double value);
```

Converts the value of the specified double-precision floating-point number to an equivalent 8-bit signed integer.

Parameters:

- `value`: The double-precision floating-point number to convert.

Returns: `value`, rounded to the nearest 8-bit signed integer. If `value` is halfway between two whole numbers, the even number is returned; that is, 4.5 is converted to 4, and 5.5 is converted to 6.

Exceptions:

- `OverflowException`: `value` is greater than <see cref="F:System.SByte.MaxValue">SByte.MaxValue</see> or less than <see cref="F:System.SByte.MinValue">SByte.MinValue</see>.

#### Examples
The following example attempts to convert each element in an array of `Double` values to a signed byte.

_Code sample not included: ~/snippets/csharp/System/Convert/ToSByte/tosbyte1.cs._

## Convert.ToSByte(Int16) method

```csharp
public static sbyte ToSByte (short value);
```

Converts the value of the specified 16-bit signed integer to the equivalent 8-bit signed integer.

Parameters:

- `value`: The 16-bit signed integer to convert.

Returns: An 8-bit signed integer that is equivalent to `value`.

Exceptions:

- `OverflowException`: `value` is greater than <see cref="F:System.SByte.MaxValue">SByte.MaxValue</see> or less than <see cref="F:System.SByte.MinValue">SByte.MinValue</see>.

#### Examples
The following example attempts to convert each element in an array of signed 16-bit integers to a signed byte.

_Code sample not included: ~/snippets/csharp/System/Convert/ToSByte/tosbyte1.cs._

## Convert.ToSByte(Int32) method

```csharp
public static sbyte ToSByte (int value);
```

Converts the value of the specified 32-bit signed integer to an equivalent 8-bit signed integer.

Parameters:

- `value`: The 32-bit signed integer to convert.

Returns: An 8-bit signed integer that is equivalent to `value`.

Exceptions:

- `OverflowException`: `value` is greater than <see cref="F:System.SByte.MaxValue">SByte.MaxValue</see> or less than <see cref="F:System.SByte.MinValue">SByte.MinValue</see>.

#### Examples
The following example attempts to convert each element in an array of signed integers to a signed byte.

_Code sample not included: ~/snippets/csharp/System/Convert/ToSByte/tosbyte1.cs._

## Convert.ToSByte(Int64) method

```csharp
public static sbyte ToSByte (long value);
```

Converts the value of the specified 64-bit signed integer to an equivalent 8-bit signed integer.

Parameters:

- `value`: The 64-bit signed integer to convert.

Returns: An 8-bit signed integer that is equivalent to `value`.

Exceptions:

- `OverflowException`: `value` is greater than <see cref="F:System.SByte.MaxValue">SByte.MaxValue</see> or less than <see cref="F:System.SByte.MinValue">SByte.MinValue</see>.

#### Examples
The following example attempts to convert each element in an array of long integers to a signed byte.

_Code sample not included: ~/snippets/csharp/System/Convert/ToSByte/tosbyte1.cs._

## Convert.ToSByte(Object) method

```csharp
public static sbyte ToSByte (object? value);
```

Converts the value of the specified object to an 8-bit signed integer.

Parameters:

- `value`: An object that implements the `IConvertible` interface, or `null`.

Returns: An 8-bit signed integer that is equivalent to `value`, or zero if `value` is `null`.

Exceptions:

- `FormatException`: `value` is not in an appropriate format.
- `InvalidCastException`: `value` does not implement the `IConvertible` interface.

-or-

The conversion is not supported.
- `OverflowException`: `value` represents a number that is less than <see cref="F:System.SByte.MinValue">SByte.MinValue</see> or greater than <see cref="F:System.SByte.MaxValue">SByte.MaxValue</see>.

#### Remarks
The return value is the result of invoking the `IConvertible.ToSByte` method of the underlying type of `value`.

#### Examples
The following example attempts to convert each element in an object array to a signed byte.

_Code sample not included: ~/snippets/csharp/System/Convert/ToSByte/tosbyte1.cs._

## Convert.ToSByte(SByte) method

```csharp
public static sbyte ToSByte (sbyte value);
```

Returns the specified 8-bit signed integer; no actual conversion is performed.

Parameters:

- `value`: The 8-bit signed integer to return.

Returns: `value` is returned unchanged.

To be added.
