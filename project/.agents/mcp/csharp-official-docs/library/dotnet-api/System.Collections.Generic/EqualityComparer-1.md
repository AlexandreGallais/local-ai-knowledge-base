---
title: "EqualityComparer<T> class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.Generic/EqualityComparer`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# EqualityComparer<T> class

Namespace: `System.Collections.Generic`

```csharp
public abstract class EqualityComparer<T> : System.Collections.Generic.IEqualityComparer<T>, System.Collections.IEqualityComparer
```

Provides a base class for implementations of the `IEqualityComparer<T>` generic interface.

Parameters:

- `T`: The type of objects to compare.

#### Remarks

Derive from this class to provide a custom implementation of the `IEqualityComparer<T>` generic interface for use with collection classes such as the `Dictionary<T1,T2>` generic class, or with methods such as `List<T>.Sort`.

The `Default` property checks whether type `T` implements the `IEquatable<T>` generic interface and, if so, returns an `EqualityComparer<T>` that invokes the implementation of the `IEquatable<T>.Equals` method. Otherwise, it returns an `EqualityComparer<T>`, as provided by `T`.

In .NET 8 and later versions, we recommend using the `Create` method to create instances of this type.

#### Examples
The following example creates a dictionary collection of objects of type `Box` with an equality comparer. Two boxes are considered equal if their dimensions are the same. It then adds the boxes to the collection.

The dictionary is recreated with an equality comparer that defines equality in a different way: Two boxes are considered equal if their volumes are the same.

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/EqualityComparerT/Overview/program.cs._

## EqualityComparer<T>.EqualityComparer() constructor

```csharp
protected EqualityComparer ();
```

Initializes a new instance of the `EqualityComparer<T>` class.

To be added.

## EqualityComparer<T>.Default property

```csharp
public static System.Collections.Generic.EqualityComparer<T> Default { get; }
```

Returns a default equality comparer for the type specified by the generic argument.

Returns: The default instance of the `EqualityComparer<T>` class for type `T`.

#### Remarks
The `Default` property checks whether type `T` implements the `IEquatable<T>` interface and, if so, returns an `EqualityComparer<T>` that uses that implementation. Otherwise, it returns an `EqualityComparer<T>` that uses the overrides of `Object.Equals` and `Object.GetHashCode` provided by `T`.

#### Examples
The following example creates a collection that contains elements of the `Box` type and then searches it for a box matching another box by calling the `FindFirst` method, twice.

The first search does not specify any equality comparer, which means `FindFirst` uses `EqualityComparer<T>.Default` to determine equality of boxes. That in turn uses the implementation of the `IEquatable<T>.Equals` method in the `Box` class. Two boxes are considered equal if their dimensions are the same.

The second search specifies an equality comparer (`BoxEqVolume`) that defines equality by volume. Two boxes are considered equal if their volumes are the same.

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/EqualityComparerT/Default/program.cs._

## EqualityComparer<T>.Create(Boolean>, Int32>) method

```csharp
public static System.Collections.Generic.EqualityComparer<T> Create (Func<T?,T?,bool> equals, Func<T,int>? getHashCode = default);
```

Creates an `EqualityComparer<T>` by using the specified delegates as the implementation of the comparer's `EqualityComparer<T>.Equals` and `EqualityComparer<T>.GetHashCode` methods.

Parameters:

- `equals`: The delegate to use to implement the `EqualityComparer<T>.Equals` method.
- `getHashCode`: The delegate to use to implement the `EqualityComparer<T>.GetHashCode` method.
If no delegate is supplied, calls to the resulting comparer's `EqualityComparer<T>.GetHashCode` will throw `NotSupportedException`.

Returns: The new comparer.

Exceptions:

- `ArgumentNullException`: The `equals` delegate was `null`.

To be added.

## EqualityComparer<T>.Create<TKey>(Func<T,TKey>, IEqualityComparer<TKey>) method

```csharp
public static System.Collections.Generic.EqualityComparer<T> Create<TKey> (Func<T?,TKey?> keySelector, System.Collections.Generic.IEqualityComparer<TKey>? keyComparer = default);
```

To be added.

Parameters:

- `TKey`: To be added.
- `keySelector`: To be added.
- `keyComparer`: To be added.

Returns: To be added.

To be added.

## EqualityComparer<T>.Equals(T, T) method

```csharp
public abstract bool Equals (T? x, T? y);
```

When overridden in a derived class, determines whether two objects of type `T` are equal.

Parameters:

- `x`: The first object to compare.
- `y`: The second object to compare.

Returns: `true` if the specified objects are equal; otherwise, `false`.

#### Remarks
The `EqualityComparer<T>.Equals` method is reflexive, symmetric, and transitive. That is, it returns `true` if used to compare an object with itself; `true` for two objects `x` and `y` if it is `true` for `y` and `x`; and `true` for two objects `x` and `z` if it is `true` for `x` and `y` and also `true` for `y` and `z`.

## EqualityComparer<T>.GetHashCode(T) method

```csharp
public abstract int GetHashCode (T obj);
```

When overridden in a derived class, serves as a hash function for the specified object for hashing algorithms and data structures, such as a hash table.

Parameters:

- `obj`: The object for which to get a hash code.

Returns: A hash code for the specified object.

Exceptions:

- `ArgumentNullException`: The type of `obj` is a reference type and `obj` is `null`.

To be added.

## EqualityComparer<T>.System.Collections.IEqualityComparer.Equals(Object, Object) method

```csharp
bool IEqualityComparer.Equals (object x, object y);
```

Determines whether the specified objects are equal.

Parameters:

- `x`: The first object to compare.
- `y`: The second object to compare.

Returns: `true` if the specified objects are equal; otherwise, `false`.

Exceptions:

- `ArgumentException`: `x` or `y` is of a type that cannot be cast to type `T`.

#### Remarks
This method is a wrapper for the `Equals` method, so `obj` must be cast to the type specified by the generic argument `T` of the current instance. If it cannot be cast to `T`, an `ArgumentException` is thrown.

Comparing `null` is allowed and does not generate an exception.

## EqualityComparer<T>.System.Collections.IEqualityComparer.GetHashCode(Object) method

```csharp
int IEqualityComparer.GetHashCode (object obj);
```

Returns a hash code for the specified object.

Parameters:

- `obj`: The `Object` for which a hash code is to be returned.

Returns: A hash code for the specified object.

Exceptions:

- `ArgumentNullException`: The type of `obj` is a reference type and `obj` is `null`.

-or-

`obj` is of a type that cannot be cast to type `T`.

#### Remarks
This method is a wrapper for the `GetHashCode` method, so `obj` must be a type that can be cast to the type specified by the generic type argument `T` of the current instance.
