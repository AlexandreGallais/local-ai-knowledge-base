---
title: "IPProtectionLevel enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Sockets/IPProtectionLevel.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IPProtectionLevel enum

Namespace: `System.Net.Sockets`

```csharp
public enum IPProtectionLevel
```

A value that enables restriction of an IPv6 socket to a specified scope, such as addresses with the same link local or site local prefix.

#### Remarks
This option enables applications to place access restrictions on IPv6 sockets. Such restrictions enable an application running on a private LAN to simply and robustly harden itself against external attacks. This socket option widens or narrows the scope of a listening socket, enabling unrestricted access from public and private users when appropriate, or restricting access only to the same site, as required.

## IPProtectionLevel.EdgeRestricted field

```csharp
EdgeRestricted
```

The IP protection level is edge restricted. This value would be used by applications designed to operate across the Internet. This setting does not allow Network Address Translation (NAT) traversal using the Windows Teredo implementation. These applications might bypass IPv4 firewalls, so applications must be hardened against Internet attacks directed at the opened port.

## IPProtectionLevel.Restricted field

```csharp
Restricted
```

The IP protection level is restricted. This value would be used by intranet applications that do not implement Internet scenarios. These applications are generally not tested or hardened against Internet-style attacks. This setting will limit the received traffic to link-local only.

## IPProtectionLevel.Unrestricted field

```csharp
Unrestricted
```

The IP protection level is unrestricted. This value would be used by applications designed to operate across the Internet, including applications taking advantage of IPv6 NAT traversal capabilities built into Windows (Teredo, for example). These applications may bypass IPv4 firewalls, so applications must be hardened against Internet attacks directed at the opened port. On Windows Server 2008 R2 and Windows Vista, the default value for the IP Protection level on a socket is unrestricted.

## IPProtectionLevel.Unspecified field

```csharp
Unspecified
```

The IP protection level is unspecified. On Windows 7 and Windows Server 2008 R2, the default value for the IP Protection level on a socket is unspecified.
