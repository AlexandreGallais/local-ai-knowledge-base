---
title: "CultureNotFoundException class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Globalization/CultureNotFoundException.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# CultureNotFoundException class

Namespace: `System.Globalization`

```csharp
public class CultureNotFoundException : ArgumentException
```

The exception that is thrown when a method attempts to construct a culture that is not available.

#### Remarks
A `CultureNotFoundException` exception is thrown whenever the construction of an invalid culture is eventually attempted within a method. Most commonly, this exception is thrown when a call to one of the following methods fails to create or return a culture:

- `CultureInfo.%23ctor` constructors.
- The `CultureInfo.CreateSpecificCulture` method.
- The `CultureInfo.GetCultureInfo` method.

> **Warning:**
> .NET retrieves culture data from the operating system. The `CultureNotFoundException` exception is thrown if the operating system is unable to find the culture, and the culture is not a custom culture or a replacement culture.

If the calling code attempted to instantiate a `CultureInfo` object by using a culture name, the `InvalidCultureName` property contains the invalid name, and the `HasValue` property of the `Nullable<T>` object returned by the `InvalidCultureId` property is `false`. If the calling code attempted to instantiate a `CultureInfo` object by using a culture identifier, the `Value` property of the `Nullable<T>` object returned by the `InvalidCultureId` property contains the invalid identifier, and the value of the `InvalidCultureName` property is `null`.

`CultureNotFoundException` uses the HRESULT COR_E_ARGUMENT, which has the value 0x80070057.

## CultureNotFoundException.CultureNotFoundException() constructor

```csharp
public CultureNotFoundException ();
```

Initializes a new instance of the `CultureNotFoundException` class with its message string set to a system-supplied message.

#### Remarks
`CultureNotFoundException` uses the HRESULT COR_E_ARGUMENT, which has the value 0x80070057.

## CultureNotFoundException.CultureNotFoundException(String) constructor

```csharp
public CultureNotFoundException (string? message);
```

Initializes a new instance of the `CultureNotFoundException` class with the specified error message.

Parameters:

- `message`: The error message to display with this exception.

#### Remarks
This constructor initializes the `Message` property of the new instance using the value of the `message` parameter. The content of the `message` parameter is intended to be understood by humans. The caller of this constructor is required to ensure that this string has been localized for the current system culture.

`CultureNotFoundException` uses the HRESULT COR_E_ARGUMENT, which has the value 0x80070057.

## CultureNotFoundException.CultureNotFoundException(SerializationInfo, StreamingContext) constructor

```csharp
protected CultureNotFoundException (System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context);
```

Initializes a new instance of the `CultureNotFoundException` class using the specified serialization data and context.

Parameters:

- `info`: The object that holds the serialized object data.
- `context`: The contextual information about the source or destination.

To be added.

## CultureNotFoundException.CultureNotFoundException(String, Exception) constructor

```csharp
public CultureNotFoundException (string? message, Exception? innerException);
```

Initializes a new instance of the `CultureNotFoundException` class with a specified error message and a reference to the inner exception that is the cause of this exception.

Parameters:

- `message`: The error message to display with this exception.
- `innerException`: The exception that is the cause of the current exception. If the `innerException` parameter is not a null reference, the current exception is raised in a `catch` block that handles the inner exception.

#### Remarks
This constructor initializes the `Message` property of the new instance using the value of the `message` parameter. The content of the `message` parameter is intended to be understood by humans. The caller of this constructor is required to ensure that this string has been localized for the current system culture.

An exception that is thrown as a direct result of a previous exception should include a reference to the previous exception in the `InnerException` property. The `InnerException` property returns the same value that is passed into the constructor, or `null` if the `InnerException` property does not supply the inner exception value to the constructor.

## CultureNotFoundException.CultureNotFoundException(String, String) constructor

```csharp
public CultureNotFoundException (string? paramName, string? message);
```

Initializes a new instance of the `CultureNotFoundException` class with a specified error message and the name of the parameter that is the cause this exception.

Parameters:

- `paramName`: The name of the parameter that is the cause of the current exception.
- `message`: The error message to display with this exception.

#### Remarks
This constructor initializes the `Message` property of the new instance using the value of the `message` parameter. The content of the `message` parameter is intended to be understood by humans. The caller of this constructor is required to ensure that this string has been localized for the current system culture.

This constructor initializes the `ParamName` property of the new instance using `paramName`. The content of `paramName` is intended to be understood by humans.

`CultureNotFoundException` uses the HRESULT COR_E_ARGUMENT, which has the value 0x80070057.

## CultureNotFoundException.CultureNotFoundException(String, Int32, Exception) constructor

```csharp
public CultureNotFoundException (string? message, int invalidCultureId, Exception? innerException);
```

Initializes a new instance of the `CultureNotFoundException` class with a specified error message, the invalid Culture ID, and a reference to the inner exception that is the cause of this exception.

Parameters:

- `message`: The error message to display with this exception.
- `invalidCultureId`: The Culture ID that cannot be found.
- `innerException`: The exception that is the cause of the current exception. If the `innerException` parameter is not a null reference, the current exception is raised in a `catch` block that handles the inner exception.

#### Remarks
This constructor initializes the `Message` property of the new instance using the value of the `message` parameter. The content of the `message` parameter is intended to be understood by humans. The caller of this constructor is required to ensure that this string has been localized for the current system culture.

`InnerException` property. The `InnerException` property returns the same value that is passed into the constructor, or `null` if the `InnerException` property does not supply the inner exception value to the constructor.

## CultureNotFoundException.CultureNotFoundException(String, Int32, String) constructor

```csharp
public CultureNotFoundException (string? paramName, int invalidCultureId, string? message);
```

Initializes a new instance of the `CultureNotFoundException` class with a specified error message, the invalid Culture ID, and the name of the parameter that is the cause this exception.

Parameters:

- `paramName`: The name of the parameter that is the cause the current exception.
- `invalidCultureId`: The Culture ID that cannot be found.
- `message`: The error message to display with this exception.

#### Remarks
This constructor initializes the `Message` property of the new instance using the value of the `message` parameter. The content of the `message` parameter is intended to be understood by humans. The caller of this constructor is required to ensure that this string has been localized for the current system culture.

This constructor initializes the `ParamName` property of the new instance using `paramName`. The content of `paramName` is intended to be understood by humans.

`CultureNotFoundException` uses the HRESULT COR_E_ARGUMENT, which has the value 0x80070057.

## CultureNotFoundException.CultureNotFoundException(String, String, Exception) constructor

```csharp
public CultureNotFoundException (string? message, string? invalidCultureName, Exception? innerException);
```

Initializes a new instance of the `CultureNotFoundException` class with a specified error message, the invalid Culture Name, and a reference to the inner exception that is the cause of this exception.

Parameters:

- `message`: The error message to display with this exception.
- `invalidCultureName`: The Culture Name that cannot be found.
- `innerException`: The exception that is the cause of the current exception. If the `innerException` parameter is not a null reference, the current exception is raised in a `catch` block that handles the inner exception.

#### Remarks
This constructor initializes the `Message` property of the new instance using the value of the `message` parameter. The content of the `message` parameter is intended to be understood by humans. The caller of this constructor is required to ensure that this string has been localized for the current system culture.

`InnerException` property. The `InnerException` property returns the same value that is passed into the constructor, or `null` if the `InnerException` property does not supply the inner exception value to the constructor.

## CultureNotFoundException.CultureNotFoundException(String, String, String) constructor

```csharp
public CultureNotFoundException (string? paramName, string? invalidCultureName, string? message);
```

Initializes a new instance of the `CultureNotFoundException` class with a specified error message, the invalid Culture Name, and the name of the parameter that is the cause this exception.

Parameters:

- `paramName`: The name of the parameter that is the cause the current exception.
- `invalidCultureName`: The Culture Name that cannot be found.
- `message`: The error message to display with this exception.

#### Remarks
This constructor initializes the `Message` property of the new instance using the value of the `message` parameter. The content of the `message` parameter is intended to be understood by humans. The caller of this constructor is required to ensure that this string has been localized for the current system culture.

This constructor initializes the `ParamName` property of the new instance using `paramName`. The content of `paramName` is intended to be understood by humans.

`CultureNotFoundException` uses the HRESULT COR_E_ARGUMENT, which has the value 0x80070057.

## CultureNotFoundException.InvalidCultureId property

```csharp
public virtual int? InvalidCultureId { get; }
```

Gets the culture identifier that cannot be found.

Returns: The invalid culture identifier.

#### Remarks
If the calling code attempted to instantiate or retrieve a `CultureInfo` object by using an invalid culture identifier, the `Value` property of the `Nullable<T>` object returned by the `InvalidCultureId` property contains the invalid identifier. Otherwise, its `HasValue` property is `false`.

## CultureNotFoundException.InvalidCultureName property

```csharp
public virtual string? InvalidCultureName { get; }
```

Gets the culture name that cannot be found.

Returns: The invalid culture name.

#### Remarks
If the calling code attempted to instantiate a `CultureInfo` object by using a culture name, the `InvalidCultureName` property contains the invalid name. Otherwise, its value is `null`.

## CultureNotFoundException.Message property

```csharp
public override string Message { get; }
```

Gets the error message that explains the reason for the exception.

Returns: A text string describing the details of the exception.

To be added.

## CultureNotFoundException.GetObjectData(SerializationInfo, StreamingContext) method

```csharp
public override void GetObjectData (System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context);
```

Sets the `SerializationInfo` object with the parameter name and additional exception information.

Parameters:

- `info`: The object that holds the serialized object data.
- `context`: The contextual information about the source or destination.

Exceptions:

- `ArgumentNullException`: `info` is `null`.

To be added.
