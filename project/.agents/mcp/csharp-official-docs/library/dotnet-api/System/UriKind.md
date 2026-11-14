---
title: "UriKind enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/UriKind.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# UriKind enum

Namespace: `System`

```csharp
public enum UriKind
```

Defines the different kinds of URIs.

#### Remarks

Absolute URIs are characterized by a complete reference to the resource (example: `http://www.contoso.com/index.html`), while a relative URI depends on a previously defined base URI (example: `/index.html`).

The following list shows some APIs that use the `UriKind` enum:

* `%23ctor`
* `IsWellFormedUriString`
* `TryCreate`

## UriKind.Absolute field

```csharp
Absolute
```

The URI is absolute.

## UriKind.Relative field

```csharp
Relative
```

The URI is relative.

## UriKind.RelativeOrAbsolute field

```csharp
RelativeOrAbsolute
```

The URI kind is indeterminate.
