---
title: "NotFiniteNumberException class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/NotFiniteNumberException.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# NotFiniteNumberException class

Namespace: `System`

```csharp
public class NotFiniteNumberException : ArithmeticException
```

The exception that is thrown when a floating-point value is positive infinity, negative infinity, or Not-a-Number (NaN).

#### Remarks
`NotFiniteNumberException` is available for programming languages that do not support the concepts of infinity and Not-a-Number in floating-point operations.

`NotFiniteNumberException` uses the HRESULT COR_E_NOTFINITENUMBER, which has the value 0x80131528.

For a list of initial property values for an instance of `NotFiniteNumberException`, see the `NotFiniteNumberException.%23ctor` constructors.

## NotFiniteNumberException.NotFiniteNumberException() constructor

```csharp
public NotFiniteNumberException ();
```

Initializes a new instance of the `NotFiniteNumberException` class.

#### Remarks
This constructor initializes the `Message` property of the new instance to a system-supplied message that describes the error, such as "The number encountered was not a finite quantity." This message takes into account the current system culture.

The following table shows the initial property values for an instance of `NotFiniteNumberException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|A null reference (`Nothing` in Visual Basic).|
|`Exception.Message`|The localized error message string.|

## NotFiniteNumberException.NotFiniteNumberException(Double) constructor

```csharp
public NotFiniteNumberException (double offendingNumber);
```

Initializes a new instance of the `NotFiniteNumberException` class with the invalid number.

Parameters:

- `offendingNumber`: The value of the argument that caused the exception.

#### Remarks
The `offendingNumber` parameter must be both a `Double` and an invalid number.

The following table shows the initial property values for an instance of `NotFiniteNumberException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|A null reference (`Nothing` in Visual Basic).|
|`NotFiniteNumberException.OffendingNumber`|The invalid number.|

## NotFiniteNumberException.NotFiniteNumberException(String) constructor

```csharp
public NotFiniteNumberException (string? message);
```

Initializes a new instance of the `NotFiniteNumberException` class with a specified error message.

Parameters:

- `message`: The message that describes the error.

#### Remarks
Ensure that the `message` string is understandable to the user and that it is localized for the current culture.

The following table shows the initial property values for an instance of `NotFiniteNumberException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|A null reference (`Nothing` in Visual Basic).|
|`Exception.Message`|The error message string.|

## NotFiniteNumberException.NotFiniteNumberException(SerializationInfo, StreamingContext) constructor

```csharp
protected NotFiniteNumberException (System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context);
```

Initializes a new instance of the `NotFiniteNumberException` class with serialized data.

Parameters:

- `info`: The object that holds the serialized object data.
- `context`: The contextual information about the source or destination.

To be added.

## NotFiniteNumberException.NotFiniteNumberException(String, Double) constructor

```csharp
public NotFiniteNumberException (string? message, double offendingNumber);
```

Initializes a new instance of the `NotFiniteNumberException` class with a specified error message and the invalid number.

Parameters:

- `message`: The message that describes the error.
- `offendingNumber`: The value of the argument that caused the exception.

#### Remarks
Ensure that the `message` string is understandable to the user and that it is localized for the current culture.

The following table shows the initial property values for an instance of `NotFiniteNumberException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|A null reference (`Nothing` in Visual Basic).|
|`Exception.Message`|The error message string.|
|`NotFiniteNumberException.OffendingNumber`|The invalid number.|

## NotFiniteNumberException.NotFiniteNumberException(String, Exception) constructor

```csharp
public NotFiniteNumberException (string? message, Exception? innerException);
```

Initializes a new instance of the `NotFiniteNumberException` class with a specified error message and a reference to the inner exception that is root cause of this exception.

Parameters:

- `message`: The error message that explains the reason for the exception.
- `innerException`: The exception that is the cause of the current exception. If the `innerException` parameter is not a null reference (`Nothing` in Visual Basic), the current exception is raised in a `catch` block that handles the inner exception.

#### Remarks
An exception that is thrown as a direct result of a previous exception can include a reference to the previous exception in the `InnerException` property. The `InnerException` property returns the same value that is passed into the constructor, or `null` if the `InnerException` property does not supply the inner exception value to the constructor.

The following table shows the initial property values for an instance of `NotFiniteNumberException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|The inner exception reference.|
|`Exception.Message`|The error message string.|

## NotFiniteNumberException.NotFiniteNumberException(String, Double, Exception) constructor

```csharp
public NotFiniteNumberException (string? message, double offendingNumber, Exception? innerException);
```

Initializes a new instance of the `NotFiniteNumberException` class with a specified error message, the invalid number, and a reference to the inner exception that is root cause of this exception.

Parameters:

- `message`: The error message that explains the reason for the exception.
- `offendingNumber`: The value of the argument that caused the exception.
- `innerException`: The exception that is the cause of the current exception. If the `innerException` parameter is not a null reference (`Nothing` in Visual Basic), the current exception is raised in a `catch` block that handles the inner exception.

#### Remarks
An exception that is thrown as a direct result of a previous exception can include a reference to the previous exception in the `InnerException` property. The `InnerException` property returns the same value that is passed into the constructor, or `null` if the `InnerException` property does not supply the inner exception value to the constructor.

The following table shows the initial property values for an instance of `NotFiniteNumberException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|The inner exception reference.|
|`Exception.Message`|The error message string.|
|`NotFiniteNumberException.OffendingNumber`|The invalid number.|

## NotFiniteNumberException.OffendingNumber property

```csharp
public double OffendingNumber { get; }
```

Gets the invalid number that is a positive infinity, a negative infinity, or Not-a-Number (NaN).

Returns: The invalid number.

#### Remarks
The `OffendingNumber` property returns the same value as was passed into the constructor, or zero if no value was supplied. Override the `OffendingNumber` property to customize the content or format of the invalid value.

This property is read-only.

## NotFiniteNumberException.GetObjectData(SerializationInfo, StreamingContext) method

```csharp
public override void GetObjectData (System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context);
```

Sets the `SerializationInfo` object with the invalid number and additional exception information.

Parameters:

- `info`: The object that holds the serialized object data.
- `context`: The contextual information about the source or destination.

Exceptions:

- `ArgumentNullException`: The `info` object is `null`.

To be added.
