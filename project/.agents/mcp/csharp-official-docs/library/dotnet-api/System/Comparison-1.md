---
title: "Comparison<T> delegate"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Comparison`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Comparison<T> delegate

Namespace: `System`

```csharp
public delegate int Comparison<in T>(T x, T y) where T : allows ref struct;
```

Represents the method that compares two objects of the same type.

Parameters:

- `T`: The type of the objects to compare.
- `x`: The first object to compare.
- `y`: The second object to compare.

Returns: A signed integer that indicates the relative values of `x` and `y`, as shown in the following table.

-  Less than 0

: `x` is less than `y`.

-  0

: `x` equals `y`.

-  Greater than 0

: `x` is greater than `y`.

#### Remarks
This delegate is used by the `Sort<T>` method overload of the `Array` class and the `Sort` method overload of the `List<T>` class to sort the elements of an array or list.

#### Examples
The following code example demonstrates the use of the `Comparison<T>` delegate with the `Sort` method overload.

The code example defines an alternative comparison method for strings, named `CompareDinosByLength`. This method works as follows: First, the comparands are tested for `null`, and a null reference is treated as less than a non-null. Second, the string lengths are compared, and the longer string is deemed to be greater. Third, if the lengths are equal, ordinary string comparison is used.

A `List<T>` of strings is created and populated with four strings, in no particular order. The list also includes an empty string and a null reference. The list is displayed, sorted using a `Comparison<T>` generic delegate representing the `CompareDinosByLength` method, and displayed again.

_Code sample not included: ~/snippets/csharp/System/ComparisonT/Overview/source.cs._

The following example uses the `Comparison<T>` delegate to sort the elements of a collection of `CityInfo` objects. `CityInfo` is an application-defined class that contains information about a city and its population. The example defines three methods, `CompareByName`, `CompareByPopulation`, and `CompareByNames`, that offer three different ways of ordering the `CityInfo` objects. Each method is assigned to the `comparison` argument of the `Sort<T>` method.

_Code sample not included: ~/snippets/csharp/System/ComparisonT/Overview/comparisont1.cs._
