---
title: "Decimal struct (part 10 of 12)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Decimal.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Decimal struct (part 10 of 12)

## Decimal.ToByte(Decimal) method

```csharp
public static byte ToByte (decimal value);
```

Converts the value of the specified `Decimal` to the equivalent 8-bit unsigned integer.

Parameters:

- `value`: The decimal number to convert.

Returns: An 8-bit unsigned integer equivalent to `value`.

Exceptions:

- `OverflowException`: `value` is less than <see cref="F:System.Byte.MinValue">Byte.MinValue</see> or greater than <see cref="F:System.Byte.MaxValue">Byte.MaxValue</see>.

#### Remarks
Parameter `value` is rounded to the nearest integer value toward zero, and that result is returned.

You can also convert a `Decimal` value to an 8-bit unsigned integer by using the `Decimal.op_Explicit` assignment operator. Because the operator performs a narrowing conversion, you must use a casting operator in C# or a conversion function in Visual Basic.

#### Examples
The following example uses the `Decimal.ToByte` method to convert decimal numbers to `Byte` values.

_Code sample not included: ~/snippets/csharp/System/Decimal/ToByte/tobyte_1.cs._

## Decimal.ToDouble(Decimal) method

```csharp
public static double ToDouble (decimal d);
```

Converts the value of the specified `Decimal` to the equivalent double-precision floating-point number.

Parameters:

- `d`: The decimal number to convert.

Returns: A double-precision floating-point number equivalent to `d`.

#### Remarks
This operation can produce round-off errors because a double-precision floating-point number has fewer significant digits than a `Decimal`.

You can also convert a `Decimal` to a `Double` value by using the `Decimal.op_Explicit` assignment operator. Because the conversion can entail a loss of precision, you must use a casting operator in C# or a conversion function in Visual Basic.

#### Examples
The following code example converts `Decimal` numbers to `Double` values using `ToDouble` method.

_Code sample not included: ~/snippets/csharp/System/Decimal/ToDouble/tosgl_dbl.cs._

## Decimal.ToInt16(Decimal) method

```csharp
public static short ToInt16 (decimal value);
```

Converts the value of the specified `Decimal` to the equivalent 16-bit signed integer.

Parameters:

- `value`: The decimal number to convert.

Returns: A 16-bit signed integer equivalent to `value`.

Exceptions:

- `OverflowException`: `value` is less than <see cref="F:System.Int16.MinValue">Int16.MinValue</see> or greater than <see cref="F:System.Int16.MaxValue">Int16.MaxValue</see>.

#### Remarks
You can also convert a `Decimal` value to a 16-bit integer by using the `Decimal.op_Explicit` assignment operator. Because the operator performs a narrowing conversion, you must use a casting operator in C# or a conversion function in Visual Basic.

#### Examples
The following example uses the `Decimal.ToInt16` method to convert decimal numbers to `Int16` values.

_Code sample not included: ~/snippets/csharp/System/Decimal/ToInt16/toint16_1.cs._

## Decimal.ToInt32(Decimal) method

```csharp
public static int ToInt32 (decimal d);
```

Converts the value of the specified `Decimal` to the equivalent 32-bit signed integer.

Parameters:

- `d`: The decimal number to convert.

Returns: A 32-bit signed integer equivalent to the value of `d`.

Exceptions:

- `OverflowException`: `d` is less than <see cref="F:System.Int32.MinValue">Int32.MinValue</see> or greater than <see cref="F:System.Int32.MaxValue">Int32.MaxValue</see>.

#### Remarks
The return value is the integral part of the decimal value; fractional digits are truncated.

You can also convert a `Decimal` value to a 32-bit integer by using the `Decimal.op_Explicit` assignment operator. Because the operator performs a narrowing conversion, you must use a casting operator in C# or a conversion function in Visual Basic.

#### Examples
The following example uses the `Decimal.ToInt32` method to convert decimal numbers to `Int32` values.

_Code sample not included: ~/snippets/csharp/System/Decimal/ToInt32/toint32_1.cs._

## Decimal.ToInt64(Decimal) method

```csharp
public static long ToInt64 (decimal d);
```

Converts the value of the specified `Decimal` to the equivalent 64-bit signed integer.

Parameters:

- `d`: The decimal number to convert.

Returns: A 64-bit signed integer equivalent to the value of `d`.

Exceptions:

- `OverflowException`: `d` is less than <see cref="F:System.Int64.MinValue">Int64.MinValue</see> or greater than <see cref="F:System.Int64.MaxValue">Int64.MaxValue</see>.

#### Remarks
The return value is the integral part of the decimal value; fractional digits are truncated.

You can also convert a `Decimal` value to a 64-bit integer by using the `Decimal.op_Explicit` assignment operator. Because the operator performs a narrowing conversion, you must use a casting operator in C# or a conversion function in Visual Basic.

#### Examples
The following example uses the `Decimal.ToInt64` method to convert decimal numbers to `Int64` values.

_Code sample not included: ~/snippets/csharp/System/Decimal/ToInt64/toint64_1.cs._

## Decimal.ToOACurrency(Decimal) method

```csharp
public static long ToOACurrency (decimal value);
```

Converts the specified `Decimal` value to the equivalent OLE Automation Currency value, which is contained in a 64-bit signed integer.

Parameters:

- `value`: The decimal number to convert.

Returns: A 64-bit signed integer that contains the OLE Automation equivalent of `value`.

#### Examples
The following code example uses the `ToOACurrency` method to convert `Decimal` numbers to the equivalent OLE Automation Currency values that are contained in `Int64` fields.

_Code sample not included: ~/snippets/csharp/System/Decimal/FromOACurrency/tooacurrency.cs._

## Decimal.ToSByte(Decimal) method

```csharp
public static sbyte ToSByte (decimal value);
```

Converts the value of the specified `Decimal` to the equivalent 8-bit signed integer.

Parameters:

- `value`: The decimal number to convert.

Returns: An 8-bit signed integer equivalent to `value`.

Exceptions:

- `OverflowException`: `value` is less than <see cref="F:System.SByte.MinValue">SByte.MinValue</see> or greater than <see cref="F:System.SByte.MaxValue">SByte.MaxValue</see>.

#### Remarks
You can also convert a `Decimal` value to an 8-bit signed integer by using the `Decimal.op_Explicit` assignment operator. Because the operator performs a narrowing conversion, you must use a casting operator in C# or a conversion function in Visual Basic.

#### Examples
The following example uses the `Decimal.ToSByte` method to convert decimal numbers to `SByte` values.

_Code sample not included: ~/snippets/csharp/System/Decimal/ToSByte/tosbyte1.cs._

## Decimal.ToSingle(Decimal) method

```csharp
public static float ToSingle (decimal d);
```

Converts the value of the specified `Decimal` to the equivalent single-precision floating-point number.

Parameters:

- `d`: The decimal number to convert.

Returns: A single-precision floating-point number equivalent to the value of `d`.

#### Remarks
This operation can produce round-off errors because a single-precision floating-point number has fewer significant digits than a `Decimal`.

You can also convert a `Decimal` to a `Single` value by using the `Decimal.op_Explicit` assignment operator. Because the conversion can entail a loss of precision, you must use a casting operator in C# or a conversion function in Visual Basic.

#### Examples
The following code example converts `Decimal` numbers to `Single` values using the `ToSingle` method.

_Code sample not included: ~/snippets/csharp/System/Decimal/ToDouble/tosgl_dbl.cs._

## Decimal.ToString() method

```csharp
public override string ToString ();
```

Converts the numeric value of this instance to its equivalent string representation.

Returns: A string that represents the value of this instance.

#### Remarks
The `ToString` method formats a `Decimal` value in the default ("G", or general) format of the current culture. If you want to specify a different format or culture, use the other overloads of the `Decimal.ToString` method, as follows:

|To use format|For culture|Use the overload|
|-------------------|-----------------|----------------------|
|Default ("G") format|A specific culture|`ToString`|
|A specific format|Default (current) culture|`ToString`|
|A specific format|A specific culture|`ToString`|

.NET provides extensive formatting support, which is described in greater detail in the following formatting topics:

- For more information about numeric format specifiers, see Standard Numeric Format Strings and Custom Numeric Format Strings.

- For more information about formatting, see Formatting Types.

#### Examples
The following example displays a `Decimal` value using the default `ToString` method. It also displays the string representations of the `Decimal` value that result from using a number of standard format specifiers.

_Code sample not included: ~/snippets/csharp/System/Decimal/ToString/ToString2.cs._

The following example displays the amount of money in an account.

_Code sample not included: ~/snippets/csharp/System/Decimal/Overview/source.cs._

## Decimal.ToString(IFormatProvider) method

```csharp
public string ToString (IFormatProvider? provider);
```

Converts the numeric value of this instance to its equivalent string representation using the specified culture-specific format information.

Parameters:

- `provider`: An object that supplies culture-specific formatting information.

Returns: The string representation of the value of this instance as specified by `provider`.

#### Remarks
The `ToString` method formats a `Decimal` value in the default ("G", or general) format of a specified culture. If you want to specify a different format or the current culture, use the other overloads of the `Decimal.ToString` method, as follows:

|To use format|For culture|Use the overload|
|-------------------|-----------------|----------------------|
|Default ("G") format|Default (current) culture|`ToString`|
|A specific format|Default (current) culture|`ToString`|
|A specific format|A specific culture|`ToString`|

.NET provides extensive formatting support, which is described in greater detail in the following formatting topics:

- For more information about numeric format specifiers, see Standard Numeric Format Strings and Custom Numeric Format Strings.

- For more information about formatting, see Formatting Types.

The `provider` parameter is an `IFormatProvider` implementation whose `IFormatProvider.GetFormat` method returns a `NumberFormatInfo` object. Typically, `provider` is a `NumberFormatInfo` object or a `CultureInfo` object. The `provider` parameter supplies culture-specific information used in formatting. If `provider` is `null`, the thread current culture is used.

To convert a `Decimal` value to its string representation using a specified culture and a specific format string, call the `ToString` method.

#### Examples
The following example displays the string representation of a `Decimal` value using `CultureInfo` objects that represent several different cultures.

_Code sample not included: ~/snippets/csharp/System/Decimal/ToString/ToString2.cs._

## Decimal.ToString(String) method

```csharp
public string ToString (string? format);
```

Converts the numeric value of this instance to its equivalent string representation, using the specified format.

Parameters:

- `format`: A standard or custom numeric format string.

Returns: The string representation of the value of this instance as specified by `format`.

Exceptions:

- `FormatException`: `format` is invalid.

#### Remarks
The `ToString` method formats a `Decimal` value in a specified format by using the conventions of the current culture. If you want to use the default ("G", or general) format or specify a different culture, use the other overloads of the `Decimal.ToString` method, as follows:

|To use format|For culture|Use the overload|
|-------------------|-----------------|----------------------|
|Default ("G") format|Default (current) culture|`ToString`|
|Default ("G") format|A specific culture|`ToString`|
|A specific format|A specific culture|`ToString`|

The `Decimal.ToString` method uses the standard or custom numeric format string specified by the `format` parameter to convert the value of the current instance into its string representation. The `format` parameter can be any valid standard numeric format specifier except for D, R, and X, as well as any combination of custom numeric format specifiers. If `format` is `null` or an empty string, the return value of this instance is formatted with the general numeric format specifier (G).

.NET provides extensive formatting support, which is described in greater detail in the following formatting topics:

- For more information about numeric format specifiers, see Standard Numeric Format Strings and Custom Numeric Format Strings.

- For more information about formatting, see Formatting Types.

The return value is formatted by using the `NumberFormatInfo` object for the current culture. To apply the formatting conventions of a specified culture, call the `ToString` method.

#### Examples
The following example displays a `Decimal` value using each of the supported standard numeric format specifiers, together with two custom numeric format strings. In converting the numeric values to strings, the example uses the formatting conventions of the en-US culture.

_Code sample not included: ~/snippets/csharp/System/Decimal/ToString/ToString2.cs._
