---
title: "SocketAsyncOperation enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Sockets/SocketAsyncOperation.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# SocketAsyncOperation enum

Namespace: `System.Net.Sockets`

```csharp
public enum SocketAsyncOperation
```

The type of asynchronous socket operation most recently performed with this context object.

#### Remarks
This type describes the asynchronous socket operation that was most recently completed using a `SocketAsyncEventArgs` object. The value of the `LastOperation` property is set to None until the `SocketAsyncEventArgs` instance is used to begin an asynchronous socket operation. The property will then be set to the type of asynchronous operation being performed. This type more easily facilitates using a single completion callback delegate for multiple kinds of asynchronous socket operations. This type is intended for use in the SocketAsyncCallback completion routine.

The `SocketAsyncOperation` type is used by the `LastOperation` property.

## SocketAsyncOperation.Accept field

```csharp
Accept
```

A socket Accept operation.

## SocketAsyncOperation.Connect field

```csharp
Connect
```

A socket Connect operation.

## SocketAsyncOperation.Disconnect field

```csharp
Disconnect
```

A socket Disconnect operation.

## SocketAsyncOperation.None field

```csharp
None
```

None of the socket operations.

## SocketAsyncOperation.Receive field

```csharp
Receive
```

A socket Receive operation.

## SocketAsyncOperation.ReceiveFrom field

```csharp
ReceiveFrom
```

A socket ReceiveFrom operation.

## SocketAsyncOperation.ReceiveMessageFrom field

```csharp
ReceiveMessageFrom
```

A socket ReceiveMessageFrom operation.

## SocketAsyncOperation.Send field

```csharp
Send
```

A socket Send operation.

## SocketAsyncOperation.SendPackets field

```csharp
SendPackets
```

A socket SendPackets operation.

## SocketAsyncOperation.SendTo field

```csharp
SendTo
```

A socket SendTo operation.
