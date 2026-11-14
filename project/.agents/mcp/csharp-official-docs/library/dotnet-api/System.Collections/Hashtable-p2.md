---
title: "Hashtable class (part 2 of 5)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections/Hashtable.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Hashtable class (part 2 of 5)

## Hashtable.Hashtable(IDictionary, Single) constructor

```csharp
public Hashtable (System.Collections.IDictionary d, float loadFactor);
```

Initializes a new instance of the `Hashtable` class by copying the elements from the specified dictionary to the new `Hashtable` object. The new `Hashtable` object has an initial capacity equal to the number of elements copied, and uses the specified load factor, and the default hash code provider and comparer.

Parameters:

- `d`: The `IDictionary` object to copy to a new `Hashtable` object.
- `loadFactor`: A number in the range from 0.1 through 1.0 that is multiplied by the default value that provides the best performance. The result is the maximum ratio of elements to buckets.

Exceptions:

- `ArgumentNullException`: `d` is `null`.
- `ArgumentOutOfRangeException`: `loadFactor` is less than 0.1.

-or-

`loadFactor` is greater than 1.0.

#### Remarks
The initial capacity is set to the number of elements in the source dictionary. Capacity is automatically increased as required based on the load factor.

The load factor is the maximum ratio of elements to buckets. A smaller load factor means faster lookup at the cost of increased memory consumption. A load factor of 1.0 is the best balance between speed and size.

When the actual load factor reaches the specified load factor, the number of buckets is automatically increased to the smallest prime number that is larger than twice the current number of buckets.

The hash code provider dispenses hash codes for keys in the `Hashtable` object. The default hash code provider is the key's implementation of `Object.GetHashCode`.

The comparer determines whether two keys are equal. Every key in a `Hashtable` must be unique. The default comparer is the key's implementation of `Object.Equals`.

The elements of the new `Hashtable` are sorted in the same order in which the enumerator iterates through the `IDictionary` object.

This constructor is an `O(n)` operation, where `n` is the number of elements in the `d` parameter.

#### Examples
The following code example creates hash tables using different `Hashtable` constructors and demonstrates the differences in the behavior of the hash tables, even if each one contains the same elements.

_Code sample not included: ~/snippets/csharp/System.Collections/Hashtable/.ctor/hashtable_ctordictionaryfloat.cs._

## Hashtable.Hashtable(IHashCodeProvider, IComparer) constructor

```csharp
public Hashtable (System.Collections.IHashCodeProvider? hcp, System.Collections.IComparer? comparer);
```

Initializes a new, empty instance of the `Hashtable` class using the default initial capacity and load factor, and the specified hash code provider and comparer.

Parameters:

- `hcp`: The `IHashCodeProvider` object that supplies the hash codes for all keys in the `Hashtable` object.

-or-

`null` to use the default hash code provider, which is each key's implementation of `Object.GetHashCode`.
- `comparer`: The `IComparer` object to use to determine whether two keys are equal.

-or-

`null` to use the default comparer, which is each key's implementation of `Object.Equals`.

To be added.

## Hashtable.Hashtable(Int32, IEqualityComparer) constructor

```csharp
public Hashtable (int capacity, System.Collections.IEqualityComparer? equalityComparer);
```

Initializes a new, empty instance of the `Hashtable` class using the specified initial capacity and `IEqualityComparer`, and the default load factor.

Parameters:

- `capacity`: The approximate number of elements that the `Hashtable` object can initially contain.
- `equalityComparer`: The `IEqualityComparer` object that defines the hash code provider and the comparer to use with the `Hashtable`.

-or-

`null` to use the default hash code provider and the default comparer. The default hash code provider is each key's implementation of `Object.GetHashCode` and the default comparer is each key's implementation of `Object.Equals`.

Exceptions:

- `ArgumentOutOfRangeException`: `capacity` is less than zero.

#### Remarks
Specifying the initial capacity eliminates the need to perform a number of resizing operations while adding elements to the `Hashtable` object. Capacity is automatically increased as required based on the load factor.

The load factor is the maximum ratio of elements to buckets. A smaller load factor means faster lookup at the cost of increased memory consumption.

When the actual load factor reaches the specified load factor, the number of buckets is automatically increased to the smallest prime number that is larger than twice the current number of buckets.

The `IEqualityComparer` object includes both the hash code provider and the comparer. If an `IEqualityComparer` is used in the `Hashtable` constructor, the objects used as keys in the `Hashtable` are not required to override the `Object.GetHashCode` and `Object.Equals` methods.

The hash code provider dispenses hash codes for keys in the `Hashtable`. The default hash code provider is the key's implementation of `Object.GetHashCode`.

The comparer determines whether two keys are equal. Every key in a `Hashtable` must be unique. The default comparer is the key's implementation of `Object.Equals`.

The `IEqualityComparer` enables scenarios such as doing lookups with case-insensitive strings.

This constructor is an `O(n)` operation, where `n` is the `capacity` parameter.

#### Examples
The following code example creates hash tables using different `Hashtable` constructors and demonstrates the differences in the behavior of the hash tables, even if each one contains the same elements.

_Code sample not included: ~/snippets/csharp/System.Collections/Hashtable/.ctor/hashtable_ctorint.cs._

## Hashtable.Hashtable(Int32, Single) constructor

```csharp
public Hashtable (int capacity, float loadFactor);
```

Initializes a new, empty instance of the `Hashtable` class using the specified initial capacity and load factor, and the default hash code provider and comparer.

Parameters:

- `capacity`: The approximate number of elements that the `Hashtable` object can initially contain.
- `loadFactor`: A number in the range from 0.1 through 1.0 that is multiplied by the default value that provides the best performance. The result is the maximum ratio of elements to buckets.

Exceptions:

- `ArgumentOutOfRangeException`: `capacity` is less than zero.

-or-

`loadFactor` is less than 0.1.

-or-

`loadFactor` is greater than 1.0.
- `ArgumentException`: `capacity` is causing an overflow.

#### Remarks
Specifying the initial capacity eliminates the need to perform a number of resizing operations while adding elements to the `Hashtable` object. Capacity is automatically increased as required based on the load factor.

The load factor is the maximum ratio of elements to buckets. A smaller load factor means faster lookup at the cost of increased memory consumption. A load factor of 1.0 is the best balance between speed and size.

When the actual load factor reaches the specified load factor, the number of buckets is automatically increased to the smallest prime number that is larger than twice the current number of buckets.

The hash code provider dispenses hash codes for keys in the `Hashtable`. The default hash code provider is the key's implementation of `Object.GetHashCode`.

The comparer determines whether two keys are equal. Every key in a `Hashtable` must be unique. The default comparer is the key's implementation of `Object.Equals`.

This constructor is an `O(n)` operation, where `n` is the `capacity` parameter.

#### Examples
The following code example creates hash tables using different `Hashtable` constructors and demonstrates the differences in the behavior of the hash tables, even if each one contains the same elements.

_Code sample not included: ~/snippets/csharp/System.Collections/Hashtable/.ctor/hashtable_ctorintfloat.cs._

## Hashtable.Hashtable(SerializationInfo, StreamingContext) constructor

```csharp
protected Hashtable (System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context);
```

Initializes a new, empty instance of the `Hashtable` class that is serializable using the specified `SerializationInfo` and `StreamingContext` objects.

Parameters:

- `info`: A `SerializationInfo` object containing the information required to serialize the `Hashtable` object.
- `context`: A `StreamingContext` object containing the source and destination of the serialized stream associated with the `Hashtable`.

Exceptions:

- `ArgumentNullException`: `info` is `null`.

To be added.

## Hashtable.Hashtable(IDictionary, IHashCodeProvider, IComparer) constructor

```csharp
public Hashtable (System.Collections.IDictionary d, System.Collections.IHashCodeProvider? hcp, System.Collections.IComparer? comparer);
```

Initializes a new instance of the `Hashtable` class by copying the elements from the specified dictionary to the new `Hashtable` object. The new `Hashtable` object has an initial capacity equal to the number of elements copied, and uses the default load factor, and the specified hash code provider and comparer. This API is obsolete. For an alternative, see `Hashtable.#ctor`.

Parameters:

- `d`: The `IDictionary` object to copy to a new `Hashtable` object.
- `hcp`: The `IHashCodeProvider` object that supplies the hash codes for all keys in the `Hashtable`.

-or-

`null` to use the default hash code provider, which is each key's implementation of `Object.GetHashCode`.
- `comparer`: The `IComparer` object to use to determine whether two keys are equal.

-or-

`null` to use the default comparer, which is each key's implementation of `Object.Equals`.

Exceptions:

- `ArgumentNullException`: `d` is `null`.

To be added.

## Hashtable.Hashtable(IDictionary, Single, IEqualityComparer) constructor

```csharp
public Hashtable (System.Collections.IDictionary d, float loadFactor, System.Collections.IEqualityComparer? equalityComparer);
```

Initializes a new instance of the `Hashtable` class by copying the elements from the specified dictionary to the new `Hashtable` object. The new `Hashtable` object has an initial capacity equal to the number of elements copied, and uses the specified load factor and `IEqualityComparer` object.

Parameters:

- `d`: The `IDictionary` object to copy to a new `Hashtable` object.
- `loadFactor`: A number in the range from 0.1 through 1.0 that is multiplied by the default value that provides the best performance. The result is the maximum ratio of elements to buckets.
- `equalityComparer`: The `IEqualityComparer` object that defines the hash code provider and the comparer to use with the `Hashtable`.

-or-

`null` to use the default hash code provider and the default comparer. The default hash code provider is each key's implementation of `Object.GetHashCode` and the default comparer is each key's implementation of `Object.Equals`.

Exceptions:

- `ArgumentNullException`: `d` is `null`.
- `ArgumentOutOfRangeException`: `loadFactor` is less than 0.1.

-or-

`loadFactor` is greater than 1.0.

#### Remarks
The initial capacity is set to the number of elements in the source dictionary. Capacity is automatically increased as required based on the load factor.

The load factor is the maximum ratio of elements to buckets. A smaller load factor means faster lookup at the cost of increased memory consumption. A load factor of 1.0 is the best balance between speed and size.

When the actual load factor reaches the specified load factor, the number of buckets is automatically increased to the smallest prime number that is larger than twice the current number of buckets.

The `IEqualityComparer` object includes both the hash code provider and the comparer. If an `IEqualityComparer` is used in the `Hashtable` constructor, the objects used as keys in the `Hashtable` object are not required to override the `Object.GetHashCode` and `Object.Equals` methods.

The hash code provider dispenses hash codes for keys in the `Hashtable`. The default hash code provider is the key's implementation of `Object.GetHashCode`.

The comparer determines whether two keys are equal. Every key in a `Hashtable` must be unique. The default comparer is the key's implementation of `Object.Equals`.

The `IEqualityComparer` enables scenarios such as doing lookups with case-insensitive strings.

The elements of the new `Hashtable` are sorted in the same order in which the enumerator iterates through the `IDictionary` object.

This constructor is an `O(n)` operation, where `n` is the number of elements in the `d` parameter.

#### Examples
The following code example creates hash tables using different `Hashtable` constructors and demonstrates the differences in the behavior of the hash tables, even if each one contains the same elements.

_Code sample not included: ~/snippets/csharp/System.Collections/Hashtable/.ctor/hashtable_ctordictionaryfloat.cs._

## Hashtable.Hashtable(Int32, IHashCodeProvider, IComparer) constructor

```csharp
public Hashtable (int capacity, System.Collections.IHashCodeProvider? hcp, System.Collections.IComparer? comparer);
```

Initializes a new, empty instance of the `Hashtable` class using the specified initial capacity, hash code provider, comparer, and the default load factor.

Parameters:

- `capacity`: The approximate number of elements that the `Hashtable` object can initially contain.
- `hcp`: The `IHashCodeProvider` object that supplies the hash codes for all keys in the `Hashtable`.

-or-

`null` to use the default hash code provider, which is each key's implementation of `Object.GetHashCode`.
- `comparer`: The `IComparer` object to use to determine whether two keys are equal.

-or-

`null` to use the default comparer, which is each key's implementation of `Object.Equals`.

Exceptions:

- `ArgumentOutOfRangeException`: `capacity` is less than zero.

To be added.
