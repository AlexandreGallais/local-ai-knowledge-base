---
title: "Hashtable class (part 3 of 5)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections/Hashtable.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Hashtable class (part 3 of 5)

## Hashtable.Hashtable(Int32, Single, IEqualityComparer) constructor

```csharp
public Hashtable (int capacity, float loadFactor, System.Collections.IEqualityComparer? equalityComparer);
```

Initializes a new, empty instance of the `Hashtable` class using the specified initial capacity, load factor, and `IEqualityComparer` object.

Parameters:

- `capacity`: The approximate number of elements that the `Hashtable` object can initially contain.
- `loadFactor`: A number in the range from 0.1 through 1.0 that is multiplied by the default value that provides the best performance. The result is the maximum ratio of elements to buckets.
- `equalityComparer`: The `IEqualityComparer` object that defines the hash code provider and the comparer to use with the `Hashtable`.

-or-

`null` to use the default hash code provider and the default comparer. The default hash code provider is each key's implementation of `Object.GetHashCode` and the default comparer is each key's implementation of `Object.Equals`.

Exceptions:

- `ArgumentOutOfRangeException`: `capacity` is less than zero.

-or-

`loadFactor` is less than 0.1.

-or-

`loadFactor` is greater than 1.0.

#### Remarks
Specifying the initial capacity eliminates the need to perform a number of resizing operations while adding elements to the `Hashtable` object. Capacity is automatically increased as required based on the load factor.

The load factor is the maximum ratio of elements to buckets. A smaller load factor means faster lookup at the cost of increased memory consumption. A load factor of 1.0 is the best balance between speed and size.

When the actual load factor reaches the specified load factor, the number of buckets is automatically increased to the smallest prime number that is larger than twice the current number of buckets.

The `IEqualityComparer` object includes both the hash code provider and the comparer. If an `IEqualityComparer` is used in the `Hashtable` constructor, the objects used as keys in the `Hashtable` are not required to override the `Object.GetHashCode` and `Object.Equals` methods.

The hash code provider dispenses hash codes for keys in the `Hashtable`. The default hash code provider is the key's implementation of `Object.GetHashCode`.

The comparer determines whether two keys are equal. Every key in a `Hashtable` must be unique. The default comparer is the key's implementation of `Object.Equals`.

The `IEqualityComparer` enables scenarios such as doing lookups with case-insensitive strings.

This constructor is an `O(n)` operation, where `n` is the `capacity` parameter.

#### Examples
The following code example creates hash tables using different `Hashtable` constructors and demonstrates the differences in the behavior of the hash tables, even if each one contains the same elements.

_Code sample not included: ~/snippets/csharp/System.Collections/Hashtable/.ctor/hashtable_ctorintfloat.cs._

## Hashtable.Hashtable(IDictionary, Single, IHashCodeProvider, IComparer) constructor

```csharp
public Hashtable (System.Collections.IDictionary d, float loadFactor, System.Collections.IHashCodeProvider? hcp, System.Collections.IComparer? comparer);
```

Initializes a new instance of the `Hashtable` class by copying the elements from the specified dictionary to the new `Hashtable` object. The new `Hashtable` object has an initial capacity equal to the number of elements copied, and uses the specified load factor, hash code provider, and comparer.

Parameters:

- `d`: The `IDictionary` object to copy to a new `Hashtable` object.
- `loadFactor`: A number in the range from 0.1 through 1.0 that is multiplied by the default value that provides the best performance. The result is the maximum ratio of elements to buckets.
- `hcp`: The `IHashCodeProvider` object that supplies the hash codes for all keys in the `Hashtable`.

-or-

`null` to use the default hash code provider, which is each key's implementation of `Object.GetHashCode`.
- `comparer`: The `IComparer` object to use to determine whether two keys are equal.

-or-

`null` to use the default comparer, which is each key's implementation of `Object.Equals`.

Exceptions:

- `ArgumentNullException`: `d` is `null`.
- `ArgumentOutOfRangeException`: `loadFactor` is less than 0.1.

-or-

`loadFactor` is greater than 1.0.

To be added.

## Hashtable.Hashtable(Int32, Single, IHashCodeProvider, IComparer) constructor

```csharp
public Hashtable (int capacity, float loadFactor, System.Collections.IHashCodeProvider? hcp, System.Collections.IComparer? comparer);
```

Initializes a new, empty instance of the `Hashtable` class using the specified initial capacity, load factor, hash code provider, and comparer.

Parameters:

- `capacity`: The approximate number of elements that the `Hashtable` object can initially contain.
- `loadFactor`: A number in the range from 0.1 through 1.0 that is multiplied by the default value that provides the best performance. The result is the maximum ratio of elements to buckets.
- `hcp`: The `IHashCodeProvider` object that supplies the hash codes for all keys in the `Hashtable`.

-or-

`null` to use the default hash code provider, which is each key's implementation of `Object.GetHashCode`.
- `comparer`: The `IComparer` object to use to determine whether two keys are equal.

-or-

`null` to use the default comparer, which is each key's implementation of `Object.Equals`.

Exceptions:

- `ArgumentOutOfRangeException`: `capacity` is less than zero.

-or-

`loadFactor` is less than 0.1.

-or-

`loadFactor` is greater than 1.0.

To be added.

## Hashtable.comparer property

```csharp
protected System.Collections.IComparer? comparer { get; set; }
```

Gets or sets the `IComparer` to use for the `Hashtable`.

Returns: The `IComparer` to use for the `Hashtable`.

Exceptions:

- `ArgumentException`: The property is set to a value, but the hash table was created using an `IEqualityComparer`.

To be added.

## Hashtable.Count property

```csharp
public virtual int Count { get; }
```

Gets the number of key/value pairs contained in the `Hashtable`.

Returns: The number of key/value pairs contained in the `Hashtable`.

#### Remarks
Retrieving the value of this property is an `O(1)` operation.

## Hashtable.EqualityComparer property

```csharp
protected System.Collections.IEqualityComparer? EqualityComparer { get; }
```

Gets the `IEqualityComparer` to use for the `Hashtable`.

Returns: The `IEqualityComparer` to use for the `Hashtable`.

Exceptions:

- `ArgumentException`: The property is set to a value, but the hash table was created using an `IHashCodeProvider` and an `IComparer`.

#### Remarks
The `IEqualityComparer` includes both the comparer and the hash code provider. If an `IEqualityComparer` is used in the `Hashtable` constructor, the objects used as keys in the `Hashtable` are not required to override the `Object.GetHashCode` and `Object.Equals` methods.

Retrieving the value of this property is an `O(1)` operation.

## Hashtable.hcp property

```csharp
protected System.Collections.IHashCodeProvider? hcp { get; set; }
```

Gets or sets the object that can dispense hash codes.

Returns: The object that can dispense hash codes.

Exceptions:

- `ArgumentException`: The property is set to a value, but the hash table was created using an `IEqualityComparer`.

To be added.

## Hashtable.IsFixedSize property

```csharp
public virtual bool IsFixedSize { get; }
```

Gets a value indicating whether the `Hashtable` has a fixed size.

Returns: `true` if the `Hashtable` has a fixed size; otherwise, `false`. The default is `false`.

#### Remarks
A collection with a fixed size does not allow the addition or removal of elements after the collection is created, but it allows the modification of existing elements.

A collection with a fixed size is simply a collection with a wrapper that prevents adding and removing elements; therefore, if changes are made to the underlying collection, including the addition or removal of elements, the fixed-size collection reflects those changes.

Retrieving the value of this property is an `O(1)` operation.

## Hashtable.IsReadOnly property

```csharp
public virtual bool IsReadOnly { get; }
```

Gets a value indicating whether the `Hashtable` is read-only.

Returns: `true` if the `Hashtable` is read-only; otherwise, `false`. The default is `false`.

#### Remarks
A collection that is read-only does not allow the addition, removal, or modification of elements after the collection is created.

A collection that is read-only is simply a collection with a wrapper that prevents modifying the collection; therefore, if changes are made to the underlying collection, the read-only collection reflects those changes.

Retrieving the value of this property is an `O(1)` operation.

## Hashtable.IsSynchronized property

```csharp
public virtual bool IsSynchronized { get; }
```

Gets a value indicating whether access to the `Hashtable` is synchronized (thread safe).

Returns: `true` if access to the `Hashtable` is synchronized (thread safe); otherwise, `false`. The default is `false`.

#### Remarks
A `Hashtable` can support one writer and multiple readers concurrently. To support multiple writers, all operations must be done through the wrapper returned by the `Hashtable.Synchronized` method.

Enumerating through a collection is intrinsically not a thread safe procedure. Even when a collection is synchronized, other threads can still modify the collection, which causes the enumerator to throw an exception. To guarantee thread safety during enumeration, you can either lock the collection during the entire enumeration or catch the exceptions resulting from changes made by other threads.

The following code example shows how to lock the collection using the `Hashtable.SyncRoot` during the entire enumeration:

_Code sample not included: ~/snippets/csharp/System.Collections/Hashtable/IsSynchronized/remarks.cs._

#### Examples
The following example shows how to synchronize a `Hashtable`, determine if a `Hashtable` is synchronized, and use a synchronized `Hashtable`.

_Code sample not included: ~/snippets/csharp/System.Collections/Hashtable/IsSynchronized/source.cs._

## Hashtable.Item property

```csharp
public virtual object? this[object key] { get; set; }
```

Gets or sets the value associated with the specified key.

Parameters:

- `key`: The key whose value to get or set.

Returns: The value associated with the specified key. If the specified key is not found, attempting to get it returns `null`, and attempting to set it creates a new element using the specified key.

Exceptions:

- `ArgumentNullException`: `key` is `null`.
- `NotSupportedException`: The property is set and the `Hashtable` is read-only.

-or-

The property is set, `key` does not exist in the collection, and the `Hashtable` has a fixed size.

#### Remarks
This property provides the ability to access a specific element in the collection by using the following syntax: `myCollection[key]`.

You can also use the `Hashtable.Item` property to add new elements by setting the value of a key that does not exist in the `Hashtable`; for example, `myCollection["myNonexistentKey"] = myValue`. However, if the specified key <example-value> exists in the `Hashtable`, setting the `Hashtable.Item` property overwrites the old value. In contrast, the `Hashtable.Add` method does not modify existing elements.

A key <example-value> be `null`, but a value can be. To distinguish between `null` that is returned because the specified key is not found and `null` that is returned because the value of the specified key is `null`, use the `Hashtable.Contains` method or the `Hashtable.ContainsKey` method to determine if the key <example-value> in the list.

Retrieving the value of this property is an `O(1)` operation; setting the property is also an `O(1)` operation.

The C# language uses the `this` keyword to define the indexers instead of implementing the `IList.Item` property. Visual Basic <example-value> `Hashtable.Item` as a default property, which provides the same indexing functionality.

## Hashtable.Keys property

```csharp
public virtual System.Collections.ICollection Keys { get; }
```

Gets an `ICollection` containing the keys in the `Hashtable`.

Returns: An `ICollection` containing the keys in the `Hashtable`.

#### Remarks
The order of the keys in the `ICollection` is unspecified, but it is the same order as the associated values in the `ICollection` returned by the `Hashtable.Values` method.

The returned `ICollection` is not a static copy; instead, the `ICollection` refers back to the keys in the original `Hashtable`. Therefore, changes to the `Hashtable` continue to be reflected in the `ICollection`.

Retrieving the value of this property is an `O(1)` operation.

## Hashtable.SyncRoot property

```csharp
public virtual object SyncRoot { get; }
```

Gets an object that can be used to synchronize access to the `Hashtable`.

Returns: An object that can be used to synchronize access to the `Hashtable`.

#### Remarks
To create a synchronized version of the `Hashtable`, use the `Hashtable.Synchronized` method. However, derived classes can provide their own synchronized version of the `Hashtable` using the `SyncRoot` property. The synchronizing code must perform operations on the `Hashtable.SyncRoot` of the `Hashtable`, not directly on the `Hashtable`. This ensures proper operation of collections that are derived from other objects. Specifically, it maintains proper synchronization with other threads that might be simultaneously modifying the `Hashtable` object.

Enumerating through a collection is intrinsically not a thread safe procedure. Even when a collection is synchronized, other threads can still modify the collection, which causes the enumerator to throw an exception. To guarantee thread safety during enumeration, you can either lock the collection during the entire enumeration or catch the exceptions resulting from changes made by other threads.

The following code example shows how to lock the collection using the `Hashtable.SyncRoot` during the entire enumeration:

_Code sample not included: ~/snippets/csharp/System.Collections/Hashtable/IsSynchronized/remarks.cs._

## Hashtable.Values property

```csharp
public virtual System.Collections.ICollection Values { get; }
```

Gets an `ICollection` containing the values in the `Hashtable`.

Returns: An `ICollection` containing the values in the `Hashtable`.

#### Remarks
The order of the values in the `ICollection` is unspecified, but it is the same order as the associated keys in the `ICollection` returned by the `Hashtable.Keys` method.

The returned `ICollection` is not a static copy; instead, the `ICollection` refers back to the values in the original `Hashtable`. Therefore, changes to the `Hashtable` continue to be reflected in the `ICollection`.

Retrieving the value of this property is an `O(1)` operation.
