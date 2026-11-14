---
title: "SocketAddress class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net/SocketAddress.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# SocketAddress class

Namespace: `System.Net`

```csharp
public class SocketAddress : IEquatable<System.Net.SocketAddress>
```

Stores serialized information from `EndPoint` derived classes.

#### Remarks
The first 2 bytes of the underlying buffer are reserved for the `AddressFamily` enumerated value. When the `SocketAddress` is used to store a serialized `IPEndPoint`, the third and fourth bytes are used to store port number information. The next bytes are used to store the IP address. You can access any information within this underlying byte buffer by referring to its index position; the byte buffer uses zero-based indexing. You can also use the `SocketAddress.Family` and `SocketAddress.Size` properties to get the `AddressFamily` value and the buffer size, respectively. To view any of this information as a string, use the `SocketAddress.ToString` method.

#### Examples
The following example demonstrates how to use `SocketAddress` to serialize an instance of the `EndPoint` class. After serialization, the underlying byte buffer of the `SocketAddress` contains all of the `IPEndPoint` state information.

_Code sample not included: ~/snippets/csharp/System.Net/SocketAddress/Overview/source.cs._

## SocketAddress.SocketAddress(AddressFamily) constructor

```csharp
public SocketAddress (System.Net.Sockets.AddressFamily family);
```

Creates a new instance of the `SocketAddress` class for the given address family.

Parameters:

- `family`: An `AddressFamily` enumerated value.

#### Remarks
This overload sets the underlying buffer size to 32 bytes.

## SocketAddress.SocketAddress(AddressFamily, Int32) constructor

```csharp
public SocketAddress (System.Net.Sockets.AddressFamily family, int size);
```

Creates a new instance of the `SocketAddress` class using the specified address family and buffer size.

Parameters:

- `family`: An `AddressFamily` enumerated value.
- `size`: The number of bytes to allocate for the underlying buffer.

Exceptions:

- `ArgumentOutOfRangeException`: `size` is less than 2. These 2 bytes are needed to store `family`.

#### Remarks
Use this overload to create a new instance of the `SocketAddress` class with a particular underlying buffer size.

## SocketAddress.Buffer property

```csharp
public Memory<byte> Buffer { get; }
```

Gets the underlying memory that can be passed to native OS calls.

Returns: To be added.

The content of the buffer can be invalidated if `SocketAddress.Size` is changed or if the `SocketAddress` instance is used in another receive call.

## SocketAddress.Family property

```csharp
public System.Net.Sockets.AddressFamily Family { get; }
```

Gets the `AddressFamily` enumerated value of the current `SocketAddress`.

Returns: One of the `AddressFamily` enumerated values.

#### Remarks
This method gets the `AddressFamily` enumerated value that represents the addressing scheme of the current `SocketAddress`. If you want to view the corresponding string representation of `AddressFamily`, use the `SocketAddress.ToString` method.

## SocketAddress.Item property

```csharp
public byte this[int offset] { get; set; }
```

Gets or sets the specified index element in the underlying buffer.

Parameters:

- `offset`: The array index element of the desired information.

Returns: The value of the specified index element in the underlying buffer.

Exceptions:

- `IndexOutOfRangeException`: The specified index does not exist in the buffer.

#### Remarks
This property gets or sets the specified byte position in the underlying buffer.

> **Note:**
> Be sure to call `SocketAddress.Size` before referring to elements in the underlying buffer. Referring to an index that does not exist will cause the `SocketAddress` to throw an `IndexOutOfRangeException`.

## SocketAddress.Size property

```csharp
public int Size { get; set; }
```

Gets the underlying buffer size of the `SocketAddress`.

Returns: The underlying buffer size of the `SocketAddress`.

#### Remarks
This property gets the underlying buffer size of the `SocketAddress` in bytes.

## SocketAddress.Equals(SocketAddress) method

```csharp
public bool Equals (System.Net.SocketAddress? comparand);
```

Indicates whether the current object is equal to another object of the same type.

Parameters:

- `comparand`: The object to compare.

Returns: `true` if the current object is equal to the `comparand` parameter; otherwise, `false`.

To be added.

## SocketAddress.Equals(Object) method

```csharp
public override bool Equals (object? comparand);
```

Determines whether the specified `Object` is equal to the current `Object`.

Parameters:

- `comparand`: The `Object` to compare with the current `Object`.

Returns: `true` if the specified `Object` is equal to the current `Object`; otherwise, `false`.

To be added.

## SocketAddress.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Serves as a hash function for a particular type, suitable for use in hashing algorithms and data structures like a hash table.

Returns: A hash code for the current `Object`.

To be added.

## SocketAddress.GetMaximumAddressSize(AddressFamily) method

```csharp
public static int GetMaximumAddressSize (System.Net.Sockets.AddressFamily addressFamily);
```

Gets the maximum required buffer size for the given `AddressFamily`.

Parameters:

- `addressFamily`: The addressing scheme to use.

Returns: The maximum buffer size.

To be added.

## SocketAddress.ToString() method

```csharp
public override string ToString ();
```

Returns information about the socket address.

Returns: A string that contains information about the `SocketAddress`.

#### Remarks
The `SocketAddress.ToString` method returns a string that contains the `AddressFamily` enumerated value, the size of the underlying buffer of the `SocketAddress` structure, and the remaining contents of the buffer.
