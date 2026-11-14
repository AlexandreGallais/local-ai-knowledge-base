---
title: "WarningException class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/WarningException.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# WarningException class

Namespace: `System.ComponentModel`

```csharp
public class WarningException : SystemException
```

Specifies an exception that is handled as a warning instead of an error.

#### Remarks
If this exception is not caught, it is presented to the user as a warning message. In the `WarningException` constructor, you can specify the Help file and Help topic to display if the user requests more information.

#### Examples
The following code example shows how to catch a warning and interpret its warning message.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/WarningException/Overview/warningex_doc.cs._

## WarningException.WarningException() constructor

```csharp
public WarningException ();
```

Initializes a new instance of the `WarningException` class.

To be added.

## WarningException.WarningException(String) constructor

```csharp
public WarningException (string? message);
```

Initializes a new instance of the `WarningException` class with the specified message and no Help file.

Parameters:

- `message`: The message to display to the end user.

To be added.

## WarningException.WarningException(SerializationInfo, StreamingContext) constructor

```csharp
protected WarningException (System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context);
```

Initializes a new instance of the `WarningException` class using the specified serialization data and context.

Parameters:

- `info`: The `SerializationInfo` to be used for deserialization.
- `context`: The destination to be used for deserialization.

To be added.

## WarningException.WarningException(String, Exception) constructor

```csharp
public WarningException (string? message, Exception? innerException);
```

Initializes a new instance of the `WarningException` class with the specified detailed description and the specified exception.

Parameters:

- `message`: A detailed description of the error.
- `innerException`: A reference to the inner exception that is the cause of this exception.

To be added.

## WarningException.WarningException(String, String) constructor

```csharp
public WarningException (string? message, string? helpUrl);
```

Initializes a new instance of the `WarningException` class with the specified message, and with access to the specified Help file.

Parameters:

- `message`: The message to display to the end user.
- `helpUrl`: The Help file to display if the user requests help.

To be added.

## WarningException.WarningException(String, String, String) constructor

```csharp
public WarningException (string? message, string? helpUrl, string? helpTopic);
```

Initializes a new instance of the `WarningException` class with the specified message, and with access to the specified Help file and topic.

Parameters:

- `message`: The message to display to the end user.
- `helpUrl`: The Help file to display if the user requests help.
- `helpTopic`: The Help topic to display if the user requests help.

To be added.

## WarningException.HelpTopic property

```csharp
public string? HelpTopic { get; }
```

Gets the Help topic associated with the warning.

Returns: The Help topic associated with the warning.

To be added.

## WarningException.HelpUrl property

```csharp
public string? HelpUrl { get; }
```

Gets the Help file associated with the warning.

Returns: The Help file associated with the warning.

To be added.

## WarningException.GetObjectData(SerializationInfo, StreamingContext) method

```csharp
public override void GetObjectData (System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context);
```

Sets the `SerializationInfo` with the parameter name and additional exception information.

Parameters:

- `info`: Stores the data that was being used to serialize or deserialize the object that the `CodeDomSerializer` was serializing or deserializing.
- `context`: Describes the source and destination of the stream that generated the exception, as well as a means for serialization to retain that context and an additional caller-defined context.

Exceptions:

- `ArgumentNullException`: `info` is `null`.

To be added.
