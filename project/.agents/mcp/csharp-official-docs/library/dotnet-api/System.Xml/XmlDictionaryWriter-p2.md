---
title: "XmlDictionaryWriter class (part 2 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml/XmlDictionaryWriter.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XmlDictionaryWriter class (part 2 of 3)

## XmlDictionaryWriter.WriteArray(String, String, String, Single[], Int32, Int32) method

```csharp
public virtual void WriteArray (string? prefix, string localName, string? namespaceUri, float[] array, int offset, int count);
```

Writes nodes from a `Single` array.

Parameters:

- `prefix`: The namespace prefix.
- `localName`: The local name of the element.
- `namespaceUri`: The namespace URI of the element.
- `array`: The array that contains the nodes.
- `offset`: The starting index in the array.
- `count`: The number of nodes to get from the array.

Exceptions:

- `ArgumentNullException`: `array` is `null`.
- `ArgumentOutOfRangeException`: `offset` is < 0 or > `array` length.

-or-

`count` is < 0 or > `array` length minus `offset`.

To be added.

## XmlDictionaryWriter.WriteArray(String, String, String, TimeSpan[], Int32, Int32) method

```csharp
public virtual void WriteArray (string? prefix, string localName, string? namespaceUri, TimeSpan[] array, int offset, int count);
```

Writes nodes from a `TimeSpan` array.

Parameters:

- `prefix`: The namespace prefix.
- `localName`: The local name of the element.
- `namespaceUri`: The namespace URI of the element.
- `array`: The array that contains the nodes.
- `offset`: The starting index in the array.
- `count`: The number of nodes to get from the array.

Exceptions:

- `ArgumentNullException`: `array` is `null`.
- `ArgumentOutOfRangeException`: `offset` is < 0 or > `array` length.

-or-

`count` is < 0 or > `array` length minus `offset`.

To be added.

## XmlDictionaryWriter.WriteArray(String, XmlDictionaryString, XmlDictionaryString, Boolean[], Int32, Int32) method

```csharp
public virtual void WriteArray (string? prefix, System.Xml.XmlDictionaryString localName, System.Xml.XmlDictionaryString? namespaceUri, bool[] array, int offset, int count);
```

Writes nodes from a `Boolean` array.

Parameters:

- `prefix`: The namespace prefix.
- `localName`: The local name of the element.
- `namespaceUri`: The namespace URI of the element.
- `array`: The array that contains the nodes.
- `offset`: The starting index in the array.
- `count`: The number of nodes to get from the array.

Exceptions:

- `ArgumentNullException`: `array` is `null`.
- `ArgumentOutOfRangeException`: `offset` is < 0 or > `array` length.

-or-

`count` is < 0 or > `array` length minus `offset`.

To be added.

## XmlDictionaryWriter.WriteArray(String, XmlDictionaryString, XmlDictionaryString, DateTime[], Int32, Int32) method

```csharp
public virtual void WriteArray (string? prefix, System.Xml.XmlDictionaryString localName, System.Xml.XmlDictionaryString? namespaceUri, DateTime[] array, int offset, int count);
```

Writes nodes from a `DateTime` array.

Parameters:

- `prefix`: The namespace prefix.
- `localName`: The local name of the element.
- `namespaceUri`: The namespace URI of the element.
- `array`: The array that contains the nodes.
- `offset`: The starting index in the array.
- `count`: The number of nodes to get from the array.

Exceptions:

- `ArgumentNullException`: `array` is `null`.
- `ArgumentOutOfRangeException`: `offset` is < 0 or > `array` length.

-or-

`count` is < 0 or > `array` length minus `offset`.

To be added.

## XmlDictionaryWriter.WriteArray(String, XmlDictionaryString, XmlDictionaryString, Decimal[], Int32, Int32) method

```csharp
public virtual void WriteArray (string? prefix, System.Xml.XmlDictionaryString localName, System.Xml.XmlDictionaryString? namespaceUri, decimal[] array, int offset, int count);
```

Writes nodes from a `Decimal` array.

Parameters:

- `prefix`: The namespace prefix.
- `localName`: The local name of the element.
- `namespaceUri`: The namespace URI of the element.
- `array`: The array that contains the nodes.
- `offset`: The starting index in the array.
- `count`: The number of nodes to get from the array.

Exceptions:

- `ArgumentNullException`: `array` is `null`.
- `ArgumentOutOfRangeException`: `offset` is < 0 or > `array` length.

-or-

`count` is < 0 or > `array` length minus `offset`.

To be added.

## XmlDictionaryWriter.WriteArray(String, XmlDictionaryString, XmlDictionaryString, Double[], Int32, Int32) method

```csharp
public virtual void WriteArray (string? prefix, System.Xml.XmlDictionaryString localName, System.Xml.XmlDictionaryString? namespaceUri, double[] array, int offset, int count);
```

Writes nodes from a `Double` array.

Parameters:

- `prefix`: The namespace prefix.
- `localName`: The local name of the element.
- `namespaceUri`: The namespace URI of the element.
- `array`: The array that contains the nodes.
- `offset`: The starting index in the array.
- `count`: The number of nodes to get from the array.

Exceptions:

- `ArgumentNullException`: `array` is `null`.
- `ArgumentOutOfRangeException`: `offset` is < 0 or > `array` length.

-or-

`count` is < 0 or > `array` length minus `offset`.

To be added.

## XmlDictionaryWriter.WriteArray(String, XmlDictionaryString, XmlDictionaryString, Guid[], Int32, Int32) method

```csharp
public virtual void WriteArray (string? prefix, System.Xml.XmlDictionaryString localName, System.Xml.XmlDictionaryString? namespaceUri, Guid[] array, int offset, int count);
```

Writes nodes from a `Guid` array.

Parameters:

- `prefix`: The namespace prefix.
- `localName`: The local name of the element.
- `namespaceUri`: The namespace URI of the element.
- `array`: The array that contains the nodes.
- `offset`: The starting index in the array.
- `count`: The number of nodes to get from the array.

Exceptions:

- `ArgumentNullException`: `array` is `null`.
- `ArgumentOutOfRangeException`: `offset` is < 0 or > `array` length.

-or-

`count` is < 0 or > `array` length minus `offset`.

To be added.

## XmlDictionaryWriter.WriteArray(String, XmlDictionaryString, XmlDictionaryString, Int16[], Int32, Int32) method

```csharp
public virtual void WriteArray (string? prefix, System.Xml.XmlDictionaryString localName, System.Xml.XmlDictionaryString? namespaceUri, short[] array, int offset, int count);
```

Writes nodes from a `Int16` array.

Parameters:

- `prefix`: The namespace prefix.
- `localName`: The local name of the element.
- `namespaceUri`: The namespace URI of the element.
- `array`: The array that contains the nodes.
- `offset`: The starting index in the array.
- `count`: The number of nodes to get from the array.

Exceptions:

- `ArgumentNullException`: `array` is `null`.
- `ArgumentOutOfRangeException`: `offset` is < 0 or > `array` length.

-or-

`count` is < 0 or > `array` length minus `offset`.

To be added.

## XmlDictionaryWriter.WriteArray(String, XmlDictionaryString, XmlDictionaryString, Int32[], Int32, Int32) method

```csharp
public virtual void WriteArray (string? prefix, System.Xml.XmlDictionaryString localName, System.Xml.XmlDictionaryString? namespaceUri, int[] array, int offset, int count);
```

Writes nodes from a `Int32` array.

Parameters:

- `prefix`: The namespace prefix.
- `localName`: The local name of the element.
- `namespaceUri`: The namespace URI of the element.
- `array`: The array that contains the nodes.
- `offset`: The starting index in the array.
- `count`: The number of nodes to get from the array.

Exceptions:

- `ArgumentNullException`: `array` is `null`.
- `ArgumentOutOfRangeException`: `offset` is < 0 or > `array` length.

-or-

`count` is < 0 or > `array` length minus `offset`.

To be added.

## XmlDictionaryWriter.WriteArray(String, XmlDictionaryString, XmlDictionaryString, Int64[], Int32, Int32) method

```csharp
public virtual void WriteArray (string? prefix, System.Xml.XmlDictionaryString localName, System.Xml.XmlDictionaryString? namespaceUri, long[] array, int offset, int count);
```

Writes nodes from a `Int64` array.

Parameters:

- `prefix`: The namespace prefix.
- `localName`: The local name of the element.
- `namespaceUri`: The namespace URI of the element.
- `array`: The array that contains the nodes.
- `offset`: The starting index in the array.
- `count`: The number of nodes to get from the array.

Exceptions:

- `ArgumentNullException`: `array` is `null`.
- `ArgumentOutOfRangeException`: `offset` is < 0 or > `array` length.

-or-

`count` is < 0 or > `array` length minus `offset`.

To be added.

## XmlDictionaryWriter.WriteArray(String, XmlDictionaryString, XmlDictionaryString, Single[], Int32, Int32) method

```csharp
public virtual void WriteArray (string? prefix, System.Xml.XmlDictionaryString localName, System.Xml.XmlDictionaryString? namespaceUri, float[] array, int offset, int count);
```

Writes nodes from a `Single` array.

Parameters:

- `prefix`: The namespace prefix.
- `localName`: The local name of the element.
- `namespaceUri`: The namespace URI of the element.
- `array`: The array that contains the nodes.
- `offset`: The starting index in the array.
- `count`: The number of nodes to get from the array.

Exceptions:

- `ArgumentNullException`: `array` is `null`.
- `ArgumentOutOfRangeException`: `offset` is < 0 or > `array` length.

-or-

`count` is < 0 or > `array` length minus `offset`.

To be added.

## XmlDictionaryWriter.WriteArray(String, XmlDictionaryString, XmlDictionaryString, TimeSpan[], Int32, Int32) method

```csharp
public virtual void WriteArray (string? prefix, System.Xml.XmlDictionaryString localName, System.Xml.XmlDictionaryString? namespaceUri, TimeSpan[] array, int offset, int count);
```

Writes nodes from a `TimeSpan` array.

Parameters:

- `prefix`: The namespace prefix.
- `localName`: The local name of the element.
- `namespaceUri`: The namespace URI of the element.
- `array`: The array that contains the nodes.
- `offset`: The starting index in the array.
- `count`: The number of nodes to get from the array.

Exceptions:

- `ArgumentNullException`: `array` is `null`.
- `ArgumentOutOfRangeException`: `offset` is < 0 or > `array` length.

-or-

`count` is < 0 or > `array` length minus `offset`.

To be added.

## XmlDictionaryWriter.WriteAttributeString(XmlDictionaryString, XmlDictionaryString, String) method

```csharp
public void WriteAttributeString (System.Xml.XmlDictionaryString localName, System.Xml.XmlDictionaryString? namespaceUri, string? value);
```

Writes an attribute qualified name and value.

Parameters:

- `localName`: The local name of the attribute.
- `namespaceUri`: The namespace URI of the attribute.
- `value`: The attribute.

To be added.

## XmlDictionaryWriter.WriteAttributeString(String, XmlDictionaryString, XmlDictionaryString, String) method

```csharp
public void WriteAttributeString (string? prefix, System.Xml.XmlDictionaryString localName, System.Xml.XmlDictionaryString? namespaceUri, string? value);
```

Writes an attribute qualified name and value.

Parameters:

- `prefix`: The prefix of the attribute.
- `localName`: The local name of the attribute.
- `namespaceUri`: The namespace URI of the attribute.
- `value`: The attribute.

To be added.

## XmlDictionaryWriter.WriteBase64Async(Byte[], Int32, Int32) method

```csharp
public override System.Threading.Tasks.Task WriteBase64Async (byte[] buffer, int index, int count);
```

Asynchronously encodes the specified binary bytes as Base64 and writes out the resulting text.

Parameters:

- `buffer`: Byte array to encode.
- `index`: The position in the buffer indicating the start of the bytes to write.
- `count`: The number of bytes to write.

Returns: The task that represents the asynchronous `WriteBase64` operation.

Exceptions:

- `InvalidOperationException`: An `XmlDictionaryWriter` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."

-or-

An `XmlDictionaryWriter` asynchronous method was called without setting the `XmlWriterSettings.Async` flag to `true`. In this case, `InvalidOperationException` is thrown with the message "Set XmlWriterSettings.Async to true if you want to use Async Methods."

#### Remarks
To use this method, you must set the `Async` flag to `true`.

## XmlDictionaryWriter.WriteElementString(XmlDictionaryString, XmlDictionaryString, String) method

```csharp
public void WriteElementString (System.Xml.XmlDictionaryString localName, System.Xml.XmlDictionaryString? namespaceUri, string? value);
```

Writes an element with a text content.

Parameters:

- `localName`: The local name of the element.
- `namespaceUri`: The namespace URI of the element.
- `value`: The element content.

To be added.

## XmlDictionaryWriter.WriteElementString(String, XmlDictionaryString, XmlDictionaryString, String) method

```csharp
public void WriteElementString (string? prefix, System.Xml.XmlDictionaryString localName, System.Xml.XmlDictionaryString? namespaceUri, string? value);
```

Writes an element with a text content.

Parameters:

- `prefix`: The prefix of the element.
- `localName`: The local name of the element.
- `namespaceUri`: The namespace URI of the element.
- `value`: The element content.

To be added.

## XmlDictionaryWriter.WriteNode(XmlDictionaryReader, Boolean) method

```csharp
public virtual void WriteNode (System.Xml.XmlDictionaryReader reader, bool defattr);
```

Writes the current XML node from an `XmlDictionaryReader`.

Parameters:

- `reader`: The `XmlDictionaryReader`.
- `defattr`: `true` to copy the default attributes from the `XmlReader`; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `reader` is `null`.

To be added.

## XmlDictionaryWriter.WriteNode(XmlReader, Boolean) method

```csharp
public override void WriteNode (System.Xml.XmlReader reader, bool defattr);
```

Writes the current XML node from an `XmlReader`.

Parameters:

- `reader`: The `XmlReader`.
- `defattr`: `true` to copy the default attributes from the `XmlReader`; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `reader` is `null`.

To be added.

## XmlDictionaryWriter.WriteQualifiedName(XmlDictionaryString, XmlDictionaryString) method

```csharp
public virtual void WriteQualifiedName (System.Xml.XmlDictionaryString localName, System.Xml.XmlDictionaryString? namespaceUri);
```

Writes out the namespace-qualified name. This method looks up the prefix that is in scope for the given namespace.

Parameters:

- `localName`: The local name of the qualified name.
- `namespaceUri`: The namespace URI of the qualified name.

Exceptions:

- `ArgumentNullException`: `localName` is `null`.

#### Remarks
If the namespace maps to the current default namespace, no prefix is generated.

When writing attribute values, this method generates a prefix if the namespace is not found. When writing element content, it throws an exception if the namespace is not found.
