---
title: "DivideByZeroException class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/DivideByZeroException.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DivideByZeroException class

Namespace: `System`

```csharp
public class DivideByZeroException : ArithmeticException
```

The exception that is thrown when there is an attempt to divide an integral or `Decimal` value by zero.

#### Remarks
Trying to divide an integer or `Decimal` number by zero throws a `DivideByZeroException` exception. To prevent the exception, ensure that the denominator in a division operation with integer or `Decimal` values is non-zero.

Dividing a floating-point value by zero doesn't throw an exception; it results in positive infinity, negative infinity, or not a number (NaN), according to the rules of IEEE 754 arithmetic. Because the following example uses floating-point division rather than integer division, the operation does not throw a `DivideByZeroException` exception.

_Code sample not included: ~/snippets/csharp/System/DivideByZeroException/Overview/exception2.cs._

For more information, see `Single` and `Double`.

The following Microsoft intermediate language (MSIL) instructions throw `DivideByZeroException`:

- div

- div.un

- rem

- rem.un

`DivideByZeroException` uses the HRESULT COR_E_DIVIDEBYZERO, which has the value 0x80020012.

For a list of initial property values for an instance of `DivideByZeroException`, see the `DivideByZeroException.%23ctor` constructors.

#### Examples
The following example handles a `DivideByZeroException` exception in integer division.

_Code sample not included: ~/snippets/csharp/System/DivideByZeroException/Overview/exception1.cs._

## DivideByZeroException.DivideByZeroException() constructor

```csharp
public DivideByZeroException ();
```

Initializes a new instance of the `DivideByZeroException` class.

#### Remarks
This constructor initializes the `Message` property of the new instance to a system-supplied message that describes the error, such as "Attempted to divide by zero." This message takes into account the current system culture.

The following table shows the initial property values for an instance of `DivideByZeroException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|A null reference (`Nothing` in Visual Basic).|
|`Exception.Message`|The localized error message string.|

## DivideByZeroException.DivideByZeroException(String) constructor

```csharp
public DivideByZeroException (string? message);
```

Initializes a new instance of the `DivideByZeroException` class with a specified error message.

Parameters:

- `message`: A `String` that describes the error.

#### Remarks
The content of `message` is intended to be understood by humans. The caller of this constructor is required to ensure that this string has been localized for the current system culture.

The following table shows the initial property values for an instance of `DivideByZeroException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|A null reference (`Nothing` in Visual Basic).|
|`Exception.Message`|The error message string.|

## DivideByZeroException.DivideByZeroException(SerializationInfo, StreamingContext) constructor

```csharp
protected DivideByZeroException (System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context);
```

Initializes a new instance of the `DivideByZeroException` class with serialized data.

Parameters:

- `info`: The object that holds the serialized object data.
- `context`: The contextual information about the source or destination.

To be added.

## DivideByZeroException.DivideByZeroException(String, Exception) constructor

```csharp
public DivideByZeroException (string? message, Exception? innerException);
```

Initializes a new instance of the `DivideByZeroException` class with a specified error message and a reference to the inner exception that is the cause of this exception.

Parameters:

- `message`: The error message that explains the reason for the exception.
- `innerException`: The exception that is the cause of the current exception. If the `innerException` parameter is not `null`, the current exception is raised in a `catch` block that handles the inner exception.

#### Remarks
An exception that is thrown as a direct result of a previous exception should include a reference to the previous exception in the `InnerException` property. The `InnerException` property returns the same value that is passed into the constructor, or `null` if the `InnerException` property does not supply the inner exception value to the constructor.

The following table shows the initial property values for an instance of `DivideByZeroException`.

|Property Type|Condition|
|-------------------|---------------|
|`Exception.InnerException`|The inner exception reference.|
|`Exception.Message`|The error message string.|
