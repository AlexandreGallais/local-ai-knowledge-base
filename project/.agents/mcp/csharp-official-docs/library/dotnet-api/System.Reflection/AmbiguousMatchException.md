---
title: "AmbiguousMatchException class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Reflection/AmbiguousMatchException.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# AmbiguousMatchException class

Namespace: `System.Reflection`

```csharp
public sealed class AmbiguousMatchException : SystemException
```

The exception that is thrown when binding to a member results in more than one member matching the binding criteria. This class cannot be inherited.

#### Remarks
`AmbiguousMatchException` uses the HRESULT COR_E_AMBIGUOUSMATCH, which has the value 0x8000211D.

An `AmbiguousMatchException` is thrown when a member is invoked late-bound and multiple overloads satisfy the binding criteria, or when more than one member matches the binding criteria passed to a reflection method that can return only a single result (for example, `Type.GetMethod` or `Type.GetProperty`).

## AmbiguousMatchException.AmbiguousMatchException() constructor

```csharp
public AmbiguousMatchException ();
```

Initializes a new instance of the `AmbiguousMatchException` class with an empty message string and the root cause exception set to `null`.

#### Remarks
`AmbiguousMatchException` inherits from `Exception`. This constructor sets the properties of the `Exception` object as shown in the following table.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|`null`|
|`Exception.Message`|The empty string ("").|

## AmbiguousMatchException.AmbiguousMatchException(String) constructor

```csharp
public AmbiguousMatchException (string? message);
```

Initializes a new instance of the `AmbiguousMatchException` class with its message string set to the given message and the root cause exception set to `null`.

Parameters:

- `message`: A string indicating the reason this exception was thrown.

#### Remarks
`AmbiguousMatchException` inherits from `Exception`. This constructor sets the properties of the `Exception` object as shown in the following table.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|`null`|
|`Exception.Message`|The `message` string.|

## AmbiguousMatchException.AmbiguousMatchException(String, Exception) constructor

```csharp
public AmbiguousMatchException (string? message, Exception? inner);
```

Initializes a new instance of the `AmbiguousMatchException` class with a specified error message and a reference to the inner exception that is the cause of this exception.

Parameters:

- `message`: The error message that explains the reason for the exception.
- `inner`: The exception that is the cause of the current exception. If the `inner` parameter is not `null`, the current exception is raised in a `catch` block that handles the inner exception.

#### Remarks
An exception that is thrown as a direct result of a previous exception should include a reference to the previous exception in the `InnerException` property. The `InnerException` property returns the same value that is passed into the constructor, or `null` if the `InnerException` property does not supply the inner exception value to the constructor.

The following table shows the initial property values for an instance of `AmbiguousMatchException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|The inner exception reference.|
|`Exception.Message`|The error message string.|

#### Examples
The following example shows two methods, each named `Mymethod`. One method takes an integer and the other takes a string. If an integer is passed to `Mymethod`, the first method is used. If a string is passed, the second method is used. If it cannot be determined which `Mymethod` to use, `AmbiguousMatchException` is thrown.

_Code sample not included: ~/snippets/csharp/System.Reflection/AmbiguousMatchException/source.cs._
