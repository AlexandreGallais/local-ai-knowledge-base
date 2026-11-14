---
title: "Uri class (part 4 of 7)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Uri.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Uri class (part 4 of 7)

## Uri.Scheme property

```csharp
public string Scheme { get; }
```

Gets the scheme name for this URI.

Returns: The scheme for this URI, converted to lowercase.

Exceptions:

- `InvalidOperationException`: This instance represents a relative URI, and this property is valid only for absolute URIs.

#### Remarks
The `Scheme` property returns the scheme used to initialize the `Uri` instance. This property does not indicate that the scheme used to initialize the `Uri` instance was recognized.

The following table shows examples of some possible values returned by the `Scheme` property.

|Scheme|Description|
|------------|-----------------|
|file|The resource is a file on the local computer.|
|ftp|The resource is accessed through FTP.|
|gopher|The resource is accessed through the Gopher protocol.|
|http|The resource is accessed through HTTP.|
|https|The resource is accessed through SSL-encrypted HTTP.|
|ldap|The resource is accessed through the LDAP protocol.|
|mailto|The resource is an email address and accessed through the SMTP protocol.|
|net.pipe|The resource is accessed through a named pipe.|
|net.tcp|The resource is accessed from TCP endpoint.|
|news|The resource is accessed through the NNTP protocol.|
|nntp|The resource is accessed through the NNTP protocol.|
|telnet|The resource is accessed through the TELNET protocol.|
|uuid|The resource is accessed through a unique UUID endpoint name for communicating with a service.|

#### Examples
The following example writes the scheme name (http) to the console for the `http://www.contoso.com/` URI.

_Code sample not included: ~/snippets/csharp/System/Uri/Scheme/source.cs._

## Uri.Segments property

```csharp
public string[] Segments { get; }
```

Gets an array containing the path segments that make up the specified URI.

Returns: The path segments that make up the specified URI.

Exceptions:

- `InvalidOperationException`: This instance represents a relative URI, and this property is valid only for absolute URIs.

#### Remarks
The `Segments` property returns an array of strings containing the "segments" (substrings) that form the URI's absolute path. The first segment is obtained by parsing the absolute path from its first character until you reach a slash (/) or the end of the path. Each additional segment begins at the first character after the preceding segment, and terminates with the next slash or the end of the path. (A URI's absolute path contains everything after the host and port and before the query and fragment.)

The following example shows the absolute path and segments for two URIs. The second example illustrates that the fragment and query are not part of the absolute path and therefore are not segments.

Absolute URI:
`http://www.contoso.com/Chapters/Chapter1/Sections/Section1.htm`

Absolute path:
/Chapters/Chapter1/Sections/Section1.htm

Segments:
- /
- Chapters/
- Chapter1/
- Sections/
- Section1.htm

Absolute URI:
`http://www.contoso.com/Chapters/Chapter1/Sections/Section1.htm#page1?answer=NO`

Absolute path:
/Chapters/Chapter1/Sections/Section1.htm

Segments:
- /
- Chapters/
- Chapter1/
- Sections/
- Section1.htm

Note that because the absolute path starts with a '/', the first segment contains it and nothing else.

#### Examples
The following example creates a `Uri` instance with 3 segments and displays the segments on the screen.

_Code sample not included: ~/snippets/csharp/System/Uri/CheckSchemeName/uriexamples.cs._

## Uri.UserEscaped property

```csharp
public bool UserEscaped { get; }
```

Gets a value that indicates whether the URI string was completely escaped before the `Uri` instance was created.

Returns: `true` if the
```csharp
dontEscape
```
parameter was set to `true` when the `Uri` instance was created; otherwise, `false`.

#### Remarks

The `UserEscaped` property was originally designed to indicate that the string used to create the `Uri` instance was completely escaped before it was passed to the constructor; that is, the `dontEscape` parameter of the constructor call was set to `true`. However, since the `dontEscape` parameter is now obsolete, this property is deprecated and shouldn't be used.

#### Examples
The following example creates a `Uri` instance and determines whether it was fully escaped when it was created.

_Code sample not included: ~/snippets/csharp/System/Uri/CheckSchemeName/uriexamples.cs._

## Uri.UserInfo property

```csharp
public string UserInfo { get; }
```

Gets the user name, password, or other user-specific information associated with the specified URI.

Returns: The user information associated with the URI. The returned value does not include the '@' character reserved for delimiting the user information part of the URI.

Exceptions:

- `InvalidOperationException`: This instance represents a relative URI, and this property is valid only for absolute URIs.

#### Remarks
The value returned by this property is usually in the format "<example-value>".

#### Examples
The following example creates a `Uri` instance and writes the user information to the console.

_Code sample not included: ~/snippets/csharp/System/Uri/CheckSchemeName/uriexamples.cs._

## Uri.Canonicalize() method

```csharp
protected virtual void Canonicalize ();
```

Converts the internally stored URI to canonical form.

Exceptions:

- `InvalidOperationException`: This instance represents a relative URI, and this method is valid only for absolute URIs.
- `UriFormatException`: The URI is incorrectly formed.

To be added.

## Uri.CheckHostName(String) method

```csharp
public static UriHostNameType CheckHostName (string? name);
```

Determines whether the specified host name is a valid DNS name.

Parameters:

- `name`: The host name to validate. This can be an IPv4 or IPv6 address or an Internet host name.

Returns: The type of the host name. If the type of the host name cannot be determined or if the host name is `null` or a zero-length string, this method returns `UriHostNameType.Unknown`.

#### Remarks
The `Uri.CheckHostName` method checks that the host name provided meets the requirements for a valid Internet host name. It does not, however, perform a host-name lookup to verify the existence of the host.

#### Examples
The following example checks whether the host name is valid.

_Code sample not included: ~/snippets/csharp/System/Uri/CheckHostName/source.cs._

## Uri.CheckSchemeName(String) method

```csharp
public static bool CheckSchemeName (string? schemeName);
```

Determines whether the specified scheme name is valid.

Parameters:

- `schemeName`: The scheme name to validate.

Returns: `true` if the scheme name is valid; otherwise, `false`.

#### Remarks
This method checks the scheme name for validity according to RFC 2396 by default. If International Resource Identifiers (IRIs) or Internationalized Domain Name (IDN) parsing is enabled, this method checks the scheme name for validity according to RFC 3986. The scheme name must begin with a letter and must contain only letters, digits, and the characters ".", "+", or "-".

For more information on IRI support, see the Remarks section for the `Uri` class.

#### Examples
The following example creates a `Uri` instance and checks whether the scheme name is valid.

_Code sample not included: ~/snippets/csharp/System/Uri/CheckSchemeName/uriexamples.cs._

## Uri.CheckSecurity() method

```csharp
protected virtual void CheckSecurity ();
```

Calling this method has no effect.

To be added.

## Uri.Compare(Uri, Uri, UriComponents, UriFormat, StringComparison) method

```csharp
public static int Compare (Uri? uri1, Uri? uri2, UriComponents partsToCompare, UriFormat compareFormat, StringComparison comparisonType);
```

Compares the specified parts of two URIs using the specified comparison rules.

Parameters:

- `uri1`: The first URI.
- `uri2`: The second URI.
- `partsToCompare`: A bitwise combination of the `UriComponents` values that specifies the parts of `uri1` and `uri2` to compare.
- `compareFormat`: One of the enumeration values that specifies the character escaping used when the URI components are compared.
- `comparisonType`: One of the enumeration values that specifies the culture, case, and sort rules for the comparison.

Returns: A value that indicates the lexical relationship between the compared `Uri` components.

-  Less than zero

: `uri1` is less than `uri2`.

-  Zero

: `uri1` equals `uri2`.

-  Greater than zero

: `uri1` is greater than `uri2`.

Exceptions:

- `ArgumentException`: `comparisonType` is not a valid `StringComparison` value.

#### Remarks
If both `uri1` and `uri2` are `null`, this method returns 0. When comparing URI values, a relative URI is always less than an absolute URI, and a non-null URI is always greater than a null URI. For cases where both `uri1` and `uri2` are not `null` and are both relative URIs or both absolute URIs, the `Compare` method performs the comparison.

## Uri.Equals(Object) method

```csharp
public override bool Equals (object? comparand);
```

Compares two `Uri` instances for equality.

Parameters:

- `comparand`: The URI or a URI identifier to compare with the current instance.

Returns: `true` if the two instances represent the same URI; otherwise, `false`.

#### Remarks
The `Uri.Equals` method compares the two instances without regard to user information (`Uri.UserInfo`) and fragment (`Uri.Fragment`) parts that they might contain. For example, given the URIs `http://www.contoso.com/index.htm#search` and `http://user:<example-password>@example.com/index.htm`, the `Uri.Equals` method would return `true`.

If one `Uri` instance is formed with a Unicode host name and `comparand` parameter contains a `Uri` instance or identifier that is formed with a host name that has the equivalent Punycode host name, then `Uri.Equals` returns `true` only if International Resource Identifier (IRI) and Internationalized Domain Name (IDN) support are enabled. Punycode names contain only ASCII characters and always start with the xn-- prefix.

For more information on IRI support, see the Remarks section for the `Uri` class.

> **Note:**
>  The `Uri.Equals` method can be overridden in a derived class; use caution as a malicious entity could modify the method. You should not use this method to perform security checks unless you know that this instance came from a trusted source.

#### Examples
This example creates two `Uri` instances from strings and compares them to determine whether they represent the same value. `address1` and `address2` are the same because the `Uri.Fragment` portion is ignored for this comparison. The outcome is written to the console.

_Code sample not included: ~/snippets/csharp/System/Uri/CheckSchemeName/uriexamples.cs._

## Uri.Equals(Uri) method

```csharp
public bool Equals (Uri? other);
```

Compares two `Uri` instances for equality.

Parameters:

- `other`: The `Uri` to compare to this instance.

Returns: `true` if the two instances represent the same URI; otherwise, `false`.

To be added.

## Uri.Escape() method

```csharp
protected virtual void Escape ();
```

Converts any unsafe or reserved characters in the path component to their hexadecimal character representations.

Exceptions:

- `UriFormatException`: The URI passed from the constructor is invalid. This exception can occur if a URI has too many characters or the URI is relative.

To be added.

## Uri.EscapeDataString(Char>) method

```csharp
public static string EscapeDataString (ReadOnlySpan<char> charsToEscape);
```

Converts a span to its escaped representation.

Parameters:

- `charsToEscape`: The span to escape.

Returns: The escaped representation of `charsToEscape`.

To be added.

## Uri.EscapeDataString(String) method

```csharp
public static string EscapeDataString (string stringToEscape);
```

Converts a string to its escaped representation.

Parameters:

- `stringToEscape`: The string to escape.

Returns: The escaped representation of `stringToEscape`.

Exceptions:

- `ArgumentNullException`: `stringToEscape` is `null`.

#### Remarks
By default, the `Uri.EscapeDataString` method converts all characters except for RFC 2396 unreserved characters to their hexadecimal representation. If International Resource Identifiers (IRIs) or Internationalized Domain Name (IDN) parsing is enabled, the `Uri.EscapeDataString` method converts all characters, except for RFC 3986 unreserved characters, to their hexadecimal representation. All Unicode characters are converted to UTF-8 format before being escaped.

This method assumes that `stringToEscape` has no escape sequences in it.

By default, the string is escaped according to RFC 2396. If International Resource Identifiers (IRIs) or Internationalized Domain Name (IDN) parsing is enabled, the string is escaped according to RFC 3986 and RFC 3987. See these RFCs for a definition of reserved and unreserved characters.

For more information on IRI support, see the Remarks section for the `Uri` class.

## Uri.EscapeString(String) method

```csharp
protected static string EscapeString (string? str);
```

Converts a string to its escaped representation.

Parameters:

- `str`: The string to transform to its escaped representation.

Returns: The escaped representation of the string.

To be added.

## Uri.EscapeUriString(String) method

```csharp
public static string EscapeUriString (string stringToEscape);
```

Converts a URI string to its escaped representation.

Parameters:

- `stringToEscape`: The string to escape.

Returns: The escaped representation of `stringToEscape`.

Exceptions:

- `ArgumentNullException`: `stringToEscape` is `null`.

To be added.

## Uri.FromHex(Char) method

```csharp
public static int FromHex (char digit);
```

Gets the decimal value of a hexadecimal digit.

Parameters:

- `digit`: The hexadecimal digit (0-9, a-f, A-F) to convert.

Returns: A number from 0 to 15 that corresponds to the specified hexadecimal digit.

Exceptions:

- `ArgumentException`: `digit` is not a valid hexadecimal digit (0-9, a-f, A-F).

#### Remarks
The `Uri.FromHex` method converts a character representing a hexadecimal digit (0-9, a-f, A-F) to its decimal value (0 to 15). If `digit` is not a valid hexadecimal digit, an `ArgumentException` exception is thrown.

#### Examples
The following example determines whether a character is a hexadecimal character and, if it is, writes the corresponding decimal value to the console.

_Code sample not included: ~/snippets/csharp/System/Uri/CheckSchemeName/uriexamples.cs._
