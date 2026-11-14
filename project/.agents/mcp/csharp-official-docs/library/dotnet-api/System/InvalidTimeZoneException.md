---
title: "InvalidTimeZoneException class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/InvalidTimeZoneException.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# InvalidTimeZoneException class

Namespace: `System`

```csharp
public class InvalidTimeZoneException : Exception
```

The exception that is thrown when time zone information is invalid.

#### Remarks
This exception is thrown when a `TimeZoneInfo` object contains invalid, incomplete, or missing data. It is thrown by the `TimeZoneInfo.FindSystemTimeZoneById` method when a time zone is found in the registry but contains corrupted data. It can also be thrown by the `TimeZoneInfo.CreateCustomTimeZone` method under any of the following conditions:

- The adjustment rules overlap.

- The adjustment rules contain one or more null elements.

- The sum of the Coordinated Universal Time (UTC) offset and daylight delta is out of range. (It is either greater than 14 hours or less than -14 hours.)

- A single date has multiple adjustment rules applied to it.

This exception is not thrown to indicate that the time zone is not defined on a particular system; the `TimeZoneNotFoundException` is used for this purpose.

## InvalidTimeZoneException.InvalidTimeZoneException() constructor

```csharp
public InvalidTimeZoneException ();
```

Initializes a new instance of the `InvalidTimeZoneException` class with a system-supplied message.

#### Remarks
This is the parameterless constructor of the `InvalidTimeZoneException` class. It initializes the `Message` property of the new instance to a system-supplied message that describes the error, such as "Exception of type 'System.InvalidTimeZoneException' was thrown." This message is localized for the current system culture.

## InvalidTimeZoneException.InvalidTimeZoneException(String) constructor

```csharp
public InvalidTimeZoneException (string? message);
```

Initializes a new instance of the `InvalidTimeZoneException` class with the specified message string.

Parameters:

- `message`: A string that describes the exception.

#### Remarks
The string supplied as the `message` parameter is assigned to the `Message` property. It should be localized for the current culture.

## InvalidTimeZoneException.InvalidTimeZoneException(SerializationInfo, StreamingContext) constructor

```csharp
protected InvalidTimeZoneException (System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context);
```

Initializes a new instance of the `InvalidTimeZoneException` class from serialized data.

Parameters:

- `info`: The object that contains the serialized data.
- `context`: The stream that contains the serialized data.

Exceptions:

- `ArgumentNullException`: The `info` parameter is `null`.

-or-

The `context` parameter is `null`.

To be added.

## InvalidTimeZoneException.InvalidTimeZoneException(String, Exception) constructor

```csharp
public InvalidTimeZoneException (string? message, Exception? innerException);
```

Initializes a new instance of the `InvalidTimeZoneException` class with a specified error message and a reference to the inner exception that is the cause of this exception.

Parameters:

- `message`: A string that describes the exception.
- `innerException`: The exception that is the cause of the current exception.

#### Remarks
Typically, you use this overload of the `InvalidTimeZoneException` class to handle an exception in a `try`…`catch` block. The `innerException` parameter should be a reference to the exception object handled in the `catch` block, or it can be `null`. This value is then assigned to the `InvalidTimeZoneException` object's `InnerException` property.

The `message` string is assigned to the `Message` property. The string should be localized for the current culture.

#### Examples
The following code tries to retrieve a `TimeZoneInfo` object that represents the Central Standard Time zone. If an `InvalidTimeZoneException` occurs in the `RetrieveTimeZone` method call, the exception handler wraps the exception in a new `InvalidTimeZoneException` object, which it returns to the caller. The caller's exception handler then displays information about both the outer and inner exceptions.

_Code sample not included: ~/snippets/csharp/System/InvalidTimeZoneException/.ctor/TimeZoneNotFoundException.cs._
