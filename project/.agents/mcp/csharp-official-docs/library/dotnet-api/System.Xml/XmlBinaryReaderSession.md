---
title: "XmlBinaryReaderSession class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml/XmlBinaryReaderSession.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XmlBinaryReaderSession class

Namespace: `System.Xml`

```csharp
public class XmlBinaryReaderSession : System.Xml.IXmlDictionary
```

Enables optimized strings to be managed in a dynamic way.

#### Remarks
Session objects (this class together with `XmlBinaryWriterSession`) enable dynamic string atomization that can span an entire conversation. These session objects manage dynamic dictionaries of `XmlDictionaryString` instances. For more information about dynamic dictionaries see `XmlDictionary`.

Due to asynchronous processing, it is possible for messages that arrive synchronously to be processed in a different order than they order in which they were sent. String atomization that spans messages must ensure the messages are processed in the original order, or the atomized strings must be conveyed using a different mechanism.

To use them you create a session object and pass it to the constructor or initializer for a binary XML reader or writer.

To reuse a dynamic dictionary simply pass the same session object to all subsequent readers and/or writers.

## XmlBinaryReaderSession.XmlBinaryReaderSession() constructor

```csharp
public XmlBinaryReaderSession ();
```

Initializes a new instance of the `XmlBinaryReaderSession` class.

To be added.

## XmlBinaryReaderSession.Add(Int32, String) method

```csharp
public System.Xml.XmlDictionaryString Add (int id, string value);
```

Creates an `XmlDictionaryString` from the input parameters and adds it to an internal collection.

Parameters:

- `id`: The key value.
- `value`: The value.

Returns: The newly created `XmlDictionaryString` that is added to an internal collection.

Exceptions:

- `ArgumentOutOfRangeException`: `id` is less than zero.
- `ArgumentNullException`: `value` is `null`.
- `InvalidOperationException`: An entry with key = `id` already exists.

To be added.

## XmlBinaryReaderSession.Clear() method

```csharp
public void Clear ();
```

Clears the internal collection of all contents.

To be added.

## XmlBinaryReaderSession.TryLookup(Int32, XmlDictionaryString) method

```csharp
public bool TryLookup (int key, out System.Xml.XmlDictionaryString? result);
```

Checks whether the internal collection contains an entry matching a key.

Parameters:

- `key`: The key to search on.
- `result`: When this method returns, contains a string if an entry is found; otherwise, `null`. This parameter is passed uninitialized.

Returns: `true` if an entry matching the `key` was found; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `key` is `null`.

To be added.

## XmlBinaryReaderSession.TryLookup(String, XmlDictionaryString) method

```csharp
public bool TryLookup (string value, out System.Xml.XmlDictionaryString? result);
```

Checks whether the internal collection contains an entry matching a value.

Parameters:

- `value`: The value to search for.
- `result`: When this method returns, contains a string if an entry is found; otherwise, `null`. This parameter is passed uninitialized.

Returns: `true` if an entry matching the `value` was found; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `value` is `null`.

To be added.

## XmlBinaryReaderSession.TryLookup(XmlDictionaryString, XmlDictionaryString) method

```csharp
public bool TryLookup (System.Xml.XmlDictionaryString value, out System.Xml.XmlDictionaryString? result);
```

Checks whether the internal collection contains an entry matching a value.

Parameters:

- `value`: The value to search for.
- `result`: When this method returns, contains a string if an entry is found; otherwise, `null`. This parameter is passed uninitialized.

Returns: `true` if an entry matching the `value` was found; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `value` is `null`.

To be added.
