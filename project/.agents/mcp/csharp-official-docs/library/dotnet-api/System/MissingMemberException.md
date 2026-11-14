---
title: "MissingMemberException class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/MissingMemberException.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# MissingMemberException class

Namespace: `System`

```csharp
public class MissingMemberException : MemberAccessException
```

The exception that is thrown when there is an attempt to dynamically access a class member that does not exist or that is not declared as public. If a member in a class library has been removed or renamed, recompile any assemblies that reference that library.

#### Remarks
Normally a compilation error is generated if the code attempts to access a nonexistent member of a class. `MissingMemberException` is designed to handle cases where a field or a method is deleted or renamed in one assembly and the change is not reflected in a second assembly. At runtime, `MissingMemberException` will be thrown when the code in the second assembly attempts to access the missing member in the first assembly.

`MissingMemberException` is the base class for `MissingFieldException` and `MissingMethodException`. In general it is better to use one of the derived classes of `MissingMemberException` to more precisely indicate the exact nature of the error. Throw a `MissingMemberException` if you are only interested in capturing the general case of a missing member error.

`MissingMemberException` uses the HRESULT COR_E_MISSINGMEMBER, that has the value 0x80131512.

For a list of initial property values for an instance of `MissingMemberException`, see the `MissingMemberException.%23ctor` constructors.

#### Examples
This example shows what happens if you attempt to use reflection to call a method that does not exist and access a field that does not exist. The application recovers by catching the `MissingMethodException`, `MissingFieldException`, and `MissingMemberException`.

_Code sample not included: ~/snippets/csharp/System/MissingFieldException/Overview/MissingMethodException.cs._

## MissingMemberException.MissingMemberException() constructor

```csharp
public MissingMemberException ();
```

Initializes a new instance of the `MissingMemberException` class.

#### Remarks
This constructor initializes the `Message` property of the new instance to a system-supplied message that describes the error, such as "Attempted to access a missing member." This message takes into account the current system culture.

The following table shows the initial property values for an instance of `MissingMemberException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|A null reference (`Nothing` in Visual Basic).|
|`MissingMemberException.Message`|The localized error message string.|

## MissingMemberException.MissingMemberException(String) constructor

```csharp
public MissingMemberException (string? message);
```

Initializes a new instance of the `MissingMemberException` class with a specified error message.

Parameters:

- `message`: The message that describes the error.

#### Remarks
The content of the `message` parameter should be understandable by the user. The caller of this constructor is required to ensure that this string has been localized for the current system culture.

The following table shows the initial property values for an instance of `MissingMemberException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|A null reference (`Nothing` in Visual Basic).|
|`MissingMemberException.Message`|The error message string.|

## MissingMemberException.MissingMemberException(SerializationInfo, StreamingContext) constructor

```csharp
protected MissingMemberException (System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context);
```

Initializes a new instance of the `MissingMemberException` class with serialized data.

Parameters:

- `info`: The object that holds the serialized object data.
- `context`: The contextual information about the source or destination.

To be added.

## MissingMemberException.MissingMemberException(String, Exception) constructor

```csharp
public MissingMemberException (string? message, Exception? inner);
```

Initializes a new instance of the `MissingMemberException` class with a specified error message and a reference to the inner exception that is the root cause of this exception.

Parameters:

- `message`: The error message that explains the reason for the exception.
- `inner`: An instance of `Exception` that is the cause of the current `Exception`. If `inner` is not a null reference (`Nothing` in Visual Basic), then the current `Exception` is raised in a catch block handling `inner`.

#### Remarks
An exception that is thrown as a direct result of a previous exception can include a reference to the previous exception in the `InnerException` property. The `InnerException` property returns the same value that is passed into the constructor, or a null reference (`Nothing` in Visual Basic) if the `InnerException` property does not supply the inner exception value to the constructor.

The following table shows the initial property values for an instance of `MissingMemberException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|The inner exception reference.|
|`MissingMemberException.Message`|The error message string.|

## MissingMemberException.MissingMemberException(String, String) constructor

```csharp
public MissingMemberException (string? className, string? memberName);
```

Initializes a new instance of the `MissingMemberException` class with the specified class name and member name.

Parameters:

- `className`: The name of the class in which access to a nonexistent member was attempted.
- `memberName`: The name of the member that cannot be accessed.

To be added.

## MissingMemberException.Message property

```csharp
public override string Message { get; }
```

Gets the text string showing the class name, the member name, and the signature of the missing member.

Returns: The error message string.

#### Remarks
If the class name is not specified when the object is constructed, the default text string inherited from the base class is returned.

This property overrides `Exception.Message`. The error message should be localized.

This property is read-only.

#### Examples
The following example demonstrates the `Message` property. This code example is part of a larger example provided for the `MissingMemberException` class.

_Code sample not included: ~/snippets/csharp/System/MissingFieldException/Overview/MissingMethodException.cs._

## MissingMemberException.GetObjectData(SerializationInfo, StreamingContext) method

```csharp
public override void GetObjectData (System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context);
```

Sets the `SerializationInfo` object with the class name, the member name, the signature of the missing member, and additional exception information.

Parameters:

- `info`: The object that holds the serialized object data.
- `context`: The contextual information about the source or destination.

Exceptions:

- `ArgumentNullException`: The `info` object is `null`.

To be added.

## MissingMemberException.ClassName field

```csharp
protected string? ClassName;
```

Holds the class name of the missing member.

To be added.

## MissingMemberException.MemberName field

```csharp
protected string? MemberName;
```

Holds the name of the missing member.

To be added.

## MissingMemberException.Signature field

```csharp
protected byte[]? Signature;
```

Holds the signature of the missing member.

#### Remarks
`Signature` contains a `Byte` value that represents the signature of the missing member.

`String.Format` is used to format the signature. For more information, see `SignatureHelper` and `String`.
