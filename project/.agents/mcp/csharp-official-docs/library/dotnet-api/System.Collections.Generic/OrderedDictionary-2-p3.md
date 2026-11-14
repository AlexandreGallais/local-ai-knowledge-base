---
title: "OrderedDictionary<TKey,TValue> class (part 3 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.Generic/OrderedDictionary`2.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# OrderedDictionary<TKey,TValue> class (part 3 of 3)

## OrderedDictionary<TKey,TValue>.System.Collections.IList.IndexOf(Object) method

```csharp
int IList.IndexOf (object value);
```

Determines the index of a specific item in the `IList`.

Parameters:

- `value`: The object to locate in the `IList`.

Returns: The index of `value` if found in the list; otherwise, -1.

To be added.

## OrderedDictionary<TKey,TValue>.System.Collections.IList.Insert(Int32, Object) method

```csharp
void IList.Insert (int index, object value);
```

Inserts an item to the `IList` at the specified index.

Parameters:

- `index`: The zero-based index at which `value` should be inserted.
- `value`: The object to insert into the `IList`.

To be added.

## OrderedDictionary<TKey,TValue>.System.Collections.IList.Remove(Object) method

```csharp
void IList.Remove (object value);
```

Removes the first occurrence of a specific object from the `IList`.

Parameters:

- `value`: The object to remove from the `IList`.

To be added.

## OrderedDictionary<TKey,TValue>.TrimExcess() method

```csharp
public void TrimExcess ();
```

Sets the capacity of this dictionary to what it would be if it had been originally initialized with all its entries.

To be added.

## OrderedDictionary<TKey,TValue>.TrimExcess(Int32) method

```csharp
public void TrimExcess (int capacity);
```

Sets the capacity of this dictionary to hold up a specified number of entries without resizing.

Parameters:

- `capacity`: The desired capacity to which to shrink the dictionary.

Exceptions:

- `ArgumentOutOfRangeException`: `capacity` is less than `OrderedDictionary<T1,T2>.Count`.

To be added.

## OrderedDictionary<TKey,TValue>.TryAdd(TKey, TValue) method

```csharp
public bool TryAdd (TKey key, TValue value);
```

Adds the specified key and value to the dictionary if the key doesn't already exist.

Parameters:

- `key`: The key of the element to add.
- `value`: The value of the element to add. The value can be `null` for reference types.

Returns: `true` if the key didn't exist and the key and value were added to the dictionary; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: key is `null`.

To be added.

## OrderedDictionary<TKey,TValue>.TryAdd(TKey, TValue, Int32) method

```csharp
public bool TryAdd (TKey key, TValue value, out int index);
```

Adds the specified key and value to the dictionary if the key doesn't already exist.

Parameters:

- `key`: The key of the element to add.
- `value`: The value of the element to add. The value can be `null` for reference types.
- `index`: The index of the added or existing `key`. This is always a valid index into the dictionary.

Returns: `true` if the key didn't exist and the key and value were added to the dictionary; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `key` is `null`.

To be added.

## OrderedDictionary<TKey,TValue>.TryGetValue(TKey, TValue) method

```csharp
public bool TryGetValue (TKey key, out TValue value);
```

Gets the value associated with the specified key.

Parameters:

- `key`: The key whose value to get.
- `value`: When this method returns, the value associated with the specified key, if the key is found; otherwise, the default value for the type of the `value` parameter. This parameter is passed uninitialized.

Returns: `true` if the object that implements `IDictionary<T1,T2>` contains an element with the specified key; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `key` is `null`.

To be added.

## OrderedDictionary<TKey,TValue>.TryGetValue(TKey, TValue, Int32) method

```csharp
public bool TryGetValue (TKey key, out TValue value, out int index);
```

Gets the value associated with the specified key.

Parameters:

- `key`: The key of the value to get.
- `value`: When this method returns, contains the value associated with the specified key, if the key is found; otherwise, the default value for the type of the value parameter.
- `index`: The index of `key` if found; otherwise, -1.

Returns: `true` if the `OrderedDictionary<T1,T2>` contains an element with the specified key; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `key` is `null`.

To be added.
