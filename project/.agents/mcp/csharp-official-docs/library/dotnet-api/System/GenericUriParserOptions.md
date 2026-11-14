---
title: "GenericUriParserOptions enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/GenericUriParserOptions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# GenericUriParserOptions enum

Namespace: `System`

```csharp
public enum GenericUriParserOptions
```

Specifies options for a `UriParser`.

#### Remarks
You can combine any of these options to configure a generic URI parser by passing the options as a parameter to the `%23ctor` constructor.

The `Uri` class provides support for International Resource Identifiers (IRI) based on RFC 3987.

The configuration setting for the `IdnElement` is indirectly controlled by the `IriParsingElement` configuration setting that controls IRI processing in the `Uri` class. IRI processing must be enabled for IDN processing to be possible. If IRI processing is disabled, then IDN processing will be set to the default setting where IDN names are not used.

The Internationalized Domain Name (IDN) attribute only controls IDN processing. All other IRI processing (character normalization, for example) is performed by default.

For more information on IRI support, see the Remarks section for the `Uri#remarks` class.

## GenericUriParserOptions.AllowEmptyAuthority field

```csharp
AllowEmptyAuthority
```

The parser allows a URI with no authority.

## GenericUriParserOptions.Default field

```csharp
Default
```

The parser: requires an authority; converts backslashes into forward slashes; unescapes path dots, forward slashes, and back slashes; and removes trailing dots, empty segments, and dots-only segments.

## GenericUriParserOptions.DontCompressPath field

```csharp
DontCompressPath
```

The parser does not canonicalize the URI.

## GenericUriParserOptions.DontConvertPathBackslashes field

```csharp
DontConvertPathBackslashes
```

The parser does not convert back slashes into forward slashes.

## GenericUriParserOptions.DontUnescapePathDotsAndSlashes field

```csharp
DontUnescapePathDotsAndSlashes
```

The parser does not unescape path dots, forward slashes, or back slashes.

## GenericUriParserOptions.GenericAuthority field

```csharp
GenericAuthority
```

The parser allows a registry-based authority.

## GenericUriParserOptions.Idn field

```csharp
Idn
```

The parser supports Internationalized Domain Name (IDN) parsing (IDN) of host names. Whether IDN is used is dictated by configuration values.

## GenericUriParserOptions.IriParsing field

```csharp
IriParsing
```

The parser supports the parsing rules specified in RFC 3987 for International Resource Identifiers (IRI). Whether IRI is used is dictated by configuration values.

## GenericUriParserOptions.NoFragment field

```csharp
NoFragment
```

The scheme does not define a fragment part.

## GenericUriParserOptions.NoPort field

```csharp
NoPort
```

The scheme does not define a port.

## GenericUriParserOptions.NoQuery field

```csharp
NoQuery
```

The scheme does not define a query part.

## GenericUriParserOptions.NoUserInfo field

```csharp
NoUserInfo
```

The scheme does not define a user information part.
