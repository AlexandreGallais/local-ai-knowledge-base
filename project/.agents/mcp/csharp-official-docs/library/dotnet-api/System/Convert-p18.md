---
title: "Convert class (part 18 of 23)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Convert.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Convert class (part 18 of 23)

## Convert.ToString(Int32, Int32) method

```csharp
public static string ToString (int value, int toBase);
```

Converts the value of a 32-bit signed integer to its equivalent string representation in a specified base.

Parameters:

- `value`: The 32-bit signed integer to convert.
- `toBase`: The base of the return value, which must be 2, 8, 10, or 16.

Returns: The string representation of `value` in base `toBase`.

Exceptions:

- `ArgumentException`: `toBase` is not 2, 8, 10, or 16.

#### Remarks

If `value` is positive and `toBase` is 2, 8, or 16, the returned string uses sign-and-magnitude representation. If `value` is negative and `toBase` is 2, 8, or 16, the returned string uses two's complement representation. This means that the high-order bit of the highest-order byte (bit 31) is interpreted as the sign bit. If the `ToString` method is called to create a string that will later be converted back to a number, a corresponding method that assumes a similar numeric representation should be called to perform the conversion. Such methods include `ToInt32` and `Parse`.

#### Examples
The following example converts each element in an integer array to its string representation in binary, octal, decimal, and hexadecimal.

_Code sample not included: ~/snippets/csharp/System/Convert/ToString/tostring2.cs._

## Convert.ToString(Int64, IFormatProvider) method

```csharp
public static string ToString (long value, IFormatProvider? provider);
```

Converts the value of the specified 64-bit signed integer to its equivalent string representation, using the specified culture-specific formatting information.

Parameters:

- `value`: The 64-bit signed integer to convert.
- `provider`: An object that supplies culture-specific formatting information.

Returns: The string representation of `value`.

#### Remarks

This implementation is identical to `ToString`.

#### Examples
The following example defines a custom `NumberFormatInfo` class that defines its negative sign as the string "~" and its positive sign as the string "!". It then calls the `ToString` method to convert each element in a long integer array to its equivalent string representation. The conversion uses the invariant culture as well as the custom `NumberFormatInfo` object.

_Code sample not included: ~/snippets/csharp/System/Convert/ToString/tostring3.cs._

## Convert.ToString(Int64, Int32) method

```csharp
public static string ToString (long value, int toBase);
```

Converts the value of a 64-bit signed integer to its equivalent string representation in a specified base.

Parameters:

- `value`: The 64-bit signed integer to convert.
- `toBase`: The base of the return value, which must be 2, 8, 10, or 16.

Returns: The string representation of `value` in base `toBase`.

Exceptions:

- `ArgumentException`: `toBase` is not 2, 8, 10, or 16.

#### Remarks

If `value` is positive and `toBase` is not 10, the returned string uses sign-and-magnitude representation. If `value` is negative and `toBase` is not 10, the returned string uses two's complement representation. This means that the high-order bit of the highest-order byte (bit 63) is interpreted as the sign bit. If the `ToString` method is called to create a string that will later be converted back to a number, a corresponding method that assumes a similar numeric representation should be called to perform the conversion. Such methods include `ToInt64` and `Parse`.

#### Examples
The following example converts each element in a long integer array to its equivalent binary, octal, decimal, and hexadecimal string representations.

_Code sample not included: ~/snippets/csharp/System/Convert/ToString/tostring2.cs._

## Convert.ToString(Object, IFormatProvider) method

```csharp
public static string? ToString (object? value, IFormatProvider? provider);
```

Converts the value of the specified object to its equivalent string representation using the specified culture-specific formatting information.

Parameters:

- `value`: An object that supplies the value to convert.
- `provider`: The culture-specific formatting information.

Returns: The string representation of `value`, or `String.Empty` if `value` is an object whose value is `null`.

#### Remarks

If the `value` parameter implements the `IConvertible` interface, the method calls the `ToString` implementation of `value`. Otherwise, if the `value` parameter implements the `IFormattable` interface, the method calls its `ToString` implementation. If `value` implements neither interface, the method calls the `value` parameter's `ToString()` method, and the `provider` parameter is ignored.

The `provider` parameter is used if the `value` parameter implements the `IConvertible` or `IFormattable` interface. The most common use of the `provider` parameter is to specify culture-specific information used in the conversion of `value`. For example, if the `value` parameter is a negative decimal number, the `provider` parameter can supply culture-specific information about the notation used for the negative sign and decimal separator. The second example in the next section illustrates a format provider that does not supply culture-sensitive formatting information.

#### Examples
The following example defines a `Temperature` class that overrides the `Object.ToString` method but does not implement the `IConvertible` interface. The example illustrates how calls to the `ToString` method, in turn, call the `Temperature.ToString` method.

_Code sample not included: ~/snippets/csharp/System/Convert/ToString/tostring5.cs._

The following example defines a `Temperature` class that implements the `IFormattable` interface but does not implement the `IConvertible` interface. Its `IFormattable.ToString` implementation represents the `Temperature` value in Celsius, Fahrenheit, or Kelvin, depending on the format  string. The example also defines a `TemperatureProvider` class that implements `IFormatProvider` and provides a randomly generated format string that is used by the `IFormattable` implementation of the `Temperature` class.

_Code sample not included: ~/snippets/csharp/System/Convert/ToString/tostring_obj30.cs._

## Convert.ToString(SByte, IFormatProvider) method

```csharp
public static string ToString (sbyte value, IFormatProvider? provider);
```

Converts the value of the specified 8-bit signed integer to its equivalent string representation, using the specified culture-specific formatting information.

Parameters:

- `value`: The 8-bit signed integer to convert.
- `provider`: An object that supplies culture-specific formatting information.

Returns: The string representation of `value`.

#### Remarks

This implementation is identical to `ToString`.

#### Examples
The following example defines a custom `NumberFormatInfo` class that defines its negative sign as the string "~" and its positive sign as the string "!". It then calls the `ToString` method to convert each element in signed byte array to its equivalent string representation. The conversion uses the invariant culture as well as the custom `NumberFormatInfo` object.

_Code sample not included: ~/snippets/csharp/System/Convert/ToString/tostring3.cs._

## Convert.ToString(Single, IFormatProvider) method

```csharp
public static string ToString (float value, IFormatProvider? provider);
```

Converts the value of the specified single-precision floating-point number to its equivalent string representation, using the specified culture-specific formatting information.

Parameters:

- `value`: The single-precision floating-point number to convert.
- `provider`: An object that supplies culture-specific formatting information.

Returns: The string representation of `value`.

#### Remarks

This implementation is identical to `ToString`.

#### Examples
The following example converts each element in an array of `Single` values to its equivalent string representation in four different cultures.

_Code sample not included: ~/snippets/csharp/System/Convert/ToString/tostring3.cs._

## Convert.ToString(String, IFormatProvider) method

```csharp
public static string? ToString (string? value, IFormatProvider? provider);
```

Returns the specified string instance; no actual conversion is performed.

Parameters:

- `value`: The string to return.
- `provider`: An object that supplies culture-specific formatting information. This parameter is ignored.

Returns: `value` is returned unchanged.

#### Examples
The following example calls the `ToString` method with a `String` parameter. The method returns the unmodified `String` without referencing the `IFormatProvider` object.

_Code sample not included: ~/snippets/csharp/System/Convert/ToString/nonnumeric.cs._

## Convert.ToString(UInt16, IFormatProvider) method

```csharp
public static string ToString (ushort value, IFormatProvider? provider);
```

Converts the value of the specified 16-bit unsigned integer to its equivalent string representation, using the specified culture-specific formatting information.

Parameters:

- `value`: The 16-bit unsigned integer to convert.
- `provider`: An object that supplies culture-specific formatting information.

Returns: The string representation of `value`.

#### Remarks

This implementation is identical to `ToString`.

#### Examples
The following example defines a custom `NumberFormatInfo` class that defines its negative sign as the string "~" and its positive sign as the string "!". It then calls the `ToString` method to convert a 16-bit unsigned integer value to its equivalent string representation. The conversion uses both the invariant culture and the custom `NumberFormatInfo` object. The output indicates that this formatting information is not used, because by default the "G" format specifier does not include a positive sign with positive values.

_Code sample not included: ~/snippets/csharp/System/Convert/ToString/tostring3.cs._

## Convert.ToString(UInt32, IFormatProvider) method

```csharp
public static string ToString (uint value, IFormatProvider? provider);
```

Converts the value of the specified 32-bit unsigned integer to its equivalent string representation, using the specified culture-specific formatting information.

Parameters:

- `value`: The 32-bit unsigned integer to convert.
- `provider`: An object that supplies culture-specific formatting information.

Returns: The string representation of `value`.

#### Remarks

This implementation is identical to `ToString`.

#### Examples
The following example defines a custom `NumberFormatInfo` class that defines its negative sign as the string "~" and its positive sign as the string "!". It then calls the `ToString` method to convert an unsigned integer value to its equivalent string representation. The conversion uses both the invariant culture and the custom `NumberFormatInfo` object. The output indicates that this formatting information is not used, because by default the "G" format specifier does not include a positive sign with positive values.

_Code sample not included: ~/snippets/csharp/System/Convert/ToString/tostring3.cs._

## Convert.ToString(UInt64, IFormatProvider) method

```csharp
public static string ToString (ulong value, IFormatProvider? provider);
```

Converts the value of the specified 64-bit unsigned integer to its equivalent string representation, using the specified culture-specific formatting information.

Parameters:

- `value`: The 64-bit unsigned integer to convert.
- `provider`: An object that supplies culture-specific formatting information.

Returns: The string representation of `value`.

#### Remarks

This implementation is identical to `ToString`.

#### Examples
The following example defines a custom `NumberFormatInfo` class that defines its negative sign as the string "~" and its positive sign as the string "!". It then calls the `ToString` method to convert an unsigned long integer value to its equivalent string representation. The conversion uses both the invariant culture and the custom `NumberFormatInfo` object. The output indicates that this formatting information is not used, because by default the "G" format specifier does not include a positive sign with positive values.

_Code sample not included: ~/snippets/csharp/System/Convert/ToString/tostring3.cs._

## Convert.ToUInt16(Boolean) method

```csharp
public static ushort ToUInt16 (bool value);
```

Converts the specified Boolean value to the equivalent 16-bit unsigned integer.

Parameters:

- `value`: The Boolean value to convert.

Returns: The number 1 if `value` is `true`; otherwise, 0.

#### Examples
The following example converts the Boolean values `true` and `false` to unsigned 16-bit integers.

_Code sample not included: ~/snippets/csharp/System/Convert/ToUInt16/touint16_1.cs._

## Convert.ToUInt16(Byte) method

```csharp
public static ushort ToUInt16 (byte value);
```

Converts the value of the specified 8-bit unsigned integer to the equivalent 16-bit unsigned integer.

Parameters:

- `value`: The 8-bit unsigned integer to convert.

Returns: A 16-bit unsigned integer that is equivalent to `value`.

#### Examples
The following example converts each element in a byte array to an unsigned 16-bit integer.

_Code sample not included: ~/snippets/csharp/System/Convert/ToUInt16/touint16_1.cs._

## Convert.ToUInt16(Char) method

```csharp
public static ushort ToUInt16 (char value);
```

Converts the value of the specified Unicode character to the equivalent 16-bit unsigned integer.

Parameters:

- `value`: The Unicode character to convert.

Returns: The 16-bit unsigned integer equivalent to `value`.

#### Examples
The following example converts each element in a character array to an unsigned 16-bit integer.

_Code sample not included: ~/snippets/csharp/System/Convert/ToUInt16/touint16_1.cs._

## Convert.ToUInt16(DateTime) method

```csharp
public static ushort ToUInt16 (DateTime value);
```

Calling this method always throws `InvalidCastException`.

Parameters:

- `value`: The date and time value to convert.

Returns: This conversion is not supported. No value is returned.

Exceptions:

- `InvalidCastException`: This conversion is not supported.

To be added.

## Convert.ToUInt16(Decimal) method

```csharp
public static ushort ToUInt16 (decimal value);
```

Converts the value of the specified decimal number to an equivalent 16-bit unsigned integer.

Parameters:

- `value`: The decimal number to convert.

Returns: `value`, rounded to the nearest 16-bit unsigned integer. If `value` is halfway between two whole numbers, the even number is returned; that is, 4.5 is converted to 4, and 5.5 is converted to 6.

Exceptions:

- `OverflowException`: `value` is less than zero or greater than <see cref="F:System.UInt16.MaxValue">UInt16.MaxValue</see>.

#### Examples
The following example converts each element in an array of `Decimal` values to an unsigned 16-bit integer.

_Code sample not included: ~/snippets/csharp/System/Convert/ToUInt16/touint16_1.cs._
