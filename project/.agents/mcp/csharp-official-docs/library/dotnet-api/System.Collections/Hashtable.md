---
title: "Hashtable class (part 1 of 5)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections/Hashtable.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Hashtable class

Namespace: `System.Collections`

```csharp
public class Hashtable : ICloneable, System.Collections.IDictionary, System.Runtime.Serialization.IDeserializationCallback, System.Runtime.Serialization.ISerializable
```

Represents a collection of key/value pairs that are organized based on the hash code of the key.

#### Remarks

Each element is a key/value pair stored in a `DictionaryEntry` object. A key <example-value> be `null`, but a value can be.

> **Important:**
>  We don't recommend that you use the `Hashtable` class for new development. Instead, we recommend that you use the generic `Dictionary<T1,T2>` class. For more information, see Non-generic collections shouldn't be used on GitHub.

The objects used as keys by a `Hashtable` are required to override the `Object.GetHashCode` method (or the `IHashCodeProvider` interface) and the `Object.Equals` method (or the `IComparer` interface). The implementation of both methods and interfaces must handle case sensitivity the same way; otherwise, the `Hashtable` might behave incorrectly. For example, when creating a `Hashtable`, you must use the `CaseInsensitiveHashCodeProvider` class (or any case-insensitive `IHashCodeProvider` implementation) with the `CaseInsensitiveComparer` class (or any case-insensitive `IComparer` implementation).

Furthermore, these methods must produce the same results when called with the same parameters while the key <example-value> in the `Hashtable`. An alternative is to use a `Hashtable` constructor with an `IEqualityComparer` parameter. If key <example-value> were simply reference equality, the inherited implementation of `Object.GetHashCode` and `Object.Equals` would suffice.

Key <example-value> must be immutable as long as they are used as keys in the `Hashtable`.

When an element is added to the `Hashtable`, the element is placed into a bucket based on the hash code of the key. Subsequent lookups of the key use the hash code of the key to search in only one particular bucket, thus substantially reducing the number of key <example-value> required to find an element.

The load factor of a `Hashtable` determines the maximum ratio of elements to buckets. Smaller load factors cause faster average lookup times at the cost of increased memory consumption. The default load factor of 1.0 generally provides the best balance between speed and size. A different load factor can also be specified when the `Hashtable` is created.

As elements are added to a `Hashtable`, the actual load factor of the `Hashtable` increases. When the actual load factor reaches the specified load factor, the number of buckets in the `Hashtable` is automatically increased to the smallest prime number that is larger than twice the current number of `Hashtable` buckets.

Each key <example-value> in the `Hashtable` must provide its own hash function, which can be accessed by calling `Hashtable.GetHash`. However, any object implementing `IHashCodeProvider` can be passed to a `Hashtable` constructor, and that hash function is used for all objects in the table.

The capacity of a `Hashtable` is the number of elements the `Hashtable` can hold. As elements are added to a `Hashtable`, the capacity is automatically increased as required through reallocation.

The `foreach` statement of the C# language (`For Each` in Visual Basic) returns an object of the type of the elements in the collection. Since each element of the `Hashtable` is a key/value pair, the element type is not the type of the key or the type of the value. Instead, the element type is `DictionaryEntry`. For example:

_Code sample not included: ~/snippets/csharp/System.Collections/Hashtable/Overview/remarks.cs._

The `foreach` statement is a wrapper around the enumerator, which only allows reading from, not writing to, the collection.

Because serializing and deserializing an enumerator for a `Hashtable` can cause the elements to become reordered, it is not possible to continue enumeration without calling the `IEnumerator.Reset` method.

> **Note:**
>  Because keys can be inherited and their behavior changed, their absolute uniqueness cannot be guaranteed by comparisons using the `Type.Equals` method.

#### Examples
The following example shows how to create, initialize and perform various functions to a `Hashtable` and how to print out its keys and values.

_Code sample not included: ~/snippets/csharp/System.Collections/Hashtable/Overview/hashtable_example.cs._

_Code sample not included: ~/snippets/powershell/VS_Snippets_CLR_System/system.collections.hashtable.class/ps/hashtable.ps1._
## Hashtable.Hashtable() constructor

```csharp
public Hashtable ();
```

Initializes a new, empty instance of the `Hashtable` class using the default initial capacity, load factor, hash code provider, and comparer.

#### Remarks
A hash table's capacity is used to calculate the optimal number of hash table buckets based on the load factor. Capacity is automatically increased as required.

The load factor is the maximum ratio of elements to buckets. A smaller load factor means faster lookup at the cost of increased memory consumption.

When the actual load factor reaches the specified load factor, the number of buckets is automatically increased to the smallest prime number that is larger than twice the current number of buckets.

The hash code provider dispenses hash codes for keys in the `Hashtable` object. The default hash code provider is the key's implementation of `Object.GetHashCode`.

The comparer determines whether two keys are equal. Every key in a `Hashtable` must be unique. The default comparer is the key's implementation of `Object.Equals`.

This constructor is an `O(1)` operation.

#### Examples
The following code example creates hash tables using different `Hashtable` constructors and demonstrates the differences in the behavior of the hash tables, even if each one contains the same elements.

_Code sample not included: ~/snippets/csharp/System.Collections/Hashtable/.ctor/hashtable_ctor.cs._

## Hashtable.Hashtable(IDictionary) constructor

```csharp
public Hashtable (System.Collections.IDictionary d);
```

Initializes a new instance of the `Hashtable` class by copying the elements from the specified dictionary to the new `Hashtable` object. The new `Hashtable` object has an initial capacity equal to the number of elements copied, and uses the default load factor, hash code provider, and comparer.

Parameters:

- `d`: The `IDictionary` object to copy to a new `Hashtable` object.

Exceptions:

- `ArgumentNullException`: `d` is `null`.

#### Remarks
The initial capacity is set to the number of elements in the source dictionary. Capacity is automatically increased as required based on the load factor.

The load factor is the maximum ratio of elements to buckets. A smaller load factor means faster lookup at the cost of increased memory consumption.

When the actual load factor reaches the specified load factor, the number of buckets is automatically increased to the smallest prime number that is larger than twice the current number of buckets.

The hash code provider dispenses hash codes for keys in the `Hashtable` object. The default hash code provider is the key's implementation of `Object.GetHashCode`.

The comparer determines whether two keys are equal. Every key in a `Hashtable` must be unique. The default comparer is the key's implementation of `Object.Equals`.

The elements of the new `Hashtable` are sorted in the same order in which the enumerator iterates through the `IDictionary` object.

This constructor is an `O(n)` operation, where `n` is the number of elements in the `d` parameter.

#### Examples
The following code example creates hash tables using different `Hashtable` constructors and demonstrates the differences in the behavior of the hash tables, even if each one contains the same elements.

_Code sample not included: ~/snippets/csharp/System.Collections/Hashtable/.ctor/hashtable_ctordictionary.cs._

## Hashtable.Hashtable(IEqualityComparer) constructor

```csharp
public Hashtable (System.Collections.IEqualityComparer? equalityComparer);
```

Initializes a new, empty instance of the `Hashtable` class using the default initial capacity and load factor, and the specified `IEqualityComparer` object.

Parameters:

- `equalityComparer`: The `IEqualityComparer` object that defines the hash code provider and the comparer to use with the `Hashtable` object.

-or-

`null` to use the default hash code provider and the default comparer. The default hash code provider is each key's implementation of `Object.GetHashCode` and the default comparer is each key's implementation of `Object.Equals`.

#### Remarks
A hash table's capacity is used to calculate the optimal number of hash table buckets based on the load factor. Capacity is automatically increased as required.

The load factor is the maximum ratio of elements to buckets. A smaller load factor means faster lookup at the cost of increased memory consumption.

When the actual load factor reaches the specified load factor, the number of buckets is automatically increased to the smallest prime number that is larger than twice the current number of buckets.

The `IEqualityComparer` object includes both the hash code provider and the comparer. If an `IEqualityComparer` is used in the `Hashtable` constructor, the objects used as keys in the `Hashtable` object are not required to override the `Object.GetHashCode` and `Object.Equals` methods.

The hash code provider dispenses hash codes for keys in the `Hashtable`. The default hash code provider is the key's implementation of `Object.GetHashCode`.

The comparer determines whether two keys are equal. Every key in a `Hashtable` must be unique. The default comparer is the key's implementation of `Object.Equals`.

The `IEqualityComparer` enables scenarios such as doing lookups with case-insensitive strings.

This constructor is an `O(1)` operation.

#### Examples
The following code example creates hash tables using different `Hashtable` constructors and demonstrates the differences in the behavior of the hash tables, even if each one contains the same elements.

_Code sample not included: ~/snippets/csharp/System.Collections/Hashtable/.ctor/hashtable_ctor.cs._

## Hashtable.Hashtable(Int32) constructor

```csharp
public Hashtable (int capacity);
```

Initializes a new, empty instance of the `Hashtable` class using the specified initial capacity, and the default load factor, hash code provider, and comparer.

Parameters:

- `capacity`: The approximate number of elements that the `Hashtable` object can initially contain.

Exceptions:

- `ArgumentOutOfRangeException`: `capacity` is less than zero.

#### Remarks
Specifying the initial capacity eliminates the need to perform a number of resizing operations while adding elements to the `Hashtable` object. Capacity is automatically increased as required based on the load factor.

The load factor is the maximum ratio of elements to buckets. A smaller load factor means faster lookup at the cost of increased memory consumption.

When the actual load factor reaches the specified load factor, the number of buckets is automatically increased to the smallest prime number that is larger than twice the current number of buckets.

The hash code provider dispenses hash codes for keys in the `Hashtable`. The default hash code provider is the key's implementation of `Object.GetHashCode`.

The comparer determines whether two keys are equal. Every key in a `Hashtable` must be unique. The default comparer is the key's implementation of `Object.Equals`.

This constructor is an `O(n)` operation, where `n` is `capacity`.

#### Examples
The following code example creates hash tables using different `Hashtable` constructors and demonstrates the differences in the behavior of the hash tables, even if each one contains the same elements.

_Code sample not included: ~/snippets/csharp/System.Collections/Hashtable/.ctor/hashtable_ctorint.cs._

## Hashtable.Hashtable(IDictionary, IEqualityComparer) constructor

```csharp
public Hashtable (System.Collections.IDictionary d, System.Collections.IEqualityComparer? equalityComparer);
```

Initializes a new instance of the `Hashtable` class by copying the elements from the specified dictionary to a new `Hashtable` object. The new `Hashtable` object has an initial capacity equal to the number of elements copied, and uses the default load factor and the specified `IEqualityComparer` object.

Parameters:

- `d`: The `IDictionary` object to copy to a new `Hashtable` object.
- `equalityComparer`: The `IEqualityComparer` object that defines the hash code provider and the comparer to use with the `Hashtable`.

-or-

`null` to use the default hash code provider and the default comparer. The default hash code provider is each key's implementation of `Object.GetHashCode` and the default comparer is each key's implementation of `Object.Equals`.

Exceptions:

- `ArgumentNullException`: `d` is `null`.

#### Remarks
The initial capacity is set to the number of elements in the source dictionary. Capacity is automatically increased as required based on the load factor.

The load factor is the maximum ratio of elements to buckets. A smaller load factor means faster lookup at the cost of increased memory consumption.

When the actual load factor reaches the specified load factor, the number of buckets is automatically increased to the smallest prime number that is larger than twice the current number of buckets.

The `IEqualityComparer` object includes both the hash code provider and the comparer. If an `IEqualityComparer` is used in the `Hashtable` constructor, the objects used as keys in the `Hashtable` object are not required to override the `Object.GetHashCode` and `Object.Equals` methods.

The hash code provider dispenses hash codes for keys in the `Hashtable`. The default hash code provider is the key's implementation of `Object.GetHashCode`.

The comparer determines whether two keys are equal. Every key in a `Hashtable` must be unique. The default comparer is the key's implementation of `Object.Equals`.

The `IEqualityComparer` enables scenarios such as doing lookups with case-insensitive strings.

The elements of the new `Hashtable` are sorted in the same order in which the enumerator iterates through the `IDictionary` object.

This constructor is an `O(n)` operation, where `n` is the number of elements in the `d` parameter.

#### Examples
The following code example creates hash tables using different `Hashtable` constructors and demonstrates the differences in the behavior of the hash tables, even if each one contains the same elements.

_Code sample not included: ~/snippets/csharp/System.Collections/Hashtable/.ctor/hashtable_ctordictionary.cs._
