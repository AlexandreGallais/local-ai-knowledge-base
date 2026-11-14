---
title: "TimeZoneNotFoundException class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/TimeZoneNotFoundException.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# TimeZoneNotFoundException class

Namespace: `System`

```csharp
public class TimeZoneNotFoundException : Exception
```

The exception that is thrown when a time zone cannot be found.

#### Remarks
This exception is thrown by the `TimeZoneInfo.ConvertTimeBySystemTimeZoneId` and `TimeZoneInfo.FindSystemTimeZoneById` methods when a time zone identifier cannot be found on the local system, or when there is no data associated with a particular time zone identifier.

Because the registry serves as the repository of time zone information in Windows, this exception indicates that the registry contains no information about a particular time zone. Time zone information is stored in the subkeys of `HKEY_LOCAL_MACHINE\Software\Microsoft\Windows NT\CurrentVersion\Time Zones`.

If an application depends on the presence of a particular time zone and the attempt to retrieve it throws a `TimeZoneNotFoundException`, the application can handle the exception in either of two ways:

- By calling the `TimeZoneInfo.FromSerializedString` method to deserialize a saved `TimeZoneInfo` object.
- By calling one of the overloads of the `TimeZoneInfo.CreateCustomTimeZone` method to create a time zone.

See the examples for the `CreateCustomTimeZone` and `TimeZoneInfo.FromSerializedString` methods.

## TimeZoneNotFoundException.TimeZoneNotFoundException() constructor

```csharp
public TimeZoneNotFoundException ();
```

Initializes a new instance of the `TimeZoneNotFoundException` class with a system-supplied message.

#### Remarks
This is the parameterless constructor of the `TimeZoneNotFoundException` class. This constructor initializes the `Message` property of the new instance to a system-supplied message that describes the error, such as "The time zone '*timeZoneName*' was not found on the local computer." This message is localized for the current system culture.

## TimeZoneNotFoundException.TimeZoneNotFoundException(String) constructor

```csharp
public TimeZoneNotFoundException (string? message);
```

Initializes a new instance of the `TimeZoneNotFoundException` class with the specified message string.

Parameters:

- `message`: A string that describes the exception.

#### Remarks
The `message` string is assigned to the `Message` property. The string should be localized for the current culture.

## TimeZoneNotFoundException.TimeZoneNotFoundException(SerializationInfo, StreamingContext) constructor

```csharp
protected TimeZoneNotFoundException (System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context);
```

Initializes a new instance of the `TimeZoneNotFoundException` class from serialized data.

Parameters:

- `info`: The object that contains the serialized data.
- `context`: The stream that contains the serialized data.

Exceptions:

- `ArgumentNullException`: The `info` parameter is `null`.

-or-

The `context` parameter is `null`.

To be added.

## TimeZoneNotFoundException.TimeZoneNotFoundException(String, Exception) constructor

```csharp
public TimeZoneNotFoundException (string? message, Exception? innerException);
```

Initializes a new instance of the `TimeZoneNotFoundException` class with a specified error message and a reference to the inner exception that is the cause of this exception.

Parameters:

- `message`: A string that describes the exception.
- `innerException`: The exception that is the cause of the current exception.

#### Remarks
Typically, you use this `TimeZoneNotFoundException` overload to handle an exception in a `try`…`catch` block. The `innerException` parameter should be a reference to the exception object handled in the `catch` block, or it can be `null`. This value is then assigned to the `TimeZoneNotFoundException` object's `InnerException` property.

The `message` string is assigned to the `Message` property. The string should be localized for the current culture.

#### Examples
The following example tries to retrieve a nonexistent time zone, which throws a `TimeZoneNotFoundException`. The exception handler wraps the exception in a new `TimeZoneNotFoundException` object, which the exception handler returns to the caller. The caller's exception handler then displays information about both the outer and inner exception.

_Code sample not included: ~/snippets/csharp/System/InvalidTimeZoneException/.ctor/TimeZoneNotFoundException.cs._
