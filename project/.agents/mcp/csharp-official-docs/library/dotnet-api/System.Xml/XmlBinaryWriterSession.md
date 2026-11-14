---
title: "XmlBinaryWriterSession class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml/XmlBinaryWriterSession.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XmlBinaryWriterSession class

Namespace: `System.Xml`

```csharp
public class XmlBinaryWriterSession
```

Enables using a dynamic dictionary to compress common strings that appear in a message and maintain state.

#### Remarks
Session objects (this class together with `XmlBinaryReaderSession`) enable dynamic string atomization that can span an entire conversation. These session objects manage dynamic dictionaries. For more information about dynamic dictionaries see `XmlDictionary`.

Due to asynchronous processing, it is possible for messages that arrive synchronously to be processed in a different order than the order in which they were sent. String atomization that spans messages must ensure the messages are processed in the original order or the atomized strings must be conveyed using a different mechanism.

To use them, you create a session object and pass it to the constructor or initializer for a binary XML reader or writer.

To reuse a dynamic dictionary pass the same session object to all subsequent readers and writers.

The session object can be reset to allow pooling.

## XmlBinaryWriterSession.XmlBinaryWriterSession() constructor

```csharp
public XmlBinaryWriterSession ();
```

Creates an instance of this class.

To be added.

## XmlBinaryWriterSession.Reset() method

```csharp
public void Reset ();
```

Clears out the internal collections.

To be added.

## XmlBinaryWriterSession.TryAdd(XmlDictionaryString, Int32) method

```csharp
public virtual bool TryAdd (System.Xml.XmlDictionaryString value, out int key);
```

Tries to add an `XmlDictionaryString` to the internal collection.

Parameters:

- `value`: The `XmlDictionaryString` to add.
- `key`: The key of the `XmlDictionaryString` that was successfully added.

Returns: `true` if the string could be added; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `value` is `null`.
- `InvalidOperationException`: An entry with key = `key` already exists.

#### Remarks
When you use this class you must override this method to send the collection of keys along with the message. Without overriding, a new key is added to the collection, which is saved, but not sent with the message.
