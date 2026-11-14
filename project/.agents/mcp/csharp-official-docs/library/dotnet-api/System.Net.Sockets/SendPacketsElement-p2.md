---
title: "SendPacketsElement class (part 2 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Sockets/SendPacketsElement.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# SendPacketsElement class (part 2 of 2)

## SendPacketsElement.SendPacketsElement(String, Int64, Int32, Boolean) constructor

```csharp
public SendPacketsElement (string filepath, long offset, int count, bool endOfPacket);
```

Initializes a new instance of the `SendPacketsElement` class using the specified range of the file with an option to combine this element with the next element in a single send request from the sockets layer to the transport.

Parameters:

- `filepath`: The filename of the file to be transmitted using the `Socket.SendPacketsAsync` method.
- `offset`: The offset, in bytes, from the beginning of the file to the location in the file to start sending the file specified in the `filepath` parameter.
- `count`: The number of bytes to send starting from the `offset` parameter. If `count` is zero, the entire file is sent.
- `endOfPacket`: Specifies that this element should not be combined with the next element in a single send request from the sockets layer to the transport. This flag is used for granular control of the content of each message on a datagram or message-oriented socket.

Exceptions:

- `ArgumentNullException`: The `filepath` parameter cannot be `null`.
- `ArgumentOutOfRangeException`: The `offset` and `count` parameters must be greater than or equal to zero.

#### Remarks
The `SendPacketsElement` class is used with the `SendPacketsElements` property to get or set a data buffer or file to be sent using the `Socket.SendPacketsAsync` method.

Universal Naming Convention (UNC) paths are supported by the `filepath` parameter. If the file is in the current working directory, no path information needs to be specified.

## SendPacketsElement.Buffer property

```csharp
public byte[]? Buffer { get; }
```

Gets the buffer to be sent if the `SendPacketsElement` object was initialized with a `buffer` parameter.

Returns: The byte buffer to send if the `SendPacketsElement` object was initialized with a `buffer` parameter.

#### Remarks
The default value for the `Buffer` property is `null` if the `SendPacketsElement` object was not initialized with a `buffer` parameter or `buffer` was passed as a `ReadOnlyMemory<T>` of bytes.

In the latter case, the buffer can be obtained using the `MemoryBuffer` property.

## SendPacketsElement.Count property

```csharp
public int Count { get; }
```

Gets the count of bytes to be sent.

Returns: The count of bytes to send if the `SendPacketsElement` class was initialized with a `count` parameter.

#### Remarks
The default value for the `Count` property is zero if the `SendPacketsElement` class was not initialized with a `count` parameter.

If `SendPacketsElement.Count` is zero for a file, the entire file is sent. If `SendPacketsElement.Count` is zero for a buffer, no bytes are sent.

## SendPacketsElement.EndOfPacket property

```csharp
public bool EndOfPacket { get; }
```

Gets a Boolean value that indicates if this element should not be combined with the next element in a single send request from the sockets layer to the transport.

Returns: A Boolean value that indicates if this element should not be combined with the next element in a single send request.

#### Remarks
The default value for the `EndOfPacket` property is false if the `SendPacketsElement` class was not initialized with an `endOfPacket` parameter set to true.

## SendPacketsElement.FilePath property

```csharp
public string? FilePath { get; }
```

Gets the filename of the file to send if the `SendPacketsElement` object was initialized with a `filepath` parameter.

Returns: The filename of the file to send if the `SendPacketsElement` object was initialized with a `filepath` parameter.

#### Remarks
Universal Naming Convention (UNC) paths are supported by the `FilePath` property. If the file is in the current working directory, no path information needs to be specified.

The default value for the `FilePath` property is `null` if the `SendPacketsElement` object was not initialized with a `filepath` parameter.

## SendPacketsElement.FileStream property

```csharp
public System.IO.FileStream? FileStream { get; }
```

Gets the object representation of the file to send if the `SendPacketsElement` object was initialized with a `FileStream` parameter.

Returns: An object representation of the file to send if the `SendPacketsElement` object was initialized with a `FileStream` parameter.

#### Remarks

The default value for the `FileStream` property is `null` if the `SendPacketsElement` object was not initialized with a `fileStream` parameter.

## SendPacketsElement.MemoryBuffer property

```csharp
public ReadOnlyMemory<byte>? MemoryBuffer { get; }
```

Gets the buffer to be sent if the `SendPacketsElement` object was initialized with a
```csharp
buffer
```
parameter.

Returns: The `ReadOnlyMemory<T>` of bytes to be sent if the `SendPacketsElement` object was initialized with a
```csharp
buffer
```
parameter.

#### Remarks
The default value for the `MemoryBuffer` property is `null` if the `SendPacketsElement` object was not initialized with a `buffer` parameter.
If `buffer` was passed as a `byte[]`, `MemoryBuffer` returns the contents of `Buffer` as a `ReadOnlyMemory<T>` of bytes.

## SendPacketsElement.Offset property

```csharp
public int Offset { get; }
```

Gets the offset, in bytes, from the beginning of the data buffer or file to the location in the buffer or file to start sending the data.

Returns: The offset, in bytes, from the beginning of the data buffer or file to the location in the buffer or file to start sending the data.

#### Remarks
The default value for the `Offset` property is zero if the `SendPacketsElement` class was not initialized with an `offset` parameter.

If `OffsetLong` is greater than `MaxValue`, `Offset` will throw a `OverflowException` when you try to access it.

## SendPacketsElement.OffsetLong property

```csharp
public long OffsetLong { get; }
```

Gets the offset, in bytes, from the beginning of the data buffer or file to the location in the buffer or file to start sending the data.

Returns: The offset, in bytes, from the beginning of the data buffer or file to the location in the buffer or file to start sending the data.

#### Remarks
The default value for the `OffsetLong` property is zero if the `SendPacketsElement` class was not initialized with an `offset` parameter.

If `OffsetLong` is greater than `MaxValue`, `Offset` will throw a `OverflowException` when you try to access it.
