---
title: "TypeLoadException class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/TypeLoadException.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# TypeLoadException class

Namespace: `System`

```csharp
public class TypeLoadException : SystemException
```

The exception that is thrown when type-loading failures occur.

#### Remarks
`TypeLoadException` is thrown when the common language runtime cannot find the assembly or the type within the assembly, or cannot load the type. The `Message` property contains more detailed information that can help you identify the cause of the exception.

`TypeLoadException` uses the HRESULT COR_E_TYPELOAD, which has the value 0x80131522.

For a list of initial property values for an instance of `TypeLoadException`, see the `TypeLoadException.%23ctor` constructors.

The exact timing of when statically referenced types are loaded is unspecified. This exception may be thrown before the method that references the missing type starts executing.

## TypeLoadException.TypeLoadException() constructor

```csharp
public TypeLoadException ();
```

Initializes a new instance of the `TypeLoadException` class.

#### Remarks
This constructor initializes the `Message` property of the new instance to a system-supplied message that describes the error, such as "A failure has occurred while loading a type." This message takes into account the current system culture.

The following table shows the initial property values for an instance of `TypeLoadException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|A null reference (`Nothing` in Visual Basic).|
|`TypeLoadException.Message`|The localized error message string.|

## TypeLoadException.TypeLoadException(String) constructor

```csharp
public TypeLoadException (string? message);
```

Initializes a new instance of the `TypeLoadException` class with a specified error message.

Parameters:

- `message`: The message that describes the error.

#### Remarks
The content of the `message` parameter should be understandable to the user. The caller of this constructor is required to ensure that this string has been localized for the current system culture.

The following table shows the initial property values for an instance of `TypeLoadException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|A null reference (`Nothing` in Visual Basic).|
|`TypeLoadException.Message`|The error message string.|

#### Examples
The following code example demonstrates the `%23ctor` constructor. It contains a method that generates a `TypeLoadException` with a custom message, and displays the error message to the console.

_Code sample not included: ~/snippets/csharp/System/TypeLoadException/.ctor/typeloadexception_constructor2.cs._

## TypeLoadException.TypeLoadException(SerializationInfo, StreamingContext) constructor

```csharp
protected TypeLoadException (System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context);
```

Initializes a new instance of the `TypeLoadException` class with serialized data.

Parameters:

- `info`: The object that holds the serialized object data.
- `context`: The contextual information about the source or destination.

Exceptions:

- `ArgumentNullException`: The `info` object is `null`.

To be added.

## TypeLoadException.TypeLoadException(String, Exception) constructor

```csharp
public TypeLoadException (string? message, Exception? inner);
```

Initializes a new instance of the `TypeLoadException` class with a specified error message and a reference to the inner exception that is the cause of this exception.

Parameters:

- `message`: The error message that explains the reason for the exception.
- `inner`: The exception that is the cause of the current exception. If the `inner` parameter is not `null`, the current exception is raised in a `catch` block that handles the inner exception.

#### Remarks
An exception that is thrown as a direct result of a previous exception can include a reference to the previous exception in the `InnerException` property. The `InnerException` property returns the same value that is passed into the constructor, or `null` if the `InnerException` property does not supply the inner exception value to the constructor.

The following table shows the initial property values for an instance of `TypeLoadException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|The inner exception reference.|
|`TypeLoadException.Message`|The error message string.|

#### Examples
The following code example demonstrates the `%23ctor` constructor. It contains a method that generates a `TypeLoadException`, catches that exception, and throws a new `TypeLoadException` with a custom message, including the original `TypeLoadException` as the inner exception.

_Code sample not included: ~/snippets/csharp/System/TypeLoadException/.ctor/typeloadexception_constructor3.cs._

## TypeLoadException.Message property

```csharp
public override string Message { get; }
```

Gets the error message for this exception.

Returns: The error message string.

#### Remarks
This property overrides `Exception.Message`. The error message should be localized.

This property is read-only.

#### Examples
The following example attempts to load a non-existent type from the mscorlib assembly. The resulting exception is caught, and the `TypeLoadException.TypeName` and `TypeLoadException.Message` values are displayed. For this code example to run, you must provide the fully qualified assembly name. For information about how to obtain the fully qualified assembly name, see Assembly Names.

_Code sample not included: ~/snippets/csharp/System/TypeLoadException/Message/typeloadexception_typename.cs._

## TypeLoadException.TypeName property

```csharp
public string TypeName { get; }
```

Gets the fully qualified name of the type that causes the exception.

Returns: The fully qualified type name.

#### Examples
The following example attempts to load a non-existent type from the mscorlib assembly. The resulting exception is caught, and the `TypeLoadException.TypeName` and `TypeLoadException.Message` values are displayed. For this code example to run, you must provide the fully qualified assembly name. For information about how to obtain the fully qualified assembly name, see Assembly Names.

_Code sample not included: ~/snippets/csharp/System/TypeLoadException/Message/typeloadexception_typename.cs._

## TypeLoadException.GetObjectData(SerializationInfo, StreamingContext) method

```csharp
public override void GetObjectData (System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context);
```

Sets the `SerializationInfo` object with the class name, method name, resource ID, and additional exception information.

Parameters:

- `info`: The object that holds the serialized object data.
- `context`: The contextual information about the source or destination.

Exceptions:

- `ArgumentNullException`: The `info` object is `null`.

To be added.
