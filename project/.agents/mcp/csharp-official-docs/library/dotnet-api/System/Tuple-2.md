---
title: "Tuple<T1,T2> class (part 1 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Tuple`2.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Tuple<T1,T2> class

Namespace: `System`

```csharp
public class Tuple<T1,T2> : IComparable, System.Collections.IStructuralComparable, System.Collections.IStructuralEquatable, System.Runtime.CompilerServices.ITuple
```

Represents a 2-tuple, or pair.

Parameters:

- `T1`: The type of the tuple's first component.
- `T2`: The type of the tuple's second component.

#### Remarks
A tuple is a data structure that has a specific number and sequence of values. The `Tuple<T1,T2>` class represents a 2-tuple, or pair, which is a tuple that has two components. A 2-tuple is similar to a `KeyValuePair<T1,T2>` structure.

You can instantiate a `Tuple<T1,T2>` object by calling either the `Tuple<T1,T2>.%23ctor` constructor or the static `Create<T1,T2>` method. You can retrieve the values of the tuple's components by using the read-only `Tuple<T1,T2>.Item1` and `Tuple<T1,T2>.Item2` instance properties.

Tuples are commonly used in four different ways:

- To represent a single set of data. For example, a tuple can represent a record in a database, and its components can represent that record's fields.

- To provide easy access to, and manipulation of, a data set. The following example defines an array of `Tuple<T1,T2>` objects that contain the names of students and their corresponding test scores. It then iterates the array to calculate the mean test score.

_Code sample not included: ~/snippets/csharp/System/TupleT1,T2/Overview/example1.cs._

- To return multiple values from a method without the use of `out` parameters (in C#) or `ByRef` parameters (in Visual Basic). For example, the following example uses a `Tuple<T1,T2>` object to return the quotient and the remainder that result from integer division.

_Code sample not included: ~/snippets/csharp/System/TupleT1,T2/Overview/item1.cs._

- To pass <example-value> values to a method through a single parameter. For example, the `Start` method has a single parameter that lets you supply one value to the method that the thread executes at startup. If you supply a `Tuple<T1,T2>` object as the method argument, you can supply the thread's startup routine with two items of data.

## Tuple<T1,T2>.Tuple(T1, T2) constructor

```csharp
public Tuple (T1 item1, T2 item2);
```

Initializes a new instance of the `Tuple<T1,T2>` class.

Parameters:

- `item1`: The value of the tuple's first component.
- `item2`: The value of the tuple's second component.

#### Remarks
You can also use the static `Create<T1,T2>` method to instantiate a 2-tuple object without having to explicitly specify the types of its components. The following example uses the `Create<T1,T2>` method to instantiate a 2-tuple whose components are of type `String` and `Double`.

_Code sample not included: ~/snippets/csharp/System/Tuple/Overview/create1.cs._

This is equivalent to the following call to the `Tuple<T1,T2>.%23ctor` class constructor.

_Code sample not included: ~/snippets/csharp/System/Tuple/Overview/create1.cs._

## Tuple<T1,T2>.Item1 property

```csharp
public T1 Item1 { get; }
```

Gets the value of the current `Tuple<T1,T2>` object's first component.

Returns: The value of the current `Tuple<T1,T2>` object's first component.

#### Remarks
You can dynamically determine the type of the `Tuple<T1,T2>.Item1` component in one of two ways:

- By calling the `GetType` method on the value that is returned by the `Item1` property.

- By retrieving the `Type` object that represents the `Tuple<T1,T2>` object, and retrieving the first element from the array that is returned by its `Type.GetGenericArguments` method.

#### Examples
The example illustrates the use of the `Tuple<T1,T2>.Item1` and `Tuple<T1,T2>.Item2` properties to define a method that returns multiple values in the form of a 2-tuple.

_Code sample not included: ~/snippets/csharp/System/TupleT1,T2/Overview/item1.cs._

## Tuple<T1,T2>.Item2 property

```csharp
public T2 Item2 { get; }
```

Gets the value of the current `Tuple<T1,T2>` object's second component.

Returns: The value of the current `Tuple<T1,T2>` object's second component.

#### Remarks
You can dynamically determine the type of the `Tuple<T1,T2>.Item2` component in one of two ways:

- By calling the `GetType` method on the value that is returned by the `Item2` property.

- By retrieving the `Type` object that represents the `Tuple<T1,T2>` object, and retrieving the second element from the array that is returned by its `Type.GetGenericArguments` method.

#### Examples
The example illustrates the use of the `Tuple<T1,T2>.Item1` and `Tuple<T1,T2>.Item2` properties to define a method that returns multiple values in the form of a 2-tuple.

_Code sample not included: ~/snippets/csharp/System/TupleT1,T2/Overview/item1.cs._

## Tuple<T1,T2>.System.Runtime.CompilerServices.ITuple.Item property

```csharp
object? System.Runtime.CompilerServices.ITuple.Item[int index] { get; }
```

Gets the value of the specified `Tuple` element.

Parameters:

- `index`: The index of the specified `Tuple` element. `index` can range from 0 to 1.

Returns: The value of the `Tuple` element at the specified position.

Exceptions:

- `IndexOutOfRangeException`: `index` is less than 0 or greater than 1.

#### Remarks
The `System%23Runtime%23CompilerServices%23ITuple%23Item` property is an explicit interface implementation. To call it, you must cast or convert the `Tuple<T1,T2>` object to an `ITuple` interface object.

## Tuple<T1,T2>.System.Runtime.CompilerServices.ITuple.Length property

```csharp
int System.Runtime.CompilerServices.ITuple.Length { get; }
```

Gets the number of elements in the `Tuple`.

Returns: 2, the number of elements in a `Tuple<T1,T2>` object.

#### Remarks
The `System%23Runtime%23CompilerServices%23ITuple%23Length` property is an explicit interface implementation. To call it, you must cast or convert the `Tuple<T1,T2>` object to an `ITuple` interface object.

## Tuple<T1,T2>.Equals(Object) method

```csharp
public override bool Equals (object? obj);
```

Returns a value that indicates whether the current `Tuple<T1,T2>` object is equal to a specified object.

Parameters:

- `obj`: The object to compare with this instance.

Returns: `true` if the current instance is equal to the specified object; otherwise, `false`.

#### Remarks
The `obj` parameter is considered to be equal to the current instance under the following conditions:

- It is a `Tuple<T1,T2>` object.

- Its two components are of the same types as the current instance.

- Its two components are equal to those of the current instance. Equality is determined by the default object equality comparer for each component.

#### Examples
The following example calls the `Equals` method to determine whether any of the objects in an array of `Tuple<T1,T2>` objects are equal to one another. The output reflects the fact that the `Equals` method returns `true` when comparing `Tuple<T1,T2>` objects whose components have equal values.

_Code sample not included: ~/snippets/csharp/System/TupleT1,T2/Equals/equals1.cs._

## Tuple<T1,T2>.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Returns the hash code for the current `Tuple<T1,T2>` object.

Returns: A 32-bit signed integer hash code.

To be added.

## Tuple<T1,T2>.System.Collections.IStructuralComparable.CompareTo(Object, IComparer) method

```csharp
int IStructuralComparable.CompareTo (object other, System.Collections.IComparer comparer);
```

Compares the current `Tuple<T1,T2>` object to a specified object by using a specified comparer, and returns an integer that indicates whether the current object is before, after, or in the same position as the specified object in the sort order.

Parameters:

- `other`: An object to compare with the current instance.
- `comparer`: An object that provides custom rules for comparison.

Returns: A signed integer that indicates the relative position of this instance and `other` in the sort order, as shown in the following table.

-  A negative integer

:  This instance precedes `other`.

-  Zero

:  This instance and `other` have the same position in the sort order.

-  A positive integer

:  This instance follows `other`.

Exceptions:

- `ArgumentException`: `other` is not a `Tuple<T1,T2>` object.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `Tuple<T1,T2>` instance is cast to an `IStructuralComparable` interface.

Although this method can be called directly, it is most commonly called by collection sorting methods that include `IComparer` parameters to order the members of a collection. For example, it is called by the `Sort` method and the `SortedList.Add` method of a `SortedList` object that is instantiated by using the `%23ctor` constructor.

> **Caution:**
>  The `Tuple<T1,T2>.System%23Collections%23IStructuralComparable%23CompareTo` method is intended for use in sorting operations. It should not be used when the primary purpose of a comparison is to determine whether two objects are equal. To determine whether two objects are equal, call the `Tuple<T1,T2>.System%23Collections%23IStructuralEquatable%23Equals` method.

#### Examples
The following example creates an array of `Tuple<T1,T2>` objects that consist of a student's name and test score. It displays the component of each tuple in the array in unsorted order, sorts the array, and then calls `Tuple<T1,T2>.ToString` to display the value of each tuple in sorted order. To sort the array, the example defines a generic `ScoreComparer` class that implements the `IComparer` interface and sorts the `Tuple<T1,T2>` objects in ascending order by the value of their second component rather than their first component. Note that the example does not directly call the `Tuple<T1,T2>.System%23Collections%23IStructuralComparable%23CompareTo` method. This method is called implicitly by the `Sort` method for each element in the array.

_Code sample not included: ~/snippets/csharp/System/TupleT1,T2/System.Collections.IStructuralComparable.CompareTo/compareto2.cs._

## Tuple<T1,T2>.System.Collections.IStructuralEquatable.Equals(Object, IEqualityComparer) method

```csharp
bool IStructuralEquatable.Equals (object other, System.Collections.IEqualityComparer comparer);
```

Returns a value that indicates whether the current `Tuple<T1,T2>` object is equal to a specified object based on a specified comparison method.

Parameters:

- `other`: The object to compare with this instance.
- `comparer`: An object that defines the method to use to evaluate whether the two objects are equal.

Returns: `true` if the current instance is equal to the specified object; otherwise, `false`.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `Tuple<T1,T2>` instance is cast to an `IStructuralEquatable` interface.

The `Tuple<T1,T2>.System%23Collections%23IStructuralEquatable%23Equals` implementation is called only if `other` is not `null`, and if it can be successfully cast (in C#) or converted (in Visual Basic) to a `Tuple<T1,T2>` object whose components are of the same types as the current instance. The `Tuple<T1,T2>.System%23Collections%23IStructuralEquatable%23Equals` method first passes the `Tuple<T1,T2>.Item1` values of the `Tuple<T1,T2>` objects to be compared to the `IEqualityComparer.Equals` implementation. If this method call returns `true`, the method is called again and passed the `Tuple<T1,T2>.Item2` values of the two `Tuple<T1,T2>` objects.

#### Examples
The following example defines an `Item2Comparer` class that implements the `IEqualityComparer` interface and changes the way in which `Tuple<T1,T2>` objects are evaluated for equality. The method always returns `true` when it is passed the `Item1` property values of two `Tuple<T1,T2>` objects, and it calls the `Tuple<T1,T2>.System%23Collections%23IStructuralEquatable%23Equals` method to evaluate their `Item2` property values. As a result, the method tests for equality based only on the value of the `Item2` property. The output illustrates the result for a data set of `Tuple<T1,T2>` objects that record the names of runners and the distances that they ran.

_Code sample not included: ~/snippets/csharp/System/TupleT1,T2/Equals/equals2.cs._

## Tuple<T1,T2>.System.Collections.IStructuralEquatable.GetHashCode(IEqualityComparer) method

```csharp
int IStructuralEquatable.GetHashCode (System.Collections.IEqualityComparer comparer);
```

Calculates the hash code for the current `Tuple<T1,T2>` object by using a specified computation method.

Parameters:

- `comparer`: An object whose `IEqualityComparer.GetHashCode` method calculates the hash code of the current `Tuple<T1,T2>` object.

Returns: A 32-bit signed integer hash code.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `Tuple<T1,T2>` instance is cast to an `IStructuralEquatable` interface.

The method simply wraps a call to the `comparer` object's `IEqualityComparer.GetHashCode` implementation.

The algorithm used to compute the hash code should return the same hash code for two `Tuple<T1,T2>` objects that are considered to be equal.
