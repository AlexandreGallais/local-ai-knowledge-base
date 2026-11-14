---
title: "IPNetwork struct"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net/IPNetwork.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IPNetwork struct

Namespace: `System.Net`

```csharp
public readonly struct IPNetwork : IEquatable<System.Net.IPNetwork>, IParsable<System.Net.IPNetwork>, ISpanFormattable, ISpanParsable<System.Net.IPNetwork>, IUtf8SpanFormattable, IUtf8SpanParsable<System.Net.IPNetwork>
```

Represents an IP network with an `IPAddress` containing the network prefix and an `Int32` defining the prefix length.

This type disallows arbitrary IP-address/prefix-length CIDR pairs. `IPNetwork.BaseAddress` must be defined so that all bits after the network prefix are set to zero.
In other words, `IPNetwork.BaseAddress` is always the first usable address of the network.
The constructor and the parsing methods will throw in case there are non-zero bits after the prefix.

## IPNetwork.IPNetwork(IPAddress, Int32) constructor

```csharp
public IPNetwork (System.Net.IPAddress baseAddress, int prefixLength);
```

Initializes a new instance of the `IPNetwork` class with the specified `IPAddress` and prefix length.

Parameters:

- `baseAddress`: The `IPAddress` that represents the prefix of the network.
- `prefixLength`: The length of the prefix in bits.

Exceptions:

- `ArgumentNullException`: The specified `baseAddress` is `null`.
- `ArgumentOutOfRangeException`: The specified `prefixLength` is smaller than `0` or longer than maximum length of `prefixLength`'s `AddressFamily`.
- `ArgumentException`: The specified `baseAddress` has non-zero bits after the network prefix.

To be added.

## IPNetwork.BaseAddress property

```csharp
public System.Net.IPAddress BaseAddress { get; }
```

Gets the `IPAddress` that represents the prefix of the network.

Returns: The `IPAddress` that represents the prefix of the network.

To be added.

## IPNetwork.PrefixLength property

```csharp
public int PrefixLength { get; }
```

Gets the length of the network prefix in bits.

Returns: The length of the network prefix in bits.

To be added.

## IPNetwork.Contains(IPAddress) method

```csharp
public bool Contains (System.Net.IPAddress address);
```

Determines whether a given `IPAddress` is part of the network.

Parameters:

- `address`: The `IPAddress` to check.

Returns: `true` if the `IPAddress` is part of the network; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: The specified `address` is `null`.

To be added.

## IPNetwork.Equals(IPNetwork) method

```csharp
public bool Equals (System.Net.IPNetwork other);
```

Indicates whether the current object is equal to another object of the same type.

Parameters:

- `other`: An object to compare with this object.

Returns: `true` if the current object is equal to the `other` parameter; otherwise, `false`.

Exceptions:

- `InvalidOperationException`: The `IPNetwork` instance is uninitialized.

To be added.

## IPNetwork.Equals(Object) method

```csharp
public override bool Equals (object? obj);
```

Determines whether two `IPNetwork` instances are equal.

Parameters:

- `obj`: The `IPNetwork` instance to compare to this instance.

Returns: `true` if `obj` is an `IPNetwork` instance and the networks are equal; otherwise `false`.

Exceptions:

- `InvalidOperationException`: The `IPNetwork` instance is uninitialized.

To be added.

## IPNetwork.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Returns the hash code for this instance.

Returns: An integer hash value.

To be added.

## IPNetwork.op_Equality(IPNetwork, IPNetwork) method

```csharp
public static bool operator == (System.Net.IPNetwork left, System.Net.IPNetwork right);
```

Determines whether the specified instances of `IPNetwork` are equal.

Parameters:

- `left`: The first object to compare.
- `right`: The second object to compare.

Returns: `true` if the networks are equal; otherwise `false`.

To be added.

## IPNetwork.op_Inequality(IPNetwork, IPNetwork) method

```csharp
public static bool operator != (System.Net.IPNetwork left, System.Net.IPNetwork right);
```

Determines whether the specified instances of `IPNetwork` are not equal.

Parameters:

- `left`: The first object to compare.
- `right`: The second object to compare.

Returns: `true` if the networks are not equal; otherwise `false`.

To be added.

## IPNetwork.Parse(Byte>) method

```csharp
public static System.Net.IPNetwork Parse (ReadOnlySpan<byte> utf8Text);
```

Converts a UTF-8 CIDR character span to an `IPNetwork` instance.

Parameters:

- `utf8Text`: A UTF-8 character span that defines an IP network in CIDR notation.

Returns: An `IPNetwork` instance.

Exceptions:

- `FormatException`: `utf8Text` is not a valid UTF-8 CIDR network string, or the address contains non-zero bits after the network prefix.

To be added.

## IPNetwork.Parse(Char>) method

```csharp
public static System.Net.IPNetwork Parse (ReadOnlySpan<char> s);
```

Converts a CIDR character span to an `IPNetwork` instance.

Parameters:

- `s`: A character span that defines an IP network in CIDR notation.

Returns: An `IPNetwork` instance.

Exceptions:

- `FormatException`: `s` is not a valid CIDR network string, or the address contains non-zero bits after the network prefix.

To be added.

## IPNetwork.Parse(String) method

```csharp
public static System.Net.IPNetwork Parse (string s);
```

Converts a CIDR `String` to an `IPNetwork` instance.

Parameters:

- `s`: A `String` that defines an IP network in CIDR notation.

Returns: An `IPNetwork` instance.

Exceptions:

- `ArgumentNullException`: The specified string is `null`.
- `FormatException`: `s` is not a valid CIDR network string, or the address contains non-zero bits after the network prefix.

To be added.

## IPNetwork.System.IFormattable.ToString(String, IFormatProvider) method

```csharp
string IFormattable.ToString (string format, IFormatProvider provider);
```

Formats the value of the current instance using the specified format.

Parameters:

- `format`: The format to use.
-or-
A `null` reference (`Nothing` in Visual Basic) to use the default format defined for the type of the `IFormattable` implementation.
- `provider`: The provider to use to format the value.
-or-
A `null` reference (`Nothing` in Visual Basic) to obtain the numeric format information from the current locale setting of the operating system.

Returns: The value of the current instance in the specified format.

To be added.

## IPNetwork.System.IParsable<System.Net.IPNetwork>.Parse(String, IFormatProvider) method

```csharp
static System.Net.IPNetwork IParsable<IPNetwork>.Parse (string s, IFormatProvider provider);
```

Parses a string into a value.

Parameters:

- `s`: The string to parse.
- `provider`: An object that provides culture-specific formatting information about `s`.

Returns: The result of parsing `s`.

To be added.

## IPNetwork.System.IParsable<System.Net.IPNetwork>.TryParse(String, IFormatProvider, IPNetwork) method

```csharp
static bool IParsable<IPNetwork>.TryParse (string s, IFormatProvider provider, out System.Net.IPNetwork result);
```

Tries to parse a string into an `IPNetwork`.

Parameters:

- `s`: The string to parse.
- `provider`: An object that provides culture-specific formatting information about `s`.
- `result`: When this method returns, contains the result of successfully parsing `s` or an undefined value on failure.

Returns: `true` if `s` was successfully parsed; otherwise, `false`.

To be added.

## IPNetwork.System.ISpanFormattable.TryFormat(Char>, Int32, Char>, IFormatProvider) method

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

## IPNetwork.System.ISpanParsable<System.Net.IPNetwork>.Parse(Char>, IFormatProvider) method

```csharp
static System.Net.IPNetwork ISpanParsable<IPNetwork>.Parse (ReadOnlySpan<char> s, IFormatProvider provider);
```

Parses a span of characters into a value.

Parameters:

- `s`: The span of characters to parse.
- `provider`: An object that provides culture-specific formatting information about `s`.

Returns: The result of parsing `s`.

To be added.

## IPNetwork.System.ISpanParsable<System.Net.IPNetwork>.TryParse(Char>, IFormatProvider, IPNetwork) method

```csharp
static bool ISpanParsable<IPNetwork>.TryParse (ReadOnlySpan<char> s, IFormatProvider provider, out System.Net.IPNetwork result);
```

Tries to parse a span of characters into a value.

Parameters:

- `s`: The span of characters to parse.
- `provider`: An object that provides culture-specific formatting information about `s`.
- `result`: When this method returns, contains the result of successfully parsing `s` or an undefined value on failure.

Returns: `true` if `s` was successfully parsed; otherwise, `false`.

To be added.

## IPNetwork.System.IUtf8SpanFormattable.TryFormat(Byte>, Int32, Char>, IFormatProvider) method

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

## IPNetwork.System.IUtf8SpanParsable<System.Net.IPNetwork>.Parse(Byte>, IFormatProvider) method

```csharp
static System.Net.IPNetwork IUtf8SpanParsable<IPNetwork>.Parse (ReadOnlySpan<byte> utf8Text, IFormatProvider provider);
```

Parses a span of UTF-8 characters into a value.

Parameters:

- `utf8Text`: The span of UTF-8 characters to parse.
- `provider`: An object that provides culture-specific formatting information about `utf8Text`.

Returns: The result of parsing `utf8Text`.

To be added.

## IPNetwork.System.IUtf8SpanParsable<System.Net.IPNetwork>.TryParse(Byte>, IFormatProvider, IPNetwork) method

```csharp
static bool IUtf8SpanParsable<IPNetwork>.TryParse (ReadOnlySpan<byte> utf8Text, IFormatProvider provider, out System.Net.IPNetwork result);
```

To be added.

Parameters:

- `utf8Text`: To be added.
- `provider`: To be added.
- `result`: To be added.

Returns: To be added.

To be added.

## IPNetwork.ToString() method

```csharp
public override string ToString ();
```

Converts the instance to a string containing the `IPNetwork`'s CIDR notation.

Returns: The `String` containing the `IPNetwork`'s CIDR notation.

To be added.

## IPNetwork.TryFormat(Byte>, Int32) method

```csharp
public bool TryFormat (Span<byte> utf8Destination, out int bytesWritten);
```

Attempts to write the `IPNetwork`'s CIDR notation to the given `utf8Destination` UTF-8 span and returns a value indicating whether the operation succeeded.

Parameters:

- `utf8Destination`: The destination span of UTF-8 bytes.
- `bytesWritten`: When this method returns, contains the number of bytes that were written to `utf8Destination`.

Returns: `true` if the formatting was successful; otherwise `false`.

To be added.

## IPNetwork.TryFormat(Char>, Int32) method

```csharp
public bool TryFormat (Span<char> destination, out int charsWritten);
```

Attempts to write the `IPNetwork`'s CIDR notation to the given `destination` span and returns a value indicating whether the operation succeeded.

Parameters:

- `destination`: The destination span of characters.
- `charsWritten`: When this method returns, contains the number of characters that were written to `destination`.

Returns: `true` if the formatting was successful; otherwise `false`.

To be added.

## IPNetwork.TryParse(Byte>, IPNetwork) method

```csharp
public static bool TryParse (ReadOnlySpan<byte> utf8Text, out System.Net.IPNetwork result);
```

Converts the specified UTF-8 CIDR character span to an `IPNetwork` instance and returns a value indicating whether the conversion succeeded.

Parameters:

- `utf8Text`: A UTF-8 character span that defines an IP network in CIDR notation.
- `result`: When the method returns, contains an `IPNetwork` instance if the conversion succeeds.

Returns: `true` if the conversion was successful; otherwise, `false`.

To be added.

## IPNetwork.TryParse(Char>, IPNetwork) method

```csharp
public static bool TryParse (ReadOnlySpan<char> s, out System.Net.IPNetwork result);
```

Converts the specified CIDR character span to an `IPNetwork` instance and returns a value indicating whether the conversion succeeded.

Parameters:

- `s`: A `String` that defines an IP network in CIDR notation.
- `result`: When the method returns, contains an `IPNetwork` instance if the conversion succeeds.

Returns: `true` if the conversion was successful; otherwise, `false`.

To be added.

## IPNetwork.TryParse(String, IPNetwork) method

```csharp
public static bool TryParse (string? s, out System.Net.IPNetwork result);
```

Converts the specified CIDR string to an `IPNetwork` instance and returns a value indicating whether the conversion succeeded.

Parameters:

- `s`: A `String` that defines an IP network in CIDR notation.
- `result`: When the method returns, contains an `IPNetwork` instance if the conversion succeeds.

Returns: `true` if the conversion was successful; otherwise, `false`.

To be added.
