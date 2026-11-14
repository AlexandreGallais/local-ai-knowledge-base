---
title: "NameObjectCollectionBase class (part 1 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.Specialized/NameObjectCollectionBase.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# NameObjectCollectionBase class

Namespace: `System.Collections.Specialized`

```csharp
public abstract class NameObjectCollectionBase : System.Collections.ICollection, System.Runtime.Serialization.IDeserializationCallback, System.Runtime.Serialization.ISerializable
```

Provides the `abstract` base class for a collection of associated `String` keys and `Object` values that can be accessed either with the key or with the index.

#### Remarks
The underlying structure for this class is a hash table.

Each element is a key/value pair.

The capacity of a `NameObjectCollectionBase` is the number of elements the `NameObjectCollectionBase` can hold. As elements are added to a `NameObjectCollectionBase`, the capacity is automatically increased as required through reallocation.

The hash code provider dispenses hash codes for keys in the `NameObjectCollectionBase` instance. The default hash code provider is the `CaseInsensitiveHashCodeProvider`.

The comparer determines whether two keys are equal. The default comparer is the `CaseInsensitiveComparer`.

This class uses `CultureInfo.InvariantCulture` when comparing strings. For more information about how culture affects comparisons and sorting, see Performing Culture-Insensitive String Operations.

`null` is allowed as a key or as a value.

> **Caution:**
> The `NameObjectCollectionBase.BaseGet` method does not distinguish between `null` that's returned because the specified key is not found and `null` that's returned because the value associated with the key is `null`.

#### Examples
The following code example shows how to implement and use the `NameObjectCollectionBase` class.

_Code sample not included: ~/snippets/csharp/System.Collections.Specialized/NameObjectCollectionBase/Overview/nameobjectcollectionbase.cs._

## NameObjectCollectionBase.NameObjectCollectionBase() constructor

```csharp
protected NameObjectCollectionBase ();
```

Initializes a new instance of the `NameObjectCollectionBase` class that is empty.

#### Remarks
The capacity of a `NameObjectCollectionBase` is the number of elements that the `NameObjectCollectionBase` can hold. As elements are added to a `NameObjectCollectionBase`, the capacity is automatically increased as required by reallocating the internal array.

If the size of the collection can be estimated, specifying the initial capacity eliminates the need to perform a number of resizing operations while adding elements to the `NameObjectCollectionBase`.

The hash code provider dispenses hash codes for keys in the `NameObjectCollectionBase` instance. The default hash code provider is the `CaseInsensitiveHashCodeProvider`.

The comparer determines whether two keys are equal. The default comparer is the `CaseInsensitiveComparer`.

This constructor is an O(1) operation.

## NameObjectCollectionBase.NameObjectCollectionBase(IEqualityComparer) constructor

```csharp
protected NameObjectCollectionBase (System.Collections.IEqualityComparer? equalityComparer);
```

Initializes a new instance of the `NameObjectCollectionBase` class that is empty, has the default initial capacity, and uses the specified `IEqualityComparer` object.

Parameters:

- `equalityComparer`: The `IEqualityComparer` object to use to determine whether two keys are equal and to generate hash codes for the keys in the collection.

#### Remarks
The capacity of a `NameObjectCollectionBase` object is the number of elements that the `NameObjectCollectionBase` can hold. As elements are added to a `NameObjectCollectionBase`, the capacity is automatically increased as required by reallocating the internal array.

If the size of the collection can be estimated, specifying the initial capacity eliminates the need to perform a number of resizing operations while adding elements to the `NameObjectCollectionBase`.

The `IEqualityComparer` object combines the comparer and the hash code provider.  The hash code provider dispenses hash codes for keys in the `NameObjectCollectionBase`.  The comparer determines whether two keys are equal.

This constructor is an O(1) operation.

## NameObjectCollectionBase.NameObjectCollectionBase(Int32) constructor

```csharp
protected NameObjectCollectionBase (int capacity);
```

Initializes a new instance of the `NameObjectCollectionBase` class that is empty, has the specified initial capacity, and uses the default hash code provider and the default comparer.

Parameters:

- `capacity`: The approximate number of entries that the `NameObjectCollectionBase` instance can initially contain.

Exceptions:

- `ArgumentOutOfRangeException`: `capacity` is less than zero.

#### Remarks
The capacity of a `NameObjectCollectionBase` is the number of elements that the `NameObjectCollectionBase` can hold. As elements are added to a `NameObjectCollectionBase`, the capacity is automatically increased as required by reallocating the internal array.

If the size of the collection can be estimated, specifying the initial capacity eliminates the need to perform a number of resizing operations while adding elements to the `NameObjectCollectionBase`.

The hash code provider dispenses hash codes for keys in the `NameObjectCollectionBase` instance. The default hash code provider is the `CaseInsensitiveHashCodeProvider`.

The comparer determines whether two keys are equal. The default comparer is the `CaseInsensitiveComparer`.

This constructor is an O(`n`) operation, where `n` is `capacity`.

## NameObjectCollectionBase.NameObjectCollectionBase(IHashCodeProvider, IComparer) constructor

```csharp
protected NameObjectCollectionBase (System.Collections.IHashCodeProvider? hashProvider, System.Collections.IComparer? comparer);
```

Initializes a new instance of the `NameObjectCollectionBase` class that is empty, has the default initial capacity, and uses the specified hash code provider and the specified comparer.

Parameters:

- `hashProvider`: The `IHashCodeProvider` that will supply the hash codes for all keys in the `NameObjectCollectionBase` instance.
- `comparer`: The `IComparer` to use to determine whether two keys are equal.

To be added.

## NameObjectCollectionBase.NameObjectCollectionBase(Int32, IEqualityComparer) constructor

```csharp
protected NameObjectCollectionBase (int capacity, System.Collections.IEqualityComparer? equalityComparer);
```

Initializes a new instance of the `NameObjectCollectionBase` class that is empty, has the specified initial capacity, and uses the specified `IEqualityComparer` object.

Parameters:

- `capacity`: The approximate number of entries that the `NameObjectCollectionBase` object can initially contain.
- `equalityComparer`: The `IEqualityComparer` object to use to determine whether two keys are equal and to generate hash codes for the keys in the collection.

Exceptions:

- `ArgumentOutOfRangeException`: `capacity` is less than zero.

#### Remarks
The capacity of a `NameObjectCollectionBase` object is the number of elements that the `NameObjectCollectionBase` can hold. As elements are added to a `NameObjectCollectionBase`, the capacity is automatically increased as required by reallocating the internal array.

If the size of the collection can be estimated, specifying the initial capacity eliminates the need to perform a number of resizing operations while adding elements to the `NameObjectCollectionBase`.

The `IEqualityComparer` object combines the comparer and the hash code provider.  The hash code provider dispenses hash codes for keys in the `NameObjectCollectionBase`.  The comparer determines whether two keys are equal.

This constructor is an O(`n`) operation, where `n` is the `capacity` parameter.

## NameObjectCollectionBase.NameObjectCollectionBase(SerializationInfo, StreamingContext) constructor

```csharp
protected NameObjectCollectionBase (System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context);
```

Initializes a new instance of the `NameObjectCollectionBase` class that is serializable and uses the specified `SerializationInfo` and `StreamingContext`.

Parameters:

- `info`: A `SerializationInfo` object that contains the information required to serialize the new `NameObjectCollectionBase` instance.
- `context`: A `StreamingContext` object that contains the source and destination of the serialized stream associated with the new `NameObjectCollectionBase` instance.

Exceptions:

- `PlatformNotSupportedException`: In all cases.

To be added.

## NameObjectCollectionBase.NameObjectCollectionBase(Int32, IHashCodeProvider, IComparer) constructor

```csharp
protected NameObjectCollectionBase (int capacity, System.Collections.IHashCodeProvider? hashProvider, System.Collections.IComparer? comparer);
```

Initializes a new instance of the `NameObjectCollectionBase` class that is empty, has the specified initial capacity and uses the specified hash code provider and the specified comparer.

Parameters:

- `capacity`: The approximate number of entries that the `NameObjectCollectionBase` instance can initially contain.
- `hashProvider`: The `IHashCodeProvider` that will supply the hash codes for all keys in the `NameObjectCollectionBase` instance.
- `comparer`: The `IComparer` to use to determine whether two keys are equal.

Exceptions:

- `ArgumentOutOfRangeException`: `capacity` is less than zero.

To be added.

## NameObjectCollectionBase.Count property

```csharp
public virtual int Count { get; }
```

Gets the number of key/value pairs contained in the `NameObjectCollectionBase` instance.

Returns: The number of key/value pairs contained in the `NameObjectCollectionBase` instance.

#### Remarks
The capacity is the number of elements that the `NameObjectCollectionBase` can store. `NameObjectCollectionBase.Count` is the number of elements that are actually in the `NameObjectCollectionBase`.

The capacity is always greater than or equal to `NameObjectCollectionBase.Count`. If `NameObjectCollectionBase.Count` exceeds the capacity while adding elements, the capacity is automatically increased by reallocating the internal array before copying the old elements and adding the new elements.

Retrieving the value of this property is an O(1) operation.

## NameObjectCollectionBase.IsReadOnly property

```csharp
protected bool IsReadOnly { get; set; }
```

Gets or sets a value indicating whether the `NameObjectCollectionBase` instance is read-only.

Returns: `true` if the `NameObjectCollectionBase` instance is read-only; otherwise, `false`.

#### Remarks
A collection that is read-only does not allow the addition, removal, or modification of elements after the collection is created.

A collection that is read-only is simply a collection with a wrapper that prevents modifying the collection; therefore, if changes are made to the underlying collection, the read-only collection reflects those changes.

Retrieving the value of this property is an O(1) operation.

#### Examples
The following code example creates a read-only collection.

_Code sample not included: ~/snippets/csharp/System.Collections.Specialized/NameObjectCollectionBase/IsReadOnly/nocb_isreadonly.cs._

## NameObjectCollectionBase.Keys property

```csharp
public virtual System.Collections.Specialized.NameObjectCollectionBase.KeysCollection Keys { get; }
```

Gets a `KeysCollection` instance that contains all the keys in the `NameObjectCollectionBase` instance.

Returns: A `KeysCollection` instance that contains all the keys in the `NameObjectCollectionBase` instance.

#### Remarks
Retrieving the value of this property is an O(1) operation.

## NameObjectCollectionBase.System.Collections.ICollection.IsSynchronized property

```csharp
bool System.Collections.ICollection.IsSynchronized { get; }
```

Gets a value indicating whether access to the `NameObjectCollectionBase` object is synchronized (thread safe).

Returns: `true` if access to the `NameObjectCollectionBase` object is synchronized (thread safe); otherwise, `false`. The default is `false`.

#### Remarks
A `NameObjectCollectionBase` object is not synchronized. Derived classes can provide a synchronized version of the `NameObjectCollectionBase` using the `SyncRoot` property.

Enumerating through a collection is intrinsically not a thread-safe procedure. Even when a collection is synchronized, other threads can still modify the collection, which causes the enumerator to throw an exception. To guarantee thread safety during enumeration, you can either lock the collection during the entire enumeration or catch the exceptions resulting from changes made by other threads.

The following code example shows how to lock the collection using the `SyncRoot` property during the entire enumeration.

_Code sample not included: ~/snippets/csharp/System.Collections.Specialized/NameObjectCollectionBase/Overview/remarks.cs._

Retrieving the value of this property is an O(1) operation.

## NameObjectCollectionBase.System.Collections.ICollection.SyncRoot property

```csharp
object System.Collections.ICollection.SyncRoot { get; }
```

Gets an object that can be used to synchronize access to the `NameObjectCollectionBase` object.

Returns: An object that can be used to synchronize access to the `NameObjectCollectionBase` object.

#### Remarks
Derived classes can provide their own synchronized version of the `NameObjectCollectionBase` class using the `SyncRoot` property. The synchronizing code must perform operations on the `SyncRoot` property of the `NameObjectCollectionBase` object, not directly on the `NameObjectCollectionBase` object. This ensures proper operation of collections that are derived from other objects. Specifically, it maintains proper synchronization with other threads that might be simultaneously modifying the `NameObjectCollectionBase` object.

Enumerating through a collection is intrinsically not a thread-safe procedure. Even when a collection is synchronized, other threads can still modify the collection, which causes the enumerator to throw an exception. To guarantee thread safety during enumeration, you can either lock the collection during the entire enumeration or catch the exceptions resulting from changes made by other threads.

The following code example shows how to lock the collection using the `ICollection.SyncRoot` during the entire enumeration.

_Code sample not included: ~/snippets/csharp/System.Collections.Specialized/NameObjectCollectionBase/Overview/remarks.cs._

Retrieving the value of this property is an O(1) operation.
