---
title: "Uri class (part 7 of 7)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Uri.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Uri class (part 7 of 7)

## Uri.UnescapeDataString(String) method

```csharp
public static string UnescapeDataString (string stringToUnescape);
```

Converts a string to its unescaped representation.

Parameters:

- `stringToUnescape`: The string to unescape.

Returns: The unescaped representation of `stringToUnescape`.

Exceptions:

- `ArgumentNullException`: `stringToUnescape` is `null`.

#### Remarks
You should use this method with care. Unescaping a string that has been previously unescaped can lead to ambiguities and errors.

Many Web browsers escape spaces inside of URIs into plus ("+") characters; however, the UnescapeDataString method does not convert plus characters into spaces because this behavior is not standard across all URI schemes.

#### Examples
The following code example unescapes a URI, and then converts any plus characters ("+") into spaces.

_Code sample not included: ~/snippets/csharp/System/Uri/CheckSchemeName/uriexamples.cs._

## Uri.SchemeDelimiter field

```csharp
public static readonly string SchemeDelimiter;
```

Specifies the characters that separate the communication protocol scheme from the address portion of the URI. This field is read-only.

#### Examples
The following example creates a string from `UriSchemeHttp`, `SchemeDelimiter`, and an address. A `Uri` instance is then created from the string.

_Code sample not included: ~/snippets/csharp/System/Uri/CheckSchemeName/uriexamples.cs._

## Uri.UriSchemeData field

```csharp
public static readonly string UriSchemeData;
```

To be added.

To be added.

## Uri.UriSchemeFile field

```csharp
public static readonly string UriSchemeFile;
```

Specifies that the URI is a pointer to a file. This field is read-only.

#### Examples
The following example creates a `Uri` instance and determines whether the scheme is `UriSchemeFile`.

_Code sample not included: ~/snippets/csharp/System/Uri/CheckSchemeName/uriexamples.cs._

## Uri.UriSchemeFtp field

```csharp
public static readonly string UriSchemeFtp;
```

Specifies that the URI is accessed through the File Transfer Protocol (FTP). This field is read-only.

#### Examples
The following example creates a `Uri` instance and determines whether the scheme is `UriSchemeFtp`.

_Code sample not included: ~/snippets/csharp/System/Uri/CheckSchemeName/uriexamples.cs._

## Uri.UriSchemeFtps field

```csharp
public static readonly string UriSchemeFtps;
```

Specifies that the URI is accessed through the File Transfer Protocol Secure (FTPS). This field is read-only.

To be added.

## Uri.UriSchemeGopher field

```csharp
public static readonly string UriSchemeGopher;
```

Specifies that the URI is accessed through the Gopher protocol. This field is read-only.

#### Examples
The following example creates a `Uri` instance and determines whether the scheme is `UriSchemeGopher`.

_Code sample not included: ~/snippets/csharp/System/Uri/CheckSchemeName/uriexamples.cs._

## Uri.UriSchemeHttp field

```csharp
public static readonly string UriSchemeHttp;
```

Specifies that the URI is accessed through the Hypertext Transfer Protocol (HTTP). This field is read-only.

#### Examples
The following example creates a `Uri` instance and determines whether the scheme is `UriSchemeHttp`.

_Code sample not included: ~/snippets/csharp/System/Uri/CheckSchemeName/uriexamples.cs._

## Uri.UriSchemeHttps field

```csharp
public static readonly string UriSchemeHttps;
```

Specifies that the URI is accessed through the Secure Hypertext Transfer Protocol (HTTPS). This field is read-only.

#### Examples
The following example creates a `Uri` instance and determines whether the scheme is `UriSchemeHttps`.

_Code sample not included: ~/snippets/csharp/System/Uri/CheckSchemeName/uriexamples.cs._

## Uri.UriSchemeMailto field

```csharp
public static readonly string UriSchemeMailto;
```

Specifies that the URI is an email address and is accessed through the Simple Mail Transport Protocol (SMTP). This field is read-only.

#### Examples
The following example creates a `Uri` instance and determines whether the scheme is `UriSchemeMailto`.

_Code sample not included: ~/snippets/csharp/System/Uri/CheckSchemeName/uriexamples.cs._

## Uri.UriSchemeNetPipe field

```csharp
public static readonly string UriSchemeNetPipe;
```

Specifies that the URI is accessed through the NetPipe scheme used by Windows Communication Foundation (WCF). This field is read-only.

To be added.

## Uri.UriSchemeNetTcp field

```csharp
public static readonly string UriSchemeNetTcp;
```

Specifies that the URI is accessed through the NetTcp scheme used by Windows Communication Foundation (WCF). This field is read-only.

To be added.

## Uri.UriSchemeNews field

```csharp
public static readonly string UriSchemeNews;
```

Specifies that the URI is an Internet news group and is accessed through the Network News Transport Protocol (NNTP). This field is read-only.

#### Examples
The following example creates a `Uri` instance and determines whether the scheme is `UriSchemeNews`.

_Code sample not included: ~/snippets/csharp/System/Uri/CheckSchemeName/uriexamples.cs._

## Uri.UriSchemeNntp field

```csharp
public static readonly string UriSchemeNntp;
```

Specifies that the URI is an Internet news group and is accessed through the Network News Transport Protocol (NNTP). This field is read-only.

#### Examples
The following example creates a `Uri` instance and determines whether the scheme is `UriSchemeNntp`.

_Code sample not included: ~/snippets/csharp/System/Uri/CheckSchemeName/uriexamples.cs._

## Uri.UriSchemeSftp field

```csharp
public static readonly string UriSchemeSftp;
```

Specifies that the URI is accessed through the SSH File Transfer Protocol (SFTP). This field is read-only.

To be added.

## Uri.UriSchemeSsh field

```csharp
public static readonly string UriSchemeSsh;
```

Specifies that the URI is accessed through the Secure Socket Shell protocol (SSH). This field is read-only.

To be added.

## Uri.UriSchemeTelnet field

```csharp
public static readonly string UriSchemeTelnet;
```

Specifies that the URI is accessed through the Telnet protocol. This field is read-only.

To be added.

## Uri.UriSchemeWs field

```csharp
public static readonly string UriSchemeWs;
```

Specifies that the URI is accessed through the WebSocket protocol (WS). This field is read-only.

To be added.

## Uri.UriSchemeWss field

```csharp
public static readonly string UriSchemeWss;
```

Specifies that the URI is accessed through the WebSocket Secure protocol (WSS). This field is read-only.

To be added.
