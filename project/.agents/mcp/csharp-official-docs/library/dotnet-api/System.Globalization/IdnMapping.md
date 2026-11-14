---
title: "IdnMapping class (part 1 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Globalization/IdnMapping.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IdnMapping class

Namespace: `System.Globalization`

```csharp
public sealed class IdnMapping
```

Supports the use of non-ASCII characters for Internet domain names. This class cannot be inherited.

#### Remarks
An Internet domain name consists of one or more parts, called domain name labels, separated by label separators. For example, the domain name "www.proseware.com" consists of the labels, "www", "proseware", and "com", separated by periods. Standard domain names consist of designated characters in the US-ASCII (or Basic Latin) character range, from U+0021 to U+007E. To facilitate Internet usage in cultures that do not use the US-ASCII character set, the Internationalizing Domain Names in Applications (IDNA) standard was adopted in 2003 to support the inclusion of Unicode characters outside the US-ASCII character range. However, name servers and domain name resolution continue to rely on characters within the US-ASCII character range.

The IDNA mechanism uses Punycode to map an internationalized domain name that contains Unicode characters outside the US-ASCII character range to the US-ASCII character range supported by the domain name system. The IDNA mechanism is used to convert only domain names, not data transmitted over the Internet.

The `IdnMapping.GetAscii` method normalizes a domain name, converts the normalized name to a representation that consists of displayable Unicode characters in the US-ASCII code point range (U+0020 to U+007E), and prepends an ASCII-compatible encoding (ACE) prefix ("xn--") to each label. The `IdnMapping.GetUnicode` method restores the domain name labels converted by the `IdnMapping.GetAscii` method.

If the string to be converted includes the label separator characters IDEOGRAPHIC FULL STOP (U+3002), FULLWIDTH FULL STOP (U+FF0E), and HALFWIDTH IDEOGRAPHIC FULL STOP (U+FF61), the `IdnMapping.GetAscii` method converts them to the label separator FULL STOP (period, U+002E). The `IdnMapping.GetUnicode` method, however, does not restore the original label separator character.

#### Examples
The following example uses the `GetAscii` method to convert an array of internationalized domain names to Punycode. The `IdnMapping.GetUnicode` method then converts the Punycode domain name back to the original domain name, but replaces the original label separators with the standard label separator.

_Code sample not included: ~/snippets/csharp/System.Globalization/IdnMapping/Overview/conversion1.cs._

## IdnMapping.IdnMapping() constructor

```csharp
public IdnMapping ();
```

Initializes a new instance of the `IdnMapping` class.

#### Remarks
The `IdnMapping.AllowUnassigned` and `IdnMapping.UseStd3AsciiRules` properties are initialized to `false`. A small subset of ASCII characters other than A-Z, 0-9, the hyphen (-) character (U+002D), and the period (.) character are permitted in domain names, but unassigned Unicode code points are not.

## IdnMapping.AllowUnassigned property

```csharp
public bool AllowUnassigned { get; set; }
```

Gets or sets a value that indicates whether unassigned Unicode code points are used in operations performed by members of the current `IdnMapping` object.

Returns: `true` if unassigned code points are used in operations; otherwise, `false`.

#### Remarks
A registered domain name cannot contain unassigned code points. Consequently, the default value of the `AllowUnassigned` property is `false`. The IDNA specification permits unassigned code points only in queries for matching strings (that is, in domain name lookup). For more information about the use of unassigned code points in domain names, see RFC 3454, "Preparation of Internationalized Strings (stringprep)" and RFC 5891, "Internationalized Domain Names in Applications (IDNA): Protocol".

> **Important:**
>  If the `AllowUnassigned` property is `false`, the behavior associated with the property depends on the underlying operating system. On Windows 8, the `IdnMapping` class conforms to IDNA 2008, which is based on the Unicode 6.0 standard. On previous versions of Windows, the `IdnMapping` class is based on IDNA 2003, which is based on Unicode 3.*x*. Some code points that were unassigned in IDNA 2003 have been assigned characters and are supported in IDNA 2008. For example, U+0221 was introduced in Unicode 4.0. On Windows 8, it is encoded as "xn—6la". On previous versions of Windows, it throws an `ArgumentException` exception.

## IdnMapping.UseStd3AsciiRules property

```csharp
public bool UseStd3AsciiRules { get; set; }
```

Gets or sets a value that indicates whether standard or relaxed naming conventions are used in operations performed by members of the current `IdnMapping` object.

Returns: `true` if standard naming conventions are used in operations; otherwise, `false`.

#### Remarks
Domain names that follow standard naming rules consist of a specific subset of characters in the US-ASCII character range. The characters are the letters A through Z, the digits 0 through 9, the hyphen (-) character (U+002D), and the period (.) character. The case of the characters is not significant. Relaxed naming conventions allow the use of a broader range of ASCII characters, including the space character (U+0020), the exclamation point character (U+0021), and the underbar character (U+005F). If `IdnMapping.UseStd3AsciiRules` is `true`, only standard characters can appear in a label returned by the `IdnMapping.GetAscii` method.

By default, the value of the `UseStd3AsciiRules` property is `false`, and an expanded subset of ASCII characters is permitted in a label.

> **Note:**
>  The `IdnMapping` class prohibits the use of the nondisplayable characters U+0000 through U+001F, and U+007F in domain name labels regardless of the setting of the `UseStd3AsciiRules` property. This prohibition reduces the risk of security attacks such as name spoofing.

#### Examples
The following example generates URLs that contain characters in the ASCII range from U+0000 to U+007F and passes them to the `GetAscii` method of two `IdnMapping` objects. One object has its `UseStd3AsciiRules` property set to `true`, and the other object has it set to `false`. The output displays the characters that are invalid when the `UseStd3AsciiRules` property is `true` but valid when it is `false`.

_Code sample not included: ~/snippets/csharp/System.Globalization/IdnMapping/UseStd3AsciiRules/usestd3asciirules1.cs._

## IdnMapping.Equals(Object) method

```csharp
public override bool Equals (object? obj);
```

Indicates whether a specified object and the current `IdnMapping` object are equal.

Parameters:

- `obj`: The object to compare to the current object.

Returns: `true` if the object specified by the `obj` parameter is derived from `IdnMapping` and its `IdnMapping.AllowUnassigned` and `IdnMapping.UseStd3AsciiRules` properties are equal; otherwise, `false`.

To be added.

## IdnMapping.GetAscii(String) method

```csharp
public string GetAscii (string unicode);
```

Encodes a string of domain name labels that consist of Unicode characters to a string of displayable Unicode characters in the US-ASCII character range. The string is formatted according to the IDNA standard.

Parameters:

- `unicode`: The string to convert, which consists of one or more domain name labels delimited with label separators.

Returns: The equivalent of the string specified by the `unicode` parameter, consisting of displayable Unicode characters in the US-ASCII character range (U+0020 to U+007E) and formatted according to the IDNA standard.

Exceptions:

- `ArgumentNullException`: `unicode` is `null`.
- `ArgumentException`: `unicode` is invalid based on the `IdnMapping.AllowUnassigned` and `IdnMapping.UseStd3AsciiRules` properties, and the IDNA standard.

#### Remarks
The `unicode` parameter specifies a string of one or more labels that consist of valid Unicode characters. The labels are separated by label separators. The `unicode` parameter cannot begin with a label separator, but it can include and optionally end with a separator. The label separators are FULL STOP (period, U+002E), IDEOGRAPHIC FULL STOP (U+3002), FULLWIDTH FULL STOP (U+FF0E), and HALFWIDTH IDEOGRAPHIC FULL STOP (U+FF61). For example, the domain name "www.adatum.com" consists of the labels, "www", "adatum", and "com", separated by periods.

A label cannot contain any of the following characters:

- Unicode control characters from U+0001 through U+001F, and U+007F.

- Unassigned Unicode characters, if the value of the `AllowUnassigned` property is `false`.

- Non-standard characters in the US-ASCII character range, such as the SPACE (U+0020), EXCLAMATION MARK (U+0021), and LOW LINE (U+005F) characters, if the value of the `UseStd3AsciiRules` property is `true`.

- Characters that are prohibited by a specific version of the IDNA standard. For more information about prohibited characters, see RFC 3454: Preparation of Internationalized Strings ("stringprep") for IDNA 2003, and RFC 5982: The Unicode Code Points and Internationalized Domain Names for Applications for IDNA 2008.

The `IdnMapping.GetAscii` method converts all label separators to FULL STOP (period, U+002E).

If `unicode` contains no characters outside the US-ASCII character range and no characters within the US-ASCII character range are prohibited, the method returns `unicode` unchanged.

#### Examples
The following example uses the `GetAscii` method to convert an array of internationalized domain names to Punycode, which is an encoded equivalent that consists of characters in the US-ASCII character range. The `GetUnicode` method then converts the Punycode domain name back into the original domain name, but replaces the original label separators with the standard label separator.

_Code sample not included: ~/snippets/csharp/System.Globalization/IdnMapping/Overview/conversion1.cs._

## IdnMapping.GetAscii(String, Int32) method

```csharp
public string GetAscii (string unicode, int index);
```

Encodes a substring of domain name labels that include Unicode characters outside the US-ASCII character range. The substring is converted to a string of displayable Unicode characters in the US-ASCII character range and is formatted according to the IDNA standard.

Parameters:

- `unicode`: The string to convert, which consists of one or more domain name labels delimited with label separators.
- `index`: A zero-based offset into `unicode` that specifies the start of the substring to convert. The conversion operation continues to the end of the `unicode` string.

Returns: The equivalent of the substring specified by the `unicode` and `index` parameters, consisting of displayable Unicode characters in the US-ASCII character range (U+0020 to U+007E) and formatted according to the IDNA standard.

Exceptions:

- `ArgumentNullException`: `unicode` is `null`.
- `ArgumentOutOfRangeException`: `index` is less than zero.

-or-

`index` is greater than the length of `unicode`.
- `ArgumentException`: `unicode` is invalid based on the `IdnMapping.AllowUnassigned` and `IdnMapping.UseStd3AsciiRules` properties, and the IDNA standard.

#### Remarks
The `unicode` and `index` parameters define a substring with one or more labels that consist of valid Unicode characters. The labels are separated by label separators. The first character of the substring cannot begin with a label separator, but it can include and optionally end with a separator. The label separators are FULL STOP (period, U+002E), IDEOGRAPHIC FULL STOP (U+3002), FULLWIDTH FULL STOP (U+FF0E), and HALFWIDTH IDEOGRAPHIC FULL STOP (U+FF61). For example, the domain name "www.adatum.com" consists of the labels, "www", "adatum", and "com", separated by periods.

A label cannot contain any of the following characters:

- Unicode control characters from U+0001 through U+001F, and U+007F.

- Unassigned Unicode characters, depending on the value of the `AllowUnassigned` property.

- Non-standard characters in the US-ASCII character range, such as the SPACE (U+0020), EXCLAMATION MARK (U+0021), and LOW LINE (U+005F) characters, depending on the value of the `UseStd3AsciiRules` property.

- Characters that are prohibited by a specific version of the IDNA standard. For more information about prohibited characters, see RFC 3454: Preparation of Internationalized Strings ("stringprep") for IDNA 2003, and RFC 5982: The Unicode Code Points and Internationalized Domain Names for Applications for IDNA 2008.

The `IdnMapping.GetAscii` method converts all label separators to FULL STOP (period, U+002E).

If `unicode` contains no characters outside the US-ASCII character range and no characters within the US-ASCII character range are prohibited, the method returns `unicode` unchanged.
