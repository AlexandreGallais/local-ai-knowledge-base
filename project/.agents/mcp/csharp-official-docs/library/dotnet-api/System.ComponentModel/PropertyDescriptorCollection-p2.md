---
title: "PropertyDescriptorCollection class (part 2 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/PropertyDescriptorCollection.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# PropertyDescriptorCollection class (part 2 of 2)

## PropertyDescriptorCollection.InternalSort(String[]) method

```csharp
protected void InternalSort (string[]? names);
```

Sorts the members of this collection. The specified order is applied first, followed by the default sort for this collection, which is usually alphabetical.

Parameters:

- `names`: An array of strings describing the order in which to sort the `PropertyDescriptor` objects in this collection.

#### Examples
The following code example defines the sort order for the `PropertyDescriptorCollection.InternalSort` method. If the `PropertyDescriptorCollection` contains four `PropertyDescriptor` objects with the names `A`, `B`, `C`, and `D`, the properties of `myNewColl` would be sorted in the order `D`, `B`, `A`, and `C`.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/EventDescriptorCollection/InternalSort/source.cs._

## PropertyDescriptorCollection.Remove(PropertyDescriptor) method

```csharp
public void Remove (System.ComponentModel.PropertyDescriptor? value);
```

Removes the specified `PropertyDescriptor` from the collection.

Parameters:

- `value`: The `PropertyDescriptor` to remove from the collection.

Exceptions:

- `NotSupportedException`: The collection is read-only.

To be added.

## PropertyDescriptorCollection.RemoveAt(Int32) method

```csharp
public void RemoveAt (int index);
```

Removes the `PropertyDescriptor` at the specified index from the collection.

Parameters:

- `index`: The index of the `PropertyDescriptor` to remove from the collection.

Exceptions:

- `NotSupportedException`: The collection is read-only.

To be added.

## PropertyDescriptorCollection.Sort() method

```csharp
public virtual System.ComponentModel.PropertyDescriptorCollection Sort ();
```

Sorts the members of this collection, using the default sort for this collection, which is usually alphabetical.

Returns: A new `PropertyDescriptorCollection` that contains the sorted `PropertyDescriptor` objects.

To be added.

## PropertyDescriptorCollection.Sort(IComparer) method

```csharp
public virtual System.ComponentModel.PropertyDescriptorCollection Sort (System.Collections.IComparer? comparer);
```

Sorts the members of this collection, using the specified `IComparer`.

Parameters:

- `comparer`: A comparer to use to sort the `PropertyDescriptor` objects in this collection.

Returns: A new `PropertyDescriptorCollection` that contains the sorted `PropertyDescriptor` objects.

To be added.

## PropertyDescriptorCollection.Sort(String[]) method

```csharp
public virtual System.ComponentModel.PropertyDescriptorCollection Sort (string[]? names);
```

Sorts the members of this collection. The specified order is applied first, followed by the default sort for this collection, which is usually alphabetical.

Parameters:

- `names`: An array of strings describing the order in which to sort the `PropertyDescriptor` objects in this collection.

Returns: A new `PropertyDescriptorCollection` that contains the sorted `PropertyDescriptor` objects.

#### Examples
The following code example defines the sort order for the `PropertyDescriptorCollection.Sort` method. If the `PropertyDescriptorCollection` contains four `PropertyDescriptor` objects with the names `A`, `B`, `C`, and `D`, the properties of `myNewColl` would be sorted in the order `D`, `B`, `A`, and `C`.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/EventDescriptorCollection/Sort/source.cs._

## PropertyDescriptorCollection.Sort(String[], IComparer) method

```csharp
public virtual System.ComponentModel.PropertyDescriptorCollection Sort (string[]? names, System.Collections.IComparer? comparer);
```

Sorts the members of this collection. The specified order is applied first, followed by the sort using the specified `IComparer`.

Parameters:

- `names`: An array of strings describing the order in which to sort the `PropertyDescriptor` objects in this collection.
- `comparer`: A comparer to use to sort the `PropertyDescriptor` objects in this collection.

Returns: A new `PropertyDescriptorCollection` that contains the sorted `PropertyDescriptor` objects.

#### Examples
The following code example defines the sort order for the `PropertyDescriptorCollection.Sort` method. If the `PropertyDescriptorCollection` contains four `PropertyDescriptor` objects with the names `A`, `B`, `C`, and `D`, the properties of `myNewColl` would be sorted in the order `D`, `B`, `A`, and `C`.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/EventDescriptorCollection/Sort/source.cs._

## PropertyDescriptorCollection.System.Collections.IDictionary.Add(Object, Object) method

```csharp
void IDictionary.Add (object key, object value);
```

Adds an element with the provided key and value to the `IDictionary`.

Parameters:

- `key`: The `Object` to use as the key of the element to add.
- `value`: The `Object` to use as the value of the element to add.

Exceptions:

- `NotSupportedException`: The collection is read-only.
- `ArgumentException`: `value` is `null`.

To be added.

## PropertyDescriptorCollection.System.Collections.IDictionary.Clear() method

```csharp
void IDictionary.Clear ();
```

Removes all elements from the `IDictionary`.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `PropertyDescriptorCollection` instance is cast to an `IDictionary` interface.

## PropertyDescriptorCollection.System.Collections.IDictionary.Contains(Object) method

```csharp
bool IDictionary.Contains (object key);
```

Determines whether the `IDictionary` contains an element with the specified key.

Parameters:

- `key`: The key to locate in the `IDictionary`.

Returns: `true` if the `IDictionary` contains an element with the key; otherwise, `false`.

To be added.

## PropertyDescriptorCollection.System.Collections.IDictionary.GetEnumerator() method

```csharp
System.Collections.IDictionaryEnumerator IDictionary.GetEnumerator ();
```

Returns an enumerator for this class.

Returns: An enumerator of type `IEnumerator`.

#### Examples
The following code example gets an enumerator for the properties on `button1`. It uses the enumerator to print the names of the properties in the collection. It requires that `button1` and `textBox1` have been instantiated on a form.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/PropertyDescriptorCollection/GetEnumerator/source.cs._

## PropertyDescriptorCollection.System.Collections.IDictionary.Remove(Object) method

```csharp
void IDictionary.Remove (object key);
```

Removes the element with the specified key from the `IDictionary`.

Parameters:

- `key`: The key of the element to remove.

To be added.

## PropertyDescriptorCollection.System.Collections.IEnumerable.GetEnumerator() method

```csharp
System.Collections.IEnumerator IEnumerable.GetEnumerator ();
```

Returns an `IEnumerator` for the `IDictionary`.

Returns: An `IEnumerator` for the `IDictionary`.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `PropertyDescriptorCollection` instance is cast to an `IEnumerable` interface.

## PropertyDescriptorCollection.System.Collections.IList.Add(Object) method

```csharp
int IList.Add (object value);
```

Adds an item to the `IList`.

Parameters:

- `value`: The item to add to the collection.

Returns: The position into which the new element was inserted.

To be added.

## PropertyDescriptorCollection.System.Collections.IList.Clear() method

```csharp
void IList.Clear ();
```

Removes all items from the collection.

Exceptions:

- `NotSupportedException`: The collection is read-only.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `PropertyDescriptorCollection` instance is cast to an `IList` interface.

## PropertyDescriptorCollection.System.Collections.IList.Contains(Object) method

```csharp
bool IList.Contains (object value);
```

Determines whether the collection contains a specific value.

Parameters:

- `value`: The item to locate in the collection.

Returns: `true` if the item is found in the collection; otherwise, `false`.

To be added.

## PropertyDescriptorCollection.System.Collections.IList.IndexOf(Object) method

```csharp
int IList.IndexOf (object value);
```

Determines the index of a specified item in the collection.

Parameters:

- `value`: The item to locate in the collection.

Returns: The index of `value` if found in the list, otherwise -1.

To be added.

## PropertyDescriptorCollection.System.Collections.IList.Insert(Int32, Object) method

```csharp
void IList.Insert (int index, object value);
```

Inserts an item into the collection at a specified index.

Parameters:

- `index`: The zero-based index at which `value` should be inserted.
- `value`: The item to insert into the collection.

Exceptions:

- `NotSupportedException`: The collection is read-only.

To be added.

## PropertyDescriptorCollection.System.Collections.IList.Remove(Object) method

```csharp
void IList.Remove (object value);
```

Removes the first occurrence of a specified value from the collection.

Parameters:

- `value`: The item to remove from the collection.

Exceptions:

- `NotSupportedException`: The collection is read-only.

To be added.

## PropertyDescriptorCollection.System.Collections.IList.RemoveAt(Int32) method

```csharp
void IList.RemoveAt (int index);
```

Removes the item at the specified index.

Parameters:

- `index`: The zero-based index of the item to remove.

Exceptions:

- `NotSupportedException`: The collection is read-only.

To be added.

## PropertyDescriptorCollection.Empty field

```csharp
public static readonly System.ComponentModel.PropertyDescriptorCollection Empty;
```

Specifies an empty collection that you can use instead of creating a new one with no items. This `static` field is read-only.

To be added.
