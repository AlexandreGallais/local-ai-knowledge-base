---
title: "UriFormat enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/UriFormat.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# UriFormat enum

Namespace: `System`

```csharp
public enum UriFormat
```

Controls how URI information is escaped.

#### Remarks
This enumeration is used by the `Uri.GetComponents` method to specify the level of character escaping in the returned URI.

RFC 2396 defines the standard escaping for URIs, and is available at https://rfc-editor.org.

SafeUnescaped leaves the following characters escaped if the character has a reserved meaning in the requested `UriComponents`: "%", "#", "?", "/", "\\", and "@".

## UriFormat.SafeUnescaped field

```csharp
SafeUnescaped
```

Characters that have a reserved meaning in the requested URI components remain escaped. All others are not escaped.

## UriFormat.Unescaped field

```csharp
Unescaped
```

No escaping is performed.

## UriFormat.UriEscaped field

```csharp
UriEscaped
```

Escaping is performed according to the rules in RFC 2396.
