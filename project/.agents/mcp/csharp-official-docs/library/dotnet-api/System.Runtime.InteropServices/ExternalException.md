---
title: "ExternalException class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.InteropServices/ExternalException.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ExternalException class

Namespace: `System.Runtime.InteropServices`

```csharp
public class ExternalException : SystemException
```

The base exception type for all COM interop exceptions and structured exception handling (SEH) exceptions.

#### Remarks
To enhance interoperability between legacy systems and the common language runtime, the `ErrorCode` property stores an integer value (HRESULT) that identifies the error. User defined exceptions should never derive from `ExternalException`, and an `ExternalException` should never be thrown by user code. Use the specific exceptions that derive from `ExternalException` instead.

`ExternalException` uses the HRESULT E_FAIL, which has the value 0x80004005.

`ExternalException` uses the default `Object.Equals` implementation, which supports reference equality.

For a list of initial values for an instance of `ExternalException`, see the `ExternalException` constructors.

## ExternalException.ExternalException() constructor

```csharp
public ExternalException ();
```

Initializes a new instance of the `ExternalException` class with default properties.

#### Remarks
The following table shows the initial property values for an instance of `ExternalException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|A null reference (`Nothing` in Visual Basic).|
|`Exception.Message`|A localized error message string.|

## ExternalException.ExternalException(String) constructor

```csharp
public ExternalException (string? message);
```

Initializes a new instance of the `ExternalException` class with a specified error message.

Parameters:

- `message`: The error message that specifies the reason for the exception.

#### Remarks
The following table shows the initial property values for an instance of `ExternalException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|A null reference (`Nothing` in Visual Basic).|
|`Exception.Message`|The error message string.|

## ExternalException.ExternalException(SerializationInfo, StreamingContext) constructor

```csharp
protected ExternalException (System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context);
```

Initializes a new instance of the `ExternalException` class from serialization data.

Parameters:

- `info`: The object that holds the serialized object data.
- `context`: The contextual information about the source or destination.

Exceptions:

- `ArgumentNullException`: `info` is `null`.

To be added.

## ExternalException.ExternalException(String, Exception) constructor

```csharp
public ExternalException (string? message, Exception? inner);
```

Initializes a new instance of the `ExternalException` class with a specified error message and a reference to the inner exception that is the cause of this exception.

Parameters:

- `message`: The error message that explains the reason for the exception.
- `inner`: The exception that is the cause of the current exception. If the `inner` parameter is not `null`, the current exception is raised in a `catch` block that handles the inner exception.

#### Remarks
An exception that is thrown as a direct result of a previous exception should include a reference to the previous exception in the `InnerException` property. The `InnerException` property returns the same value that is passed into the constructor, or `null` if the `InnerException` property does not supply the inner exception value to the constructor.

The following table shows the initial property values for an instance of `ExternalException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|The inner exception reference.|
|`Exception.Message`|The error message string.|

## ExternalException.ExternalException(String, Int32) constructor

```csharp
public ExternalException (string? message, int errorCode);
```

Initializes a new instance of the `ExternalException` class with a specified error message and the HRESULT of the error.

Parameters:

- `message`: The error message that specifies the reason for the exception.
- `errorCode`: The HRESULT of the error.

#### Remarks
The following table shows the initial property values for an instance of `ExternalException`.

|Property|Value|
|--------------|-----------|
|`ExternalException.ErrorCode`|The HRESULT of the error.|
|`Exception.InnerException`|A null reference (`Nothing` in Visual Basic).|
|`Exception.Message`|The error message string.|

## ExternalException.ErrorCode property

```csharp
public virtual int ErrorCode { get; }
```

Gets the `HRESULT` of the error.

Returns: The `HRESULT` of the error.

#### Remarks
See Common HRESULT values for a list of the more frequently encountered error codes. `HRESULT` values are defined in the Winerror.h header file.

## ExternalException.ToString() method

```csharp
public override string ToString ();
```

Returns a string that contains the HRESULT of the error.

Returns: A string that represents the HRESULT.

To be added.
