---
title: "Convert class (part 11 of 23)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Convert.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Convert class (part 11 of 23)

## Convert.ToInt16(Object) method

```csharp
public static short ToInt16 (object? value);
```

Converts the value of the specified object to a 16-bit signed integer.

Parameters:

- `value`: An object that implements the `IConvertible` interface, or `null`.

Returns: A 16-bit signed integer that is equivalent to `value`, or zero if `value` is `null`.

Exceptions:

- `FormatException`: `value` is not in an appropriate format for an `Int16` type.
- `InvalidCastException`: `value` does not implement the `IConvertible` interface.

-or-

The conversion is not supported.
- `OverflowException`: `value` represents a number that is less than <see cref="F:System.Int16.MinValue">Int16.MinValue</see> or greater than <see cref="F:System.Int16.MaxValue">Int16.MaxValue</see>.

#### Remarks
If `value` is not `null`, this method wraps a call to the `IConvertible.ToInt16` implementation of the underlying type of `value`.

#### Examples
The following example attempts to convert each element in an object array to a 16-bit signed integer.

_Code sample not included: ~/snippets/csharp/System/Convert/ToInt16/toint16_1.cs._

## Convert.ToInt16(SByte) method

```csharp
public static short ToInt16 (sbyte value);
```

Converts the value of the specified 8-bit signed integer to the equivalent 16-bit signed integer.

Parameters:

- `value`: The 8-bit signed integer to convert.

Returns: A 8-bit signed integer that is equivalent to `value`.

#### Examples
The following example converts each element in an array of signed bytes to a 16-bit signed integer.

_Code sample not included: ~/snippets/csharp/System/Convert/ToInt16/toint16_1.cs._

## Convert.ToInt16(Single) method

```csharp
public static short ToInt16 (float value);
```

Converts the value of the specified single-precision floating-point number to an equivalent 16-bit signed integer.

Parameters:

- `value`: The single-precision floating-point number to convert.

Returns: `value`, rounded to the nearest 16-bit signed integer. If `value` is halfway between two whole numbers, the even number is returned; that is, 4.5 is converted to 4, and 5.5 is converted to 6.

Exceptions:

- `OverflowException`: `value` is greater than <see cref="F:System.Int16.MaxValue">Int16.MaxValue</see> or less than <see cref="F:System.Int16.MinValue">Int16.MinValue</see>.

#### Examples
The following example attempts to convert each element in an array of `Single` values to a 16-bit signed integer.

_Code sample not included: ~/snippets/csharp/System/Convert/ToInt16/toint16_1.cs._

## Convert.ToInt16(String) method

```csharp
public static short ToInt16 (string? value);
```

Converts the specified string representation of a number to an equivalent 16-bit signed integer.

Parameters:

- `value`: A string that contains the number to convert.

Returns: A 16-bit signed integer that is equivalent to the number in `value`, or 0 (zero) if `value` is `null`.

Exceptions:

- `FormatException`: `value` does not consist of an optional sign followed by a sequence of digits (0 through 9).
- `OverflowException`: `value` represents a number that is less than <see cref="F:System.Int16.MinValue">Int16.MinValue</see> or greater than <see cref="F:System.Int16.MaxValue">Int16.MaxValue</see>.

#### Remarks
Using the `ToInt16` method is equivalent to passing `value` to the `Parse` method. `value` is interpreted by using the formatting conventions of the current culture.

If you prefer not to handle an exception if the conversion fails, you can call the `Int16.TryParse` method instead. It returns a `Boolean` value that indicates whether the conversion succeeded or failed.

#### Examples
The following example converts string representations of 16-bit integers with the `ToInt16` method, using default formatting.

_Code sample not included: ~/snippets/csharp/System/Convert/ToInt16/toint16.cs._

## Convert.ToInt16(UInt16) method

```csharp
public static short ToInt16 (ushort value);
```

Converts the value of the specified 16-bit unsigned integer to the equivalent 16-bit signed integer.

Parameters:

- `value`: The 16-bit unsigned integer to convert.

Returns: A 16-bit signed integer that is equivalent to `value`.

Exceptions:

- `OverflowException`: `value` is greater than <see cref="F:System.Int16.MaxValue">Int16.MaxValue</see>.

#### Examples
The following example attempts to convert each element in an array of unsigned 16-bit integers to a 16-bit signed integer.

_Code sample not included: ~/snippets/csharp/System/Convert/ToInt16/toint16_1.cs._

## Convert.ToInt16(UInt32) method

```csharp
public static short ToInt16 (uint value);
```

Converts the value of the specified 32-bit unsigned integer to an equivalent 16-bit signed integer.

Parameters:

- `value`: The 32-bit unsigned integer to convert.

Returns: A 16-bit signed integer that is equivalent to `value`.

Exceptions:

- `OverflowException`: `value` is greater than <see cref="F:System.Int16.MaxValue">Int16.MaxValue</see>.

#### Examples
The following example attempts to convert each element in an array of unsigned integers to a 16-bit signed integer.

_Code sample not included: ~/snippets/csharp/System/Convert/ToInt16/toint16_1.cs._

## Convert.ToInt16(UInt64) method

```csharp
public static short ToInt16 (ulong value);
```

Converts the value of the specified 64-bit unsigned integer to an equivalent 16-bit signed integer.

Parameters:

- `value`: The 64-bit unsigned integer to convert.

Returns: A 16-bit signed integer that is equivalent to `value`.

Exceptions:

- `OverflowException`: `value` is greater than <see cref="F:System.Int16.MaxValue">Int16.MaxValue</see>.

#### Examples
The following example attempts to convert each element in an array of unsigned long integers to a 16-bit signed integer.

_Code sample not included: ~/snippets/csharp/System/Convert/ToInt16/toint16_1.cs._

## Convert.ToInt16(Object, IFormatProvider) method

```csharp
public static short ToInt16 (object? value, IFormatProvider? provider);
```

Converts the value of the specified object to a 16-bit signed integer, using the specified culture-specific formatting information.

Parameters:

- `value`: An object that implements the `IConvertible` interface.
- `provider`: An object that supplies culture-specific formatting information.

Returns: A 16-bit signed integer that is equivalent to `value`, or zero if `value` is `null`.

Exceptions:

- `FormatException`: `value` is not in an appropriate format for an `Int16` type.
- `InvalidCastException`: `value` does not implement `IConvertible`.
- `OverflowException`: `value` represents a number that is less than <see cref="F:System.Int16.MinValue">Int16.MinValue</see> or greater than <see cref="F:System.Int16.MaxValue">Int16.MaxValue</see>.

#### Remarks
`provider` enables the user to specify culture-specific conversion information about the contents of `value`. For example, if `value` is a `String` that represents a number, `provider` could supply culture-specific information about the notation used to represent that number.

The base types ignore `provider`; however, the parameter may be used if `value` is a user-defined type that implements the `IConvertible` interface.

#### Examples
The following example defines a class that implements `IConvertible` and a class that implements `IFormatProvider`. Objects of the class that implements `IConvertible` hold an array of `Double` values. An object of each class is passed to the `ToInt16` method. This method returns an average of the array of `Double` values, using the object that implements `IFormatProvider` to determine how to calculate the average.

_Code sample not included: ~/snippets/csharp/System/Convert/ToBoolean/objectifp.cs._

## Convert.ToInt16(String, IFormatProvider) method

```csharp
public static short ToInt16 (string? value, IFormatProvider? provider);
```

Converts the specified string representation of a number to an equivalent 16-bit signed integer, using the specified culture-specific formatting information.

Parameters:

- `value`: A string that contains the number to convert.
- `provider`: An object that supplies culture-specific formatting information.

Returns: A 16-bit signed integer that is equivalent to the number in `value`, or 0 (zero) if `value` is `null`.

Exceptions:

- `FormatException`: `value` does not consist of an optional sign followed by a sequence of digits (0 through 9).
- `OverflowException`: `value` represents a number that is less than <see cref="F:System.Int16.MinValue">Int16.MinValue</see> or greater than <see cref="F:System.Int16.MaxValue">Int16.MaxValue</see>.

#### Remarks
`provider` is an `IFormatProvider` instance that obtains a `NumberFormatInfo` object. The `NumberFormatInfo` object provides culture-specific information about the format of `value`. If `provider` is `null`, the `NumberFormatInfo` for the current culture is used.

If you prefer not to handle an exception if the conversion fails, you can call the `Int16.TryParse` method instead. It returns a `Boolean` value that indicates whether the conversion succeeded or failed.

#### Examples
The following example converts string representations of 16-bit integers with the `ToInt16` method, using an `IFormatProvider` object.

_Code sample not included: ~/snippets/csharp/System/Convert/ToInt16/toint16.cs._

## Convert.ToInt16(String, Int32) method

```csharp
public static short ToInt16 (string? value, int fromBase);
```

Converts the string representation of a number in a specified base to an equivalent 16-bit signed integer.

Parameters:

- `value`: A string that contains the number to convert.
- `fromBase`: The base of the number in `value`, which must be 2, 8, 10, or 16.

Returns: A 16-bit signed integer that is equivalent to the number in `value`, or 0 (zero) if `value` is `null`.

Exceptions:

- `ArgumentException`: `fromBase` is not 2, 8, 10, or 16.

-or-

`value`, which represents a non-base 10 signed number, is prefixed with a negative sign.
- `ArgumentOutOfRangeException`: `value` is `String.Empty`.
- `FormatException`: `value` contains a character that is not a valid digit in the base specified by `fromBase`. The exception message indicates that there are no digits to convert if the first character in `value` is invalid; otherwise, the message indicates that `value` contains invalid trailing characters.
- `OverflowException`: `value`, which represents a non-base 10 signed number, is prefixed with a negative sign.

-or-

`value` represents a number that is less than <see cref="F:System.Int16.MinValue">Int16.MinValue</see> or greater than <see cref="F:System.Int16.MaxValue">Int16.MaxValue</see>.

#### Remarks
If `fromBase` is 16, you can prefix the number specified by the `value` parameter with "0x" or "0X".

Because the negative sign is not supported for non-base 10 numeric representations, the `ToInt16` method assumes that negative numbers use two's complement representation. In other words, the method always interprets the highest-order binary bit of an integer (bit 15) as its sign bit. As a result, it is possible to write code in which a non-base 10 number that is out of the range of the `Int16` data type is converted to an `Int16` value without the method throwing an exception. The following example increments `MaxValue` by one, converts the resulting number to its hexadecimal string representation, and then calls the `ToInt16` method. Instead of throwing an exception, the method displays the message, "0x8000 converts to -32768."

_Code sample not included: ~/snippets/csharp/System/Convert/ToByte/Conversion.cs._

When performing binary operations or numeric conversions, it is always the responsibility of the developer to verify that a method is using the appropriate numeric representation to interpret a particular value. As the following example illustrates, you can ensure that the method handles overflows appropriately by first retrieving the sign of the numeric value before converting it to its hexadecimal string representation. Throw an exception if the original value was positive but the conversion back to an integer yields a negative value.

_Code sample not included: ~/snippets/csharp/System/Convert/ToByte/Conversion.cs._

#### Examples
The following example attempts to interpret each element in a string array as a hexadecimal string and to convert it to a 16-bit signed integer.

_Code sample not included: ~/snippets/csharp/System/Convert/ToInt16/toint16_2.cs._

## Convert.ToInt32(Boolean) method

```csharp
public static int ToInt32 (bool value);
```

Converts the specified Boolean value to the equivalent 32-bit signed integer.

Parameters:

- `value`: The Boolean value to convert.

Returns: The number 1 if `value` is `true`; otherwise, 0.

#### Examples
The following example converts the `Boolean` values `true` and `false` to integers.

_Code sample not included: ~/snippets/csharp/System/Convert/ToInt32/toint32_1.cs._

## Convert.ToInt32(Byte) method

```csharp
public static int ToInt32 (byte value);
```

Converts the value of the specified 8-bit unsigned integer to the equivalent 32-bit signed integer.

Parameters:

- `value`: The 8-bit unsigned integer to convert.

Returns: A 32-bit signed integer that is equivalent to `value`.

#### Examples
The following example converts each element in an array of bytes to an integer.

_Code sample not included: ~/snippets/csharp/System/Convert/ToInt32/toint32_1.cs._

## Convert.ToInt32(Char) method

```csharp
public static int ToInt32 (char value);
```

Converts the value of the specified Unicode character to the equivalent 32-bit signed integer.

Parameters:

- `value`: The Unicode character to convert.

Returns: A 32-bit signed integer that is equivalent to `value`.

#### Remarks
The `ToInt32` method returns a 32-bit signed integer that represents the UTF-16 encoded code unit of the `value` argument. If `value` is not a low surrogate or a high surrogate, this return value also represents the Unicode code point of value.

#### Examples
The following example converts each element in an array of `Char` values to an integer.

_Code sample not included: ~/snippets/csharp/System/Convert/ToInt32/toint32_1.cs._

## Convert.ToInt32(DateTime) method

```csharp
public static int ToInt32 (DateTime value);
```

Calling this method always throws `InvalidCastException`.

Parameters:

- `value`: The date and time value to convert.

Returns: This conversion is not supported. No value is returned.

Exceptions:

- `InvalidCastException`: This conversion is not supported.

To be added.
