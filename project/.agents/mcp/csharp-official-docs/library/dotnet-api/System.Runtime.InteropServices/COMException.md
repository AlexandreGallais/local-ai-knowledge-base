---
title: "COMException class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.InteropServices/COMException.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# COMException class

Namespace: `System.Runtime.InteropServices`

```csharp
public class COMException : System.Runtime.InteropServices.ExternalException
```

The exception that is thrown when an unrecognized HRESULT is returned from a COM method call.

The `COMException` class is the exception that's thrown when an unrecognized HRESULT is returned from a COM method call.

The common language runtime transforms well-known HRESULTs to .NET exceptions, enabling COM objects to return meaningful error information to managed clients. The HRESULT-to-exception mapping also works in the other direction by returning specific HRESULTs to unmanaged clients. For mapping details, see How to map HRESULTs and exceptions.

When the runtime encounters an unfamiliar HRESULT (an HRESULT that lacks a specific, corresponding exception), it throws an instance of the `COMException` class. This all-purpose exception exposes the same members as any exception, and inherits a public `ErrorCode` property that contains the HRESULT returned by the callee. If an error message is available to the runtime (obtained from the IErrorInfo interface or the `Err` object in Visual Basic, or in some cases from the operating system), the message is returned to the caller. However, if the COM component developer fails to include an error message, the runtime returns the eight-digit HRESULT in place of a message string. Having an HRESULT allows the caller to determine the cause of the generic exception.

#### Handle a COMException exception

The following are some considerations for troubleshooting a `COMException` exception.

Check the `ErrorCode` property
When the runtime encounters an unfamiliar HRESULT and throws a `COMException` exception,  the `ErrorCode` property includes either the error message or, if an error message is unavailable, the eight-digit HRESULT value. The error message or the HRESULT value can help you determine the cause of the exception.

For a list of HRESULT values, see Common HRESULT Values.

When passing late-bound arguments to methods of Microsoft Office objects, a `COMException` exception may be thrown when the objects are COM objects. The late binder assumes that such method calls involve a `ByRef` parameter and that the property you pass has a `set` accessor. If the property does not, .NET generates a `MissingMethodException` exception (with a `CORE_E_MISSINGMETHOD` HRESULT ). To work around this behavior, use early-bound objects or pass a variable instead of a property of the object.

COM is used to communicate between Visual Studio and the hosting process. Because it is used before code runs, a call to CoInitializeSecurity causes this exception to be thrown. In some cases, running Visual Studio as Administrator may resolve the issue. You can also disable the hosting process.

#### Throw a COMException exception

Although you can use the `COMException` class to return specific HRESULTs to unmanaged clients, throwing a specific .NET exception is better than using a generic exception. Consider that managed clients as well as unmanaged clients can use your .NET object, and throwing an HRESULT to a managed caller is less comprehensible than throwing an exception.

## COMException.COMException() constructor

```csharp
public COMException ();
```

Initializes a new instance of the `COMException` class with default values.

#### Remarks
`COMException` inherits from `ExternalException`. The following table shows how this constructor sets the properties of the `Exception` object.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|`null`.|
|`Exception.Message`|A localized error message string.|

## COMException.COMException(String) constructor

```csharp
public COMException (string? message);
```

Initializes a new instance of the `COMException` class with a specified message.

Parameters:

- `message`: The message that indicates the reason for the exception.

#### Remarks
`COMException` inherits from `ExternalException`. The following table shows how this constructor sets the properties of the `Exception` object.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|`null`|
|`Exception.Message`|`message`|

## COMException.COMException(SerializationInfo, StreamingContext) constructor

```csharp
protected COMException (System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context);
```

Initializes a new instance of the `COMException` class from serialization data.

Parameters:

- `info`: The `SerializationInfo` object that holds the serialized object data.
- `context`: The `StreamingContext` object that supplies the contextual information about the source or destination.

Exceptions:

- `ArgumentNullException`: `info` is `null`.

To be added.

## COMException.COMException(String, Exception) constructor

```csharp
public COMException (string? message, Exception? inner);
```

Initializes a new instance of the `COMException` class with a specified error message and a reference to the inner exception that is the cause of this exception.

Parameters:

- `message`: The error message that explains the reason for the exception.
- `inner`: The exception that is the cause of the current exception. If the `inner` parameter is not `null`, the current exception is raised in a `catch` block that handles the inner exception.

#### Remarks
An exception that is thrown as a direct result of a previous exception should include a reference to the previous exception in the `InnerException` property. The `InnerException` property returns the same value that is passed into the constructor, or `null` if the `InnerException` property does not supply the inner exception value to the constructor.

The following table shows how this constructor sets the properties of the `Exception` object.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|The inner exception reference.|
|`Exception.Message`|The error message string.|

## COMException.COMException(String, Int32) constructor

```csharp
public COMException (string? message, int errorCode);
```

Initializes a new instance of the `COMException` class with a specified message and error code.

Parameters:

- `message`: The message that indicates the reason the exception occurred.
- `errorCode`: The error code (HRESULT) value associated with this exception.

#### Remarks
This `COMException` constructor sets the base message with the error code.

`COMException` inherits from `ExternalException`. The following table shows how this constructor sets the properties of the `Exception` object.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|`null`|
|`Exception.Message`|`message`|

## COMException.ToString() method

```csharp
public override string ToString ();
```

Converts the contents of the exception to a string.

Returns: A string containing the `Exception.HResult`, `Exception.Message`, `Exception.InnerException`, and `Exception.StackTrace` properties of the exception.

To be added.
