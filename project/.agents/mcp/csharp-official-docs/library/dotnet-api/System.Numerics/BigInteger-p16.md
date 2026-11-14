---
title: "BigInteger struct (part 16 of 18)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Numerics/BigInteger.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# BigInteger struct (part 16 of 18)

## BigInteger.ToByteArray() method

```csharp
public byte[] ToByteArray ();
```

Converts a `BigInteger` value to a byte array.

Returns: The value of the current `BigInteger` object converted to an array of bytes.

#### Remarks
The individual bytes in the array returned by this method appear in little-endian order. That is, the lower-order bytes of the value precede the higher-order bytes. The first byte of the array reflects the first eight bits of the `BigInteger` value, the second byte reflects the next eight bits, and so on. For example, the value 1024, or 0x0400, is stored as the following array of two bytes:

|Element|Byte value|
|-------------|----------------|
|0|0x00|
|1|0x04|

Negative values are written to the array using two's complement representation in the most compact form possible. For example, -1 is represented as a single byte whose value is `0xFF` instead of as an array with multiple elements, such as `0xFF`, `0xFF` or `0xFF`, `0xFF`, `0xFF`, `0xFF`.

Because two's complement representation always interprets the highest-order bit of the last byte in the array (the byte at position `Array.Length``- 1`) as the sign bit, the method returns a byte array with an extra element whose value is zero to disambiguate positive values that could otherwise be interpreted as having their sign bits set. For example, the value 120 or `0x78` is represented as a single-byte array: `0x78`. However, 128, or `0x80`, is represented as a two-byte array: `0x80`, `0x00`.

You can round-trip a `BigInteger` value by storing it to a byte array and then restoring it using the `%23ctor` constructor.

> **Caution:**
>  If your code modifies the value of individual bytes in the array returned by this method before it restores the value, you must make sure that you do not unintentionally change the sign bit. For example, if your modifications increase a positive value so that the highest-order bit in the last element of the byte array becomes set, you can add a new byte whose value is zero to the end of the array.

#### Examples
The following example illustrates how some `BigInteger` values are represented in byte arrays.

_Code sample not included: ~/snippets/csharp/System.Numerics/BigInteger/ToByteArray/ToByteArray1.cs._

## BigInteger.ToByteArray(Boolean, Boolean) method

```csharp
public byte[] ToByteArray (bool isUnsigned = false, bool isBigEndian = false);
```

Returns the value of this `BigInteger` as a byte array using the fewest number of bytes possible. If the value is zero, returns an array of one byte whose element is 0x00.

Parameters:

- `isUnsigned`: `true` to use unsigned encoding; otherwise, `false`.
- `isBigEndian`: `true` to write the bytes in a big-endian byte order; otherwise, `false`.

Returns: The value of the current `BigInteger` object converted to an array of bytes.

Exceptions:

- `OverflowException`: If `isUnsigned` is `true` and `BigInteger.Sign` is negative.

#### Remarks

The integer value `33022` can be exported in four different arrays:

| Properties                           | Result                          |
|--------------------------------------|---------------------------------|
| `isUnsigned: false, isBigEndian: false` | `new byte[] { 0xFE, 0x80, 0x00 }` |
| `isUnsigned: false, isBigEndian: true`  | `new byte[] { 0x00, 0x80, 0xFE }` |
| `isUnsigned: true, isBigEndian: false`  | `new byte[] { 0xFE, 0x80 } `      |
| `isUnsigned: true, isBigEndian: true`   | `new byte[] { 0x80, 0xFE }`       |

## BigInteger.ToString() method

```csharp
public override string ToString ();
```

Converts the numeric value of the current `BigInteger` object to its equivalent string representation.

Returns: The string representation of the current `BigInteger` value.

#### Remarks
The `ToString` method formats a `BigInteger` value in the "R", or round-trip, format of the current culture. If you want to specify a different format or culture, use the other overloads of the `BigInteger.ToString` method, as follows:

|To use format|For culture|Use the overload|
|-------------------|-----------------|----------------------|
|Round-trip ("R") format|A specific culture|`BigInteger.ToString`|
|A specific format|Default (current) culture|`ToString`|
|A specific format|A specific culture|`ToString`|

The string representation of the `BigInteger` value includes a negative sign if its value is negative, and a sequence of digits ranging from 0 to 9 without leading zeros. The negative sign is defined by the `NumberFormatInfo` object for the current culture.

#### Examples
The following example displays a `BigInteger` value by using the default `ToString` method. It also displays the string representations of the `BigInteger` value that results from using some standard format specifiers. The examples are displayed using the formatting conventions of the en-US culture.

_Code sample not included: ~/snippets/csharp/System.Numerics/BigInteger/ToString/ToString1.cs._

## BigInteger.ToString(IFormatProvider) method

```csharp
public string ToString (IFormatProvider? provider);
```

Converts the numeric value of the current `BigInteger` object to its equivalent string representation by using the specified culture-specific formatting information.

Parameters:

- `provider`: An object that supplies culture-specific formatting information.

Returns: The string representation of the current `BigInteger` value in the format specified by the `provider` parameter.

#### Remarks
The `ToString` method formats a `BigInteger` value in the "R", or round-trip, format by using the `NumberFormatInfo` object of a specified culture. If you want to specify a different format or the current culture, use the other overloads of the `BigInteger.ToString` method, as follows:

|To use format|For culture|Use the overload|
|-------------------|-----------------|----------------------|
|Round-trip ("R") format|Default (current) culture|`ToString`|
|A specific format|Default (current) culture|`ToString`|
|A specific format|A specific culture|`ToString`|

The `provider` parameter is an `IFormatProvider` implementation. Its `IFormatProvider.GetFormat` method returns a `NumberFormatInfo` object that provides culture-specific information about the format of the string returned by this method. If `provider` is `null`, the `BigInteger` value is formatted using the `NumberFormatInfo` object of the current culture. The only property of the `NumberFormatInfo` object that controls the string representation of the `BigInteger` value using the general format specifier is `NumberFormatInfo.NegativeSign`, which defines the character that represents the negative sign.

The `provider` parameter can be one of the following:

- A `CultureInfo` object that represents the culture that supplies formatting information.

- The `NumberFormatInfo` object that supplies formatting information.

- A custom object that implements `IFormatProvider`. Its `IFormatProvider.GetFormat` method returns the `NumberFormatInfo` object that supplies formatting information.

#### Examples
The following example instantiates a custom `NumberFormatInfo` object that defines the tilde (~) as a negative sign. The `ToString` method then uses the custom `NumberFormatInfo` object to display a negative `BigInteger` value.

_Code sample not included: ~/snippets/csharp/System.Numerics/BigInteger/ToString/System.Numeric.BigInteger.ToString.cs._

## BigInteger.ToString(String) method

```csharp
public string ToString (string? format);
```

Converts the numeric value of the current `BigInteger` object to its equivalent string representation by using the specified format.

Parameters:

- `format`: A standard or custom numeric format string.

Returns: The string representation of the current `BigInteger` value in the format specified by the `format` parameter.

Exceptions:

- `FormatException`: `format` is not a valid format string.

#### Remarks
The `ToString` method formats a `BigInteger` value in a specified format by using a `NumberFormatInfo` object that represents the conventions of the current culture. If you want to use the "R", or round-trip, format or specify a different culture, use the other overloads of the `BigInteger.ToString` method, as follows:

|To use format|For culture|Use the overload|
|-------------------|-----------------|----------------------|
|Round-trip ("R") format|Default (current) culture|`ToString`|
|Round-trip ("R") format|A specific culture|`ToString`|
|A specific format|A specific culture|`ToString`|

The `format` parameter can be any valid standard numeric string, or any combination of custom numeric format strings. If `format` is equal to `Empty` or is `null`, the return value of the current `BigInteger` object is formatted with the round-trip format specifier ("R"). If `format` is any other value, the method throws a `FormatException`.

.NET provides extensive formatting support, which is described in greater detail in the following formatting topics:

- For more information about numeric format specifiers, see Standard Numeric Format Strings and Custom Numeric Format Strings.

- For more information about support for formatting in .NET, see Formatting Types.

The format of the returned string is determined by the `NumberFormatInfo` object for the current culture. Depending on the `format` parameter, this object controls symbols such as the negative sign, the group separator, and the decimal point symbol in the output string. To provide formatting information for cultures other than the current culture, call the `ToString` overload.

#### Examples
The following example initializes a `BigInteger` value and displays it by using each standard format string and some custom format strings.

_Code sample not included: ~/snippets/csharp/System.Numerics/BigInteger/ToString/ToString1.cs._

## BigInteger.ToString(String, IFormatProvider) method

```csharp
public string ToString (string? format, IFormatProvider? provider);
```

Converts the numeric value of the current `BigInteger` object to its equivalent string representation by using the specified format and culture-specific format information.

Parameters:

- `format`: A standard or custom numeric format string.
- `provider`: An object that supplies culture-specific formatting information.

Returns: The string representation of the current `BigInteger` value as specified by the `format` and `provider` parameters.

Exceptions:

- `FormatException`: `format` is not a valid format string.

#### Remarks
The `ToString` method formats a `BigInteger` value in a specified format by using the `NumberFormatInfo` object of a specified culture. If you want to use the round-trip format or default culture settings, use the other overloads of the `BigInteger.ToString` method, as follows:

|To use format|For culture|Use the overload|
|-------------------|-----------------|----------------------|
|Round-trip ("R") format|Default (current) culture|`ToString`|
|Round-trip ("R") format|A specific culture|`ToString`|
|A specific format|Default (current) culture|`ToString`|

The `format` parameter can be any valid  standard numeric string, or any combination of custom numeric format strings. If `format` is equal to `Empty` or is `null`, the return value of the current `BigInteger` object is formatted with the round-trip format specifier ("R"). If `format` is any other value, the method throws a `FormatException`.

.NET provides extensive formatting support, which is described in greater detail in the following formatting topics:

- For more information about numeric format specifiers, see Standard Numeric Format Strings and Custom Numeric Format Strings.

- For more information about support for formatting in .NET, see Formatting Types.

The `provider` parameter is an `IFormatProvider` implementation. Its `IFormatProvider.GetFormat` method returns a `NumberFormatInfo` object that provides culture-specific information about the format of the string returned by this method. When the `ToString` method is invoked, it calls the `provider` parameter's `IFormatProvider.GetFormat` method and passes it a `Type` object that represents the `NumberFormatInfo` type. The `IFormatProvider.GetFormat` method then returns the `NumberFormatInfo` object that provides information for formatting the `value` parameter, such as the negative sign symbol, the group separator symbol, or the decimal point symbol. There are three ways to use the `provider` parameter to supply formatting information to the `ToString` method:

- You can pass a `CultureInfo` object that represents the culture that supplies formatting information. Its `CultureInfo.GetFormat` method returns the `NumberFormatInfo` object that provides numeric formatting information for that culture.

- You can pass the actual `NumberFormatInfo` object that provides numeric formatting information. (Its implementation of `NumberFormatInfo.GetFormat` just returns itself.)

- You can pass a custom object that implements `IFormatProvider`. Its `IFormatProvider.GetFormat` method instantiates and returns the `NumberFormatInfo` object that provides formatting information.

If `provider` is `null`, the formatting of the returned string is based on the `NumberFormatInfo` object of the current culture.

#### Examples
The following example initializes a `BigInteger` value, and displays it to the console using a standard format string and a `NumberFormatInfo` object that defines the tilde (~) as a negative sign.

_Code sample not included: ~/snippets/csharp/System.Numerics/BigInteger/ToString/ToString1.cs._

## BigInteger.TrailingZeroCount(BigInteger) method

```csharp
public static System.Numerics.BigInteger TrailingZeroCount (System.Numerics.BigInteger value);
```

Computes the number of trailing zeros in a value.

Parameters:

- `value`: The value whose trailing zeroes are to be counted.

Returns: The number of trailing zeros in `value`.

To be added.

## BigInteger.TryFormat(Byte>, Int32, Char>, IFormatProvider) method

```csharp
public bool TryFormat (Span<byte> utf8Destination, out int bytesWritten, ReadOnlySpan<char> format = default, IFormatProvider? provider = default);
```

To be added.

Parameters:

- `utf8Destination`: To be added.
- `bytesWritten`: To be added.
- `format`: To be added.
- `provider`: To be added.

Returns: To be added.

To be added.
