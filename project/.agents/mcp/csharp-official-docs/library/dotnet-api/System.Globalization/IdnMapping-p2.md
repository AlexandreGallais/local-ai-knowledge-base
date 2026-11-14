---
title: "IdnMapping class (part 2 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Globalization/IdnMapping.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IdnMapping class (part 2 of 2)

## IdnMapping.GetAscii(String, Int32, Int32) method

```csharp
public string GetAscii (string unicode, int index, int count);
```

Encodes the specified number of characters in a substring of domain name labels that include Unicode characters outside the US-ASCII character range. The substring is converted to a string of displayable Unicode characters in the US-ASCII character range and is formatted according to the IDNA standard.

Parameters:

- `unicode`: The string to convert, which consists of one or more domain name labels delimited with label separators.
- `index`: A zero-based offset into `unicode` that specifies the start of the substring.
- `count`: The number of characters to convert in the substring that starts at the position specified by  `index` in the `unicode` string.

Returns: The equivalent of the substring specified by the `unicode`, `index`, and `count` parameters, consisting of displayable Unicode characters in the US-ASCII character range (U+0020 to U+007E) and formatted according to the IDNA standard.

Exceptions:

- `ArgumentNullException`: `unicode` is `null`.
- `ArgumentOutOfRangeException`: `index` or `count` is less than zero.

-or-

`index` is greater than the length of `unicode`.

-or-

`index` is greater than the length of `unicode` minus `count`.
- `ArgumentException`: `unicode` is invalid based on the `IdnMapping.AllowUnassigned` and `IdnMapping.UseStd3AsciiRules` properties, and the IDNA standard.

#### Remarks
The `Unicode`, `index`, and `count` parameters define a substring with one or more labels that consist of valid Unicode characters. The labels are separated by label separators. The first character of the substring cannot begin with a label separator, but it can include and optionally end with a separator. The label separators are FULL STOP (period, U+002E), IDEOGRAPHIC FULL STOP (U+3002), FULLWIDTH FULL STOP (U+FF0E), and HALFWIDTH IDEOGRAPHIC FULL STOP (U+FF61). For example, the domain name "www.adatum.com" consists of the labels, "www", "adatum", and "com", separated by periods.

A label cannot contain any of the following characters:

- Unicode control characters from U+0001 through U+001F, and U+007F.

- Unassigned Unicode characters, depending on the value of the `AllowUnassigned` property.

- Non-standard characters in the US-ASCII character range, such as the SPACE (U+0020), EXCLAMATION MARK (U+0021), and LOW LINE (U+005F) characters, depending on the value of the `UseStd3AsciiRules` property.

- Characters that are prohibited by a specific version of the IDNA standard. For more information about prohibited characters, see RFC 3454: Preparation of Internationalized Strings ("stringprep") for IDNA 2003, and RFC 5982: The Unicode Code Points and Internationalized Domain Names for Applications for IDNA 2008.

The `IdnMapping.GetAscii` method converts all label separators to FULL STOP (period, U+002E). If the substring contains no characters outside the US-ASCII character range, and no characters within the US-ASCII character range are prohibited, the method returns the substring unchanged.

#### Examples
The following example uses the `GetAscii` method to convert an internationalized domain name to a domain name that complies with the IDNA standard. The `GetUnicode` method then converts the standardized domain name back into the original domain name, but replaces the original label separators with the standard label separator.

_Code sample not included: ~/snippets/csharp/System.Globalization/IdnMapping/GetAscii/getx.cs._

## IdnMapping.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Returns a hash code for this `IdnMapping` object.

Returns: One of four 32-bit signed constants derived from the properties of an `IdnMapping` object.  The return value has no special meaning and is not suitable for use in a hash code algorithm.

#### Remarks
Override the `IdnMapping.GetHashCode` method if your application needs to implement a meaningful hash code algorithm.

#### Examples
The following example assumes that a single string can contain multiple email addresses separated by spaces. It removes the local part and the @ character from each email address, and passes the resulting domain name to the `GetAscii` or `GetAscii` method to create a Punycode domain name. The `GetUnicode` method then converts the Punycode domain name back into the original domain name.

_Code sample not included: ~/snippets/csharp/System.Globalization/IdnMapping/GetHashCode/conversion1b.cs._

## IdnMapping.GetUnicode(String) method

```csharp
public string GetUnicode (string ascii);
```

Decodes a string of one or more domain name labels, encoded according to the IDNA standard, to a string of Unicode characters.

Parameters:

- `ascii`: The string to decode, which consists of one or more labels in the US-ASCII character range (U+0020 to U+007E) encoded according to the IDNA standard.

Returns: The Unicode equivalent of the IDNA substring specified by the `ascii` parameter.

Exceptions:

- `ArgumentNullException`: `ascii` is `null`.
- `ArgumentException`: `ascii` is invalid based on the `IdnMapping.AllowUnassigned` and `IdnMapping.UseStd3AsciiRules` properties, and the IDNA standard.

#### Remarks
For more information about domain names, labels, and label separators, see the remarks for the `GetAscii` method.

#### Examples
The following example uses the `GetAscii` method to convert an array of internationalized domain names to Punycode. The `GetUnicode` method then converts the Punycode domain name back into the original domain name, but replaces the original label separators with the standard label separator.

_Code sample not included: ~/snippets/csharp/System.Globalization/IdnMapping/Overview/conversion1.cs._

## IdnMapping.GetUnicode(String, Int32) method

```csharp
public string GetUnicode (string ascii, int index);
```

Decodes a substring of one or more domain name labels, encoded according to the IDNA standard, to a string of Unicode characters.

Parameters:

- `ascii`: The string to decode, which consists of one or more labels in the US-ASCII character range (U+0020 to U+007E) encoded according to the IDNA standard.
- `index`: A zero-based offset into `ascii` that specifies the start of the substring to decode. The decoding operation continues to the end of the `ascii` string.

Returns: The Unicode equivalent of the IDNA substring specified by the `ascii` and `index` parameters.

Exceptions:

- `ArgumentNullException`: `ascii` is `null`.
- `ArgumentOutOfRangeException`: `index` is less than zero.

-or-

`index` is greater than the length of `ascii`.
- `ArgumentException`: `ascii` is invalid based on the `IdnMapping.AllowUnassigned` and `IdnMapping.UseStd3AsciiRules` properties, and the IDNA standard.

#### Remarks
For more information about domain names, labels, and label separators, see the remarks for the `GetAscii` method.

## IdnMapping.GetUnicode(String, Int32, Int32) method

```csharp
public string GetUnicode (string ascii, int index, int count);
```

Decodes a substring of a specified length that contains one or more domain name labels, encoded according to the IDNA standard, to a string of Unicode characters.

Parameters:

- `ascii`: The string to decode, which consists of one or more labels in the US-ASCII character range (U+0020 to U+007E) encoded according to the IDNA standard.
- `index`: A zero-based offset into `ascii` that specifies the start of the substring.
- `count`: The number of characters to convert in the substring that starts at the position specified by `index` in the `ascii` string.

Returns: The Unicode equivalent of the IDNA substring specified by the `ascii`, `index`, and `count` parameters.

Exceptions:

- `ArgumentNullException`: `ascii` is `null`.
- `ArgumentOutOfRangeException`: `index` or `count` is less than zero.

-or-

`index` is greater than the length of `ascii`.

-or-

`index` is greater than the length of `ascii` minus `count`.
- `ArgumentException`: `ascii` is invalid based on the `IdnMapping.AllowUnassigned` and `IdnMapping.UseStd3AsciiRules` properties, and the IDNA standard.

#### Remarks
For more information about domain names, labels, and label separators, see the remarks for the `GetAscii` method.

## IdnMapping.TryGetAscii(Char>, Char>, Int32) method

```csharp
public bool TryGetAscii (ReadOnlySpan<char> unicode, Span<char> destination, out int charsWritten);
```

To be added.

Parameters:

- `unicode`: To be added.
- `destination`: To be added.
- `charsWritten`: To be added.

Returns: To be added.

To be added.

## IdnMapping.TryGetUnicode(Char>, Char>, Int32) method

```csharp
public bool TryGetUnicode (ReadOnlySpan<char> ascii, Span<char> destination, out int charsWritten);
```

To be added.

Parameters:

- `ascii`: To be added.
- `destination`: To be added.
- `charsWritten`: To be added.

Returns: To be added.

To be added.
