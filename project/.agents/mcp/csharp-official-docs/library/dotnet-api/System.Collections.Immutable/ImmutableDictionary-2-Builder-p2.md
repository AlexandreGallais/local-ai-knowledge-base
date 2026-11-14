---
title: "ImmutableDictionary<TKey,TValue>+Builder class (part 2 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.Immutable/ImmutableDictionary`2+Builder.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ImmutableDictionary<TKey,TValue>+Builder class (part 2 of 2)

## ImmutableDictionary<TKey,TValue>+Builder.System.Collections.IDictionary.Add(Object, Object) method

```csharp
void IDictionary.Add (object key, object value);
```

Adds an element with the provided key and value to the dictionary object.

Parameters:

- `key`: The key of the element to add.
- `value`: The value of the element to add.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `Builder` instance is cast to an `IDictionary` interface.

## ImmutableDictionary<TKey,TValue>+Builder.System.Collections.IDictionary.Contains(Object) method

```csharp
bool IDictionary.Contains (object key);
```

Determines whether the dictionary object contains an element with the specified key.

Parameters:

- `key`: The key to locate.

Returns: `true` if the dictionary contains an element with the key; otherwise, `false`.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `Builder` instance is cast to an `IDictionary` interface.

## ImmutableDictionary<TKey,TValue>+Builder.System.Collections.IDictionary.GetEnumerator() method

```csharp
System.Collections.IDictionaryEnumerator IDictionary.GetEnumerator ();
```

Returns an `IDictionaryEnumerator` object for the dictionary.

Returns: An `IDictionaryEnumerator` object for the dictionary.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `Builder` instance is cast to an `IDictionary` interface.

## ImmutableDictionary<TKey,TValue>+Builder.System.Collections.IDictionary.Remove(Object) method

```csharp
void IDictionary.Remove (object key);
```

Removes the element with the specified key from the dictionary.

Parameters:

- `key`: The key of the element to remove.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `Builder` instance is cast to an `IDictionary` interface.

## ImmutableDictionary<TKey,TValue>+Builder.System.Collections.IEnumerable.GetEnumerator() method

```csharp
System.Collections.IEnumerator IEnumerable.GetEnumerator ();
```

Returns an enumerator that iterates through a collection.

Returns: An enumerator object that can be used to iterate through the collection.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `Builder` instance is cast to an `IEnumerable` interface.

## ImmutableDictionary<TKey,TValue>+Builder.ToImmutable() method

```csharp
public System.Collections.Immutable.ImmutableDictionary<TKey,TValue> ToImmutable ();
```

Creates an immutable dictionary based on the contents of this instance.

Returns: An immutable dictionary.

#### Remarks
This method is an O(n) operation, and approaches O(1) time as the number of actual mutations to the set since the last call to this method approaches 0.

## ImmutableDictionary<TKey,TValue>+Builder.TryGetKey(TKey, TKey) method

```csharp
public bool TryGetKey (TKey <example-value>, out TKey <example-value>);
```

Determines whether this dictionary contains a specified key.

Parameters:

- `equalKey`: The key to search for.
- `actualKey`: The matching key <example-value> in the dictionary if found, or `equalkey` if no match is found.

Returns: `true` if a match for `equalKey` is found; otherwise, `false`.

#### Remarks
Following are some scenarios where `Builder.TryGetKey` may be useful:

- You want to reuse a previously stored object reference instead of creating a new reference.

- You want to look up the canonical value of an object

- You want to retrieve more complete data about an object

## ImmutableDictionary<TKey,TValue>+Builder.TryGetValue(TKey, TValue) method

```csharp
public bool TryGetValue (TKey key, out TValue value);
```

Returns the value associated with the specified key.

Parameters:

- `key`: The key whose value will be retrieved.
- `value`: When this method returns, contains the value associated with the specified key, if the key is found; otherwise, returns the default value for the type of the `value` parameter. This parameter is passed uninitialized.

Returns: `true` if the object that implements the immutable dictionary contains an element with the specified key; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `key` is null.

To be added.
