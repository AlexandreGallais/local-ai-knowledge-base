---
title: "XmlDictionaryString class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml/XmlDictionaryString.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XmlDictionaryString class

Namespace: `System.Xml`

```csharp
public class XmlDictionaryString
```

Represents an entry stored in a `XmlDictionary`.

#### Remarks
This class represents an entry in an `IXmlDictionary`.  It associates an integer value with a string value for use by `XmlDictionaryReader` and `XmlDictionaryWriter` implementations.

## XmlDictionaryString.XmlDictionaryString(IXmlDictionary, String, Int32) constructor

```csharp
public XmlDictionaryString (System.Xml.IXmlDictionary dictionary, string value, int key);
```

Creates an instance of this class.

Parameters:

- `dictionary`: The `IXmlDictionary` containing this instance.
- `value`: The string that is the value of the dictionary entry.
- `key`: The integer that is the key of the dictionary entry.

Exceptions:

- `ArgumentNullException`: `dictionary` or `value` is `null`.
- `ArgumentOutOfRangeException`: `key` is less than 0 or greater than <see cref="F:System.Int32.MaxValue">Int32.MaxValue</see> / 4.

#### Remarks
The `XmlDictionaryString` does not automatically add itself to the specified dictionary.

## XmlDictionaryString.Dictionary property

```csharp
public System.Xml.IXmlDictionary Dictionary { get; }
```

Represents the `IXmlDictionary` passed to the constructor of this instance of `XmlDictionaryString`.

Returns: The `IXmlDictionary` for this dictionary entry.

To be added.

## XmlDictionaryString.Empty property

```csharp
public static System.Xml.XmlDictionaryString Empty { get; }
```

Gets an `XmlDictionaryString` representing the empty string.

Returns: An `XmlDictionaryString` representing the empty string.

To be added.

## XmlDictionaryString.Key <example-value>

```csharp
public int Key { get; }
```

Gets the integer key for this instance of the class.

Returns: The integer key for this instance of the class.

#### Remarks
This property must be greater than 0 and less than `MaxValue` / 4.

## XmlDictionaryString.Value property

```csharp
public string Value { get; }
```

Gets the string value for this instance of the class.

Returns: The string value for this instance of the class.

To be added.

## XmlDictionaryString.ToString() method

```csharp
public override string ToString ();
```

Displays a text representation of this object.

Returns: The string value for this instance of the class.

To be added.
