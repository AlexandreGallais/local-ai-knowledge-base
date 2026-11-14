---
title: "Uri class (part 2 of 7)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Uri.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Uri class (part 2 of 7)

## Uri.Uri(String, UriKind) constructor

```csharp
public Uri (string uriString, UriKind uriKind);
```

Initializes a new instance of the `Uri` class with the specified URI. This constructor allows you to specify if the URI string is a relative URI, absolute URI, or is indeterminate.

Parameters:

- `uriString`: A string that identifies the resource to be represented by the `Uri` instance.
- `uriKind`: Specifies whether the URI string is a relative URI, absolute URI, or is indeterminate.

Exceptions:

- `ArgumentException`: `uriKind` is invalid.
- `ArgumentNullException`: `uriString` is `null`.
- `UriFormatException`: `uriString` contains a relative URI and `uriKind` is `UriKind.Absolute`.

or

`uriString` contains an absolute URI and `uriKind` is `UriKind.Relative`.

or

`uriString` is empty.

-or-

The scheme specified in `uriString` is not correctly formed. See `Uri.CheckSchemeName`.

-or-

`uriString` contains too many slashes.

-or-

The password, host name, file name, or user name specified in `uriString` is not valid.

-or-

The host or authority name specified in `uriString` is terminated by backslashes.

-or-

The port number specified in `uriString` is not valid or cannot be parsed.

-or-

The length of `uriString` exceeds 65519 characters (.NET 9 and earlier versions only).

-or-

The length of the scheme specified in `uriString` exceeds 1023 characters.

-or-

There is an invalid character sequence in `uriString`.

-or-

The MS-DOS path specified in `uriString` doesn't start with c:\\\\.

#### Remarks

Relative and absolute URIs have different restrictions on their format. For example, a relative URI does not require a scheme or an authority. The value you specify in `uriKind` must match the type of URI passed in `uriString`. However, if `RelativeOrAbsolute` is specified, the URI string can be relative or absolute.

For `uriString`, an IPv6 address in string form must be enclosed within brackets, for example, "http://[2607:f8b0:400d:c06::69]".

## Uri.Uri(Uri, String) constructor

```csharp
public Uri (Uri baseUri, string? relativeUri);
```

Initializes a new instance of the `Uri` class based on the specified base URI and relative URI string.

Parameters:

- `baseUri`: The base URI.
- `relativeUri`: The relative URI to add to the base URI.

Exceptions:

- `ArgumentNullException`: `baseUri` is `null`.
- `ArgumentOutOfRangeException`: `baseUri` is not an absolute `Uri` instance.
- `UriFormatException`: The URI formed by combining `baseUri` and `relativeUri` is empty or contains only spaces.

-or-

The scheme specified in the URI formed by combining `baseUri` and `relativeUri` is not valid.

-or-

The URI formed by combining `baseUri` and `relativeUri` contains too many slashes.

-or-

The password, host name, file name, or user name specified in the URI formed by combining `baseUri` and `relativeUri` is not valid.

-or-

The host or authority name specified in the URI formed by combining `baseUri` and `relativeUri` is terminated by backslashes.

-or-

The port number specified in the URI formed by combining `baseUri` and `relativeUri` is not valid or cannot be parsed.

-or-

The length of the URI formed by combining `baseUri` and `relativeUri` exceeds 65519 characters (.NET 9 and earlier versions only).

-or-

The length of the scheme specified in the URI formed by combining `baseUri` and `relativeUri` exceeds 1023 characters.

-or-

There is an invalid character sequence in the URI formed by combining `baseUri` and `relativeUri`.

-or-

The MS-DOS path specified in `baseUri` doesn't start with c:\\\\.

#### Remarks

This constructor creates a `Uri` instance by combining the `baseUri` and the `relativeUri`. If `relativeUri` is an absolute URI (containing a scheme, host name, and optionally a port number), the `Uri` instance is created using only `relativeUri`.

If the `baseUri` has relative parts (like `/api`), then the relative part must be terminated with a slash, (like `/api/`), if the relative part of `baseUri` is to be preserved in the constructed `Uri`.

Additionally, if the `relativeUri` begins with a slash, then it will replace any relative part of the `baseUri`

This constructor does not ensure that the `Uri` refers to an accessible resource.

#### Examples

The following example creates a new instance of the `Uri` class by combining the relative URIs `http://www.contoso.com` and `catalog/shownew.htm` to form the absolute URI `http://www.contoso.com/catalog/shownew.htm`.

_Code sample not included: ~/snippets/csharp/System/Uri/.ctor/source2.cs._

## Uri.Uri(Uri, Uri) constructor

```csharp
public Uri (Uri baseUri, Uri relativeUri);
```

Initializes a new instance of the `Uri` class based on the combination of a specified base `Uri` instance and a relative `Uri` instance.

Parameters:

- `baseUri`: An absolute `Uri` that is the base for the new `Uri` instance.
- `relativeUri`: A relative `Uri` instance that is combined with `baseUri`.

Exceptions:

- `ArgumentException`: `baseUri` is not an absolute `Uri` instance.
- `ArgumentNullException`: `baseUri` is `null`.
- `ArgumentOutOfRangeException`: `baseUri` is not an absolute `Uri` instance.
- `UriFormatException`: The URI formed by combining `baseUri` and `relativeUri` is empty or contains only spaces.

-or-

The scheme specified in the URI formed by combining `baseUri` and `relativeUri` is not valid.

-or-

The URI formed by combining `baseUri` and `relativeUri` contains too many slashes.

-or-

The password, host name, file name, or user name specified in the URI formed by combining `baseUri` and `relativeUri` is not valid.

-or-

The host or authority name specified in the URI formed by combining `baseUri` and `relativeUri` is terminated by backslashes.

-or-

The port number specified in the URI formed by combining `baseUri` and `relativeUri` is not valid or cannot be parsed.

-or-

The length of the URI formed by combining `baseUri` and `relativeUri` exceeds 65519 characters (.NET 9 and earlier versions only).

-or-

The length of the scheme specified in the URI formed by combining `baseUri` and `relativeUri` exceeds 1023 characters.

-or-

There is an invalid character sequence in the URI formed by combining `baseUri` and `relativeUri`.

-or-

The MS-DOS path specified in `baseUri` doesn't start with c:\\\\.

#### Remarks

This constructor creates a new `Uri` instance by combining an absolute `Uri` instance, `baseUri`, with a relative `Uri` instance, `relativeUri`. If `relativeUri` is an absolute `Uri` instance (containing a scheme, host name, and optionally a port number), the `Uri` instance is created using only `relativeUri`.

If the `baseUri` has relative parts (like `/api`), then the relative part must be terminated with a slash, (like `/api/`), if the relative part of `baseUri` is to be preserved in the constructed `Uri`.

Additionally, if the `relativeUri` begins with a slash, then it will replace any relative part of the `baseUri`.

This constructor does not ensure that the `Uri` refers to an accessible resource.

#### Examples

This example creates an absolute `Uri` instance, `absoluteUri`, and a relative `Uri` instance, `relativeUri`. A new `Uri` instance, `combinedUri`, is then created from these two instances.

_Code sample not included: ~/snippets/csharp/System/Uri/.ctor/nclurienhancements.cs._

## Uri.Uri(Uri, String, Boolean) constructor

```csharp
public Uri (Uri baseUri, string? relativeUri, bool dontEscape);
```

Initializes a new instance of the `Uri` class based on the specified base and relative URIs, with explicit control of character escaping.

Parameters:

- `baseUri`: The base URI.
- `relativeUri`: The relative URI to add to the base URI.
- `dontEscape`: `true` if `baseUri` and `relativeUri` are completely escaped; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `baseUri` is `null`.
- `ArgumentOutOfRangeException`: `baseUri` is not an absolute `Uri` instance.
- `UriFormatException`: The URI formed by combining `baseUri` and `relativeUri` is empty or contains only spaces.

-or-

The scheme specified in the URI formed by combining `baseUri` and `relativeUri` is not valid.

-or-

The URI formed by combining `baseUri` and `relativeUri` contains too many slashes.

-or-

The password, host name, file name, or user name specified in the URI formed by combining `baseUri` and `relativeUri` is not valid.

-or-

The host or authority name specified in the URI formed by combining `baseUri` and `relativeUri` is terminated by backslashes.

-or-

The port number specified in the URI formed by combining `baseUri` and `relativeUri` is not valid or cannot be parsed.

-or-

The length of the URI formed by combining `baseUri` and `relativeUri` exceeds 65519 characters (.NET 9 and earlier versions only).

-or-

The length of the scheme specified in the URI formed by combining `baseUri` and `relativeUri` exceeds 1023 characters.

-or-

There is an invalid character sequence in the URI formed by combining `baseUri` and `relativeUri`.

-or-

The MS-DOS path specified in `baseUri` doesn't start with c:\\\\.

To be added.

## Uri.AbsolutePath property

```csharp
public string AbsolutePath { get; }
```

Gets the absolute path of the URI.

Returns: The absolute path to the resource.

Exceptions:

- `InvalidOperationException`: This instance represents a relative URI, and this property is valid only for absolute URIs.

#### Remarks
The `AbsolutePath` property contains the path information that the server uses to resolve requests for information. Typically this is the path to the desired information on the server's file system, although it also can indicate the application or script the server must run to provide the information.

The path information does not include the scheme, host name, or query portion of the URI.

#### Examples
The following example writes the path `/catalog/shownew.htm` to the console.

_Code sample not included: ~/snippets/csharp/System/Uri/AbsolutePath/source.cs._

## Uri.AbsoluteUri property

```csharp
public string AbsoluteUri { get; }
```

Gets the absolute URI.

Returns: The entire URI.

Exceptions:

- `InvalidOperationException`: This instance represents a relative URI, and this property is valid only for absolute URIs.

#### Remarks
The `AbsoluteUri` property includes the entire URI stored in the `Uri` instance, including all fragments and query strings.

#### Examples
The following example writes the complete contents of the `Uri` instance to the console. In the example shown, `http://www.contoso.com/catalog/shownew.htm?date=today` is written to the console.

_Code sample not included: ~/snippets/csharp/System/Uri/AbsoluteUri/source.cs._

## Uri.Authority property

```csharp
public string Authority { get; }
```

Gets the Domain Name System (DNS) host name or IP address and the port number for a server.

Returns: The authority component of the URI represented by this instance.

Exceptions:

- `InvalidOperationException`: This instance represents a relative URI, and this property is valid only for absolute URIs.

#### Remarks
The `Authority` property is typically a server DNS host name or IP address. This property might include the service port number if it differs from the default port for the URI. If the `Uri.Authority` component contains reserved characters, these are escaped in the string value returned by this property.

#### Examples
The following example writes the host name (`www.contoso.com`) and port number (8080) of the server to the console.

_Code sample not included: ~/snippets/csharp/System/Uri/Authority/source.cs._

## Uri.DnsSafeHost property

```csharp
public string DnsSafeHost { get; }
```

Gets a host name that, after being unescaped if necessary, is safe to use for DNS resolution.

Returns: The host part of the URI in a format suitable for DNS resolution; or the original host string, if it is already suitable for resolution.

Exceptions:

- `InvalidOperationException`: This instance represents a relative URI, and this property is valid only for absolute URIs.

#### Remarks
For IPv6 addresses, the brackets ([]) are removed and the `ScopeId` property is set, if one was specified when this instance was constructed.

`Uri.DnsSafeHost` is a legacy property whose behavior depends on configuration settings in .NET Framework apps. For new code, prefer `Uri.IdnHost`, which is configuration-independent and produces a value suitable for DNS resolution. See `Uri.Host` and `Uri.IdnHost` for guidance on choosing a host property.

If you used an escaped string to construct this instance (for example, `"http://[fe80::200:39ff:fe36:1a2d%254]/temp/example.htm"`), then DnsSafeHost returns an escaped string. Unescape any escaped string returned from `DnsSafeHost` before using that string for DNS resolution (see the Example). If you used an invalid unescaped string to construct this instance (for example, "http://[fe80::200:39ff:fe36:1a2d%4]/temp/example.htm"), then DnsSafeHost returns an unescaped string.

#### Examples
The following example creates a `Uri` instance from a string. It illustrates the difference between the value returned from `Uri.Host`, which returns the host name or address specified in the URI, and the value returned from `Uri.DnsSafeHost`, which returns an address that is safe to use in DNS resolution.

_Code sample not included: ~/snippets/csharp/System/Uri/.ctor/nclurienhancements.cs._

As explained in Remarks, unescape the host name before resolving it. You can use the `Uri.UnescapeDataString` method to unescape the host name, and you can resolve it by calling the `Dns.GetHostEntry` method.

## Uri.Fragment property

```csharp
public string Fragment { get; }
```

Gets the escaped URI fragment, including the leading '#' character if not empty.

Returns: URI fragment information.

Exceptions:

- `InvalidOperationException`: This instance represents a relative URI, and this property is valid only for absolute URIs.

#### Remarks
The `Fragment` property gets any text following a fragment marker (#) in the URI, including the fragment marker itself. Given the URI `http://www.contoso.com/index.htm#main`, the `Fragment` property would return #main.

The `Fragment` property is not considered in any `Uri.Equals` comparison.

> **Note:**
> The property includes the leading delimiter (`#`), whereas the URI specification (RFC 3986) recognizes the fragment as the portion of a URI without the delimiter.

#### Examples
The following example creates a `Uri` instance and writes the fragment information to the console.

_Code sample not included: ~/snippets/csharp/System/Uri/CheckSchemeName/uriexamples.cs._
