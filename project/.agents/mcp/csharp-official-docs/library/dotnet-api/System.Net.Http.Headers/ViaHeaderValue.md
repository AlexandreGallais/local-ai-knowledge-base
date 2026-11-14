---
title: "ViaHeaderValue class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Http.Headers/ViaHeaderValue.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ViaHeaderValue class

Namespace: `System.Net.Http.Headers`

```csharp
public class ViaHeaderValue : ICloneable
```

Represents the value of a Via header.

To be added.

## ViaHeaderValue.ViaHeaderValue(String, String) constructor

```csharp
public ViaHeaderValue (string protocolVersion, string receivedBy);
```

Initializes a new instance of the `ViaHeaderValue` class.

Parameters:

- `protocolVersion`: The protocol version of the received protocol.
- `receivedBy`: The host and port that the request or response was received by.

To be added.

## ViaHeaderValue.ViaHeaderValue(String, String, String) constructor

```csharp
public ViaHeaderValue (string protocolVersion, string receivedBy, string? protocolName);
```

Initializes a new instance of the `ViaHeaderValue` class.

Parameters:

- `protocolVersion`: The protocol version of the received protocol.
- `receivedBy`: The host and port that the request or response was received by.
- `protocolName`: The protocol name of the received protocol.

To be added.

## ViaHeaderValue.ViaHeaderValue(String, String, String, String) constructor

```csharp
public ViaHeaderValue (string protocolVersion, string receivedBy, string? protocolName, string? comment);
```

Initializes a new instance of the `ViaHeaderValue` class.

Parameters:

- `protocolVersion`: The protocol version of the received protocol.
- `receivedBy`: The host and port that the request or response was received by.
- `protocolName`: The protocol name of the received protocol.
- `comment`: The comment field used to identify the software of the recipient proxy or gateway.

To be added.

## ViaHeaderValue.Comment property

```csharp
public string? Comment { get; }
```

Gets the comment field used to identify the software of the recipient proxy or gateway.

Returns: The comment field used to identify the software of the recipient proxy or gateway.

To be added.

## ViaHeaderValue.ProtocolName property

```csharp
public string? ProtocolName { get; }
```

Gets the protocol name of the received protocol.

Returns: The protocol name.

To be added.

## ViaHeaderValue.ProtocolVersion property

```csharp
public string ProtocolVersion { get; }
```

Gets the protocol version of the received protocol.

Returns: The protocol version.

To be added.

## ViaHeaderValue.ReceivedBy property

```csharp
public string ReceivedBy { get; }
```

Gets the host and port that the request or response was received by.

Returns: The host and port that the request or response was received by.

#### Remarks
The Via general-header field must be used by gateways and proxies to indicate the intermediate protocols and recipients between the user agent and the server on requests, and between the origin server and the client on responses.

## ViaHeaderValue.Equals(Object) method

```csharp
public override bool Equals (object? obj);
```

Determines whether the specified `Object` is equal to the current `ViaHeaderValue` object.

Parameters:

- `obj`: The object to compare with the current object.

Returns: `true` if the specified `Object` is equal to the current object; otherwise, `false`.

To be added.

## ViaHeaderValue.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Serves as a hash function for an `ViaHeaderValue` object.

Returns: A hash code for the current object.

#### Remarks
A hash code is a numeric value that is used to identify an object during equality testing. It can also serve as an index for an object in a collection.

The `ViaHeaderValue.GetHashCode` method is suitable for use in hashing algorithms and data structures such as a hash table.

## ViaHeaderValue.Parse(String) method

```csharp
public static System.Net.Http.Headers.ViaHeaderValue Parse (string input);
```

Converts a string to an `ViaHeaderValue` instance.

Parameters:

- `input`: A string that represents via header value information.

Returns: A `ViaHeaderValue` instance.

Exceptions:

- `ArgumentNullException`: `input` is a `null` reference.
- `FormatException`: `input` is not valid via header value information.

To be added.

## ViaHeaderValue.System.ICloneable.Clone() method

```csharp
object ICloneable.Clone ();
```

Creates a new object that is a copy of the current `ViaHeaderValue` instance.

Returns: A copy of the current instance.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `ViaHeaderValue` instance is cast to an `ICloneable` interface.

## ViaHeaderValue.ToString() method

```csharp
public override string ToString ();
```

Returns a string that represents the current `ViaHeaderValue` object.

Returns: A string that represents the current object.

To be added.

## ViaHeaderValue.TryParse(String, ViaHeaderValue) method

```csharp
public static bool TryParse (string? input, out System.Net.Http.Headers.ViaHeaderValue? parsedValue);
```

Determines whether a string is valid `ViaHeaderValue` information.

Parameters:

- `input`: The string to validate.
- `parsedValue`: The `ViaHeaderValue` version of the string.

Returns: `true` if `input` is valid `ViaHeaderValue` information; otherwise, `false`.

To be added.
