---
title: "Tuple<T1,T2,T3,T4,T5,T6,T7,TRest> class (part 1 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Tuple`8.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Tuple<T1,T2,T3,T4,T5,T6,T7,TRest> class

Namespace: `System`

```csharp
public class Tuple<T1,T2,T3,T4,T5,T6,T7,TRest> : IComparable, System.Collections.IStructuralComparable, System.Collections.IStructuralEquatable, System.Runtime.CompilerServices.ITuple
```

Represents an *n*-tuple, where *n* is 8 or greater.

Parameters:

- `T1`: The type of the tuple's first component.
- `T2`: The type of the tuple's second component.
- `T3`: The type of the tuple's third component.
- `T4`: The type of the tuple's fourth component.
- `T5`: The type of the tuple's fifth component.
- `T6`: The type of the tuple's sixth component.
- `T7`: The type of the tuple's seventh component.
- `TRest`: Any generic `Tuple` object that defines the types of the tuple's remaining components.

#### Remarks
A tuple is a data structure that has a specific number and sequence of values. The `Tuple<T1,T2,T3,T4,T5,T6,T7,T8>` class represents an *n*-tuple that has eight or more components.

You can instantiate a `Tuple<T1,T2,T3,T4,T5,T6,T7,T8>` object with exactly eight components by calling the static `Tuple.Create` method. The following example creates an 8-tuple (octuple) that contains prime numbers that are less than 20. Note that it uses type inference to determine the type of each component.

_Code sample not included: ~/snippets/csharp/System/Tuple/Overview/createntuple.cs._

You can also instantiate an n-tuple object with eight or more components by calling the `Tuple<T1,T2,T3,T4,T5,T6,T7,T8>.%23ctor` constructor. The following example uses the `Tuple<T1,T2,T3,T4,T5,T6,T7,T8>.%23ctor` constructor to create an 8-tuple that is equivalent to the tuple created in the previous example.

_Code sample not included: ~/snippets/csharp/System/TupleT1,T2,T3,T4,T5,T6,T7,TRest/Overview/octuple1.cs._

> **Note:**
>  To create an n-tuple with nine or more components, you must call the  `Tuple<T1,T2,T3,T4,T5,T6,T7,T8>.%23ctor` constructor. The static factory methods of the `Tuple` class do not support the creation of `Tuple` objects with more than eight components.

To instantiate an n-tuple that has eight or more components with the `Tuple<T1,T2,T3,T4,T5,T6,T7,T8>.%23ctor` constructor, you supply a generic `Tuple` object as the `rest` parameter to define the eighth through *n*th components of the tuple. By nesting generic `Tuple` objects in this way, you can create a tuple that has no practical limitation on the number of its components.

The following example creates a 17-tuple that contains population data for the city of Detroit, Michigan, for each national census from 1860 to 2000. The first component of the tuple is the city name. The second component is the start date of the data series, and the third component is the population at the start date. Each subsequent component provides the population at decade intervals. The 17-tuple is created by nesting a `Tuple<T1,T2,T3>` object inside a `Tuple<T1,T2,T3,T4,T5,T6,T7,T8>` object. (That is, the `Tuple<T1,T2,T3>` object is supplied as the value of the `rest` parameter in the `Tuple<T1,T2,T3,T4,T5,T6,T7,T8>` class constructor.) This `Tuple<T1,T2,T3,T4,T5,T6,T7,T8>` object is, in turn, nested in an outer `Tuple<T1,T2,T3,T4,T5,T6,T7,T8>` object. (That is, the `Tuple<T1,T2,T3,T4,T5,T6,T7,T8>` object is supplied as the value of the `rest` parameter in the outer `Tuple<T1,T2,T3,T4,T5,T6,T7,T8>` object's class constructor.)

_Code sample not included: ~/snippets/csharp/System/Tuple/Overview/example.cs._

You can retrieve the value of the tuple's first seven components by using the read-only `Tuple<T1,T2,T3,T4,T5,T6,T7>.Item1`, `Tuple<T1,T2,T3,T4,T5,T6,T7>.Item2`, `Tuple<T1,T2,T3,T4,T5,T6,T7>.Item3`, `Tuple<T1,T2,T3,T4,T5,T6,T7>.Item4`, `Tuple<T1,T2,T3,T4,T5,T6,T7>.Item5`, `Tuple<T1,T2,T3,T4,T5,T6,T7>.Item6`, and `Tuple<T1,T2,T3,T4,T5,T6,T7>.Item7` instance properties. Any additional components are nested and can be retrieved from the `Rest` property. In the previous example, the `Tuple<T1,T2,T3,T4,T5,T6,T7,T8>.Item1` through `Tuple<T1,T2,T3,T4,T5,T6,T7,T8>.Item7` properties retrieve the first through seventh components of the tuple. The eighth through fourteenth components are contained in the tuple that is nested at the second level, and are represented by the `Rest.Item1` through `Rest.Item7` properties. The fifteenth through seventeenth components are contained in the tuple that is nested at the third level, and are represented by the `Rest.Rest.Item1` though `Rest.Rest.Item3` properties.

Tuples are commonly used in four different ways:

- To represent a single set of data. For example, a tuple can represent a database record, and its components can represent individual fields of the record.

- To provide easy access to, and manipulation of, a data set.

- To return multiple values from a method without the use of `out` parameters (in C#) or `ByRef` parameters (in Visual Basic). For example, the previous example returns its computed statistics, along with the city name, in a `Tuple<T1,T2,T3,T4,T5,T6,T7>` object.

- To pass <example-value> values to a method through a single parameter. For example, the `Start` method has a single parameter that lets you supply one value to the method that the thread executes at startup. If you supply a `Tuple<T1,T2,T3,T4,T5,T6,T7>` object as the method argument, you can supply the thread's startup routine with seven items of data.

## Tuple<T1,T2,T3,T4,T5,T6,T7,TRest>.Tuple(T1, T2, T3, T4, T5, T6, T7, TRest) constructor

```csharp
public Tuple (T1 item1, T2 item2, T3 item3, T4 item4, T5 item5, T6 item6, T7 item7, TRest rest);
```

Initializes a new instance of the `Tuple<T1,T2,T3,T4,T5,T6,T7,T8>` class.

Parameters:

- `item1`: The value of the tuple's first component.
- `item2`: The value of the tuple's second component.
- `item3`: The value of the tuple's third component.
- `item4`: The value of the tuple's fourth component.
- `item5`: The value of the tuple's fifth component.
- `item6`: The value of the tuple's sixth component.
- `item7`: The value of the tuple's seventh component.
- `rest`: Any generic `Tuple` object that contains the values of the tuple's remaining components.

Exceptions:

- `ArgumentException`: `rest` is not a generic `Tuple` object.

#### Remarks
You can also use the static `Tuple.Create` method to instantiate an 8-tuple (octuple) object without having to explicitly specify the types of its components. The following example uses the `Tuple.Create` method to instantiate an 8-tuple object that contains prime numbers that are less than 20.

_Code sample not included: ~/snippets/csharp/System/Tuple/Overview/createntuple.cs._

This is equivalent to the following call to the `Tuple<T1,T2,T3,T4,T5,T6,T7>.%23ctor` class constructor.

_Code sample not included: ~/snippets/csharp/System/TupleT1,T2,T3,T4,T5,T6,T7,TRest/Overview/octuple1.cs._

However, the static `Tuple.Create` method cannot be used to create a tuple object with more than eight components.

When using the `Tuple<T1,T2,T3,T4,T5,T6,T7,T8>.%23ctor` constructor to create an n-tuple with eight or more components, you use the `rest` parameter to create a nested n-tuple that has from one to seven components. By using successive levels of nesting, you can create an n-tuple that has a virtually unlimited number of components. For example, to create a 25-tuple, you instantiate a `Tuple<T1,T2,T3,T4,T5,T6,T7,T8>` object with three levels of nesting, as follows:

- The outermost `Tuple<T1,T2,T3,T4,T5,T6,T7,T8>` object contains the first through seventh components. Its `Rest` property provides access to an `Tuple<T1,T2,T3,T4,T5,T6,T7,T8>` object at the first level of nesting.

- The outermost nested `Tuple<T1,T2,T3,T4,T5,T6,T7,T8>` object contains the eighth through fourteenth components, and its `Rest` property provides access to an `Tuple<T1,T2,T3,T4,T5,T6,T7,T8>` object at the second level of nesting.

- The `Tuple<T1,T2,T3,T4,T5,T6,T7,T8>` object at the second level of nesting contains the fifteenth through twenty-first  components, and its `Rest` property provides access to an `Tuple<T1,T2,T3,T4>` object at the third level of nesting.

- The innermost tuple is a `Tuple<T1,T2,T3,T4>` object that contains the twenty-second through twenty-fifth components.

#### Examples
The following example creates a 17-tuple that contains population data for the city of Detroit, Michigan, for each census from 1860 to 2000. The first component of the tuple is the city name. The second component is the start date of the series of data, and the third component is the population at the start date. Each subsequent component provides the population at decade intervals. The example uses two layers of nesting to create the 17-tuple: It defines a 7-tuple whose third through seventh components contain population data for 1860 through 1900, a nested 7-tuple that contains population data for 1910 through 1970, and an inner nested 3-tuple that contains population data for 1980 through 2000.

_Code sample not included: ~/snippets/csharp/System/Tuple/Overview/example.cs._

## Tuple<T1,T2,T3,T4,T5,T6,T7,TRest>.Item1 property

```csharp
public T1 Item1 { get; }
```

Gets the value of the current `Tuple<T1,T2,T3,T4,T5,T6,T7,T8>` object's first component.

Returns: The value of the current `Tuple<T1,T2,T3,T4,T5,T6,T7,T8>` object's first component.

#### Remarks
You can dynamically determine the type of the `Tuple<T1,T2,T3,T4,T5,T6,T7,T8>.Item1` component in one of two ways:

- By calling the `GetType` method on the value that is returned by the `Item1` property.

- By retrieving the `Type` object that represents the `Tuple<T1,T2,T3,T4,T5,T6,T7,T8>` object, and retrieving the first element from the array that is returned by its `Type.GetGenericArguments` method.

#### Examples
The following example creates a 17-tuple object that contains population data for the city of Detroit, Michigan, from 1860 to 2000. The first component of the 17-tuple is the city name. The example uses the `Item1` property to display the city name in the table header before displaying the population data.

_Code sample not included: ~/snippets/csharp/System/TupleT1,T2,T3,T4,T5,T6,T7,TRest/Item1/item1.cs._

## Tuple<T1,T2,T3,T4,T5,T6,T7,TRest>.Item2 property

```csharp
public T2 Item2 { get; }
```

Gets the value of the current `Tuple<T1,T2,T3,T4,T5,T6,T7,T8>` object's second component.

Returns: The value of the current `Tuple<T1,T2,T3,T4,T5,T6,T7,T8>` object's second component.

#### Remarks
You can dynamically determine the type of the `Tuple<T1,T2,T3,T4,T5,T6,T7,T8>.Item2` component in one of two ways:

- By calling the `GetType` method on the value that is returned by the `Item2` property.

- By retrieving the `Type` object that represents the `Tuple<T1,T2,T3,T4,T5,T6,T7,T8>` object, and retrieving the second element from the array that is returned by its `Type.GetGenericArguments` method.

#### Examples
The following example creates a 17-tuple object that contains population data for the city of Detroit, Michigan, from 1860 to 2000. The second component of the 17-tuple is the first year of the data series. The example assigns the value of the `Item2` property to a variable, and then uses that variable to represent the year whose data is displayed.

_Code sample not included: ~/snippets/csharp/System/TupleT1,T2,T3,T4,T5,T6,T7,TRest/Item1/item1.cs._

## Tuple<T1,T2,T3,T4,T5,T6,T7,TRest>.Item3 property

```csharp
public T3 Item3 { get; }
```

Gets the value of the current `Tuple<T1,T2,T3,T4,T5,T6,T7,T8>` object's third component.

Returns: The value of the current `Tuple<T1,T2,T3,T4,T5,T6,T7,T8>` object's third component.

#### Remarks
You can dynamically determine the type of the `Tuple<T1,T2,T3,T4,T5,T6,T7,T8>.Item3` component in one of two ways:

- By calling the `GetType` method on the value that is returned by the `Item3` property.

- By retrieving the `Type` object that represents the `Tuple<T1,T2,T3,T4,T5,T6,T7,T8>` object, and retrieving the third element from the array that is returned by its `Type.GetGenericArguments` method.

#### Examples
The following example creates a 17-tuple object that contains population data for the city of Detroit, Michigan, from 1860 to 2000. The third component of the 17-tuple is the population in 1860. The example uses the `Item3` property to display the population value and to calculate the annual rate of population change between 1860 and 1870.

_Code sample not included: ~/snippets/csharp/System/TupleT1,T2,T3,T4,T5,T6,T7,TRest/Item1/item1.cs._

## Tuple<T1,T2,T3,T4,T5,T6,T7,TRest>.Item4 property

```csharp
public T4 Item4 { get; }
```

Gets the value of the current `Tuple<T1,T2,T3,T4,T5,T6,T7,T8>` object's fourth component.

Returns: The value of the current `Tuple<T1,T2,T3,T4,T5,T6,T7,T8>` object's fourth component.

#### Remarks
You can dynamically determine the type of the `Tuple<T1,T2,T3,T4,T5,T6,T7,T8>.Item4` component in one of two ways:

- By calling the `GetType` method on the value that is returned by the `Item4` property.

- By retrieving the `Type` object that represents the `Tuple<T1,T2,T3,T4,T5,T6,T7,T8>` object, and retrieving the fourth element from the array that is returned by its `Type.GetGenericArguments` method.

#### Examples
The following example creates a 17-tuple object that contains population data for the city of Detroit, Michigan, from 1860 to 2000. The fourth component of the 17-tuple is the population in 1870. The example uses the `Item4` property to display the population value and to calculate the annual rate of population change between 1870 and 1880.

_Code sample not included: ~/snippets/csharp/System/TupleT1,T2,T3,T4,T5,T6,T7,TRest/Item1/item1.cs._

## Tuple<T1,T2,T3,T4,T5,T6,T7,TRest>.Item5 property

```csharp
public T5 Item5 { get; }
```

Gets the value of the current `Tuple<T1,T2,T3,T4,T5,T6,T7,T8>` object's fifth component.

Returns: The value of the current `Tuple<T1,T2,T3,T4,T5,T6,T7,T8>` object's fifth component.

#### Remarks
You can dynamically determine the type of the `Tuple<T1,T2,T3,T4,T5,T6,T7,T8>.Item5` component in one of two ways:

- By calling the `GetType` method on the value that is returned by the `Item5` property.

- By retrieving the `Type` object that represents the `Tuple<T1,T2,T3,T4,T5,T6,T7,T8>` object, and retrieving the fifth element from the array that is returned by its `Type.GetGenericArguments` method.

#### Examples
The following example creates a 17-tuple object that contains population data for the city of Detroit, Michigan, from 1860 to 2000. The fifth component of the 17-tuple is the population in 1880. The example uses the `Item5` property to display the population value and to calculate the annual rate of population change between 1880 and 1890.

_Code sample not included: ~/snippets/csharp/System/TupleT1,T2,T3,T4,T5,T6,T7,TRest/Item1/item1.cs._
