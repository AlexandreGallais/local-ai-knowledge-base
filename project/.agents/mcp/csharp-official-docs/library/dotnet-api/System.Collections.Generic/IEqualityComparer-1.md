---
title: "IEqualityComparer<T> interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.Generic/IEqualityComparer`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IEqualityComparer<T> interface

Namespace: `System.Collections.Generic`

```csharp
public interface IEqualityComparer<in T> where T : allows ref struct
```

Defines methods to support the comparison of objects for equality.

Parameters:

- `T`: The type of objects to compare.

#### Remarks
This interface allows the implementation of customized equality comparison for collections. That is, you can create your own definition of equality for type `T`, and specify that this definition be used with a collection type that accepts the `IEqualityComparer<T>` generic interface. Constructors of the `Dictionary<T1,T2>` generic collection type accept this interface.

A default implementation of this interface is provided by the `Default` property of the `EqualityComparer<T>` generic class. The `StringComparer` class implements `IEqualityComparer<T>` of type `String`.

This interface supports only equality comparisons. Customization of comparisons for sorting and ordering is provided by the `IComparer<T>` generic interface.

We recommend that you derive from the `EqualityComparer<T>` class instead of implementing the `IEqualityComparer<T>` interface, because the `EqualityComparer<T>` class tests for equality using the `IEquatable<T>.Equals` method instead of the `Object.Equals` method. This is consistent with the `Contains`, `IndexOf`, `LastIndexOf`, and `Remove` methods of the `Dictionary<T1,T2>` class and other generic collections.

#### Examples
The following example adds custom `Box` objects to a dictionary collection. The `Box` objects are considered equal if their dimensions are the same.

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/IEqualityComparerT/Overview/program.cs._

## IEqualityComparer<T>.Equals(T, T) method

```csharp
public bool Equals (T? x, T? y);
```

Determines whether the specified objects are equal.

Parameters:

- `x`: The first object of type `T` to compare.
- `y`: The second object of type `T` to compare.

Returns: `true` if the specified objects are equal; otherwise, `false`.

#### Remarks
Implement this method to provide a customized equality comparison for type `T`.

## IEqualityComparer<T>.GetHashCode(T) method

```csharp
public int GetHashCode (T obj);
```

Returns a hash code for the specified object.

Parameters:

- `obj`: The `Object` for which a hash code is to be returned.

Returns: A hash code for the specified object.

Exceptions:

- `ArgumentNullException`: The type of `obj` is a reference type and `obj` is `null`.

#### Remarks
Implement this method to provide a customized hash code for type `T`, corresponding to the customized equality comparison provided by the `IEqualityComparer<T>.Equals` method.
