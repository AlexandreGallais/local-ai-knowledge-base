---
title: "XmlDictionaryReader class (part 4 of 5)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml/XmlDictionaryReader.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XmlDictionaryReader class (part 4 of 5)

## XmlDictionaryReader.ReadArray(XmlDictionaryString, XmlDictionaryString, Single[], Int32, Int32) method

```csharp
public virtual int ReadArray (System.Xml.XmlDictionaryString localName, System.Xml.XmlDictionaryString namespaceUri, float[] array, int offset, int count);
```

Reads repeated occurrences of `float` numbers into a typed array.

Parameters:

- `localName`: The local name of the element.
- `namespaceUri`: The namespace URI of the element.
- `array`: The array into which the float numbers are put.
- `offset`: The starting index in the array.
- `count`: The number of float numbers to put in the array.

Returns: The number of float numbers put in the array.

Exceptions:

- `ArgumentNullException`: `array` is `null`.
- `ArgumentOutOfRangeException`: `offset` is < 0 or > `array` length.

-or-

`count` is < 0 or > `array` length minus `offset`.

To be added.

## XmlDictionaryReader.ReadArray(XmlDictionaryString, XmlDictionaryString, TimeSpan[], Int32, Int32) method

```csharp
public virtual int ReadArray (System.Xml.XmlDictionaryString localName, System.Xml.XmlDictionaryString namespaceUri, TimeSpan[] array, int offset, int count);
```

Reads repeated occurrences of `TimeSpan` nodes into a typed array.

Parameters:

- `localName`: The local name of the element.
- `namespaceUri`: The namespace URI of the element.
- `array`: The array into which the nodes are put.
- `offset`: The starting index in the array.
- `count`: The number of nodes to put in the array.

Returns: The number of nodes put in the array.

Exceptions:

- `ArgumentNullException`: `array` is `null`.
- `ArgumentOutOfRangeException`: `offset` is < 0 or > `array` length.

-or-

`count` is < 0 or > `array` length minus `offset`.

To be added.

## XmlDictionaryReader.ReadBooleanArray(String, String) method

```csharp
public virtual bool[] ReadBooleanArray (string localName, string namespaceUri);
```

Reads repeated occurrences of `Boolean` nodes into a typed array.

Parameters:

- `localName`: The local name of the element.
- `namespaceUri`: The namespace URI of the element.

Returns: A `Boolean` array of the `Boolean` nodes.

#### Remarks
The buffer allocated by this read operation is limited by the MaxArrayLength quota.

## XmlDictionaryReader.ReadBooleanArray(XmlDictionaryString, XmlDictionaryString) method

```csharp
public virtual bool[] ReadBooleanArray (System.Xml.XmlDictionaryString localName, System.Xml.XmlDictionaryString namespaceUri);
```

Reads repeated occurrences of `Boolean` nodes into a typed array.

Parameters:

- `localName`: The local name of the element.
- `namespaceUri`: The namespace URI of the element.

Returns: A `Boolean` array of the `Boolean` nodes.

#### Remarks
The buffer allocated by this read operation is limited by the MaxArrayLength quota.

## XmlDictionaryReader.ReadContentAs(Type, IXmlNamespaceResolver) method

```csharp
public override object ReadContentAs (Type type, System.Xml.IXmlNamespaceResolver? namespaceResolver);
```

Converts a node's content to a specified type.

Parameters:

- `type`: The `Type` of the value to be returned.
- `namespaceResolver`: An `IXmlNamespaceResolver` object that is used to resolve any namespace prefixes related to type conversion. For example, this can be used when converting an `XmlQualifiedName` object to an `xs:string`. This value can be a null reference.

Returns: The concatenated text content or attribute value converted to the requested type.

To be added.

## XmlDictionaryReader.ReadContentAsBase64() method

```csharp
public virtual byte[] ReadContentAsBase64 ();
```

Reads the content and returns the Base64 decoded binary bytes.

Returns: A byte array that contains the Base64 decoded binary bytes.

Exceptions:

- `XmlException`: The array size is greater than the MaxArrayLength quota for this reader.

#### Remarks
The buffer allocated by this read operation is limited by the MaxArrayLength quota.

## XmlDictionaryReader.ReadContentAsBinHex() method

```csharp
public virtual byte[] ReadContentAsBinHex ();
```

Reads the content and returns the `BinHex` decoded binary bytes.

Returns: A byte array that contains the `BinHex` decoded binary bytes.

Exceptions:

- `XmlException`: The array size is greater than <see cref="F:System.Int32.MaxValue">Int32.MaxValue</see>.

#### Remarks
The buffer allocated by this read operation is limited by the MaxArrayLength quota.

## XmlDictionaryReader.ReadContentAsBinHex(Int32) method

```csharp
protected byte[] ReadContentAsBinHex (int maxByteArrayContentLength);
```

Reads the content and returns the `BinHex` decoded binary bytes.

Parameters:

- `maxByteArrayContentLength`: The maximum array length.

Returns: A byte array that contains the `BinHex` decoded binary bytes.

Exceptions:

- `XmlException`: The array size is greater than `maxByteArrayContentLength`.

To be added.

## XmlDictionaryReader.ReadContentAsChars(Char[], Int32, Int32) method

```csharp
public virtual int ReadContentAsChars (char[] chars, int offset, int count);
```

Reads the content into a `char` array.

Parameters:

- `chars`: The array into which the characters are put.
- `offset`: The starting index in the array.
- `count`: The number of characters to put in the array.

Returns: Number of characters read.

To be added.

## XmlDictionaryReader.ReadContentAsDecimal() method

```csharp
public override decimal ReadContentAsDecimal ();
```

Converts a node's content to `decimal`.

Returns: The `decimal` representation of node's content.

To be added.

## XmlDictionaryReader.ReadContentAsFloat() method

```csharp
public override float ReadContentAsFloat ();
```

Converts a node's content to `float`.

Returns: The `float` representation of node's content.

To be added.

## XmlDictionaryReader.ReadContentAsGuid() method

```csharp
public virtual Guid ReadContentAsGuid ();
```

Converts a node's content to `guid`.

Returns: The `guid` representation of node's content.

To be added.

## XmlDictionaryReader.ReadContentAsQualifiedName(String, String) method

```csharp
public virtual void ReadContentAsQualifiedName (out string localName, out string namespaceUri);
```

Converts a node's content to a qualified name representation.

Parameters:

- `localName`: The `XmlReader.LocalName` part of the qualified name (`out` parameter).
- `namespaceUri`: The `XmlReader.NamespaceURI` part of the qualified name (`out` parameter).

To be added.

## XmlDictionaryReader.ReadContentAsString() method

```csharp
public override string ReadContentAsString ();
```

Converts a node's content to a string.

Returns: The node content in a string representation.

#### Remarks
The string returned by this read operation is limited by the MaxStringContentLength quota

## XmlDictionaryReader.ReadContentAsString(Int32) method

```csharp
protected string ReadContentAsString (int maxStringContentLength);
```

Converts a node's content to a string.

Parameters:

- `maxStringContentLength`: The maximum string length.

Returns: Node content in string representation.

#### Remarks
The string returned by this read operation is limited by the MaxStringContentLength quota.

## XmlDictionaryReader.ReadContentAsString(String[], Int32) method

```csharp
public virtual string ReadContentAsString (string[] strings, out int index);
```

Converts a node's content to a string.

Parameters:

- `strings`: The array of strings to match content against.
- `index`: The index of the entry in `strings` that matches the content.

Returns: The node content in a string representation.

Exceptions:

- `ArgumentNullException`: `strings` is `null`.

-or-

An entry in `strings` is `null`.

To be added.

## XmlDictionaryReader.ReadContentAsString(XmlDictionaryString[], Int32) method

```csharp
public virtual string ReadContentAsString (System.Xml.XmlDictionaryString[] strings, out int index);
```

Converts a node's content to a string.

Parameters:

- `strings`: The array of `XmlDictionaryString` objects to match content against.
- `index`: The index of the entry in `strings` that matches the content.

Returns: The node content in a string representation.

Exceptions:

- `ArgumentNullException`: `strings` is `null`.

-or-

An entry in `strings` is `null`.

To be added.

## XmlDictionaryReader.ReadContentAsTimeSpan() method

```csharp
public virtual TimeSpan ReadContentAsTimeSpan ();
```

Converts a node's content to `TimeSpan`.

Returns: `TimeSpan` representation of node's content.

To be added.

## XmlDictionaryReader.ReadContentAsUniqueId() method

```csharp
public virtual System.Xml.UniqueId ReadContentAsUniqueId ();
```

Converts a node's content to a unique identifier.

Returns: The node's content represented as a unique identifier.

To be added.

## XmlDictionaryReader.ReadDateTimeArray(String, String) method

```csharp
public virtual DateTime[] ReadDateTimeArray (string localName, string namespaceUri);
```

Converts a node's content to a `DateTime` array.

Parameters:

- `localName`: The local name of the element.
- `namespaceUri`: The namespace URI of the element.

Returns: The node's content represented as a `DateTime` array.

#### Remarks
The buffer allocated by this read operation is limited by the MaxArrayLength quota.

## XmlDictionaryReader.ReadDateTimeArray(XmlDictionaryString, XmlDictionaryString) method

```csharp
public virtual DateTime[] ReadDateTimeArray (System.Xml.XmlDictionaryString localName, System.Xml.XmlDictionaryString namespaceUri);
```

Converts a node's content to a `DateTime` array.

Parameters:

- `localName`: The local name of the element.
- `namespaceUri`: The namespace URI of the element.

Returns: The node's content represented as a `DateTime` array.

To be added.

## XmlDictionaryReader.ReadDecimalArray(String, String) method

```csharp
public virtual decimal[] ReadDecimalArray (string localName, string namespaceUri);
```

Converts a node's content to a `Decimal` array.

Parameters:

- `localName`: The local name of the element.
- `namespaceUri`: The namespace URI of the element.

Returns: The node's content represented as a `Decimal` array.

#### Remarks
The buffer allocated by this read operation is limited by the MaxArrayLength quota.

## XmlDictionaryReader.ReadDecimalArray(XmlDictionaryString, XmlDictionaryString) method

```csharp
public virtual decimal[] ReadDecimalArray (System.Xml.XmlDictionaryString localName, System.Xml.XmlDictionaryString namespaceUri);
```

Converts a node's content to a `Decimal` array.

Parameters:

- `localName`: The local name of the element.
- `namespaceUri`: The namespace URI of the element.

Returns: The node's content represented as a `Decimal` array.

#### Remarks
The buffer allocated by this read operation is limited by the MaxArrayLength quota.

## XmlDictionaryReader.ReadDoubleArray(String, String) method

```csharp
public virtual double[] ReadDoubleArray (string localName, string namespaceUri);
```

Converts a node's content to a `Double` array.

Parameters:

- `localName`: The local name of the element.
- `namespaceUri`: The namespace URI of the element.

Returns: The node's content represented as a `Double` array.

#### Remarks
The buffer allocated by this read operation is limited by the MaxArrayLength quota.

## XmlDictionaryReader.ReadDoubleArray(XmlDictionaryString, XmlDictionaryString) method

```csharp
public virtual double[] ReadDoubleArray (System.Xml.XmlDictionaryString localName, System.Xml.XmlDictionaryString namespaceUri);
```

Converts a node's content to a `Double` array.

Parameters:

- `localName`: The local name of the element.
- `namespaceUri`: The namespace URI of the element.

Returns: The node's content represented as a `Double` array.

#### Remarks
The buffer allocated by this read operation is limited by the MaxArrayLength quota.

## XmlDictionaryReader.ReadElementContentAsBase64() method

```csharp
public virtual byte[] ReadElementContentAsBase64 ();
```

Converts a node's content to a array of Base64 bytes.

Returns: The node's content represented as an array of Base64 bytes.

#### Remarks
The string returned by this read operation is limited by the MaxArrayLength quota.

## XmlDictionaryReader.ReadElementContentAsBinHex() method

```csharp
public virtual byte[] ReadElementContentAsBinHex ();
```

Converts a node's content to an array of `BinHex` bytes.

Returns: The node's content represented as an array of `BinHex` bytes.

#### Remarks
The string returned by this read operation is limited by the MaxArrayLength quota.

## XmlDictionaryReader.ReadElementContentAsBoolean() method

```csharp
public override bool ReadElementContentAsBoolean ();
```

Converts an element's content to a `Boolean`.

Returns: The node's content represented as a `Boolean`.

To be added.

## XmlDictionaryReader.ReadElementContentAsDateTime() method

```csharp
public override DateTime ReadElementContentAsDateTime ();
```

Converts an element's content to a `DateTime`.

Returns: The node's content represented as a `DateTime`.

Exceptions:

- `ArgumentException`: The element is not in valid format.
- `FormatException`: The element is not in valid format.

To be added.

## XmlDictionaryReader.ReadElementContentAsDecimal() method

```csharp
public override decimal ReadElementContentAsDecimal ();
```

Converts an element's content to a `Decimal`.

Returns: The node's content represented as a `Decimal`.

To be added.

## XmlDictionaryReader.ReadElementContentAsDouble() method

```csharp
public override double ReadElementContentAsDouble ();
```

Converts an element's content to a `Double`.

Returns: The node's content represented as a `Double`.

To be added.

## XmlDictionaryReader.ReadElementContentAsFloat() method

```csharp
public override float ReadElementContentAsFloat ();
```

Converts an element's content to a floating point number (`Single`).

Returns: The node's content represented as a floating point number (`Single`).

To be added.

## XmlDictionaryReader.ReadElementContentAsGuid() method

```csharp
public virtual Guid ReadElementContentAsGuid ();
```

Converts an element's content to a `Guid`.

Returns: The node's content represented as a `Guid`.

Exceptions:

- `ArgumentException`: The element is not in valid format.
- `FormatException`: The element is not in valid format.

To be added.

## XmlDictionaryReader.ReadElementContentAsInt() method

```csharp
public override int ReadElementContentAsInt ();
```

Converts an element's content to an integer (`Int32`).

Returns: The node's content represented as an integer (`Int32`).

To be added.

## XmlDictionaryReader.ReadElementContentAsLong() method

```csharp
public override long ReadElementContentAsLong ();
```

Converts an element's content to a long integer (`Int64`).

Returns: The node's content represented as a long integer (`Int64`).

To be added.
