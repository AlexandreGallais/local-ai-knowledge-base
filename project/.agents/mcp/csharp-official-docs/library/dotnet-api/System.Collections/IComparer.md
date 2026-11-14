---
title: "IComparer interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections/IComparer.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IComparer interface

Namespace: `System.Collections`

```csharp
public interface IComparer
```

Exposes a method that compares two objects.

#### Remarks
This interface is used in conjunction with the `Array.Sort` and `Array.BinarySearch` methods. It provides a way to customize the sort order of a collection. See the `IComparer.Compare` method for notes on parameters and return value.  Its generic equivalent is the `IComparer<T>` interface.

The default implementation of this interface is the `Comparer` class. For the generic version of this interface, see `IComparer<T>`.

#### Examples

The following example uses the `IComparer` interface to sort a string array. In this example, the `IComparer.Compare` method is implemented using the `CaseInsensitiveComparer` class to reverse the order of the contents of the array.

_Code sample not included: ~/snippets/csharp/System.Collections/IComparer/reverse.cs._

## IComparer.Compare(Object, Object) method

```csharp
public int Compare (object? x, object? y);
```

Compares two objects and returns a value indicating whether one is less than, equal to, or greater than the other.

Parameters:

- `x`: The first object to compare.
- `y`: The second object to compare.

Returns: A signed integer that indicates the relative values of `x` and `y`:   - If less than 0, `x` is less than `y`.   - If 0, `x` equals `y`.   - If greater than 0, `x` is greater than `y`.

Exceptions:

- `ArgumentException`: Neither `x` nor `y` implements the `IComparable` interface.

-or-

`x` and `y` are of different types and neither one can handle comparisons with the other.

#### Remarks
The preferred implementation is to use the `IComparable.CompareTo` method of one of the parameters.

Comparing `null` with any type is allowed and does not generate an exception when using `IComparable`. When sorting, `null` is considered to be less than any other object.

#### Examples

The following example uses the `IComparer` interface to sort a string array. In this example, the `IComparer.Compare` method is implemented using the `CaseInsensitiveComparer` class to reverse the order of the contents of the array.

_Code sample not included: ~/snippets/csharp/System.Collections/IComparer/reverse.cs._
