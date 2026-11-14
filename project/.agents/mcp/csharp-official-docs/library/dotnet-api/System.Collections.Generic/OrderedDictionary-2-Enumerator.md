---
title: "OrderedDictionary<TKey,TValue>+Enumerator struct"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.Generic/OrderedDictionary`2+Enumerator.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# OrderedDictionary<TKey,TValue>+Enumerator struct

Namespace: `System.Collections.Generic`

```csharp
public struct OrderedDictionary<TKey,TValue>.Enumerator : System.Collections.Generic.IEnumerator<System.Collections.Generic.KeyValuePair<TKey,TValue>>, System.Collections.IDictionaryEnumerator
```

Enumerates the elements of a `OrderedDictionary<T1,T2>`.

To be added.

## OrderedDictionary<TKey,TValue>+Enumerator.Current property

```csharp
public System.Collections.Generic.KeyValuePair<TKey,TValue> Current { get; }
```

Gets the element in the collection at the current position of the enumerator.

Returns: The element in the collection at the current position of the enumerator.

To be added.

## OrderedDictionary<TKey,TValue>+Enumerator.System.Collections.IDictionaryEnumerator.Entry property

```csharp
System.Collections.DictionaryEntry System.Collections.IDictionaryEnumerator.Entry { get; }
```

Gets both the key and the value of the current dictionary entry.

Returns: A `DictionaryEntry` containing both the key and the value of the current dictionary entry.

This member is an explicit interface member implementation. It can be used only when the `System.Collections.Generic.OrderedDictionary`2.Enumerator` instance is cast to an `System.Collections.IDictionaryEnumerator` interface.

## OrderedDictionary<TKey,TValue>+Enumerator.System.Collections.IDictionaryEnumerator.Key <example-value>

```csharp
object System.Collections.IDictionaryEnumerator.Key { get; }
```

Gets the key of the current dictionary entry.

Returns: The key of the current element of the enumeration.

This member is an explicit interface member implementation. It can be used only when the `System.Collections.Generic.OrderedDictionary`2.Enumerator` instance is cast to an `System.Collections.IDictionaryEnumerator` interface.

## OrderedDictionary<TKey,TValue>+Enumerator.System.Collections.IDictionaryEnumerator.Value property

```csharp
object? System.Collections.IDictionaryEnumerator.Value { get; }
```

Gets the value of the current dictionary entry.

Returns: The value of the current element of the enumeration.

This member is an explicit interface member implementation. It can be used only when the `System.Collections.Generic.OrderedDictionary`2.Enumerator` instance is cast to an `System.Collections.IDictionaryEnumerator` interface.

## OrderedDictionary<TKey,TValue>+Enumerator.System.Collections.IEnumerator.Current property

```csharp
object System.Collections.IEnumerator.Current { get; }
```

Gets the element in the collection at the current position of the enumerator.

Returns: The element in the collection at the current position of the enumerator.

This member is an explicit interface member implementation. It can be used only when the `System.Collections.Generic.OrderedDictionary`2.Enumerator` instance is cast to an `System.Collections.IEnumerator` interface.

## OrderedDictionary<TKey,TValue>+Enumerator.MoveNext() method

```csharp
public bool MoveNext ();
```

Advances the enumerator to the next element of the collection.

Returns: `true` if the enumerator was successfully advanced to the next element; `false` if the enumerator has passed the end of the collection.

To be added.

## OrderedDictionary<TKey,TValue>+Enumerator.System.Collections.IEnumerator.Reset() method

```csharp
void IEnumerator.Reset ();
```

Sets the enumerator to its initial position, which is before the first element in the collection.

This member is an explicit interface member implementation. It can be used only when the `System.Collections.Generic.OrderedDictionary`2.Enumerator` instance is cast to an `System.Collections.IEnumerator` interface.

## OrderedDictionary<TKey,TValue>+Enumerator.System.IDisposable.Dispose() method

```csharp
void IDisposable.Dispose ();
```

Performs application-defined tasks associated with freeing, releasing, or resetting unmanaged resources.

This member is an explicit interface member implementation. It can be used only when the `System.Collections.Generic.OrderedDictionary`2.Enumerator` instance is cast to an `System.IDisposable` interface.
