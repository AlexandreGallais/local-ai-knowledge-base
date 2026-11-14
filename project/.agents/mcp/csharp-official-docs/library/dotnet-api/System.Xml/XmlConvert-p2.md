---
title: "XmlConvert class (part 2 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml/XmlConvert.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XmlConvert class (part 2 of 3)

## XmlConvert.ToDateTimeOffset(String) method

```csharp
public static DateTimeOffset ToDateTimeOffset (string s);
```

Converts the supplied `String` to a `DateTimeOffset` equivalent.

Parameters:

- `s`: The string to convert. The string must conform to a subset of the W3C Recommendation for the XML dateTime type. For more information, see the dateTime section of the XML Schema specification.

Returns: The `DateTimeOffset` equivalent of the supplied string.

Exceptions:

- `ArgumentNullException`: `s` is `null`.
- `ArgumentOutOfRangeException`: The argument passed to this method is outside the range of allowable values. For information about allowable values, see `DateTimeOffset`.
- `FormatException`: The argument passed to this method does not conform to a subset of the W3C Recommendations for the XML dateTime type. For more information, see the dateTime section of the XML Schema specification.

#### Remarks
When more than seven digits are specified for fractional seconds, the value is rounded. For example, 00000004 becomes 0000000 and 00000005 becomes 0000001.

#### Examples
The following example demonstrates how to read a string from an XML file and use the `XmlConvert.ToDateTimeOffset` method to convert the string to a `DateTimeOffset` type.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlConvert/ToDateTimeOffset/XmlConvert_ToDateTimeOffset_ex1.cs._

The example uses the transactions.xml file.

```xml
<?xml version="1.0"?>
<transactions>
   <transaction>
      <id>123456789</id>
      <amount>1.00</amount>
      <currency>USD</currency>
      <time>2007-08-03T22:05:13-07:00</time>
   </transaction>
</transactions>
```

## XmlConvert.ToDateTimeOffset(String, String) method

```csharp
public static DateTimeOffset ToDateTimeOffset (string s, string format);
```

Converts the supplied `String` to a `DateTimeOffset` equivalent.

Parameters:

- `s`: The string to convert.
- `format`: A .NET standard or custom date and time format string that specifies the required format of `s`.

Returns: The `DateTimeOffset` equivalent of the supplied string.

Exceptions:

- `ArgumentNullException`: `s` is `null`.
- `FormatException`: `format` is invalid, or `s` doesn't exactly match `format` under the invariant culture rules, except for leading or trailing white space.

#### Remarks
This overload is equivalent to calling `ParseExact` with `InvariantInfo` and the `AllowLeadingWhite` and `AllowTrailingWhite` flags. Leading and trailing whitespace is ignored, but `s` must otherwise exactly match `format`. The `format` parameter uses .NET standard date and time format strings or custom date and time format strings, not XML Schema dateTime patterns.

In a custom format string, the `z`, `zz`, and `zzz` specifiers require a signed numeric UTC offset. They don't match the XML UTC designator `Z`. Use the `K` custom format specifier when `s` can contain `Z`.

If the offset specified within the input string will cause an overflow in the deserialized representation of the DateTimeOffset, a FormatException is thrown.

When more than seven digits are specified for fractional seconds, the value is rounded. For example, 00000004 becomes 0000000 and 00000005 becomes 0000001.

#### Examples
The following example demonstrates how to read a string from an XML file and use the `XmlConvert.ToDateTimeOffset` method to convert the string to a `DateTimeOffset` type. The input string is validated against the specified format before being converted.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlConvert/ToDateTimeOffset/XmlConvert_ToDateTimeOffset_ex2.cs._

The example uses the transactions.xml file.

```xml
<?xml version="1.0"?>
<transactions>
   <transaction>
      <id>123456789</id>
      <amount>1.00</amount>
      <currency>USD</currency>
      <time>2007-08-03T22:05:13-07:00</time>
   </transaction>
</transactions>
```

## XmlConvert.ToDateTimeOffset(String, String[]) method

```csharp
public static DateTimeOffset ToDateTimeOffset (string s, string[] formats);
```

Converts the supplied `String` to a `DateTimeOffset` equivalent.

Parameters:

- `s`: The string to convert.
- `formats`: An array of .NET standard or custom date and time format strings that specify the permitted formats of `s`.

Returns: The `DateTimeOffset` equivalent of the supplied string.

Exceptions:

- `FormatException`: An element of `formats` is invalid, or `s` doesn't exactly match any element of `formats` under the invariant culture rules, except for leading or trailing white space.

#### Remarks
This overload is equivalent to calling `ParseExact` with `InvariantInfo` and the `AllowLeadingWhite` and `AllowTrailingWhite` flags. Leading and trailing white space is ignored, but `s` must otherwise exactly match one of the strings in `formats`. The `formats` parameter uses .NET standard date and time format strings or custom date and time format strings, not XML Schema dateTime patterns.

In a custom format string, the `z`, `zz`, and `zzz` specifiers require a signed numeric UTC offset. They don't match the XML UTC designator `Z`. Use the `K` custom format specifier when `s` can contain `Z`.

If the offset specified within the input string will cause an overflow in the deserialized representation of the DateTimeOffset, a FormatException is thrown.

When more than seven digits are specified for fractional seconds, the value is rounded. For example, 00000004 becomes 0000000 and 00000005 becomes 0000001.

#### Examples
The following example demonstrates how to read a string from an XML file and use the `XmlConvert.ToDateTimeOffset` method to convert the string to a `DateTimeOffset` type. The input string must validate against one of the specified formats before being converted.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlConvert/ToDateTimeOffset/XmlConvert_ToDateTimeOffset_ex3.cs._

The example uses the transactions.xml file.

```xml
<?xml version="1.0"?>
<transactions>
   <transaction>
      <id>123456789</id>
      <amount>1.00</amount>
      <currency>USD</currency>
      <time>2007-08-03T22:05:13-07:00</time>
   </transaction>
</transactions>
```

## XmlConvert.ToDecimal(String) method

```csharp
public static decimal ToDecimal (string s);
```

Converts the `String` to a `Decimal` equivalent.

Parameters:

- `s`: The string to convert.

Returns: A `Decimal` equivalent of the string.

Exceptions:

- `ArgumentNullException`: `s` is `null`.
- `FormatException`: `s` is not in the correct format.
- `OverflowException`: `s` represents a number less than <see cref="F:System.Decimal.MinValue">Decimal.MinValue</see> or greater than <see cref="F:System.Decimal.MaxValue">Decimal.MaxValue</see>.

To be added.

## XmlConvert.ToDouble(String) method

```csharp
public static double ToDouble (string s);
```

Converts the `String` to a `Double` equivalent.

Parameters:

- `s`: The string to convert.

Returns: A `Double` equivalent of the string.

Exceptions:

- `ArgumentNullException`: `s` is `null`.
- `FormatException`: `s` is not in the correct format.
- `OverflowException`: `s` represents a number less than <see cref="F:System.Double.MinValue">Double.MinValue</see> or greater than <see cref="F:System.Double.MaxValue">Double.MaxValue</see>.

#### Remarks
If `s` is INF or -INF, this method returns Double.PositiveInfinity or Double.NegativeInfinity respectively.

#### Examples
The following example uses `ToDouble` and `XmlConvert.ToDateTime` to read strongly typed data.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlConvert/ToDateTime/readdata.cs._

The example uses the file, `orderData.xml`, as input.

_Code sample not included: ~/snippets/xml/VS_Snippets_Data/XmlConvert.ToDouble/XML/orderdata.xml._
## XmlConvert.ToGuid(String) method

```csharp
public static Guid ToGuid (string s);
```

Converts the `String` to a `Guid` equivalent.

Parameters:

- `s`: The string to convert.

Returns: A `Guid` equivalent of the string.

To be added.

## XmlConvert.ToInt16(String) method

```csharp
public static short ToInt16 (string s);
```

Converts the `String` to a `Int16` equivalent.

Parameters:

- `s`: The string to convert.

Returns: An `Int16` equivalent of the string.

Exceptions:

- `ArgumentNullException`: `s` is `null`.
- `FormatException`: `s` is not in the correct format.
- `OverflowException`: `s` represents a number less than <see cref="F:System.Int16.MinValue">Int16.MinValue</see> or greater than <see cref="F:System.Int16.MaxValue">Int16.MaxValue</see>.

To be added.

## XmlConvert.ToInt32(String) method

```csharp
public static int ToInt32 (string s);
```

Converts the `String` to a `Int32` equivalent.

Parameters:

- `s`: The string to convert.

Returns: An `Int32` equivalent of the string.

Exceptions:

- `ArgumentNullException`: `s` is `null`.
- `FormatException`: `s` is not in the correct format.
- `OverflowException`: `s` represents a number less than <see cref="F:System.Int32.MinValue">Int32.MinValue</see> or greater than <see cref="F:System.Int32.MaxValue">Int32.MaxValue</see>.

To be added.

## XmlConvert.ToInt64(String) method

```csharp
public static long ToInt64 (string s);
```

Converts the `String` to a `Int64` equivalent.

Parameters:

- `s`: The string to convert.

Returns: An `Int64` equivalent of the string.

Exceptions:

- `ArgumentNullException`: `s` is `null`.
- `FormatException`: `s` is not in the correct format.
- `OverflowException`: `s` represents a number less than <see cref="F:System.Int64.MinValue">Int64.MinValue</see> or greater than <see cref="F:System.Int64.MaxValue">Int64.MaxValue</see>.

To be added.

## XmlConvert.ToSByte(String) method

```csharp
public static sbyte ToSByte (string s);
```

Converts the `String` to a `SByte` equivalent.

Parameters:

- `s`: The string to convert.

Returns: An `SByte` equivalent of the string.

Exceptions:

- `ArgumentNullException`: `s` is `null`.
- `FormatException`: `s` is not in the correct format.
- `OverflowException`: `s` represents a number less than <see cref="F:System.SByte.MinValue">SByte.MinValue</see> or greater than <see cref="F:System.SByte.MaxValue">SByte.MaxValue</see>.

To be added.

## XmlConvert.ToSingle(String) method

```csharp
public static float ToSingle (string s);
```

Converts the `String` to a `Single` equivalent.

Parameters:

- `s`: The string to convert.

Returns: A `Single` equivalent of the string.

Exceptions:

- `ArgumentNullException`: `s` is `null`.
- `FormatException`: `s` is not in the correct format.
- `OverflowException`: `s` represents a number less than <see cref="F:System.Single.MinValue">Single.MinValue</see> or greater than <see cref="F:System.Single.MaxValue">Single.MaxValue</see>.

#### Remarks
If `s` is INF or -INF, this method returns Single.PositiveInfinity or Single.NegativeInfinity respectively.

## XmlConvert.ToString(Boolean) method

```csharp
public static string ToString (bool value);
```

Converts the `Boolean` to a `String`.

Parameters:

- `value`: The value to convert.

Returns: A string representation of the `Boolean`, that is, "true" or "false".

To be added.

## XmlConvert.ToString(Byte) method

```csharp
public static string ToString (byte value);
```

Converts the `Byte` to a `String`.

Parameters:

- `value`: The value to convert.

Returns: A string representation of the `Byte`.

To be added.

## XmlConvert.ToString(Char) method

```csharp
public static string ToString (char value);
```

Converts the `Char` to a `String`.

Parameters:

- `value`: The value to convert.

Returns: A string representation of the `Char`.

To be added.

## XmlConvert.ToString(DateTime) method

```csharp
public static string ToString (DateTime value);
```

Converts the `DateTime` to a `String`.

Parameters:

- `value`: The value to convert.

Returns: A string representation of the `DateTime` in the format yyyy-MM-ddTHH:mm:ss where 'T' is a constant literal.

To be added.

## XmlConvert.ToString(DateTimeOffset) method

```csharp
public static string ToString (DateTimeOffset value);
```

Converts the supplied `DateTimeOffset` to a `String`.

Parameters:

- `value`: The `DateTimeOffset` to be converted.

Returns: A `String` representation of the supplied `DateTimeOffset`.

#### Examples
The following example converts a `DateTimeOffset` representation of the current time to a `String`.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlConvert/ToString/XmlConvert_ToString_DTO.cs._

## XmlConvert.ToString(Decimal) method

```csharp
public static string ToString (decimal value);
```

Converts the `Decimal` to a `String`.

Parameters:

- `value`: The value to convert.

Returns: A string representation of the `Decimal`.

To be added.

## XmlConvert.ToString(Double) method

```csharp
public static string ToString (double value);
```

Converts the `Double` to a `String`.

Parameters:

- `value`: The value to convert.

Returns: A string representation of the `Double`.

#### Remarks
If `value` is Double.PositiveInfinity or Double.NegativeInfinity, this method returns the string INF or -INF respectively.

#### Examples
The following example, converts data types to string and then writes the information out to the console.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlConvert/ToString/source.cs._

## XmlConvert.ToString(Guid) method

```csharp
public static string ToString (Guid value);
```

Converts the `Guid` to a `String`.

Parameters:

- `value`: The value to convert.

Returns: A string representation of the `Guid`.

To be added.

## XmlConvert.ToString(Int16) method

```csharp
public static string ToString (short value);
```

Converts the `Int16` to a `String`.

Parameters:

- `value`: The value to convert.

Returns: A string representation of the `Int16`.

#### Examples
The following example, converts data types to string and then writes the information out to the console.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlConvert/ToString/source.cs._

## XmlConvert.ToString(Int32) method

```csharp
public static string ToString (int value);
```

Converts the `Int32` to a `String`.

Parameters:

- `value`: The value to convert.

Returns: A string representation of the `Int32`.

To be added.

## XmlConvert.ToString(Int64) method

```csharp
public static string ToString (long value);
```

Converts the `Int64` to a `String`.

Parameters:

- `value`: The value to convert.

Returns: A string representation of the `Int64`.

To be added.

## XmlConvert.ToString(SByte) method

```csharp
public static string ToString (sbyte value);
```

Converts the `SByte` to a `String`.

Parameters:

- `value`: The value to convert.

Returns: A string representation of the `SByte`.

To be added.
