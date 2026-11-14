---
title: "XmlConvert class (part 1 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml/XmlConvert.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XmlConvert class

Namespace: `System.Xml`

```csharp
public class XmlConvert
```

Encodes and decodes XML names, and provides methods for converting between common language runtime types and XML Schema definition language (XSD) types. When converting data types, the values returned are locale-independent.

The `XmlConvert` class is functionally equivalent to the `Convert` class, but it supports XML standards. The type system is based on the XML Schema definition language (XSD) schema type, and the values returned are always locale-independent.

#### Encoding and decoding

Element and attribute names or ID values are limited to a range of XML characters according to the W3C XML 1.0 recommendation. When names contain invalid characters, you can use the `XmlConvert.EncodeName` and `XmlConvert.DecodeName` methods in this class to translate them into valid XML names.

For example, if you want to use the column heading "Order Detail" in a database, the database allows the space between the two words. However, in XML, the space between "Order" and "Detail" is considered an invalid XML character. You have to convert it into an escaped hexadecimal encoding and decode it later.

You can use the `XmlConvert.EncodeName` method with the `XmlWriter` class to ensure the names being written are valid XML names. The following C# code converts the name "Order Detail" into a valid XML name and writes the element `<Order_0x0020_Detail>My order</Order_0x0020_Detail>`.

```csharp
writer.WriteElementString(XmlConvert.EncodeName("Order Detail"),"My order");
```

The following `XmlConvert` methods perform encoding and decoding.

|Method|Description|
|------------|-----------------|
|`XmlConvert.EncodeName`|Takes a name and returns the encoded name along with any invalid character that is replaced by an escape string. This method allows colons in any position, which means that the name may still be invalid according to the W3C Namespaces in XML 1.0 recommendation.|
|`XmlConvert.EncodeNmToken`|Takes a name and returns the encoded name.|
|`XmlConvert.EncodeLocalName`|Same as `XmlConvert.EncodeName` except that it also encodes the colon character, guaranteeing that the name can be used as the `LocalName` part of a namespace-qualified name.|
|`XmlConvert.DecodeName`|Reverses the transformation for all the encoding methods.|

#### Name validation

The `XmlConvert` class contains two methods that check the characters in an element or attribute name and verify that the name conforms to the rules set by the W3C XML 1.0 recommendation:

- `XmlConvert.VerifyName` checks the characters and verifies that the name is valid. The method returns the name if it's valid, and throws an exception if it isn't.
- `XmlConvert.VerifyNCName` performs the same validation, but accepts non-qualified names.

The `XmlConvert` contains additional methods that validate tokens, white-space characters, public IDs, and other strings.

#### Data type conversion

`XmlConvert` also provides methods that enable you to convert data from a string to a strongly typed data type. For example, the `XmlConvert.ToDateTime` method converts a string to its `DateTime` equivalent. This is useful because most methods in the `XmlReader` class return data as a string. After the data is read, it can be converted to the proper data type before being used. The `XmlConvert.ToString` overloads provide the complementary operation by converting strongly typed data to strings. For example, this is useful when you want to add the data to text boxes on a webpage. Locale settings are not taken into account during data conversion. The data types are based on the XML Schema (XSD) data types.

## XmlConvert.XmlConvert() constructor

```csharp
public XmlConvert ();
```

Initializes a new instance of the `XmlConvert` class.

To be added.

## XmlConvert.DecodeName(String) method

```csharp
public static string? DecodeName (string? name);
```

Decodes a name. This method does the reverse of the `XmlConvert.EncodeName` and `XmlConvert.EncodeLocalName` methods.

Parameters:

- `name`: The name to be transformed.

Returns: The decoded name.

#### Remarks
The names are decoded using the following rules:

- Names are decoded from left to right.

- Any sequence \_x*HHHH*\_ (where HHHH stands for a valid, four-digit hexadecimal UCS-2 code) that has not been decoded is transformed into the corresponding Unicode 2.1 (Unicode 3.0 if supported by the application) character.

- No shortforms are recognized. They are passed on without translation. For example, \_x20\_ or \_\_ are not decoded.

> **Note:**
> The actual encoding of the character is application-specific. For example, Order\_x0020\_Details becomes Order Details. Even escaped characters that are invalid in XML names will be recognized and decoded.

#### Examples
The following example encodes and decodes names.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlConvert/DecodeName/convert.cs._

## XmlConvert.EncodeLocalName(String) method

```csharp
public static string? EncodeLocalName (string? name);
```

Converts the name to a valid XML local name.

Parameters:

- `name`: The name to be encoded.

Returns: The encoded name.

#### Remarks
This method is similar to the `XmlConvert.EncodeName` method except that it encodes the colon character, which guarantees that the name can be used as the local name part of a namespace qualified name.

For example, if you passed this method the invalid name a:b, it returns a\_x003a\_b, which is a valid local name.

If `name` is `null` or `Empty`, the method returns the same value.

#### Examples
The following example encodes and decodes names.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlConvert/DecodeName/convert.cs._

## XmlConvert.EncodeName(String) method

```csharp
public static string? EncodeName (string? name);
```

Converts the name to a valid XML name.

Parameters:

- `name`: A name to be translated.

Returns: The name with any invalid characters replaced by an escape string.

#### Remarks
This method translates invalid characters, such as spaces or half-width Katakana, that need to be mapped to XML names without the support or presence of schemas. The invalid characters are translated into escaped numeric entity encodings.

The escape character is "\_". Any XML name character that does not conform to the XML 1.0 spec (fourth edition) recommendation is escaped as \_xHHHH\_. The HHHH string stands for the four-digit hexadecimal UCS-2 code for the character in most significant bit first order. For example, the name Order Details is encoded as Order\_x0020\_Details.

The underscore character does not need to be escaped unless it is followed by a character sequence that together with the underscore can be misinterpreted as an escape sequence when decoding the name. For example, Order\_Details is not encoded, but Order\_x0020\_ is encoded as Order\_x005f\_x0020\_. No shortforms are allowed. For example, the forms \_x20\_ and \_\_ are not generated.

This method guarantees the name is valid according to the XML specification. It allows colons in any position, which means the name may still be invalid according to the W3C Namespace Specification. To guarantee it is a valid namespace qualified name use `XmlConvert.EncodeLocalName` for the prefix and local name parts and join the result with a colon.

#### Examples
The following example encodes and decodes names.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlConvert/DecodeName/convert.cs._

## XmlConvert.EncodeNmToken(String) method

```csharp
public static string? EncodeNmToken (string? name);
```

Verifies the name is valid according to the XML specification.

Parameters:

- `name`: The name to be encoded.

Returns: The encoded name.

#### Remarks
This method guarantees that the name is valid according to the XML specification. For example, if you passed this method the invalid name 70+, it returns 70\_x002b\_, which is a valid XML name.

If `name` is `null` or String.Empty then you get the same value returned.

## XmlConvert.IsNCNameChar(Char) method

```csharp
public static bool IsNCNameChar (char ch);
```

Checks whether the passed-in character is a valid non-colon character type.

Parameters:

- `ch`: The character to verify as a non-colon character.

Returns: `true` if the character is a valid non-colon character type; otherwise, `false`.

To be added.

## XmlConvert.IsPublicIdChar(Char) method

```csharp
public static bool IsPublicIdChar (char ch);
```

Returns the passed-in character instance if the character in the argument is a valid public id character, otherwise `null`.

Parameters:

- `ch`: `Char` object to validate.

Returns: The passed-in character if the character is a valid public id character, otherwise `null`.

To be added.

## XmlConvert.IsStartNCNameChar(Char) method

```csharp
public static bool IsStartNCNameChar (char ch);
```

Checks if the passed-in character is a valid Start Name Character type.

Parameters:

- `ch`: The character to validate.

Returns: `true` if the character is a valid Start Name Character type; otherwise, `false`.

#### Remarks
For details about allowed characters, see the XML 1.0 spec (fourth edition) recommendation.

## XmlConvert.IsWhitespaceChar(Char) method

```csharp
public static bool IsWhitespaceChar (char ch);
```

Checks if the passed-in character is a valid XML whitespace character.

Parameters:

- `ch`: The character to validate.

Returns: `true` if the passed in character is a valid XML whitespace character; otherwise, `false`.

#### Remarks
For details about allowed characters, see the XML 1.0 spec (fourth edition) recommendation.

## XmlConvert.IsXmlChar(Char) method

```csharp
public static bool IsXmlChar (char ch);
```

Checks if the passed-in character is a valid XML character.

Parameters:

- `ch`: The character to validate.

Returns: `true` if the passed in character is a valid XML character; otherwise, `false`.

#### Remarks
For details about allowed characters, see the XML 1.0 spec (fourth edition) recommendation.

## XmlConvert.IsXmlSurrogatePair(Char, Char) method

```csharp
public static bool IsXmlSurrogatePair (char lowChar, char highChar);
```

Checks if the passed-in surrogate pair of characters is a valid XML character.

Parameters:

- `lowChar`: The surrogate character to validate.
- `highChar`: The surrogate character to validate.

Returns: `true` if the passed in surrogate pair of characters is a valid XML character; otherwise, `false`.

To be added.

## XmlConvert.ToBoolean(String) method

```csharp
public static bool ToBoolean (string s);
```

Converts the `String` to a `Boolean` equivalent.

Parameters:

- `s`: The string to convert.

Returns: A `Boolean` value, that is, `true` or `false`.

Exceptions:

- `ArgumentNullException`: `s` is `null`.
- `FormatException`: `s` does not represent a `Boolean` value.

#### Remarks
Valid strings are "1" or "true" for `true` and "0" or "false" for `false`.

## XmlConvert.ToByte(String) method

```csharp
public static byte ToByte (string s);
```

Converts the `String` to a `Byte` equivalent.

Parameters:

- `s`: The string to convert.

Returns: A `Byte` equivalent of the string.

Exceptions:

- `ArgumentNullException`: `s` is `null`.
- `FormatException`: `s` is not in the correct format.
- `OverflowException`: `s` represents a number less than <see cref="F:System.Byte.MinValue">Byte.MinValue</see> or greater than <see cref="F:System.Byte.MaxValue">Byte.MaxValue</see>.

To be added.

## XmlConvert.ToChar(String) method

```csharp
public static char ToChar (string s);
```

Converts the `String` to a `Char` equivalent.

Parameters:

- `s`: The string containing a single character to convert.

Returns: A `Char` representing the single character.

Exceptions:

- `ArgumentNullException`: The value of the `s` parameter is `null`.
- `FormatException`: The `s` parameter contains more than one character.

To be added.

## XmlConvert.ToDateTime(String) method

```csharp
public static DateTime ToDateTime (string s);
```

Converts the `String` to a `DateTime` equivalent.

Parameters:

- `s`: The string to convert.

Returns: A `DateTime` equivalent of the string.

Exceptions:

- `ArgumentNullException`: `s` is `null`.
- `FormatException`: `s` is an empty string or is not in the correct format.

To be added.

## XmlConvert.ToDateTime(String, String) method

```csharp
public static DateTime ToDateTime (string s, string format);
```

Converts the `String` to a `DateTime` equivalent.

Parameters:

- `s`: The string to convert.
- `format`: The format structure to apply to the converted `DateTime`. Valid formats include "yyyy-MM-ddTHH:mm:sszzzzzz" and its subsets. The string is validated against this format.

Returns: A `DateTime` equivalent of the string.

Exceptions:

- `ArgumentNullException`: `s` is `null`.
- `FormatException`: `s` or `format` is String.Empty

-or-

`s` does not contain a date and time that corresponds to `format`.

To be added.

## XmlConvert.ToDateTime(String, String[]) method

```csharp
public static DateTime ToDateTime (string s, string[] formats);
```

Converts the `String` to a `DateTime` equivalent.

Parameters:

- `s`: The string to convert.
- `formats`: An array containing the format structures to apply to the converted `DateTime`. Valid formats include "yyyy-MM-ddTHH:mm:sszzzzzz" and its subsets.

Returns: A `DateTime` equivalent of the string.

Exceptions:

- `ArgumentNullException`: `s` is `null`.
- `FormatException`: `s` or an element of `formats` is String.Empty

-or-

`s` does not contain a date and time that corresponds to any of the elements of `formats`.

#### Remarks
This method allows multiple formats for the string to be validated against.

## XmlConvert.ToDateTime(String, XmlDateTimeSerializationMode) method

```csharp
public static DateTime ToDateTime (string s, System.Xml.XmlDateTimeSerializationMode dateTimeOption);
```

Converts the `String` to a `DateTime` using the `XmlDateTimeSerializationMode` specified.

Parameters:

- `s`: The `String` value to convert.
- `dateTimeOption`: One of the enumeration values that specify whether the date should be converted to local time or preserved as Coordinated Universal Time (UTC), if it is a UTC date.

Returns: A `DateTime` equivalent of the `String`.

Exceptions:

- `NullReferenceException`: `s` is `null`.
- `ArgumentNullException`: `dateTimeOption` is `null`.
- `FormatException`: `s` is an empty string or is not in a valid format.

To be added.
