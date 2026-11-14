---
title: "ArgumentNullException class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/ArgumentNullException.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ArgumentNullException class

Namespace: `System`

```csharp
public class ArgumentNullException : ArgumentException
```

The exception that is thrown when a null reference (`Nothing` in Visual Basic) is passed to a method that does not accept it as a valid argument.

#### Remarks
An `ArgumentNullException` exception is thrown when a method is invoked and at least one of the passed arguments is `null` but should never be `null`.

An `ArgumentNullException` exception is thrown at run time in the following two major circumstances, both of which reflect developer error:

- An uninstantiated object is passed to a method. To prevent the error, instantiate the object.

- An object returned from a method call is then passed as an argument to a second method, but the value of the original returned object is `null`. To prevent the error, check for a return value that is `null` and call the second method only if the return value is not `null`.

`ArgumentNullException` behaves identically to `ArgumentException`. It is provided so that application code can differentiate between exceptions caused by `null` arguments and exceptions caused by arguments that are not null. For errors caused by arguments that are not null, see `ArgumentOutOfRangeException`.

`ArgumentNullException` uses the HRESULT E_POINTER, which has the value 0x80004003.

For a list of initial property values for an instance of `ArgumentNullException`, see the `ArgumentNullException` constructors.

## ArgumentNullException.ArgumentNullException() constructor

```csharp
public ArgumentNullException ();
```

Initializes a new instance of the `ArgumentNullException` class.

#### Remarks
This constructor initializes the `Message` property of the new instance to a system-supplied message that describes the error, such as "Value cannot be null." This message takes into account the current system culture.

The following table shows the initial property values for an instance of `ArgumentNullException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|A null reference (`Nothing` in Visual Basic).|
|`ArgumentException.Message`|A localized error message string, such as "Value cannot be null." for the English language.|

## ArgumentNullException.ArgumentNullException(String) constructor

```csharp
public ArgumentNullException (string? paramName);
```

Initializes a new instance of the `ArgumentNullException` class with the name of the parameter that causes this exception.

Parameters:

- `paramName`: The name of the parameter that caused the exception.

#### Remarks
This constructor initializes the `Message` property of the new instance to a system-supplied message that describes the error and includes the parameter name. This message takes into account the current system culture.

This constructor initializes the `ParamName` property of the new instance using the `paramName` parameter. The content of `paramName` is intended to be understood by humans.

The following table shows the initial property values for an instance of `ArgumentNullException`.

| Property                                | Value                                         |
|-----------------------------------------|-----------------------------------------------|
| `Exception.InnerException` | A null reference (`Nothing` in Visual Basic). |
| `ArgumentException.Message` | A localized error message string that identifies the null argument. For example, if the `paramName` argument is "arg1", the English language message string is `Value cannot be null. (Parameter name: 'arg1')`. |
| `ArgumentException.ParamName` | The parameter name string.                 |

## ArgumentNullException.ArgumentNullException(SerializationInfo, StreamingContext) constructor

```csharp
protected ArgumentNullException (System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context);
```

Initializes a new instance of the `ArgumentNullException` class with serialized data.

Parameters:

- `info`: The object that holds the serialized object data.
- `context`: An object that describes the source or destination of the serialized data.

To be added.

## ArgumentNullException.ArgumentNullException(String, Exception) constructor

```csharp
public ArgumentNullException (string? message, Exception? innerException);
```

Initializes a new instance of the `ArgumentNullException` class with a specified error message and the exception that is the cause of this exception.

Parameters:

- `message`: The error message that explains the reason for this exception.
- `innerException`: The exception that is the cause of the current exception, or a null reference (`Nothing` in Visual Basic) if no inner exception is specified.

To be added.

## ArgumentNullException.ArgumentNullException(String, String) constructor

```csharp
public ArgumentNullException (string? paramName, string? message);
```

Initializes an instance of the `ArgumentNullException` class with a specified error message and the name of the parameter that causes this exception.

Parameters:

- `paramName`: The name of the parameter that caused the exception.
- `message`: A message that describes the error.

#### Remarks
This constructor initializes the `Message` property of the new instance using the value of the `message` parameter. The content of the `message` parameter is intended to be understood by humans. The caller of this constructor is required to ensure that this string has been localized for the current system culture.

This constructor initializes the `ParamName` property of the new instance using the `paramName` parameter. The content of `paramName` is intended to be understood by humans.

The following table shows the initial property values for an instance of `ArgumentNullException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|A null reference (`Nothing` in Visual Basic).|
|`ArgumentException.Message`|The error message string.|
|`ArgumentException.ParamName`|The parameter name string.|

## ArgumentNullException.ThrowIfNull(Object, String) method

```csharp
public static void ThrowIfNull (object? argument, string? paramName = default);
```

Throws an `ArgumentNullException` if `argument` is `null`.

Parameters:

- `argument`: The reference type argument to validate as non-null.
- `paramName`: The name of the parameter with which `argument` corresponds. If you omit this parameter, the name of `argument` is used.

Exceptions:

- `ArgumentNullException`: `argument` is `null`.

The `paramName` parameter is included to support the `CallerArgumentExpressionAttribute` attribute. It's recommended that you don't pass a value for this parameter and let the name of `argument` be used instead.

## ArgumentNullException.ThrowIfNull(Void*, String) method

```csharp
public static void ThrowIfNull (void* argument, string? paramName = default);
```

Throws an `ArgumentNullException` if `argument` is `null`.

Parameters:

- `argument`: The pointer argument to validate as non-null.
- `paramName`: The name of the parameter with which `argument` corresponds.

To be added.
