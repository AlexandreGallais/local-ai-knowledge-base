---
title: "UdpReceiveResult struct"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Sockets/UdpReceiveResult.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# UdpReceiveResult struct

Namespace: `System.Net.Sockets`

```csharp
public struct UdpReceiveResult : IEquatable<System.Net.Sockets.UdpReceiveResult>
```

Presents UDP receive result information from a call to the `UdpClient.ReceiveAsync` method.

To be added.

## UdpReceiveResult.UdpReceiveResult(Byte[], IPEndPoint) constructor

```csharp
public UdpReceiveResult (byte[] buffer, System.Net.IPEndPoint remoteEndPoint);
```

Initializes a new instance of the `UdpReceiveResult` class.

Parameters:

- `buffer`: A buffer for data to receive in the UDP packet.
- `remoteEndPoint`: The remote endpoint of the UDP packet.

To be added.

## UdpReceiveResult.Buffer property

```csharp
public byte[] Buffer { get; }
```

Gets a buffer with the data received in the UDP packet.

Returns: A `Byte` array with the data received in the UDP packet.

To be added.

## UdpReceiveResult.RemoteEndPoint property

```csharp
public System.Net.IPEndPoint RemoteEndPoint { get; }
```

Gets the remote endpoint from which the UDP packet was received.

Returns: The remote endpoint from which the UDP packet was received.

To be added.

## UdpReceiveResult.Equals(UdpReceiveResult) method

```csharp
public bool Equals (System.Net.Sockets.UdpReceiveResult other);
```

Returns a value that indicates whether this instance is equal to a specified object.

Parameters:

- `other`: The object to compare with this instance.

Returns: `true` if `other` is an instance of `UdpReceiveResult` and equals the value of the instance; otherwise, `false`.

To be added.

## UdpReceiveResult.Equals(Object) method

```csharp
public override bool Equals (object? obj);
```

Returns a value that indicates whether this instance is equal to a specified object.

Parameters:

- `obj`: The object to compare with this instance.

Returns: `true` if `obj` is an instance of `UdpReceiveResult` and equals the value of the instance; otherwise, `false`.

To be added.

## UdpReceiveResult.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Returns the hash code for this instance.

Returns: The hash code.

To be added.

## UdpReceiveResult.op_Equality(UdpReceiveResult, UdpReceiveResult) method

```csharp
public static bool operator == (System.Net.Sockets.UdpReceiveResult left, System.Net.Sockets.UdpReceiveResult right);
```

Tests whether two specified `UdpReceiveResult` instances are equivalent.

Parameters:

- `left`: The `UdpReceiveResult` instance that is to the left of the equality operator.
- `right`: The `UdpReceiveResult` instance that is to the right of the equality operator.

Returns: `true` if `left` and `right` are equal; otherwise, `false`.

To be added.

## UdpReceiveResult.op_Inequality(UdpReceiveResult, UdpReceiveResult) method

```csharp
public static bool operator != (System.Net.Sockets.UdpReceiveResult left, System.Net.Sockets.UdpReceiveResult right);
```

Tests whether two specified `UdpReceiveResult` instances are not equal.

Parameters:

- `left`: The `UdpReceiveResult` instance that is to the left of the not equal operator.
- `right`: The `UdpReceiveResult` instance that is to the right of the not equal operator.

Returns: `true` if `left` and `right` are unequal; otherwise, `false`.

To be added.
