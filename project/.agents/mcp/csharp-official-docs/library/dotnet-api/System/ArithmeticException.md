---
title: "ArithmeticException class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/ArithmeticException.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ArithmeticException class

Namespace: `System`

```csharp
public class ArithmeticException : SystemException
```

The exception that is thrown for errors in an arithmetic, casting, or conversion operation.

#### Remarks
`ArithmeticException` is the base class for the following exceptions:

-   `DivideByZeroException`, which is thrown in integer division when the divisor is 0.  For example, attempting to divide 10 by 0 throws a `DivideByZeroException` exception.

-   `NotFiniteNumberException`, which is thrown when an operation is performed on or returns `NaN`, `NegativeInfinity`, `PositiveInfinity`, `NaN`, `NegativeInfinity`, `PositiveInfinity`, and the programming language used does not support those values.

-   `OverflowException`, which is thrown when the result of an operation is outside the bounds of the target data type. That is, it is less than a number's `MinValue` property or greater than its `MaxValue` property.  For example, attempting to assign 200 + 200 to a `Byte` value throws an `OverflowException` exception, since 400 greater than 256, the upper bound of the `Byte` data type.

Your code should not handle or throw this exception. Instead, you should either handle or throw one of its derived classes, since it more precisely indicates the exact nature of the error.

For a list of initial property values for an instance of `ArithmeticException`, see the `ArithmeticException` constructors.

`ArithmeticException` uses the HRESULT COR_E_ARITHMETIC, which has the value 0x80070216.

## ArithmeticException.ArithmeticException() constructor

```csharp
public ArithmeticException ();
```

Initializes a new instance of the `ArithmeticException` class.

#### Remarks
This constructor initializes the `Message` property of the new instance to a system-supplied message that describes the error, such as "The arithmetic operation is not allowed." This message takes into account the current system culture.

The following table shows initial property values for an instance of `ArithmeticException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|`null`.|
|`Exception.Message`|The localized error message string.|

## ArithmeticException.ArithmeticException(String) constructor

```csharp
public ArithmeticException (string? message);
```

Initializes a new instance of the `ArithmeticException` class with a specified error message.

Parameters:

- `message`: A `String` that describes the error.

#### Remarks
The content of the `message` parameter is intended to be understood by humans. The caller of this constructor is required to ensure that this string has been localized for the current system culture.

The following table shows initial property values for an instance of `ArithmeticException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|The null reference (`Nothing` in Visual Basic).|
|`Exception.Message`|The error message string.|

## ArithmeticException.ArithmeticException(SerializationInfo, StreamingContext) constructor

```csharp
protected ArithmeticException (System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context);
```

Initializes a new instance of the `ArithmeticException` class with serialized data.

Parameters:

- `info`: The object that holds the serialized object data.
- `context`: The contextual information about the source or destination.

To be added.

## ArithmeticException.ArithmeticException(String, Exception) constructor

```csharp
public ArithmeticException (string? message, Exception? innerException);
```

Initializes a new instance of the `ArithmeticException` class with a specified error message and a reference to the inner exception that is the cause of this exception.

Parameters:

- `message`: The error message that explains the reason for the exception.
- `innerException`: The exception that is the cause of the current exception. If the `innerException` parameter is not a null reference, the current exception is raised in a `catch` block that handles the inner exception.

#### Remarks
An exception that is thrown as a direct result of a previous exception should include a reference to the previous exception in the `InnerException` property. The `InnerException` property returns the same value that is passed into the constructor, or a null reference (`Nothing` in Visual Basic) if the `InnerException` property does not supply the inner exception value to the constructor.

The following table shows initial property values for an instance of `ArithmeticException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|The inner exception reference.|
|`Exception.Message`|The error message string.|
