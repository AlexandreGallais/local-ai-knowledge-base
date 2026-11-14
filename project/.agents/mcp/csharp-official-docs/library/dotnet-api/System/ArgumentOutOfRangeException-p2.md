---
title: "ArgumentOutOfRangeException class (part 2 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/ArgumentOutOfRangeException.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ArgumentOutOfRangeException class (part 2 of 2)

## ArgumentOutOfRangeException.ArgumentOutOfRangeException(String, Exception) constructor

```csharp
public ArgumentOutOfRangeException (string? message, Exception? innerException);
```

Initializes a new instance of the `ArgumentOutOfRangeException` class with a specified error message and the exception that is the cause of this exception.

Parameters:

- `message`: The error message that explains the reason for this exception.
- `innerException`: The exception that is the cause of the current exception, or a null reference (`Nothing` in Visual Basic) if no inner exception is specified.

To be added.

## ArgumentOutOfRangeException.ArgumentOutOfRangeException(String, String) constructor

```csharp
public ArgumentOutOfRangeException (string? paramName, string? message);
```

Initializes a new instance of the `ArgumentOutOfRangeException` class with the name of the parameter that causes this exception and a specified error message.

Parameters:

- `paramName`: The name of the parameter that caused the exception.
- `message`: The message that describes the error.

#### Remarks
This constructor initializes the `Message` property of the new instance using the value of the `message` parameter. The content of the `message` parameter is intended to be understood by humans. The caller of this constructor is required to ensure that this string has been localized for the current system culture.

This constructor initializes the `ParamName` property of the new instance using the `paramName` parameter. The content of `paramName` is intended to be understood by humans.

The following table shows the initial property values for an instance of `ArgumentOutOfRangeException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|`null`.|
|`ArgumentOutOfRangeException.Message`|The error message string.|
|`ArgumentException.ParamName`|The parameter name string.|

## ArgumentOutOfRangeException.ArgumentOutOfRangeException(String, Object, String) constructor

```csharp
public ArgumentOutOfRangeException (string? paramName, object? actualValue, string? message);
```

Initializes a new instance of the `ArgumentOutOfRangeException` class with the parameter name, the value of the argument, and a specified error message.

Parameters:

- `paramName`: The name of the parameter that caused the exception.
- `actualValue`: The value of the argument that causes this exception.
- `message`: The message that describes the error.

#### Remarks
This constructor initializes the `ParamName` property of the new instance using the `paramName` parameter, the `ActualValue` property using the `actualValue` parameter, and the `Message` property using the `message` parameter. The content of the `paramName` and `message` parameters is intended to be understood by humans. The caller of this constructor is required to ensure that these strings have been localized for the current system culture.

The `actualValue` parameter is not used within the .NET class library. However, apps can use the `ActualValue` property to obtain the available argument value.

The `actualValue` parameter contains the invalid value that was passed to the method and caused this exception to be thrown. This value is stored in the `ActualValue` property and its string representation is appended to the message string held in the `Message` property.

The following table shows the initial property values for an instance of `ArgumentOutOfRangeException`.

|Property|Value|
|--------------|-----------|
|`ArgumentOutOfRangeException.ActualValue`|The argument value.|
|`Exception.InnerException`|The null reference (`Nothing` in Visual Basic).|
|`ArgumentOutOfRangeException.Message`|The error message string.|
|`ArgumentException.ParamName`|The parameter name string.|

## ArgumentOutOfRangeException.ActualValue property

```csharp
public virtual object? ActualValue { get; }
```

Gets the argument value that causes this exception.

Returns: The value of the parameter that caused the current `Exception`.

#### Remarks
Use this property to retrieve the invalid argument.

The `ActualValue` property returns the same value that was passed to the constructor, or `null` if no value was supplied.

The `ActualValue` property is assigned a value at the time of object construction. If the `ActualValue` property value is not `null`, a string representation of the value is appended to the message string held by the `Message` property.

The `ActualValue` property is not used within the .NET class library. It carries a null value in all the `ArgumentOutOfRangeException` objects thrown by the .NET class library. The `ActualValue` property is provided so that applications can use the available argument value.

This property is read-only and should be overridden only to customize the content or format of the value.

## ArgumentOutOfRangeException.Message property

```csharp
public override string Message { get; }
```

Gets the error message and the string representation of the invalid argument value, or only the error message if the argument value is null.

Returns: The text message for this exception. The value of this property takes one of two forms, as follows.

-  The `ArgumentOutOfRangeException.ActualValue` is `null`.

:  The `ArgumentOutOfRangeException.Message` string passed to the constructor.

-  The `ArgumentOutOfRangeException.ActualValue` is not `null`.

:  The `ArgumentOutOfRangeException.Message` string appended with the string representation of the invalid argument value.

#### Remarks
This property overrides `ArgumentException.Message`.

The error message should describe the expected values of the parameter that causes this exception. The error message should be localized.

## ArgumentOutOfRangeException.GetObjectData(SerializationInfo, StreamingContext) method

```csharp
public override void GetObjectData (System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context);
```

Sets the `SerializationInfo` object with the invalid argument value and additional exception information.

Parameters:

- `info`: The object that holds the serialized object data.
- `context`: An object that describes the source or destination of the serialized data.

Exceptions:

- `ArgumentNullException`: The `info` object is `null`.

To be added.

## ArgumentOutOfRangeException.ThrowIfEqual<T>(T, T, String) method

```csharp
public static void ThrowIfEqual<T> (T value, T other, string? paramName = default);
```

Throws an `ArgumentOutOfRangeException` if `value` is equal to `other`.

Parameters:

- `T`: The type of the objects to validate.
- `value`: The argument to validate as not equal to `other`.
- `other`: The value to compare with `value`.
- `paramName`: The name of the parameter with which `value` corresponds.

To be added.

## ArgumentOutOfRangeException.ThrowIfGreaterThan<T>(T, T, String) method

```csharp
public static void ThrowIfGreaterThan<T> (T value, T other, string? paramName = default) where T : IComparable<T>;
```

Throws an `ArgumentOutOfRangeException` if `value` is greater than `other`.

Parameters:

- `T`: The type of the objects to validate.
- `value`: The argument to validate as less than or equal to `other`.
- `other`: The value to compare with `value`.
- `paramName`: The name of the parameter with which `value` corresponds.

To be added.

## ArgumentOutOfRangeException.ThrowIfGreaterThanOrEqual<T>(T, T, String) method

```csharp
public static void ThrowIfGreaterThanOrEqual<T> (T value, T other, string? paramName = default) where T : IComparable<T>;
```

Throws an `ArgumentOutOfRangeException` if `value` is greater than or equal to `other`.

Parameters:

- `T`: The type of the objects to validate.
- `value`: The argument to validate as less than `other`.
- `other`: The value to compare with `value`.
- `paramName`: The name of the parameter with which `value` corresponds.

To be added.

## ArgumentOutOfRangeException.ThrowIfLessThan<T>(T, T, String) method

```csharp
public static void ThrowIfLessThan<T> (T value, T other, string? paramName = default) where T : IComparable<T>;
```

Throws an `ArgumentOutOfRangeException` if `value` is less than `other`.

Parameters:

- `T`: The type of the objects to validate.
- `value`: The argument to validate as greater than or equal to `other`.
- `other`: The value to compare with `value`.
- `paramName`: The name of the parameter with which `value` corresponds.

To be added.

## ArgumentOutOfRangeException.ThrowIfLessThanOrEqual<T>(T, T, String) method

```csharp
public static void ThrowIfLessThanOrEqual<T> (T value, T other, string? paramName = default) where T : IComparable<T>;
```

Throws an `ArgumentOutOfRangeException` if `value` is less than or equal to `other`.

Parameters:

- `T`: The type of the objects to validate.
- `value`: The argument to validate as greater than `other`.
- `other`: The value to compare with `value`.
- `paramName`: The name of the parameter with which `value` corresponds.

To be added.

## ArgumentOutOfRangeException.ThrowIfNegative<T>(T, String) method

```csharp
public static void ThrowIfNegative<T> (T value, string? paramName = default) where T : System.Numerics.INumberBase<T>;
```

Throws an `ArgumentOutOfRangeException` if `value` is negative.

Parameters:

- `T`: The type of the object to validate.
- `value`: The argument to validate as non-negative.
- `paramName`: The name of the parameter with which `value` corresponds.

To be added.

## ArgumentOutOfRangeException.ThrowIfNegativeOrZero<T>(T, String) method

```csharp
public static void ThrowIfNegativeOrZero<T> (T value, string? paramName = default) where T : System.Numerics.INumberBase<T>;
```

Throws an `ArgumentOutOfRangeException` if `value` is negative or zero.

Parameters:

- `T`: The type of the object to validate.
- `value`: The argument to validate as non-zero and non-negative.
- `paramName`: The name of the parameter with which `value` corresponds.

To be added.

## ArgumentOutOfRangeException.ThrowIfNotEqual<T>(T, T, String) method

```csharp
public static void ThrowIfNotEqual<T> (T value, T other, string? paramName = default);
```

Throws an `ArgumentOutOfRangeException` if `value` is not equal to `other`.

Parameters:

- `T`: The type of the objects to validate.
- `value`: The argument to validate as equal to `other`.
- `other`: The value to compare with `value`.
- `paramName`: The name of the parameter with which `value` corresponds.

To be added.

## ArgumentOutOfRangeException.ThrowIfZero<T>(T, String) method

```csharp
public static void ThrowIfZero<T> (T value, string? paramName = default) where T : System.Numerics.INumberBase<T>;
```

Throws an `ArgumentOutOfRangeException` if `value` is zero.

Parameters:

- `T`: The type of the object to validate.
- `value`: The argument to validate as non-zero.
- `paramName`: The name of the parameter with which `value` corresponds.

To be added.
