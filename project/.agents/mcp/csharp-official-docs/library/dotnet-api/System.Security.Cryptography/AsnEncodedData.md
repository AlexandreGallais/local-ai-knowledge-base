---
title: "AsnEncodedData class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography/AsnEncodedData.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# AsnEncodedData class

Namespace: `System.Security.Cryptography`

```csharp
public class AsnEncodedData
```

Represents Abstract Syntax Notation One (ASN.1)-encoded data.

#### Remarks
Abstract Syntax Notation One (ASN.1), which is defined in CCITT Recommendation X.208, is a way to specify abstract objects that will be serially transmitted. The set of ASN.1 rules for representing such objects as strings of ones and zeros is called the Distinguished Encoding Rules (DER), and is defined in CCITT Recommendation X.509, Section 8.7. These encoding methods are used by the cryptography namespace in .NET.

Note that if an unknown data type is encountered while accessing an instance of this class, data is returned as a hexadecimal string.

#### Examples
The following code example shows how to use the `AsnEncodedData` class.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/AsnEncodedData/Overview/asnencodeddata.cs._

## AsnEncodedData.AsnEncodedData() constructor

```csharp
protected AsnEncodedData ();
```

Initializes a new instance of the `AsnEncodedData` class.

#### Examples
The following code example shows how to use the `AsnEncodedData` class.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/AsnEncodedData/Overview/asnencodeddata.cs._

## AsnEncodedData.AsnEncodedData(Byte[]) constructor

```csharp
public AsnEncodedData (byte[] rawData);
```

Initializes a new instance of the `AsnEncodedData` class using a byte array.

Parameters:

- `rawData`: A byte array that contains Abstract Syntax Notation One (ASN.1)-encoded data.

To be added.

## AsnEncodedData.AsnEncodedData(Byte>) constructor

```csharp
public AsnEncodedData (ReadOnlySpan<byte> rawData);
```

Initializes a new instance of the `AsnEncodedData` class from existing encoded data.

Parameters:

- `rawData`: The Abstract Syntax Notation One (ASN.1)-encoded data.

To be added.

## AsnEncodedData.AsnEncodedData(AsnEncodedData) constructor

```csharp
public AsnEncodedData (System.Security.Cryptography.AsnEncodedData asnEncodedData);
```

Initializes a new instance of the `AsnEncodedData` class using an instance of the `AsnEncodedData` class.

Parameters:

- `asnEncodedData`: An instance of the `AsnEncodedData` class.

Exceptions:

- `ArgumentNullException`: `asnEncodedData` is `null`.

#### Remarks
This constructor makes a copy of the specified `AsnEncodedData` instance.

#### Examples
The following code example shows how to use the `AsnEncodedData` class.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/AsnEncodedData/Overview/asnencodeddata.cs._

## AsnEncodedData.AsnEncodedData(Oid, Byte[]) constructor

```csharp
public AsnEncodedData (System.Security.Cryptography.Oid? oid, byte[] rawData);
```

Initializes a new instance of the `AsnEncodedData` class using an `Oid` object and a byte array.

Parameters:

- `oid`: An `Oid` object.
- `rawData`: A byte array that contains Abstract Syntax Notation One (ASN.1)-encoded data.

#### Examples
The following code example shows how to use the `AsnEncodedData` class.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/AsnEncodedData/Overview/asnencodeddata.cs._

## AsnEncodedData.AsnEncodedData(Oid, Byte>) constructor

```csharp
public AsnEncodedData (System.Security.Cryptography.Oid? oid, ReadOnlySpan<byte> rawData);
```

Initializes a new instance of the `AsnEncodedData` class from an object identifier (OID) and existing encoded data.

Parameters:

- `oid`: The object identifier for this data.
- `rawData`: The Abstract Syntax Notation One (ASN.1)-encoded data.

To be added.

## AsnEncodedData.AsnEncodedData(String, Byte[]) constructor

```csharp
public AsnEncodedData (string oid, byte[] rawData);
```

Initializes a new instance of the `AsnEncodedData` class using a byte array.

Parameters:

- `oid`: A string that represents `Oid` information.
- `rawData`: A byte array that contains Abstract Syntax Notation One (ASN.1)-encoded data.

#### Examples
The following code example shows how to use the `AsnEncodedData` class.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/AsnEncodedData/Overview/asnencodeddata.cs._

## AsnEncodedData.AsnEncodedData(String, Byte>) constructor

```csharp
public AsnEncodedData (string oid, ReadOnlySpan<byte> rawData);
```

Initializes a new instance of the `AsnEncodedData` class from an object identifier (OID) and existing encoded data.

Parameters:

- `oid`: The object identifier for this data.
- `rawData`: The Abstract Syntax Notation One (ASN.1)-encoded data.

To be added.

## AsnEncodedData.Oid property

```csharp
public System.Security.Cryptography.Oid? Oid { get; set; }
```

Gets or sets the `Oid` value for an `AsnEncodedData` object.

Returns: An `Oid` object.

#### Remarks
This property can be used to provide information about the Abstract Syntax Notation One (ASN.1)-encoded data, such as the algorithm used to encrypt the data.

#### Examples
The following code example shows how to use the `AsnEncodedData` class.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/AsnEncodedData/Overview/asnencodeddata.cs._

## AsnEncodedData.RawData property

```csharp
public byte[] RawData { get; set; }
```

Gets or sets the Abstract Syntax Notation One (ASN.1)-encoded data represented in a byte array.

Returns: A byte array that represents the Abstract Syntax Notation One (ASN.1)-encoded data.

Exceptions:

- `ArgumentNullException`: The value is `null`.

#### Remarks
This property is the easiest way to access the information in an `AsnEncodedData` object.

#### Examples
The following code example shows how to use the `AsnEncodedData` class.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/AsnEncodedData/Overview/asnencodeddata.cs._

## AsnEncodedData.CopyFrom(AsnEncodedData) method

```csharp
public virtual void CopyFrom (System.Security.Cryptography.AsnEncodedData asnEncodedData);
```

Copies information from an `AsnEncodedData` object.

Parameters:

- `asnEncodedData`: The `AsnEncodedData` object to base the new object on.

Exceptions:

- `ArgumentNullException`: `asnEncodedData` is `null`.

#### Remarks
This method copies information to an `AsnEncodedData` object based on the specified `AsnEncodedData` object.

#### Examples
The following code example shows how to use the `AsnEncodedData` class.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/AsnEncodedData/Overview/asnencodeddata.cs._

## AsnEncodedData.Format(Boolean) method

```csharp
public virtual string Format (bool multiLine);
```

Returns a formatted version of the Abstract Syntax Notation One (ASN.1)-encoded data as a string.

Parameters:

- `multiLine`: `true` if the return string should contain carriage returns; otherwise, `false`.

Returns: A formatted string that represents the Abstract Syntax Notation One (ASN.1)-encoded data.

Use this method if you need to print Abstract Syntax Notation One (ASN.1)-encoded data or output the information to a text box. Use the `multiLine` parameter to control the layout of the output.

Don't rely on output from this method, because it's intended for pretty-printing, and its output format is not guaranteed.

```csharp
extension.Format(true);

// output "DNS Name=san1.example.com\r\nDNS Name=san2.example.com\r\n" on .NET Core 2.2 Windows
// output "DNS:san1.example.com, DNS:san2.example.com" on .NET Core 2.2 Linux
```

The following code example shows how to use the `AsnEncodedData` class.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/AsnEncodedData/Overview/asnencodeddata.cs._
