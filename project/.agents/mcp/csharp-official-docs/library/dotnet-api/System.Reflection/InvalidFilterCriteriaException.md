---
title: "InvalidFilterCriteriaException class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Reflection/InvalidFilterCriteriaException.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# InvalidFilterCriteriaException class

Namespace: `System.Reflection`

```csharp
public class InvalidFilterCriteriaException : ApplicationException
```

The exception that is thrown in `Type.FindMembers` when the filter criteria is not valid for the type of filter you are using.

#### Remarks
`InvalidFilterCriteriaException` uses the HRESULT COR_E_INVALIDFILTERCRITERIA, which has the value 0x80131601.

## InvalidFilterCriteriaException.InvalidFilterCriteriaException() constructor

```csharp
public InvalidFilterCriteriaException ();
```

Initializes a new instance of the `InvalidFilterCriteriaException` class with the default properties.

#### Remarks
This constructor initializes an instance of `InvalidFilterCriteriaException` with an empty message string and the root cause exception set to `null`.

This constructor sets the properties of the `Exception` object as follows:

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|null|
|`Exception.Message`|The empty string ("").|

## InvalidFilterCriteriaException.InvalidFilterCriteriaException(String) constructor

```csharp
public InvalidFilterCriteriaException (string? message);
```

Initializes a new instance of the `InvalidFilterCriteriaException` class with the given HRESULT and message string.

Parameters:

- `message`: The message text for the exception.

#### Remarks
An exception that is thrown as a direct result of a previous exception should include a reference to the previous exception in the `InnerException` property. The `InnerException` property returns the same value that is passed into the constructor, or `null` if the `InnerException` property does not supply the inner exception value to the constructor.

The following table shows the initial property values for an instance of `InvalidFilterCriteriaException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|`null`|
|`Exception.Message`|The error message string.|

## InvalidFilterCriteriaException.InvalidFilterCriteriaException(SerializationInfo, StreamingContext) constructor

```csharp
protected InvalidFilterCriteriaException (System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context);
```

Initializes a new instance of the `InvalidFilterCriteriaException` class with the specified serialization and context information.

Parameters:

- `info`: A `SerializationInfo` object that contains the information required to serialize this instance.
- `context`: A `StreamingContext` object that contains the source and destination of the serialized stream associated with this instance.

To be added.

## InvalidFilterCriteriaException.InvalidFilterCriteriaException(String, Exception) constructor

```csharp
public InvalidFilterCriteriaException (string? message, Exception? inner);
```

Initializes a new instance of the `InvalidFilterCriteriaException` class with a specified error message and a reference to the inner exception that is the cause of this exception.

Parameters:

- `message`: The error message that explains the reason for the exception.
- `inner`: The exception that is the cause of the current exception. If the `inner` parameter is not `null`, the current exception is raised in a `catch` block that handles the inner exception.

#### Remarks
An exception that is thrown as a direct result of a previous exception should include a reference to the previous exception in the `InnerException` property. The `InnerException` property returns the same value that is passed into the constructor, or `null` if the `InnerException` property does not supply the inner exception value to the constructor.

The following table shows the initial property values for an instance of `InvalidFilterCriteriaException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|The inner exception reference.|
|`Exception.Message`|The error message string.|
