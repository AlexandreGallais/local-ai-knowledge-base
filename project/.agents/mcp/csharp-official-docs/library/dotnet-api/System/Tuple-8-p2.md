---
title: "Tuple<T1,T2,T3,T4,T5,T6,T7,TRest> class (part 2 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Tuple`8.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Tuple<T1,T2,T3,T4,T5,T6,T7,TRest> class (part 2 of 3)

## Tuple<T1,T2,T3,T4,T5,T6,T7,TRest>.Item6 property

```csharp
public T6 Item6 { get; }
```

Gets the value of the current `Tuple<T1,T2,T3,T4,T5,T6,T7,T8>` object's sixth component.

Returns: The value of the current `Tuple<T1,T2,T3,T4,T5,T6,T7,T8>` object's sixth component.

#### Remarks
You can dynamically determine the type of the `Tuple<T1,T2,T3,T4,T5,T6,T7,T8>.Item6` component in one of two ways:

- By calling the `GetType` method on the value that is returned by the `Item6` property.

- By retrieving the `Type` object that represents the `Tuple<T1,T2,T3,T4,T5,T6,T7,T8>` object, and retrieving the sixth element from the array that is returned by its `Type.GetGenericArguments` method.

#### Examples
The following example creates a 17-tuple object that contains population data for the city of Detroit, Michigan, from 1860 to 2000. The sixth component of the 17-tuple is the population in 1890. The example uses the `Item6` property to display the population value and to calculate the annual rate of population change between 1890 and 1900.

_Code sample not included: ~/snippets/csharp/System/TupleT1,T2,T3,T4,T5,T6,T7,TRest/Item1/item1.cs._

## Tuple<T1,T2,T3,T4,T5,T6,T7,TRest>.Item7 property

```csharp
public T7 Item7 { get; }
```

Gets the value of the current `Tuple<T1,T2,T3,T4,T5,T6,T7,T8>` object's seventh component.

Returns: The value of the current `Tuple<T1,T2,T3,T4,T5,T6,T7,T8>` object's seventh component.

#### Remarks
You can dynamically determine the type of the `Tuple<T1,T2,T3,T4,T5,T6,T7,T8>.Item7` component in one of two ways:

- By calling the `GetType` method on the value that is returned by the `Item7` property.

- By retrieving the `Type` object that represents the `Tuple<T1,T2,T3,T4,T5,T6,T7,T8>` object, and retrieving the seventh element from the array that is returned by its `Type.GetGenericArguments` method.

#### Examples
The following example creates a 17-tuple object that contains population data for the city of Detroit, Michigan, from 1860 to 2000. The seventh component of the 17-tuple is the population in 1900. The example uses the `Item7` property to display the population value and to calculate the annual rate of population change between 1900 and 1910.

_Code sample not included: ~/snippets/csharp/System/TupleT1,T2,T3,T4,T5,T6,T7,TRest/Item1/item1.cs._

## Tuple<T1,T2,T3,T4,T5,T6,T7,TRest>.Rest property

```csharp
public TRest Rest { get; }
```

Gets the current `Tuple<T1,T2,T3,T4,T5,T6,T7,T8>` object's remaining components.

Returns: The value of the current `Tuple<T1,T2,T3,T4,T5,T6,T7,T8>` object's remaining components.

#### Remarks
The `Rest` property returns a nested `Tuple` object that allows access to the eighth though *n*th components of the tuple. Depending on the total number of components in the tuple, the values of the eighth through fourteenth components can be retrieved from the nested `Tuple` object's `Tuple<T1,T2,T3,T4,T5,T6,T7,T8>.Item1` through `Tuple<T1,T2,T3,T4,T5,T6,T7,T8>.Item7` properties. You can then use the `Rest` property of a nested `Tuple<T1,T2,T3,T4,T5,T6,T7,T8>` object to retrieve the `Tuple` object at the next level of nesting.

You can dynamically determine the number of components in a nested `Tuple` object that is returned by the `Rest` property by extracting the digit from its type name. The following example provides an illustration.

#### Examples
The following example creates a 17-tuple object that contains population data for the city of Detroit, Michigan, from 1860 to 2000. The seventh component of the 17-tuple is the population in 1900. The example uses the `Rest` property to retrieve the values of the eighth through fourteenth components, and it uses the `Rest` property of the nested `Tuple<T1,T2,T3,T4,T5,T6,T7,T8>` object to retrieve the values of the remaining components.

_Code sample not included: ~/snippets/csharp/System/TupleT1,T2,T3,T4,T5,T6,T7,TRest/Item1/item1.cs._

## Tuple<T1,T2,T3,T4,T5,T6,T7,TRest>.System.Runtime.CompilerServices.ITuple.Item property

```csharp
object? System.Runtime.CompilerServices.ITuple.Item[int index] { get; }
```

Gets the value of the specified `Tuple` element.

Parameters:

- `index`: The index of the specified `Tuple` element. `index` can range from 0 for `Item1` to one less than the number of elements in the `Tuple`.

Returns: The value of the `Tuple` element at the specified position.

Exceptions:

- `IndexOutOfRangeException`: `index` is less than 0.

-or-

`index` is greater than or equal to `Tuple<T1,T2,T3,T4,T5,T6,T7,T8>.System#Runtime#CompilerServices#ITuple#Length`.

#### Remarks
The `System%23Runtime%23CompilerServices%23ITuple%23Item` property is an explicit interface implementation. To call it, you must cast or convert the `Tuple<T1,T2,T3,T4,T5,T6,T7,T8>` object to an `ITuple` interface object.

## Tuple<T1,T2,T3,T4,T5,T6,T7,TRest>.System.Runtime.CompilerServices.ITuple.Length property

```csharp
int System.Runtime.CompilerServices.ITuple.Length { get; }
```

Gets the number of elements in the `Tuple`.

Returns: The number of elements in the `Tuple`.

#### Remarks
The `System%23Runtime%23CompilerServices%23ITuple%23Length` property is an explicit interface implementation. To call it, you must cast or convert the `Tuple<T1,T2,T3,T4,T5,T6,T7,T8>` type to an `ITuple` interface object.

## Tuple<T1,T2,T3,T4,T5,T6,T7,TRest>.Equals(Object) method

```csharp
public override bool Equals (object? obj);
```

Returns a value that indicates whether the current `Tuple<T1,T2,T3,T4,T5,T6,T7,T8>` object is equal to a specified object.

Parameters:

- `obj`: The object to compare with this instance.

Returns: `true` if the current instance is equal to the specified object; otherwise, `false`.

#### Remarks
The `obj` parameter is considered to be equal to the current instance if it meets all the following conditions:

- It is a `Tuple<T1,T2,T3,T4,T5,T6,T7,T8>` object.

- It has the same total number of components that are of the same types as the current instance.

- Its components (including its nested components) are equal to those of the current instance. Equality is determined by the default equality comparer for each component.

#### Examples
The following example defines five `Tuple<T1,T2,T3,T4,T5,T6,T7,T8>` objects that contain prime numbers. It then compares the first object with each of the remaining objects. As the output shows, only the first and the last `Tuple<T1,T2,T3,T4,T5,T6,T7,T8>` objects are equal, because they have an identical number of components with identical values.

_Code sample not included: ~/snippets/csharp/System/TupleT1,T2,T3,T4,T5,T6,T7,TRest/Equals/equals1.cs._

## Tuple<T1,T2,T3,T4,T5,T6,T7,TRest>.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Calculates the hash code for the current `Tuple<T1,T2,T3,T4,T5,T6,T7,T8>` object.

Returns: A 32-bit signed integer hash code.

To be added.

## Tuple<T1,T2,T3,T4,T5,T6,T7,TRest>.System.Collections.IStructuralComparable.CompareTo(Object, IComparer) method

```csharp
int IStructuralComparable.CompareTo (object other, System.Collections.IComparer comparer);
```

Compares the current `Tuple<T1,T2,T3,T4,T5,T6,T7,T8>` object to a specified object by using a specified comparer and returns an integer that indicates whether the current object is before, after, or in the same position as the specified object in the sort order.

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

- `ArgumentException`: `other` is not a `Tuple<T1,T2,T3,T4,T5,T6,T7,T8>` object.

#### Remarks
This member is an explicit interface implementation. It can be used only when the `Tuple<T1,T2,T3,T4,T5,T6,T7,T8>` instance is cast to an `IStructuralComparable` interface.

This method lets you define customized comparisons of `Tuple<T1,T2,T3,T4,T5,T6,T7,T8>` objects. For example, you can use this method to order `Tuple<T1,T2,T3,T4,T5,T6,T7,T8>` objects based on the value of a specific component.

Although this method can be called directly, it is most commonly called by collection-sorting methods that include `IComparer` parameters to order the members of a collection. For example, it is called by the `Sort` method and the `SortedList.Add` method of a `SortedList` object that is instantiated by using the `%23ctor` constructor.

> **Caution:**
>  The `Tuple<T1,T2,T3,T4,T5,T6,T7,T8>.System%23Collections%23IStructuralComparable%23CompareTo` method is intended for use in sorting operations. It should not be used when the primary purpose of a comparison is to determine whether two objects are equal. To determine whether two objects are equal, call the `Tuple<T1,T2,T3,T4,T5,T6,T7,T8>.System%23Collections%23IStructuralEquatable%23Equals` method.

#### Examples
The following example creates an array of `Tuple<T1,T2,T3,T4,T5,T6,T7,T8>` objects that contains population data for four U.S. cities from 1940 to 2000. The octuple's first component is the city name. The remaining six components represent the population at 10-year intervals from 1940 to 2000.

The `PopulationComparer` class provides an `IComparer` implementation that allows the array of octuples to be sorted by any one of its components. Two values are provided to the `PopulationComparer` class in its constructor: The position of the component that defines the sort order, and a `Boolean` value that indicates whether the tuple objects should be sorted in ascending or descending order.

The example then displays the elements in the array in unsorted order, sorts them by the third component (the population in 1950) and displays them, and then sorts them by the eighth component (the population in 2000) and displays them.

_Code sample not included: ~/snippets/csharp/System/TupleT1,T2,T3,T4,T5,T6,T7,TRest/System.Collections.IStructuralComparable.CompareTo/compareto2.cs._

## Tuple<T1,T2,T3,T4,T5,T6,T7,TRest>.System.Collections.IStructuralEquatable.Equals(Object, IEqualityComparer) method

```csharp
bool IStructuralEquatable.Equals (object other, System.Collections.IEqualityComparer comparer);
```

Returns a value that indicates whether the current `Tuple<T1,T2,T3,T4,T5,T6,T7,T8>` object is equal to a specified object based on a specified comparison method.

Parameters:

- `other`: The object to compare with this instance.
- `comparer`: An object that defines the method to use to evaluate whether the two objects are equal.

Returns: `true` if the current instance is equal to the specified object; otherwise, `false`.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `Tuple<T1,T2,T3,T4,T5,T6,T7,T8>` instance is cast to an `IStructuralEquatable` interface.

The `IEqualityComparer.Equals` implementation is called only if `other` is not `null`, and if it can be successfully cast (in C#) or converted (in Visual Basic) to a `Tuple<T1,T2,T3,T4,T5,T6,T7,T8>` object that has the same total number of components (including those in nested `Tuple` objects) of the same types as the current instance. The `System%23Collections%23IStructuralEquatable%23Equals` method first passes the `Tuple<T1,T2,T3,T4,T5,T6,T7,T8>.Item1` values of the `Tuple<T1,T2,T3,T4,T5,T6,T7,T8>` objects to be compared to the `IEqualityComparer.Equals` implementation. If this method call returns `true`, the method is called again and passed the `Tuple<T1,T2,T3,T4,T5,T6,T7,T8>.Item2` values of the two `Tuple<T1,T2,T3,T4,T5,T6,T7,T8>` objects. This continues until the method call returns `false` when it compares a specific pair of values, or the two `Tuple<T1,T2,T3,T4,T5,T6,T7,T8>.Rest` values are passed to the method.

## Tuple<T1,T2,T3,T4,T5,T6,T7,TRest>.System.Collections.IStructuralEquatable.GetHashCode(IEqualityComparer) method

```csharp
int IStructuralEquatable.GetHashCode (System.Collections.IEqualityComparer comparer);
```

Calculates the hash code for the current `Tuple<T1,T2,T3,T4,T5,T6,T7,T8>` object by using a specified computation method.

Parameters:

- `comparer`: An object whose `IEqualityComparer.GetHashCode` method calculates the hash code of the current `Tuple<T1,T2,T3,T4,T5,T6,T7,T8>` object.

Returns: A 32-bit signed integer hash code.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `Tuple<T1,T2,T3,T4,T5,T6,T7,T8>` instance is cast to an `IStructuralEquatable` interface.

The method simply wraps a call to the `comparer` object's `IEqualityComparer.GetHashCode` implementation.

The algorithm used to compute the hash code should return the same hash code for two `Tuple<T1,T2,T3,T4,T5,T6,T7,T8>` objects that are considered to be equal.
