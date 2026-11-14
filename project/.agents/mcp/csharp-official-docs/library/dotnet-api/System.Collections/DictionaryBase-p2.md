---
title: "DictionaryBase class (part 2 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections/DictionaryBase.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DictionaryBase class (part 2 of 3)

## DictionaryBase.GetEnumerator() method

```csharp
public System.Collections.IDictionaryEnumerator GetEnumerator ();
```

Returns an `IDictionaryEnumerator` that iterates through the `DictionaryBase` instance.

Returns: An `IDictionaryEnumerator` for the `DictionaryBase` instance.

#### Remarks
The `foreach` statement of the C# language (`for each` in Visual Basic) hides the complexity of the enumerators.  Therefore, using `foreach` is recommended, instead of directly manipulating the enumerator.

Enumerators can be used to read the data in the collection, but they cannot be used to modify the underlying collection.

Initially, the enumerator is positioned before the first element in the collection. `IEnumerator.Reset` also brings the enumerator back to this position.  At this position, `IEnumerator.Current` is undefined. Therefore, you must call `IEnumerator.MoveNext` to advance the enumerator to the first element of the collection before reading the value of `IEnumerator.Current`.

`IEnumerator.Current` returns the same object until either `IEnumerator.MoveNext` or `IEnumerator.Reset` is called. `IEnumerator.MoveNext` sets `IEnumerator.Current` to the next element.

If `IEnumerator.MoveNext` passes the end of the collection, the enumerator is positioned after the last element in the collection and `IEnumerator.MoveNext` returns `false`. When the enumerator is at this position, subsequent calls to `IEnumerator.MoveNext` also return `false`. If the last call to `IEnumerator.MoveNext` returned `false`, `IEnumerator.Current` is undefined. To set `IEnumerator.Current` to the first element of the collection again, you can call `IEnumerator.Reset` followed by `IEnumerator.MoveNext`.

An enumerator remains valid as long as the collection remains unchanged. If changes are made to the collection, such as adding, modifying, or deleting elements, the enumerator is irrecoverably invalidated and its behavior is undefined.

The enumerator does not have exclusive access to the collection; therefore, enumerating through a collection is intrinsically not a thread-safe procedure.  To guarantee thread safety during enumeration, you can lock the collection during the entire enumeration.  To allow the collection to be accessed by multiple threads for reading and writing, you must implement your own synchronization.

This method is an `O(1)` operation.

#### Examples
The following code example implements the `DictionaryBase` class and uses that implementation to create a dictionary of `String` keys and values that have a `String.Length` of 5 characters or less.

_Code sample not included: ~/snippets/csharp/System.Collections/DictionaryBase/Overview/dictionarybase.cs._

## DictionaryBase.OnClear() method

```csharp
protected virtual void OnClear ();
```

Performs additional custom processes before clearing the contents of the `DictionaryBase` instance.

#### Remarks
The default implementation of this method is intended to be overridden by a derived class to perform some action before the collection is cleared.

The On* methods are invoked only on the instance returned by the `Dictionary` property, but not on the instance returned by the `InnerHashtable` property.

The default implementation of this method is an `O(1)` operation.

## DictionaryBase.OnClearComplete() method

```csharp
protected virtual void OnClearComplete ();
```

Performs additional custom processes after clearing the contents of the `DictionaryBase` instance.

#### Remarks
The default implementation of this method is intended to be overridden by a derived class to perform some action after the collection is cleared.

The On* methods are invoked only on the instance returned by the `Dictionary` property, but not on the instance returned by the `InnerHashtable` property.

The default implementation of this method is an `O(1)` operation.

## DictionaryBase.OnGet(Object, Object) method

```csharp
protected virtual object? OnGet (object key, object? currentValue);
```

Gets the element with the specified key and value in the `DictionaryBase` instance.

Parameters:

- `key`: The key of the element to get.
- `currentValue`: The current value of the element associated with `key`.

Returns: An `Object` containing the element with the specified key and value.

#### Remarks
The default implementation of this method returns `currentValue`. It is intended to be overridden by a derived class to perform additional action when the specified element is retrieved.

The On* methods are invoked only on the instance returned by the `Dictionary` property, but not on the instance returned by the `InnerHashtable` property.

The default implementation of this method is an `O(1)` operation.

## DictionaryBase.OnInsert(Object, Object) method

```csharp
protected virtual void OnInsert (object key, object? value);
```

Performs additional custom processes before inserting a new element into the `DictionaryBase` instance.

Parameters:

- `key`: The key of the element to insert.
- `value`: The value of the element to insert.

#### Remarks
The default implementation of this method is intended to be overridden by a derived class to perform some action before the specified element is inserted.

The On* methods are invoked only on the instance returned by the `Dictionary` property, but not on the instance returned by the `InnerHashtable` property.

The default implementation of this method is an `O(1)` operation.

#### Examples
The following code example implements the `DictionaryBase` class and uses that implementation to create a dictionary of `String` keys and values that have a `String.Length` of 5 characters or less.

_Code sample not included: ~/snippets/csharp/System.Collections/DictionaryBase/Overview/dictionarybase.cs._

## DictionaryBase.OnInsertComplete(Object, Object) method

```csharp
protected virtual void OnInsertComplete (object key, object? value);
```

Performs additional custom processes after inserting a new element into the `DictionaryBase` instance.

Parameters:

- `key`: The key of the element to insert.
- `value`: The value of the element to insert.

#### Remarks
The default implementation of this method is intended to be overridden by a derived class to perform some action after the specified element is inserted.

The On* methods are invoked only on the instance returned by the `Dictionary` property, but not on the instance returned by the `InnerHashtable` property.

The default implementation of this method is an `O(1)` operation.

## DictionaryBase.OnRemove(Object, Object) method

```csharp
protected virtual void OnRemove (object key, object? value);
```

Performs additional custom processes before removing an element from the `DictionaryBase` instance.

Parameters:

- `key`: The key of the element to remove.
- `value`: The value of the element to remove.

#### Remarks
The default implementation of this method is intended to be overridden by a derived class to perform some action before the specified element is removed.

The On* methods are invoked only on the instance returned by the `Dictionary` property, but not on the instance returned by the `InnerHashtable` property.

The default implementation of this method is an `O(1)` operation.

#### Examples
The following code example implements the `DictionaryBase` class and uses that implementation to create a dictionary of `String` keys and values that have a `String.Length` of 5 characters or less.

_Code sample not included: ~/snippets/csharp/System.Collections/DictionaryBase/Overview/dictionarybase.cs._

## DictionaryBase.OnRemoveComplete(Object, Object) method

```csharp
protected virtual void OnRemoveComplete (object key, object? value);
```

Performs additional custom processes after removing an element from the `DictionaryBase` instance.

Parameters:

- `key`: The key of the element to remove.
- `value`: The value of the element to remove.

#### Remarks
The default implementation of this method is intended to be overridden by a derived class to perform some action after the specified element is removed.

The On* methods are invoked only on the instance returned by the `Dictionary` property, but not on the instance returned by the `InnerHashtable` property.

The default implementation of this method is an `O(1)` operation.

## DictionaryBase.OnSet(Object, Object, Object) method

```csharp
protected virtual void OnSet (object key, object? oldValue, object? newValue);
```

Performs additional custom processes before setting a value in the `DictionaryBase` instance.

Parameters:

- `key`: The key of the element to locate.
- `oldValue`: The old value of the element associated with `key`.
- `newValue`: The new value of the element associated with `key`.

#### Remarks
The default implementation of this method is intended to be overridden by a derived class to perform some action before the specified element is set.

The On* methods are invoked only on the instance returned by the `Dictionary` property, but not on the instance returned by the `InnerHashtable` property.

The default implementation of this method is an `O(1)` operation.

#### Examples
The following code example implements the `DictionaryBase` class and uses that implementation to create a dictionary of `String` keys and values that have a `String.Length` of 5 characters or less.

_Code sample not included: ~/snippets/csharp/System.Collections/DictionaryBase/Overview/dictionarybase.cs._

## DictionaryBase.OnSetComplete(Object, Object, Object) method

```csharp
protected virtual void OnSetComplete (object key, object? oldValue, object? newValue);
```

Performs additional custom processes after setting a value in the `DictionaryBase` instance.

Parameters:

- `key`: The key of the element to locate.
- `oldValue`: The old value of the element associated with `key`.
- `newValue`: The new value of the element associated with `key`.

#### Remarks
The default implementation of this method is intended to be overridden by a derived class to perform some action after the specified element is set.

The On* methods are invoked only on the instance returned by the `Dictionary` property, but not on the instance returned by the `InnerHashtable` property.

The default implementation of this method is an `O(1)` operation.

## DictionaryBase.OnValidate(Object, Object) method

```csharp
protected virtual void OnValidate (object key, object? value);
```

Performs additional custom processes when validating the element with the specified key and value.

Parameters:

- `key`: The key of the element to validate.
- `value`: The value of the element to validate.

#### Remarks
The default implementation of this method is intended to be overridden by a derived class to perform some action when the specified element is validated.

The On* methods are invoked only on the instance returned by the `Dictionary` property, but not on the instance returned by the `InnerHashtable` property.

The default implementation of this method is an `O(1)` operation.

#### Examples
The following code example implements the `DictionaryBase` class and uses that implementation to create a dictionary of `String` keys and values that have a `String.Length` of 5 characters or less.

_Code sample not included: ~/snippets/csharp/System.Collections/DictionaryBase/Overview/dictionarybase.cs._

## DictionaryBase.System.Collections.IDictionary.Add(Object, Object) method

```csharp
void IDictionary.Add (object key, object value);
```

Adds an element with the specified key and value into the `DictionaryBase`.

Parameters:

- `key`: The key of the element to add.
- `value`: The value of the element to add.

Exceptions:

- `ArgumentNullException`: `key` is `null`.
- `ArgumentException`: An element with the same key <example-value> exists in the `DictionaryBase`.
- `NotSupportedException`: The `DictionaryBase` is read-only.

-or-

The `DictionaryBase` has a fixed size.

#### Remarks
An object that has no correlation between its state and its hash code value should typically not be used as the key. For example, `String` objects are better than `StringBuilder` objects for use as keys.

You can also use the `IDictionary.Item` property to add new elements by setting the value of a key that does not exist in the `DictionaryBase`; for example, `myCollection["myNonexistentKey"] = myValue`. However, if the specified key <example-value> exists in the `DictionaryBase`, setting the `IDictionary.Item` property overwrites the old value. In contrast, the `IDictionary.Add` method does not modify existing elements.

This method is an `O(1)` operation.

#### Examples
The following code example implements the `DictionaryBase` class and uses that implementation to create a dictionary of `String` keys and values that have a `String.Length` of 5 characters or less.

_Code sample not included: ~/snippets/csharp/System.Collections/DictionaryBase/Overview/dictionarybase.cs._

## DictionaryBase.System.Collections.IDictionary.Contains(Object) method

```csharp
bool IDictionary.Contains (object key);
```

Determines whether the `DictionaryBase` contains a specific key.

Parameters:

- `key`: The key to locate in the `DictionaryBase`.

Returns: `true` if the `DictionaryBase` contains an element with the specified key; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `key` is `null`.

#### Remarks
This method is an `O(1)` operation.

This method uses the collection's objects' `Object.Equals` and `IComparable.CompareTo` methods on `key` to determine whether `item` exists.

#### Examples
The following code example implements the `DictionaryBase` class and uses that implementation to create a dictionary of `String` keys and values that have a `String.Length` of 5 characters or less.

_Code sample not included: ~/snippets/csharp/System.Collections/DictionaryBase/Overview/dictionarybase.cs._

## DictionaryBase.System.Collections.IDictionary.Remove(Object) method

```csharp
void IDictionary.Remove (object key);
```

Removes the element with the specified key from the `DictionaryBase`.

Parameters:

- `key`: The key of the element to remove.

Exceptions:

- `ArgumentNullException`: `key` is `null`.
- `NotSupportedException`: The `DictionaryBase` is read-only.

-or-

The `DictionaryBase` has a fixed size.

#### Remarks
If the `DictionaryBase` does not contain an element with the specified key, the `DictionaryBase` remains unchanged. No exception is thrown.

This method is an `O(1)` operation.

#### Examples
The following code example implements the `DictionaryBase` class and uses that implementation to create a dictionary of `String` keys and values that have a `String.Length` of 5 characters or less.

_Code sample not included: ~/snippets/csharp/System.Collections/DictionaryBase/Overview/dictionarybase.cs._
