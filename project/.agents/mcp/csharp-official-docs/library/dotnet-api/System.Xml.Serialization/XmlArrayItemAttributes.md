---
title: "XmlArrayItemAttributes class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml.Serialization/XmlArrayItemAttributes.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XmlArrayItemAttributes class

Namespace: `System.Xml.Serialization`

```csharp
public class XmlArrayItemAttributes : System.Collections.CollectionBase
```

Represents a collection of `XmlArrayItemAttribute` objects.

#### Remarks
The `XmlArrayItemAttributes` class allows you to specify the derived types that can be inserted into an array returned by a public field or public read/write property.

An instance of this class is returned by the `XmlArrayItems` property of the `XmlAttributes` class. The `XmlAttributes` class is used when overriding the set of `XmlArrayItemAttribute` objects that can be inserted into an array to which the `XmlArrayAttribute` has been applied.

For each new type you want the field or property to accept, create an `XmlArrayItemAttribute` and use the `XmlArrayItemAttributes.Add` to add the object to the `XmlArrayItemAttributes` collection returned by the `XmlArrayItems` property. `XmlAttributeOverrides.Add` the `XmlAttributes` to an `XmlAttributeOverrides`, that specifies the type of the object that contains the field or property, and the name of the field or property. Construct an `XmlSerializer` with the `XmlAttributeOverrides` before calling the `XmlSerializer.Serialize` or `XmlSerializer.Deserialize` method.

## XmlArrayItemAttributes.XmlArrayItemAttributes() constructor

```csharp
public XmlArrayItemAttributes ();
```

Initializes a new instance of the `XmlArrayItemAttributes` class.

To be added.

## XmlArrayItemAttributes.Item property

```csharp
public System.Xml.Serialization.XmlArrayItemAttribute? this[int index] { get; set; }
```

Gets or sets the item at the specified index.

Parameters:

- `index`: The zero-based index of the collection member to get or set.

Returns: The `XmlArrayItemAttribute` at the specified index.

To be added.

## XmlArrayItemAttributes.Add(XmlArrayItemAttribute) method

```csharp
public int Add (System.Xml.Serialization.XmlArrayItemAttribute? attribute);
```

Adds an `XmlArrayItemAttribute` to the collection.

Parameters:

- `attribute`: The `XmlArrayItemAttribute` to add to the collection.

Returns: The index of the added item.

To be added.

## XmlArrayItemAttributes.Contains(XmlArrayItemAttribute) method

```csharp
public bool Contains (System.Xml.Serialization.XmlArrayItemAttribute? attribute);
```

Determines whether the collection contains the specified `XmlArrayItemAttribute`.

Parameters:

- `attribute`: The `XmlArrayItemAttribute` to check for.

Returns: `true` if the collection contains the specified `XmlArrayItemAttribute`; otherwise, `false`.

To be added.

## XmlArrayItemAttributes.CopyTo(XmlArrayItemAttribute[], Int32) method

```csharp
public void CopyTo (System.Xml.Serialization.XmlArrayItemAttribute[] array, int index);
```

Copies an `XmlArrayItemAttribute` array to the collection, starting at a specified target index.

Parameters:

- `array`: The array of `XmlArrayItemAttribute` objects to copy to the collection.
- `index`: The index at which the copied attributes begin.

To be added.

## XmlArrayItemAttributes.IndexOf(XmlArrayItemAttribute) method

```csharp
public int IndexOf (System.Xml.Serialization.XmlArrayItemAttribute? attribute);
```

Returns the zero-based index of the first occurrence of the specified `XmlArrayItemAttribute` in the collection or -1 if the attribute is not found in the collection.

Parameters:

- `attribute`: The `XmlArrayItemAttribute` to locate in the collection.

Returns: The first index of the `XmlArrayItemAttribute` in the collection or -1 if the attribute is not found in the collection.

To be added.

## XmlArrayItemAttributes.Insert(Int32, XmlArrayItemAttribute) method

```csharp
public void Insert (int index, System.Xml.Serialization.XmlArrayItemAttribute? attribute);
```

Inserts an `XmlArrayItemAttribute` into the collection at the specified index.

Parameters:

- `index`: The index at which the attribute is inserted.
- `attribute`: The `XmlArrayItemAttribute` to insert.

To be added.

## XmlArrayItemAttributes.Remove(XmlArrayItemAttribute) method

```csharp
public void Remove (System.Xml.Serialization.XmlArrayItemAttribute? attribute);
```

Removes an `XmlArrayItemAttribute` from the collection, if it is present.

Parameters:

- `attribute`: The `XmlArrayItemAttribute` to remove.

#### Remarks
The implementation of this is the same as the `ArrayList.Remove`.
