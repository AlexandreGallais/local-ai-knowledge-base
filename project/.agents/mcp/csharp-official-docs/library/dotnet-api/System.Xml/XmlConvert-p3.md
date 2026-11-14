---
title: "XmlConvert class (part 3 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml/XmlConvert.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XmlConvert class (part 3 of 3)

## XmlConvert.ToString(Single) method

```csharp
public static string ToString (float value);
```

Converts the `Single` to a `String`.

Parameters:

- `value`: The value to convert.

Returns: A string representation of the `Single`.

#### Remarks
If `value` is Single.PositiveInfinity or Single.NegativeInfinity, this method returns the string INF or -INF respectively.

## XmlConvert.ToString(TimeSpan) method

```csharp
public static string ToString (TimeSpan value);
```

Converts the `TimeSpan` to a `String`.

Parameters:

- `value`: The value to convert.

Returns: A string representation of the `TimeSpan`.

To be added.

## XmlConvert.ToString(UInt16) method

```csharp
public static string ToString (ushort value);
```

Converts the `UInt16` to a `String`.

Parameters:

- `value`: The value to convert.

Returns: A string representation of the `UInt16`.

To be added.

## XmlConvert.ToString(UInt32) method

```csharp
public static string ToString (uint value);
```

Converts the `UInt32` to a `String`.

Parameters:

- `value`: The value to convert.

Returns: A string representation of the `UInt32`.

To be added.

## XmlConvert.ToString(UInt64) method

```csharp
public static string ToString (ulong value);
```

Converts the `UInt64` to a `String`.

Parameters:

- `value`: The value to convert.

Returns: A string representation of the `UInt64`.

To be added.

## XmlConvert.ToString(DateTime, String) method

```csharp
public static string ToString (DateTime value, string format);
```

Converts the `DateTime` to a `String`.

Parameters:

- `value`: The value to convert.
- `format`: The format structure that defines how to display the converted string. Valid formats include "yyyy-MM-ddTHH:mm:sszzzzzz" and its subsets.

Returns: A string representation of the `DateTime` in the specified format.

#### Examples
The following example, converts data types to string and then writes the information out to the console.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlConvert/ToString/source.cs._

## XmlConvert.ToString(DateTime, XmlDateTimeSerializationMode) method

```csharp
public static string ToString (DateTime value, System.Xml.XmlDateTimeSerializationMode dateTimeOption);
```

Converts the `DateTime` to a `String` using the `XmlDateTimeSerializationMode` specified.

Parameters:

- `value`: The `DateTime` value to convert.
- `dateTimeOption`: One of the `XmlDateTimeSerializationMode` values that specify how to treat the `DateTime` value.

Returns: A `String` equivalent of the `DateTime`.

Exceptions:

- `ArgumentException`: The `dateTimeOption` value is not valid.
- `ArgumentNullException`: The `value` or `dateTimeOption` value is `null`.

To be added.

## XmlConvert.ToString(DateTimeOffset, String) method

```csharp
public static string ToString (DateTimeOffset value, string format);
```

Converts the supplied `DateTimeOffset` to a `String` in the specified format.

Parameters:

- `value`: The `DateTimeOffset` to be converted.
- `format`: The format to which `value` is converted. The format parameter can be any subset of the W3C Recommendation for the XML dateTime type. (For more information, see the dateTime section of the XML Schema specification..)

Returns: A `String` representation in the specified format of the supplied `DateTimeOffset`.

#### Examples
The following example converts a `DateTimeOffset` representation of the current time to a `String` in the specified format.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlConvert/ToString/XmlConvert_ToString_DTO_Format.cs._

## XmlConvert.ToTimeSpan(String) method

```csharp
public static TimeSpan ToTimeSpan (string s);
```

Converts the `String` to a `TimeSpan` equivalent.

Parameters:

- `s`: The string to convert. The string format must conform to the W3C XML Schema Part 2: Datatypes recommendation for duration.

Returns: A `TimeSpan` equivalent of the string.

Exceptions:

- `FormatException`: `s` is not in correct format to represent a `TimeSpan` value.

To be added.

## XmlConvert.ToUInt16(String) method

```csharp
public static ushort ToUInt16 (string s);
```

Converts the `String` to a `UInt16` equivalent.

Parameters:

- `s`: The string to convert.

Returns: A `UInt16` equivalent of the string.

Exceptions:

- `ArgumentNullException`: `s` is `null`.
- `FormatException`: `s` is not in the correct format.
- `OverflowException`: `s` represents a number less than <see cref="F:System.UInt16.MinValue">UInt16.MinValue</see> or greater than <see cref="F:System.UInt16.MaxValue">UInt16.MaxValue</see>.

To be added.

## XmlConvert.ToUInt32(String) method

```csharp
public static uint ToUInt32 (string s);
```

Converts the `String` to a `UInt32` equivalent.

Parameters:

- `s`: The string to convert.

Returns: A `UInt32` equivalent of the string.

Exceptions:

- `ArgumentNullException`: `s` is `null`.
- `FormatException`: `s` is not in the correct format.
- `OverflowException`: `s` represents a number less than <see cref="F:System.UInt32.MinValue">UInt32.MinValue</see> or greater than <see cref="F:System.UInt32.MaxValue">UInt32.MaxValue</see>.

To be added.

## XmlConvert.ToUInt64(String) method

```csharp
public static ulong ToUInt64 (string s);
```

Converts the `String` to a `UInt64` equivalent.

Parameters:

- `s`: The string to convert.

Returns: A `UInt64` equivalent of the string.

Exceptions:

- `ArgumentNullException`: `s` is `null`.
- `FormatException`: `s` is not in the correct format.
- `OverflowException`: `s` represents a number less than <see cref="F:System.UInt64.MinValue">UInt64.MinValue</see> or greater than <see cref="F:System.UInt64.MaxValue">UInt64.MaxValue</see>.

To be added.

## XmlConvert.VerifyName(String) method

```csharp
public static string VerifyName (string name);
```

Verifies that the name is a valid name according to the W3C Extended Markup Language recommendation.

Parameters:

- `name`: The name to verify.

Returns: The name, if it is a valid XML name.

Exceptions:

- `XmlException`: `name` is not a valid XML name.
- `ArgumentNullException`: `name` is `null` or String.Empty.

#### Remarks
This method can be used with the `XmlWriter` class in the following manner.

```csharp
try{
  writer.WriteStartElement(XmlConvert.VerifyName("item"),"bar");
}
catch(Exception e)
{
  Console.WriteLine("error");
}
```

#### Examples
The following example uses the `VerifyName` method to write an element name.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlConvert/VerifyName/verifyname.cs._

## XmlConvert.VerifyNCName(String) method

```csharp
public static string VerifyNCName (string name);
```

Verifies that the name is a valid `NCName` according to the W3C Extended Markup Language recommendation. An `NCName` is a name that cannot contain a colon.

Parameters:

- `name`: The name to verify.

Returns: The name, if it is a valid NCName.

Exceptions:

- `ArgumentNullException`: `name` is `null` or `String.Empty`.
- `XmlException`: `name` is not a valid non-colon name.

To be added.

## XmlConvert.VerifyNMTOKEN(String) method

```csharp
public static string VerifyNMTOKEN (string name);
```

Verifies that the string is a valid NMTOKEN <example-value> to the W3C XML Schema Part2: Datatypes recommendation.

Parameters:

- `name`: The string you wish to verify.

Returns: The name token, if it is a valid NMTOKEN.

Exceptions:

- `XmlException`: The string is not a valid name token.
- `ArgumentNullException`: `name` is `null`.

#### Remarks
This method ensures that the name token <example-value> the proper syntax for a valid NMTOKEN. It can be used in the following manner:

```csharp
try {
  writer.WriteStartElement(XmlConvert.VerifyNMTOKEN("<example-value>"),"<example-value>");
}
catch(Exception e) {
  Console.WriteLine("error");
}
```

For more information on the NMTOKEN data type, see the NMTOKEN <example-value> of the XML Schema Part 2: Datatypes Second Edition.

## XmlConvert.VerifyPublicId(String) method

```csharp
public static string VerifyPublicId (string publicId);
```

Returns the passed in string instance if all the characters in the string argument are valid public id characters.

Parameters:

- `publicId`: `String` that contains the id to validate.

Returns: The passed-in string if all the characters in the argument are valid public id characters.

#### Remarks
No other values than the passed in argument should be returned. The characters valid for public id do not vary between XML editions, so no `XmlVersion` overload is required.

See XML 1.0 spec (fourth edition) production [13] `PubidChar` for details on the allowed characters

If the parameter is null, an `ArgumentNullException` will be thrown. If any of the characters are not valid public id characters, an `XmlException` is thrown with information about the first invalid character encountered.

## XmlConvert.VerifyTOKEN(String) method

```csharp
public static string? VerifyTOKEN (string? token);
```

Verifies that the string is a valid token <example-value> to the W3C XML Schema Part2: Datatypes recommendation.

Parameters:

- `token`: The string value you wish to verify.

Returns: The token, if it is a valid token.

Exceptions:

- `XmlException`: The string value is not a valid token.

#### Remarks
This method ensures that the name token <example-value> the proper syntax for a valid token. It can be used in the following manner:

```csharp
try {
  writer.WriteStartElement(XmlConvert.VerifyTOKEN("<example-value>"),"<example-value>");
}
catch(Exception e) {
  Console.WriteLine("error");
}
```

For more information on tokens, see NMTOKEN.

## XmlConvert.VerifyWhitespace(String) method

```csharp
public static string VerifyWhitespace (string content);
```

Returns the passed-in string instance if all the characters in the string argument are valid whitespace characters.

Parameters:

- `content`: `String` to verify.

Returns: The passed-in string instance if all the characters in the string argument are valid whitespace characters, otherwise `null`.

#### Remarks
No other values than the passed in argument should be returned. The characters that are valid for whitespace do not vary between XML editions, so no xml version overload is required.

See XML 1.0 spec (fourth edition) production [3] S for details on the allowed characters.

If the parameter is null, an `ArgumentNullException` will be thrown.

If any of the characters are not valid whitespace characters, an `XmlException` is thrown with information about the first invalid character encountered.

#### Examples
The following example uses the `XmlConvert.VerifyWhitespace` method to detect the presence of an invalid character in a value assigned to the start element.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlConvert/VerifyWhitespace/xmlconvertnewverify.cs._

## XmlConvert.VerifyXmlChars(String) method

```csharp
public static string VerifyXmlChars (string content);
```

Returns the passed-in string if all the characters and surrogate pair characters in the string argument are valid XML characters, otherwise an `XmlException` is thrown with information on the first invalid character encountered.

Parameters:

- `content`: `String` that contains characters to verify.

Returns: The passed-in string if all the characters and surrogate-pair characters in the string argument are valid XML characters, otherwise an `XmlException` is thrown with information on the first invalid character encountered.

#### Remarks
No other values than the passed in argument should be returned. See XML 1.0 spec (fourth edition) production [2] `Char` for details on the allowed characters.

If the parameter is null, an `ArgumentNullException` will be thrown. If any of the characters are not valid xml characters, an `XmlException` is thrown with information on the first invalid character encountered.

#### Examples
The following example uses the `XmlConvert.VerifyXmlChars` method used to detect an illegal character in the start element.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlConvert/VerifyWhitespace/xmlconvertnewverify.cs._
