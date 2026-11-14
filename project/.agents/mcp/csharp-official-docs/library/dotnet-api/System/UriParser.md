---
title: "UriParser class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/UriParser.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# UriParser class

Namespace: `System`

```csharp
public abstract class UriParser
```

Parses a new URI scheme. This is an abstract class.

#### Remarks
The UriParser class enables you to create parsers for new URI schemes. You can write these parsers in their entirety, or the parsers can be derived from well-known schemes (HTTP, FTP, and other schemes based on network protocols). If you want to create a completely new parser, inherit from `GenericUriParser`. If you want to create a parser that extends a well-known URI scheme, inherit from `FtpStyleUriParser`, `HttpStyleUriParser`, `FileStyleUriParser`, `GopherStyleUriParser`, or `LdapStyleUriParser`.

Microsoft strongly recommends that you use a parser shipped with .NET. Building your own parser increases the complexity of your application, and will not perform as well as the shipped parsers.

## UriParser.UriParser() constructor

```csharp
protected UriParser ();
```

Constructs a default URI parser.

To be added.

## UriParser.GetComponents(Uri, UriComponents, UriFormat) method

```csharp
protected virtual string GetComponents (Uri uri, UriComponents components, UriFormat format);
```

Gets the components from a URI.

Parameters:

- `uri`: The URI to parse.
- `components`: The `UriComponents` to retrieve from `uri`.
- `format`: One of the `UriFormat` values that controls how special characters are escaped.

Returns: A string that contains the components.

Exceptions:

- `ArgumentOutOfRangeException`: `format` is invalid.

-or-

`components` is not a combination of valid `UriComponents` values.
- `InvalidOperationException`: `uri` requires user-driven parsing

-or-

`uri` is not an absolute URI. Relative URIs cannot be used with this method.

#### Remarks
Use the `UriParser.GetComponents` method to determine the value of various parts of the URI, such as the `Scheme`, `Host`, or `Port`.

The components are returned in the order that they appear in the URI. For example, if `Scheme` is specified, it appears first.

## UriParser.InitializeAndValidate(Uri, UriFormatException) method

```csharp
protected virtual void InitializeAndValidate (Uri uri, out UriFormatException? parsingError);
```

Initialize the state of the parser and validate the URI.

Parameters:

- `uri`: The `Uri` to validate.
- `parsingError`: When this method returns, contains the validation errors, if any.

#### Remarks
The `UriParser.InitializeAndValidate` method is called every time a `Uri` is instantiated.

## UriParser.IsBaseOf(Uri, Uri) method

```csharp
protected virtual bool IsBaseOf (Uri baseUri, Uri relativeUri);
```

Determines whether `baseUri` is a base URI for `relativeUri`.

Parameters:

- `baseUri`: The base URI.
- `relativeUri`: The URI to test.

Returns: `true` if `baseUri` is a base URI for `relativeUri`; otherwise, `false`.

To be added.

## UriParser.IsKnownScheme(String) method

```csharp
public static bool IsKnownScheme (string schemeName);
```

Indicates whether the parser for a scheme is registered.

Parameters:

- `schemeName`: The scheme name to check.

Returns: `true` if `schemeName` has been registered; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: The `schemeName` parameter is null.
- `ArgumentOutOfRangeException`: The `schemeName` parameter is not valid.

To be added.

## UriParser.IsWellFormedOriginalString(Uri) method

```csharp
protected virtual bool IsWellFormedOriginalString (Uri uri);
```

Indicates whether a URI is well-formed.

Parameters:

- `uri`: The URI to check.

Returns: `true` if `uri` is well-formed; otherwise, `false`.

#### Remarks
The `UriParser.IsWellFormedOriginalString` method will return false if:

- The string is not correctly escaped per RFC 2396.

- The string represents an absolute URI that references an implicit file URI.

- The string represents an absolute URI that is missing a forward slash before the path component.

- The string contains unescaped backslashes, even if they will be treated as forward slashes.

## UriParser.OnNewUri() method

```csharp
protected virtual UriParser OnNewUri ();
```

Invoked by a `Uri` constructor to get a `UriParser` instance.

Returns: A `UriParser` for the constructed `Uri`.

#### Remarks
The default implementation returns the same `UriParser` instance. You may need to override this method and return a different `UriParser` for each invocation if you are operating in a multithreaded environment.

## UriParser.OnRegister(String, Int32) method

```csharp
protected virtual void OnRegister (string schemeName, int defaultPort);
```

Invoked by the Framework when a `UriParser` method is registered.

Parameters:

- `schemeName`: The scheme that is associated with this `UriParser`.
- `defaultPort`: The port number of the scheme.

To be added.

## UriParser.Register(UriParser, String, Int32) method

```csharp
public static void Register (UriParser uriParser, string schemeName, int defaultPort);
```

Associates a scheme and port number with a `UriParser`.

Parameters:

- `uriParser`: The URI parser to register.
- `schemeName`: The name of the scheme that is associated with this parser.
- `defaultPort`: The default port number for the specified scheme.

Exceptions:

- `ArgumentNullException`: `uriParser` parameter is null

-or-

`schemeName` parameter is null.
- `ArgumentOutOfRangeException`: `schemeName` parameter is not valid

-or-

`defaultPort` parameter is not valid. The `defaultPort` parameter is less than -1 or greater than 65,534.

#### Remarks
If the `defaultPort` parameter is set to -1, the `UriParser.Register` method registers no default value for the port number.

## UriParser.Resolve(Uri, Uri, UriFormatException) method

```csharp
protected virtual string? Resolve (Uri baseUri, Uri? relativeUri, out UriFormatException? parsingError);
```

Called by `Uri` constructors and `TryCreate` to resolve a relative URI.

Parameters:

- `baseUri`: A base URI.
- `relativeUri`: A relative URI.
- `parsingError`: When this method returns, contains the errors that occurred during the resolve process, if any.

Returns: The string of the resolved relative `Uri`.

Exceptions:

- `InvalidOperationException`: `baseUri` parameter is not an absolute `Uri`

-or-

`baseUri` parameter requires user-driven parsing.

#### Remarks
`Uri` constructors and `Uri.TryCreate` use `UriParser.Resolve` to construct a URI from `baseUri` and `relativeUri`.

If a parsing error occurs, the returned string for the resolved relative `Uri` is null.
