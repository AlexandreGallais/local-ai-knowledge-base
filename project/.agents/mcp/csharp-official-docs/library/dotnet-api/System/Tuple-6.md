---
title: "Tuple<T1,T2,T3,T4,T5,T6> class (part 1 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Tuple`6.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Tuple<T1,T2,T3,T4,T5,T6> class

Namespace: `System`

```csharp
public class Tuple<T1,T2,T3,T4,T5,T6> : IComparable, System.Collections.IStructuralComparable, System.Collections.IStructuralEquatable, System.Runtime.CompilerServices.ITuple
```

Represents a 6-tuple, or sextuple.

Parameters:

- `T1`: The type of the tuple's first component.
- `T2`: The type of the tuple's second component.
- `T3`: The type of the tuple's third component.
- `T4`: The type of the tuple's fourth component.
- `T5`: The type of the tuple's fifth component.
- `T6`: The type of the tuple's sixth component.

#### Remarks
A tuple is a data structure that has a specific number and sequence of values. The `Tuple<T1,T2,T3,T4,T5,T6>` class represents a 6-tuple, or sextuple, which is a tuple that has six components.

You can instantiate a `Tuple<T1,T2,T3,T4,T5,T6>` object by calling either the `Tuple<T1,T2,T3,T4,T5,T6>.%23ctor` or the static  `Create<T1,T2,T3,T4,T5,T6>` method. You can retrieve the value of the tuple's components by using the read-only `Tuple<T1,T2,T3,T4,T5,T6>.Item1`, `Tuple<T1,T2,T3,T4,T5,T6>.Item2`, `Tuple<T1,T2,T3,T4,T5,T6>.Item3`, `Tuple<T1,T2,T3,T4,T5,T6>.Item4`, `Tuple<T1,T2,T3,T4,T5,T6>.Item5`, and `Tuple<T1,T2,T3,T4,T5,T6>.Item6` instance properties.

Tuples are commonly used in four different ways:

- To represent a single set of data. For example, a tuple can represent a database record, and its components can represent individual fields of the record.

- To provide easy access to, and manipulation of, a data set. The following example defines a `Tuple<T1,T2,T3,T4,T5,T6>` object that contains population data for New York City for each census from 1960 through 2000. The sextuple is passed to the `ComputePopulationChange` method, which calculates the annual rate of change between censuses, as well as the annual rate of change for the entire 50 year period.

_Code sample not included: ~/snippets/csharp/System/TupleT1,T2,T3,T4,T5,T6/Overview/example1.cs._

- To return multiple values from a method without the use of `out` parameters (in C#) or `ByRef` parameters (in Visual Basic). For example, the previous example returns its computed statistics, along with the city name, in a `Tuple<T1,T2,T3,T4,T5,T6>` object.

- To pass <example-value> values to a method through a single parameter. For example, the `Start` method has a single parameter that lets you supply one value to the method that the thread executes at startup. If you supply a `Tuple<T1,T2,T3,T4,T5,T6>` object as the method argument, you can supply the thread's startup routine with six items of data.

## Tuple<T1,T2,T3,T4,T5,T6>.Tuple(T1, T2, T3, T4, T5, T6) constructor

```csharp
public Tuple (T1 item1, T2 item2, T3 item3, T4 item4, T5 item5, T6 item6);
```

Initializes a new instance of the `Tuple<T1,T2,T3,T4,T5,T6>` class.

Parameters:

- `item1`: The value of the tuple's first component.
- `item2`: The value of the tuple's second component.
- `item3`: The value of the tuple's third component.
- `item4`: The value of the tuple's fourth component.
- `item5`: The value of the tuple's fifth component.
- `item6`: The value of the tuple's sixth component.

#### Remarks
You can also use the static `Create<T1,T2,T3,T4,T5,T6>` method to instantiate a 6-tuple object without having to explicitly specify the types of its components. The following example uses the `Create<T1,T2,T3,T4,T5,T6>` method to instantiate a 6-tuple whose first component is of type `String` and whose remaining components are of type `Int32`.

_Code sample not included: ~/snippets/csharp/System/Tuple/Overview/create1.cs._

This is equivalent to the following call to the `Tuple<T1,T2,T3,T4,T5,T6>.%23ctor` class constructor.

_Code sample not included: ~/snippets/csharp/System/Tuple/Overview/create1.cs._

## Tuple<T1,T2,T3,T4,T5,T6>.Item1 property

```csharp
public T1 Item1 { get; }
```

Gets the value of the current `Tuple<T1,T2,T3,T4,T5,T6>` object's first component.

Returns: The value of the current `Tuple<T1,T2,T3,T4,T5,T6>` object's first component.

#### Remarks
You can dynamically determine the type of the `Tuple<T1,T2,T3,T4,T5,T6>.Item1` component in one of two ways:

- By calling the `GetType` method on the value that is returned by the `Item1` property.

- By retrieving the `Type` object that represents the `Tuple<T1,T2,T3,T4,T5,T6>` object, and retrieving the first element from the array that is returned by its `Type.GetGenericArguments` method.

#### Examples
The following example defines an array of `Tuple<T1,T2,T3,T4,T5,T6>` objects whose components contain population data for three U.S. cities (New York, Chicago, and Los Angeles) from 1960 through 2000. It then displays a table that lists the data. To display the city name, it retrieves the value of the `Item1` property for each `Tuple<T1,T2,T3,T4,T5,T6>` object.

_Code sample not included: ~/snippets/csharp/System/TupleT1,T2,T3,T4,T5,T6/Item1/item1.cs._

## Tuple<T1,T2,T3,T4,T5,T6>.Item2 property

```csharp
public T2 Item2 { get; }
```

Gets the value of the current `Tuple<T1,T2,T3,T4,T5,T6>` object's second component.

Returns: The value of the current `Tuple<T1,T2,T3,T4,T5,T6>` object's second component.

#### Remarks
You can dynamically determine the type of the `Tuple<T1,T2,T3,T4,T5,T6>.Item2` component in one of two ways:

- By calling the `GetType` method on the value that is returned by the `Item2` property.

- By retrieving the `Type` object that represents the `Tuple<T1,T2,T3,T4,T5,T6>` object, and retrieving the first element from the array that is returned by its `Type.GetGenericArguments` method.

#### Examples
The following example defines an array of `Tuple<T1,T2,T3,T4,T5,T6>` objects whose components contain population data for three U.S. cities (New York, Chicago, and Los Angeles) from 1960 through 2000. It then displays a table that lists the data. To display the population in 1960, it retrieves the value of the `Item2` property for each `Tuple<T1,T2,T3,T4,T5,T6>` object.

_Code sample not included: ~/snippets/csharp/System/TupleT1,T2,T3,T4,T5,T6/Item1/item1.cs._

## Tuple<T1,T2,T3,T4,T5,T6>.Item3 property

```csharp
public T3 Item3 { get; }
```

Gets the value of the current `Tuple<T1,T2,T3,T4,T5,T6>` object's third component.

Returns: The value of the current `Tuple<T1,T2,T3,T4,T5,T6>` object's third component.

#### Remarks
You can dynamically determine the type of the `Tuple<T1,T2,T3,T4,T5,T6>.Item3` component in one of two ways:

- By calling the `GetType` method on the value that is returned by the `Item3` property.

- By retrieving the `Type` object that represents the `Tuple<T1,T2,T3,T4,T5,T6>` object, and retrieving the first element from the array that is returned by its `Type.GetGenericArguments` method.

#### Examples
The following example defines an array of `Tuple<T1,T2,T3,T4,T5,T6>` objects whose components contain population data for three U.S. cities (New York, Chicago, and Los Angeles) from 1960 through 2000. It then displays a table that lists the data. To display the population in 1970, it retrieves the value of the `Item3` property for each `Tuple<T1,T2,T3,T4,T5,T6>` object.

_Code sample not included: ~/snippets/csharp/System/TupleT1,T2,T3,T4,T5,T6/Item1/item1.cs._

## Tuple<T1,T2,T3,T4,T5,T6>.Item4 property

```csharp
public T4 Item4 { get; }
```

Gets the value of the current `Tuple<T1,T2,T3,T4,T5,T6>` object's fourth component.

Returns: The value of the current `Tuple<T1,T2,T3,T4,T5,T6>` object's fourth component.

#### Remarks
You can dynamically determine the type of the `Tuple<T1,T2,T3,T4,T5,T6>.Item4` component in one of two ways:

- By calling the `GetType` method on the value that is returned by the `Item4` property.

- By retrieving the `Type` object that represents the `Tuple<T1,T2,T3,T4,T5,T6>` object, and retrieving the first element from the array that is returned by its `Type.GetGenericArguments` method.

#### Examples
The following example defines an array of `Tuple<T1,T2,T3,T4,T5,T6>` objects whose components contain population data for three U.S. cities (New York, Chicago, and Los Angeles) from 1960 through 2000. It then displays a table that lists the data. To display the population in 1980, it retrieves the value of the `Item4` property for each `Tuple<T1,T2,T3,T4,T5,T6>` object.

_Code sample not included: ~/snippets/csharp/System/TupleT1,T2,T3,T4,T5,T6/Item1/item1.cs._

## Tuple<T1,T2,T3,T4,T5,T6>.Item5 property

```csharp
public T5 Item5 { get; }
```

Gets the value of the current `Tuple<T1,T2,T3,T4,T5,T6>` object's fifth component.

Returns: The value of the current `Tuple<T1,T2,T3,T4,T5,T6>` object's fifth  component.

#### Remarks
You can dynamically determine the type of the `Tuple<T1,T2,T3,T4,T5,T6>.Item5` component in one of two ways:

- By calling the `GetType` method on the value that is returned by the `Item5` property.

- By retrieving the `Type` object that represents the `Tuple<T1,T2,T3,T4,T5,T6>` object, and retrieving the first element from the array that is returned by its `Type.GetGenericArguments` method.

#### Examples
The following example defines an array of `Tuple<T1,T2,T3,T4,T5,T6>` objects whose components contain population data for three U.S. cities (New York, Chicago, and Los Angeles) from 1960 through 2000. It then displays a table that lists the data. To display the population in 1990, it retrieves the value of the `Item5` property for each `Tuple<T1,T2,T3,T4,T5,T6>` object.

_Code sample not included: ~/snippets/csharp/System/TupleT1,T2,T3,T4,T5,T6/Item1/item1.cs._

## Tuple<T1,T2,T3,T4,T5,T6>.Item6 property

```csharp
public T6 Item6 { get; }
```

Gets the value of the current `Tuple<T1,T2,T3,T4,T5,T6>` object's sixth component.

Returns: The value of the current `Tuple<T1,T2,T3,T4,T5,T6>` object's sixth component.

#### Remarks
You can dynamically determine the type of the `Tuple<T1,T2,T3,T4,T5,T6>.Item6` component in one of two ways:

- By calling the `GetType` method on the value that is returned by the `Item6` property.

- By retrieving the `Type` object that represents the `Tuple<T1,T2,T3,T4,T5,T6>` object, and retrieving the first element from the array that is returned by its `Type.GetGenericArguments` method.

#### Examples
The following example defines an array of `Tuple<T1,T2,T3,T4,T5,T6>` objects whose components contain population data for three U.S. cities (New York, Chicago, and Los Angeles) from 1960 through 2000. It then displays a table that lists the data. To display the population in 2000, it retrieves the value of the `Item6` property for each `Tuple<T1,T2,T3,T4,T5,T6>` object.

_Code sample not included: ~/snippets/csharp/System/TupleT1,T2,T3,T4,T5,T6/Item1/item1.cs._

## Tuple<T1,T2,T3,T4,T5,T6>.System.Runtime.CompilerServices.ITuple.Item property

```csharp
object? System.Runtime.CompilerServices.ITuple.Item[int index] { get; }
```

Gets the value of the specified `Tuple` element.

Parameters:

- `index`: The index of the specified `Tuple` element. `index` can range from 0 to 5.

Returns: The value of the `Tuple` element at the specified position.

Exceptions:

- `IndexOutOfRangeException`: `index` is less than 0 or greater than 5.

#### Remarks
The `System%23Runtime%23CompilerServices%23ITuple%23Item` property is an explicit interface implementation. To call it, you must cast or convert the `Tuple<T1,T2,T3,T4,T5,T6>` object to an `ITuple` interface object.

## Tuple<T1,T2,T3,T4,T5,T6>.System.Runtime.CompilerServices.ITuple.Length property

```csharp
int System.Runtime.CompilerServices.ITuple.Length { get; }
```

Gets the number of elements in the `Tuple`.

Returns: 6, the number of elements in a `Tuple<T1,T2,T3,T4,T5,T6>` object.

#### Remarks
The `System%23Runtime%23CompilerServices%23ITuple%23Length` property is an explicit interface implementation. To call it, you must cast or convert the `Tuple<T1,T2,T3,T4,T5,T6>` object to an `ITuple` interface object.

## Tuple<T1,T2,T3,T4,T5,T6>.Equals(Object) method

```csharp
public override bool Equals (object? obj);
```

Returns a value that indicates whether the current `Tuple<T1,T2,T3,T4,T5,T6>` object is equal to a specified object.

Parameters:

- `obj`: The object to compare with this instance.

Returns: `true` if the current instance is equal to the specified object; otherwise, `false`.

#### Remarks
The `obj` parameter is considered to be equal to the current instance under the following conditions:

- It is a `Tuple<T1,T2,T3,T4,T5,T6>` object.

- Its six components are of the same types as the current instance.

- Its six components are equal to those of the current instance. Equality is determined by the default object equality comparer for each component.

#### Examples
The following example defines an array of sextuples that contain population data for Los Angeles and New York from 1960 to 2000. The first component of each sextuple identifies the city. The first, third, and fourth sextuples contain data for New York. The first sextuple is a duplicate of the fourth sextuple. The third sextuple identifies the city as "New York City" instead of "New York". As the example shows, only the fourth sextuple is equal to the first sextuple.

_Code sample not included: ~/snippets/csharp/System/TupleT1,T2,T3,T4,T5,T6/Equals/equals1.cs._

## Tuple<T1,T2,T3,T4,T5,T6>.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Returns the hash code for the current `Tuple<T1,T2,T3,T4,T5,T6>` object.

Returns: A 32-bit signed integer hash code.

To be added.
