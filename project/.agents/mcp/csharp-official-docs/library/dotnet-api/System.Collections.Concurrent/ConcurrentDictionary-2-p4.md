---
title: "ConcurrentDictionary<TKey,TValue> class (part 4 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.Concurrent/ConcurrentDictionary`2.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ConcurrentDictionary<TKey,TValue> class (part 4 of 4)

## ConcurrentDictionary<TKey,TValue>.TryRemove(KeyValuePair<TKey,TValue>) method

```csharp
public bool TryRemove (System.Collections.Generic.KeyValuePair<TKey,TValue> item);
```

Removes a key and value from the dictionary.

Parameters:

- `item`: The `KeyValuePair<T1,T2>` representing the key and value to remove.

Returns: `true` if the key and value represented by `item` are successfully found and removed; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: The `KeyValuePair<T1,T2>.Key` property of `item` is `null`.

#### Remarks

Both the specifed key and value must match the entry in the dictionary for it to be removed.

The key is compared using the dictionary's comparer (or the default comparer for `TKey` if no comparer was provided to the dictionary when it was constructed). The value is compared using the default comparer for `TValue`.

## ConcurrentDictionary<TKey,TValue>.TryRemove(TKey, TValue) method

```csharp
public bool TryRemove (TKey key, out TValue value);
```

Attempts to remove and return the value that has the specified key from the `ConcurrentDictionary<T1,T2>`.

Parameters:

- `key`: The key of the element to remove and return.
- `value`: When this method returns, contains the object removed from the `ConcurrentDictionary<T1,T2>`, or the default value of  the `TValue` type if `key` does not exist.

Returns: `true` if the object was removed successfully; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `key` is  `null`.

#### Examples
The following example shows how to call the `ConcurrentDictionary<T1,T2>.TryRemove` method:

_Code sample not included: ~/snippets/csharp/System.Collections.Concurrent/ConcurrentDictionaryTKey,TValue/Overview/concdictionary.cs._

## ConcurrentDictionary<TKey,TValue>.TryUpdate(TKey, TValue, TValue) method

```csharp
public bool TryUpdate (TKey key, TValue newValue, TValue comparisonValue);
```

Updates the value associated with `key` to `newValue` if the existing value with `key` is equal to `comparisonValue`.

Parameters:

- `key`: The key of the value that is compared with `comparisonValue` and possibly replaced.
- `newValue`: The value that replaces the value of the element that has the specified `key` if the comparison results in equality.
- `comparisonValue`: The value that is compared with the value of the element that has the specified `key`.

Returns: `true` if the value with `key` was equal to `comparisonValue` and was replaced with `newValue`; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `key` is `null`.

#### Examples
The following example shows how to call the `ConcurrentDictionary<T1,T2>.TryUpdate` method:

_Code sample not included: ~/snippets/csharp/System.Collections.Concurrent/ConcurrentDictionaryTKey,TValue/Overview/concdictionary.cs._
