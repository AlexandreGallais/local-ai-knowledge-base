---
title: "IXmlDictionary interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml/IXmlDictionary.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IXmlDictionary interface

Namespace: `System.Xml`

```csharp
public interface IXmlDictionary
```

An `interface` that defines the contract that an Xml dictionary must implement to be used by `XmlDictionaryReader` and `XmlDictionaryWriter` implementations.

#### Remarks
This `interface` is implemented by `XmlDictionary`, which is used in Windows Communication Foundation (WCF) to optimize the performance of serialization and deserialization of XML messages. Implement this interface to provide custom `XmlDictionaryString` management.

## IXmlDictionary.TryLookup(Int32, XmlDictionaryString) method

```csharp
public bool TryLookup (int key, out System.Xml.XmlDictionaryString? result);
```

Attempts to look up an entry in the dictionary.

Parameters:

- `key`: Key to look up.
- `result`: If `key` is defined, the `XmlDictionaryString` that is mapped to the key; otherwise `null`.

Returns: `true` if key is in the dictionary; otherwise, `false`.

To be added.

## IXmlDictionary.TryLookup(String, XmlDictionaryString) method

```csharp
public bool TryLookup (string value, out System.Xml.XmlDictionaryString? result);
```

Checks the dictionary for a specified string value.

Parameters:

- `value`: String value being checked for.
- `result`: The corresponding `XmlDictionaryString`, if found; otherwise, `null`.

Returns: `true` if value is in the dictionary; otherwise, `false`.

To be added.

## IXmlDictionary.TryLookup(XmlDictionaryString, XmlDictionaryString) method

```csharp
public bool TryLookup (System.Xml.XmlDictionaryString value, out System.Xml.XmlDictionaryString? result);
```

Checks the dictionary for a specified `XmlDictionaryString`.

Parameters:

- `value`: The `XmlDictionaryString` being checked for.
- `result`: The matching `XmlDictionaryString`, if found; otherwise, `null`.

Returns: `true` if `XmlDictionaryString` is in the dictionary; otherwise, `false`.

To be added.
