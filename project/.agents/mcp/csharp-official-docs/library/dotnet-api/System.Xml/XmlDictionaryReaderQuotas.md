---
title: "XmlDictionaryReaderQuotas class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml/XmlDictionaryReaderQuotas.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XmlDictionaryReaderQuotas class

Namespace: `System.Xml`

```csharp
public sealed class XmlDictionaryReaderQuotas
```

Contains configurable quota values for XmlDictionaryReaders.

#### Remarks
`XmlDictionary` instances are used by WCF when serializing and deserializing SOAP messages. The `XmlDictionary` contains string/value pairs which are used to decrease the size of the SOAP message. When serializing a message the value is written in place of the string. When deserializing the message the value is read but the string is written to the message object.  `XmlDictionaryReaderQuotas` is a class that contains a number of quotas used by the `XmlDictionaryReader` class. The most important security feature of the dictionary readers is quotas. A quotas instance must be given to the dictionary reader factory methods. The parameterless constructor creates "secure" defaults (same as encoded defaults), and the class has a static `Max` property for creating a reader without quotas.

## XmlDictionaryReaderQuotas.XmlDictionaryReaderQuotas() constructor

```csharp
public XmlDictionaryReaderQuotas ();
```

Creates a new instance of this class.

#### Remarks
This constructor initializes the properties to "secure" defaults:

MaxDepth = 32;

MaxStringContentLength = 8192;

MaxArrayLength = 16384;

MaxBytesPerRead = 4096;

MaxNameTableCharCount = 16384.

## XmlDictionaryReaderQuotas.Max property

```csharp
public static System.Xml.XmlDictionaryReaderQuotas Max { get; }
```

Gets an instance of this class with all properties set to maximum values.

Returns: An instance of `XmlDictionaryReaderQuotas` with properties set to <see cref="F:System.Int32.MaxValue">Int32.MaxValue</see>.

#### Remarks
The instance returned is read-only. Use the property to create a reader without quotas.

## XmlDictionaryReaderQuotas.MaxArrayLength property

```csharp
public int MaxArrayLength { get; set; }
```

Gets or sets the maximum allowed array length.

Returns: The maximum allowed array length. The default is 16384.

Exceptions:

- `InvalidOperationException`: Trying to `set` the value, but quota values are read-only for this instance.
- `ArgumentException`: Trying to `set` the value to less than zero.

#### Remarks
This quota governs the maximum array length that is created and returned by various API calls. It affects special array APIs as well as byte arrays returned from ReadContentAsBase64(). This limit does not affect the ReadContentAsBase64() override that takes an array to be populated with data.

Note that this property value applies to every step of message processing. This includes some steps that can expand the size of a message or message part. In particular, encryption can dramatically increase the size of a message. When setting this value, you must take this into account.

Instances created with the public constructor have properties that can be `set`.

## XmlDictionaryReaderQuotas.MaxBytesPerRead property

```csharp
public int MaxBytesPerRead { get; set; }
```

Gets or sets the maximum allowed bytes returned for each read.

Returns: The maximum allowed bytes returned for each read. The default is 4096.

Exceptions:

- `InvalidOperationException`: Trying to `set` the value, but quota values are read-only for this instance.
- `ArgumentException`: Trying to `set` the value to less than zero.

#### Remarks
This quota limits the number of bytes that can be consumed by the reader during a single call to `Read`().

This quota is an approximation, because transformations in the encoding layer happen before this quota is applied. This quota is closely tied to the number of bytes received on the wire at the transport level, but its purpose is to control the quantity of data we receive for each read. In practice, it is used to limit the size of start tags. Because the entire start tag must be buffered to be processed (attributes uniqueness must be verified), the size must be limited to mitigate DOS attacks.

Instances created with the public constructor have properties that can be `set`.

## XmlDictionaryReaderQuotas.MaxDepth property

```csharp
public int MaxDepth { get; set; }
```

Gets or sets the maximum nested node depth.

Returns: The maximum nested node depth. The default is 32.

Exceptions:

- `InvalidOperationException`: Trying to `set` the value and quota values are read-only for this instance.
- `ArgumentException`: Trying to `set` the value is less than zero.

#### Remarks
This quota sets a limit on the nested node depth for the XML.

## XmlDictionaryReaderQuotas.MaxNameTableCharCount property

```csharp
public int MaxNameTableCharCount { get; set; }
```

Gets or sets the maximum characters allowed in a table name.

Returns: The maximum characters allowed in a table name. The default is 16384.

Exceptions:

- `InvalidOperationException`: Trying to `set` the value, but quota values are read-only for this instance.
- `ArgumentException`: Trying to `set` the value to less than zero.

#### Remarks
This quota limits the total number of characters in strings that are atomized in the NameTable for the reader. When strings are atomized they are inserted into a NameTable and never removed. This can cause the buildup of large amounts of character data in a NameTable. This quota places a limit on how much data can be buffered in the reader's NameTable.

## XmlDictionaryReaderQuotas.MaxStringContentLength property

```csharp
public int MaxStringContentLength { get; set; }
```

Gets or sets the maximum string length returned by the reader.

Returns: The maximum string length returned by the reader. The default is 8192.

Exceptions:

- `InvalidOperationException`: Trying to `set` the value, but quota values are read-only for this instance.
- `ArgumentException`: Trying to `set` the value to less than zero.

#### Remarks
This quota limits the length of strings that are created and returned by various APIs. When calling `Read`() and checking the `Value` property, the reader chunks string values into manageable pieces (when in streaming mode). However, calling `ReadContentAsString`() concatenates all these pieces and return one large string. In the binary format, if the value of an element node is a sequence of dictionary string IDs then the values of those strings are concatenated. This can be an extremely large expansion and is mitigated by this limit.

## XmlDictionaryReaderQuotas.ModifiedQuotas property

```csharp
public System.Xml.XmlDictionaryReaderQuotaTypes ModifiedQuotas { get; }
```

Gets the modified quotas for the `XmlDictionaryReaderQuotas`.

Returns: The modified quotas for the `XmlDictionaryReaderQuotas`.

To be added.

## XmlDictionaryReaderQuotas.CopyTo(XmlDictionaryReaderQuotas) method

```csharp
public void CopyTo (System.Xml.XmlDictionaryReaderQuotas quotas);
```

Sets the properties on a passed-in quotas instance, based on the values in this instance.

Parameters:

- `quotas`: The `XmlDictionaryReaderQuotas` instance to which to copy values.

Exceptions:

- `InvalidOperationException`: Trying to `set` the value, but quota values are read-only for the passed in instance.
- `ArgumentNullException`: Passed in target `quotas` is `null`.

To be added.
