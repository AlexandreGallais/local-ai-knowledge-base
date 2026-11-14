---
title: "GenericUriParser class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/GenericUriParser.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# GenericUriParser class

Namespace: `System`

```csharp
public class GenericUriParser : UriParser
```

A customizable parser for a hierarchical URI.

#### Remarks
If you want to create a parser based on a well-known scheme, use `HttpStyleUriParser`, `FtpStyleUriParser`, `GopherStyleUriParser`, `LdapStyleUriParser`, or `NewsStyleUriParser`.

When creating a customizable parser, the behavior of the parser is specified by passing a bitwise combination of the values available in the `GenericUriParserOptions` enumeration to the `GenericUriParser` constructor.

The `Uri` class provides support for International Resource Identifiers (IRI) and Internationalized Domain Names (IDN). Parsers derived from `GenericUriParser` don't have IRI and IDN support by default. The `Default` option does not include IRI and IDN support. The `Idn` and `IriParsing` fields indicate if a custom parser supports IDN and IRI respectively.

For more information on IRI and IDN support, see the Remarks section for the `Uri` class.

## GenericUriParser.GenericUriParser(GenericUriParserOptions) constructor

```csharp
public GenericUriParser (GenericUriParserOptions options);
```

Create a customizable parser for a hierarchical URI.

Parameters:

- `options`: Specify the options for this `GenericUriParser`.

#### Remarks
Use this constructor as an argument to `Register`

If you want to create a parser based on a well-known scheme, use `HttpStyleUriParser`, `FtpStyleUriParser`, `GopherStyleUriParser`, `LdapStyleUriParser`, or `NewsStyleUriParser`.

When creating a customizable parser, the behavior of the parser is specified by passing a bitwise combination of the values available in the `GenericUriParserOptions` enumeration to the `GenericUriParser` constructor.

The `Uri` class provides support for International Resource Identifiers (IRI) and Internationalized Domain Names (IDN). Parsers derived from `GenericUriParser` don't have IRI and IDN support by default. The `Default` option does not include IRI and IDN support.

The `IriParsing` type indicates the parser supports the parsing rules specified in RFC 3987 for International Resource Identifiers (IRI). Whether IRI is used is dictated by configuration values.

The `Idn` type indicates the parser supports Internationalized Domain Name (IDN) parsing (IDN) of host names. Whether IDN is used is dictated by configuration values.

The configuration setting for the `IdnElement` is indirectly controlled by the `IriParsingElement` configuration setting that controls IRI processing in the `Uri` class. IRI processing must be enabled for IDN processing to be possible. If IRI processing is disabled, then IDN processing will be set to the default setting where IDN names are not used.

The Internationalized Domain Name (IDN) attribute only controls IDN processing. All other IRI processing (character normalization, for example) is performed by default.

For more information on IRI and IDN support, see the Remarks section for the `Uri#remarks` class.
