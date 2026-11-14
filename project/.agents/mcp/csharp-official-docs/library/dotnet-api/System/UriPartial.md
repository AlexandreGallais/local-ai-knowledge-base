---
title: "UriPartial enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/UriPartial.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# UriPartial enum

Namespace: `System`

```csharp
public enum UriPartial
```

Defines the parts of a URI for the `Uri.GetLeftPart` method.

#### Remarks
The `UriPartial` enumeration defines the values that can be passed to the `Uri.GetLeftPart` method.

## UriPartial.Authority field

```csharp
Authority
```

The scheme and authority segments of the URI.

## UriPartial.Path field

```csharp
Path
```

The scheme, authority, and path segments of the URI.

## UriPartial.Query field

```csharp
Query
```

The scheme, authority, path, and query segments of the URI.

## UriPartial.Scheme field

```csharp
Scheme
```

The scheme segment of the URI.
