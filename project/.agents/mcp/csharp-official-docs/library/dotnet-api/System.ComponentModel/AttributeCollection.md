---
title: "AttributeCollection class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/AttributeCollection.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# AttributeCollection class

Namespace: `System.ComponentModel`

```csharp
public class AttributeCollection : System.Collections.ICollection
```

Represents a collection of attributes.

#### Remarks
The `AttributeCollection` class is read-only; it does not implement methods to add or remove attributes. You must inherit from this class to implement these methods.

Use the `Count` property to find the number of attributes that exist in the collection.

You can also use the methods of this class to query the collection about its contents. Call the `AttributeCollection.Contains` method to verify that a specified attribute or attribute array exists in the collection. Call the `AttributeCollection.Matches` method to verify that a specified attribute or array of attributes exists in the collection, and that the values of the specified attributes are the same as the values in the collection.

While most attributes have default values, default values are not required. If an attribute has no default value, `null` is returned from the indexed property that takes a type. When defining your own attributes, you can declare a default value by either providing a constructor that takes no arguments, or defining a public static field of your attribute type named "Default".

#### Examples
The first code example checks to see whether the `BrowsableAttribute` has been set in this collection. The second code example gets the actual value of the `DescriptionAttribute` for a button. Both examples require that `button1` and `textBox1` have been created on a form. When using attributes, verify that an attribute has been set, or access its value.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/AttributeCollection/Overview/source.cs._

_Code sample not included: ~/snippets/csharp/System.ComponentModel/AttributeCollection/Overview/source.cs._

## AttributeCollection.AttributeCollection() constructor

```csharp
protected AttributeCollection ();
```

Initializes a new instance of the `AttributeCollection` class.

To be added.

## AttributeCollection.AttributeCollection(Attribute[]) constructor

```csharp
public AttributeCollection (params Attribute[]? attributes);
```

Initializes a new instance of the `AttributeCollection` class.

Parameters:

- `attributes`: An array of type `Attribute` that provides the attributes for this collection.

Exceptions:

- `ArgumentNullException`: `attributes` is `null`.

#### Examples
The following code example creates a new `AttributeCollection` using the attributes on `button1`. It assumes that `button1` has been created on a form.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/AttributeCollection/.ctor/source.cs._

## AttributeCollection.Attributes property

```csharp
protected virtual Attribute[] Attributes { get; }
```

Gets the attribute collection.

Returns: The attribute collection.

To be added.

## AttributeCollection.Count property

```csharp
public int Count { get; }
```

Gets the number of attributes.

Returns: The number of attributes.

#### Remarks
You can use the `Count` property to set the limits of a loop that iterates through a collection of objects. If the collection is zero-based, be sure to use `Count - 1` as the upper boundary of the loop.

#### Examples
The following code example uses the `Count` property to print the number of properties on `button1` in a text box. It assumes that `button1` and `textBox1` have been created on a form.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/AttributeCollection/Count/source.cs._

## AttributeCollection.Item property

```csharp
public virtual Attribute this[int index] { get; }
```

Gets the attribute with the specified index number.

Parameters:

- `index`: The zero-based index of `AttributeCollection`.

Returns: The `Attribute` with the specified index number.

#### Remarks
The index number is zero-based. Therefore, you must subtract 1 from the numerical position of a particular `Attribute` to access that `Attribute`. For example, to get the third `Attribute`, you need to specify `myColl[2]`.

#### Examples
The following code example uses the `AttributeCollection.Item` property to print the name of the `Attribute` specified by the index number in a text box. Because the index number is zero-based, this code example prints the name of the second `Attribute` in a text box. It assumes `button1` and `textBox1` have been created on a form.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/AttributeCollection/Item/source.cs._

## AttributeCollection.Item property

```csharp
public virtual Attribute? this[Type attributeType] { get; }
```

Gets the attribute with the specified type.

Parameters:

- `attributeType`: The `Type` of the `Attribute` to get from the collection.

Returns: The `Attribute` with the specified type or, if the attribute does not exist, the default value for the attribute type.

#### Remarks
If the attribute does not exist in the collection, this property returns the default value for the attribute type.

#### Examples
The following code example gets the `DesignerAttribute` from the collection and prints its value. It assumes that `button1` and `textBox1` have been created on a form.

For this code example to run, you must provide the fully qualified assembly name. For information about how to obtain the fully qualified assembly name, see Assembly Names.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/AttributeCollection/Item/source1.cs._

## AttributeCollection.System.Collections.ICollection.Count property

```csharp
int System.Collections.ICollection.Count { get; }
```

Gets the number of elements contained in the collection.

Returns: The number of elements contained in the collection.

To be added.

## AttributeCollection.System.Collections.ICollection.IsSynchronized property

```csharp
bool System.Collections.ICollection.IsSynchronized { get; }
```

Gets a value indicating whether access to the collection is synchronized (thread-safe).

Returns: `true` if access to the collection is synchronized (thread-safe); otherwise, `false`.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `AttributeCollection` instance is cast to an `ICollection` interface.

## AttributeCollection.System.Collections.ICollection.SyncRoot property

```csharp
object System.Collections.ICollection.SyncRoot { get; }
```

Gets an object that can be used to synchronize access to the collection.

Returns: An object that can be used to synchronize access to the collection.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `AttributeCollection` instance is cast to an `ICollection` interface.

## AttributeCollection.Contains(Attribute) method

```csharp
public bool Contains (Attribute? attribute);
```

Determines whether this collection of attributes has the specified attribute.

Parameters:

- `attribute`: An `Attribute` to find in the collection.

Returns: `true` if the collection contains the attribute or is the default attribute for the type of attribute; otherwise, `false`.

#### Remarks
This collection has the specified attribute if the specified type of attribute exists in the collection, and if the value of the specified attribute is the same as the value of the instance of the attribute in the collection.

The difference between the `AttributeCollection.Matches` and `AttributeCollection.Contains` methods is that `AttributeCollection.Matches` calls the `Attribute.Match` method on an attribute, and `AttributeCollection.Contains` calls the `Object.Equals` method.

For most attributes, these methods do the same thing. For attributes that may have multiple flags, however, `Attribute.Match` is typically implemented so that it returns `true` if any of the flags are satisfied. For example, consider a data binding attribute with the Boolean flags "SupportsSql", "SupportsOleDb", and "SupportsXml". This attribute may be present on a property that supports all three data-binding approaches. It will often be the case that a programmer needs to know only if a particular approach is available, not all three. Therefore, a programmer could use `Attribute.Match` with an instance of the attribute containing only the flags the programmer needs.

#### Examples
The following code example checks to see whether the collection has a `BrowsableAttribute` set to `true`. It assumes that `button1` and `textBox1` have been created on a form.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/AttributeCollection/Contains/source.cs._

## AttributeCollection.Contains(Attribute[]) method

```csharp
public bool Contains (Attribute[]? attributes);
```

Determines whether this attribute collection contains all the specified attributes in the attribute array.

Parameters:

- `attributes`: An array of type `Attribute` to find in the collection.

Returns: `true` if the collection contains all the attributes; otherwise, `false`.

#### Remarks
This collection has the specified array of attributes if all the specified attribute types exist in the collection and if each attribute in the specified array is the same as an attribute in the collection.

#### Examples
The following code example compares the attributes in `button1` and `textBox1` to see whether the attributes for the button are contained in the attributes for the text box. It assumes that both `button1` and `textBox1` have been created on a form.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/AttributeCollection/Contains/source1.cs._

## AttributeCollection.CopyTo(Array, Int32) method

```csharp
public void CopyTo (Array array, int index);
```

Copies the collection to an array, starting at the specified index.

Parameters:

- `array`: The `Array` to copy the collection to.
- `index`: The index to start from.

To be added.

## AttributeCollection.FromExisting(AttributeCollection, Attribute[]) method

```csharp
public static System.ComponentModel.AttributeCollection FromExisting (System.ComponentModel.AttributeCollection existing, params Attribute[]? newAttributes);
```

Creates a new `AttributeCollection` from an existing `AttributeCollection`.

Parameters:

- `existing`: An `AttributeCollection` from which to create the copy.
- `newAttributes`: An array of type `Attribute` that provides the attributes for this collection. Can be `null`.

Returns: A new `AttributeCollection` that is a copy of `existing`.

Exceptions:

- `ArgumentNullException`: `existing` is `null`.

#### Remarks
If the `newAttributes` parameter is provided, its `Attribute` entries are merged with those of the `existing` parameter.

## AttributeCollection.GetDefaultAttribute(Type) method

```csharp
protected Attribute? GetDefaultAttribute (Type attributeType);
```

Returns the default `Attribute` of a given `Type`.

Parameters:

- `attributeType`: The `Type` of the attribute to retrieve.

Returns: The default `Attribute` of a given `attributeType`.

To be added.

## AttributeCollection.GetEnumerator() method

```csharp
public System.Collections.IEnumerator GetEnumerator ();
```

Gets an enumerator for this collection.

Returns: An enumerator of type `IEnumerator`.

#### Examples
The following code example gets an enumerator for the attributes on `button1`. It uses the enumerator to print the names of the attributes in the collection. It assumes that `button1` and `textBox1` have been created on a form.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/AttributeCollection/GetEnumerator/source.cs._

## AttributeCollection.Matches(Attribute) method

```csharp
public bool Matches (Attribute? attribute);
```

Determines whether a specified attribute is the same as an attribute in the collection.

Parameters:

- `attribute`: An instance of `Attribute` to compare with the attributes in this collection.

Returns: `true` if the attribute is contained within the collection and has the same value as the attribute in the collection; otherwise, `false`.

#### Remarks
An attribute can provide support for matching.

The difference between the `AttributeCollection.Matches` and `AttributeCollection.Contains` methods is that `AttributeCollection.Matches` calls the `Attribute.Match` method on an attribute, and `AttributeCollection.Contains` calls the `Object.Equals` method.

For most attributes, these methods do the same thing. For attributes that may have multiple flags, however, `Attribute.Match` is typically implemented so that it returns `true` if any of the flags are satisfied. For example, consider a data binding attribute with the Boolean flags "SupportsSql", "SupportsOleDb", and "SupportsXml". This attribute may be present on a property that supports all three data binding approaches. It will often be the case that a programmer needs to know only if a particular approach is available, not all three. Therefore, a programmer could use `Attribute.Match` with an instance of the attribute containing only the flags the programmer needs.

#### Examples
The following code example verifies that the `BrowsableAttribute` is a member of the collection and that it has been set to `true`. It assumes that `button1` and `textBox1` have been created on a form.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/AttributeCollection/Matches/source.cs._

## AttributeCollection.Matches(Attribute[]) method

```csharp
public bool Matches (Attribute[]? attributes);
```

Determines whether the attributes in the specified array are the same as the attributes in the collection.

Parameters:

- `attributes`: An array of `MemberAttributes` to compare with the attributes in this collection.

Returns: `true` if all the attributes in the array are contained in the collection and have the same values as the attributes in the collection; otherwise, `false`.

#### Remarks
An attribute can provide support for matching.

#### Examples
The following code example compares the attributes in a button and a text box to see whether they match. It assumes that `button1` and `textBox1` have been created on a form.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/AttributeCollection/Matches/source1.cs._

## AttributeCollection.System.Collections.IEnumerable.GetEnumerator() method

```csharp
System.Collections.IEnumerator IEnumerable.GetEnumerator ();
```

Returns an `IEnumerator` for the `IDictionary`.

Returns: An `IEnumerator` for the `IDictionary`.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `AttributeCollection` instance is cast to an `IEnumerable` interface.

## AttributeCollection.Empty field

```csharp
public static readonly System.ComponentModel.AttributeCollection Empty;
```

Specifies an empty collection that you can use, rather than creating a new one. This field is read-only.

To be added.
