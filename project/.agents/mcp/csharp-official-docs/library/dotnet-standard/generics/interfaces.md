---
title: "Generic interfaces"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/generics/interfaces.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Generic interfaces in .NET

This article provides an overview of .NET's generic interfaces that provide common functionality across families of generic types.

Generic interfaces provide type-safe counterparts to nongeneric interfaces for ordering and equality comparisons, and for functionality that's shared by generic collection types. .NET 7 introduces generic interfaces for number-like types, for example, `System.Numerics.INumber`1`. These interfaces let you define generic methods that provide mathematical functionality, where the generic type parameter is constrained to be a type that implements a generic, numeric interface.

> **Note:**
> The type parameters of several generic interfaces are marked covariant or contravariant, providing greater flexibility in assigning and using types that implement these interfaces. For more information, see Covariance and Contravariance.

## Equality and ordering comparisons

- In the `System` namespace, the **`System.IComparable`1`** and **`System.IEquatable`1`** generic interfaces, like their nongeneric counterparts, define methods for ordering comparisons and equality comparisons, respectively. Types implement these interfaces to provide the ability to perform such comparisons.

- In the `System.Collections.Generic` namespace, the **`System.Collections.Generic.IComparer`1`** and **`System.Collections.Generic.IEqualityComparer`1`** generic interfaces offer a way to define an ordering or equality comparison for types that don't implement the `System.IComparable`1` or `System.IEquatable`1` interface. They also provide a way to redefine those relationships for types that do.

  These interfaces are used by methods and constructors of many of the generic collection classes. For example, you can pass a generic `System.Collections.Generic.IComparer`1` object to the constructor of the `System.Collections.Generic.SortedDictionary`2` class to specify a sort order for a type that does not implement generic `System.IComparable`1`. There are overloads of the `System.Array.Sort*` generic static method and the `System.Collections.Generic.List`1.Sort*` instance method for sorting arrays and lists using generic `System.Collections.Generic.IComparer`1` implementations.

  The `System.Collections.Generic.Comparer`1` and `System.Collections.Generic.EqualityComparer`1` generic classes provide base classes for implementations of the `System.Collections.Generic.IComparer`1` and `System.Collections.Generic.IEqualityComparer`1` generic interfaces and also provide default ordering and equality comparisons through their respective `System.Collections.Generic.Comparer`1.Default*` and `System.Collections.Generic.EqualityComparer`1.Default` properties.

## Collection functionality

- The **`System.Collections.Generic.ICollection`1`** generic interface is the basic <example-value> for generic collection types. It provides basic <example-value> for adding, removing, copying, and enumerating elements. `System.Collections.Generic.ICollection`1` inherits from both generic `System.Collections.Generic.IEnumerable`1` and nongeneric `System.Collections.IEnumerable`.

- The **`System.Collections.Generic.IList`1`** generic interface extends the `System.Collections.Generic.ICollection`1` generic interface with methods for indexed retrieval.

- The **`System.Collections.Generic.IDictionary`2`** generic interface extends the `System.Collections.Generic.ICollection`1` generic interface with methods for keyed retrieval. Generic dictionary types in the .NET base class library also implement the nongeneric `System.Collections.IDictionary` interface.

- The **`System.Collections.Generic.IEnumerable`1`** generic interface provides a generic enumerator structure. The `System.Collections.Generic.IEnumerator`1` generic interface implemented by generic enumerators inherits the nongeneric `System.Collections.IEnumerator` interface; the `System.Collections.IEnumerator.MoveNext*` and `System.Collections.IEnumerator.Reset*` members, which do not depend on the type parameter `T`, appear only on the nongeneric interface. This means that any consumer of the nongeneric interface can also consume the generic interface.

## Mathematical functionality

.NET 7 introduces generic interfaces in the `System.Numerics` namespace that describe number-like types and the functionality available to them. The 20 numeric types that the .NET base class library provides, for example, `System.Int32` and `System.Double`, have been updated to implement these interfaces. The most prominent of these interfaces is `System.Numerics.INumber`1`, which roughly corresponds to a "real" number.

For more information about these interfaces, see Generic math.

## See also

- `System.Collections.Generic`
- `System.Collections.ObjectModel`
- Generics
- Generic collections in .NET
- Generic delegates for manipulating arrays and lists
- Covariance and contravariance
