---
title: "StackOverflowException class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/StackOverflowException.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# StackOverflowException class

Namespace: `System`

```csharp
public sealed class StackOverflowException : SystemException
```

The exception that is thrown when the execution stack exceeds the stack size. This class cannot be inherited.

#### Remarks
`StackOverflowException` is thrown for execution stack overflow errors, typically in case of a very deep or unbounded recursion. So make sure your code doesn't have an infinite loop or infinite recursion.

`StackOverflowException` uses the HRESULT COR_E_STACKOVERFLOW, which has the value 0x800703E9. The `Localloc` intermediate language (IL) instruction throws `StackOverflowException`. For a list of initial property values for a `StackOverflowException` object, see the `StackOverflowException.%23ctor` constructors.

You can't catch a `StackOverflowException` object with a `try`/`catch` block, and the corresponding process is terminated by default. Consequently, you should write your code to detect and prevent a stack overflow. For example, if your app depends on recursion, use a counter or a state condition to terminate the recursive loop. For an illustration of this technique, see the Examples section.

> **Note:**
> Applying the `HandleProcessCorruptedStateExceptionsAttribute` attribute to a method that throws a `StackOverflowException` has no effect. You still cannot handle the exception from user code.

If your app hosts the common language runtime (CLR), it can specify that the CLR should unload the application domain where the stack overflow exception occurs and let the corresponding process continue. For more information, see ICLRPolicyManager Interface.

#### Examples

The following example uses a counter to ensure that the number of recursive calls to the `Execute` method do not exceed a maximum defined by the MAX_RECURSIVE_CALLS constant.

_Code sample not included: ~/snippets/csharp/System/StackOverflowException/Overview/example1a.cs._

## StackOverflowException.StackOverflowException() constructor

```csharp
public StackOverflowException ();
```

Initializes a new instance of the `StackOverflowException` class, setting the `Exception.Message` property of the new instance to a system-supplied message that describes the error, such as "The requested operation caused a stack overflow." This message takes into account the current system culture.

#### Remarks
The following table shows the initial property values for an instance of `StackOverflowException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|`null`.|
|`Exception.Message`|The localized error message string.|

## StackOverflowException.StackOverflowException(String) constructor

```csharp
public StackOverflowException (string? message);
```

Initializes a new instance of the `StackOverflowException` class with a specified error message.

Parameters:

- `message`: A `String` that describes the error. The content of message is intended to be understood by humans. The caller of this constructor is required to ensure that this string has been localized for the current system culture.

#### Remarks
The following table shows the initial property values for an instance of `StackOverflowException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|A null reference (`Nothing` in Visual Basic).|
|`Exception.Message`|The error message string.|

## StackOverflowException.StackOverflowException(String, Exception) constructor

```csharp
public StackOverflowException (string? message, Exception? innerException);
```

Initializes a new instance of the `StackOverflowException` class with a specified error message and a reference to the inner exception that is the cause of this exception.

Parameters:

- `message`: The error message that explains the reason for the exception.
- `innerException`: The exception that is the cause of the current exception. If the `innerException` parameter is not a null reference (`Nothing` in Visual Basic), the current exception is raised in a `catch` block that handles the inner exception.

#### Remarks
An exception that is thrown as a direct result of a previous exception can include a reference to the previous exception in the `InnerException` property. The `InnerException` property returns the same value that is passed into the constructor, or a null reference (`Nothing` in Visual Basic) if the `InnerException` property does not supply the inner exception value to the constructor.

The following table shows the initial property values for an instance of `StackOverflowException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|The inner exception reference.|
|`Exception.Message`|The error message string.|
