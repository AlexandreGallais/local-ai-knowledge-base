---
title: "XmlAnyElementAttributes class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml.Serialization/XmlAnyElementAttributes.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XmlAnyElementAttributes class

Namespace: `System.Xml.Serialization`

```csharp
public class XmlAnyElementAttributes : System.Collections.CollectionBase
```

Represents a collection of `XmlAnyElementAttribute` objects.

#### Remarks
Use the `XmlAnyElementAttributes` to override the behavior of a set of `XmlAnyElementAttribute` objects. Multiple instances of the `XmlAnyElementAttribute` class can be applied to a class member, as long as each instance has a distinct `Name` property value; this instructs the `XmlSerializer` to collect unknown elements under the named element into the appropriate array. It is for this reason that multiple instances of the `XmlAnyElementAttribute` class can be added to the `XmlAnyElementAttributes`.

To override a set of `XmlAnyElementAttribute` objects:

1.  Create an `XmlAnyElementAttributes`.

2.  Create the set of `XmlAnyElementAttribute` objects, and add each object to the collection using the `XmlAnyElementAttributes.Add` method.

3.  Create an `XmlAttributes`.

4.  Set the `XmlAnyElements` property to the `XmlAnyElementAttributes`.

5.  Create an `XmlAttributeOverrides`.

6.  Add the `XmlAttributes` to the `XmlAttributeOverrides` using the `XmlAttributeOverrides.Add` method.

7.  Create an instance of the `XmlSerializer` using the `XmlAttributeOverrides`.

8.  Serialize or deserialize an object that contains the set of `XmlAnyElementAttribute` objects.

#### Examples
The following example creates a new `XmlAnyElementAttribute` and adds it to the collection of objects accessed through the `XmlAnyElements` property. The `XmlAttributes` is then added to a `XmlAttributeOverrides`, which is used to create an `XmlSerializer`. The `XmlSerializer` is used to serialize or deserialize an object. To see the effect of using the `XmlAnyElementAttributes` property, create an XML document named UnknownElements.xml by running the `SerializeObject` method in the `Main` method. Edit the resulting document to include other (unknown) elements. Comment out the `SerializeObject` call in the `Main` method, and uncomment the call to the `DeserializeObject` method, which prints out the name and value of any unknown XML element.

_Code sample not included: ~/snippets/csharp/System.Xml.Serialization/XmlAnyElementAttributes/Overview/xmlanyover.cs._

## XmlAnyElementAttributes.XmlAnyElementAttributes() constructor

```csharp
public XmlAnyElementAttributes ();
```

Initializes a new instance of the `XmlAnyElementAttributes` class.

To be added.

## XmlAnyElementAttributes.Item property

```csharp
public System.Xml.Serialization.XmlAnyElementAttribute? this[int index] { get; set; }
```

Gets or sets the `XmlAnyElementAttribute` at the specified index.

Parameters:

- `index`: The index of the `XmlAnyElementAttribute`.

Returns: An `XmlAnyElementAttribute` at the specified index.

To be added.

## XmlAnyElementAttributes.Add(XmlAnyElementAttribute) method

```csharp
public int Add (System.Xml.Serialization.XmlAnyElementAttribute? attribute);
```

Adds an `XmlAnyElementAttribute` to the collection.

Parameters:

- `attribute`: The `XmlAnyElementAttribute` to add.

Returns: The index of the newly added `XmlAnyElementAttribute`.

#### Examples
The following example creates a new `XmlAnyElementAttribute` and adds it to the collection of objects accessed through the `XmlAnyElements` property. The `XmlAttributes` is then added to an `XmlAttributeOverrides`, which is used to create an `XmlSerializer`. The `XmlSerializer` is used to serialize or deserialize an object. To see the effect of using the `XmlAnyElementAttributes` property, create an XML document named UnknownElements.xml by running the `SerializeObject` method in the `Main` method. Edit the resulting document to include other (unknown) elements. Comment out the `SerializeObject` call in the `Main` method, and uncomment the call to the `DeserializeObject` method, which prints out the name and value of any unknown XML element.

_Code sample not included: ~/snippets/csharp/System.Xml.Serialization/XmlAnyElementAttributes/Overview/xmlanyover.cs._

## XmlAnyElementAttributes.Contains(XmlAnyElementAttribute) method

```csharp
public bool Contains (System.Xml.Serialization.XmlAnyElementAttribute? attribute);
```

Gets a value that indicates whether the specified `XmlAnyElementAttribute` exists in the collection.

Parameters:

- `attribute`: The `XmlAnyElementAttribute` you are interested in.

Returns: `true` if the `XmlAnyElementAttribute` exists in the collection; otherwise, `false`.

To be added.

## XmlAnyElementAttributes.CopyTo(XmlAnyElementAttribute[], Int32) method

```csharp
public void CopyTo (System.Xml.Serialization.XmlAnyElementAttribute[] array, int index);
```

Copies the entire collection to a compatible one-dimensional array of `XmlElementAttribute` objects, starting at the specified index of the target array.

Parameters:

- `array`: The one-dimensional array of `XmlElementAttribute` objects that is the destination of the elements copied from the collection. The array must have zero-based indexing.
- `index`: The zero-based index in `array` at which copying begins.

To be added.

## XmlAnyElementAttributes.IndexOf(XmlAnyElementAttribute) method

```csharp
public int IndexOf (System.Xml.Serialization.XmlAnyElementAttribute? attribute);
```

Gets the index of the specified `XmlAnyElementAttribute`.

Parameters:

- `attribute`: The `XmlAnyElementAttribute` whose index you want.

Returns: The index of the specified `XmlAnyElementAttribute`.

To be added.

## XmlAnyElementAttributes.Insert(Int32, XmlAnyElementAttribute) method

```csharp
public void Insert (int index, System.Xml.Serialization.XmlAnyElementAttribute? attribute);
```

Inserts an `XmlAnyElementAttribute` into the collection at the specified index.

Parameters:

- `index`: The index where the `XmlAnyElementAttribute` is inserted.
- `attribute`: The `XmlAnyElementAttribute` to insert.

To be added.

## XmlAnyElementAttributes.Remove(XmlAnyElementAttribute) method

```csharp
public void Remove (System.Xml.Serialization.XmlAnyElementAttribute? attribute);
```

Removes the specified `XmlAnyElementAttribute` from the collection.

Parameters:

- `attribute`: The `XmlAnyElementAttribute` to remove.

To be added.
