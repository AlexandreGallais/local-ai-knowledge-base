---
title: "MulticastOption class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Sockets/MulticastOption.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# MulticastOption class

Namespace: `System.Net.Sockets`

```csharp
public class MulticastOption
```

Contains `IPAddress` values used to join and drop multicast groups.

#### Remarks
Use a `MulticastOption` to store the `IPAddress` of a multicast group you want to join or drop. Use the `Socket.SetSocketOption` method with the following parameters to join a multicast group.

|Parameter|Value|
|---------------|-----------|
|socketOptionLevel|`Udp`|
|socketOptionName|`AddMembership`|
|object|`MulticastOption`|

Use `DropMembership` to drop a multicast group.

#### Examples
The following examples join the default IP interface to an IP multicast group. They assume the IP multicast group address in the range 224.0.0.0 to 239.255.255.255.

_Code sample not included: ~/snippets/csharp/System.Net.Sockets/MulticastOption/Overview/listener.cs._

_Code sample not included: ~/snippets/csharp/System.Net.Sockets/MulticastOption/Overview/sender.cs._

## MulticastOption.MulticastOption(IPAddress) constructor

```csharp
public MulticastOption (System.Net.IPAddress group);
```

Initializes a new version of the `MulticastOption` class for the specified IP multicast group.

Parameters:

- `group`: The IP address of the multicast group.

Exceptions:

- `ArgumentNullException`: `group` is `null`.

#### Remarks
For machines with multiple network cards, do not use this constructor. Use the constructor that takes a group and a local IP address.

## MulticastOption.MulticastOption(IPAddress, Int32) constructor

```csharp
public MulticastOption (System.Net.IPAddress group, int interfaceIndex);
```

Initializes a new instance of the `MulticastOption` class with the specified IP multicast group address and interface index.

Parameters:

- `group`: The IP address of the multicast group.
- `interfaceIndex`: The index of the interface that's used to send and receive multicast packets.

To be added.

## MulticastOption.MulticastOption(IPAddress, IPAddress) constructor

```csharp
public MulticastOption (System.Net.IPAddress group, System.Net.IPAddress mcint);
```

Initializes a new instance of the `MulticastOption` class with the specified IP multicast group address and local IP address associated with a network interface.

Parameters:

- `group`: The group IP address.
- `mcint`: The local IP address.

Exceptions:

- `ArgumentNullException`: `group` is `null`.

-or-

`mcint` is `null`.

#### Remarks
For machines with multiple network cards, you must use this constructor to create `MulticastOption` instances.

#### Examples
The following example creates a `MulticastOption` object.

_Code sample not included: ~/snippets/csharp/System.Net.Sockets/MulticastOption/Overview/listener.cs._

## MulticastOption.Group property

```csharp
public System.Net.IPAddress Group { get; set; }
```

Gets or sets the IP address of a multicast group.

Returns: The IP address of a multicast group.

Exceptions:

- `ArgumentNullException`: The value to set is `null`.

#### Remarks
Valid IP addresses for multicast packets are in the range 224.0.0.0 to 239.255.255.255.

#### Examples
The following example displays the value of this property.

_Code sample not included: ~/snippets/csharp/System.Net.Sockets/MulticastOption/Overview/listener.cs._

## MulticastOption.InterfaceIndex property

```csharp
public int InterfaceIndex { get; set; }
```

Gets or sets the index of the interface that's used to send and receive multicast packets.

Returns: The index of a `NetworkInterface` array element.

To be added.

## MulticastOption.LocalAddress property

```csharp
public System.Net.IPAddress? LocalAddress { get; set; }
```

Gets or sets the local address associated with a multicast group.

Returns: The local address associated with a multicast group.

#### Remarks
The `LocalAddress` property contains the IP address of the interface associated with the multicast group membership. If `MulticastOption.LocalAddress` is set to `Any`, the default interface is used.

#### Examples
The following example displays the value of this property.

_Code sample not included: ~/snippets/csharp/System.Net.Sockets/MulticastOption/Overview/listener.cs._
