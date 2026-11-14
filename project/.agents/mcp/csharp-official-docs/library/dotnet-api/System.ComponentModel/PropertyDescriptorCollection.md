---
title: "PropertyDescriptorCollection class (part 1 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/PropertyDescriptorCollection.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# PropertyDescriptorCollection class

Namespace: `System.ComponentModel`

```csharp
public class PropertyDescriptorCollection : System.Collections.IDictionary, System.Collections.IList
```

Represents a collection of `PropertyDescriptor` objects.

#### Remarks
`PropertyDescriptorCollection` is read-only; it does not implement methods that add or remove properties. You must inherit from this class to implement these methods.

Using the properties available in the `PropertyDescriptorCollection` class, you can query the collection about its contents. Use the `Count` property to determine the number of elements in the collection. Use the `PropertyDescriptorCollection.Item` property to get a specific property by index number or by name.

In addition to properties, you can use the `PropertyDescriptorCollection.Find` method to get a description of the property with the specified name from the collection.

#### Examples
The following code example creates a new `PropertyDescriptorCollection` using the properties on `button1`. It requires that `button1` has been instantiated on a form.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/PropertyDescriptorCollection/Overview/source.cs._

The next example prints all the properties on a button in a text box. It requires that `button1` and `textBox1` have been instantiated on a form.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/PropertyDescriptorCollection/Overview/source.cs._

## PropertyDescriptorCollection.PropertyDescriptorCollection(PropertyDescriptor[]) constructor

```csharp
public PropertyDescriptorCollection (System.ComponentModel.PropertyDescriptor[]? properties);
```

Initializes a new instance of the `PropertyDescriptorCollection` class.

Parameters:

- `properties`: An array of type `PropertyDescriptor` that provides the properties for this collection.

To be added.

## PropertyDescriptorCollection.PropertyDescriptorCollection(PropertyDescriptor[], Boolean) constructor

```csharp
public PropertyDescriptorCollection (System.ComponentModel.PropertyDescriptor[]? properties, bool readOnly);
```

Initializes a new instance of the `PropertyDescriptorCollection` class, which is optionally read-only.

Parameters:

- `properties`: An array of type `PropertyDescriptor` that provides the properties for this collection.
- `readOnly`: If `true`, specifies that the collection cannot be modified.

To be added.

## PropertyDescriptorCollection.Count property

```csharp
public int Count { get; }
```

Gets the number of property descriptors in the collection.

Returns: The number of property descriptors in the collection.

#### Remarks
You can use the `Count` property to set the limits of a loop that iterates through a collection of objects. Because the collection is zero-based, be sure to use `Count - 1` as the upper boundary of the loop.

#### Examples
The following code example uses the `Count` property to print the number of properties on `button1`. It requires that `button1` and `textBox1` have been instantiated on a form.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/PropertyDescriptorCollection/Count/source.cs._

## PropertyDescriptorCollection.Item property

```csharp
public virtual System.ComponentModel.PropertyDescriptor this[int index] { get; }
```

Gets or sets the `PropertyDescriptor` at the specified index number.

Parameters:

- `index`: The zero-based index of the `PropertyDescriptor` to get or set.

Returns: The `PropertyDescriptor` with the specified index number.

Exceptions:

- `IndexOutOfRangeException`: The `index` parameter is not a valid index for `PropertyDescriptorCollection.Item`.

#### Remarks
The index number is zero-based. Therefore, you must subtract 1 from the numerical position of a particular `PropertyDescriptor` to access that `PropertyDescriptor`. For example, to get the third `PropertyDescriptor`, you need to specify `myColl[2]`.

#### Examples
The following code example uses the `PropertyDescriptorCollection.Item` property to print the name of the `PropertyDescriptor` specified by the index number in a text box. Because the index number is zero-based, this example prints the name of the second `PropertyDescriptor`. It requires that `button1` has been instantiated on a form.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/PropertyDescriptorCollection/Item/source.cs._

## PropertyDescriptorCollection.Item property

```csharp
public virtual System.ComponentModel.PropertyDescriptor? this[string name] { get; }
```

Gets or sets the `PropertyDescriptor` with the specified name.

Parameters:

- `name`: The name of the `PropertyDescriptor` to get from the collection.

Returns: The `PropertyDescriptor` with the specified name, or `null` if the property does not exist.

#### Remarks
The `PropertyDescriptorCollection.Item` property is case-sensitive when searching for names. That is, the names "Pname" and "pname" are considered to be two different properties.

#### Examples
The following code example uses the `PropertyDescriptorCollection.Item` property to print the type of component for the `PropertyDescriptor` specified by the index. It requires that `button1` and `textBox1` have been instantiated on a form.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/PropertyDescriptorCollection/Item/source1.cs._

## PropertyDescriptorCollection.System.Collections.ICollection.Count property

```csharp
int System.Collections.ICollection.Count { get; }
```

Gets the number of elements contained in the collection.

Returns: The number of elements contained in the collection.

To be added.

## PropertyDescriptorCollection.System.Collections.ICollection.IsSynchronized property

```csharp
bool System.Collections.ICollection.IsSynchronized { get; }
```

Gets a value indicating whether access to the collection is synchronized (thread safe).

Returns: `true` if access to the collection is synchronized (thread safe); otherwise, `false`.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `PropertyDescriptorCollection` instance is cast to an `ICollection` interface.

## PropertyDescriptorCollection.System.Collections.ICollection.SyncRoot property

```csharp
object System.Collections.ICollection.SyncRoot { get; }
```

Gets an object that can be used to synchronize access to the collection.

Returns: An object that can be used to synchronize access to the collection.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `PropertyDescriptorCollection` instance is cast to an `ICollection` interface.

## PropertyDescriptorCollection.System.Collections.IDictionary.IsFixedSize property

```csharp
bool System.Collections.IDictionary.IsFixedSize { get; }
```

Gets a value indicating whether the `IDictionary` has a fixed size.

Returns: `true` if the `IDictionary` has a fixed size; otherwise, `false`.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `PropertyDescriptorCollection` instance is cast to an `IDictionary` interface.

## PropertyDescriptorCollection.System.Collections.IDictionary.IsReadOnly property

```csharp
bool System.Collections.IDictionary.IsReadOnly { get; }
```

Gets a value indicating whether the `IDictionary` is read-only.

Returns: `true` if the `IDictionary` is read-only; otherwise, `false`.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `PropertyDescriptorCollection` instance is cast to an `IDictionary` interface.

## PropertyDescriptorCollection.System.Collections.IDictionary.Item property

```csharp
object? System.Collections.IDictionary.Item[object key] { get; set; }
```

Gets or sets the element with the specified key.

Parameters:

- `key`: The key of the element to get or set.

Returns: The element with the specified key.

To be added.

## PropertyDescriptorCollection.System.Collections.IDictionary.Keys property

```csharp
System.Collections.ICollection System.Collections.IDictionary.Keys { get; }
```

Gets an `ICollection` containing the keys of the `IDictionary`.

Returns: An `ICollection` containing the keys of the `IDictionary`.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `PropertyDescriptorCollection` instance is cast to an `IDictionary` interface.

## PropertyDescriptorCollection.System.Collections.IDictionary.Values property

```csharp
System.Collections.ICollection System.Collections.IDictionary.Values { get; }
```

Gets an `ICollection` containing the values in the `IDictionary`.

Returns: An `ICollection` containing the values in the `IDictionary`.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `PropertyDescriptorCollection` instance is cast to an `IDictionary` interface.

## PropertyDescriptorCollection.System.Collections.IList.IsFixedSize property

```csharp
bool System.Collections.IList.IsFixedSize { get; }
```

Gets a value indicating whether the collection has a fixed size.

Returns: `true` if the collection has a fixed size; otherwise, `false`.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `PropertyDescriptorCollection` instance is cast to an `IList` interface.

## PropertyDescriptorCollection.System.Collections.IList.IsReadOnly property

```csharp
bool System.Collections.IList.IsReadOnly { get; }
```

Gets a value indicating whether the collection is read-only.

Returns: `true` if the collection is read-only; otherwise, `false`.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `PropertyDescriptorCollection` instance is cast to an `IList` interface.

## PropertyDescriptorCollection.System.Collections.IList.Item property

```csharp
object? System.Collections.IList.Item[int index] { get; set; }
```

Gets or sets an item from the collection at a specified index.

Parameters:

- `index`: The zero-based index of the item to get or set.

Returns: The element at the specified index.

Exceptions:

- `NotSupportedException`: The collection is read-only.
- `ArgumentException`: The value being set is not a `PropertyDescriptor`.
- `IndexOutOfRangeException`: `index` is less than 0.

-or-

`index` is equal to or greater than `EventDescriptorCollection.Count`.

To be added.

## PropertyDescriptorCollection.Add(PropertyDescriptor) method

```csharp
public int Add (System.ComponentModel.PropertyDescriptor value);
```

Adds the specified `PropertyDescriptor` to the collection.

Parameters:

- `value`: The `PropertyDescriptor` to add to the collection.

Returns: The index of the `PropertyDescriptor` that was added to the collection.

Exceptions:

- `NotSupportedException`: The collection is read-only.

To be added.

## PropertyDescriptorCollection.Clear() method

```csharp
public void Clear ();
```

Removes all `PropertyDescriptor` objects from the collection.

Exceptions:

- `NotSupportedException`: The collection is read-only.

To be added.

## PropertyDescriptorCollection.Contains(PropertyDescriptor) method

```csharp
public bool Contains (System.ComponentModel.PropertyDescriptor value);
```

Returns whether the collection contains the given `PropertyDescriptor`.

Parameters:

- `value`: The `PropertyDescriptor` to find in the collection.

Returns: `true` if the collection contains the given `PropertyDescriptor`; otherwise, `false`.

To be added.

## PropertyDescriptorCollection.CopyTo(Array, Int32) method

```csharp
public void CopyTo (Array array, int index);
```

Copies the entire collection to an array, starting at the specified index number.

Parameters:

- `array`: An array of `PropertyDescriptor` objects to copy elements of the collection to.
- `index`: The index of the `array` parameter at which copying begins.

To be added.

## PropertyDescriptorCollection.Find(String, Boolean) method

```csharp
public virtual System.ComponentModel.PropertyDescriptor? Find (string name, bool ignoreCase);
```

Returns the `PropertyDescriptor` with the specified name, using a Boolean to indicate whether to ignore case.

Parameters:

- `name`: The name of the `PropertyDescriptor` to return from the collection.
- `ignoreCase`: `true` if you want to ignore the case of the property name; otherwise, `false`.

Returns: A `PropertyDescriptor` with the specified name, or `null` if the property does not exist.

#### Examples
The following code example finds a specific `PropertyDescriptor`. It prints the type of component for this `PropertyDescriptor` in a text box. It requires that `button1` and `textBox1` have been instantiated on a form.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/PropertyDescriptorCollection/Find/source.cs._

## PropertyDescriptorCollection.GetEnumerator() method

```csharp
public virtual System.Collections.IEnumerator GetEnumerator ();
```

Returns an enumerator for this class.

Returns: An enumerator of type `IEnumerator`.

#### Examples
The following code example gets an enumerator for the properties on `button1`. It uses the enumerator to print the names of the properties in the collection. It requires that `button1` and `textBox1` have been instantiated on a form.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/PropertyDescriptorCollection/GetEnumerator/source.cs._

## PropertyDescriptorCollection.IndexOf(PropertyDescriptor) method

```csharp
public int IndexOf (System.ComponentModel.PropertyDescriptor? value);
```

Returns the index of the given `PropertyDescriptor`.

Parameters:

- `value`: The `PropertyDescriptor` to return the index of.

Returns: The index of the given `PropertyDescriptor`.

To be added.

## PropertyDescriptorCollection.Insert(Int32, PropertyDescriptor) method

```csharp
public void Insert (int index, System.ComponentModel.PropertyDescriptor value);
```

Adds the `PropertyDescriptor` to the collection at the specified index number.

Parameters:

- `index`: The index at which to add the `value` parameter to the collection.
- `value`: The `PropertyDescriptor` to add to the collection.

Exceptions:

- `NotSupportedException`: The collection is read-only.

To be added.

## PropertyDescriptorCollection.InternalSort(IComparer) method

```csharp
protected void InternalSort (System.Collections.IComparer? sorter);
```

Sorts the members of this collection, using the specified `IComparer`.

Parameters:

- `sorter`: A comparer to use to sort the `PropertyDescriptor` objects in this collection.

To be added.
