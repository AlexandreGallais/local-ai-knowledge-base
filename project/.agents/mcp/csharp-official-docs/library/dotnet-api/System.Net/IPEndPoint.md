---
title: "IPEndPoint class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net/IPEndPoint.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IPEndPoint class

Namespace: `System.Net`

```csharp
public class IPEndPoint : System.Net.EndPoint
```

Represents a network endpoint as an IP address and a port number.

#### Remarks
The `IPEndPoint` class contains the host and local or remote port information needed by an application to connect to a service on a host. By combining the host's IP address and port number of a service, the `IPEndPoint` class forms a connection point to a service.

#### Examples
_Code sample not included: ~/snippets/csharp/System.Net/IPEndPoint/Overview/ipendpoint.cs._

## IPEndPoint.IPEndPoint(Int64, Int32) constructor

```csharp
public IPEndPoint (long address, int port);
```

Initializes a new instance of the `IPEndPoint` class with the specified address and port number.

Parameters:

- `address`: The IP address of the Internet host. For example, the value 0x2414188f in big-endian format would be the IP address "143.24.20.36".
- `port`: The port number associated with the `address`, or 0 to specify any available port. `port` is in host order.

Exceptions:

- `ArgumentOutOfRangeException`: `port` is less than `IPEndPoint.MinPort`.

-or-

`port` is greater than `IPEndPoint.MaxPort`.

-or-

`address` is less than 0 or greater than 0x00000000FFFFFFFF.

#### Examples
The following example uses the specified IP address and port number to create an `IPEndPoint`.

_Code sample not included: ~/snippets/csharp/System.Net/IPEndPoint/.ctor/ipendpoint_properties.cs._

## IPEndPoint.IPEndPoint(IPAddress, Int32) constructor

```csharp
public IPEndPoint (System.Net.IPAddress address, int port);
```

Initializes a new instance of the `IPEndPoint` class with the specified address and port number.

Parameters:

- `address`: An `IPAddress`.
- `port`: The port number associated with the `address`, or 0 to specify any available port. `port` is in host order.

Exceptions:

- `ArgumentNullException`: `address` is `null`.
- `ArgumentOutOfRangeException`: `port` is less than `IPEndPoint.MinPort`.

-or-

`port` is greater than `IPEndPoint.MaxPort`.

#### Examples
_Code sample not included: ~/snippets/csharp/System.Net/IPEndPoint/Overview/ipendpoint.cs._

## IPEndPoint.Address property

```csharp
public System.Net.IPAddress Address { get; set; }
```

Gets or sets the IP address of the endpoint.

Returns: An `IPAddress` instance containing the IP address of the endpoint.

#### Examples
The following example sets the `Address` property using the `IPAddress` specified.

_Code sample not included: ~/snippets/csharp/System.Net/IPEndPoint/Overview/ipendpoint.cs._

## IPEndPoint.AddressFamily property

```csharp
public override System.Net.Sockets.AddressFamily AddressFamily { get; }
```

Gets the Internet Protocol (IP) address family.

Returns: Returns `AddressFamily.InterNetwork`.

#### Examples
The following example uses the `AddressFamily` property to return the `AddressFamily` to which the `IPEndPoint` belongs. In this case it is the `InterNetwork``AddressFamily`.

_Code sample not included: ~/snippets/csharp/System.Net/IPEndPoint/Overview/ipendpoint.cs._

## IPEndPoint.Port property

```csharp
public int Port { get; set; }
```

Gets or sets the port number of the endpoint.

Returns: An integer value in the range `IPEndPoint.MinPort` to `IPEndPoint.MaxPort` indicating the port number of the endpoint.

Exceptions:

- `ArgumentOutOfRangeException`: The value that was specified for a set operation is less than `IPEndPoint.MinPort` or greater than `IPEndPoint.MaxPort`.

#### Examples
The following example uses the `Port` property to set TCP port number of the `EndPoint`.

_Code sample not included: ~/snippets/csharp/System.Net/IPEndPoint/Overview/ipendpoint.cs._

## IPEndPoint.Create(SocketAddress) method

```csharp
public override System.Net.EndPoint Create (System.Net.SocketAddress socketAddress);
```

Creates an endpoint from a socket address.

Parameters:

- `socketAddress`: The `SocketAddress` to use for the endpoint.

Returns: An `EndPoint` instance using the specified socket address.

Exceptions:

- `ArgumentException`: The AddressFamily of `socketAddress` is not equal to the AddressFamily of the current instance.

-or-

`socketAddress`.Size < 8.

#### Examples
The following example uses the specified `SocketAddress` to create an `IPEndPoint`.

_Code sample not included: ~/snippets/csharp/System.Net/IPEndPoint/Overview/ipendpoint.cs._

## IPEndPoint.Equals(Object) method

```csharp
public override bool Equals (object? comparand);
```

Determines whether the specified `Object` is equal to the current `Object`.

Parameters:

- `comparand`: The `Object` to compare with the current `Object`.

Returns: `true` if the specified `Object` is equal to the current `Object`; otherwise, `false`.

To be added.

## IPEndPoint.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Returns a hash value for a `IPEndPoint` instance.

Returns: An integer hash value.

#### Remarks
The `IPEndPoint.GetHashCode` method returns a hash code of the IP endpoint instance. This value can be used as a key in hash tables.

## IPEndPoint.Parse(Byte>) method

```csharp
public static System.Net.IPEndPoint Parse (ReadOnlySpan<byte> utf8Text);
```

To be added.

Parameters:

- `utf8Text`: To be added.

Returns: To be added.

To be added.

## IPEndPoint.Parse(Char>) method

```csharp
public static System.Net.IPEndPoint Parse (ReadOnlySpan<char> s);
```

Converts an IP network endpoint (address and port) represented as a read-only span to an `IPEndPoint` instance.

Parameters:

- `s`: A read-only span that contains an IP endpoint in dotted-quad notation or network byte order for IPv4 and in colon-hexadecimal notation for IPv6.

Returns: The object representation of an IP network endpoint.

Exceptions:

- `ArgumentNullException`: `s` is `null`.
- `FormatException`: `s` is not a valid IP endpoint.

To be added.

## IPEndPoint.Parse(String) method

```csharp
public static System.Net.IPEndPoint Parse (string s);
```

Converts an IP network endpoint (address and port) represented as a string to an `IPEndPoint` instance.

Parameters:

- `s`: A string that contains an IP endpoint in dotted-quad notation or network byte order for IPv4 and in colon-hexadecimal notation for IPv6.

Returns: The object representation of an IP network endpoint.

Exceptions:

- `ArgumentNullException`: `s` is `null`.
- `FormatException`: `s` is not a valid IP endpoint.

To be added.

## IPEndPoint.Serialize() method

```csharp
public override System.Net.SocketAddress Serialize ();
```

Serializes endpoint information into a `SocketAddress` instance.

Returns: A `SocketAddress` instance containing the socket address for the endpoint.

#### Examples
The following example uses the `IPEndPoint.Serialize` method to serialize endpoint information into a `SocketAddress` instance.

_Code sample not included: ~/snippets/csharp/System.Net/IPEndPoint/Overview/ipendpoint.cs._

## IPEndPoint.System.IFormattable.ToString(String, IFormatProvider) method

```csharp
string IFormattable.ToString (string format, IFormatProvider formatProvider);
```

To be added.

Parameters:

- `format`: To be added.
- `formatProvider`: To be added.

Returns: To be added.

To be added.

## IPEndPoint.System.IParsable<System.Net.IPEndPoint>.Parse(String, IFormatProvider) method

```csharp
static System.Net.IPEndPoint IParsable<IPEndPoint>.Parse (string s, IFormatProvider provider);
```

To be added.

Parameters:

- `s`: To be added.
- `provider`: To be added.

Returns: To be added.

To be added.

## IPEndPoint.System.IParsable<System.Net.IPEndPoint>.TryParse(String, IFormatProvider, IPEndPoint) method

```csharp
static bool IParsable<IPEndPoint>.TryParse (string s, IFormatProvider provider, out System.Net.IPEndPoint result);
```

To be added.

Parameters:

- `s`: To be added.
- `provider`: To be added.
- `result`: To be added.

Returns: To be added.

To be added.

## IPEndPoint.System.ISpanFormattable.TryFormat(Char>, Int32, Char>, IFormatProvider) method

```csharp
bool ISpanFormattable.TryFormat (Span<char> destination, out int charsWritten, ReadOnlySpan<char> format, IFormatProvider provider);
```

To be added.

Parameters:

- `destination`: To be added.
- `charsWritten`: To be added.
- `format`: To be added.
- `provider`: To be added.

Returns: To be added.

To be added.

## IPEndPoint.System.ISpanParsable<System.Net.IPEndPoint>.Parse(Char>, IFormatProvider) method

```csharp
static System.Net.IPEndPoint ISpanParsable<IPEndPoint>.Parse (ReadOnlySpan<char> s, IFormatProvider provider);
```

To be added.

Parameters:

- `s`: To be added.
- `provider`: To be added.

Returns: To be added.

To be added.

## IPEndPoint.System.ISpanParsable<System.Net.IPEndPoint>.TryParse(Char>, IFormatProvider, IPEndPoint) method

```csharp
static bool ISpanParsable<IPEndPoint>.TryParse (ReadOnlySpan<char> s, IFormatProvider provider, out System.Net.IPEndPoint result);
```

To be added.

Parameters:

- `s`: To be added.
- `provider`: To be added.
- `result`: To be added.

Returns: To be added.

To be added.

## IPEndPoint.System.IUtf8SpanFormattable.TryFormat(Byte>, Int32, Char>, IFormatProvider) method

```csharp
bool IUtf8SpanFormattable.TryFormat (Span<byte> utf8Destination, out int bytesWritten, ReadOnlySpan<char> format, IFormatProvider provider);
```

To be added.

Parameters:

- `utf8Destination`: To be added.
- `bytesWritten`: To be added.
- `format`: To be added.
- `provider`: To be added.

Returns: To be added.

To be added.

## IPEndPoint.System.IUtf8SpanParsable<System.Net.IPEndPoint>.Parse(Byte>, IFormatProvider) method

```csharp
static System.Net.IPEndPoint IUtf8SpanParsable<IPEndPoint>.Parse (ReadOnlySpan<byte> utf8Text, IFormatProvider provider);
```

To be added.

Parameters:

- `utf8Text`: To be added.
- `provider`: To be added.

Returns: To be added.

To be added.

## IPEndPoint.System.IUtf8SpanParsable<System.Net.IPEndPoint>.TryParse(Byte>, IFormatProvider, IPEndPoint) method

```csharp
static bool IUtf8SpanParsable<IPEndPoint>.TryParse (ReadOnlySpan<byte> utf8Text, IFormatProvider provider, out System.Net.IPEndPoint result);
```

To be added.

Parameters:

- `utf8Text`: To be added.
- `provider`: To be added.
- `result`: To be added.

Returns: To be added.

To be added.

## IPEndPoint.ToString() method

```csharp
public override string ToString ();
```

Returns the IP address and port number of the specified endpoint.

Returns: A string containing the IP address and the port number of the specified endpoint (for example, 192.168.1.2:80).

#### Examples
The following example returns a string representation of the IP address and port number of the specified `IPEndPoint`.

_Code sample not included: ~/snippets/csharp/System.Net/IPEndPoint/Overview/ipendpoint.cs._

## IPEndPoint.TryFormat(Byte>, Int32) method

```csharp
public bool TryFormat (Span<byte> utf8Destination, out int bytesWritten);
```

To be added.

Parameters:

- `utf8Destination`: To be added.
- `bytesWritten`: To be added.

Returns: To be added.

To be added.

## IPEndPoint.TryFormat(Char>, Int32) method

```csharp
public bool TryFormat (Span<char> destination, out int charsWritten);
```

To be added.

Parameters:

- `destination`: To be added.
- `charsWritten`: To be added.

Returns: To be added.

To be added.

## IPEndPoint.TryParse(Byte>, IPEndPoint) method

```csharp
public static bool TryParse (ReadOnlySpan<byte> utf8Text, out System.Net.IPEndPoint? result);
```

To be added.

Parameters:

- `utf8Text`: To be added.
- `result`: To be added.

Returns: To be added.

To be added.

## IPEndPoint.TryParse(Char>, IPEndPoint) method

```csharp
public static bool TryParse (ReadOnlySpan<char> s, out System.Net.IPEndPoint? result);
```

Tries to convert an IP network endpoint (address and port) represented as a read-only span to its `IPEndPoint` equivalent, and returns a value that indicates whether the conversion succeeded.

Parameters:

- `s`: The IP endpoint to validate.
- `result`: When this method returns, the `IPEndPoint` version of `s`.

Returns: `true` if `s` can be parsed as an IP endpoint; otherwise, `false`.

To be added.

## IPEndPoint.TryParse(String, IPEndPoint) method

```csharp
public static bool TryParse (string s, out System.Net.IPEndPoint? result);
```

Tries to convert an IP network endpoint (address and port) represented as a string to its `IPEndPoint` equivalent, and returns a value that indicates whether the conversion succeeded.

Parameters:

- `s`: The IP endpoint to validate.
- `result`: When this method returns, the `IPEndPoint` version of `s`.

Returns: `true` if `s` can be parsed as an IP endpoint; otherwise, `false`.

To be added.

## IPEndPoint.MaxPort field

```csharp
public const int MaxPort = 65535;
```

Specifies the maximum value that can be assigned to the `IPEndPoint.Port` property. The MaxPort value is set to 0x0000FFFF. This field is read-only.

#### Examples
The following example uses the `MaxPort` property to print the maximum value that can be assigned to the `Port` property.

_Code sample not included: ~/snippets/csharp/System.Net/IPEndPoint/.ctor/ipendpoint_properties.cs._

## IPEndPoint.MinPort field

```csharp
public const int MinPort = 0;
```

Specifies the minimum value that can be assigned to the `IPEndPoint.Port` property. This field is read-only.

#### Examples
The following example uses the `MinPort` property to print the minimum value that can be assigned to the `Port` property.

_Code sample not included: ~/snippets/csharp/System.Net/IPEndPoint/.ctor/ipendpoint_properties.cs._
