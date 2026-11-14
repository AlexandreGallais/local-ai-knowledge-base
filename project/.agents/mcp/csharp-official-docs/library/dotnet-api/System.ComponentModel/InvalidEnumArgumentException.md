---
title: "InvalidEnumArgumentException class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/InvalidEnumArgumentException.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# InvalidEnumArgumentException class

Namespace: `System.ComponentModel`

```csharp
public class InvalidEnumArgumentException : ArgumentException
```

The exception that is thrown when an invalid enumeration value is used.

#### Remarks

This exception is thrown if you pass an invalid enumeration value to a method or when setting a property.

#### Examples
The following code example shows how to catch an `InvalidEnumArgumentException` exception and interpret its content. The example attempts to pass an invalid enumeration value (`MessageBoxButtons`) through casting, as the `MessageBox.Show` method's third argument. Upon catching the exception, the example fetches the respective error message, the invalid parameter, stack trace, and origin of the exception.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/InvalidEnumArgumentException/Overview/enumexception.cs._

## InvalidEnumArgumentException.InvalidEnumArgumentException() constructor

```csharp
public InvalidEnumArgumentException ();
```

Initializes a new instance of the `InvalidEnumArgumentException` class without a message.

To be added.

## InvalidEnumArgumentException.InvalidEnumArgumentException(String) constructor

```csharp
public InvalidEnumArgumentException (string? message);
```

Initializes a new instance of the `InvalidEnumArgumentException` class with the specified message.

Parameters:

- `message`: The message to display with this exception.

To be added.

## InvalidEnumArgumentException.InvalidEnumArgumentException(SerializationInfo, StreamingContext) constructor

```csharp
protected InvalidEnumArgumentException (System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context);
```

Initializes a new instance of the `InvalidEnumArgumentException` class using the specified serialization data and context.

Parameters:

- `info`: The `SerializationInfo` to be used for deserialization.
- `context`: The destination to be used for deserialization.

To be added.

## InvalidEnumArgumentException.InvalidEnumArgumentException(String, Exception) constructor

```csharp
public InvalidEnumArgumentException (string? message, Exception? innerException);
```

Initializes a new instance of the `InvalidEnumArgumentException` class with the specified detailed description and the specified exception.

Parameters:

- `message`: A detailed description of the error.
- `innerException`: A reference to the inner exception that is the cause of this exception.

To be added.

## InvalidEnumArgumentException.InvalidEnumArgumentException(String, Int32, Type) constructor

```csharp
public InvalidEnumArgumentException (string? argumentName, int invalidValue, Type enumClass);
```

Initializes a new instance of the `InvalidEnumArgumentException` class with a message generated from the argument, the invalid value, and an enumeration class.

Parameters:

- `argumentName`: The name of the argument that caused the exception.
- `invalidValue`: The value of the argument that failed.
- `enumClass`: A `Type` that represents the enumeration class with the valid values.

#### Remarks
This constructor will create a localized message saying that the `argumentName` parameter was invalid because the value passed in was invalid, and that the value should be one of the values in the enumeration class.
