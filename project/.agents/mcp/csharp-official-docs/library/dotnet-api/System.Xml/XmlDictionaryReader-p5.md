---
title: "XmlDictionaryReader class (part 5 of 5)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml/XmlDictionaryReader.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XmlDictionaryReader class (part 5 of 5)

## XmlDictionaryReader.ReadElementContentAsString() method

```csharp
public override string ReadElementContentAsString ();
```

Converts an element's content to a `String`.

Returns: The node's content represented as a `String`.

#### Remarks
The string returned by this read operation is limited by the MaxStringContentLength quota.

## XmlDictionaryReader.ReadElementContentAsTimeSpan() method

```csharp
public virtual TimeSpan ReadElementContentAsTimeSpan ();
```

Converts an element's content to a `TimeSpan`.

Returns: The node's content represented as a `TimeSpan`.

To be added.

## XmlDictionaryReader.ReadElementContentAsUniqueId() method

```csharp
public virtual System.Xml.UniqueId ReadElementContentAsUniqueId ();
```

Converts an element's content to a unique identifier.

Returns: The node's content represented as a unique identifier.

Exceptions:

- `ArgumentException`: The element is not in valid format.
- `FormatException`: The element is not in valid format.

To be added.

## XmlDictionaryReader.ReadFullStartElement() method

```csharp
public virtual void ReadFullStartElement ();
```

Checks whether the current node is an element and advances the reader to the next node.

Exceptions:

- `XmlException`: `XmlDictionaryReader.IsStartElement` returns `false`.

To be added.

## XmlDictionaryReader.ReadFullStartElement(String) method

```csharp
public virtual void ReadFullStartElement (string name);
```

Checks whether the current node is an element with the given `name` and advances the reader to the next node.

Parameters:

- `name`: The qualified name of the element.

Exceptions:

- `XmlException`: `XmlDictionaryReader.IsStartElement` returns `false`.

To be added.

## XmlDictionaryReader.ReadFullStartElement(String, String) method

```csharp
public virtual void ReadFullStartElement (string localName, string namespaceUri);
```

Checks whether the current node is an element with the given `localName` and `namespaceUri` and advances the reader to the next node.

Parameters:

- `localName`: The local name of the element.
- `namespaceUri`: The namespace URI of the element.

Exceptions:

- `XmlException`: `XmlDictionaryReader.IsStartElement` returns `false`.

To be added.

## XmlDictionaryReader.ReadFullStartElement(XmlDictionaryString, XmlDictionaryString) method

```csharp
public virtual void ReadFullStartElement (System.Xml.XmlDictionaryString localName, System.Xml.XmlDictionaryString namespaceUri);
```

Checks whether the current node is an element with the given `localName` and `namespaceUri` and advances the reader to the next node.

Parameters:

- `localName`: The local name of the element.
- `namespaceUri`: The namespace URI of the element.

Exceptions:

- `XmlException`: `XmlDictionaryReader.IsStartElement` returns `false`.

To be added.

## XmlDictionaryReader.ReadGuidArray(String, String) method

```csharp
public virtual Guid[] ReadGuidArray (string localName, string namespaceUri);
```

Reads the contents of a series of nodes with the given `localName` and `namespaceUri` into an array of `Guid`.

Parameters:

- `localName`: The local name of the element.
- `namespaceUri`: The namespace URI of the element.

Returns: An array of `Guid`.

#### Remarks
The buffer allocated by this read operation is limited by the MaxArrayLength quota.

## XmlDictionaryReader.ReadGuidArray(XmlDictionaryString, XmlDictionaryString) method

```csharp
public virtual Guid[] ReadGuidArray (System.Xml.XmlDictionaryString localName, System.Xml.XmlDictionaryString namespaceUri);
```

Reads the contents of a series of nodes with the given `localName` and `namespaceUri` into an array of `Guid`.

Parameters:

- `localName`: The local name of the element.
- `namespaceUri`: The namespace URI of the element.

Returns: An array of `Guid`.

#### Remarks
The buffer allocated by this read operation is limited by the MaxArrayLength quota.

## XmlDictionaryReader.ReadInt16Array(String, String) method

```csharp
public virtual short[] ReadInt16Array (string localName, string namespaceUri);
```

Reads the contents of a series of nodes with the given `localName` and `namespaceUri` into an array of `short` integers (`Int16`).

Parameters:

- `localName`: The local name of the element.
- `namespaceUri`: The namespace URI of the element.

Returns: An array of `short` integers (`Int16`).

#### Remarks
The buffer allocated by this read operation is limited by the MaxArrayLength quota.

## XmlDictionaryReader.ReadInt16Array(XmlDictionaryString, XmlDictionaryString) method

```csharp
public virtual short[] ReadInt16Array (System.Xml.XmlDictionaryString localName, System.Xml.XmlDictionaryString namespaceUri);
```

Reads the contents of a series of nodes with the given `localName` and `namespaceUri` into an array of `short` integers (`Int16`).

Parameters:

- `localName`: The local name of the element.
- `namespaceUri`: The namespace URI of the element.

Returns: An array of `short` integers (`Int16`).

#### Remarks
The buffer allocated by this read operation is limited by the MaxArrayLength quota.

## XmlDictionaryReader.ReadInt32Array(String, String) method

```csharp
public virtual int[] ReadInt32Array (string localName, string namespaceUri);
```

Reads the contents of a series of nodes with the given `localName` and `namespaceUri` into an array of integers (`Int32`).

Parameters:

- `localName`: The local name of the element.
- `namespaceUri`: The namespace URI of the element.

Returns: An array of integers (`Int32`).

#### Remarks
The buffer allocated by this read operation is limited by the MaxArrayLength quota.

## XmlDictionaryReader.ReadInt32Array(XmlDictionaryString, XmlDictionaryString) method

```csharp
public virtual int[] ReadInt32Array (System.Xml.XmlDictionaryString localName, System.Xml.XmlDictionaryString namespaceUri);
```

Reads the contents of a series of nodes with the given `localName` and `namespaceUri` into an array of integers (`Int32`).

Parameters:

- `localName`: The local name of the element.
- `namespaceUri`: The namespace URI of the element.

Returns: An array of integers (`Int32`).

#### Remarks
The buffer allocated by this read operation is limited by the MaxArrayLength quota.

## XmlDictionaryReader.ReadInt64Array(String, String) method

```csharp
public virtual long[] ReadInt64Array (string localName, string namespaceUri);
```

Reads the contents of a series of nodes with the given `localName` and `namespaceUri` into an array of `long` integers (`Int64`).

Parameters:

- `localName`: The local name of the element.
- `namespaceUri`: The namespace URI of the element.

Returns: An array of `long` integers (`Int64`).

#### Remarks
The buffer allocated by this read operation is limited by the MaxArrayLength quota.

## XmlDictionaryReader.ReadInt64Array(XmlDictionaryString, XmlDictionaryString) method

```csharp
public virtual long[] ReadInt64Array (System.Xml.XmlDictionaryString localName, System.Xml.XmlDictionaryString namespaceUri);
```

Reads the contents of a series of nodes with the given `localName` and `namespaceUri` into an array of `long` integers (`Int64`).

Parameters:

- `localName`: The local name of the element.
- `namespaceUri`: The namespace URI of the element.

Returns: An array of `long` integers (`Int64`).

#### Remarks
The buffer allocated by this read operation is limited by the MaxArrayLength quota.

## XmlDictionaryReader.ReadSingleArray(String, String) method

```csharp
public virtual float[] ReadSingleArray (string localName, string namespaceUri);
```

Reads the contents of a series of nodes with the given `localName` and `namespaceUri` into an array of `float` numbers (`Single`).

Parameters:

- `localName`: The local name of the element.
- `namespaceUri`: The namespace URI of the element.

Returns: An array of `float` numbers (`Single`).

#### Remarks
The buffer allocated by this read operation is limited by the MaxArrayLength quota.

## XmlDictionaryReader.ReadSingleArray(XmlDictionaryString, XmlDictionaryString) method

```csharp
public virtual float[] ReadSingleArray (System.Xml.XmlDictionaryString localName, System.Xml.XmlDictionaryString namespaceUri);
```

Reads the contents of a series of nodes with the given `localName` and `namespaceUri` into an array of `float` numbers (`Single`).

Parameters:

- `localName`: The local name of the element.
- `namespaceUri`: The namespace URI of the element.

Returns: An array of `float` numbers (`Single`).

#### Remarks
The buffer allocated by this read operation is limited by the MaxArrayLength quota.

## XmlDictionaryReader.ReadStartElement(XmlDictionaryString, XmlDictionaryString) method

```csharp
public virtual void ReadStartElement (System.Xml.XmlDictionaryString localName, System.Xml.XmlDictionaryString namespaceUri);
```

Checks whether the current node is an element with the given `localName` and `namespaceUri` and advances the reader to the next node.

Parameters:

- `localName`: The local name of the element.
- `namespaceUri`: The namespace URI of the element.

To be added.

## XmlDictionaryReader.ReadString() method

```csharp
public override string ReadString ();
```

Reads the contents of the current node into a string.

Returns: A string that contains the contents of the current node.

Exceptions:

- `InvalidOperationException`: Unable to read the contents of the current node.
- `XmlException`: Maximum allowed string length exceeded.

To be added.

## XmlDictionaryReader.ReadString(Int32) method

```csharp
protected string ReadString (int maxStringContentLength);
```

Reads the contents of the current node into a string with a given maximum length.

Parameters:

- `maxStringContentLength`: Maximum allowed string length.

Returns: A string that contains the contents of the current node.

Exceptions:

- `InvalidOperationException`: Unable to read the contents of the current node.
- `XmlException`: Maximum allowed string length exceeded.

To be added.

## XmlDictionaryReader.ReadTimeSpanArray(String, String) method

```csharp
public virtual TimeSpan[] ReadTimeSpanArray (string localName, string namespaceUri);
```

Reads the contents of a series of nodes with the given `localName` and `namespaceUri` into a `TimeSpan` array.

Parameters:

- `localName`: The local name of the element.
- `namespaceUri`: The namespace URI of the element.

Returns: A `TimeSpan` array.

#### Remarks
The buffer allocated by this read operation is limited by the MaxArrayLength quota.

## XmlDictionaryReader.ReadTimeSpanArray(XmlDictionaryString, XmlDictionaryString) method

```csharp
public virtual TimeSpan[] ReadTimeSpanArray (System.Xml.XmlDictionaryString localName, System.Xml.XmlDictionaryString namespaceUri);
```

Reads the contents of a series of nodes with the given `localName` and `namespaceUri` into a `TimeSpan` array.

Parameters:

- `localName`: The local name of the element.
- `namespaceUri`: The namespace URI of the element.

Returns: A `TimeSpan` array.

#### Remarks
The buffer allocated by this read operation is limited by the MaxArrayLength quota.

## XmlDictionaryReader.ReadValueAsBase64(Byte[], Int32, Int32) method

```csharp
public virtual int ReadValueAsBase64 (byte[] buffer, int offset, int count);
```

Not implemented.

Parameters:

- `buffer`: The buffer from which to read.
- `offset`: The starting position from which to read in `buffer`.
- `count`: The number of bytes that can be read from `buffer`.

Returns: Not implemented.

Exceptions:

- `NotSupportedException`: Always.

To be added.

## XmlDictionaryReader.StartCanonicalization(Stream, Boolean, String[]) method

```csharp
public virtual void StartCanonicalization (System.IO.Stream stream, bool includeComments, string[]? inclusivePrefixes);
```

This method is not yet implemented.

Parameters:

- `stream`: The stream to read from.
- `includeComments`: Determines whether comments are included.
- `inclusivePrefixes`: The prefixes to be included.

Exceptions:

- `NotSupportedException`: Always.

#### Remarks
Start reading the canonical octets of the XML being read to this reader from the supplied stream until the matching `EndCanonicalization` call is made. The content read from the main reader stream is unaffected by this call. `includeComments` defines whether comments are to be included in the canonical input and `inclusivePrefixes` provides the list of prefixes to be treated as inclusive prefixes with the exclusive canonicalization algorithm.

## XmlDictionaryReader.TryGetArrayLength(Int32) method

```csharp
public virtual bool TryGetArrayLength (out int count);
```

Not implemented in this class (it always returns `false`). May be overridden in derived classes.

Parameters:

- `count`: Returns 0, unless overridden in a derived class.

Returns: `false`, unless overridden in a derived class.

To be added.

## XmlDictionaryReader.TryGetBase64ContentLength(Int32) method

```csharp
public virtual bool TryGetBase64ContentLength (out int length);
```

Not implemented in this class (it always returns `false`). May be overridden in derived classes.

Parameters:

- `length`: Returns 0, unless overridden in a derived class.

Returns: `false`, unless overridden in a derived class.

To be added.

## XmlDictionaryReader.TryGetLocalNameAsDictionaryString(XmlDictionaryString) method

```csharp
public virtual bool TryGetLocalNameAsDictionaryString (out System.Xml.XmlDictionaryString? localName);
```

Not implemented in this class (it always returns `false`). May be overridden in derived classes.

Parameters:

- `localName`: Returns `null`, unless overridden in a derived class. .

Returns: `false`, unless overridden in a derived class.

To be added.

## XmlDictionaryReader.TryGetNamespaceUriAsDictionaryString(XmlDictionaryString) method

```csharp
public virtual bool TryGetNamespaceUriAsDictionaryString (out System.Xml.XmlDictionaryString? namespaceUri);
```

Not implemented in this class (it always returns `false`). May be overridden in derived classes.

Parameters:

- `namespaceUri`: Returns `null`, unless overridden in a derived class.

Returns: `false`, unless overridden in a derived class.

To be added.

## XmlDictionaryReader.TryGetValueAsDictionaryString(XmlDictionaryString) method

```csharp
public virtual bool TryGetValueAsDictionaryString (out System.Xml.XmlDictionaryString? value);
```

Not implemented in this class (it always returns `false`). May be overridden in derived classes.

Parameters:

- `value`: Returns `null`, unless overridden in a derived class.

Returns: `false`, unless overridden in a derived class.

To be added.
