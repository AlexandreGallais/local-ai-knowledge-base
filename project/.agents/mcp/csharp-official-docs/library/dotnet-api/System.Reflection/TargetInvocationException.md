---
title: "TargetInvocationException class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Reflection/TargetInvocationException.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# TargetInvocationException class

Namespace: `System.Reflection`

```csharp
public sealed class TargetInvocationException : ApplicationException
```

The exception that is thrown by methods invoked through reflection. This class cannot be inherited.

#### Remarks
For more information, see `MethodBase.Invoke`.

`TargetInvocationException` uses the HRESULT COR_E_TARGETINVOCATION, which has the value 0x80131604.

When created, the `TargetInvocationException` is passed a reference to the exception thrown by the method invoked through reflection. The `InnerException` property holds the underlying exception.

## TargetInvocationException.TargetInvocationException(Exception) constructor

```csharp
public TargetInvocationException (Exception? inner);
```

Initializes a new instance of the `TargetInvocationException` class with a reference to the inner exception that is the cause of this exception.

Parameters:

- `inner`: The exception that is the cause of the current exception. If the `inner` parameter is not `null`, the current exception is raised in a `catch` block that handles the inner exception.

#### Remarks
An exception that is thrown as a direct result of a previous exception should include a reference to the previous exception in the `InnerException` property. The `InnerException` property returns the same value that is passed into the constructor, or `null` if the `InnerException` property does not supply the inner exception value to the constructor.

The following table shows the initial property values for an instance of `TargetInvocationException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|The inner exception reference.|
|`Exception.Message`|The error message string.|

## TargetInvocationException.TargetInvocationException(String, Exception) constructor

```csharp
public TargetInvocationException (string? message, Exception? inner);
```

Initializes a new instance of the `TargetInvocationException` class with a specified error message and a reference to the inner exception that is the cause of this exception.

Parameters:

- `message`: The error message that explains the reason for the exception.
- `inner`: The exception that is the cause of the current exception. If the `inner` parameter is not `null`, the current exception is raised in a `catch` block that handles the inner exception.

#### Remarks
An exception that is thrown as a direct result of a previous exception should include a reference to the previous exception in the `InnerException` property. The `InnerException` property returns the same value that is passed into the constructor, or `null` if the `InnerException` property does not supply the inner exception value to the constructor.

The following table shows the initial property values for an instance of `TargetInvocationException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|The inner exception reference.|
|`Exception.Message`|The error message string.|
