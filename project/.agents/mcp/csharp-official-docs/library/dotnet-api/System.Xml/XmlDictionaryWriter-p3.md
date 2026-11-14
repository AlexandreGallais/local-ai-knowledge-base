---
title: "XmlDictionaryWriter class (part 3 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml/XmlDictionaryWriter.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XmlDictionaryWriter class (part 3 of 3)

## XmlDictionaryWriter.WriteStartAttribute(XmlDictionaryString, XmlDictionaryString) method

```csharp
public void WriteStartAttribute (System.Xml.XmlDictionaryString localName, System.Xml.XmlDictionaryString? namespaceUri);
```

Writes the start of an attribute with the specified local name, and namespace URI.

Parameters:

- `localName`: The local name of the attribute.
- `namespaceUri`: The namespace URI of the attribute.

To be added.

## XmlDictionaryWriter.WriteStartAttribute(String, XmlDictionaryString, XmlDictionaryString) method

```csharp
public virtual void WriteStartAttribute (string? prefix, System.Xml.XmlDictionaryString localName, System.Xml.XmlDictionaryString? namespaceUri);
```

Writes the start of an attribute with the specified prefix, local name, and namespace URI.

Parameters:

- `prefix`: The namespace prefix.
- `localName`: The local name of the attribute.
- `namespaceUri`: The namespace URI of the attribute.

To be added.

## XmlDictionaryWriter.WriteStartElement(XmlDictionaryString, XmlDictionaryString) method

```csharp
public void WriteStartElement (System.Xml.XmlDictionaryString localName, System.Xml.XmlDictionaryString? namespaceUri);
```

Writes the specified start tag and associates it with the given namespace.

Parameters:

- `localName`: The local name of the element.
- `namespaceUri`: The namespace URI of the element.

Exceptions:

- `InvalidOperationException`: The writer is closed.

To be added.

## XmlDictionaryWriter.WriteStartElement(String, XmlDictionaryString, XmlDictionaryString) method

```csharp
public virtual void WriteStartElement (string? prefix, System.Xml.XmlDictionaryString localName, System.Xml.XmlDictionaryString? namespaceUri);
```

Writes the specified start tag and associates it with the given namespace and prefix.

Parameters:

- `prefix`: The prefix of the element.
- `localName`: The local name of the element.
- `namespaceUri`: The namespace URI of the element.

Exceptions:

- `InvalidOperationException`: The writer is closed.

To be added.

## XmlDictionaryWriter.WriteString(XmlDictionaryString) method

```csharp
public virtual void WriteString (System.Xml.XmlDictionaryString? value);
```

Writes the given text content.

Parameters:

- `value`: The text to write.

To be added.

## XmlDictionaryWriter.WriteTextNode(XmlDictionaryReader, Boolean) method

```csharp
protected virtual void WriteTextNode (System.Xml.XmlDictionaryReader reader, bool isAttribute);
```

Writes the text node that an `XmlDictionaryReader` is currently positioned on.

Parameters:

- `reader`: The `XmlDictionaryReader` to get the text value from.
- `isAttribute`: `true` to indicate that the reader is positioned on an attribute value or element content; otherwise, `false`.

#### Remarks
If positioned on element content, this method advances the XmlDictionaryReader.

## XmlDictionaryWriter.WriteValue(Guid) method

```csharp
public virtual void WriteValue (Guid value);
```

Writes a `Guid` value.

Parameters:

- `value`: The `Guid` value to write.

To be added.

## XmlDictionaryWriter.WriteValue(TimeSpan) method

```csharp
public virtual void WriteValue (TimeSpan value);
```

Writes a `TimeSpan` value.

Parameters:

- `value`: The `TimeSpan` value to write.

To be added.

## XmlDictionaryWriter.WriteValue(IStreamProvider) method

```csharp
public virtual void WriteValue (System.Xml.IStreamProvider value);
```

Writes a value from an `IStreamProvider`.

Parameters:

- `value`: The `IStreamProvider` value to write.

Exceptions:

- `ArgumentNullException`: `value` is `null`.
- `XmlException`: `value` returns a `null` stream object.
- `InvalidOperationException`: An `XmlDictionaryWriter` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."

#### Remarks
The contents of the stream provided by the `IStreamProvider` are written as Base64 data, unless this method is overridden in a derived class.

For the asynchronous version of this method, see `XmlDictionaryWriter.WriteValueAsync`.

## XmlDictionaryWriter.WriteValue(UniqueId) method

```csharp
public virtual void WriteValue (System.Xml.UniqueId value);
```

Writes a Unique Id value.

Parameters:

- `value`: The Unique Id value to write.

Exceptions:

- `ArgumentNullException`: `value` is `null`.

To be added.

## XmlDictionaryWriter.WriteValue(XmlDictionaryString) method

```csharp
public virtual void WriteValue (System.Xml.XmlDictionaryString? value);
```

Writes a `XmlDictionaryString` value.

Parameters:

- `value`: The `XmlDictionaryString` value.

To be added.

## XmlDictionaryWriter.WriteValueAsync(IStreamProvider) method

```csharp
public virtual System.Threading.Tasks.Task WriteValueAsync (System.Xml.IStreamProvider value);
```

Asynchronously writes a value from an `IStreamProvider`.

Parameters:

- `value`: The `IStreamProvider` value to write.

Returns: The task that represents the asynchronous `WriteValue` operation.

Exceptions:

- `InvalidOperationException`: An `XmlDictionaryWriter` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."

-or-

An `XmlDictionaryWriter` asynchronous method was called without setting the `XmlWriterSettings.Async` flag to `true`. In this case, `InvalidOperationException` is thrown with the message "Set XmlWriterSettings.Async to true if you want to use Async Methods."

#### Remarks
This is the asynchronous version of `XmlDictionaryWriter.WriteValue`, with the same functionality. To use this method, you must set the `Async` flag to `true`.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `WriteValue`.

## XmlDictionaryWriter.WriteXmlAttribute(String, String) method

```csharp
public virtual void WriteXmlAttribute (string localName, string? value);
```

Writes a standard XML attribute in the current node.

Parameters:

- `localName`: The local name of the attribute.
- `value`: The value of the attribute.

To be added.

## XmlDictionaryWriter.WriteXmlAttribute(XmlDictionaryString, XmlDictionaryString) method

```csharp
public virtual void WriteXmlAttribute (System.Xml.XmlDictionaryString localName, System.Xml.XmlDictionaryString? value);
```

Writes an XML attribute in the current node.

Parameters:

- `localName`: The local name of the attribute.
- `value`: The value of the attribute.

To be added.

## XmlDictionaryWriter.WriteXmlnsAttribute(String, String) method

```csharp
public virtual void WriteXmlnsAttribute (string? prefix, string namespaceUri);
```

Writes a namespace declaration attribute.

Parameters:

- `prefix`: The prefix that is bound to the given namespace.
- `namespaceUri`: The namespace to which the prefix is bound.

Exceptions:

- `ArgumentNullException`: `namespaceUri` is `null`.

To be added.

## XmlDictionaryWriter.WriteXmlnsAttribute(String, XmlDictionaryString) method

```csharp
public virtual void WriteXmlnsAttribute (string? prefix, System.Xml.XmlDictionaryString namespaceUri);
```

Writes a namespace declaration attribute.

Parameters:

- `prefix`: The prefix that is bound to the given namespace.
- `namespaceUri`: The namespace to which the prefix is bound.

Exceptions:

- `ArgumentNullException`: `namespaceUri` is `null`.

To be added.
