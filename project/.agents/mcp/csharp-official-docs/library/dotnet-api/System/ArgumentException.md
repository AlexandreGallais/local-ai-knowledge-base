---
title: "ArgumentException class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/ArgumentException.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ArgumentException class

Namespace: `System`

```csharp
public class ArgumentException : SystemException
```

The exception that is thrown when one of the arguments provided to a method is not valid.

#### Remarks
`ArgumentException` is thrown when a method is invoked and at least one of the passed arguments does not meet the parameter specification of the called method. The `ParamName` property identifies the invalid argument.

Most commonly, an `ArgumentException` is thrown by the common language runtime or another class library and indicates developer error. If you throw an `ArgumentException` from your code, you should ensure that the exception's `Message` property includes a meaningful error message that describes the invalid argument and the expected range of values for the argument.

The primary derived classes of `ArgumentException` are `ArgumentNullException` and `ArgumentOutOfRangeException`. These derived classes should be used instead of `ArgumentException`, except in situations where neither of the derived classes is acceptable. For example, exceptions should be thrown by:

- `ArgumentNullException` whenever `null` is passed to a method that does not accept it as a valid argument.

- `ArgumentOutOfRangeException` when the value of an argument is outside the range of acceptable values; for example, when the value "46" is passed as the month argument during the creation of a `DateTime`.

If the method call does not have any argument or if the failure does not involve the arguments themselves, then `InvalidOperationException` should be used.

`ArgumentException` uses the HRESULT COR_E_ARGUMENT, which has the value 0x80070057.

For a list of initial property values for an instance of `ArgumentException`, see the `ArgumentException` constructors.

In F#, you can use the invalidArg function to generate and raise an ArgumentException.

#### Examples

The following example demonstrates how to throw and catch an `ArgumentException`. It uses the ArgumentException.GetType().Name property to display the name of the exception object, and also uses the `Message` property to display the text of the exception message.

_Code sample not included: ~/snippets/csharp/System/ArgumentException/Overview/argumentexception2.cs._

## ArgumentException.ArgumentException() constructor

```csharp
public ArgumentException ();
```

Initializes a new instance of the `ArgumentException` class.

#### Remarks
This constructor initializes the `Message` property of the new instance to a system-supplied message that describes the error, such as "An invalid argument was specified." This message takes into account the current system culture.

The following table shows the initial property values for an instance of `ArgumentException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|A null reference (`Nothing` in Visual Basic).|
|`ArgumentException.Message`|The localized error message string.|

## ArgumentException.ArgumentException(String) constructor

```csharp
public ArgumentException (string? message);
```

Initializes a new instance of the `ArgumentException` class with a specified error message.

Parameters:

- `message`: The error message that explains the reason for the exception.

#### Remarks
This constructor initializes the `Message` property of the new instance to a system-supplied message that describes the error, such as "An invalid argument was specified." This message takes into account the current system culture.

The following table shows the initial property values for an instance of `ArgumentException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|A null reference (`Nothing` in Visual Basic).|
|`ArgumentException.Message`|The error message string.|

## ArgumentException.ArgumentException(SerializationInfo, StreamingContext) constructor

```csharp
protected ArgumentException (System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context);
```

Initializes a new instance of the `ArgumentException` class with serialized data.

Parameters:

- `info`: The object that holds the serialized object data.
- `context`: The contextual information about the source or destination.

To be added.

## ArgumentException.ArgumentException(String, Exception) constructor

```csharp
public ArgumentException (string? message, Exception? innerException);
```

Initializes a new instance of the `ArgumentException` class with a specified error message and a reference to the inner exception that is the cause of this exception.

Parameters:

- `message`: The error message that explains the reason for the exception.
- `innerException`: The exception that is the cause of the current exception. If the `innerException` parameter is not a null reference, the current exception is raised in a `catch` block that handles the inner exception.

#### Remarks
This constructor initializes the `Message` property of the new instance using the value of the `message` parameter. The content of the `message` parameter is intended to be understood by humans. The caller of this constructor is required to ensure that this string has been localized for the current system culture.

An exception that is thrown as a direct result of a previous exception should include a reference to the previous exception in the `InnerException` property. The `InnerException` property returns the same value that is passed into the constructor, or `null` if the `InnerException` property does not supply the inner exception value to the constructor.

The following table shows the initial property values for an instance of `ArgumentException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|The inner exception reference.|
|`ArgumentException.Message`|The localized error message string.|

## ArgumentException.ArgumentException(String, String) constructor

```csharp
public ArgumentException (string? message, string? paramName);
```

Initializes a new instance of the `ArgumentException` class with a specified error message and the name of the parameter that causes this exception.

Parameters:

- `message`: The error message that explains the reason for the exception.
- `paramName`: The name of the parameter that caused the current exception.

#### Remarks
This constructor initializes the `Message` property of the new instance using the value of the `message` parameter. The content of the `message` parameter is intended to be understood by humans. The caller of this constructor is required to ensure that this string has been localized for the current system culture.

This constructor initializes the `ParamName` property of the new instance using `paramName`. The content of `paramName` is intended to be understood by humans.

The following table shows the initial property values for an instance of `ArgumentException`.

|Property|Value|
|--------------|-----------|
|`ArgumentException.Message`|The error message string.|
|`ArgumentException.ParamName`|The parameter name string.|

#### Examples
The following code example demonstrates how to call the `ArgumentException.%23ctor` constructor. This code example is part of a larger example provided for the `ArgumentException` class.

_Code sample not included: ~/snippets/csharp/System/ArgumentException/Overview/argumentexception.cs._

## ArgumentException.ArgumentException(String, String, Exception) constructor

```csharp
public ArgumentException (string? message, string? paramName, Exception? innerException);
```

Initializes a new instance of the `ArgumentException` class with a specified error message, the parameter name, and a reference to the inner exception that is the cause of this exception.

Parameters:

- `message`: The error message that explains the reason for the exception.
- `paramName`: The name of the parameter that caused the current exception.
- `innerException`: The exception that is the cause of the current exception. If the `innerException` parameter is not a null reference, the current exception is raised in a `catch` block that handles the inner exception.

#### Remarks
This constructor initializes the `Message` property of the new instance using the value of the `message` parameter. The content of the `message` parameter is intended to be understood by humans. The caller of this constructor is required to ensure that this string has been localized for the current system culture.

This constructor initializes the `ParamName` property of the new instance using `paramName`. The content of `paramName` is intended to be understood by humans.

An exception that is thrown as a direct result of a previous exception should include a reference to the previous exception in the `InnerException` property. The `InnerException` property returns the same value that is passed into the constructor, or `null` if the `InnerException` property does not supply the inner exception value to the constructor.

The following table shows the initial property values for an instance of `ArgumentException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|The inner exception reference.|
|`ArgumentException.Message`|The localized error message string.|
|`ArgumentException.ParamName`|The parameter name string.|

## ArgumentException.Message property

```csharp
public override string Message { get; }
```

Gets the error message and the parameter name, or only the error message if no parameter name is set.

Returns: A text string describing the details of the exception. The value of this property takes one of two forms:

-  The `ArgumentException.ParamName` is a null reference (`Nothing` in Visual Basic) or of zero length.

:  The `ArgumentException.Message` string passed to the constructor.

-  The `ArgumentException.ParamName` is not null and has a length greater than zero.

:  The `ArgumentException.Message` string appended with the name of the invalid parameter.

#### Remarks
This property overrides `Exception.Message`. The error message should be localized.

## ArgumentException.ParamName property

```csharp
public virtual string? ParamName { get; }
```

Gets the name of the parameter that causes this exception.

Returns: The parameter name.

#### Remarks
Every `ArgumentException` should carry the name of the parameter that causes this exception.

This property is read-only, and returns the same value as was passed into the constructor. Overriding methods should be used solely to customize the format of the parameter name.

The parameter name should not be translated for localization purposes.

## ArgumentException.GetObjectData(SerializationInfo, StreamingContext) method

```csharp
public override void GetObjectData (System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context);
```

Sets the `SerializationInfo` object with the parameter name and additional exception information.

Parameters:

- `info`: The object that holds the serialized object data.
- `context`: The contextual information about the source or destination.

Exceptions:

- `ArgumentNullException`: The `info` object is a null reference (`Nothing` in Visual Basic).

To be added.

## ArgumentException.ThrowIfNullOrEmpty(String, String) method

```csharp
public static void ThrowIfNullOrEmpty (string? argument, string? paramName = default);
```

Throws an exception if `argument` is `null` or empty.

Parameters:

- `argument`: The string argument to validate as non-`null` and non-empty.
- `paramName`: The name of the parameter with which `argument` corresponds.

Exceptions:

- `ArgumentNullException`: `argument` is `null`.
- `ArgumentException`: `argument` is empty.

To be added.

## ArgumentException.ThrowIfNullOrWhiteSpace(String, String) method

```csharp
public static void ThrowIfNullOrWhiteSpace (string? argument, string? paramName = default);
```

Throws an exception if `argument` is `null`, empty, or consists only of white-space characters.

Parameters:

- `argument`: The string argument to validate.
- `paramName`: The name of the parameter with which `argument` corresponds.

Exceptions:

- `ArgumentNullException`: `argument` is `null`.
- `ArgumentException`: `argument` is empty or consists only of white-space characters.

To be added.
