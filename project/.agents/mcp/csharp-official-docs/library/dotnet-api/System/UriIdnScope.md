---
title: "UriIdnScope enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/UriIdnScope.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# UriIdnScope enum

Namespace: `System`

```csharp
public enum UriIdnScope
```

Provides the possible values for the configuration setting of the `IdnElement` in the `Configuration` namespace.

#### Remarks
The existing `Uri` class has been extended to provide support for International Resource Identifiers (IR) based on RFC 3987.

The Internationalized Domain Name (IDN) attribute only controls IDN processing. All other IRI processing (character normalization, for example) is always performed by default.

The configuration setting for the `IdnElement` will be read once when the first `Uri` class is constructed. Changes to configuration settings after that time are ignored.

For more information on IRI support, see the Remarks section for the `Uri` class.

## UriIdnScope.All field

```csharp
All
```

This value will convert any Unicode domain names to their Punycode equivalents (IDN names).

## UriIdnScope.AllExceptIntranet field

```csharp
AllExceptIntranet
```

This value will convert all external Unicode domain names to use the Punycode equivalents (IDN names). In this case to handle international names on the local Intranet, the DNS servers that are used for the Intranet should support Unicode names.

## UriIdnScope.None field

```csharp
None
```

Don't convert any Unicode domain names to use Punycode.
