---
title: "PingException class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.NetworkInformation/PingException.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# PingException class

Namespace: `System.Net.NetworkInformation`

```csharp
public class PingException : InvalidOperationException
```

The exception that is thrown when a `Send` or `SendAsync` method calls a method that throws an exception.

#### Remarks
The `Ping` class throws this exception to indicate that while sending an Internet Control Message Protocol (ICMP) Echo request, a method called by the `Ping` class threw an unhandled exception. Applications should check the inner exception of a `PingException` object to identify the problem.

The `Ping` class does not throw this exception if the ICMP Echo request fails because of network, ICMP, or destination errors. For such errors, the `Ping` class returns a `PingReply` object with the relevant `IPStatus` value set in the `Status` property.

## PingException.PingException(String) constructor

```csharp
public PingException (string? message);
```

Initializes a new instance of the `PingException` class using the specified message.

Parameters:

- `message`: A `String` that describes the error.

#### Remarks
This constructor initializes the `Message` property with the text in the `message` parameter. The `InnerException` property is set to `null`.

## PingException.PingException(SerializationInfo, StreamingContext) constructor

```csharp
protected PingException (System.Runtime.Serialization.SerializationInfo serializationInfo, System.Runtime.Serialization.StreamingContext streamingContext);
```

Initializes a new instance of the `PingException` class with serialized data.

Parameters:

- `serializationInfo`: The object that holds the serialized object data.
- `streamingContext`: A `StreamingContext` that specifies the contextual information about the source or destination for this serialization.

To be added.

## PingException.PingException(String, Exception) constructor

```csharp
public PingException (string? message, Exception? innerException);
```

Initializes a new instance of the `PingException` class using the specified message and inner exception.

Parameters:

- `message`: A `String` that describes the error.
- `innerException`: The exception that causes the current exception.

#### Remarks
This constructor initializes the `Message` property with the text in the `message` parameter, and the `InnerException` property with the `innerException` parameter.
