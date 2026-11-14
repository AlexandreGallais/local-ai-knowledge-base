---
title: "Tuple<T1,T2,T3,T4> class (part 1 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Tuple`4.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Tuple<T1,T2,T3,T4> class

Namespace: `System`

```csharp
public class Tuple<T1,T2,T3,T4> : IComparable, System.Collections.IStructuralComparable, System.Collections.IStructuralEquatable, System.Runtime.CompilerServices.ITuple
```

Represents a 4-tuple, or quadruple.

Parameters:

- `T1`: The type of the tuple's first component.
- `T2`: The type of the tuple's second component.
- `T3`: The type of the tuple's third component.
- `T4`: The type of the tuple's fourth component.

#### Remarks
A tuple is a data structure that has a specific number and sequence of values. The `Tuple<T1,T2,T3,T4>` class represents a 4-tuple, or quadruple, which is a tuple that has four components.

You can instantiate a `Tuple<T1,T2,T3,T4>` object by calling either the `Tuple<T1,T2,T3,T4>.%23ctor` constructor or the static `Create<T1,T2,T3,T4>` method. You can retrieve the value of the tuple's components by using the read-only `Tuple<T1,T2,T3,T4>.Item1`, `Tuple<T1,T2,T3,T4>.Item2`, `Tuple<T1,T2,T3,T4>.Item3`, and `Tuple<T1,T2,T3,T4>.Item4` instance properties.

Tuples are commonly used in four different ways:

- To represent a single set of data. For example, a tuple can represent a database record, and its components can represent individual fields of the record.

- To provide easy access to, and manipulation of, a data set. The following example defines an array of `Tuple<T1,T2,T3,T4>` objects that contain the names of baseball pitchers, the number of innings they pitched, and the number of earned runs (runs that scored without fielding errors), and hits that they gave up. The array is passed to the `ComputeStatistics` method, which calculates each pitcher's earned run average (the average number of runs given up in a nine-inning game), and the average number of hits given up per inning. The method also uses these two averages to compute a hypothetical effectiveness average.

_Code sample not included: ~/snippets/csharp/System/TupleT1,T2,T3,T4/Overview/example1.cs._

- To return multiple values from a method without the use of `out` parameters (in C#) or `ByRef` parameters (in Visual Basic). For example, the previous example returns its computed statistics, along with the name of the pitcher, in an array of `Tuple<T1,T2,T3,T4>` objects.

- To pass <example-value> values to a method through a single parameter. For example, the `Start` method has a single parameter that lets you supply one value to the method that the thread executes at startup. If you supply a `Tuple<T1,T2,T3,T4>` object as the method argument, you can supply the thread's startup routine with four items of data.

## Tuple<T1,T2,T3,T4>.Tuple(T1, T2, T3, T4) constructor

```csharp
public Tuple (T1 item1, T2 item2, T3 item3, T4 item4);
```

Initializes a new instance of the `Tuple<T1,T2,T3,T4>` class.

Parameters:

- `item1`: The value of the tuple's first component.
- `item2`: The value of the tuple's second component.
- `item3`: The value of the tuple's third component.
- `item4`: The value of the tuple's fourth component.

#### Remarks
You can also use the static `Create<T1,T2,T3,T4>` method to instantiate a 4-tuple object without having to explicitly specify the types of its components. The following example uses the `Create<T1,T2,T3,T4>` method to instantiate a 4-tuple whose components are of type `String`, `Double`, `Double`, and `Double`.

_Code sample not included: ~/snippets/csharp/System/Tuple/Overview/create1.cs._

This is equivalent to the following call to the `Tuple<T1,T2,T3,T4>.%23ctor` class constructor.

_Code sample not included: ~/snippets/csharp/System/Tuple/Overview/create1.cs._

## Tuple<T1,T2,T3,T4>.Item1 property

```csharp
public T1 Item1 { get; }
```

Gets the value of the current `Tuple<T1,T2,T3,T4>` object's first component.

Returns: The value of the current `Tuple<T1,T2,T3,T4>` object's first component.

#### Remarks
You can dynamically determine the type of the `Tuple<T1,T2,T3,T4>.Item1` component in one of two ways:

- By calling the `GetType` method on the value that is returned by the `Item1` property.

- By retrieving the `Type` object that represents the `Tuple<T1,T2,T3,T4>` object, and retrieving the first element from the array that is returned by its `Type.GetGenericArguments` method.

#### Examples
The following example defines an array of `Tuple<T1,T2,T3,T4>` objects whose components contain the name of a city, a month of the year, and the average high and low temperatures for that month. It then retrieves and displays the value of each component.

_Code sample not included: ~/snippets/csharp/System/TupleT1,T2,T3,T4/Item1/item1.cs._

## Tuple<T1,T2,T3,T4>.Item2 property

```csharp
public T2 Item2 { get; }
```

Gets the value of the current `Tuple<T1,T2,T3,T4>` object's second component.

Returns: The value of the current `Tuple<T1,T2,T3,T4>` object's second component.

#### Remarks
You can dynamically determine the type of the `Tuple<T1,T2,T3,T4>.Item2` component in one of two ways:

- By calling the `GetType` method on the value that is returned by the `Item2` property.

- By retrieving the `Type` object that represents the `Tuple<T1,T2,T3,T4>` object, and retrieving the second element from the array that is returned by its `Type.GetGenericArguments` method.

#### Examples
The following example defines an array of `Tuple<T1,T2,T3,T4>` objects whose components contain the name of a city, a month of the year, and the average high and low temperatures for that month. It then retrieves and displays the value of each component.

_Code sample not included: ~/snippets/csharp/System/TupleT1,T2,T3,T4/Item1/item1.cs._

## Tuple<T1,T2,T3,T4>.Item3 property

```csharp
public T3 Item3 { get; }
```

Gets the value of the current `Tuple<T1,T2,T3,T4>` object's third component.

Returns: The value of the current `Tuple<T1,T2,T3,T4>` object's third component.

#### Remarks
You can dynamically determine the type of the `Tuple<T1,T2,T3,T4>.Item3` component in one of two ways:

- By calling the `GetType` method on the value that is returned by the `Item3` property.

- By retrieving the `Type` object that represents the `Tuple<T1,T2,T3,T4>` object, and retrieving the third element from the array that is returned by its `Type.GetGenericArguments` method.

#### Examples
The following example defines an array of `Tuple<T1,T2,T3,T4>` objects whose components contain the name of a city, a month of the year, and the average high and low temperatures for that month. It then retrieves and displays the value of each component.

_Code sample not included: ~/snippets/csharp/System/TupleT1,T2,T3,T4/Item1/item1.cs._

## Tuple<T1,T2,T3,T4>.Item4 property

```csharp
public T4 Item4 { get; }
```

Gets the value of the current `Tuple<T1,T2,T3,T4>` object's fourth component.

Returns: The value of the current `Tuple<T1,T2,T3,T4>` object's fourth component.

#### Remarks
You can dynamically determine the type of the `Tuple<T1,T2,T3,T4>.Item4` component in one of two ways:

- By calling the `GetType` method on the value that is returned by the `Item4` property.

- By retrieving the `Type` object that represents the `Tuple<T1,T2,T3,T4>` object, and retrieving the fourth element from the array that is returned by its `Type.GetGenericArguments` method.

#### Examples
The following example defines an array of `Tuple<T1,T2,T3,T4>` objects whose components contain the name of a city, a month of the year, and the average high and low temperatures for that month. It then retrieves and displays the value of each component.

_Code sample not included: ~/snippets/csharp/System/TupleT1,T2,T3,T4/Item1/item1.cs._

## Tuple<T1,T2,T3,T4>.System.Runtime.CompilerServices.ITuple.Item property

```csharp
object? System.Runtime.CompilerServices.ITuple.Item[int index] { get; }
```

Gets the value of the specified `Tuple` element.

Parameters:

- `index`: The index of the specified `Tuple` element. `index` can range from 0 to 3.

Returns: The value of the `Tuple` element at the specified position.

Exceptions:

- `IndexOutOfRangeException`: `index` is less than 0 or greater than 3.

#### Remarks
The `System%23Runtime%23CompilerServices%23ITuple%23Item` property is an explicit interface implementation. To call it, you must cast or convert the `Tuple<T1,T2,T3,T4>` object to an `ITuple` interface object.

## Tuple<T1,T2,T3,T4>.System.Runtime.CompilerServices.ITuple.Length property

```csharp
int System.Runtime.CompilerServices.ITuple.Length { get; }
```

Gets the number of elements in the `Tuple`.

Returns: 4, the number of elements in a `Tuple<T1,T2,T3,T4>` object.

#### Remarks
The `System%23Runtime%23CompilerServices%23ITuple%23Length` property is an explicit interface implementation. To call it, you must cast or convert the `Tuple<T1,T2,T3,T4>` object to an `ITuple` interface object.

## Tuple<T1,T2,T3,T4>.Equals(Object) method

```csharp
public override bool Equals (object? obj);
```

Returns a value that indicates whether the current `Tuple<T1,T2,T3,T4>` object is equal to a specified object.

Parameters:

- `obj`: The object to compare with this instance.

Returns: `true` if the current instance is equal to the specified object; otherwise, `false`.

#### Remarks
The `obj` parameter is considered to be equal to the current instance under the following conditions:

- It is a `Tuple<T1,T2,T3,T4>` object.

- Its four components are of the same types as the current instance.

- Its four components are equal to those of the current instance. Equality is determined by the default object equality comparer for each component.

#### Examples
The following example defines an array of `Tuple<T1,T2,T3,T4>` objects that provide data on temperatures at three times during a particular day. The `Equals` method is called to compare every `Tuple<T1,T2,T3,T4>` object with every other `Tuple<T1,T2,T3,T4>` object. The output illustrates that the `Equals` method returns `true` only when all four components of the `Tuple<T1,T2,T3,T4>` objects have equal values.

_Code sample not included: ~/snippets/csharp/System/TupleT1,T2,T3,T4/Equals/equals1.cs._

## Tuple<T1,T2,T3,T4>.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Returns the hash code for the current `Tuple<T1,T2,T3,T4>` object.

Returns: A 32-bit signed integer hash code.

To be added.

## Tuple<T1,T2,T3,T4>.System.Collections.IStructuralComparable.CompareTo(Object, IComparer) method

```csharp
int IStructuralComparable.CompareTo (object other, System.Collections.IComparer comparer);
```

Compares the current `Tuple<T1,T2,T3,T4>` object to a specified object by using a specified comparer and returns an integer that indicates whether the current object is before, after, or in the same position as the specified object in the sort order.

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

- `ArgumentException`: `other` is not a `Tuple<T1,T2,T3,T4>` object.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `Tuple<T1,T2,T3,T4>` instance is cast to an `IStructuralComparable` interface.

Although this method can be called directly, it is most commonly called by collection sorting methods that include `IComparer` parameters to order the members of a collection. For example, it is called by the `Sort` method and the `SortedList.Add` method of a `SortedList` object that is instantiated by using the `%23ctor` constructor.

> **Caution:**
>  The `System%23Collections%23IStructuralComparable%23CompareTo` method is intended for use in sorting operations. It should not be used when the primary purpose of a comparison is to determine whether two objects are equal. To determine whether two objects are equal, call the `System%23Collections%23IStructuralEquatable%23Equals` method.

#### Examples
The following example creates an array of `Tuple<T1,T2,T3,T4>` objects that contain statistical data about baseball pitchers. The data items include the name of the pitcher, the number of innings pitched, the pitcher's earned run average (the average number of runs a pitcher allows per game), and the number of hits the pitcher has given up. The example displays the component of each tuple in the array in unsorted order, sorts the array, and then calls `Tuple<T1,T2,T3,T4>.ToString` to display the value of each tuple in sorted order. To sort the array, the example defines a generic `PitcherComparer` class that implements the `IComparer` interface and sorts the `Tuple<T1,T2,T3,T4>` objects in ascending order by the value of their third component (the earned run average) rather than their first component. Note that the example does not directly call the `System%23Collections%23IStructuralComparable%23CompareTo` method. This method is called implicitly by the `Sort` method for each element in the array.

_Code sample not included: ~/snippets/csharp/System/TupleT1,T2,T3,T4/System.Collections.IStructuralComparable.CompareTo/compareto2.cs._
