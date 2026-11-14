---
title: "Comparer<T> class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.Generic/Comparer`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Comparer<T> class

Namespace: `System.Collections.Generic`

```csharp
public abstract class Comparer<T> : System.Collections.Generic.IComparer<T>, System.Collections.IComparer
```

Provides a base class for implementations of the `IComparer<T>` generic interface.

Parameters:

- `T`: The type of objects to compare.

#### Remarks
Derive from this class to provide a custom implementation of the `IComparer<T>` interface for use with collection classes such as the `SortedList<T1,T2>` and `SortedDictionary<T1,T2>` generic classes.

The difference between deriving from the `Comparer<T>` class and implementing the `IComparable` interface is as follows:

- To specify how two objects should be compared by default, implement the `IComparable` interface in your class. This ensures that sort operations will use the default comparison code that you provided.

- To define a comparer to use instead of the default comparer, derive from the `Comparer<T>` class. You can then use this comparer in sort operations that take a comparer as a parameter.

The object returned by the `Default` property uses the `IComparable<T>` generic interface (`IComparable<T>` in C#, `IComparable(Of T)` in Visual Basic) to compare two objects. If type `T` does not implement the `IComparable<T>` generic interface, the `Default` property returns a `Comparer<T>` that uses the `IComparable` interface.

#### Examples
The following example derives a class, `BoxLengthFirst`, from the `Comparer<T>` class. This comparer compares two objects of type `Box`. It sorts them first by length, then by height, and then by width. The `Box` class implements the `IComparable<T>` interface to control the default comparison between two `Box` objects. This default implementation sorts first by height, then by length, and then by width. The example shows the differences between the two comparisons by sorting a list of `Box` objects first by using the `BoxLengthFirst` comparer and then by using the default comparer.

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/ComparerT/Overview/program.cs._

## Comparer<T>.Comparer() constructor

```csharp
protected Comparer ();
```

Initializes a new instance of the `Comparer<T>` class.

To be added.

## Comparer<T>.Default property

```csharp
public static System.Collections.Generic.Comparer<T> Default { get; }
```

Returns a default sort-order comparer for the type specified by the generic argument.

Returns: An object that inherits `Comparer<T>` and serves as a sort-order comparer for type
```csharp
T
```
.

#### Remarks
The `Comparer<T>` returned by this property uses the `IComparable<T>` generic interface (`IComparable<T>` in C#, `IComparable(Of T)` in Visual Basic) to compare two objects. If type `T` does not implement the `IComparable<T>` generic interface, this property returns a `Comparer<T>` that uses the `IComparable` interface.

#### Examples
The following example shows how to use the `Default` property to get an object that performs the default comparison. This example is part of a larger example provided for the `Comparer<T>` class.

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/ComparerT/Overview/program.cs._

## Comparer<T>.Compare(T, T) method

```csharp
public abstract int Compare (T? x, T? y);
```

When overridden in a derived class, performs a comparison of two objects of the same type and returns a value indicating whether one object is less than, equal to, or greater than the other.

Parameters:

- `x`: The first object to compare.
- `y`: The second object to compare.

Returns: A signed integer that indicates the relative values of `x` and `y`, as shown in the following table.

-  Less than zero

: `x` is less than `y`.

-  Zero

: `x` equals `y`.

-  Greater than zero

: `x` is greater than `y`.

Exceptions:

- `ArgumentException`: Type
```csharp
T
```
does not implement either the `IComparable<T>` generic interface or the `IComparable` interface.

#### Remarks
Implement this method to provide a customized sort order comparison for type `T`.

#### Examples
The following example defines a comparer of `Box` objects that can be used instead of the default comparer. This example is part of a larger example provided for the `Comparer<T>` class.

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/ComparerT/Overview/program.cs._

## Comparer<T>.Create(Comparison<T>) method

```csharp
public static System.Collections.Generic.Comparer<T> Create (Comparison<T> comparison);
```

Creates a comparer by using the specified comparison.

Parameters:

- `comparison`: The comparison to use.

Returns: The new comparer.

To be added.

## Comparer<T>.System.Collections.IComparer.Compare(Object, Object) method

```csharp
int IComparer.Compare (object x, object y);
```

Compares two objects and returns a value indicating whether one is less than, equal to, or greater than the other.

Parameters:

- `x`: The first object to compare.
- `y`: The second object to compare.

Returns: A signed integer that indicates the relative values of `x` and `y`, as shown in the following table.

-  Less than zero

: `x` is less than `y`.

-  Zero

: `x` equals `y`.

-  Greater than zero

: `x` is greater than `y`.

Exceptions:

- `ArgumentException`: `x` or `y` is of a type that cannot be cast to type
```csharp
T
```
.

-or-

`x` and `y` do not implement either the `IComparable<T>` generic interface or the `IComparable` interface.

#### Remarks
This method is a wrapper for the `Compare` method, so `obj` must be cast to the type specified by the generic argument `T` of the current instance. If it cannot be cast to `T`, an `ArgumentException` is thrown.

Comparing `null` with any reference type is allowed and does not generate an exception. When sorting, `null` is considered to be less than any other object.

#### Examples
The following example shows how to use the `Comparer<T>.System%23Collections%23IComparer%23Compare` method to compare two objects. This example is part of a larger example provided for the `Comparer<T>` class.

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/ComparerT/Overview/program.cs._
