---
title: "SslApplicationProtocol struct"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Security/SslApplicationProtocol.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# SslApplicationProtocol struct

Namespace: `System.Net.Security`

```csharp
public readonly struct SslApplicationProtocol : IEquatable<System.Net.Security.SslApplicationProtocol>
```

Represents a value of TLS Application protocol.

#### Remarks

This type contains static fields with predefined `SslApplicationProtocol` values for HTTP versions.

During the handshake, the client sends a list of available ALPN protocols and the server chooses the best match from that list.

For a complete list of supported protocols, see TLS Application-Layer Protocol Negotiation (ALPN) Protocol IDs.

#### Examples

The following code example demonstrates negotiation of the application-level protocol on `SslStream`. The server advertises support for `protocol1` and `protocol2`. The client advertises support for `protocol2` and `protocol3`. The commonly supported protocol (`protocol2`) gets negotiated during the handshake.

_Code sample not included: ~/snippets/csharp/System.Net.Security/ALPN/alpn.cs._

## SslApplicationProtocol.SslApplicationProtocol(Byte[]) constructor

```csharp
public SslApplicationProtocol (byte[] protocol);
```

Initializes a new instance of the `SslApplicationProtocol`.

Parameters:

- `protocol`: TLS Application protocol.

To be added.

## SslApplicationProtocol.SslApplicationProtocol(String) constructor

```csharp
public SslApplicationProtocol (string protocol);
```

Initializes a new instance of the `SslApplicationProtocol`.

Parameters:

- `protocol`: TLS Application protocol.

To be added.

## SslApplicationProtocol.Protocol property

```csharp
public ReadOnlyMemory<byte> Protocol { get; }
```

Gets a current TLS application protocol represented by this `SslApplicationProtocol`.

Returns: The read-only byte memory representing a TLS application protocol.

To be added.

## SslApplicationProtocol.Equals(SslApplicationProtocol) method

```csharp
public bool Equals (System.Net.Security.SslApplicationProtocol other);
```

Compares a `SslApplicationProtocol` to the specified `SslApplicationProtocol` instance.

Parameters:

- `other`: The `SslApplicationProtocol` instance to test for equality.

Returns: `true` if the `SslApplicationProtocol` instance provided has matching data; otherwise, `false`.

To be added.

## SslApplicationProtocol.Equals(Object) method

```csharp
public override bool Equals (object? obj);
```

Compares the `SslApplicationProtocol` to the specified object.

Parameters:

- `obj`: The object to test for equality.

Returns: `true` if `obj` is a `SslApplicationProtocol` instance, and the `SslApplicationProtocol` instances have matching data; otherwise, `false`.

To be added.

## SslApplicationProtocol.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Returns the hash code for the `SslApplicationProtocol` instance.

Returns: A 32-bit signed integer hash code used to compare instances of this type.

To be added.

## SslApplicationProtocol.op_Equality(SslApplicationProtocol, SslApplicationProtocol) method

```csharp
public static bool operator == (System.Net.Security.SslApplicationProtocol left, System.Net.Security.SslApplicationProtocol right);
```

The equality operator for comparing two `SslApplicationProtocol` objects.

Parameters:

- `left`: The left `SslApplicationProtocol` to an equality operator.
- `right`: The right `SslApplicationProtocol` to an equality operator.

Returns: `true` if the specified `left` and `right` parameters are equal; otherwise, `false`.

To be added.

## SslApplicationProtocol.op_Inequality(SslApplicationProtocol, SslApplicationProtocol) method

```csharp
public static bool operator != (System.Net.Security.SslApplicationProtocol left, System.Net.Security.SslApplicationProtocol right);
```

The inequality operator for comparing two `SslApplicationProtocol` objects.

Parameters:

- `left`: The left `SslApplicationProtocol` to an inequality operator.
- `right`: The right  `SslApplicationProtocol` to an inequality operator.

Returns: `true` if the specified `left` and `right` parameters are inequal; otherwise, `false`.

To be added.

## SslApplicationProtocol.ToString() method

```csharp
public override string ToString ();
```

Overrides the `Object.ToString` method.

Returns: Returns a string representation of this `SslApplicationProtocol` object.

#### Remarks

If the `Protocol` contains valid UTF-8 bytes, `ToString` returns the text representation of the value; otherwise, the hex representation.

## SslApplicationProtocol.Http11 field

```csharp
public static readonly System.Net.Security.SslApplicationProtocol Http11;
```

Gets a `SslApplicationProtocol` representing HTTP/1.1 TLS application protocol.

To be added.

## SslApplicationProtocol.Http2 field

```csharp
public static readonly System.Net.Security.SslApplicationProtocol Http2;
```

Gets a `SslApplicationProtocol` representing HTTP/2 TLS application protocol.

To be added.

## SslApplicationProtocol.Http3 field

```csharp
public static readonly System.Net.Security.SslApplicationProtocol Http3;
```

Defines a `SslApplicationProtocol` instance for HTTP 3.0.

To be added.
