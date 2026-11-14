---
title: "SafeArrayRankMismatchException class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.InteropServices/SafeArrayRankMismatchException.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# SafeArrayRankMismatchException class

Namespace: `System.Runtime.InteropServices`

```csharp
public class SafeArrayRankMismatchException : SystemException
```

The exception thrown when the rank of an incoming `SAFEARRAY` does not match the rank specified in the managed signature.

#### Remarks
`SafeArrayRankMismatchException` uses the HRESULT COR_E_SAFEARRAYRANKMISMATCH, which has the value 0x80131538.

The rank of a `SAFEARRAY` is the number of dimensions in that array.

## SafeArrayRankMismatchException.SafeArrayRankMismatchException() constructor

```csharp
public SafeArrayRankMismatchException ();
```

Initializes a new instance of the `SafeArrayTypeMismatchException` class with default values.

#### Remarks
`SafeArrayRankMismatchException` inherits from `SystemException`. This constructor sets the properties of the `Exception` object as shown in the following table.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|`null`.|
|`Exception.Message`|A localized error message string.|

## SafeArrayRankMismatchException.SafeArrayRankMismatchException(String) constructor

```csharp
public SafeArrayRankMismatchException (string? message);
```

Initializes a new instance of the `SafeArrayRankMismatchException` class with the specified message.

Parameters:

- `message`: The message that indicates the reason for the exception.

#### Remarks
`SafeArrayRankMismatchException` inherits from `SystemException`. This constructor sets the properties of the `Exception` object as shown in the following table.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|`null`.|
|`Exception.Message`|`message`|

## SafeArrayRankMismatchException.SafeArrayRankMismatchException(SerializationInfo, StreamingContext) constructor

```csharp
protected SafeArrayRankMismatchException (System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context);
```

Initializes a new instance of the `SafeArrayTypeMismatchException` class from serialization data.

Parameters:

- `info`: The object that holds the serialized object data.
- `context`: The contextual information about the source or destination.

Exceptions:

- `ArgumentNullException`: `info` is `null`.

To be added.

## SafeArrayRankMismatchException.SafeArrayRankMismatchException(String, Exception) constructor

```csharp
public SafeArrayRankMismatchException (string? message, Exception? inner);
```

Initializes a new instance of the `SafeArrayRankMismatchException` class with a specified error message and a reference to the inner exception that is the cause of this exception.

Parameters:

- `message`: The error message that explains the reason for the exception.
- `inner`: The exception that is the cause of the current exception. If the `inner` parameter is not `null`, the current exception is raised in a `catch` block that handles the inner exception.

#### Remarks
An exception that is thrown as a direct result of a previous exception should include a reference to the previous exception in the `InnerException` property. The `InnerException` property returns the same value that is passed into the constructor, or `null` if the `InnerException` property does not supply the inner exception value to the constructor.

The following table shows the initial property values for an instance of `SafeArrayRankMismatchException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|The inner exception reference.|
|`Exception.Message`|The error message string.|
