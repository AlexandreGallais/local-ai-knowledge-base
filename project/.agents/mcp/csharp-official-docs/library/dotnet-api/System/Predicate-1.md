---
title: "Predicate<T> delegate"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Predicate`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Predicate<T> delegate

Namespace: `System`

```csharp
public delegate bool Predicate<in T>(T obj) where T : allows ref struct;
```

Represents the method that defines a set of criteria and determines whether the specified object meets those criteria.

Parameters:

- `T`: The type of the object to compare.
- `obj`: The object to compare against the criteria defined within the method represented by this delegate.

Returns: `true` if `obj` meets the criteria defined within the method represented by this delegate; otherwise, `false`.

#### Remarks
This delegate is used by several methods of the `Array` and `List<T>` classes to search for elements in the collection.

Typically, the `Predicate<T>` delegate is represented by a lambda expression. Because locally scoped variables are available to the lambda expression, it is easy to test for a condition that is not precisely known at compile time. This is simulated in the following example, which defines a `HockeyTeam` class that contains information about a National Hockey <example-value> team and the year in which it was founded. The example defines an array of integer values that represent years, and randomly assigns one element of the array to `foundedBeforeYear`, which is a variable that is locally scoped to the example's `Main` method. Because locally scoped variables are available to a lambda expression, the lambda expression passed to the `List<T>.FindAll` method is able to return a `HockeyTeam` object for each team founded on or before that year.

_Code sample not included: ~/snippets/csharp/System/PredicateT/Overview/predicate1.cs._

#### Examples
The following code example uses a `Predicate<T>` delegate with the `Array.Find` method to search an array of `Point` structures. The example explicitly defines a `Predicate<T>` delegate named `predicate` and assigns it a method named `FindPoints` that returns `true` if the product of the `Point.X` and `Point.Y` fields is greater than 100,000. Note that it is customary to use a lambda expression rather than to explicitly define a delegate of type `Predicate<T>`, as the second example illustrates.

_Code sample not included: ~/snippets/csharp/System/PredicateT/Overview/predicateex2.cs._

The following example is identical to the previous example, except that it uses a lambda expression to represent the `Predicate<T>` delegate.  Each element of the `points` array is passed to the lambda expression until the expression finds an element that meets the search criteria. In this case, the lambda expression returns `true` if the product of the X and Y fields is greater than 100,000.

_Code sample not included: ~/snippets/csharp/System/PredicateT/Overview/predicateex1.cs._
