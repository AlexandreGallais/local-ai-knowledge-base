---
title: "NameValueCollection class (part 1 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.Specialized/NameValueCollection.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# NameValueCollection class

Namespace: `System.Collections.Specialized`

```csharp
public class NameValueCollection : System.Collections.Specialized.NameObjectCollectionBase
```

Represents a collection of associated `String` keys and `String` values that can be accessed either with the key or with the index.

#### Remarks

This collection is based on the `NameObjectCollectionBase` class. Each element of the collection is a key/value pair. However, unlike the `NameObjectCollectionBase`, this class can store multiple string values under a single key.

This class can be used for headers, query strings and form data.

Collections of this type do not preserve the ordering of elements, and no particular ordering is guaranteed when enumerating the collection.

The capacity of a `NameValueCollection` is the number of elements the `NameValueCollection` can hold. As elements are added, its capacity is automatically increased as required through reallocation.

The hash code provider dispenses hash codes for keys in the `NameValueCollection`. The default hash code provider is the `CaseInsensitiveHashCodeProvider`.

The comparer determines whether two keys are equal. The default comparer is a `CaseInsensitiveComparer` that uses the conventions of the invariant culture; that is, key <example-value> are case-insensitive by default. To perform case-sensitive key <example-value>, call the `%23ctor` constructor, and provide a value of `CurrentCulture`, `InvariantCulture`, or `Ordinal` as the `equalityComparer` argument. For more information about how culture affects comparisons and sorting, see Performing Culture-Insensitive String Operations.

`null` is allowed as a key or as a value.

> **Caution:**
> The `NameValueCollection.Get` method does not distinguish between `null` that's returned because the specified key is not found and `null` that's returned because the value associated with the key is `null`.

#### Examples
_Code sample not included: ~/snippets/csharp/System.Collections.Specialized/NameValueCollection/Overview/nvc.cs._

## NameValueCollection.NameValueCollection() constructor

```csharp
public NameValueCollection ();
```

Initializes a new instance of the `NameValueCollection` class that is empty, has the default initial capacity and uses the default case-insensitive hash code provider and the default case-insensitive comparer.

#### Remarks
The capacity of a `NameValueCollection` is the number of elements that the `NameValueCollection` can hold. As elements are added to a `NameValueCollection`, the capacity is automatically increased as required by reallocating the internal array.

If the size of the collection can be estimated, specifying the initial capacity eliminates the need to perform a number of resizing operations while adding elements to the `NameValueCollection`.

The hash code provider dispenses hash codes for keys in the `NameValueCollection`. The default hash code provider is the `CaseInsensitiveHashCodeProvider`.

The comparer determines whether two keys are equal. The default comparer is the `CaseInsensitiveComparer`.

This constructor is an O(1) operation.

## NameValueCollection.NameValueCollection(IEqualityComparer) constructor

```csharp
public NameValueCollection (System.Collections.IEqualityComparer? equalityComparer);
```

Initializes a new instance of the `NameValueCollection` class that is empty, has the default initial capacity, and uses the specified `IEqualityComparer` object.

Parameters:

- `equalityComparer`: The `IEqualityComparer` object to use to determine whether two keys are equal and to generate hash codes for the keys in the collection.

#### Remarks
The capacity of a `NameValueCollection` object is the number of elements that the `NameValueCollection` can hold. As elements are added to a `NameValueCollection`, the capacity is automatically increased as required by reallocating the internal array.

If the size of the collection can be estimated, specifying the initial capacity eliminates the need to perform a number of resizing operations while adding elements to the `NameValueCollection`.

The `IEqualityComparer` object combines the comparer and the hash code provider.  The hash code provider dispenses hash codes for keys in the `NameValueCollection`.  The comparer determines whether two keys are equal.

This constructor is an O(1) operation.

## NameValueCollection.NameValueCollection(NameValueCollection) constructor

```csharp
public NameValueCollection (System.Collections.Specialized.NameValueCollection col);
```

Copies the entries from the specified `NameValueCollection` to a new `NameValueCollection` with the same initial capacity as the number of entries copied and using the same hash code provider and the same comparer as the source collection.

Parameters:

- `col`: The `NameValueCollection` to copy to the new `NameValueCollection` instance.

Exceptions:

- `ArgumentNullException`: `col` is `null`.

#### Remarks
The capacity of a `NameValueCollection` is the number of elements that the `NameValueCollection` can hold. As elements are added to a `NameValueCollection`, the capacity is automatically increased as required by reallocating the internal array.

If the size of the collection can be estimated, specifying the initial capacity eliminates the need to perform a number of resizing operations while adding elements to the `NameValueCollection`.

The hash code provider dispenses hash codes for keys in the `NameValueCollection`. The default hash code provider is the `CaseInsensitiveHashCodeProvider`.

The comparer determines whether two keys are equal. The default comparer is the `CaseInsensitiveComparer`.

The elements of the new `NameValueCollection` are sorted in the same order as the source `NameValueCollection`.

This constructor is an O(`n`) operation, where `n` is the number of elements in `col`.

## NameValueCollection.NameValueCollection(Int32) constructor

```csharp
public NameValueCollection (int capacity);
```

Initializes a new instance of the `NameValueCollection` class that is empty, has the specified initial capacity and uses the default case-insensitive hash code provider and the default case-insensitive comparer.

Parameters:

- `capacity`: The initial number of entries that the `NameValueCollection` can contain.

Exceptions:

- `ArgumentOutOfRangeException`: `capacity` is less than zero.

#### Remarks
The capacity of a `NameValueCollection` is the number of elements that the `NameValueCollection` can hold. As elements are added to a `NameValueCollection`, the capacity is automatically increased as required by reallocating the internal array.

If the size of the collection can be estimated, specifying the initial capacity eliminates the need to perform a number of resizing operations while adding elements to the `NameValueCollection`.

The hash code provider dispenses hash codes for keys in the `NameValueCollection`. The default hash code provider is the `CaseInsensitiveHashCodeProvider`.

The comparer determines whether two keys are equal. The default comparer is the `CaseInsensitiveComparer`.

This constructor is an O(`n`) operation, where `n` is `capacity`.

## NameValueCollection.NameValueCollection(IHashCodeProvider, IComparer) constructor

```csharp
public NameValueCollection (System.Collections.IHashCodeProvider? hashProvider, System.Collections.IComparer? comparer);
```

Initializes a new instance of the `NameValueCollection` class that is empty, has the default initial capacity and uses the specified hash code provider and the specified comparer.

Parameters:

- `hashProvider`: The `IHashCodeProvider` that will supply the hash codes for all keys in the `NameValueCollection`.
- `comparer`: The `IComparer` to use to determine whether two keys are equal.

To be added.

## NameValueCollection.NameValueCollection(Int32, IEqualityComparer) constructor

```csharp
public NameValueCollection (int capacity, System.Collections.IEqualityComparer? equalityComparer);
```

Initializes a new instance of the `NameValueCollection` class that is empty, has the specified initial capacity, and uses the specified `IEqualityComparer` object.

Parameters:

- `capacity`: The initial number of entries that the `NameValueCollection` object can contain.
- `equalityComparer`: The `IEqualityComparer` object to use to determine whether two keys are equal and to generate hash codes for the keys in the collection.

Exceptions:

- `ArgumentOutOfRangeException`: `capacity` is less than zero.

#### Remarks
The capacity of a `NameValueCollection` object is the number of elements that the `NameValueCollection` can hold. As elements are added to a `NameValueCollection`, the capacity is automatically increased as required by reallocating the internal array.

If the size of the collection can be estimated, specifying the initial capacity eliminates the need to perform a number of resizing operations while adding elements to the `NameValueCollection`.

The `IEqualityComparer` object combines the comparer and the hash code provider.  The hash code provider dispenses hash codes for keys in the `NameValueCollection`.  The comparer determines whether two keys are equal.

This constructor is an O(`n`) operation, where `n` is the `capacity` parameter.

## NameValueCollection.NameValueCollection(Int32, NameValueCollection) constructor

```csharp
public NameValueCollection (int capacity, System.Collections.Specialized.NameValueCollection col);
```

Copies the entries from the specified `NameValueCollection` to a new `NameValueCollection` with the specified initial capacity or the same initial capacity as the number of entries copied, whichever is greater, and using the default case-insensitive hash code provider and the default case-insensitive comparer.

Parameters:

- `capacity`: The initial number of entries that the `NameValueCollection` can contain.
- `col`: The `NameValueCollection` to copy to the new `NameValueCollection` instance.

Exceptions:

- `ArgumentOutOfRangeException`: `capacity` is less than zero.
- `ArgumentNullException`: `col` is `null`.

#### Remarks
The capacity of a `NameValueCollection` is the number of elements that the `NameValueCollection` can hold. As elements are added to a `NameValueCollection`, the capacity is automatically increased as required by reallocating the internal array.

If the size of the collection can be estimated, specifying the initial capacity eliminates the need to perform a number of resizing operations while adding elements to the `NameValueCollection`.

The hash code provider dispenses hash codes for keys in the `NameValueCollection`. The default hash code provider is the `CaseInsensitiveHashCodeProvider`.

The comparer determines whether two keys are equal. The default comparer is the `CaseInsensitiveComparer`.

This constructor is an O(`n`) operation, where `n` is `capacity`.  If the number of elements in `col` is greater than `capacity`, this constructor becomes an O(`n` + `m`) operation, where `n` is `capacity` and `m` is the number of elements in `col`.

## NameValueCollection.NameValueCollection(SerializationInfo, StreamingContext) constructor

```csharp
protected NameValueCollection (System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context);
```

Initializes a new instance of the `NameValueCollection` class that is serializable and uses the specified `SerializationInfo` and `StreamingContext`.

Parameters:

- `info`: A `SerializationInfo` object that contains the information required to serialize the new `NameValueCollection` instance.
- `context`: A `StreamingContext` object that contains the source and destination of the serialized stream associated with the new `NameValueCollection` instance.

To be added.

## NameValueCollection.NameValueCollection(Int32, IHashCodeProvider, IComparer) constructor

```csharp
public NameValueCollection (int capacity, System.Collections.IHashCodeProvider? hashProvider, System.Collections.IComparer? comparer);
```

Initializes a new instance of the `NameValueCollection` class that is empty, has the specified initial capacity and uses the specified hash code provider and the specified comparer.

Parameters:

- `capacity`: The initial number of entries that the `NameValueCollection` can contain.
- `hashProvider`: The `IHashCodeProvider` that will supply the hash codes for all keys in the `NameValueCollection`.
- `comparer`: The `IComparer` to use to determine whether two keys are equal.

Exceptions:

- `ArgumentOutOfRangeException`: `capacity` is less than zero.

To be added.

## NameValueCollection.AllKeys property

```csharp
public virtual string?[] AllKeys { get; }
```

Gets all the keys in the `NameValueCollection`.

Returns: A `String` array that contains all the keys of the `NameValueCollection`.

#### Remarks
If the collection is empty, this method returns an empty `String` array, not `null`.

The arrays returned by `NameValueCollection.AllKeys` are cached for better performance and are automatically refreshed when the collection changes. A derived class can invalidate the cached version by calling `NameValueCollection.InvalidateCachedArrays`, thereby forcing the arrays to be recreated.

This method is an O(`n`) operation, where `n` is `NameObjectCollectionBase.Count`.

## NameValueCollection.Item property

```csharp
public string? this[int index] { get; }
```

Gets the entry at the specified index of the `NameValueCollection`.

Parameters:

- `index`: The zero-based index of the entry to locate in the collection.

Returns: A `String` that contains the comma-separated list of values at the specified index of the collection.

Exceptions:

- `ArgumentOutOfRangeException`: `index` is outside the valid range of indexes for the collection.

#### Remarks
This property provides the ability to access a specific element in the collection by using the following syntax: `myCollection[index]`.

This property cannot be set. To set the value at a specified index, use `Item[GetKey(index)]`.

The C# language uses the this keyword to define the indexers instead of implementing the `NameValueCollection.Item` property. Visual Basic <example-value> `NameValueCollection.Item` as a default property, which provides the same indexing functionality.

Retrieving the values at the specified index is an O(`n`) operation, where `n` is the number of values.
