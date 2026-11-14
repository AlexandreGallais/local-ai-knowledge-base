---
title: "SendPacketsElement class (part 1 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Sockets/SendPacketsElement.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# SendPacketsElement class

Namespace: `System.Net.Sockets`

```csharp
public class SendPacketsElement
```

Represents an element in a `SendPacketsElement` array.

#### Remarks
The `SendPacketsElement` class is used to enhance the `Socket` class for use by server applications that use asynchronous network I/O to achieve the highest performance. The `SendPacketsElement` class is used with the `SendPacketsElements` property to get or set a data buffer or file to be sent using the `Socket.SendPacketsAsync` method.

## SendPacketsElement.SendPacketsElement(Byte[]) constructor

```csharp
public SendPacketsElement (byte[] buffer);
```

Initializes a new instance of the `SendPacketsElement` class using the specified buffer.

Parameters:

- `buffer`: A byte array of data to send using the `Socket.SendPacketsAsync` method.

Exceptions:

- `ArgumentNullException`: The `buffer` parameter cannot be null.

#### Remarks
The `SendPacketsElement` class is used with the `SendPacketsElements` property to get or set a data buffer or file to be sent using the `Socket.SendPacketsAsync` method.

## SendPacketsElement.SendPacketsElement(FileStream) constructor

```csharp
public SendPacketsElement (System.IO.FileStream fileStream);
```

Initializes a new instance of the `SendPacketsElement` class using the specified `FileStream` object.

Parameters:

- `fileStream`: The file to be transmitted using the `Socket.SendPacketsAsync` method.

Exceptions:

- `ArgumentException`: `fileStream` is not open for asynchronous reading and writing.
- `ArgumentNullException`: `fileStream` cannot be null.

#### Remarks
The `SendPacketsElement` class is used with the `SendPacketsElements` property to get or set a data buffer or file to be sent using the `Socket.SendPacketsAsync` method.

## SendPacketsElement.SendPacketsElement(Byte>) constructor

```csharp
public SendPacketsElement (ReadOnlyMemory<byte> buffer);
```

Initializes a new instance of the `SendPacketsElement` class using the specified buffer.

Parameters:

- `buffer`: A `ReadOnlyMemory<T>` of bytes to send using the `Socket.SendPacketsAsync` method.

#### Remarks
The `SendPacketsElement` class is used with the `SendPacketsElements` property to get or set a data buffer or file to be sent using the `Socket.SendPacketsAsync` method.

## SendPacketsElement.SendPacketsElement(String) constructor

```csharp
public SendPacketsElement (string filepath);
```

Initializes a new instance of the `SendPacketsElement` class using the specified file.

Parameters:

- `filepath`: The filename of the file to be transmitted using the `Socket.SendPacketsAsync` method.

Exceptions:

- `ArgumentNullException`: The `filepath` parameter cannot be null.

#### Remarks
The `SendPacketsElement` class is used with the `SendPacketsElements` property to get or set a data buffer or file to be sent using the `Socket.SendPacketsAsync` method.

Universal Naming Convention (UNC) paths are supported by the `filepath` parameter. If the file is in the current working directory, no path information needs to be specified.

## SendPacketsElement.SendPacketsElement(Byte>, Boolean) constructor

```csharp
public SendPacketsElement (ReadOnlyMemory<byte> buffer, bool endOfPacket);
```

Initializes a new instance of the `SendPacketsElement` class using the specified buffer with an option to combine this element with the next element in a single send request from the sockets layer to the transport.

Parameters:

- `buffer`: A `ReadOnlyMemory<T>` of bytes to send using the `Socket.SendPacketsAsync` method.
- `endOfPacket`: Specifies that this element should not be combined with the next element in a single send request from the sockets layer to the transport. This flag is used for granular control of the content of each message on a datagram or message-oriented socket.

#### Remarks
The `SendPacketsElement` class is used with the `SendPacketsElements` property to get or set a data buffer or file to be sent using the `Socket.SendPacketsAsync` method.

## SendPacketsElement.SendPacketsElement(Byte[], Int32, Int32) constructor

```csharp
public SendPacketsElement (byte[] buffer, int offset, int count);
```

Initializes a new instance of the `SendPacketsElement` class using the specified range of the buffer.

Parameters:

- `buffer`: A byte array of data to send using the `Socket.SendPacketsAsync` method.
- `offset`: The offset, in bytes, from the beginning of the `buffer` to the location in the `buffer` to start sending the data specified in the `buffer` parameter.
- `count`: The number of bytes to send starting from the `offset` parameter. If `count` is zero, no bytes are sent.

Exceptions:

- `ArgumentNullException`: The `buffer` parameter cannot be null.
- `ArgumentOutOfRangeException`: The `offset` and `count` parameters must be greater than or equal to zero.

The `offset` and `count` must be less than the size of the buffer.

#### Remarks
The `SendPacketsElement` class is used with the `SendPacketsElements` property to get or set a data buffer or file to be sent using the `Socket.SendPacketsAsync` method.

## SendPacketsElement.SendPacketsElement(FileStream, Int64, Int32) constructor

```csharp
public SendPacketsElement (System.IO.FileStream fileStream, long offset, int count);
```

Initializes a new instance of the `SendPacketsElement` class using the specified range of a `FileStream` object.

Parameters:

- `fileStream`: The file to be transmitted using the `Socket.SendPacketsAsync` method.
- `offset`: The offset, in bytes, from the beginning of the file to the location in the file to start sending the bytes in the file.
- `count`: The number of bytes to send starting from the `offset`. If `count` is zero, the entire file is sent.

Exceptions:

- `ArgumentException`: On Windows, the `fileStream` parameter must have been opened for asynchronous reading and writing. In .NET 10 and earlier, this requirement also applies on non-Windows platforms.
- `ArgumentNullException`: The `fileStream` parameter cannot be `null`.
- `ArgumentOutOfRangeException`: The `offset` and `count` parameters must be greater than or equal to zero.

#### Remarks
The `SendPacketsElement` class is used with the `SendPacketsElements` property to get or set a data buffer or file to be sent using the `Socket.SendPacketsAsync` method.

## SendPacketsElement.SendPacketsElement(String, Int32, Int32) constructor

```csharp
public SendPacketsElement (string filepath, int offset, int count);
```

Initializes a new instance of the `SendPacketsElement` class using the specified range of the file.

Parameters:

- `filepath`: The filename of the file to be transmitted using the `Socket.SendPacketsAsync` method.
- `offset`: The offset, in bytes, from the beginning of the file to the location in the file to start sending the file specified in the `filepath` parameter.
- `count`: The number of bytes to send starting from the `offset` parameter. If `count` is zero, the entire file is sent.

Exceptions:

- `ArgumentNullException`: The `filepath` parameter cannot be null.
- `ArgumentOutOfRangeException`: The `offset` and `count` parameters must be greater than or equal to zero.

#### Remarks
The `SendPacketsElement` class is used with the `SendPacketsElements` property to get or set a data buffer or file to be sent using the `Socket.SendPacketsAsync` method.

Universal Naming Convention (UNC) paths are supported by the `filepath` parameter. If the file is in the current working directory, no path information needs to be specified.

## SendPacketsElement.SendPacketsElement(String, Int64, Int32) constructor

```csharp
public SendPacketsElement (string filepath, long offset, int count);
```

Initializes a new instance of the `SendPacketsElement` class using the specified range of the file.

Parameters:

- `filepath`: The filename of the file to be transmitted using the `Socket.SendPacketsAsync` method.
- `offset`: The offset, in bytes, from the beginning of the file to the location in the file to start sending the file specified in the `filepath` parameter.
- `count`: The number of bytes to send starting from the `offset`. If `count` is zero, the entire file is sent.

Exceptions:

- `ArgumentNullException`: The `filepath` parameter cannot be `null`.
- `ArgumentOutOfRangeException`: The `offset` and `count` parameters must be greater than or equal to zero.

#### Remarks
The `SendPacketsElement` class is used with the `SendPacketsElements` property to get or set a data buffer or file to be sent using the `Socket.SendPacketsAsync` method.

Universal Naming Convention (UNC) paths are supported by the `filepath` parameter. If the file is in the current working directory, no path information needs to be specified.

## SendPacketsElement.SendPacketsElement(Byte[], Int32, Int32, Boolean) constructor

```csharp
public SendPacketsElement (byte[] buffer, int offset, int count, bool endOfPacket);
```

Initializes a new instance of the `SendPacketsElement` class using the specified range of the buffer with an option to combine this element with the next element in a single send request from the sockets layer to the transport.

Parameters:

- `buffer`: A byte array of data to send using the `Socket.SendPacketsAsync` method.
- `offset`: The offset, in bytes, from the beginning of the `buffer` to the location in the `buffer` to start sending the data specified in the `buffer` parameter.
- `count`: The number bytes to send starting from the `offset` parameter. If `count` is zero, no bytes are sent.
- `endOfPacket`: A Boolean value that specifies that this element should not be combined with the next element in a single send request from the sockets layer to the transport. This flag is used for granular control of the content of each message on a datagram or message-oriented socket.

Exceptions:

- `ArgumentNullException`: The `buffer` parameter cannot be null.
- `ArgumentOutOfRangeException`: The `offset` and `count` parameters must be greater than or equal to zero.

The `offset` and `count` must be less than the size of the buffer.

#### Remarks
The `SendPacketsElement` class is used with the `SendPacketsElements` property to get or set a data buffer or file to be sent using the `Socket.SendPacketsAsync` method.

## SendPacketsElement.SendPacketsElement(FileStream, Int64, Int32, Boolean) constructor

```csharp
public SendPacketsElement (System.IO.FileStream fileStream, long offset, int count, bool endOfPacket);
```

Initializes a new instance of the `SendPacketsElement` class using the specified range of a `FileStream` object with an option to combine this element with the next element in a single send request from the sockets layer to the transport.

Parameters:

- `fileStream`: The file to be transmitted using the `Socket.SendPacketsAsync` method.
- `offset`: TThe offset, in bytes, from the beginning of the file to the location in the file to start sending the bytes in the file.
- `count`: The number of bytes to send starting from the offset parameter. If count is zero, the entire file is sent.
- `endOfPacket`: Specifies that this element should not be combined with the next element in a single send request from the sockets layer to the transport. This flag is used for granular control of the content of each message on a datagram or message-oriented socket.

Exceptions:

- `ArgumentException`: On Windows, the `fileStream` parameter must have been opened for asynchronous reading and writing. In .NET 10 and earlier, this requirement also applies on non-Windows platforms.
- `ArgumentNullException`: The `fileStream` parameter cannot be `null`.
- `ArgumentOutOfRangeException`: The `offset` and `count` parameters must be greater than or equal to zero.

#### Remarks
The `SendPacketsElement` class is used with the `SendPacketsElements` property to get or set a data buffer or file to be sent using the `Socket.SendPacketsAsync` method.

## SendPacketsElement.SendPacketsElement(String, Int32, Int32, Boolean) constructor

```csharp
public SendPacketsElement (string filepath, int offset, int count, bool endOfPacket);
```

Initializes a new instance of the `SendPacketsElement` class using the specified range of the file with an option to combine this element with the next element in a single send request from the sockets layer to the transport.

Parameters:

- `filepath`: The filename of the file to be transmitted using the `Socket.SendPacketsAsync` method.
- `offset`: The offset, in bytes, from the beginning of the file to the location in the file to start sending the file specified in the `filepath` parameter.
- `count`: The number of bytes to send starting from the `offset` parameter. If `count` is zero, the entire file is sent.
- `endOfPacket`: A Boolean value that specifies that this element should not be combined with the next element in a single send request from the sockets layer to the transport. This flag is used for granular control of the content of each message on a datagram or message-oriented socket.

Exceptions:

- `ArgumentNullException`: The `filepath` parameter cannot be null.
- `ArgumentOutOfRangeException`: The `offset` and `count` parameters must be greater than or equal to zero.

#### Remarks
The `SendPacketsElement` class is used with the `SendPacketsElements` property to get or set a data buffer or file to be sent using the `Socket.SendPacketsAsync` method.

Universal Naming Convention (UNC) paths are supported by the `filepath` parameter. If the file is in the current working directory, no path information needs to be specified.
