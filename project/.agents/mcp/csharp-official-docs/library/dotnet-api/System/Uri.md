---
title: "Uri class (part 1 of 7)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Uri.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Uri class

Namespace: `System`

```csharp
public class Uri : IEquatable<Uri>, ISpanFormattable, System.Runtime.Serialization.ISerializable
```

Provides an object representation of a uniform resource identifier (URI) and easy access to the parts of the URI.

A uniform resource identifier (URI) is a compact representation of a resource available to your application on the intranet or internet. The `Uri` class defines the properties and methods for handling URIs, including parsing, comparing, and combining. The `Uri` class properties are read-only; to create a modifiable object, use the `UriBuilder` class.

Relative URIs (for example, "/new/index.htm") must be expanded with respect to a base URI so that they are absolute. The `Uri.MakeRelativeUri` method is provided to convert absolute URIs to relative URIs when necessary.

The `Uri` constructors do not escape URI strings if the string is a well-formed URI including a scheme identifier.

The `Uri` properties return a canonical data representation in escaped encoding, with all characters with Unicode values greater than 127 replaced with their hexadecimal equivalents. To put the URI in canonical form, the `Uri` constructor performs the following steps:

- Converts the URI scheme to lowercase.
- Converts the host name to lowercase.
- If the host name is an IPv6 address, the canonical IPv6 address is used. ScopeId and other optional IPv6 data are removed.
- Removes default and empty port numbers.
- Converts implicit file paths without the file:// scheme (for example, "C:\my\file") to explicit file paths with the file:// scheme.
- Escaped characters (also known as percent-encoded octets) that don't have a reserved purpose are decoded (also known as being unescaped). These unreserved characters include uppercase and lowercase letters (%41-%5A and %61-%7A), decimal digits (%30-%39), hyphen (%2D), period (%2E), underscore (%5F), and tilde (%7E).
- Canonicalizes the path for hierarchical URIs by compacting sequences such as `/./` and `/../` (whether or not the sequence is escaped). Note that there are some schemes for which these sequences are not compacted.
- For hierarchical URIs, if the host is not terminated with a forward slash (/), one is added.
- By default, any reserved characters in the URI are escaped in accordance with RFC 2396. This behavior changes if International Resource Identifiers or International Domain Name parsing is enabled in which case reserved characters in the URI are escaped in accordance with RFC 3986 and RFC 3987.

As part of canonicalization in the constructor for some schemes, dot-segments (`/./` and `/../`) are compacted (in other words, they're removed). The schemes for which `Uri` compacts segments include http, https, tcp, net.pipe, and net.tcp. For some other schemes, these sequences are not compacted. The following code snippet shows how compacting looks in practice. The escaped sequences are unescaped, if necessary, and then compacted.

```csharp
var uri = new Uri("http://myUrl/../.."); // http scheme, unescaped
OR
var uri = new Uri("http://myUrl/%2E%2E/%2E%2E"); // http scheme, escaped
OR
var uri = new Uri("ftp://myUrl/../.."); // ftp scheme, unescaped
OR
var uri = new Uri("ftp://myUrl/%2E%2E/%2E%2E"); // ftp scheme, escaped

Console.WriteLine($"AbsoluteUri: {uri.AbsoluteUri}");
Console.WriteLine($"PathAndQuery: {uri.PathAndQuery}");
```

When this code executes, it returns output similar to the following text.

```output
AbsoluteUri: http://myurl/
PathAndQuery: /
```

You can transform the contents of the `Uri` class from an escape encoded URI reference to a readable URI reference by using the `Uri.ToString` method. Note that some reserved characters might still be escaped in the output of the `Uri.ToString` method. This is to support unambiguous reconstruction of a URI from the value returned by `Uri.ToString`.

Some URIs include a fragment identifier or a query or both. A fragment identifier is any text that follows a number sign (#), not including the number sign; the fragment text is stored in the `Fragment` property. Query information is any text that follows a question mark (?) in the URI; the query text is stored in the `Query` property.

> **Note:**
> The URI class supports the use of IP addresses in both quad-notation for IPv4 protocol and colon-hexadecimal for IPv6 protocol. Remember to enclose the IPv6 address in square brackets, as in http://[::1].

#### International resource identifier support

Web addresses are typically expressed using URIs that consist of a very restricted set of characters:

- Upper and lower case ASCII letters from the English alphabet.
- Digits from 0 to 9.
- A small number of other ASCII symbols.

The specifications for URIs are documented in RFC 2396, RFC 2732, RFC 3986, and RFC 3987 published by the Internet Engineering Task Force (IETF).

Identifiers that facilitate the need to identify resources using languages other than English and allow non-ASCII characters (characters in the Unicode/ISO 10646 character set) are known as International Resource Identifiers (IRIs). The specifications for IRIs are documented in RFC 3987 published by IETF. Using IRIs allows a URL to contain Unicode characters. Normalization and character checking are done according to the latest IRI rules in RFC 3986 and RFC 3987.

IRI and IDN processing in the `Uri` class can be controlled using the `IriParsingElement`, `IdnElement`, and `UriSection` configuration setting classes. The `IriParsingElement` setting enables or disables IRI processing in the `Uri` class. The `IdnElement` setting enables or disables IDN processing in the `Uri` class.

The configuration setting for the `IriParsingElement` and `IdnElement` are read once when the first `Uri` class is constructed. Changes to configuration settings after that time are ignored.

The `GenericUriParser` class has also been extended to allow creating a customizable parser that supports IRI and IDN. The behavior of a `GenericUriParser` object is specified by passing a bitwise combination of the values available in the `GenericUriParserOptions` enumeration to the `GenericUriParser` constructor. The `IriParsing` type indicates the parser supports the parsing rules specified in RFC 3987 for International Resource Identifiers (IRI).

The `Idn` type indicates that the parser supports Internationalized Domain Name (IDN) parsing of host names. In .NET (Core) and .NET Framework 4.5+, IDN is always used. In previous versions, a configuration option determines whether IDN is used.

#### Implicit file path support

`Uri` can also be used to represent local file system paths. These paths can be represented *explicitly* in URIs that begin with the file:// scheme, and *implicitly* in URIs that do not have the file:// scheme. As a concrete example, the following two URIs are both valid, and represent the same file path:

```csharp
Uri uri1 = new Uri("C:/test/path/file.txt") // Implicit file path.
Uri uri2 = new Uri("file:///C:/test/path/file.txt") // Explicit file path.
```

These implicit file paths are not compliant with the URI specification and should be avoided when possible. When using .NET on Unix-based systems, implicit file paths can be especially problematic, because an absolute implicit file path is *indistinguishable* from a relative path. When such ambiguity is present, `Uri` defaults to interpreting the path as an absolute URI.

#### Security considerations

Because of security concerns, your application should use caution when accepting `Uri` instances from untrusted sources and with `dontEscape` set to `true` in the constructor). You can check a URI string for validity by calling the `Uri.IsWellFormedOriginalString` method.

When dealing with untrusted user input, confirm assumptions about the newly created `Uri` instance before trusting its properties.
This can be done in the following way:

```csharp
string userInput = ...;

Uri baseUri = new Uri("https://myWebsite/files/");

if (!Uri.TryCreate(baseUri, userInput, out Uri newUri))
{
    // Fail: invalid input.
}

if (!baseUri.IsBaseOf(newUri))
{
    // Fail: the Uri base has been modified - the created Uri is not rooted in the original directory.
}
```

This validation can be used in other cases, like when dealing with UNC paths, by simply changing the `baseUri`:

```csharp
Uri baseUri = new Uri(@"\\host\share\some\directory\name\");
```

For more details about the design and security considerations of `Uri` and `UriBuilder`, review the following threat model documents:

- System.Uri threat model
- System.UriBuilder threat model

#### Performance considerations

If you use a *Web.config* file that contains URIs to initialize your application, additional time is required to process the URIs if their scheme identifiers are nonstandard. In such a case, initialize the affected parts of your application when the URIs are needed, not at start time.

The following example creates an instance of the `Uri` class and uses it to perform a GET request with `HttpClient`.

_Code sample not included: ~/snippets/csharp/System/Uri/Overview/source.cs._

The following code snippet shows example values of the various properties on the class.

_Code sample not included: ~/snippets/csharp/System/Uri/Overview/source.cs._

## Uri.Uri(String) constructor

```csharp
public Uri (string uriString);
```

Initializes a new instance of the `Uri` class with the specified URI.

Parameters:

- `uriString`: A string that identifies the resource to be represented by the `Uri` instance.

Exceptions:

- `ArgumentNullException`: `uriString` is `null`.
- `UriFormatException`: `uriString` is empty.

-or-

The scheme specified in `uriString` is not correctly formed. See `Uri.CheckSchemeName`.

-or-

`uriString` contains too many slashes.

-or-

The password, host name, file name, or user name specified in `uriString` is not valid.

-or-

The host or authority name specified in `uriString` is terminated by backslashes.

-or-

The port number specified in `uriString` is not valid or can't be parsed.

-or-

The length of `uriString` exceeds 65519 characters (.NET 9 and earlier versions only).

-or-

The length of the scheme specified in `uriString` exceeds 1023 characters.

-or-

There's an invalid character sequence in `uriString`.

-or-

The MS-DOS path specified in `uriString` doesn't start with c:\\\\.

#### Remarks

This constructor creates a `Uri` instance from a URI string. It parses the URI, puts it in canonical format, and makes any required escape encodings.

This constructor does not ensure that the `Uri` refers to an accessible resource.

If the `uriString` represents an IPv6 address, it must be enclosed within brackets, for example, "http://[2607:f8b0:400d:c06::69]".

This constructor assumes that the `string` parameter references an absolute URI and is equivalent to calling the `Uri.%23ctor` constructor with `UriKind` set to `Absolute`. If the `string` parameter passed to the constructor is a relative URI, this constructor throws a `UriFormatException`.

#### Examples

The following example creates a `Uri` instance with the URI `http://www.contoso.com/`.

_Code sample not included: ~/snippets/csharp/System/Uri/.ctor/source.cs._

## Uri.Uri(SerializationInfo, StreamingContext) constructor

```csharp
protected Uri (System.Runtime.Serialization.SerializationInfo serializationInfo, System.Runtime.Serialization.StreamingContext streamingContext);
```

Initializes a new instance of the `Uri` class from the specified instances of the `SerializationInfo` and `StreamingContext` classes.

Parameters:

- `serializationInfo`: The information required to serialize the new `Uri` instance.
- `streamingContext`: The source of the serialized stream associated with the new `Uri` instance.

Exceptions:

- `ArgumentNullException`: The `serializationInfo` parameter contains a `null` URI.
- `UriFormatException`: The `serializationInfo` parameter contains a URI that is empty.

-or-

The scheme specified is not correctly formed. See `Uri.CheckSchemeName`.

-or-

The URI contains too many slashes.

-or-

The password, host name, file name, or user name specified in the URI is not valid.

-or-

The host or authority name specified in the URI is terminated by backslashes.

-or-

The port number specified in the URI is not valid or can't be parsed.

-or-

The length of URI exceeds 65519 characters (.NET 9 and earlier versions only).

-or-

The length of the scheme specified in the URI exceeds 1023 characters.

-or-

There is an invalid character sequence in the URI.

-or-

The MS-DOS path specified in the URI doesn't start with c:\\\\.

To be added.

## Uri.Uri(String, Boolean) constructor

```csharp
public Uri (string uriString, bool dontEscape);
```

Initializes a new instance of the `Uri` class with the specified URI, with explicit control of character escaping.

Parameters:

- `uriString`: A string that identifies the resource to be represented by the `Uri` instance. Note that an IPv6 address in string form must be enclosed within brackets. For example, "http://[2607:f8b0:400d:c06::69]".
- `dontEscape`: `true` if `uriString` is completely escaped; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `uriString` is `null`.
- `UriFormatException`: `uriString` is empty or contains only spaces.

-or-

The scheme specified in `uriString` is not valid.

-or-

`uriString` contains too many slashes.

-or-

The password, host name, file name, or user name specified in `uriString` is not valid.

-or-

The host or authority name specified in `uriString` is terminated by backslashes.

-or-

The port number specified in `uriString` is not valid or can't be parsed.

-or-

The length of `uriString` exceeds 65519 characters (.NET 9 and earlier versions only).

-or-

The length of the scheme specified in `uriString` exceeds 1023 characters.

-or-

There is an invalid character sequence in `uriString`.

-or-

The MS-DOS path specified in `uriString` doesn't start with c:\\\\.

To be added.

## Uri.Uri(String, UriCreationOptions) constructor

```csharp
public Uri (string uriString, in UriCreationOptions creationOptions);
```

Initializes a new instance of the `Uri` class with the specified URI and additional `UriCreationOptions`.

Parameters:

- `uriString`: A string that identifies the resource to be represented by the `Uri` instance.
- `creationOptions`: Options that control how the `Uri` is created and behaves.

To be added.
