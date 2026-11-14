---
title: "XmlDictionary class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml/XmlDictionary.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XmlDictionary class

Namespace: `System.Xml`

```csharp
public class XmlDictionary : System.Xml.IXmlDictionary
```

Implements a dictionary used to optimize Windows Communication Foundation (WCF)'s XML reader/writer implementations.

#### Remarks
Dictionaries establish a mapping between commonly appearing text strings, and integers, and provide an effective mechanism for compressing and decompressing XML. Windows Communication Foundation (WCF) uses 2 kinds of dictionaries, static and dynamic.

With static dictionaries, both sides of the communication use a predefined dictionary.

With dynamic dictionaries, the sending side can add new strings and their mappings not already in the static dictionary. Dynamic dictionaries are sent out of band with the message. Dynamic dictionaries use the `XmlBinaryWriterSession` and `XmlBinaryReaderSession` classes to transmit messages and mappings.

## XmlDictionary.XmlDictionary() constructor

```csharp
public XmlDictionary ();
```

Creates an empty `XmlDictionary`.

To be added.

## XmlDictionary.XmlDictionary(Int32) constructor

```csharp
public XmlDictionary (int capacity);
```

Creates a `XmlDictionary` with an initial capacity.

Parameters:

- `capacity`: The initial size of the dictionary.

#### Remarks
The dictionary will resize itself as needed.

## XmlDictionary.Empty property

```csharp
public static System.Xml.IXmlDictionary Empty { get; }
```

Gets a `static` empty `IXmlDictionary`.

Returns: A `static` empty `IXmlDictionary`.

#### Remarks
This instance should be used when an `IXmlDictionary` is required but no `XmlDictionaryString`s are needed.

The empty dictionary cannot be modified.

## XmlDictionary.Add(String) method

```csharp
public virtual System.Xml.XmlDictionaryString Add (string value);
```

Adds a string to the `XmlDictionary`.

Parameters:

- `value`: String to add to the dictionary.

Returns: The `XmlDictionaryString` that was added.

#### Remarks
A `XmlDictionaryString` is built from `value`.

If the string value is already in the dictionary, the `XmlDictionaryString` previously created for it is returned.

## XmlDictionary.TryLookup(Int32, XmlDictionaryString) method

```csharp
public virtual bool TryLookup (int key, out System.Xml.XmlDictionaryString? result);
```

Attempts to look up an entry in the dictionary.

Parameters:

- `key`: Key to look up.
- `result`: If `key` is defined, the `XmlDictionaryString` that is mapped to the key; otherwise `null`.

Returns: `true` if key is in the dictionary; otherwise, `false`.

To be added.

## XmlDictionary.TryLookup(String, XmlDictionaryString) method

```csharp
public virtual bool TryLookup (string value, out System.Xml.XmlDictionaryString? result);
```

Checks the dictionary for a specified string value.

Parameters:

- `value`: String value being checked for.
- `result`: The corresponding `XmlDictionaryString`, if found; otherwise `null`.

Returns: `true` if value is in the dictionary; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `value` is `null`.

To be added.

## XmlDictionary.TryLookup(XmlDictionaryString, XmlDictionaryString) method

```csharp
public virtual bool TryLookup (System.Xml.XmlDictionaryString value, out System.Xml.XmlDictionaryString? result);
```

Checks the dictionary for a specified `XmlDictionaryString`.

Parameters:

- `value`: The `XmlDictionaryString` being checked for.
- `result`: The matching `XmlDictionaryString`, if found; otherwise, `null`.

Returns: `true` if `XmlDictionaryString` is in the dictionary; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `value` is `null`.

To be added.
