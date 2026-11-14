---
title: "NameValueCollection class (part 2 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.Specialized/NameValueCollection.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# NameValueCollection class (part 2 of 2)

## NameValueCollection.Item property

```csharp
public string? this[string? name] { get; set; }
```

Gets or sets the entry with the specified key in the `NameValueCollection`.

Parameters:

- `name`: The `String` key of the entry to locate. The key can be `null`.

Returns: A `String` that contains the comma-separated list of values associated with the specified key, if found; otherwise, `null`.

Exceptions:

- `NotSupportedException`: The collection is read-only and the operation attempts to modify the collection.

#### Remarks
This property provides the ability to access a specific element in the collection by using the following syntax: `myCollection[name]`.

If the specified key <example-value> exists in the collection, setting this property overwrites the existing list of values with the specified value. To append the new value to the existing list of values, use the `NameValueCollection.Add` method.

If the specified key does not exist in the collection, setting this property creates a new entry using the specified key and the specified value.

> **Caution:**
>  This property returns `null` in the following cases: 1) if the specified key is not found; and 2) if the specified key is found and its associated value is `null`. This property does not distinguish between the two cases.

The C# language uses the this keyword to define the indexers instead of implementing the `NameValueCollection.Item` property. Visual Basic <example-value> `NameValueCollection.Item` as a default property, which provides the same indexing functionality.

Retrieving or setting the values associated with the specified key is an O(`n`) operation, where `n` is the number of values.

## NameValueCollection.Add(NameValueCollection) method

```csharp
public void Add (System.Collections.Specialized.NameValueCollection c);
```

Copies the entries in the specified `NameValueCollection` to the current `NameValueCollection`.

Parameters:

- `c`: The `NameValueCollection` to copy to the current `NameValueCollection`.

Exceptions:

- `NotSupportedException`: The collection is read-only.
- `ArgumentNullException`: `c` is `null`.

#### Remarks
If a key in `c` already exists in the target `NameValueCollection` instance, the associated value in `c` is added to the existing comma-separated list of values associated with the same key in the target `NameValueCollection` instance.

If `NameObjectCollectionBase.Count` already equals the capacity, the capacity of the `NameValueCollection` is increased by automatically reallocating the internal array, and the existing elements are copied to the new array before the new element is added.

If `NameObjectCollectionBase.Count` is less than the capacity, this method is an O(1) operation. If the capacity needs to be increased to accommodate the new element, this method becomes an O(`n`) operation, where `n` is `NameObjectCollectionBase.Count`.

## NameValueCollection.Add(String, String) method

```csharp
public virtual void Add (string? name, string? value);
```

Adds an entry with the specified name and value to the `NameValueCollection`.

Parameters:

- `name`: The `String` key of the entry to add. The key can be `null`.
- `value`: The `String` value of the entry to add. The value can be `null`.

Exceptions:

- `NotSupportedException`: The collection is read-only.

#### Remarks
If the specified key <example-value> exists in the target `NameValueCollection` instance, the specified value is added to the existing comma-separated list of values in the form `"value1,value2,value3"`. The values are associated with the same key in the target `NameValueCollection` instance.

If `NameObjectCollectionBase.Count` already equals the capacity, the capacity of the `NameValueCollection` is increased by automatically reallocating the internal array, and the existing elements are copied to the new array before the new element is added.

If `NameObjectCollectionBase.Count` is less than the capacity, this method is an O(1) operation. If the capacity needs to be increased to accommodate the new element, this method becomes an O(`n`) operation, where `n` is `NameObjectCollectionBase.Count`.

## NameValueCollection.Clear() method

```csharp
public virtual void Clear ();
```

Invalidates the cached arrays and removes all entries from the `NameValueCollection`.

Exceptions:

- `NotSupportedException`: The collection is read-only.

#### Remarks
This method is an O(1) operation.

## NameValueCollection.CopyTo(Array, Int32) method

```csharp
public void CopyTo (Array dest, int index);
```

Copies the entire `NameValueCollection` to a compatible one-dimensional `Array`, starting at the specified index of the target array.

Parameters:

- `dest`: The one-dimensional `Array` that is the destination of the elements copied from `NameValueCollection`. The `Array` must have zero-based indexing.
- `index`: The zero-based index in `dest` at which copying begins.

Exceptions:

- `ArgumentNullException`: `dest` is `null`.
- `ArgumentOutOfRangeException`: `index` is less than zero.
- `ArgumentException`: `dest` is multidimensional.

-or-

The number of elements in the source `NameValueCollection` is greater than the available space from `index` to the end of the destination `dest`.
- `InvalidCastException`: The type of the source `NameValueCollection` cannot be cast automatically to the type of the destination `dest`.

#### Remarks
The specified array must be of a compatible type.

This method uses `Array.Copy` to copy the elements.

This method is an O(`n`) operation, where `n` is `NameObjectCollectionBase.Count`.

## NameValueCollection.Get(Int32) method

```csharp
public virtual string? Get (int index);
```

Gets the values at the specified index of the `NameValueCollection` combined into one comma-separated list.

Parameters:

- `index`: The zero-based index of the entry that contains the values to get from the collection.

Returns: A `String` that contains a comma-separated list of the values at the specified index of the `NameValueCollection`, if found; otherwise, `null`.

Exceptions:

- `ArgumentOutOfRangeException`: `index` is outside the valid range of indexes for the collection.

#### Remarks
This method is an O(`n`) operation, where `n` is the number of values at the specified index.

## NameValueCollection.Get(String) method

```csharp
public virtual string? Get (string? name);
```

Gets the values associated with the specified key from the `NameValueCollection` combined into one comma-separated list.

Parameters:

- `name`: The `String` key of the entry that contains the values to get. The key can be `null`.

Returns: A `String` that contains a comma-separated list of the values associated with the specified key from the `NameValueCollection`, if found; otherwise, `null`.

#### Remarks

> **Caution:**
>  This method returns `null` in the following cases: 1) if the specified key is not found; and 2) if the specified key is found and its associated value is `null`. This method does not distinguish between the two cases.

This method is an O(`n`) operation, where `n` is the number of values associated with the specified key.

## NameValueCollection.GetKey(Int32) method

```csharp
public virtual string? GetKey (int index);
```

Gets the key at the specified index of the `NameValueCollection`.

Parameters:

- `index`: The zero-based index of the key to get from the collection.

Returns: A `String` that contains the key at the specified index of the `NameValueCollection`, if found; otherwise, `null`.

Exceptions:

- `ArgumentOutOfRangeException`: `index` is outside the valid range of indexes for the collection.

#### Remarks
This method is an O(1) operation.

## NameValueCollection.GetValues(Int32) method

```csharp
public virtual string[]? GetValues (int index);
```

Gets the values at the specified index of the `NameValueCollection`.

Parameters:

- `index`: The zero-based index of the entry that contains the values to get from the collection.

Returns: A `String` array that contains the values at the specified index of the `NameValueCollection`, if found; otherwise, `null`.

Exceptions:

- `ArgumentOutOfRangeException`: `index` is outside the valid range of indexes for the collection.

#### Remarks
This method is an O(`n`) operation, where `n` is the number of values at the specified index.

## NameValueCollection.GetValues(String) method

```csharp
public virtual string[]? GetValues (string? name);
```

Gets the values associated with the specified key from the `NameValueCollection`.

Parameters:

- `name`: The `String` key of the entry that contains the values to get. The key can be `null`.

Returns: A `String` array that contains the values associated with the specified key from the `NameValueCollection`, if found; otherwise, `null`.

#### Remarks

> **Caution:**
>  This method returns `null` in the following cases: 1) if the specified key is not found; and 2) if the specified key is found and its associated value is `null`. This method does not distinguish between the two cases.

This method is an O(`n`) operation, where `n` is the number of values associated with the specified key.

## NameValueCollection.HasKeys() method

```csharp
public bool HasKeys ();
```

Gets a value indicating whether the `NameValueCollection` contains keys that are not `null`.

Returns: `true` if the `NameValueCollection` contains keys that are not `null`; otherwise, `false`.

#### Remarks
This method is an O(1) operation.

## NameValueCollection.InvalidateCachedArrays() method

```csharp
protected void InvalidateCachedArrays ();
```

Resets the cached arrays of the collection to `null`.

#### Remarks
The arrays returned by `NameValueCollection.AllKeys` are cached for better performance and are automatically refreshed when the collection changes. A derived class can invalidate the cached version by calling `NameValueCollection.InvalidateCachedArrays`, thereby forcing the arrays to be recreated.

This method is an O(1) operation.

## NameValueCollection.Remove(String) method

```csharp
public virtual void Remove (string? name);
```

Removes the entries with the specified key from the `NameObjectCollectionBase` instance.

Parameters:

- `name`: The `String` key of the entry to remove. The key can be `null`.

Exceptions:

- `NotSupportedException`: The collection is read-only.

#### Remarks
If the `NameValueCollection` doesn't contain an element with the specified key, the `NameValueCollection` remains unchanged. No exception is thrown.

If you specify a `null` value to the `name` parameter, an entry with a `null` key is removed, if found.

In collections of contiguous elements, such as lists, the elements that follow the removed element move up to occupy the vacated spot. If the collection is indexed, the indexes of the elements that are moved are also updated. This behavior does not apply to collections where elements are conceptually grouped into buckets, such as a hash table.

This method is an O(`n`) operation, where `n` is `NameObjectCollectionBase.Count`.

## NameValueCollection.Set(String, String) method

```csharp
public virtual void Set (string? name, string? value);
```

Sets the value of an entry in the `NameValueCollection`.

Parameters:

- `name`: The `String` key of the entry to add the new value to. The key can be `null`.
- `value`: The `Object` that represents the new value to add to the specified entry. The value can be `null`.

Exceptions:

- `NotSupportedException`: The collection is read-only.

#### Remarks
If the specified key <example-value> exists in the collection, this method overwrites the existing list of values with the specified value. To append the new value to the existing list of values, use the `NameValueCollection.Add` method.

If the specified key does not exist in the collection, this method creates a new entry using the specified key and the specified value.

This method is an O(1) operation.
