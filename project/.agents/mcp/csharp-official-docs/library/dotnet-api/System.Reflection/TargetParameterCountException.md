---
title: "TargetParameterCountException class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Reflection/TargetParameterCountException.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# TargetParameterCountException class

Namespace: `System.Reflection`

```csharp
public sealed class TargetParameterCountException : ApplicationException
```

The exception that is thrown when the number of parameters for an invocation does not match the number expected. This class cannot be inherited.

#### Remarks
`TargetParameterCountException` uses the HRESULT COR_E_TARGETPARAMCOUNT, which has the value 0x8002000E.

## TargetParameterCountException.TargetParameterCountException() constructor

```csharp
public TargetParameterCountException ();
```

Initializes a new instance of the `TargetParameterCountException` class with an empty message string and the root cause of the exception.

#### Remarks
`TargetParameterCountException` inherits from `Exception`. This constructor sets the properties of the Exception object as shown in the following table.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|`null`|
|`Exception.Message`|The empty string ("").|

## TargetParameterCountException.TargetParameterCountException(String) constructor

```csharp
public TargetParameterCountException (string? message);
```

Initializes a new instance of the `TargetParameterCountException` class with its message string set to the given message and the root cause exception.

Parameters:

- `message`: A `String` describing the reason this exception was thrown.

#### Remarks
`TargetParameterCountException` inherits from `Exception`. This constructor sets the properties of the `Exception` object as shown in the following table.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|`null`|
|`Exception.Message`|The message string.|

## TargetParameterCountException.TargetParameterCountException(String, Exception) constructor

```csharp
public TargetParameterCountException (string? message, Exception? inner);
```

Initializes a new instance of the `TargetParameterCountException` class with a specified error message and a reference to the inner exception that is the cause of this exception.

Parameters:

- `message`: The error message that explains the reason for the exception.
- `inner`: The exception that is the cause of the current exception. If the `inner` parameter is not `null`, the current exception is raised in a `catch` block that handles the inner exception.

#### Remarks
An exception that is thrown as a direct result of a previous exception should include a reference to the previous exception in the `InnerException` property. The `InnerException` property returns the same value that is passed into the constructor, or `null` if the `InnerException` property does not supply the inner exception value to the constructor.

The following table shows the initial property values for an instance of `TargetParameterCountException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|The inner exception reference.|
|`Exception.Message`|The error message string.|
