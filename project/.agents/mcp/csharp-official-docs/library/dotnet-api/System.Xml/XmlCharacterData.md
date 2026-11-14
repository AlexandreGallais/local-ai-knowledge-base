---
title: "XmlCharacterData class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml/XmlCharacterData.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XmlCharacterData class

Namespace: `System.Xml`

```csharp
public abstract class XmlCharacterData : System.Xml.XmlLinkedNode
```

Provides text manipulation methods that are used by several classes.

To be added.

## XmlCharacterData.XmlCharacterData(String, XmlDocument) constructor

```csharp
protected internal XmlCharacterData (string? data, System.Xml.XmlDocument doc);
```

Initializes a new instance of the `XmlCharacterData` class.

Parameters:

- `data`: String that contains character data to be added to document.
- `doc`: `XmlDocument` to contain character data.

To be added.

## XmlCharacterData.Data property

```csharp
public virtual string Data { get; set; }
```

Contains the data of the node.

Returns: The data of the node.

#### Remarks
The data returned is equivalent to the `Value` property.

## XmlCharacterData.InnerText property

```csharp
public override string InnerText { get; set; }
```

Gets or sets the concatenated values of the node and all the children of the node.

Returns: The concatenated values of the node and all the children of the node.

#### Remarks
This property is a Microsoft extension to the Document Object Model (DOM).

## XmlCharacterData.Length property

```csharp
public virtual int Length { get; }
```

Gets the length of the data, in characters.

Returns: The length, in characters, of the string in the `XmlCharacterData.Data` property. The length may be zero; that is, CharacterData nodes can be empty.

To be added.

## XmlCharacterData.Value property

```csharp
public override string? Value { get; set; }
```

Gets or sets the value of the node.

Returns: The value of the node.

Exceptions:

- `ArgumentException`: Node is read-only.

To be added.

## XmlCharacterData.AppendData(String) method

```csharp
public virtual void AppendData (string? strData);
```

Appends the specified string to the end of the character data of the node.

Parameters:

- `strData`: The string to insert into the existing string.

#### Remarks
This method raises the XmlNodeChangedAction.Change event.

## XmlCharacterData.DeleteData(Int32, Int32) method

```csharp
public virtual void DeleteData (int offset, int count);
```

Removes a range of characters from the node.

Parameters:

- `offset`: The position within the string to start deleting.
- `count`: The number of characters to delete.

#### Remarks
This method raises the XmlNodeChangedAction.Change event.

## XmlCharacterData.InsertData(Int32, String) method

```csharp
public virtual void InsertData (int offset, string? strData);
```

Inserts the specified string at the specified character offset.

Parameters:

- `offset`: The position within the string to insert the supplied string data.
- `strData`: The string data that is to be inserted into the existing string.

#### Remarks
This method raises the XmlNodeChangedAction.Change event.

## XmlCharacterData.ReplaceData(Int32, Int32, String) method

```csharp
public virtual void ReplaceData (int offset, int count, string? strData);
```

Replaces the specified number of characters starting at the specified offset with the specified string.

Parameters:

- `offset`: The position within the string to start replacing.
- `count`: The number of characters to replace.
- `strData`: The new data that replaces the old string data.

#### Remarks
This method raises the XmlNodeChangedAction.Change event.

## XmlCharacterData.Substring(Int32, Int32) method

```csharp
public virtual string Substring (int offset, int count);
```

Retrieves a substring of the full string from the specified range.

Parameters:

- `offset`: The position within the string to start retrieving. An offset of zero indicates the starting point is at the start of the data.
- `count`: The number of characters to retrieve.

Returns: The substring corresponding to the specified range.

To be added.
