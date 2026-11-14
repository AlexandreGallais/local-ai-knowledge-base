---
title: "ArrayTypeMismatchException class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/ArrayTypeMismatchException.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ArrayTypeMismatchException class

Namespace: `System`

```csharp
public class ArrayTypeMismatchException : SystemException
```

The exception that is thrown when an attempt is made to store an element of the wrong type within an array.

#### Remarks
`ArrayTypeMismatchException` is thrown when the system cannot convert the element to the type declared for the array. For example, an element of type `String` cannot be stored in an `Int32` array because conversion between these types is not supported. It is generally unnecessary for applications to throw this exception.

The following Microsoft intermediate language (MSIL) instructions throw `ArrayTypeMismatchException`:

-   `ldelem.<type>`

-   `ldelema`

-   `stelem.<type>`

`ArrayTypeMismatchException` uses the HRESULT COR_E_ARRAYTYPEMISMATCH, which has the value 0x80131503.

For a list of initial property values for an instance of `ArrayTypeMismatchException`, see the `ArrayTypeMismatchException` constructors.

#### Examples
The following code example demonstrates scenarios where `ArrayTypeMismatchException` is thrown.

_Code sample not included: ~/snippets/csharp/System/ArrayTypeMismatchException/Overview/class1.cs._

## ArrayTypeMismatchException.ArrayTypeMismatchException() constructor

```csharp
public ArrayTypeMismatchException ();
```

Initializes a new instance of the `ArrayTypeMismatchException` class.

#### Remarks
This constructor initializes the `Message` property of the new instance to a system-supplied message that describes the error, such as "Source array type cannot be assigned to destination array type." This message takes into account the current system culture.

The following table shows the initial property values for an instance of `ArrayTypeMismatchException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|A null reference (`Nothing` in Visual Basic).|
|`Exception.Message`|The localized error message string.|

#### Examples
The following example demonstrates the ArrayTypeMismatchException() constructor of the `ArrayTypeMismatchException` class. It contains a function which takes two arrays as arguments and checks whether the two arrays are of the same type. If the arrays are of different types, a new `ArrayTypeMismatchException` is thrown and then caught in the calling method.

_Code sample not included: ~/snippets/csharp/System/ArrayTypeMismatchException/.ctor/arraytypemismatch_constructor1.cs._

## ArrayTypeMismatchException.ArrayTypeMismatchException(String) constructor

```csharp
public ArrayTypeMismatchException (string? message);
```

Initializes a new instance of the `ArrayTypeMismatchException` class with a specified error message.

Parameters:

- `message`: A `String` that describes the error.

#### Remarks
The content of the `message` parameter is intended to be understood by humans. The caller of this constructor is required to ensure that this string has been localized for the current system culture.

The following table shows the initial property values for an instance of `ArrayTypeMismatchException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|A null reference (`Nothing` in Visual Basic).|
|`Exception.Message`|The error message string.|

#### Examples
The following example demonstrates the ArrayTypeMismatchException(String) constructor of the `ArrayTypeMismatchException` class. It contains a function which takes two arrays as arguments and checks whether the two arrays are of the same type. If the arrays are of different types, a new `ArrayTypeMismatchException` is thrown and then caught in the calling method.

_Code sample not included: ~/snippets/csharp/System/ArrayTypeMismatchException/.ctor/arraytypemismatch_constructor2.cs._

## ArrayTypeMismatchException.ArrayTypeMismatchException(SerializationInfo, StreamingContext) constructor

```csharp
protected ArrayTypeMismatchException (System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context);
```

Initializes a new instance of the `ArrayTypeMismatchException` class with serialized data.

Parameters:

- `info`: The object that holds the serialized object data.
- `context`: The contextual information about the source or destination.

To be added.

## ArrayTypeMismatchException.ArrayTypeMismatchException(String, Exception) constructor

```csharp
public ArrayTypeMismatchException (string? message, Exception? innerException);
```

Initializes a new instance of the `ArrayTypeMismatchException` class with a specified error message and a reference to the inner exception that is the cause of this exception.

Parameters:

- `message`: The error message that explains the reason for the exception.
- `innerException`: The exception that is the cause of the current exception. If the `innerException` parameter is not a null reference, the current exception is raised in a `catch` block that handles the inner exception.

#### Remarks
An exception that is thrown as a direct result of a previous exception should include a reference to the previous exception in the `InnerException` property. The `InnerException` property returns the same value that is passed into the constructor, or a null reference (`Nothing` in Visual Basic) if the `InnerException` property does not supply the inner exception value to the constructor.

The following table shows the initial property values for an instance of `ArrayTypeMismatchException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|The inner exception reference.|
|`Exception.Message`|The error message string.|

#### Examples
The following code example demonstrates the `ArrayTypeMismatchException.%23ctor` constructor of the `ArrayTypeMismatchException` class. It contains a function that takes two arrays as arguments and checks whether the two arrays are of the same type. If the arrays are of different types, a new `ArrayTypeMismatchException` is thrown and then caught in the calling method.

_Code sample not included: ~/snippets/csharp/System/ArrayTypeMismatchException/.ctor/arraytypemismatch_constructor3.cs._
