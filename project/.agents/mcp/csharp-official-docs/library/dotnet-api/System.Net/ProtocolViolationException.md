---
title: "ProtocolViolationException class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net/ProtocolViolationException.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ProtocolViolationException class

Namespace: `System.Net`

```csharp
public class ProtocolViolationException : InvalidOperationException
```

The exception that is thrown when an error is made while using a network protocol.

#### Remarks
A `ProtocolViolationException` is thrown by descendants of `WebRequest` and `WebResponse` to indicate an error using the underlying protocol. For example, the `HttpWebRequest` and `HttpWebResponse` classes throw a `ProtocolViolationException` to indicate an error using HTTP.

## ProtocolViolationException.ProtocolViolationException() constructor

```csharp
public ProtocolViolationException ();
```

Initializes a new instance of the `ProtocolViolationException` class.

#### Remarks
The `Message` property is initialized to a system-supplied message that describes the error. The `InnerException` property is initialized to `null`.

## ProtocolViolationException.ProtocolViolationException(String) constructor

```csharp
public ProtocolViolationException (string? message);
```

Initializes a new instance of the `ProtocolViolationException` class with the specified message.

Parameters:

- `message`: The error message string.

#### Remarks
This constructor initializes a new instance of the `ProtocolViolationException` class with the `Message` property set to the value of the `message` parameter. If `message` is a null reference, the `Message` property is initialized to a system-supplied message. The `InnerException` property is initialized to `null`.

## ProtocolViolationException.ProtocolViolationException(SerializationInfo, StreamingContext) constructor

```csharp
protected ProtocolViolationException (System.Runtime.Serialization.SerializationInfo serializationInfo, System.Runtime.Serialization.StreamingContext streamingContext);
```

Initializes a new instance of the `ProtocolViolationException` class from the specified `SerializationInfo` and `StreamingContext` instances.

Parameters:

- `serializationInfo`: A `SerializationInfo` that contains the information that is required to deserialize the `ProtocolViolationException`.
- `streamingContext`: A `StreamingContext` that contains the source of the serialized stream that is associated with the new `ProtocolViolationException`.

To be added.

## ProtocolViolationException.GetObjectData(SerializationInfo, StreamingContext) method

```csharp
public override void GetObjectData (System.Runtime.Serialization.SerializationInfo serializationInfo, System.Runtime.Serialization.StreamingContext streamingContext);
```

Populates a `SerializationInfo` with the data required to serialize the target object.

Parameters:

- `serializationInfo`: The `SerializationInfo` to populate with data.
- `streamingContext`: A `StreamingContext` that specifies the destination for this serialization.

To be added.

## ProtocolViolationException.System.Runtime.Serialization.ISerializable.GetObjectData(SerializationInfo, StreamingContext) method

```csharp
void ISerializable.GetObjectData (System.Runtime.Serialization.SerializationInfo serializationInfo, System.Runtime.Serialization.StreamingContext streamingContext);
```

Serializes this instance into the specified `SerializationInfo` object.

Parameters:

- `serializationInfo`: The object into which this `ProtocolViolationException` will be serialized.
- `streamingContext`: The destination of the serialization.

To be added.
