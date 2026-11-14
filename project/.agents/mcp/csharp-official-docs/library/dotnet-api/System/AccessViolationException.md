---
title: "AccessViolationException class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/AccessViolationException.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# AccessViolationException class

Namespace: `System`

```csharp
public class AccessViolationException : SystemException
```

The exception that is thrown when there is an attempt to read or write protected memory.

An access violation occurs in unmanaged or unsafe code when the code attempts to read or write to memory that has not been allocated, or to which it does not have access. This usually occurs because a pointer has a bad value. Not all reads or writes through bad pointers lead to access violations, so an access violation usually indicates that several reads or writes have occurred through bad pointers, and that memory might be corrupted. Thus, access violations almost always indicate serious programming errors. An `AccessViolationException` clearly identifies these serious errors.

In programs that consist entirely of verifiable managed code, all references are either valid or null, and access violations are impossible. Any operation that attempts to reference a null reference in verifiable code throws a `NullReferenceException` exception. An `AccessViolationException` occurs only when verifiable managed code interacts with unmanaged code or with unsafe managed code.

#### Troubleshoot AccessViolationException exceptions

An `AccessViolationException` exception can occur only in unsafe managed code or when verifiable managed code interacts with unmanaged code:

- An access violation that occurs in unsafe managed code can be expressed as either a `NullReferenceException` exception or an `AccessViolationException` exception, depending on the platform.
- An access violation in unmanaged code that bubbles up to managed code is always wrapped in an `AccessViolationException` exception.

In either case, you can identify and correct the cause of the `AccessViolationException` exception as follows:

- Make sure that the memory that you're attempting to access has been allocated. An `AccessViolationException` exception is always thrown by an attempt to access protected memory—that is, to access memory that's not allocated or that's not owned by a process.

Automatic memory management is one of the services that the .NET runtime provides. If managed code provides the same functionality as your unmanaged code, consider moving to managed code to take advantage of this functionality. For more information, see Automatic memory management.

- Make sure that the memory that you're attempting to access hasn't been corrupted. If several read or write operations have occurred through bad pointers, memory might be corrupted. This typically occurs when reading or writing to addresses outside of a predefined buffer.

#### AccessViolationException and try/catch blocks

`AccessViolationException` exceptions thrown by the .NET runtime aren't handled by the `catch` statement in a structured exception handler if the exception occurs outside of the memory reserved by the runtime.

> **Caution:**
> The HandleProcessCorruptedStateExceptions attribute is obsolete in current .NET versions. Recovery from corrupted process state–exceptions isn't supported, and the attribute, if present, is ignored.

## AccessViolationException.AccessViolationException() constructor

```csharp
public AccessViolationException ();
```

Initializes a new instance of the `AccessViolationException` class with a system-supplied message that describes the error.

#### Remarks
This constructor initializes the `Message` property of the new instance to a system-supplied message that describes the error, such as "Attempted to read or write protected memory. This is often an indication that other memory has been corrupted." This message takes into account the current system culture.

The following table shows the initial property values for an instance of `AccessViolationException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|`null`.|
|`Exception.Message`|The localized error message string.|

## AccessViolationException.AccessViolationException(String) constructor

```csharp
public AccessViolationException (string? message);
```

Initializes a new instance of the `AccessViolationException` class with a specified message that describes the error.

Parameters:

- `message`: The message that describes the exception. The caller of this constructor is required to ensure that this string has been localized for the current system culture.

#### Remarks
The following table shows the initial property values for an instance of `AccessViolationException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|`null`.|
|`Exception.Message`|The error message string specified in `message`.|

## AccessViolationException.AccessViolationException(SerializationInfo, StreamingContext) constructor

```csharp
protected AccessViolationException (System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context);
```

Initializes a new instance of the `AccessViolationException` class with serialized data.

Parameters:

- `info`: The `SerializationInfo` that holds the serialized object data.
- `context`: The `StreamingContext` that contains contextual information about the source or destination.

To be added.

## AccessViolationException.AccessViolationException(String, Exception) constructor

```csharp
public AccessViolationException (string? message, Exception? innerException);
```

Initializes a new instance of the `AccessViolationException` class with a specified error message and a reference to the inner exception that is the cause of this exception.

Parameters:

- `message`: The message that describes the exception. The caller of this constructor is required to ensure that this string has been localized for the current system culture.
- `innerException`: The exception that is the cause of the current exception. If the `innerException` parameter is not `null`, the current exception is raised in a `catch` block that handles the inner exception.

#### Remarks
An exception that is thrown as a direct result of a previous exception should include a reference to the previous exception in the `InnerException` property. The `InnerException` property returns the same value that is passed into the constructor, or `null` if the `InnerException` property does not supply the inner exception value to the constructor.

The following table shows the initial property values for an instance of `AccessViolationException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|`null`.|
|`Exception.Message`|The error message string specified in `message`.|
