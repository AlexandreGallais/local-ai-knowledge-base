---
title: "RankException class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/RankException.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# RankException class

Namespace: `System`

```csharp
public class RankException : SystemException
```

The exception that is thrown when an array with the wrong number of dimensions is passed to a method.

#### Remarks
`RankException` uses the HRESULT COR_E_RANK, that has the value 0x80131517.

For a list of initial property values for an instance of `RankException`, see the `RankException.%23ctor` constructors.

## RankException.RankException() constructor

```csharp
public RankException ();
```

Initializes a new instance of the `RankException` class.

#### Remarks
This constructor initializes the `Message` property of the new instance to a system-supplied message that describes the error, such as "The two arrays must have the same number of dimensions." This message takes into account the current system culture.

The following table shows the initial property values for an instance of `RankException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|A null reference (`Nothing` in Visual Basic).|
|`Exception.Message`|The localized error message string.|

## RankException.RankException(String) constructor

```csharp
public RankException (string? message);
```

Initializes a new instance of the `RankException` class with a specified error message.

Parameters:

- `message`: A `String` that describes the error.

#### Remarks
The content of the `message` parameter should be understandable to the user. The caller of this constructor is required to ensure that this string has been localized for the current system culture.

The following table shows the initial property values for an instance of `RankException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|A null reference (`Nothing` in Visual Basic).|
|`Exception.Message`|The error message string.|

## RankException.RankException(SerializationInfo, StreamingContext) constructor

```csharp
protected RankException (System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context);
```

Initializes a new instance of the `RankException` class with serialized data.

Parameters:

- `info`: The object that holds the serialized object data.
- `context`: The contextual information about the source or destination.

To be added.

## RankException.RankException(String, Exception) constructor

```csharp
public RankException (string? message, Exception? innerException);
```

Initializes a new instance of the `RankException` class with a specified error message and a reference to the inner exception that is the cause of this exception.

Parameters:

- `message`: The error message that explains the reason for the exception.
- `innerException`: The exception that is the cause of the current exception. If the `innerException` parameter is not a null reference (`Nothing` in Visual Basic), the current exception is raised in a `catch` block that handles the inner exception.

#### Remarks
An exception that is thrown as a direct result of a previous exception should include a reference to the previous exception in the `InnerException` property. The `InnerException` property returns the same value that is passed into the constructor, or a null reference (`Nothing` in Visual Basic) if the `InnerException` property does not supply the inner exception value to the constructor.

The following table shows the initial property values for an instance of `RankException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|The inner exception reference.|
|`Exception.Message`|The error message string.|
