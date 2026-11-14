---
title: "IPv6MulticastOption class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Sockets/IPv6MulticastOption.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IPv6MulticastOption class

Namespace: `System.Net.Sockets`

```csharp
public class IPv6MulticastOption
```

Contains option values for joining an IPv6 multicast group.

#### Examples
The following example creates an `IPv6MulticastOption` object.

_Code sample not included: ~/snippets/csharp/System.Net.Sockets/IPv6MulticastOption/Overview/joinmulticastgroup.cs._

## IPv6MulticastOption.IPv6MulticastOption(IPAddress) constructor

```csharp
public IPv6MulticastOption (System.Net.IPAddress group);
```

Initializes a new version of the `IPv6MulticastOption` class for the specified IP multicast group.

Parameters:

- `group`: The `IPAddress` of the multicast group.

Exceptions:

- `ArgumentNullException`: `group` is `null`.

#### Examples
The following example creates an `IPv6MulticastOption` object.

_Code sample not included: ~/snippets/csharp/System.Net.Sockets/IPv6MulticastOption/Overview/joinmulticastgroup.cs._

## IPv6MulticastOption.IPv6MulticastOption(IPAddress, Int64) constructor

```csharp
public IPv6MulticastOption (System.Net.IPAddress group, long ifindex);
```

Initializes a new instance of the `IPv6MulticastOption` class with the specified IP multicast group and the local interface address.

Parameters:

- `group`: The group `IPAddress`.
- `ifindex`: The local interface address.

Exceptions:

- `ArgumentOutOfRangeException`: `ifindex` is less than 0.

-or-

`ifindex` is greater than 0x00000000FFFFFFFF.
- `ArgumentNullException`: `group` is `null`.

#### Remarks
The `ifindex` parameter specifies the interface on which data is received or sent.

#### Examples
The following example creates an `IPv6MulticastOption` object.

_Code sample not included: ~/snippets/csharp/System.Net.Sockets/IPv6MulticastOption/Overview/joinmulticastgroup.cs._

## IPv6MulticastOption.Group property

```csharp
public System.Net.IPAddress Group { get; set; }
```

Gets or sets the IP address of a multicast group.

Returns: An `IPAddress` that contains the Internet address of a multicast group.

Exceptions:

- `ArgumentNullException`: The value to set is `null`.

#### Examples
The following example creates an `IPv6MulticastOption` object.

_Code sample not included: ~/snippets/csharp/System.Net.Sockets/IPv6MulticastOption/Overview/joinmulticastgroup.cs._

## IPv6MulticastOption.InterfaceIndex property

```csharp
public long InterfaceIndex { get; set; }
```

Gets or sets the interface index that is associated with a multicast group.

Returns: A `UInt64` value that specifies the address of the interface.

Exceptions:

- `ArgumentOutOfRangeException`: The value that is specified for a set operation is less than 0 or greater than 0x00000000FFFFFFFF.

#### Remarks
This property specifies the interface on which data is received or sent.

#### Examples
The following example creates an `IPv6MulticastOption` object.

_Code sample not included: ~/snippets/csharp/System.Net.Sockets/IPv6MulticastOption/Overview/joinmulticastgroup.cs._
