---
title: "ConditionalWeakTable<TKey,TValue> class (part 2 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.CompilerServices/ConditionalWeakTable`2.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ConditionalWeakTable<TKey,TValue> class (part 2 of 2)

## ConditionalWeakTable<TKey,TValue>.GetValue(TKey, ConditionalWeakTable<TKey,TValue>+CreateValueCallback) method

```csharp
public TValue GetValue (TKey key, System.Runtime.CompilerServices.ConditionalWeakTable<TKey,TValue>.CreateValueCallback createValueCallback);
```

Atomically searches for a specified key in the table and returns the corresponding value. If the key does not exist in the table, the method invokes a callback method to create a value that is bound to the specified key.

Parameters:

- `key`: The key to search for. `key` represents the object to which the property is attached.
- `createValueCallback`: A delegate to a method that can create a value for the given `key`. It has a single parameter of type `TKey`, and returns a value of type `TValue`.

Returns: The value attached to `key`, if `key` already exists in the table; otherwise, the new value returned by the `createValueCallback` delegate.

Exceptions:

- `ArgumentNullException`: `key` or `createValueCallback` is `null`.

#### Remarks
If `key` does not exist in the table, `ConditionalWeakTable<T1,T2>.GetValue` invokes the method that is defined by the `createValueCallback` parameter and passes it the key. A new value is bound to the key in the table and returned as a result.

Use this method only when the class that represents the table's value does not define a parameterless constructor. If it does define a parameterless constructor, use the `ConditionalWeakTable<T1,T2>.GetOrCreateValue` method instead. To retrieve the value of an existing key <example-value> adding the key/value pair if the key is not found in the table, call the `ConditionalWeakTable<T1,T2>.TryGetValue` method.

If multiple threads try to create the same key, `createValueCallback` may be invoked multiple times with the same key. Only one of these calls will succeed, and its returned value will be added to the table. Which thread succeeds in creating the value is indeterminate. This rule permits the table to invoke `createValueCallback` outside the internal table lock to prevent deadlocks.

#### Examples
The following example defines a `MainClass` class and a `MainInfo` class, which provides information about the `MainClass` instance. It also defines a static (`Shared` in Visual Basic) `CreateAttachedValue` method that can be assigned to the `CreateValueCallback` delegate and passed to the `ConditionalWeakTable<T1,T2>.GetValue` method. The example calls the `ConditionalWeakTable<T1,T2>.GetValue` method to add a `MainClass` object and its attached `MainInfo` object to a `ConditionalWeakTable<T1,T2>` table. The example also illustrates calls to the `ConditionalWeakTable<T1,T2>.Add` and `ConditionalWeakTable<T1,T2>.GetOrCreateValue` methods to add key/value pairs to the table, and to the `ConditionalWeakTable<T1,T2>.TryGetValue` method to retrieve the value of an existing key.

_Code sample not included: ~/snippets/csharp/System.Runtime.CompilerServices/ConditionalWeakTableTKey,TValue+CreateValueCallback/Overview/getvalue1.cs._

## ConditionalWeakTable<TKey,TValue>.Remove(TKey) method

```csharp
public bool Remove (TKey key);
```

Removes a key and its value from the table.

Parameters:

- `key`: The key to remove.

Returns: `true` if the key is found and removed; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `key` is `null`.

#### Remarks
If the key is garbage-collected during this operation, the method does not raise an exception and the return value is undefined.

## ConditionalWeakTable<TKey,TValue>.Remove(TKey, TValue) method

```csharp
public bool Remove (TKey key, out TValue value);
```

Removes a key and its value from the table, and returns the removed value if it was present.

Parameters:

- `key`: The key to remove.
- `value`: When this method returns, contains the value removed from the table, if it was present.

Returns: `true` if the key is found and removed; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `key` is `null`.

To be added.

## ConditionalWeakTable<TKey,TValue>.System.Collections.Generic.IEnumerable<System.Collections.Generic.KeyValuePair<TKey,TValue>>.GetEnumerator() method

```csharp
System.Collections.Generic.IEnumerator<System.Collections.Generic.KeyValuePair<TKey,TValue>> IEnumerable<KeyValuePair<TKey,TValue>>.GetEnumerator ();
```

Returns an enumerator that can be used to iterate through the `ConditionalWeakTable<T1,T2>` table.

Returns: An enumerator that can be used to iterate through the `ConditionalWeakTable<T1,T2>` table.

#### Remarks

The returned enumerator does not extend the lifetime of any object pairs in the table, other than the current one. It does not return entries that have already been collected or that were added after the enumerator was
retrieved. Additionally, it may not return all entries that were present when the enumerator was retrieved, for example, entries that were collected or removed after the enumerator was retrieved but before they were enumerated.

## ConditionalWeakTable<TKey,TValue>.System.Collections.IEnumerable.GetEnumerator() method

```csharp
System.Collections.IEnumerator IEnumerable.GetEnumerator ();
```

Returns an enumerator that can be used to iterate through the `ConditionalWeakTable<T1,T2>` table.

Returns: An enumerator that can be used to iterate through the `ConditionalWeakTable<T1,T2>` table.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `ConditionalWeakTable<T1,T2>` instance is cast to an `IEnumerable` interface.

The returned enumerator does not extend the lifetime of any object pairs in the table, other than the current one. It does not return entries that have already been collected or that were added after the enumerator was
retrieved. Additionally, it may not return all entries that were present when the enumerator was retrieved, for example, entries that were collected or removed after the enumerator was retrieved but before they were enumerated.

## ConditionalWeakTable<TKey,TValue>.TryAdd(TKey, TValue) method

```csharp
public bool TryAdd (TKey key, TValue value);
```

Adds a key to the table if it doesn't already exist.

Parameters:

- `key`: The key to add.
- `value`: The key's property value.

Returns: `true` if the key/value pair was added; `false` if the table already contained the key.

Exceptions:

- `ArgumentNullException`: `key` is `null`.

To be added.

## ConditionalWeakTable<TKey,TValue>.TryGetValue(TKey, TValue) method

```csharp
public bool TryGetValue (TKey key, out TValue value);
```

Gets the value of the specified key.

Parameters:

- `key`: The key that represents an object with an attached property.
- `value`: When this method returns, contains the attached property value. If `key` is not found, `value` contains the default value.

Returns: `true` if `key` is found; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `key` is `null`.

#### Remarks
If the key is garbage-collected during this operation, the method may return `false` and set `value` to the default value (as if the key were not present).

#### Examples
The following example defines a `MainClass` class and a `MainInfo` class, which provides information about the `MainClass` instance. The example calls the `ConditionalWeakTable<T1,T2>.Add`, `ConditionalWeakTable<T1,T2>.GetOrCreateValue`, and `ConditionalWeakTable<T1,T2>.GetValue` methods to add key/value pairs to a `ConditionalWeakTable<T1,T2>` table. In each case, the example calls the `ConditionalWeakTable<T1,T2>.TryGetValue` method to confirm that the key/value pair has been added to the table.

_Code sample not included: ~/snippets/csharp/System.Runtime.CompilerServices/ConditionalWeakTableTKey,TValue+CreateValueCallback/Overview/getvalue1.cs._
