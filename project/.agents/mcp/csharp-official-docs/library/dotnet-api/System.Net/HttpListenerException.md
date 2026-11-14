---
title: "HttpListenerException class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net/HttpListenerException.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# HttpListenerException class

Namespace: `System.Net`

```csharp
public class HttpListenerException : System.ComponentModel.Win32Exception
```

The exception that is thrown when an error occurs processing an HTTP request.

#### Remarks
This exception is thrown by the `HttpListener` class and its associated classes when an error occurs during initialization of the `HttpListener` or while creating or sending a response to an HTTP request. For example, this exception is thrown if the `HttpListener` attempts to register a Uniform Resource Identifier (URI) prefix that is already registered.

**Associated Tips**

Make sure you are not attempting to register a URI prefix that is already registered.
If the URI prefix is already registered, this exception will occur.

Make sure your HTTP request is valid.
This exception is thrown by the `HttpListener` class and its associated classes when an error occurs during the initialization of the `HttpListener` or while creating or sending a response to an HTTP request.

If you are using the `HttpListenerPrefixCollection.Add` method, make sure the `uriPrefix` has not been already added.
This exception will be thrown if another `HttpListener` has already added the prefix `uriPrefix`.

## HttpListenerException.HttpListenerException() constructor

```csharp
public HttpListenerException ();
```

Initializes a new instance of the `HttpListenerException` class.

#### Remarks
This constructor sets the `HttpListenerException.ErrorCode` and `Exception.Message` properties using the most recent Windows error.

## HttpListenerException.HttpListenerException(Int32) constructor

```csharp
public HttpListenerException (int errorCode);
```

Initializes a new instance of the `HttpListenerException` class using the specified error code.

Parameters:

- `errorCode`: A `Int32` value that identifies the error that occurred.

#### Remarks
The value of `errorCode` is used to set the `ErrorCode` property.

## HttpListenerException.HttpListenerException(Int32, String) constructor

```csharp
public HttpListenerException (int errorCode, string message);
```

Initializes a new instance of the `HttpListenerException` class using the specified error code and message.

Parameters:

- `errorCode`: A `Int32` value that identifies the error that occurred.
- `message`: A `String` that describes the error that occurred.

#### Remarks
The value of `errorCode` is used to set the `ErrorCode` property. The `message` parameter is used to set the `Message` property.

## HttpListenerException.HttpListenerException(SerializationInfo, StreamingContext) constructor

```csharp
protected HttpListenerException (System.Runtime.Serialization.SerializationInfo serializationInfo, System.Runtime.Serialization.StreamingContext streamingContext);
```

Initializes a new instance of the `HttpListenerException` class from the specified instances of the `SerializationInfo` and `StreamingContext` classes.

Parameters:

- `serializationInfo`: A `SerializationInfo` object that contains the information required to deserialize the new `HttpListenerException` object.
- `streamingContext`: A `StreamingContext` object.

To be added.

## HttpListenerException.ErrorCode property

```csharp
public override int ErrorCode { get; }
```

Gets a value that identifies the error that occurred.

Returns: A `Int32` value.

#### Remarks
This property returns the Windows error code associated with this exception.
