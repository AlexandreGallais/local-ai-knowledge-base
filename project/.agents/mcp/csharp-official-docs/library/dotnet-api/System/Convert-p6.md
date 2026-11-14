---
title: "Convert class (part 6 of 23)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Convert.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Convert class (part 6 of 23)

## Convert.ToByte(String) method

```csharp
public static byte ToByte (string? value);
```

Converts the specified string representation of a number to an equivalent 8-bit unsigned integer.

Parameters:

- `value`: A string that contains the number to convert.

Returns: An 8-bit unsigned integer that is equivalent to `value`, or zero if `value` is `null`.

Exceptions:

- `FormatException`: `value` does not consist of an optional sign followed by a sequence of digits (0 through 9).
- `OverflowException`: `value` represents a number that is less than <see cref="F:System.Byte.MinValue">Byte.MinValue</see> or greater than <see cref="F:System.Byte.MaxValue">Byte.MaxValue</see>.

#### Remarks
Using the `ToByte` method is equivalent to passing `value` to the `Parse` method. `value` is interpreted by using the formatting conventions of the current culture.

If you prefer not to handle an exception if the conversion fails, you can call the `Byte.TryParse` method instead. It returns a `Boolean` value that indicates whether the conversion succeeded or failed.

#### Examples
The following example defines a string array and attempts to convert each string to a `Byte`.  Note that while a `null` string parses to zero, `Empty` throws a `FormatException`. Also note that while leading and trailing spaces parse successfully, formatting symbols, such as currency symbols, group separators, or decimal separators, do not.

_Code sample not included: ~/snippets/csharp/System/Byte/Overview/ToByte5.cs._

## Convert.ToByte(UInt16) method

```csharp
public static byte ToByte (ushort value);
```

Converts the value of the specified 16-bit unsigned integer to an equivalent 8-bit unsigned integer.

Parameters:

- `value`: The 16-bit unsigned integer to convert.

Returns: An 8-bit unsigned integer that is equivalent to `value`.

Exceptions:

- `OverflowException`: `value` is greater than <see cref="F:System.Byte.MaxValue">Byte.MaxValue</see>.

#### Examples
The following example converts an array of unsigned 16-bit integers to `Byte` values.

_Code sample not included: ~/snippets/csharp/System/Byte/Overview/tobyte1.cs._

## Convert.ToByte(UInt32) method

```csharp
public static byte ToByte (uint value);
```

Converts the value of the specified 32-bit unsigned integer to an equivalent 8-bit unsigned integer.

Parameters:

- `value`: The 32-bit unsigned integer to convert.

Returns: An 8-bit unsigned integer that is equivalent to `value`.

Exceptions:

- `OverflowException`: `value` is greater than <see cref="F:System.Byte.MaxValue">Byte.MaxValue</see>.

#### Examples
The following example converts an array of unsigned integers to `Byte` values.

_Code sample not included: ~/snippets/csharp/System/Byte/Overview/tobyte1.cs._

## Convert.ToByte(UInt64) method

```csharp
public static byte ToByte (ulong value);
```

Converts the value of the specified 64-bit unsigned integer to an equivalent 8-bit unsigned integer.

Parameters:

- `value`: The 64-bit unsigned integer to convert.

Returns: An 8-bit unsigned integer that is equivalent to `value`.

Exceptions:

- `OverflowException`: `value` is greater than <see cref="F:System.Byte.MaxValue">Byte.MaxValue</see>.

#### Examples
The following example converts an array of unsigned long integers to `Byte` values.

_Code sample not included: ~/snippets/csharp/System/Byte/Overview/tobyte1.cs._

## Convert.ToByte(Object, IFormatProvider) method

```csharp
public static byte ToByte (object? value, IFormatProvider? provider);
```

Converts the value of the specified object to an 8-bit unsigned integer, using the specified culture-specific formatting information.

Parameters:

- `value`: An object that implements the `IConvertible` interface.
- `provider`: An object that supplies culture-specific formatting information.

Returns: An 8-bit unsigned integer that is equivalent to `value`, or zero if `value` is `null`.

Exceptions:

- `FormatException`: `value` is not in the property format for a `Byte` value.
- `InvalidCastException`: `value` does not implement `IConvertible`.

-or-

Conversion from `value` to the `Byte` type is not supported.
- `OverflowException`: `value` represents a number that is less than <see cref="F:System.Byte.MinValue">Byte.MinValue</see> or greater than <see cref="F:System.Byte.MaxValue">Byte.MaxValue</see>.

#### Remarks
`provider` enables the user to specify culture-specific conversion information about the contents of `value`. The base types ignore `provider`; however, the parameter may be used if `value` is a user-defined type that implements the `IConvertible` interface.

#### Examples
The following example defines a `ByteString` class that implements the `IConvertible` interface. The class stores the string representation of a byte value along with a sign field, so that it is able to represent both signed and unsigned byte values.

_Code sample not included: ~/snippets/csharp/System/Byte/Overview/tobyte3.cs._

The following example instantiates several `ByteString` objects and calls the `ToByte` method to convert them to byte values. It illustrates that the `ToByte` method wraps a call to the `IConvertible.ToByte` method of the object to be converted.

_Code sample not included: ~/snippets/csharp/System/Byte/Overview/tobyte3.cs._

## Convert.ToByte(String, IFormatProvider) method

```csharp
public static byte ToByte (string? value, IFormatProvider? provider);
```

Converts the specified string representation of a number to an equivalent 8-bit unsigned integer, using specified culture-specific formatting information.

Parameters:

- `value`: A string that contains the number to convert.
- `provider`: An object that supplies culture-specific formatting information.

Returns: An 8-bit unsigned integer that is equivalent to `value`, or zero if `value` is `null`.

Exceptions:

- `FormatException`: `value` does not consist of an optional sign followed by a sequence of digits (0 through 9).
- `OverflowException`: `value` represents a number that is less than <see cref="F:System.Byte.MinValue">Byte.MinValue</see> or greater than <see cref="F:System.Byte.MaxValue">Byte.MaxValue</see>.

#### Remarks
`provider` is an `IFormatProvider` instance that obtains a `NumberFormatInfo` object. The `NumberFormatInfo` object provides culture-specific information about the format of `value`. If `provider` is `null`, the `NumberFormatInfo` object for the current culture is used.

If you prefer not to handle an exception if the conversion fails, you can call the `Byte.TryParse` method instead. It returns a `Boolean` value that indicates whether the conversion succeeded or failed.

#### Examples
The following example creates a custom `NumberFormatInfo` object that defines the positive sign as "pos" and the negative sign as "neg", which it uses in calls to the `ToByte` method. It then calls the `ToByte` method repeatedly to convert each element in a string array to a `Byte` value.

_Code sample not included: ~/snippets/csharp/System/Byte/Overview/tobyte4.cs._

## Convert.ToByte(String, Int32) method

```csharp
public static byte ToByte (string? value, int fromBase);
```

Converts the string representation of a number in a specified base to an equivalent 8-bit unsigned integer.

Parameters:

- `value`: A string that contains the number to convert.
- `fromBase`: The base of the number in `value`, which must be 2, 8, 10, or 16.

Returns: An 8-bit unsigned integer that is equivalent to the number in `value`, or 0 (zero) if `value` is `null`.

Exceptions:

- `ArgumentException`: `fromBase` is not 2, 8, 10, or 16.

-or-

`value`, which represents a non-base 10 unsigned number, is prefixed with a negative sign.
- `ArgumentOutOfRangeException`: `value` is `String.Empty`.
- `FormatException`: `value` contains a character that is not a valid digit in the base specified by `fromBase`. The exception message indicates that there are no digits to convert if the first character in `value` is invalid; otherwise, the message indicates that `value` contains invalid trailing characters.
- `OverflowException`: `value`, which represents a base 10 unsigned number, is prefixed with a negative sign.

-or-

`value` represents a number that is less than <see cref="F:System.Byte.MinValue">Byte.MinValue</see> or greater than <see cref="F:System.Byte.MaxValue">Byte.MaxValue</see>.

#### Remarks
If `fromBase` is 16, you can prefix the number specified by the `value` parameter with "0x" or "0X".

Because the `Byte` data type supports unsigned values only, the `ToByte` method assumes that `value` is expressed using unsigned binary representation. In other words, all eight bits are used to represent the numeric value, and a sign bit is absent. As a result, it is possible to write code in which a signed byte value that is out of the range of the `Byte` data type is converted to a `Byte` value without the method throwing an exception. The following example converts `MinValue` to its hexadecimal string representation, and then calls the `ToByte` method. Instead of throwing an exception, the method displays the message, "0x80 converts to 128."

_Code sample not included: ~/snippets/csharp/System/Convert/ToByte/Conversion.cs._

When performing binary operations or numeric conversions, it is always the responsibility of the developer to verify that a method or operator is using the appropriate numeric representation to interpret a particular value. The following example illustrates one technique for ensuring that the method does not inappropriately use unsigned binary representation when it converts a hexadecimal string representation to a `Byte` value. The example determines whether a value represents a signed or an unsigned integer while it is converting that value to its string representation. When the example converts the value back to a `Byte` value, it checks whether the original value was a signed integer. If so, and if its high-order bit is set (which indicates that the value is negative and that it uses two's complement instead of unsigned binary representation), the method throws an exception.

_Code sample not included: ~/snippets/csharp/System/Convert/ToByte/Conversion.cs._

#### Examples
The following example alternately attempts to interpret an array of strings as the representation of binary, octal, decimal, and hexadecimal values.

_Code sample not included: ~/snippets/csharp/System/Byte/Overview/tobyte2.cs._

## Convert.ToChar(Boolean) method

```csharp
public static char ToChar (bool value);
```

Calling this method always throws `InvalidCastException`.

Parameters:

- `value`: The Boolean value to convert.

Returns: This conversion is not supported. No value is returned.

Exceptions:

- `InvalidCastException`: This conversion is not supported.

To be added.

## Convert.ToChar(Byte) method

```csharp
public static char ToChar (byte value);
```

Converts the value of the specified 8-bit unsigned integer to its equivalent Unicode character.

Parameters:

- `value`: The 8-bit unsigned integer to convert.

Returns: A Unicode character that is equivalent to `value`.

#### Examples
The following example converts an array of unsigned bytes to `Char` values.

_Code sample not included: ~/snippets/csharp/System/Convert/ToChar/tochar1.cs._

## Convert.ToChar(Char) method

```csharp
public static char ToChar (char value);
```

Returns the specified Unicode character value; no actual conversion is performed.

Parameters:

- `value`: The Unicode character to return.

Returns: `value` is returned unchanged.

To be added.

## Convert.ToChar(DateTime) method

```csharp
public static char ToChar (DateTime value);
```

Calling this method always throws `InvalidCastException`.

Parameters:

- `value`: The date and time value to convert.

Returns: This conversion is not supported. No value is returned.

Exceptions:

- `InvalidCastException`: This conversion is not supported.

To be added.

## Convert.ToChar(Decimal) method

```csharp
public static char ToChar (decimal value);
```

Calling this method always throws `InvalidCastException`.

Parameters:

- `value`: The decimal number to convert.

Returns: This conversion is not supported. No value is returned.

Exceptions:

- `InvalidCastException`: This conversion is not supported.

#### Examples
The following example attempts to convert a `Decimal` to `Char`, and throws `InvalidCastException` on failure.

_Code sample not included: ~/snippets/csharp/System/Convert/ToBoolean/system.convert snippet.cs._

## Convert.ToChar(Double) method

```csharp
public static char ToChar (double value);
```

Calling this method always throws `InvalidCastException`.

Parameters:

- `value`: The double-precision floating-point number to convert.

Returns: This conversion is not supported. No value is returned.

Exceptions:

- `InvalidCastException`: This conversion is not supported.

To be added.

## Convert.ToChar(Int16) method

```csharp
public static char ToChar (short value);
```

Converts the value of the specified 16-bit signed integer to its equivalent Unicode character.

Parameters:

- `value`: The 16-bit signed integer to convert.

Returns: A Unicode character that is equivalent to `value`.

Exceptions:

- `OverflowException`: `value` is less than <see cref="F:System.Char.MinValue">Char.MinValue</see>.

#### Examples
The following example converts an array of signed 16-bit integers to `Char` values.

_Code sample not included: ~/snippets/csharp/System/Convert/ToChar/tochar1.cs._

## Convert.ToChar(Int32) method

```csharp
public static char ToChar (int value);
```

Converts the value of the specified 32-bit signed integer to its equivalent Unicode character.

Parameters:

- `value`: The 32-bit signed integer to convert.

Returns: A Unicode character that is equivalent to `value`.

Exceptions:

- `OverflowException`: `value` is less than <see cref="F:System.Char.MinValue">Char.MinValue</see> or greater than <see cref="F:System.Char.MaxValue">Char.MaxValue</see>.

#### Examples
The following example converts an array of signed integers to `Char` values.

_Code sample not included: ~/snippets/csharp/System/Convert/ToChar/tochar1.cs._

## Convert.ToChar(Int64) method

```csharp
public static char ToChar (long value);
```

Converts the value of the specified 64-bit signed integer to its equivalent Unicode character.

Parameters:

- `value`: The 64-bit signed integer to convert.

Returns: A Unicode character that is equivalent to `value`.

Exceptions:

- `OverflowException`: `value` is less than <see cref="F:System.Char.MinValue">Char.MinValue</see> or greater than <see cref="F:System.Char.MaxValue">Char.MaxValue</see>.

#### Examples
The following example attempts to convert a long integer to a `Char`, and throws a `OverflowException` on failure.

_Code sample not included: ~/snippets/csharp/System/Convert/ToBoolean/system.convert snippet.cs._
