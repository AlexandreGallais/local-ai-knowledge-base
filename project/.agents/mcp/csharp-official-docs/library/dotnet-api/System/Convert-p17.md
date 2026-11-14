---
title: "Convert class (part 17 of 23)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Convert.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Convert class (part 17 of 23)

## Convert.ToString(Int64) method

```csharp
public static string ToString (long value);
```

Converts the value of the specified 64-bit signed integer to its equivalent string representation.

Parameters:

- `value`: The 64-bit signed integer to convert.

Returns: The string representation of `value`.

#### Remarks

This implementation is identical to `ToString`.

#### Examples
The following example converts each element in a long integer array to its equivalent string representation.

_Code sample not included: ~/snippets/csharp/System/Convert/ToString/tostring6.cs._

## Convert.ToString(Object) method

```csharp
public static string? ToString (object? value);
```

Converts the value of the specified object to its equivalent string representation.

Parameters:

- `value`: An object that supplies the value to convert.

Returns: The string representation of `value`, or `String.Empty` if `value` is an object whose value is `null`.

#### Remarks

To convert `value` to its string representation, the method tries to call the `IConvertible.ToString` implementation of `value`. If `value` does not implement the `IConvertible` interface, the method tries to call the `IFormattable.ToString` implementation of `value`. If value does not implement the `IFormattable` interface, the method calls the `ToString` method of the underlying type of `value`.

#### Examples
The following example converts each element in an object array to its equivalent string representation.

_Code sample not included: ~/snippets/csharp/System/Convert/ToString/tostring1.cs._

## Convert.ToString(SByte) method

```csharp
public static string ToString (sbyte value);
```

Converts the value of the specified 8-bit signed integer to its equivalent string representation.

Parameters:

- `value`: The 8-bit signed integer to convert.

Returns: The string representation of `value`.

#### Remarks

This implementation is identical to `ToString`.

#### Examples
The following example converts each element in a signed byte array to its equivalent string representation.

_Code sample not included: ~/snippets/csharp/System/Convert/ToString/tostring1.cs._

## Convert.ToString(Single) method

```csharp
public static string ToString (float value);
```

Converts the value of the specified single-precision floating-point number to its equivalent string representation.

Parameters:

- `value`: The single-precision floating-point number to convert.

Returns: The string representation of `value`.

#### Remarks

This implementation is identical to `ToString`.

#### Examples
The following example converts each element in an array of `Single` values to its equivalent string representation.

_Code sample not included: ~/snippets/csharp/System/Convert/ToString/tostring1.cs._

## Convert.ToString(String) method

```csharp
public static string? ToString (string? value);
```

Returns the specified string instance; no actual conversion is performed.

Parameters:

- `value`: The string to return.

Returns: `value` is returned unchanged.

#### Examples
The following example passes a string to the `ToString` method and calls the `Object.ReferenceEquals` method to confirm that the method returns the original string. The example also calls the `String.IsInterned` method to ensure that the two strings are not identical because the original string is interned.

_Code sample not included: ~/snippets/csharp/System/Convert/ToString/tostring_string1.cs._

## Convert.ToString(UInt16) method

```csharp
public static string ToString (ushort value);
```

Converts the value of the specified 16-bit unsigned integer to its equivalent string representation.

Parameters:

- `value`: The 16-bit unsigned integer to convert.

Returns: The string representation of `value`.

#### Remarks

This implementation is identical to `ToString`.

#### Examples
The following example converts each element in an array of unsigned 16-bit integer values to its equivalent string representation.

_Code sample not included: ~/snippets/csharp/System/Convert/ToString/tostring1.cs._

## Convert.ToString(UInt32) method

```csharp
public static string ToString (uint value);
```

Converts the value of the specified 32-bit unsigned integer to its equivalent string representation.

Parameters:

- `value`: The 32-bit unsigned integer to convert.

Returns: The string representation of `value`.

#### Remarks

This implementation is identical to `ToString`.

#### Examples
The following example converts each element in an unsigned integer array to its equivalent string representation.

_Code sample not included: ~/snippets/csharp/System/Convert/ToString/tostring1.cs._

## Convert.ToString(UInt64) method

```csharp
public static string ToString (ulong value);
```

Converts the value of the specified 64-bit unsigned integer to its equivalent string representation.

Parameters:

- `value`: The 64-bit unsigned integer to convert.

Returns: The string representation of `value`.

#### Remarks

This implementation is identical to `ToString`.

#### Examples
The following example converts each element in an unsigned long integer array to its equivalent string representation.

_Code sample not included: ~/snippets/csharp/System/Convert/ToString/tostring1.cs._

## Convert.ToString(Boolean, IFormatProvider) method

```csharp
public static string ToString (bool value, IFormatProvider? provider);
```

Converts the specified Boolean value to its equivalent string representation.

Parameters:

- `value`: The Boolean value to convert.
- `provider`: An instance of an object. This parameter is ignored.

Returns: The string representation of `value`.

#### Remarks

This implementation is identical to `Boolean.ToString`. It returns `TrueString` for `true` values and `FalseString` for `false` values.

#### Examples
The following example converts a `Boolean` value to a `String` with the `ToString` method, using an `IFormatProvider` object that displays the type of the format provider for which it is called. The example shows that the `IFormatProvider` object is not referenced.

_Code sample not included: ~/snippets/csharp/System/Convert/ToString/nonnumeric.cs._

## Convert.ToString(Byte, IFormatProvider) method

```csharp
public static string ToString (byte value, IFormatProvider? provider);
```

Converts the value of the specified 8-bit unsigned integer to its equivalent string representation, using the specified culture-specific formatting information.

Parameters:

- `value`: The 8-bit unsigned integer to convert.
- `provider`: An object that supplies culture-specific formatting information.

Returns: The string representation of `value`.

#### Remarks

This implementation is identical to `Byte.ToString`.

#### Examples
The following example converts each element in an unsigned byte array to its equivalent string representation using the formatting conventions of the en-US and fr-FR cultures. Because the "G" specifier by default outputs only decimal digits in a byte value's string representation, the `provider` parameter does not affect the formatting of the returned string.

_Code sample not included: ~/snippets/csharp/System/Convert/ToString/tostring3.cs._

## Convert.ToString(Byte, Int32) method

```csharp
public static string ToString (byte value, int toBase);
```

Converts the value of an 8-bit unsigned integer to its equivalent string representation in a specified base.

Parameters:

- `value`: The 8-bit unsigned integer to convert.
- `toBase`: The base of the return value, which must be 2, 8, 10, or 16.

Returns: The string representation of `value` in base `toBase`.

Exceptions:

- `ArgumentException`: `toBase` is not 2, 8, 10, or 16.

#### Remarks
If `toBase` does not equal 10, the string that is returned by the `ToString` method represents `value` by its magnitude only. If the method is called to create a string that will later be converted back to a number, a corresponding method that assumes a magnitude-only numeric representation should be called to perform the conversion. Such methods include `ToByte` or `Parse`.

#### Examples
The following example converts each element in a byte array to its equivalent binary, octal, decimal, and hexadecimal string representations.

_Code sample not included: ~/snippets/csharp/System/Convert/ToString/tostring2.cs._

## Convert.ToString(Char, IFormatProvider) method

```csharp
public static string ToString (char value, IFormatProvider? provider);
```

Converts the value of the specified Unicode character to its equivalent string representation, using the specified culture-specific formatting information.

Parameters:

- `value`: The Unicode character to convert.
- `provider`: An object that supplies culture-specific formatting information. This parameter is ignored.

Returns: The string representation of `value`.

#### Remarks

This implementation is identical to `ToString`. The `provider` parameter is ignored.

#### Examples
The following example converts a `Char` value to a `String` with the `ToString` method, using an `IFormatProvider` object that displays the type of the format provider for which it is called. The example shows that the `IFormatProvider` object is not referenced.

_Code sample not included: ~/snippets/csharp/System/Convert/ToString/nonnumeric.cs._

## Convert.ToString(DateTime, IFormatProvider) method

```csharp
public static string ToString (DateTime value, IFormatProvider? provider);
```

Converts the value of the specified `DateTime` to its equivalent string representation, using the specified culture-specific formatting information.

Parameters:

- `value`: The date and time value to convert.
- `provider`: An object that supplies culture-specific formatting information.

Returns: The string representation of `value`.

#### Remarks

This implementation is identical to `ToString`.

#### Examples
The following example converts a `DateTime` value to its equivalent string representation in eight different cultures.

_Code sample not included: ~/snippets/csharp/System/Convert/ToString/tostring3.cs._

## Convert.ToString(Decimal, IFormatProvider) method

```csharp
public static string ToString (decimal value, IFormatProvider? provider);
```

Converts the value of the specified decimal number to its equivalent string representation, using the specified culture-specific formatting information.

Parameters:

- `value`: The decimal number to convert.
- `provider`: An object that supplies culture-specific formatting information.

Returns: The string representation of `value`.

#### Remarks

This implementation is identical to `ToString`.

#### Examples
The following example converts each element in an array of `Decimal` values to its equivalent string representation in four different cultures.

_Code sample not included: ~/snippets/csharp/System/Convert/ToString/tostring3.cs._

## Convert.ToString(Double, IFormatProvider) method

```csharp
public static string ToString (double value, IFormatProvider? provider);
```

Converts the value of the specified double-precision floating-point number to its equivalent string representation.

Parameters:

- `value`: The double-precision floating-point number to convert.
- `provider`: An object that supplies culture-specific formatting information.

Returns: The string representation of `value`.

#### Remarks

This implementation is identical to `ToString`.

#### Examples
The following example converts each element in an array of `Double` values to its equivalent string representation in four different cultures.

_Code sample not included: ~/snippets/csharp/System/Convert/ToString/tostring3.cs._

## Convert.ToString(Int16, IFormatProvider) method

```csharp
public static string ToString (short value, IFormatProvider? provider);
```

Converts the value of the specified 16-bit signed integer to its equivalent string representation, using the specified culture-specific formatting information.

Parameters:

- `value`: The 16-bit signed integer to convert.
- `provider`: An object that supplies culture-specific formatting information.

Returns: The string representation of `value`.

#### Remarks

This implementation is identical to `ToString`.

#### Examples
The following example defines a custom `NumberFormatInfo` class that defines its negative sign as the string "~" and its positive sign as the string "!". It then calls the `ToString` method to convert each element in an array of 16-bit integers to its equivalent string representation. The conversion uses the invariant culture as well as the custom `NumberFormatInfo` object.

_Code sample not included: ~/snippets/csharp/System/Convert/ToString/tostring3.cs._

## Convert.ToString(Int16, Int32) method

```csharp
public static string ToString (short value, int toBase);
```

Converts the value of a 16-bit signed integer to its equivalent string representation in a specified base.

Parameters:

- `value`: The 16-bit signed integer to convert.
- `toBase`: The base of the return value, which must be 2, 8, 10, or 16.

Returns: The string representation of `value` in base `toBase`.

Exceptions:

- `ArgumentException`: `toBase` is not 2, 8, 10, or 16.

#### Remarks

If `value` is positive and `toBase` is 2, 8, or 16, the returned string uses sign-and-magnitude representation. If `value` is negative and `toBase` is 2, 8, or 16, the returned string uses two's complement representation. This means that the high-order bit of the high-order byte (bit 15) is interpreted as the sign bit. If the `ToString` method is called to create a string that will later be converted back to a number, a corresponding method that assumes a similar numeric representation should be called to perform the conversion. Such methods include `ToInt16` and `Parse`.

#### Examples
The following example converts each element in an array of 16-bit signed integers to its equivalent binary, octal, decimal, and hexadecimal string representations.

_Code sample not included: ~/snippets/csharp/System/Convert/ToString/tostring2.cs._

## Convert.ToString(Int32, IFormatProvider) method

```csharp
public static string ToString (int value, IFormatProvider? provider);
```

Converts the value of the specified 32-bit signed integer to its equivalent string representation, using the specified culture-specific formatting information.

Parameters:

- `value`: The 32-bit signed integer to convert.
- `provider`: An object that supplies culture-specific formatting information.

Returns: The string representation of `value`.

#### Remarks

This implementation is identical to `ToString`.

#### Examples
The following example defines a custom `NumberFormatInfo` class that defines its negative sign as the string "~" and its positive sign as the string "!". It then calls the `ToString` method to convert each element in an array of integers to its equivalent string representation. The conversion uses the invariant culture as well as the custom `NumberFormatInfo` object.

_Code sample not included: ~/snippets/csharp/System/Convert/ToString/tostring3.cs._
