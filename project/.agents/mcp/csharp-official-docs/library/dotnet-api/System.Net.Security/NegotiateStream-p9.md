---
title: "NegotiateStream class (part 9 of 9)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Security/NegotiateStream.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# NegotiateStream class (part 9 of 9)

## NegotiateStream.WriteAsync(Byte>, CancellationToken) method

```csharp
public override System.Threading.Tasks.ValueTask WriteAsync (ReadOnlyMemory<byte> buffer, System.Threading.CancellationToken <example-value> = default);
```

Write asynchronously the specified number of `Byte`s to the underlying stream.

Parameters:

- `buffer`: A region of memory that contains the data to write to the `NegotiateStream`.
- `cancellationToken`: The token to monitor for cancellation requests.

Returns: A `ValueTask` that represents the asynchronous read operation.

Exceptions:

- `ObjectDisposedException`: This object has been closed.
- `InvalidOperationException`: Authentication has not occurred.
- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

#### Remarks
If encryption, signing, or encryption and signing are enabled, this method reads the data from buffer, encrypts, signs, or encrypts and signs it, and transmits it using the underlying stream. If no security services such as data encryption or signing are in use, this method invokes `Stream.WriteAsync` on the underlying stream.

You cannot call this method until you have successfully authenticated. To authenticate, call one of the `NegotiateStream.AuthenticateAsClient`, `NegotiateStream.AuthenticateAsClientAsync`, `NegotiateStream.BeginAuthenticateAsClient`, `NegotiateStream.AuthenticateAsServer`, `NegotiateStream.AuthenticateAsServerAsync`, or `NegotiateStream.BeginAuthenticateAsServer` methods.

## NegotiateStream.WriteAsync(Byte[], Int32, Int32, CancellationToken) method

```csharp
public override System.Threading.Tasks.Task WriteAsync (byte[] buffer, int offset, int count, System.Threading.CancellationToken <example-value>);
```

Write asynchronously the specified number of `Byte`s to the underlying stream.

Parameters:

- `buffer`: A `Byte` array that supplies the bytes written to the stream.
- `offset`: An `Int32` containing the zero-based location in `buffer` at which to begin reading bytes to be written to the stream.
- `count`: A `Int32` containing the number of bytes to read from `buffer`.
- `cancellationToken`: To be added.

Returns: A `Task` that represents the asynchronous read operation.

Exceptions:

- `ArgumentNullException`: `buffer` is `null`.
- `ArgumentException`: `offset` is less than 0.

-or-

`offset` is greater than the length of `buffer`.

-or-

`offset` plus count is greater than the length of `buffer`.
- `IOException`: The write operation failed.

-or-

Encryption is in use, but the data could not be encrypted.
- `ObjectDisposedException`: This object has been closed.
- `InvalidOperationException`: Authentication has not occurred.
- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

#### Remarks
If encryption, signing, or encryption and signing are enabled, this method reads the data from buffer, encrypts, signs, or encrypts and signs it, and transmits it using the underlying stream. If no security services such as data encryption or signing are in use, this method invokes `Stream.WriteAsync` on the underlying stream.

You cannot call this method until you have successfully authenticated. To authenticate, call one of the `NegotiateStream.AuthenticateAsClient`, `NegotiateStream.AuthenticateAsClientAsync`, `NegotiateStream.BeginAuthenticateAsClient`, `NegotiateStream.AuthenticateAsServer`, `NegotiateStream.AuthenticateAsServerAsync`, or `NegotiateStream.BeginAuthenticateAsServer` methods.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `Write`.
