---
title: "ActivityTagsCollection class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics/ActivityTagsCollection.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ActivityTagsCollection class

Namespace: `System.Diagnostics`

```csharp
public class ActivityTagsCollection : System.Collections.Generic.ICollection<System.Collections.Generic.KeyValuePair<string,object>>, System.Collections.Generic.IDictionary<string,object>, System.Collections.Generic.IEnumerable<System.Collections.Generic.KeyValuePair<string,object>>
```

ActivityTagsCollection is a collection class used to store tracing tags.

This collection will be used with classes like `ActivityEvent` and `ActivityLink`.

This collection behaves as follows:

- The collection items will be ordered according to how they are added.
- Don't allow duplication of items with the same key.
- When using the indexer to store an item in the collection:

- If the item has a key that previously existed in the collection and the value is `null`, the collection item matching the key will be removed from the collection.
- If the item has a key that previously existed in the collection and the value is not `null`, the new item value will replace the old value stored in the collection.
- Otherwise, the item will be added to the collection.

- Add method will add a new item to the collection if an item doesn't already exist with the same key. Otherwise, it will throw an exception.

To be added.

## ActivityTagsCollection.ActivityTagsCollection() constructor

```csharp
public ActivityTagsCollection ();
```

Create a new instance of the collection.

To be added.

## ActivityTagsCollection.ActivityTagsCollection(Object>>) constructor

```csharp
public ActivityTagsCollection (System.Collections.Generic.IEnumerable<System.Collections.Generic.KeyValuePair<string,object?>> list);
```

Create a new instance of the collection and store the input list items in the collection.

Parameters:

- `list`: Initial list to store in the collection.

To be added.

## ActivityTagsCollection.Count property

```csharp
public int Count { get; }
```

Gets the number of elements contained in the collection.

Returns: The number of elements contained in the `ICollection<T>`.

To be added.

## ActivityTagsCollection.IsReadOnly property

```csharp
public bool IsReadOnly { get; }
```

Gets a value indicating whether the collection is read-only. This always returns `false`.

Returns: Always returns `false`.

To be added.

## ActivityTagsCollection.Item property

```csharp
public object? this[string key] { get; set; }
```

Gets or sets a specified collection item.

When setting a value to this indexer property, the following behavior is observed:
- If the key <example-value> existed in the collection and the value is `null`, the collection item matching the key will get removed from the collection.
- If the key <example-value> existed in the collection and the value is not `null`, the value will replace the old value stored in the collection.
- Otherwise, a new item will get added to the collection.

Parameters:

- `key`: The key of the value to get or set.

Returns: The object mapped to the key.

To be added.

## ActivityTagsCollection.Keys property

```csharp
public System.Collections.Generic.ICollection<string> Keys { get; }
```

Get the list of the keys of all stored tags.

Returns: An `ICollection<T>` containing the keys of the object that implements `IDictionary<T1,T2>`.

To be added.

## ActivityTagsCollection.Values property

```csharp
public System.Collections.Generic.ICollection<object?> Values { get; }
```

Get the list of the values of all stored tags.

Returns: An `ICollection<T>` containing the values in the object that implements `IDictionary<T1,T2>`.

To be added.

## ActivityTagsCollection.Add(Object>) method

```csharp
public void Add (System.Collections.Generic.KeyValuePair<string,object?> item);
```

Adds an item to the collection.

Parameters:

- `item`: Key and value pair of the tag to add to the collection.

Exceptions:

- `InvalidOperationException`: `item` already exists in the list.
- `ArgumentNullException`: `item` is `null`.

To be added.

## ActivityTagsCollection.Add(String, Object) method

```csharp
public void Add (string key, object? value);
```

Adds a tag with the provided key and value to the collection. This collection doesn't allow adding two tags with the same key.

Parameters:

- `key`: The tag key.
- `value`: The tag value.

To be added.

## ActivityTagsCollection.Clear() method

```csharp
public void Clear ();
```

Removes all items from the collection.

To be added.

## ActivityTagsCollection.Contains(Object>) method

```csharp
public bool Contains (System.Collections.Generic.KeyValuePair<string,object?> item);
```

Determines whether the `ICollection<T>` contains a specific value.

Parameters:

- `item`: The object to locate in the `ICollection<T>`.

Returns: `true` if `item` is found in the `ICollection<T>`; otherwise, `false`.

To be added.

## ActivityTagsCollection.ContainsKey(String) method

```csharp
public bool ContainsKey (string key);
```

Determines whether the collection contains an element with the specified key.

Parameters:

- `key`: The key to locate in the `IDictionary<T1,T2>`.

Returns: `true` if the collection contains tag with that key. `false` otherwise.

To be added.

## ActivityTagsCollection.CopyTo(Object>[], Int32) method

```csharp
public void CopyTo (System.Collections.Generic.KeyValuePair<string,object>[] array, int arrayIndex);
```

Copies the elements of the collection to an array, starting at a particular array index.

Parameters:

- `array`: The array that is the destination of the elements copied from collection.
- `arrayIndex`: The zero-based index in array at which copying begins.

To be added.

## ActivityTagsCollection.GetEnumerator() method

```csharp
public System.Diagnostics.ActivityTagsCollection.Enumerator GetEnumerator ();
```

Returns an enumerator that iterates through the collection.

Returns: An enumerator for the `ActivityTagsCollection`.

To be added.

## ActivityTagsCollection.Remove(Object>) method

```csharp
public bool Remove (System.Collections.Generic.KeyValuePair<string,object?> item);
```

Removes the first occurrence of a specific item from the collection.

Parameters:

- `item`: The tag key value pair to remove.

Returns: `true` if item was successfully removed from the collection; otherwise, `false`. This method also returns `false` if item is not found in the original collection.

To be added.

## ActivityTagsCollection.Remove(String) method

```csharp
public bool Remove (string key);
```

Removes the tag with the specified key from the collection.

Parameters:

- `key`: The tag key.

Returns: `true` if the item existed and removed. `false` otherwise.

To be added.

## ActivityTagsCollection.System.Collections.Generic.IEnumerable<System.Collections.Generic.KeyValuePair<System.String,System.Object>>.GetEnumerator() method

```csharp
System.Collections.Generic.IEnumerator<System.Collections.Generic.KeyValuePair<string,object>> IEnumerable<KeyValuePair<string,object>>.GetEnumerator ();
```

Returns an enumerator that iterates through the collection.

Returns: An enumerator that can be used to iterate through the collection.

To be added.

## ActivityTagsCollection.System.Collections.IEnumerable.GetEnumerator() method

```csharp
System.Collections.IEnumerator IEnumerable.GetEnumerator ();
```

Returns an enumerator that iterates through the collection.

Returns: An `IEnumerator` object that can be used to iterate through the collection.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `ActivityTagsCollection` instance is cast to an `IEnumerable` interface.

## ActivityTagsCollection.TryGetValue(String, Object) method

```csharp
public bool TryGetValue (string key, out object? value);
```

Gets the value associated with the specified key.

Parameters:

- `key`: The tag key.
- `value`: The tag value.

Returns: When this method returns, the value associated with the specified key, if the key is found; otherwise, the default value for the type of the value parameter. This parameter is passed uninitialized.

To be added.
