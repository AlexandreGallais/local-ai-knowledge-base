---
title: "Tuple class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Tuple.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Tuple class

Namespace: `System`

```csharp
public static class Tuple
```

Provides static methods for creating tuple objects.

#### Remarks
A tuple is a data structure that has a specific number and sequence of elements. An example of a tuple is a data structure with three elements (known as a 3-tuple or triple) that is used to store an identifier such as a person's name in the first element, a year in the second element, and the person's income for that year in the third element. .NET directly supports tuples with one to seven elements. In addition, you can create tuples of eight or more elements by nesting tuple objects in the `Rest` property of a `Tuple<T1,T2,T3,T4,T5,T6,T7,T8>` object.

Tuples are commonly used in four ways:

- To represent a single set of data. For example, a tuple can represent a database record, and its components can represent individual fields of the record.
- To provide easy access to, and manipulation of, a data set.
- To return multiple values from a method without using `out` parameters (in C#) or `ByRef` parameters (in Visual Basic).
- To pass <example-value> values to a method through a single parameter. For example, the `Start` method has a single parameter that lets you supply one value to the method that the thread executes at startup time. If you supply a `Tuple<T1,T2,T3>` object as the method argument, you can supply the thread's startup routine with three items of data.

The `Tuple` class does not itself represent a tuple. Instead, it is a class that provides static methods for creating instances of the tuple types that are supported by .NET. It provides helper methods that you can call to instantiate tuple objects without having to explicitly specify the type of each tuple component.

Although you can create an instance of a tuple class by calling its class constructor, the code to do so can be cumbersome. The following example uses a class constructor to create a 7-tuple or septuple that contains population data for New York City for each census from 1950 through 2000.

_Code sample not included: ~/snippets/csharp/System/Tuple/Overview/example1.cs._

Creating the same tuple object by using a helper method is more straightforward, as the following example shows.

_Code sample not included: ~/snippets/csharp/System/Tuple/Overview/example1.cs._

The `Tuple.Create` helper methods directly support the creation of tuple objects that have from one to eight components (that is, singletons through octuples). Although there is no practical limit to the number of components a tuple may have, helper methods are not available to create a tuple with nine or more components. To create such a tuple, you must call the `Tuple<T1,T2,T3,T4,T5,T6,T7,T8>.%23ctor` constructor.

> **Note:**
>  For additional information and examples that use tuples, see the documentation for the individual tuple types in .NET, which are listed in the See Also section.

#### Examples
The following example creates an 8-tuple (octuple) that contains prime numbers that are less than 20.

_Code sample not included: ~/snippets/csharp/System/Tuple/Overview/createntuple.cs._

## Tuple.Create<T1>(T1) method

```csharp
public static Tuple<T1> Create<T1> (T1 item1);
```

Creates a new 1-tuple, or singleton.

Parameters:

- `T1`: The type of the only component of the tuple.
- `item1`: The value of the only component of the tuple.

Returns: A tuple whose value is (`item1`).

#### Remarks
`Tuple.Create` is a helper method that you can call to instantiate a 1-tuple object without having to explicitly specify the type of its component. The following example uses the `Tuple.Create` method to instantiate a 1-tuple whose component is of type `Int32`.

_Code sample not included: ~/snippets/csharp/System/Tuple/Overview/create1.cs._

This code is equivalent to the following call to the `Tuple<T>.%23ctor` class constructor.

_Code sample not included: ~/snippets/csharp/System/Tuple/Overview/create1.cs._

## Tuple.Create<T1,T2>(T1, T2) method

```csharp
public static Tuple<T1,T2> Create<T1,T2> (T1 item1, T2 item2);
```

Creates a new 2-tuple, or pair.

Parameters:

- `T1`: The type of the first component of the tuple.
- `T2`: The type of the second component of the tuple.
- `item1`: The value of the first component of the tuple.
- `item2`: The value of the second component of the tuple.

Returns: A 2-tuple whose value is (`item1`, `item2`).

#### Remarks
`Tuple.Create` is a helper method that you can call to instantiate a 2-tuple object without having to explicitly specify the types of its components. The following example uses the `Tuple.Create` method to instantiate a 2-tuple.

_Code sample not included: ~/snippets/csharp/System/Tuple/Overview/create1.cs._

This code is equivalent to the following call to the `Tuple<T1,T2>.%23ctor` class constructor.

_Code sample not included: ~/snippets/csharp/System/Tuple/Overview/create1.cs._

## Tuple.Create<T1,T2,T3>(T1, T2, T3) method

```csharp
public static Tuple<T1,T2,T3> Create<T1,T2,T3> (T1 item1, T2 item2, T3 item3);
```

Creates a new 3-tuple, or triple.

Parameters:

- `T1`: The type of the first component of the tuple.
- `T2`: The type of the second component of the tuple.
- `T3`: The type of the third component of the tuple.
- `item1`: The value of the first component of the tuple.
- `item2`: The value of the second component of the tuple.
- `item3`: The value of the third component of the tuple.

Returns: A 3-tuple whose value is (`item1`, `item2`, `item3`).

#### Remarks
`Tuple.Create` is a helper method that you can call to instantiate a 3-tuple object without having to explicitly specify the types of its components. The following example uses the `Tuple.Create` method to instantiate a 3-tuple.

_Code sample not included: ~/snippets/csharp/System/Tuple/Overview/create1.cs._

This code is equivalent to the following call to the `Tuple<T1,T2,T3>.%23ctor` class constructor.

_Code sample not included: ~/snippets/csharp/System/Tuple/Overview/create1.cs._

## Tuple.Create<T1,T2,T3,T4>(T1, T2, T3, T4) method

```csharp
public static Tuple<T1,T2,T3,T4> Create<T1,T2,T3,T4> (T1 item1, T2 item2, T3 item3, T4 item4);
```

Creates a new 4-tuple, or quadruple.

Parameters:

- `T1`: The type of the first component of the tuple.
- `T2`: The type of the second component of the tuple.
- `T3`: The type of the third component of the tuple.
- `T4`: The type of the fourth component of the tuple.
- `item1`: The value of the first component of the tuple.
- `item2`: The value of the second component of the tuple.
- `item3`: The value of the third component of the tuple.
- `item4`: The value of the fourth component of the tuple.

Returns: A 4-tuple whose value is (`item1`, `item2`, `item3`, `item4`).

#### Remarks
`Tuple.Create` is a helper method that you can call to instantiate a 4-tuple object without having to explicitly specify the types of its components. The following example uses the `Tuple.Create` method to instantiate a 4-tuple.

_Code sample not included: ~/snippets/csharp/System/Tuple/Overview/create1.cs._

This code is equivalent to the following call to the `Tuple<T1,T2,T3,T4>.%23ctor` class constructor.

_Code sample not included: ~/snippets/csharp/System/Tuple/Overview/create1.cs._

## Tuple.Create<T1,T2,T3,T4,T5>(T1, T2, T3, T4, T5) method

```csharp
public static Tuple<T1,T2,T3,T4,T5> Create<T1,T2,T3,T4,T5> (T1 item1, T2 item2, T3 item3, T4 item4, T5 item5);
```

Creates a new 5-tuple, or quintuple.

Parameters:

- `T1`: The type of the first component of the tuple.
- `T2`: The type of the second component of the tuple.
- `T3`: The type of the third component of the tuple.
- `T4`: The type of the fourth component of the tuple.
- `T5`: The type of the fifth component of the tuple.
- `item1`: The value of the first component of the tuple.
- `item2`: The value of the second component of the tuple.
- `item3`: The value of the third component of the tuple.
- `item4`: The value of the fourth component of the tuple.
- `item5`: The value of the fifth component of the tuple.

Returns: A 5-tuple whose value is (`item1`, `item2`, `item3`, `item4`, `item5`).

#### Remarks
`Tuple.Create` is a helper method that you can call to instantiate a 5-tuple object without having to explicitly specify the types of its components. The following example uses the `Tuple.Create` method to instantiate a 5-tuple.

_Code sample not included: ~/snippets/csharp/System/Tuple/Overview/create1.cs._

This code is equivalent to the following call to the `Tuple<T1,T2,T3,T4,T5>.%23ctor` class constructor.

_Code sample not included: ~/snippets/csharp/System/Tuple/Overview/create1.cs._

## Tuple.Create<T1,T2,T3,T4,T5,T6>(T1, T2, T3, T4, T5, T6) method

```csharp
public static Tuple<T1,T2,T3,T4,T5,T6> Create<T1,T2,T3,T4,T5,T6> (T1 item1, T2 item2, T3 item3, T4 item4, T5 item5, T6 item6);
```

Creates a new 6-tuple, or sextuple.

Parameters:

- `T1`: The type of the first component of the tuple.
- `T2`: The type of the second component of the tuple.
- `T3`: The type of the third component of the tuple.
- `T4`: The type of the fourth component of the tuple.
- `T5`: The type of the fifth component of the tuple.
- `T6`: The type of the sixth component of the tuple.
- `item1`: The value of the first component of the tuple.
- `item2`: The value of the second component of the tuple.
- `item3`: The value of the third component of the tuple.
- `item4`: The value of the fourth component of the tuple.
- `item5`: The value of the fifth component of the tuple.
- `item6`: The value of the sixth component of the tuple.

Returns: A 6-tuple whose value is (`item1`, `item2`, `item3`, `item4`, `item5`, `item6`).

#### Remarks
`Tuple.Create` is a helper method that you can call to instantiate a 6-tuple object without having to explicitly specify the types of its components. The following example uses the `Tuple.Create` method to instantiate a 6-tuple.

_Code sample not included: ~/snippets/csharp/System/Tuple/Overview/create1.cs._

This code is equivalent to the following call to the `Tuple<T1,T2,T3,T4,T5,T6>.%23ctor` class constructor.

_Code sample not included: ~/snippets/csharp/System/Tuple/Overview/create1.cs._

## Tuple.Create<T1,T2,T3,T4,T5,T6,T7>(T1, T2, T3, T4, T5, T6, T7) method

```csharp
public static Tuple<T1,T2,T3,T4,T5,T6,T7> Create<T1,T2,T3,T4,T5,T6,T7> (T1 item1, T2 item2, T3 item3, T4 item4, T5 item5, T6 item6, T7 item7);
```

Creates a new 7-tuple, or septuple.

Parameters:

- `T1`: The type of the first component of the tuple.
- `T2`: The type of the second component of the tuple.
- `T3`: The type of the third component of the tuple.
- `T4`: The type of the fourth component of the tuple.
- `T5`: The type of the fifth component of the tuple.
- `T6`: The type of the sixth component of the tuple.
- `T7`: The type of the seventh component of the tuple.
- `item1`: The value of the first component of the tuple.
- `item2`: The value of the second component of the tuple.
- `item3`: The value of the third component of the tuple.
- `item4`: The value of the fourth component of the tuple.
- `item5`: The value of the fifth component of the tuple.
- `item6`: The value of the sixth component of the tuple.
- `item7`: The value of the seventh component of the tuple.

Returns: A 7-tuple whose value is (`item1`, `item2`, `item3`, `item4`, `item5`, `item6`, `item7`).

#### Remarks
`Tuple.Create` is a helper method that you can call to instantiate a 7-tuple object without having to explicitly specify the types of its components. The following example uses the `Tuple.Create` method to instantiate a 7-tuple.

_Code sample not included: ~/snippets/csharp/System/Tuple/Overview/create1.cs._

This code is equivalent to the following call to the `Tuple<T1,T2,T3,T4,T5,T6,T7>.%23ctor` class constructor.

_Code sample not included: ~/snippets/csharp/System/Tuple/Overview/create1.cs._

## Tuple.Create<T1,T2,T3,T4,T5,T6,T7,T8>(T1, T2, T3, T4, T5, T6, T7, T8) method

```csharp
public static Tuple<T1,T2,T3,T4,T5,T6,T7,Tuple<T8>> Create<T1,T2,T3,T4,T5,T6,T7,T8> (T1 item1, T2 item2, T3 item3, T4 item4, T5 item5, T6 item6, T7 item7, T8 item8);
```

Creates a new 8-tuple, or octuple.

Parameters:

- `T1`: The type of the first component of the tuple.
- `T2`: The type of the second component of the tuple.
- `T3`: The type of the third component of the tuple.
- `T4`: The type of the fourth component of the tuple.
- `T5`: The type of the fifth component of the tuple.
- `T6`: The type of the sixth component of the tuple.
- `T7`: The type of the seventh component of the tuple.
- `T8`: The type of the eighth component of the tuple.
- `item1`: The value of the first component of the tuple.
- `item2`: The value of the second component of the tuple.
- `item3`: The value of the third component of the tuple.
- `item4`: The value of the fourth component of the tuple.
- `item5`: The value of the fifth component of the tuple.
- `item6`: The value of the sixth component of the tuple.
- `item7`: The value of the seventh component of the tuple.
- `item8`: The value of the eighth component of the tuple.

Returns: An 8-tuple (octuple) whose value is (`item1`, `item2`, `item3`, `item4`, `item5`, `item6`, `item7`, `item8`).

#### Remarks
`Tuple.Create` is a helper method that you can call to instantiate an 8-tuple without having to explicitly specify the types of its components.

> **Note:**
>  You must call the  `Tuple<T1,T2,T3,T4,T5,T6,T7,T8>.%23ctor` constructor to create a tuple with nine or more components unless your language provides a special syntax for this purpose. The static (`Shared` in Visual Basic) methods of the `Tuple` class cannot be used to create a tuple with nine or more components.

#### Examples
The following example creates an 8-tuple whose components are prime numbers that are less than 20.

_Code sample not included: ~/snippets/csharp/System/Tuple/Overview/createntuple.cs._

This is equivalent to the following example, which uses the `Tuple<T1,T2,T3,T4,T5,T6,T7,T8>` class constructor instead of the `Tuple.Create` factory creation method. Note that instantiating a `Tuple<T1,T2,T3,T4,T5,T6,T7,T8>` object in this way involves considerably more code, because you must declare a nested `Tuple<T>` object as the `Tuple<T1,T2,T3,T4,T5,T6,T7,T8>` object's eighth component to produce an octuple.

_Code sample not included: ~/snippets/csharp/System/Tuple/Overview/ctor8.cs._
