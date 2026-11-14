---
title: "StringDictionary class (part 1 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.Specialized/StringDictionary.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# StringDictionary class

Namespace: `System.Collections.Specialized`

```csharp
public class StringDictionary : System.Collections.IEnumerable
```

Implements a hash table with the key and the value strongly typed to be strings rather than objects.

#### Remarks
A key <example-value> be `null`, but a value can.

The key is handled in a case-insensitive manner; it is translated to lowercase before it is used with the string dictionary.

This class uses `CultureInfo.InvariantCulture` when comparing strings. For more information about how culture affects comparisons and sorting, see Performing Culture-Insensitive String Operations.

#### Examples
The following code example demonstrates several of the properties and methods of `StringDictionary`.

_Code sample not included: ~/snippets/csharp/System.Collections.Specialized/StringDictionary/Overview/stringdictionary.cs._

## StringDictionary.StringDictionary() constructor

```csharp
public StringDictionary ();
```

Initializes a new instance of the `StringDictionary` class.

#### Remarks
This constructor is an O(1) operation.

#### Examples
The following code example demonstrates several of the properties and methods of `StringDictionary`.

_Code sample not included: ~/snippets/csharp/System.Collections.Specialized/StringDictionary/Overview/stringdictionary.cs._

## StringDictionary.Count property

```csharp
public virtual int Count { get; }
```

Gets the number of key/value pairs in the `StringDictionary`.

Returns: The number of key/value pairs in the `StringDictionary`.

Retrieving the value of this property is an O(1) operation.

#### Examples
The following code example enumerates the elements of a `StringDictionary`.

_Code sample not included: ~/snippets/csharp/System.Collections.Specialized/StringDictionary/Count/stringdictionary_enumeration.cs._

## StringDictionary.IsSynchronized property

```csharp
public virtual bool IsSynchronized { get; }
```

Gets a value indicating whether access to the `StringDictionary` is synchronized (thread safe).

Returns: `true` if access to the `StringDictionary` is synchronized (thread safe); otherwise, `false`.

#### Remarks
A `StringDictionary` instance is not synchronized. Derived classes can provide a synchronized version of the `StringDictionary` using the `SyncRoot` property.

Enumerating through a collection is intrinsically not a thread-safe procedure. Even when a collection is synchronized, other threads can still modify the collection, which causes the enumerator to throw an exception. To guarantee thread safety during enumeration, you can either lock the collection during the entire enumeration or catch the exceptions resulting from changes made by other threads.

#### Examples
The following code example shows how to lock the collection using the `StringDictionary.SyncRoot` during the entire enumeration.

_Code sample not included: ~/snippets/csharp/System.Collections.Specialized/StringDictionary/Overview/source2.cs._

Retrieving the value of this property is an O(1) operation.

## StringDictionary.Item property

```csharp
public virtual string? this[string key] { get; set; }
```

Gets or sets the value associated with the specified key.

Parameters:

- `key`: The key whose value to get or set.

Returns: The value associated with the specified key. If the specified key is not found, Get returns `null`, and Set creates a new entry with the specified key.

Exceptions:

- `ArgumentNullException`: `key` is `null`.

#### Remarks
The key is handled in a case-insensitive manner; it is translated to lowercase before it is used.

A key <example-value> be `null`, but a value can. To distinguish between `null` that is returned because the specified key is not found and `null` that is returned because the value of the specified key is `null`, use the `StringDictionary.ContainsKey` method to determine if the key <example-value> in the list.

The C# language uses the this keyword to define the indexers instead of implementing the `StringDictionary.Item` property. Visual Basic <example-value> `StringDictionary.Item` as a default property, which provides the same indexing functionality.

Retrieving the value of this property is an O(1) operation; setting the property is also an O(1) operation.

#### Examples
The following code example enumerates the elements of a `StringDictionary`.

_Code sample not included: ~/snippets/csharp/System.Collections.Specialized/StringDictionary/Count/stringdictionary_enumeration.cs._

## StringDictionary.Keys property

```csharp
public virtual System.Collections.ICollection Keys { get; }
```

Gets a collection of keys in the `StringDictionary`.

Returns: An `ICollection` that provides the keys in the `StringDictionary`.

#### Remarks
The order of the keys in the `ICollection` is unspecified, but it is the same order as the associated values in the `ICollection` returned by the `StringDictionary.Values` method.

The returned `ICollection` is not a static copy; instead, the `ICollection` refers back to the keys in the original `StringDictionary`. Therefore, changes to the `StringDictionary` continue to be reflected in the `ICollection`.

Retrieving the value of this property is an O(1) operation.

#### Examples
The following code example enumerates the elements of a `StringDictionary`.

_Code sample not included: ~/snippets/csharp/System.Collections.Specialized/StringDictionary/Count/stringdictionary_enumeration.cs._

## StringDictionary.SyncRoot property

```csharp
public virtual object SyncRoot { get; }
```

Gets an object that can be used to synchronize access to the `StringDictionary`.

Returns: An `Object` that can be used to synchronize access to the `StringDictionary`.

#### Remarks
Derived classes can provide their own synchronized version of the `StringDictionary` using the `SyncRoot` property. The synchronizing code must perform operations on the `StringDictionary.SyncRoot` of the `StringDictionary`, not directly on the `StringDictionary`. This ensures proper operation of collections that are derived from other objects. Specifically, it maintains proper synchronization with other threads that might be simultaneously modifying the `StringDictionary` object.

Enumerating through a collection is intrinsically not a thread-safe procedure. Even when a collection is synchronized, other threads can still modify the collection, which causes the enumerator to throw an exception. To guarantee thread safety during enumeration, you can either lock the collection during the entire enumeration or catch the exceptions resulting from changes made by other threads.

#### Examples
The following code example shows how to lock the collection using the `StringDictionary.SyncRoot` during the entire enumeration.

_Code sample not included: ~/snippets/csharp/System.Collections.Specialized/StringDictionary/Overview/source2.cs._

Retrieving the value of this property is an O(1) operation.

## StringDictionary.Values property

```csharp
public virtual System.Collections.ICollection Values { get; }
```

Gets a collection of values in the `StringDictionary`.

Returns: An `ICollection` that provides the values in the `StringDictionary`.

#### Remarks
The order of the values in the `ICollection` is unspecified, but it is the same order as the associated keys in the `ICollection` returned by the `StringDictionary.Keys` method.

The returned `ICollection` is not a static copy; instead, the `ICollection` refers back to the values in the original `StringDictionary`. Therefore, changes to the `StringDictionary` continue to be reflected in the `ICollection`.

Retrieving the value of this property is an O(1) operation.

#### Examples
The following code example enumerates the elements of a `StringDictionary`.

_Code sample not included: ~/snippets/csharp/System.Collections.Specialized/StringDictionary/Count/values.cs._

## StringDictionary.Add(String, String) method

```csharp
public virtual void Add (string key, string? value);
```

Adds an entry with the specified key and value into the `StringDictionary`.

Parameters:

- `key`: The key of the entry to add.
- `value`: The value of the entry to add. The value can be `null`.

Exceptions:

- `ArgumentNullException`: `key` is `null`.
- `ArgumentException`: An entry with the same key <example-value> exists in the `StringDictionary`.
- `NotSupportedException`: The `StringDictionary` is read-only.

#### Remarks
The key is handled in a case-insensitive manner; it is translated to lowercase before it is added to the string dictionary.

This method is an O(1) operation.

#### Examples
The following code example demonstrates how to add and remove elements from a `StringDictionary`.

_Code sample not included: ~/snippets/csharp/System.Collections.Specialized/StringDictionary/Add/stringdictionary_addremove.cs._

## StringDictionary.Clear() method

```csharp
public virtual void Clear ();
```

Removes all entries from the `StringDictionary`.

Exceptions:

- `NotSupportedException`: The `StringDictionary` is read-only.

#### Remarks
This method is an O(`n`) operation, where `n` is `StringDictionary.Count`.

#### Examples
The following code example demonstrates how to add and remove elements from a `StringDictionary`.

_Code sample not included: ~/snippets/csharp/System.Collections.Specialized/StringDictionary/Add/stringdictionary_addremove.cs._

## StringDictionary.ContainsKey(String) method

```csharp
public virtual bool ContainsKey (string key);
```

Determines if the `StringDictionary` contains a specific key.

Parameters:

- `key`: The key to locate in the `StringDictionary`.

Returns: `true` if the `StringDictionary` contains an entry with the specified key; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: The key is `null`.

#### Remarks
The key is handled in a case-insensitive manner; it is translated to lowercase before it is used.

This method is an O(1) operation.

This method uses the collection's objects' `Object.Equals` and `IComparable.CompareTo` methods on `item` to determine whether `item` exists.

#### Examples
The following code example searches for an element in a `StringDictionary`.

_Code sample not included: ~/snippets/csharp/System.Collections.Specialized/StringDictionary/ContainsKey/stringdictionary_contains.cs._

## StringDictionary.ContainsValue(String) method

```csharp
public virtual bool ContainsValue (string? value);
```

Determines if the `StringDictionary` contains a specific value.

Parameters:

- `value`: The value to locate in the `StringDictionary`. The value can be `null`.

Returns: `true` if the `StringDictionary` contains an element with the specified value; otherwise, `false`.

#### Remarks
The values of the elements of the StringDictionary are compared to the specified value using the `Object.Equals` method.

This method performs a linear search; therefore, the average execution time is proportional to `StringDictionary.Count`. That is, this method is an O(`n`) operation, where `n` is `StringDictionary.Count`.

This method uses the collection's objects' `Object.Equals` and `IComparable.CompareTo` methods on `item` to determine whether `item` exists.

#### Examples
The following code example searches for an element in a `StringDictionary`.

_Code sample not included: ~/snippets/csharp/System.Collections.Specialized/StringDictionary/ContainsKey/stringdictionary_contains.cs._

## StringDictionary.CopyTo(Array, Int32) method

```csharp
public virtual void CopyTo (Array array, int index);
```

Copies the string dictionary values to a one-dimensional `Array` instance at the specified index.

Parameters:

- `array`: The one-dimensional `Array` that is the destination of the values copied from the `StringDictionary`.
- `index`: The index in the array where copying begins.

Exceptions:

- `ArgumentException`: `array` is multidimensional.

-or-

The number of elements in the `StringDictionary` is greater than the available space from `index` to the end of `array`.
- `ArgumentNullException`: `array` is `null`.
- `ArgumentOutOfRangeException`: `index` is less than the lower bound of `array`.

#### Remarks
`StringDictionary.CopyTo` copies objects that can be typecast to `DictionaryEntry`. `DictionaryEntry` contains both the key and the value.

The elements copied to the `Array` are sorted in the same order that the enumerator iterates through the `StringDictionary`.

This method is an O(`n`) operation, where `n` is `StringDictionary.Count`.

#### Examples
The following code example shows how a StringDictionary can be copied to an array.

_Code sample not included: ~/snippets/csharp/System.Collections.Specialized/StringDictionary/CopyTo/stringdictionary_copyto.cs._
