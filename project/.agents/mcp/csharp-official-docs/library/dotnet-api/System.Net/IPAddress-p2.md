---
title: "IPAddress class (part 2 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net/IPAddress.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IPAddress class (part 2 of 3)

## IPAddress.MapToIPv4() method

```csharp
public System.Net.IPAddress MapToIPv4 ();
```

Maps the `IPAddress` object to an IPv4 address.

Returns: Returns `IPAddress`.

An IPv4 address.

#### Remarks
Dual-stack sockets always require IPv6 addresses. The ability to interact with an IPv4 address requires the use of the IPv4-mapped IPv6 address format. Any IPv4 addresses must be represented in the IPv4-mapped IPv6 address format which enables an IPv6 only application to communicate with an IPv4 node. The IPv4-mapped IPv6 address format allows the IPv4 address of an IPv4 node to be represented as an IPv6 address. The IPv4 address is encoded into the low-order 32 bits of the IPv6 address, and the high-order 96 bits hold the fixed prefix 0:0:0:0:0:FFFF. The IPv4-mapped IPv6 address format is specified in RFC 4291. For more information, see www.ietf.org/rfc/rfc4291.txt.

If you want to use `IPAddress.MapToIPv4` to convert an IPv4 address from IPv6 format to IPv4 format, you must first ensure that you've got an IPv4 address. Call `IPAddress.IsIPv4MappedToIPv6`, which will return `true` if the IP address is originally IPv4 written as IPv6, or `false` otherwise. If `IPAddress.IsIPv4MappedToIPv6` returns `true`, use `IPAddress.MapToIPv4` to make the conversion.

## IPAddress.MapToIPv6() method

```csharp
public System.Net.IPAddress MapToIPv6 ();
```

Maps the `IPAddress` object to an IPv6 address.

Returns: Returns `IPAddress`.

An IPv6 address.

#### Remarks
Dual-stack sockets always require IPv6 addresses. The ability to interact with an IPv4 address requires the use of the IPv4-mapped IPv6 address format. Any IPv4 addresses must be represented in the IPv4-mapped IPv6 address format which enables an IPv6 only application to communicate with an IPv4 node. The IPv4-mapped IPv6 address format allows the IPv4 address of an IPv4 node to be represented as an IPv6 address. The IPv4 address is encoded into the low-order 32 bits of the IPv6 address, and the high-order 96 bits hold the fixed prefix 0:0:0:0:0:FFFF. The IPv4-mapped IPv6 address format is specified in RFC 4291. For more information, see www.ietf.org/rfc/rfc4291.txt.

## IPAddress.NetworkToHostOrder(Int16) method

```csharp
public static short NetworkToHostOrder (short network);
```

Converts a short value from network byte order to host byte order.

Parameters:

- `network`: The number to convert, expressed in network byte order.

Returns: A short value, expressed in host byte order.

#### Remarks
Different computers use different conventions for ordering the bytes within multibyte integer values. Some computers put the most significant byte first (known as big-endian order) and others put the least-significant byte first (known as little-endian order). To work with computers that use different byte ordering, all integer values that are sent over the network are sent in network byte order which has the most significant byte first.

The `IPAddress.NetworkToHostOrder` method converts multibyte integer values that are stored on the host system from the byte order used by the network to the byte order used by the host.

#### Examples
The following example uses the `IPAddress.NetworkToHostOrder` method to convert a short value from network byte order to host byte order.

_Code sample not included: ~/snippets/csharp/System.Net/IPAddress/NetworkToHostOrder/ipaddress_networktohost.cs._

## IPAddress.NetworkToHostOrder(Int32) method

```csharp
public static int NetworkToHostOrder (int network);
```

Converts an integer value from network byte order to host byte order.

Parameters:

- `network`: The number to convert, expressed in network byte order.

Returns: An integer value, expressed in host byte order.

#### Remarks
Different computers use different conventions for ordering the bytes within multibyte integer values. Some computers put the most significant byte first (known as big-endian order) and others put the least-significant byte first (known as little-endian order). To work with computers that use different byte ordering, all integer values that are sent over the network are sent in network byte order which has the most significant byte first.

The `IPAddress.NetworkToHostOrder` method converts multibyte integer values that are stored on the host system from the byte order used by the network to the byte order used by the host.

#### Examples
The following example uses the `IPAddress.NetworkToHostOrder` method to convert an integer value from network byte order to host byte order.

_Code sample not included: ~/snippets/csharp/System.Net/IPAddress/NetworkToHostOrder/ipaddress_networktohost.cs._

## IPAddress.NetworkToHostOrder(Int64) method

```csharp
public static long NetworkToHostOrder (long network);
```

Converts a long value from network byte order to host byte order.

Parameters:

- `network`: The number to convert, expressed in network byte order.

Returns: A long value, expressed in host byte order.

#### Remarks
Different computers use different conventions for ordering the bytes within multibyte integer values. Some computers put the most significant byte first (known as big-endian order) and others put the least-significant byte first (known as little-endian order). To work with computers that use different byte ordering, all integer values that are sent over the network are sent in network byte order which has the most significant byte first.

The `IPAddress.NetworkToHostOrder` method converts multibyte integer values that are stored on the host system from the byte order used by the network to the byte order used by the host.

#### Examples
The following example uses the `IPAddress.NetworkToHostOrder` method to convert a long value from network byte order to host byte order.

_Code sample not included: ~/snippets/csharp/System.Net/IPAddress/NetworkToHostOrder/ipaddress_networktohost.cs._

## IPAddress.Parse(Byte>) method

```csharp
public static System.Net.IPAddress Parse (ReadOnlySpan<byte> utf8Text);
```

Parses a span of UTF-8 characters into a value.

Parameters:

- `utf8Text`: The span of UTF-8 characters to parse.

Returns: The result of parsing `utf8Text`.

To be added.

## IPAddress.Parse(Char>) method

```csharp
public static System.Net.IPAddress Parse (ReadOnlySpan<char> ipSpan);
```

Converts an IP address represented as a character span to an `IPAddress` instance.

Parameters:

- `ipSpan`: A character span that contains an IP address in dotted-quad notation for IPv4 and in colon-hexadecimal notation for IPv6.

Returns: The converted IP address.

Exceptions:

- `FormatException`: `ipString` is not a valid IP address.

To be added.

## IPAddress.Parse(String) method

```csharp
public static System.Net.IPAddress Parse (string ipString);
```

Converts an IP address string to an `IPAddress` instance.

Parameters:

- `ipString`: A string that contains an IP address in dotted-quad notation for IPv4 and in colon-hexadecimal notation for IPv6.

Returns: An `IPAddress` instance.

Exceptions:

- `ArgumentNullException`: `ipString` is `null`.
- `FormatException`: `ipString` is not a valid IP address.

#### Remarks
The static `IPAddress.Parse` method creates an `IPAddress` instance from an IP address expressed in dotted-quad notation for IPv4 and in colon-hexadecimal notation for IPv6.

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

#### Examples
The following code converts a string that contains an IP address, in dotted-quad notation for IPv4 or in colon-hexadecimal notation for IPv6, into an instance of the `IPAddress` class. Then it uses the overloaded `IPAddress.ToString` method to display the address in standard notation.

_Code sample not included: ~/snippets/csharp/System.Net/IPAddress/Parse/parse.cs._

## IPAddress.System.IFormattable.ToString(String, IFormatProvider) method

```csharp
string IFormattable.ToString (string format, IFormatProvider formatProvider);
```

Formats the value of the current instance using the specified format.

Parameters:

- `format`: The format to use.
-or-
A `null` reference (`Nothing` in Visual Basic) to use the default format defined for the type of the `IFormattable` implementation.
- `formatProvider`: The provider to use to format the value.
-or-
A `null` reference (`Nothing` in Visual Basic) to obtain the numeric format information from the current locale setting of the operating system.

Returns: The value of the current instance in the specified format.

To be added.

## IPAddress.System.IParsable<System.Net.IPAddress>.Parse(String, IFormatProvider) method

```csharp
static System.Net.IPAddress IParsable<IPAddress>.Parse (string s, IFormatProvider provider);
```

Parses a string into a value.

Parameters:

- `s`: The string to parse.
- `provider`: An object that provides culture-specific formatting information about `s`.

Returns: The result of parsing `s`.

To be added.

## IPAddress.System.IParsable<System.Net.IPAddress>.TryParse(String, IFormatProvider, IPAddress) method

```csharp
static bool IParsable<IPAddress>.TryParse (string s, IFormatProvider provider, out System.Net.IPAddress result);
```

Tries to parse a string into an `IPAddress`.

Parameters:

- `s`: The string to parse.
- `provider`: An object that provides culture-specific formatting information about `s`.
- `result`: When this method returns, contains the result of successfully parsing `s` or an undefined value on failure.

Returns: `true` if `s` was successfully parsed; otherwise, `false`.

To be added.

## IPAddress.System.ISpanFormattable.TryFormat(Char>, Int32, Char>, IFormatProvider) method

```csharp
bool ISpanFormattable.TryFormat (Span<char> destination, out int charsWritten, ReadOnlySpan<char> format, IFormatProvider provider);
```

Tries to format the value of the current instance into the provided span of characters.

Parameters:

- `destination`: The span in which to write this instance's value formatted as a span of characters.
- `charsWritten`: When this method returns, contains the number of characters that were written in `destination`.
- `format`: A span containing the characters that represent a standard or custom format string that defines the acceptable format for `destination`.
- `provider`: An optional object that supplies culture-specific formatting information for `destination`.

Returns: `true` if the formatting was successful; otherwise, `false`.

To be added.

## IPAddress.System.ISpanParsable<System.Net.IPAddress>.Parse(Char>, IFormatProvider) method

```csharp
static System.Net.IPAddress ISpanParsable<IPAddress>.Parse (ReadOnlySpan<char> s, IFormatProvider provider);
```

Parses a span of characters into a value.

Parameters:

- `s`: The span of characters to parse.
- `provider`: An object that provides culture-specific formatting information about `s`.

Returns: The result of parsing `s`.

To be added.

## IPAddress.System.ISpanParsable<System.Net.IPAddress>.TryParse(Char>, IFormatProvider, IPAddress) method

```csharp
static bool ISpanParsable<IPAddress>.TryParse (ReadOnlySpan<char> s, IFormatProvider provider, out System.Net.IPAddress result);
```

Tries to parse a span of characters into a value.

Parameters:

- `s`: The span of characters to parse.
- `provider`: An object that provides culture-specific formatting information about `s`.
- `result`: When this method returns, contains the result of successfully parsing `s` or an undefined value on failure.

Returns: `true` if `s` was successfully parsed; otherwise, `false`.

To be added.

## IPAddress.System.IUtf8SpanFormattable.TryFormat(Byte>, Int32, Char>, IFormatProvider) method

```csharp
bool IUtf8SpanFormattable.TryFormat (Span<byte> utf8Destination, out int bytesWritten, ReadOnlySpan<char> format, IFormatProvider provider);
```

Tries to format the value of the current instance as UTF-8 into the provided span of bytes.

Parameters:

- `utf8Destination`: The span in which to write this instance's value formatted as a span of bytes.
- `bytesWritten`: When this method returns, contains the number of bytes that were written in `utf8Destination`.
- `format`: A span containing the characters that represent a standard or custom format string that defines the acceptable format for `utf8Destination`.
- `provider`: An optional object that supplies culture-specific formatting information for `utf8Destination`.

Returns: `true` if the formatting was successful; otherwise, `false`.

To be added.

## IPAddress.System.IUtf8SpanParsable<System.Net.IPAddress>.Parse(Byte>, IFormatProvider) method

```csharp
static System.Net.IPAddress IUtf8SpanParsable<IPAddress>.Parse (ReadOnlySpan<byte> utf8Text, IFormatProvider provider);
```

Parses a span of UTF-8 characters into a value.

Parameters:

- `utf8Text`: The span of UTF-8 characters to parse.
- `provider`: An object that provides culture-specific formatting information about `utf8Text`.

Returns: The result of parsing `utf8Text`.

To be added.

## IPAddress.System.IUtf8SpanParsable<System.Net.IPAddress>.TryParse(Byte>, IFormatProvider, IPAddress) method

```csharp
static bool IUtf8SpanParsable<IPAddress>.TryParse (ReadOnlySpan<byte> utf8Text, IFormatProvider provider, out System.Net.IPAddress result);
```

To be added.

Parameters:

- `utf8Text`: To be added.
- `provider`: To be added.
- `result`: To be added.

Returns: To be added.

To be added.

## IPAddress.ToString() method

```csharp
public override string ToString ();
```

Converts an Internet address to its standard notation.

Returns: A string that contains the IP address in either IPv4 dotted-quad or in IPv6 colon-hexadecimal notation.

Exceptions:

- `SocketException`: The address family is `AddressFamily.InterNetworkV6` and the address is bad.

#### Remarks
The `IPAddress.ToString` method converts the IP address that is stored in the `Address` property to either IPv4 dotted-quad or IPv6 colon-hexadecimal notation.
