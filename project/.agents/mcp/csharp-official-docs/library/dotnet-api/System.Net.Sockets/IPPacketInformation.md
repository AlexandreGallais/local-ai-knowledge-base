---
title: "IPPacketInformation struct"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Sockets/IPPacketInformation.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IPPacketInformation struct

Namespace: `System.Net.Sockets`

```csharp
public struct IPPacketInformation : IEquatable<System.Net.Sockets.IPPacketInformation>
```

Presents the packet information from a call to `Socket.ReceiveMessageFrom` or `Socket.EndReceiveMessageFrom`.

To be added.

## IPPacketInformation.Address property

```csharp
public System.Net.IPAddress Address { get; }
```

Gets the origin information of the packet that was received as a result of calling the `Socket.ReceiveMessageFrom` method or `Socket.EndReceiveMessageFrom` method.

Returns: An `IPAddress` that indicates the origin information of the packet that was received as a result of calling the `Socket.ReceiveMessageFrom` method or `Socket.EndReceiveMessageFrom` method. For packets that were sent from a unicast address, the `IPPacketInformation.Address` property will return the `IPAddress` of the sender; for multicast or broadcast packets, the `IPPacketInformation.Address` property will return the multicast or broadcast `IPAddress`.

To be added.

## IPPacketInformation.Interface property

```csharp
public int Interface { get; }
```

Gets the network interface information that is associated with a call to `Socket.ReceiveMessageFrom` or `Socket.EndReceiveMessageFrom`.

Returns: An `Int32` value, which represents the index of the network interface. You can use this index with `NetworkInterface.GetAllNetworkInterfaces` to get more information about the relevant interface.

To be added.

## IPPacketInformation.Equals(IPPacketInformation) method

```csharp
public bool Equals (System.Net.Sockets.IPPacketInformation other);
```

Indicates whether the current instance is equal to another instance of the same type.

Parameters:

- `other`: An instance to compare with this instance.

Returns: `true` if the current instance is equal to the other instance; otherwise, `false`.

To be added.

## IPPacketInformation.Equals(Object) method

```csharp
public override bool Equals (object? comparand);
```

Returns a value that indicates whether this instance is equal to a specified object.

Parameters:

- `comparand`: The object to compare with this instance.

Returns: `true` if `comparand` is an instance of `IPPacketInformation` and equals the value of the instance; otherwise, `false`.

To be added.

## IPPacketInformation.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Returns the hash code for this instance.

Returns: An Int32 hash code.

#### Remarks
The hash code is constructed from the values of the `IPPacketInformation.Address` and `IPPacketInformation.Interface` properties.

## IPPacketInformation.op_Equality(IPPacketInformation, IPPacketInformation) method

```csharp
public static bool operator == (System.Net.Sockets.IPPacketInformation packetInformation1, System.Net.Sockets.IPPacketInformation packetInformation2);
```

Tests whether two specified `IPPacketInformation` instances are equivalent.

Parameters:

- `packetInformation1`: The `IPPacketInformation` instance that is to the left of the equality operator.
- `packetInformation2`: The `IPPacketInformation` instance that is to the right of the equality operator.

Returns: `true` if `packetInformation1` and `packetInformation2` are equal; otherwise, `false`.

#### Remarks
This operator tests both the `IPPacketInformation.Address` and `IPPacketInformation.Interface` values for both arguments.

The equivalent method for this operator is `Equals`.

## IPPacketInformation.op_Inequality(IPPacketInformation, IPPacketInformation) method

```csharp
public static bool operator != (System.Net.Sockets.IPPacketInformation packetInformation1, System.Net.Sockets.IPPacketInformation packetInformation2);
```

Tests whether two specified `IPPacketInformation` instances are not equal.

Parameters:

- `packetInformation1`: The `IPPacketInformation` instance that is to the left of the inequality operator.
- `packetInformation2`: The `IPPacketInformation` instance that is to the right of the inequality operator.

Returns: `true` if `packetInformation1` and `packetInformation2` are unequal; otherwise, `false`.

#### Remarks
This operator tests both the `IPPacketInformation.Address` and `IPPacketInformation.Interface` values for both arguments.

The equivalent method for this operator is `Equals`.
