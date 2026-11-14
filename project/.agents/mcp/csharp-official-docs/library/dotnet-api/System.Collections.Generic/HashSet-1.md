---
title: "HashSet<T> class (part 1 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.Generic/HashSet`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# HashSet<T> class

Namespace: `System.Collections.Generic`

```csharp
public class HashSet<T> : System.Collections.Generic.ICollection<T>, System.Collections.Generic.IEnumerable<T>, System.Collections.Generic.IReadOnlyCollection<T>, System.Collections.Generic.IReadOnlySet<T>, System.Collections.Generic.ISet<T>, System.Runtime.Serialization.IDeserializationCallback, System.Runtime.Serialization.ISerializable
```

Represents a set of values.

Parameters:

- `T`: The type of elements in the hash set.

The `HashSet<T>` class provides high-performance set operations. A set is a collection that contains no duplicate elements, and whose elements are in no particular order.

The capacity of a `HashSet<T>` object is the number of elements that the object can hold. A `HashSet<T>` object's capacity automatically increases as elements are added to the object.

The `HashSet<T>` class is based on the model of mathematical sets and provides high-performance set operations similar to accessing the keys of the `Dictionary<T1,T2>` or `Hashtable` collections. In simple terms, the `HashSet<T>` class can be thought of as a `Dictionary<T1,T2>` collection without values.

A `HashSet<T>` collection is not sorted and cannot contain duplicate elements. If order or element duplication is more important than performance for your application, consider using the `List<T>` class together with the `List<T>.Sort` method.

`HashSet<T>` provides many mathematical set operations, such as set addition (unions) and set subtraction. The following table lists the provided `HashSet<T>` operations and their mathematical equivalents.

| HashSet operation                                                | Mathematical equivalent |
|------------------------------------------------------------------|-------------------------|
| `HashSet<T>.UnionWith`           | Union or set addition   |
| `HashSet<T>.IntersectWith`       | Intersection            |
| `HashSet<T>.ExceptWith`          | Set subtraction         |
| `HashSet<T>.SymmetricExceptWith` | Symmetric difference    |

In addition to the listed set operations, the `HashSet<T>` class also provides methods for determining set equality, overlap of sets, and whether a set is a subset or superset of another set.

The `HashSet<T>` class implements the `ISet<T>` interface.

#### HashSet and LINQ set operations

LINQ provides access to the `Distinct`, `Union`, `Intersect`, and `Except` set operations on any data source that implements the `IEnumerable` or `IQueryable` interfaces. `HashSet<T>` provides a larger and more robust collection of set operations. For example, `HashSet<T>` provides comparisons such as `HashSet<T>.IsSubsetOf` and `HashSet<T>.IsSupersetOf`.

The primary difference between LINQ set operations and `HashSet<T>` operations is that LINQ set operations always return a new `IEnumerable<T>` collection, whereas the `HashSet<T>` equivalent methods modify the current collection.

Typically, if you must create a new set or if your application needs access only to the provided set operations, using LINQ set operations on any `IEnumerable<T>` collection or array will be sufficient. However, if your application requires access to additional set operations, or if it is not desirable or necessary to create a new collection, use the `HashSet<T>` class.

The following table shows the `HashSet<T>` operations and their equivalent LINQ set operations.

| HashSet operation                                                | LINQ equivalent                          |
|------------------------------------------------------------------|------------------------------------------|
| `HashSet<T>.UnionWith`           | `Enumerable.Union`     |
| `HashSet<T>.IntersectWith`       | `Enumerable.Intersect` |
| `HashSet<T>.ExceptWith`          | `Enumerable.Except`    |
| Not provided.                                                    | `Enumerable.Distinct`  |
| `HashSet<T>.SymmetricExceptWith` | Not provided.                            |
| `HashSet<T>.Overlaps`            | Not provided.                            |
| `HashSet<T>.IsSubsetOf`          | Not provided.                            |
| `HashSet<T>.IsProperSubsetOf`    | Not provided.                            |
| `HashSet<T>.IsSupersetOf`        | Not provided.                            |
| `HashSet<T>.IsProperSupersetOf`  | Not provided.                            |
| `HashSet<T>.SetEquals`           | Not provided.                            |

The following example demonstrates how to merge two disparate sets. This example creates two `HashSet<T>` objects and populates them with even and odd numbers, respectively. A third `HashSet<T>` object is created from the set that contains the even numbers. The example then calls the `HashSet<T>.UnionWith` method, which adds the odd number set to the third set.

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/HashSetT/Overview/Program.cs._

## HashSet<T>.HashSet() constructor

```csharp
public HashSet ();
```

Initializes a new instance of the `HashSet<T>` class that is empty and uses the default equality comparer for the set type.

#### Remarks
The capacity of a `HashSet<T>` object is the number of elements that the object can hold. A `HashSet<T>` object's capacity automatically increases as elements are added to the object.

This constructor is an O(1) operation.

#### Examples
The following example demonstrates how to create and populate two `HashSet<T>` objects. This example is part of a larger example provided for the `HashSet<T>.UnionWith` method.

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/HashSetT/Overview/Program.cs._

## HashSet<T>.HashSet(IEnumerable<T>) constructor

```csharp
public HashSet (System.Collections.Generic.IEnumerable<T> collection);
```

Initializes a new instance of the `HashSet<T>` class that uses the default equality comparer for the set type, contains elements copied from the specified collection, and has sufficient capacity to accommodate the number of elements copied.

Parameters:

- `collection`: The collection whose elements are copied to the new set.

Exceptions:

- `ArgumentNullException`: `collection` is `null`.

#### Remarks
The capacity of a `HashSet<T>` object is the number of elements that the object can hold. A `HashSet<T>` object's capacity automatically increases as elements are added to the object.

If `collection` contains duplicates, the set will contain one of each unique element. No exception will be thrown. Therefore, the size of the resulting set is not identical to the size of `collection`.

This constructor is an O(`n`) operation, where `n` is the number of elements in the `collection` parameter.

#### Examples
The following example shows how to create a `HashSet<T>` collection from an existing set. In this example, two sets are created with even and odd integers, respectively. A third `HashSet<T>` object is then created from the even integer set.

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/HashSetT/Overview/Program.cs._

## HashSet<T>.HashSet(IEqualityComparer<T>) constructor

```csharp
public HashSet (System.Collections.Generic.IEqualityComparer<T>? comparer);
```

Initializes a new instance of the `HashSet<T>` class that is empty and uses the specified equality comparer for the set type.

Parameters:

- `comparer`: The `IEqualityComparer<T>` implementation to use when comparing values in the set, or `null` to use the default `EqualityComparer<T>` implementation for the set type.

#### Remarks
The capacity of a `HashSet<T>` object is the number of elements that the object can hold. A `HashSet<T>` object's capacity automatically increases as elements are added to the object.

This constructor is an O(1) operation.

## HashSet<T>.HashSet(Int32) constructor

```csharp
public HashSet (int capacity);
```

Initializes a new instance of the `HashSet<T>` class that is empty, but has reserved space for `capacity` items and uses the default equality comparer for the set type.

Parameters:

- `capacity`: The initial size of the `HashSet<T>`.

#### Remarks
Since resizes are relatively expensive (require rehashing), this attempts to minimize the need to resize by setting the initial capacity based on the value of the `capacity`.

> **Caution:**
> If `capacity` comes from user input, prefer using a constructor overload without a `capacity` parameter, and let the collection resize as elements are added. If you must use a user-specified value, either clamp it to a reasonable limit (for example, `Math.Clamp(untrustedValue, 0, 20)`), or verify that the element count matches the specified value.

## HashSet<T>.HashSet(IEnumerable<T>, IEqualityComparer<T>) constructor

```csharp
public HashSet (System.Collections.Generic.IEnumerable<T> collection, System.Collections.Generic.IEqualityComparer<T>? comparer);
```

Initializes a new instance of the `HashSet<T>` class that uses the specified equality comparer for the set type, contains elements copied from the specified collection, and has sufficient capacity to accommodate the number of elements copied.

Parameters:

- `collection`: The collection whose elements are copied to the new set.
- `comparer`: The `IEqualityComparer<T>` implementation to use when comparing values in the set, or `null` to use the default `EqualityComparer<T>` implementation for the set type.

Exceptions:

- `ArgumentNullException`: `collection` is `null`.

#### Remarks
The capacity of a `HashSet<T>` object is the number of elements that the object can hold. A `HashSet<T>` object's capacity automatically increases as elements are added to the object.

If `collection` contains duplicates, the set will contain one of each unique element. No exception will be thrown. Therefore, the size of the resulting set is not identical to the size of `collection`.

This constructor is an O(`n`) operation, where `n` is the number of elements in the `collection` parameter.

#### Examples
The following example uses a supplied `IEqualityComparer<T>` to allow case-insensitive comparisons on the elements of a  `HashSet<T>` collection of vehicle types.

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/HashSetT/.ctor/source2.cs._

## HashSet<T>.HashSet(Int32, IEqualityComparer<T>) constructor

```csharp
public HashSet (int capacity, System.Collections.Generic.IEqualityComparer<T>? comparer);
```

Initializes a new instance of the `HashSet<T>` class that uses the specified equality comparer for the set type, and has sufficient capacity to accommodate `capacity` elements.

Parameters:

- `capacity`: The initial size of the `HashSet<T>`.
- `comparer`: The `IEqualityComparer<T>` implementation to use when comparing values in the set, or null (Nothing in Visual Basic) to use the default `IEqualityComparer<T>` implementation for the set type.

#### Remarks
Since resizes are relatively expensive (require rehashing), this attempts to minimize the need to resize by setting the initial capacity based on the value of the `capacity`.

> **Caution:**
> If `capacity` comes from user input, prefer using a constructor overload without a `capacity` parameter, and let the collection resize as elements are added. If you must use a user-specified value, either clamp it to a reasonable limit (for example, `Math.Clamp(untrustedValue, 0, 20)`), or verify that the element count matches the specified value.

## HashSet<T>.HashSet(SerializationInfo, StreamingContext) constructor

```csharp
protected HashSet (System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context);
```

Initializes a new instance of the `HashSet<T>` class with serialized data.

Parameters:

- `info`: A `SerializationInfo` object that contains the information required to serialize the `HashSet<T>` object.
- `context`: A `StreamingContext` structure that contains the source and destination of the serialized stream associated with the `HashSet<T>` object.

To be added.

## HashSet<T>.Capacity property

```csharp
public int Capacity { get; }
```

Gets the total numbers of elements the internal data structure can hold without resizing.

Returns: To be added.

To be added.

## HashSet<T>.Comparer property

```csharp
public System.Collections.Generic.IEqualityComparer<T> Comparer { get; }
```

Gets the `IEqualityComparer<T>` object that is used to determine equality for the values in the set.

Returns: The `IEqualityComparer<T>` object that is used to determine equality for the values in the set.

#### Remarks
Retrieving the value of this property is an O(1) operation.

## HashSet<T>.Count property

```csharp
public int Count { get; }
```

Gets the number of elements that are contained in a set.

Returns: The number of elements that are contained in the set.

#### Remarks
The capacity of a `HashSet<T>` object is the number of elements that the object can hold. A `HashSet<T>` object's capacity automatically increases as elements are added to the object.

The capacity is always greater than or equal to `HashSet<T>.Count`. If `HashSet<T>.Count` exceeds the capacity while adding elements, the capacity is set to the first prime number that is greater than double the previous capacity.

Retrieving the value of this property is an O(1) operation.

#### Examples
The following example demonstrates how to create, populate, and manipulate two `HashSet<T>` objects. In this example, both the contents of the set and `HashSet<T>.Count` display to the console.

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/HashSetT/Overview/Program.cs._

## HashSet<T>.System.Collections.Generic.ICollection<T>.IsReadOnly property

```csharp
bool System.Collections.Generic.ICollection<T>.IsReadOnly { get; }
```

Gets a value indicating whether a collection is read-only.

Returns: `true` if the collection is read-only; otherwise, `false`.

#### Remarks
Retrieving the value of this property is an O(1) operation.

## HashSet<T>.Add(T) method

```csharp
public bool Add (T item);
```

Adds the specified element to a set.

Parameters:

- `item`: The element to add to the set.

Returns: `true` if the element is added to the `HashSet<T>` object; `false` if the element is already present.

#### Remarks
If `HashSet<T>.Count` already equals the capacity of the `HashSet<T>` object, the capacity is automatically adjusted to accommodate the new item.

If `HashSet<T>.Count` is less than the capacity of the internal array, this method is an O(1) operation. If the `HashSet<T>` object must be resized, this method becomes an O(`n`) operation, where `n` is `HashSet<T>.Count`.

#### Examples
The following example demonstrates how to create and populate two `HashSet<T>` objects. This example is part of a larger example provided for the `HashSet<T>.UnionWith` method.

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/HashSetT/Overview/Program.cs._
