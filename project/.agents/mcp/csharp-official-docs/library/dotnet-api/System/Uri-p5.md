---
title: "Uri class (part 5 of 7)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Uri.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Uri class (part 5 of 7)

## Uri.GetComponents(UriComponents, UriFormat) method

```csharp
public string GetComponents (UriComponents components, UriFormat format);
```

Gets the specified components of the current instance using the specified escaping for special characters.

Parameters:

- `components`: A bitwise combination of the `UriComponents` values that specifies which parts of the current instance to return to the caller.
- `format`: One of the enumeration values that controls how special characters are escaped.

Returns: The components of the current instance.

Exceptions:

- `ArgumentOutOfRangeException`: `components` is not a combination of valid `UriComponents` values.
- `InvalidOperationException`: The current `Uri` is not an absolute URI. Relative URIs cannot be used with this method.

#### Remarks
The `Query`, `Fragment`, `Scheme`, `UserInfo`, `Host`, `Port`, and `Path` components do not include the delimiter. You can combine the `KeepDelimiter` flag (using the bitwise OR operator) with any of those values to get the value with the delimiter. For all other `UriComponents` values, and combinations of values, the delimiters are included in the returned value.

The components are returned in the order that they appear in the URI. For example, if `Scheme` is specified, it appears first.

When International Resource Identifier (IRI) and Internationalized Domain Name (IDN) support are enabled, the number of characters returned in the `String` increases. Punycode names used to support IRI contain only ASCII characters and always start with the xn-- prefix. When IRI and IDN are enabled, Unicode surrogate characters are handled correctly by the `Uri.GetComponents` method.

For more information on IRI support, see the Remarks section for the `Uri` class.

> **Note:**
> If the `Uri.GetComponents` method is called with `format` set to `Unescaped` , you cannot use the return value as an argument to a `Uri.%23ctor` constructor to create an equivalent `Uri`.

## Uri.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Gets the hash code for the URI.

Returns: The hash value generated for this URI.

#### Examples
The following example creates a `Uri` instance and writes the hash code to the console.

_Code sample not included: ~/snippets/csharp/System/Uri/CheckSchemeName/uriexamples.cs._

## Uri.GetLeftPart(UriPartial) method

```csharp
public string GetLeftPart (UriPartial part);
```

Gets the specified portion of a `Uri` instance.

Parameters:

- `part`: One of the enumeration values that specifies the end of the URI portion to return.

Returns: The specified portion of the `Uri` instance.

Exceptions:

- `InvalidOperationException`: The current `Uri` instance is not an absolute instance.
- `ArgumentException`: The specified `part` is not valid.

#### Remarks

The `Uri.GetLeftPart` method returns a string containing the leftmost portion of the URI string, ending with the portion specified by `part`.

> **Important:**
> The `Uri.GetLeftPart` method performs Unicode character encoding and normalization as part of its processing. It is not a simple string manipulation method. The returned string may differ from the original URI string due to this encoding behavior.

The `Uri.GetLeftPart` method is equivalent to calling `Uri.GetComponents` with the appropriate `UriComponents` flags. For example:
- `GetLeftPart(UriPartial.Authority)` is equivalent to `GetComponents(UriComponents.Scheme | UriComponents.UserInfo | UriComponents.Host | UriComponents.Port, UriFormat.UriEscaped)`

`Uri.GetLeftPart` includes delimiters in the following cases:

- `Scheme` includes the scheme delimiter.
- `Authority` does not include the path delimiter.
- `Path` includes the path delimiter and any delimiters in the original URI up to the query or fragment delimiter.
- `Query` includes the `Path`, plus the query and its delimiter.

The following examples show a URI and the results of calling `Uri.GetLeftPart` with `Scheme`, `Authority`, `Path`, or `Query`.

|URI|Scheme|Authority|Path|Query|
|---------|------------|---------------|----------|-----------|
|`http://www.contoso.com/index.htm?date=today`|`http://`|`http://www.contoso.com`|`http://www.contoso.com/index.htm`|`http://www.contoso.com/index.htm?date=today`|
|`http://www.contoso.com/index.htm#main`|`http://`|`http://www.contoso.com`|`http://www.contoso.com/index.htm`|`http://www.contoso.com/index.htm`|
|`mailto:user@example.com?subject=uri`|`mailto:`|`<none>`|`mailto:user@example.com`|`mailto:user@example.com?subject=uri`|
|`nntp://news.contoso.com/user@example.com`|`nntp://`|`nntp://news.contoso.com`|`nntp://news.contoso.com/user@example.com`|`nntp://news.contoso.com/user@example.com`|
|`news:user@example.com`|`news:`|`<none>`|`news:user@example.com`|`news:user@example.com`|
|`file://server/filename.ext`|`file://`|`file://server`|`file://server/filename.ext`|`file://server/filename.ext`|

#### Examples
The following example creates a `Uri` instance and writes the path to the console.

_Code sample not included: ~/snippets/csharp/System/Uri/CheckSchemeName/uriexamples.cs._

## Uri.GetObjectData(SerializationInfo, StreamingContext) method

```csharp
protected void GetObjectData (System.Runtime.Serialization.SerializationInfo serializationInfo, System.Runtime.Serialization.StreamingContext streamingContext);
```

Returns the data needed to serialize the current instance.

Parameters:

- `serializationInfo`: The information required to serialize the `Uri`.
- `streamingContext`: An object that contains the source and destination of the serialized stream associated with the `Uri`.

To be added.

## Uri.HexEscape(Char) method

```csharp
public static string HexEscape (char character);
```

Converts a specified character into its hexadecimal equivalent.

Parameters:

- `character`: The character to convert to hexadecimal representation.

Returns: The hexadecimal representation of the specified character.

Exceptions:

- `ArgumentOutOfRangeException`: `character` is greater than 255.

#### Examples
The following example converts a character to its hexadecimal equivalent and writes it to the console.

_Code sample not included: ~/snippets/csharp/System/Uri/CheckSchemeName/uriexamples.cs._

## Uri.HexUnescape(String, Int32) method

```csharp
public static char HexUnescape (string pattern, ref int index);
```

Converts a specified hexadecimal representation of a character to the character.

Parameters:

- `pattern`: The hexadecimal representation of a character.
- `index`: The location in `pattern` where the hexadecimal representation of a character begins.

Returns: The character represented by the hexadecimal encoding at position `index`. If the character at `index` is not hexadecimal encoded, the character at `index` is returned. The value of `index` is incremented to point to the character following the one returned.

Exceptions:

- `ArgumentOutOfRangeException`: `index` is less than 0 or greater than or equal to the number of characters in `pattern`.

#### Remarks
The following code example determines whether a character is hexadecimal encoded and, if so, writes the equivalent character to the console.

_Code sample not included: ~/snippets/csharp/System/Uri/CheckSchemeName/uriexamples.cs._

## Uri.IsBadFileSystemCharacter(Char) method

```csharp
protected virtual bool IsBadFileSystemCharacter (char character);
```

Indicates whether a character is invalid in a file system name.

Parameters:

- `character`: The `Char` to test.

Returns: `true` if the specified character is invalid; otherwise, `false`.

To be added.

## Uri.IsBaseOf(Uri) method

```csharp
public bool IsBaseOf (Uri uri);
```

Determines whether the current `Uri` instance is a base of the specified `Uri` instance.

Parameters:

- `uri`: The specified URI to test.

Returns: `true` if the current `Uri` instance is a base of `uri`; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `uri` is `null`.

#### Remarks
`Uri.IsBaseOf` is used to compare the current `Uri` instance to a specified `Uri` to determine whether this URI is a base for the specified `Uri`. When comparing two `Uri` objects to determine a base relationship, the user information (`Uri.UserInfo`) is not evaluated. When comparing two URIs (uri1 and uri2), uri1 is the base of uri2 if, when you ignore everything in uri1 and uri2 after the last slash (/), uri2 starts with exactly uri1. Using http://host/path/path/file?query as the base URI, the following table shows whether it is a base for other URIs.

|URI|http://host/path/path/file?query is base of|
|---------|------------------------------------------------------|
|http://host/path/path/file/|yes|
|http://host/path/path/#fragment|yes|
|http://host/path/path/MoreDir/"|yes|
|http://host/path/path/OtherFile?Query|yes|
|http://host/path/path/|yes|
|http://host/path/path/file|yes|
|http://host/path/path|no|
|http://host/path/path?query|no|
|http://host/path/path#Fragment|no|
|http://host/path/path2/|no|
://host/path/path2/MoreDir|no|
|http://host/path/File|no|

#### Examples
This example creates a `Uri` instance that represents a base `Uri` instance. It then creates a second `Uri` instance from a string. It calls `Uri.IsBaseOf` to determine whether the base instance is the base of the second instance. The outcome is written to the console.

_Code sample not included: ~/snippets/csharp/System/Uri/.ctor/nclurienhancements.cs._

## Uri.IsExcludedCharacter(Char) method

```csharp
protected static bool IsExcludedCharacter (char character);
```

Determines whether the specified character should be escaped.

Parameters:

- `character`: The character to test.

Returns: `true` if the specified character should be escaped; otherwise, `false`.

To be added.

## Uri.IsHexDigit(Char) method

```csharp
public static bool IsHexDigit (char character);
```

Determines whether a specified character is a valid hexadecimal digit.

Parameters:

- `character`: The character to validate.

Returns: `true` if the character is a valid hexadecimal digit; otherwise, `false`.

#### Remarks
Hexadecimal digits are the digits 0 to 9 and the letters A-F or a-f.

#### Examples
The following example determines whether a character is a hexadecimal character and, if it is, writes the corresponding decimal value to the console.

_Code sample not included: ~/snippets/csharp/System/Uri/CheckSchemeName/uriexamples.cs._

## Uri.IsHexEncoding(String, Int32) method

```csharp
public static bool IsHexEncoding (string pattern, int index);
```

Determines whether a character in a string is hexadecimal encoded.

Parameters:

- `pattern`: The string to check.
- `index`: The location in `pattern` to check for hexadecimal encoding.

Returns: `true` if `pattern` is hexadecimal encoded at the specified location; otherwise, `false`.

#### Remarks
The `Uri.IsHexEncoding` method checks for hexadecimal encoding that follows the pattern "%hexhex" in a string, where "hex" is a digit from 0 to 9 or a letter from A-F (case-insensitive).

#### Examples
The following code example determines whether a character is hexadecimal encoded and, if so, writes the equivalent character to the console.

_Code sample not included: ~/snippets/csharp/System/Uri/CheckSchemeName/uriexamples.cs._

## Uri.IsReservedCharacter(Char) method

```csharp
protected virtual bool IsReservedCharacter (char character);
```

Determines whether the specified character is a reserved character.

Parameters:

- `character`: The character to test.

Returns: `true` if the specified character is a reserved character otherwise, `false`.

To be added.

## Uri.IsWellFormedOriginalString() method

```csharp
public bool IsWellFormedOriginalString ();
```

Indicates whether the string used to construct this `Uri` was well-formed and does not require further escaping.

Returns: `true` if the string was well-formed; otherwise, `false`.

#### Remarks
The string is considered to be well-formed in accordance with RFC 2396 and RFC 2732 by default. If International Resource Identifiers (IRIs) or Internationalized Domain Name (IDN) parsing is enabled, the string is considered to be well-formed in accordance with RFC 3986 and RFC 3987

The string is considered poorly formed, causing the method to return false, if any of the following conditions occur.

|Error|Example|
|-----------|-------------|
|The string is not correctly escaped.|`http://www.contoso.com/path???/file name`|
|The string is an absolute `Uri` that represents an implicit file `Uri`.|`c:\\directory\filename`|
|The string is an absolute URI that is missing a slash before the path.|`file://c:/directory/filename`|
|The string contains unescaped backslashes even if they are treated as forward slashes.|`http:\\\host/path/file`|
|The string represents a hierarchical absolute `Uri` and does not contain "://".|`www.contoso.com/path/file`|
|The parser for the `Uri.Scheme` indicates that the original string was not well-formed.|The example depends on the scheme of the URI.|

By default, the string used to construct this `Uri` are considered well-formed in accordance with RFC 2396 and RFC 2732.

When International Resource Identifier (IRI) and Internationalized Domain Name (IDN) support are enabled, the string used to construct this `Uri` are considered well-formed in accordance with RFC 3986 and RFC 3987. Punycode names used to support IRI contain only ASCII characters and always start with the xn-- prefix.

For more information on IRI support, see the Remarks section for the `Uri` class.
