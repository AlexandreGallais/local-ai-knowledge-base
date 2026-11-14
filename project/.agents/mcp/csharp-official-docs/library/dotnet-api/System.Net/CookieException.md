---
title: "CookieException class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net/CookieException.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# CookieException class

Namespace: `System.Net`

```csharp
public class CookieException : FormatException
```

The exception that is thrown when an error is made adding a `Cookie` to a `CookieContainer`.

#### Remarks
This exception is thrown if an attempt is made to `CookieContainer.Add` a `Cookie` with length greater than `CookieContainer.MaxCookieSize` to a `CookieContainer`.

#### Tips

**Make sure the cookie size does not exceed the maximum allowed by the cookie container.**
This exception is thrown when an attempt is made to add a `Cookie` with length greater than `CookieContainer.MaxCookieSize` to a `CookieContainer`. The default maximum cookie size is 4096 bytes.

**When setting the Name property for a cookie, make sure the value is not a null reference or empty string.**
The `Name` property must be initialized before using an instance of the `Cookie` class. The following characters are reserved and cannot be used for this attribute value: equal sign, semicolon, comma, new line (\n), carriage return (\r), tab (\t). The dollar sign ($) character cannot be the first character.

**When setting the Port property for a cookie, make sure the value is valid and enclosed in double quotes.**
The `Cookie.Port` attribute restricts the ports to which a cookie may be sent. The default value means no restriction. Setting the property to an empty string ("") restricts the port to the one used in the HTTP response. Otherwise the value must be a string in quotation marks that contains port values delineated with commas.

**When setting the Value property for a cookie, make sure the value is not null.**
The following characters are reserved and cannot be used for this property: semicolon, comma.

## CookieException.CookieException() constructor

```csharp
public CookieException ();
```

Initializes a new instance of the `CookieException` class.

#### Remarks
The parameterless constructor for `CookieException`.

## CookieException.CookieException(String) constructor

```csharp
public CookieException (string? message);
```

Initializes a new instance of the `CookieException` class with the specified error message.

Parameters:

- `message`: A `String` that describes the error that occurred.

To be added.

## CookieException.CookieException(SerializationInfo, StreamingContext) constructor

```csharp
protected CookieException (System.Runtime.Serialization.SerializationInfo serializationInfo, System.Runtime.Serialization.StreamingContext streamingContext);
```

Initializes a new instance of the `CookieException` class with specific values of `serializationInfo` and `streamingContext`.

Parameters:

- `serializationInfo`: The `SerializationInfo` to be used.
- `streamingContext`: The `StreamingContext` to be used.

To be added.

## CookieException.CookieException(String, Exception) constructor

```csharp
public CookieException (string? message, Exception? innerException);
```

Initializes a new instance of the `CookieException` class with the specified error message and a reference to the inner exception that is the cause of this exception.

Parameters:

- `message`: A `String` that describes the error that occurred.
- `innerException`: The exception that is the cause of the current exception.

To be added.

## CookieException.GetObjectData(SerializationInfo, StreamingContext) method

```csharp
public override void GetObjectData (System.Runtime.Serialization.SerializationInfo serializationInfo, System.Runtime.Serialization.StreamingContext streamingContext);
```

Populates a `SerializationInfo` instance with the data needed to serialize the `CookieException`.

Parameters:

- `serializationInfo`: The object that holds the serialized object data. The `SerializationInfo` to populate with data.
- `streamingContext`: The contextual information about the source or destination. A `StreamingContext` that specifies the destination for this serialization.

To be added.

## CookieException.System.Runtime.Serialization.ISerializable.GetObjectData(SerializationInfo, StreamingContext) method

```csharp
void ISerializable.GetObjectData (System.Runtime.Serialization.SerializationInfo serializationInfo, System.Runtime.Serialization.StreamingContext streamingContext);
```

Populates a `SerializationInfo` instance with the data needed to serialize the `CookieException`.

Parameters:

- `serializationInfo`: The `SerializationInfo` to be used.
- `streamingContext`: The `StreamingContext` to be used.

To be added.
