---
title: "ReadOnlyDictionary<TKey,TValue> class (part 2 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.ObjectModel/ReadOnlyDictionary`2.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ReadOnlyDictionary<TKey,TValue> class (part 2 of 2)

## ReadOnlyDictionary<TKey,TValue>.System.Collections.ICollection.CopyTo(Array, Int32) method

```csharp
void ICollection.CopyTo (Array array, int index);
```

Copies the elements of the dictionary to an array, starting at the specified array index.

Parameters:

- `array`: The one-dimensional array that is the destination of the elements copied from the dictionary. The array must have zero-based indexing.
- `index`: The zero-based index in `array` at which copying begins.

Exceptions:

- `ArgumentNullException`: `array` is `null`.
- `ArgumentOutOfRangeException`: `index` is less than zero.
- `ArgumentException`: `array` is multidimensional.

-or-

The number of elements in the source dictionary is greater than the available space from `index` to the end of the destination `array`.

-or-

The type of the source dictionary cannot be cast automatically to the type of the destination `array`.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `ReadOnlyDictionary<T1,T2>` instance is cast to an `ICollection` interface.

## ReadOnlyDictionary<TKey,TValue>.System.Collections.IDictionary.Add(Object, Object) method

```csharp
void IDictionary.Add (object key, object value);
```

Throws a `NotSupportedException` exception in all cases.

Parameters:

- `key`: The key of the element to add.
- `value`: The value of the element to add.

Exceptions:

- `NotSupportedException`: In all cases.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `ReadOnlyDictionary<T1,T2>` instance is cast to an `IDictionary` interface. The `IDictionary` interface specifies that the `IDictionary.Add` method should throw a `NotSupportedException` exception if the collection that implements the interface is read-only.

## ReadOnlyDictionary<TKey,TValue>.System.Collections.IDictionary.Clear() method

```csharp
void IDictionary.Clear ();
```

Throws a `NotSupportedException` exception in all cases.

Exceptions:

- `NotSupportedException`: In all cases.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `ReadOnlyDictionary<T1,T2>` instance is cast to an `IDictionary` interface. The `IDictionary` interface specifies that the `IDictionary.Clear` method should throw a `NotSupportedException` exception if the collection that implements the interface is read-only.

## ReadOnlyDictionary<TKey,TValue>.System.Collections.IDictionary.Contains(Object) method

```csharp
bool IDictionary.Contains (object key);
```

Determines whether the dictionary contains an element that has the specified key.

Parameters:

- `key`: The key to locate in the dictionary.

Returns: `true` if the dictionary contains an element that has the specified key; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `key` is `null`.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `ReadOnlyDictionary<T1,T2>` instance is cast to an `IDictionary` interface.

## ReadOnlyDictionary<TKey,TValue>.System.Collections.IDictionary.GetEnumerator() method

```csharp
System.Collections.IDictionaryEnumerator IDictionary.GetEnumerator ();
```

Returns an enumerator for the dictionary.

Returns: An enumerator for the dictionary.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `ReadOnlyDictionary<T1,T2>` instance is cast to an `IDictionary` interface.

## ReadOnlyDictionary<TKey,TValue>.System.Collections.IDictionary.Remove(Object) method

```csharp
void IDictionary.Remove (object key);
```

Throws a `NotSupportedException` exception in all cases.

Parameters:

- `key`: The key of the element to remove.

Exceptions:

- `NotSupportedException`: In all cases.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `ReadOnlyDictionary<T1,T2>` instance is cast to an `IDictionary` interface. The `IDictionary` interface specifies that the `IDictionary.Remove` method should throw a `NotSupportedException` exception if the collection that implements the interface is read-only.

## ReadOnlyDictionary<TKey,TValue>.System.Collections.IEnumerable.GetEnumerator() method

```csharp
System.Collections.IEnumerator IEnumerable.GetEnumerator ();
```

Returns an enumerator that iterates through a collection.

Returns: An enumerator that can be used to iterate through the collection.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `ReadOnlyDictionary<T1,T2>` instance is cast to an `IEnumerable` interface.

## ReadOnlyDictionary<TKey,TValue>.TryGetValue(TKey, TValue) method

```csharp
public bool TryGetValue (TKey key, out TValue value);
```

Retrieves the value that is associated with the specified key.

Parameters:

- `key`: The key whose value will be retrieved.
- `value`: When this method returns, the value associated with the specified key, if the key is found; otherwise, the default value for the type of the `value` parameter. This parameter is passed uninitialized.

Returns: `true` if the object that implements `ReadOnlyDictionary<T1,T2>` contains an element with the specified key; otherwise, `false`.

To be added.
