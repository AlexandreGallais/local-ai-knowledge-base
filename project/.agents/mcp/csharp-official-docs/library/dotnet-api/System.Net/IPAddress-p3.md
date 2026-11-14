---
title: "IPAddress class (part 3 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net/IPAddress.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IPAddress class (part 3 of 3)

## IPAddress.TryFormat(Byte>, Int32) method

```csharp
public bool TryFormat (Span<byte> utf8Destination, out int bytesWritten);
```

Tries to format the current IP address into the provided span.

Parameters:

- `utf8Destination`: The span into which to write the IP address as a span of UTF-8 bytes.
- `bytesWritten`: When this method returns, contains the number of bytes written into the `utf8Destination`.

Returns: `true` if the formatting was successful; otherwise, `false`.

To be added.

## IPAddress.TryFormat(Char>, Int32) method

```csharp
public bool TryFormat (Span<char> destination, out int charsWritten);
```

Tries to format the current IP address into the provided span.

Parameters:

- `destination`: When this method returns, the IP address as a span of characters.
- `charsWritten`: When this method returns, the number of characters written into the span.

Returns: `true` if the formatting was successful; otherwise, `false`.

To be added.

## IPAddress.TryParse(Byte>, IPAddress) method

```csharp
public static bool TryParse (ReadOnlySpan<byte> utf8Text, out System.Net.IPAddress? result);
```

Tries to parse a span of UTF-8 characters into a value.

Parameters:

- `utf8Text`: The span of UTF-8 characters to parse.
- `result`: When this method returns, contains the result of successfully parsing `utf8Text` or an undefined value on failure.

Returns: `true` if `utf8Text` was successfully parsed; otherwise, `false`.

To be added.

## IPAddress.TryParse(Char>, IPAddress) method

```csharp
public static bool TryParse (ReadOnlySpan<char> ipSpan, out System.Net.IPAddress? address);
```

Tries to parse a span of characters into a value.

Parameters:

- `ipSpan`: The byte span to parse.
- `address`: When this method returns, the `IPAddress` version of the byte span.

Returns: `true` if `ipSpan` was able to be parsed as an IP address; otherwise, `false`.

To be added.

## IPAddress.TryParse(String, IPAddress) method

```csharp
public static bool TryParse (string? ipString, out System.Net.IPAddress? address);
```

Determines whether a string is a valid IP address.

Parameters:

- `ipString`: The string to parse.
- `address`: The `IPAddress` version of the string.

Returns: `true` if `ipString` was able to be parsed as an IP address; otherwise, `false`.

#### Remarks
The static `IPAddress.TryParse` method creates an `IPAddress` instance from an IP address expressed in dotted-quad notation for IPv4 and in colon-hexadecimal notation for IPv6.

The number of parts (each part is separated by a period) in `ipString` determines how the IP address is constructed. A one part address is stored directly in the network address. A two part address, convenient for specifying a class A address, puts the leading part in the first byte and the trailing part in the right-most three bytes of the network address. A three part address, convenient for specifying a class B address, puts the first part in the first byte, the second part in the second byte, and the final part in the right-most two bytes of the network address. For example:

|Number of parts and example `ipString`|IPv4 address for IPAddress|
|--------------------------------------------|--------------------------------|
|1 -- "65535"|0.0.255.255|
|2 -- "20.2"|20.0.0.2|
|2 -- "20.65535"|20.0.255.255|
|3 -- "128.1.2"|128.1.0.2|
|4 -- "1.1.1.10"|1.1.1.10|
|4 -- "1.1.1.010"|1.1.1.8|
|1 -- "0x2F"|0.0.0.47|

## IPAddress.TryWriteBytes(Byte>, Int32) method

```csharp
public bool TryWriteBytes (Span<byte> destination, out int bytesWritten);
```

Tries to write the current IP address into a span of bytes in network order.

Parameters:

- `destination`: When this method returns, the IP address as a span of bytes.
- `bytesWritten`: When this method returns, the number of bytes written into the span.

Returns: `true` if the IP address is successfully written to the given span; otherwise, `false`.

To be added.

## IPAddress.Any field

```csharp
public static readonly System.Net.IPAddress Any;
```

Provides an IP address that indicates that the server must listen for client activity on all network interfaces. This field is read-only.

#### Remarks
The `Socket.Bind` method uses the `Any` field to indicate that a `Socket` instance must listen for client activity on all network interfaces.

The `Any` field is equivalent to 0.0.0.0 in dotted-quad notation.

## IPAddress.Broadcast field

```csharp
public static readonly System.Net.IPAddress Broadcast;
```

Provides the IP broadcast address. This field is read-only.

#### Remarks
The `Broadcast` field is equivalent to 255.255.255.255 in dotted-quad notation.

#### Examples
The following example prints the `Broadcast` address to the console.

_Code sample not included: ~/snippets/csharp/System.Net/IPAddress/Broadcast/ipaddress_broadcast_loopback.cs._

## IPAddress.IPv6Any field

```csharp
public static readonly System.Net.IPAddress IPv6Any;
```

The `Socket.Bind` method uses the `IPAddress.IPv6Any` field to indicate that a `Socket` must listen for client activity on all network interfaces.

#### Remarks
The `IPv6Any` field is equivalent to 0:0:0:0:0:0:0:0 in colon-hexadecimal notation, or to :: in compact notation.

#### Examples
The following code example displays the value of the current host's Any address in standard compressed format.

_Code sample not included: ~/snippets/csharp/System.Net/IPAddress/IPv6Any/noneanyloopback.cs._

## IPAddress.IPv6Loopback field

```csharp
public static readonly System.Net.IPAddress IPv6Loopback;
```

Provides the IP loopback address. This property is read-only.

#### Remarks
The `IPv6Loopback` field is equivalent to 0:0:0:0:0:0:0:1 in colon-hexadecimal notation, or to ::1 in compact notation.

#### Examples
The following code example displays the value of the current host's loopback address in standard compressed format.

_Code sample not included: ~/snippets/csharp/System.Net/IPAddress/IPv6Any/noneanyloopback.cs._

## IPAddress.IPv6None field

```csharp
public static readonly System.Net.IPAddress IPv6None;
```

Provides an IP address that indicates that no network interface should be used. This property is read-only.

#### Remarks
The `Socket.Bind` method uses the `IPv6None` field to indicate that a `Socket` must not listen for client activity. The `IPv6None` field is equivalent to 0:0:0:0:0:0:0:0 in colon-hexadecimal notation, or to ::0 in compact notation.

#### Examples
The following code example displays the value of the current host's None address in standard compressed format.

_Code sample not included: ~/snippets/csharp/System.Net/IPAddress/IPv6Any/noneanyloopback.cs._

## IPAddress.Loopback field

```csharp
public static readonly System.Net.IPAddress Loopback;
```

Provides the IP loopback address. This field is read-only.

#### Remarks
The `Loopback` field is equivalent to 127.0.0.1 in dotted-quad notation.

#### Examples
The following example prints the `Loopback` address to the console.

_Code sample not included: ~/snippets/csharp/System.Net/IPAddress/Broadcast/ipaddress_broadcast_loopback.cs._

## IPAddress.None field

```csharp
public static readonly System.Net.IPAddress None;
```

Provides an IP address that indicates that no network interface should be used. This field is read-only.

#### Remarks
The `Socket.Bind` method uses the `None` field to indicate that a `Socket` must not listen for client activity. The `None` field is equivalent to 255.255.255.255 in dotted-quad notation.

#### Examples
The following example uses the `None` property to indicate that no network interface should be used.

_Code sample not included: ~/snippets/csharp/System.Net/IPAddress/None/ipaddress_none.cs._
