---
title: "UriHostNameType enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/UriHostNameType.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# UriHostNameType enum

Namespace: `System`

```csharp
public enum UriHostNameType
```

Defines host name types for the `Uri.CheckHostName` method.

#### Remarks
The `UriHostNameType` enumeration defines the values that the `Uri.CheckHostName` method can return.

## UriHostNameType.Basic field

```csharp
Basic
```

The host is set, but the type cannot be determined.

## UriHostNameType.Dns field

```csharp
Dns
```

The host name is a domain name system (DNS) style host name.

## UriHostNameType.IPv4 field

```csharp
IPv4
```

The host name is an Internet Protocol (IP) version 4 host address.

## UriHostNameType.IPv6 field

```csharp
IPv6
```

The host name is an Internet Protocol (IP) version 6 host address.

## UriHostNameType.Unknown field

```csharp
Unknown
```

The type of the host name is not supplied.
