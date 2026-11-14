---
title: "CryptographicAttributeObject class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography/CryptographicAttributeObject.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# CryptographicAttributeObject class

Namespace: `System.Security.Cryptography`

```csharp
public sealed class CryptographicAttributeObject
```

Contains a type and a collection of values associated with that type.

#### Remarks
This class corresponds to an ASN.1 structure defined in the Cryptographic Message Syntax standards specification.

## CryptographicAttributeObject.CryptographicAttributeObject(Oid) constructor

```csharp
public CryptographicAttributeObject (System.Security.Cryptography.Oid oid);
```

Initializes a new instance of the `CryptographicAttributeObject` class using an attribute represented by the specified `Oid` object.

Parameters:

- `oid`: The attribute to store in this `CryptographicAttributeObject` object.

To be added.

## CryptographicAttributeObject.CryptographicAttributeObject(Oid, AsnEncodedDataCollection) constructor

```csharp
public CryptographicAttributeObject (System.Security.Cryptography.Oid oid, System.Security.Cryptography.AsnEncodedDataCollection? values);
```

Initializes a new instance of the `CryptographicAttributeObject` class using an attribute represented by the specified `Oid` object and the set of values associated with that attribute represented by the specified `AsnEncodedDataCollection` collection.

Parameters:

- `oid`: The attribute to store in this `CryptographicAttributeObject` object.
- `values`: The set of values associated with the attribute represented by the `oid` parameter.

Exceptions:

- `InvalidOperationException`: The collection contains duplicate items.

To be added.

## CryptographicAttributeObject.Oid property

```csharp
public System.Security.Cryptography.Oid Oid { get; }
```

Gets the `Oid` object that specifies the object identifier for the attribute.

Returns: The object identifier for the attribute.

To be added.

## CryptographicAttributeObject.Values property

```csharp
public System.Security.Cryptography.AsnEncodedDataCollection Values { get; }
```

Gets the `AsnEncodedDataCollection` collection that contains the set of values that are associated with the attribute.

Returns: The set of values that is associated with the attribute.

To be added.
