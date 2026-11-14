---
title: "Uri class (part 3 of 7)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Uri.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Uri class (part 3 of 7)

## Uri.Host property

```csharp
public string Host { get; }
```

Gets the host component of this instance.

Returns: The host name. This is usually the DNS host name or IP address of the server.

Exceptions:

- `InvalidOperationException`: This instance represents a relative URI, and this property is valid only for absolute URIs.

#### Remarks
Unlike the `Authority` property, this property value does not include the port number.

The value returned by this property depends on the host type:

- For **DNS host names** (including international domain names): Returns the escaped input. Non-ASCII characters are returned as-is and aren't punycode encoded.
- For **IPv6 addresses**: Returns the address enclosed in square brackets (for example, `[::1]`), but doesn't include the zone ID (scope) even if one was specified in the original URI.
- For **IPv4 addresses**: Returns the dotted-decimal notation (for example, `192.168.1.1`).

For DNS resolution or other lower-level networking scenarios, use `Uri.IdnHost` instead, which returns a punycode-encoded form for valid international domain names and includes the zone ID (without brackets) for IPv6 addresses. Use `Uri.Host` when you want the host as it appears in the URI (for example, for display or comparison).

#### Examples
The following example writes the host name (`www.contoso.com`) of the server to the console.

_Code sample not included: ~/snippets/csharp/System/Uri/Host/source.cs._

The following example shows how `Uri.Host` and `Uri.IdnHost` differ across DNS, IDN, IPv4, and IPv6 inputs:

_Code sample not included: ~/snippets/csharp/System/Uri/HostComparison/source.cs._
## Uri.HostNameType property

```csharp
public UriHostNameType HostNameType { get; }
```

Gets the type of the host name specified in the URI.

Returns: A member of the `UriHostNameType` enumeration.

Exceptions:

- `InvalidOperationException`: This instance represents a relative URI, and this property is valid only for absolute URIs.

#### Examples
The following example creates a `Uri` instance and writes the `Uri.HostNameType` to the console.

_Code sample not included: ~/snippets/csharp/System/Uri/CheckSchemeName/uriexamples.cs._

## Uri.IdnHost property

```csharp
public string IdnHost { get; }
```

Gets the RFC 3490 compliant International Domain Name of the host, using Punycode as appropriate. This string, after being unescaped if necessary, is safe to use for DNS resolution.

Returns: The hostname, formatted with Punycode according to the IDN standard.

Exceptions:

- `InvalidOperationException`: This instance represents a relative URI, and this property is valid only for absolute URIs.

#### Remarks
This property is provided for the use of lower-level networking protocols that require the domain name in Punycode form. If your code does not require that specific format, use `Uri.Host` for the hostname.

The value returned by this property depends on the host type:

- For **DNS host names**: For valid international domain names, non-ASCII characters are punycode encoded (for example, `münchen.de` becomes `xn--mnchen-3ya.de`). Hostnames that aren't valid IDNs might be returned as-is and include non-ASCII characters.
- For **IPv6 addresses**: Returns the address without the surrounding brackets, and includes the zone ID (scope) if one was specified (for example, `::1` or `fe80::1%18`).
- For **IPv4 addresses**: Returns the dotted-decimal notation (for example, `192.168.1.1`).

`Uri.IdnHost` is the preferred alternative to the legacy `Uri.DnsSafeHost` property, because its behavior doesn't depend on *app.config* settings and it's designed to produce a value suitable for DNS resolution. Note that for IPv6 results that include a zone ID, callers might still need to strip the zone ID before passing the value to APIs that don't accept it.

If you used an escaped string to construct this instance (for example, `"http://[fe80::200:39ff:fe36:1a2d%254]/temp/example.htm"`), then IdnHost returns an escaped string. You should unescape any escaped string returned from IdnHost before using that string for DNS resolution. Be aware that if you used an invalid unescaped string to construct this instance (for example, "http://[fe80::200:39ff:fe36:1a2d%4]/temp/example.htm"), then IdnHost returns an unescaped string.

#### Examples
The following example shows how `Uri.Host` and `Uri.IdnHost` differ across DNS, IDN, IPv4, and IPv6 inputs:

_Code sample not included: ~/snippets/csharp/System/Uri/HostComparison/source.cs._
## Uri.IsAbsoluteUri property

```csharp
public bool IsAbsoluteUri { get; }
```

Gets a value that indicates whether the `Uri` instance is absolute.

Returns: `true` if the `Uri` instance is absolute; otherwise, `false`.

#### Remarks
This property is `true` if the string or `Uri` instance that was passed into the constructor can be parsed as an absolute `Uri` instance, which contains a scheme, an authority, and a path. Otherwise, the `Uri` instance is treated as relative and might omit the scheme or other URI components.

## Uri.IsDefaultPort property

```csharp
public bool IsDefaultPort { get; }
```

Gets a value that indicates whether the port value of the URI is the default for this scheme.

Returns: `true` if the value in the `Uri.Port` property is the default port for this scheme; otherwise, `false`.

Exceptions:

- `InvalidOperationException`: This instance represents a relative URI, and this property is valid only for absolute URIs.

#### Examples
The following example creates a `Uri` instance and checks whether it uses the default port.

_Code sample not included: ~/snippets/csharp/System/Uri/CheckSchemeName/uriexamples.cs._

## Uri.IsFile property

```csharp
public bool IsFile { get; }
```

Gets a value that indicates whether the specified `Uri` is a file URI.

Returns: `true` if the `Uri` is a file URI; otherwise, `false`.

Exceptions:

- `InvalidOperationException`: This instance represents a relative URI, and this property is valid only for absolute URIs.

#### Remarks
The `IsFile` property is `true` when the `Scheme` property equals `UriSchemeFile`.

#### Examples
The following example creates a `Uri` instance and determines whether it is a file URI.

_Code sample not included: ~/snippets/csharp/System/Uri/CheckSchemeName/uriexamples.cs._

## Uri.IsLoopback property

```csharp
public bool IsLoopback { get; }
```

Gets a value that indicates whether the specified `Uri` references the local host.

Returns: `true` if this `Uri` references the local host; otherwise, `false`.

Exceptions:

- `InvalidOperationException`: This instance represents a relative URI, and this property is valid only for absolute URIs.

#### Remarks
`Uri.IsLoopback` returns `true` if the URI specified when this instance was created was 127.0.0.1, loopback, or localhost, or if the URI did not specify host information (for example, file:///c:Dir/file.txt). All other URIs return `false`.

> **Warning:**
> This property alone doesn't guarantee that a request avoids local resources. A host can resolve to a loopback or private IP address even when this property returns `false`. Use other mitigations to protect against server-side request forgery (SSRF).

#### Examples
The following example creates a `Uri` instance and determines whether it references a local host.

_Code sample not included: ~/snippets/csharp/System/Uri/CheckSchemeName/uriexamples.cs._

## Uri.IsUnc property

```csharp
public bool IsUnc { get; }
```

Gets a value that indicates whether the specified `Uri` is a universal naming convention (UNC) path.

Returns: `true` if the `Uri` is a UNC path; otherwise, `false`.

Exceptions:

- `InvalidOperationException`: This instance represents a relative URI, and this property is valid only for absolute URIs.

#### Remarks
The `IsUnc` property is `true` if the specified `Uri` instance is a UNC path (such as `\\server\folder`, //server, or `file://server/folder`). This property always returns `true` if the URI has the file:// scheme and specifies a host component.

#### Examples
The following example creates a `Uri` instance and determines whether it is a UNC path.

_Code sample not included: ~/snippets/csharp/System/Uri/CheckSchemeName/uriexamples.cs._

## Uri.LocalPath property

```csharp
public string LocalPath { get; }
```

Gets a local operating-system representation of a file name.

Returns: The local operating-system representation of a file name.

Exceptions:

- `InvalidOperationException`: This instance represents a relative URI, and this property is valid only for absolute URIs.

#### Remarks
The value returned by this property is unescaped. If the path is recognized as a Windows file path, all forward slashes (/) are replaced by backward slashes (\\).

For the URI `file://computer/file.ext`, the absolute path is `/file.ext` and the local path is `\\computer\file.ext`.

#### Examples
The following example creates a `Uri` instance and writes the local path to the console.

_Code sample not included: ~/snippets/csharp/System/Uri/CheckSchemeName/uriexamples.cs._

## Uri.OriginalString property

```csharp
public string OriginalString { get; }
```

Gets the original URI string that was passed to the `Uri` constructor.

Returns: The exact URI specified when this instance was constructed; otherwise, `String.Empty`.

#### Remarks
If the URI specified to the constructor contained leading or trailing spaces, these spaces are preserved.

The value returned by this property differs from `Uri.ToString` and `Uri.AbsoluteUri`. `Uri.ToString` returns the canonically unescaped form of the URI. `Uri.AbsoluteUri` returns the canonically escaped form of the URI.

When International Resource Identifier (IRI) and Internationalized Domain Name (IDN) support are enabled, `Uri.OriginalString` returns the original non normalized string with Punycode host name if one was used to initialize the `Uri` instance. Punycode names contain only ASCII characters and always start with the xn-- prefix.

For more information on IRI support, see the Remarks section for the `Uri` class.

When a `Uri` object is serialized, the `Uri.OriginalString` is not preserved. The serialization process uses the fully escaped and canonicalized `AbsoluteUri` property when serializing. For a `Uri` that contains an IPv6 address, the IPv6 address and the scope ID are included in the serialized `Uri` object.

#### Examples
The following example creates a new `Uri` instance from a string. It illustrates the difference between the value returned from `Uri.OriginalString`, which returns the string that was passed to the constructor, and from a call to `Uri.ToString`, which returns the canonical form of the string.

_Code sample not included: ~/snippets/csharp/System/Uri/.ctor/nclurienhancements.cs._

## Uri.PathAndQuery property

```csharp
public string PathAndQuery { get; }
```

Gets the `Uri.AbsolutePath` and `Uri.Query` properties separated by a question mark (?).

Returns: The `Uri.AbsolutePath` and `Uri.Query` properties separated by a question mark (?).

Exceptions:

- `InvalidOperationException`: This instance represents a relative URI, and this property is valid only for absolute URIs.

#### Remarks
The `PathAndQuery` property contains the absolute path on the server and the query information sent with the request. It is identical to concatenating the `Uri.AbsolutePath` and `Uri.Query` properties.

The `PathAndQuery` property is escaped according to RFC 2396 by default. If International Resource Identifiers (IRIs) or Internationalized Domain Name (IDN) parsing is enabled, the `PathAndQuery` property is escaped according to RFC 3986 and RFC 3987.

For more information on IRI support, see the Remarks section for the `Uri` class.

#### Examples
The following example writes the URI path (`/catalog/shownew.htm`) and query (`?date=today`) information to the console.

_Code sample not included: ~/snippets/csharp/System/Uri/PathAndQuery/source.cs._

## Uri.Port property

```csharp
public int Port { get; }
```

Gets the port number of this URI.

Returns: The port number for this URI.

Exceptions:

- `InvalidOperationException`: This instance represents a relative URI, and this property is valid only for absolute URIs.

#### Remarks
The port number defines the protocol port used for contacting the server referenced in the URI. If a port is not specified as part of the URI, the `Port` property returns the default value for the protocol. If there is no default port number, this property returns -1.

#### Examples
The following example writes the URI port number to the console. In this case, the value is the default port number for HTTP, port 80.

_Code sample not included: ~/snippets/csharp/System/Uri/Port/source.cs._

## Uri.Query property

```csharp
public string Query { get; }
```

Gets any query information included in the specified URI, including the leading '?' character if not empty.

Returns: Any query information included in the specified URI.

Exceptions:

- `InvalidOperationException`: This instance represents a relative URI, and this property is valid only for absolute URIs.

#### Remarks
The `Query` property contains any query information included in the URI. Query information is separated from the path information by a question mark (?) and continues to the end of the URI. The query information returned includes the leading question mark.

The query information is escaped according to RFC 2396 by default. If International Resource Identifiers (IRIs) or Internationalized Domain Name (IDN) parsing is enabled, the query information is escaped according to RFC 3986 and RFC 3987.

For more information on IRI support, see the Remarks section for the `Uri` class.

> **Note:**
> The property includes the leading delimiter (`?`), whereas the URI specification (RFC 3986) recognizes the query as the portion of a URI without the delimiter.

#### Examples
The following example writes the query `?date=today` to the console.

_Code sample not included: ~/snippets/csharp/System/Uri/PathAndQuery/source.cs._
