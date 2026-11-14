---
title: "XmlException class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml/XmlException.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XmlException class

Namespace: `System.Xml`

```csharp
public class XmlException : SystemException
```

Returns detailed information about the last exception.

To be added.

## XmlException.XmlException() constructor

```csharp
public XmlException ();
```

Initializes a new instance of the `XmlException` class.

## Remarks

The `XmlException` is a generic XML-related error that is thrown if problems occur during XML processing. The following example throws an XML exception because the \<contacts> end tag is misspelled:

_Code sample not included: ~/snippets/csharp/System.Xml/XmlException/Program.cs._

## XmlException.XmlException(String) constructor

```csharp
public XmlException (string? message);
```

Initializes a new instance of the `XmlException` class with a specified error message.

Parameters:

- `message`: The error description.

To be added.

## XmlException.XmlException(SerializationInfo, StreamingContext) constructor

```csharp
protected XmlException (System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context);
```

Initializes a new instance of the `XmlException` class using the information in the `SerializationInfo` and `StreamingContext` objects.

Parameters:

- `info`: The `SerializationInfo` object containing all the properties of an `XmlException`.
- `context`: The `StreamingContext` object containing the context information.

To be added.

## XmlException.XmlException(String, Exception) constructor

```csharp
public XmlException (string? message, Exception? innerException);
```

Initializes a new instance of the `XmlException` class.

Parameters:

- `message`: The description of the error condition.
- `innerException`: The `Exception` that threw the `XmlException`, if any. This value can be `null`.

To be added.

## XmlException.XmlException(String, Exception, Int32, Int32) constructor

```csharp
public XmlException (string? message, Exception? innerException, int lineNumber, int linePosition);
```

Initializes a new instance of the `XmlException` class with the specified message, inner exception, line number, and line position.

Parameters:

- `message`: The error description.
- `innerException`: The exception that is the cause of the current exception. This value can be `null`.
- `lineNumber`: The line number indicating where the error occurred.
- `linePosition`: The line position indicating where the error occurred.

To be added.

## XmlException.LineNumber property

```csharp
public int LineNumber { get; }
```

Gets the line number indicating where the error occurred. Line numbers start at 1.

Returns: The line number indicating where the error occurred.

#### Remarks

Attempting to load the string `"<<foo>\r\nbar</foo>"` as XML throws an `XmlException` with the following message:

`System.Xml.XmlException: 'Name cannot begin with the '<' character, hexadecimal value 0x3C. Line 1, position 2.'`

Showing that line number is 1-based (the error is found in the first line).

## XmlException.LinePosition property

```csharp
public int LinePosition { get; }
```

Gets the line position indicating where the error occurred. Line position starts at 1.

Returns: The line position indicating where the error occurred.

#### Remarks

Attempting to load the string `"<<foo>\r\nbar</foo>"` as XML throws an `XmlException` with the following message:

`System.Xml.XmlException: 'Name cannot begin with the '<' character, hexadecimal value 0x3C. Line 1, position 2.'`

Showing that line position is 1-based (the error is found in the second character).

## XmlException.Message property

```csharp
public override string Message { get; }
```

Gets a message describing the current exception.

Returns: The error message that explains the reason for the exception.

To be added.

## XmlException.SourceUri property

```csharp
public string? SourceUri { get; }
```

Gets the location of the XML file.

Returns: The source URI for the XML data. If there is no source URI, this property returns `null`.

To be added.

## XmlException.GetObjectData(SerializationInfo, StreamingContext) method

```csharp
public override void GetObjectData (System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context);
```

Streams all the `XmlException` properties into the `SerializationInfo` class for the given `StreamingContext`.

Parameters:

- `info`: The `SerializationInfo` object.
- `context`: The `StreamingContext` object.

To be added.
