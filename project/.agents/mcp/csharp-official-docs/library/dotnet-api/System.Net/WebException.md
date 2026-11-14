---
title: "WebException class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net/WebException.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# WebException class

Namespace: `System.Net`

```csharp
public class WebException : InvalidOperationException
```

The exception that is thrown when an error occurs while accessing the network through a pluggable protocol.

#### Remarks
The `WebException` class is thrown by classes descended from `WebRequest` and `WebResponse` that implement pluggable protocols for accessing the Internet.

When `WebException` is thrown by a descendant of the `WebRequest` class, the `Response` property provides the Internet response to the application.

**Associated Tips**

**Check the Response property of the exception to determine why the request failed.**
When a `WebException` exception is thrown by a descendent of the `WebRequest` class, the `Response` property provides the Internet response to the application.

**Check the Status property of the exception to determine why the request failed.**
The `Status` property of the exception provides status information for the error. For more information, see `WebExceptionStatus`.

**If you are timing out when stepping into an XML Web Service, set the timeout value for the XML Web Service call to infinite.**

## WebException.WebException() constructor

```csharp
public WebException ();
```

Initializes a new instance of the `WebException` class.

#### Remarks
The parameterless constructor initializes a new instance of the `WebException` class. The `Message` property is initialized to a system-supplied message that describes the error. This message takes into account the current system culture. The `Exception.InnerException` and `WebException.Response` properties are initialized to `null`. The `Status` property is initialized to `RequestCanceled`.

#### Examples
The following example throws a default `WebException`.

_Code sample not included: ~/snippets/csharp/System.Net/WebException/.ctor/webexception_constructor1.cs._

## WebException.WebException(String) constructor

```csharp
public WebException (string? message);
```

Initializes a new instance of the `WebException` class with the specified error message.

Parameters:

- `message`: The text of the error message.

#### Remarks
The `WebException` instance is initialized with the `Message` property set to the value of `message`. If `message` is `null`, the `Message` property is initialized to a system-supplied message. The `Exception.InnerException` and `WebException.Response` properties are initialized to `null`. The `Status` property is initialized to `RequestCanceled`.

#### Examples
The following example throws a `WebException` by specifying an error message.

_Code sample not included: ~/snippets/csharp/System.Net/WebException/.ctor/webexception_constructor2.cs._

## WebException.WebException(SerializationInfo, StreamingContext) constructor

```csharp
protected WebException (System.Runtime.Serialization.SerializationInfo serializationInfo, System.Runtime.Serialization.StreamingContext streamingContext);
```

Initializes a new instance of the `WebException` class from the specified `SerializationInfo` and `StreamingContext` instances.

Parameters:

- `serializationInfo`: A `SerializationInfo` that contains the information required to serialize the new `WebException`.
- `streamingContext`: A `StreamingContext` that contains the source of the serialized stream that is associated with the new `WebException`.

To be added.

## WebException.WebException(String, Exception) constructor

```csharp
public WebException (string? message, Exception? innerException);
```

Initializes a new instance of the `WebException` class with the specified error message and nested exception.

Parameters:

- `message`: The text of the error message.
- `innerException`: A nested exception.

#### Remarks
The `WebException` instance is initialized with the `Message` property set to the value of `message` and the `InnerException` property set to the value of `innerException`. If `message` is `null`, the `Message` property is initialized to a system-supplied message. The `Exception.InnerException` and `WebException.Response` properties are initialized to `null`. The `Status` property is initialized to `RequestCanceled`.

#### Examples
The following example throws a `WebException` by specifying an error message and nested exception.

_Code sample not included: ~/snippets/csharp/System.Net/WebException/.ctor/webexception_constructor4.cs._

## WebException.WebException(String, WebExceptionStatus) constructor

```csharp
public WebException (string? message, System.Net.WebExceptionStatus status);
```

Initializes a new instance of the `WebException` class with the specified error message and status.

Parameters:

- `message`: The text of the error message.
- `status`: One of the `WebExceptionStatus` values.

#### Remarks
The `WebException` instance is initialized with the `Message` property set to the value of `message` and the `Status` property set to the value of `status`. If `message` is `null`, the `Message` property is initialized to a system-supplied message. The `Exception.InnerException` and `WebException.Response` properties are initialized to `null`.

#### Examples
The following example throws a `WebException` by specifying an error message and a `WebExceptionStatus`.

_Code sample not included: ~/snippets/csharp/System.Net/WebException/.ctor/webexception_constructor3.cs._

## WebException.WebException(String, Exception, WebExceptionStatus, WebResponse) constructor

```csharp
public WebException (string? message, Exception? innerException, System.Net.WebExceptionStatus status, System.Net.WebResponse? response);
```

Initializes a new instance of the `WebException` class with the specified error message, nested exception, status, and response.

Parameters:

- `message`: The text of the error message.
- `innerException`: A nested exception.
- `status`: One of the `WebExceptionStatus` values.
- `response`: A `WebResponse` instance that contains the response from the remote host.

#### Remarks
The `WebException` instance is initialized with the `Message` property set to the value of `message`, the `InnerException` property set to the value of `innerException`, the `Status` property set to the value of `status`, and the `Response` property set to the value of `response`. If `message` is `null`, the `Message` property is initialized to a system-supplied message.

#### Examples
The following example throws a `WebException` by specifying an error message and a `WebExceptionStatus`.

_Code sample not included: ~/snippets/csharp/System.Net/WebException/.ctor/webexception_constructor5.cs._

## WebException.Response property

```csharp
public System.Net.WebResponse? Response { get; }
```

Gets the response that the remote host returned.

Returns: If a response is available from the Internet resource, a `WebResponse` instance that contains the error response from an Internet resource; otherwise, `null`.

#### Remarks
Some Internet protocols, such as HTTP, return otherwise valid responses indicating that an error has occurred at the protocol level. When the response to an Internet request indicates an error, `WebRequest.GetResponse` sets the `Status` property to `ProtocolError` and provides the `WebResponse` that contains the error message in the `Response` property of the `WebException` that was thrown. The application can examine the `WebResponse` to determine the actual error.

#### Examples
The following example checks the `Status` property and prints to the console the `HttpWebResponse.StatusCode` and `HttpWebResponse.StatusDescription` of the underlying `HttpWebResponse` instance.

_Code sample not included: ~/snippets/csharp/System.Net/WebException/Response/webexception_status_response.cs._

## WebException.Status property

```csharp
public System.Net.WebExceptionStatus Status { get; }
```

Gets the status of the response.

Returns: One of the `WebExceptionStatus` values.

#### Remarks
The `Status` property indicates the reason for the `WebException`.

The value of `WebException.Status` is one of the `WebExceptionStatus` values.

#### Examples
The following example checks the `Status` property and prints to the console the `HttpWebResponse.StatusCode` and `HttpWebResponse.StatusDescription` of the underlying `HttpWebResponse` instance.

_Code sample not included: ~/snippets/csharp/System.Net/WebException/Response/webexception_status_response.cs._

## WebException.GetObjectData(SerializationInfo, StreamingContext) method

```csharp
public override void GetObjectData (System.Runtime.Serialization.SerializationInfo serializationInfo, System.Runtime.Serialization.StreamingContext streamingContext);
```

Populates a `SerializationInfo` instance with the data needed to serialize the `WebException`.

Parameters:

- `serializationInfo`: The `SerializationInfo` to be used.
- `streamingContext`: The `StreamingContext` to be used.

To be added.

## WebException.System.Runtime.Serialization.ISerializable.GetObjectData(SerializationInfo, StreamingContext) method

```csharp
void ISerializable.GetObjectData (System.Runtime.Serialization.SerializationInfo? serializationInfo, System.Runtime.Serialization.StreamingContext streamingContext);
```

Serializes this instance into the specified `SerializationInfo` object.

Parameters:

- `serializationInfo`: The object into which this `WebException` will be serialized.
- `streamingContext`: The destination of the serialization.

To be added.
