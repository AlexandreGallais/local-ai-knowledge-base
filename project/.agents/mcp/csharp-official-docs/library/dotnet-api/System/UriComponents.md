---
title: "UriComponents enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/UriComponents.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# UriComponents enum

Namespace: `System`

```csharp
public enum UriComponents
```

Specifies the parts of a `Uri`.

#### Remarks
This enumeration is used to identify the parts of a `Uri`. This enumeration is used with the `Uri.GetComponents` method.

## UriComponents.AbsoluteUri field

```csharp
AbsoluteUri
```

The `Uri.Scheme`, `Uri.UserInfo`, `Uri.Host`, `Uri.Port`, `Uri.LocalPath`, `Uri.Query`, and `Uri.Fragment` data.

## UriComponents.Fragment field

```csharp
Fragment
```

The `Uri.Fragment` data.

## UriComponents.Host field

```csharp
Host
```

The `Uri.Host` data.

## UriComponents.HostAndPort field

```csharp
HostAndPort
```

The `Uri.Host` and `Uri.Port` data. If no port data is in the Uri and a default port has been assigned to the `Uri.Scheme`, the default port is returned. If there is no default port, -1 is returned.

## UriComponents.HttpRequestUrl field

```csharp
HttpRequestUrl
```

The `Uri.Scheme`, `Uri.Host`, `Uri.Port`, `Uri.LocalPath`, and `Uri.Query` data.

## UriComponents.KeepDelimiter field

```csharp
KeepDelimiter
```

Specifies that the delimiter should be included.

## UriComponents.NormalizedHost field

```csharp
NormalizedHost
```

The normalized form of the `Uri.Host`.

## UriComponents.Path field

```csharp
Path
```

The `Uri.LocalPath` data.

## UriComponents.PathAndQuery field

```csharp
PathAndQuery
```

The `Uri.LocalPath` and `Uri.Query` data. Also see `Uri.PathAndQuery`.

## UriComponents.Port field

```csharp
Port
```

The `Uri.Port` data.

## UriComponents.Query field

```csharp
Query
```

The `Uri.Query` data.

## UriComponents.Scheme field

```csharp
Scheme
```

The `Uri.Scheme` data.

## UriComponents.SchemeAndServer field

```csharp
SchemeAndServer
```

The `Uri.Scheme`, `Uri.Host`, and `Uri.Port` data.

## UriComponents.SerializationInfoString field

```csharp
SerializationInfoString
```

The complete `Uri` context that is needed for Uri Serializers. The context includes the IPv6 scope.

## UriComponents.StrongAuthority field

```csharp
StrongAuthority
```

The `Uri.UserInfo`, `Uri.Host`, and `Uri.Port` data. If no port data is in the `Uri` and a default port has been assigned to the `Uri.Scheme`, the default port is returned. If there is no default port, -1 is returned.

## UriComponents.StrongPort field

```csharp
StrongPort
```

The `Uri.Port` data. If no port data is in the `Uri` and a default port has been assigned to the `Uri.Scheme`, the default port is returned. If there is no default port, -1 is returned.

## UriComponents.UserInfo field

```csharp
UserInfo
```

The `Uri.UserInfo` data.
