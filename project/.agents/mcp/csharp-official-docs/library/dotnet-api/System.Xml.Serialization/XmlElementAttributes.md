---
title: "XmlElementAttributes class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml.Serialization/XmlElementAttributes.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XmlElementAttributes class

Namespace: `System.Xml.Serialization`

```csharp
public class XmlElementAttributes : System.Collections.CollectionBase
```

Represents a collection of `XmlElementAttribute` objects used by the `XmlSerializer` to override the default way it serializes a class.

#### Remarks
The `XmlElementAttributes` is returned by the `XmlElements` property of the `XmlAttributes` class. By using the `XmlAttributeOverrides` class and the `XmlAttributes` class, you can override the default way that the `XmlSerializer` serializes a class.

#### Examples
The following example serializes the `Transportation` class, which contains a single field named `Vehicles` that returns an `ArrayList`. The example first applies two instances of the `XmlElementAttribute` class to the `Vehicles` field that specifies the types of objects the `XmlSerializer` inserts into the array. The example then creates two `XmlElementAttribute` objects to override the behavior of the attributes applied to the `Vehicles` property. The two overriding objects are added to the `XmlElementAttributes` collection of an `XmlAttributes`. Lastly, the example adds the `XmlAttributes` to an `XmlAttributeOverrides`, allowing the `XmlSerializer` to insert the new object types into the `ArrayList` returned by the `Vehicles` field.

_Code sample not included: ~/snippets/csharp/System.Xml.Serialization/XmlElementAttributes/Overview/source.cs._

## XmlElementAttributes.XmlElementAttributes() constructor

```csharp
public XmlElementAttributes ();
```

Initializes a new instance of the `XmlElementAttributes` class.

To be added.

## XmlElementAttributes.Item property

```csharp
public System.Xml.Serialization.XmlElementAttribute? this[int index] { get; set; }
```

Gets or sets the element at the specified index.

Parameters:

- `index`: The zero-based index of the element to get or set.

Returns: The element at the specified index.

Exceptions:

- `ArgumentOutOfRangeException`: `index` is not a valid index in the `XmlElementAttributes`.
- `NotSupportedException`: The property is set and the `XmlElementAttributes` is read-only.

To be added.

## XmlElementAttributes.Add(XmlElementAttribute) method

```csharp
public int Add (System.Xml.Serialization.XmlElementAttribute? attribute);
```

Adds an `XmlElementAttribute` to the collection.

Parameters:

- `attribute`: The `XmlElementAttribute` to add.

Returns: The zero-based index of the newly added item.

#### Examples
The following example creates two `XmlElementAttribute` objects and calls the `XmlElementAttributes.Add` method to add them to an `XmlElementAttributes`. The example then adds the `XmlElementAttributes` to an `XmlAttributeOverrides`, which is used to create an `XmlSerializer` that can serialize an instance of the `Transportation` class.

_Code sample not included: ~/snippets/csharp/System.Xml.Serialization/XmlElementAttributes/Add/source.cs._

## XmlElementAttributes.Contains(XmlElementAttribute) method

```csharp
public bool Contains (System.Xml.Serialization.XmlElementAttribute? attribute);
```

Determines whether the collection contains the specified object.

Parameters:

- `attribute`: The `XmlElementAttribute` to look for.

Returns: `true` if the object exists in the collection; otherwise, `false`.

To be added.

## XmlElementAttributes.CopyTo(XmlElementAttribute[], Int32) method

```csharp
public void CopyTo (System.Xml.Serialization.XmlElementAttribute[] array, int index);
```

Copies the `XmlElementAttributes`, or a portion of it to a one-dimensional array.

Parameters:

- `array`: The `XmlElementAttribute` array to hold the copied elements.
- `index`: The zero-based index in `array` at which copying begins.

To be added.

## XmlElementAttributes.IndexOf(XmlElementAttribute) method

```csharp
public int IndexOf (System.Xml.Serialization.XmlElementAttribute? attribute);
```

Gets the index of the specified `XmlElementAttribute`.

Parameters:

- `attribute`: The `XmlElementAttribute` whose index is being retrieved.

Returns: The zero-based index of the `XmlElementAttribute`.

To be added.

## XmlElementAttributes.Insert(Int32, XmlElementAttribute) method

```csharp
public void Insert (int index, System.Xml.Serialization.XmlElementAttribute? attribute);
```

Inserts an `XmlElementAttribute` into the collection.

Parameters:

- `index`: The zero-based index where the member is inserted.
- `attribute`: The `XmlElementAttribute` to insert.

To be added.

## XmlElementAttributes.Remove(XmlElementAttribute) method

```csharp
public void Remove (System.Xml.Serialization.XmlElementAttribute? attribute);
```

Removes the specified object from the collection.

Parameters:

- `attribute`: The `XmlElementAttribute` to remove from the collection.

To be added.
